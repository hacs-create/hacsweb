import React from 'react';
import { motion } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'fade' | 'slide' | 'letter';
}

export function AnimatedText({ 
  text, 
  className = '', 
  delay = 0, 
  duration = 0.8,
  type = 'fade'
}: AnimatedTextProps) {
  
  // Letter-by-letter animation
  if (type === 'letter') {
    const letters = text.split('');
    return (
      <span className={className}>
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: delay + (index * 0.03),
              ease: "easeOut"
            }}
            style={{ display: 'inline-block' }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </span>
    );
  }

  // Slide up animation
  if (type === 'slide') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, delay, ease: "easeOut" }}
        className={className}
      >
        {text}
      </motion.div>
    );
  }

  // Default fade animation
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay }}
      className={className}
    >
      {text}
    </motion.div>
  );
}

// Typing effect component
interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function TypingText({ 
  text, 
  className = '', 
  speed = 50,
  delay = 0
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, delay]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-[1em] bg-white ml-0.5 align-middle"
        />
      )}
    </span>
  );
}

// Split text reveal (word-by-word)
interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function SplitText({ 
  text, 
  className = '', 
  delay = 0,
  stagger = 0.05
}: SplitTextProps) {
  const words = text.split(' ');
  
  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: delay + (index * stagger),
            ease: "easeOut"
          }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
