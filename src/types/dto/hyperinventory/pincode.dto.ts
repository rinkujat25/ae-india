export type HyperinventoryPincodeDto = {
    city: string;
    state: string;
    state_id: number;
    code: string;
};

/** `GET /v1/pincodes` returns a paged list; an unknown pincode gives an empty one. */
export type HyperinventoryPincodeListDto = {
    count: number;
    next: string | null;
    previous: string | null;
    results: HyperinventoryPincodeDto[];
};
