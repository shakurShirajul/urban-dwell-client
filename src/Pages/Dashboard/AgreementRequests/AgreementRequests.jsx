import AgreementRequestsTable from './AgreementRequestsTable';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/userAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';
import { ToastContainer } from 'react-toastify';

const AgreementRequests = () => {

    const { user, successToast, updateToast } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: agereementsRequests = [], refetch } = useQuery({
        queryKey: ['agereementRequest'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agreements/requests?email=${user.email}`, { withCredentials: true })
            return res.data;
        }
    })

    const handleAcceptButton = (id) => {

        axiosSecure.patch(`/agreements/requests/updates?status=accepted&id=${id}&email=${user.email}`, { withCredentials: true })
            .then(response => {
                refetch();
                successToast("Agreement Accepted");
            })
    }

    const handleRejectButton = (id) => {
        axiosSecure.patch(`/agreements/requests/updates?status=rejected&id=${id}&email=${user.email}`, { withCredentials: true })
            .then(response => {
                refetch();
                updateToast("Agreement Rejected");
            })
    }

    return (
        <div className='font-mulish'>
            <p className='text-4xl font-semibold mb-5'>AgreementRequest</p>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead className='text-lg text-black font-bold'>
                        <tr>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Floor No</th>
                            <th>Block Name</th>
                            <th>Room No</th>
                            <th>Rent</th>
                            <th>Agreement Request Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            agereementsRequests.map(agereementRequest =>
                                <AgreementRequestsTable key={agereementRequest._id} agereementRequest={agereementRequest} handleAcceptButton={handleAcceptButton} handleRejectButton={handleRejectButton} />
                            )
                        }
                    </tbody>
                </table>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default AgreementRequests;