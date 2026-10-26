import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import type { AccountSectionId } from "@/types/models/account.model";
import { getAccountSection } from "@/utils/account-section";

type AccountSectionShellProps = {
    section: AccountSectionId;
    /** Appended after the section heading, e.g. the signed-in name. */
    headingSuffix?: string;
    /** A deeper page within a section, e.g. "Add Address". */
    crumb?: string;
    actions?: ReactNode;
    children: ReactNode;
};

/** Breadcrumb and heading for one account section, so every page matches. */
export function AccountSectionShell({
    section,
    headingSuffix,
    crumb,
    actions,
    children,
}: AccountSectionShellProps) {
    const current = getAccountSection(section);
    const isOverview = section === "overview";

    return (
        <div>
            <Breadcrumbs
                trail={[
                    { label: "My Account", href: isOverview ? undefined : "/account" },
                    ...(isOverview
                        ? []
                        : crumb
                          ? [{ label: current.title, href: current.href }, { label: crumb }]
                          : [{ label: current.title }]),
                ]}
            />

            <div className="account-panel-head">
                <h1>
                    {crumb ?? current.title}
                    {headingSuffix ? <span> | {headingSuffix}</span> : null}
                </h1>
                {actions}
            </div>

            {children}
        </div>
    );
}
