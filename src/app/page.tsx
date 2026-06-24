import { getFeaturedPosts } from '@/lib/posts';
import HeroSection from '@/components/HeroSection';
import FeaturedPosts from '@/components/FeaturedPosts';
import TimelineSection from '@/components/TimelineSection';
import ThoughtsSection from '@/components/ThoughtsSection';
import GallerySection from '@/components/GallerySection';

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();

  return (
    <>
      <HeroSection />
      <FeaturedPosts posts={featuredPosts} />
      <TimelineSection />
      <ThoughtsSection />
      <GallerySection />
    </>
  );
}
