import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { InferSelectModel } from "drizzle-orm";

import { awards } from "@/lib/db/schema";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { DeleteAwardDialog } from "./delete-award-dialog";

type Award = InferSelectModel<typeof awards>;

interface AwardsTableProps {
  awards: Award[];
}

export function AwardsTable({
  awards,
}: AwardsTableProps) {
  if (awards.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center rounded-lg border border-dashed">
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-medium">
            No awards found
          </h3>

          <p className="text-sm text-muted-foreground">
            Create your first award.
          </p>

          <Button asChild className="mt-4">
            <Link href="/admin/awards/new">
              Create Award
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">
              Image
            </TableHead>

            <TableHead>Name</TableHead>

            <TableHead>
              Excerpt
            </TableHead>

            <TableHead>Date</TableHead>

            <TableHead className="w-32 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {awards.map((award) => (
            <TableRow key={award.id}>
              <TableCell>
                <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                  <Image
                    src={award.imageUrl}
                    alt={award.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              </TableCell>

              <TableCell className="font-medium">
                {award.name}
              </TableCell>

              <TableCell className="max-w-sm truncate">
                {award.excerpt}
              </TableCell>

              <TableCell>
                {format(
                  new Date(
                    award.awardDate,
                  ),
                  "dd MMM yyyy",
                )}
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    asChild
                  >
                    <Link
                      href={`/admin/awards/${award.id}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>

                  <DeleteAwardDialog
                    id={award.id}
                    name={award.name}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}