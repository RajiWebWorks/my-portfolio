"use client"
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LottieAnimation from '../common/LottieAnimation';

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  // Skills categorization with more detailed information
  const skillCategories = [
    {
      id: "frontend",
      title: "Frontend Development",
      color: "purple",
      skills: [
        { name: "HTML", level: 90 },
        { name: "CSS", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "TypeScript", level: 75 },
        { name: "React", level: 85 },
        { name: "Next.js", level: 70 },
        { name: "Responsive Design", level: 85 },
        { name: "UI/UX Principles", level: 80 }
      ]
    },
    {
      id: "backend",
      title: "Backend Development",
      color: "cyan",
      skills: [
        { name: "Node.js", level: 70 },
        { name: "Express", level: 65 },
        { name: "MongoDB", level: 60 },
        { name: "SQL", level: 75 },
        { name: "RESTful APIs", level: 80 },
        { name: "Firebase", level: 70 },
        { name: "Authentication", level: 75 },
        { name: "Database Design", level: 70 }
      ]
    },
    {
      id: "tools",
      title: "Tools & Frameworks",
      color: "indigo",
      skills: [
        { name: "Tailwind CSS", level: 90 },
        { name: "Git & GitHub", level: 85 },
        { name: "VS Code", level: 90 },
        { name: "npm/yarn", level: 85 },
        { name: "Bootstrap", level: 80 },
        { name: "Chrome DevTools", level: 85 },
        { name: "Vercel", level: 75 },
        { name: "Netlify", level: 70 }
      ]
    }
  ];

  // State for active skill category tab
  const [activeTab, setActiveTab] = useState("frontend");

  // Get active category skills
  const activeSkills = skillCategories.find(cat => cat.id === activeTab)?.skills || [];

  // Colors based on active tab
  const getGradient = (tabId: string) => {
    switch (tabId) {
      case "frontend": return "from-purple-500 to-purple-300";
      case "backend": return "from-cyan-500 to-cyan-300";
      case "tools": return "from-indigo-500 to-indigo-300";
      default: return "from-purple-500 to-purple-300";
    }
  };

  const getBgGradient = (tabId: string) => {
    switch (tabId) {
      case "frontend": return "from-purple-600/5 to-purple-600/10";
      case "backend": return "from-cyan-600/5 to-cyan-600/10";
      case "tools": return "from-indigo-600/5 to-indigo-600/10";
      default: return "from-purple-600/5 to-purple-600/10";
    }
  };

  const getTextColor = (tabId: string) => {
    switch (tabId) {
      case "frontend": return "text-purple-400";
      case "backend": return "text-cyan-400";
      case "tools": return "text-indigo-400";
      default: return "text-purple-400";
    }
  };

  const getHighlightColor = (tabId: string) => {
    switch (tabId) {
      case "frontend": return "bg-purple-500/20";
      case "backend": return "bg-cyan-500/20";
      case "tools": return "bg-indigo-500/20";
      default: return "bg-purple-500/20";
    }
  };

  const getBorderColor = (tabId: string) => {
    switch (tabId) {
      case "frontend": return "border-purple-500/30";
      case "backend": return "border-cyan-500/30";
      case "tools": return "border-indigo-500/30";
      default: return "border-purple-500/30";
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="py-16 md:py-24 lg:py-32 relative bg-zinc-950 overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-soft-light"></div>
        <div className="absolute inset-0 bg-gradient-radial from-teal-900/5 to-transparent opacity-20"></div>
        
        {/* Geometric shapes similar to about section */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl"></div>
        
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
      
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading with unique underline animation */}
        <motion.div 
          style={{ opacity, y }}
          className="relative z-10 mb-12 md:mb-16 lg:mb-20 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-200 to-emerald-300 inline-block tracking-tight">
            Technical Expertise
          </h2>
          <div className="relative h-1 w-24 mx-auto mt-4">
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

        {/* Adjusted flex container to center items vertically on large screens */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-12">
          
          {/* Left Side - Interactive Skill Cards (Appears LAST on mobile) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} // Animate from left
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-3/5 space-y-6 md:space-y-8 order-last lg:order-first"
          >
            {/* Skills tabs navigation */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    activeTab === category.id 
                      ? `${getHighlightColor(category.id)} ${getTextColor(category.id)} shadow-lg` 
                      : 'bg-zinc-900/70 text-zinc-400 hover:text-zinc-300'
                  }`}
                >
                  {category.title}
                  {activeTab === category.id && (
                    <div className="mt-1 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Skills interactive card */}
            <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${getBgGradient(activeTab)} border ${getBorderColor(activeTab)} shadow-lg transition-all duration-300`}>
              {/* Decorative elements */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-teal-500/40 rounded-tl-lg"></div>
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-teal-500/40 rounded-tr-lg"></div>
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-teal-500/40 rounded-bl-lg"></div>
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-teal-500/40 rounded-br-lg"></div>
              
              {/* Glowing accent elements */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-teal-500/10 to-emerald-500/5 blur-xl"></div>
              <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-xl"></div>
              
              <div className="p-4 sm:p-6 md:p-8 relative z-10">
                <div className="mb-4 sm:mb-6">
                  <h3 className={`text-lg sm:text-xl font-semibold ${getTextColor(activeTab)} flex items-center`}>
                    <span className={`bg-gradient-to-r ${getGradient(activeTab)} h-4 sm:h-5 w-1 mr-2 sm:mr-3 rounded-full`}></span>
                    {skillCategories.find(cat => cat.id === activeTab)?.title}
                    <span className="ml-2 text-sm text-zinc-500">({activeSkills.length} skills)</span>
                  </h3>
                </div>
                
                {/* Skills grid with better mobile/tablet responsiveness */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group relative"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="bg-zinc-900/80 backdrop-blur-sm p-4 rounded-lg border border-zinc-800 hover:border-teal-500/30 transition-all duration-300 h-full">
                        {/* Vertical bars design decorations */}
                        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-white font-medium text-sm sm:text-base">{skill.name}</h4>
                          <div className={`text-base sm:text-lg font-bold ${getTextColor(activeTab)}`}>{skill.level}%</div>
                        </div>
                        
                        <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${getGradient(activeTab)}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, delay: 0.1 + index * 0.05 }}
                            viewport={{ once: true }}
                          />
                        </div>
                        
                        {/* Skill level indicator with better spacing */}
                        <div className="mt-2 flex justify-between text-xs text-zinc-500">
                          <span>Beginner</span>
                          <span>Intermediate</span>
                          <span>Expert</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Lottie Animation (Container Removed) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/5 order-first lg:order-last flex justify-center items-center"
          >
            {/* Lottie Animation directly inside the column */}
            <LottieAnimation animationPath="/animations/animation.skill.json" />
          </motion.div>

        </div> 
      </div> 
      
      {/* CSS for additional animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0.2; }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;