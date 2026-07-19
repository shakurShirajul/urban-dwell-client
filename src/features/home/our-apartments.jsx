import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi2";
import ApartmentCard from "@/features/apartments/apartment-card";
import { AuthContext } from "@/shared/contexts/auth-context";
import { publicApi } from "@/shared/api/http-clients";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import { EmptyState, LoadingState } from "@/shared/components/ui/feedback";

const OurApartments = () => {
  const { user, successToast, errorToast } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: agreement = [] } = useQuery({
    queryKey: ["agreement", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const response = await axiosSecure.get(`/agreement?email=${user.email}`);
      return response.data;
    },
  });

  const { data: apartments = [], isLoading } = useQuery({
    queryKey: ["featuredApartments"],
    queryFn: async () => {
      const response = await publicApi.get("/apartments?page=0&limit=3");
      return response.data;
    },
  });

  const handleAgreement = async (apartment) => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: "/apartments" } } });
      return;
    }

    try {
      await axiosSecure.post(`/agreement?email=${user.email}`, {
        user_name: user.displayName,
        user_email: user.email,
        floor_no: apartment.floor_no,
        block_name: apartment.block_name,
        apartment_no: apartment.apartment_no,
        rent: apartment.rent,
      });
      await queryClient.invalidateQueries({ queryKey: ["agreement", user.email] });
      successToast("Apartment request submitted");
    } catch {
      errorToast("The request could not be submitted. Try again.");
    }
  };

  return (
    <section id="apartments" className="section-space bg-base-200">
      <div className="app-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-primary">Available now</p>
            <h2 className="section-title mt-5">Find your place in the building.</h2>
          </div>
          <Link to="/apartments" className="inline-flex items-center gap-2 font-bold text-primary hover:underline">
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
                handleAgreement={handleAgreement}
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
