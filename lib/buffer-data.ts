export type ChannelSlug =
  | "bluesky"
  | "facebook"
  | "google-business-profile"
  | "instagram"
  | "linkedin"
  | "mastodon"
  | "pinterest"
  | "threads"
  | "tiktok"
  | "x"
  | "youtube";

export type AudienceKey = "creators" | "smallBusinesses" | "agencies";

export const primaryCtaHref =
  "https://login.buffer.com/signup?product=buffer&plan=free&cycle=year";

export const navMenus = {
  features: [
    {
      title: "Create",
      description: "Build your own library of content ideas",
      href: "/create",
    },
    {
      title: "Publish",
      description: "Plan and schedule your content across social media platforms",
      href: "/publish",
    },
    {
      title: "Analyze",
      description: "Measure performance and turn insights into growth",
      href: "/analyze",
    },
    {
      title: "Community",
      description: "Easily engage with your community",
      href: "/community",
    },
    {
      title: "Collaborate",
      description: "Work together seamlessly, from planning to publishing",
      href: "/collaborate",
    },
    {
      title: "Start Page",
      description: "Build a custom link-in-bio page in minutes",
      href: "/start-page",
    },
    {
      title: "AI Assistant",
      description: "Get help creating, refining, and repurposing content",
      href: "/ai-assistant",
    },
  ],
  madeFor: [
    {
      title: "Creators",
      description: "Grow your community with confidence, not complexity",
      href: "/made-for/creators",
    },
    {
      title: "Small Business",
      description: "A simpler way to manage your small business’ social media",
      href: "/made-for/small-business",
    },
    {
      title: "Agencies",
      description: "Run every client’s social with clarity",
      href: "/agency",
    },
    {
      title: "Nonprofits",
      description: "Made for small teams doing big things",
      href: "/nonprofits",
    },
    {
      title: "Higher Education",
      description: "Social media management built for schools and universities",
      href: "/made-for/higher-education",
    },
  ],
  resources: [
    {
      title: "Blog",
      description: "Real-life stories and resources on growing an engaged audience",
      href: "/resources/",
    },
    {
      title: "Templates",
      description: "Plug-and-play content templates to jump-start your planning",
      href: "/templates",
    },
    {
      title: "Free Tools",
      description: "Easy-to-use tools to grow your presence across social media",
      href: "/free-tools",
    },
    {
      title: "Social Media Insights",
      description: "Data-driven benchmarks, trends, and tips to grow smarter on social",
      href: "/insights",
    },
    {
      title: "Our Community",
      description: "Learn, connect, and grow with creators around the world",
      href: "/our-community",
    },
    {
      title: "Support",
      description: "Help articles and tutorials to get the most out of Buffer",
      href: "https://support.buffer.com/",
    },
  ],
};

export const channels: Array<{ slug: ChannelSlug; label: string; href: string }> = [
  { slug: "bluesky", label: "Bluesky", href: "/bluesky" },
  { slug: "facebook", label: "Facebook", href: "/facebook" },
  {
    slug: "google-business-profile",
    label: "Google Business Profile",
    href: "/google-business-profile",
  },
  { slug: "instagram", label: "Instagram", href: "/instagram" },
  { slug: "linkedin", label: "LinkedIn", href: "/linkedin" },
  { slug: "mastodon", label: "Mastodon", href: "/mastodon" },
  { slug: "pinterest", label: "Pinterest", href: "/pinterest" },
  { slug: "threads", label: "Threads", href: "/threads" },
  { slug: "tiktok", label: "TikTok", href: "/tiktok" },
  { slug: "x", label: "X", href: "/x" },
  { slug: "youtube", label: "YouTube", href: "/youtube" },
];

export const heroEmojiTiles = [
  {
    emoji: "👏",
    className: "HeroSection_emojiTileClapContainer__v5_BW",
    theme: "coral",
  },
  {
    emoji: "🚀",
    className: "HeroSection_emojiTileRocketContainer__S3DJq",
    theme: "purple",
  },
  {
    emoji: "❤️",
    className: "HeroSection_emojiTileHeartContainer__6yAM4",
    theme: "yellow",
  },
  {
    emoji: "📈",
    className: "HeroSection_emojiTileChartContainer__r7CHc",
    theme: "aqua",
  },
  {
    emoji: "📣",
    className: "HeroSection_emojiTileMegaphoneContainer__B2Vl_",
    theme: "green",
  },
  {
    emoji: "💬",
    className: "HeroSection_emojiTileChatContainer__zEcGJ",
    theme: "fuscia",
  },
  {
    emoji: "🤳",
    className: "HeroSection_emojiTileSelfieContainer__ji2Wb",
    theme: "coral",
  },
  {
    emoji: "🗓️",
    className: "HeroSection_emojiTileCalendarContainer__G41O6",
    theme: "blue",
  },
  {
    emoji: "🙌",
    className: "HeroSection_emojiTileRaisedHandsContainer__93uoY",
    theme: "aqua",
  },
];

