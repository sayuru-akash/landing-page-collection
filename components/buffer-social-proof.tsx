"use client";

import { useEffect, useRef, useState } from "react";

import { socialProof } from "@/lib/buffer-data";

type CountUpMetricProps = {
  end: number;
  start: number;
};

function CountUpMetric({ end, start }: CountUpMetricProps) {
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    let frameId = 0;

    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frameId = window.requestAnimationFrame(() => {
        setValue(end);
      });
      return;
    }

    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started) {
          return;
        }

        started = true;

        const startedAt = performance.now();
        const duration = 1800;

        const tick = (time: number) => {
          const progress = Math.min((time - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          setValue(Math.round(start + (end - start) * eased));

          if (progress < 1) {
            frameId = window.requestAnimationFrame(tick);
          }
        };

        frameId = window.requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [end, start]);

  return (
    <div ref={ref} aria-hidden="true">
      {value.toLocaleString()}
    </div>
  );
}

export function BufferSocialProof() {
  return (
    <section className="SocialProofSection_section__TZ__M" aria-labelledby="social-proof-heading">
      <h2 className="visually-hidden" id="social-proof-heading">
        Buffer is trusted by over 100,000 businesses and individuals
      </h2>
      <div className="max-inline-size-container">
        <dl className="SocialProofSection_metrics__4y1my">
          {socialProof.map((metric) => (
            <div className="MetricCallout_container__SJ_Pd" key={metric.title}>
              <dt className="text-eyebrow MetricCallout_title__TA9o9">{metric.title}</dt>
              <dd className="MetricCallout_value__jVK0M">
                <CountUpMetric end={metric.end} start={metric.start} />
                <span className="visually-hidden">{metric.end.toLocaleString()}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
