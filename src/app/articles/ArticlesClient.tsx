'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Post } from '@/types';
import ScrollReveal from '@/components/ScrollReveal';
import SearchDialog from '@/components/SearchDialog';

interface ArticlesClientProps {
  posts: Post[];
  tags: string[];
}

export default function ArticlesClient({ posts, tags }: ArticlesClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts;

  return (
    <>
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <ScrollReveal>
            <div className="mb-16">
              <span className="text-xs text-gold tracking-[0.3em] uppercase font-light">
                Articles
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink-black mt-4">
                文章
              </h1>
              <div className="w-12 h-px bg-gold/40 mt-6" />
            </div>
          </ScrollReveal>

          {/* Search and filter bar */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
              {/* Tags filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTag(null)}
                  className={`text-xs px-4 py-2 rounded-full transition-all duration-300 ${
                    !activeTag
                      ? 'bg-ink-black text-paper'
                      : 'bg-ink-black/5 text-ink-dark/50 hover:bg-ink-black/10'
                  }`}
                >
                  全部
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`text-xs px-4 py-2 rounded-full transition-all duration-300 ${
                      activeTag === tag
                        ? 'bg-ink-black text-paper'
                        : 'bg-ink-black/5 text-ink-dark/50 hover:bg-ink-black/10'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 text-xs text-ink-dark/40 hover:text-ink-black transition-colors group"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>搜索 (Ctrl+K)</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Articles grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 0.05}>
                <Link href={`/articles/${post.slug}`} className="group block">
                  <article className="relative h-full">
                    {/* Cover */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-paper-dark mb-5">
                      <div className="absolute inset-0 bg-gradient-to-br from-ink-black/5 to-ink-black/10 group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-serif text-ink-black/10">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-ink-dark/30">
                        <time>{post.formattedDate}</time>
                        <span>·</span>
                        <span>{post.readingTime} 分钟</span>
                      </div>
                      <h2 className="text-lg font-serif font-bold text-ink-black group-hover:text-ink-blue transition-colors duration-300">
                        {post.title}
                      </h2>
                      <p className="text-sm text-ink-dark/50 leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-ink-black/5 text-ink-dark/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Empty state */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-ink-dark/30">暂无文章</p>
            </div>
          )}
        </div>
      </div>

      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} posts={posts} />
    </>
  );
}