export const heroChannelTiles = [
  { slug: "x" as const, className: "HeroSection_channelTileXContainer__wbZ7U" },
  {
    slug: "linkedin" as const,
    className: "HeroSection_channelTileLinkedInContainer__lu6OT",
  },
  {
    slug: "instagram" as const,
    className: "HeroSection_channelTileInstagramContainer__TkLBH",
  },
  {
    slug: "tiktok" as const,
    className: "HeroSection_channelTileTikTokContainer__ETY_K",
  },
  {
    slug: "youtube" as const,
    className: "HeroSection_channelTileYouTubeContainer__knDoO",
  },
  {
    slug: "bluesky" as const,
    className: "HeroSection_channelTileBlueskyContainer__fKv_q",
  },
  {
    slug: "pinterest" as const,
    className: "HeroSection_channelTilePinterestContainer__RGi52",
  },
  {
    slug: "threads" as const,
    className: "HeroSection_channelTileThreadsContainer__1jdhy",
  },
  {
    slug: "facebook" as const,
    className: "HeroSection_channelTileFacebookContainer__nk8Yj",
  },
  {
    slug: "mastodon" as const,
    className: "HeroSection_channelTileMastodonContainer__TKgM_",
  },
];

export const socialProof = [
  {
    title: "People and brands using Buffer",
    start: 100000,
    end: 227458,
  },
  {
    title: "Posts published last month",
    start: 8760919,
    end: 10951149,
  },
  {
    title: "Social platforms supported",
    start: 0,
    end: 11,
  },
];

export const coreFeatures = [
  {
    theme: "fuscia",
    eyebrow: "Publish",
    heading: "The most complete set of publishing integrations, ever",
    text: "Schedule your content to the most popular platforms including Facebook, Instagram, TikTok, LinkedIn, Threads, Bluesky, YouTube Shorts, Pinterest, Google Business, Mastodon and X.",
    href: "/publish",
    image:
      "/images/homepage/publish-composer.webp",
    alt: "Buffer Publish space with a queue for multiple social media accounts, a calendar view, and scheduling options.",
  },
  {
    theme: "green",
    eyebrow: "Create",
    heading: "Turn any idea into the perfect post",
    text: "Whether you’re flying solo or working with a team, Buffer has all the features to help you create, organize, and repurpose your content for any channel. There’s also an AI Assistant if you need it.",
    href: "/create",
    image:
      "/images/homepage/create-ideas.webp",
    alt: "Buffer Create space with columns and sorting for content ideas, including an AI Assistant for generating posts and refining content.",
  },
  {
    theme: "yellow",
    eyebrow: "Community",
    heading: "Reply to comments in a flash",
    text: "Engage with your audience on Threads, LinkedIn, Bluesky, Facebook, Instagram, and X at 10x speed. Buffer will help you triage and respond to comments from one simple dashboard.",
    href: "/community",
    image:
      "/images/homepage/community-comments.webp",
    alt: "Buffer Community space with filterable and sortable comments across multiple social media accounts.",
  },
  {
    theme: "blue",
    eyebrow: "Analyze",
    heading: "Answers, not just analytics",
    text: "Whether it’s basic analytics or in-depth reporting, Buffer will help you learn what works and how to improve.",
    href: "/analyze",
    image:
      "/images/homepage/insights.webp",
    alt: "Buffer Analyze space with engagement metrics for recent posts across multiple social media accounts.",
  },
];

export const moreFeatures = [
  {
    theme: "coral",
    title: "Collaborate",
    text: "Manage, edit, and approve social media posts from your team.",
    href: "/collaborate",
    image:
      "/images/homepage/collaborate.webp",
    alt: "Buffer Collaborate space with a publishing calendar and team approval workflows.",
  },
  {
    theme: "purple",
    title: "Mobile app",
    text: "Manage your social media accounts from anywhere.",
    href: "/mobile",
    image:
      "/images/homepage/mobile-app.webp",
    alt: "Buffer mobile app with multiple social media accounts and a publishing queue.",
  },
  {
    theme: "orange",
    title: "Start page",
    text: "Turn your social bio into a powerful, personalized hub.",
    href: "/start-page",
    image:
      "/images/homepage/start-page.webp",
    alt: "Buffer Start Page social bio with custom theming, images, and links.",
  },
  {
    theme: "aqua",
    title: "AI assistant",
    text: "Brainstorm ideas, rewrite content, and craft platform-specific posts.",
    href: "/ai-assistant",
    image:
      "/images/homepage/ai-assistant.webp",
    alt: "Buffer AI Assistant with options to generate posts from prompts and refine content.",
  },
];

