import { architecturalPath } from "@/constants/architectural";

/** The About page's fixed copy, from the AE India design. */

export const aboutStats = [
    { value: "15+", label: "Years in business" },
    { value: "500+", label: "Clients served directly" },
    { value: "100+", label: "Dealers in our network" },
    { value: "Pan-India", label: "Supply & delivery" },
];

export const aboutDivisions = [
    {
        tone: "facility",
        eyebrow: "Existing buildings",
        title: "Facility Maintenance Solutions",
        body: "Cleaning and maintenance products, floor care, safety and hygiene, and refurbishment that renews surfaces without rebuilding.",
        href: "/facility-maintenance",
        more: "Explore facility solutions",
    },
    {
        tone: "architectural",
        eyebrow: "New buildings & interiors",
        title: "Architectural & Interior Solutions",
        body: "DI-NOC™ architectural films, glass and wall graphics, and entrance matting systems — specified with architects and designers.",
        href: architecturalPath,
        more: "Explore architectural solutions",
    },
];

export const aboutSectors = [
    "Brands & Corporate Offices",
    "Hotels & Hospitality",
    "Airports & Metro",
    "Malls & Retail",
    "Hospitals & Healthcare",
    "Industrial & Manufacturing",
];

export const aboutReasons = [
    { title: "The right product for the surface", body: "We recommend what fits the space and the budget — not just what's on the shelf." },
    { title: "Supply you can plan around", body: "Bulk and regular pricing, with reliable pan-India delivery." },
    { title: "Reach through our dealers", body: "100+ dealers bring local stock and service closer to every site." },
    { title: "Support after the sale", body: "Guidance on usage and replenishment, with 24/7 phone support." },
];
