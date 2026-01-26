import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface DiagonalSectionProps {
  id: string;
  sectionNumber: string;
  title: string;
  description: React.ReactNode;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  backgroundColor: string;
  imagePosition: 'left' | 'right';
  isMobile: boolean;
}

export function DiagonalSection({
  id,
  sectionNumber,
  title,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt,
  backgroundColor,
  imagePosition,
  isMobile,
}: DiagonalSectionProps) {
  const isImageLeft = imagePosition === 'left';
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [50, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-30, 30]);
  
  return (
    <section id={id} className={`scroll-snap-section relative min-h-screen flex items-center justify-center ${backgroundColor}`}>
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="https://videos.pexels.com/video-files/3141210/3141210-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 w-full py-20">
        <div className={`grid ${isImageLeft ? 'lg:grid-cols-[1.1fr_0.9fr]' : 'lg:grid-cols-[0.9fr_1.1fr]'} gap-0 items-center`}>
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : (isImageLeft ? -50 : 50) }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: isMobile ? 0.4 : 0.8 }}
            className={`relative aspect-[4/3] lg:aspect-[16/11] overflow-visible ${isImageLeft ? 'lg:pr-12 lg:order-1' : 'lg:pl-12 lg:order-2'} ${!isImageLeft ? 'mt-8 lg:mt-0' : ''}`}
          >
            <div 
              className="relative w-full h-full" 
              style={{ 
                clipPath: isMobile 
                  ? 'none' 
                  : isImageLeft 
                    ? 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' 
                    : 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)'
              }}
            >
              <ImageWithFallback
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover shadow-2xl hover:scale-105 transition-all duration-700 ease-out"
              />
              {/* Diagonal accent line */}
              {!isMobile && (
                <div 
                  className="absolute top-0 w-1 h-full bg-gradient-to-b from-white/60 via-white/40 to-white/20" 
                  style={isImageLeft ? {
                    right: 0,
                    transform: 'translateX(100%) skewX(-10deg)',
                    transformOrigin: 'top left'
                  } : {
                    left: 0,
                    transform: 'translateX(-100%) skewX(10deg)',
                    transformOrigin: 'top right'
                  }}
                />
              )}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : (isImageLeft ? 50 : -50) }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0 : 0.2 }}
            className={`text-white ${isImageLeft ? 'lg:-ml-16 lg:order-2' : 'lg:-mr-16 lg:order-1'} relative z-10 ${isImageLeft ? 'mt-8 lg:mt-0' : 'mb-8 lg:mb-0'}`}
          >
            <div className={`lg:bg-black/40 lg:backdrop-blur-sm lg:p-8 ${isImageLeft ? 'lg:border-l-4' : 'lg:border-r-4'} lg:border-white/20`}>
              <div className="text-sm text-gray-400 mb-4 tracking-widest uppercase">{sectionNumber}</div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-8 tracking-tight leading-tight">{title}</h2>
              <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
                {description}
              </div>
              <Button asChild className="mt-8 bg-white text-black hover:bg-gray-200 px-8 py-6 text-base transition-all duration-300 hover:scale-105">
                <Link to={buttonLink}>{buttonText}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
