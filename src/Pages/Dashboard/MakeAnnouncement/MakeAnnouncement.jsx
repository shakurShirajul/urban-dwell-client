import React from 'react';
import MakeAnnouncementForm from './MakeAnnouncementForm';

const MakeAnnouncement = () => {
    return (
        <div>
            <div className='space-y-5'>
                <p className='text-4xl font-semibold'>Make An Announcement</p>
                <MakeAnnouncementForm />
            </div>
        </div>
    );
};

export default MakeAnnouncement;