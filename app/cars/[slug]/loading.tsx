export default function Loading() {
  return (
    <div className="container-app py-8">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-3">
          <div className="skeleton aspect-[16/10] rounded-2xl" />
          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-16 w-24 rounded-lg" />)}
          </div>
        </div>
        <div className="space-y-3">
          <div className="skeleton h-6 w-3/4 rounded" />
          <div className="skeleton h-4 w-1/2 rounded" />
          <div className="skeleton h-10 w-2/3 rounded" />
          <div className="skeleton h-12 rounded-2xl mt-4" />
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-14 rounded-xl" />)}
          </div>
        </div>
      </div>
    </div>
  );
}
