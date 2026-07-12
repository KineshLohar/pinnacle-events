"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";

import { defaultWorkValues, WORK_CATEGORIES, workSchema, type WorkFormValues } from "@/lib/validations/work";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import { createWorkAction } from "@/actions/work";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { GalleryUploader } from "../gallery-uploader";
import { ImageUploader } from "../image-uploader";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
    mode: "create" | "edit";
    initialData?: Partial<WorkFormValues>;
}

export function WorkForm({
    mode,
    initialData,
}: Props) {
    const router = useRouter();
    const uploadSession = useRef(
        crypto.randomUUID(),
    ).current;

    const [isPending, startTransition] = useTransition();

    const [slugEdited, setSlugEdited] = useState(
        mode === "edit",
    );

    const form = useForm<WorkFormValues>({
        resolver: zodResolver(workSchema),
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

    function onSubmit(values: WorkFormValues) {
        startTransition(async () => {
            const result = await createWorkAction(values);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            router.push("/admin/works");
            router.refresh();
        });
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
                                name="category"
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
                                                {WORK_CATEGORIES.map((category) => (
                                                    <SelectItem
                                                        key={category}
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
                                control={form.control}
                                name="coverImage"
                                render={({ field, fieldState }) => (
                                    <>
                                        <ImageUploader
                                            value={field.value}
                                            onChange={field.onChange}
                                            objectKey={`temp/works/${uploadSession}/cover.jpg`}
                                            label="Upload Cover"
                                        />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </>
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
                                control={form.control}
                                name="gallery"
                                render={({ field, fieldState }) => (
                                    <>
                                        <GalleryUploader
                                            uploadSession={uploadSession}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </>
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