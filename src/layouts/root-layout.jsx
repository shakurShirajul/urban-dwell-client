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

    window.requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView();
    });
  }, [location]);

  return (
    <div className="min-h-screen bg-base-200">
      <Helmet>
        <title>Home | Urban Dwell</title>
      </Helmet>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Nav />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
