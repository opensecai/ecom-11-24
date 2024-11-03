import { Card } from '@/components/ui/card';

export function BannerSkeleton() {
  return (
    <Card className="w-full h-[70vh] relative overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-3xl space-y-6 p-4">
          <div className="h-16 bg-gray-700 rounded animate-pulse w-3/4 mx-auto" />
          <div className="h-8 bg-gray-700 rounded animate-pulse w-2/3 mx-auto" />
          <div className="h-12 bg-gray-700 rounded animate-pulse w-48 mx-auto" />
        </div>
      </div>
    </Card>
  );
}