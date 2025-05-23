import React from "react";

const AnnouncementsCard = ({ announcement }) => {
  const currentDate = new Date(announcement.announce_date);

  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  return (
    <div className="w-full border rounded-lg shadow-md p-5">
      <div>
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">
            {announcement.announce_title}
          </h1>
          <h7 className="text-sm font-semibold">
            Date: {`${date}-${month}-${year}`}
          </h7>
        </div>
        <p className="text-base font-medium">
          {announcement.announce_description}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementsCard;
