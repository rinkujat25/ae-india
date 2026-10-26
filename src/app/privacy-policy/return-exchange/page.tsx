import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { returnExchange } from "@/content/policies";

export const metadata: Metadata = {
    title: returnExchange.metaTitle,
    description: returnExchange.metaDescription,
    alternates: { canonical: returnExchange.href },
    openGraph: {
        type: "article",
        siteName: "Wingback Employee Gift Store",
        url: returnExchange.href,
        title: returnExchange.metaTitle,
        description: returnExchange.metaDescription,
    },
};

export default function Page() {
    return <PolicyPage document={returnExchange} />;
}
