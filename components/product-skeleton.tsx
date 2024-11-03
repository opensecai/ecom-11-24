import { Card } from '@/components/ui/card';

export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="relative overflow-hidden">
          <div className="aspect-square bg-gray-800 animate-pulse" />
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-800 rounded animate-pulse" />
            <div className="h-4 bg-gray-800 rounded w-2/3 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded w-1/3 animate-pulse" />
              <div className="h-4 bg-gray-800 rounded w-1/4 animate-pulse" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}