import image_f1d68b78eae3971897b77e43f53a2fa28ae4ce85 from 'figma:asset/f1d68b78eae3971897b77e43f53a2fa28ae4ce85.png';
import image_47ebd10be54fe3d116ae081f39dd4865eaa3acaa from 'figma:asset/47ebd10be54fe3d116ae081f39dd4865eaa3acaa.png';
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Mail, Phone, Menu, X, Instagram, ChevronDown } from 'lucide-react';
import { Button } from './components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import ServicesPage from './components/ServicesPage';
import RecruitPage from './components/RecruitPage';
import AboutPage from './components/AboutPage';
import MemberPage from './components/MemberPage';
import ContactPage from './components/ContactPage';
import { ScrollToTop } from './components/ScrollToTop';
import { SharedHeader } from './components/SharedHeader';
import { DiagonalSection } from './components/DiagonalSection';
import { ChatBot } from './components/ChatBot';
import { LoadingAnimation } from './components/LoadingAnimation';
import { Grid3DBackground } from './components/Grid3DBackground';
import { SEOHelmet, pageSEO } from './components/SEOHelmet';
import heroImage from 'figma:asset/a346cb44a3f31a74ae796ef6447f53ba764e8d77.png';
import visionImage from 'figma:asset/3a7680e4429cfeeb0b4145e50c258cc82de6a1b4.png';
import servicesImage from 'figma:asset/22281648b1824481c17431de5e75a62d882f043b.png';
import memberImage from 'figma:asset/045b36442325168f99459618ece5745370a476f9.png';
import recruitImage from 'figma:asset/58d0bd504f5ac22e83b8e412ee754f293f080937.png';
import logoImage from 'figma:asset/8ecf9fade5c5b8425af9dc6b59f1ad13676529bf.png';
import footerLogoImage from 'figma:asset/b1a5c51f651b9ab9e44642c4187dd4fe7aaf4ab9.png';
import './styles/globals.css';

import AdminPage from './components/AdminPage';
import { SharedFooter } from './components/SharedFooter';

// モバイル検出用カスタムフック
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

