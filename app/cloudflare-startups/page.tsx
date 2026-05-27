import type { Metadata } from "next";

import { CloudflareStartupsPage } from "@/components/cloudflare-startups-page";

export const metadata: Metadata = {
  title: "Startup Program | Cloudflare",
  description:
    "Up to $350k in credits and everything you need to build, deploy, and scale your applications with Cloudflare for Startups.",
};

export default function Page() {
  return <CloudflareStartupsPage />;
}
