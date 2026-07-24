"use client";


import { useContext, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineArrowRight, HiOutlineBuildingOffice2, HiOutlineHomeModern, HiOutlineSquares2X2 } from "react-icons/hi2";
import { AuthContext } from "@/shared/contexts/auth-context";
import { LoadingState, PageHeading } from "@/shared/components/ui/feedback";
import { formatCurrency } from "@/shared/lib/formatters";
import useUserProfile from "@/shared/hooks/use-user-profile";
import type { IconType } from "react-icons";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const MakePayment = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("MakePayment must be rendered within AuthProvider");
  const { user } = authContext;
  const router = useRouter();
  const { data: profile, isLoading } = useUserProfile(user?.email);

  if (isLoading) return <LoadingState label="Loading payment details…" />;

  const continueToPayment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const month = new FormData(event.currentTarget).get("month");
    router.push(`/dashboard/paymentpage?month=${encodeURIComponent(String(month))}&amount=${profile?.rent ?? ""}`);
  };

  const details: Array<[string, string | number | undefined, IconType]> = [
    ["Block", profile?.block_name, HiOutlineSquares2X2],
    ["Floor", profile?.floor_no, HiOutlineBuildingOffice2],
    ["Apartment", profile?.apartment_no, HiOutlineHomeModern],
  ];

  return (
    <div>
      <PageHeading eyebrow="Monthly rent" title="Pay rent" description="Confirm the residence and month before moving to secure card payment." />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <section className="surface-card p-6 sm:p-8">
          <p className="eyebrow text-base-content/45">Residence</p>
          <h2 className="mt-3 font-display text-3xl font-semibold">{profile?.user_name}</h2>
          <p className="mt-2 text-sm text-base-content/55">{profile?.user_email}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {details.map(([label, value, Icon]) => <div key={label} className="rounded-2xl bg-base-200 p-4"><Icon className="text-xl text-primary" aria-hidden="true" /><p className="eyebrow mt-5 text-base-content/40">{label}</p><p className="mt-1 font-bold">{value}</p></div>)}
          </div>
        </section>
        <form onSubmit={continueToPayment} className="surface-card p-6 sm:p-8">
          <p className="eyebrow text-primary">Amount due</p>
          <p className="tabular mt-3 font-mono text-4xl font-semibold">{formatCurrency(profile?.rent)}</p>
          <div className="mt-8">
            <label htmlFor="payment-month" className="mb-2 block text-sm font-bold">Payment month</label>
            <select id="payment-month" name="month" required defaultValue="" className="field-control">
              <option value="" disabled>Select a month…</option>
              {months.map((month) => <option key={month} value={month.toLowerCase()}>{month}</option>)}
            </select>
          </div>
          <button type="submit" className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 font-bold text-primary-content hover:bg-secondary">Continue to secure payment <HiOutlineArrowRight aria-hidden="true" /></button>
        </form>
      </div>
    </div>
  );
};

export default MakePayment;
