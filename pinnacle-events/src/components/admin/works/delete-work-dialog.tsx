"use client";

import { useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteWorkAction } from "@/actions/work";

import { Button } from "@/components/ui/button";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface DeleteWorkDialogProps {
    id: string;
    title: string;
}

export function DeleteWorkDialog({
    id,
    title,
}: DeleteWorkDialogProps) {
    const [pending, startTransition] =
        useTransition();
        const router = useRouter();

    function handleDelete() {
        startTransition(async () => {
            const result =
                await deleteWorkAction(id);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);
            router.refresh();
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger render={
                <Button
                    size="icon"
                    variant="destructive"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            }>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete Work
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This will permanently delete{" "}
                        <strong>{title}</strong>, all
                        gallery images and the cover
                        image. This action cannot be
                        undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={pending}
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={pending}
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {pending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Delete"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}