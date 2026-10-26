export type BoughtTogetherItemModel = {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
    price: number;
    /** List price, for the strike-through and the saving. Zero when there is none. */
    mrp: number;
    /**
     * The product the page is about. It is always part of the bundle and its
     * checkbox is locked, so the section can never end up adding nothing
     * related to the page being read.
     */
    isCurrent: boolean;
};
