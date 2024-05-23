import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export function Loader() {
  return Array.from({ length: 10 }).map((_, i) => {
    return (
      <TableRow key={i.toString()}>
        <TableCell>
          <Skeleton className="size-[84px] rounded-md" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-6" />
        </TableCell>
        <TableCell className="text-center">
          <Skeleton className="h-6" />
        </TableCell>
        <TableCell className="text-center">
          <Skeleton className="h-6" />
        </TableCell>
        <TableCell className="text-right">
          <div className="inline-flex gap-3 lg:gap-6">
            <Skeleton className="size-11" />
            <Skeleton className="size-11" />
          </div>
        </TableCell>
      </TableRow>
    );
  });
}
