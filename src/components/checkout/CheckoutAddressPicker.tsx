"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useGlobalApiLoader } from "@/components/common/GlobalApiLoaderProvider";
import type { CompanyAddressModel } from "@/types/models/address.model";

type CheckoutAddressPickerProps = {
    title: string;
    addresses: CompanyAddressModel[];
    selectedId: string;
    onSelect: (addressId: string) => void;
    /** GSTIN belongs to the billing entity, so delivery cards omit the line. */
    showGstin: boolean;
    addHref: string;
};

/** Enough to show the chosen address plus one alternative without scrolling. */
const collapsedCount = 2;

function formatLines(address: CompanyAddressModel) {
    return [
        address.displayName && address.displayName !== address.contactName ? address.displayName : "",
        address.addressLine1,
        address.addressLine2,
        address.landmark,
        address.city,
        address.state,
        address.pincode,
    ]
        .map((part) => part.trim())
        .filter(Boolean)
        .join(", ");
}

export function CheckoutAddressPicker({
    title,
    addresses,
    selectedId,
    onSelect,
    showGstin,
    addHref,
}: CheckoutAddressPickerProps) {
    const router = useRouter();
    const { withApiLoader } = useGlobalApiLoader();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [pendingRemoval, setPendingRemoval] = useState<CompanyAddressModel | null>(null);
    const [isRemoving, setIsRemoving] = useState(false);
    const [error, setError] = useState("");

    // The chosen address is always on screen. Without this, picking one from the
    // expanded list and collapsing again leaves the panel looking unanswered.
    const preview = addresses.slice(0, collapsedCount);
    const selected = addresses.find((address) => address.id === selectedId);
    const collapsed = selected && !preview.some((address) => address.id === selectedId)
        ? [selected, ...preview.slice(0, collapsedCount - 1)]
        : preview;

    const visible = isExpanded ? addresses : collapsed;
    const hiddenCount = addresses.length - visible.length;

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (pendingRemoval && !dialog.open) dialog.showModal();
        if (!pendingRemoval && dialog.open) dialog.close();
    }, [pendingRemoval]);

    /** Removal is confirmed first: an address the buyer still needs is easy to mis-click. */
    async function handleRemove() {
        if (!pendingRemoval || isRemoving) return;

        setError("");
        setIsRemoving(true);

        try {
            const response = await withApiLoader(() =>
                fetch(`/api/account/addresses/${pendingRemoval.id}`, { method: "DELETE" }),
            );

            if (!response.ok) {
                const body = (await response.json().catch(() => null)) as { message?: string } | null;

                setError(body?.message || "That address could not be removed.");
                return;
            }

            setPendingRemoval(null);
            router.refresh();
        } catch {
            setError("Removing addresses is unavailable right now.");
        } finally {
            setIsRemoving(false);
        }
    }

    return (
        <section className="co-panel" aria-label={title}>
            <div className="co-section-head">
                <h2>{title}</h2>
                <Link className="co-add" href={addHref}>
                    + Add
                </Link>
            </div>

            {addresses.length === 0 ? (
                <p className="co-addr-empty">
                    No address saved yet. <Link href={addHref}>Add one</Link> to continue with this order.
                </p>
            ) : (
                <>
                    <div className="co-addr-list">
                        {visible.map((address) => {
                            const isSelected = address.id === selectedId;

                            return (
                                <article className="co-addr" key={address.id} data-selected={isSelected}>
                                    <button
                                        className="co-addr-pick"
                                        type="button"
                                        aria-pressed={isSelected}
                                        onClick={() => onSelect(address.id)}
                                    >
                                        <span className="co-addr-tick" aria-hidden="true">
                                            <svg viewBox="0 0 24 24">
                                                <path d="m5 12.5 4.5 4.5L19 7.5" />
                                            </svg>
                                        </span>
                                        <span>
                                            <span className="co-addr-name">
                                                {address.displayName || address.contactName}
                                            </span>
                                            <span className="co-addr-lines">{formatLines(address)}</span>
                                            {address.contactNumber ? (
                                                <span className="co-addr-lines">
                                                    Mobile – {address.contactNumber}
                                                </span>
                                            ) : null}
                                            {showGstin ? (
                                                <span className="co-addr-gstin">
                                                    GSTIN – {address.gstNumber || "N/A"}
                                                </span>
                                            ) : null}
                                        </span>
                                    </button>

                                    <div className="co-addr-actions">
                                        <button type="button" disabled title="The address update endpoint is not live yet.">
                                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M4 20h4l10-10a2.1 2.1 0 0 0-3-3L5 17Z" />
                                                <path d="m14 6 3 3" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            disabled={isRemoving}
                                            onClick={() => setPendingRemoval(address)}
                                        >
                                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M6 6l12 12M18 6 6 18" />
                                            </svg>
                                            Remove
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {error ? (
                        <p className="co-addr-error" role="alert">
                            {error}
                        </p>
                    ) : null}

                    {hiddenCount > 0 || isExpanded ? (
                        <button className="co-addr-more" type="button" onClick={() => setIsExpanded(!isExpanded)}>
                            {isExpanded ? "Show Fewer Addresses" : `View More Addresses (${hiddenCount})`}
                        </button>
                    ) : null}
                </>
            )}

            <dialog className="co-confirm" ref={dialogRef} onClose={() => setPendingRemoval(null)}>
                <div className="co-confirm-card">
                    <h2>Remove this address?</h2>
                    {pendingRemoval ? (
                        <p>
                            <b>{pendingRemoval.displayName || pendingRemoval.contactName}</b>
                            <br />
                            {formatLines(pendingRemoval)}
                        </p>
                    ) : null}
                    <p className="co-confirm-note">
                        It will be removed from your saved addresses. This cannot be undone from here.
                    </p>

                    {error ? (
                        <p className="co-addr-error" role="alert">
                            {error}
                        </p>
                    ) : null}

                    <div className="co-confirm-actions">
                        <button
                            className="btn btn-soft"
                            type="button"
                            onClick={() => setPendingRemoval(null)}
                            disabled={isRemoving}
                        >
                            Cancel
                        </button>
                        <button className="btn btn-danger" type="button" onClick={handleRemove} disabled={isRemoving}>
                            {isRemoving ? "Removing…" : "Yes, remove"}
                        </button>
                    </div>
                </div>
            </dialog>
        </section>
    );
}
