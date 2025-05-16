import { useQuery } from "@tanstack/react-query";
import ApartmentCard from "../Apartments/ApartmentCard";
import useAxiosSecure from "../../hooks/userAxiosSecure";

const OurApartments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: agreement = [], refetch } = useQuery({
    queryKey: ["agreement"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/agreement?email=${user.email}`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const handleAgreement = async (apartment) => {
    const agreementData = {
      user_name: user.displayName,
      user_email: user.email,
      floor_no: apartment.floor_no,
      block_name: apartment.block_name,
      apartment_no: apartment.apartment_no,
      rent: apartment.rent,
    };
  };

  const {
    data: ourApartments = [],
    refetch: appartmentRefetch,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["ourApartments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/apartments?page=${1}&limit=${3}`, {
        withCredentials: true,
      });

      return res.data;
    },
  });

  return (
    <div>
      <div className="max-w-7xl mx-auto my-14">
        <h2 className="text-4xl font-extrabold text-gray-800 font-mulish text-center my-10">
          Our Apartments
        </h2>
        <div className="flex justify-center">
          <div className="grid mx-5 md:mx-0 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {isLoading ? (
              <div className="flex items-center justify-center col-span-full">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                  <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                  <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                </div>
              </div>
            ) : (
              ourApartments.map((ourApartment) => (
                <ApartmentCard
                  key={ourApartment._id}
                  apartment={ourApartment}
                  handleAgreement={handleAgreement}
                  agreement={agreement}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OurApartments;
