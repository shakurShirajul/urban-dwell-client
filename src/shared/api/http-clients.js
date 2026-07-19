import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://server-peach-psi.vercel.app";

export const publicApi = axios.create({ baseURL });
export const secureApi = axios.create({ baseURL });
