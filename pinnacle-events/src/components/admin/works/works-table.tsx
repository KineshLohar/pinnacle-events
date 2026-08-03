import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InferSelectModel } from "drizzle-orm";
import { works } from "@/lib/db/schema";
import { DeleteWorkDialog } from "./delete-work-dialog";

type Work = Pick<
    InferSelectModel<typeof works>,
    | "id"
    | "title"
    | "client"
    | "coverImageUrl"
    | "projectDate"
    | "featured"
    | "isPublished"
>;

interface WorksTableProps {
    works: Work[];
}

export function WorksTable({ works }: WorksTableProps) {
    if (works.length === 0) {
        return (
            <div className="flex h-72 items-center justify-center rounded-lg border border-dashed">
                <div className="space-y-2 text-center">
                    <h3 className="text-lg font-medium">
                        No works found
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        Create your first portfolio project.
                    </p>

                    <Button asChild className="mt-4">
                        <Link href="/admin/works/new">
                            Create Work
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
                        <TableHead className="w-24">Cover</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Published</TableHead>
                        <TableHead className="w-32 text-right">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {works.map((work) => (
                        <TableRow key={work.id}>
                            <TableCell>
                                <div className="relative h-16 w-24 overflow-hidden rounded-md border">
                                    <Image
                                        src={work.coverImageUrl}
                                        alt={work.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </TableCell>

                            <TableCell className="font-medium">
                                {work.title}
                            </TableCell>

                            <TableCell>
                                {work.client}
                            </TableCell>

                            <TableCell>
                                {format(new Date(work.projectDate), "dd MMM yyyy")}
                            </TableCell>

                            <TableCell>
                                <Badge
                                    variant={
                                        work.featured
                                            ? "default"
                                            : "secondary"
                                    }
                                >
                                    {work.featured
                                        ? "Featured"
                                        : "No"}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                <Badge
                                    variant={
                                        work.isPublished
                                            ? "default"
                                            : "outline"
                                    }
                                >
                                    {work.isPublished
                                        ? "Published"
                                        : "Draft"}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        asChild
                                    >
                                        <Link
                                            href={`/admin/works/${work.id}`}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                    </Button>

                                    <DeleteWorkDialog
                                        id={work.id}
                                        title={work.title}
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