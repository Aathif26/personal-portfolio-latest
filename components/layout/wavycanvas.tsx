"use client"

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const mouseInfluence = prefersReducedMotion ? 10 : 60;
    const influenceRadius = prefersReducedMotion ? 160 : 300;
    const smoothing = prefersReducedMotion ? 0.04 : 0.08;

    /* Theme-aware wave palette */
    const computeThemeColors = () => {
      const root = getComputedStyle(document.documentElement);
      const resolveColor = (vars: string[], alpha = 1): string => {
        const el = document.createElement("div");
        el.style.cssText =
          "position:absolute;visibility:hidden;width:1px;height:1px";
        document.body.appendChild(el);
        let color = `rgba(255,255,255,${alpha})`;
        for (const v of vars) {
          const val = root.getPropertyValue(v).trim();
          if (val) {
            el.style.backgroundColor = `var(${v})`;
            const c = getComputedStyle(el).backgroundColor;
            if (c && c !== "rgba(0, 0, 0, 0)") {
              if (alpha < 1) {
                const m = c.match(
                  /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/,
                );
                if (m) color = `rgba(${m[1]},${m[2]},${m[3]},${alpha})`;
              } else {
                color = c;
              }
              break;
            }
          }
        }
        document.body.removeChild(el);
        return color;
      };

      const isDark = document.documentElement.classList.contains("dark");

      return {
        bgTop: isDark ? "oklch(0.25 0.01 260)" : "oklch(1 0 0)",
        bgBottom: isDark ? "oklch(0.04 0.005 260)" : "oklch(0.94 0.04 145)",
        waves: isDark 
          ? [
              {
                offset: 0,
                amplitude: 70,
                frequency: 0.003,
                color: resolveColor(["--primary"], 0.7),
                opacity: 0.35,
              },
              {
                offset: Math.PI / 2,
                amplitude: 95,
                frequency: 0.0025,
                color: "oklch(0.65 0.2 160)", // Deep Emerald
                opacity: 0.25,
              },
              {
                offset: Math.PI,
                amplitude: 60,
                frequency: 0.0035,
                color: "oklch(0.5 0.15 220)", // Subtle Sapphire
                opacity: 0.2,
              },
              {
                offset: Math.PI * 1.5,
                amplitude: 80,
                frequency: 0.002,
                color: resolveColor(["--accent"], 0.3),
                opacity: 0.15,
              },
              {
                offset: Math.PI * 2,
                amplitude: 55,
                frequency: 0.004,
                color: resolveColor(["--foreground"], 0.1),
                opacity: 0.1,
              },
            ]
          : [
              {
                offset: 0,
                amplitude: 65,
                frequency: 0.003,
                color: resolveColor(["--primary"], 0.6), // Signature Green
                opacity: 0.25,
              },
              {
                offset: Math.PI / 2,
                amplitude: 85,
                frequency: 0.0025,
                color: "oklch(0.65 0.12 210)", // Soft Azure Blue
                opacity: 0.2,
              },
              {
                offset: Math.PI,
                amplitude: 55,
                frequency: 0.0035,
                color: "oklch(0.7 0.1 280)", // Subtle Lavender
                opacity: 0.15,
              },
              {
                offset: Math.PI * 1.5,
                amplitude: 75,
                frequency: 0.002,
                color: "oklch(0.75 0.08 180)", // Teal/Cyan hint
                opacity: 0.1,
              },
              {
                offset: Math.PI * 1.8,
                amplitude: 45,
                frequency: 0.004,
                color: resolveColor(["--accent"], 0.4), // Accent Green
                opacity: 0.15,
              },
            ] satisfies WaveConfig[],
      };
    };

    let themeColors = computeThemeColors();

    /* Watch theme changes */
    const observer = new MutationObserver(() => {
      themeColors = computeThemeColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    /* Canvas sizing */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const recenter = () => {
      const p = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = p;
      targetMouseRef.current = p;
    };

    const handleResize = () => {
      resize();
      recenter();
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => recenter();

    resize();
    recenter();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    /* Draw a single wave */
    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / influenceRadius);
        const mouseEff =
          influence *
          mouseInfluence *
          Math.sin(time * 0.001 + x * 0.01 + wave.offset);
        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) *
            wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) *
            (wave.amplitude * 0.45) +
          mouseEff;
        if (x === 0) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }
      }
      ctx.lineWidth = 2;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 30;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    /* Animation loop */
    const animate = () => {
      time += 1;
      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, themeColors.bgTop);
      grad.addColorStop(1, themeColors.bgBottom);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      themeColors.waves.forEach(drawWave);
      animationId = window.requestAnimationFrame(animate);
    };

    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}