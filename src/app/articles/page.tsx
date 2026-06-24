'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { GitHubPost, getAllPosts } from '@/lib/github-posts';

export default function ArticlesPage() {
  const [posts, setPosts] = useState<GitHubPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts().then((p) => { setPosts(p); setLoading(false); });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end pb-20 pt-40 px-6 bg-ink-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-ink-black/80" />
        <div className="absolute bottom-0 inset-x-0 h-48 opacity-[0.03]">
          <svg viewBox="0 0 1440 250" className="w-full h-full">
            <path d="M0,250 L0,180 Q150,130 300,160 Q450,190 550,150 Q650,110 750,140 Q850,170 950,130 Q1050,90 1150,140 Q1250,190 1440,160 L1440,250 Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 w-full">
          <ScrollReveal>
            <div className="space-y-4">
              <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Blog</span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">文章</h1>
              <p className="text-white/30 text-sm">记录思考，分享知识</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Articles List */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        {loading ? (
          <div className="text-center text-ink-dark/30 py-20 text-sm tracking-[0.15em] uppercase">加载中...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-ink-dark/30 text-sm tracking-[0.15em] uppercase">暂无文章</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  href={`/article?slug=${post.slug}`}
                  className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 bg-white/30 hover:bg-white/60 border border-ink-black/5 rounded-lg transition-all duration-500"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-ink-black/5 text-ink-dark/40 tracking-[0.1em] uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-lg md:text-xl font-serif font-bold text-ink-black group-hover:text-ink-blue transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-ink-dark/40 mt-2 line-clamp-1">{post.description}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-3 md:mt-0 md:ml-6 text-[10px] text-ink-dark/30 uppercase tracking-[0.1em] whitespace-nowrap">
                    <time>{post.formattedDate}</time>
                    <span className="w-px h-3 bg-ink-black/10" />
                    <span>{post.readingTime} 分钟</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
