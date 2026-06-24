export interface Post {
  slug: string;
  title: string;
  date: string;
  formattedDate?: string;
  tags: string[];
  description: string;
  coverImage?: string;
  readingTime?: number;
  content?: string;
  featured?: boolean;
  category?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: string;
  avatar: string;
  about: string;
  social: {
    github?: string;
    twitter?: string;
    email?: string;
  };
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: 'project' | 'milestone' | 'article';
}

export interface Thought {
  id: string;
  content: string;
  date: string;
  mood?: string;
}
