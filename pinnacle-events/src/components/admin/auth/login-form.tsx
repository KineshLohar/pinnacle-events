"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
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
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from "@/components/ui/input-group";
import { authClient } from "@/lib/auth/client";

export function LoginForm() {
  const router = useRouter();

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
    <Card className="w-full max-w-md border-border-hairline bg-bg-surface/80 backdrop-blur">
      <CardHeader className="space-y-2">
        <CardTitle className="font-display text-3xl">
          Welcome Back
        </CardTitle>

        <CardDescription>
          Sign in to manage your company website.
        </CardDescription>
      </CardHeader>

      <CardContent>
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

                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>
                        <Mail className="size-4" />
                      </InputGroupText>
                    </InputGroupAddon>

                    <Input
                      {...field}
                      type="email"
                      autoComplete="email"
                      placeholder="admin@pinnacleevents.com"
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup>

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

                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>
                        <LockKeyhole className="size-4" />
                      </InputGroupText>
                    </InputGroupAddon>

                    <Input
                      {...field}
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup>

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

      <CardFooter className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          disabled={isSubmitting}
        >
          Reset
        </Button>

        <Button
          type="submit"
          form="login-form"
          className="flex-1"
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