import { HiOutlineMegaphone } from "react-icons/hi2";
import PropTypes from "prop-types";
import { formatDate } from "@/shared/lib/formatters";

const AnnouncementsCard = ({ announcement }) => (
  <article className="surface-card p-6 sm:p-8">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-2xl text-primary">
        <HiOutlineMegaphone aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="break-words font-display text-2xl font-semibold tracking-tight">{announcement.announce_title}</h2>
          <time className="eyebrow shrink-0 text-base-content/45" dateTime={announcement.announce_date}>{formatDate(announcement.announce_date)}</time>
        </div>
        <p className="mt-4 whitespace-pre-wrap break-words leading-7 text-base-content/65">{announcement.announce_description}</p>
      </div>
    </div>
  </article>
);

AnnouncementsCard.propTypes = {
  announcement: PropTypes.shape({
    announce_title: PropTypes.string.isRequired,
    announce_date: PropTypes.string.isRequired,
    announce_description: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnnouncementsCard;
