'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ScrollReveal from '@/components/ScrollReveal';
import { GitHubPost, getAllPosts } from '@/lib/github-posts';

export default function HomePage() {
  const [posts, setPosts] = useState<GitHubPost[]>([]);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <>
      <HeroSection />

      {/* 精选文章区 */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-[10px] text-ink-dark/30 tracking-[0.3em] uppercase">Blog</span>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-ink-black mt-4">
                近期文章
              </h2>
              <div className="w-16 h-px bg-ink-black/10 mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {posts.slice(0, 4).map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/article?slug=${post.slug}`}
                  className="group block p-8 bg-white/40 hover:bg-white/60 border border-ink-black/5 rounded-lg transition-all duration-500"
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-ink-black/5 text-ink-dark/40 tracking-[0.1em] uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-ink-black group-hover:text-ink-blue transition-colors mb-3">
                    {post.title}
                  </h3>
                  <p className="text-sm text-ink-dark/40 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3 mt-4 text-[10px] text-ink-dark/30 uppercase tracking-[0.1em]">
                    <time>{post.formattedDate}</time>
                    <span>{post.readingTime} 分钟</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {posts.length > 4 && (
            <div className="text-center mt-12">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-xs text-ink-dark/40 hover:text-ink-black tracking-[0.2em] uppercase transition-colors group"
              >
                查看所有文章
                <span className="w-6 h-px bg-ink-dark/20 group-hover:w-8 transition-all duration-300" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 装饰分隔 */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="ink-divider" />
      </div>

      {/* 副区域 */}
      <section className="relative py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-ink-black/10 mb-6">
              <span className="text-jade font-serif text-xs">帛</span>
            </div>
            <h2 className="text-xl md:text-3xl font-serif font-bold text-ink-black leading-relaxed">
              泼墨山水间 · 一书一世界
            </h2>
            <p className="text-sm text-ink-dark/40 mt-6 leading-relaxed max-w-lg mx-auto">
              在数字世界中，泼墨挥毫，书写属于自己的山水篇章。
            </p>
            <div className="mt-8">
              <a
                href="https://github.com/bsn652"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-ink-dark/30 hover:text-ink-black tracking-[0.2em] uppercase transition-colors group"
              >
                访问 GitHub
                <span className="w-4 h-px bg-ink-dark/20 group-hover:w-6 transition-all duration-300" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
