"use client";

import Image from "next/image";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineArrowLeft, HiOutlineBars3, HiOutlineBell, HiOutlineBuildingOffice2,
  HiOutlineCreditCard, HiOutlineDocumentCheck, HiOutlineMegaphone,
  HiOutlineReceiptPercent, HiOutlineTag, HiOutlineUserCircle,
  HiOutlineUserGroup, HiOutlineXMark,
} from "react-icons/hi2";
import logo from "@/assets/images/logo/urban-dwell.png";
import type { SessionUser } from "@/types/domain";

const navigationByRole = {
  admin: [
    ["Overview", "/dashboard/adminprofile", HiOutlineBuildingOffice2],
    ["Members", "/dashboard/managemember", HiOutlineUserGroup],
    ["New announcement", "/dashboard/makeannouncement", HiOutlineMegaphone],
    ["Agreement requests", "/dashboard/agreementrequest", HiOutlineDocumentCheck],
    ["Coupons", "/dashboard/managecoupons", HiOutlineTag],
  ],
  member: [
    ["My home", "/dashboard/myprofile", HiOutlineUserCircle],
    ["Pay rent", "/dashboard/makepayment", HiOutlineCreditCard],
    ["Payment history", "/dashboard/paymenthistory", HiOutlineReceiptPercent],
    ["Announcements", "/dashboard/announcement", HiOutlineBell],
  ],
  user: [
    ["My profile", "/dashboard/myprofile", HiOutlineUserCircle],
    ["Announcements", "/dashboard/announcement", HiOutlineBell],
  ],
} as const;

export default function DashboardLayout({ children, session }: { children: ReactNode; session: SessionUser }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigation = navigationByRole[session.role];

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
        <Link href="/" className="flex items-center gap-3" aria-label="Return to Urban Dwell home">
          <Image src={logo.src} alt="" width="42" height="42" className="size-10 object-contain" />
          <span className="font-display text-xl font-semibold">Urban Dwell</span>
        </Link>
        <button type="button" onClick={() => setSidebarOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-white/10 lg:hidden" aria-label="Close dashboard navigation"><HiOutlineXMark className="text-2xl" /></button>
      </div>
      <div className="px-5 pt-7"><p className="eyebrow text-white/45">{session.role} workspace</p></div>
      <nav className="mt-4 flex-1 px-3" aria-label="Dashboard navigation">
        <ul className="space-y-1">{navigation.map(([label, path, Icon]) => (
          <li key={path}><Link href={path} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${pathname === path ? "bg-white text-steel" : "text-white/65 hover:bg-white/10 hover:text-white"}`}><Icon className="text-xl" />{label}</Link></li>
        ))}</ul>
      </nav>
      <div className="border-t border-white/10 p-3"><Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/65 hover:bg-white/10"><HiOutlineArrowLeft className="text-xl" />Public site</Link></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-68 bg-secondary text-secondary-content lg:block">{sidebar}</aside>
      {sidebarOpen ? <div className="fixed inset-0 z-50 lg:hidden"><button type="button" className="absolute inset-0 bg-ink/60" onClick={() => setSidebarOpen(false)} aria-label="Close navigation overlay" /><aside className="relative h-full w-[min(19rem,88vw)] bg-secondary text-secondary-content">{sidebar}</aside></div> : null}
      <div className="min-w-0 lg:col-start-2">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-base-content/10 bg-base-100/90 px-4 backdrop-blur-xl sm:px-7 lg:px-10">
          <button type="button" onClick={() => setSidebarOpen(true)} className="grid size-11 place-items-center rounded-full border border-base-content/10 text-2xl lg:hidden" aria-label="Open dashboard navigation"><HiOutlineBars3 /></button>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block"><p className="text-sm font-bold">{session.name ?? "Urban Dwell resident"}</p><p className="text-xs text-base-content/50">{session.email}</p></div>
            {session.photoURL ? <Image src={session.photoURL} alt="" width={44} height={44} className="size-11 rounded-full object-cover" /> : <span className="grid size-11 place-items-center rounded-full bg-primary font-bold text-primary-content">{session.name?.charAt(0) ?? "U"}</span>}
          </div>
        </header>
        <main className="p-4 sm:p-7 lg:p-10 xl:p-12">{children}</main>
      </div>
    </div>
  );
}
