import type { Metadata } from "next";

import { AntigravityHomePage } from "@/components/antigravity-home-page";

export const metadata: Metadata = {
  title: "Google Antigravity",
  description:
    "Experience liftoff with the next-gen agent platform from Google Antigravity.",
};

export default function Page() {
  return <AntigravityHomePage />;
}
