'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/b1a5c51f651b9ab9e44642c4187dd4fe7aaf4ab9.png';

export default function Footer() {
  const navItems = [
    { name: 'TOP', label: 'TOP', path: '/' },
    { name: 'About', label: 'About', path: '/about' },
    { name: 'Service', label: 'Service', path: '/services' },
    { name: 'RECRUIT', label: 'RECRUIT', path: '/recruit' },
    { name: 'MEMBER', label: 'MEMBER', path: '/member' },
    { name: 'CONTACT', label: 'CONTACT', path: '/contact' },
  ];

  return (
    <footer className="bg-black text-white py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img
              src={logoImage}
              alt=""
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto"
            />
          </Link>
          <div className="flex justify-center gap-2 md:gap-8 text-xs text-gray-400">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 text-center md:text-right whitespace-nowrap">
            © 2025 HACS. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}