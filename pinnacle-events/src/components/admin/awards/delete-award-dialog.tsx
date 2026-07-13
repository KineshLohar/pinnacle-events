"use client";

import { useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";


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
import { deleteAwardAction } from "@/actions/award.action";

interface DeleteAwardDialogProps {
    id: string;
    name: string;
}

export function DeleteAwardDialog({
    id,
    name,
}: DeleteAwardDialogProps) {
    const [pending, startTransition] =
        useTransition();

    function handleDelete() {
        startTransition(async () => {
            const result =
                await deleteAwardAction(id);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);
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
                        Delete Award
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This will permanently delete{" "}
                        <strong>{name}</strong> and its
                        uploaded image. This action
                        cannot be undone.
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