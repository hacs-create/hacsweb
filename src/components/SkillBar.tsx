import React from 'react';
import { motion } from 'motion/react';

interface Skill {
  name: string;
  level: number; // 0-100
}

interface SkillBarProps {
  skills: Skill[];
  delay?: number;
}

export function SkillBar({ skills, delay = 0 }: SkillBarProps) {
  return (
    <div className="space-y-6">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: delay + (index * 0.1) }}
        >
          {/* Skill Name and Level */}
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-white tracking-wide text-sm lg:text-base">{skill.name}</span>
            <span className="text-gray-400 text-xs lg:text-sm tabular-nums">{skill.level}%</span>
          </div>

          {/* Progress Bar Container */}
          <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
            {/* Animated Fill */}
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-white via-gray-200 to-gray-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 1.2, 
                delay: delay + (index * 0.1) + 0.2,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{
                  duration: 1.5,
                  delay: delay + (index * 0.1) + 0.5,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Alternative: Circular skill display
interface CircularSkillProps {
  skill: string;
  level: number;
  size?: number;
}

export function CircularSkill({ skill, level, size = 120 }: CircularSkillProps) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="white"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-lg tabular-nums">{level}%</span>
        </div>
      </div>
      <span className="text-gray-400 text-sm text-center tracking-wide">{skill}</span>
    </motion.div>
  );
}
