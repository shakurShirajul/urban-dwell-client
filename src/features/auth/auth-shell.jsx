import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineMapPin } from "react-icons/hi2";
import logo from "@/assets/images/logo/urban-dwell.png";
import buildingSketch from "@/assets/banner/building-sketch.webp";

const BrandLink = ({ compact = false }) => (
  <Link
    to="/"
    className={`inline-flex items-center gap-3 font-display font-semibold tracking-tight ${compact ? "text-lg" : "text-xl text-white"}`}
    aria-label="Urban Dwell home"
  >
    <span className={`grid place-items-center rounded-xl ${compact ? "size-10 bg-secondary" : "size-11 bg-white"}`}>
      <img src={logo} alt="" width="44" height="44" className="size-9 object-contain" />
    </span>
    Urban Dwell
  </Link>
);

BrandLink.propTypes = {
  compact: PropTypes.bool,
};

const AuthShell = ({ children, visualLabel, visualTitle, visualDescription }) => (
  <main className="min-h-[100svh] bg-base-100 lg:grid lg:h-screen lg:grid-cols-[minmax(0,1.15fr)_minmax(30rem,0.85fr)] lg:overflow-hidden">
    <aside className="relative hidden min-h-screen overflow-hidden bg-secondary text-secondary-content lg:flex lg:flex-col" aria-label="About Urban Dwell">
      <div className="architectural-grid absolute inset-0 opacity-25" />
      <div className="absolute -right-20 top-24 size-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative z-20 flex items-center justify-between px-10 py-9 xl:px-14">
        <BrandLink />
        <p className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-secondary-content/55">
          <HiOutlineMapPin aria-hidden="true" /> Dhaka, Bangladesh
        </p>
      </div>

      <img
        src={buildingSketch}
        alt=""
        width="1600"
        height="1118"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full invert mix-blend-screen opacity-[0.28]"
      />

      <div className="relative z-10 mt-auto max-w-3xl px-10 pb-12 xl:px-14 xl:pb-16">
        <div className="mb-8 h-1 w-20 bg-accent" />
        <p className="eyebrow text-accent">{visualLabel}</p>
        <h2 className="mt-5 max-w-[12ch] font-display text-5xl font-semibold leading-[0.98] tracking-[-0.05em] xl:text-6xl">
          {visualTitle}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-7 text-secondary-content/65">
          {visualDescription}
        </p>
      </div>

      <div className="absolute bottom-0 right-0 z-10 h-32 w-3 bg-accent" />
    </aside>

    <section className="flex min-h-[100svh] overflow-y-auto px-5 py-7 sm:px-10 sm:py-10 lg:h-screen lg:px-12 xl:px-16" aria-label="Account form">
      <div className="m-auto w-full max-w-[31rem]">
        <div className="mb-14 flex items-center justify-between lg:hidden">
          <BrandLink compact />
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-base-content/60 hover:text-primary">
            <HiOutlineArrowLeft aria-hidden="true" /> Home
          </Link>
        </div>
        {children}
      </div>
    </section>
  </main>
);

AuthShell.propTypes = {
  children: PropTypes.node.isRequired,
  visualLabel: PropTypes.string.isRequired,
  visualTitle: PropTypes.string.isRequired,
  visualDescription: PropTypes.string.isRequired,
};

export default AuthShell;
