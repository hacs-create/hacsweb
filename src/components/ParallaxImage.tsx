'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export default function ParallaxImage({ 
  src, 
  alt, 
  className = '', 
  speed = 0.5 
}: ParallaxImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 20}%`, `${speed * 20}%`]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div 
        style={{ y }}
        className="relative w-full h-[120%] -top-[10%]"
      >
        <ImageWithFallback
          src={src}
          alt={alt}
          className={className}
        />
      </motion.div>
    </div>
  );
}
