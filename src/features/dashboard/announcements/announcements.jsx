import { useContext } from "react";
import AnnouncementsCard from "./announcements-card";
import { AuthContext } from "@/shared/contexts/auth-context";
import { EmptyState, LoadingState, PageHeading } from "@/shared/components/ui/feedback";
import useAnnouncements from "./hooks/use-announcements";

const Announcements = () => {
  const { user } = useContext(AuthContext);
  const { data: announcements = [], isLoading, isError } = useAnnouncements(user?.email);

  if (isLoading) return <LoadingState label="Loading announcements…" />;

  return (
    <div>
      <PageHeading eyebrow="Building updates" title="Announcements" description="Important notices and updates from the Urban Dwell team." />
      <div className="space-y-4">
        {isError ? (
          <EmptyState title="Announcements could not be loaded" description="Refresh the page to try again." />
        ) : announcements.length ? announcements.map((announcement) => (
          <AnnouncementsCard key={announcement._id} announcement={announcement} />
        )) : (
          <EmptyState title="You are all caught up" description="New building announcements will appear here." />
        )}
      </div>
    </div>
  );
};

export default Announcements;
