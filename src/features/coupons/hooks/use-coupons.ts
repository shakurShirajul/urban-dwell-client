"use client";


import { useQuery } from "@tanstack/react-query";
import { publicApi } from "@/shared/api/http-clients";
import type { Coupon } from "@/types/domain";

export const couponsQueryKey = ["coupons"];

const useCoupons = () => useQuery({
  queryKey: couponsQueryKey,
  queryFn: async () => {
    const response = await publicApi.get("/coupon-code");
    return response.data as Coupon[];
  },
});

export default useCoupons;
