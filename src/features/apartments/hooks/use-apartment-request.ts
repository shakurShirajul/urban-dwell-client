"use client";


import { useCallback, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { Apartment } from "@/types/domain";
import { AuthContext } from "@/shared/contexts/auth-context";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import { apartmentQueryKeys } from "./use-apartment-queries";

const useApartmentRequest = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("useApartmentRequest must be used within AuthProvider");
  const { user, successToast, errorToast } = authContext;
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (apartment: Apartment) => axiosSecure.post(`/agreement?email=${user?.email}`, {
      user_name: user?.displayName ?? "Resident",
      user_email: user?.email ?? "",
      floor_no: apartment.floor_no,
      block_name: apartment.block_name,
      apartment_no: apartment.apartment_no,
      rent: apartment.rent,
    }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: apartmentQueryKeys.agreement(user?.email) });
      successToast("Apartment request submitted");
    },
    onError: () => errorToast("The request could not be submitted. Try again."),
  });

  const requestApartment = useCallback((apartment: Apartment) => {
    if (!user) {
      router.push("/login?next=/apartments");
      return Promise.resolve();
    }
    return mutateAsync(apartment);
  }, [mutateAsync, router, user]);

  return { requestApartment, isPending };
};

export default useApartmentRequest;
