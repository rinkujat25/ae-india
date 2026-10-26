"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useApiRequest } from "@/hooks/useApiRequest";
import type { ProductBrandModel } from "@/types/models/product-brand.model";
import type { ProductCategoryModel } from "@/types/models/product-category.model";
import type { ProductPriceFilterModel } from "@/types/models/product-price-filter.model";
import type { ProductTagModel } from "@/types/models/product-tag.model";

type FilterOption = {
    value: string;
    label: string;
    count: number;
};

type ProductFiltersProps = {
    brands: ProductBrandModel[];
    categories: ProductCategoryModel[];
    tags: ProductTagModel[];
    priceFilters: ProductPriceFilterModel[];
    /**
     * True while the phone drawer is open. Opening it collapses every group, so
     * the drawer presents a short list of what can be filtered rather than one
     * long list of options belonging to whichever group happened to be open.
     */
    isDrawerOpen?: boolean;
};

type FilterKey = "categories" | "brands" | "tags" | "priceFilters";
type SelectedFilters = Record<FilterKey, string[]>;

/**
 * Groups the listing query understands. Selecting one of these rewrites the URL
 * and refetches.
 */
const urlBackedFilters: FilterKey[] = ["categories", "brands", "tags", "priceFilters"];

const filterLabels: Record<FilterKey, string> = {
    categories: "Categories",
    brands: "Brands",
    tags: "Tags",
    priceFilters: "Price",
};

function parseCommaSeparatedParam(value: string | null) {
    return value
        ? value
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
        : [];
}

/**
 * Empty when nothing is picked. The group heading already says what the list
 * is; an "All" underneath it looked like a state the reader had chosen, or a
 * control they could press, and was neither.
 */
function getSelectedLabel(options: FilterOption[], selectedValues: string[]) {
    if (!selectedValues.length) {
        return "";
    }

    if (selectedValues.length === 1) {
        return options.find((option) => option.value === selectedValues[0])?.label ?? "1 selected";
    }

    return `${selectedValues.length} selected`;
}

function sortFilterOptionsAsc(options: FilterOption[]) {
    return [...options].sort((left, right) =>
        left.label.localeCompare(right.label, "en", { sensitivity: "base" }),
    );
}

function FilterDropdown({
    id,
    label,
    options,
    selectedValues,
    isOpen,
    onToggleOpen,
    onToggle,
}: {
    id: FilterKey;
    label: string;
    options: FilterOption[];
    selectedValues: string[];
    isOpen: boolean;
    onToggleOpen: (key: FilterKey) => void;
    onToggle: (value: string) => void;
}) {
    return (
        <div className={`filter-dropdown${isOpen ? " is-open" : ""}`}>
            <button
                type="button"
                className="filter-trigger"
                aria-expanded={isOpen}
                aria-controls={`filter-menu-${id}`}
                onClick={() => onToggleOpen(id)}
            >
                <span>{label}</span>
                {getSelectedLabel(options, selectedValues) ? (
                    <strong>{getSelectedLabel(options, selectedValues)}</strong>
                ) : null}
                <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {isOpen ? (
                <div className="filter-menu" id={`filter-menu-${id}`}>
                    {options.length ? (
                        options.map((option) => (
                            <label className="filter-option" key={option.value}>
                                <input
                                    type="checkbox"
                                    checked={selectedValues.includes(option.value)}
                                    onChange={() => onToggle(option.value)}
                                />
                                <span>{option.label}</span>
                            </label>
                        ))
                    ) : (
                        <p className="filter-empty">No options</p>
                    )}
                </div>
            ) : null}
        </div>
    );
}

