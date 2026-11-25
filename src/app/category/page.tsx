import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Category | AE India",
  description: "Browse AE India product categories.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CategoryPage() {
  redirect("/products");
}
