import axios from "axios";
import ApartmentCard from "./ApartmentCard";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { ToastContainer } from "react-toastify";
import useAxiosSecure from "../../hooks/userAxiosSecure";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Apartments = () => {
  const { user, successToast } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const { data: agreement = [], refetch } = useQuery({
    queryKey: ["agreement"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/agreement?email=${user.email}`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const {
    data: apartments = [],
    refetch: appartmentRefetch,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/apartments?page=${currentPage}&limit=${itemsPerPage}`,
        { withCredentials: true }
      );

      return res.data;
    },
  });

  //
  const { data: apartmentsLength = [] } = useQuery({
    queryKey: ["apartmentsLength"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/appartment/length`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const numberOfPages = Math.ceil(apartmentsLength.length / itemsPerPage);

  console.log(`Number of pages ${numberOfPages}`);

  const pages = [...Array(numberOfPages).keys()];

  const handleAgreement = async (apartment) => {
    const agreementData = {
      user_name: user.displayName,
      user_email: user.email,
      floor_no: apartment.floor_no,
      block_name: apartment.block_name,
      apartment_no: apartment.apartment_no,
      rent: apartment.rent,
    };
    // console.log(agreementData);
    axiosSecure
      .post(`/agreement?email=${user.email}`, agreementData, {
        withCredentials: true,
      })
      .then((response) => {
        refetch();
        successToast("Agreement created");
      })
      .catch((error) => {
        // console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    appartmentRefetch();
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="pt-28">
        <Helmet>
          <title>Apartments || Urban Dwell</title>
        </Helmet>
        {/* Apartments Card */}
        <div className="flex justify-center">
          <div className="grid mx-5 md:mx-0 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {isLoading ? (
              <div className="flex items-center justify-center col-span-full  min-h-screen">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                  <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                  <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                </div>
              </div>
            ) : (
              apartments.map((apartment) => (
                <ApartmentCard
                  key={apartment._id}
                  apartment={apartment}
                  handleAgreement={handleAgreement}
                  agreement={agreement}
                />
              ))
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
      {/* Pagination */}
      <div className="flex justify-center my-10">
        <div className="flex justify-center space-x-1 dark:text-gray-800">
          <button
            onClick={handlePrevPage}
            type="button"
            className="btn btn-square"
          >
            {/* Backward Button */}
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          {pages.map((page) => (
            <input
              key={page}
              onClick={() => handlePageClick(page)}
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label={page}
              checked={currentPage === page ? "selected" : undefined}
            />
          ))}
          <button
            onClick={handleNextPage}
            type="button"
            className="btn btn-square"
          >
            {/* Forward Button */}
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Apartments;
