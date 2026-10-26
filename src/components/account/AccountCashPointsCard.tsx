import Link from "next/link";
import type { AccountCashPointsModel } from "@/types/models/account.model";
import { accountSectionHref } from "@/utils/account-section";
import { formatInr } from "@/utils/currency";

type AccountCashPointsCardProps = {
    cashPoints: AccountCashPointsModel;
};

export function AccountCashPointsCard({ cashPoints }: AccountCashPointsCardProps) {
    const hasBalance = cashPoints.balance > 0;

    return (
        <section className={hasBalance ? "account-points account-points-earned" : "account-points"}>
            <div className="account-points-icon">
                <svg aria-hidden="true">
                    <use href="#account-star" />
                </svg>
            </div>

            <div className="account-points-body">
                {hasBalance ? (
                    <>
                        <p className="account-points-balance">
                            {cashPoints.balance.toLocaleString("en-IN")}
                            <small>CashPoints available</small>
                        </p>
                        <p>
                            Worth {formatInr(cashPoints.balance * cashPoints.rupeesPerPoint)} against your next order.
                        </p>
                    </>
                ) : (
                    <>
                        <h2>
                            It looks like you have not earned any <b>CashPoints</b> yet!
                        </h2>
                        <p>Start earning by placing an order…</p>
                    </>
                )}
                <p className="account-points-rate">
                    1 CashPoint = {formatInr(cashPoints.rupeesPerPoint)}
                </p>
            </div>

            <div className="account-points-cta">
                <Link className="btn btn-soft" href={hasBalance ? "/products" : accountSectionHref("orders")}>
                    {hasBalance ? "Spend points" : "Earn Now"}
                </Link>
            </div>
        </section>
    );
}
