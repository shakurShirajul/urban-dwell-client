import React, { useContext } from 'react';
import MakeAnnouncementForm from './MakeAnnouncementForm';
import { AuthContext } from '../../../Providers/AuthProviders';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

const MakeAnnouncement = () => {
    const { user,successToast } = useContext(AuthContext);

    const handleAnnounce = (event) => {
        event.preventDefault();

        const form = event.target;

        const announcementData = {
            announce_title: form.title.value,
            announce_description: form.description.value,
            announce_author_email: user.email,
        }

        axios.post(`http://localhost:5000/announcement?email=${user.email}`, announcementData, { withCredentials: true })
        .then(res=>{
            successToast("Announcement Created");
            form.reset();
        })

    }
    return (
        <div>
            <div className='space-y-5'>
                <p className='text-4xl font-semibold'>Make An Announcement</p>
                <MakeAnnouncementForm handleAnnounce={handleAnnounce}/>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default MakeAnnouncement;