"use client"
import type React from "react"
import { motion } from "framer-motion"

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-zinc-950 text-white py-14 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          {/* Logo with improved spacing */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-900/20">
              <span className="font-bold text-xl">RK</span>
            </div>
          </motion.div>

          {/* Social Links - With better spacing and layout */}
          <div className="flex justify-center gap-6 mb-12">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800/60 border border-zinc-700/30 hover:bg-zinc-700/50 transition-colors"
                whileHover={{ 
                  scale: 1.1, 
                  y: -3,
                  backgroundColor: "rgba(20, 184, 166, 0.2)", 
                  borderColor: "rgba(20, 184, 166, 0.3)" 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-zinc-400 group-hover:text-teal-400 transition-colors">
                  {link.icon}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Divider with unique style */}
          <div className="w-full max-w-md mb-10 flex items-center">
            <div className="h-px flex-1 bg-zinc-800"></div>
            <div className="px-4">
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-teal-400 to-teal-600"></div>
            </div>
            <div className="h-px flex-1 bg-zinc-800"></div>
          </div>

          {/* Copyright with improved typography */}
          <div className="text-center mb-8">
            <p className="text-zinc-400 text-sm tracking-wide">
              © {currentYear} <span className="text-teal-400 font-medium">Rajeshwari Kumar</span>. All rights reserved.
            </p>
          </div>

          {/* Bottom links with better spacing */}
          <div className="flex justify-center gap-8 text-xs text-zinc-500 font-medium">
            <a href="/privacy" className="hover:text-teal-400 transition-colors py-1">Privacy</a>
            <a href="/terms" className="hover:text-teal-400 transition-colors py-1">Terms</a>
            <a href="/contact" className="hover:text-teal-400 transition-colors py-1">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Social icons definition
const socialLinks = [
  {
    href: "https://github.com/RajiWebWorks",
    icon: <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  },
  {
    href: "https://x.com/Raji192002",
    icon: <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
  },
  {
    href: "https://www.instagram.com/raji_00033/",
    icon: <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
    </svg>
  },
  {
    href: "https://www.linkedin.com/in/rajeshwarikumar/",
    icon: <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  }
]

export default Footer