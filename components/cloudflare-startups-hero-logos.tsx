"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";

import {
  BOTTOM_LOGO_PATH,
  BOTTOM_LOGO_VIEWBOX,
  TOP_LOGO_PATH,
  TOP_LOGO_VIEWBOX,
} from "@/lib/cloudflare-startups-logo-paths";
import styles from "@/components/cloudflare-startups.module.css";

const ASSET_BASE = "/images/cloudflare-startups";
const LOOP_MS = 14_000;
const FADE_IN_END = 0.1;
const FADE_OUT_START = 0.9;
const ROTATION_BLEND = 0.14;

type HeroLogo = {
  src: string;
  size?: number;
  opacity?: number;
};

const topLogos: HeroLogo[] = [
  { src: "perplexity.png" },
  { src: "notion.png" },
  { src: "lovable.png" },
  { src: "gamma.png" },
];

const bottomLogos: HeroLogo[] = [
  { src: "robinhood.png" },
  { src: "revolut.png" },
  { src: "bereal.png" },
  { src: "opera.png" },
];

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

function visibilityScale(progress: number) {
  if (progress < FADE_IN_END) {
    return smoothstep(clamp01(progress / FADE_IN_END));
  }

  if (progress > FADE_OUT_START) {
    return smoothstep(clamp01((1 - progress) / (1 - FADE_OUT_START)));
  }

  return 1;
}

function shortestRotation(previous: number, next: number) {
  const normalized = ((previous % 360) + 360) % 360;
  let delta = next - normalized;

  if (delta > 180) {
    delta -= 360;
  }

  if (delta < -180) {
    delta += 360;
  }

  return previous + delta;
}

function blendedRotation(previous: number | null, next: number, blend: number) {
  if (previous === null) {
    return next;
  }

  let delta = next - previous;
  while (delta > 180) delta -= 360;
  while (delta < -180) delta += 360;

  return previous + delta * blend;
}

function useReducedMotion() {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function LogoPath({
  className,
  logos,
  pathD,
  viewBox,
  flipY,
  reducedMotion,
}: {
  className: string;
  logos: HeroLogo[];
  pathD: string;
  viewBox: { width: number; height: number };
  flipY?: boolean;
  reducedMotion: boolean;
}) {
  const hostRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imageRefs = useRef<Array<HTMLImageElement | null>>([]);
  const lastAnglesRef = useRef<Array<number | null>>([]);
  const blendedAnglesRef = useRef<Array<number | null>>([]);

  useEffect(() => {
    const host = hostRef.current;
    const path = pathRef.current;

    if (!host || !path || logos.length === 0) {
      return;
    }

    const length = path.getTotalLength();

    const update = (time: number) => {
      const rect = host.getBoundingClientRect();
      const scaleX = rect.width / viewBox.width;
      const scaleY = rect.height / viewBox.height;

      logos.forEach((logo, index) => {
        const tile = tileRefs.current[index];
        const image = imageRefs.current[index];

        if (!tile || !image || rect.width <= 0 || rect.height <= 0) {
          return;
        }

        const phase = index / logos.length;
        const progress = reducedMotion ? phase : ((time % LOOP_MS) / LOOP_MS + phase) % 1;
        const distance = progress * length;
        const point = path.getPointAtLength(distance);
        const x = point.x * scaleX;
        const y = point.y * scaleY;
        const renderedY = flipY ? rect.height - y : y;
        const delta = Math.max(5, length * 0.01);
        const start = path.getPointAtLength(Math.max(0, distance - delta));
        const end = path.getPointAtLength(Math.min(length, distance + delta));
        const dx = (end.x - start.x) * scaleX;
        const dy = (end.y - start.y) * (flipY ? -scaleY : scaleY);
        const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
        const previousAngle = lastAnglesRef.current[index] ?? null;
        const unwrappedAngle = previousAngle === null ? rawAngle : shortestRotation(previousAngle, rawAngle);
        lastAnglesRef.current[index] = unwrappedAngle;
        const previousBlendedAngle = blendedAnglesRef.current[index] ?? null;
        const renderedAngle = reducedMotion
          ? unwrappedAngle
          : blendedRotation(previousBlendedAngle, unwrappedAngle, ROTATION_BLEND);
        blendedAnglesRef.current[index] = renderedAngle;
        const scale = reducedMotion ? 1 : visibilityScale(progress);

        tile.style.transform = `translate(${x}px, ${renderedY}px) translate(-50%, -50%) rotate(${renderedAngle}deg) scale(${scale})`;
        image.style.opacity = String((logo.opacity ?? 1) * scale);
      });
    };

    if (reducedMotion) {
      update(0);
      return;
    }

    let frame = 0;
    const tick = (time: number) => {
      update(time);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [flipY, logos, reducedMotion, viewBox.height, viewBox.width]);

  return (
    <div className={`${styles.logoPathHost} ${className}`} aria-hidden="true">
      <svg
        className={styles.logoPathSvg}
        preserveAspectRatio="none"
        ref={hostRef}
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      >
        <path d={pathD} fill="none" ref={pathRef} />
      </svg>
      {logos.map((logo, index) => (
        <div
          className={styles.pathLogoTile}
          key={logo.src}
          ref={(node) => {
            tileRefs.current[index] = node;
          }}
          style={{ transform: "translate(-50%, -50%) scale(0)" }}
        >
          <div className={styles.pathLogoTileSurface} aria-hidden="true" />
          <div className={styles.pathLogoImageWrap}>
            <Image
              alt=""
              className={styles.pathLogoImage}
              height={logo.size ?? 47}
              ref={(node) => {
                imageRefs.current[index] = node;
              }}
              src={`${ASSET_BASE}/${logo.src}`}
              style={{ opacity: 0 }}
              width={logo.size ?? 47}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CloudflareStartupsHeroLogos() {
  const reducedMotion = useReducedMotion();

  return (
    <div className={styles.desktopLogoPaths} aria-hidden="true">
      <LogoPath
        className={styles.logoPathTopExact}
        logos={topLogos}
        pathD={TOP_LOGO_PATH}
        reducedMotion={reducedMotion}
        viewBox={TOP_LOGO_VIEWBOX}
      />
      <LogoPath
        className={styles.logoPathBottomExact}
        flipY
        logos={bottomLogos}
        pathD={BOTTOM_LOGO_PATH}
        reducedMotion={reducedMotion}
        viewBox={BOTTOM_LOGO_VIEWBOX}
      />
    </div>
  );
}
