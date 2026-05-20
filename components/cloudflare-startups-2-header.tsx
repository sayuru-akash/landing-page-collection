"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { mainNav } from "@/lib/cloudflare-startups-2-data";
import { CloudflareLogo, CloudflareWordmark } from "@/components/cloudflare-startups-2-logo";
import styles from "@/components/cloudflare-startups-2.module.css";

type DropdownKey = (typeof mainNav)[number]["key"];
type ActiveKey = DropdownKey | "pricing" | null;
type MobileView = DropdownKey | null;

const dropdownKeys = mainNav.map((item) => item.key);
const dropdownContentVariants = {
  initial: (direction: number) => ({ opacity: 0, x: direction * 24 }),
  animate: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -24 }),
};

function subscribeMounted(callback: () => void) {
  queueMicrotask(callback);
  return () => {};
}

function getClientMountedSnapshot() {
  return true;
}

function getServerMountedSnapshot() {
  return false;
}

function useMounted() {
  return useSyncExternalStore(subscribeMounted, getClientMountedSnapshot, getServerMountedSnapshot);
}

function IconGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5 20.5 8v8L12 20.5 3.5 16V8L12 3.5Z" />
      <path d="M12 12 20.5 8M12 12 3.5 8M12 12v8.5" />
    </svg>
  );
}

function ChevronGroup({ active = false }: { active?: boolean }) {
  return (
    <svg className={styles.navChevron} data-active={active ? "true" : "false"} viewBox="0 0 16 16" aria-hidden="true">
      <path d="m5 6 3 3 3-3" />
      <path d="m5 10 3 3 3-3" />
    </svg>
  );
}

function columnHref(column: (typeof mainNav)[number]["columns"][number], fallback: string) {
  return "href" in column ? column.href : fallback;
}