function HomePage() {
  const isMobile = useIsMobile();
  return (
    <div className="scroll-snap-container relative overflow-hidden">
      <SEOHelmet {...pageSEO.home} googleSiteVerification="fMMN8eyrhrgdPheVaSNDxHu4KScbm-5JVe5icnJPVVk" />
      {/* 3D Grid Background - デスクトップのみ */}
      {!isMobile && <Grid3DBackground />}
      
      {/* モバイル用シンプル背景 */}
      {isMobile && (
        <div className="fixed inset-0 z-0 pointer-events-none bg-black" />
      )}

      <div className="relative z-10">
      {/* Hero Section - Modern Asymmetric Design */}
      <section id="hero" className="scroll-snap-section relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with Dark Overlay */}
        <div className="absolute inset-0 bg-black">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-70"
            >
              <source src="https://whwjpuftcwwfetnflwjb.supabase.co/storage/v1/object/public/hacsvideo/hacs.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
        </div>
        
        {/* Floating 3D Geometric Elements - デスクトップのみ */}
        {!isMobile && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute left-[10%] top-[15%] w-40 h-40 border border-white/10"
              animate={{
                y: [0, -40, 0],
                rotateZ: [0, 180, 360],
                rotateX: [0, 360],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
            <motion.div
              className="absolute right-[15%] bottom-[20%] w-32 h-32 border border-white/15"
              animate={{
                y: [0, 50, 0],
                rotateZ: [360, 180, 0],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
            
            <motion.div
              className="absolute left-[35%] top-[70%] w-24 h-24 border border-white/20 rounded-lg"
              animate={{
                y: [0, -30, 0],
                rotateX: [0, 180, 360],
                rotateZ: [0, 180, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
            <motion.div
              className="absolute right-[40%] top-[25%] w-16 h-16 border-2 border-white/30 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
          </div>
        )}

        {/* Content - Left Aligned, Modern Typography */}
        <div className="relative z-10 px-6 lg:px-20 max-w-[1600px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm tracking-[0.3em] text-white/60 mb-8"
            >
              {(() => {
                const [displayedText, setDisplayedText] = useState('');
                const fullText = '合同会社HACS';
                
                useEffect(() => {
                  // モバイルではタイプライター効果をスキップ
                  if (isMobile) {
                    setDisplayedText(fullText);
                    return;
                  }
                  
                  let index = 0;
                  const timer = setTimeout(() => {
                    const interval = setInterval(() => {
                      if (index <= fullText.length) {
                        setDisplayedText(fullText.slice(0, index));
                        index++;
                      } else {
                        clearInterval(interval);
                      }
                    }, 100);
                    return () => clearInterval(interval);
                  }, 200);
                  return () => clearTimeout(timer);
                }, []);
                
                return displayedText;
              })()}
            </motion.div>
            
            <motion.h1 
              className="text-white mb-12 leading-[0.85] tracking-tighter" 
              style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {(() => {
                const [displayedText, setDisplayedText] = useState('');
                const fullText = 'FOR THE TIMES.';
                
                useEffect(() => {
                  // モバイルではタイプライター効果をスキップ
                  if (isMobile) {
                    setDisplayedText(fullText);
                    return;
                  }
                  
                  let index = 0;
                  const timer = setTimeout(() => {
                    const interval = setInterval(() => {
                      if (index <= fullText.length) {
                        setDisplayedText(fullText.slice(0, index));
                        index++;
                      } else {
                        clearInterval(interval);
                      }
                    }, 80);
                    return () => clearInterval(interval);
                  }, 1000);
                  return () => clearTimeout(timer);
                }, []);
                
                return displayedText;
              })()}
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isMobile ? '80px' : '120px' }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="h-px bg-white/50 mb-12"
            />
            
            <motion.p
              className="text-white/90 text-lg lg:text-2xl max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {(() => {
                const [displayedText, setDisplayedText] = useState('');
                const fullText = '時代が求める価値を、HACSから。';
                
                useEffect(() => {
                  // モバイルではタイプライター効果をスキップ
                  if (isMobile) {
                    setDisplayedText(fullText);
                    return;
                  }
                  
                  let index = 0;
                  const timer = setTimeout(() => {
                    const interval = setInterval(() => {
                      if (index <= fullText.length) {
                        setDisplayedText(fullText.slice(0, index));
                        index++;
                      } else {
                        clearInterval(interval);
                      }
                    }, 80);
                    return () => clearInterval(interval);
                  }, 2200);
                  return () => clearTimeout(timer);
                }, []);
                
                return displayedText;
              })()}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About Section - Modern Asymmetric Design */}
      <section id="about" className="scroll-snap-section relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* 3D Floating Elements - Desktop only */}
        {!isMobile && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute left-[20%] top-[20%] w-64 h-64 border border-white/5"
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 180],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
            <motion.div
              className="absolute right-[10%] bottom-[15%] w-48 h-48 border-2 border-white/10 rounded-full"
              animate={{
                rotateZ: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
          </div>
        )}

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-20 w-full py-16 lg:py-32" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-24 items-center">
            {/* Left - Massive Typography */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              className="text-white order-2 lg:order-1"
            >
              {/* Large Number as Design Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[10rem] lg:text-[30rem] leading-none tracking-tighter text-white/5 mb-[-3rem] lg:mb-[-12rem]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                01
              </motion.div>
              
              <h2 className="tracking-tighter leading-[0.9] mb-6 lg:mb-12" style={{ fontSize: 'clamp(3rem, 10vw, 12rem)' }}>
                About
              </h2>
              
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: isMobile ? '60px' : '120px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-px bg-white/30 mb-6 lg:mb-12"
              />
              
              <motion.div whileHover={{ scale: isMobile ? 1 : 1.05 }} transition={{ duration: 0.3 }}>
                <Button asChild className="bg-white text-black hover:bg-gray-200 px-6 lg:px-12 py-4 lg:py-8 text-sm lg:text-lg transition-all duration-300">
                  <Link to="/about">詳しく見る</Link>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4 lg:space-y-6 text-white/70 text-sm lg:text-base leading-relaxed mt-6 lg:mt-10"
              >
                <p>HACS は "Honesty（誠実）・Ambition（大望）・Creative（独創的）・Shing（新しい／芯を持つ）" の頭文字から生まれました。</p>
                <p>誠実さを原点に、若い感性と確かな実行力で企業の課題に向き合い共に成長するパートナーを目指します。</p>
                <p>通信・人材・ITサポートなど多様な分野で、柔軟かつ迅速に対応し、常に「信頼と挑戦」を軸に時代の一歩先を見据えたサービスを提供します。</p>
              </motion.div>
            </motion.div>

            {/* Right - Image Only */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0 : 0.2 }}
              className="order-1 lg:order-2"
            >
              <motion.div
                whileHover={{ scale: isMobile ? 1 : 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[16/10] overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                <ImageWithFallback
                  src={visionImage}
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Modern Asymmetric Design */}
      <section id="services" className="scroll-snap-section relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* 3D Floating Elements - Desktop only */}
        {!isMobile && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute right-[18%] top-[22%] w-60 h-60 border border-white/5"
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 180],
                y: [0, -40, 0],
              }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
            <motion.div
              className="absolute left-[12%] bottom-[18%] w-44 h-44 border-2 border-white/10 rounded-full"
              animate={{
                rotateZ: [0, 360],
                scale: [1, 1.25, 1],
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
          </div>
        )}

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-20 w-full py-16 lg:py-32" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-24 items-center">
            {/* Left - Massive Typography */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              className="text-white order-2 lg:order-1"
            >
              {/* Large Number as Design Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[10rem] lg:text-[30rem] leading-none tracking-tighter text-white/5 mb-[-3rem] lg:mb-[-12rem]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                02
              </motion.div>
              
              <h2 className="tracking-tighter leading-[0.9] mb-6 lg:mb-12" style={{ fontSize: 'clamp(3rem, 10vw, 12rem)' }}>
                Service
              </h2>
              
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: isMobile ? '60px' : '120px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-px bg-white/30 mb-6 lg:mb-12"
              />
              
              <motion.div whileHover={{ scale: isMobile ? 1 : 1.05 }} transition={{ duration: 0.3 }}>
                <Button asChild className="bg-white text-black hover:bg-gray-200 px-6 lg:px-12 py-4 lg:py-8 text-sm lg:text-lg transition-all duration-300">
                  <Link to="/services">サービス詳細</Link>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4 lg:space-y-6 text-white/70 text-sm lg:text-base leading-relaxed mt-6 lg:mt-10"
              >
                <p>モバイル通信のプロフェッショナルとして、お客様のビジネスを全力でサポートします</p>
                <p>HACSは、モバイル通信事業でお客様のビジネスをサポートします。</p>
                <p>スマートフォンやタブレットを最大限に活用できる最適なモバイル通信環境を提案し、お客様のデジタル戦略を支援します。</p>
              </motion.div>
            </motion.div>

            {/* Right - Image Only */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0 : 0.2 }}
              className="order-1 lg:order-2"
            >
              <motion.div
                whileHover={{ scale: isMobile ? 1 : 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[16/10] overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                <ImageWithFallback
                  src={servicesImage}
                  alt="Business office workspace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OLD SECTION BELOW - TO BE REMOVED */}
      <section id="services-old" className="scroll-snap-section relative min-h-screen flex items-center justify-center bg-black" style={{display: 'none'}}>
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-25"
          >
            <source src="https://videos.pexels.com/video-files/3141210/3141210-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-zinc-900/70"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: isMobile ? 0.4 : 0.8 }}
              className="text-white lg:order-1"
            >
              <div className="text-sm text-gray-500 mb-4 tracking-widest">02</div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-8 tracking-tight leading-tight">Service</h2>
              <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
                <p>HACSは、モバイル通信事業でお客様のビジネスをサポートします</p>
                <p>スマートフォンやタブレットを最大限に活用できる最適なモバイル信環境を提案し、お客様のデジタル戦略を支援します。</p>
              </div>
              <Button asChild className="mt-8 bg-white text-black hover:bg-gray-200 px-8 py-6 text-base">
                <Link to="/services">サービス詳細</Link>
              </Button>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0 : 0.2 }}
              className="relative aspect-[4/3] overflow-hidden lg:order-2"
            >
              <ImageWithFallback
                src={servicesImage}
                alt="Business office workspace"
                className="w-full h-full object-cover transition-all duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Member Section - Modern Asymmetric Design with Video */}
      <section id="member" className="scroll-snap-section relative min-h-screen flex items-center bg-black overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-15 grayscale"
          >
            <source src="https://videos.pexels.com/video-files/3130182/3130182-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* 3D Floating Elements - Desktop only */}
        {!isMobile && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute right-[25%] top-[25%] w-56 h-56 border border-white/5"
              animate={{
                rotateY: [0, 360],
                rotateZ: [0, 180],
                x: [0, 40, 0],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
            <motion.div
              className="absolute left-[15%] bottom-[20%] w-40 h-40 border-2 border-white/10"
              animate={{
                rotateX: [0, 360],
                y: [0, -60, 0],
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
          </div>
        )}

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-20 w-full py-16 lg:py-32" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-24 items-center">
            {/* Left - Massive Typography */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              className="text-white order-2 lg:order-1"
            >
              {/* Large Number as Design Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[10rem] lg:text-[30rem] leading-none tracking-tighter text-white/5 mb-[-3rem] lg:mb-[-12rem]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                03
              </motion.div>
              
              <h2 className="tracking-tighter leading-[0.9] mb-6 lg:mb-12" style={{ fontSize: 'clamp(3rem, 10vw, 12rem)' }}>
                Member
              </h2>
              
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: isMobile ? '60px' : '120px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-px bg-white/30 mb-6 lg:mb-12"
              />
              
              <motion.div whileHover={{ scale: isMobile ? 1 : 1.05 }} transition={{ duration: 0.3 }}>
                <Button asChild className="bg-white text-black hover:bg-gray-200 px-6 lg:px-12 py-4 lg:py-8 text-sm lg:text-lg transition-all duration-300">
                  <Link to="/member">メンバー紹介</Link>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4 lg:space-y-6 text-white/70 text-sm lg:text-base leading-relaxed mt-6 lg:mt-10"
              >
                <p>豊富な経験と専門知識を持つプロフェッショナルチームをご紹介します</p>
                <p>HACSのチームは、モバイル通信の分野で豊富な経験と専門知識を持つプロフェッショナルで構成されています。</p>
                <p>一人ひとりがお客様の課題に真摯に向き合い、最適なソリューションを提供します。</p>
                <p>私たちの強みは、確かな技術力と、お客様のビジネス成長に貢献したいという強い想いです。</p>
              </motion.div>
            </motion.div>

            {/* Right - Image Only */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0 : 0.2 }}
              className="order-1 lg:order-2"
            >
              <motion.div
                whileHover={{ scale: isMobile ? 1 : 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[4/5] overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                <ImageWithFallback
                  src={image_47ebd10be54fe3d116ae081f39dd4865eaa3acaa}
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recruit Section - Modern Asymmetric Design */}
      <section id="recruit" className="scroll-snap-section relative min-h-screen flex items-center bg-black overflow-hidden">
        {/* 3D Floating Elements - Desktop only */}
        {!isMobile && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute left-[18%] top-[18%] w-72 h-72 border border-white/5"
              animate={{
                rotateX: [0, 360],
                rotateZ: [0, 180],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 26,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
            <motion.div
              className="absolute right-[12%] bottom-[18%] w-52 h-52 border-2 border-white/10 rounded-full"
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
          </div>
        )}

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-20 w-full py-16 lg:py-32" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-24 items-center">
            {/* Left - Massive Typography */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              className="text-white order-2 lg:order-1"
            >
              {/* Large Number as Design Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[10rem] lg:text-[30rem] leading-none tracking-tighter text-white/5 mb-[-3rem] lg:mb-[-12rem]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                04
              </motion.div>
              
              <h2 className="tracking-tighter leading-[0.9] mb-6 lg:mb-12" style={{ fontSize: 'clamp(3rem, 10vw, 12rem)' }}>
                Recruit
              </h2>
              
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: isMobile ? '60px' : '120px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-px bg-white/30 mb-6 lg:mb-12"
              />
              
              <motion.div whileHover={{ scale: isMobile ? 1 : 1.05 }} transition={{ duration: 0.3 }}>
                <Button asChild className="bg-white text-black hover:bg-gray-200 px-6 lg:px-12 py-4 lg:py-8 text-sm lg:text-lg transition-all duration-300">
                  <Link to="/recruit">採用情報を見る</Link>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4 lg:space-y-6 text-white/70 text-sm lg:text-base leading-relaxed mt-6 lg:mt-10"
              >
                <p>共に成長し、新しい価値を創造する仲間を募集しています</p>
                <p>常に新しいことに挑戦し、共に成長する仲間を募集します。</p>
                <p>HACSは、モバイル通信事業を通じて、新しい価値を創造しています。</p>
                <p>変化の速いIT業界で、自分のアイデアを形にし、お客様に喜ばれる仕事をしたい方、私たちと一緒に働きませんか。</p>
              </motion.div>
            </motion.div>

            {/* Right - Image Only */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0 : 0.2 }}
              className="order-1 lg:order-2"
            >
              <motion.div
                whileHover={{ scale: isMobile ? 1 : 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[16/10] overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                <ImageWithFallback
                  src={image_f1d68b78eae3971897b77e43f53a2fa28ae4ce85}
                  alt="Professional office meeting"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter />
      </div>
    </div>
  );
}

// Page Transition Wrapper Component
function AnimatedRoutes() {
  const location = useLocation();
  
  const isMobile = useIsMobile();
  
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: isMobile ? 1 : 0.98,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: isMobile ? 1 : 1.02,
    }
  };

  const pageTransition = {
    duration: isMobile ? 0.3 : 0.5,
    ease: [0.4, 0, 0.2, 1]
  };
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <HomePage />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AboutPage />
          </motion.div>
        } />
        <Route path="/services" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ServicesPage />
          </motion.div>
        } />
        <Route path="/recruit" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <RecruitPage />
          </motion.div>
        } />
        <Route path="/member" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <MemberPage />
          </motion.div>
        } />
        <Route path="/contact" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ContactPage />
          </motion.div>
        } />
        <Route path="/admin" element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AdminPage />
          </motion.div>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  // Google Search Console確認用メタタグを全ページに追加 + NOINDEX を強制削除
  useEffect(() => {
    // 🚨 重要：NOINDEX メタタグを強制削除（大文字・小文字両対応）
    const removeNoindexTag = () => {
      // すべての robots メタタグを削除
      const allRobotsTags = document.querySelectorAll('meta[name="robots"], meta[name="ROBOTS"]');
      allRobotsTags.forEach(tag => {
        const content = tag.getAttribute('content');
        if (content) {
          const contentLower = content.toLowerCase();
          if (contentLower.includes('noindex')) {
            console.warn('⚠️ NOINDEX タグを検出しました。削除します:', content, tag);
            tag.remove();
          }
        }
      });
      
      // title メタタグも削除（Figma Makeが追加する不要なタグ）
      const titleMetaTags = document.querySelectorAll('meta[name="title"]');
      titleMetaTags.forEach(tag => {
        console.warn('⚠️ 不要な title メタタグを削除します:', tag);
        tag.remove();
      });
      
      // 正しい robots メタタグを追加
      let robotsMeta = document.querySelector('meta[name="robots"]');
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.insertBefore(robotsMeta, document.head.firstChild); // 最初に配置
      }
      robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      robotsMeta.removeAttribute('id'); // Figma Makeが追加するIDを削除
      console.log('✅ robots メタタグを設定しました: index, follow');
      
      // Googlebot 専用のメタタグも追加
      let googlebotMeta = document.querySelector('meta[name="googlebot"]');
      if (!googlebotMeta) {
        googlebotMeta = document.createElement('meta');
        googlebotMeta.setAttribute('name', 'googlebot');
        document.head.insertBefore(googlebotMeta, document.head.firstChild); // 最初に配置
      }
      googlebotMeta.setAttribute('content', 'index, follow');
      googlebotMeta.removeAttribute('id'); // Figma Makeが追加するIDを削除
      console.log('✅ googlebot メタタグを設定しました: index, follow');
    };
    
    // 即座に実行
    removeNoindexTag();
    
    // 複数回実行（Figma Makeのスクリプトより後に実行されるように）
    setTimeout(removeNoindexTag, 50);
    setTimeout(removeNoindexTag, 100);
    setTimeout(removeNoindexTag, 300);
    setTimeout(removeNoindexTag, 500);
    setTimeout(removeNoindexTag, 1000);
    
    // MutationObserver でメタタグの変更を監視
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          const robotsTags = document.querySelectorAll('meta[name="robots"], meta[name="ROBOTS"]');
          robotsTags.forEach(tag => {
            const content = tag.getAttribute('content');
            if (content && content.toLowerCase().includes('noindex')) {
              console.warn('⚠️ MutationObserver: NOINDEX タグを再検出。削除します:', content);
              removeNoindexTag();
            }
          });
        }
      });
    });
    
    // head 要素の変更を監視
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['content']
    });
    
    // Google Site Verification メタタグが存在しない場合のみ追加
    const existingMeta = document.querySelector('meta[name="google-site-verification"]');
    if (!existingMeta) {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'google-site-verification');
      meta.setAttribute('content', 'fMMN8eyrhrgdPheVaSNDxHu4KScbm-5JVe5icnJPVVk');
      document.head.appendChild(meta);
      console.log('✅ Google Search Console verification meta tag added');
    }
    
    // クリーンアップ
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Router>
      <LoadingAnimation />
      <ScrollToTop />
      <SharedHeader />
      <AnimatedRoutes />
      <ChatBot />
    </Router>
  );
}