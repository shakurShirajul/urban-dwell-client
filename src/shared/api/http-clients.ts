import axios from "axios";

export const publicApi = axios.create({ baseURL: "/api/public" });
export const secureApi = axios.create({ baseURL: "/api/backend" });
