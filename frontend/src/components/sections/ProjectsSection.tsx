'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '../../types/Project';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProjectsSection: React.FC = () => {
  // State management
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  
  // Scroll animation setup
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Update the API base URL for production
  const API_BASE_URL = 'https://my-portfolio-vqy5.onrender.com';

  // Helper function to format image URLs
  const getImageUrl = (imageUrl: string | undefined) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/images/')) return imageUrl;
    return `${API_BASE_URL}${imageUrl}`;
  };

  // Extract unique categories from projects
  const getCategories = () => {
    const categoriesSet = new Set<string>();
    projects.forEach(project => {
      if (project.categories && Array.isArray(project.categories)) {
        project.categories.forEach(category => categoriesSet.add(category));
      }
    });
    return Array.from(categoriesSet);
  };

  // Function to fetch projects
  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    console.log('Fetching projects...');
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);
      console.log('Response:', response);
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      console.log('Data:', data);
      if (data.success && Array.isArray(data.data)) {
        const processedData = data.data.map((project: Project) => ({
          ...project,
          codeUrl: project.codeUrl || null,
          demoUrl: project.demoUrl || null
        }));
        setProjects(processedData);
        setVisibleProjects(processedData);
      } else {
        throw new Error(data.message || 'Failed to fetch projects: Invalid data format');
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching projects.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setVisibleProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.categories && 
        Array.isArray(project.categories) && 
        project.categories.includes(activeCategory)
      );
      setVisibleProjects(filtered);
    }
  }, [activeCategory, projects]);

  // Function to toggle description expansion
  const toggleDescription = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDescriptions(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  // Dynamic color functions based on project index
  const getProjectColor = (index: number) => {
    const colors = ['teal', 'purple', 'cyan', 'emerald', 'indigo'];
    return colors[index % colors.length];
  };

  const getGradient = (color: string) => {
    switch (color) {
      case 'teal': return "from-teal-500 to-teal-300";
      case 'purple': return "from-purple-500 to-purple-300";
      case 'cyan': return "from-cyan-500 to-cyan-300";
      case 'emerald': return "from-emerald-500 to-emerald-300";
      case 'indigo': return "from-indigo-500 to-indigo-300";
      default: return "from-teal-500 to-teal-300";
    }
  };

  const getBgGradient = (color: string) => {
    switch (color) {
      case 'teal': return "from-teal-600/5 to-teal-600/10";
      case 'purple': return "from-purple-600/5 to-purple-600/10";
      case 'cyan': return "from-cyan-600/5 to-cyan-600/10";
      case 'emerald': return "from-emerald-600/5 to-emerald-600/10";
      case 'indigo': return "from-indigo-600/5 to-indigo-600/10";
      default: return "from-teal-600/5 to-teal-600/10";
    }
  };

  const getTextColor = (color: string) => {
    switch (color) {
      case 'teal': return "text-teal-400";
      case 'purple': return "text-purple-400";
      case 'cyan': return "text-cyan-400";
      case 'emerald': return "text-emerald-400";
      case 'indigo': return "text-indigo-400";
      default: return "text-teal-400";
    }
  };

  const getHighlightColor = (color: string) => {
    switch (color) {
      case 'teal': return "bg-teal-500/20";
      case 'purple': return "bg-purple-500/20";
      case 'cyan': return "bg-cyan-500/20";
      case 'emerald': return "bg-emerald-500/20";
      case 'indigo': return "bg-indigo-500/20";
      default: return "bg-teal-500/20";
    }
  };

  const getBorderColor = (color: string) => {
    switch (color) {
      case 'teal': return "border-teal-500/30";
      case 'purple': return "border-purple-500/30";
      case 'cyan': return "border-cyan-500/30";
      case 'emerald': return "border-emerald-500/30";
      case 'indigo': return "border-indigo-500/30";
      default: return "border-teal-500/30";
    }
  };

  // Handle navigation to project links
  const handleProjectClick = (url: string | null | undefined) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <TooltipProvider>
      <section 
        ref={sectionRef}
        id="projects" 
        className="py-16 md:py-24 lg:py-32 relative bg-zinc-950 overflow-hidden"
      >
        {/* Enhanced background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-soft-light"></div>
          <div className="absolute inset-0 bg-gradient-radial from-teal-900/5 to-transparent opacity-20"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-teal-500/5 blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>
          
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
          {/* Section heading with unique underline animation */}
          <motion.div 
            style={{ opacity, y }}
            className="relative z-10 mb-12 md:mb-16 lg:mb-20 text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-200 to-emerald-300 inline-block tracking-tight">
              Featured Projects
            </h2>
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

          {/* Category Filter Pills */}
          {!isLoading && projects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 md:mb-12 lg:mb-16"
            >
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeCategory === 'all' 
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/20' 
                    : 'bg-zinc-900/70 text-zinc-400 hover:text-zinc-300 border border-zinc-800'
                }`}
              >
                All Projects
                {activeCategory === 'all' && (
                  <div className="mt-1 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" />
                )}
              </button>
              
              {getCategories().map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/20'
                      : 'bg-zinc-900/70 text-zinc-400 hover:text-zinc-300 border border-zinc-800'
                  }`}
                >
                  {category}
                  {activeCategory === category && (
                    <div className="mt-1 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" />
                  )}
                </button>
              ))}
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-24">
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 rounded-full border-t-4 border-teal-500 animate-spin"></div>
                <div className="absolute inset-3 rounded-full border-t-4 border-l-4 border-purple-500 animate-spin animation-delay-500"></div>
                <div className="absolute inset-6 rounded-full border-t-2 border-emerald-500 animate-spin animation-delay-1000"></div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto bg-zinc-900/80 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 text-center"
            >
              <div className="text-red-500 text-4xl mb-4">⚠</div>
              <h3 className="text-xl font-medium text-red-200 mb-2">Failed to Load Projects</h3>
              <p className="text-red-300/80">{error}</p>
              <button 
                onClick={() => fetchProjects()}
                className="mt-4 px-5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-colors duration-300"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && !error && projects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 text-center"
            >
              <div className="text-zinc-500 text-5xl mb-4">🏗</div>
              <h3 className="text-xl font-medium text-zinc-200 mb-2">Portfolio Under Construction</h3>
              <p className="text-zinc-400">Projects will be added soon. Check back later!</p>
            </motion.div>
          )}

          {/* No Results for Filter */}
          {!isLoading && !error && projects.length > 0 && visibleProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 text-center"
            >
              <div className="text-zinc-500 text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-zinc-200 mb-2">No Projects Found</h3>
              <p className="text-zinc-400">No projects match the selected category.</p>
              <button 
                onClick={() => setActiveCategory('all')}
                className="mt-4 px-5 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 rounded-lg transition-colors duration-300"
              >
                Show All Projects
              </button>
            </motion.div>
          )}

          {/* Projects Grid with Featured Project */}
          {!isLoading && visibleProjects.length > 0 && (
            <div className="space-y-12 md:space-y-16">
              {/* Featured Project */}
              {visibleProjects.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="relative group mb-12 md:mb-16 lg:mb-20"
                >
                  <div className="absolute -inset-2 bg-gradient-to-br from-teal-500/20 via-transparent to-purple-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                  <div 
                    className="relative cursor-pointer" 
                    onClick={() => handleProjectClick(visibleProjects[0]?.codeUrl)}
                  >
                    <div className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 group-hover:border-teal-500/30 rounded-xl overflow-hidden transition-all duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Left - Image Section */}
                        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[450px] overflow-hidden">
                          {visibleProjects[0]?.imageUrl ? (
                            <Image
                              src={getImageUrl(visibleProjects[0].imageUrl)}
                              alt={`${visibleProjects[0].title || 'Project'} thumbnail`}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-zinc-900/80 to-zinc-800/40 flex items-center justify-center p-8">
                              <div className="text-5xl sm:text-6xl mb-4 opacity-40">✨</div>
                            </div>
                          )}
                          
                          {/* Decorative elements */}
                          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-teal-500/40 rounded-tl-lg"></div>
                          <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-teal-500/40 rounded-tr-lg"></div>
                          <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-teal-500/40 rounded-bl-lg"></div>
                          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-teal-500/40 rounded-br-lg"></div>
                          
                          {/* Project categories tags */}
                          {visibleProjects[0]?.categories && (
                            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2">
                              {visibleProjects[0].categories.slice(0, 3).map((category, idx) => (
                                <span 
                                  key={idx} 
                                  className="px-2 py-1 sm:px-3 sm:py-1 bg-zinc-900/80 backdrop-blur-sm text-teal-300 text-[10px] sm:text-xs font-medium rounded-full border border-teal-500/30"
                                >
                                  {category}
                                </span>
                              ))}
                              {visibleProjects[0].categories.length > 3 && (
                                <span className="px-2 py-1 sm:px-3 sm:py-1 bg-zinc-900/80 backdrop-blur-sm text-zinc-400 text-[10px] sm:text-xs font-medium rounded-full">
                                  +{visibleProjects[0].categories.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {/* Right - Content Section */}
                        <div className="p-6 sm:p-8 md:p-10 flex flex-col h-full relative">
                          {/* Glowing accent elements */}
                          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-teal-500/10 to-emerald-500/5 blur-xl"></div>
                          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-xl"></div>
                          
                          <div className="relative z-10 flex flex-col flex-grow">
                            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20 backdrop-blur-sm shadow-lg shadow-teal-900/5 self-start">
                              <div className="relative mr-2 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                              </div>
                              <span className="text-teal-300 text-xs sm:text-sm font-medium tracking-wide">Featured Project</span>
                            </div>
                            
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-100 mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-emerald-400 transition-all duration-300">
                              {visibleProjects[0]?.title || 'Untitled Project'}
                            </h3>
                            
                            <div className="relative mb-4 sm:mb-6 flex-grow">
                              <div 
                                className={`text-zinc-400 text-sm md:text-base ${
                                  expandedDescriptions[visibleProjects[0]?._id || ''] 
                                    ? '' 
                                    : 'line-clamp-3 sm:line-clamp-4'
                                }`}
                              >
                                {visibleProjects[0]?.description || 'No description provided.'}
                              </div>
                              
                              {visibleProjects[0]?.description && 
                                visibleProjects[0].description.length > 120 && (
                                <button 
                                  onClick={(e) => toggleDescription(visibleProjects[0]?._id || '', e)}
                                  className="mt-1 text-xs sm:text-sm text-teal-400 hover:text-teal-300 focus:outline-none transition-colors duration-200"
                                >
                                  {expandedDescriptions[visibleProjects[0]?._id || ''] ? 'Read Less' : 'Read More'}
                                </button>
                              )}
                            </div>
                            
                            {/* Tech stack */}
                            {visibleProjects[0]?.techStack && Array.isArray(visibleProjects[0].techStack) && (
                              <div className="mb-6 sm:mb-8">
                                <h4 className="text-xs sm:text-sm font-medium text-zinc-400 mb-2 sm:mb-3">Technologies Used</h4>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                  {visibleProjects[0].techStack.slice(0, 5).map((tech, idx) => (
                                    <span 
                                      key={idx} 
                                      className="px-2.5 py-1 sm:px-3 sm:py-1 bg-zinc-800 text-zinc-300 text-[10px] sm:text-xs font-medium rounded-lg"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                  {visibleProjects[0].techStack.length > 5 && (
                                    <span className="px-2.5 py-1 sm:px-3 sm:py-1 bg-zinc-800 text-zinc-500 text-[10px] sm:text-xs font-medium rounded-lg">
                                      +{visibleProjects[0].techStack.length - 5}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Links Section */}
                          <div className="mt-auto pt-4 sm:pt-6 border-t border-zinc-800 flex flex-wrap gap-4 sm:gap-6">
                            {visibleProjects[0]?.demoUrl && (
                              <a 
                                href={visibleProjects[0].demoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 sm:gap-2 text-teal-400 hover:text-teal-300 text-sm sm:text-base font-medium transition duration-300"
                              >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                                Live Demo
                              </a>
                            )}
                            
                            {visibleProjects[0]?.codeUrl && (
                              <a 
                                href={visibleProjects[0].codeUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 hover:text-emerald-300 text-sm sm:text-base font-medium transition duration-300"
                              >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                                </svg>
                                Source Code
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Regular Projects Grid */}
              <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {visibleProjects.slice(1).map((project, index) => {
                  const projectColor = getProjectColor(index);
                  
                  return (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      {/* Card Highlight Glow Effect */}
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${getGradient(projectColor)} rounded-xl opacity-0 group-hover:opacity-70 blur-lg transition duration-500`}></div>
                      
                      <div 
                        className="relative h-full cursor-pointer" 
                        onClick={() => handleProjectClick(project.codeUrl)}
                      >
                        {/* Card Content */}
                        <div className={`flex flex-col h-full bg-zinc-900/80 backdrop-blur-sm border ${getBorderColor(projectColor)} rounded-xl overflow-hidden transition-all duration-300`}>
                          {/* Project Image */}
                          <div className="relative h-48 sm:h-52 lg:h-60 overflow-hidden">
                            {project.imageUrl ? (
                              <Image
                                src={getImageUrl(project.imageUrl)}
                                alt={`${project.title || 'Project'} thumbnail`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center">
                                <div className="text-4xl opacity-30">✨</div>
                              </div>
                            )}
                            
                            {/* Project categories tags */}
                            {project.categories && (
                              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-wrap gap-1 sm:gap-1.5">
                                {project.categories.slice(0, 2).map((category, idx) => (
                                  <span
                                    key={idx}
                                    className={`px-1.5 py-0.5 sm:px-2 sm:py-1 ${getHighlightColor(projectColor)} ${getTextColor(projectColor)} text-[10px] sm:text-xs font-medium rounded-full`}
                                  >
                                    {category}
                                  </span>
                                ))}
                                {project.categories.length > 2 && (
                                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-zinc-800/70 text-zinc-400 text-[10px] sm:text-xs font-medium rounded-full">
                                    +{project.categories.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          
                          {/* Project Content */}
                          <div className="flex-grow p-4 sm:p-5 lg:p-6 flex flex-col">
                            <div className="flex-grow">
                              <h3 className={`text-lg sm:text-xl font-semibold ${getTextColor(projectColor)} group-hover:text-white mb-2 transition-colors duration-300`}>
                                {project.title || 'Untitled Project'}
                              </h3>
                              
                              <div className="relative mb-3 sm:mb-4">
                                <div 
                                  className={`text-zinc-400 text-sm ${
                                    expandedDescriptions[project._id] 
                                      ? '' 
                                      : 'line-clamp-3'
                                  }`}
                                >
                                  {project.description || 'No description provided.'}
                                </div>
                                
                                {project.description && project.description.length > 100 && (
                                  <button 
                                    onClick={(e) => toggleDescription(project._id, e)}
                                    className={`mt-1 text-xs ${getTextColor(projectColor)} hover:text-white focus:outline-none transition-colors duration-200`}
                                  >
                                    {expandedDescriptions[project._id] ? 'Read Less' : 'Read More'}
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            {/* Tech Stack Tags */}
                            {project.techStack && Array.isArray(project.techStack) && project.techStack.length > 0 && (
                              <div className="mt-2 mb-3 sm:mb-4">
                                <h4 className="text-xs text-zinc-500 mb-1.5">Tech Stack</h4>
                                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                                  {project.techStack.slice(0, 3).map((tech, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-0.5 bg-zinc-800 text-zinc-300 text-[10px] rounded"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                  {project.techStack.length > 3 && (
                                    <span className="px-2 py-0.5 bg-zinc-800 text-zinc-500 text-[10px] rounded">
                                      +{project.techStack.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {/* Project Links */}
                            <div className="flex items-center gap-3 mt-auto pt-3 border-t border-zinc-800/80">
                              {project.demoUrl && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={project.demoUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className={`${getTextColor(projectColor)} hover:text-white transition-colors duration-300`}
                                    >
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                      </svg>
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs">Live Demo</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                              
                              {project.codeUrl && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={project.codeUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="text-zinc-400 hover:text-white transition-colors duration-300"
                                    >
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                                      </svg>
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs">Source Code</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                              
                              {/* Project Accent Light */}
                              <div className={`ml-auto w-2 h-2 rounded-full ${getTextColor(projectColor)} ring-2 ring-offset-2 ring-offset-zinc-900 ring-${projectColor}-500/50 opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300`}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </TooltipProvider>
  );
};

export default ProjectsSection;