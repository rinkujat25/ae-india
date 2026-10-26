/**
 * One set of sign-up rules, used by both the form and the route handler.
 * The client copy gives instant feedback; the server copy is the authoritative
 * one, since anything in the browser can be bypassed.
 */

import { validateProfileNames } from "@/utils/profile-validation";

export const passwordMinLength = 8;
export const passwordMaxLength = 64;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Indian mobile numbers: ten digits starting 6-9, optionally +91 prefixed. */
const mobilePattern = /^[6-9]\d{9}$/;

export type SignupValues = {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
};

export type SignupErrors = Partial<Record<keyof SignupValues, string>>;

/** Strips a +91 / 0 prefix and any spacing so the rule sees ten digits. */
export function normaliseMobile(value: string) {
    return value.replace(/[\s()-]/g, "").replace(/^(\+91|91|0)/, "");
}

/**
 * Password rules, each reported separately so the visitor is told the one thing
 * to fix rather than a list.
 *
 * Length is checked before composition: a long passphrase failing on "needs a
 * symbol" is a worse message than a short one failing on length.
 */
export function describePasswordRules() {
    return `At least ${passwordMinLength} characters, with an uppercase letter, a lowercase letter, a number and a symbol.`;
}

export function validatePassword(password: string, email = ""): string {
    if (!password) return "Password is required.";

    if (password.length < passwordMinLength) {
        return `Password must be at least ${passwordMinLength} characters.`;
    }

    if (password.length > passwordMaxLength) {
        return `Password must be ${passwordMaxLength} characters or fewer.`;
    }

    if (/\s/.test(password)) return "Password cannot contain spaces.";
    if (!/[a-z]/.test(password)) return "Password needs at least one lowercase letter.";
    if (!/[A-Z]/.test(password)) return "Password needs at least one uppercase letter.";
    if (!/\d/.test(password)) return "Password needs at least one number.";
    if (!/[^A-Za-z0-9]/.test(password)) return "Password needs at least one symbol.";

    // A password that is just the address is the most common guess there is.
    const localPart = email.split("@")[0]?.trim().toLowerCase() ?? "";

    if (localPart.length >= 3 && password.toLowerCase().includes(localPart)) {
        return "Password cannot contain your email address.";
    }

    return "";
}

export function validateSignup(values: SignupValues): SignupErrors {
    const errors: SignupErrors = validateProfileNames(values.firstName, values.lastName);

    const email = values.email.trim();

    if (!email) {
        errors.email = "Email address is required.";
    } else if (!emailPattern.test(email)) {
        errors.email = "Enter a valid email address.";
    }

    const mobile = normaliseMobile(values.mobile.trim());

    if (!mobile) {
        errors.mobile = "Mobile number is required.";
    } else if (!mobilePattern.test(mobile)) {
        errors.mobile = "Enter a 10-digit Indian mobile number.";
    }

    const passwordError = validatePassword(values.password, email);

    if (passwordError) errors.password = passwordError;

    return errors;
}
