import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://buffer.com"),
  title: "Buffer: Social media management for everyone",
  description:
    "Use Buffer to manage your social media so that you can create and share your content everywhere, consistently. Try our forever free plan or upgrade for more.",
  icons: {
    icon: [
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/icons/site.webmanifest",
  openGraph: {
    title: "Buffer: Social media management for everyone",
    description:
      "Use Buffer to manage your social media so that you can create and share your content everywhere, consistently. Try our forever free plan or upgrade for more.",
    url: "https://buffer.com/",
    siteName: "Buffer: All-you-need social media toolkit for small businesses",
    images: [
      {
        url: "/images/og/homepage-og.png",
        alt: "Buffer: Social media management for everyone",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@buffer",
    creator: "@buffer",
    title: "Buffer: Social media management for everyone",
    description:
      "Use Buffer to manage your social media so that you can create and share your content everywhere, consistently. Try our forever free plan or upgrade for more.",
    images: ["/images/og/homepage-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
