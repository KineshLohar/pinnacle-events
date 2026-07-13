"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";

import { defaultWorkValues, WORK_CATEGORIES, workClientSchema, type WorkFormValues } from "@/lib/validations/work";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import { createWorkAction, updateWorkAction } from "@/actions/work";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getWorkById } from "@/lib/repository/work.repository";
import { ExistingCoverImage, ExistingGalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { GalleryUploader } from "../gallery-uploader";
import { ImageUploader } from "../image-uploader";

export type WorkWithGallery = Awaited<
    ReturnType<typeof getWorkById>
>;


interface Props {
    mode: "create" | "edit";
    initialData?: Partial<WorkFormValues>;
    work?: WorkWithGallery;
}

export function WorkForm({
    mode,
    initialData,
    work
}: Props) {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const [existingCover, setExistingCover] =
        useState<ExistingCoverImage | null>(
            work
                ? {
                    url: work.coverImageUrl,
                    publicId: work.coverImagePublicId,
                }
                : null,
        );

    const [existingGallery, setExistingGallery] =
        useState<ExistingGalleryImage[]>(
            work?.gallery ?? [],
        );

    const [removedGallery, setRemovedGallery] =
        useState<ExistingGalleryImage[]>([]);

    const [slugEdited, setSlugEdited] = useState(
        mode === "edit",
    );

    const form = useForm<WorkFormValues>({
        resolver: zodResolver(workClientSchema),
        defaultValues: useMemo(
            () => ({
                ...defaultWorkValues,
                ...initialData,
            }),
            [initialData],
        ),
    });

    const title = form.watch("title");

    useEffect(() => {
        if (slugEdited) return;

        form.setValue(
            "slug",
            slugify(title, {
                lower: true,
                strict: true,
                trim: true,
            }),
            {
                shouldValidate: true,
            },
        );
    }, [title, slugEdited, form]);

    useEffect(() => {
        if (!work) return;

        form.reset({
            title: work.title,
            slug: work.slug,
            excerpt: work.excerpt,

            client: work.client,
            eventType: work.eventType,
            location: work.location,

            projectDate: work.projectDate,

            featured: work.featured,
            isPublished: work.isPublished,

            objective: work.objective || "",
            challenge: work.challenge || "",
            execution: work.execution || "",
            outcome: work.outcome || "",

            coverImage: null,

            gallery: [],
        });
    }, [work, form]);

    function onSubmit(values: WorkFormValues) {
        startTransition(async () => {
            const formData = new FormData();

            formData.append("mode", mode);

            if (work) {
                formData.append("id", work.id);
            }

            formData.append("title", values.title);
            formData.append("slug", values.slug);
            formData.append("excerpt", values.excerpt);
            formData.append("client", values.client);
            formData.append("eventType", values.eventType);
            formData.append("location", values.location);
            formData.append("projectDate", values.projectDate);

            formData.append(
                "featured",
                String(values.featured),
            );

            formData.append(
                "isPublished",
                String(values.isPublished),
            );

            formData.append(
                "objective",
                values.objective ?? "",
            );

            formData.append(
                "challenge",
                values.challenge ?? "",
            );

            formData.append(
                "execution",
                values.execution ?? "",
            );

            formData.append(
                "outcome",
                values.outcome ?? "",
            );

            if (
                mode === "create" &&
                !values.coverImage
            ) {
                toast.error(
                    "Cover image is required.",
                );

                return;
            }

            if (values.coverImage) {
                formData.append(
                    "coverImage",
                    values.coverImage,
                );
            }

            formData.append(
                "existingCover",
                JSON.stringify(existingCover),
            );
            if (existingGallery.length + values.gallery.length === 0) {
                toast.error("Please add at least one gallery image.");
                return;
            }

            formData.append(
                "existingGallery",
                JSON.stringify(
                    existingGallery,
                ),
            );

            formData.append(
                "removedGallery",
                JSON.stringify(
                    removedGallery.map((image) => image.id),
                ),
            );

            values.gallery.forEach((image) => {
                formData.append(
                    "gallery",
                    image.image,
                );

                formData.append(
                    "galleryAlt",
                    image.alt ?? "",
                );
            });


            const result =
                mode === "create"
                    ? await createWorkAction(formData)
                    : await updateWorkAction(formData);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            router.push("/admin/works");
            // router.refresh();
        });
    }

    function removeExistingGalleryImage(id: string) {
        const image = existingGallery.find(
            (item) => item.id === id,
        );

        if (!image) return;

        setExistingGallery((prev) =>
            prev.filter((item) => item.id !== id),
        );

        setRemovedGallery((prev) => [
            ...prev,
            image,
        ]);
    }

    function restoreGalleryImage(id: string) {
        const image = removedGallery.find(
            (item) => item.id === id,
        );

        if (!image) return;

        setRemovedGallery((prev) =>
            prev.filter((item) => item.id !== id),
        );

        setExistingGallery((prev) => [
            ...prev,
            image,
        ]);
    }

    function updateExistingGalleryAlt(
        id: string,
        alt: string,
    ) {
        setExistingGallery((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        alt,
                    }
                    : item,
            ),
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {mode === "create"
                        ? "Create Work"
                        : "Edit Work"}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <div className="grid gap-6 lg:grid-cols-2">

                            <Controller
                                name="title"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Title</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="TVS Eurogrip Product Launch"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="slug"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Slug</FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            onChange={(e) => {
                                                setSlugEdited(true);
                                                field.onChange(e);
                                            }}
                                            placeholder="tvs-eurogrip-product-launch"
                                        />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                        </div>

                        <div className="grid gap-6 lg:grid-cols-3">

                            <Controller
                                name="client"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Client</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="TVS Eurogrip"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="eventType"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Category</FieldLabel>

                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger
                                                aria-invalid={fieldState.invalid}
                                                className="w-full"
                                            >
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {WORK_CATEGORIES.map((category, i) => (
                                                    <SelectItem
                                                        key={category + i}
                                                        value={category}
                                                    >
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="location"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Location</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Mumbai"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                        </div>

                        <div className="grid gap-6 lg:grid-cols-3">

                            <Controller
                                name="projectDate"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Project Date</FieldLabel>

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

                            <Controller
                                name="featured"
                                control={form.control}
                                render={({ field }) => (
                                    <Field orientation="horizontal">
                                        <div className="space-y-1">
                                            <FieldLabel>Featured</FieldLabel>
                                            <p className="text-sm text-muted-foreground">
                                                Show on homepage.
                                            </p>
                                        </div>

                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </Field>
                                )}
                            />

                            <Controller
                                name="isPublished"
                                control={form.control}
                                render={({ field }) => (
                                    <Field orientation="horizontal">
                                        <div className="space-y-1">
                                            <FieldLabel>Published</FieldLabel>
                                            <p className="text-sm text-muted-foreground">
                                                Visible on website.
                                            </p>
                                        </div>

                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </Field>
                                )}
                            />

                        </div>
                    </FieldGroup>

                    <FieldGroup className="my-8">

                        <Controller
                            name="excerpt"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Short Description</FieldLabel>

                                    <Textarea
                                        {...field}
                                        rows={4}
                                        placeholder="What was the client trying to achieve?"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="objective"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Objective</FieldLabel>

                                    <Textarea
                                        {...field}
                                        rows={4}
                                        placeholder="What was the client trying to achieve?"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="challenge"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Challenge</FieldLabel>

                                    <Textarea
                                        {...field}
                                        rows={4}
                                        placeholder="What challenges did the project involve?"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="execution"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Execution</FieldLabel>

                                    <Textarea
                                        {...field}
                                        rows={5}
                                        placeholder="Describe how the event was executed."
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="outcome"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Outcome</FieldLabel>

                                    <Textarea
                                        {...field}
                                        rows={4}
                                        placeholder="Final impact and results."
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </FieldGroup>

                    <Card>
                        <CardHeader>
                            <CardTitle>Cover Image</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <Controller
                                name="coverImage"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Cover Image</FieldLabel>

                                        <ImageUploader
                                            value={field.value}
                                            onChange={field.onChange}
                                            existingImage={existingCover}
                                            onRemoveExisting={() =>
                                                setExistingCover(null)
                                            }
                                        />

                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                        </CardContent>
                    </Card>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Gallery</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <Controller
                                name="gallery"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Gallery</FieldLabel>

                                        <GalleryUploader
                                            existingImages={existingGallery}
                                            removedImages={removedGallery}
                                            newImages={field.value}
                                            onNewImagesChange={field.onChange}
                                            onRemoveExisting={removeExistingGalleryImage}
                                            onRestoreExisting={restoreGalleryImage}
                                            onExistingAltChange={updateExistingGalleryAlt}
                                        />

                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <div className="mt-10 flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending
                                ? "Saving..."
                                : "Save Work"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}