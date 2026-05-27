"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";

import styles from "@/components/antigravity-home.module.css";

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function AntigravityScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateProgress = () => {
      if (prefersReducedMotion.matches) {
        section.style.setProperty("--ag-video-progress", "1");
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = clamp((viewportHeight - rect.top) / (viewportHeight * 0.5));

      section.style.setProperty("--ag-video-progress", progress.toFixed(3));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    prefersReducedMotion.addEventListener("change", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      prefersReducedMotion.removeEventListener("change", updateProgress);
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
