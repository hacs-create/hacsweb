'use client';

import Link from 'next/link';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import SectionNav from './SectionNav';
import ParallaxImage from './ParallaxImage';
import heroImage from 'figma:asset/a346cb44a3f31a74ae796ef6447f53ba764e8d77.png';
import visionImage from 'figma:asset/3a7680e4429cfeeb0b4145e50c258cc82de6a1b4.png';
import servicesImage from 'figma:asset/22281648b1824481c17431de5e75a62d882f043b.png';
import memberImage from 'figma:asset/045b36442325168f99459618ece5745370a476f9.png';
import recruitImage from 'figma:asset/58d0bd504f5ac22e83b8e412ee754f293f080937.png';
import aboutDecorImage from 'figma:asset/e7e01b8a049d3f0bf54b9cdd09fdd4240da999df.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{ backgroundSize: '400% 400%' }}
        />
        
        {/* Floating 3D Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-white/30"
              style={{
                left: `${15 + i * 15}%`,
                top: `${10 + i * 12}%`,
                width: `${80 + i * 20}px`,
                height: `${80 + i * 20}px`,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
                rotateZ: [0, 180],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10">
        <SectionNav />
        
        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <motion.div 
            className="absolute inset-0 bg-black"
            style={{ y: heroY, scale: heroScale }}
          >
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="w-full h-full"
            >
              <ImageWithFallback
                src={heroImage}
                alt="合同会社HACSの先進的なオフィスビル外観 - 愛知県小牧市"
                className="w-full h-full object-cover opacity-40"
                priority
              />
            </motion.div>
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
          </motion.div>
          
          {/* Floating 3D Geometric Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute left-[15%] top-[20%] w-32 h-32 border-2 border-white/20 rounded-lg shadow-2xl"
            animate={{
              y: [0, -30, 0],
              rotateZ: [0, 180, 360],
              rotateY: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformStyle: 'preserve-3d' }}
          />
          <motion.div
            className="absolute right-[20%] bottom-[25%] w-24 h-24 border-2 border-white/15 rounded-lg shadow-2xl"
            animate={{
              y: [0, 40, 0],
              rotateZ: [360, 180, 0],
              rotateX: [0, 180, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformStyle: 'preserve-3d' }}
          />
          
          {/* Additional 3D Elements for depth */}
          <motion.div
            className="absolute left-[40%] top-[60%] w-40 h-40 border border-white/10 rounded-2xl"
            animate={{
              y: [0, -20, 0],
              rotateX: [0, 360],
              rotateZ: [0, 180],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformStyle: 'preserve-3d' }}
          />
          <motion.div
            className="absolute right-[35%] top-[35%] w-20 h-20 border-2 border-white/25 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotateY: [0, 360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformStyle: 'preserve-3d' }}
          />
        </div>

        {/* Content */}
        <motion.div 
          className="relative z-10 text-center px-6"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            className="text-white/80 mb-4 tracking-[0.3em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            合同会社HACS
          </motion.p>
          
          <motion.h1 
            className="text-white mb-12 leading-[0.9] tracking-tight" 
            style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            FOR THE TIMES
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              className="bg-white text-black hover:bg-white/90 px-12 py-6 text-base tracking-wider uppercase transition-all duration-300 hover:scale-105"
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              explore
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2"
          >
            <motion.div 
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section id="about" className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left - Vision with Image */}
        <div className="relative bg-black text-white overflow-hidden min-h-[60vh] lg:min-h-screen">
          <ParallaxImage
            src={visionImage}
            alt="HACSスタッフによるミーティング風景 - モバイル通信のプロフェッショナル"
            className="w-full h-full object-cover"
            speed={0.5}
          />
          <div className="relative h-full flex flex-col justify-start px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 lg:py-24">
            <motion.h2 
              className="tracking-tight leading-none mb-6 sm:mb-8" 
              style={{ fontSize: 'clamp(3rem, 12vw, 8rem)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              HACS
            </motion.h2>
          </div>
        </div>

        {/* Right - Who we are */}
        <div className="relative bg-gray-50 flex items-center px-5 sm:px-8 md:px-10 lg:px-12 xl:px-20 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden min-h-[60vh] lg:min-h-screen">
          <motion.div 
            className="max-w-xl relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h3 className="mb-5 sm:mb-6 md:mb-8 lg:mb-10 tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl">合同会社HACSは</h3>
            <p className="text-gray-700 mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl">
              常に新しいことにチャレンジし続けます。<br />
              若い世代が中心の会社で意欲的なスタッフが多く<br className="hidden sm:block" />
              そんなスタッフからの声、アイデアを実現出来るよう支援を惜しみません。<br />
              全てのスタッフがリーダーシップを持ち、 常に新しいことに挑み続ける会社です。
            </p>
            <Button asChild className="bg-slate-800 text-white hover:bg-slate-900 px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 lg:py-7">
              <Link href="/about">About us</Link>
            </Button>
          </motion.div>
          <div className="hidden md:block absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: -5,
              }}
              style={{ transformStyle: 'preserve-3d' }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <ImageWithFallback
                src={aboutDecorImage}
                alt="Communication device"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left - Our Services */}
        <div className="bg-white flex items-center px-5 sm:px-8 md:px-10 lg:px-12 xl:px-20 py-12 sm:py-16 md:py-20 lg:py-24 min-h-[60vh] lg:min-h-screen">
          <motion.div 
            className="max-w-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <p className="text-gray-700 mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl">
              HACSは、モバイル通信事業でお客様のビジネスをサポートします。<br />
              スマートフォンやタブレットを最大限に活用できる最適なモバイル通信環境を提案し、お客様のデジタル戦略を支援します。
            </p>
            <Link href="/services">
              <Button className="bg-slate-800 text-white hover:bg-slate-900 px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 lg:py-7">
                Explore services
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right - Services with Gradient */}
        <div className="relative bg-gradient-to-br from-purple-900 via-red-900 to-black text-white overflow-hidden min-h-[60vh] lg:min-h-screen">
          <ParallaxImage
            src={servicesImage}
            alt="快適な通信環境が整ったオフィス - ネットワークインフラ構築事例"
            className="w-full h-full object-cover"
            speed={0.3}
          />
          <div className="relative h-full flex flex-col justify-center px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 lg:py-24">
            <motion.h2 
              className="tracking-tight leading-none" 
              style={{ fontSize: 'clamp(3rem, 12vw, 8rem)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
            >
              Services
            </motion.h2>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left - Features */}
        <div className="bg-white flex items-center px-5 sm:px-8 md:px-10 lg:px-12 xl:px-20 py-12 sm:py-16 md:py-20 lg:py-24 min-h-[60vh] lg:min-h-screen">
          <motion.div 
            className="max-w-xl w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <motion.h2 
              className="tracking-tight leading-none mb-4 sm:mb-6" 
              style={{ 
                fontSize: 'clamp(4rem, 15vw, 10rem)',
                color: '#C4A572'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              FEATURE
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 sm:mb-12 md:mb-16"
            >
              <p className="text-xl sm:text-2xl md:text-3xl mb-2">だから選ばれる！</p>
              <p className="text-xl sm:text-2xl md:text-3xl">MAXHUBの特徴</p>
            </motion.div>

            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {[
                { number: '01', text: '直感的で使いやすいタッチパネル' },
                { number: '02', text: '高画質・高音質なビデオ会議' },
                { number: '03', text: '充実のアフターサポート' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.number}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 sm:gap-6"
                >
                  <span 
                    className="text-3xl sm:text-4xl md:text-5xl flex-shrink-0"
                    style={{ color: '#C4A572' }}
                  >
                    {feature.number}
                  </span>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl pt-2">{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right - Conference Room Image */}
        <div className="relative bg-gray-100 overflow-hidden min-h-[60vh] lg:min-h-screen">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1761388559873-40bfb05f39e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwcm9vbSUyMGRpc3BsYXl8ZW58MXx8fHwxNzYxNzM1MDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="MAXHUB導入済みの会議室 - 高画質ビデオ会議システム"
            className="w-full h-full object-cover"
            speed={0.4}
          />
        </div>
      </section>

      {/* Member Section */}
      <section id="member" className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left - Member with Gradient */}
        <div className="relative bg-gradient-to-br from-blue-900 via-cyan-900 to-black text-white overflow-hidden min-h-[60vh] lg:min-h-screen">
          <ParallaxImage
            src={memberImage}
            alt="モバイル通信のプロフェッショナルチーム - 専門知識を持つHACSメンバー"
            className="w-full h-full object-cover"
            speed={0.4}
          />
          <div className="relative h-full flex flex-col justify-center px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 lg:py-24">
            <motion.h2 
              className="tracking-tight leading-none" 
              style={{ fontSize: 'clamp(3rem, 12vw, 8rem)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
            >
              MEMBER
            </motion.h2>
          </div>
        </div>

        {/* Right - Our Work */}
        <div className="bg-gray-50 flex items-center px-5 sm:px-8 md:px-10 lg:px-12 xl:px-20 py-12 sm:py-16 md:py-20 lg:py-24 min-h-[60vh] lg:min-h-screen">
          <motion.div 
            className="max-w-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h3 className="mb-5 sm:mb-6 md:mb-8 lg:mb-10 tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl">Who we are</h3>
            <p className="text-gray-700 mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl">
              HACSのチームは、モバイル通信の分野で豊富な経験と専門知識を持つプロフェッショナルで構成されています。<br />
              一人ひとりがお客様の課題に真摯に向き合い、最適なソリューションを提供します。<br />
              私たちの強みは、確かな技術力と、 お客様のビジネス成長に貢献したいという強い想いです。
            </p>
            <Button asChild className="bg-slate-800 text-white hover:bg-slate-900 px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 lg:py-7">
              <Link href="/member">About Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left - Get in Touch */}
        <div className="bg-white flex items-center px-5 sm:px-8 md:px-10 lg:px-12 xl:px-20 py-12 sm:py-16 md:py-20 lg:py-24 min-h-[60vh] lg:min-h-screen">
          <motion.div 
            className="max-w-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <p className="text-gray-700 mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl">
              常に新しいことに挑戦し、 共に成長する仲間を募集します。
HACSは、モバイル通信事業を通じて、新しい価値を創造しています。 変化の速いIT業界で、自分のアイデアを形にし、 お客様に喜ばれる仕事をしたい方、 私たちと一緒に働きませんか。
            </p>

            <Button asChild className="bg-slate-800 text-white hover:bg-slate-900 px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 lg:py-7">
              <Link href="/recruit">Reserve your spot</Link>
            </Button>
          </motion.div>
        </div>

        {/* Right - Contact with Gradient */}
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden min-h-[60vh] lg:min-h-screen">
          <ParallaxImage
            src={recruitImage}
            alt="お客様との商談・打ち合わせ風景 - 信頼と実績"
            className="w-full h-full object-cover"
            speed={0.35}
          />
          <div className="relative h-full flex flex-col justify-end items-end px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 lg:py-24">
            <motion.h2 
              className="tracking-tight leading-none mb-6 sm:mb-8" 
              style={{ fontSize: 'clamp(3rem, 12vw, 8rem)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
            >
              RECRUIT
            </motion.h2>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}