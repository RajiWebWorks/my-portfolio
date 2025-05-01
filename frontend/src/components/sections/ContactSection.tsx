"use client"
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import LottieAnimation from '../common/LottieAnimation'

const ContactSection: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [isHovered, setIsHovered] = useState(false)
  const [activeTab, setActiveTab] = useState<'form' | 'faq'>('form')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Mouse position and UI state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowWidth, setWindowWidth] = useState(0)
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])
  
  // Formspree endpoint
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjkyprka"

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleButtonMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      if (submitStatus !== null) setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  // Calculate glow effect position
  const glowPosition = isHovered && buttonRef.current ? (() => {
    const rect = buttonRef.current.getBoundingClientRect()
    const relX = mousePosition.x - rect.left
    const relY = mousePosition.y - rect.top
    return { x: `${(relX / rect.width) * 100}%`, y: `${(relY / rect.height) * 100}%` }
  })() : { x: "50%", y: "50%" }

  // Current year for copyright
  const currentYear = new Date().getFullYear()

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-16 sm:py-20 md:py-24 lg:py-28 relative bg-zinc-950 overflow-hidden"
    >
      {/* Enhanced premium background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-soft-light"></div>
        <div className="absolute inset-0 bg-gradient-radial from-teal-900/5 to-transparent opacity-20"></div>
        
        {/* Premium geometric shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-600/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-600/5 blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-emerald-500/5 blur-3xl"></div>
        <div className="absolute -bottom-10 left-1/4 w-60 h-60 rounded-full bg-teal-500/5 blur-3xl"></div>
        
        {/* Premium animated dots pattern */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-teal-400"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `pulse ${Math.random() * 8 + 2}s infinite alternate ${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Premium glowing border effects */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Premium section heading with advanced animation */}
        <motion.div 
          style={{ opacity, y }}
          className="relative z-10 mb-12 sm:mb-16 lg:mb-20 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-200 to-emerald-300 inline-block tracking-tight">Get In Touch</h2>
          <div className="relative h-1 sm:h-1.5 w-24 sm:w-32 mx-auto mt-3 sm:mt-5">
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
          <p className="text-zinc-300/90 max-w-lg sm:max-w-xl mx-auto mt-4 sm:mt-5 text-sm md:text-base">
            Let's discuss your project ideas or questions. I'm looking forward to creating something amazing together.
          </p>
        </motion.div>

        {/* Premium main content container */}
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-teal-500/20 via-zinc-800/30 to-emerald-500/20 p-px rounded-2xl backdrop-blur-lg">
            <div className="bg-zinc-900/90 rounded-2xl overflow-hidden">
              {/* Tab navigation for premium look */}
              <div className="flex border-b border-zinc-800">
                <button 
                  onClick={() => setActiveTab('form')}
                  className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'form' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  Contact Form
                </button>
                <button 
                  onClick={() => setActiveTab('faq')}
                  className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'faq' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  FAQ
                </button>
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                {activeTab === 'form' && (
                  <div className="flex flex-col md:flex-row gap-6 sm:gap-8 mb-6 md:mb-0">
                    {/* Left column with lottie and contact info */}
                    <div className="md:w-1/2 mb-6 md:mb-0">
                      {/* Premium Lottie container */}
                      <div className="relative group mb-8">
                        <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                        <div className="relative h-60 w-full bg-zinc-900/80 border-[1px] border-zinc-700/50 rounded-xl overflow-hidden shadow-2xl shadow-zinc-900/50">
                          <LottieAnimation animationPath="/animations/animation.contact.json" />
                          
                          {/* Premium interactive particles overlay */}
                          <div className="absolute inset-0 pointer-events-none z-10">
                            {Array.from({ length: 12 }).map((_, i) => (
                              <motion.div 
                                key={i}
                                className="absolute rounded-full bg-teal-500/40"
                                initial={{
                                  x: Math.random() * 100,
                                  y: Math.random() * 100,
                                  scale: Math.random() * 0.4 + 0.2,
                                  opacity: Math.random() * 0.3 + 0.1
                                }}
                                animate={{
                                  x: [
                                    Math.random() * 100,
                                    Math.random() * 200,
                                    Math.random() * 100
                                  ],
                                  y: [
                                    Math.random() * 100,
                                    Math.random() * 200,
                                    Math.random() * 100
                                  ],
                                  opacity: [0.1, 0.3, 0.1]
                                }}
                                transition={{
                                  duration: Math.random() * 10 + 15,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                                style={{
                                  width: `${Math.random() * 10 + 5}px`,
                                  height: `${Math.random() * 10 + 5}px`,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Premium contact cards */}
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg bg-gradient-to-br from-zinc-800/90 to-zinc-900/70 backdrop-blur-md border border-zinc-800/40 shadow-lg">
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-white text-sm font-medium mb-1">Phone</h3>
                              <a href="tel:+919342081679" className="text-teal-400 hover:text-teal-300 transition-colors text-sm">+91 93420 81679</a>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-gradient-to-br from-zinc-800/90 to-zinc-900/70 backdrop-blur-md border border-zinc-800/40 shadow-lg">
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-white text-sm font-medium mb-1">Email</h3>
                              <a href="mailto:rajeshwaridevendrakumar@gmail.com" className="text-teal-400 hover:text-teal-300 transition-colors text-sm">rajeshwaridevendrakumar@gmail.com</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right column: Premium Contact Form */}
                    <div className="md:w-1/2">
                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <div>
                          <label htmlFor="name" className="block text-xs font-medium text-zinc-300 mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg py-3 px-4 text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 text-sm transition-all"
                            placeholder="Your name"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-xs font-medium text-zinc-300 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg py-3 px-4 text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 text-sm transition-all"
                            placeholder="your@email.com"
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-xs font-medium text-zinc-300 mb-2">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg py-3 px-4 text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 text-sm transition-all resize-none"
                            placeholder="Your message"
                          ></textarea>
                        </div>

                        {/* Premium button with advanced effects */}
                        <div className="relative pt-2">
                          <button
                            ref={buttonRef}
                            type="submit"
                            disabled={isSubmitting}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onMouseMove={handleButtonMouseMove}
                            className="relative w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 overflow-hidden rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold shadow-lg hover:shadow-teal-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {/* Button background with premium gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-700"></div>
                            
                            {/* Enhanced spotlight effect */}
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                              style={{
                                background: isHovered ? `radial-gradient(circle at ${glowPosition.x} ${glowPosition.y}, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 60%)` : "none"
                              }}
                            ></div>
                            
                            {/* Button content */}
                            <div className="relative flex items-center justify-center gap-2">
                              {isSubmitting ? (
                                <>
                                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  <span>Sending...</span>
                                </>
                              ) : (
                                <>
                                  <span>Send Message</span>
                                  <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    animate={{ x: isHovered ? 4 : 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                  >
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                  </motion.svg>
                                </>
                              )}
                            </div>
                          </button>
                        </div>
                        
                        {/* Status Messages */}
                        <div className="h-10 mt-2">
                          <AnimatePresence>
                            {submitStatus === "success" && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="flex items-center justify-center text-emerald-500 text-sm gap-2"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                <span>Message sent successfully!</span>
                              </motion.div>
                            )}
                            
                            {submitStatus === "error" && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="flex items-center justify-center text-red-500 text-sm gap-2"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="15" y1="9" x2="9" y2="15"></line>
                                  <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                                <span>Failed to send message. Please try again.</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-4 sm:space-y-6">
                    {[ // FAQ data
                      {
                        q: "What are your primary skills and career interests?",
                        a: "As a recent graduate passionate about web development, I've focused on building a strong foundation in full-stack technologies including React, Next.js, Node.js, TypeScript, and Tailwind CSS. I'm actively seeking opportunities to apply these skills, contribute to impactful projects, and grow within a dynamic company environment."
                      },
                      // TODO: Add more relevant FAQs for a fresher if needed
                      // Example:
                      // {
                      //   q: "What kind of projects have you worked on?",
                      //   a: "I have built several personal projects, including [mention 1-2 key projects from your portfolio], which allowed me to practice and apply my skills in [mention specific skills used]."
                      // },
                      // {
                      //   q: "Are you open to learning new technologies?",
                      //   a: "Absolutely! I am a quick learner and always eager to expand my skillset and adapt to new technologies and methodologies used by the team."
                      // }
                    ].map((faq, index) => (
                      <div key={index} className="border-b border-zinc-800 pb-4 last:border-b-0">
                        <h3 className="text-base sm:text-lg font-medium text-white mb-2">{faq.q}</h3>
                        <p className="text-sm sm:text-base text-zinc-300/90">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default ContactSection;