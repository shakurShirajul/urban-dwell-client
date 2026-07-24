import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import { formatCurrency, formatDate } from "@/shared/lib/formatters";
import type { Agreement } from "@/types/domain";

const AgreementRequestsTable = ({ request, onAccept, onReject }: { request: Agreement; onAccept: (id: string) => void; onReject: (id: string) => void }) => (
  <tr className="border-b border-base-content/10 last:border-0">
    <td className="px-4 py-4">
      <p className="font-bold">{request.user_name}</p>
      <p className="mt-1 max-w-52 truncate text-xs text-base-content/50">{request.user_email}</p>
    </td>
    <td className="px-4 py-4 font-mono text-sm">{request.block_name} · {request.floor_no} · {request.apartment_no}</td>
    <td className="tabular px-4 py-4 font-mono text-sm font-semibold">{formatCurrency(request.rent)}</td>
    <td className="px-4 py-4 text-sm text-base-content/60">{formatDate(request.agreement_request_date)}</td>
    <td className="px-4 py-4">
      <div className="flex justify-end gap-2">
        <button type="button" onClick={() => onReject(request._id)} className="grid size-10 place-items-center rounded-full bg-error/10 text-error hover:bg-error hover:text-error-content" aria-label={`Reject agreement request from ${request.user_name}`}>
          <HiOutlineXMark aria-hidden="true" />
        </button>
        <button type="button" onClick={() => onAccept(request._id)} className="grid size-10 place-items-center rounded-full bg-success/10 text-success hover:bg-success hover:text-success-content" aria-label={`Accept agreement request from ${request.user_name}`}>
          <HiOutlineCheck aria-hidden="true" />
        </button>
      </div>
    </td>
  </tr>
);


export default AgreementRequestsTable;
