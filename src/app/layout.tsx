import type { Metadata } from "next";
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
  // No `template` here: every page writes its own full title and already
  // carries the brand inside it, so a template would render it twice.
  title: "Wingback Gift Store",
  description:
    "Sampley runs the Wingback Gift Store end to end: branded employee stores where recipients choose within budget, and direct gifting for clients and partners, with managed pan-India delivery.",
  // This host is not for search. It serves the Wingback store to people who
  // were sent to it; the catalogue's public copy is GiftVerse's, which is
  // where every product page already canonicalises. `robots.ts` says the same
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
    <html lang="en-IN">
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
