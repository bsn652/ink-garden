'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/site-config';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink-black">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-black via-ink-black/95 to-ink-black/90" />
        {/* Mist effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-transparent via-gold/10 to-transparent blur-[120px]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Subtle label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-block text-xs text-gold/60 tracking-[0.3em] uppercase font-light">
            Digital Garden
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight"
        >
          在数字世界中
          <br />
          <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
            寻找诗意栖居
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
        >
          {siteConfig.description}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-paper to-transparent" />
    </section>
  );
}
