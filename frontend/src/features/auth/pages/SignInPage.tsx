import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignInSchema, type SignInFormData } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigation, useSubmit, useActionData } from "react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import { Paths } from "@/config/constants";

export default function SignInPage({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const submit = useSubmit();
  const isSubmitting = useNavigation().state === "submitting";

  const actionData = useActionData();

  useEffect(() => {
    if (actionData) {
      toast.error(actionData.message);
    }
  }, [actionData]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    submit(data, { method: "post", action: Paths.signIn });
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to sign in to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          <FieldError>{errors?.email?.message}</FieldError>
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" {...register("password")} />
          <FieldError>{errors?.password?.message}</FieldError>
        </Field>
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Sign In"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <Link to={Paths.signUp}>Sign Up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
