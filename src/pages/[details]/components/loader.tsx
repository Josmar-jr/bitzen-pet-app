import { Skeleton } from "@/components/ui/skeleton";

export function Loader() {
  return (
    <div className="flex gap-8 justify-center w-full max-w-[1352px] mx-auto">
      <Skeleton className="w-[336px] h-[280px] rounded-lg" />
      <Skeleton className="w-full h-[280px] rounded-md" />
    </div>
  );
}
