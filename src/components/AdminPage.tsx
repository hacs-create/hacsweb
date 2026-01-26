import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, EDGE_FUNCTION_URL } from '../utils/env';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Loader2, LogOut, RefreshCw, Trash2, CheckCircle2, Circle, Clock } from 'lucide-react';

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

interface Contact {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  status?: 'unhandled' | 'progress' | 'done' | 'deleted';
}

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [fetchError, setFetchError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showDeleted, setShowDeleted] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchContacts();
    }
  }, [session]);

  const fetchContacts = async () => {
    if (!session?.access_token) return;
    
    setLoading(true);
    setFetchError('');
    
    try {
      const res = await fetch(`${EDGE_FUNCTION_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });
      
      if (!res.ok) throw new Error('Failed to fetch contacts');
      
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch (err) {
      setFetchError('データの取得に失敗しました。');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status: string) => {
    if (!selectedContact || !session) return;
    setUpdating(true);
    
    try {
      const res = await fetch(`${EDGE_FUNCTION_URL}/contact/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          id: selectedContact.id,
          timestamp: selectedContact.timestamp,
          status
        })
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      
      const newStatus = status as Contact['status'];
      
      // Update lists
      setContacts(prev => prev.map(c => 
        c.id === selectedContact.id ? { ...c, status: newStatus } : c
      ));
      
      setSelectedContact(prev => prev ? { ...prev, status: newStatus } : null);
      
    } catch (err) {
      console.error(err);
      alert('ステータスの更新に失敗しました。');
    } finally {
      setUpdating(false);
    }
  };

  const filteredContacts = contacts.filter(c => 
    showDeleted 
      ? c.status === 'deleted' 
      : (c.status !== 'deleted')
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    
    // Trim inputs
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    // Ensure no stale session
    await supabase.auth.signOut();
    
    const { error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPassword,
    });

    if (error) {
      // Auto Repair Logic: If login fails, try to create/update user via backend
      try {
        const res = await fetch(`${EDGE_FUNCTION_URL}/signup`, {
          method: 'POST',
          body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        const data = await res.json();

        console.log("Backend response:", data); // Debug response

        if (!data.error) {
             // 1. If backend returned a verified session, use it directly.
             if (data.session) {
                 const { error: sessionError } = await supabase.auth.setSession(data.session);
                 if (!sessionError) {
                     // Success! Session set, auth listener will update UI
                     console.log("Session verified and set.");
                     return;
                 }
                 console.error("Session set failed:", sessionError);
             } else {
                 console.warn("Backend returned success but no session:", data);
             }

             // 2. Fallback: Retry login manually if session wasn't usable
             await new Promise(r => setTimeout(r, 1000));
             
             const { error: retryError } = await supabase.auth.signInWithPassword({
                email: cleanEmail,
                password: cleanPassword,
             });
             if (retryError) {
                console.error("Retry login failed:", retryError);
                // Last resort: wait more and try one more time
                await new Promise(r => setTimeout(r, 2000));
                const { error: finalError } = await supabase.auth.signInWithPassword({ email: cleanEmail, password: cleanPassword });
                if (finalError) {
                    setLoginError('ログインに失敗しました(Final): ' + finalError.message);
                }
             }
        } else {
             console.error("Auto-repair failed:", data.error);
             setLoginError(`ログインに失敗しました: ${error.message}`);
        }
      } catch (e) {
         setLoginError('ログイン処理中にエラーが発生しました。');
      }
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading && !session) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle>HACS Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  className="bg-black border-zinc-700 text-white placeholder:text-zinc-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  className="bg-black border-zinc-700 text-white placeholder:text-zinc-600"
                  required
                />
              </div>
              {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-12 pt-24 lg:pt-32">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">HACS Contact Admin {showDeleted && '(Trash)'}</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <Button 
              variant={showDeleted ? "destructive" : "secondary"} 
              onClick={() => setShowDeleted(!showDeleted)}
              className={showDeleted ? "" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700"}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {showDeleted ? "Hide Trash" : "Show Trash"}
            </Button>
            <Button variant="outline" onClick={fetchContacts} className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {fetchError && (
          <div className="p-4 bg-red-900/20 border border-red-500/30 rounded text-red-400">
            {fetchError}
          </div>
        )}

        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                  <TableHead className="text-zinc-400">Status</TableHead>
                  <TableHead className="text-zinc-400">Date</TableHead>
                  <TableHead className="text-zinc-400">Name</TableHead>
                  <TableHead className="text-zinc-400">Company</TableHead>
                  <TableHead className="text-zinc-400">Email</TableHead>
                  <TableHead className="text-zinc-400">Phone</TableHead>
                  <TableHead className="text-zinc-400">Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.length === 0 ? (
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableCell colSpan={7} className="text-center py-8 text-zinc-500">
                      {showDeleted ? 'Trash is empty' : 'No contacts found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContacts.map((contact) => (
                    <TableRow 
                      key={contact.id} 
                      className="border-zinc-800 hover:bg-zinc-800/50 cursor-pointer transition-colors hover:bg-zinc-800"
                      onClick={() => setSelectedContact(contact)}
                    >
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          contact.status === 'done' ? 'bg-green-900/30 text-green-400 border-green-800' :
                          contact.status === 'progress' ? 'bg-blue-900/30 text-blue-400 border-blue-800' :
                          contact.status === 'deleted' ? 'bg-red-900/30 text-red-400 border-red-800' :
                          'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}>
                          {contact.status === 'done' ? '済' :
                           contact.status === 'progress' ? '対応中' :
                           contact.status === 'deleted' ? '削除済' : '未対応'}
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-zinc-300">
                        {new Date(contact.timestamp).toLocaleString('ja-JP')}
                      </TableCell>
                      <TableCell className="font-medium text-white">{contact.name}</TableCell>
                      <TableCell className="text-zinc-300">{contact.company}</TableCell>
                      <TableCell className="text-zinc-300">{contact.email}</TableCell>
                      <TableCell className="text-zinc-300">{contact.phone}</TableCell>
                      <TableCell className="max-w-md truncate text-zinc-300" title={contact.message}>
                        {contact.message}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <Dialog open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
              <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Contact Details</DialogTitle>
                  <DialogDescription className="text-zinc-400">
                    Received on {selectedContact && new Date(selectedContact.timestamp).toLocaleString('ja-JP')}
                  </DialogDescription>
                </DialogHeader>
                
                {selectedContact && (
                  <div className="space-y-6 mt-4">
                    {/* Status Control */}
                    <div className="bg-black/30 p-4 rounded-lg border border-zinc-800">
                       <label className="text-xs text-zinc-500 uppercase tracking-wider font-semibold block mb-3">Status Action</label>
                       <div className="flex flex-wrap gap-3">
                          <Button 
                            size="sm"
                            variant={(!selectedContact.status || selectedContact.status === 'unhandled') ? "default" : "outline"}
                            onClick={() => updateStatus('unhandled')}
                            disabled={updating}
                            className={(!selectedContact.status || selectedContact.status === 'unhandled') ? "bg-zinc-700" : "border-zinc-700 hover:bg-zinc-800"}
                          >
                            <Circle className="w-4 h-4 mr-2" />
                            未対応
                          </Button>
                          <Button 
                            size="sm"
                            variant={selectedContact.status === 'progress' ? "default" : "outline"}
                            onClick={() => updateStatus('progress')}
                            disabled={updating}
                            className={selectedContact.status === 'progress' ? "bg-blue-600 hover:bg-blue-700" : "border-zinc-700 hover:bg-zinc-800 text-blue-400 hover:text-blue-300"}
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            対応中
                          </Button>
                          <Button 
                            size="sm"
                            variant={selectedContact.status === 'done' ? "default" : "outline"}
                            onClick={() => updateStatus('done')}
                            disabled={updating}
                            className={selectedContact.status === 'done' ? "bg-green-600 hover:bg-green-700" : "border-zinc-700 hover:bg-zinc-800 text-green-400 hover:text-green-300"}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            済
                          </Button>
                          <div className="flex-1" />
                          <Button 
                            size="sm"
                            variant={selectedContact.status === 'deleted' ? "destructive" : "outline"}
                            onClick={() => updateStatus('deleted')}
                            disabled={updating}
                            className={selectedContact.status === 'deleted' ? "bg-red-600" : "border-red-900/50 text-red-400 hover:bg-red-900/20 hover:text-red-300"}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            ゴミ箱
                          </Button>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Name</label>
                        <div className="text-white text-lg mt-1">{selectedContact.name}</div>
                      </div>
                      <div>
                        <label className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Company</label>
                        <div className="text-white text-lg mt-1">{selectedContact.company || '-'}</div>
                      </div>
                      <div>
                        <label className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Email</label>
                        <div className="text-zinc-300 mt-1">{selectedContact.email}</div>
                      </div>
                      <div>
                        <label className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Phone</label>
                        <div className="text-zinc-300 mt-1">{selectedContact.phone || '-'}</div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-zinc-800">
                      <label className="text-xs text-zinc-500 uppercase tracking-wider font-semibold block mb-3">Message</label>
                      <div className="text-zinc-300 bg-black/50 p-4 rounded-md border border-zinc-800 whitespace-pre-wrap leading-relaxed">
                        {selectedContact.message}
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}