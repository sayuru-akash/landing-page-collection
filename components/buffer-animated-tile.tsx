"use client";

import type { HTMLAttributes, PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

const MAX_INFLUENCE_DISTANCE = 400;
const MAX_OFFSET = 35;
const STIFFNESS = 50;
const DAMPING = 50;
const MASS = 0.5;

function getOffset(deltaX: number, deltaY: number) {
  const distance = Math.hypot(deltaX, deltaY);

  if (distance >= MAX_INFLUENCE_DISTANCE) {
    return { x: 0, y: 0 };
  }

  if (distance <= MAX_OFFSET) {
    return { x: deltaX, y: deltaY };
  }

  const scale = MAX_OFFSET / distance;

  return {
    x: deltaX * scale,
    y: deltaY * scale,
  };
}

export function BufferAnimatedTile({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const animatedElement = animatedRef.current;

    if (!container || !animatedElement) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let frameId = 0;
    let lastTime = performance.now();

    const reset = () => {
      targetX = 0;
      targetY = 0;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const deltaX = event.clientX - (rect.left + rect.width / 2);
      const deltaY = event.clientY - (rect.top + rect.height / 2);
      const offset = getOffset(deltaX, deltaY);

      targetX = offset.x;
      targetY = offset.y;
    };

    const animate = (time: number) => {
      const deltaTime = Math.min((time - lastTime) / 1000, 0.064);
      lastTime = time;

      const accelerationX = (STIFFNESS * (targetX - currentX) - DAMPING * velocityX) / MASS;
      const accelerationY = (STIFFNESS * (targetY - currentY) - DAMPING * velocityY) / MASS;

      velocityX += accelerationX * deltaTime;
      velocityY += accelerationY * deltaTime;
      currentX += velocityX * deltaTime;
      currentY += velocityY * deltaTime;

      if (
        Math.abs(targetX - currentX) < 0.01 &&
        Math.abs(targetY - currentY) < 0.01 &&
        Math.abs(velocityX) < 0.01 &&
        Math.abs(velocityY) < 0.01
      ) {
        currentX = targetX;
        currentY = targetY;
        velocityX = 0;
        velocityY = 0;
      }

      animatedElement.style.transform = `translate3d(${currentX.toFixed(3)}px, ${currentY.toFixed(3)}px, 0)`;
      frameId = window.requestAnimationFrame(animate);
    };

    animatedElement.style.willChange = "transform";
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", reset);
    window.addEventListener("blur", reset);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", reset);
      window.removeEventListener("blur", reset);
      window.cancelAnimationFrame(frameId);
      animatedElement.style.transform = "";
      animatedElement.style.willChange = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className ? `AnimatedTile_container__s5raK ${className}` : "AnimatedTile_container__s5raK"}
      {...props}
    >
      <div ref={animatedRef} className="AnimatedTile_animatedElement__XM8Ap">
        {children}
      </div>
    </div>
  );
}
