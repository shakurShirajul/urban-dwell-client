import { Link } from "react-router-dom";
import { HiOutlineArrowUpRight, HiOutlineMapPin } from "react-icons/hi2";
import logo from "@/assets/images/logo/urban-dwell.png";

const Footer = () => (
  <footer className="border-t border-base-content/10 bg-secondary text-secondary-content">
    <div className="app-shell grid gap-12 py-14 md:grid-cols-[1.5fr_1fr_1fr] lg:py-20">
      <div>
        <Link to="/" className="inline-flex items-center gap-3" aria-label="Urban Dwell home">
          <span className="grid size-14 place-items-center rounded-2xl bg-white/10">
            <img src={logo} width="44" height="44" alt="" className="size-11 object-contain" />
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight">Urban Dwell</span>
        </Link>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-secondary-content/70">
          A well-run city residence where apartment discovery, resident services, and building management meet.
        </p>
      </div>

      <nav aria-label="Footer navigation">
        <h2 className="eyebrow text-secondary-content/50">Explore</h2>
        <ul className="mt-5 space-y-3 text-sm font-semibold">
          <li><a href="/#apartments" className="hover:text-accent">Available apartments</a></li>
          <li><a href="/#building" className="hover:text-accent">The building</a></li>
          <li><a href="/#offers" className="hover:text-accent">Resident offers</a></li>
          <li><Link to="/login" className="hover:text-accent">Resident dashboard</Link></li>
        </ul>
      </nav>

      <div>
        <h2 className="eyebrow text-secondary-content/50">Visit</h2>
        <address className="mt-5 not-italic text-sm leading-7 text-secondary-content/75">
          <span className="mb-2 flex items-center gap-2 font-semibold text-secondary-content">
            <HiOutlineMapPin aria-hidden="true" /> Empire State Building
          </span>
          350 Fifth Avenue<br />New York, NY 10118
        </address>
        <a
          href="https://www.openstreetmap.org/?mlat=40.748817&mlon=-73.985428#map=16/40.748817/-73.985428"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
        >
          Open map <HiOutlineArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="app-shell flex flex-col gap-2 py-5 text-xs text-secondary-content/55 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Urban Dwell. All rights reserved.</p>
        <p>Built for residents, guests, and building staff.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
