import Script from "next/script";

/**
 * Google Analytics 4.
 *
 * The measurement ID is a build-time value, not a runtime one: Next inlines
 * `NEXT_PUBLIC_*` into the bundle and bakes it into every prerendered page, so
 * the Docker build has to receive it as an argument the same way the site URL
 * does. Setting it only in the container's environment would leave the static
 * pages untagged.
 *
 * Left unset, nothing is rendered. That keeps local development and any build
 * without the argument out of the property's data, rather than mixing test
 * traffic into what the business reports on.
 *
 * `afterInteractive` rather than `beforeInteractive`: analytics is never worth
 * delaying the page for, and gtag queues through `dataLayer` anyway, so events
 * raised before the script arrives are not lost.
 */
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

export function GoogleAnalytics() {
    if (!measurementId) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(measurementId)});`}
            </Script>
        </>
    );
}
