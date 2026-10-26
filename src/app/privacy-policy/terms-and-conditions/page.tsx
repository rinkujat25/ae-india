import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { termsAndConditions } from "@/content/policies";

export const metadata: Metadata = {
    title: termsAndConditions.metaTitle,
    description: termsAndConditions.metaDescription,
    alternates: { canonical: termsAndConditions.href },
    openGraph: {
        type: "article",
        siteName: "Wingback by Sampley",
        url: termsAndConditions.href,
        title: termsAndConditions.metaTitle,
        description: termsAndConditions.metaDescription,
    },
};

export default function Page() {
    return <PolicyPage document={termsAndConditions} />;
}
