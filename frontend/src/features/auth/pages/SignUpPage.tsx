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
import { Link, useSubmit, useNavigation, useActionData } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, type SignUpFormData } from "../schema";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import { Paths } from "@/config/constants";

export default function SignupPage({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const submit = useSubmit();
  const actionData = useActionData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: SignUpFormData) =>
    submit(data, { method: "post", action: Paths.signUp });
  const isSubmitting = useNavigation().state === "submitting";

  useEffect(() => {
    if (actionData) {
      toast.info(actionData.message);
    }
  }, [actionData]);
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
          <FieldError>{errors.email?.message}</FieldError>
        </Field>

        <Field>
          <Button type="submit">
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Already have an account? <Link to={Paths.signIn}>Sign In</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
