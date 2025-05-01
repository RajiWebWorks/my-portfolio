"use client"
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  const skills = [
    "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { width, height, left, top } = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) - 0.5;
        const y = ((e.clientY - top) / height) - 0.5;
        setMousePosition({ x, y });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkillIndex(prev => (prev + 1) % skills.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-soft-light"></div>
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 50}% ${50 + mousePosition.y * 50}%, rgba(94, 234, 212, 0.15) 0%, rgba(0, 0, 0, 0) 70%)`,
          }}
        ></motion.div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.02]"></div>
        <motion.div
          className="absolute top-0 left-0 w-full h-px"
          style={{
            backgroundImage: "linear-gradient(to right, transparent, rgba(94, 234, 212, 0.2), transparent)"
          }}
        ></motion.div>

        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`absolute rounded-full
              ${i % 5 === 0 ? 'w-2 h-2 bg-teal-400/20' :
                i % 5 === 1 ? 'w-1 h-1 bg-white/15' :
                i % 5 === 2 ? 'w-3 h-3 bg-teal-500/10' :
                i % 5 === 3 ? 'w-1.5 h-1.5 bg-emerald-300/15' :
                'w-1 h-1 bg-teal-200/20'
              } blur-sm`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -(50 + Math.random() * 100)],
              x: [0, (Math.random() - 0.5) * 80],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative mx-auto max-w-7xl w-full min-h-screen px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-16 sm:pt-20 pb-10">
        {/* Content and image in one row on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left content area */}
          <motion.div
            className="col-span-1 lg:col-span-3 z-10 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Status indicator */}
            <motion.div
              className="inline-flex items-center px-3 py-1.5 mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative mr-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </div>
              <span className="text-teal-300 text-xs sm:text-sm font-medium tracking-wide">Full Stack Developer</span>
            </motion.div>

            {/* Name and intro */}
            <div className="space-y-1 sm:space-y-2">
              <h2 className="text-lg sm:text-xl text-zinc-200 font-medium">Hello, I'm</h2>
              <div className="relative">
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-200 to-emerald-300"
                >
                  Rajeshwari Kumar
                </motion.h1>
                <motion.div
                  className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1.2 }}
                />
              </div>
              <p className="text-md sm:text-lg text-zinc-300 mt-1">from India</p>
            </div>

            {/* Rotating skills */}
            <div className="mt-6 sm:mt-8">
              <p className="text-sm sm:text-base text-zinc-400 mb-1 sm:mb-2">Specializing in</p>
              <div className="h-8 sm:h-10 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSkillIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300"
                  >
                    {skills[currentSkillIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Description */}
            <motion.p
              className="mt-4 sm:mt-6 text-zinc-300 max-w-lg mx-auto lg:mx-0 text-base sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Crafting <span className="text-white font-medium">sophisticated digital experiences</span> that merge form and function through modern technology and thoughtful design.
            </motion.p>
          </motion.div>

          {/* Right profile image area */}
          <motion.div
            className="col-span-1 lg:col-span-2 flex justify-center z-10 mt-6 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div
              className="relative w-56 h-64 xs:w-64 xs:h-72 sm:w-72 sm:h-80 lg:w-80 lg:h-96 group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{ 
                  rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                  scale: { duration: 0.6, ease: "easeOut" }
                }}
                className="absolute -inset-8 sm:-inset-10 rounded-2xl border border-teal-500/10"
              ></motion.div>

              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: isHovered ? 1.15 : 1
                }}
                transition={{ 
                  rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                  scale: { duration: 0.5, ease: "easeOut" }
                }}
                className="absolute -inset-5 sm:-inset-6 rounded-2xl border border-emerald-500/10"
              ></motion.div>

              <motion.div
                className="absolute -inset-5 sm:-inset-6 bg-gradient-to-r from-teal-500/20 to-emerald-500/10 rounded-2xl blur-2xl transition-all duration-500"
                animate={{ 
                  opacity: isHovered ? 0.8 : 0.4,
                  scale: isHovered ? [1, 1.05, 1] : 1
                }}
                transition={{ 
                  opacity: { duration: 0.3 },
                  scale: { duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }
                }}
              ></motion.div>

              <AnimatePresence>
                {isHovered && Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={`orbit-particle-${i}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="absolute w-1.5 h-1.5 rounded-full bg-teal-400/70 shadow-glow-sm"
                    style={{
                      left: i < 4 ? `${15 + (i * 25)}%` : `${15 + ((i-4) * 25)}%`,
                      top: i < 4 ? '10%' : '90%',
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                      className="w-full h-full rounded-full bg-teal-300/90"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="relative w-full h-full rounded-2xl overflow-hidden transition-transform duration-500 transform group-hover:scale-105">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800/80 to-zinc-900/90 mix-blend-soft-light"
                  animate={{ opacity: isHovered ? 0.6 : 1 }}
                  transition={{ duration: 0.4 }}
                ></motion.div>

                <motion.div 
                  className="absolute inset-0 rounded-2xl border border-zinc-700/50"
                  animate={{ 
                    borderColor: isHovered ? 'rgba(20, 184, 166, 0.3)' : 'rgba(63, 63, 70, 0.5)',
                    boxShadow: isHovered ? '0 0 15px 2px rgba(20, 184, 166, 0.2)' : 'none'
                  }}
                  transition={{ duration: 0.4 }}
                ></motion.div>

                <motion.div 
                  className="absolute inset-1 rounded-2xl border"
                  animate={{ 
                    borderColor: isHovered ? 'rgba(20, 184, 166, 0.2)' : 'rgba(20, 184, 166, 0.1)',
                    boxShadow: isHovered ? '0 0 10px 1px rgba(20, 184, 166, 0.15) inset' : 'none'
                  }}
                  transition={{ duration: 0.4 }}
                ></motion.div>

                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: isHovered ? 1.08 : 1,
                    x: isHovered ? mousePosition.x * 12 : 0,
                    y: isHovered ? mousePosition.y * 12 : 0
                  }}
                  transition={{ 
                    scale: { duration: 0.4, ease: "easeOut" },
                    x: { duration: 0.2, ease: "easeOut" },
                    y: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/profile.jpg"
                      alt="Rajeshwari Kumar"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-2xl transition-all duration-500"
                    />
                    
                    <motion.div 
                      className="absolute inset-0 rounded-2xl bg-gradient-to-b from-teal-500/5 to-emerald-500/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 0.6 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-t"
                  animate={{ 
                    background: isHovered 
                      ? 'linear-gradient(to top, rgba(13, 148, 136, 0.3), rgba(13, 148, 136, 0) 50%, rgba(255, 255, 255, 0.1) 100%)'
                      : 'linear-gradient(to top, rgba(13, 148, 136, 0.4), transparent)'
                  }}
                  transition={{ duration: 0.5 }}
                ></motion.div>

                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 bg-gradient-to-br from-white/20 via-white/0 to-transparent"
                  animate={{
                    opacity: isHovered ? [0, 0.2, 0] : 0,
                    backgroundPosition: isHovered ? ['200% 200%', '-50% -50%'] : '200% 200%'
                  }}
                  transition={{
                    opacity: { duration: 1.2, repeat: isHovered ? Infinity : 0, repeatDelay: 0.5 },
                    backgroundPosition: { duration: 1.2, repeat: isHovered ? Infinity : 0, repeatDelay: 0.5 }
                  }}
                ></motion.div>
              </div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 0.4 }}
                    exit={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 rounded-2xl bg-teal-400/10"
                  ></motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* CTA buttons */}
        <motion.div
          className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 overflow-hidden rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 text-white text-sm sm:text-base font-medium transition duration-300 ease-out shadow-lg hover:shadow-teal-500/30"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
            <span className="absolute top-0 left-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent h-px"></span>
            <span className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-black/10 to-transparent h-px"></span>
            <span className="relative flex items-center">
              <span>View Portfolio</span>
              <svg className="ml-1.5 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>

          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 overflow-hidden rounded-lg bg-zinc-900 border border-teal-500/20 text-zinc-200 text-sm sm:text-base font-medium transition duration-300 ease-out hover:text-white"
          >
            <span className="absolute inset-0 w-full h-full bg-zinc-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
            <span className="relative flex items-center">
              <span>Contact Me</span>
            </span>
          </a>

          <a
            href="/resume/RAJESHWARI.RESUME.pdf" 
            download
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 overflow-hidden rounded-lg bg-zinc-900 border border-teal-500/20 text-zinc-200 text-sm sm:text-base font-medium transition duration-300 ease-out hover:text-white"
          >
            <span className="absolute inset-0 w-full h-full bg-zinc-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
            <span className="relative flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Resume</span>
            </span>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;