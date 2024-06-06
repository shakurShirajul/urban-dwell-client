import React from 'react';

const MakeAnnouncementForm = ({handleAnnounce}) => {
    return (
        <div className='font-poppins border rounded-xl'>
            <form onSubmit={handleAnnounce} className="container flex flex-col mx-auto space-y-12 rounded-xl">
                <fieldset className="p-6 rounded-xl shadow-sm dark:bg-gray-50 space-y-5" >
                    <div className="">
                        <label className="text-lg">Title:</label>
                        <div>
                            <input type="text" required name='title' placeholder="Announcement Title" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="">
                        <label className="text-lg">Description:</label>
                        <div>
                            <textarea rows='10' required name='description' className="textarea textarea-bordered w-full" placeholder="Announcement Description"></textarea>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-success text-white" value="Announce" />
                </fieldset>
            </form>
        </div>
    );
};

export default MakeAnnouncementForm;