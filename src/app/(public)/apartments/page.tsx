import type { Metadata } from "next";
import Apartments from "@/features/apartments/apartments";

export const metadata: Metadata = {
  title: "Available Apartments",
  description: "Browse apartments currently available at Urban Dwell.",
};

export default function ApartmentsPage() {
  return <Apartments />;
}
