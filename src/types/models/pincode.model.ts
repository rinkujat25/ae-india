export type PincodeModel = {
    code: string;
    city: string;
    state: string;
    /** Matches the id used by the state list, so it can select the dropdown option. */
    stateId: number;
};
