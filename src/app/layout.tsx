import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CookieNotice } from "@/components/common/CookieNotice";
import { GlobalApiLoaderProvider } from "@/components/common/GlobalApiLoaderProvider";
import { GoogleAnalytics } from "@/components/common/GoogleAnalytics";
import { HomeInteractions } from "@/components/common/HomeInteractions";
import { LeadModal } from "@/components/common/LeadModal";
import { RouteProgressBar } from "@/components/common/RouteProgressBar";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { ToastProvider } from "@/components/common/ToastProvider";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  // `metadataBase` resolves every relative canonical, Open Graph and Twitter
  // URL in the app. Without it Next.js cannot build absolute URLs and drops
  // them silently.
  metadataBase: new URL(getSiteUrl()),
  // Bing Webmaster Tools site ownership. It lives in the root layout rather than
  // on the home page because Bing re-checks it, and a token that only exists on
  // one route is a verification that lapses the moment that route changes.
  verification: {
    other: { "msvalidate.01": "834AFD9E6839468541989A078B8EB484" },
  },
  // No `template` here: every page already ends its own title with
  // "| Wingback", so a template would render it twice.
  title: "Corporate Gifting Platform for Employees | Wingback",
  description:
    "Wingback runs corporate gifting end to end: branded employee stores where recipients choose within budget, and direct gifting for clients and partners, with managed pan-India delivery.",
  // Pages that must not be indexed say so themselves. A blanket no-index here
  // silently suppressed every page that did not override it.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        <RouteProgressBar />
        <ScrollReveal />
        {/* Site chrome, not page content: the enquiry modal every
            `data-open-form` trigger opens, and the script that drives both it
            and the header's mobile menu. Mounted here so a page cannot ship
            the trigger without the thing it opens. */}
        <LeadModal />
        <HomeInteractions />
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
