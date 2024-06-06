import axios from 'axios';
import AparmentsCard from './AparmentsCard';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import { ToastContainer } from 'react-toastify';

const Apartments = () => {
    const { user, successToast } = useContext(AuthContext)
    const { data: apartments = [], isPending, isLoading } = useQuery({
        queryKey: ['apartments'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/apartments`, { withCredentials: true })
            return res.data;
        }
    })

    const handleAgreement = async (apartment) => {
        const agreementData = {
            user_name: user.displayName,
            user_email: user.email,
            floor_no: apartment.floor_no,
            block_name: apartment.block_name,
            apartment_no: apartment.apartment_no,
            rent: apartment.rent,
        }
        console.log(agreementData)
        axios.post(`http://localhost:5000/agreement?email=${user.email}`, agreementData, { withCredentials: true })
            .then(response => {
                successToast("Agreement created");
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    return (
        <div className='my-10'>
            <div className='flex justify-center'>
                <div className='grid grid-cols-3 gap-10'>
                    {
                        apartments.map(apartment =>
                            <AparmentsCard key={apartment._id} apartment={apartment} handleAgreement={handleAgreement} />
                        )
                    }
                </div>
            </div>
            <div className='flex justify-center mt-10'>
                <div className="flex justify-center space-x-1 dark:text-gray-800">
                    <button title="previous" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100">
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button type="button" title="Page 1" className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-50 dark:text-violet-600 dark:border-violet-600">1</button>
                    <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-50 dark:border-gray-100" title="Page 2">2</button>
                    <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-50 dark:border-gray-100" title="Page 3">3</button>
                    <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-50 dark:border-gray-100" title="Page 4">4</button>
                    <button title="next" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100">
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Apartments;