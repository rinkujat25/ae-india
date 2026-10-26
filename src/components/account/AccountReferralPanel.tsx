import type { AccountReferralModel } from "@/types/models/account.model";

type AccountReferralPanelProps = {
    referral: AccountReferralModel;
};

export function AccountReferralPanel({ referral }: AccountReferralPanelProps) {
    return (
        <section className="account-card">
            <div className="account-card-body">
                <div className="account-referral">
                    <div>
                        <div className="account-code">
                            <small>Your referral code</small>
                            <b>{referral.code}</b>
                        </div>
                        <p className="account-note account-gap">
                            Both sides earn when their first program ships. CashPoints are credited to the account that
                            placed the order.
                        </p>
                    </div>

                    <ol className="account-steps">
                        {referral.steps.map((step, index) => (
                            <li key={step}>
                                <i>{index + 1}</i>
                                <span>{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
