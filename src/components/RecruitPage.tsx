import { SharedFooter } from './SharedFooter';
import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Users, Target, Award, Heart, Instagram, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useIsMobile } from './ui/use-mobile';
import { SEOHelmet, pageSEO } from './SEOHelmet';
import recruitImage from 'figma:asset/d6d551de9633b349b6c656a69d83d8ad7e508a2c.png';
import joinUsImage from 'figma:asset/c0a793d607c2f95f986ee8e5292ad8974899b111.png';
import footerLogoImage from 'figma:asset/b1a5c51f651b9ab9e44642c4187dd4fe7aaf4ab9.png';

export default function RecruitPage() {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-black">
      <SEOHelmet {...pageSEO.recruit} googleSiteVerification="fMMN8eyrhrgdPheVaSNDxHu4KScbm-5JVe5icnJPVVk" />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={recruitImage}
            alt="採用情報"
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
              Recruit
            </h1>
            <div className="h-px w-32 bg-white/50 mb-8" />
            <p className="text-white/90 text-lg lg:text-2xl max-w-3xl leading-relaxed">
              常に新しいことに挑戦し、<br className="sm:hidden" />共に成長する仲間を募集します
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section - Asymmetric Layout */}
      <section className="relative bg-black min-h-screen flex items-center py-16 lg:py-40">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 w-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-24 items-center">
            
            {/* Left - Image */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <motion.div 
                className="aspect-[3/4] relative overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                whileHover={{ scale: isMobile ? 1 : 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <ImageWithFallback
                  src={joinUsImage}
                  alt="チーム"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
              {!isMobile && <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-white/10 -z-10" />}
            </motion.div>

            {/* Right - Content */}
            <motion.div 
              initial={{ opacity: 0, x: isMobile ? 0 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut", delay: isMobile ? 0 : 0.2 }}
              className="lg:col-span-7"
            >
              <div className="space-y-6 lg:space-y-12">
                <div>
                  <div className="text-sm tracking-[0.3em] text-gray-400 mb-6">JOIN US</div>
                  <h2 className="tracking-tight leading-[1.1] mb-6 lg:mb-12 text-white" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                    求める人物像
                  </h2>
                </div>
                
                <div className="space-y-4 lg:space-y-8 max-w-2xl">
                  <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                    HACSは、モバイル通信事業を通じて、新しい価値を創造しています。変化の速いIT業界で、自分のアイデアを形にし、お客様に喜ばれる仕事をしたい方。
                  </p>
                  <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                    若い世代が中心の会社で、意欲的なスタッフとともに成長したい方。そんなあなたをお待ちしています。
                  </p>
                  <p className="text-white/80 leading-relaxed text-base lg:text-lg">
                    誰もがそれぞれの強みを武器にし、自分らしい形で力を発揮できる環境づくりに取り組んでいます。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Dark Background */}
      <section className="relative bg-black text-white py-16 lg:py-48">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0.5 : 0.8 }}
            className="mb-12 lg:mb-24 text-center"
          >
            <div className="text-sm tracking-[0.3em] text-gray-400 mb-6">OUR VALUES</div>
            <h2 className="tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              HACSの価値観
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: isMobile ? 0 : -8 }}
              className="space-y-6"
            >
              <Users className="w-10 h-10 text-white" strokeWidth={1} />
              <div>
                <h4 className="text-xl mb-4 tracking-tight">チームワーク</h4>
                <p className="text-white/60 leading-relaxed">
                  全てのスタッフがリーダーシップを持ち、協力して目標を達成します
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: isMobile ? 0 : -8 }}
              className="space-y-6"
            >
              <Target className="w-10 h-10 text-white" strokeWidth={1} />
              <div>
                <h4 className="text-xl mb-4 tracking-tight">挑戦</h4>
                <p className="text-white/60 leading-relaxed">
                  常に新しいことにチャレンジし続ける姿勢を大切にします
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: isMobile ? 0 : -8 }}
              className="space-y-6"
            >
              <Award className="w-10 h-10 text-white" strokeWidth={1} />
              <div>
                <h4 className="text-xl mb-4 tracking-tight">成長</h4>
                <p className="text-white/60 leading-relaxed">
                  スタッフのアイデアを実現し、個人の成長を支援します
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: isMobile ? 0 : -8 }}
              className="space-y-6"
            >
              <Heart className="w-10 h-10 text-white" strokeWidth={1} />
              <div>
                <h4 className="text-xl mb-4 tracking-tight">情熱</h4>
                <p className="text-white/60 leading-relaxed">
                  お客様のビジネス成長に貢献したいという強い想い
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Job Openings Section - Black Background */}
      <section className="bg-black py-16 lg:py-48">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          
          <div className="mb-12 lg:mb-24">
            <div className="text-sm tracking-[0.3em] text-gray-400 mb-6">JOB OPENINGS</div>
            <h3 className="tracking-tight leading-[1.1] text-white" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              募集要項
            </h3>
          </div>

          {/* Job Details */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-12 lg:mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6 lg:space-y-8"
            >
              <div className="space-y-4">
                <h4 className="text-sm tracking-[0.2em] text-gray-400">募集職種</h4>
                <div className="space-y-2">
                  <p className="text-white text-base lg:text-lg">・携帯ショップスタッフ</p>
                  <p className="text-white text-base lg:text-lg">・イベントスタッフ・営業</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 lg:pt-8 border-t border-white/20">
                <h4 className="text-sm tracking-[0.2em] text-gray-400">募集対象</h4>
                <p className="text-white text-base lg:text-lg">学歴・職歴不問・業界未経験者</p>
              </div>

              <div className="space-y-4 pt-6 lg:pt-8 border-t border-white/20">
                <h4 className="text-sm tracking-[0.2em] text-gray-400">勤務地</h4>
                <p className="text-white text-base lg:text-lg">案件毎に異なります</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 lg:space-y-8"
            >
              <div className="space-y-4">
                <h4 className="text-sm tracking-[0.2em] text-gray-400">給与</h4>
                <p className="text-white text-base lg:text-lg mb-4">月収250,000円~（研修期間あり）</p>
                <div className="space-y-2 text-white/70 text-sm lg:text-base">
                  <p>・インセンティブ制度あり</p>
                  <p>・経験者優遇あり</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 lg:pt-8 border-t border-white/20">
                <h4 className="text-sm tracking-[0.2em] text-gray-400">勤務時間</h4>
                <p className="text-white text-base lg:text-lg">10時~19時</p>
              </div>

              <div className="space-y-4 pt-6 lg:pt-8 border-t border-white/20">
                <h4 className="text-sm tracking-[0.2em] text-gray-400">休暇・福利厚生</h4>
                <div className="space-y-2">
                  <p className="text-white text-base lg:text-lg">週休2日制</p>
                  <p className="text-white/70 text-sm lg:text-base">交通費支給 / 社会保険厚生年金あり</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Link to="/contact">
              <Button className="bg-black text-white hover:bg-zinc-800 px-8 lg:px-12 py-5 lg:py-6 text-sm lg:text-base group transition-all duration-300 hover:scale-105">
                応募する
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="relative bg-black text-white py-16 lg:py-48">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-32">
            
            {/* Left - Process Title */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              className="space-y-8 lg:space-y-16"
            >
              <h2 className="tracking-tight leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
                Join<br />
                Our<br />
                Team
              </h2>
            </motion.div>

            {/* Right - Steps */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0 : 0.2 }}
              className="space-y-8 lg:space-y-16"
            >
              <div>
                <div className="text-sm tracking-[0.3em] text-gray-400 mb-6">APPLICATION PROCESS</div>
                <h3 className="text-2xl lg:text-4xl mb-8 lg:mb-12 tracking-tight">応募方法</h3>
              </div>
              
              <div className="space-y-6 lg:space-y-8">
                <motion.div 
                  className="pl-6 border-l-2 border-white/20"
                  whileHover={{ x: isMobile ? 0 : 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-white/40 mb-2">STEP 1</p>
                  <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                    お問い合わせフォームまたはメールにてご連絡
                  </p>
                </motion.div>
                
                <motion.div 
                  className="pl-6 border-l-2 border-white/20"
                  whileHover={{ x: isMobile ? 0 : 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-white/40 mb-2">STEP 2</p>
                  <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                    カジュアル面談（オンライン可）
                  </p>
                </motion.div>

                <motion.div 
                  className="pl-6 border-l-2 border-white/20"
                  whileHover={{ x: isMobile ? 0 : 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-white/40 mb-2">STEP 3</p>
                  <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                    面接・選考
                  </p>
                </motion.div>
              </div>

              <p className="text-white/60 text-base lg:text-lg leading-relaxed pt-6 lg:pt-8">
                まずはカジュアルな面談から始めましょう。<br />
                ご応募いただいた方には、順次ご連絡させていただきます。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-950 text-white py-16 lg:py-48">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0.5 : 0.8 }}
          >
            <h2 className="mb-8 lg:mb-12 tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
              いい仕事を、<br className="sm:hidden" />いい仲間と。
            </h2>
            <p className="text-white/60 text-base lg:text-xl mb-10 lg:mb-16 leading-relaxed max-w-3xl mx-auto">
              HACSでは、常に新しいことに挑戦し、共に成長する仲間を募集しています
            </p>
            <Link to="/contact">
              <Button className="bg-white text-black hover:bg-gray-200 px-8 lg:px-12 py-5 lg:py-6 text-sm lg:text-base group transition-all duration-300 hover:scale-105">
                今すぐ応募する
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter />
    </div>
  );
}
