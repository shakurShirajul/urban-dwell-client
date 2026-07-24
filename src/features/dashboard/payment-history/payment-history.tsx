"use client";


import { useContext, type FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";
import { AuthContext } from "@/shared/contexts/auth-context";
import PaymentHistoryTable from "./payment-history-table";
import { EmptyState, LoadingState, PageHeading } from "@/shared/components/ui/feedback";
import usePaymentHistory from "./hooks/use-payment-history";

const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

const normalizeMonth = (input: string) => {
  const value = input.trim().toLowerCase();
  const monthNumber = Number(value);
  return monthNumber >= 1 && monthNumber <= 12 ? monthNames[monthNumber - 1] : value;
};

const PaymentHistory = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("PaymentHistory must be rendered within AuthProvider");
  const { user } = authContext;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const month = searchParams.get("month") || "";
  const { data: payments = [], isLoading, isError } = usePaymentHistory(user?.email, month);

  const setMonth = (value: string) => router.replace(value ? `${pathname}?month=${encodeURIComponent(value)}` : pathname);
  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = normalizeMonth(String(new FormData(event.currentTarget).get("month") ?? ""));
    setMonth(value);
  };

  if (isLoading) return <LoadingState label="Loading payment history…" />;

  return (
    <div>
      <PageHeading eyebrow="Rent records" title="Payment history" description="Find a payment by month and review transaction details." />
      <form onSubmit={search} className="mb-6 flex max-w-xl gap-2" role="search">
        <div className="relative min-w-0 flex-1"><HiOutlineMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" aria-hidden="true" /><label htmlFor="payment-month-search" className="sr-only">Search payment history by month</label><input id="payment-month-search" name="month" defaultValue={month} autoComplete="off" placeholder="Search month name or number…" className="field-control pl-11" /></div>
        <button type="submit" className="h-[3.25rem] rounded-xl bg-primary px-5 font-bold text-primary-content">Search</button>
        {month ? <button type="button" onClick={() => setMonth("")} className="grid size-[3.25rem] place-items-center rounded-xl border border-base-content/15" aria-label="Clear month filter"><HiOutlineXMark aria-hidden="true" /></button> : null}
      </form>

      {isError ? <EmptyState title="Payments could not be loaded" description="Refresh the page to try again." /> : payments.length ? (
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[58rem] text-left"><caption className="sr-only">Your rent payment history</caption><thead className="border-b border-base-content/10 bg-base-200/70"><tr className="eyebrow text-base-content/45"><th className="px-4 py-4">No.</th><th className="px-4 py-4">Date</th><th className="px-4 py-4">Transaction</th><th className="px-4 py-4">Month</th><th className="px-4 py-4">Coupon</th><th className="px-4 py-4">Discount</th><th className="px-4 py-4 text-right">Paid</th></tr></thead><tbody>{payments.map((payment, index) => <PaymentHistoryTable key={payment._id} payment={payment} index={index} />)}</tbody></table>
        </div>
      ) : <EmptyState title={month ? `No payments found for ${month}` : "No payments yet"} description={month ? "Try another month or clear the filter." : "Completed rent payments will appear here."} />}
    </div>
  );
};

export default PaymentHistory;
