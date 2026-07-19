import { useQuery } from "@tanstack/react-query";
import { publicApi } from "@/shared/api/http-clients";

export const couponsQueryKey = ["coupons"];

const useCoupons = () => useQuery({
  queryKey: couponsQueryKey,
  queryFn: async () => {
    const response = await publicApi.get("/coupon-code");
    return response.data;
  },
});

export default useCoupons;
