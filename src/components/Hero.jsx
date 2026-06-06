import React, { useRef, useState, useEffect, useId } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, heroTags } from '../data/portfolio';
import { claimHeroVideo, releaseHeroVideo, stopVideo } from '../lib/heroVideo';

const heroVideo = '/hero.mp4';

const Hero = () => {
  const videoRef = useRef(null);
  const allowAudioRef = useRef(false);
  const [isMuted, setIsMuted] = useState(true);
  const ownerId = useId();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    claimHeroVideo(ownerId, video);

    let alive = true;
    let started = false;

    const syncAudio = () => {
      if (!alive) return;
      setIsMuted(video.muted || video.volume === 0);
    };

    const beginPlayback = async () => {
      if (!alive || started) return;
      started = true;

      video.pause();
      video.currentTime = 0;
      video.playbackRate = 1;
      video.volume = 1;

      try {
        video.muted = false;
        await video.play();
        if (!alive) {
          stopVideo(video);
          return;
        }
        allowAudioRef.current = true;
      } catch {
        if (!alive) {
          stopVideo(video);
          return;
        }
        allowAudioRef.current = false;
        video.muted = true;
        await video.play();
        if (!alive) {
          stopVideo(video);
          return;
        }
      }

      if (alive) syncAudio();
    };

    const onCanPlayThrough = () => beginPlayback();

    video.addEventListener('canplaythrough', onCanPlayThrough, { once: true });
    video.addEventListener('play', syncAudio);
    video.addEventListener('pause', syncAudio);
    video.addEventListener('volumechange', syncAudio);

    return () => {
      alive = false;
      video.removeEventListener('canplaythrough', onCanPlayThrough);
      video.removeEventListener('play', syncAudio);
      video.removeEventListener('pause', syncAudio);
      video.removeEventListener('volumechange', syncAudio);
      releaseHeroVideo(ownerId, video);
    };
  }, [ownerId]);

  const toggleMute = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const video = videoRef.current;
    if (!video) return;

    allowAudioRef.current = true;
    claimHeroVideo(ownerId, video);

    if (video.muted || video.volume === 0) {
      video.volume = 1;
      video.muted = false;
      setIsMuted(false);
      if (video.paused) {
        video.play().catch(() => {});
      }
      return;
    }

    video.muted = true;
    video.volume = 0;
    setIsMuted(true);
  };

  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={heroVideo}
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(255,42,42,0.15),transparent_55%)] z-10" />

      <div className="absolute inset-0 z-20 pt-36 md:pt-44 px-6 pb-20 md:pb-[6%] md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end gap-8">
        <div className="flex flex-col items-start max-w-2xl w-full mt-4 md:mt-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-white leading-[1.05] mb-4"
          >
            <span className="block text-xl md:text-3xl font-semibold text-white/80 mb-3 tracking-wide">
              Hi, I&apos;m
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
              <span className="text-gradient">Syeda Shamaim</span>
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-stroke-white mt-1">
              Fatima
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 mb-2 inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-xs font-bold text-white/90 tracking-wide"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff2a2a] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff2a2a]" />
            </span>
            Available for opportunities
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[#ff6b6b] text-base md:text-xl font-semibold mb-3 max-w-lg"
          >
            {personalInfo.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-white/75 text-sm md:text-base font-medium mb-8 max-w-md leading-relaxed"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap items-center gap-2 mb-10"
          >
            {heroTags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="tag-pill bg-[#ff2a2a]/20 border-[#ff2a2a]/40 text-white hover:bg-[#ff2a2a]/35 hover:border-[#ff2a2a]/60"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a href="#projects" className="btn-primary">
              View Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#contact" className="btn-outline">
              Contact Me
            </a>
          </motion.div>
        </div>

        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          onClick={toggleMute}
          className="mt-10 md:mt-0 flex flex-row md:flex-col items-center gap-3 cursor-pointer group"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#ff2a2a]/30 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-white/30 glass-dark flex justify-center items-center group-hover:scale-110 group-hover:border-[#ff2a2a] group-hover:bg-[#ff2a2a]/20 transition-all duration-500">
              {isMuted ? (
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6a7 7 0 010 12M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-white/60 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase group-hover:text-white transition-colors">
            {isMuted ? 'Unmute' : 'Mute'}
          </span>
        </motion.button>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 text-white/40 hover:text-white transition-colors"
        aria-label="Scroll to about"
      >
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
