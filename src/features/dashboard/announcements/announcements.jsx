import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AnnouncementsCard from "./announcements-card";
import { AuthContext } from "@/shared/contexts/auth-context";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import { EmptyState, LoadingState, PageHeading } from "@/shared/components/ui/feedback";

const Announcements = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: announcements = [], isLoading, isError } = useQuery({
    queryKey: ["announcements", user?.email],
    queryFn: async () => (await axiosSecure.get(`/announcements?email=${user.email}`)).data,
  });

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
