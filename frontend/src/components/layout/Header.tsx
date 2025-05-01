"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setMobileMenuOpen(false);
  };
  
  const menuItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" }
  ];
  
  return (
    <header className={`bg-teal-700 text-white py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-lg' : ''
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - now acts as Home button */}
          <button 
            onClick={scrollToTop}
            className="flex items-center group"
            aria-label="Home"
          >
            <div className="relative font-bold text-2xl tracking-tight overflow-hidden">
              <span className="inline-block relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-teal-200">
                RK
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
              <span className="absolute -inset-1 bg-teal-600 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></span>
            </div>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {/* Add Home button to desktop nav */}
              <li>
                <button
                  onClick={scrollToTop}
                  className="relative group text-white hover:text-teal-100 transition-colors duration-300"
                >
                  <span>Home</span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative group text-white hover:text-teal-100 transition-colors duration-300"
                  >
                    <span>{item.label}</span>
                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav>
              <ul className="flex flex-col space-y-2">
                {/* Add Home button to mobile nav */}
                <li>
                  <button
                    onClick={scrollToTop}
                    className="block w-full text-left py-2 px-4 text-white hover:bg-teal-600 rounded transition-colors duration-200"
                  >
                    Home
                  </button>
                </li>
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-2 px-4 text-white hover:bg-teal-600 rounded transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;