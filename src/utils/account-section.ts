import { accountSections } from "@/constants/account";
import type { AccountSectionId } from "@/types/models/account.model";

export function getAccountSection(id: AccountSectionId) {
    const section = accountSections.find((item) => item.id === id);

    if (!section) {
        throw new Error(`Unknown account section: ${id}`);
    }

    return section;
}

/** The route for a section, e.g. "addresses" -> "/account/addresses". */
export function accountSectionHref(id: AccountSectionId) {
    return getAccountSection(id).href;
}
