import Link from "next/link";
import { AccountAddressCard } from "@/components/account/AccountAddressCard";
import { LinkLoadingIndicator } from "@/components/common/LinkLoadingIndicator";
import type { CompanyAddressModel } from "@/types/models/address.model";

type AccountAddressesPanelProps = {
    addresses: CompanyAddressModel[];
};

const addFormHref = "/account/addresses/new";

function AddressSection({
    title,
    addresses,
    showGstin,
}: {
    title: string;
    addresses: CompanyAddressModel[];
    showGstin: boolean;
}) {
    return (
        <section className="addr-section">
            <div className="addr-section-head">
                <h2>
                    {title} <span>({addresses.length})</span>
                </h2>
                <Link className="addr-add-btn" href={addFormHref}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v8M8 12h8" />
                    </svg>
                    Add Address
                    <LinkLoadingIndicator />
                </Link>
            </div>

            {addresses.length === 0 ? (
                <p className="addr-empty">No {title.toLowerCase()} saved yet.</p>
            ) : (
                <div className="addr-grid">
                    {addresses.map((address) => (
                        <AccountAddressCard key={address.id} address={address} showGstin={showGstin} />
                    ))}
                </div>
            )}
        </section>
    );
}

export function AccountAddressesPanel({ addresses }: AccountAddressesPanelProps) {
    const billing = addresses.filter((address) => address.addressType === "billing_address");
    const shipping = addresses.filter((address) => address.addressType === "shipping_address");

    return (
        <>
            <AddressSection title="Billing Addresses" addresses={billing} showGstin />
            <AddressSection title="Shipping Addresses" addresses={shipping} showGstin={false} />

            <p className="account-note account-gap">
                Edit and remove need the address update and delete endpoints, so both are disabled for now. Programs
                shipping to individual recipients do not need every address here — recipients enter their own through
                the gifting link.
            </p>
        </>
    );
}
