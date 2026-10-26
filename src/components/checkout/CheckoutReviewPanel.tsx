import type { CompanyAddressModel } from "@/types/models/address.model";
import type { CartItemModel } from "@/types/models/cart.model";
import { formatInr } from "@/utils/currency";

type CheckoutReviewPanelProps = {
    billing: CompanyAddressModel | undefined;
    delivery: CompanyAddressModel | undefined;
    items: CartItemModel[];
    /** Jumps back to the step that owns the block being changed. */
    onChangeStep: (stepIndex: number) => void;
};

function formatLines(address: CompanyAddressModel) {
    return [address.addressLine1, address.addressLine2, address.landmark, address.city, address.state, address.pincode]
        .map((part) => part.trim())
        .filter(Boolean)
        .join(", ");
}

function ReviewAddress({
    title,
    address,
    showGstin,
    onChange,
}: {
    title: string;
    address: CompanyAddressModel | undefined;
    showGstin: boolean;
    onChange: () => void;
}) {
    return (
        <div className="co-review-block">
            <div className="co-review-block-head">
                <h3>{title}</h3>
                <button type="button" onClick={onChange}>
                    Change
                </button>
            </div>

            {address ? (
                <>
                    <b>{address.displayName || address.contactName}</b>
                    <p>{formatLines(address)}</p>
                    {address.contactNumber ? <p>Mobile – {address.contactNumber}</p> : null}
                    {showGstin ? <p className="co-review-gstin">GSTIN – {address.gstNumber || "N/A"}</p> : null}
                </>
            ) : (
                <p className="co-review-missing">Not selected yet.</p>
            )}
        </div>
    );
}

export function CheckoutReviewPanel({ billing, delivery, items, onChangeStep }: CheckoutReviewPanelProps) {
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <section className="co-panel" aria-label="Review your order">
            <div className="co-section-head">
                <h2>Review your order</h2>
            </div>

            <div className="co-review">
                <div className="co-review-addresses">
                    <ReviewAddress
                        title="Billing address"
                        address={billing}
                        showGstin
                        onChange={() => onChangeStep(0)}
                    />
                    <ReviewAddress
                        title="Delivery address"
                        address={delivery}
                        showGstin={false}
                        onChange={() => onChangeStep(1)}
                    />
                </div>

                <div className="co-review-items">
                    <div className="co-review-block-head">
                        <h3>
                            {items.length} {items.length === 1 ? "product" : "products"}
                        </h3>
                        <b>{formatInr(subtotal)}</b>
                    </div>
                    <ul>
                        {items.map((item) => (
                            <li key={item.itemId ?? item.productId}>
                                <span>
                                    {item.name} <small>× {item.quantity}</small>
                                </span>
                                <b>{formatInr(item.price * item.quantity)}</b>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
