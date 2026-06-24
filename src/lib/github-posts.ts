// 从 GitHub API 实时获取文章 (无需重新构建)
const GITHUB_OWNER = 'bsn652';
const GITHUB_REPO = 'ink-garden';
const GITHUB_BRANCH = 'master';
const POSTS_PATH = 'src/content/posts';

export interface GitHubPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  formattedDate: string;
  tags: string[];
  content: string;
  readingTime: number;
}

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: '' };

  const frontmatter: Record<string, any> = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const sep = line.indexOf(':');
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    let value: any = line.slice(sep + 1).trim();
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (key === 'tags') {
      try { value = JSON.parse(value.replace(/'/g, '"')); }
      catch { value = value.replace(/[\[\]']/g, '').split(',').map((s: string) => s.trim()).filter(Boolean); }
    }
    frontmatter[key] = value;
  }
  return { data: frontmatter, content: match[2].trim() };
}

// UTF-8 安全 base64 解码
function b64DecodeUnicode(str: string) {
  const binary = atob(str.replace(/\n/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder('utf-8').decode(bytes);
}

export async function getAllSlugs(): Promise<string[]> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${POSTS_PATH}?ref=${GITHUB_BRANCH}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const files = await res.json();
  if (!Array.isArray(files)) return [];
  return files.filter((f: any) => f.name?.endsWith('.md')).map((f: any) => f.name.replace('.md', ''));
}

export async function getPostBySlug(slug: string): Promise<GitHubPost | null> {
  try {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${POSTS_PATH}/${slug}.md?ref=${GITHUB_BRANCH}`;
    const res = await fetch(url, { headers: { 'Accept': 'application/vnd.github.v3+json' } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.content) return null;
    
    const raw = b64DecodeUnicode(data.content);
    const { data: frontmatter, content } = parseFrontmatter(raw);

    const words = content.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);
    const dateStr = frontmatter.date || new Date().toISOString().split('T')[0];
    const date = new Date(dateStr);

    return {
      slug, content,
      title: frontmatter.title || slug,
      date: date.toISOString(),
      formattedDate: date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
      tags: frontmatter.tags || [],
      description: frontmatter.description || '',
      readingTime,
    };
  } catch { return null; }
}

export async function getAllPosts(): Promise<GitHubPost[]> {
  const slugs = await getAllSlugs();
  const posts = (await Promise.all(slugs.map(getPostBySlug)))
    .filter((p): p is GitHubPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}
