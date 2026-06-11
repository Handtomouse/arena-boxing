/**
 * Hapana Widget Loading Skeleton
 * Shows a realistic skeleton UI while the Hapana booking widget loads
 */

export default function HapanaSkeleton() {
  return (
    <div className="animate-pulse p-4 md:p-6 min-h-[500px]" role="status" aria-label="Loading booking system">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 bg-burgundy-primary/20 rounded w-48"></div>
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-cream-dark/30 rounded"></div>
          <div className="h-10 w-24 bg-cream-dark/30 rounded"></div>
        </div>
      </div>

      {/* Calendar/Week View Skeleton */}
      <div className="mb-6">
        {/* Week days header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-6 bg-cream-dark/20 rounded"></div>
          ))}
        </div>

        {/* Class cards skeleton */}
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-charcoal-light/30 rounded border border-cream-dark/20">
              {/* Time */}
              <div className="w-20">
                <div className="h-6 bg-cream-dark/30 rounded mb-1"></div>
                <div className="h-4 bg-cream-dark/20 rounded w-16"></div>
              </div>

              {/* Class info */}
              <div className="flex-1">
                <div className="h-6 bg-burgundy-primary/30 rounded w-32 mb-2"></div>
                <div className="h-4 bg-cream-dark/20 rounded w-48 mb-1"></div>
                <div className="h-4 bg-cream-dark/20 rounded w-24"></div>
              </div>

              {/* Book button */}
              <div className="h-10 w-24 bg-blood-red/30 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="flex justify-between items-center pt-4 border-t border-cream-dark/20">
        <div className="h-4 bg-cream-dark/20 rounded w-40"></div>
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-cream-dark/20 rounded-full"></div>
          <div className="h-8 w-8 bg-cream-dark/20 rounded-full"></div>
        </div>
      </div>

      {/* Screen reader text */}
      <span className="sr-only">Loading booking system...</span>
    </div>
  );
}
