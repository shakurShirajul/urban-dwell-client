import Image from "next/image";
import { HiOutlineArrowUpRight, HiOutlineBuildingOffice, HiOutlineSquares2X2 } from "react-icons/hi2";
import { memo } from "react";
import type { Agreement, Apartment } from "@/types/domain";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const ApartmentCard = ({ apartment, handleAgreement, agreement = [] }: {
  apartment: Apartment;
  handleAgreement: (apartment: Apartment) => Promise<unknown>;
  agreement?: Agreement[];
}) => {
  const { apartment_image, floor_no, block_name, apartment_no, rent } = apartment;
  const unavailable = agreement.length > 0;

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-base-content/10 bg-base-100 transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-base-300">
        <Image
          src={apartment_image}
          alt={`Apartment ${apartment_no} in block ${block_name}`}
          width="640"
          height="480"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="eyebrow absolute left-4 top-4 rounded-full bg-base-100/90 px-3 py-2 text-primary backdrop-blur">
          Available
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-base-content/45">Residence</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Apartment {apartment_no}</h2>
          </div>
          <p className="tabular font-mono text-lg font-semibold text-primary">{currency.format(rent)}<span className="text-xs text-base-content/45">/mo</span></p>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 border-y border-base-content/10 py-4 text-sm">
          <div className="flex items-center gap-2">
            <HiOutlineBuildingOffice aria-hidden="true" className="text-primary" />
            <dt className="text-base-content/50">Floor</dt>
            <dd className="ml-auto font-semibold">{floor_no}</dd>
          </div>
          <div className="flex items-center gap-2 border-l border-base-content/10 pl-3">
            <HiOutlineSquares2X2 aria-hidden="true" className="text-primary" />
            <dt className="text-base-content/50">Block</dt>
            <dd className="ml-auto font-semibold">{block_name}</dd>
          </div>
        </dl>

        <button
          type="button"
          disabled={unavailable}
          onClick={() => handleAgreement(apartment)}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 font-bold text-secondary-content transition-colors duration-200 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-45"
        >
          {unavailable ? "Request already submitted" : "Request this apartment"}
          {!unavailable ? <HiOutlineArrowUpRight aria-hidden="true" /> : null}
        </button>
      </div>
    </article>
  );
};


export default memo(ApartmentCard);
