/**
 * Address rules, shared by the form and (once the endpoint exists) the route
 * handler, so the two cannot drift. Mirrors profile-validation.ts.
 */

export type AddressFieldName =
    | "firstName"
    | "lastName"
    | "mobile"
    | "building"
    | "street"
    | "pincode"
    | "state"
    | "city"
    | "gstin";

export type AddressValues = Record<AddressFieldName, string>;

export type AddressErrors = Partial<Record<AddressFieldName, string>>;

const namePattern = /^[\p{L}][\p{L}\s'.-]*$/u;
const cityPattern = /^[\p{L}][\p{L}\s'.-]*$/u;
/** 10 digits starting 6-9, optionally +91 / 0 prefixed. */
const mobilePattern = /^(?:\+?91[-\s]?|0)?[6-9]\d{9}$/;
/** Indian PIN: six digits, never starting with zero. */
const pincodePattern = /^[1-9]\d{5}$/;
/** 15 characters: state code, PAN, entity number, Z, checksum. */
export const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

export const gstinLength = 15;
export const pincodeLength = 6;

export function validateAddress(values: AddressValues): AddressErrors {
    const errors: AddressErrors = {};
    const firstName = values.firstName.trim();
    const lastName = values.lastName.trim();
    const mobile = values.mobile.trim();
    const building = values.building.trim();
    const street = values.street.trim();
    const pincode = values.pincode.trim();
    const state = values.state.trim();
    const city = values.city.trim();
    const gstin = values.gstin.trim().toUpperCase();

    if (!firstName) errors.firstName = "First name is required.";
    else if (!namePattern.test(firstName)) errors.firstName = "Use letters, spaces, hyphens and apostrophes only.";

    if (!lastName) errors.lastName = "Last name is required.";
    else if (!namePattern.test(lastName)) errors.lastName = "Use letters, spaces, hyphens and apostrophes only.";

    if (!mobile) errors.mobile = "Mobile number is required.";
    else if (!mobilePattern.test(mobile.replace(/\s/g, ""))) errors.mobile = "Enter a valid 10-digit Indian mobile number.";

    if (!building) errors.building = "Company, building or apartment is required.";
    else if (building.length < 3) errors.building = "Enter at least 3 characters.";

    if (!street) errors.street = "Area and street is required.";
    else if (street.length < 3) errors.street = "Enter at least 3 characters.";

    if (!pincode) errors.pincode = "Pin code is required.";
    else if (!pincodePattern.test(pincode)) errors.pincode = "Enter a valid 6-digit pin code.";

    if (!state) errors.state = "Select a state.";

    if (!city) errors.city = "City is required.";
    else if (!cityPattern.test(city)) errors.city = "Enter a valid city name.";

    // GSTIN is optional, but must be well formed when supplied.
    if (gstin && !gstinPattern.test(gstin)) errors.gstin = "Enter a valid 15-character GSTIN.";

    return errors;
}

export function createEmptyAddress(): AddressValues {
    return {
        firstName: "",
        lastName: "",
        mobile: "",
        building: "",
        street: "",
        pincode: "",
        state: "",
        city: "",
        gstin: "",
    };
}
