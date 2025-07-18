import { useEffect, useRef } from "react";

const ConstellationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.parentElement?.offsetWidth || window.innerWidth;
    let height = canvas.parentElement?.offsetHeight || window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const config = {
      star: { color: "rgba(255,255,255,.5)", width: 1.5, randomWidth: true },
      line: { color: "rgba(255,255,255,.5)", width: 0.2 },
      velocity: 0.1,
      length: Math.floor(width / 6),
      distance: 120,
      radius: Math.floor(width / 5),
      stars: [] as any[],
      position: { x: width / 2, y: height / 2 },
    };

    function Star() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = config.velocity - Math.random() * 0.5;
      this.vy = config.velocity - Math.random() * 0.5;
      this.radius = config.star.randomWidth ? Math.random() * config.star.width : config.star.width;
    }

    function createStars() {
      config.stars = [];
      for (let i = 0; i < config.length; i++) {
        config.stars.push(new (Star as any)());
      }
    }

    function drawStars() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = config.star.color;
      ctx.strokeStyle = config.line.color;
      ctx.lineWidth = config.line.width;

      for (let i = 0; i < config.length; i++) {
        const star = config.stars[i];
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        ctx.fill();
      }
    }

    function animateStars() {
      for (let i = 0; i < config.length; i++) {
        const star = config.stars[i];
        if (star.y < 0 || star.y > height) star.vy = -star.vy;
        if (star.x < 0 || star.x > width) star.vx = -star.vx;
        star.x += star.vx;
        star.y += star.vy;
      }
    }

    function drawLines() {
      for (let i = 0; i < config.length; i++) {
        for (let j = 0; j < config.length; j++) {
          const a = config.stars[i];
          const b = config.stars[j];
          if (
            Math.abs(a.x - b.x) < config.distance &&
            Math.abs(a.y - b.y) < config.distance &&
            Math.abs(a.x - config.position.x) < config.radius &&
            Math.abs(a.y - config.position.y) < config.radius
          ) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }

    function animate() {
      drawStars();
      drawLines();
      animateStars();
      animationRef.current = requestAnimationFrame(animate);
    }

    function handleResize() {
      width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.parentElement?.offsetHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      config.length = Math.floor(width / 6);
      config.radius = Math.floor(width / 5);
      config.position = { x: width / 2, y: height / 2 };
      createStars();
    }

    createStars();
    animate();

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      config.position.x = e.clientX - rect.left;
      config.position.y = e.clientY - rect.top;
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ConstellationBackground;