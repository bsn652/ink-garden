'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Post } from '@/types';
import ReadingProgress from '@/components/ReadingProgress';
import ScrollReveal from '@/components/ScrollReveal';

interface ArticleDetailProps {
  post: Post;
}

export default function ArticleDetail({ post }: ArticleDetailProps) {
  return (
    <>
      <ReadingProgress />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end pb-20 pt-40 px-6 bg-ink-black">
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-ink-black/80" />
        <div className="max-w-3xl mx-auto relative z-10 w-full">
          <ScrollReveal>
            <div className="space-y-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags?tag=${encodeURIComponent(tag)}`}
                    className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/60 hover:bg-white/20 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-white/40">
                <time>{post.formattedDate}</time>
                <span>·</span>
                <span>{post.readingTime} 分钟阅读</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="prose"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children, ...props }) => (
                <h1 className="text-3xl font-serif font-bold mt-12 mb-6 text-ink-black" {...props}>
                  {children}
                </h1>
              ),
              h2: ({ children, ...props }) => (
                <h2 className="text-2xl font-serif font-bold mt-10 mb-4 text-ink-black" {...props}>
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }) => (
                <h3 className="text-xl font-serif font-semibold mt-8 mb-3 text-ink-black" {...props}>
                  {children}
                </h3>
              ),
              p: ({ children, ...props }) => (
                <p className="mb-5 leading-relaxed text-[17px] text-ink-dark" {...props}>
                  {children}
                </p>
              ),
              a: ({ children, href, ...props }) => (
                <a
                  href={href}
                  className="text-ink-blue underline decoration-1 underline-offset-4 hover:decoration-2 transition-all"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  {...props}
                >
                  {children}
                </a>
              ),
              blockquote: ({ children, ...props }) => (
                <blockquote className="border-l-2 border-ink-black/20 pl-6 italic text-ink-dark/80 my-8" {...props}>
                  {children}
                </blockquote>
              ),
              pre: ({ children, ...props }) => (
                <pre className="bg-ink-black/5 rounded-lg p-5 overflow-x-auto my-6 text-sm" {...props}>
                  {children}
                </pre>
              ),
              code: ({ children, ...props }) => (
                <code className="bg-ink-black/5 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              ),
              ul: ({ children, ...props }) => (
                <ul className="list-disc pl-6 mb-5 space-y-1" {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol className="list-decimal pl-6 mb-5 space-y-1" {...props}>
                  {children}
                </ol>
              ),
              hr: () => <hr className="ink-divider my-10" />,
            }}
          >
            {post.content || ''}
          </ReactMarkdown>
        </motion.div>

        {/* Footer */}
        <div className="mt-16 pt-10 border-t border-ink-black/5">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-xs text-ink-dark/30 tracking-wider uppercase">标签</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags?tag=${encodeURIComponent(tag)}`}
                      className="text-xs px-3 py-1 rounded-full bg-ink-black/5 text-ink-dark/50 hover:bg-ink-black/10 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/articles"
                className="text-xs text-ink-dark/40 hover:text-ink-black transition-colors flex items-center gap-1 group"
              >
                <span>←</span>
                <span>返回文章列表</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </>
  );
}
