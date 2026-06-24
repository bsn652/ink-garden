'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { siteConfig } from '@/lib/site-config';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 mix-blend-difference">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg text-white font-serif tracking-wider"
            >
              {siteConfig.name}
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center space-x-10"
          >
            {[
              { href: '/', label: '首页' },
              { href: '/articles', label: '文章' },
              { href: '/tags', label: '标签' },
              { href: '/about', label: '关于' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/80 hover:text-white transition-colors tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              className="absolute w-5 h-px bg-white"
              animate={isOpen ? { rotate: 45, translateY: 0 } : { rotate: 0, translateY: -4 }}
            />
            <motion.div
              className="absolute w-5 h-px bg-white"
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.div
              className="absolute w-5 h-px bg-white"
              animate={isOpen ? { rotate: -45, translateY: 0 } : { rotate: 0, translateY: 4 }}
            />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20, pointerEvents: 'none' }}
        className="md:hidden absolute top-20 left-0 right-0 bg-ink-black/90 backdrop-blur-lg"
      >
        <div className="px-6 py-8 space-y-6">
          {[
            { href: '/', label: '首页' },
            { href: '/articles', label: '文章' },
            { href: '/tags', label: '标签' },
            { href: '/about', label: '关于' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-lg text-white/80 hover:text-white transition-colors tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </header>
  );
}