export function CloudflareStartups2Header() {
  const [selected, setSelected] = useState<DropdownKey | null>(null);
  const [activeKey, setActiveKey] = useState<ActiveKey>(null);
  const [slideDirection, setSlideDirection] = useState(1);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const [openMobile, setOpenMobile] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>(null);
  const mounted = useMounted();
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const menuId = useId();

  function updateIndicator(key: ActiveKey) {
    if (!key || !navRef.current) {
      setIndicator((current) => ({ ...current, visible: false }));
      return;
    }

    const trigger = triggerRefs.current[key];
    if (!trigger) {
      setIndicator((current) => ({ ...current, visible: false }));
      return;
    }

    const navRect = navRef.current.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    setIndicator({
      left: triggerRect.left - navRect.left,
      width: triggerRect.width,
      visible: true,
    });
  }

  useEffect(() => {
    if (!openMobile) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openMobile]);

  useEffect(() => {
    if (!selected) {
      return;
    }

    const closeOnScroll = () => {
      setSelected(null);
      setActiveKey(null);
    };

    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeOnScroll);
  }, [selected]);

  useEffect(() => {
    const updateOnResize = () => updateIndicator(activeKey);
    window.addEventListener("resize", updateOnResize);
    return () => window.removeEventListener("resize", updateOnResize);
  }, [activeKey]);

  function openNav(key: DropdownKey) {
    if (selected) {
      setSlideDirection(dropdownKeys.indexOf(key) >= dropdownKeys.indexOf(selected) ? 1 : -1);
    }

    setSelected(key);
    setActiveKey(key);
    updateIndicator(key);
  }

  function closeNav() {
    setSelected(null);
    setActiveKey(null);
    updateIndicator(null);
  }

  function activatePlainNav() {
    setSelected(null);
    setActiveKey("pricing");
    updateIndicator("pricing");
  }

  function closeMobile() {
    setOpenMobile(false);
    setMobileView(null);
  }

  function toggleMobile() {
    setOpenMobile((value) => {
      if (value) {
        setMobileView(null);
      }

      return !value;
    });
  }

  const selectedItem = selected ? mainNav.find((item) => item.key === selected) : null;

  return (
    <header className={styles.header} data-site-navigation-header data-mobile-nav-open={openMobile ? "true" : undefined}>
      <div className={styles.headerInner}>
        <Link className={styles.logoLink} href="/" aria-label="Cloudflare logo">
          <CloudflareLogo className={styles.logoMark} />
          <CloudflareWordmark className={styles.logoWordmark} />
        </Link>

        <div className={styles.desktopNavWrap} onMouseLeave={() => (selected ? undefined : setActiveKey(null))}>
          <nav className={styles.desktopNav} aria-label="Main navigation" ref={navRef}>
            <span
              className={styles.navIndicator}
              style={{
                opacity: indicator.visible ? 1 : 0,
                transform: `translateX(${indicator.left}px)`,
                width: `${indicator.width}px`,
              }}
            />
            {mainNav.map((item) => {
              const active = selected === item.key;
              return (
                <Link
                  aria-expanded={active}
                  aria-haspopup="true"
                  className={styles.navTrigger}
                  data-nav={item.key}
                  href={item.href}
                  key={item.key}
                  onFocus={() => openNav(item.key)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      closeNav();
                    }
                  }}
                  onMouseEnter={() => openNav(item.key)}
                  ref={(node) => {
                    triggerRefs.current[item.key] = node;
                  }}
                >
                  {item.label}
                  <ChevronGroup active={active} />
                </Link>
              );
            })}
            <Link
              className={styles.navPlainLink}
              href="/plans/"
              onFocus={activatePlainNav}
              onMouseEnter={activatePlainNav}
              ref={(node) => {
                triggerRefs.current.pricing = node;
              }}
            >
              Pricing
            </Link>
          </nav>
        </div>

        <div className={styles.headerActions}>
          <Link className={styles.actionGhost} href="https://dash.cloudflare.com/login">
            Login
          </Link>
          <Link className={styles.actionGhost} href="/enterprise/contact/">
            Contact sales
          </Link>
          <Link className={styles.actionPrimary} href="https://dash.cloudflare.com/sign-up" aria-hidden="true" tabIndex={-1}>
            Start building
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
          aria-label={openMobile ? "Close menu" : "Open menu"}
          onClick={toggleMobile}
        >
          <span />
          <span />
        </button>
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {selectedItem ? (
                <>
                  <motion.div
                    aria-hidden="true"
                    className={styles.navOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                  <div
                    aria-label={`${selectedItem.label} menu`}
                    className={styles.navDropdownPositioner}
                    onMouseEnter={() => setActiveKey(selectedItem.key)}
                    onMouseLeave={closeNav}
                  >
                    <motion.div
                      className={styles.navDropdownOrigin}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ opacity: { duration: 0.1, ease: "easeOut" }, scale: { duration: 0.1, ease: "easeOut" } }}
                    >
                      <motion.div
                        layout
                        className={`${styles.navDropdown} ${selectedItem.key === "products" ? styles.navDropdownProducts : ""}`}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <AnimatePresence custom={slideDirection} mode="popLayout">
                          <motion.div
                            key={selectedItem.key}
                            className={styles.navDropdownContent}
                            custom={slideDirection}
                            variants={dropdownContentVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.15, ease: "easeOut" }}
                          >
                            {selectedItem.key === "products" ? (
                              <div className={styles.productMenuGrid}>
                                {selectedItem.columns.map((column) => (
                                  <section className={styles.productMenuColumn} key={column.title}>
                                    <Link className={styles.menuColumnTitle} href={columnHref(column, selectedItem.href)}>
                                      {column.title}
                                    </Link>
                                    <div>
                                      {column.links.map((link) => (
                                        <Link className={styles.productMenuLink} href={link.href} key={link.href}>
                                          <small>{link.title}</small>
                                          <span>{link.description}</span>
                                        </Link>
                                      ))}
                                    </div>
                                  </section>
                                ))}
                              </div>
                            ) : (
                              <div className={selectedItem.key === "resources" ? styles.resourceMenuGrid : styles.solutionMenuGrid}>
                                {selectedItem.columns.map((column) => (
                                  <section className={styles.simpleMenuColumn} key={column.title}>
                                    {selectedItem.key === "resources" ? <p>{column.title}</p> : null}
                                    {column.links.map((link) => (
                                      <Link className={styles.simpleMenuLink} href={link.href} key={link.href}>
                                        <IconGlyph />
                                        <span>
                                          <small>{link.title}</small>
                                          <em>{link.description}</em>
                                        </span>
                                      </Link>
                                    ))}
                                  </section>
                                ))}
                              </div>
                            )}
                            {selectedItem.footerLinks.length > 0 ? (
                              <div className={styles.menuChin}>
                                {selectedItem.footerLinks.map((link, index) => (
                                  <Link className={index === 0 ? styles.menuChinPrimary : undefined} href={link.href} key={link.href}>
                                    {link.title}
                                  </Link>
                                ))}
                              </div>
                            ) : null}
                          </motion.div>
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  </div>
                </>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}

      {mounted
        ? createPortal(
            <AnimatePresence initial={false}>
              {openMobile ? (
                <motion.div
                  aria-labelledby={menuId}
                  aria-modal="true"
                  className={styles.mobileMenu}
                  id={menuId}
                  role="dialog"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {mobileView ? (
                      <motion.div
                        key={mobileView}
                        className={styles.mobilePanel}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                      >
                        {mainNav
                          .filter((item) => item.key === mobileView)
                          .map((item) => (
                            <div key={item.key}>
                              <div className={styles.mobilePanelBar}>
                                <button type="button" onClick={() => setMobileView(null)}>
                                  Back
                                </button>
                                <Link href={item.href} onClick={closeMobile}>
                                  All {item.label.toLowerCase()}
                                </Link>
                              </div>
                              <div className={styles.mobilePanelBody}>
                                {item.columns.map((column) => (
                                  <section key={column.title}>
                                    <Link className={styles.mobileColumnTitle} href={columnHref(column, item.href)} onClick={closeMobile}>
                                      {column.title}
                                    </Link>
                                    {column.links.map((link) => (
                                      <Link className={styles.mobileMenuLink} href={link.href} key={link.href} onClick={closeMobile}>
                                        <IconGlyph />
                                        <span>
                                          <small>{link.title}</small>
                                          <em>{link.description}</em>
                                        </span>
                                      </Link>
                                    ))}
                                  </section>
                                ))}
                              </div>
                            </div>
                          ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="root"
                        className={styles.mobileRoot}
                        initial={{ x: "-18%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-18%" }}
                        transition={{ type: "spring", stiffness: 380, damping: 38 }}
                      >
                        <nav aria-label="Primary">
                          {mainNav.map((item) => (
                            <button className={styles.mobileNavRow} key={item.key} type="button" onClick={() => setMobileView(item.key)}>
                              <span>{item.label}</span>
                              <i aria-hidden="true">›</i>
                            </button>
                          ))}
                          <Link className={styles.mobileNavRow} href="/plans/" onClick={closeMobile}>
                            <span>Pricing</span>
                          </Link>
                        </nav>
                        <div className={styles.mobileCtaStack}>
                          <Link href="/under-attack-hotline/" onClick={closeMobile}>
                            Under Attack?
                          </Link>
                          <Link href="/enterprise/contact/" onClick={closeMobile}>
                            Contact sales
                          </Link>
                          <Link href="https://dash.cloudflare.com/login" onClick={closeMobile}>
                            Login
                          </Link>
                          <Link href="https://dash.cloudflare.com/sign-up" onClick={closeMobile}>
                            Start building
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </header>
  );
}
