import React from 'react';
import { motion } from 'framer-motion';
import stackImage from '../assets/about/image.png';
import reactImage from '../assets/about/react.png';
import nodeImage from '../assets/about/node.png';
import mongoImage from '../assets/about/mongodb.png';
import { personalInfo, aboutBio, experience } from '../data/portfolio';

const techIcons = [
  { src: reactImage, alt: 'React', delay: 0 },
  { src: nodeImage, alt: 'Node.js', delay: 0.1 },
  { src: mongoImage, alt: 'MongoDB', delay: 0.2 },
];

const companyInitials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const ExperienceCard = ({ item, index, isLast }) => {
  const isCurrent = item.period.toLowerCase().includes('present');

  return (
    <motion.article
      data-aos="fade-up"
      data-aos-delay={300 + index * 100}
      className="exp-timeline-item group"
    >
      <div className="exp-timeline-rail" aria-hidden="true">
        <span className={`exp-timeline-node ${isCurrent ? 'exp-timeline-node--active' : ''}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        {!isLast && <span className="exp-timeline-line" />}
      </div>

      <div className="exp-card flex-1 min-w-0">
        <div className="exp-card-header">
          <div className="flex items-start gap-4 min-w-0">
            <div className="exp-company-badge" aria-hidden="true">
              {companyInitials(item.company)}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="font-black text-[#4A2C2C] text-lg md:text-xl group-hover:text-[#3D2424] transition-colors">
                  {item.role}
                </h4>
                {isCurrent && (
                  <span className="exp-current-badge">Current</span>
                )}
              </div>
              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-[#7A4040] hover:text-[#3D2424] hover:underline inline-flex items-center gap-1.5"
                >
                  {item.company}
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <p className="text-sm font-bold text-[#7A4040]">{item.company}</p>
              )}
            </div>
          </div>
          <time className="exp-period-badge shrink-0">{item.period}</time>
        </div>

        <ul className="exp-task-list mt-4">
          {item.tasks.slice(0, 2).map((task) => (
            <li key={task} className="exp-task-item">
              <span className="exp-task-check" aria-hidden="true">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
};

const About = () => {
  const workExperience = experience.filter((e) => e.type === 'work').slice(0, 3);

  return (
    <section id="about" className="bg-[#E8D4D4] pt-24 pb-44 px-6 md:px-12 w-full relative overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row gap-16 items-start">
        <div className="flex flex-col items-center w-full md:w-[350px] shrink-0">
          <div data-aos="drop-bounce" className="relative flex justify-center w-full">
            <div className="absolute -top-32 left-1/2 w-3 h-40 bg-black/80 transform -translate-x-1/2 shadow-inner z-0 rounded-full" />
            <div className="absolute -top-6 left-1/2 w-6 h-12 bg-gradient-to-b from-gray-200 to-gray-400 rounded border border-gray-500 transform -translate-x-1/2 z-10 shadow-lg" />

            <div className="bg-gray-900 w-full max-w-[280px] rounded-2xl p-3 shadow-[0_25px_50px_rgba(0,0,0,0.5)] relative z-20 transform -rotate-3 hover:rotate-0 hover:scale-[1.02] transition-all duration-500">
              <div className="absolute -top-3 left-1/2 w-16 h-6 bg-gray-900 rounded-t-xl transform -translate-x-1/2 flex justify-center items-center">
                <div className="w-8 h-2 bg-black/40 rounded-full" />
              </div>
              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl ring-2 ring-white/10">
                <img src={stackImage} alt={personalInfo.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="mt-3 text-center">
                <p className="text-white font-black text-sm tracking-wide">{personalInfo.shortName}</p>
                <p className="text-[#C99595] text-[10px] font-bold uppercase tracking-widest">Developer</p>
              </div>
            </div>
          </div>
        </div>

        <div data-aos="fade-left" data-aos-delay="200" className="flex-1 mt-4 md:mt-0">
          <span className="section-eyebrow border-[#7A4040]/25 bg-[#7A4040]/10 text-[#4A2C2C] mb-6">
            About Me
          </span>

          <h2 className="font-display text-4xl md:text-6xl font-black text-[#4A2C2C] mb-5 leading-tight">
            Hello!
          </h2>

          <p className="text-lg font-bold mb-6 leading-relaxed max-w-3xl text-[#5C3333]">
            Hi, my name is{' '}
            <span className="text-[#3D2424] text-xl font-black tracking-wide">{personalInfo.shortName}</span>, a
            passionate full-stack developer based in {personalInfo.location}.
          </p>

          <p className="text-base font-medium mb-10 leading-relaxed max-w-3xl text-[#5C3333]/90 border-l-4 border-[#7A4040]/30 pl-5">
            {aboutBio}
          </p>

          <div className="flex items-center gap-8 md:gap-12 mb-14">
            {techIcons.map(({ src, alt, delay }) => (
              <motion.img
                key={alt}
                data-aos="zoom-in"
                whileHover={{ scale: 1.15, y: -4 }}
                src={src}
                alt={alt}
                className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-2xl cursor-pointer"
                style={{ transitionDelay: `${delay}s` }}
              />
            ))}
          </div>

          <div className="exp-section-header mb-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7A4040]/70 mb-2">
                Career journey
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-black text-[#4A2C2C] flex items-center gap-3">
                Experience
              </h3>
            </div>
            <span className="exp-count-badge">{workExperience.length} positions</span>
          </div>

          <div className="exp-timeline">
            {workExperience.map((item, i) => (
              <ExperienceCard
                key={`${item.role}-${item.period}`}
                item={item}
                index={i}
                isLast={i === workExperience.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-30">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-14 md:h-20 fill-[#F5EBEB]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
};

export default About;
