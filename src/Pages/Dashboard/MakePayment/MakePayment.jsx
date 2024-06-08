import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/userAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';
import { useNavigate } from 'react-router-dom';


const MakePayment = () => {

    // member name, email, floor, block name, apartment no, rent
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { data: userPaymentData = [], refetch } = useQuery({
        queryKey: ['userPaymentData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/specific/${user.email}`, { withCredentials: true })
            return res.data;
        }
    })

    const { user_name, user_email, block_name, floor_no, apartment_no, rent } = userPaymentData;

    const handleMakePaymentForm = (event) => {
        event.preventDefault();
        const paymentMonth = event.target.calender.value;

        const paymentData = {
            month: paymentMonth,
            amount: rent,
        }

        navigate(`/dashboard/paymentpage`, { state: paymentData });
    }
    return (
        <div>
            {/* <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements> */}
            <section className="p-6 font-roboto">
                <form onSubmit={handleMakePaymentForm} className="container flex flex-col mx-auto space-y-12">
                    <fieldset className="p-6 rounded-xl border border-gray-600 shadow-sm dark:bg-gray-50">
                        <h1 className='text-3xl font-semibold'>Make Payment:</h1>
                        <div className='space-y-5'>
                            <div className="flex gap-5">
                                <div className='flex-1 space-y-2'>
                                    <label className="text-lg">Member Name: </label>
                                    <input
                                        type="text"
                                        disabled
                                        value={user_name}
                                        className="w-full text-black rounded-lg py-2.5 pl-2 border" />
                                </div>
                                <div className='flex-1 space-y-2'>
                                    <label className="text-lg">Email: </label>
                                    <input
                                        type="email"
                                        disabled
                                        value={user_email}
                                        className="w-full text-black rounded-lg py-2.5 pl-2 border" />
                                </div>
                            </div>
                            <div className='flex gap-5'>
                                <div className='flex-1 space-y-2'>
                                    <p className="text-lg">Block Name: </p>
                                    <input
                                        type="text"
                                        disabled
                                        value={block_name}
                                        className="w-full text-black rounded-lg py-2.5 pl-2 border" />
                                </div>
                                <div className='flex-1 space-y-2'>
                                    <p className="text-lg">Floor No:</p>
                                    <input
                                        disabled
                                        value={floor_no}
                                        type="text"
                                        className="w-full text-black rounded-lg py-2.5 pl-2 border" />
                                </div>
                                <div className='flex-1 space-y-2'>
                                    <p className="text-lg">Room No:</p>
                                    <input
                                        type="text"
                                        disabled
                                        value={apartment_no}
                                        className="w-full text-black rounded-lg py-2.5 pl-2 border" />
                                </div>
                                <div className='flex-1 space-y-2'>
                                    <label className="text-lg">Rent:</label>
                                    <input
                                        type="text"
                                        disabled
                                        value={`$${rent}`}
                                        className="w-full text-black rounded-lg py-2.5 pl-2 border" />
                                </div>
                                <div className='flex-1 space-y-2'>
                                    <label className="text-lg">Payment Month:</label>
                                    <select
                                        name='calender'
                                        required
                                        className="select select-bordered w-full max-w-xs focus:outline-none">
                                        <option disabled selected value="">Select A Month</option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <input type="submit" value="Make Payment" className="btn btn-success text-white text-base" />
                            </div>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div >
    );
};

export default MakePayment;