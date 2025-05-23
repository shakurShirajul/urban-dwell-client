import React from "react";
import CampaignIcon from "@mui/icons-material/Campaign";

const MakeAnnouncementForm = ({ handleAnnounce }) => {
  return (
    <div className="border rounded-xl shadow-md">
      <form
        onSubmit={handleAnnounce}
        className="container flex flex-col mx-auto space-y-12 rounded-xl"
      >
        <fieldset className="p-6 rounded-xl shadow-sm  space-y-5">
          <div className="">
            <label className="text-lg font-semibold dark:text-gray-400">
              Title:
            </label>
            <div>
              <input
                type="text"
                required
                name="title"
                placeholder="Announcement Title"
                className="input input-bordered w-full dark:text-gray-400"
              />
            </div>
          </div>
          <div className="">
            <label className="text-lg font-semibold dark:text-gray-400">
              Description:
            </label>
            <div>
              <textarea
                rows="10"
                required
                name="description"
                className="textarea textarea-bordered w-full dark:text-gray-400"
                placeholder="Announcement Description"
              ></textarea>
            </div>
          </div>
          <button className="flex items-center  justify-center btn bg-green-500 hover:bg-green-600 border-none text-white">
            <CampaignIcon />
            <span>Announce</span>
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default MakeAnnouncementForm;
