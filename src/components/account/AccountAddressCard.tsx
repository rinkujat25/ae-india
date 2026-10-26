"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useGlobalApiLoader } from "@/components/common/GlobalApiLoaderProvider";
import type { CompanyAddressModel } from "@/types/models/address.model";

type AccountAddressCardProps = {
    address: CompanyAddressModel;
    /** GSTIN belongs to the billing entity, so shipping cards omit the line. */
    showGstin: boolean;
};

export function AccountAddressCard({ address, showGstin }: AccountAddressCardProps) {
    const router = useRouter();
    const { withApiLoader } = useGlobalApiLoader();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [error, setError] = useState("");

    const fullAddress = [
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

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (isConfirming && !dialog.open) dialog.showModal();
        if (!isConfirming && dialog.open) dialog.close();
    }, [isConfirming]);

    async function handleRemove() {
        if (isRemoving) return;

        setError("");
        setIsRemoving(true);

        try {
            const response = await withApiLoader(() =>
                fetch(`/api/account/addresses/${address.id}`, { method: "DELETE" }),
            );

            if (!response.ok) {
                const body = (await response.json().catch(() => null)) as { message?: string } | null;

                setError(body?.message || "That address could not be removed.");
                return;
            }

            setIsConfirming(false);
            router.refresh();
        } catch {
            setError("Removing addresses is unavailable right now.");
        } finally {
            setIsRemoving(false);
        }
    }

    return (
        <article className="addr-card">
            <div className="addr-card-body">
                <h3>{address.displayName || address.contactName}</h3>
                <p className="addr-card-lines">{fullAddress}</p>
                {address.contactNumber ? <p className="addr-card-lines">Mobile – {address.contactNumber}</p> : null}
                {showGstin ? <p className="addr-card-gstin">GSTIN – {address.gstNumber || "N/A"}</p> : null}
                {error ? (
                    <p className="addr-card-error" role="alert">
                        {error}
                    </p>
                ) : null}
            </div>

            <div className="addr-card-actions">
                <button type="button" disabled>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 20h4l10-10a2.1 2.1 0 0 0-3-3L5 17Z" />
                        <path d="M14 6l3 3" />
                    </svg>
                    Edit
                </button>
                <button type="button" onClick={() => setIsConfirming(true)} disabled={isRemoving}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                    Remove
                </button>
            </div>

            <dialog
                className="addr-confirm"
                ref={dialogRef}
                onClose={() => setIsConfirming(false)}
                aria-labelledby={`confirm-${address.id}`}
            >
                <div className="addr-confirm-card">
                    <h2 id={`confirm-${address.id}`}>Remove this address?</h2>
                    <p>
                        <b>{address.displayName || address.contactName}</b>
                        <br />
                        {fullAddress}
                    </p>
                    <p className="addr-confirm-note">
                        It will be removed from your saved {showGstin ? "billing" : "shipping"} addresses. This cannot
                        be undone from here.
                    </p>

                    {error ? (
                        <p className="addr-card-error" role="alert">
                            {error}
                        </p>
                    ) : null}

                    <div className="addr-confirm-actions">
                        <button
                            className="btn btn-soft"
                            type="button"
                            onClick={() => setIsConfirming(false)}
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
        </article>
    );
}
