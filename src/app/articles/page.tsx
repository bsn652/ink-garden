import { getAllPosts, getAllTags } from '@/lib/posts';
import { siteConfig } from '@/lib/site-config';
import ArticlesClient from './ArticlesClient';

export const metadata = {
  title: `文章 · ${siteConfig.name}`,
  description: `浏览所有文章 - ${siteConfig.description}`,
};

export default function ArticlesPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return <ArticlesClient posts={posts} tags={tags} />;
}
