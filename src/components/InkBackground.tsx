'use client';

import { useEffect, useRef } from 'react';

export default function InkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 水墨粒子
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; alpha: number }[] = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.08,
        alpha: Math.random() * 0.03 + 0.01,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91, 140, 90, ${p.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      
      {/* 泼墨山景装饰 */}
      <div className="fixed inset-x-0 bottom-0 pointer-events-none z-0 opacity-[0.04]" aria-hidden="true">
        <svg viewBox="0 0 1440 500" className="w-full h-auto">
          {/* 层叠远山 */}
          <path d="M0,500 L0,380 Q80,340 160,360 Q280,390 380,340 Q480,290 560,320 Q660,360 740,300 Q820,240 920,310 Q1020,380 1100,330 Q1180,280 1280,340 Q1360,370 1440,350 L1440,500 Z" fill="currentColor" className="text-ink-black"/>
          <path d="M0,500 L0,420 Q120,370 240,400 Q380,440 480,380 Q600,320 720,360 Q840,400 960,340 Q1080,280 1200,340 Q1320,390 1440,370 L1440,500 Z" fill="currentColor" className="text-ink-black" opacity="0.5"/>
          <path d="M0,500 L0,460 Q160,410 320,440 Q480,470 640,420 Q800,370 960,400 Q1120,430 1280,380 Q1360,360 1440,390 L1440,500 Z" fill="currentColor" className="text-ink-black" opacity="0.25"/>
          {/* 云雾 */}
          <ellipse cx="300" cy="400" rx="200" ry="30" fill="currentColor" className="text-ink-black" opacity="0.08"/>
          <ellipse cx="900" cy="380" rx="250" ry="25" fill="currentColor" className="text-ink-black" opacity="0.06"/>
          <ellipse cx="1200" cy="420" rx="180" ry="20" fill="currentColor" className="text-ink-black" opacity="0.07"/>
        </svg>
      </div>

      {/* 装饰性水墨元素 */}
      <div className="fixed top-1/4 right-10 w-32 h-32 rounded-full bg-jade/2 blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-1/3 left-10 w-48 h-48 rounded-full bg-ink-blue/2 blur-3xl pointer-events-none z-0" />
    </>
  );
}
