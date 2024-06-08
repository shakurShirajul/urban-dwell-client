import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/userAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';
import PaymentHistoryTable from './PaymentHistoryTable';

const PaymentHistory = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: paymentHistorys = [], refetch } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/apartment-rent-info?email=${user.email}`, { withCredentials: true });
            return response.data;
        }
    })

    console.log(paymentHistorys);

    return (
        <div>

            <div className="flex items-center mb-6">
                <input
                    type="text"
                    placeholder="Search by month name or number"
                    className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={() => { }}
                    className="p-2 bg-blue-500 text-white border border-blue-500 rounded-r-md hover:bg-blue-600"
                >
                    Search
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className='text-base'>
                            <th></th>
                            <th>Date (DD-MM-YY)</th>
                            <th>Transaction ID</th>
                            <th>Month</th>
                            <th>Coupon</th>
                            <th>Discount</th>
                            <th>Amount Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paymentHistorys.map((paymentHistory, index) =>
                                <PaymentHistoryTable
                                    index={index}
                                    key={paymentHistory._id}
                                    paymentHistory={paymentHistory} />
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;