'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  duration = 0.05, // Duration per character
  className,
}) => {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i },
    }),
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ display: 'flex', overflow: 'hidden' }} // Changed to flex for inline-block like behavior
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={childVariants} style={{ marginRight: letter === ' ' ? '0.25em' : '0' }}>
          {letter === ' ' ? '\u00A0' : letter} {/* Render non-breaking space for spaces */}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText; 