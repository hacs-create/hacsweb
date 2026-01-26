import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import footerLogoImage from 'figma:asset/b1a5c51f651b9ab9e44642c4187dd4fe7aaf4ab9.png';

// Motion Link component
const MotionLink = motion.create(Link);
const MotionButton = motion.button;

export function SharedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // ページ遷移時にメニューを閉じる
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // ロゴクリックハンドラー
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // 通常のナビゲーション
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black/60 backdrop-blur-md text-white z-50 border-b border-white/5">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 lg:px-20 h-20 lg:h-28">
          <div 
            onClick={handleLogoClick}
            className="flex items-center h-full py-4 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img src={footerLogoImage} alt="HACS" className="h-12 lg:h-20 w-auto" />
          </div>
          
          {/* Desktop Navigation - Split Text Design */}
          <div className="hidden lg:flex items-center gap-10 xl:gap-14">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="text-white relative group overflow-hidden"
            >
              <div className="flex flex-col items-center gap-0.5 transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-xs tracking-wider opacity-90">TOP</span>
                <span className="text-[10px] tracking-wide opacity-50">トップ</span>
              </div>
              <span className="absolute bottom-[-4px] left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </button>
            <Link 
              to="/about" 
              className="text-white relative group overflow-hidden"
            >
              <div className="flex flex-col items-center gap-0.5 transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-xs tracking-wider opacity-90">About</span>
                <span className="text-[10px] tracking-wide opacity-50">会社概要</span>
              </div>
              <span className="absolute bottom-[-4px] left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              to="/services" 
              className="text-white relative group overflow-hidden"
            >
              <div className="flex flex-col items-center gap-0.5 transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-xs tracking-wider opacity-90">Service</span>
                <span className="text-[10px] tracking-wide opacity-50">サービス</span>
              </div>
              <span className="absolute bottom-[-4px] left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              to="/recruit" 
              className="text-white relative group overflow-hidden"
            >
              <div className="flex flex-col items-center gap-0.5 transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-xs tracking-wider opacity-90">Recruit</span>
                <span className="text-[10px] tracking-wide opacity-50">採用</span>
              </div>
              <span className="absolute bottom-[-4px] left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              to="/member" 
              className="text-white relative group overflow-hidden"
            >
              <div className="flex flex-col items-center gap-0.5 transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-xs tracking-wider opacity-90">Member</span>
                <span className="text-[10px] tracking-wide opacity-50">メンバー</span>
              </div>
              <span className="absolute bottom-[-4px] left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              to="/contact" 
              className="text-white relative group overflow-hidden ml-4"
            >
              <div className="flex flex-col items-center gap-0.5 transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-xs tracking-wider opacity-90">CONTACT</span>
                <span className="text-[10px] tracking-wide opacity-50">お問い合わせ</span>
              </div>
              <span className="absolute bottom-[-4px] left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Fullscreen with Grid Pattern */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black z-50 lg:hidden overflow-y-auto"
            style={{ 
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          >
            {/* Animated Grid Lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="h-full w-px bg-gradient-to-b from-transparent via-white to-transparent absolute left-1/4" />
                <div className="h-full w-px bg-gradient-to-b from-transparent via-white to-transparent absolute left-2/4" />
                <div className="h-full w-px bg-gradient-to-b from-transparent via-white to-transparent absolute left-3/4" />
              </motion.div>
            </div>

            <motion.div
              initial={{ clipPath: "circle(0% at 100% 0%)" }}
              animate={{ clipPath: "circle(150% at 100% 0%)" }}
              exit={{ clipPath: "circle(0% at 100% 0%)" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="relative h-full text-white"
            >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-6">
                <motion.div 
                  onClick={handleLogoClick}
                  className="cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <img src={footerLogoImage} alt="HACS" className="h-12 w-auto" />
                </motion.div>
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                  aria-label="Close menu"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Menu Items - Centered */}
              <motion.div 
                className="flex-1 flex items-center justify-center px-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.4
                    }
                  }
                }}
              >
                <div className="space-y-2 w-full max-w-md">
                  <motion.button 
                    onClick={() => { scrollToSection('hero'); setIsMenuOpen(false); }} 
                    className="block w-full text-left group"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="border-b border-white/10 pb-4 pt-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-4xl tracking-tight text-white group-hover:text-gray-300 transition-colors">
                          TOP
                        </span>
                        <span className="text-sm text-gray-400">トップ</span>
                      </div>
                    </div>
                  </motion.button>

                  <MotionLink 
                    to="/about" 
                    onClick={() => setIsMenuOpen(false)} 
                    className="block w-full group"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="border-b border-white/10 pb-4 pt-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-4xl tracking-tight text-white group-hover:text-gray-300 transition-colors">
                          About
                        </span>
                        <span className="text-sm text-gray-400">会社概要</span>
                      </div>
                    </div>
                  </MotionLink>

                  <MotionLink 
                    to="/services" 
                    onClick={() => setIsMenuOpen(false)} 
                    className="block w-full group"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="border-b border-white/10 pb-4 pt-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-4xl tracking-tight text-white group-hover:text-gray-300 transition-colors">
                          Service
                        </span>
                        <span className="text-sm text-gray-400">サービス</span>
                      </div>
                    </div>
                  </MotionLink>

                  <MotionLink 
                    to="/member" 
                    onClick={() => setIsMenuOpen(false)} 
                    className="block w-full group"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="border-b border-white/10 pb-4 pt-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-4xl tracking-tight text-white group-hover:text-gray-300 transition-colors">
                          Member
                        </span>
                        <span className="text-sm text-gray-400">メンバー</span>
                      </div>
                    </div>
                  </MotionLink>

                  <MotionLink 
                    to="/recruit" 
                    onClick={() => setIsMenuOpen(false)} 
                    className="block w-full group"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="border-b border-white/10 pb-4 pt-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-4xl tracking-tight text-white group-hover:text-gray-300 transition-colors">
                          Recruit
                        </span>
                        <span className="text-sm text-gray-400">採用</span>
                      </div>
                    </div>
                  </MotionLink>

                  <MotionLink 
                    to="/contact" 
                    onClick={() => setIsMenuOpen(false)} 
                    className="block w-full group"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="border-b border-white/10 pb-4 pt-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-4xl tracking-tight text-white group-hover:text-gray-300 transition-colors">
                          CONTACT
                        </span>
                        <span className="text-sm text-gray-400">お問い合わせ</span>
                      </div>
                    </div>
                  </MotionLink>
                </div>
              </motion.div>

              {/* Footer Info */}
              <motion.div
                className="px-6 py-6 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
              >
                <p className="text-xs text-gray-400 tracking-wider">
                  合同会社HACS<br />
                  〒485-0036 愛知県小牧市
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