export function ProductFilters({
    brands,
    categories,
    tags,
    priceFilters,
    isDrawerOpen = false,
}: ProductFiltersProps) {
    const apiRequest = useApiRequest();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const filtersRef = useRef<HTMLElement | null>(null);
    const [syncError, setSyncError] = useState("");
    const [openFilters, setOpenFilters] = useState<FilterKey[]>(["categories", "brands"]);

    useEffect(() => {
        if (!isDrawerOpen) return undefined;

        // Deferred: setting state straight from an effect makes React render in
        // a cascade, which this codebase's lint rule rejects.
        const timeoutId = window.setTimeout(() => setOpenFilters([]), 0);

        return () => window.clearTimeout(timeoutId);
    }, [isDrawerOpen]);
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        categories: parseCommaSeparatedParam(searchParams.get("categories")),
        brands: parseCommaSeparatedParam(searchParams.get("brands")),
        tags: parseCommaSeparatedParam(searchParams.get("tags")),
        priceFilters: parseCommaSeparatedParam(searchParams.get("prices")),
    });

    const filterGroups = useMemo(
        () => ({
            categories: sortFilterOptionsAsc(categories),
            brands: sortFilterOptionsAsc(brands),
            tags,
            priceFilters,
        }),
        [brands, categories, priceFilters, tags],
    );

    const selectedChips = (Object.keys(filterGroups) as FilterKey[]).flatMap((key) =>
        selectedFilters[key].map((value) => {
            const option = filterGroups[key].find((item) => item.value === value);

            return {
                key,
                value,
                label: option?.label ?? value,
            };
        }),
    );

    function syncUrlFilters(nextFilters: SelectedFilters) {
        const nextParams = new URLSearchParams(searchParams.toString());
        nextParams.delete("categories");
        nextParams.delete("brands");
        nextParams.delete("tags");
        nextParams.delete("prices");
        // Back to the first page. Narrowing the catalogue usually leaves fewer
        // pages than there were, so carrying the current one over strands the
        // reader past the end of the new result set -- pick a brand from page 30
        // and the grid comes back empty. The position only means anything for
        // the result set it was taken from.
        nextParams.delete("page");

        const baseQuery = nextParams.toString();
        const categoriesQuery = nextFilters.categories.length
            ? `categories=${nextFilters.categories.map(encodeURIComponent).join(",")}`
            : "";
        const brandsQuery = nextFilters.brands.length
            ? `brands=${nextFilters.brands.map(encodeURIComponent).join(",")}`
            : "";
        const tagsQuery = nextFilters.tags.length
            ? `tags=${nextFilters.tags.map(encodeURIComponent).join(",")}`
            : "";
        const pricesQuery = nextFilters.priceFilters.length
            ? `prices=${nextFilters.priceFilters.map(encodeURIComponent).join(",")}`
            : "";
        const nextQuery = [baseQuery, categoriesQuery, brandsQuery, tagsQuery, pricesQuery]
            .filter(Boolean)
            .join("&");

        router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    }

    async function syncFilterPreview(nextFilters: SelectedFilters) {
        try {
            setSyncError("");
            await apiRequest<{ ok: boolean }>("/api/products/filter-preview", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(nextFilters),
            });
        } catch {
            setSyncError("Unable to sync filters. Please try again.");
        }
    }

    function toggleFilter(key: FilterKey, value: string) {
        const values = selectedFilters[key];
        const nextValues = values.includes(value)
            ? values.filter((selectedValue) => selectedValue !== value)
            : [...values, value];
        const nextFilters = {
            ...selectedFilters,
            [key]: nextValues,
        };

        setSelectedFilters(nextFilters);
        if (urlBackedFilters.includes(key)) {
            syncUrlFilters(nextFilters);
        }
        void syncFilterPreview(nextFilters);
    }

    function clearFilter(key: FilterKey, value: string) {
        const nextFilters = {
            ...selectedFilters,
            [key]: selectedFilters[key].filter((selectedValue) => selectedValue !== value),
        };

        setSelectedFilters(nextFilters);
        if (urlBackedFilters.includes(key)) {
            syncUrlFilters(nextFilters);
        }
        void syncFilterPreview(nextFilters);
    }

    function clearAllFilters() {
        const nextFilters = {
            categories: [],
            brands: [],
            tags: [],
            priceFilters: [],
        };

        setSelectedFilters(nextFilters);
        syncUrlFilters(nextFilters);
        void syncFilterPreview(nextFilters);
    }

    function toggleOpenFilter(key: FilterKey) {
        setOpenFilters((currentFilters) =>
            currentFilters.includes(key)
                ? currentFilters.filter((currentFilter) => currentFilter !== key)
                : [...currentFilters, key],
        );
    }

    return (
        <section className="filters-panel" aria-label="Product filters" ref={filtersRef}>
            <div className="filters-head">
                <h2>
                    Filters
                    {selectedChips.length ? <span>{selectedChips.length}</span> : null}
                </h2>
                {selectedChips.length ? (
                    <button type="button" onClick={clearAllFilters}>
                        Clear all
                    </button>
                ) : null}
            </div>

            <div className="filters-grid">
                {(Object.keys(filterGroups) as FilterKey[]).map((key) => (
                    <FilterDropdown
                        id={key}
                        label={filterLabels[key]}
                        options={filterGroups[key]}
                        selectedValues={selectedFilters[key]}
                        isOpen={openFilters.includes(key)}
                        onToggleOpen={toggleOpenFilter}
                        onToggle={(value) => toggleFilter(key, value)}
                        key={key}
                    />
                ))}
            </div>

            {selectedChips.length ? (
                <div className="active-filters" aria-label="Selected filters">
                    {selectedChips.map((chip) => (
                        <button
                            type="button"
                            className="filter-chip"
                            onClick={() => clearFilter(chip.key, chip.value)}
                            key={`${chip.key}-${chip.value}`}
                        >
                            {chip.label}
                            <span aria-hidden="true">x</span>
                        </button>
                    ))}
                </div>
            ) : null}

            {syncError ? <p className="filter-status error">{syncError}</p> : null}
        </section>
    );
}
