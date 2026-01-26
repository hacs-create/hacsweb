import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-27de0da4/health", (c) => {
  return c.json({ status: "ok" });
});

// Submit Contact Form
app.post("/make-server-27de0da4/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, company, message } = body;
    
    if (!name || !email || !message) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const key = `contact:${timestamp}:${id}`;
    
    const data = {
      id,
      timestamp,
      name,
      email,
      phone,
      company,
      message
    };

    await kv.set(key, data);
    
    // Send Email via Resend if API key is present
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'Contact Form <info@h-a-c-s.com>',
            to: ['a-toyama@h-a-c-s.com', 's-tanaka@h-a-c-s.com'],
            subject: `New Contact: ${name}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company || '-'}</p>
              <p><strong>Phone:</strong> ${phone || '-'}</p>
              <br/>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            `
          })
        });
        
        if (!emailRes.ok) {
          const errorData = await emailRes.text();
          console.error("Resend API Error:", errorData);
        }
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
      }
    }

    return c.json({ success: true, id });
  } catch (error) {
    console.error("Contact submission error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get Contacts (Protected)
app.get("/make-server-27de0da4/contacts", async (c) => {
  try {
    // Check Auth
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_ANON_KEY'),
    );

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Fetch contacts
    const contacts = await kv.getByPrefix("contact:");
    
    // Sort by timestamp desc
    contacts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return c.json({ contacts });
  } catch (error) {
    console.error("Get contacts error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update Contact Status (Protected)
app.put("/make-server-27de0da4/contact/status", async (c) => {
  try {
    // Check Auth
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_ANON_KEY'),
    );

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { id, timestamp, status } = body;

    if (!id || !timestamp || !status) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const key = `contact:${timestamp}:${id}`;
    
    // Get existing data
    const existing = await kv.get(key);
    if (!existing) {
      return c.json({ error: "Contact not found" }, 404);
    }

    const updated = { ...existing, status };
    await kv.set(key, updated);

    return c.json({ success: true, contact: updated });
  } catch (error) {
    console.error("Update status error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Admin Signup / Repair
app.post("/make-server-27de0da4/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
       return c.json({ error: "Email and password are required" }, 400);
    }
    
    if (password.length < 6) {
       return c.json({ error: "Password must be at least 6 characters" }, 400);
    }
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    );
    
    let targetUser = null;
    let operation = 'create';

    // 1. Try to Create
    const { data: createData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { repaired_at: new Date().toISOString() }
    });

    if (createError) {
      // 2. If exists, Try to Find and Update
      if (createError.message.includes("already registered") || createError.status === 400 || createError.status === 422) {
         operation = 'update';
         const { data: { users }, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
         if (listError) return c.json({ error: "List users failed: " + listError.message }, 500);
         
         targetUser = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
         
         if (!targetUser) {
           return c.json({ error: "User exists but not found in list (pagination limit?)" }, 404);
         }

         const { error: updateError } = await supabase.auth.admin.updateUserById(
           targetUser.id, 
           { 
             password: password, 
             email_confirm: true,
             user_metadata: { ...targetUser.user_metadata, repaired_at: new Date().toISOString() },
             app_metadata: { ...targetUser.app_metadata, provider: 'email', providers: ['email'] },
             ban_duration: 'none'
           }
         );
         
         if (updateError) return c.json({ error: "Update failed: " + updateError.message }, 400);
      } else {
        return c.json({ error: "Create failed: " + createError.message }, 400);
      }
    }

    // 3. Verify Login & Get Session (Backend Side)
    // Use Anon key for sign in simulation
    const supabaseAnon = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );
    
    // Slight delay to ensure DB propagation
    await new Promise(r => setTimeout(r, 1000)); // Increased to 1s

    let sessionData = null;
    let loginErrorFinal = null;

    // Retry loop for verification
    for (let i = 0; i < 3; i++) {
       console.log(`Attempt ${i+1}: Verifying login for ${email}`);
       const { data, error } = await supabaseAnon.auth.signInWithPassword({
         email,
         password
       });
       if (!error && data.session) {
         console.log("Verification successful");
         sessionData = data.session;
         break;
       }
       console.log("Verification failed:", error?.message);
       loginErrorFinal = error;
       await new Promise(r => setTimeout(r, 1500)); // Increased wait
    }

    if (sessionData) {
      return c.json({ session: { ...sessionData }, repaired: true, operation });
    } else {
      // If we updated the user but can't login, return error but maybe the user is fixed?
      // But better to treat as error so frontend knows.
      return c.json({ 
        error: "Repair succeeded but backend verification failed: " + (loginErrorFinal?.message || "Unknown error"),
        debug_operation: operation
      }, 400);
    }

  } catch (e) {
      return c.json({ error: e.message }, 500);
  }
});

Deno.serve(app.fetch);