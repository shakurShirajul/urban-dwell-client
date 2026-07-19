import { useContext, useRef, useState } from "react";
import { HiOutlinePlus, HiOutlineXMark } from "react-icons/hi2";
import { AuthContext } from "@/shared/contexts/auth-context";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import CouponCodeTable from "./coupon-code-table";
import { EmptyState, LoadingState, PageHeading } from "@/shared/components/ui/feedback";
import useCoupons from "@/features/coupons/hooks/use-coupons";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const { successToast, errorToast } = useContext(AuthContext);
  const dialogRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const { data: coupons = [], refetch, isLoading } = useCoupons();

  const createCoupon = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    const form = event.currentTarget;
    try {
      await axiosSecure.post("/create-coupon", {
        couponCode: form.couponCode.value.trim().toUpperCase(),
        couponDiscount: Number(form.couponDiscount.value),
        couponDescription: form.couponDescription.value.trim(),
      });
      await refetch();
      form.reset();
      dialogRef.current?.close();
      successToast("Coupon created");
    } catch {
      errorToast("The coupon could not be created. Check the code and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const disableCoupon = async (coupon) => {
    if (!window.confirm(`Disable coupon ${coupon.coupon_Code}? It will no longer apply to payments.`)) return;
    try {
      await axiosSecure.delete(`/delete-coupon/${coupon.coupon_Code}`);
      await refetch();
      successToast("Coupon disabled");
    } catch {
      errorToast("The coupon could not be disabled. Try again.");
    }
  };

  if (isLoading) return <LoadingState label="Loading coupons…" />;

  const addButton = <button type="button" onClick={() => dialogRef.current?.showModal()} className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-bold text-primary-content hover:bg-secondary"><HiOutlinePlus aria-hidden="true" /> Add coupon</button>;

  return (
    <div>
      <PageHeading eyebrow="Resident offers" title="Coupons" description="Create payment discounts with clear codes and descriptions." action={addButton} />
      {coupons.length ? (
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[52rem] text-left">
            <caption className="sr-only">Active coupon codes</caption>
            <thead className="border-b border-base-content/10 bg-base-200/70"><tr className="eyebrow text-base-content/45"><th className="px-4 py-4">No.</th><th className="px-4 py-4">Code</th><th className="px-4 py-4">Discount</th><th className="px-4 py-4">Description</th><th className="px-4 py-4 text-right">Action</th></tr></thead>
            <tbody>{coupons.map((coupon, index) => <CouponCodeTable key={coupon._id || coupon.coupon_Code} coupon={coupon} index={index} onDisable={disableCoupon} />)}</tbody>
          </table>
        </div>
      ) : <EmptyState title="No active coupons" description="Create a coupon when you want to offer residents a rent discount." action={addButton} />}

      <dialog ref={dialogRef} className="modal overscroll-contain" aria-labelledby="coupon-dialog-title">
        <div className="modal-box max-w-xl rounded-[2rem] bg-base-100 p-7 sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <div><p className="eyebrow text-primary">New resident offer</p><h2 id="coupon-dialog-title" className="mt-3 font-display text-3xl font-semibold">Create a coupon</h2></div>
            <button type="button" onClick={() => dialogRef.current?.close()} className="grid size-10 shrink-0 place-items-center rounded-full bg-base-200 text-xl" aria-label="Close coupon dialog"><HiOutlineXMark aria-hidden="true" /></button>
          </div>
          <form onSubmit={createCoupon} className="mt-7 space-y-5">
            <div><label htmlFor="coupon-code" className="mb-2 block text-sm font-bold">Coupon code</label><input id="coupon-code" name="couponCode" required autoComplete="off" spellCheck={false} placeholder="Example: WELCOME10…" className="field-control font-mono uppercase" /></div>
            <div><label htmlFor="coupon-discount" className="mb-2 block text-sm font-bold">Discount percentage</label><input id="coupon-discount" name="couponDiscount" required type="number" min="1" max="100" inputMode="numeric" placeholder="10…" className="field-control" /></div>
            <div><label htmlFor="coupon-description" className="mb-2 block text-sm font-bold">Resident-facing description</label><textarea id="coupon-description" name="couponDescription" required rows="3" autoComplete="off" placeholder="Explain who can use this offer…" className="field-control resize-y" /></div>
            <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={() => dialogRef.current?.close()} className="h-12 rounded-full border border-base-content/15 px-5 font-bold hover:bg-base-200">Cancel</button><button type="submit" disabled={isSaving} className="h-12 rounded-full bg-primary px-6 font-bold text-primary-content disabled:cursor-wait disabled:opacity-60">{isSaving ? "Creating…" : "Create coupon"}</button></div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop"><button aria-label="Close coupon dialog">close</button></form>
      </dialog>
    </div>
  );
};

export default ManageCoupons;
