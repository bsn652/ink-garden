'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-ink-black">
      {/* 水墨晕染效果 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-jade/3 blur-[120px] animate-pulse" style={{animationDuration: '8s'}} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-ink-blue/3 blur-[100px] animate-pulse" style={{animationDuration: '10s'}} />
      </div>

      {/* 装饰性远山 */}
      <div className="absolute bottom-0 inset-x-0 h-64 opacity-[0.04]">
        <svg viewBox="0 0 1440 300" className="w-full h-full">
          <path d="M0,300 L0,220 Q100,160 200,180 Q350,210 450,160 Q550,110 650,150 Q750,190 850,130 Q950,70 1050,140 Q1150,210 1250,160 Q1350,110 1440,150 L1440,300 Z" fill="white" />
          <path d="M0,300 L0,250 Q150,200 300,230 Q450,260 550,220 Q650,180 750,210 Q850,240 950,200 Q1050,160 1150,210 Q1250,260 1440,240 L1440,300 Z" fill="white" opacity="0.6" />
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* 印章装饰 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 mb-4">
            <span className="text-seal font-serif text-sm" style={{ fontFamily: 'serif' }}>墨</span>
          </div>
        </motion.div>

        {/* 标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] mb-6"
        >
          {siteConfig.name}
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-white/30 text-sm md:text-base tracking-[0.3em] uppercase mb-12 font-sans"
        >
          {siteConfig.description}
        </motion.p>

        {/* 装饰线 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="w-20 h-px bg-white/10 mx-auto mb-12"
        />

        {/* 按钮组 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/articles"
            className="group relative inline-flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-sm tracking-[0.2em] uppercase transition-all duration-500"
          >
            <span>阅读文章</span>
            <span className="w-4 h-px bg-white/20 group-hover:w-6 transition-all duration-500" />
          </Link>
          <a
            href="https://github.com/bsn652"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-8 py-3 text-white/40 hover:text-white/70 text-sm tracking-[0.2em] uppercase transition-all duration-500"
          >
            <span>GitHub</span>
            <span className="w-4 h-px bg-white/10 group-hover:w-6 transition-all duration-500" />
          </a>
        </motion.div>
      </div>

      {/* 滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
