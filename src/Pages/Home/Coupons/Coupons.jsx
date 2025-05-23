import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const Coupons = () => {
  const axiosPublic = useAxiosPublic();

  const { data: coponsDisplays = [], refetch } = useQuery({
    queryKey: ["coponsDisplays"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/coupon-code`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto" id="coupon">
      <h2 className="text-4xl text-center font-extrabold">
        Get Exciting Coupon!
      </h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <div className="grid">
          {coponsDisplays.map((couponsDisplay) => (
            <SwiperSlide>
              <div className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden my-10 border">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-center">
                    Get Coupon!
                  </div>
                  <p className="text-lg font-semibold text-center">
                    {couponsDisplay.coupon_Description}
                  </p>
                  <p className="text-3xl text-indigo-600 text-center mt-2 font-bold">
                    {couponsDisplay.coupon_Code}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Coupons;
