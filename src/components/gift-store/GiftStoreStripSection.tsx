const markup = `<section class="strip">
        <div class="wrap">
            <div class="strip-panel">
                <b>Branded store</b><span class="dot"></span>
                <b>Recipient choice</b><span class="dot"></span>
                <b>Budget controls</b><span class="dot"></span>
                <b>Curated catalogue</b><span class="dot"></span>
                <b>Personalization</b><span class="dot"></span>
                <b>Managed fulfillment</b><span class="dot"></span>
                <b>Reporting</b>
            </div>
        </div>
    </section>

    <!-- ================= PROGRAMS ================= -->`;

export function GiftStoreStripSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
