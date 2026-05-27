"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import styles from "@/components/antigravity-home.module.css";

function Symbol({ children }: { children: string }) {
  return <span className={styles.symbol}>{children}</span>;
}

type AntigravityRailProps = {
  children: ReactNode;
  controlsClassName?: string;
  label: string;
  railClassName: string;
};

export function AntigravityRail({
  children,
  controlsClassName,
  label,
  railClassName,
}: AntigravityRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canBack, setCanBack] = useState(false);
  const [canForward, setCanForward] = useState(true);

  const syncState = useCallback(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const maxScroll = rail.scrollWidth - rail.clientWidth;
    setCanBack(rail.scrollLeft > 2);
    setCanForward(rail.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    syncState();
    rail.addEventListener("scroll", syncState, { passive: true });
    window.addEventListener("resize", syncState);

    return () => {
      rail.removeEventListener("scroll", syncState);
      window.removeEventListener("resize", syncState);
    };
  }, [syncState]);

  const move = (direction: -1 | 1) => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const firstItem = rail.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap || "0");
    const distance = firstItem ? firstItem.offsetWidth + gap : rail.clientWidth * 0.82;

    rail.scrollBy({
      behavior: "smooth",
      left: distance * direction,
    });
  };

  return (
    <>
      <div ref={railRef} className={railClassName}>
        {children}
      </div>
      <div className={`${styles.sliderControls} ${controlsClassName ?? ""}`} aria-label={label}>
        <button
          aria-label="Previous"
          disabled={!canBack}
          onClick={() => move(-1)}
          type="button"
        >
          <Symbol>keyboard_arrow_left</Symbol>
        </button>
        <button
          aria-label="Next"
          disabled={!canForward}
          onClick={() => move(1)}
          type="button"
        >
          <Symbol>keyboard_arrow_right</Symbol>
        </button>
      </div>
    </>
  );
}
