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
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 80 + 40,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.1,
        alpha: Math.random() * 0.04 + 0.015,
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
      {/* 水墨粒子背景 */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      
      {/* 远山 SVG */}
      <div className="fixed inset-x-0 bottom-0 pointer-events-none z-0 opacity-[0.03]" aria-hidden="true">
        <svg viewBox="0 0 1440 400" className="w-full h-auto">
          <path d="M0,400 L0,280 Q120,200 240,260 Q360,320 480,220 Q540,160 620,200 Q700,240 780,180 Q860,120 960,200 Q1060,280 1140,220 Q1220,160 1320,240 Q1380,280 1440,260 L1440,400 Z" fill="currentColor" className="text-ink-black"/>
          <path d="M0,400 L0,320 Q180,260 320,300 Q460,340 580,280 Q700,220 840,260 Q980,300 1080,240 Q1180,180 1320,260 Q1380,300 1440,290 L1440,400 Z" fill="currentColor" className="text-ink-black" opacity="0.6"/>
          <path d="M0,400 L0,360 Q200,320 400,350 Q600,380 800,340 Q1000,300 1200,350 Q1320,380 1440,360 L1440,400 Z" fill="currentColor" className="text-ink-black" opacity="0.3"/>
        </svg>
      </div>
    </>
  );
}
