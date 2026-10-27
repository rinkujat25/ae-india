import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { privacyPolicy } from "@/content/policies";

export const metadata: Metadata = {
    title: privacyPolicy.metaTitle,
    description: privacyPolicy.metaDescription,
    alternates: { canonical: privacyPolicy.href },
    openGraph: {
        type: "article",
        siteName: "Wingback Gift Store",
        url: privacyPolicy.href,
        title: privacyPolicy.metaTitle,
        description: privacyPolicy.metaDescription,
    },
};

export default function Page() {
    return <PolicyPage document={privacyPolicy} />;
}
