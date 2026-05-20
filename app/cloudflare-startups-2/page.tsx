import type { Metadata } from "next";

import { CloudflareStartups2Page } from "@/components/cloudflare-startups-2-page";

export const metadata: Metadata = {
  title: "Cloudflare for Startups",
  description:
    "Cloudflare for Startups gives early-stage companies up to $350k in credits to build fast, secure, and scalable applications.",
};

export default function Page() {
  return <CloudflareStartups2Page />;
}
