const markup = `<section class="compare-section">
        <div class="wrap">
            <div class="compare">
                <div class="compare-head">
                    <span>Why a store, not a hamper</span>
                    <h2>One hamper sent to everyone, or choices inside one budget.</h2>
                </div>
                <div class="compare-cols">
                    <div class="compare-col old">
                        <p>The usual way</p>
                        <h3>Same gift for everyone</h3>
                        <ul>
                            <li><i>—</i>One SKU chosen for a thousand different people</li>
                            <li><i>—</i>Sizes, tastes and dietary needs guessed in advance</li>
                            <li><i>—</i>Address sheets chased over email and spreadsheets</li>
                            <li><i>—</i>Vendor follow-ups land in the HR inbox</li>
                            <li><i>—</i>No signal on what people actually wanted</li>
                        </ul>
                    </div>
                    <div class="compare-col new">
                        <p>With a Wingback store</p>
                        <h3>Thousands of choices, one budget</h3>
                        <ul>
                            <li><i>✓</i>Each recipient picks the gift that fits them</li>
                            <li><i>✓</i>Sizes and variants confirmed by the recipient</li>
                            <li><i>✓</i>Addresses collected inside the store itself</li>
                            <li><i>✓</i>Sourcing, QC, delivery and support handled centrally</li>
                            <li><i>✓</i>Wishlist and selection data to plan the next program</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ================= TIMELINE ================= -->`;

export function GiftStoreComparisonSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
