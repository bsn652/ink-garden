'use client';

import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-20 px-6 border-t border-ink-black/5">
      {/* 装饰性顶部线 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-ink-black/10 to-transparent" />
      
      <div className="max-w-4xl mx-auto">
        {/* 品牌 */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <span className="text-xs text-ink-black/80 font-serif tracking-[0.3em]">墨·亭</span>
            <span className="w-px h-3 bg-ink-black/10" />
            <span className="text-[9px] text-ink-black/30 tracking-[0.2em] uppercase">Ink Garden</span>
          </Link>
          <p className="text-sm text-ink-dark/40 mt-4 max-w-md mx-auto leading-relaxed">
            {siteConfig.description}
          </p>
        </div>

        {/* 导航 */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 mb-12">
          {[
            { href: '/articles', label: '文章' },
            { href: '/tags', label: '标签' },
            { href: '/about', label: '关于' },
            { href: '/admin', label: '管理' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs text-ink-dark/40 hover:text-ink-black tracking-[0.2em] uppercase transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* 社交链接 */}
        <div className="flex justify-center gap-6 mb-12">
          {siteConfig.social.github && (
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer"
              className="text-xs text-ink-dark/30 hover:text-ink-black tracking-[0.15em] uppercase transition-colors">
              GitHub
            </a>
          )}
          {siteConfig.social.twitter && (
            <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer"
              className="text-xs text-ink-dark/30 hover:text-ink-black tracking-[0.15em] uppercase transition-colors">
              Twitter
            </a>
          )}
        </div>

        {/* 版权 */}
        <div className="text-center text-[10px] text-ink-dark/20 tracking-[0.15em] uppercase">
          &copy; {currentYear} {siteConfig.author}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
