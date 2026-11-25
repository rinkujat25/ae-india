/** The Architectural & Interiors page's fixed copy, from the AE India design. */

export const architecturalPath = "/architectural-interiors";

/** The hero's pictures, tall one first. */
export const architecturalScenes = [
    { src: "/assets/architectural/hero-lobby.svg", alt: "Illustration of a hotel lobby with wood-grain wall panels", label: "Hotel lobbies" },
    { src: "/assets/architectural/hero-lift.svg", alt: "Illustration of lift doors with a brushed-metal finish", label: "Lift interiors" },
    { src: "/assets/architectural/hero-glass.svg", alt: "Illustration of an office glass partition with a frosted graphic band", label: "Glass graphics" },
];

export const architecturalProjects = [
    "Corporate Headquarters",
    "Hotels",
    "Airport Terminals",
    "Malls & Retail Fit-outs",
    "Hospitals",
    "Residential Towers",
];

export const architecturalLines = [
    {
        eyebrow: "Architectural finishes",
        title: "DI-NOC™ Architectural Films",
        body: "Realistic wood, stone, metal and leather textures on a thin, durable film. Apply to walls, doors, columns, lift cabins and furniture — a premium look without the weight, cost or lead time of natural material.",
        uses: ["Walls & columns", "Doors & frames", "Lift interiors", "Furniture & counters"],
        link: { href: "#finishes", label: "See the finish library" },
        image: { src: "/assets/architectural/line-films.svg", alt: "Illustration of an installer applying wood-grain film to a reception counter" },
    },
    {
        eyebrow: "Graphics solutions",
        title: "Glass, Wall & Wayfinding Graphics",
        body: "Frosted and decorative glass films, branded wall graphics and wayfinding that turn a fit-out into a branded environment — while adding privacy and safety manifestation on glass.",
        uses: ["Glass manifestation", "Privacy films", "Brand walls", "Wayfinding"],
        link: { href: "#enquire", label: "Discuss a graphics project" },
        image: { src: "/assets/architectural/line-graphics.svg", alt: "Illustration of an office with frosted glass, a brand wall and a wayfinding sign" },
    },
    {
        eyebrow: "Architectural matting",
        title: "Entrance Matting Systems",
        body: "Recessed and surface entrance systems, logo mats and high-traffic matting that trap dirt and moisture at the door — protecting the floors you just invested in.",
        uses: ["Recessed systems", "Logo mats", "High-traffic zones"],
        link: { href: "#enquire", label: "Specify entrance matting" },
        image: { src: "/assets/architectural/line-matting.svg", alt: "Illustration of a visitor walking over recessed entrance matting" },
    },
];

/** Drawn textures standing for each family, not photographs of a product. */
export const finishFamilies = [
    { name: "Wood Grain", note: "Oak, walnut, teak", image: "/assets/architectural/finish-wood.svg" },
    { name: "Stone & Marble", note: "Marble, granite, travertine", image: "/assets/architectural/finish-stone.svg" },
    { name: "Metallic", note: "Brushed steel, bronze", image: "/assets/architectural/finish-metal.svg" },
    { name: "Concrete", note: "Raw, polished, plaster", image: "/assets/architectural/finish-concrete.svg" },
    { name: "Leather & Fabric", note: "Soft-touch textures", image: "/assets/architectural/finish-leather.svg" },
    { name: "Solid Colours", note: "Matte, gloss, pearl", image: "/assets/architectural/finish-solid.svg" },
];

export const architecturalSteps = [
    { stage: "Concept", title: "Material direction", body: "Shortlist finishes and graphics for each zone of the project." },
    { stage: "Sampling", title: "Physical swatches", body: "Sample kits for mood boards and client approvals." },
    { stage: "Specification", title: "Quantities & BOQ", body: "Product codes and quantities ready for tender and procurement." },
    { stage: "Delivery", title: "Supply to site", body: "Pan-India delivery, directly or through our dealer network." },
];

/** What a caller should have to hand; stands in for the design's enquiry form. */
export const projectChecklist = [
    "Your firm and role on the project",
    "Project type, city and stage",
    "The surfaces you are finishing, with rough areas",
    "Finish families you would like samples of",
];
