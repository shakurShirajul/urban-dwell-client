"use client";


import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/shared/contexts/auth-context";
import { secureApi } from "@/shared/api/http-clients";

const useAxiosSecure = () => {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("useAxiosSecure must be used within AuthProvider");
    const { logOut } = authContext;

    useEffect(() => {
        const responseInterceptor = secureApi.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                if (status === 401 || status === 403) {
                    await logOut();
                    router.push("/login");
                }
                return Promise.reject(error);
            },
        );

        return () => {
            secureApi.interceptors.response.eject(responseInterceptor);
        };
    }, [logOut, router]);

    return secureApi;
};

export default useAxiosSecure;
