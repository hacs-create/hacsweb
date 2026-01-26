import React from 'react';
import { motion } from 'motion/react';

export function Grid3DBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* 3D Perspective Container */}
      <div 
        className="absolute inset-0"
        style={{
          perspective: '1000px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Horizontal Grid Lines - Infinite Floor */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[200vw] h-[200vh]"
          style={{
            transform: 'translateX(-50%) translateY(-30%) rotateX(75deg)',
            transformStyle: 'preserve-3d',
          }}
          animate={{
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Horizontal Lines */}
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 right-0 border-t border-white/5"
              style={{
                top: `${i * 5}%`,
              }}
              animate={{
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            />
          ))}
          
          {/* Vertical Lines */}
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 border-l border-white/5"
              style={{
                left: `${i * 5}%`,
              }}
              animate={{
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* Floating Wireframe Cubes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`cube-${i}`}
            className="absolute border border-white/10"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              width: `${100 + i * 30}px`,
              height: `${100 + i * 30}px`,
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
              rotateZ: [0, 180],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5,
            }}
          >
            {/* Cube faces as wireframe */}
            <div 
              className="absolute inset-0 border border-white/5"
              style={{
                transform: 'translateZ(50px)',
              }}
            />
            <div 
              className="absolute inset-0 border border-white/5"
              style={{
                transform: 'translateZ(-50px)',
              }}
            />
            <div 
              className="absolute inset-0 border border-white/5"
              style={{
                transform: 'rotateY(90deg) translateZ(50px)',
              }}
            />
            <div 
              className="absolute inset-0 border border-white/5"
              style={{
                transform: 'rotateY(90deg) translateZ(-50px)',
              }}
            />
          </motion.div>
        ))}

        {/* Vertical Grid Planes */}
        <motion.div
          className="absolute left-0 top-1/2 w-full h-[150vh]"
          style={{
            transform: 'translateY(-50%) rotateY(85deg)',
            transformStyle: 'preserve-3d',
            transformOrigin: 'left center',
          }}
          animate={{
            x: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`vp-${i}`}
              className="absolute top-0 bottom-0 border-l border-white/3"
              style={{
                left: `${i * 10}%`,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          className="absolute right-0 top-1/2 w-full h-[150vh]"
          style={{
            transform: 'translateY(-50%) rotateY(-85deg)',
            transformStyle: 'preserve-3d',
            transformOrigin: 'right center',
          }}
          animate={{
            x: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`vp2-${i}`}
              className="absolute top-0 bottom-0 border-l border-white/3"
              style={{
                left: `${i * 10}%`,
              }}
            />
          ))}
        </motion.div>

        {/* Glowing Grid Points */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`point-${i}`}
            className="absolute w-2 h-2 rounded-full bg-white/20 shadow-lg"
            style={{
              left: `${10 + i * 12}%`,
              top: `${30 + (i % 2) * 40}%`,
              boxShadow: '0 0 20px rgba(255,255,255,0.3)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Scanning Lines */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            boxShadow: '0 0 10px rgba(255,255,255,0.5)',
          }}
          animate={{
            top: ['0%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
          style={{
            boxShadow: '0 0 10px rgba(255,255,255,0.5)',
          }}
          animate={{
            left: ['0%', '100%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Ambient Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
    </div>
  );
}
