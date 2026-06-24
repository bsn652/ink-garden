'use client';

import ScrollReveal from './ScrollReveal';

const thoughts = [
  {
    content: '设计不是如何看起来好看，而是如何让用户感受到什么。就像水墨画中的留白，空白本身就是语言。',
    date: '2024.12',
    mood: '静',
  },
  {
    content: '好的代码就像一首诗，简洁、优雅、富有韵律。每一行都应该有其存在的意义。',
    date: '2024.11',
    mood: '思',
  },
  {
    content: '数字花园的理念：种下想法的种子，定期浇水施肥，让知识自然生长。不追求完美，追求持续进步。',
    date: '2024.10',
    mood: '悟',
  },
];

export default function ThoughtsSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-20">
            <span className="text-xs text-gold tracking-[0.3em] uppercase font-light">
              Thoughts
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink-black mt-4">
              最近思考
            </h2>
            <div className="w-12 h-px bg-gold/40 mt-6" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {thoughts.map((thought, index) => (
            <ScrollReveal key={index} delay={index * 0.12}>
              <div className="group relative p-8 border border-ink-black/5 rounded-sm hover:border-gold/20 transition-colors duration-500 bg-white/40">
                {/* Decorative quote mark */}
                <div className="text-6xl font-serif text-gold/10 absolute -top-2 left-4 leading-none">
                  &ldquo;
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <p className="text-sm text-ink-dark/70 leading-relaxed italic">
                    {thought.content}
                  </p>

                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-ink-black/5">
                    <span className="text-xs text-ink-dark/40">{thought.date}</span>
                    <span className="text-xs text-gold/60 tracking-wider">{thought.mood}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
