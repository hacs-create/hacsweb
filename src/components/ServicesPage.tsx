import { SharedFooter } from './SharedFooter';
import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Phone, Users, Calendar, Rocket, Instagram, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useIsMobile } from './ui/use-mobile';
import { SEOHelmet, pageSEO } from './SEOHelmet';
import servicesImage from 'figma:asset/f9a3cefa87427268660563023fa9b1b89f58f45a.png';
import salesPromoImage from 'figma:asset/706be00a0d4f54aaaa00a8c3654ff3803284b966.png';
import eventImage from 'figma:asset/c466064dffa7f2c87902b52fe72ef1508ff26d2b.png';
import footerLogoImage from 'figma:asset/b1a5c51f651b9ab9e44642c4187dd4fe7aaf4ab9.png';

export default function ServicesPage() {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-black">
      <SEOHelmet {...pageSEO.services} googleSiteVerification="fMMN8eyrhrgdPheVaSNDxHu4KScbm-5JVe5icnJPVVk" />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={servicesImage}
            alt="Services"
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
              Service
            </h1>
            <div className="h-px w-32 bg-white/50 mb-8" />
            <p className="text-white/90 text-lg lg:text-2xl max-w-3xl leading-relaxed">
              モバイル通信事業を通じて、<br className="sm:hidden" />お客様のビジネスを総合的にサポートします
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sales Promotion Section - Asymmetric Layout */}
      <section className="relative bg-black min-h-screen flex items-center py-16 lg:py-40">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 w-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-24 items-center">
            
            {/* Left - Content */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
              className="lg:col-span-7 space-y-8 lg:space-y-12"
            >
              <div>
                <div className="text-sm tracking-[0.3em] text-gray-400 mb-6">SERVICE 01</div>
                <h2 className="tracking-tight leading-[1.1] mb-8 lg:mb-12 text-white" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                  セールス<br />プロモーション事業
                </h2>
              </div>
              
              <div className="space-y-6 lg:space-y-8 max-w-2xl">
                <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                  最新のモバイル端末やプランをお客様のニーズに合わせてご提案。店頭での丁寧なカウンセリングを通じて、最適な通信環境を実現します。
                </p>

                <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                  私たちは単なる販売スタッフではなく、お客様のライフスタイルやビジネスに最適な通信ソリューションを提供するコンサルタントです。
                </p>

                <div className="grid grid-cols-2 gap-6 lg:gap-8 pt-6 lg:pt-8">
                  <div className="space-y-3">
                    <Phone className="w-8 h-8 text-white" strokeWidth={1} />
                    <h4 className="text-white tracking-tight">携帯電話販売</h4>
                    <p className="text-white/70 text-sm leading-relaxed">最新端末からプラン提案まで</p>
                  </div>
                  <div className="space-y-3">
                    <Users className="w-8 h-8 text-white" strokeWidth={1} />
                    <h4 className="text-white tracking-tight">法人向けソリューション</h4>
                    <p className="text-white/70 text-sm leading-relaxed">ビジネスに最適な通信環境</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut", delay: isMobile ? 0 : 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[3/4] relative overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <ImageWithFallback
                  src={salesPromoImage}
                  alt="セールスプロモーション"
                  className="w-full h-full object-cover"
                />
              </div>
              {!isMobile && <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-white/10 -z-10" />}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Business Section - Dark Background */}
      <section className="relative bg-black text-white min-h-screen flex items-center py-32 lg:py-40 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20 grayscale"
          >
            <source src="https://videos.pexels.com/video-files/3196284/3196284-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-20 w-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left - Image */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[3/4] relative overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <ImageWithFallback
                  src={eventImage}
                  alt="イベント事業"
                  className="w-full h-full object-cover"
                />
              </div>
              {!isMobile && <div className="absolute -top-8 -left-8 w-48 h-48 border border-white/10 -z-10" />}
            </motion.div>

            {/* Right - Content */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut", delay: isMobile ? 0 : 0.2 }}
              className="lg:col-span-7 space-y-8 lg:space-y-12"
            >
              <div>
                <div className="text-sm tracking-[0.3em] text-gray-400 mb-6">SERVICE 02</div>
                <h2 className="tracking-tight leading-[1.1] mb-8 lg:mb-12" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                  イベント事業
                </h2>
              </div>
              
              <div className="space-y-6 lg:space-y-8 max-w-2xl">
                <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                  企業様向けのモバイルソリューション提案や、新製品発表会、キャンペーンイベントなど、多様なイベント企画・運営をサポートします。
                </p>

                <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                  企画段階から当日の運営まで、一貫したサポート体制で、お客様のイベントを成功に導きます。
                </p>

                <div className="grid grid-cols-2 gap-6 lg:gap-8 pt-6 lg:pt-8">
                  <div className="space-y-3">
                    <Calendar className="w-8 h-8 text-white" strokeWidth={1} />
                    <h4 className="text-white tracking-tight">イベント企画</h4>
                    <p className="text-white/60 text-sm leading-relaxed">コンセプト設計から実施まで</p>
                  </div>
                  <div className="space-y-3">
                    <Rocket className="w-8 h-8 text-white" strokeWidth={1} />
                    <h4 className="text-white tracking-tight">プロモーション支援</h4>
                    <p className="text-white/60 text-sm leading-relaxed">効果的な販促活動をサポート</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="relative bg-zinc-950 text-white py-32 lg:py-48">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-24 lg:gap-32">
            
            {/* Left - Large Statement */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-16"
            >
              <h2 className="tracking-tight leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
                Customer<br />
                First<br />
                Always
              </h2>
              <p className="text-white/60 text-xl max-w-lg leading-relaxed">
                お客様第一の姿勢で、最高のサービス体験を提供します。
              </p>
            </motion.div>

            {/* Right - Approach Details */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-16"
            >
              <div>
                <div className="text-sm tracking-[0.3em] text-gray-400 mb-6">OUR APPROACH</div>
                <h3 className="text-3xl lg:text-4xl mb-12 tracking-tight">私たちのアプローチ</h3>
              </div>
              
              <div className="space-y-8">
                <div className="pl-6 border-l-2 border-white/20">
                  <p className="text-white/80 text-lg leading-relaxed">
                    お客様一人ひとりのニーズを深く理解し、最適なソリューションを提案します。
                  </p>
                </div>
                
                <div className="pl-6 border-l-2 border-white/20">
                  <p className="text-white/80 text-lg leading-relaxed">
                    業界の最新トレンドと技術を常に学び、価値ある提案を実現します。
                  </p>
                </div>

                <div className="pl-6 border-l-2 border-white/20">
                  <p className="text-white/80 text-lg leading-relaxed">
                    販売後も継続的なサポートで、お客様の成功をバックアップします。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-32 lg:py-48">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-12 tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
              サービスについて<br />
              お気軽にご相談ください
            </h2>
            <p className="text-gray-600 text-xl mb-16 leading-relaxed max-w-3xl mx-auto">
              お客様のビジネスに最適なソリューションをご提案いたします
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild className="bg-black text-white hover:bg-zinc-800 px-12 py-6 text-base group">
                <Link to="/contact">
                  お問い合わせ
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-white px-12 py-6 text-base group">
                <Link to="/about">
                  会社概要を見る
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter />
    </div>
  );
}