export const audienceContent = {
  creators: {
    theme: "purple",
    heading: "Grow from zero → one → one million",
    text: "Whether you’re just getting started on your creator journey or scaling your audience to new heights, Buffer will get your content in front of more people.",
    bullets: [
      "Save all your ideas as inspiration strikes",
      "Learn exactly what content works best and why",
      "Create once, crosspost everywhere",
    ],
    communityHeading: "The Buffer creator community",
    people: [
      {
        name: "Rita Iglesias",
        username: "@rita_codes",
        followers: "34.9k followers on X",
        image:
          "/images/testimonials/rita-iglesias.webp",
        channel: "x" as const,
      },
      {
        name: "Paul de La Baume",
        username: "@Pauldelabaume",
        followers: "21k followers on LinkedIn",
        image:
          "/images/testimonials/paul-de-la-baume.webp",
        channel: "linkedin" as const,
      },
      {
        name: "Lola Tatiana Veiga Bastos",
        username: "@yola_bastos",
        followers: "14.6k followers on Instagram",
        image:
          "/images/testimonials/yola-bastos.webp",
        channel: "instagram" as const,
      },
    ],
  },
  smallBusinesses: {
    theme: "yellow",
    heading: "Level up your social presence without draining your time",
    text: "Every minute and every dollar counts when you’re running a small business. Buffer multiplies your efforts and keeps your online presence thriving with minimal effort.",
    bullets: [
      "Schedule content weeks or even months in advance",
      "See all your posts in one simple dashboard",
      "World-class customer support",
    ],
    communityHeading: "The Buffer small business community",
    people: [
      {
        name: "Midmodmood",
        username: "@midmodmood",
        followers: "236k followers on Instagram",
        image:
          "/images/testimonials/midmodmood.webp",
        channel: "instagram" as const,
      },
      {
        name: "Tina Larsson, The Folson Group",
        username: "@tinalarssonli",
        followers: "12k followers on LinkedIn",
        image:
          "/images/testimonials/tina-larsson.webp",
        channel: "linkedin" as const,
      },
      {
        name: "Pia Cato",
        username: "@vanillapodbakery",
        followers: "5.5k followers on Instagram",
        image:
          "/images/testimonials/pia-cato.webp",
        channel: "instagram" as const,
      },
    ],
  },
  agencies: {
    theme: "aqua",
    heading: "The most trusted tool for freelancers and agencies",
    text: "Buffer has been helping freelancers, consultants, and agencies grow their client accounts for more than a decade.",
    bullets: [
      "Intuitive review and approval workflows",
      "Custom access and permissions",
      "Unlimited user invites",
      "Pricing that scales with your business",
      "99% post reliability",
    ],
    communityHeading: "The Buffer agency community",
    people: [
      {
        name: "Red Pigeon Media",
        username: "@redpigeonmedia",
        followers: "2.2k followers on Instagram",
        image:
          "/images/testimonials/red-pigeon-media.webp",
        channel: "instagram" as const,
      },
      {
        name: "Shored Up Digital",
        username: "@shoredupdigital",
        followers: "2.5k followers on Instagram",
        image:
          "/images/testimonials/shored-up-digital.webp",
        channel: "instagram" as const,
      },
      {
        name: "Influence Media",
        username: "@influencemedia",
        followers: "5.5k followers on Instagram",
        image:
          "/images/testimonials/influence-media.webp",
        channel: "instagram" as const,
      },
    ],
  },
} satisfies Record<
  AudienceKey,
  {
    theme: string;
    heading: string;
    text: string;
    bullets: string[];
    communityHeading: string;
    people: Array<{
      name: string;
      username: string;
      followers: string;
      image: string;
      channel: ChannelSlug;
    }>;
  }
>;

