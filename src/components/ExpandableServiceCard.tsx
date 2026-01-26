import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface ExpandableServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon?: React.ReactNode;
  index?: number;
}

export function ExpandableServiceCard({ 
  title, 
  subtitle, 
  description, 
  features, 
  icon,
  index = 0 
}: ExpandableServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Card Container */}
      <div className="relative border border-white/10 bg-black overflow-hidden transition-all duration-500"
        style={{
          boxShadow: isHovered ? '0 0 40px rgba(255,255,255,0.1)' : '0 0 20px rgba(255,255,255,0.05)'
        }}
      >
        {/* Background Gradient on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Main Content - Always Visible */}
        <div className="relative p-8 lg:p-12">
          {/* Icon & Subtitle */}
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-2">
              {icon && (
                <motion.div
                  animate={{ 
                    scale: isHovered ? 1.1 : 1,
                    rotate: isHovered ? 5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-white"
                >
                  {icon}
                </motion.div>
              )}
              <div className="text-xs tracking-[0.3em] text-gray-400">{subtitle}</div>
            </div>
            
            {/* Expand Indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="text-white text-2xl lg:text-3xl tracking-tight mb-4">
            {title}
          </h3>

          {/* Short Description */}
          <p className="text-white/70 leading-relaxed text-sm lg:text-base">
            {description}
          </p>

          {/* Hover Underline */}
          <motion.div
            className="h-px bg-white mt-6"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? '100%' : '0%' }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden border-t border-white/10"
            >
              <div className="p-8 lg:p-12 pt-6 lg:pt-8 space-y-4">
                <h4 className="text-white text-sm tracking-[0.3em] mb-4">FEATURES</h4>
                <ul className="space-y-3">
                  {features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="flex items-start gap-3 text-white/70 text-sm lg:text-base"
                    >
                      <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Alternative: Flip Card Version
export function FlipServiceCard({ 
  title, 
  subtitle, 
  description, 
  features, 
  icon,
  index = 0 
}: ExpandableServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative h-[400px] lg:h-[480px] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 border border-white/10 bg-black p-8 lg:p-12 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div>
            {icon && <div className="text-white mb-6">{icon}</div>}
            <div className="text-xs tracking-[0.3em] text-gray-400 mb-4">{subtitle}</div>
            <h3 className="text-white text-2xl lg:text-3xl tracking-tight mb-4">{title}</h3>
            <p className="text-white/70 leading-relaxed">{description}</p>
          </div>
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <span>クリックして詳細を表示</span>
            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 border border-white/10 bg-zinc-950 p-8 lg:p-12"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <h4 className="text-white text-sm tracking-[0.3em] mb-6">FEATURES</h4>
          <ul className="space-y-3">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-white/70">
                <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
