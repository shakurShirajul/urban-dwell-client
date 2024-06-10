import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/userAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';
import { useNavigate } from 'react-router-dom';


const MakePayment = () => {

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
            <section className="p-6">
                <form onSubmit={handleMakePaymentForm} className="container flex flex-col mx-auto space-y-12">
                    <fieldset className="p-6 rounded-xl border border-gray-600 shadow-sm dark:bg-gray-50">
                        <h1 className='text-4xl font-extrabold text-gray-800 mb-5'>Make Payment:</h1>
                        <div className='space-y-5 font-roboto'>
                            <div className="flex flex-col lg:flex-row gap-5">
                                <div className='flex-1 space-y-2'>
                                    <label className="text-lg font-medium">Name: </label>
                                    <input
                                        type="text"
                                        disabled
                                        value={user_name}
                                        className="w-full text-black rounded-lg py-2.5 pl-2 border" />
                                </div>
                                <div className='flex-1 space-y-2'>
                                    <label className="text-lg font-medium">Email: </label>
                                    <input
                                        type="email"
                                        disabled
                                        value={user_email}
                                        className="w-full text-black rounded-lg py-2.5 pl-2 border" />
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row gap-5'>
                                <div className='flex-1 space-y-2'>
                                    <p className="text-lg font-medium">Block Name: </p>
                                    <input
                                        type="text"
                                        disabled
                                        value={block_name}
                                        className="w-full text-black rounded-lg py-2.5 pl-2 border" />
                                </div>
                                <div className='flex-1 space-y-2'>
                                    <p className="text-lg font-medium">Floor No:</p>
                                    <input
                                        disabled
                                        value={floor_no}
                                        type="text"
                                        className="w-full text-black rounded-lg py-2.5 pl-2 border" />
                                </div>
                                <div className='flex-1 space-y-2'>
                                    <p className="text-lg font-medium">Room No:</p>
                                    <input
                                        type="text"
                                        disabled
                                        value={apartment_no}
                                        className="w-full text-black rounded-lg py-2.5 pl-2 border" />
                                </div>
                                <div className='flex-1 space-y-2'>
                                    <label className="text-lg font-medium">Rent:</label>
                                    <input
                                        type="text"
                                        disabled
                                        value={`$${rent}`}
                                        className="w-full text-black rounded-lg py-2.5 pl-2 border" />
                                </div>
                                <div className='flex-1 space-y-2'>
                                    <label className="text-lg font-medium">Payment Month:</label>
                                    <select
                                        name='calender'
                                        required
                                        className="select select-bordered w-full max-w-xs focus:outline-none">
                                        <option disabled selected value="">Select A Month</option>
                                        <option value="january">January</option>
                                        <option value="february">February</option>
                                        <option value="march">March</option>
                                        <option value="april">April</option>
                                        <option value="may">May</option>
                                        <option value="june">June</option>
                                        <option value="july">July</option>
                                        <option value="august">August</option>
                                        <option value="september">September</option>
                                        <option value="october">October</option>
                                        <option value="november">November</option>
                                        <option value="december">December</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <input type="submit" value="Submit" className="btn btn-success text-white text-base" />
                            </div>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div >
    );
};

export default MakePayment;