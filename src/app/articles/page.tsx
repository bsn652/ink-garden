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
    getAllPosts().then((p) => {
      setPosts(p);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-end pb-16 pt-40 px-6 bg-ink-black">
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-ink-black/80" />
        <div className="max-w-3xl mx-auto relative z-10 w-full">
          <ScrollReveal>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
              文章
            </h1>
            <p className="text-white/40 mt-4 text-sm">
              记录思考，分享知识
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Articles List */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center text-ink-dark/40 py-20">加载中...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-ink-dark/40">暂无文章</p>
            <p className="text-ink-dark/20 text-sm mt-2">
              在 src/content/posts/ 目录下创建 .md 文件
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/article?slug=${post.slug}`}
                  className="group block border-b border-ink-black/5 pb-10"
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-ink-black/5 text-ink-dark/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-ink-black group-hover:text-ink-blue transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-ink-dark/40 mt-3 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-ink-dark/30">
                    <time>{post.formattedDate}</time>
                    <span>{post.readingTime} 分钟阅读</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
