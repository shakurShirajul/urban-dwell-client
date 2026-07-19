import { useContext } from "react";
import MakeAnnouncementForm from "./make-announcement-form";
import { AuthContext } from "@/shared/contexts/auth-context";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import { PageHeading } from "@/shared/components/ui/feedback";

const MakeAnnouncement = () => {
  const { user, successToast, errorToast } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const publishAnnouncement = async (form) => {
    try {
      await axiosSecure.post(`/announcement?email=${user.email}`, {
        announce_title: form.title.value,
        announce_description: form.description.value,
        announce_author_email: user.email,
      });
      successToast("Announcement published");
      return true;
    } catch {
      errorToast("The announcement could not be published. Try again.");
      return false;
    }
  };

  return (
    <div>
      <PageHeading eyebrow="Building communication" title="New announcement" description="Write a clear update and tell residents what they need to do next." />
      <MakeAnnouncementForm onPublish={publishAnnouncement} />
    </div>
  );
};

export default MakeAnnouncement;
