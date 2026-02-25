import { useEffect, useRef } from "react";

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
      hue: 200 + Math.random() * 60,
    });

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
        m.x -= m.speed * 1.2;
        m.y += m.speed;

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

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.thickness * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${m.hue}, 100%, 80%, ${m.opacity * 0.5})`;
        ctx.fill();

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
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default MeteorField;
