import type { ReactNode } from "react";
import Nav from "@/shared/components/nav";
import Footer from "@/shared/components/footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-base-200">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav />
      <main id="main-content" className="min-h-dvh flex-1">{children}</main>
      <Footer />
    </div>
  );
}
