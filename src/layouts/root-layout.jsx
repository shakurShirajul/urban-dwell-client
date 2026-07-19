import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "@/shared/components/nav";
import Footer from "@/shared/components/footer";
import { Helmet } from "react-helmet-async";

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const scrollToSection = () => {
      const section = document.querySelector(location.hash);
      if (!section) return false;
      section.scrollIntoView({ block: "start" });
      return true;
    };

    if (scrollToSection()) return;

    const content = document.getElementById("main-content");
    const observer = new MutationObserver(() => {
      if (scrollToSection()) observer.disconnect();
    });

    observer.observe(content, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 5000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [location.hash, location.pathname]);

  return (
    <div className="flex min-h-dvh flex-col bg-base-200">
      <Helmet>
        <title>Home | Urban Dwell</title>
      </Helmet>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Nav />
      <main id="main-content" className="min-h-dvh flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
