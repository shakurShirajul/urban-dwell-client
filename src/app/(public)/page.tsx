import type { Metadata } from "next";
import Home from "@/features/home/home";

export const metadata: Metadata = {
  title: "Home",
  description: "Discover apartments and resident services at Urban Dwell.",
};

export default function HomePage() {
  return <Home />;
}
