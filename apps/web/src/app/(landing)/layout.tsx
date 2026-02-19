import type { Metadata } from "next";
import { NEXT_PUBLIC_SITE_URL } from "../../lib/env";

const canonicalBase = NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
const siteName = "Addeep";
const siteDescription = "사람과 가치를 연결하는 플랫폼";
const ogImage = "/images/addeep-is-image.png";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalBase),
  alternates: {
    canonical: `${canonicalBase}/`,
  },
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description: siteDescription,
    url: `${canonicalBase}/`,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [ogImage],
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
