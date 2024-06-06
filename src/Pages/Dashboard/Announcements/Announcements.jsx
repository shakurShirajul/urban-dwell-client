import { useQuery } from '@tanstack/react-query';
import AnnouncementsCard from './AnnouncementsCard';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';
import useAxiosSecure from '../../../hooks/userAxiosSecure';

const Announcements = () => {

    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: announcements = [], refetch } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/announcements?email=${user.email}`, { withCredentials: true });
            return response.data;
        }
    })

    console.log("Announcements ",announcements);

    return (
        <div>
            <p className='text-4xl font-semibold mb-5'>Announcements</p>
            <div className='space-y-2'>
                {
                    announcements.map(announcement =>
                        <AnnouncementsCard announcement={announcement} />
                    )
                }
            </div>
        </div>
    );
};

export default Announcements;