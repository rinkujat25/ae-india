"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { ProductSearchSuggestionsModel } from "@/types/models/product-search.model";

const emptySuggestions: ProductSearchSuggestionsModel = { products: [], keywords: [] };

export function HeaderSearch() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<ProductSearchSuggestionsModel>(emptySuggestions);
    const [isLoading, setIsLoading] = useState(false);
    const [searchError, setSearchError] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);
    const visibleKeywords = suggestions.keywords.slice(0, 4);
    const visibleProducts = suggestions.products.slice(0, 6);
    const resultCount = visibleKeywords.length + visibleProducts.length;

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        inputRef.current?.focus();

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") setIsOpen(false);
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
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
        <>
            <button className="header-icon-link" type="button" aria-label="Search products" onClick={() => setIsOpen(true)}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m16.5 16.5 4 4" />
                </svg>
            </button>

            {isOpen ? (
                <div
                    className="header-search-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="header-search-title"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setIsOpen(false);
                    }}
                >
                    <div className="header-search-panel">
                        <button className="header-search-close" type="button" aria-label="Close search" onClick={() => setIsOpen(false)}>
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
                        </button>
                        <p id="header-search-title">Start your amazing search:</p>
                        <form className="header-search-form" role="search" onSubmit={submitSearch}>
                            <input
                                ref={inputRef}
                                type="search"
                                value={query}
                                placeholder="Please enter a keyword"
                                aria-label="Search products"
                                role="combobox"
                                aria-autocomplete="list"
                                aria-controls="header-search-results"
                                aria-expanded={query.trim().length >= 2}
                                aria-activedescendant={activeIndex >= 0 ? `header-search-result-${activeIndex}` : undefined}
                                onChange={(event) => setQuery(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "ArrowDown") {
                                        event.preventDefault();
                                        setActiveIndex((current) => Math.min(current + 1, resultCount - 1));
                                    } else if (event.key === "ArrowUp") {
                                        event.preventDefault();
                                        setActiveIndex((current) => Math.max(current - 1, -1));
                                    }
                                }}
                            />
                            <button type="submit" aria-label="Submit search">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="m16.5 16.5 4 4" />
                                </svg>
                            </button>
                        </form>
                        {query.trim().length >= 2 ? (
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
                </div>
            ) : null}
        </>
    );
}
