export type StudioPlatform = "instagram" | "linkedin" | "x";

export const studioPlatforms: Array<{
  accent: string;
  audience: string;
  badge: string;
  cta: string;
  description: string;
  id: StudioPlatform;
  image: string;
  label: string;
  preview: string;
}> = [
  {
    id: "instagram",
    label: "Instagram",
    badge: "Visual-first",
    audience: "Short captions, stronger hooks, clearer CTA",
    description: "Preview carousel posts, reels captions, and story copy in one composer.",
    preview:
      "Weekend launch energy: three ideas to turn one product update into a week of posts. Save this for your Monday content sprint.",
    cta: "Plan the whole week in one view",
    accent: "var(--color-pink-400)",
    image: "/images/homepage/start-page.webp",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    badge: "Authority-ready",
    audience: "Longer narrative, sharper insight, calmer structure",
    description: "Shape product updates into thoughtful posts with built-in formatting and preview states.",
    preview:
      "A calmer publishing workflow does more than save time. It gives small teams the space to think better, write better, and show up consistently.",
    cta: "Switch tone without rewriting from scratch",
    accent: "var(--color-blue-400)",
    image: "/images/homepage/insights.webp",
  },
  {
    id: "x",
    label: "X",
    badge: "Thread-ready",
    audience: "Fast hooks, clean rhythm, punchier edits",
    description: "Draft a thread, trim it for pace, and schedule each post with a live character-aware preview.",
    preview:
      "1/ Good content systems are invisible. 2/ Your team opens one workspace. 3/ Ideas, drafts, previews, and timing are already there.",
    cta: "Turn one prompt into a finished thread",
    accent: "var(--color-green-400)",
    image: "/images/homepage/create-ideas.webp",
  },
];

export const heroPrompt =
  "Launch Buffer Create for a spring campaign. Friendly tone, one idea adapted for Instagram, LinkedIn, and X.";

export const generatedPostCards: Array<{
  id: string;
  label: string;
  platform: StudioPlatform;
  text: string;
}> = [
  {
    id: "instagram-post",
    label: "Instagram caption",
    platform: "instagram",
    text: "One launch. Three polished posts. Buffer Create helps your team move from rough prompt to ready-to-publish content without losing your voice.",
  },
  {
    id: "linkedin-post",
    label: "LinkedIn post",
    platform: "linkedin",
    text: "Buffer Create brings writing, previews, approvals, and scheduling into one calm workspace so social teams can publish with more confidence.",
  },
  {
    id: "x-post",
    label: "X thread",
    platform: "x",
    text: "Write once. Shape it for every channel. Schedule it before lunch. That is the point of Buffer Create.",
  },
];

export const workflowSteps = [
  {
    id: "capture",
    title: "Capture the raw idea",
    text: "Drop in a brief, a product note, or a messy thought. Buffer Create turns the spark into a starting point.",
    image: "/images/homepage/create-ideas.webp",
  },
  {
    id: "shape",
    title: "Shape it for every channel",
    text: "Preview the same idea as an Instagram caption, a LinkedIn post, and an X thread without starting over.",
    image: "/images/homepage/ai-assistant.webp",
  },
  {
    id: "ship",
    title: "Ship with the calendar already in view",
    text: "Drag finished drafts into the week, hand them off for review, and publish when the timing is right.",
    image: "/images/homepage/collaborate.webp",
  },
];

export const schedulingCards = [
  {
    id: "launch-clip",
    label: "Launch clip",
    platform: "instagram" as const,
    text: "30-second teaser with CTA",
    time: "Mon · 9:00",
  },
  {
    id: "founder-note",
    label: "Founder note",
    platform: "linkedin" as const,
    text: "A clear product story for launch day",
    time: "Tue · 11:30",
  },
  {
    id: "thread-recap",
    label: "Thread recap",
    platform: "x" as const,
    text: "Fast takeaways and the sign-up link",
    time: "Thu · 14:00",
  },
];

export const calendarSlots = [
  { id: "slot-1", day: "Mon", title: "Launch pulse", time: "09:00" },
  { id: "slot-2", day: "Tue", title: "Founder story", time: "11:30" },
  { id: "slot-3", day: "Thu", title: "Campaign recap", time: "14:00" },
];

