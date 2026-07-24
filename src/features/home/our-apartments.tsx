"use client";


import { useContext } from "react";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";
import ApartmentCard from "@/features/apartments/apartment-card";
import { AuthContext } from "@/shared/contexts/auth-context";
import { EmptyState, LoadingState } from "@/shared/components/ui/feedback";
import { useApartmentAgreement, useApartments } from "@/features/apartments/hooks/use-apartment-queries";
import useApartmentRequest from "@/features/apartments/hooks/use-apartment-request";

const OurApartments = () => {
  const { user } = useContext(AuthContext);

  const { data: agreement = [] } = useApartmentAgreement(user?.email);
  const { data: apartmentPage = { apartments: [] }, isLoading } = useApartments({ limit: 3 });
  const apartments = apartmentPage.apartments;
  const { requestApartment } = useApartmentRequest();

  return (
    <section id="apartments" className="section-space scroll-mt-20 bg-base-200">
      <div className="app-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-primary">Available now</p>
            <h2 className="section-title mt-5">Find your place in the building.</h2>
          </div>
          <Link href="/apartments" className="inline-flex items-center gap-2 font-bold text-primary hover:underline">
            Browse every apartment <HiOutlineArrowRight aria-hidden="true" />
          </Link>
        </div>

        {isLoading ? (
          <LoadingState label="Loading apartments…" />
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {apartments.length ? apartments.map((apartment) => (
              <ApartmentCard
                key={apartment._id}
                apartment={apartment}
                handleAgreement={requestApartment}
                agreement={agreement}
              />
            )) : (
              <EmptyState title="No apartments are listed yet" description="Check back soon for newly available homes." />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurApartments;
