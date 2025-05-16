import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/userAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProviders";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import CouponCodeTable from "./CouponCodeTable";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { successToast } = useContext(AuthContext);

  const {
    data: couponCodes = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["couponCodes"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/coupon-code`);
      return res.data;
    },
  });

  const handleCreateCoupon = (event) => {
    event.preventDefault();
    const form = event.target;

    const couponData = {
      couponCode: form.couponCode.value,
      couponDiscount: form.couponDiscount.value,
      couponDescription: form.couponDescription.value,
    };
    axiosSecure.post(`/create-coupon`, couponData).then((response) => {
      console.log(response.data);
      successToast("Coupon created successfully");
      refetch();
      form.reset();
    });
  };

  const handleCouponDisable = (couponId) => {
    axiosSecure.delete(`/delete-coupon/${couponId}`).then((response) => {
      console.log(response.data);
      successToast("Coupon disabled successfully");
      refetch();
    });
  };

  console.log(couponCodes);

  return (
    <div>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        </div>
      ) : (
        <div className="p-5 font-roboto">
          <p className="text-4xl font-extrabold mb-5">Manage Coupons</p>
          <div>
            <button
              className="btn btn-success w-full border-none text-white text-base font-bold mb-5"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              <ConfirmationNumberIcon />
              Add Coupon
            </button>
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <form onSubmit={handleCreateCoupon} className="modal-box">
                <div className="space-y-2">
                  <div className="flex gap-5">
                    <div className="space-y-1 flex-1">
                      <p className="font-semibold">Coupon Code: </p>
                      <input
                        type="text"
                        name="couponCode"
                        className="w-full text-black rounded-lg py-1 pl-2 border"
                      />
                    </div>
                    <div className="space-y-1 flex-1">
                      <p className="font-semibold">Dsicount Percentage(%): </p>
                      <input
                        type="number"
                        name="couponDiscount"
                        className="w-full text-black rounded-lg py-1 px-2 border"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold">Coupon Description:</p>
                    <input
                      type="text"
                      name="couponDescription"
                      className="w-full text-black rounded-lg py-1 pl-2.5 border"
                    />
                  </div>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn bg-red-600 border-none hover:bg-red-800 text-white">
                      <CloseIcon />
                      Cancel
                    </button>
                  </form>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-success text-white text-base font-bold "
                    >
                      <SaveIcon />
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </dialog>

            <div className="overflow-x-auto bg-gray-100 text-gray-800 rounded-md shadow-md">
              <table className="table ">
                {/* head */}
                <thead className="text-base font-semibold">
                  <tr>
                    <th>SN</th>
                    <th>Coupon Code</th>
                    <th>Discount Percentage</th>
                    <th>Coupon Description</th>
                    <th>Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {couponCodes.map((couponCode, index) => (
                    <CouponCodeTable
                      couponCode={couponCode}
                      index={index}
                      handleCouponDisable={handleCouponDisable}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
