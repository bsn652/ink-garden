import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/types';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fn) => fn.endsWith('.md') || fn.endsWith('.mdx'))
    .map((fn) => fn.replace(/\.(md|mdx)$/, ''));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const words = content.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);

    return {
      slug,
      content,
      title: data.title || slug,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      formattedDate: data.date
        ? new Date(data.date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : undefined,
      tags: data.tags || [],
      description: data.description || '',
      coverImage: data.coverImage || undefined,
      readingTime,
      featured: data.featured || false,
      category: data.category || '未分类',
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}
