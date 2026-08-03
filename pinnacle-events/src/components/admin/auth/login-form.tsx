"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { loginSchema, type LoginSchema } from "@/lib/validations/login";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: LoginSchema) => {
    try {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        setError("root", {
          type: "server",
          message: error.message || "Invalid email or password.",
        });

        toast.error(error.message || "Unable to sign in.");

        return;
      }

      toast.success("Welcome back!");

      router.replace("/admin/works");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError("root", {
        type: "server",
        message: "Something went wrong. Please try again.",
      });

      toast.error("Something went wrong.");
    }
  };

  return (
    <Card className="w-full max-w-xl p-4 sm:p-8 border-border-hairline bg-bg-surface/80 backdrop-blur corner-brackets brackets-visible">
      <CardHeader className="space-y-2 mt-4">
        <CardTitle className="font-display text-xl sm:text-3xl">
          Welcome Back
        </CardTitle>

        <CardDescription>
          Sign in to manage your company website.
        </CardDescription>
      </CardHeader>

      <CardContent className="">
        <form
          id="login-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      {...field}
                      type="email"
                      placeholder="admin@company.com"
                      autoComplete="email"
                      className="h-11 pl-10"
                      disabled={isSubmitting}
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className="h-11 pl-10 pr-10"
                      placeholder="********"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {form.formState.errors.root && (
            <Field data-invalid>
              <FieldError errors={[form.formState.errors.root]} />
            </Field>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex gap-3 mb-4 mt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          disabled={isSubmitting}
          className="py-5 px-6"
        >
          Reset
        </Button>

        <Button
          type="submit"
          form="login-form"
          className="flex-1 py-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}