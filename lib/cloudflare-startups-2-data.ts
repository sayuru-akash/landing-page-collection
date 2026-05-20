export type Tier = {
  name: string;
  credits: string;
  description: string;
  criteria: string[];
  benefits: string[];
};

export type FeatureGroup = {
  label: string;
  items: string[];
};

export type FeatureColumn = {
  title: string;
  summary: string;
  groups: FeatureGroup[];
  tone: "accent" | "quiet";
};

export type Qualification = {
  title: string;
  description: string;
  icon: "calendar" | "chart" | "code" | "card" | "globe" | "check" | "user";
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const mainNav = [
  {
    label: "Products",
    columns: [
      {
        title: "Compute",
        links: ["Browser Run", "Containers", "Durable Objects", "Sandboxes", "Workers", "Workers for Platforms", "Workflows"],
      },
      {
        title: "Storage",
        links: ["Artifacts", "D1", "Data Platform", "Hyperdrive", "Queues", "R2", "KV"],
      },
      {
        title: "AI",
        links: ["Agents", "AI Gateway", "AI Search", "Vectorize", "Workers AI"],
      },
      {
        title: "Security",
        links: ["DDoS Protection", "Rate Limiting", "SSL", "Turnstile", "WAF", "Magic Transit"],
      },
      {
        title: "Network & Content Delivery",
        links: ["Bot Management", "CDN", "DNS", "Load Balancing", "Page Shield", "TURN / SFU", "Analytics"],
      },
      {
        title: "SASE / Zero Trust",
        links: ["SASE", "Access", "Data Loss Prevention", "Secure Web Gateway", "WAN", "Mesh"],
      },
    ],
  },
  {
    label: "Solutions",
    columns: [
      {
        title: "Use Cases",
        links: ["AI", "Application security", "Developer platform", "Zero Trust", "Website performance", "Network transformation"],
      },
      {
        title: "By Industry",
        links: ["SaaS", "Ecommerce", "Financial services", "Gaming", "Healthcare", "Public sector"],
      },
    ],
  },
  {
    label: "Resources",
    columns: [
      {
        title: "Community",
        links: ["Blog", "Case Studies", "Community", "Events", "Learning Center"],
      },
      {
        title: "Documentation",
        links: ["Developer docs", "API docs", "Cloudflare Radar", "Status", "Support"],
      },
    ],
  },
] as const;

export const tiers: Tier[] = [
  {
    name: "Tier 3",
    credits: "$10k",
    description:
      "Get started with $10k in credits to build and launch your product, no minimum funding required.",
    criteria: ["Bootstrapped or self-funded", "Under $1M raised"],
    benefits: ["Credits: $10k", "Community & events", "Developer docs and Discord community"],
  },
  {
    name: "Tier 2",
    credits: "$100k",
    description:
      "Access expanded $100k in credits, an account manager, and technical sessions with Cloudflare experts.",
    criteria: ["$1M+ raised", "Funded by an affiliated partner"],
    benefits: ["Credits: $100k", "Account manager", "Technical sessions with Cloudflare experts", "Community & events"],
  },
  {
    name: "Tier 1",
    credits: "$350k",
    description:
      "Unlock $350k maximum credits, Office Hours with experts, and priority technical support to scale globally.",
    criteria: ["$5M+ raised", "Funded by an affiliated partner"],
    benefits: [
      "Credits: $350k",
      "Account manager",
      "Priority technical support",
      "Bi-weekly Solutions Architect office hours",
      "Community & events",
    ],
  },
];

export const featureColumns: FeatureColumn[] = [
  {
    title: "Covered by Credits",
    summary: "Usage-based services deducted from your credit balance",
    tone: "accent",
    groups: [
      { label: "Compute", items: ["Workers", "Workers for Platforms", "Durable Objects", "Workflows"] },
      { label: "AI", items: ["Workers AI (up to $50,000)", "AI Gateway (up to $250)"] },
      { label: "Storage & Data", items: ["Workers KV", "D1", "Queues", "Vectorize", "R2 (up to $10,000)"] },
      { label: "Delivery", items: ["Pages", "Images and Stream", "Cache Reserve", "Argo Smart Routing"] },
    ],
  },
  {
    title: "Included at No Cost",
    summary: "Core security and networking features for every tier",
    tone: "quiet",
    groups: [
      { label: "Domains & Plans", items: ["Three enterprise domains", "Unlimited Business and Pro plans"] },
      {
        label: "Security",
        items: ["DDoS and bot protection", "WAF with 1,000 custom rules", "Security Analytics", "SSL certificates", "Page Shield"],
      },
      { label: "Network & Reliability", items: ["CDN and DNS", "Load Balancing (2 origins)", "Rate Limiting (1 rule)", "100% SLA"] },
    ],
  },
];

export const qualifications: Qualification[] = [
  {
    icon: "calendar",
    title: "Founded within the last 10 years",
    description: "Your company was incorporated no more than 10 years ago",
  },
  {
    icon: "chart",
    title: "Funded up to Series B",
    description: "Most recent round was funded within the last 12 months",
  },
  {
    icon: "code",
    title: "Building a technology product",
    description: "Actively developing a technology product",
  },
  {
    icon: "card",
    title: "Has a valid, publicly accessible website",
    description: "Your startup has a live website we can verify",
  },
  {
    icon: "globe",
    title: "Active on LinkedIn, X (Twitter), or GitHub",
    description: "Your startup has a public social media presence",
  },
  {
    icon: "check",
    title: "Has not previously been approved into the program",
    description: "First-time applicants only",
  },
  {
    icon: "user",
    title: "For-profit business with a business email matching your domain",
    description: "Business email required — no personal email addresses",
  },
];

export const resources = [
  { label: "Cloudflare Agents", href: "https://agents.cloudflare.com/" },
  { label: "Developer docs", href: "https://developers.cloudflare.com" },
  { label: "Discord community", href: "https://discord.cloudflare.com" },
];

export const faqItems: FaqItem[] = [
  {
    question: "What do credits cover?",
    answer:
      "Once your credits are confirmed, all eligible paid features will either be deducted from your credit balance or applied at no cost as a program benefit. Your monthly invoices will include a detailed breakdown of usage, credits deducted, and features covered at no cost.\n\nCredits are not currently visible in the dashboard — you can find your remaining balance and consumption details on your monthly invoices.\n\nNote: there is a $10,000 cap on R2 usage, $50,000 on Workers AI (standard partner model pricing applies), and $250 on AI Gateway.",
  },
  {
    question: "Which features require a request to enable?",
    answer:
      "Some features need to be enabled by our team before you can access them. Reach out to startups@cloudflare.com to request:\n\nACM, SSL for SaaS, Rate Limiting, and Load Balancing (additional origins)\n\nBot Management, API Shield, Apex Proxying, and additional Zero Trust seats (these require a support ticket for our team to review)",
  },
  {
    question: "What's not covered?",
    answer:
      "The following are excluded from the program:\n\nRegistrar services\nEnterprise feature add-ons (request via startups@cloudflare.com)\nMagic Transit, Enterprise Spectrum, Dedicated IPs, and China Network — these require a contracted plan. Review contracted plan options here.",
  },
  {
    question: "How long does the program last, and can it be extended?",
    answer:
      "Credits are valid for one year or until fully consumed, whichever comes first. We are not able to approve extensions at this time. Mark the date you received your confirmation email on your calendar so you're not caught off guard when you approach graduation.",
  },
  {
    question: "What happens when I graduate from the program?",
    answer:
      "Our team will reach out to the contact email on your application form with three reminders before your graduation date.\n\nAt graduation, you can choose any self-serve plan directly from the dashboard to keep using pay-as-you-go features. Any enterprise domains not moved to a self-serve plan by graduation will automatically revert to a free plan. If you'd like to continue on an enterprise plan, reach out to discuss pricing and options.",
  },
  {
    question: "Who is not eligible for the program?",
    answer:
      "The following are not eligible: educational institutions, personal blogs, consultancies, service-based agencies, government entities, managed service providers/resellers, NGOs, non-profits, and resellers.",
  },
  {
    question: "Is the program available more than once, or can I transfer my credits?",
    answer:
      "The Startup Program is a one-time opportunity per startup. Credits cannot be transferred between accounts.",
  },
  {
    question: "How long does approval take, and how will I be notified?",
    answer:
      "Our review process takes up to 48 hours. Once approved, you'll receive a confirmation email at the address provided on your application form. If you haven't heard back, check your spam folder or reach out to startups@cloudflare.com.\n\nIf your application was rejected, our team will let you know the reason. If you believe you qualify and can provide supporting information, we're happy to take another look.",
  },
  {
    question: "What support do I have access to?",
    answer:
      "All tiers include priority ticket support and chat. If you need help escalating a ticket, share the ticket number with us. Additional support varies by tier:\n\nBuilder: developer docs, templates, and Discord community\nPortfolio: access to an account manager (case-dependent)\nPartner: bi-weekly Solutions Architect office hours",
  },
  {
    question: "Why don't I see any credit usage?",
    answer:
      "Cloudflare offers a free tier across many features, so you may be using Cloudflare products without drawing on your credits. Credits only apply when you use paid features beyond the free tier.",
  },
];

export const footerGroups = [
  { title: "Getting started", links: ["Plans", "Partners", "Startups", "Under Attack?", "Domain Name Search"] },
  { title: "Public Interest", links: ["Project Galileo", "Athenian Project", "Cloudflare for Campaigns", "Project Fairshot", "Impact/ESG"] },
  { title: "Resources", links: ["Under Attack?", "Documentation", "Learning Center", "App Innovation Report", "Cloudflare Radar", "Case Studies", "Community", "Blog"] },
  { title: "Company", links: ["About", "Careers", "Investors", "Press", "Press kit", "Global network"] },
  { title: "Compliance", links: ["Compliance resources", "Trust", "GDPR", "Responsible AI", "Transparency report", "Report abuse"] },
  { title: "Solutions", links: ["SSE and SASE Platform", "Cloudflare AI Cloud", "Frontend Development Platform", "Multi-Tenant Platform Development", "Web Security Platform"] },
];
