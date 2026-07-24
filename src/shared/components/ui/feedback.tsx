import type { ReactNode } from "react";

export const LoadingState = ({ label = "Loading…", compact = false }: { label?: string; compact?: boolean }) => (
  <div
    className={`flex items-center justify-center gap-3 ${compact ? "py-12" : "min-h-[40vh]"}`}
    role="status"
    aria-live="polite"
  >
    <span className="loading loading-ring loading-lg text-primary" />
    <span className="font-medium text-base-content/70">{label}</span>
  </div>
);

export const EmptyState = ({ title, description, action }: { title: string; description: string; action?: ReactNode }) => (
  <div className="surface-card col-span-full flex min-h-60 flex-col items-center justify-center p-8 text-center">
    <div className="mb-5 grid size-12 place-items-center rounded-full bg-primary/10 font-mono text-sm text-primary">
      00
    </div>
    <h3 className="font-display text-2xl font-semibold tracking-tight">{title}</h3>
    <p className="mt-2 max-w-md text-base-content/65">{description}</p>
    {action ? <div className="mt-6">{action}</div> : null}
  </div>
);

export const PageHeading = ({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) => (
  <header className="mb-8 flex flex-col gap-5 border-b border-base-content/10 pb-7 md:flex-row md:items-end md:justify-between">
    <div>
      {eyebrow ? <p className="eyebrow mb-3 text-primary">{eyebrow}</p> : null}
      <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-base-content/65">{description}</p>
      ) : null}
    </div>
    {action}
  </header>
);
