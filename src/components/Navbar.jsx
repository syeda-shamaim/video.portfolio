import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navLinks } from '../data/portfolio';
import { useScrollSpy } from '../hooks/useScrollSpy';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(navLinks.map((l) => l.href));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isOpen
          ? 'bg-[#9E5555] py-4 shadow-xl'
          : isScrolled
            ? 'py-4 glass-dark shadow-lg shadow-black/30'
            : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-end md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* empty left — name lives in hero only */}
        <div className="hidden md:block" aria-hidden="true" />

        <ul className="hidden md:flex items-center gap-1 justify-center col-start-2">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeSection === link.href
                    ? 'text-white bg-white/10'
                    : 'text-white/65 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-[#C99595]"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex justify-end col-start-3">
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-[#9E5555] text-white text-sm font-bold hover:bg-[#B07070] hover:scale-105 hover:shadow-lg hover:shadow-[#9E5555]/30 transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden glass-dark border-t border-white/10"
      >
        <div className="flex flex-col px-6 py-5 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                activeSection === link.href
                  ? 'bg-[#9E5555]/20 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="mt-3 block text-center px-6 py-3 rounded-full bg-white text-[#7A4040] font-black hover:bg-[#2A1818] hover:text-white transition-colors"
          >
            Hire Me
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
