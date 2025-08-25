import { useEffect, useRef } from "react";

/**
 * SpaceBackground renders a fixed, animated meteor shower background using Canvas.
 * Place this component at the top level of your layout for a seamless effect.
 */
function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId: number;

    // Responsive resize
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    resize();
    window.addEventListener("resize", resize);


    // Parallax starfield: 3 layers for depth
    // Dramatic parallax starfield: more stars, brighter, more depth
    const STAR_LAYERS = [
      { count: 120, speed: 0.13, size: [1.2, 2.5], alpha: [0.7, 1.0] },
      { count: 80, speed: 0.07, size: [0.7, 1.7], alpha: [0.4, 0.9] },
      { count: 60, speed: 0.03, size: [0.4, 1.1], alpha: [0.2, 0.7] },
      { count: 40, speed: 0.01, size: [0.2, 0.7], alpha: [0.1, 0.5] },
    ];

    // Shooting stars (rare, bright streaks)
    const SHOOTING_STAR_COUNT = 2;
    function createShootingStar() {
      const angle = Math.PI / 3 + (Math.random() - 0.5) * 0.2;
      const speed = Math.random() * 16 + 12;
      const length = Math.random() * 120 + 80;
      const x = Math.random() * width * 0.7;
      const y = Math.random() * height * 0.5;
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length,
        alpha: 0,
        active: false,
        timer: Math.random() * 400 + 200,
      };
    }
    let shootingStars = Array.from({ length: SHOOTING_STAR_COUNT }, createShootingStar);

    // Distant planets/moons
    const PLANETS = [
      { x: width * 0.18, y: height * 0.22, r: 80, color: '#8b5cf6', glow: '#b3cfff', alpha: 0.18 },
      { x: width * 0.82, y: height * 0.13, r: 60, color: '#00f5ff', glow: '#b3e0ff', alpha: 0.13 },
      { x: width * 0.7, y: height * 0.8, r: 48, color: '#fbbf24', glow: '#fffbe0', alpha: 0.10 },
    ];

    // Faint spiral galaxies
    const GALAXIES = [
      { x: width * 0.35, y: height * 0.7, r: 60, arms: 4, color: '#b3cfff', alpha: 0.10 },
      { x: width * 0.85, y: height * 0.5, r: 38, arms: 3, color: '#fbbf24', alpha: 0.08 },
    ];

    // Space dust (tiny, slow, drifting particles)
    const DUST_COUNT = 60;
    const dust = Array.from({ length: DUST_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 0.7 + 0.2,
      alpha: Math.random() * 0.18 + 0.05,
      dx: (Math.random() - 0.5) * 0.06,
      dy: (Math.random() - 0.5) * 0.06,
    }));

    // Satellite silhouette (rare, drifts across screen)
    let satellite = {
      x: -60,
      y: height * (0.2 + Math.random() * 0.6),
      vx: 0.7 + Math.random() * 0.5,
      size: 32 + Math.random() * 16,
      alpha: 0.18,
      timer: Math.random() * 1200 + 800,
      active: false,
    };
    const starLayers = STAR_LAYERS.map(layer =>
      Array.from({ length: layer.count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * (layer.size[1] - layer.size[0]) + layer.size[0],
        alpha: Math.random() * (layer.alpha[1] - layer.alpha[0]) + layer.alpha[0],
        twinkle: Math.random() * 0.04 + 0.01,
        drift: (Math.random() - 0.5) * layer.speed,
        speed: layer.speed,
      }))
    );

    // Dramatic nebula clouds: larger, more, more color, more opacity
    const NEBULA_COUNT = 6;
    const nebulaColors = [
      'rgba(80,180,255,0.22)',   // blue
      'rgba(180,80,255,0.22)',   // purple
      'rgba(255,180,80,0.22)',   // orange
      'rgba(80,255,180,0.18)',   // teal
      'rgba(255,80,180,0.18)',   // pink
      'rgba(180,255,80,0.18)',   // green
    ];
    const nebulae = Array.from({ length: NEBULA_COUNT }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.8,
      r: Math.random() * 320 + 220,
      color: nebulaColors[i % nebulaColors.length],
      dx: (Math.random() - 0.5) * 0.22,
      dy: (Math.random() - 0.5) * 0.16,
      alpha: 0.22 + Math.random() * 0.13,
      pulse: Math.random() * 0.03 + 0.01,
    }));

    // Meteors
    const METEOR_COUNT = 18;
    function createMeteor() {
      const angle = Math.PI / 3 + (Math.random() - 0.5) * 0.18;
      const speed = Math.random() * 4 + 3;
      const size = Math.random() * 2 + 2;
      const x = Math.random() * width * 0.7;
      const y = -40 - Math.random() * 200;
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        alpha: 1,
      };
    }
    let meteors = Array.from({ length: METEOR_COUNT }, createMeteor);

    // Animation loop

    function draw() {

      ctx.clearRect(0, 0, width, height);
      // Draw background
      ctx.fillStyle = "#0a1026";
      ctx.fillRect(0, 0, width, height);

      // Draw planets/moons (behind everything)
      for (const p of PLANETS) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.glow;
        ctx.shadowBlur = 60;
        ctx.fill();
        ctx.restore();
      }

      // Draw galaxies
      for (const g of GALAXIES) {
        ctx.save();
        ctx.globalAlpha = g.alpha;
        for (let arm = 0; arm < g.arms; arm++) {
          ctx.beginPath();
          for (let t = 0; t < 60; t++) {
            const angle = (arm * (2 * Math.PI / g.arms)) + t * 0.09;
            const radius = g.r * (t / 60);
            const x = g.x + Math.cos(angle) * radius * (1 + 0.2 * Math.sin(t * 0.2));
            const y = g.y + Math.sin(angle) * radius * (1 + 0.2 * Math.cos(t * 0.2));
            if (t === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = g.color;
          ctx.lineWidth = 2;
          ctx.shadowColor = g.color;
          ctx.shadowBlur = 12;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Draw space dust
      for (const d of dust) {
        ctx.save();
        ctx.globalAlpha = d.alpha;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#b3cfff';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      // Draw nebula clouds (behind everything)
      for (const n of nebulae) {
        ctx.save();
        ctx.globalAlpha = n.alpha + 0.08 * Math.sin(Date.now() * n.pulse * 0.7);
        const grad = ctx.createRadialGradient(n.x, n.y, n.r * 0.18, n.x, n.y, n.r);
        grad.addColorStop(0, n.color.replace('0.18', '0.38').replace('0.22', '0.38'));
        grad.addColorStop(0.4, n.color);
        grad.addColorStop(1, 'rgba(10,16,38,0.01)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, 2 * Math.PI);
        ctx.fillStyle = grad;
        ctx.filter = 'blur(18px)';
        ctx.fill();
        ctx.restore();
      }

      // Draw parallax star layers
      for (let l = 0; l < starLayers.length; l++) {
        const layer = starLayers[l];
        for (const star of layer) {
          ctx.save();
          ctx.globalAlpha = star.alpha;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
          ctx.fillStyle = l === 0 ? "#fff" : l === 1 ? "#b3cfff" : "#8bbcff";
          ctx.shadowColor = l === 0 ? "#b3cfff" : l === 1 ? "#8bbcff" : "#5e8fff";
          ctx.shadowBlur = 8 * star.r;
          ctx.fill();
          ctx.restore();
          // Twinkle
          star.alpha += (Math.random() - 0.5) * star.twinkle;
          star.alpha = Math.max(0.1, Math.min(1, star.alpha));
          // Parallax drift
          star.x += star.drift;
          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;
        }
      }

      // Draw and update meteors
      for (const m of meteors) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, m.alpha));
        // Meteor trail
        ctx.strokeStyle = "#b3e0ff";
        ctx.shadowColor = "#b3e0ff";
        ctx.shadowBlur = 16;
        ctx.lineWidth = m.size;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 8, m.y - m.vy * 8);
        ctx.stroke();
        // Meteor head
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#b3e0ff";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      }

      // Draw and update shooting stars
      for (const s of shootingStars) {
        if (!s.active) continue;
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
        ctx.strokeStyle = '#fffbe0';
        ctx.shadowColor = '#fffbe0';
        ctx.shadowBlur = 24;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * (s.length / 20), s.y - s.vy * (s.length / 20));
        ctx.stroke();
        ctx.restore();
      }

      // Draw satellite silhouette
      if (satellite.active) {
        ctx.save();
        ctx.globalAlpha = satellite.alpha;
        ctx.translate(satellite.x, satellite.y);
        ctx.scale(satellite.size / 32, satellite.size / 32);
        // Simple satellite shape (body + solar panels)
        ctx.fillStyle = '#222';
        ctx.fillRect(-6, -4, 12, 8); // body
        ctx.fillRect(-18, -2, 12, 4); // left panel
        ctx.fillRect(6, -2, 12, 4); // right panel
        ctx.restore();
      }
    }

    // Physics + draw loop

    function animate() {
      // Animate nebulae
      for (const n of nebulae) {
        n.x += n.dx;
        n.y += n.dy;
        // Bounce off edges
        if (n.x < n.r) n.dx = Math.abs(n.dx);
        if (n.x > width - n.r) n.dx = -Math.abs(n.dx);
        if (n.y < n.r * 0.3) n.dy = Math.abs(n.dy);
        if (n.y > height - n.r * 0.3) n.dy = -Math.abs(n.dy);
      }
      // Animate meteors
      for (const m of meteors) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y > height + 40 || m.x > width + 40) {
          Object.assign(m, createMeteor());
        }
      }
      // Animate shooting stars
      for (const s of shootingStars) {
        if (!s.active) {
          s.timer--;
          if (s.timer <= 0) {
            Object.assign(s, createShootingStar(), { active: true, alpha: 1 });
          }
          continue;
        }
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.012;
        if (s.x > width + 100 || s.y > height + 100 || s.alpha <= 0) {
          Object.assign(s, createShootingStar());
        }
      }
      // Animate dust
      for (const d of dust) {
        d.x += d.dx;
        d.y += d.dy;
        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;
      }
      // Animate satellite
      if (!satellite.active) {
        satellite.timer--;
        if (satellite.timer <= 0) {
          satellite.active = true;
          satellite.x = -satellite.size;
          satellite.y = height * (0.2 + Math.random() * 0.6);
          satellite.vx = 0.7 + Math.random() * 0.5;
          satellite.size = 32 + Math.random() * 16;
          satellite.alpha = 0.18 + Math.random() * 0.07;
        }
      } else {
        satellite.x += satellite.vx;
        if (satellite.x > width + satellite.size) {
          satellite.active = false;
          satellite.timer = Math.random() * 1200 + 800;
        }
      }
      draw();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
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
export default SpaceBackground;
