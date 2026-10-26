import type { AccountRewardModel } from "@/types/models/account.model";

type AccountRewardsPanelProps = {
    rewards: AccountRewardModel[];
};

export function AccountRewardsPanel({ rewards }: AccountRewardsPanelProps) {
    return (
        <div className="account-rewards">
            {rewards.map((reward) => (
                <article key={reward.id} className="account-reward">
                    <div className="account-reward-amount">
                        {reward.amountLabel}
                        <small>{reward.amountSuffix}</small>
                    </div>
                    <div>
                        <b>{reward.title}</b>
                        <p>{reward.description}</p>
                        <code>{reward.code}</code>
                    </div>
                </article>
            ))}
        </div>
    );
}
