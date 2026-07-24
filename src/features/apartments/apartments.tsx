"use client";


import { useContext, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import ApartmentCard from "./apartment-card";
import { AuthContext } from "@/shared/contexts/auth-context";
import { EmptyState, LoadingState } from "@/shared/components/ui/feedback";
import { useApartmentAgreement, useApartmentCount, useApartments } from "./hooks/use-apartment-queries";
import useApartmentRequest from "./hooks/use-apartment-request";

const Apartments = () => {
  const { user } = useContext(AuthContext);
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);
  const currentCursor = cursorHistory.at(-1);
  const itemsPerPage = 6;

  const { data: agreement = [] } = useApartmentAgreement(user?.email);
  const {
    data: apartmentPage = { apartments: [], hasMore: false },
    isLoading,
    isError,
    isFetching,
  } = useApartments({ after: currentCursor, limit: itemsPerPage, preservePrevious: true });
  const { apartments, hasMore } = apartmentPage;
  const { data: apartmentsLength = { length: 0 } } = useApartmentCount();
  const { requestApartment } = useApartmentRequest();

  const goToNextPage = () => {
    const nextCursor = apartments.at(-1)?._id;
    if (!nextCursor) return;
    setCursorHistory((history) => [...history, nextCursor]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPreviousPage = () => {
    setCursorHistory((history) => history.slice(0, -1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-base-200 pb-20 pt-32">
      <div className="app-shell">
        <header className="grid gap-6 border-b border-base-content/10 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Available residences</p>
            <h1 className="section-title mt-5">Choose the apartment that fits your day.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-base-content/60">
              Compare floor, block, and monthly rent. Sign in only when you are ready to submit a request.
            </p>
          </div>
          <p className="eyebrow rounded-full border border-base-content/10 bg-base-100 px-4 py-3 text-base-content/55">
            {apartmentsLength.length || 0} residences listed
          </p>
        </header>

        {isLoading ? (
          <LoadingState label="Loading available apartments…" />
        ) : isError ? (
          <EmptyState title="Apartments could not be loaded" description="Check your connection and refresh the page to try again." />
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy={isFetching}>
            {apartments.length ? apartments.map((apartment) => (
              <ApartmentCard
                key={apartment._id}
                apartment={apartment}
                handleAgreement={requestApartment}
                agreement={agreement}
              />
            )) : (
              <EmptyState title="No apartments on this page" description="Return to the previous page or check back for new availability." />
            )}
          </div>
        )}

        {cursorHistory.length > 0 || hasMore ? (
          <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Apartment pages">
            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={cursorHistory.length === 0}
              className="grid size-11 place-items-center rounded-full border border-base-content/15 bg-base-100 disabled:opacity-35"
              aria-label="Previous page"
            >
              <HiOutlineChevronLeft aria-hidden="true" />
            </button>
            <span className="grid h-11 min-w-24 place-items-center rounded-full bg-primary px-4 font-mono text-sm font-semibold text-primary-content">
              Page {cursorHistory.length + 1}
            </span>
            <button
              type="button"
              onClick={goToNextPage}
              disabled={!hasMore}
              className="grid size-11 place-items-center rounded-full border border-base-content/15 bg-base-100 disabled:opacity-35"
              aria-label="Next page"
            >
              <HiOutlineChevronRight aria-hidden="true" />
            </button>
          </nav>
        ) : null}
      </div>
    </div>
  );
};

export default Apartments;
