"use client";


import { useState, type FormEvent } from "react";
import { HiOutlineMegaphone } from "react-icons/hi2";

const MakeAnnouncementForm = ({ onPublish }: { onPublish: (form: HTMLFormElement) => Promise<boolean> }) => {
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPublishing(true);
    const succeeded = await onPublish(event.currentTarget);
    if (succeeded) event.currentTarget.reset();
    setIsPublishing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="surface-card max-w-3xl p-6 sm:p-8">
      <div>
        <label htmlFor="announcement-title" className="mb-2 block text-sm font-bold">Announcement title</label>
        <input id="announcement-title" type="text" required name="title" autoComplete="off" placeholder="Example: Water maintenance on Tuesday…" className="field-control" />
      </div>
      <div className="mt-5">
        <label htmlFor="announcement-description" className="mb-2 block text-sm font-bold">Message</label>
        <textarea id="announcement-description" rows={8} required name="description" autoComplete="off" placeholder="Explain what residents need to know and what action to take…" className="field-control min-h-48 resize-y" />
      </div>
      <div className="mt-6 flex justify-end">
        <button type="submit" disabled={isPublishing} className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-bold text-primary-content hover:bg-secondary disabled:cursor-wait disabled:opacity-60">
          <HiOutlineMegaphone aria-hidden="true" /> {isPublishing ? "Publishing…" : "Publish announcement"}
        </button>
      </div>
    </form>
  );
};


export default MakeAnnouncementForm;
