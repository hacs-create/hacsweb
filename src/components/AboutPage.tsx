import { SharedFooter } from './SharedFooter';
import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Building2, Calendar, MapPin, Briefcase, Instagram, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useIsMobile } from './ui/use-mobile';
import { InteractiveTimeline } from './InteractiveTimeline';
import { SEOHelmet, pageSEO } from './SEOHelmet';
import ceoImage from 'figma:asset/979e016af3f9f4d9b1ec8ee03610914164e6f257.png';
import ourStoryImage from 'figma:asset/f24892e41430e185fe3212a0a52135631824f512.png';
import heroImage from 'figma:asset/6d755ee2004b63014880b1b0ff258ee62c6c8eb5.png';
import footerLogoImage from 'figma:asset/b1a5c51f651b9ab9e44642c4187dd4fe7aaf4ab9.png';

export default function AboutPage() {
  const isMobile = useIsMobile();
  
  // Timeline data
  const timelineEvents = [
    {
      date: "2023.11.14",
      title: "会社設立",
      description: "合同会社HACSとして愛知県小牧市に設立。モバイル通信事業を中心に事業を開始。"
    },
    {
      date: "2024.01",
      title: "初期事業展開",
      description: "モバイル通信サービスの提供を本格開始。地域密着型のサポート体制を構築。"
    },
    {
      date: "2024.06",
      title: "サービス拡大",
      description: "Web制作、グラフィックデザイン、動画制作など、デジタルクリエイティブ分野へ事業領域を拡大。"
    },
    {
      date: "2024.12",
      title: "チーム強化",
      description: "若手プロフェッショナルの採用を積極的に推進。多様なスキルを持つメンバーが集結。"
    },
    {
      date: "2025",
      title: "新たな挑戦",
      description: "イベント企画運営やプロモーション支援など、総合的なビジネスソリューションの提供を開始。"
    }
  ];
  
  return (
    <div className="min-h-screen bg-black">
      <SEOHelmet {...pageSEO.about} googleSiteVerification="fMMN8eyrhrgdPheVaSNDxHu4KScbm-5JVe5icnJPVVk" />

      {/* Hero Section - Full Screen with Overlay Text */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="オフィスビル"
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
              About<br />HACS
            </h1>
            <div className="h-px w-32 bg-white/50 mb-8" />
            <p className="text-white/90 text-lg lg:text-2xl max-w-3xl leading-relaxed">
              通信とデザインの力で、<br className="sm:hidden" />ビジネスの未来を創造する
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview Section - Asymmetric Layout */}
      <section className="relative bg-black text-white min-h-screen flex items-center py-16 lg:py-40">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 w-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-24 items-center">
            
            {/* Left - Image */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[3/4] relative overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <ImageWithFallback
                  src={ourStoryImage}
                  alt="チームミーティング"
                  className="w-full h-full object-cover"
                />
                {/* Minimalist overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Decorative Element */}
              {!isMobile && <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-white/10 -z-10" />}
            </motion.div>

            {/* Right - Content */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut", delay: isMobile ? 0 : 0.2 }}
              className="lg:col-span-7"
            >
              <div className="space-y-8 lg:space-y-12">
                <div>
                  <div className="text-sm tracking-[0.3em] text-gray-400 mb-4 lg:mb-6">OUR STORY</div>
                  <h2 className="tracking-tight leading-[1.1] mb-8 lg:mb-12 text-white" style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)' }}>
                    私たちの歩み
                  </h2>
                </div>
                
                <div className="space-y-4 lg:space-y-8 max-w-2xl">
                  <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                    合同会社HACSは、モバイル通信事業を柱とするIT企業です。創業以来、お客様のデジタル戦略をトータルサポートし、ビジネスの成長に貢献してきました。
                  </p>
                  <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                    私たちは単なるサービス提供者ではなく、お客様のビジネスパートナーとして、常に最新の技術と創造性をもって課題解決に取り組んでいます。
                  </p>
                  <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                    若いエネルギーと豊富な経験を持つプロフェッショナルが集まり、新しいアイデアを次々と形にしています。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CEO Message Section - Dark with Large Typography */}
      <section className="relative bg-black text-white min-h-screen flex items-center py-16 lg:py-40 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20 grayscale"
          >
            <source src="https://videos.pexels.com/video-files/3130182/3130182-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-20 w-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-24 items-center">
            
            {/* Left - Content */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
              className="lg:col-span-7 space-y-8 lg:space-y-12"
            >
              <div>
                <div className="text-sm tracking-[0.3em] text-gray-400 mb-4 lg:mb-6">CEO MESSAGE</div>
                <h2 className="tracking-tight leading-[1.1] mb-8 lg:mb-12" style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)' }}>
                  代表挨拶
                </h2>
              </div>
              
              <div className="space-y-4 lg:space-y-8 max-w-2xl">
                <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                  当社「HACS」という社名には、<br />
                  <span className="text-white">H: Honesty(誠実)</span><br />
                  <span className="text-white">A: Ambition(大望)</span><br />
                  <span className="text-white">C: Creative(独創的)</span><br />
                  <span className="text-white">S: Shing(新しい・芯を持つ・信じる)</span><br />
                  という理念を込めております。
                </p>

                <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                  設立以来、私たちは「誠実で真摯な対応」を大切にし、お客様から信頼される企業を目指して参りました。スタッフの9割以上が20代という若い世代で構成されており、その若さを強みに新しい挑戦を続けております。
                </p>

                <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                  当社が大切にしているのは、社員一人ひとりの強みを活かすことです。誰もがそれぞれの長所を武器にし、自分らしい形で力を発揮できる環境づくりに取り組んでおります。
                </p>

                <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                  これからも誠実さと挑戦心を原動力に、新たな価値を創造し、社会に貢献できる企業として歩み続けます。
                </p>

                <div className="pt-6 lg:pt-8 border-t border-white/20">
                  <p className="text-white/60 text-sm mb-2">代表社員</p>
                  <p className="text-white text-lg lg:text-xl">遠山 淳志</p>
                </div>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut", delay: isMobile ? 0 : 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[3/4] relative overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <ImageWithFallback
                  src={ceoImage}
                  alt="代表社員 遠山 淳志"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Element */}
              {!isMobile && <div className="absolute -top-8 -left-8 w-48 h-48 border border-white/10 -z-10" />}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section - Minimal Black Background */}
      <section className="relative bg-black text-white py-16 lg:py-48">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-32">
            
            {/* Left - Large Statement */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              className="space-y-8 lg:space-y-16"
            >
              <h2 className="tracking-tight leading-[0.9]" style={{ fontSize: 'clamp(2rem, 8vw, 7rem)' }}>
                Innovation<br />
                Through<br />
                Connection
              </h2>
              <p className="text-white/60 text-base lg:text-xl max-w-lg leading-relaxed">
                私たちは、通信の力で、ビジネスとユーザーをつなぎ、新しい価値を創造し続けます。
              </p>
            </motion.div>

            {/* Right - Philosophy */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0 : 0.2 }}
              className="space-y-8 lg:space-y-16"
            >
              <div>
                <div className="text-sm tracking-[0.3em] text-gray-400 mb-4 lg:mb-6">PHILOSOPHY</div>
                <h3 className="text-2xl lg:text-4xl mb-8 lg:mb-12 tracking-tight">企業理念</h3>
              </div>
              
              <div className="space-y-6 lg:space-y-8">
                <div className="pl-4 lg:pl-6 border-l-2 border-white/20">
                  <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                    私たちは誠実な姿勢で人々の信頼を築き、大きな志を持って社会に貢献します。
                  </p>
                </div>
                
                <div className="pl-4 lg:pl-6 border-l-2 border-white/20">
                  <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                    独創的な発想と挑戦する精神で新たな価値を創造し未来を切り拓きます。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Information - Clean Grid */}
      <section className="bg-black text-white py-16 lg:py-48">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          
          <div className="mb-12 lg:mb-24">
            <div className="text-sm tracking-[0.3em] text-gray-400 mb-4 lg:mb-6">COMPANY INFO</div>
            <h3 className="tracking-tight leading-[1.1] text-white" style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)' }}>
              会社情報
            </h3>
          </div>
          
          {/* Info Grid - Minimalist */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-20 mb-16 lg:mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <Building2 className="w-8 h-8 text-white/70" strokeWidth={1} />
              <div>
                <h4 className="text-sm text-gray-400 mb-2 tracking-wide">COMPANY NAME</h4>
                <p className="text-white text-lg">合同会社HACS</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <Calendar className="w-8 h-8 text-white/70" strokeWidth={1} />
              <div>
                <h4 className="text-sm text-gray-400 mb-2 tracking-wide">ESTABLISHED</h4>
                <p className="text-white text-lg">2023年11月14日</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <MapPin className="w-8 h-8 text-white/70" strokeWidth={1} />
              <div>
                <h4 className="text-sm text-gray-400 mb-2 tracking-wide">LOCATION</h4>
                <p className="text-white text-lg leading-relaxed">
                  〒485-0036<br />
                  愛知県小牧市下小針天神2丁目2<br />
                  ESPRESSO小牧2C
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <Briefcase className="w-8 h-8 text-white/70" strokeWidth={1} />
              <div>
                <h4 className="text-sm text-gray-400 mb-2 tracking-wide">BUSINESS</h4>
                <p className="text-white text-lg">モバイル通信</p>
              </div>
            </motion.div>
          </div>

          {/* Services Detail */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid md:grid-cols-2 gap-16 max-w-4xl pt-16 border-t border-white/10"
          >
            <div className="space-y-6">
              <h4 className="text-white text-xl tracking-tight">モバイル通信事業</h4>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="w-1 h-1 bg-white rounded-full mt-3 flex-shrink-0" />
                  <span>携帯電話販売</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1 h-1 bg-white rounded-full mt-3 flex-shrink-0" />
                  <span>通信環境コンサルティング</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1 h-1 bg-white rounded-full mt-3 flex-shrink-0" />
                  <span>法人向けモバイルソリューション</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-white text-xl tracking-tight">その他サービス</h4>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="w-1 h-1 bg-white rounded-full mt-3 flex-shrink-0" />
                  <span>イベント企画運営</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1 h-1 bg-white rounded-full mt-3 flex-shrink-0" />
                  <span>プロモーション支援</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1 h-1 bg-white rounded-full mt-3 flex-shrink-0" />
                  <span>デジタルマーケティング</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20"
          >
            <Link to="/services">
              <Button className="group bg-white text-black hover:bg-gray-200 px-12 py-6 text-base">
                サービス詳細を見る
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative bg-black text-white">
        <InteractiveTimeline events={timelineEvents} />
      </section>

      {/* Instagram Section - Minimal Dark */}
      <section className="relative bg-black text-white py-16 lg:py-48">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <Instagram className="w-16 h-16 mx-auto mb-12 text-white" strokeWidth={1} />
            <h3 className="tracking-tight leading-[1.1] mb-8" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              Follow Our Journey
            </h3>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              日々の活動やプロジェクトの様子をInstagramで発信しています。<br />
              私たちの挑戦と成長をぜひご覧ください。
            </p>
          </motion.div>
          
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="https://www.instagram.com/hacsbiz.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 px-12 py-6 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            <Instagram className="w-6 h-6" strokeWidth={1.5} />
            <span className="tracking-wide text-lg">@hacsbiz.jp</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-950 text-white py-16 lg:py-48">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-12 tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
              いい仕事を、<br className="sm:hidden" />いい仲間と。
            </h2>
            <p className="text-white/60 text-xl mb-16 leading-relaxed max-w-3xl mx-auto">
              HACSでは、常に新しいことに挑戦し、共に成長する仲間を募集しています。
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/recruit">
                <Button className="bg-white text-black hover:bg-gray-200 px-12 py-6 text-base group">
                  採用情報を見る
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button asChild className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-12 py-6 text-base group">
                <Link to="/contact">
                  お問い合わせ
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