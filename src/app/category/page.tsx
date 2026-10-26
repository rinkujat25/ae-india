import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Category | Wingback",
  description: "Browse Wingback product categories from the active catalogue prototype.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CategoryPage() {
  redirect("/products");
}
