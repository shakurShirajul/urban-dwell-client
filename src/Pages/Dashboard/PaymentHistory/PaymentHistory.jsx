import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/userAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import PaymentHistoryTable from "./PaymentHistoryTable";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  let url = `/apartment-rent-info?email=${user.email}`;

  const {
    data: paymentHistorys = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["paymentHistorys"],
    queryFn: async () => {
      const response = await axiosSecure.get(url, { withCredentials: true });
      return response.data;
    },
  });

  const handleSearchButton = (event) => {
    event.preventDefault();

    const searchInput = event.target.searchInput.value;

    console.log(searchInput);

    if (searchInput > 0 && searchInput < 13) {
      const month = months[searchInput - 1];
      url = `/apartment-rent-info/search?email=${user.email}&month=${month}`;
    } else {
      const lowerCaseSearchInput = searchInput.toLowerCase();
      url = `/apartment-rent-info/search?email=${user.email}&month=${lowerCaseSearchInput}`;
    }

    const res = axiosSecure.get(url);

    queryClient.setQueryData(["paymentHistorys"], res.data);
    refetch();
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        </div>
      ) : (
        <div className="font-mulish">
          <div className="space-y-5 mb-10">
            <div>
              <h1 className="text-4xl font-extrabold">Payment History</h1>
            </div>
            <form
              onSubmit={handleSearchButton}
              className="flex items-center max-w-xl mx-auto "
            >
              <input
                type="text"
                name="searchInput"
                placeholder="Search By Month Name or Month Number"
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="submit"
                className="p-2 bg-primary text-white border border-blue-500 rounded-r-md hover:bg-blue-900"
                value="Search"
              />
            </form>
          </div>
          <div className="overflow-x-auto border rounded-xl p-5">
            <table className="table table-zebra">
              <thead>
                <tr className="md:text-base lg:text-lg">
                  <th></th>
                  <th>Date (DD-MM-YY)</th>
                  <th>Transaction ID</th>
                  <th>Month</th>
                  <th>Coupon</th>
                  <th>Discount</th>
                  <th>Amount Pay</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistorys.map((paymentHistory, index) => (
                  <PaymentHistoryTable
                    index={index}
                    key={paymentHistory._id}
                    paymentHistory={paymentHistory}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
