import Image from "next/image";
import Link from "next/link";

import { AntigravityHeader } from "@/components/antigravity-header";
import { AntigravityScrollVideo } from "@/components/antigravity-scroll-video";
import { ParticleField } from "@/components/antigravity-particles";
import {
  blogItems,
  featureItems,
  footerPrimaryLinks,
  footerSecondaryLinks,
  googleLinks,
  orbitIcons,
  useCaseCards,
} from "@/lib/antigravity-home-data";
import styles from "@/components/antigravity-home.module.css";

function Symbol({ children }: { children: string }) {
  return <span className={styles.symbol}>{children}</span>;
}

function Cursor() {
  return (
    <Image
      alt="Google Antigravity Blinking Cursor"
      className={styles.cursor}
      height={150}
      loading="eager"
      src="/images/antigravity-home/cursor.png"
      width={28}
    />
  );
}

export function AntigravityHomePage() {
  return (
    <main className={styles.page}>
      <AntigravityHeader />

      <section className={styles.heroSection}>
        <ParticleField className={styles.heroParticles} density={170} />
        <div className={styles.heroContent}>
        <Image
          alt="Google Antigravity"
          className={styles.heroLogo}
          height={30}
          priority
          src="/images/antigravity-home/google-antigravity-logo-large.svg"
          style={{ height: "auto" }}
          width={231}
        />
          <h1
            aria-label="Experience liftoff with the next-gen agent platform"
            className={styles.heroHeadline}
          >
            <span aria-hidden="true" className={styles.desktopTyping}>
              <span className={styles.typingLine}>
                <span className={`${styles.typingText} ${styles.typingTextOne}`}>
                  Experience liftoff with the next-gen
                </span>
                <span className={`${styles.heroLineCursor} ${styles.heroLineCursorOne}`} />
              </span>
              <span className={styles.typingLine}>
                <span className={`${styles.typingText} ${styles.typingTextTwo}`}>
                  agent platform
                </span>
                <span className={`${styles.heroLineCursor} ${styles.heroLineCursorTwo}`} />
              </span>
            </span>
            <span aria-hidden="true" className={styles.mobileTyping}>
              <span className={styles.typingLine}>
                <span className={`${styles.typingText} ${styles.typingTextOne}`}>
                  Experience liftoff
                </span>
                <span className={`${styles.heroLineCursor} ${styles.heroLineCursorOne}`} />
              </span>
              <span className={styles.typingLine}>
                <span className={`${styles.typingText} ${styles.typingTextTwo}`}>
                  with the next-gen
                </span>
                <span className={`${styles.heroLineCursor} ${styles.heroLineCursorTwo}`} />
              </span>
              <span className={styles.typingLine}>
                <span className={`${styles.typingText} ${styles.typingTextThree}`}>
                  agent platform
                </span>
                <span className={`${styles.heroLineCursor} ${styles.heroLineCursorThree}`} />
              </span>
            </span>
          </h1>
          <div className={styles.heroActions}>
            <Link className={`${styles.button} ${styles.buttonPrimary} ${styles.heroButton}`} href="https://antigravity.google/download">
              <Image alt="" height={17} src="/images/antigravity-home/apple-logo.svg" width={14} />
              Download for MacOS
            </Link>
            <Link className={`${styles.button} ${styles.buttonSecondary} ${styles.heroButton}`} href="https://antigravity.google/use-cases">
              Explore use cases
            </Link>
          </div>
        </div>
      </section>

      <AntigravityScrollVideo />

      <section className={styles.agentSection}>
        <ul className={styles.orbitRow} aria-hidden="true">
          {orbitIcons.map((icon, index) => (
            <li key={`${icon}-${index}`}>
              <Symbol>{icon}</Symbol>
            </li>
          ))}
        </ul>
        <div className={styles.agentStatement}>
          <Cursor />
          <h2 className={styles.typeReveal}>
            Google Antigravity is our agentic development platform, allowing
            anyone to build in the agent-first era.
          </h2>
        </div>
      </section>

      <section className={styles.featuresSection}>
        {featureItems.map((feature) => (
          <article className={styles.featureRow} key={feature.title}>
            <div className={styles.featureCopy}>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
              {feature.title === "Antigravity IDE" ? (
                <Link className={`${styles.button} ${styles.buttonSecondary}`} href="https://antigravity.google/product">
                  Explore Product
                </Link>
              ) : null}
            </div>
            <div className={styles.featureVisual}>
              {feature.image ? (
                <Image
                  alt={feature.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 46vw"
                  src={feature.image}
                />
              ) : (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  src="/images/antigravity-home/ide-core.mp4"
                />
              )}
            </div>
          </article>
        ))}
      </section>

      <section className={styles.useCasesSection}>
        <div className={styles.useCaseIntro}>
          <h2>
            Built for developers
            <br />
            for the agent-first era
          </h2>
          <p>
            Google Antigravity is built for user trust, whether you&apos;re a
            professional developer working in a large enterprise codebase, a
            hobbyist vibe-coding in their spare time, or anyone in between.
          </p>
        </div>
        <div className={styles.caseRail}>
          {useCaseCards.map((card) => (
            <Link className={styles.caseCard} href={card.href} key={card.title}>
              <div className={styles.caseImage}>
                <Image
                  alt={card.title}
                  fill
                  loading="eager"
                  sizes="(max-width: 768px) 86vw, 848px"
                  src={card.image}
                />
                <Cursor />
                <h3>{card.title}</h3>
                <span className={styles.casePlay}>
                  <Symbol>play_arrow</Symbol>
                </span>
              </div>
              <div className={styles.caseText}>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
                <span>
                  View case
                  <Symbol>keyboard_arrow_right</Symbol>
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.sliderControls} aria-hidden="true">
          <button type="button">
            <Symbol>keyboard_arrow_left</Symbol>
          </button>
          <button type="button">
            <Symbol>keyboard_arrow_right</Symbol>
          </button>
        </div>
      </section>

      <section className={styles.solutionsSection}>
        <div className={styles.solutionCard}>
          <ParticleField variant="grid" density={70} />
          <p className={styles.solutionLabel}>Available at no charge</p>
          <h2>For developers</h2>
          <p>Achieve new heights</p>
          <Link className={`${styles.button} ${styles.buttonPrimary}`} href="https://antigravity.google/download">
            Download
          </Link>
        </div>
        <div className={styles.solutionCard}>
          <ParticleField variant="grid" density={70} />
          <p className={styles.solutionLabel}>Now Available!</p>
          <h2>For organizations</h2>
          <p>Level up your entire team</p>
          <Link className={`${styles.button} ${styles.buttonSecondary}`} href="https://antigravity.google/blog/google-antigravity-for-enterprises">
            Read More
          </Link>
        </div>
      </section>

      <section className={styles.blogSection}>
        <div className={styles.sectionHeader}>
          <h2>Latest Blogs</h2>
          <Link className={`${styles.button} ${styles.buttonSecondary}`} href="https://antigravity.google/blog">
            View blog
          </Link>
        </div>
        <div className={styles.blogRail}>
          {blogItems.map((blog) => (
            <Link className={styles.blogCard} href={blog.href} key={blog.title}>
              <Image
                alt={blog.title}
                height={288}
                loading="eager"
                src={blog.image}
                width={288}
              />
              <h3>{blog.title}</h3>
              <div className={styles.blogMeta}>
                <span>{blog.date}</span>
                <span>{blog.category}</span>
              </div>
              <span className={styles.arrowLink}>
                Read blog
                <Symbol>keyboard_arrow_right</Symbol>
              </span>
            </Link>
          ))}
        </div>
        <div className={styles.sliderControls} aria-hidden="true">
          <button type="button">
            <Symbol>keyboard_arrow_left</Symbol>
          </button>
          <button type="button">
            <Symbol>keyboard_arrow_right</Symbol>
          </button>
        </div>
      </section>

      <section className={styles.downloadSection}>
        <ParticleField className={styles.downloadParticles} density={210} variant="dark" />
        <div className={styles.downloadContent}>
          <Cursor />
          <h2 className={styles.typeReveal}>Download Google Antigravity for MacOS</h2>
          <div className={styles.downloadActions}>
            <Link className={`${styles.button} ${styles.buttonInverse}`} href="https://antigravity.google/download">
              Download for Apple Silicon
            </Link>
            <Link className={`${styles.button} ${styles.buttonDarkSecondary}`} href="https://antigravity.google/download">
              Download for Intel
            </Link>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <p>Experience liftoff</p>
          <nav aria-label="Antigravity footer primary">
            {footerPrimaryLinks.map((link) => (
              <Link href={link.href} key={link.title}>
                {link.title}
              </Link>
            ))}
          </nav>
          <nav aria-label="Antigravity footer secondary">
            {footerSecondaryLinks.map((link) => (
              <Link href={link.href} key={link.title}>
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
        <Image
          alt="Antigravity"
          className={styles.footerWordmark}
          height={264}
          src="/images/antigravity-home/footer-antigravity.svg"
          width={1297}
        />
        <div className={styles.footerGoogle}>
          <Link aria-label="Google" href="https://www.google.com/">
            <Image alt="Google" height={25} src="/images/antigravity-home/google-wordmark.svg" width={75} />
          </Link>
          <nav aria-label="Google links">
            {googleLinks.map((link) => (
              <Link href={link.href} key={link.title}>
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </main>
  );
}
