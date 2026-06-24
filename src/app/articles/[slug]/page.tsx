import { getPostBySlug, getPostSlugs } from '@/lib/posts';
import { siteConfig } from '@/lib/site-config';
import { notFound } from 'next/navigation';
import ArticleDetail from './ArticleDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: '未找到 · ' + siteConfig.name };

  return {
    title: `${post.title} · ${siteConfig.name}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <ArticleDetail post={post} />;
}
