import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { CookieNotice } from "@/components/common/CookieNotice";
import { GlobalApiLoaderProvider } from "@/components/common/GlobalApiLoaderProvider";
import { GoogleAnalytics } from "@/components/common/GoogleAnalytics";
import { MobileNavToggle } from "@/components/common/MobileNavToggle";
import { RouteProgressBar } from "@/components/common/RouteProgressBar";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { ToastProvider } from "@/components/common/ToastProvider";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { getSiteUrl } from "@/lib/site";
import { storeName } from "@/constants/brand";
import "./globals.css";

/**
 * The design's two families. next/font downloads them at build time and serves
 * them from this origin, so no request goes to Google at run time and the CSP
 * needs no font host. Each is exposed as a CSS variable that `globals.css`
 * builds its `--font-body` and `--font-display` stacks on.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  // `metadataBase` resolves every relative canonical, Open Graph and Twitter
  // URL in the app. Without it Next.js cannot build absolute URLs and drops
  // them silently.
  metadataBase: new URL(getSiteUrl()),
  // No `template` here: every page writes its own full title and already
  // carries the brand inside it, so a template would render it twice.
  title: storeName,
  description:
    "Cleaning, maintenance and architectural surface products for India's offices, hotels, airports, malls and hospitals, supplied pan-India by Amit Enterprises.",
  // This host is not for search -- yet. The rule was inherited with the
  // codebase and has not been revisited for AE India. `robots.ts` says the same
  // thing to a crawler that reads it, and this says it to one that does not.
  //
  // Set here and nowhere else: a page that re-declares `index: true` quietly
  // overrides this, which is how the site came to advertise itself before.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <RouteProgressBar />
        <ScrollReveal />
        {/* Site chrome, not page content: the script behind the header's
            mobile menu, which `SiteHeader` renders on every route. */}
        <MobileNavToggle />
        <ToastProvider>
          <GlobalApiLoaderProvider>{children}</GlobalApiLoaderProvider>
        </ToastProvider>
        <WhatsAppButton />
        <CookieNotice />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
