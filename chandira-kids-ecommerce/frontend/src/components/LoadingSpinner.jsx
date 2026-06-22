export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-blush border-t-brand-rose" />
      <p className="text-body-sm font-semibold">{label}</p>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-3xl border border-brand-blush/60 bg-white p-4">
          <div className="aspect-[4/5] rounded-2xl bg-brand-blush/50" />
          <div className="mt-4 h-4 w-3/4 rounded bg-brand-blush/50" />
          <div className="mt-2 h-4 w-1/2 rounded bg-brand-blush/40" />
        </div>
      ))}
    </div>
  );
}
