import type { PincodeLookupStatus } from "@/hooks/usePincodeLookup";
import type { StateModel } from "@/types/models/state.model";
import type { AddressErrors, AddressFieldName, AddressValues } from "@/utils/address-validation";
import { gstinLength, pincodeLength } from "@/utils/address-validation";

type AccountAddressFieldsProps = {
    idPrefix: string;
    states: StateModel[];
    values: AddressValues;
    errors: AddressErrors;
    /** GSTIN only appears on the billing address. */
    includeGstin?: boolean;
    pincodeStatus: PincodeLookupStatus | null;
    onFieldChange: (field: AddressFieldName, value: string) => void;
};

/** The repeated block of address inputs, used for billing and shipping. */
export function AccountAddressFields({
    idPrefix,
    states,
    values,
    errors,
    includeGstin = false,
    pincodeStatus,
    onFieldChange,
}: AccountAddressFieldsProps) {
    function fieldProps(field: AddressFieldName) {
        const id = `${idPrefix}-${field}`;
        const hasError = Boolean(errors[field]);

        return {
            id,
            name: field,
            value: values[field],
            "aria-invalid": hasError ? true : undefined,
            "aria-describedby": hasError ? `${id}-error` : undefined,
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
                onFieldChange(field, event.target.value),
        };
    }

    function errorFor(field: AddressFieldName) {
        return errors[field] ? (
            <small className="account-field-error" id={`${idPrefix}-${field}-error`}>
                {errors[field]}
            </small>
        ) : null;
    }

    return (
        <>
            <div className="account-form-grid">
                <div className="account-field">
                    <label htmlFor={`${idPrefix}-firstName`}>
                        First Name <i className="account-req">*</i>
                    </label>
                    <input type="text" autoComplete="given-name" maxLength={60} {...fieldProps("firstName")} />
                    {errorFor("firstName")}
                </div>
                <div className="account-field">
                    <label htmlFor={`${idPrefix}-lastName`}>
                        Last Name <i className="account-req">*</i>
                    </label>
                    <input type="text" autoComplete="family-name" maxLength={60} {...fieldProps("lastName")} />
                    {errorFor("lastName")}
                </div>
            </div>

            <div className="account-field account-field-block">
                <label htmlFor={`${idPrefix}-mobile`}>
                    Mobile Number <i className="account-req">*</i>
                </label>
                <input type="tel" inputMode="tel" autoComplete="tel" maxLength={14} {...fieldProps("mobile")} />
                {errorFor("mobile")}
            </div>

            <div className="account-field account-field-block">
                <label htmlFor={`${idPrefix}-building`}>
                    Company, Building No., Apartment <i className="account-req">*</i>
                </label>
                <input type="text" autoComplete="address-line1" maxLength={120} {...fieldProps("building")} />
                {errorFor("building")}
            </div>

            <div className="account-field account-field-block">
                <label htmlFor={`${idPrefix}-street`}>
                    Area, Street <i className="account-req">*</i>
                </label>
                <input type="text" autoComplete="address-line2" maxLength={120} {...fieldProps("street")} />
                {errorFor("street")}
            </div>

            <div className="account-field account-field-block">
                <label htmlFor={`${idPrefix}-pincode`}>
                    Pin Code <i className="account-req">*</i>
                </label>
                <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={pincodeLength}
                    {...fieldProps("pincode")}
                />
                {errorFor("pincode")}
                {!errors.pincode && pincodeStatus ? (
                    <small
                        className={
                            pincodeStatus.tone === "error"
                                ? "account-field-error"
                                : "account-field-hint account-field-hint-live"
                        }
                        role="status"
                    >
                        {pincodeStatus.message}
                    </small>
                ) : null}
            </div>

            <div className="account-field account-field-block">
                <label htmlFor={`${idPrefix}-state`}>
                    State <i className="account-req">*</i>
                </label>
                <select
                    autoComplete="address-level1"
                    disabled={states.length === 0}
                    {...fieldProps("state")}
                >
                    <option value="">{states.length === 0 ? "States unavailable" : "Select a state"}</option>
                    {states.map((state) => (
                        <option key={state.id} value={String(state.id)}>
                            {state.name}
                        </option>
                    ))}
                </select>
                {errorFor("state")}
            </div>

            <div className="account-field account-field-block">
                <label htmlFor={`${idPrefix}-city`}>
                    City <i className="account-req">*</i>
                </label>
                <input type="text" autoComplete="address-level2" maxLength={60} {...fieldProps("city")} />
                {errorFor("city")}
            </div>

            {includeGstin ? (
                <div className="account-field account-field-block">
                    <label htmlFor={`${idPrefix}-gstin`}>GSTIN</label>
                    <input
                        type="text"
                        maxLength={gstinLength}
                        placeholder="Optional"
                        style={{ textTransform: "uppercase" }}
                        {...fieldProps("gstin")}
                    />
                    {errorFor("gstin")}
                </div>
            ) : null}
        </>
    );
}
