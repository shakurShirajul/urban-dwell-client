import { HiOutlineArrowUpRight, HiOutlineMap, HiOutlineMapPin } from "react-icons/hi2";
import Map from "./map";

const Location = () => (
  <section id="visit" className="section-space scroll-mt-20 bg-base-100">
    <div className="app-shell">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
        <div className="flex flex-col justify-between rounded-[2rem] bg-accent p-8 text-accent-content sm:p-10">
          <div>
            <p className="eyebrow">Visit Urban Dwell</p>
            <h2 className="section-title mt-5">At the center of everyday New York.</h2>
          </div>
          <div className="mt-12 space-y-5">
            <div className="flex gap-3 border-t border-accent-content/20 pt-5">
              <HiOutlineMapPin className="mt-1 shrink-0 text-xl" aria-hidden="true" />
              <address className="not-italic font-semibold leading-7">
                Empire State Building<br />350 Fifth Avenue<br />New York, NY 10118
              </address>
            </div>
            <div className="flex gap-3 border-t border-accent-content/20 pt-5">
              <HiOutlineMap className="mt-1 shrink-0 text-xl" aria-hidden="true" />
              <p className="leading-7">A short walk from Herald Square and major subway connections.</p>
            </div>
            <a
              href="https://www.openstreetmap.org/?mlat=40.748817&mlon=-73.985428#map=16/40.748817/-73.985428"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-bold hover:underline"
            >
              Plan your visit <HiOutlineArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="relative z-0 min-h-[32rem] isolate overflow-hidden rounded-[2rem] border border-base-content/10" aria-label="Map showing Urban Dwell at 350 Fifth Avenue">
          <Map />
        </div>
      </div>
    </div>
  </section>
);

export default Location;
