import { Link } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineBuildingOffice2 } from "react-icons/hi2";

const PageNotFound = () => (
  <main className="architectural-grid grid min-h-screen place-items-center bg-atrium px-4 text-ink dark:bg-base-200 dark:text-base-content">
    <div className="max-w-xl text-center">
      <HiOutlineBuildingOffice2 className="mx-auto text-5xl text-primary" aria-hidden="true" />
      <p className="eyebrow mt-8 text-primary">Error 404</p>
      <h1 className="mt-5 font-display text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">This address is not in the building.</h1>
      <p className="mt-6 text-lg leading-8 text-base-content/60">The page may have moved, or the address may be incomplete.</p>
      <Link to="/" className="mt-9 inline-flex h-13 items-center gap-2 rounded-full bg-primary px-6 font-bold text-primary-content"><HiOutlineArrowLeft aria-hidden="true" /> Return home</Link>
    </div>
  </main>
);

export default PageNotFound;
