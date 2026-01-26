'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import logoImage from 'figma:asset/b1a5c51f651b9ab9e44642c4187dd4fe7aaf4ab9.png';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navItems = [
    { name: 'TOP', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Service', path: '/services' },
    { name: 'RECRUIT', path: '/recruit' },
    { name: 'MEMBER', path: '/member' },
    { name: 'CONTACT', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 bg-black text-white z-50 transition-all ${
          scrolled ? 'shadow-lg' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 h-16 sm:h-18 md:h-20 lg:h-24 xl:h-28">
          <Link href="/" className="flex items-center h-full py-3 sm:py-3.5 md:py-4">
            <img
              src={logoImage}
              alt=""
              className="h-10 sm:h-12 md:h-14 lg:h-20 xl:h-24 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center divide-x divide-white/20 text-sm lg:text-base xl:text-lg h-full">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path} 
                className={`px-4 lg:px-6 xl:px-8 h-full flex items-center hover:bg-white/5 transition-colors relative ${
                  pathname === item.path ? 'bg-white/10' : ''
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    layoutId="navbar-indicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-white/10 rounded transition-colors"
            aria-label="Toggle menu"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-black text-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/20">
                  <Link 
                    href="/" 
                    onClick={handleLinkClick}
                  >
                    <img
                      src={logoImage}
                      alt=""
                      className="h-10 sm:h-12 w-auto"
                    />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 py-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.path}
                        onClick={handleLinkClick}
                        className={`block px-8 py-4 text-lg border-l-4 transition-all ${
                          pathname === item.path
                            ? 'border-white bg-white/10 text-white'
                            : 'border-transparent hover:border-white/50 hover:bg-white/5 text-gray-300 hover:text-white'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-5 border-t border-white/10">
                  <p className="text-xs text-gray-400">© 2025 HACS. All rights reserved.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
