"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";



import { ExistingCoverImage } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import { awardClientSchema, AwardFormValues, defaultAwardValues } from "@/lib/validations/award.validation";
import { createAwardAction, updateAwardAction } from "@/actions/award.action";
import { ImageUploader } from "../image-uploader";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface AwardFormProps {
    mode: "create" | "edit";

    award?: {
        id: string;

        name: string;

        excerpt: string;

        awardDate: string;

        imageUrl: string;

        imagePublicId: string;
    };
}

export function AwardForm({
    mode,
    award,
}: AwardFormProps) {
    const router = useRouter();

    const [pending, startTransition] =
        useTransition();

    const [existingImage, setExistingImage] =
        useState<ExistingCoverImage | null>(
            award
                ? {
                    url: award.imageUrl,
                    publicId:
                        award.imagePublicId,
                }
                : null,
        );

    const form = useForm<AwardFormValues>({
        resolver: zodResolver(
            awardClientSchema,
        ),

        defaultValues: {
            ...defaultAwardValues,

            ...(award && {
                name: award.name,

                excerpt: award.excerpt,

                awardDate: award.awardDate,
            }),
        },
    });

    function submit(
        values: AwardFormValues,
    ) {
        startTransition(async () => {
            const formData = new FormData();

            formData.append(
                "name",
                values.name,
            );

            formData.append(
                "excerpt",
                values.excerpt,
            );

            formData.append(
                "awardDate",
                values.awardDate,
            );

            if (values.image) {
                formData.append(
                    "image",
                    values.image,
                );
            }

            if (mode === "edit") {
                formData.append(
                    "id",
                    award!.id,
                );

                formData.append(
                    "existingImage",
                    JSON.stringify(existingImage),
                );
            }

            const result =
                mode === "create"
                    ? await createAwardAction(
                        formData,
                    )
                    : await updateAwardAction(
                        formData,
                    );

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            router.push("/admin/awards");
            // router.refresh();
        });
    }

    return (
        <form
            onSubmit={form.handleSubmit(
                submit,
            )}
            className="space-y-8"
        >
            <div className="grid gap-8 lg:grid-cols-2">
                <Controller
                    control={form.control}
                    name="name"
                    render={({
                        field,
                        fieldState,
                    }) => (
                        <Field
                            data-invalid={
                                fieldState.invalid
                            }
                        >
                            <FieldLabel>
                                Award Name
                            </FieldLabel>

                            <Input {...field}
                                placeholder="Award Name..."
                                aria-invalid={fieldState.invalid}
                            />

                            {fieldState.error && (
                                <FieldError
                                    errors={[
                                        fieldState.error,
                                    ]}
                                />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name="awardDate"
                    render={({
                        field,
                        fieldState,
                    }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Award Date</FieldLabel>

                            <Popover>
                                <PopoverTrigger
                                    render={
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />

                                            {field.value ? (
                                                format(new Date(field.value), "PPP")
                                            ) : (
                                                <span>Select project date</span>
                                            )}
                                        </Button>
                                    }
                                >

                                </PopoverTrigger>

                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={
                                            field.value
                                                ? new Date(field.value)
                                                : undefined
                                        }
                                        onSelect={(date) => {
                                            if (!date) return;

                                            field.onChange(format(date, "yyyy-MM-dd"));
                                        }}
                                        disabled={(date) => date > new Date()}

                                    />
                                </PopoverContent>
                            </Popover>

                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>

            <Controller
                control={form.control}
                name="excerpt"
                render={({
                    field,
                    fieldState,
                }) => (
                    <Field
                        data-invalid={
                            fieldState.invalid
                        }
                    >
                        <FieldLabel>
                            Short Excerpt
                        </FieldLabel>

                        <Textarea
                            rows={4}
                            {...field}
                            placeholder="Short Description..."
                            aria-invalid={fieldState.invalid}
                        />

                        {fieldState.error && (
                            <FieldError
                                errors={[
                                    fieldState.error,
                                ]}
                            />
                        )}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="image"
                render={({ field }) => (
                    <Field>
                        <FieldLabel>
                            Award Image
                        </FieldLabel>

                        <ImageUploader
                            value={field.value}
                            onChange={
                                field.onChange
                            }
                            existingImage={
                                existingImage
                            }
                            onRemoveExisting={() =>
                                setExistingImage(
                                    null,
                                )
                            }
                            aspectRatio="aspect-square"
                        />
                    </Field>
                )}
            />

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={pending}
                >
                    {mode === "create"
                        ? "Create Award"
                        : "Update Award"}
                </Button>
            </div>
        </form>
    );
}