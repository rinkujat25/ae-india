import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { shippingPolicy } from "@/content/policies";

export const metadata: Metadata = {
    title: shippingPolicy.metaTitle,
    description: shippingPolicy.metaDescription,
    alternates: { canonical: shippingPolicy.href },
    openGraph: {
        type: "article",
        siteName: "Wingback Gift Store",
        url: shippingPolicy.href,
        title: shippingPolicy.metaTitle,
        description: shippingPolicy.metaDescription,
    },
};

export default function Page() {
    return <PolicyPage document={shippingPolicy} />;
}
