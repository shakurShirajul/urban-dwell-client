import { useCallback, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/shared/contexts/auth-context";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import { apartmentQueryKeys } from "./use-apartment-queries";

const useApartmentRequest = () => {
  const { user, successToast, errorToast } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (apartment) => axiosSecure.post(`/agreement?email=${user.email}`, {
      user_name: user.displayName,
      user_email: user.email,
      floor_no: apartment.floor_no,
      block_name: apartment.block_name,
      apartment_no: apartment.apartment_no,
      rent: apartment.rent,
    }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: apartmentQueryKeys.agreement(user.email) });
      successToast("Apartment request submitted");
    },
    onError: () => errorToast("The request could not be submitted. Try again."),
  });

  const requestApartment = useCallback((apartment) => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: "/apartments" } } });
      return Promise.resolve();
    }
    return mutateAsync(apartment);
  }, [mutateAsync, navigate, user]);

  return { requestApartment, isPending };
};

export default useApartmentRequest;
