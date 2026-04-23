"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  startTransition,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import {
  ArrowRight,
  CalendarDays,
  Grip,
  Palette,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { BufferFooter } from "@/components/buffer-footer";
import { BufferHeader } from "@/components/buffer-header";
import { ChannelIcon, CheckIcon } from "@/components/buffer-icons";
import {
  analyticsData,
  analyticsStats,
  brandPalette,
  calendarSlots,
  generatedPostCards,
  heroPrompt,
  logoTicker,
  postWall,
  pricingPlans,
  schedulingCards,
  studioPlatforms,
  tonePillars,
  workflowSteps,
  type StudioPlatform,
} from "@/lib/create-studio-data";
import styles from "@/components/create-studio-page.module.css";

type ChartMode = "area" | "bar" | "line";
type BillingMode = "annual" | "monthly";

const platformColorById: Record<StudioPlatform, string> = {
  instagram: "var(--color-pink-400)",
  linkedin: "var(--color-blue-400)",
  x: "var(--color-green-400)",
};

function createInitialSchedule() {
  return calendarSlots.reduce<Record<string, string | null>>(
    (accumulator, slot) => {
      accumulator[slot.id] = null;
      return accumulator;
    },
    {},
  );
}

function useHeroTyping(cardTexts: string[]) {
  const reducedMotion = useReducedMotion();
  const [promptProgress, setPromptProgress] = useState(
    reducedMotion ? heroPrompt.length : 0,
  );
  const [cardProgress, setCardProgress] = useState<number[]>(
    reducedMotion
      ? cardTexts.map((text) => text.length)
      : cardTexts.map(() => 0),
  );

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const promptTimer = window.setInterval(() => {
      setPromptProgress((value) => {
        if (value >= heroPrompt.length) {
          window.clearInterval(promptTimer);
          return value;
        }

        return value + 1;
      });
    }, 18);

    return () => {
      window.clearInterval(promptTimer);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || promptProgress < heroPrompt.length) {
      return;
    }

    const timers = cardTexts.map((text, index) =>
      window.setInterval(
        () => {
          setCardProgress((value) => {
            const next = [...value];

            if (next[index] >= text.length) {
              return value;
            }

            next[index] += index === 1 ? 3 : 2;
            return next;
          });
        },
        26 + index * 12,
      ),
    );

    return () => {
      timers.forEach((timer) => window.clearInterval(timer));
    };
  }, [cardTexts, promptProgress, reducedMotion]);

  return {
    prompt: heroPrompt.slice(0, promptProgress),
    cards: cardTexts.map((text, index) => text.slice(0, cardProgress[index])),
  };
}

