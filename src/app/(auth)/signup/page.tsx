import type { Metadata } from "next";
import Signup from "@/features/auth/signup/signup";

export const metadata: Metadata = { title: "Create account" };
export default function SignupPage() { return <Signup />; }
