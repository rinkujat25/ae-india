/**
 * One set of name rules, used by both the edit form and the route handler.
 * The client copy gives instant feedback; the server copy is the authoritative
 * one, since anything in the browser can be bypassed.
 */

export const nameMinLength = 2;
export const nameMaxLength = 60;

/** Letters (any script), spaces, hyphens, apostrophes and full stops. */
const namePattern = /^[\p{L}][\p{L}\s'.-]*$/u;

export type NameFieldErrors = {
    firstName?: string;
    lastName?: string;
};

function validateName(label: string, value: string) {
    const trimmed = value.trim();

    if (!trimmed) {
        return `${label} is required.`;
    }

    if (trimmed.length < nameMinLength) {
        return `${label} must be at least ${nameMinLength} characters.`;
    }

    if (trimmed.length > nameMaxLength) {
        return `${label} must be ${nameMaxLength} characters or fewer.`;
    }

    if (!namePattern.test(trimmed)) {
        return `${label} can only contain letters, spaces, hyphens and apostrophes.`;
    }

    return "";
}

export function validateProfileNames(firstName: string, lastName: string): NameFieldErrors {
    const errors: NameFieldErrors = {};
    const firstNameError = validateName("First name", firstName);
    const lastNameError = validateName("Last name", lastName);

    if (firstNameError) errors.firstName = firstNameError;
    if (lastNameError) errors.lastName = lastNameError;

    return errors;
}
