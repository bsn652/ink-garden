import { Suspense } from 'react';
import { getAllTags, getPostsByTag, getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/site-config';
import TagsClient from './TagsClient';

export const metadata = {
  title: `标签 · ${siteConfig.name}`,
  description: `浏览所有标签 - ${siteConfig.description}`,
};

export default function TagsPage() {
  const tags = getAllTags();
  const posts = getAllPosts();

  const tagsWithCount = tags.map((tag) => ({
    name: tag,
    count: getPostsByTag(tag).length,
  }));

  return (
    <Suspense fallback={<div className="min-h-screen pt-32 pb-20 px-6"><div className="max-w-7xl mx-auto"><p className="text-ink-dark/30">加载中...</p></div></div>}>
      <TagsClient tags={tagsWithCount} posts={posts} />
    </Suspense>
  );
}
