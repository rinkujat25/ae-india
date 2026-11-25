/**
 * AE India's clients, as the design lists them. The About page shows every
 * group; the home strip names a few through `findClient`, so a client's
 * spelling and logo live here once.
 *
 * A logo is shown where the design supplied one; the rest are names only. The
 * names and logos are their owners' trademarks, which the About page says.
 */
export type Client = { name: string; logo?: string };

export const clientGroups: Array<{ name: string; clients: Client[] }> = [
    {
        name: "Real Estate & Property",
        clients: [{ name: "DLF" }, { name: "JLL" }, { name: "CBRE" }, { name: "Knight Frank" }, { name: "Blackstone" }],
    },
    {
        name: "Corporate & Technology",
        clients: [
            { name: "Google", logo: "/assets/clients/google.svg" },
            { name: "Accenture", logo: "/assets/clients/accenture.svg" },
            { name: "Infosys", logo: "/assets/clients/infosys.svg" },
            { name: "Capgemini" },
            { name: "HCL", logo: "/assets/clients/hcl.svg" },
            { name: "SAP", logo: "/assets/clients/sap.svg" },
            { name: "American Express", logo: "/assets/clients/amex.svg" },
            { name: "Airtel", logo: "/assets/clients/airtel.svg" },
            { name: "DS Group" },
        ],
    },
    {
        name: "Hospitality & Food Service",
        clients: [
            { name: "Taj Hotels" },
            { name: "Taj Vivanta" },
            { name: "Lemon Tree" },
            { name: "Holiday Inn" },
            { name: "Domino's" },
            { name: "McDonald's", logo: "/assets/clients/mcdonalds.svg" },
            { name: "KFC", logo: "/assets/clients/kfc.svg" },
        ],
    },
    {
        name: "Healthcare",
        clients: [{ name: "Fortis" }, { name: "Medanta" }, { name: "Paras Hospital" }],
    },
    {
        name: "Infrastructure, Transport & Industry",
        clients: [
            { name: "GMR Airports" },
            { name: "Delhi Metro" },
            { name: "Maruti Suzuki", logo: "/assets/clients/maruti-suzuki.svg" },
            { name: "Hero Group" },
        ],
    },
];

const byName = new Map(clientGroups.flatMap((group) => group.clients).map((client) => [client.name, client]));

/** The listed client; a name that is not in the groups is dropped by the caller. */
export function findClient(name: string): Client | undefined {
    return byName.get(name);
}
