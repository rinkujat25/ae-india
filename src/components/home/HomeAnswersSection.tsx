import { homeAnswers } from "@/constants/homeAnswers";

/**
 * The answer-ready questions, as ordinary headings and paragraphs.
 *
 * Deliberately not an accordion. `<details>` keeps the text in the DOM, but a
 * heading followed by its answer is what a model can lift cleanly, and it is
 * also what a reader skimming on a phone gets without tapping eight times.
 */
export function HomeAnswersSection() {
    return (
        <section className="section answers" id="answers" aria-labelledby="answers-title">
            <div className="wrap">
                <div className="section-head">
                    <div>
                        <span className="kicker">Straight answers</span>
                        <h2 id="answers-title">How corporate gifting works with Wingback.</h2>
                    </div>
                </div>

                <div className="answers-grid">
                    {homeAnswers.map((entry) => (
                        <article className="answer" key={entry.question}>
                            <h3>{entry.question}</h3>
                            <p>{entry.answer}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
