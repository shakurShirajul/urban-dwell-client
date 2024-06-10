import React from 'react';
import ManageMembersTable from './ManageMembersTable';

const ManageMembers = () => {
    return (
        <div className='space-y-5'>
            <p className='text-4xl font-extrabold text-gray-800'>Members Of Urban Dwell</p>
            <ManageMembersTable/>
        </div>
    );
};

export default ManageMembers;