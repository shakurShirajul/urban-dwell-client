import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "./providers";
import "../index.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Urban Dwell",
    template: "%s | Urban Dwell",
  },
  description: "Apartment discovery and resident services for Urban Dwell.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
