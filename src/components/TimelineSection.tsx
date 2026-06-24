'use client';

import ScrollReveal from './ScrollReveal';
import { TimelineEvent } from '@/types';

const timelineEvents: TimelineEvent[] = [
  {
    year: '2024',
    title: '数字花园构想',
    description: '开始构建个人数字空间，探索东方美学与技术的融合',
    type: 'milestone',
  },
  {
    year: '2024',
    title: 'React 深度实践',
    description: '深入探索 React 生态，构建高性能 Web 应用',
    type: 'project',
  },
  {
    year: '2023',
    title: '开源贡献',
    description: '向多个开源项目提交代码，参与社区建设',
    type: 'milestone',
  },
  {
    year: '2023',
    title: '设计系统构建',
    description: '打造具有东方韵味的组件库和设计系统',
    type: 'project',
  },
  {
    year: '2022',
    title: '前端之旅',
    description: '开始学习前端开发，踏上编程之路',
    type: 'milestone',
  },
];

export default function TimelineSection() {
  return (
    <section className="relative py-32 px-6 bg-paper-light/50">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-20">
            <span className="text-xs text-gold tracking-[0.3em] uppercase font-light">
              Timeline
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink-black mt-4">
              时间长廊
            </h2>
            <div className="w-12 h-px bg-gold/40 mt-6" />
          </div>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/20 via-ink-black/10 to-transparent" />

          {timelineEvents.map((event, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.12}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className={`relative flex items-start gap-8 mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-paper border-2 border-gold/60 z-10" />

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                }`}>
                  <span className="text-xs text-gold tracking-wider">{event.year}</span>
                  <h3 className="text-lg font-serif font-bold text-ink-black mt-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-ink-dark/60 mt-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
