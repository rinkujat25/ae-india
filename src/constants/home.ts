/**
 * The home page's fixed copy, taken from the AE India design.
 *
 * These are business facts and editorial lists, not catalogue data: the
 * products and categories on the page come from the API. The figures (15+
 * years, 500+ clients, 100+ dealers) are AE India's own and appear on the
 * About page too, so they live here once.
 */

export const homeStats = [
    { value: "15+", label: "years" },
    { value: "500+", label: "direct clients" },
    { value: "100+", label: "dealers" },
];

/** The hero's three illustrations, wide one first. */
export const homeHeroScenes = [
    { src: "/assets/home/hero-airport.svg", alt: "Illustration of an airport terminal at dusk", label: "Airports" },
    { src: "/assets/home/hero-office.svg", alt: "Illustration of office towers at dusk", label: "Corporate offices" },
    { src: "/assets/home/hero-hotel.svg", alt: "Illustration of a hotel at dusk", label: "Hotels" },
];

/**
 * Client names, as the design lists them. A logo is shown where the design
 * supplied one; the rest are names only. The names are the clients'
 * trademarks.
 */
export const homeClients: Array<{ name: string; logo?: string }> = [
    { name: "Google", logo: "/assets/home/client-google.svg" },
    { name: "Accenture", logo: "/assets/home/client-accenture.svg" },
    { name: "Infosys", logo: "/assets/home/client-infosys.svg" },
    { name: "DLF" },
    { name: "GMR Airports" },
    { name: "Taj Hotels" },
    { name: "Medanta" },
    { name: "American Express", logo: "/assets/home/client-amex.svg" },
    { name: "Delhi Metro" },
];

/** The two divisions. `tone` picks the division's colour pair. */
export const homeSolutions = [
    {
        tone: "facility",
        eyebrow: "Existing buildings",
        title: "Facility Maintenance",
        body: "Cleaning, floor care, safety & hygiene, and refurbishment — led by our cleaning and maintenance range.",
        image: {
            src: "/assets/home/solution-facility.svg",
            alt: "Illustration of a cleaner polishing an office lobby floor with a scrubbing machine",
        },
    },
    {
        tone: "architectural",
        eyebrow: "New buildings & interiors",
        title: "Architectural & Interiors",
        body: "DI-NOC™ architectural films, graphics solutions and entrance matting for new spaces.",
        image: {
            src: "/assets/home/solution-architectural.svg",
            alt: "Illustration of a hotel lobby with wood panelling, a marble reception desk and frosted glass",
        },
    },
] as const;

export const homeIndustries = [
    "Corporate Offices",
    "Hospitals & Healthcare",
    "Industrial & Manufacturing",
    "Hotels & Hospitality",
    "Educational Institutes",
    "Retail & Commercial",
];

export const homeReasons = [
    { title: "Wide Product Range", body: "Pads, tools, chemicals, matting, tapes and hygiene in one place." },
    { title: "High Quality Products", body: "Professional-grade supplies chosen for performance and durability." },
    { title: "B2B & B2C Supply", body: "Bulk orders for businesses, convenient ordering for individuals." },
    { title: "Pan-India Delivery", body: "Shipped to sites across the country, directly or via dealers." },
    { title: "Dedicated Support", body: "24/7 phone support and after-sales guidance." },
    { title: "Competitive Pricing", body: "Sharp bulk and regular pricing that keeps budgets on track." },
];
