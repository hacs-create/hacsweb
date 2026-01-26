import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';
import footerLogoImage from 'figma:asset/b1a5c51f651b9ab9e44642c4187dd4fe7aaf4ab9.png';

export function SharedFooter() {
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      navigate('/admin');
      setClickCount(0);
    }
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 mb-12">
          {/* Left - Logo */}
          <div className="lg:flex-shrink-0">
            <img 
              src={footerLogoImage} 
              alt="HACS" 
              className="h-16 lg:h-20 w-auto cursor-pointer" 
              onClick={handleLogoClick}
            />
          </div>

          {/* Right - 3 Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 lg:ml-auto">
            {/* COMPANY */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-white mb-4 pb-2 border-b border-white/20 tracking-wider">COMPANY</h3>
              <div className="space-y-2 text-gray-400 text-sm leading-relaxed">
                <p>合同会社HACS</p>
                <p>〒485-0036<br />愛知県小牧市下小針天神2丁目2<br />ESPRESSO小牧2C</p>
                <p>設立：2023年11月14日</p>
              </div>
            </motion.div>

            {/* NAVIGATION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-white mb-4 pb-2 border-b border-white/20 tracking-wider">NAVIGATION</h3>
              <nav className="space-y-2 text-gray-400 text-sm">
                <Link to="/about" className="block hover:text-white transition-colors group">
                  <span className="relative">
                    会社概要
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
                <Link to="/services" className="block hover:text-white transition-colors group">
                  <span className="relative">
                    サービス
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
                <Link to="/member" className="block hover:text-white transition-colors group">
                  <span className="relative">
                    メンバー
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
                <Link to="/recruit" className="block hover:text-white transition-colors group">
                  <span className="relative">
                    採用
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
                <Link to="/contact" className="block hover:text-white transition-colors group">
                  <span className="relative">
                    お問い合わせ
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </nav>
            </motion.div>

            {/* CONNECT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-white mb-4 pb-2 border-b border-white/20 tracking-wider">CONNECT</h3>
              <div className="space-y-3">
                <a 
                  href="mailto:info@h-a-c.com" 
                  className="block text-gray-400 hover:text-white transition-colors text-sm group"
                >
                  <span className="relative">
                    info@h-a-c-s.com
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
                <a 
                  href="https://www.instagram.com/hacsbiz.jp/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 text-sm group"
                >
                  <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="relative">
                    Instagram
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-xs">
          <p>Copyright © 2025 HACS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}