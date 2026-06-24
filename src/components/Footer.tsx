import { siteConfig } from '@/lib/site-config';

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-ink-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-serif text-ink-black tracking-wider">
              {siteConfig.name}
            </h3>
            <p className="text-sm text-ink-dark/40 mt-3 leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs text-ink-dark/40 tracking-[0.2em] uppercase mb-4">
              探索
            </h4>
            <div className="space-y-3">
                  {[
                    { href: '/articles', label: '文章' },
                    { href: '/tags', label: '标签' },
                    { href: '/about', label: '关于' },
                    { href: '/admin', label: '管理' },
                  ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-ink-dark/60 hover:text-ink-black transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs text-ink-dark/40 tracking-[0.2em] uppercase mb-4">
              联系
            </h4>
            <div className="space-y-3">
              {siteConfig.social.github && (
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-ink-dark/60 hover:text-ink-black transition-colors"
                >
                  GitHub
                </a>
              )}
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-ink-dark/60 hover:text-ink-black transition-colors"
                >
                  Twitter
                </a>
              )}
              {siteConfig.social.email && (
                <a
                  href={`mailto:${siteConfig.social.email}`}
                  className="block text-sm text-ink-dark/60 hover:text-ink-black transition-colors"
                >
                  {siteConfig.social.email}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink-black/5 flex items-center justify-between">
          <p className="text-xs text-ink-dark/30">
            &copy; {new Date().getFullYear()} {siteConfig.author}. All rights reserved.
          </p>
          <p className="text-xs text-ink-dark/20">
            墨·亭 &mdash; 数字花园
          </p>
        </div>
      </div>
    </footer>
  );
}
