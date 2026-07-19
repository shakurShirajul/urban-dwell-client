import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineCheck, HiOutlineTicket } from "react-icons/hi2";
import { publicApi } from "@/shared/api/http-clients";
import { EmptyState, LoadingState } from "@/shared/components/ui/feedback";

const Coupons = () => {
  const [copiedCode, setCopiedCode] = useState("");

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["couponDisplays"],
    queryFn: async () => {
      const response = await publicApi.get("/coupon-code");
      return response.data;
    },
  });

  const copyCoupon = async (code) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    window.setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <section id="offers" className="section-space overflow-hidden bg-secondary text-secondary-content">
      <div className="app-shell">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow text-accent">Resident offers</p>
            <h2 className="section-title mt-5">A useful welcome, not another promotion.</h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-secondary-content/65">
              Apply an active code when paying rent. Each offer explains exactly what it changes before you use it.
            </p>
          </div>

          {isLoading ? (
            <LoadingState label="Loading resident offers…" compact />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {coupons.length ? coupons.map((coupon) => (
                <article key={coupon._id || coupon.coupon_Code} className="rounded-3xl border border-white/15 bg-white/8 p-6">
                  <HiOutlineTicket className="text-3xl text-accent" aria-hidden="true" />
                  <p className="mt-8 min-h-14 leading-7 text-secondary-content/70">
                    {coupon.coupon_Description}
                  </p>
                  <button
                    type="button"
                    onClick={() => copyCoupon(coupon.coupon_Code)}
                    className="mt-6 flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left text-ink hover:bg-atrium"
                    aria-label={`Copy coupon code ${coupon.coupon_Code}`}
                  >
                    <span className="font-mono text-lg font-semibold tracking-wider">{coupon.coupon_Code}</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-garden" aria-live="polite">
                      {copiedCode === coupon.coupon_Code ? <><HiOutlineCheck aria-hidden="true" /> Copied</> : "Copy code"}
                    </span>
                  </button>
                </article>
              )) : (
                <EmptyState title="No active offers" description="New resident offers will appear here when available." />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Coupons;
