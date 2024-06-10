import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';
import { useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../hooks/userAxiosSecure';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';

const CheckoutForm = ({ paymentData }) => {

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [disableCouponAddButton, setDisableCouponAddButton] = useState(false);
    const couponRef = useRef();

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user, successToast, errorToast } = useContext(AuthContext);
    const navigate = useNavigate();

    const rentPrice = paymentData?.amount;


    useEffect(() => {
        if (rentPrice > 0) {
            axiosSecure.post('/create-payment-intern', { amount: rentPrice, coupon: couponCode })
                .then(res => {
                    if (couponRef.current.value !== '') {
                        successToast("Coupon Added");
                        setDisableCouponAddButton(true);
                    }
                    setClientSecret(res.data.clientSecret);
                    setDiscountAmount(res.data.discountAmount);
                })
                .catch(err => {
                    console.log(err)
                    couponRef.current.value = '';
                    setCouponCode('')
                    errorToast("Invalid Coupon")

                });
        }
    }, [axiosSecure, rentPrice, couponCode]);

    const handleCouponInput = () => {
        const coupon = couponRef.current.value;
        setCouponCode(coupon);
    }

    const handleCouponCodeChange = (event) => {
        setCouponCode(event.target.value);
        console.log(couponCode);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setPaymentProcessing(true);

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('Payement Error', error);
        }
        else {
            console.log('Payment Method', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('confirm error');
        }
        else {

            if (paymentIntent.status === 'succeeded') {


                setTransactionId(paymentIntent.id);

                const payment = {
                    name: user.displayName,
                    email: user.email,
                    transactionId: paymentIntent.id,
                    rent: rentPrice,
                    month: paymentData.month,
                    discount: discountAmount,
                    coupon: couponCode
                }

                console.log(payment);

                axiosSecure.post('/apartment-rent-info', payment)
                    .then(response => {
                        successToast("Payment Succeeded");
                    })
                setTimeout(() => {
                    navigate('/dashboard/paymenthistory')
                }, 2000)

            }
        }
    }

    return (
        <div className='max-w-xl mx-auto'>
            <div className='p-6 rounded-md shadow-md bg-gray-50 border'>
                <div className=''>
                    <div className='flex items-center gap-2 space-y-2 mb-2'>
                        <p className="text-xl font-semibold py-2.5">Rent: <span>${rentPrice - discountAmount}</span></p>
                    </div>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <fieldset className="w-full space-y-1">
                                <div className="flex justify-center items-center gap-2">
                                    <div className='flex items-center gap-2 flex-1'>
                                        <label className="block text-lg font-semibold">Coupon Code:</label>
                                        <input
                                            type="text"
                                            placeholder="Coupon Code"
                                            ref={couponRef}
                                            className="flex flex-1 border py-2.5 rounded-md focus:ring-inset focus:dark:ring-violet-600 px-1"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        disabled={disableCouponAddButton}
                                        onClick={handleCouponInput}
                                        className='btn btn-active btn-secondary text-white text-base uppercase'>
                                        Add Coupon
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <CardElement
                                options={{
                                    hidePostalCode: true,
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                            padding: '20px 20px',

                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }} />
                        </div>
                        <div className='flex justify-end'>
                            <button className="btn btn-sm btn-primary text-base uppercase text-white" type="submit" disabled={!stripe || !clientSecret}>
                                Pay
                            </button>
                        </div>
                        <p className="text-red-600">{error}</p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CheckoutForm;