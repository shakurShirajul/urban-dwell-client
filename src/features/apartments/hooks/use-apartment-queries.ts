"use client";


import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { publicApi } from "@/shared/api/http-clients";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import type { Agreement, Apartment } from "@/types/domain";

export const apartmentQueryKeys = {
  list: (after: string | undefined, limit: number) => ["apartments", after, limit],
  count: ["apartments-count"],
  agreement: (email?: string | null) => ["agreement", email],
};

export const useApartmentAgreement = (email?: string | null) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: apartmentQueryKeys.agreement(email),
    enabled: Boolean(email),
    queryFn: async () => {
      const response = await axiosSecure.get("/agreement", { params: { email } });
      return response.data as Agreement[];
    },
  });
};

export const useApartments = ({ after, limit = 6, preservePrevious = false }: { after?: string; limit?: number; preservePrevious?: boolean } = {}) => useQuery({
  queryKey: apartmentQueryKeys.list(after, limit),
  queryFn: async () => {
    const params = new URLSearchParams({ limit: String(limit) });
    if (after) params.set("after", after);
    const response = await publicApi.get(`/apartments?${params}`);
    return {
      apartments: response.data as Apartment[],
      hasMore: response.headers["x-has-more"] === "true",
    };
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
