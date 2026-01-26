'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const sections = [
  { id: 'hero', label: 'Top' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Service' },
  { id: 'member', label: 'Member' },
  { id: 'contact', label: 'Recruit' },
];

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 64; // Navigation height
      const targetPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.div
      className="fixed right-3 sm:right-4 md:right-6 lg:right-8 xl:right-12 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <div className="flex flex-col gap-3 lg:gap-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center gap-3"
          >
            {/* Label */}
            <motion.span
              className="absolute right-full mr-3 lg:mr-4 text-xs lg:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-2 lg:px-3 py-1"
              initial={false}
            >
              {section.label}
            </motion.span>

            {/* Dot */}
            <div className="relative flex items-center justify-center">
              <motion.div
                className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full border-2 transition-all ${
                  activeSection === section.id
                    ? 'border-black bg-black scale-125'
                    : 'border-gray-400 bg-transparent group-hover:border-black'
                }`}
                animate={{
                  scale: activeSection === section.id ? 1.25 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Line connector */}
              {index < sections.length - 1 && (
                <div className="absolute top-full w-0.5 h-6 lg:h-8 bg-gray-300 left-1/2 -translate-x-1/2" />
              )}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
