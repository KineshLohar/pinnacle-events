"use client";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

import { contactAction } from "@/actions/contact.action";

import {
  contactSchema,
  defaultContactValues,
  type ContactFormValues,
} from "@/lib/validations/contact";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

export function ContactForm() {
  const [pending, startTransition] =
    useTransition();

  const form =
    useForm<ContactFormValues>({
      resolver: zodResolver(
        contactSchema,
      ),
      defaultValues:
        defaultContactValues,
    });

  function onSubmit(
    values: ContactFormValues,
  ) {
    startTransition(async () => {
      const result =
        await contactAction(values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      form.reset();
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(
        onSubmit,
      )}
      className="space-y-6"
      noValidate
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                Full Name
              </FieldLabel>

              <Input
                {...field}
                placeholder="Jane Doe"
                className="w-full bg-bg-surface border border-border-hairline rounded-md px-4 py-3 text-text-primary placeholder:text-text-tertiary focus-visible:border-gold-primary"
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
          name="company"
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
                Company
              </FieldLabel>

              <Input
                {...field}
                placeholder="Company Name"
                className="w-full bg-bg-surface border border-border-hairline rounded-md px-4 py-3 text-text-primary placeholder:text-text-tertiary focus-visible:border-gold-primary"
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
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Controller
          control={form.control}
          name="email"
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
                Work Email
              </FieldLabel>

              <Input
                {...field}
                type="email"
                placeholder="jane@company.com"
                className="w-full bg-bg-surface border border-border-hairline rounded-md px-4 py-3 text-text-primary placeholder:text-text-tertiary focus-visible:border-gold-primary"
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
          name="phone"
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
                Phone
              </FieldLabel>

              <Input
                {...field}
                placeholder="+91 9876543210"
                className="w-full bg-bg-surface border border-border-hairline rounded-md px-4 py-3 text-text-primary placeholder:text-text-tertiary focus-visible:border-gold-primary"
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
      </div>

      <Controller
        control={form.control}
        name="message"
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
              Tell us about the
              mandate
            </FieldLabel>

            <Textarea
              {...field}
              rows={6}
              className="w-full bg-bg-surface border border-border-hairline rounded-md px-4 py-3 text-text-primary placeholder:text-text-tertiary focus-visible:border-gold-primary"
              placeholder="Event type, scale, cities involved, timeline..."
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

      <Button
        type="submit"
        disabled={pending}
        size="lg"
        className="inline-flex items-center gap-2 bg-gold-primary text-bg-primary text-sm font-medium rounded-full px-7 py-5 hover:bg-gold-bright transition-colors"
      >
        {pending
          ? "Sending..."
          : "Send Inquiry"}

        <ArrowUpRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}