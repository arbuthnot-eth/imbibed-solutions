import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles: Particle[] = [];
  const maxParticles = 100;
  const connectionDistance = 150;

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(containerRef.current!);
        
        // Initialize particles
        for (let i = 0; i < maxParticles; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-1, 1),
            vy: p.random(-1, 1)
          });
        }
      };

      p.draw = () => {
        p.background(0);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i];
          
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Bounce off edges
          if (particle.x < 0 || particle.x > p.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > p.height) particle.vy *= -1;
          
          // Draw particle
          p.fill(146, 35, 245); // Accent color
          p.noStroke();
          p.ellipse(particle.x, particle.y, 4, 4);
          
          // Draw connections
          for (let j = i + 1; j < particles.length; j++) {
            const other = particles[j];
            const d = p.dist(particle.x, particle.y, other.x, other.y);
            
            if (d < connectionDistance) {
              const alpha = p.map(d, 0, connectionDistance, 255, 0);
              p.stroke(146, 35, 245, alpha);
              p.line(particle.x, particle.y, other.x, other.y);
            }
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}; 