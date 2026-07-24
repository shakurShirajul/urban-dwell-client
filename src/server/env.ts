import "server-only";

export const apiOrigin = (process.env.NEXT_PUBLIC_API_URL ?? "https://server-peach-psi.vercel.app")
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

export const apiBaseUrl = `${apiOrigin}/api`;

export const requiredServerEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required server environment variable: ${name}`);
  return value;
};
