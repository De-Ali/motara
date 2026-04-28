export default function Loading() {
  return (
    <div className="container-app py-20">
      <div className="space-y-3">
        <div className="skeleton h-8 w-48 rounded" />
        <div className="skeleton h-4 w-64 rounded" />
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="skeleton aspect-[16/10]" />
            <div className="p-4 space-y-3">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-3 w-1/2 rounded" />
              <div className="skeleton h-6 w-1/3 rounded mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
