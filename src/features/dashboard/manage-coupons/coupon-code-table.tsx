import { HiOutlineTrash } from "react-icons/hi2";
import type { Coupon } from "@/types/domain";

const CouponCodeTable = ({ coupon, index, onDisable }: { coupon: Coupon; index: number; onDisable: (coupon: Coupon) => void }) => (
  <tr className="border-b border-base-content/10 last:border-0">
    <td className="px-4 py-4 font-mono text-sm text-base-content/45">{String(index + 1).padStart(2, "0")}</td>
    <td className="px-4 py-4"><span className="rounded-lg bg-primary/10 px-3 py-2 font-mono font-semibold tracking-wide text-primary">{coupon.coupon_Code}</span></td>
    <td className="tabular px-4 py-4 font-mono font-semibold">{coupon.coupon_Discount}%</td>
    <td className="max-w-md break-words px-4 py-4 text-sm text-base-content/60">{coupon.coupon_Description}</td>
    <td className="px-4 py-4 text-right">
      <button type="button" onClick={() => onDisable(coupon)} className="inline-flex h-10 items-center gap-2 rounded-full bg-error/10 px-4 text-sm font-bold text-error hover:bg-error hover:text-error-content" aria-label={`Disable coupon ${coupon.coupon_Code}`}>
        <HiOutlineTrash aria-hidden="true" /> Disable
      </button>
    </td>
  </tr>
);


export default CouponCodeTable;
