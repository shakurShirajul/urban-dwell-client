"use client";


import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CheckoutForm from "./checkout-form";
import { PageHeading } from "@/shared/components/ui/feedback";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const paymentData = {
    amount: Number(searchParams.get("amount")),
    month: searchParams.get("month") ?? "",
  };
  if (!paymentData.amount || !paymentData.month) {
    return <Link href="/dashboard/makepayment">Return to payment details</Link>;
  }

  return (
    <div>
      <PageHeading eyebrow="Secure checkout" title="Complete payment" description="Apply an optional coupon, enter your card, and review the final amount." />
      <Elements stripe={stripePromise}><CheckoutForm paymentData={paymentData} /></Elements>
    </div>
  );
};

export default PaymentPage;
