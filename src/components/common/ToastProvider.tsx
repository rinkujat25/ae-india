"use client";

import {
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

type ToastTone = "success" | "error";

type Toast = {
    id: number;
    message: string;
    tone: ToastTone;
};

type ToastContextValue = {
    showToast: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

/** Long enough to read a short sentence, short enough not to linger. */
const visibleMs = 3200;

/** Only the most recent few, so a fast clicker does not bury the page. */
const maxVisible = 3;

const styles = `
  .toast-region{
    align-items:flex-end;
    display:flex;
    flex-direction:column;
    gap:10px;
    pointer-events:none;
    position:fixed;
    right:24px;
    /* Below the sticky header rather than under it. */
    top:88px;
    z-index:1100;
  }

  .toast{
    align-items:center;
    animation:toast-in .22s cubic-bezier(.22,.61,.36,1);
    background:#1f2a24;
    border-radius:10px;
    box-shadow:0 12px 32px rgba(16, 24, 20, .26);
    color:#fff;
    display:flex;
    font-size:14px;
    font-weight:700;
    gap:10px;
    line-height:1.4;
    max-width:min(380px, calc(100vw - 48px));
    padding:12px 16px;
    pointer-events:auto;
  }

  .toast.error{background:#8d2828}

  .toast svg{
    fill:none;
    flex:0 0 auto;
    height:18px;
    stroke:currentColor;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-width:2.4;
    width:18px;
  }

  @keyframes toast-in{
    from{opacity:0;transform:translateX(12px)}
    to{opacity:1;transform:none}
  }

  @media (max-width:560px){
    .toast-region{left:16px;right:16px;top:74px}
    .toast{max-width:none;width:100%}
  }

  @media (prefers-reduced-motion:reduce){
    .toast{animation:none}
  }
`;

/**
 * Brief confirmations, top-right, below the sticky header.
 *
 * The region is a live region so a screen reader announces the message without
 * the focus moving; `polite` because none of this interrupts what someone is
 * doing.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const nextId = useRef(0);
    const timers = useRef<number[]>([]);

    useEffect(() => {
        const pending = timers.current;

        return () => {
            pending.forEach((id) => window.clearTimeout(id));
        };
    }, []);

    const showToast = useCallback((message: string, tone: ToastTone = "success") => {
        if (!message.trim()) return;

        nextId.current += 1;

        const id = nextId.current;

        setToasts((current) => [...current, { id, message, tone }].slice(-maxVisible));

        const timerId = window.setTimeout(() => {
            setToasts((current) => current.filter((toast) => toast.id !== id));
            timers.current = timers.current.filter((pending) => pending !== timerId);
        }, visibleMs);

        timers.current.push(timerId);
    }, []);

    const value = useMemo(() => ({ showToast }), [showToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <style dangerouslySetInnerHTML={{ __html: styles }} />
            <div className="toast-region" role="status" aria-live="polite">
                {toasts.map((toast) => (
                    <div className={`toast ${toast.tone}`} key={toast.id}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            {toast.tone === "success" ? (
                                <path d="M20 6 9 17l-5-5" />
                            ) : (
                                <>
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 7v6M12 16h.01" />
                                </>
                            )}
                        </svg>
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

/**
 * Returns a no-op outside the provider rather than throwing, so a component
 * that only wants to confirm something still renders if it is mounted somewhere
 * the provider does not reach.
 */
export function useToast(): ToastContextValue {
    return useContext(ToastContext) ?? { showToast: () => {} };
}
