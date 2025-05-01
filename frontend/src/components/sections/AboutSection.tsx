"use client"
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const AboutSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8], [50, 0, 0]);
  
  // State for image slider
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/images/aboutimage.jpg",
    "/images/aboutimage 2.jpg",  // Add your additional image paths
    "/images/aboutimage 3.jpg"   // Add your additional image paths
  ];

  // Auto rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="about" ref={containerRef} className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-zinc-950">
      {/* Unique background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-soft-light"></div>
        <div className="absolute inset-0 bg-gradient-radial from-teal-900/5 to-transparent opacity-20"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-teal-500/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl"></div>
        
        {/* Animated dots pattern */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-teal-500"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `pulse ${Math.random() * 8 + 2}s infinite alternate ${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Glowing border effects */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading - improved spacing for mobile */}
        <motion.div 
          style={{ opacity, y }}
          className="relative z-10 mb-12 md:mb-16 lg:mb-20 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-200 to-emerald-300 inline-block tracking-tight">About Me</h2>
          <div className="relative h-1 w-20 md:w-24 mx-auto mt-3 md:mt-4">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
            <motion.div 
              className="absolute inset-0 bg-white rounded-full"
              animate={{ 
                x: ["-100%", "100%"],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
          </div>
        </motion.div>

        {/* Improved responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16">
          {/* Image column - made more responsive */}
          <motion.div 
            style={{ opacity, y }}
            className="lg:col-span-5 lg:order-last"
          >
            {/* Improved responsive image sizing */}
            <div className="relative w-full max-w-xs xs:max-w-sm mx-auto aspect-[3/4] group">
              {/* Decorative elements */}
              <div className="absolute -inset-4 rounded-2xl border border-teal-500/10 rotate-3 transition-all duration-500 group-hover:rotate-6 group-hover:border-teal-500/30"></div>
              <div className="absolute -inset-4 rounded-2xl border border-emerald-500/10 -rotate-3 transition-all duration-500 group-hover:-rotate-6 group-hover:border-emerald-500/30"></div>
              
              {/* Glowing effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-teal-500/10 to-emerald-500/5 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Image Slider Container - improved for mobile */}
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-zinc-800 group-hover:border-teal-500/30 transition-colors duration-500 shadow-lg shadow-teal-900/20">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/60 via-zinc-800/10 to-zinc-900/60 mix-blend-overlay z-10"></div>
                
                {/* Images */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[currentImage]}
                      alt={`Profile image ${currentImage + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-xl"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentImage === index ? 'bg-teal-400 w-4' : 'bg-zinc-400/50 hover:bg-zinc-300/70'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
                
                {/* Decorative corner accents */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-teal-500/40 rounded-tl-lg"></div>
                <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-teal-500/40 rounded-tr-lg"></div>
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-teal-500/40 rounded-bl-lg"></div>
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-teal-500/40 rounded-br-lg"></div>
                
                {/* Highlight reflection effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br from-teal-500/20 to-emerald-500/10 blur-md"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-teal-500/10 to-transparent blur-md"></div>
            </div>
            
            {/* Personal Interests - improved grid for small screens */}
            <div className="space-y-4 mt-12 md:mt-16">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-teal-500/10 flex items-center justify-center shadow-inner shadow-teal-900/20">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-zinc-100">Personal Interests</h3>
              </div>
              
              {/* Better responsive grid for interest cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 xs:gap-3">
                {[
                  { icon: "🎮", title: "Gaming", desc: "Strategy & RPG games" },
                  { icon: "📚", title: "Reading", desc: "Tech books & fiction" },
                  { icon: "🎬", title: "Movies", desc: "Sci-fi & thrillers" },
                  { icon: "💻", title: "Coding", desc: "Side projects & learning" },
                  { icon: "🏋️", title: "Fitness", desc: "Daily workouts" },
                  { icon: "🧩", title: "Problem Solving", desc: "Puzzles & algorithms" }
                ].map((interest, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 10px 20px -10px rgba(20, 184, 166, 0.3)" 
                    }}
                    className="p-2 xs:p-3 rounded-lg bg-gradient-to-br from-zinc-900/80 to-zinc-800/40 border border-zinc-800 hover:border-teal-500/30 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
                  >
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Content - improved text size for mobile */}
                    <div className="relative z-10">
                      <div className="text-xl xs:text-2xl mb-1 transform group-hover:scale-110 transition-transform duration-300">{interest.icon}</div>
                      <h4 className="text-zinc-200 font-medium text-xs xs:text-sm group-hover:text-teal-200 transition-colors duration-300">{interest.title}</h4>
                      <p className="text-zinc-400 text-xs group-hover:text-zinc-300 transition-colors duration-300">{interest.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Bio & Experience column - improved for mobile */}
          <motion.div 
            style={{ opacity, y }}
            className="lg:col-span-7"
          >
            {/* Bio section - improved for mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 md:mb-16"
            >
              <div className="max-w-3xl">
                <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 rounded-full bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20 backdrop-blur-sm shadow-lg shadow-teal-900/5">
                  <div className="relative mr-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                  </div>
                  <span className="text-teal-300 text-xs md:text-sm font-medium tracking-wide">Who I Am</span>
                </div>
                
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-zinc-100 leading-tight">A <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">detail-oriented</span> Full Stack Web Developer with a passion for <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">stunning interfaces</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">seamless experiences</span></h3>
                
                <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
                  I am passionate about creating efficient and user-friendly web applications that bridge the gap between elegant design and robust functionality. With expertise in modern web technologies, I develop solutions that not only meet business requirements but also delight users with smooth, intuitive experiences.
                </p>

                <div className="mt-6 md:mt-8 p-3 md:p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 relative overflow-hidden group hover:border-teal-500/30 transition-all duration-300">
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <h4 className="flex items-center text-zinc-100 font-medium mb-2">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-teal-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      My Philosophy
                    </h4>
                    <p className="text-sm md:text-base text-zinc-400">
                      I believe that exceptional web experiences happen at the intersection of design thinking, technical excellence, and user empathy. Every line of code I write is guided by this principle.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Education & Experience Grid - improved for mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Education timeline */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-teal-500/10 flex items-center justify-center shadow-inner shadow-teal-900/20">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-zinc-100">Education Journey</h3>
                </div>
                
                {/* Fixed border length for timeline */}
                <div className="relative pl-8 border-l border-zinc-800 pb-1">
                  {[
                    {
                      period: "2021 - 2025",
                      institution: "SRI RAAJA RAAJAN COLLEGE OF ENGINEERING",
                      degree: "BE Computer Science Engineering",
                      grade: "CGPA: 8.05"
                    },
                    {
                      period: "2018 - 2020",
                      institution: "VELAMMAL MATRIC HR. SEC. SCHOOL",
                      degree: "HSC",
                      grade: "Percentage: 91%"
                    },
                    {
                      period: "2016 - 2018",
                      institution: "VELAMMAL MATRIC HR. SEC. SCHOOL",
                      degree: "SSLC",
                      grade: "Percentage: 90%"
                    }
                  ].map((edu, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="relative mb-6 last:mb-0"
                    >
                      <div className="absolute -left-10 top-1.5 w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                      <div className="absolute -left-[38px] top-1.5 w-3 h-3 rounded-full bg-teal-500 opacity-50 animate-ping"></div>
                      <div className="p-3 md:p-4 rounded-lg bg-gradient-to-br from-zinc-900/80 to-zinc-800/40 border border-zinc-800 hover:border-teal-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-900/10 backdrop-blur-sm">
                        <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 text-xs font-medium text-teal-300 bg-teal-500/10 rounded-full mb-2">{edu.period}</span>
                        <h4 className="text-zinc-100 text-sm md:text-base font-medium">{edu.institution}</h4>
                        <p className="text-zinc-400 text-xs md:text-sm mt-1">{edu.degree} • {edu.grade}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Work Experience */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-teal-500/10 flex items-center justify-center shadow-inner shadow-teal-900/20">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-zinc-100">Work Experience</h3>
                </div>
                
                {/* Fixed border length for timeline */}
                <div className="relative pl-8 border-l border-zinc-800 pb-1">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                    className="relative mb-6"
                  >
                    <div className="absolute -left-10 top-1.5 w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                    <div className="absolute -left-[38px] top-1.5 w-3 h-3 rounded-full bg-teal-500 opacity-50 animate-ping"></div>
                    <div className="p-3 md:p-4 rounded-lg bg-gradient-to-br from-zinc-900/80 to-zinc-800/40 border border-zinc-800 hover:border-teal-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-900/10 backdrop-blur-sm">
                      <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 text-xs font-medium text-teal-300 bg-teal-500/10 rounded-full mb-2">Oct 2024 - Jan 2025</span>
                      <h4 className="text-zinc-100 text-sm md:text-base font-medium">COMMANDHQ - Full Stack Web Developer (Intern)</h4>
                      <div className="text-zinc-400 text-xs md:text-sm mt-2 space-y-2">
                        <p>Developed responsive web applications using React.js and Node.js with a focus on performance optimization and user experience.</p>
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          <span className="text-xs px-2 py-0.5 bg-teal-900/30 text-teal-300 rounded-full">React.js</span>
                          <span className="text-xs px-2 py-0.5 bg-teal-900/30 text-teal-300 rounded-full">Node.js</span>
                          <span className="text-xs px-2 py-0.5 bg-teal-900/30 text-teal-300 rounded-full">UI/UX</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ x: 5 }}
                    className="relative"
                  >
                    <div className="absolute -left-10 top-1.5 w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                    <div className="absolute -left-[38px] top-1.5 w-3 h-3 rounded-full bg-teal-500 opacity-50 animate-ping"></div>
                    <div className="p-3 md:p-4 rounded-lg bg-gradient-to-br from-teal-500/5 to-emerald-500/5 border border-teal-500/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-900/10">
                      <div className="flex justify-between items-start">
                        <h4 className="text-zinc-100 text-sm md:text-base font-medium">Open to New Opportunities</h4>
                        <div className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-emerald-500"></span>
                        </div>
                      </div>
                      <p className="text-zinc-400 text-xs md:text-sm mt-2">Currently seeking new challenges and collaborations in web development and software engineering. Let's create something amazing together!</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* CTA button - made more responsive */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 md:mt-14 flex justify-center md:justify-start"
            >
              <a 
                href="#contact" 
                className="group relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 overflow-hidden rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 text-white font-medium transition duration-300 ease-out shadow-lg hover:shadow-teal-500/30"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                <span className="absolute top-0 left-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent h-px"></span>
                <span className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-black/10 to-transparent h-px"></span>
                <span className="relative flex items-center">
                  <span className="mr-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </span>
                  <span className="font-medium text-sm md:text-base">Get In Touch</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </span>
                
                {/* Particle effect on hover */}
                <span className="absolute inset-0 pointer-events-none group-hover:animate-sparkle">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span 
                      key={i}
                      className="absolute inline-flex h-1 w-1 rounded-full bg-white opacity-0 group-hover:animate-particle"
                      style={{
                        top: `${50 + Math.random() * 20 - 10}%`,
                        left: `${50 + Math.random() * 20 - 10}%`,
                        animationDelay: `${Math.random() * 0.5}s`
                      }}
                    ></span>
                  ))}
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Updated CSS for additional animations */}
      <style jsx global>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        @keyframes particle {
          0% { transform: translate(0, 0) scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * -100 - 20}px) scale(${Math.random() * 2 + 1}); opacity: 0; }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0.2; }
        }
        
        .animate-sparkle span {
          animation-name: sparkle;
          animation-duration: 0.8s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        
        @media (max-width: 640px) {
          .animate-particle {
            display: none;
          }
        }
        
        /* Extra small screens */
        @media (max-width: 480px) {
          .xs\\:max-w-sm {
            max-width: 16rem;
          }
          .xs\\:p-3 {
            padding: 0.75rem;
          }
          .xs\\:gap-3 {
            gap: 0.75rem;
          }
          .xs\\:text-2xl {
            font-size: 1.5rem;
            line-height: 2rem;
          }
          .xs\\:text-sm {
            font-size: 0.875rem;
            line-height: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;