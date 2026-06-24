'use client';

import ScrollReveal from './ScrollReveal';
import Link from 'next/link';

const galleries = [
  { title: '笔墨山水', count: 12, color: 'from-jade/20 to-jade/5', icon: '⛰' },
  { title: '设计随笔', count: 8, color: 'from-gold/20 to-gold/5', icon: '◇' },
  { title: '技术探索', count: 15, color: 'from-ink-blue/20 to-ink-blue/5', icon: '◈' },
  { title: '生活美学', count: 6, color: 'from-bronze/20 to-bronze/5', icon: '○' },
];

export default function GallerySection() {
  return (
    <section className="relative py-32 px-6 bg-paper-light/30">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-20">
            <span className="text-xs text-gold tracking-[0.3em] uppercase font-light">
              Gallery
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink-black mt-4">
              文章展馆
            </h2>
            <p className="text-ink-dark/50 mt-3 max-w-md leading-relaxed">
              每一篇文章都是一件艺术品，按类别展示在展馆中
            </p>
            <div className="w-12 h-px bg-gold/40 mt-6" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {galleries.map((gallery, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Link
                href={`/tags?tag=${encodeURIComponent(gallery.title)}`}
                className="group block aspect-square relative overflow-hidden rounded-sm"
              >
                {/* Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gallery.color} transition-transform duration-700 group-hover:scale-110`} />

                {/* Decorative elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 font-serif">
                    {gallery.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-lg font-serif font-bold text-ink-black group-hover:text-ink-blue transition-colors duration-300">
                    {gallery.title}
                  </h3>
                  <p className="text-xs text-ink-dark/40 mt-1">
                    {gallery.count} 篇文章
                  </p>
                </div>

                {/* Hover border */}
                <div className="absolute inset-2 border border-ink-black/0 group-hover:border-gold/30 transition-colors duration-500 rounded-sm pointer-events-none" />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
