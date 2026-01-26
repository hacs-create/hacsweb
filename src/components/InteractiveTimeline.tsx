import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface InteractiveTimelineProps {
  events: TimelineEvent[];
}

export function InteractiveTimeline({ events }: InteractiveTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <div className="text-sm tracking-[0.3em] text-gray-400 mb-4">TIMELINE</div>
          <h2 className="tracking-tight leading-[1.1] text-white" style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)' }}>
            私たちの歩み
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line - Background (gray) */}
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-white/10 transform lg:-translate-x-1/2" />
          
          {/* Vertical Line - Animated (white) */}
          <motion.div 
            className="absolute left-0 lg:left-1/2 top-0 w-px bg-white transform lg:-translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          {/* Timeline Events */}
          <div className="space-y-12 lg:space-y-20">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center`}
                >
                  {/* Desktop: Alternate layout */}
                  <div className={`hidden lg:block ${isEven ? 'lg:text-right lg:pr-16' : 'lg:col-start-2 lg:pl-16'}`}>
                    <div className="space-y-3">
                      <div className="text-gray-400 tracking-wider">{event.date}</div>
                      <h3 className="text-white text-xl lg:text-2xl tracking-tight">{event.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{event.description}</p>
                    </div>
                  </div>

                  {/* Mobile: Always right side */}
                  <div className="lg:hidden pl-8">
                    <div className="space-y-3">
                      <div className="text-gray-400 tracking-wider text-sm">{event.date}</div>
                      <h3 className="text-white text-lg tracking-tight">{event.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-sm">{event.description}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    className={`absolute left-0 lg:left-1/2 transform lg:-translate-x-1/2 -translate-y-1/2 top-0
                      w-4 h-4 bg-black border-2 border-white rounded-full
                      hover:scale-150 transition-transform duration-300 cursor-pointer
                      shadow-[0_0_20px_rgba(255,255,255,0.5)]`}
                  />

                  {/* Connector Line (Mobile only) */}
                  <div className="lg:hidden absolute left-0 top-0 w-6 h-px bg-white/30" />
                </motion.div>
              );
            })}
          </div>

          {/* End Marker */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="absolute left-0 lg:left-1/2 bottom-0 transform lg:-translate-x-1/2 translate-y-6
              w-6 h-6 bg-white rounded-full
              shadow-[0_0_30px_rgba(255,255,255,0.8)]"
          />
        </div>
      </div>
    </div>
  );
}
