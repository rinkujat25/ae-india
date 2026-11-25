"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { ProductSearchSuggestionsModel } from "@/types/models/product-search.model";

const emptySuggestions: ProductSearchSuggestionsModel = { products: [], keywords: [] };

/**
 * The header's search bar: an inline field with a Search button, as the design
 * draws it, and a suggestion list that drops beneath it while typing.
 *
 * Suggestions come from `/api/products/search-suggestions`, debounced, with the
 * previous request aborted so a slow answer cannot overwrite a newer one. The
 * list uses its own inline status rather than the global loader, which is a
 * full-screen overlay and would blank the page on every keystroke.
 *
 * Submitting always works without suggestions: it navigates to the products
 * listing with `?search=`.
 */
export function HeaderSearch() {
    const router = useRouter();
    const rootRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<ProductSearchSuggestionsModel>(emptySuggestions);
    const [isLoading, setIsLoading] = useState(false);
    const [searchError, setSearchError] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);
    const visibleKeywords = suggestions.keywords.slice(0, 4);
    const visibleProducts = suggestions.products.slice(0, 6);
    const resultCount = visibleKeywords.length + visibleProducts.length;
    const showResults = isOpen && query.trim().length >= 2;

    // Close on a press anywhere outside the field and its list.
    useEffect(() => {
        if (!isOpen) return;

        function handlePointerDown(event: PointerEvent) {
            if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
        }

        document.addEventListener("pointerdown", handlePointerDown);
        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [isOpen]);

    useEffect(() => {
        const controller = new AbortController();
        const normalizedQuery = query.trim();
        const timeoutId = window.setTimeout(async () => {
            if (!isOpen || normalizedQuery.length < 2) {
                setSuggestions(emptySuggestions);
                setSearchError("");
                setIsLoading(false);
                setActiveIndex(-1);
                return;
            }

            setIsLoading(true);
            setSearchError("");
            setActiveIndex(-1);

            try {
                const response = await fetch(`/api/products/search-suggestions?search=${encodeURIComponent(normalizedQuery)}`, {
                    signal: controller.signal,
                });
                const body = await response.json() as ProductSearchSuggestionsModel & { message?: string };

                if (!response.ok) throw new Error(body.message || "Unable to load suggestions.");
                setSuggestions({ products: body.products ?? [], keywords: body.keywords ?? [] });
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") return;
                setSuggestions(emptySuggestions);
                setSearchError(error instanceof Error ? error.message : "Unable to load suggestions.");
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        }, 300);

        return () => {
            window.clearTimeout(timeoutId);
            controller.abort();
        };
    }, [isOpen, query]);

    function openKeyword(keyword: string) {
        setIsOpen(false);
        router.push(`/products?search=${encodeURIComponent(keyword)}`);
    }

    function openProduct(slug: string) {
        setIsOpen(false);
        router.push(`/products/${encodeURIComponent(slug)}`);
    }

    function submitSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const normalizedQuery = query.trim();
        if (!normalizedQuery) return;

        if (activeIndex >= 0 && activeIndex < visibleKeywords.length) {
            openKeyword(visibleKeywords[activeIndex]);
            return;
        }

        const product = visibleProducts[activeIndex - visibleKeywords.length];
        if (product) {
            openProduct(product.slug);
            return;
        }

        openKeyword(normalizedQuery);
    }

    return (
        <div className="header-search" ref={rootRef}>
            <form className="header-search-form" role="search" onSubmit={submitSearch}>
                <input
                    type="search"
                    value={query}
                    placeholder="Search pads, chemicals, mats, tapes…"
                    aria-label="Search products"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-controls="header-search-results"
                    aria-expanded={showResults}
                    aria-activedescendant={showResults && activeIndex >= 0 ? `header-search-result-${activeIndex}` : undefined}
                    onFocus={() => setIsOpen(true)}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        setIsOpen(true);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") {
                            setIsOpen(false);
                        } else if (event.key === "ArrowDown") {
                            event.preventDefault();
                            setIsOpen(true);
                            setActiveIndex((current) => Math.min(current + 1, resultCount - 1));
                        } else if (event.key === "ArrowUp") {
                            event.preventDefault();
                            setActiveIndex((current) => Math.max(current - 1, -1));
                        }
                    }}
                />
                <button type="submit">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m16.5 16.5 4 4" />
                    </svg>
                    <span>Search</span>
                </button>
            </form>
            {showResults ? (
                <div className="header-search-results" id="header-search-results" role="listbox" aria-label="Search suggestions">
                    {isLoading ? <p className="header-search-status">Searching...</p> : null}
                    {!isLoading && searchError ? <p className="header-search-status header-search-error">{searchError}</p> : null}
                    {!isLoading && !searchError && !resultCount ? <p className="header-search-status">No suggestions found.</p> : null}
                    {!isLoading && !searchError ? visibleKeywords.map((keyword, index) => (
                        <button
                            id={`header-search-result-${index}`}
                            className="header-search-result header-search-keyword"
                            type="button"
                            role="option"
                            aria-selected={activeIndex === index}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => openKeyword(keyword)}
                            key={keyword}
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m16.5 16.5 4 4" /></svg>
                            <span>{keyword}</span>
                        </button>
                    )) : null}
                    {!isLoading && !searchError ? visibleProducts.map((product, productIndex) => {
                        const index = visibleKeywords.length + productIndex;
                        return (
                            <button
                                id={`header-search-result-${index}`}
                                className="header-search-result header-search-product"
                                type="button"
                                role="option"
                                aria-selected={activeIndex === index}
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={() => openProduct(product.slug)}
                                key={product.id}
                            >
                                <span className="header-search-product-copy">
                                    <strong>{product.name}</strong>
                                    {product.price ? <small>Rs. {product.price.toLocaleString("en-IN")}</small> : null}
                                </span>
                                <span aria-hidden="true">›</span>
                            </button>
                        );
                    }) : null}
                </div>
            ) : null}
        </div>
    );
}
