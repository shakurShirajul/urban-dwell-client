import { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { HiOutlineCheckCircle, HiOutlineLockClosed, HiOutlineTag } from "react-icons/hi2";
import PropTypes from "prop-types";
import { AuthContext } from "@/shared/contexts/auth-context";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import { formatCurrency } from "@/shared/lib/formatters";

const CheckoutForm = ({ paymentData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user, successToast } = useContext(AuthContext);
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [couponDraft, setCouponDraft] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const rent = Number(paymentData.amount);

  useEffect(() => {
    let active = true;
    setCouponStatus(appliedCoupon ? "Checking code…" : "");
    axiosSecure.post("/create-payment-intern", { amount: rent, coupon: appliedCoupon })
      .then((response) => {
        if (!active) return;
        setClientSecret(response.data.clientSecret);
        setDiscount(Number(response.data.discountAmount) || 0);
        if (appliedCoupon) setCouponStatus("Coupon applied");
      })
      .catch(() => {
        if (!active) return;
        setAppliedCoupon("");
        setCouponDraft("");
        setDiscount(0);
        setCouponStatus("That coupon is not valid. Check the code and try again.");
      });
    return () => { active = false; };
  }, [axiosSecure, rent, appliedCoupon]);

  const applyCoupon = () => {
    const code = couponDraft.trim().toUpperCase();
    if (!code) {
      setCouponStatus("Enter a coupon code first.");
      return;
    }
    setAppliedCoupon(code);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    setIsProcessing(true);
    setPaymentError("");
    const card = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card, billing_details: { email: user.email, name: user.displayName } },
    });

    if (error) {
      setPaymentError(error.message || "Payment was declined. Check the card details and try again.");
      setIsProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      try {
        await axiosSecure.post("/apartment-rent-info", {
          name: user.displayName,
          email: user.email,
          transactionId: paymentIntent.id,
          rent,
          month: paymentData.month,
          discount,
          coupon: appliedCoupon,
        });
        successToast("Rent payment completed");
        navigate("/dashboard/paymenthistory", { replace: true });
      } catch {
        setPaymentError("Payment succeeded, but the receipt could not be saved. Contact building support with your payment confirmation.");
        setIsProcessing(false);
      }
    }
  };

  const total = Math.max(0, rent - discount);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
      <aside className="surface-card p-6 sm:p-8">
        <p className="eyebrow text-primary">Payment summary</p>
        <dl className="mt-7 space-y-4">
          <div className="flex justify-between gap-4"><dt className="text-base-content/60">Monthly rent</dt><dd className="tabular font-mono font-semibold">{formatCurrency(rent)}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-base-content/60">Coupon discount</dt><dd className="tabular font-mono font-semibold text-success">−{formatCurrency(discount)}</dd></div>
          <div className="flex justify-between gap-4 border-t border-base-content/10 pt-5 text-lg"><dt className="font-bold">Total</dt><dd className="tabular font-mono text-2xl font-semibold">{formatCurrency(total)}</dd></div>
        </dl>
        <p className="mt-7 flex gap-2 rounded-2xl bg-base-200 p-4 text-sm leading-6 text-base-content/60"><HiOutlineLockClosed className="mt-1 shrink-0 text-primary" aria-hidden="true" />Card details are handled securely by Stripe and are not stored by Urban Dwell.</p>
      </aside>

      <form onSubmit={handleSubmit} className="surface-card p-6 sm:p-8">
        <div>
          <label htmlFor="coupon-code" className="mb-2 block text-sm font-bold">Coupon code <span className="font-normal text-base-content/45">(optional)</span></label>
          <div className="flex gap-2">
            <input id="coupon-code" value={couponDraft} onChange={(event) => setCouponDraft(event.target.value)} disabled={Boolean(appliedCoupon)} autoComplete="off" spellCheck={false} placeholder="Enter your code…" className="field-control min-w-0 flex-1 uppercase" />
            <button type="button" onClick={applyCoupon} disabled={Boolean(appliedCoupon)} className="inline-flex h-[3.25rem] items-center gap-2 rounded-xl bg-secondary px-5 font-bold text-secondary-content disabled:opacity-50"><HiOutlineTag aria-hidden="true" /> Apply</button>
          </div>
          {couponStatus ? <p className={`mt-2 flex items-center gap-2 text-sm font-medium ${couponStatus === "Coupon applied" ? "text-success" : "text-base-content/60"}`} aria-live="polite">{couponStatus === "Coupon applied" ? <HiOutlineCheckCircle aria-hidden="true" /> : null}{couponStatus}</p> : null}
        </div>

        <div className="mt-7">
          <p id="card-details-label" className="mb-2 text-sm font-bold">Card details</p>
          <div className="rounded-xl border border-base-content/15 bg-white px-4 py-4" role="group" aria-labelledby="card-details-label">
            <CardElement options={{ hidePostalCode: true, style: { base: { fontSize: "16px", color: "#162022", "::placeholder": { color: "#7c8a8c" } }, invalid: { color: "#b42318" } } }} />
          </div>
        </div>

        {paymentError ? <p className="mt-5 rounded-xl bg-error/10 px-4 py-3 text-sm font-medium text-error" role="alert">{paymentError}</p> : null}
        <button type="submit" disabled={!stripe || !clientSecret || isProcessing} className="mt-7 flex h-13 w-full items-center justify-center rounded-full bg-primary px-6 font-bold text-primary-content hover:bg-secondary disabled:cursor-wait disabled:opacity-55">{isProcessing ? "Processing payment…" : `Pay ${formatCurrency(total)}`}</button>
      </form>
    </div>
  );
};

CheckoutForm.propTypes = {
  paymentData: PropTypes.shape({
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    month: PropTypes.string.isRequired,
  }).isRequired,
};

export default CheckoutForm;