export const analyticsStats = [
  { label: "Engagement rate", value: 6.8, suffix: "%" },
  { label: "Avg. saves", value: 1830, suffix: "" },
  { label: "Reply rate", value: 42, suffix: "%" },
];

export const analyticsData = [
  { label: "Mon", reach: 28, saves: 18, clicks: 12 },
  { label: "Tue", reach: 36, saves: 23, clicks: 17 },
  { label: "Wed", reach: 31, saves: 21, clicks: 15 },
  { label: "Thu", reach: 44, saves: 30, clicks: 20 },
  { label: "Fri", reach: 52, saves: 36, clicks: 24 },
  { label: "Sat", reach: 40, saves: 28, clicks: 18 },
];

export const brandPalette = [
  { name: "Launch Mint", value: "#C1F1AB" },
  { name: "Soft Teal", value: "#A4F1E8" },
  { name: "Signal Coral", value: "#FFB2A2" },
  { name: "Quiet Ink", value: "#213130" },
];

export const tonePillars = [
  "Warm, not chatty",
  "Confident, not loud",
  "Helpful, not robotic",
];

export const logoTicker = [
  "Morning Brew",
  "Descript",
  "Loom",
  "ConvertKit",
  "Typefully",
  "Podia",
  "Teachable",
  "Kajabi",
];

export const postWall = [
  {
    id: "wall-1",
    author: "Rita Iglesias",
    handle: "@rita_codes",
    image: "/images/testimonials/rita-iglesias.webp",
    platform: "x" as const,
    text: "Buffer Create gives me one place to draft the long version, trim the short version, and see both before I post.",
  },
  {
    id: "wall-2",
    author: "Paul de La Baume",
    handle: "@Pauldelabaume",
    image: "/images/testimonials/paul-de-la-baume.webp",
    platform: "linkedin" as const,
    text: "The preview states are the difference. I can feel when a post is ready instead of guessing.",
  },
  {
    id: "wall-3",
    author: "Lola Tatiana Veiga Bastos",
    handle: "@yola_bastos",
    image: "/images/testimonials/yola-bastos.webp",
    platform: "instagram" as const,
    text: "My drafts finally stay organized from idea to publish. That alone makes the workflow feel lighter.",
  },
  {
    id: "wall-4",
    author: "Midmodmood",
    handle: "@midmodmood",
    image: "/images/testimonials/midmodmood.webp",
    platform: "instagram" as const,
    text: "The tone controls are subtle in a good way. It still sounds like me, just sharper.",
  },
  {
    id: "wall-5",
    author: "Tina Larsson",
    handle: "@tinalarssonli",
    image: "/images/testimonials/tina-larsson.webp",
    platform: "linkedin" as const,
    text: "My team can review the exact post preview we are about to ship. That removes a lot of friction.",
  },
  {
    id: "wall-6",
    author: "Pia Cato",
    handle: "@vanillapodbakery",
    image: "/images/testimonials/pia-cato.webp",
    platform: "instagram" as const,
    text: "It feels like a calm studio, not another noisy dashboard.",
  },
  {
    id: "wall-7",
    author: "Red Pigeon Media",
    handle: "@redpigeonmedia",
    image: "/images/testimonials/red-pigeon-media.webp",
    platform: "instagram" as const,
    text: "We use it to move campaign ideas into a real schedule faster, especially when clients need options.",
  },
  {
    id: "wall-8",
    author: "Influence Media",
    handle: "@weareinfluencemedia",
    image: "/images/testimonials/influence-media.webp",
    platform: "instagram" as const,
    text: "The platform-specific previews are the part our team keeps talking about. They feel instantly useful.",
  },
];

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    monthly: 19,
    annual: 15,
    description: "For creators and tiny teams getting a faster content workflow in place.",
    features: ["AI drafting", "3 platform previews", "Shared calendar"],
  },
  {
    id: "studio",
    name: "Studio",
    monthly: 49,
    annual: 39,
    description: "For growing teams who want approvals, brand rules, and sharper scheduling.",
    features: ["Brand kit", "Approvals", "Analytics views", "Unlimited drafts"],
    featured: true,
  },
  {
    id: "scale",
    name: "Scale",
    monthly: 99,
    annual: 79,
    description: "For agencies and in-house teams managing multiple brands at once.",
    features: ["Multi-brand workspaces", "Advanced permissions", "Launch reporting"],
  },
];
