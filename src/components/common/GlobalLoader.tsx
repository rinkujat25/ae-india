type GlobalLoaderProps = {
    label?: string;
};

export function GlobalLoader({ label = "Loading" }: GlobalLoaderProps) {
    return (
        <div className="global-api-loader" role="status" aria-live="polite" aria-label={label}>
            <span className="global-api-loader__spinner" aria-hidden="true" />
            <span className="global-api-loader__text">{label}</span>
        </div>
    );
}
