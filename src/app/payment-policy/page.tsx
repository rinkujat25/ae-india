import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { paymentPolicy } from "@/content/policies";

export const metadata: Metadata = {
    title: paymentPolicy.metaTitle,
    description: paymentPolicy.metaDescription,
    alternates: { canonical: paymentPolicy.href },
    openGraph: {
        type: "article",
        siteName: "Wingback Gift Store",
        url: paymentPolicy.href,
        title: paymentPolicy.metaTitle,
        description: paymentPolicy.metaDescription,
    },
};

export default function Page() {
    return <PolicyPage document={paymentPolicy} />;
}
