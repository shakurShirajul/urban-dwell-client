import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="grid min-h-dvh place-items-center p-6 text-center">
      <div>
        <p className="eyebrow text-error">Access denied</p>
        <h1 className="mt-4 font-display text-5xl font-semibold">This workspace is not assigned to your role.</h1>
        <Link href="/dashboard" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 font-bold text-primary-content">
          Return to dashboard
        </Link>
      </div>
    </main>
  );
}
