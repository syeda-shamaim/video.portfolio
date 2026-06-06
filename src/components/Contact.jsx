import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../data/portfolio';

const socialLinks = [
  {
    label: 'Email',
    href: `mailto:${personalInfo.email}`,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    href: `tel:${personalInfo.phoneTel}`,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: personalInfo.social.github,
    external: true,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: personalInfo.social.linkedin,
    external: true,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  ...(personalInfo.calendly
    ? [{
        label: 'Book a Call',
        href: personalInfo.calendly,
        external: true,
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
      }]
    : []),
];

const contactDetails = [
  {
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phoneTel}`,
  },
  {
    label: 'Location',
    value: personalInfo.location,
  },
];

const Contact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '30%']);

  return (
    <section
      ref={ref}
      id="contact"
      className="bg-[#3D2424] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 border-t border-[#5C3333]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(158,85,85,0.15),transparent_50%)] pointer-events-none" />

      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12"
      >
        <h1
          className="text-[25vw] leading-[0.75] font-black text-[#E8D4D4]/20 uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
        >
          Contact
        </h1>
      </motion.div>

      <div className="relative z-10 w-full flex justify-end items-end px-0 md:px-6 lg:px-12 pb-0">
        <div
          data-aos="fade-up"
          className="contact-card w-full md:w-[92%] lg:w-[82%] xl:w-[78%] text-white relative overflow-hidden md:rounded-tl-[2.5rem] shadow-[-24px_0_80px_rgba(0,0,0,0.45)] border border-white/10 border-r-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#B07070] via-[#9E5555] to-[#7A4040]" />
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-[#3D2424]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col gap-10 md:gap-12">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <span className="section-eyebrow border-white/20 bg-white/10 text-white/90 mb-5">
                  Get in touch
                </span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                  Let&apos;s work together
                </h2>
                <p className="mt-3 text-white/75 text-sm md:text-base max-w-md leading-relaxed">
                  Based in {personalInfo.location}. Open to full-time roles, internships, and freelance projects.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="contact-pill"
                  >
                    {link.icon}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact info + Form grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-8 lg:gap-10">
              {/* Quick contact cards */}
              <div className="flex flex-col gap-3">
                {contactDetails.map((item) => (
                  <div key={item.label} className="contact-info-card">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a href={item.href} className="text-sm md:text-base font-semibold text-white hover:text-[#E8D4D4] transition-colors break-all">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm md:text-base font-semibold text-white">{item.value}</p>
                    )}
                  </div>
                ))}
                <div className="contact-info-card mt-2 border-dashed border-white/20">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Response time</span>
                  <p className="text-sm font-semibold text-white/90">Usually within 24 hours</p>
                </div>
              </div>

              {/* Form panel */}
              <form className="contact-form-panel flex flex-col gap-8 md:gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
                  <div className="contact-field">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" placeholder="John" className="input-underline" />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" placeholder="Doe" className="input-underline" />
                  </div>
                  <div className="contact-field md:col-span-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="you@example.com" className="input-underline" />
                  </div>
                  <div className="contact-field md:col-span-2">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      className="input-underline min-h-[130px] resize-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-2 border-t border-white/15">
                  <div className="flex items-start gap-3 text-sm font-medium text-white/85">
                    <input
                      type="checkbox"
                      id="permission"
                      className="mt-1 w-4 h-4 rounded accent-white cursor-pointer shrink-0"
                      style={{ accentColor: 'white' }}
                    />
                    <label htmlFor="permission" className="cursor-pointer max-w-[300px] leading-snug">
                      I give permission to contact me at this email address.
                    </label>
                  </div>

                  <button type="submit" className="contact-send-btn group">
                    Send Message
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
