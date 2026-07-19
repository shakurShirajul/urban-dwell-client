import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { publicApi } from "@/shared/api/http-clients";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";

export const apartmentQueryKeys = {
  list: (page, limit) => ["apartments", page, limit],
  count: ["apartments-count"],
  agreement: (email) => ["agreement", email],
};

export const useApartmentAgreement = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: apartmentQueryKeys.agreement(email),
    enabled: Boolean(email),
    queryFn: async () => {
      const response = await axiosSecure.get(`/agreement?email=${email}`);
      return response.data;
    },
  });
};

export const useApartments = ({ page = 0, limit = 6, preservePrevious = false } = {}) => useQuery({
  queryKey: apartmentQueryKeys.list(page, limit),
  queryFn: async () => {
    const response = await publicApi.get(`/apartments?page=${page}&limit=${limit}`);
    return response.data;
  },
  placeholderData: preservePrevious ? keepPreviousData : undefined,
});

export const useApartmentCount = () => useQuery({
  queryKey: apartmentQueryKeys.count,
  queryFn: async () => {
    const response = await publicApi.get("/appartment/length");
    return response.data;
  },
});
