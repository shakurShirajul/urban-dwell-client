import axios from "axios";

const apiOrigin = (process.env.NEXT_PUBLIC_API_URL || "https://server-peach-psi.vercel.app")
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");
const baseURL = `${apiOrigin}/api`;

export const publicApi = axios.create({ baseURL });
export const secureApi = axios.create({ baseURL: "/api/backend" });
