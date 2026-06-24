'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReadingProgress from '@/components/ReadingProgress';
import ScrollReveal from '@/components/ScrollReveal';
import { GitHubPost, getPostBySlug } from '@/lib/github-posts';

export default function ArticleViewer() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const [post, setPost] = useState<GitHubPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    setLoading(true);
    getPostBySlug(slug).then((p) => { setPost(p); setLoading(false); });
  }, [slug]);

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-black">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-white mb-4">未指定文章</h1>
          <Link href="/articles" className="text-white/30 hover:text-white/70 text-xs tracking-[0.15em] uppercase transition-colors">← 返回文章列表</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-black">
        <div className="text-white/30 text-xs tracking-[0.15em] uppercase">加载中...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-black">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-white mb-4">文章未找到</h1>
          <Link href="/articles" className="text-white/30 hover:text-white/70 text-xs tracking-[0.15em] uppercase transition-colors">← 返回文章列表</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end pb-20 pt-40 px-6 bg-ink-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-ink-black/80" />
        <div className="absolute bottom-0 inset-x-0 h-48 opacity-[0.03]">
          <svg viewBox="0 0 1440 250" className="w-full h-full">
            <path d="M0,250 L0,180 Q150,130 300,160 Q450,190 550,150 Q650,110 750,140 Q850,170 950,130 Q1050,90 1150,140 Q1250,190 1440,160 L1440,250 Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-3xl mx-auto relative z-10 w-full">
          <ScrollReveal>
            <div className="space-y-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/tags?tag=${encodeURIComponent(tag)}`}
                    className="text-[10px] px-3 py-1.5 rounded-full bg-white/10 text-white/40 hover:bg-white/20 tracking-[0.1em] uppercase transition-all">
                    {tag}
                  </Link>
                ))}
              </div>
              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">{post.title}</h1>
              {/* Meta */}
              <div className="flex items-center gap-4 text-[10px] text-white/30 uppercase tracking-[0.1em]">
                <time>{post.formattedDate}</time>
                <span className="w-px h-3 bg-white/10" />
                <span>{post.readingTime} 分钟阅读</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="prose"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
            h1: ({ children, ...props }) => <h1 className="text-3xl font-serif font-bold mt-12 mb-6 text-ink-black" {...props}>{children}</h1>,
            h2: ({ children, ...props }) => <h2 className="text-2xl font-serif font-bold mt-10 mb-4 text-ink-black" {...props}>{children}</h2>,
            h3: ({ children, ...props }) => <h3 className="text-xl font-serif font-semibold mt-8 mb-3 text-ink-black" {...props}>{children}</h3>,
            p: ({ children, ...props }) => <p className="mb-5 leading-relaxed text-[17px] text-ink-dark" {...props}>{children}</p>,
            a: ({ children, href, ...props }) => <a href={href} className="text-ink-blue underline decoration-1 underline-offset-4 hover:decoration-2 transition-all" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined} {...props}>{children}</a>,
            blockquote: ({ children, ...props }) => <blockquote className="border-l-2 border-ink-black/15 pl-6 italic text-ink-dark/80 my-8 font-serif" {...props}>{children}</blockquote>,
            pre: ({ children, ...props }) => <pre className="bg-ink-black/3 border border-ink-black/6 rounded-lg p-5 overflow-x-auto my-6 text-sm" {...props}>{children}</pre>,
            code: ({ children, ...props }) => <code className="bg-ink-black/4 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>,
            ul: ({ children, ...props }) => <ul className="list-disc pl-6 mb-5 space-y-1" {...props}>{children}</ul>,
            ol: ({ children, ...props }) => <ol className="list-decimal pl-6 mb-5 space-y-1" {...props}>{children}</ol>,
            hr: () => <hr className="ink-divider my-10" />,
          }}>{post.content}</ReactMarkdown>
        </motion.div>

        {/* Footer */}
        <div className="mt-20 pt-10 border-t border-ink-black/5">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-[10px] text-ink-dark/30 tracking-[0.2em] uppercase">标签</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/tags?tag=${encodeURIComponent(tag)}`}
                      className="text-[10px] px-3 py-1.5 rounded-full bg-ink-black/5 text-ink-dark/40 hover:bg-ink-black/10 tracking-[0.1em] uppercase transition-all">{tag}</Link>
                  ))}
                </div>
              </div>
              <Link href="/articles" className="text-[10px] text-ink-dark/30 hover:text-ink-black tracking-[0.15em] uppercase transition-colors flex items-center gap-2 group">
                <span>←</span>
                <span className="relative">
                  返回文章列表
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-ink-black/30 group-hover:w-full transition-all duration-500" />
                </span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </>
  );
}
