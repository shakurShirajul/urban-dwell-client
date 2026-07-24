import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowDown, HiOutlineArrowUpRight } from "react-icons/hi2";
import buildingSketch from "@/assets/banner/building-sketch.webp";

const Banner = () => (
  <section id="home" className="architectural-grid overflow-hidden bg-atrium pt-20 text-ink dark:bg-base-200 dark:text-base-content">
    <div className="app-shell grid min-h-[calc(100svh-5rem)] items-stretch lg:grid-cols-[0.95fr_1.3fr]">
      <div className="flex flex-col justify-center border-x border-steel/10 px-5 py-16 sm:px-10 lg:py-24">
        <p className="eyebrow mb-7 text-garden dark:text-primary">350 Fifth Avenue · New York</p>
        <h1 className="display-title">City living, thoughtfully run.</h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-ink/65 dark:text-base-content/65">
          Discover an apartment, request an agreement, and manage everyday resident tasks in one clear place.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/apartments"
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-garden px-6 font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            View available apartments <HiOutlineArrowUpRight aria-hidden="true" />
          </Link>
          <a
            href="#building"
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-steel/20 bg-white/70 px-6 font-bold text-steel hover:bg-white dark:border-base-content/20 dark:bg-base-100 dark:text-base-content"
          >
            Explore the building <HiOutlineArrowDown aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="relative min-h-[32rem] overflow-hidden border-x border-steel/10 bg-skyglass/45 lg:min-h-0">
        <div className="absolute inset-y-0 left-0 z-10 flex w-12 items-end justify-center border-r border-steel/15 bg-atrium/85 pb-8 dark:bg-base-200/85">
          <p className="eyebrow [writing-mode:vertical-rl] rotate-180 text-steel/65 dark:text-base-content/60">
            Urban Dwell · Residence 10118
          </p>
        </div>
        <Image
          src={buildingSketch.src}
          alt="Architectural line drawing of the Urban Dwell city skyline"
          width="1600"
          height="1118"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center mix-blend-multiply dark:mix-blend-normal dark:opacity-80"
        />
        <div className="absolute bottom-6 right-6 z-10 max-w-52 rounded-2xl border border-white/50 bg-white/85 p-4 shadow-xl backdrop-blur dark:border-base-content/10 dark:bg-base-100/90">
          <p className="eyebrow text-garden dark:text-primary">Now leasing</p>
          <p className="mt-2 text-sm font-semibold leading-6">Apartment requests are reviewed by the building team.</p>
        </div>
      </div>
    </div>
  </section>
);

export default Banner;
