"use client";

import { useEffect, useRef } from "react";

import styles from "@/components/antigravity-home.module.css";

type ParticleFieldProps = {
  className?: string;
  density?: number;
  variant?: "light" | "dark" | "grid";
};

type Particle = {
  angle: number;
  distance: number;
  speed: number;
  size: number;
  hue: number;
  drift: number;
};

export function ParticleField({
  className,
  density = 130,
  variant = "light",
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;

    if (!canvas || !container) {
      return;
    }

    const context = canvas.getContext("2d");
    const pointer = {
      active: false,
      x: 0.5,
      y: 0.5,
    };

    if (!context) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const particles: Particle[] = Array.from({ length: density }, (_, index) => ({
      angle: (index / density) * Math.PI * 2 + Math.random() * 0.8,
      distance: Math.random(),
      speed: 0.00035 + Math.random() * 0.0009,
      size: 0.45 + Math.random() * 2.8,
      hue: Math.random(),
      drift: Math.random() * 0.8 + 0.4,
    }));

    let frame = 0;
    let animationFrame = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawGrid = () => {
      const rect = container.getBoundingClientRect();
      context.clearRect(0, 0, rect.width, rect.height);
      context.fillStyle =
        variant === "dark" ? "rgba(95, 137, 255, 0.7)" : "rgba(28, 30, 35, 0.34)";

      for (let y = 28; y < rect.height - 28; y += 22) {
        for (let x = 28; x < rect.width - 28; x += 22) {
          const fade =
            0.22 +
            Math.sin(x * 0.012 + y * 0.02 + frame * 0.02) * 0.08;
          context.globalAlpha = Math.max(0.07, fade);
          context.fillRect(x, y, 1, 1);
        }
      }

      context.globalAlpha = 1;
    };

    const drawWarp = () => {
      const rect = container.getBoundingClientRect();
      context.clearRect(0, 0, rect.width, rect.height);
      const targetX = pointer.active ? pointer.x : variant === "dark" ? 0.63 : 0.5;
      const targetY = pointer.active ? pointer.y : variant === "dark" ? 0.45 : 0.55;
      const cx = rect.width * targetX;
      const cy = rect.height * targetY;
      const max = Math.hypot(rect.width, rect.height) * 0.72;

      for (const particle of particles) {
        if (!reducedMotion) {
          particle.distance += particle.speed * particle.drift * (variant === "dark" ? 1.65 : 1);

          if (particle.distance > 1.04) {
            particle.distance = 0.02;
            particle.angle = Math.random() * Math.PI * 2;
          }
        }

        const distance = particle.distance * max;
        const angle = particle.angle + Math.sin(frame * 0.002 + particle.hue * 8) * 0.15;
        const x = cx + Math.cos(angle) * distance;
        const y = cy + Math.sin(angle) * distance * (variant === "dark" ? 0.72 : 1.05);
        const alpha = Math.min(1, Math.max(0.06, particle.distance * 1.4));
        const length = variant === "dark" ? particle.size * (4 + particle.distance * 8) : particle.size * 2.4;
        const color =
          variant === "dark"
            ? `rgba(70, 123, 255, ${alpha})`
            : particle.hue > 0.88
              ? `rgba(239, 69, 66, ${alpha * 0.7})`
              : particle.hue > 0.76
                ? `rgba(255, 171, 0, ${alpha * 0.68})`
                : `rgba(52, 91, 255, ${alpha * 0.85})`;

        context.save();
        context.translate(x, y);
        context.rotate(angle + Math.PI / 2);
        context.fillStyle = color;
        context.beginPath();
        context.roundRect(-particle.size / 2, -length / 2, particle.size, length, particle.size);
        context.fill();
        context.restore();
      }
    };

    const draw = () => {
      frame += 1;

      if (variant === "grid") {
        drawGrid();
      } else {
        drawWarp();
      }

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.active = true;
      pointer.x = Math.min(0.88, Math.max(0.12, (event.clientX - rect.left) / rect.width));
      pointer.y = Math.min(0.82, Math.max(0.18, (event.clientY - rect.top) / rect.height));
    };
    const handlePointerLeave = () => {
      pointer.active = false;
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    resize();
    draw();

    return () => {
      observer.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [density, variant]);

  return (
    <canvas
      aria-hidden="true"
      className={`${styles.particleCanvas}${className ? ` ${className}` : ""}`}
      ref={canvasRef}
    />
  );
}
