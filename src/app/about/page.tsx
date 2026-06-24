'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { siteConfig } from '@/lib/site-config';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero */}
      <section className="px-6 mb-32">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="mb-12">
              <span className="text-xs text-gold tracking-[0.3em] uppercase font-light">
                About
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-ink-black mt-4">
                关于
              </h1>
              <div className="w-12 h-px bg-gold/40 mt-6" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed text-ink-dark mb-8">
                {siteConfig.about}
              </p>

              <h2 className="text-2xl font-serif font-bold text-ink-black mt-16 mb-6">
                关于这个数字花园
              </h2>

              <p className="text-ink-dark/70 leading-relaxed mb-4">
                这个网站是一个个人数字空间，融合了东方美学与现代技术。在这里，我分享关于设计、技术、生活的思考与感悟。
              </p>

              <p className="text-ink-dark/70 leading-relaxed mb-4">
                设计灵感来源于中国传统水墨画、宋代美学以及现代极简主义。我希望创造一个既有文化底蕴又具有现代感的数字空间。
              </p>

              <blockquote className="border-l-2 border-gold/40 pl-6 italic text-ink-dark/60 my-8">
                &ldquo;在数字世界中，寻找东方美学的诗意栖居。&rdquo;
              </blockquote>

              <h2 className="text-2xl font-serif font-bold text-ink-black mt-16 mb-6">
                技术栈
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {[
                  { name: 'Next.js', desc: 'React 框架' },
                  { name: 'TypeScript', desc: '类型安全' },
                  { name: 'TailwindCSS', desc: '样式框架' },
                  { name: 'Framer Motion', desc: '动画库' },
                  { name: 'Markdown', desc: '内容管理' },
                  { name: 'RSS', desc: '订阅支持' },
                ].map((item) => (
                  <div key={item.name} className="p-4 border border-ink-black/5 rounded-sm">
                    <h3 className="text-sm font-medium text-ink-black">{item.name}</h3>
                    <p className="text-xs text-ink-dark/40 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
