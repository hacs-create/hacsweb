import React, { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Instagram, Send, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useIsMobile } from './ui/use-mobile';
import { SEOHelmet, pageSEO } from './SEOHelmet';
import { SharedFooter } from './SharedFooter';
import { SUPABASE_ANON_KEY, EDGE_FUNCTION_URL } from '../utils/env';

export default function ContactPage() {
  const isMobile = useIsMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch(`${EDGE_FUNCTION_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('送信に失敗しました。');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      setError('送信中にエラーが発生しました。しばらく経ってからもう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-black">
      <SEOHelmet {...pageSEO.contact} googleSiteVerification="fMMN8eyrhrgdPheVaSNDxHu4KScbm-5JVe5icnJPVVk" />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1625461291092-13d0c45608b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBkZXNrfGVufDF8fHx8MTc2MTQxMDgwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Contact Us"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 px-6 lg:px-20 max-w-[1600px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-white mb-8 leading-[0.85] tracking-tighter" style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}>
              Contact
            </h1>
            <div className="h-px w-32 bg-white/50 mb-8" />
            <p className="text-white/90 text-lg lg:text-2xl max-w-3xl leading-relaxed">
              お気軽にお問い合わせください
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section - Asymmetric Layout */}
      <section className="relative bg-black min-h-screen flex items-center py-16 lg:py-40">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 w-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-24 items-start">
            
            {/* Left - Form */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="space-y-6 lg:space-y-12">
                <div>
                  <div className="text-sm tracking-[0.3em] text-gray-400 mb-6">GET IN TOUCH</div>
                  <h2 className="tracking-tight leading-[1.1] mb-6 lg:mb-12 text-white" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                    お問い合わせ<br />フォーム
                  </h2>
                </div>
                
                {success ? (
                  <div className="bg-zinc-900/50 border border-green-500/30 p-8 rounded-lg text-center space-y-4">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                    <h3 className="text-xl text-white font-medium">お問い合わせを受け付けました</h3>
                    <p className="text-gray-400">
                      内容を確認の上、担当者よりご連絡させていただきます。<br />
                      今しばらくお待ちください。
                    </p>
                    <Button 
                      onClick={() => setSuccess(false)}
                      variant="outline"
                      className="mt-4 border-white/20 text-white hover:bg-white/10"
                    >
                      続けて送信する
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8 max-w-2xl">
                    <div className="space-y-3">
                      <label htmlFor="name" className="block text-sm tracking-wide text-gray-400">
                        お名前 <span className="text-white">*</span>
                      </label>
                      <Input 
                        id="name" 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="山田 太郎" 
                        className="border-white/20 bg-white/5 text-white py-5 lg:py-6"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="email" className="block text-sm tracking-wide text-gray-400">
                        メールアドレス <span className="text-white">*</span>
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@company.com" 
                        className="border-white/20 bg-white/5 text-white py-5 lg:py-6"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="phone" className="block text-sm tracking-wide text-gray-400">
                        電話番号
                      </label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="000-0000-0000" 
                        className="border-white/20 bg-white/5 text-white py-5 lg:py-6"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="company" className="block text-sm tracking-wide text-gray-400">
                        会社名
                      </label>
                      <Input 
                        id="company" 
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="株式会社サンプル" 
                        className="border-white/20 bg-white/5 text-white py-5 lg:py-6"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="message" className="block text-sm tracking-wide text-gray-400">
                        お問い合わせ内容 <span className="text-white">*</span>
                      </label>
                      <Textarea 
                        id="message" 
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="お問い合わせ内容をご記入ください" 
                        className="border-white/20 bg-white/5 text-white min-h-[160px] lg:min-h-[200px]"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {error && (
                      <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded border border-red-500/30">
                        {error}
                      </div>
                    )}

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-black hover:bg-gray-200 py-5 lg:py-6 text-sm lg:text-base group transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                          送信中...
                        </>
                      ) : (
                        <>
                          送信する
                          <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right - Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut", delay: isMobile ? 0 : 0.2 }}
              className="lg:col-span-5 space-y-10 lg:space-y-16"
            >
              <div>
                <div className="text-sm tracking-[0.3em] text-gray-400 mb-6">CONTACT INFO</div>
                <h3 className="tracking-tight text-2xl lg:text-4xl mb-8 lg:mb-12 text-white">お問い合わせ先</h3>
              </div>

              <div className="space-y-8 lg:space-y-12">
                <motion.div 
                  className="space-y-4"
                  whileHover={{ x: isMobile ? 0 : 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail className="w-8 h-8 text-white" strokeWidth={1} />
                  <div>
                    <p className="text-sm tracking-[0.2em] text-gray-400 mb-2">EMAIL</p>
                    <a href="mailto:info@h-a-c-s.com" className="text-white text-base lg:text-lg hover:underline">
                      info@h-a-c-s.com
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  className="pt-6 lg:pt-8 border-t border-white/20"
                  whileHover={{ x: isMobile ? 0 : 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-4">
                    <MapPin className="w-8 h-8 text-white" strokeWidth={1} />
                    <div>
                      <p className="text-sm tracking-[0.2em] text-gray-400 mb-2">LOCATION</p>
                      <p className="text-white text-base lg:text-lg leading-relaxed">
                        〒485-0036<br />
                        愛知県小牧市下小針天神2丁目2<br />
                        ESPRESSO小牧2C
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="pt-6 lg:pt-8 border-t border-white/20">
                  <p className="text-white/70 leading-relaxed text-sm lg:text-base">
                    営業時間：10:00〜19:00（平日）
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section - Dark Background */}
      <section className="bg-black py-16 lg:py-48">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0.5 : 0.8 }}
            className="mb-10 lg:mb-16"
          >
            <div className="text-sm tracking-[0.3em] text-gray-400 mb-6">ACCESS</div>
            <h3 className="text-white tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              アクセス
            </h3>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full h-[400px] lg:h-[500px] border border-white/10"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3257.8736842677936!2d136.9122!3d35.2914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6003751d8c8b0a73%3A0x5e7d5e5f5e5e5e5e!2z5bCP54mn5biC5LiL5bCP6Yed5aSp56We77yS5LiB55uu77yS!5e0!3m2!1sja!2sjp!4v1634567890123!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="会社所在地"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16 lg:py-48">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-32">
            
            {/* Left - Statement */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              className="space-y-8 lg:space-y-16"
            >
              <h2 className="tracking-tight leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
                Let's<br />
                Talk<br />
                Business
              </h2>
            </motion.div>

            {/* Right - Details */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0 : 0.2 }}
              className="space-y-8 lg:space-y-16 flex flex-col justify-center"
            >
              <p className="text-white/80 text-base lg:text-xl leading-relaxed">
                お客様のビジネスに最適なソリューションをご提案いたします。<br />
                まずはお気軽にご相談ください。
              </p>

              <div className="space-y-6 lg:space-y-8">
                <div className="pl-6 border-l-2 border-white/20">
                  <p className="text-white/60 leading-relaxed text-sm lg:text-base">
                    サービスに関するご質問やお見積りのご依頼など、どのようなことでもお気軽にお問い合わせください。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter />
    </div>
  );
}