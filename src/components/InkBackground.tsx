'use client';

import { useEffect, useRef } from 'react';

export default function InkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Subtle mountain silhouettes
    const drawMountains = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Very subtle background mist
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 0.3, 0,
        canvas.width / 2, canvas.height * 0.3, canvas.width * 0.6
      );
      gradient.addColorStop(0, 'rgba(200, 195, 180, 0.15)');
      gradient.addColorStop(1, 'rgba(248, 246, 242, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ink mountain silhouettes
      const mountains = [
        { peak: 0.25, height: 0.3, width: 0.4, x: -0.1, opacity: 0.03 },
        { peak: 0.35, height: 0.25, width: 0.35, x: 0.3, opacity: 0.04 },
        { peak: 0.3, height: 0.2, width: 0.3, x: 0.6, opacity: 0.025 },
        { peak: 0.2, height: 0.15, width: 0.25, x: 0.8, opacity: 0.02 },
      ];

      mountains.forEach(({ peak, height, width, x: startX, opacity }) => {
        ctx.beginPath();
        ctx.moveTo(startX * canvas.width, canvas.height);
        ctx.quadraticCurveTo(
          (startX + width * 0.25) * canvas.width,
          canvas.height * (1 - peak * 2),
          (startX + width * 0.5) * canvas.width,
          canvas.height * (1 - height)
        );
        ctx.quadraticCurveTo(
          (startX + width * 0.75) * canvas.width,
          canvas.height * (1 - peak * 1.5),
          (startX + width) * canvas.width,
          canvas.height
        );
        ctx.fillStyle = `rgba(26, 26, 26, ${opacity})`;
        ctx.fill();
      });
    };

    drawMountains();

    let animationId: number;
    let scrollY = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply subtle parallax
      ctx.save();
      ctx.translate(0, scrollY * 0.1);
      drawMountains();
      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
