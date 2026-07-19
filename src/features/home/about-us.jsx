import { HiOutlineBuildingOffice2, HiOutlineMapPin, HiOutlineSparkles, HiOutlineSun } from "react-icons/hi2";

const features = [
  {
    icon: HiOutlineSun,
    title: "Daylight-first homes",
    description: "Generous windows and practical layouts make every apartment feel open, calm, and easy to live in.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Shared spaces that work",
    description: "A rooftop garden, fitness room, and cared-for lobby extend daily life beyond your front door.",
  },
  {
    icon: HiOutlineBuildingOffice2,
    title: "Responsive management",
    description: "Agreements, rent history, announcements, and resident information stay organized in one dashboard.",
  },
  {
    icon: HiOutlineMapPin,
    title: "Connected address",
    description: "At 350 Fifth Avenue, work, culture, shopping, and transit are part of the neighborhood rhythm.",
  },
];

const AboutUs = () => (
  <section id="building" className="section-space scroll-mt-20 bg-base-100">
    <div className="app-shell">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="eyebrow text-primary">The building</p>
          <h2 className="section-title mt-5">Designed around the way residents actually live.</h2>
        </div>
        <div className="flex items-end">
          <p className="max-w-2xl text-lg leading-8 text-base-content/65">
            Urban Dwell combines contemporary city architecture with resident services that stay out of the way until you need them. The result is a home that feels considered, not complicated.
          </p>
        </div>
      </div>

      <div className="mt-16 grid border-l border-t border-base-content/10 sm:grid-cols-2">
        {features.map(({ icon: Icon, title, description }) => (
          <article key={title} className="border-b border-r border-base-content/10 p-7 sm:p-9">
            <Icon className="text-3xl text-primary" aria-hidden="true" />
            <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight">{title}</h3>
            <p className="mt-3 max-w-md leading-7 text-base-content/60">{description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default AboutUs;