export const resources = [
  {
    theme: "purple",
    title: "Free Marketing Tools",
    text: "A collection of free tools to make your social media marketing easier and more effective",
    href: "/free-tools",
    smallImage:
      "/images/homepage/free-marketing-tools-small.webp",
    largeImage:
      "/images/homepage/free-marketing-tools-large.webp",
  },
  {
    theme: "aqua",
    title: "Social Media Glossary",
    text: "A glossary of the most popular terms to help you make sense of all the social media lingo",
    href: "/social-media-terms",
    smallImage:
      "/images/homepage/social-media-glossary-small.webp",
    largeImage:
      "/images/homepage/social-media-glossary-large.webp",
    horizontal: true,
  },
  {
    theme: "coral",
    title: "Social Media Marketing 101",
    text: "Your go-to guide for mastering the basics of social media and beyond",
    href: "/social-media-marketing",
    smallImage:
      "/images/homepage/social-media-marketing-101-small.webp",
    largeImage:
      "/images/homepage/social-media-marketing-101-large.webp",
  },
  {
    theme: "green",
    title: "Best Time to Post",
    text: "Discover the best times to post on social media to maximize your engagement",
    href: "/resources/how-often-to-post-on-social-media",
    smallImage:
      "/images/homepage/best-time-to-post-small.webp",
    largeImage:
      "/images/homepage/best-time-to-post-large.webp",
    horizontal: true,
  },
  {
    theme: "orange",
    title: "Social Media Resources",
    text: "A collection of articles and interviews packed with tips, stories, and insights to level up your social media marketing game",
    href: "/library",
    smallImage:
      "/images/homepage/social-media-resources-small.webp",
    largeImage:
      "/images/homepage/social-media-resources-large.webp",
  },
];

export const openCompanyMetrics = [
  { label: "MAU", subtitle: "Monthly active users", value: "227,458" },
  { label: "Total customers", subtitle: "Total customers", value: "74,126" },
  { label: "Teammates", subtitle: "Across 15 countries", value: "73" },
  { label: "ARR", subtitle: "Annual recurring revenue", value: "$24.6M" },
];

export const footerGroups = [
  {
    title: "Features",
    links: [
      ["Create", "/create"],
      ["Publish", "/publish"],
      ["Community", "/community"],
      ["Analyze", "/analyze"],
      ["Collaborate", "/collaborate"],
    ],
  },
  {
    title: "Tools",
    links: [
      ["AI Assistant", "/ai-assistant"],
      ["Start Page", "/start-page"],
      ["Integrations", "/extras"],
      [
        "iOS App",
        "https://apps.apple.com/us/app/buffer-plan-schedule-posts/id490474324?pt=936146&ct=SiteFooter&mt=8",
      ],
      [
        "Android App",
        "https://play.google.com/store/apps/details?id=org.buffer.android&hl=en",
      ],
      ["Browser Extension", "/extensions"],
    ],
  },
  {
    title: "Channels",
    links: channels.map((channel) => [channel.label, channel.href]),
  },
  {
    title: "Made for",
    links: [
      ["Creators", "/made-for/creators"],
      ["Small Business", "/made-for/small-business"],
      ["Agencies", "/agency"],
      ["Nonprofits", "/nonprofits"],
      ["Higher Education", "/made-for/higher-education"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Blog", "/resources/"],
      ["Template Library", "/templates"],
      ["Social Media Insights", "/insights"],
      ["Resource Library", "/library"],
      ["Social Media Terms Glossary", "/social-media-terms"],
      ["Free Marketing Tools", "/free-tools"],
      ["AI Social Media Post Generator", "/ai-assistant/social-media-post-creator"],
      ["Compare Buffer", "/compare"],
      ["Our Community", "/our-community"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Help Center", "https://support.buffer.com/"],
      ["Status", "https://status.buffer.com/"],
      ["Changelog", "https://suggestions.buffer.com/changelog"],
      ["Request a Feature", "https://suggestions.buffer.com/"],
    ],
  },
  {
    title: "Transparency",
    links: [
      ["Open Hub", "/open"],
      ["Transparent Metrics", "/metrics"],
      ["Transparent Pricing", "/transparent-pricing"],
      ["Transparent Salaries", "/salaries"],
      ["Product Roadmap", "https://suggestions.buffer.com/roadmap"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Careers", "/journey"],
      ["Press", "/press"],
      ["Partner Program", "/partners"],
      ["Legal", "/legal"],
      ["Sitemap", "/sitemap"],
    ],
  },
] as const;

export const footerSocials = [
  ["Instagram", "https://www.instagram.com/buffer", "instagram"],
  ["Facebook", "https://www.facebook.com/bufferapp", "facebook"],
  ["Bluesky", "https://bsky.app/profile/buffer.com", "bluesky"],
  ["X", "https://x.com/buffer", "x"],
  ["LinkedIn", "https://www.linkedin.com/company/bufferapp", "linkedin"],
  ["Threads", "https://www.threads.net/@buffer", "threads"],
] as const;
