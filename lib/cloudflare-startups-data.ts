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
    key: "products",
    href: "/products/",
    footerLinks: [
      { title: "See all products", href: "/products/" },
      { title: "Global network", href: "/network/" },
      { title: "Domain Registration", href: "https://domains.cloudflare.com/" },
      { title: "1.1.1.1", href: "https://one.one.one.one/" },
    ],
    columns: [
      {
        title: "Compute",
        href: "/products#compute",
        links: [
          { title: "Browser Run", description: "Automated browsers", href: "/products/browser-rendering/" },
          { title: "Containers", description: "Any language, anywhere", href: "/products/containers/" },
          { title: "Durable Objects", description: "Stateful compute", href: "/products/durable-objects/" },
          { title: "Sandboxes", description: "Secure code execution", href: "/products/sandboxes/" },
          { title: "Workers", description: "Global serverless functions", href: "/products/workers/" },
          { title: "Workers for Platforms", description: "Programmable Platform Solutions", href: "/products/workers-for-platforms/" },
          { title: "Workflows", description: "Process orchestration", href: "/products/workflows/" },
        ],
      },
      {
        title: "Storage",
        href: "/products#storage",
        links: [
          { title: "Artifacts", description: "Git-native versioned storage", href: "/products/artifacts/" },
          { title: "D1", description: "Serverless SQL", href: "/products/d1/" },
          { title: "Data Platform", description: "Ingest, Catalog & Query", href: "/products/data-platform/" },
          { title: "Hyperdrive", description: "Global databases", href: "/products/hyperdrive/" },
          { title: "Queues", description: "Message processing", href: "/products/queues/" },
          { title: "R2", description: "Egress-free storage", href: "/products/r2/" },
          { title: "KV", description: "Ultra-fast key-value storage", href: "/products/kv/" },
        ],
      },
      {
        title: "AI",
        href: "/products#ai",
        links: [
          { title: "Agents", description: "Build stateful AI agents", href: "/products/agents/" },
          { title: "AI Gateway", description: "AI observability", href: "/products/ai-gateway/" },
          { title: "AI Search", description: "Instant retrieval", href: "/products/ai-search/" },
          { title: "Vectorize", description: "Vector database", href: "/products/vectorize/" },
          { title: "Workers AI", description: "Edge AI models", href: "/products/workers-ai/" },
        ],
      },
      {
        title: "Security",
        href: "/products#security",
        links: [
          { title: "DDoS Protection", description: "Mitigation Solutions", href: "/products/ddos-protection/" },
          { title: "Rate Limiting", description: "Abuse prevention", href: "/products/rate-limiting/" },
          { title: "SSL", description: "Secure Your Site with SSL", href: "/products/ssl/" },
          { title: "Turnstile", description: "A CAPTCHA Replacement Solution", href: "/products/turnstile/" },
          { title: "WAF", description: "Web Application Firewall", href: "/products/waf/" },
          { title: "Magic Transit", description: "DDoS Protection for Networks", href: "/products/magic-transit/" },
        ],
      },
      {
        title: "Network & Content Delivery",
        href: "/products#network-and-content-delivery",
        links: [
          { title: "Bot Management", description: "Block bad bots", href: "/products/bot-management/" },
          { title: "CDN", description: "Faster delivery & caching", href: "/products/cdn/" },
          { title: "DNS", description: "Fast DNS", href: "/products/dns/" },
          { title: "Load Balancing", description: "Zero downtime", href: "/products/load-balancing/" },
          { title: "Page Shield", description: "Client-Side Protection", href: "/products/page-shield/" },
          { title: "TURN / SFU", description: "Real-time infra", href: "/products/realtime/" },
          { title: "Analytics", description: "Web Performance & Security", href: "/products/analytics/" },
        ],
      },
      {
        title: "SASE / Zero Trust",
        href: "/products#sase-zero-trust",
        links: [
          { title: "SASE", description: "Cloudflare SASE platform", href: "/products/sase/" },
          { title: "Access", description: "Safe access to private applications", href: "/products/zero-trust/access/" },
          { title: "Data Loss Prevention", description: "Protect sensitive data", href: "/products/zero-trust/dlp/" },
          { title: "Secure Web Gateway", description: "DNS filtering & Secure Browsing", href: "/products/zero-trust/gateway/" },
          { title: "WAN", description: "Cloud-delivered enterprise networking", href: "/products/magic-wan/" },
          { title: "Mesh", description: "Agents private network", href: "/products/zero-trust/mesh/" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    key: "solutions",
    href: "/solutions/",
    footerLinks: [],
    columns: [
      {
        title: "Use Cases",
        links: [
          { title: "AI", description: "Build intelligent applications with AI at the edge", href: "/solutions/ai/" },
          { title: "Frontends", description: "Deploy frontend applications globally in seconds", href: "/solutions/frontends/" },
          { title: "Network", description: "Global network services for performance and reliability", href: "/solutions/network/" },
          { title: "Platforms", description: "Build platforms on Cloudflare's infrastructure", href: "/solutions/platforms/" },
          { title: "Security", description: "Protect your applications from threats", href: "/solutions/security/" },
          { title: "Workflows", description: "Orchestrate complex multi-step processes", href: "/solutions/workflows/" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    key: "resources",
    href: "/resource-hub/",
    footerLinks: [
      { title: "See Upcoming Events", href: "/events/" },
      { title: "Startups", href: "/startups/" },
      { title: "Careers", href: "/careers/" },
      { title: "Partners", href: "/partners/" },
      { title: "Status", href: "https://www.cloudflarestatus.com/" },
      { title: "Support", href: "/support/" },
    ],
    columns: [
      {
        title: "Blog",
        links: [
          { title: "Blog", description: "News, product updates, and announcements", href: "/blog/" },
          { title: "Community", description: "Connect with other developers and experts", href: "/community/" },
        ],
      },
      {
        title: "Documentation",
        links: [
          { title: "Developer Docs", description: "Guides, references, and tutorials", href: "https://developers.cloudflare.com/" },
          { title: "API Reference", description: "Cloudflare API documentation", href: "https://developers.cloudflare.com/api/" },
          { title: "Case Studies", description: "Customer success stories and results", href: "/case-studies/" },
        ],
      },
      {
        title: "Learning",
        links: [
          { title: "Learning Center", description: "Learn about web technology concepts", href: "/learning/" },
          { title: "Reference Architectures", description: "Architecture patterns and best practices", href: "/reference-architecture/" },
          { title: "Press", description: "Latest news, media resources, and coverage", href: "/press/" },
        ],
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

export const footerColumns = [
  [
    { title: "Getting started", links: ["Plans", "Contact sales", "Partners", "Find a partner", "Startups", "Under attack?", "Domain name search"] },
    { title: "Company", links: ["About", "Careers", "Investors", "Press", "Press kit", "Global network"] },
  ],
  [
    { title: "Public interest", links: ["Project Galileo", "Athenian Project", "Cloudflare for Campaigns", "Project Fairshot", "Impact/ESG"] },
    { title: "Compliance", links: ["Compliance resources", "Trust", "GDPR", "Responsible AI", "Transparency report", "Report abuse"] },
  ],
  [
    { title: "Resources", links: ["App innovation report", "Cloudflare Radar", "Case studies", "Status", "Support", "Events", "Blog"] },
    { title: "Developers", links: ["Documentation", "Learning center", "Community"] },
  ],
  [
    { title: "Solutions", links: ["SSE and SASE platform", "Cloudflare AI Cloud", "Frontend Development Platform", "Multi-Tenant Platform Development", "Web Security Platform"] },
  ],
];