function useCountUp(target: number) {
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(reducedMotion ? target : 0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    let frameId = 0;

    if (reducedMotion) {
      frameId = window.requestAnimationFrame(() => {
        setValue(target);
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        const startedAt = performance.now();
        const duration = 1400;

        const animate = (time: number) => {
          const progress = Math.min((time - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(target * eased);

          if (progress < 1) {
            frameId = window.requestAnimationFrame(animate);
          }
        };

        frameId = window.requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [reducedMotion, target]);

  return { ref, value };
}

function ChannelBadge({ platform }: { platform: StudioPlatform }) {
  return (
    <span
      className={styles.channelBadge}
      style={
        { "--studio-accent": platformColorById[platform] } as CSSProperties
      }
    >
      <ChannelIcon channel={platform} className={styles.channelBadgeIcon} />
    </span>
  );
}

function StatCounter({
  label,
  suffix,
  value,
}: {
  label: string;
  suffix: string;
  value: number;
}) {
  const { ref, value: animatedValue } = useCountUp(value);
  const formattedValue =
    suffix === "%"
      ? `${animatedValue.toFixed(1).replace(/\\.0$/, "")}%`
      : Math.round(animatedValue).toLocaleString();

  return (
    <div ref={ref} className={styles.analyticsStat}>
      <span className={styles.analyticsValue}>{formattedValue}</span>
      <span className={styles.analyticsLabel}>{label}</span>
    </div>
  );
}

function ScheduleCard({
  card,
  isDragging,
}: {
  card: (typeof schedulingCards)[number];
  isDragging?: boolean;
}) {
  return (
    <motion.div
      layout
      className={styles.scheduleCard}
      initial={false}
      animate={{
        rotate: isDragging ? -2 : 0,
        scale: isDragging ? 1.03 : 1,
        boxShadow: isDragging
          ? "0 24px 48px rgba(33, 49, 48, 0.18)"
          : "0 10px 30px rgba(33, 49, 48, 0.08)",
      }}
      style={
        { "--studio-accent": platformColorById[card.platform] } as CSSProperties
      }
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className={styles.scheduleCardHeader}>
        <span className={styles.dragHandle}>
          <Grip size={14} />
        </span>
        <ChannelBadge platform={card.platform} />
      </div>
      <strong>{card.label}</strong>
      <p>{card.text}</p>
      <span className={styles.scheduleCardTime}>{card.time}</span>
    </motion.div>
  );
}

function DraggableScheduleCard({
  card,
  children,
}: {
  card: (typeof schedulingCards)[number];
  children?: ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card.id,
    });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={styles.draggableWrapper}
      {...listeners}
      {...attributes}
    >
      {children ?? <ScheduleCard card={card} isDragging={isDragging} />}
    </div>
  );
}

function CalendarSlot({
  card,
  slot,
}: {
  card?: (typeof schedulingCards)[number];
  slot: (typeof calendarSlots)[number];
}) {
  const { isOver, setNodeRef } = useDroppable({ id: slot.id });

  return (
    <motion.div
      ref={setNodeRef}
      className={styles.calendarSlot}
      animate={{
        scale: isOver ? 1.02 : 1,
        borderColor: isOver
          ? "var(--color-green-600)"
          : "var(--color-neutral-300)",
        backgroundColor: isOver
          ? "rgba(193, 241, 171, 0.4)"
          : "rgba(255,255,255,0.72)",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      <div className={styles.calendarSlotMeta}>
        <span>{slot.day}</span>
        <span>{slot.time}</span>
      </div>
      <strong>{slot.title}</strong>
      {card ? (
        <DraggableScheduleCard card={card}>
          <ScheduleCard card={card} />
        </DraggableScheduleCard>
      ) : (
        <p className={styles.calendarSlotHint}>Drop a polished draft here</p>
      )}
    </motion.div>
  );
}

function StaticCalendarSlot({
  card,
  slot,
}: {
  card?: (typeof schedulingCards)[number];
  slot: (typeof calendarSlots)[number];
}) {
  return (
    <div className={styles.calendarSlot}>
      <div className={styles.calendarSlotMeta}>
        <span>{slot.day}</span>
        <span>{slot.time}</span>
      </div>
      <strong>{slot.title}</strong>
      {card ? (
        <div className={styles.draggableWrapper}>
          <ScheduleCard card={card} />
        </div>
      ) : (
        <p className={styles.calendarSlotHint}>Drop a polished draft here</p>
      )}
    </div>
  );
}

function PricingCard({
  featured,
  plan,
  price,
}: {
  featured?: boolean;
  plan: (typeof pricingPlans)[number];
  price: number;
}) {
  return (
    <motion.article
      className={styles.pricingCard}
      data-featured={featured ? "true" : "false"}
      whileHover={{ y: -8, rotateX: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className={styles.pricingCardHeader}>
        <div>
          <p className={styles.pricingEyebrow}>
            {featured ? "Most flexible" : "Launch plan"}
          </p>
          <h3>{plan.name}</h3>
        </div>
        {featured ? (
          <span className={styles.featuredBadge}>Recommended</span>
        ) : null}
      </div>
      <p className={styles.pricingDescription}>{plan.description}</p>
      <div className={styles.pricingPrice}>
        <span>${price}</span>
        <small>/seat</small>
      </div>
      <ul className={styles.pricingFeatures}>
        {plan.features.map((feature) => (
          <li key={feature}>
            <CheckIcon className={styles.pricingCheck} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link href="/" className={styles.planButton}>
        Start with {plan.name}
        <ArrowRight size={16} />
      </Link>
    </motion.article>
  );
}

export function CreateStudioPage() {
  const [activePlatform, setActivePlatform] =
    useState<StudioPlatform>("instagram");
  const [chartMode, setChartMode] = useState<ChartMode>("area");
  const [billingMode, setBillingMode] = useState<BillingMode>("annual");
  const [schedule, setSchedule] = useState<Record<string, string | null>>(
    createInitialSchedule,
  );
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [isScheduleInteractive, setIsScheduleInteractive] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(4);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );
  const postSentinelRef = useRef<HTMLDivElement>(null);

  const activePlatformData =
    studioPlatforms.find((platform) => platform.id === activePlatform) ??
    studioPlatforms[0];
  const typing = useHeroTyping(generatedPostCards.map((card) => card.text));
  const assignedCardIds = new Set(Object.values(schedule).filter(Boolean));
  const unassignedCards = schedulingCards.filter(
    (card) => !assignedCardIds.has(card.id),
  );
  const activeDragCard = schedulingCards.find(
    (card) => card.id === activeDragId,
  );
  const visibleWallPosts = postWall.slice(0, visiblePosts);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsScheduleInteractive(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const sentinel = postSentinelRef.current;

    if (!sentinel || visiblePosts >= postWall.length) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setVisiblePosts((value) => Math.min(value + 2, postWall.length));
      },
      { threshold: 0.4 },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [visiblePosts]);

  const heroCards = useMemo(
    () =>
      generatedPostCards.map((card, index) => ({
        ...card,
        visibleText: typing.cards[index],
      })),
    [typing.cards],
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const cardId = String(event.active.id);
    const slotId = event.over?.id ? String(event.over.id) : null;

    setActiveDragId(null);

    if (!slotId) {
      return;
    }

    setSchedule((current) => {
      const next = { ...current };

      for (const [key, value] of Object.entries(next)) {
        if (value === cardId) {
          next[key] = null;
        }
      }

      next[slotId] = cardId;
      return next;
    });
  };

  const renderChart = () => {
    if (chartMode === "bar") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData}>
            <CartesianGrid stroke="rgba(33, 49, 48, 0.08)" vertical={false} />
            <XAxis dataKey="label" axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar
              dataKey="reach"
              fill="var(--color-green-500)"
              radius={[12, 12, 4, 4]}
            />
            <Bar
              dataKey="saves"
              fill="var(--color-aqua-600)"
              radius={[12, 12, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (chartMode === "line") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData}>
            <CartesianGrid stroke="rgba(33, 49, 48, 0.08)" vertical={false} />
            <XAxis dataKey="label" axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              dataKey="reach"
              stroke="var(--color-brand-dark)"
              strokeWidth={3}
              dot={{ fill: "var(--color-green-500)", r: 4 }}
              type="monotone"
            />
            <Line
              dataKey="clicks"
              stroke="var(--color-blue-700)"
              strokeWidth={3}
              dot={{ fill: "var(--color-blue-400)", r: 4 }}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={analyticsData}>
          <defs>
            <linearGradient id="reachGradient" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-green-500)"
                stopOpacity="0.45"
              />
              <stop
                offset="100%"
                stopColor="var(--color-green-500)"
                stopOpacity="0.04"
              />
            </linearGradient>
            <linearGradient id="saveGradient" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-aqua-500)"
                stopOpacity="0.32"
              />
              <stop
                offset="100%"
                stopColor="var(--color-aqua-500)"
                stopOpacity="0.04"
              />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(33, 49, 48, 0.08)" vertical={false} />
          <XAxis dataKey="label" axisLine={false} tickLine={false} />
          <Tooltip />
          <Area
            dataKey="reach"
            fill="url(#reachGradient)"
            stroke="var(--color-green-700)"
            strokeWidth={3}
            type="monotone"
          />
          <Area
            dataKey="saves"
            fill="url(#saveGradient)"
            stroke="var(--color-aqua-800)"
            strokeWidth={2}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className={styles.page}>
      <BufferHeader />

      <main>
        <section className={styles.heroSection}>
          <div className="max-inline-size-container-wide">
            <div className={styles.heroLayout}>
              <motion.div
                className={styles.heroCopy}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                <span className={styles.heroEyebrow}>
                  <Sparkles size={16} />
                  New from Buffer
                </span>
                <h1>Write once. Shape it for every channel.</h1>
                <p>
                  Buffer Create is Buffer&apos;s AI-powered content studio: one
                  calm place to write, preview, schedule, and publish social
                  content across every platform.
                </p>

                <div className={styles.heroActions}>
                  <Link href="#pricing" className={styles.primaryButton}>
                    Start with Buffer Create
                    <ArrowRight size={16} />
                  </Link>
                  <Link href="#workflow" className={styles.secondaryButton}>
                    See how it works
                  </Link>
                </div>
              </motion.div>

              <motion.div
                className={styles.heroVisual}
                initial={{ opacity: 0, y: 26, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <div className={styles.promptPanel}>
                  <div className={styles.promptHeader}>
                    <span>Prompt</span>
                    <span className={styles.cursorPill}>AI drafting</span>
                  </div>
                  <div className={styles.promptInput}>
                    {typing.prompt}
                    <span className={styles.cursor} />
                  </div>
                </div>

                <div className={styles.generatedGrid}>
                  {heroCards.map((card, index) => (
                    <motion.article
                      key={card.id}
                      className={styles.generatedCard}
                      style={
                        {
                          "--studio-accent": platformColorById[card.platform],
                        } as CSSProperties
                      }
                      initial={{
                        opacity: 0,
                        y: 32,
                        rotate: index === 1 ? 2 : -2,
                      }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 20,
                        delay: 0.2 + index * 0.08,
                      }}
                    >
                      <div className={styles.generatedHeader}>
                        <ChannelBadge platform={card.platform} />
                        <span>{card.label}</span>
                      </div>
                      <p>{card.visibleText}</p>
                    </motion.article>
                  ))}
                </div>

                <div className={styles.heroDeviceWrap}>
                  <div className={styles.platformSwitcher}>
                    <LayoutGroup id="platform-switcher">
                      {studioPlatforms.map((platform) => (
                        <button
                          key={platform.id}
                          className={styles.platformButton}
                          onClick={() =>
                            startTransition(() => {
                              setActivePlatform(platform.id);
                            })
                          }
                          type="button"
                        >
                          {activePlatform === platform.id ? (
                            <motion.span
                              className={styles.platformActive}
                              layoutId="platform-active-pill"
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 24,
                              }}
                            />
                          ) : null}
                          <ChannelIcon
                            channel={platform.id}
                            className={styles.platformButtonIcon}
                          />
                          <span>{platform.label}</span>
                        </button>
                      ))}
                    </LayoutGroup>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePlatformData.id}
                      className={styles.deviceFrame}
                      initial={{ opacity: 0, x: 18, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -18, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className={styles.deviceHeader}>
                        <div className={styles.windowDots}>
                          <span />
                          <span />
                          <span />
                        </div>
                        <span>{activePlatformData.badge}</span>
                      </div>

                      <div className={styles.devicePreview}>
                        <Image
                          alt={`${activePlatformData.label} preview mockup`}
                          src={activePlatformData.image}
                          fill
                          sizes="(max-width: 1024px) 100vw, 520px"
                        />
                      </div>

                      <div className={styles.deviceFooter}>
                        <div>
                          <strong>{activePlatformData.label} preview</strong>
                          <p>{activePlatformData.audience}</p>
                        </div>
                        <p>{activePlatformData.preview}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className={styles.workflowSection} id="workflow">
          <div className="max-inline-size-container-wide">
            <div className={styles.sectionIntro}>
              <span className={styles.sectionEyebrow}>How it works</span>
              <h2>
                Move from rough prompt to polished post without changing tools.
              </h2>
              <p>Three steps. One workspace. No extra tabs to keep open.</p>
            </div>

            <div className={styles.workflowRail}>
              <div className={styles.workflowLine} />
              {workflowSteps.map((step, index) => (
                <motion.article
                  key={step.id}
                  className={styles.workflowCard}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <span className={styles.workflowIndex}>0{index + 1}</span>
                  <div className={styles.workflowImage}>
                    <Image
                      alt={step.title}
                      src={step.image}
                      fill
                      sizes="(max-width: 1024px) 100vw, 360px"
                    />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.previewSection}>
          <div className="max-inline-size-container-wide">
            <div className={styles.previewSurface}>
              <div className={styles.previewCopy}>
                <span className={styles.sectionEyebrow}>Platform preview</span>
                <h2>The same idea, already shaped for the right audience.</h2>
                <p>
                  Switch between channels and the preview adapts with it. Copy
                  length, layout, and the surrounding frame all move together.
                </p>

                <ul className={styles.featureList}>
                  <li>
                    <CheckIcon className={styles.listIcon} />
                    Platform-aware preview cards
                  </li>
                  <li>
                    <CheckIcon className={styles.listIcon} />
                    One idea rewritten with the right rhythm
                  </li>
                  <li>
                    <CheckIcon className={styles.listIcon} />
                    Ready for review before it hits the calendar
                  </li>
                </ul>
              </div>

              <div className={styles.previewDevicePane}>
                <div
                  className={styles.previewAccent}
                  style={
                    {
                      "--studio-accent": activePlatformData.accent,
                    } as CSSProperties
                  }
                />
                <motion.div
                  className={styles.previewBrowser}
                  layout
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                >
                  <div className={styles.previewBrowserTop}>
                    <span>{activePlatformData.label}</span>
                    <span>{activePlatformData.cta}</span>
                  </div>
                  <div className={styles.previewBrowserImage}>
                    <Image
                      alt={`${activePlatformData.label} product preview`}
                      src={activePlatformData.image}
                      fill
                      sizes="(max-width: 1024px) 100vw, 640px"
                    />
                  </div>
                  <div className={styles.previewBrowserText}>
                    <strong>{activePlatformData.badge}</strong>
                    <p>{activePlatformData.description}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.calendarSection} id="calendar">
          <div className="max-inline-size-container-wide">
            <div className={styles.sectionIntro}>
              <span className={styles.sectionEyebrow}>
                <CalendarDays size={16} />
                Content calendar
              </span>
              <h2>
                Drag finished drafts into the week and feel the schedule snap
                into place.
              </h2>
              <p>The interaction stays light, but the workflow feels real.</p>
            </div>

            {isScheduleInteractive ? (
              <DndContext
                sensors={sensors}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
              >
                <div className={styles.calendarSurface}>
                  <div className={styles.cardSource}>
                    <h3>Ready to schedule</h3>
                    <div className={styles.cardSourceList}>
                      {unassignedCards.map((card) => (
                        <DraggableScheduleCard card={card} key={card.id} />
                      ))}
                    </div>
                  </div>

                  <div className={styles.calendarGrid}>
                    {calendarSlots.map((slot) => {
                      const cardId = schedule[slot.id];
                      const card = schedulingCards.find(
                        (entry) => entry.id === cardId,
                      );

                      return (
                        <CalendarSlot card={card} key={slot.id} slot={slot} />
                      );
                    })}
                  </div>
                </div>

                <DragOverlay>
                  {activeDragCard ? (
                    <ScheduleCard card={activeDragCard} isDragging />
                  ) : null}
                </DragOverlay>
              </DndContext>
            ) : (
              <div className={styles.calendarSurface}>
                <div className={styles.cardSource}>
                  <h3>Ready to schedule</h3>
                  <div className={styles.cardSourceList}>
                    {unassignedCards.map((card) => (
                      <div className={styles.draggableWrapper} key={card.id}>
                        <ScheduleCard card={card} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.calendarGrid}>
                  {calendarSlots.map((slot) => {
                    const cardId = schedule[slot.id];
                    const card = schedulingCards.find(
                      (entry) => entry.id === cardId,
                    );

                    return (
                      <StaticCalendarSlot
                        card={card}
                        key={slot.id}
                        slot={slot}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className={styles.analyticsSection} id="analytics">
          <div className="max-inline-size-container-wide">
            <div className={styles.analyticsSurface}>
              <div className={styles.sectionIntro}>
                <span className={styles.sectionEyebrow}>
                  <WandSparkles size={16} />
                  Analytics that stay readable
                </span>
                <h2>
                  See performance clearly, then switch the view without losing
                  the story.
                </h2>
                <p>
                  Numbers count up as the chart steps into view. Bar, line, and
                  area each tell a slightly different truth.
                </p>
              </div>

              <div className={styles.analyticsHeader}>
                <div className={styles.analyticsStats}>
                  {analyticsStats.map((stat) => (
                    <StatCounter key={stat.label} {...stat} />
                  ))}
                </div>

                <div className={styles.toggleRow}>
                  {(["area", "bar", "line"] as ChartMode[]).map((mode) => (
                    <button
                      key={mode}
                      className={styles.toggleButton}
                      data-active={chartMode === mode}
                      onClick={() =>
                        startTransition(() => {
                          setChartMode(mode);
                        })
                      }
                      type="button"
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <motion.div
                key={chartMode}
                className={styles.chartCard}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24 }}
              >
                {renderChart()}
              </motion.div>
            </div>
          </div>
        </section>

        <section className={styles.brandSection}>
          <div className="max-inline-size-container-wide">
            <div className={styles.brandSurface}>
              <div className={styles.brandCopy}>
                <span className={styles.sectionEyebrow}>
                  <Palette size={16} />
                  Brand kit
                </span>
                <h2>
                  Lock the voice, color, and feel of your launch before the
                  first draft lands.
                </h2>
                <p>
                  Buffer Create keeps your brand choices close to the writing
                  surface, so polish happens early.
                </p>

                <div className={styles.toneList}>
                  {tonePillars.map((tone, index) => (
                    <motion.span
                      key={tone}
                      className={styles.tonePill}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.35, delay: index * 0.08 }}
                    >
                      {tone}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className={styles.kitPanel}>
                <div className={styles.swatchGrid}>
                  {brandPalette.map((swatch, index) => (
                    <motion.div
                      key={swatch.name}
                      className={styles.swatchCard}
                      initial={{ opacity: 0, y: -18, scale: 0.92 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 18,
                        delay: index * 0.06,
                      }}
                    >
                      <span
                        className={styles.swatchColor}
                        style={{ backgroundColor: swatch.value }}
                      />
                      <strong>{swatch.name}</strong>
                      <small>{swatch.value}</small>
                    </motion.div>
                  ))}
                </div>

                <div className={styles.typeSpecimen}>
                  <div>
                    <small>Heading</small>
                    <strong>Stolzl keeps it clear and bright.</strong>
                  </div>
                  <div>
                    <small>Body</small>
                    <p>
                      Figtree keeps the reading calm, fast, and friendly across
                      every preview.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.proofSection}>
          <div className="max-inline-size-container-wide">
            <div className={styles.logoMarquee}>
              <div className={styles.logoTrack}>
                {[...logoTicker, ...logoTicker].map((logo, index) => (
                  <span className={styles.logoPill} key={`${logo}-${index}`}>
                    {logo}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.wallIntro}>
              <span className={styles.sectionEyebrow}>Social proof</span>
              <h2>
                A launch page should feel like the product already works at
                scale.
              </h2>
            </div>

            <div className={styles.postWall}>
              {visibleWallPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className={styles.wallCard}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.32, delay: index * 0.04 }}
                >
                  <div className={styles.wallCardHeader}>
                    <div className={styles.wallAvatar}>
                      <Image
                        alt={post.author}
                        src={post.image}
                        fill
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <strong>{post.author}</strong>
                      <span>{post.handle}</span>
                    </div>
                    <ChannelBadge platform={post.platform} />
                  </div>
                  <p>{post.text}</p>
                </motion.article>
              ))}
            </div>

            <div ref={postSentinelRef} className={styles.wallSentinel} />
          </div>
        </section>

        <section className={styles.pricingSection} id="pricing">
          <div className="max-inline-size-container-wide">
            <div className={styles.sectionIntro}>
              <span className={styles.sectionEyebrow}>Pricing</span>
              <h2>
                Simple plans for teams that want to move faster without making
                the workflow louder.
              </h2>
              <p>
                Choose the pace that fits now. Scale when the launch gets
                bigger.
              </p>
            </div>

            <div className={styles.pricingToggle}>
              {(["monthly", "annual"] as BillingMode[]).map((mode) => (
                <button
                  key={mode}
                  className={styles.toggleButton}
                  data-active={billingMode === mode}
                  onClick={() =>
                    startTransition(() => {
                      setBillingMode(mode);
                    })
                  }
                  type="button"
                >
                  {mode === "annual" ? "Annual · save 20%" : "Monthly"}
                </button>
              ))}
            </div>

            <div className={styles.pricingGrid}>
              {pricingPlans.map((plan) => (
                <PricingCard
                  featured={plan.featured}
                  key={plan.id}
                  plan={plan}
                  price={billingMode === "annual" ? plan.annual : plan.monthly}
                />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection} id="cta">
          <div className="max-inline-size-container-wide">
            <motion.div
              className={styles.ctaSurface}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
            >
              <div className={styles.ctaBlobOne} />
              <div className={styles.ctaBlobTwo} />
              <div className={styles.ctaCopy}>
                <span className={styles.sectionEyebrow}>Buffer Create</span>
                <h2>Build your next launch in one calmer studio.</h2>
                <p>
                  Draft it, shape it, schedule it, and show the team the exact
                  version you&apos;re about to ship.
                </p>
                <Link href="/" className={styles.primaryButton}>
                  Get launch access
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className={styles.ctaVisual}>
                <Image
                  alt="Buffer Create interface preview"
                  src="/images/homepage/publish-composer.webp"
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <BufferFooter />
    </div>
  );
}
