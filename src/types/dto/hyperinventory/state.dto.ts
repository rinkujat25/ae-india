export type HyperinventoryStateDto = {
    id: number;
    name: string;
    code: string;
};

/** `GET /v1/states` is a standard paged list. */
export type HyperinventoryStateListDto = {
    count: number;
    next: string | null;
    previous: string | null;
    results: HyperinventoryStateDto[];
};
