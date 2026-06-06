import React from 'react';
import { personalInfo } from '../data/portfolio';

const Footer = () => {
  const firstName = personalInfo.name.split(' ')[1] || personalInfo.shortName;

  return (
    <footer className="bg-[#2A1818] text-[#E8D4D4] py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[45vh] border-t border-[#5C3333]/30">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 font-medium">
        <div className="flex flex-col gap-1.5">
          <p className="text-white/90 font-bold">Full Stack Development</p>
          <p>React · Node · TypeScript · Python</p>
          <p>REST APIs & MERN Stack</p>
        </div>

        <div className="flex flex-col gap-1.5 md:items-center md:text-center">
          <p>{personalInfo.title.split('|')[0].trim()}</p>
          <a href="#projects" className="text-[#C99595] hover:text-white transition-colors mt-1 underline underline-offset-4">
            View Projects
          </a>
        </div>

        <div className="flex flex-col gap-1.5 md:items-end md:text-right">
          <p>{personalInfo.location}</p>
          <p className="text-white/50">{new Date().getFullYear()}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full py-16 md:py-20 overflow-hidden relative">
        <h2 className="text-[16vw] md:text-[14vw] leading-none font-display font-black tracking-tighter lowercase select-none text-center bg-gradient-to-b from-[#E8D4D4] to-[#7A4040] bg-clip-text text-transparent">
          {firstName.toLowerCase()}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-10 items-end font-medium">
        <div className="flex flex-col gap-5">
          <a href="#contact" className="text-white hover:text-[#C99595] transition-colors font-bold">
            Contact
          </a>
          <p className="text-white/40 text-[9px] md:text-[10px] leading-relaxed">
            &copy; {new Date().getFullYear()} {personalInfo.name}
            <br />
            Built with React + Vite
          </p>
        </div>

        <div className="flex gap-4 md:justify-center">
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#E8D4D4]/10 flex items-center justify-center hover:bg-[#9E5555]/20 hover:border-[#C99595]/40 hover:text-white transition-all"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#E8D4D4]/10 flex items-center justify-center hover:bg-[#9E5555]/20 hover:border-[#C99595]/40 hover:text-white transition-all"
            aria-label="LinkedIn"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="w-10 h-10 rounded-full border border-[#E8D4D4]/10 flex items-center justify-center hover:bg-[#9E5555]/20 hover:border-[#C99595]/40 hover:text-white transition-all"
            aria-label="Email"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        <div className="md:text-right flex flex-col gap-1">
          <a href={`mailto:${personalInfo.email}`} className="lowercase hover:text-white transition-colors">
            {personalInfo.email}
          </a>
          <a href={`tel:${personalInfo.phoneTel}`} className="hover:text-white transition-colors">
            {personalInfo.phone}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
