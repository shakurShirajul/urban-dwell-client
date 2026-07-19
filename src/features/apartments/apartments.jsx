import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import ApartmentCard from "./apartment-card";
import { AuthContext } from "@/shared/contexts/auth-context";
import { publicApi } from "@/shared/api/http-clients";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import { EmptyState, LoadingState } from "@/shared/components/ui/feedback";

const Apartments = () => {
  const { user, successToast, errorToast } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedPage = Number(searchParams.get("page") || 1);
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage - 1 : 0;
  const itemsPerPage = 6;

  const { data: agreement = [] } = useQuery({
    queryKey: ["agreement", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const response = await axiosSecure.get(`/agreement?email=${user.email}`);
      return response.data;
    },
  });

  const { data: apartments = [], isLoading, isError } = useQuery({
    queryKey: ["apartments", currentPage, itemsPerPage],
    queryFn: async () => {
      const response = await publicApi.get(`/apartments?page=${currentPage}&limit=${itemsPerPage}`);
      return response.data;
    },
  });

  const { data: apartmentsLength = { length: 0 } } = useQuery({
    queryKey: ["apartmentsLength"],
    queryFn: async () => {
      const response = await publicApi.get("/appartment/length");
      return response.data;
    },
  });

  const pageCount = Math.max(1, Math.ceil((apartmentsLength.length || 0) / itemsPerPage));

  const changePage = (page) => {
    setSearchParams({ page: String(page + 1) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <div className="min-h-screen bg-base-200 pb-20 pt-32">
      <Helmet>
        <title>Available Apartments | Urban Dwell</title>
        <meta name="description" content="Browse apartments currently available at Urban Dwell." />
      </Helmet>

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
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {apartments.length ? apartments.map((apartment) => (
              <ApartmentCard
                key={apartment._id}
                apartment={apartment}
                handleAgreement={handleAgreement}
                agreement={agreement}
              />
            )) : (
              <EmptyState title="No apartments on this page" description="Return to the previous page or check back for new availability." />
            )}
          </div>
        )}

        {pageCount > 1 ? (
          <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Apartment pages">
            <button
              type="button"
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 0}
              className="grid size-11 place-items-center rounded-full border border-base-content/15 bg-base-100 disabled:opacity-35"
              aria-label="Previous page"
            >
              <HiOutlineChevronLeft aria-hidden="true" />
            </button>
            {Array.from({ length: pageCount }, (_, page) => (
              <button
                key={page}
                type="button"
                onClick={() => changePage(page)}
                className={`grid size-11 place-items-center rounded-full font-mono text-sm font-semibold ${currentPage === page ? "bg-primary text-primary-content" : "bg-base-100 hover:bg-base-300"}`}
                aria-current={currentPage === page ? "page" : undefined}
                aria-label={`Page ${page + 1}`}
              >
                {page + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage >= pageCount - 1}
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
