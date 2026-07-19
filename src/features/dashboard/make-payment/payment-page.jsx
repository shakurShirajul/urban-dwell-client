import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import CheckoutForm from "./checkout-form";
import { PageHeading } from "@/shared/components/ui/feedback";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const PaymentPage = () => {
  const { state: paymentData } = useLocation();
  if (!paymentData?.amount || !paymentData?.month) return <Navigate to="/dashboard/makepayment" replace />;

  return (
    <div>
      <PageHeading eyebrow="Secure checkout" title="Complete payment" description="Apply an optional coupon, enter your card, and review the final amount." />
      <Elements stripe={stripePromise}><CheckoutForm paymentData={paymentData} /></Elements>
    </div>
  );
};

export default PaymentPage;
