"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  productItems,
  resourceItems,
  useCaseItems,
} from "@/lib/antigravity-home-data";
import styles from "@/components/antigravity-home.module.css";

function Symbol({ children }: { children: string }) {
  return <span className={styles.symbol}>{children}</span>;
}

function DesktopDropdown({
  label,
  overview,
  overviewHref,
  children,
}: {
  label: string;
  overview: string;
  overviewHref: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={styles.desktopDropdown}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        aria-expanded={open}
        className={`${styles.navButton} ${open ? styles.navButtonOpen : ""}`}
        onBlur={(event) => {
          if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
            setOpen(false);
          }
        }}
        onFocus={() => setOpen(true)}
        type="button"
      >
        {label}
        <Symbol>{open ? "keyboard_arrow_up" : "keyboard_arrow_down"}</Symbol>
      </button>
      <div className={`${styles.megaMenu} ${open ? styles.megaMenuOpen : ""}`}>
        <div className={styles.megaIntro}>
          <p>{overview}</p>
          <Link className={styles.softPill} href={overviewHref}>
            See overview
          </Link>
        </div>
        <div className={styles.megaList}>{children}</div>
      </div>
    </div>
  );
}

function MobileAccordion({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.mobileAccordion}>
      <button
        aria-expanded={open}
        className={styles.mobileNavItem}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {label}
        <Symbol>{open ? "keyboard_arrow_up" : "keyboard_arrow_down"}</Symbol>
      </button>
      <div className={`${styles.mobileSubnav} ${open ? styles.mobileSubnavOpen : ""}`}>
        {children}
      </div>
    </div>
  );
}

export function AntigravityHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link aria-label="Google Antigravity home" className={styles.logoLink} href="/antigravity-home">
        <Image
          alt="Google Antigravity"
          height={21}
          priority
          src="/images/antigravity-home/google-antigravity-logo.svg"
          style={{ height: "auto" }}
          width={162}
        />
      </Link>

      <nav aria-label="Primary navigation" className={styles.desktopNav}>
        <DesktopDropdown
          label="Product"
          overview="Explore our next generation products"
          overviewHref="https://antigravity.google/product"
        >
          <p className={styles.megaLabel}>Products</p>
          {productItems.map((item) => (
            <Link className={styles.megaLink} href={item.href} key={item.title}>
              <Symbol>{item.icon}</Symbol>
              {item.title}
            </Link>
          ))}
        </DesktopDropdown>

        <DesktopDropdown
          label="Use Cases"
          overview="Explore how builders use Antigravity"
          overviewHref="https://antigravity.google/use-cases"
        >
          <p className={styles.megaLabel}>Use Cases</p>
          {useCaseItems.map((item) => (
            <Link className={styles.megaLink} href={item.href} key={item.title}>
              {item.title}
            </Link>
          ))}
        </DesktopDropdown>

        <Link className={styles.plainNavLink} href="https://antigravity.google/pricing">
          Pricing
        </Link>
        <Link className={styles.plainNavLink} href="https://antigravity.google/blog">
          Blog
        </Link>

        <DesktopDropdown
          label="Resources"
          overview="Find guides, releases and support"
          overviewHref="https://antigravity.google/docs"
        >
          <p className={styles.megaLabel}>Resources</p>
          {resourceItems.map((item) => (
            <Link className={styles.megaLink} href={item.href} key={item.title}>
              {item.title}
              {item.icon ? <Symbol>{item.icon}</Symbol> : null}
            </Link>
          ))}
        </DesktopDropdown>
      </nav>

      <Link className={`${styles.button} ${styles.buttonPrimary} ${styles.headerDownload}`} href="https://antigravity.google/download">
        Download
        <Symbol>download</Symbol>
      </Link>

      <button
        aria-controls="antigravity-mobile-menu"
        aria-expanded={mobileOpen}
        className={styles.menuToggle}
        onClick={() => setMobileOpen((value) => !value)}
        type="button"
      >
        <span className={styles.symbol}>{mobileOpen ? "close" : "menu"}</span>
      </button>

      <div
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ""}`}
        id="antigravity-mobile-menu"
      >
        <MobileAccordion label="Product">
          <Link href="https://antigravity.google/product">See overview</Link>
          {productItems.map((item) => (
            <Link href={item.href} key={item.title}>
              {item.title}
            </Link>
          ))}
        </MobileAccordion>
        <MobileAccordion label="Use Cases">
          <Link href="https://antigravity.google/use-cases">See overview</Link>
          {useCaseItems.map((item) => (
            <Link href={item.href} key={item.title}>
              {item.title}
            </Link>
          ))}
        </MobileAccordion>
        <Link className={styles.mobileNavItem} href="https://antigravity.google/pricing">
          Pricing
        </Link>
        <Link className={styles.mobileNavItem} href="https://antigravity.google/blog">
          Blog
        </Link>
        <MobileAccordion label="Resources">
          {resourceItems.map((item) => (
            <Link href={item.href} key={item.title}>
              {item.title}
            </Link>
          ))}
        </MobileAccordion>
      </div>
    </header>
  );
}
