'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Post } from '@/types';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
}

export default function SearchDialog({ isOpen, onClose, posts }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerQuery) ||
          post.description.toLowerCase().includes(lowerQuery) ||
          post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
      const timer = setTimeout(() => setResults(filtered), 200);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query, posts]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
        >
          <div
            className="absolute inset-0 bg-ink-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-lg mx-4 bg-paper rounded-sm shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-ink-black/5">
              <svg className="w-4 h-4 text-ink-dark/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索文章..."
                className="flex-1 bg-transparent text-sm text-ink-black placeholder-ink-dark/20 outline-none"
              />
              <kbd className="text-xs text-ink-dark/20 px-2 py-1 border border-ink-black/5 rounded">
                ESC
              </kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {results.length > 0 ? (
                results.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/articles/${post.slug}`}
                    onClick={onClose}
                    className="block p-3 rounded-sm hover:bg-ink-black/5 transition-colors"
                  >
                    <h4 className="text-sm font-medium text-ink-black">{post.title}</h4>
                    <p className="text-xs text-ink-dark/40 mt-1 line-clamp-1">{post.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-ink-black/5 text-ink-dark/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))
              ) : query.trim() ? (
                <div className="p-8 text-center">
                  <p className="text-sm text-ink-dark/30">未找到相关文章</p>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-sm text-ink-dark/20">输入关键词开始搜索</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
