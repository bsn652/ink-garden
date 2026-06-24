'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Post } from '@/types';
import ScrollReveal from '@/components/ScrollReveal';

interface TagWithCount {
  name: string;
  count: number;
}

interface TagsClientProps {
  tags: TagWithCount[];
  posts: Post[];
}

export default function TagsClient({ tags, posts }: TagsClientProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag');

  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : [];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-xs text-gold tracking-[0.3em] uppercase font-light">
              Tags
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink-black mt-4">
              标签
            </h1>
            <div className="w-12 h-px bg-gold/40 mt-6" />
          </div>
        </ScrollReveal>

        {/* Tag cloud */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-16">
            {tags.map((tag) => (
              <Link
                key={tag.name}
                href={`/tags?tag=${encodeURIComponent(tag.name)}`}
                className={`group relative px-5 py-2.5 rounded-sm transition-all duration-300 ${
                  activeTag === tag.name
                    ? 'bg-ink-black text-paper'
                    : 'bg-ink-black/5 text-ink-dark/60 hover:bg-ink-black/10'
                }`}
              >
                <span className="text-sm">{tag.name}</span>
                <span className={`text-xs ml-2 ${
                  activeTag === tag.name ? 'text-white/50' : 'text-ink-dark/30'
                }`}>
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* Filtered posts */}
        {activeTag && (
          <div>
            <p className="text-sm text-ink-dark/40 mb-8">
              标签 &ldquo;{activeTag}&rdquo; 下的文章
            </p>
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <ScrollReveal key={post.slug} delay={index * 0.05}>
                  <Link
                    href={`/articles/${post.slug}`}
                    className="group block p-6 -mx-6 rounded-sm hover:bg-ink-black/[0.02] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="space-y-2 flex-1">
                        <h2 className="text-lg font-serif font-bold text-ink-black group-hover:text-ink-blue transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-sm text-ink-dark/50 line-clamp-1">
                          {post.description}
                        </p>
                      </div>
                      <div className="text-xs text-ink-dark/30 whitespace-nowrap pt-1">
                        <time>{post.formattedDate}</time>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-ink-black/5 text-ink-dark/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {!activeTag && (
          <div className="text-center py-16">
            <p className="text-ink-dark/30">点击标签查看相关文章</p>
          </div>
        )}
      </div>
    </div>
  );
}
