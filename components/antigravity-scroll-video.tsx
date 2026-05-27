"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";

import styles from "@/components/antigravity-home.module.css";

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function easeVideoProgress(value: number) {
  if (value < 0.5) {
    return value * value * 1.15;
  }

  return 0.2875 + ((value - 0.5) / 0.5) * 0.7125;
}

export function AntigravityScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const currentProgressRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const renderProgress = () => {
      const next =
        currentProgressRef.current +
        (targetProgressRef.current - currentProgressRef.current) * 0.1;

      currentProgressRef.current =
        Math.abs(next - targetProgressRef.current) < 0.002
          ? targetProgressRef.current
          : next;

      section.style.setProperty("--ag-video-progress", currentProgressRef.current.toFixed(4));

      if (currentProgressRef.current !== targetProgressRef.current) {
        frameRef.current = window.requestAnimationFrame(renderProgress);
      } else {
        frameRef.current = null;
      }
    };

    const updateProgress = () => {
      if (prefersReducedMotion.matches) {
        currentProgressRef.current = 1;
        targetProgressRef.current = 1;
        section.style.setProperty("--ag-video-progress", "1");
        return;
      }

      const viewportHeight = window.innerHeight || 1;
      const start = section.offsetTop - viewportHeight;
      const end = section.offsetTop - viewportHeight * 0.25;
      const progress = easeVideoProgress(clamp((window.scrollY - start) / Math.max(1, end - start)));

      targetProgressRef.current = progress;

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(renderProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    prefersReducedMotion.addEventListener("change", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      prefersReducedMotion.removeEventListener("change", updateProgress);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;

    if (!section || !cursor) {
      return;
    }

    const rect = section.getBoundingClientRect();
    cursor.style.setProperty("--ag-cursor-x", `${event.clientX - rect.left}px`);
    cursor.style.setProperty("--ag-cursor-y", `${event.clientY - rect.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      className={styles.videoSection}
      aria-label="Google Antigravity overview video"
      onPointerMove={handlePointerMove}
    >
      <div ref={cursorRef} className={styles.videoCursor} aria-hidden="true">
        <span className={styles.videoCursorContent}>
          <span className={styles.symbol}>play_arrow</span>
          <span>Play video</span>
        </span>
      </div>
      <video
        autoPlay
        className={styles.heroVideo}
        loop
        muted
        playsInline
        preload="metadata"
        src="/images/antigravity-home/hero-video.mp4"
      />
      <button className={styles.playButton} type="button" aria-label="Play overview video">
        <span className={styles.symbol}>play_arrow</span>
      </button>
    </section>
  );
}
