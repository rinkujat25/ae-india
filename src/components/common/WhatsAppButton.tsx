import { getCompany } from "@/lib/company";

/**
 * The floating WhatsApp button, bottom-right on every page.
 *
 * A plain link rather than a Client Component: it opens a URL and nothing else,
 * so there is no reason to ship JavaScript for it.
 *
 * The number comes from `COMPANY_WHATSAPP_NUMBER`, defaulting to the published
 * phone number. Clearing that variable removes the button rather than leaving a
 * link to a number that does not answer.
 */
const styles = `
  .wa-float{
    align-items:center;
    background:#25d366;
    border-radius:50%;
    bottom:24px;
    box-shadow:0 6px 20px rgba(37, 211, 102, .42), 0 2px 6px rgba(16, 24, 20, .18);
    color:#fff;
    display:flex;
    height:58px;
    justify-content:center;
    position:fixed;
    right:24px;
    width:58px;
    /* Above the page, below the header's search overlay at 1000. */
    z-index:900;
    transition:transform .2s cubic-bezier(.22,.61,.36,1), box-shadow .2s ease;
  }

  .wa-float svg{height:32px;width:32px;fill:currentColor}

  @media (hover:hover){
    .wa-float:hover{
      box-shadow:0 10px 26px rgba(37, 211, 102, .52), 0 3px 8px rgba(16, 24, 20, .2);
      transform:scale(1.07);
    }
  }

  .wa-float:focus-visible{outline:3px solid #128c7e;outline-offset:3px}

  @media (max-width:560px){
    .wa-float{bottom:16px;height:52px;right:16px;width:52px}
    .wa-float svg{height:28px;width:28px}
  }

  @media (prefers-reduced-motion:reduce){
    .wa-float{transition-duration:.01ms}
    .wa-float:hover{transform:none}
  }
`;

export function WhatsAppButton() {
    const company = getCompany();

    if (!company.whatsappHref) return null;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styles }} />
            <a
                className="wa-float"
                href={company.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chat with ${company.name} on WhatsApp`}
            >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                </svg>
            </a>
        </>
    );
}
