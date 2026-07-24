import type { Metadata } from "next";
import Login from "@/features/auth/login/login";

export const metadata: Metadata = { title: "Sign in" };
export default function LoginPage() { return <Login />; }
