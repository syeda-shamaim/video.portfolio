import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolio';

const ProjectModal = ({ project, onClose }) => {
  const fit = project.imageFit ?? 'cover';

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div
            className="h-52 overflow-hidden"
            style={project.imageBg ? { backgroundColor: project.imageBg } : undefined}
          >
            <img
              src={project.image}
              alt={project.title}
              className={`h-full w-full ${fit === 'contain' ? 'object-contain px-4 py-3' : 'object-cover'}`}
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#4A2C2C]/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#9E5555] transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {project.featured && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#9E5555] text-white text-xs font-bold">
              Featured
            </span>
          )}
        </div>
        <div className="p-8">
          <h3 className="font-display text-2xl font-black text-gray-900 mb-3">{project.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">{project.longDescription}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span key={t} className="text-xs font-bold px-3 py-1 rounded-full bg-[#9E5555]/10 text-[#7A4040] border border-[#9E5555]/20">
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !text-sm !py-2.5 !px-5 bg-[#9E5555] !text-white hover:!bg-[#7A4040]"
              >
                Live Demo
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border-2 border-[#9E5555] text-[#9E5555] text-sm font-bold hover:bg-[#9E5555] hover:text-white transition-colors"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, number, className, aosDelay, aosType, pathLength, containerRef, onOpen }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const fit = project.imageFit ?? 'cover';

  useMotionValueEvent(pathLength, 'change', (latest) => {
    if (!ref.current || !containerRef.current) return;
    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const triggerY = cardRect.top - containerRect.top + 50;
    const lineTipY = latest * containerRect.height;
    if (lineTipY >= triggerY && !isActive) setIsActive(true);
    else if (lineTipY < triggerY && isActive) setIsActive(false);
  });

  return (
    <div
      ref={ref}
      data-aos={aosType || 'fade-up'}
      data-aos-delay={aosDelay}
      onClick={() => onOpen(project)}
      className={`w-72 sm:w-80 rounded-[2rem] p-2 relative flex flex-col items-center cursor-pointer z-10 transition-all duration-700 hover:scale-[1.03] ${className} ${
        isActive
          ? 'bg-[#9E5555] shadow-[0_25px_60px_rgba(158,85,85,0.4)]'
          : 'bg-[#FFFAFA] shadow-[0_15px_40px_rgba(92,51,51,0.08)] hover:shadow-[0_25px_50px_rgba(92,51,51,0.14)]'
      }`}
    >
      <div className="w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-inner absolute top-4 border border-gray-300 z-10" />

      <div
        className={`w-full rounded-[1.5rem] mt-8 overflow-hidden flex flex-col min-h-[300px] transition-colors duration-700 ${
          isActive ? 'bg-[#7A4040]/50' : 'bg-[#F0E4E4]'
        }`}
      >
        <div
          className="h-40 w-full overflow-hidden relative group/img"
          style={project.imageBg ? { backgroundColor: project.imageBg } : undefined}
        >
          <img
            src={project.image}
            alt={project.title}
            className={`h-full w-full transition-transform duration-700 group-hover/img:scale-105 ${fit === 'contain' ? 'object-contain px-2 py-2' : 'object-cover'}`}
          />
          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-white text-black text-xs font-bold px-4 py-2 rounded-full">
              View Details
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <span className={`text-lg font-serif italic mb-1 ${isActive ? 'text-red-200' : 'text-gray-400'}`}>
            {number}
          </span>
          <h3 className={`text-xl font-black mb-2 tracking-tight ${isActive ? 'text-white' : 'text-gray-900'}`}>
            {project.title}
          </h3>
          <p className={`text-sm leading-relaxed flex-1 ${isActive ? 'text-red-100' : 'text-gray-500'}`}>
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-200/80 text-gray-600'
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  const positions = [
    'md:absolute md:top-[10px] md:right-[5%] lg:right-[10%] rotate-2 md:rotate-6',
    'md:absolute md:top-[450px] md:left-[5%] lg:left-[10%] -rotate-2 md:-rotate-6',
  ];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="bg-[#F5EBEB] pt-28 pb-36 px-6 md:px-12 w-full relative overflow-hidden bg-[linear-gradient(to_right,#9E555508_1px,transparent_1px),linear-gradient(to_bottom,#9E555508_1px,transparent_1px)] bg-[size:64px_64px]"
    >
      <div className="max-w-6xl mx-auto relative md:h-[900px]">
        <div data-aos="fade-up" className="md:absolute top-10 left-0 md:w-[450px] z-20 mb-16 md:mb-0">
          <span className="section-eyebrow border-[#C99595] bg-[#E8D4D4] text-[#5C3333] mb-8">
            Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-[#4A2C2C] leading-[1.05] mb-6 tracking-tight">
            Featured projects I&apos;ve built
          </h2>
          <p className="text-[#5C3333] text-base md:text-lg max-w-sm font-medium leading-relaxed">
            Full-stack web applications, corporate sites, and innovative final-year projects.
          </p>
        </div>

        <svg className="hidden md:block absolute top-0 left-0 w-full h-[900px] pointer-events-none z-0" viewBox="0 0 1000 900" preserveAspectRatio="none">
          <path d="M 650,150 C 400,250 200,350 300,500 C 400,650 750,600 700,750" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="8 10" />
          <mask id="projects-path-mask">
            <motion.path d="M 650,150 C 400,250 200,350 300,500 C 400,650 750,600 700,750" fill="none" stroke="white" strokeWidth="20" style={{ pathLength }} />
          </mask>
          <path d="M 650,150 C 400,250 200,350 300,500 C 400,650 750,600 700,750" fill="none" stroke="#9E5555" strokeWidth="2" strokeDasharray="8 10" mask="url(#projects-path-mask)" />
        </svg>

        <div className="flex flex-col gap-10 items-center md:block relative z-10 pt-4 md:pt-0">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              number={`0${i + 1}`}
              className={positions[i]}
              aosType={i % 2 === 0 ? 'fade-left' : 'fade-right'}
              aosDelay={String((i + 1) * 100)}
              pathLength={pathLength}
              containerRef={containerRef}
              onOpen={setSelected}
            />
          ))}

          <p
            data-aos="fade-in"
            className="hidden md:block absolute top-[780px] left-[55%] font-[cursive] text-2xl text-gray-400 rotate-6"
          >
            Click a card to explore →
          </p>
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
