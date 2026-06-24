'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/articles', label: '文章' },
    { href: '/tags', label: '标签' },
    { href: '/about', label: '关于' },
    { href: '/admin', label: '管理' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-sm text-white/70 font-serif tracking-[0.3em]">墨·亭</span>
          <span className="w-px h-4 bg-white/20" />
          <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-sans">Ink Garden</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-white/50 hover:text-white/90 tracking-[0.15em] uppercase transition-all duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-5 h-px bg-white/60 transition-all ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`block w-5 h-px bg-white/60 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-white/60 transition-all ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1A1A1A]/95 backdrop-blur-xl border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-white/50 hover:text-white/90 tracking-[0.15em] uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
