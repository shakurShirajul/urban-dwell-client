"use client";


import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => <div className="h-full min-h-[32rem] animate-pulse bg-base-300" />,
});

export default Map;
