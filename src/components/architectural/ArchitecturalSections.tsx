/* eslint-disable @next/next/no-img-element */
import { ContactCard } from "@/components/division/ContactCard";
import {
    architecturalLines,
    architecturalProjects,
    architecturalScenes,
    architecturalSteps,
    finishFamilies,
    projectChecklist,
} from "@/constants/architectural";

export function ArchitecturalHero() {
    return (
        <section className="dv-hero dv-hero--dark" aria-labelledby="architectural-title">
            <div className="wrap dv-hero-inner">
                <div className="dv-hero-copy">
                    <p className="dv-eyebrow">Architectural &amp; Interior Solutions</p>
                    <h1 id="architectural-title">Surfaces that shape the space.</h1>
                    <p className="dv-hero-lede">
                        Architectural finishes, graphics and entrance matting for new buildings and interiors —
                        specified with architects, delivered to site, built to last.
                    </p>
                    <div className="dv-hero-actions">
                        <a className="dv-btn dv-btn--light" href="#enquire">
                            Request a Sample Kit
                        </a>
                        <a className="dv-btn dv-btn--ghost" href="#finishes">
                            Explore Finishes
                        </a>
                    </div>
                </div>
                <div className="dv-hero-mosaic">
                    {architecturalScenes.map((scene, index) => (
                        <figure key={scene.src}>
                            <img src={scene.src} alt={scene.alt} fetchPriority={index === 0 ? "high" : undefined} />
                            <figcaption>{scene.label}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function ArchitecturalProjects() {
    return (
        <section className="dv-sectors" aria-label="Project types">
            <div className="wrap">
                <b>Built for</b>
                <ul>
                    {architecturalProjects.map((project) => (
                        <li key={project}>{project}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export function ArchitecturalLines() {
    return (
        <section className="dv-section" aria-labelledby="architectural-lines-title">
            <div className="wrap">
                <div className="dv-head">
                    <p className="dv-eyebrow">Three solution lines</p>
                    <h2 id="architectural-lines-title">From the façade to the finish.</h2>
                    <p>
                        Everything that gives a new building its character — and keeps it looking new long after
                        handover.
                    </p>
                </div>
                <ol className="dv-lines">
                    {architecturalLines.map((line) => (
                        <li key={line.title}>
                            <img src={line.image.src} alt={line.image.alt} width={640} height={440} loading="lazy" />
                            <div className="dv-line-body">
                                <p className="dv-line-eyebrow">{line.eyebrow}</p>
                                <h3>{line.title}</h3>
                                <p>{line.body}</p>
                                <ul className="dv-tags">
                                    {line.uses.map((use) => (
                                        <li key={use}>{use}</li>
                                    ))}
                                </ul>
                                <a className="dv-link" href={line.link.href}>
                                    {line.link.label} <span aria-hidden="true">&#8594;</span>
                                </a>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export function ArchitecturalFinishes() {
    return (
        <section className="dv-section dv-section--tint" id="finishes" aria-labelledby="architectural-finishes-title">
            <div className="wrap">
                <div className="dv-head dv-head--split">
                    <div>
                        <p className="dv-eyebrow">Finish library</p>
                        <h2 id="architectural-finishes-title">Hundreds of textures. One thin film.</h2>
                        <p className="dv-finish-lede">
                            Browse by family, then order physical swatches for your mood board.
                        </p>
                    </div>
                    <a className="dv-link" href="#enquire">
                        Order swatches <span aria-hidden="true">&#8594;</span>
                    </a>
                </div>
                <ul className="dv-finishes">
                    {finishFamilies.map((family) => (
                        <li key={family.name}>
                            <img src={family.image} alt="" width={300} height={300} loading="lazy" />
                            <b>{family.name}</b>
                            <span>{family.note}</span>
                        </li>
                    ))}
                </ul>
                <p className="dv-finish-note">
                    Swatches shown are representative drawings, not product photography. DI-NOC is a trademark of 3M.
                </p>
            </div>
        </section>
    );
}

export function ArchitecturalProcess() {
    return (
        <section className="dv-section" aria-labelledby="architectural-process-title">
            <div className="wrap dv-process">
                <div className="dv-process-copy">
                    <p className="dv-eyebrow">For architects &amp; designers</p>
                    <h2 id="architectural-process-title">From drawing board to handover.</h2>
                    <p>
                        We work alongside your design and project teams so the finish on site matches the finish on
                        the render.
                    </p>
                </div>
                <ol className="dv-stages">
                    {architecturalSteps.map((step) => (
                        <li key={step.stage}>
                            <p className="dv-stage">{step.stage}</p>
                            <h3>{step.title}</h3>
                            <p>{step.body}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export function ArchitecturalEnquiry() {
    return (
        <section className="dv-section dv-section--dark" id="enquire" aria-labelledby="architectural-enquire-title">
            <div className="wrap dv-quote">
                <div className="dv-quote-copy">
                    <p className="dv-eyebrow">Start a project</p>
                    <h2 id="architectural-enquire-title">Request a sample kit or project consultation.</h2>
                    <p>
                        Share your project stage and the spaces you&apos;re finishing. We&apos;ll send relevant samples
                        and follow up with specification support.
                    </p>
                </div>
                <ContactCard checklist={projectChecklist} callLabel="Call for Samples" />
            </div>
        </section>
    );
}
