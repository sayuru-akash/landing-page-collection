import type { Metadata } from "next";

import { CreateStudioPage } from "@/components/create-studio-page";

export const metadata: Metadata = {
  title: "Buffer Create | AI-powered social content studio",
  description:
    "Buffer Create is Buffer's AI-powered content studio: one place to write, preview, schedule, and publish social content across every platform.",
};

export default function Page() {
  return <CreateStudioPage />;
}
