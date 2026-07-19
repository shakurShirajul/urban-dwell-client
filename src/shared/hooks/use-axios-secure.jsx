import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/shared/contexts/auth-context";
import { secureApi } from "@/shared/api/http-clients";

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    useEffect(() => {
        const requestInterceptor = secureApi.interceptors.request.use((config) => {
            const token = localStorage.getItem("access-token");
            config.headers.authorization = `Bearer ${token}`;
            return config;
        });

        const responseInterceptor = secureApi.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                if (status === 401 || status === 403) {
                    await logOut();
                    navigate("/login");
                }
                return Promise.reject(error);
            },
        );

        return () => {
            secureApi.interceptors.request.eject(requestInterceptor);
            secureApi.interceptors.response.eject(responseInterceptor);
        };
    }, [logOut, navigate]);

    return secureApi;
};

export default useAxiosSecure;
