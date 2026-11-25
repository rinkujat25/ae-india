import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/CartPageContent";
import { CartStyles } from "@/components/cart/CartStyles";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";

export const metadata: Metadata = { title: "Shopping cart | AE India", robots: { index: false, follow: false } };

export default function CartPage() {
  return <><SiteHeader /><CartPageContent /><SiteFooter /><CartStyles /></>;
}
