'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Post } from '@/types';
import ScrollReveal from './ScrollReveal';

interface FeaturedPostsProps {
  posts: Post[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-20">
            <span className="text-xs text-gold tracking-[0.3em] uppercase font-light">
              Featured
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink-black mt-4">
              精选文章
            </h2>
            <div className="w-12 h-px bg-gold/40 mt-6" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {posts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 0.15}>
              <Link href={`/articles/${post.slug}`} className="group block">
                <article className="relative">
                  {/* Cover image placeholder */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-paper-dark mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-ink-black/5 to-ink-black/10 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-serif text-ink-black/10">{index + 1}</span>
                    </div>
                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-ink-black/0 group-hover:bg-ink-black/5 transition-colors duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-ink-dark/40">
                      <time>{post.formattedDate}</time>
                      <span>·</span>
                      <span>{post.readingTime} 分钟阅读</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-ink-black group-hover:text-ink-blue transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-ink-dark/60 text-sm leading-relaxed line-clamp-2">
                      {post.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full bg-ink-black/5 text-ink-dark/50"
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
      </div>
    </section>
  );
}
