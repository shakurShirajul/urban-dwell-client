import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://server-peach-psi.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
