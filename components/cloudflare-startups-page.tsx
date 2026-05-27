import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { CloudflareStartupsFaq } from "@/components/cloudflare-startups-faq";
import { CloudflareStartupsHeader } from "@/components/cloudflare-startups-header";
import { CloudflareStartupsHeroLogos } from "@/components/cloudflare-startups-hero-logos";
import { CloudflareStartupsHeroText } from "@/components/cloudflare-startups-hero-text";
import { CloudflareLogo, CloudflareWordmark } from "@/components/cloudflare-startups-logo";
import {
  faqItems,
  featureColumns,
  footerColumns,
  qualifications,
  resources,
  tiers,
  type Qualification,
} from "@/lib/cloudflare-startups-data";
import styles from "@/components/cloudflare-startups.module.css";

const ASSET_BASE = "/images/cloudflare-startups";
const heroLogos = [
  { src: "perplexity.png", path: "top" },
  { src: "notion.png", path: "top" },
  { src: "lovable.png", path: "top" },
  { src: "gamma.png", path: "top" },
  { src: "robinhood.png", path: "bottom" },
  { src: "revolut.png", path: "bottom" },
  { src: "bereal.png", path: "bottom" },
  { src: "opera.png", path: "bottom" },
];

function CheckIcon({ boxed = false }: { boxed?: boolean }) {
  return boxed ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.5 12 10.5 15 16.5 9M7.8 21h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C21 18.72 21 17.88 21 16.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C18.72 3 17.88 3 16.2 3H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 5.28 3 6.12 3 7.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 21 6.12 21 7.8 21Z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function QualificationIcon({ icon }: { icon: Qualification["icon"] }) {
  const paths: Record<Qualification["icon"], string> = {
    calendar: "M7 2v3M17 2v3M3.5 9h17M5.8 4h12.4A2.8 2.8 0 0 1 21 6.8v11.4a2.8 2.8 0 0 1-2.8 2.8H5.8A2.8 2.8 0 0 1 3 18.2V6.8A2.8 2.8 0 0 1 5.8 4Z",
    chart: "M4 20V9m6 11V4m6 16v-8m4 8H2",
    code: "M8 8 4 12l4 4m8-8 4 4-4 4m-3-10-2 12",
    card: "M3 7.8A2.8 2.8 0 0 1 5.8 5h12.4A2.8 2.8 0 0 1 21 7.8v8.4a2.8 2.8 0 0 1-2.8 2.8H5.8A2.8 2.8 0 0 1 3 16.2V7.8Zm0 2.2h18",
    globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.2-2.4 3.3-5.4 3.3-9S14.2 5.4 12 3m0 18c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3M3.6 9h16.8M3.6 15h16.8",
    check: "M7.5 12 10.5 15 16.5 9M7.8 21h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C21 18.72 21 17.88 21 16.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C18.72 3 17.88 3 16.2 3H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 5.28 3 6.12 3 7.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 21 6.12 21 7.8 21Z",
    user: "M20 21a8 8 0 0 0-16 0m12-13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[icon]} />
    </svg>
  );
}

function HeroGraphic() {
  return (
    <div className={styles.heroFrame} aria-hidden="true">
      <Image className={styles.heroTexture} src={`${ASSET_BASE}/hero-texture.png`} alt="" fill priority sizes="1200px" />
      <span className={styles.heroArcTop}>
        <Image src={`${ASSET_BASE}/hero-arc.svg`} alt="" fill priority sizes="1122px" />
      </span>
      <span className={styles.heroArcBottom}>
        <Image src={`${ASSET_BASE}/hero-arc-2.svg`} alt="" fill priority sizes="954px" />
      </span>
      <CloudflareStartupsHeroText />
      <CloudflareStartupsHeroLogos />
    </div>
  );
}

function MobileHeroLogoCarousel() {
  return (
    <div className={styles.mobileLogoViewport} aria-hidden="true">
      <div className={styles.mobileLogoCarousel}>
        {[...heroLogos, ...heroLogos].map((logo, index) => (
          <span className={styles.logoTile} key={`${logo.src}-${index}`} style={{ "--tile-index": index } as CSSProperties}>
            <Image src={`${ASSET_BASE}/${logo.src}`} alt="" width={47} height={47} />
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionIntro({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className={styles.sectionIntro}>
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}

function DividerPattern() {
  return (
    <section className={styles.patternBreak} aria-hidden="true">
      <span />
    </section>
  );
}

export function CloudflareStartupsPage() {
  return (
    <div className={styles.page}>
      <CloudflareStartupsHeader />
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="cloudflare-startups-hero">
          <div className={styles.heroShell}>
            <HeroGraphic />
            <div className={styles.heroCopy}>
              <h1 id="cloudflare-startups-hero">Cloudflare for Startups</h1>
              <p>
                Cloudflare for Startups gives early-stage companies up to $350k in credits to build the next big idea.
                Startups get access to our developer platform and global network to build fast, secure, and scalable applications.
              </p>
              <Link className={styles.primaryButton} href="https://www.cloudflare.com/lp/startups">
                Apply now
              </Link>
            </div>
            <MobileHeroLogoCarousel />
          </div>
        </section>

        <DividerPattern />

        <section className={styles.section} aria-labelledby="program-tiers">
          <SectionIntro
            title="Program tiers"
            subtitle="Receive up to $350,000 in credits for a year to support your startup. The program is structured around where you are in your journey."
          />
          <div className={styles.tierGrid}>
            {tiers.map((tier) => (
              <article className={styles.tierCard} key={tier.name}>
                <div className={styles.diamondWrap}>
                  <Image src={`${ASSET_BASE}/diamond.svg`} alt="" width={340} height={340} />
                  <span />
                  <h3>{tier.name}</h3>
                  <strong>{tier.credits}</strong>
                </div>
                <p>{tier.description}</p>
                <hr />
                <div className={styles.cardList}>
                  <small>Criteria</small>
                  <ul>
                    {tier.criteria.map((item) => (
                      <li key={item}>
                        <CheckIcon boxed />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.cardList}>
                  <small>Benefits</small>
                  <ul>
                    {tier.benefits.map((item) => (
                      <li key={item}>
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <DividerPattern />

        <section className={styles.section} aria-labelledby="what-you-get">
          <SectionIntro
            title="Everything you need to build and ship."
            subtitle="Credits cover usage-based services. Core security and networking features are included at no cost, regardless of tier."
          />
          <div className={styles.featureBox}>
            {featureColumns.map((column) => (
              <article className={styles.featureColumn} data-tone={column.tone} key={column.title}>
                <div>
                  <h3>{column.title}</h3>
                  <p>{column.summary}</p>
                </div>
                {column.groups.map((group) => (
                  <div className={styles.featureGroup} key={group.label}>
                    <h4>{group.label}</h4>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </section>

        <DividerPattern />

        <section className={styles.section} aria-labelledby="qualify">
          <SectionIntro title="Do I qualify?" subtitle="You qualify if your startup meets all of the following:" />
          <div className={styles.qualifyGrid}>
            {qualifications.map((item) => (
              <article className={styles.qualifyCard} key={item.title}>
                <QualificationIcon icon={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <DividerPattern />

        <section className={styles.resourcesSection} aria-labelledby="resources">
          <SectionIntro title="Resources for founders" subtitle="Begin building with Cloudflare" />
          <div className={styles.resourceLinks}>
            {resources.map((resource) => (
              <Link href={resource.href} key={resource.label}>
                {resource.label}
              </Link>
            ))}
          </div>
        </section>

        <DividerPattern />

        <section className={styles.faqSection} aria-labelledby="faq">
          <h2 id="faq">Frequently asked questions</h2>
          <CloudflareStartupsFaq items={faqItems} />
        </section>

        <DividerPattern />

        <section className={styles.ctaSection} aria-labelledby="ready">
          <h2 id="ready">Ready to build?</h2>
          <Link className={styles.primaryButton} href="https://www.cloudflare.com/lp/startups">
            Apply here
          </Link>
        </section>

        <DividerPattern />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <Link className={styles.footerLogo} href="/" aria-label="Cloudflare">
            <CloudflareLogo />
            <CloudflareWordmark />
          </Link>
          <div className={styles.footerGroups}>
            {footerColumns.map((column, columnIndex) => (
              <div className={styles.footerColumn} key={columnIndex}>
                {column.map((group) => (
                  <nav aria-label={group.title} key={group.title}>
                    <h3>{group.title}</h3>
                    {group.links.map((link) => (
                      <Link href="#" key={link}>
                        {link}
                      </Link>
                    ))}
                  </nav>
                ))}
              </div>
            ))}
            <div className={styles.footerCtas}>
              <Link href="https://dash.cloudflare.com/sign-up">Start building</Link>
              <Link href="https://dash.cloudflare.com/login">Log in</Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 Cloudflare, Inc.</span>
          <nav aria-label="Legal">
            <button type="button">Your Privacy Choices</button>
            <Link href="https://www.cloudflare.com/disclosure/">Report security issues</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Use</Link>
            <Link href="#">GDPR</Link>
            <Link href="https://www.cloudflare.com/trademark/">Trademark</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
