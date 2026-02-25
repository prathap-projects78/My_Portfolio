import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import prathapPhoto from "@/assets/prathap-photo.png";
import { useEffect, useRef } from "react";

interface HeroProps {
  onOpenChat: () => void;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  thickness: number;
  hue: number;
}

const MeteorField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const meteors: Meteor[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnMeteor = (): Meteor => ({
      x: Math.random() * canvas.width * 1.5,
      y: -Math.random() * canvas.height * 0.5,
      length: Math.random() * 120 + 60,
      speed: Math.random() * 1.5 + 0.8,
      opacity: Math.random() * 0.6 + 0.4,
      thickness: Math.random() * 2 + 0.5,
      hue: 200 + Math.random() * 60, // blue to cyan range
    });

    // Initial meteors spread across screen
    for (let i = 0; i < 25; i++) {
      const m = spawnMeteor();
      m.x = Math.random() * canvas.width * 1.5;
      m.y = Math.random() * canvas.height;
      meteors.push(m);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        // Move diagonally: top-right to bottom-left
        m.x -= m.speed * 1.2;
        m.y += m.speed;

        // Draw glowing streak
        const endX = m.x + m.length * 0.7;
        const endY = m.y - m.length * 0.6;

        const grad = ctx.createLinearGradient(m.x, m.y, endX, endY);
        grad.addColorStop(0, `hsla(${m.hue}, 90%, 70%, ${m.opacity})`);
        grad.addColorStop(0.4, `hsla(${m.hue}, 80%, 55%, ${m.opacity * 0.6})`);
        grad.addColorStop(1, `hsla(${m.hue}, 70%, 40%, 0)`);

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glow effect
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.thickness * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${m.hue}, 100%, 80%, ${m.opacity * 0.5})`;
        ctx.fill();

        // Respawn if off-screen
        if (m.x < -m.length || m.y > canvas.height + m.length) {
          meteors[i] = spawnMeteor();
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

const Hero = ({ onOpenChat }: HeroProps) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Moving stars */}
      <MeteorField />
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Photo */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl opacity-70 blur-sm" />
            <div className="relative w-64 h-80 lg:w-72 lg:h-96 rounded-xl overflow-hidden border-2 border-primary/40 shadow-[0_0_40px_rgba(139,92,246,0.3)] animate-float">
              <img 
                src={prathapPhoto} 
                alt="Prathap - Software Developer" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary">Available for opportunities</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-up">
              <span className="gradient-text">Prathap T</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              CSE Student • Web Developer • AI Enthusiast
            </p>
            
            <p className="text-muted-foreground text-lg mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              AI + Web Aspiring software engineer interested in full-stack development and AI-driven applications. I enjoy turning ideas into practical solutions using modern technologies and continuous learning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Button variant="hero" size="xl" asChild>
                <a href="#projects">
                  View Projects <ArrowRight className="ml-2" />
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" onClick={onOpenChat}>
                <MessageCircle className="mr-2" /> Chat with Prathap Assistant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
