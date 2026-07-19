import { formatCurrency, formatDate } from "@/shared/lib/formatters";
import PropTypes from "prop-types";

const PaymentHistoryTable = ({ payment, index }) => (
  <tr className="border-b border-base-content/10 last:border-0">
    <td className="px-4 py-4 font-mono text-sm text-base-content/40">{String(index + 1).padStart(2, "0")}</td>
    <td className="px-4 py-4 text-sm">{formatDate(payment.date)}</td>
    <td className="max-w-56 truncate px-4 py-4 font-mono text-xs text-base-content/55" title={payment.transactionId}>{payment.transactionId}</td>
    <td className="px-4 py-4 font-semibold capitalize">{payment.month}</td>
    <td className="px-4 py-4 font-mono text-sm">{payment.coupon || "—"}</td>
    <td className="tabular px-4 py-4 font-mono text-sm text-success">−{formatCurrency(payment.discount)}</td>
    <td className="tabular px-4 py-4 text-right font-mono font-semibold">{formatCurrency(payment.rent - payment.discount)}</td>
  </tr>
);

PaymentHistoryTable.propTypes = {
  payment: PropTypes.shape({
    date: PropTypes.string.isRequired,
    transactionId: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    coupon: PropTypes.string,
    discount: PropTypes.number.isRequired,
    rent: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default PaymentHistoryTable;
