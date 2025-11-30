
import React, { useEffect, useRef } from 'react';

interface Props {
  trigger: boolean;
  x?: number;
  y?: number;
  onComplete?: () => void;
}

export const ConfettiFX: React.FC<Props> = ({ trigger, x, y, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!trigger || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#8b5cf6', '#1cd47b', '#ffca28', '#ffffff', '#ef4444'];
    let particles: Particle[] = [];
    const particleCount = 60;

    // Origin position (default to center if not provided)
    const originX = x || window.innerWidth / 2;
    const originY = y || window.innerHeight / 2;

    class Particle {
      x: number;
      y: number;
      speed: number;
      angle: number;
      size: number;
      color: string;
      decay: number;
      gravity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.speed = Math.random() * 8 + 2;
        this.angle = Math.random() * Math.PI * 2;
        this.size = Math.random() * 6 + 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.decay = Math.random() * 0.02 + 0.015;
        this.gravity = 0.2;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.size -= this.decay;
        this.speed *= 0.95; // Friction
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0, this.size), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(originX, originY));
    }

    let animationId: number;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.size <= 0.1) {
          particles.splice(index, 1);
        }
      });

      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate);
      } else {
        if (onComplete) onComplete();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [trigger, x, y]);

  if (!trigger) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[100]"
    />
  );
};
