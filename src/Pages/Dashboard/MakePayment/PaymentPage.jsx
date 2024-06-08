import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const PaymentPage = () => {
    const location = useLocation();
    const paymentData = location.state;
    console.log(paymentData);

    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm paymentData={paymentData} />
                </Elements>
            </div>
        </div >
    );
};

export default PaymentPage;