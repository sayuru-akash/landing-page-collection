"use client";

import { useId, useState } from "react";

import type { FaqItem } from "@/lib/cloudflare-startups-data";
import styles from "@/components/cloudflare-startups.module.css";

type Props = {
  items: FaqItem[];
};

export function CloudflareStartupsFaq({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className={styles.faqList}>
      {items.map((item, index) => {
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        const isOpen = openIndex === index;

        return (
          <div className={styles.faqItem} key={item.question}>
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              className={styles.faqButton}
              id={buttonId}
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <svg className={styles.faqIcon} data-open={isOpen ? "true" : "false"} viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 4v12M4 10h12" />
              </svg>
            </button>
            <div
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={styles.faqPanel}
              data-open={isOpen ? "true" : "false"}
              id={panelId}
              role="region"
            >
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
