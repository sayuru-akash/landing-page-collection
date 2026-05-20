"use client";

import Link from "next/link";
import { useId, useState } from "react";

import { mainNav } from "@/lib/cloudflare-startups-2-data";
import { CloudflareLogo, CloudflareWordmark } from "@/components/cloudflare-startups-2-logo";
import styles from "@/components/cloudflare-startups-2.module.css";

export function CloudflareStartups2Header() {
  const [openMobile, setOpenMobile] = useState(false);
  const menuId = useId();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.logoLink} href="/" aria-label="Cloudflare">
          <CloudflareLogo className={styles.logoMark} />
          <CloudflareWordmark className={styles.logoWordmark} />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {mainNav.map((item) => (
            <div className={styles.navItem} key={item.label}>
              <button className={styles.navTrigger} type="button" aria-haspopup="true">
                {item.label}
                <span aria-hidden="true">⌄</span>
              </button>
              <div className={styles.navPanel}>
                <div className={styles.navPanelGrid}>
                  {item.columns.map((column) => (
                    <div className={styles.navColumn} key={column.title}>
                      <p>{column.title}</p>
                      {column.links.map((link) => (
                        <Link href="#" key={link}>
                          <span className={styles.navIcon} aria-hidden="true" />
                          <span>{link}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                <div className={styles.navPanelFooter}>
                  <Link href="#">See all products</Link>
                  <Link href="#">Global network</Link>
                  <Link href="#">Domain Registration</Link>
                  <Link href="#">1.1.1.1</Link>
                </div>
              </div>
            </div>
          ))}
          <Link className={styles.navPlainLink} href="#">
            Pricing
          </Link>
        </nav>

        <div className={styles.headerActions}>
          <Link className={styles.actionGhost} href="https://dash.cloudflare.com/login">
            Login
          </Link>
          <Link className={styles.actionGhost} href="#">
            Contact sales
          </Link>
        </div>

        <Link className={styles.mobileLogin} href="https://dash.cloudflare.com/login">
          Login
        </Link>
        <button
          className={styles.mobileToggle}
          type="button"
          aria-expanded={openMobile}
          aria-controls={menuId}
          aria-label={openMobile ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpenMobile((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={styles.mobileMenu} id={menuId} data-open={openMobile ? "true" : "false"} inert={!openMobile}>
        <nav aria-label="Mobile navigation">
          {mainNav.map((item) => (
            <details key={item.label} className={styles.mobileDetails}>
              <summary>{item.label}</summary>
              <div>
                {item.columns.flatMap((column) => column.links).map((link) => (
                  <Link href="#" key={`${item.label}-${link}`} onClick={() => setOpenMobile(false)}>
                    {link}
                  </Link>
                ))}
              </div>
            </details>
          ))}
          <Link href="#" onClick={() => setOpenMobile(false)}>
            Pricing
          </Link>
          <Link href="https://dash.cloudflare.com/login" onClick={() => setOpenMobile(false)}>
            Login
          </Link>
          <Link href="#" onClick={() => setOpenMobile(false)}>
            Contact sales
          </Link>
          <Link className={styles.mobilePrimary} href="https://dash.cloudflare.com/sign-up" onClick={() => setOpenMobile(false)}>
            Start building
          </Link>
        </nav>
      </div>
    </header>
  );
}
