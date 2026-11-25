/**
 * The Facility Maintenance page's fixed copy, from the AE India design.
 *
 * The product range is not here: it is `shopCategories`, the same list the home
 * page and the shop chips read, so the three cannot drift.
 */

export const facilityStats = [
    { value: "15+ yrs", label: "in facility supply" },
    { value: "500+", label: "direct clients" },
    { value: "Pan-India", label: "delivery & support" },
];

export const facilitySectors = [
    "Corporate Offices",
    "Hotels & Hospitality",
    "Airports",
    "Malls & Retail",
    "Hospitals",
    "Industrial Sites",
    "Educational Institutes",
];

/** `icon` is the path data of a 24x24 stroke glyph. */
export const facilityServices = [
    {
        title: "Daily Cleaning & Housekeeping",
        body: "Wand pads, scrub pads, cleaning tools and chemicals specified for each area and surface.",
        note: "Housekeeping · Washrooms · Pantries",
        icon: "M14 4 9.5 13M7 13h7l2 7H4l3-7ZM8 20l1-4M12 20v-4",
    },
    {
        title: "Floor Care & Restoration",
        body: "Floor pads and chemicals for stripping, scrubbing, polishing and burnishing hard floors.",
        note: "Marble · Vinyl · Tiles · Concrete",
        icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
    },
    {
        title: "Entrance, Safety & Hygiene",
        body: "Entrance matting, anti-slip tapes and hygiene products that stop dirt and slips at the door.",
        note: "Entrances · Ramps · Stairs",
        icon: "M12 3 5 6v5c0 4.6 2.9 8 7 10 4.1-2 7-5.4 7-10V6l-7-3ZM9 12l2 2 4-4",
    },
];

export const facilityRefurbishment = {
    title: "Refurbishment",
    body: "Renew doors, lift cabins, counters and walls with surface films — no demolition, minimal downtime.",
    icon: "M4 5h13v5H4zM17 7h3v5h-9v3M9 15h4v6H9z",
};

export const refurbishPoints = [
    { lead: "No demolition, no dust", rest: "films go over existing surfaces" },
    { lead: "Work after hours", rest: "minimal disruption to occupants" },
    { lead: "Wood, stone, metal finishes", rest: "from the same library architects specify" },
];

export const facilitySteps = [
    { title: "Understand the site", body: "Surfaces, footfall, team size and current consumption." },
    { title: "Specify the range", body: "The right pad, chemical and tool for each area — no over-buying." },
    { title: "Supply on schedule", body: "Bulk or scheduled orders, delivered pan-India directly or via our dealers." },
    { title: "Support after the sale", body: "Usage guidance and replenishment so standards never slip." },
];

/** What a caller should have to hand; stands in for the design's quote form. */
export const quoteChecklist = [
    "Your facility type and city",
    "The products you use today, or a photo of the surface",
    "Rough monthly quantity",
    "When you need the first delivery",
];
