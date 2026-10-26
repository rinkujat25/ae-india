const markup = `<section class="section" id="models">
        <div class="wrap">
            <div class="section-head">
                <div>
                    <span class="kicker">Two gifting models</span>
                    <h2>Let them choose, or choose for them.</h2>
                </div>
                <p>Employees do better when they pick. Clients and partners usually don't. We run both — the work behind them is the same.</p>
            </div>

            <div class="model-grid">
                <article class="model">
                    <span class="model-tag">Model 1</span>
                    <div class="model-ico"><svg class="icon">
                            <use href="#i-store" />
                        </svg></div>
                    <h3>Employee Gift Store</h3>
                    <p>You set the budget. Your team picks the gift. A branded store for your people, with the rules built in before anything is visible.</p>
                    <h4>Best fit for</h4>
                    <ul>
                        <li><svg class="icon">
                                <use href="#i-check" />
                            </svg><span>Festive and employee gifting</span></li>
                        <li><svg class="icon">
                                <use href="#i-check" />
                            </svg><span>Onboarding and welcome kits</span></li>
                        <li><svg class="icon">
                                <use href="#i-check" />
                            </svg><span>Milestones, rewards and recognition</span></li>
                    </ul>
                    <div class="model-foot"><a href="/employee-gift-store">See how gift stores work →</a></div>
                </article>

                <article class="model">
                    <span class="model-tag">Model 2</span>
                    <div class="model-ico"><svg class="icon">
                            <use href="#i-send" />
                        </svg></div>
                    <h3>Direct Corporate Gifting</h3>
                    <p>You approve one gift for the group. We source it, brand it and deliver it to every recipient on the list.</p>
                    <h4>Best fit for</h4>
                    <ul>
                        <li><svg class="icon">
                                <use href="#i-check" />
                            </svg><span>Client and CXO gifting</span></li>
                        <li><svg class="icon">
                                <use href="#i-check" />
                            </svg><span>Partner, channel and event gifting</span></li>
                        <li><svg class="icon">
                                <use href="#i-check" />
                            </svg><span>Customer campaigns and fixed distributions</span></li>
                    </ul>
                    <div class="model-foot"><a href="/direct-gifting">See how direct gifting works →</a></div>
                </article>
            </div>

            <div class="pricing">
                <div>
                    <h3>What it costs</h3>
                    <p>Quoted per program on headcount, budget and delivery scope. Send the brief, get a clear quote before anything is produced.</p>
                </div>
                <a class="btn btn-primary" href="#start" data-open-form>Get a quote for your headcount →</a>
            </div>
        </div>
    </section>

    <!-- ============ CATALOGUE ============ -->`;

export function ModelsSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
