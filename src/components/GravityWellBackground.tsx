import { useEffect, useRef } from "react";
import Matter from "matter-js";

/**
 * GravityWellBackground renders a fixed, animated starfield, meteor shower, and a black hole gravity well using Matter.js.
 * Place this component at the top level of your layout for a seamless effect.
 */
export function GravityWellBackground() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId;

    // Responsive resize
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    resize();
    window.addEventListener("resize", resize);

    // Matter.js setup
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Composite = Matter.Composite;
    const engine = Engine.create();
    engineRef.current = engine;
    engine.gravity.y = 0; // We'll do custom gravity

    // Black hole (gravity well)
    const blackHole = {
      x: width * 0.55,
      y: height * 0.55,
      r: Math.max(60, Math.min(width, height) * 0.09),
      eventHorizon: Math.max(90, Math.min(width, height) * 0.13),
    };
    const blackHoleBody = Bodies.circle(blackHole.x, blackHole.y, blackHole.r, {
      isStatic: true,
      render: { visible: false },
    });
    World.add(engine.world, [blackHoleBody]);

    // Star field (static, for visual only)
    const STAR_COUNT = 120;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.5 + 0.5,
      twinkle: Math.random() * 0.05 + 0.01,
    }));

    // Meteors/particles
    const PARTICLE_COUNT = 18;
    function createParticle() {
      // Some are meteors, some are small stars
      const isMeteor = Math.random() < 0.5;
      const angle = Math.PI / 3 + (Math.random() - 0.5) * 0.18;
      const speed = isMeteor ? Math.random() * 4 + 3 : Math.random() * 1.5 + 0.5;
      const size = isMeteor ? Math.random() * 2 + 2 : Math.random() * 1.2 + 0.5;
      const x = Math.random() * width * 0.7;
      const y = -40 - Math.random() * 200;
      const body = Bodies.circle(x, y, size, {
        frictionAir: 0.01,
        render: { visible: false },
      });
      Body.setVelocity(body, {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      });
      return { body, isMeteor, size, alpha: 1 };
    }
    let particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
    particlesRef.current = particles;
    particles.forEach((p) => World.add(engine.world, p.body));

    // Animation loop
    function draw() {
      ctx.clearRect(0, 0, width, height);
      // Draw background
      ctx.fillStyle = "#0a1026";
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      for (const star of stars) {
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#b3cfff";
        ctx.shadowBlur = 8 * star.r;
        ctx.fill();
        ctx.restore();
        // Twinkle
        star.alpha += (Math.random() - 0.5) * star.twinkle;
        star.alpha = Math.max(0.3, Math.min(1, star.alpha));
      }

      // Draw event horizon (glowing ring)
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(blackHole.x, blackHole.y, blackHole.eventHorizon, 0, 2 * Math.PI);
      const grad = ctx.createRadialGradient(
        blackHole.x,
        blackHole.y,
        blackHole.eventHorizon * 0.85,
        blackHole.x,
        blackHole.y,
        blackHole.eventHorizon
      );
      grad.addColorStop(0, "rgba(80,180,255,0.08)");
      grad.addColorStop(0.7, "rgba(80,180,255,0.18)");
      grad.addColorStop(1, "rgba(255,255,255,0.12)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 18;
      ctx.shadowColor = '#5ecbff';
      ctx.shadowBlur = 32;
      ctx.stroke();
      ctx.restore();

      // Draw black hole (center)
      ctx.save();
      ctx.beginPath();
      ctx.arc(blackHole.x, blackHole.y, blackHole.r, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(10,16,38,0.98)';
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.restore();

      // Draw and update particles
      for (const p of particles) {
        const { body, isMeteor, size } = p;
        // Fade out if inside event horizon
        const dx = body.position.x - blackHole.x;
        const dy = body.position.y - blackHole.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < blackHole.eventHorizon) {
          p.alpha -= 0.04;
        } else if (p.alpha < 1) {
          p.alpha += 0.01;
        }
        if (p.alpha <= 0) {
          // Remove and respawn
          World.remove(engine.world, body);
          Object.assign(p, createParticle());
          World.add(engine.world, p.body);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        if (isMeteor) {
          // Meteor trail
          ctx.strokeStyle = "#b3e0ff";
          ctx.shadowColor = "#b3e0ff";
          ctx.shadowBlur = 16;
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(body.position.x, body.position.y);
          ctx.lineTo(
            body.position.x - body.velocity.x * 8,
            body.position.y - body.velocity.y * 8
          );
          ctx.stroke();
        }
        // Particle/star
        ctx.beginPath();
        ctx.arc(body.position.x, body.position.y, size, 0, 2 * Math.PI);
        ctx.fillStyle = isMeteor ? "#fff" : "#b3cfff";
        ctx.shadowColor = isMeteor ? "#b3e0ff" : "#b3cfff";
        ctx.shadowBlur = isMeteor ? 12 : 8;
        ctx.fill();
        ctx.restore();
      }
    }

    // Physics + draw loop
    function animate() {
      // Custom gravity toward black hole
      for (const p of particles) {
        const { body } = p;
        const dx = blackHole.x - body.position.x;
        const dy = blackHole.y - body.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < blackHole.eventHorizon * 1.5) {
          // Gravity strength increases as it gets closer
          const forceMag = 0.00008 * (1 + 0.8 * (1 - dist / (blackHole.eventHorizon * 1.5)));
          const fx = dx * forceMag;
          const fy = dy * forceMag;
          Matter.Body.applyForce(body, body.position, { x: fx, y: fy });
        }
      }
      Matter.Engine.update(engine, 1000 / 60);
      draw();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
