import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolio';

const topSkills = skills.slice(0, 4);

const skillAbbr = {
  'React.js': '⚛',
  'Next.js': 'N',
  'TypeScript': 'TS',
  'JavaScript': 'JS',
  'Node.js': 'ND',
  'Python': 'PY',
};

const CircularProgress = ({ level, delay = 0, id }) => {
  const size = 96;
  const stroke = 7;
  const radius = (size - stroke) / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <div className="relative w-24 h-24 mx-auto">
      <svg width={size} height={size} className="rotate-[-90deg] drop-shadow-sm">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E8D4D4"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#skillGradient-${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id={`skillGradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7A4040" />
            <stop offset="50%" stopColor="#9E5555" />
            <stop offset="100%" stopColor="#C99595" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.4, duration: 0.5 }}
          className="font-display text-2xl font-black text-[#7A4040] leading-none tabular-nums"
        >
          {level}%
        </motion.span>
      </div>
    </div>
  );
};

const TopSkillCard = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -6, scale: 1.02 }}
    className="skill-top-card group"
  >
    <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-[#9E5555]/10 border border-[#9E5555]/20 flex items-center justify-center text-sm font-black text-[#7A4040] group-hover:bg-[#9E5555]/20 transition-colors">
      {skillAbbr[skill.name] || skill.name.slice(0, 2)}
    </div>

    <CircularProgress level={skill.level} delay={index * 0.12} id={index} />

    <div className="mt-5 text-center">
      <h3 className="font-display text-base md:text-lg font-black text-[#4A2C2C] group-hover:text-[#3D2424] transition-colors">
        {skill.name}
      </h3>
      <span className="inline-flex mt-2 items-center gap-1.5 rounded-full bg-[#9E5555]/10 border border-[#9E5555]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7A4040]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#9E5555]" />
        {skill.category}
      </span>
    </div>

    <div className="mt-4 h-1.5 w-full rounded-full bg-[#E8D4D4] overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full skill-bar-fill"
      />
    </div>
  </motion.div>
);

const SkillBar = ({ name, level, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06, duration: 0.45 }}
    className="group"
  >
    <div className="mb-2 flex items-center justify-between">
      <span className="text-sm font-semibold text-[#4A2C2C] group-hover:text-[#3D2424] transition-colors">{name}</span>
      <span className="text-xs font-black text-[#7A4040] tabular-nums">{level}%</span>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-[#E8D4D4]">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06 + 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full skill-bar-fill"
      />
    </div>
  </motion.div>
);

const Skills = () => {
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" className="bg-[#DFC0C0] pt-24 pb-44 px-6 md:px-12 w-full relative overflow-hidden">
      <div className="absolute top-20 right-0 w-72 h-72 bg-[#7A4040]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-32 left-0 w-96 h-96 bg-[#7A4040]/10 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #4A2C2C 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-12 md:mb-16">
          <span className="section-eyebrow border-[#7A4040]/25 bg-[#7A4040]/10 text-[#4A2C2C] mb-6 mx-auto">
            Expertise
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-[#4A2C2C] mb-5 tracking-tight">
            Skills & Proficiency
          </h2>
          <p className="text-[#5C3333] text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Technologies and tools I use to bring ideas to life
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#9E5555]/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A4040]/70">
              Core strengths
            </span>
            <span className="h-px w-12 bg-[#9E5555]/40" />
          </div>
        </div>

        {/* Top skills highlight */}
        <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-14 md:mb-16">
          {topSkills.map((skill, i) => (
            <TopSkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((category, ci) => {
            const categorySkills = skills.filter((s) => s.category === category);
            return (
              <motion.div
                key={category}
                data-aos="fade-up"
                data-aos-delay={ci * 80}
                whileHover={{ y: -2 }}
                className="bg-[#FFFAFA] rounded-[1.75rem] p-7 md:p-8 shadow-[0_20px_50px_rgba(92,51,51,0.1)] border border-[#E8D4D4] hover:border-[#C99595]/40 hover:shadow-[0_24px_60px_rgba(92,51,51,0.14)] transition-all duration-300"
              >
                <h3 className="font-display text-lg font-black text-[#4A2C2C] mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#9E5555]/10 border border-[#9E5555]/20 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#9E5555]" />
                  </span>
                  {category}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill, i) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div data-aos="fade-up" data-aos-delay="200" className="mt-14 flex flex-wrap items-center justify-center gap-2.5">
          {skills.map((skill) => (
            <motion.span
              key={skill.name}
              whileHover={{ scale: 1.08, y: -2 }}
              className="rounded-full bg-[#FFFAFA]/90 border border-[#7A4040]/10 px-4 py-2 text-xs font-bold text-[#5C3333] shadow-sm cursor-default hover:border-[#9E5555]/30 hover:bg-white hover:shadow-md transition-all duration-300"
              title={`${skill.name}: ${skill.level}%`}
            >
              {skill.name}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-14 md:h-20 fill-[#3D2424]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
};

export default Skills;
