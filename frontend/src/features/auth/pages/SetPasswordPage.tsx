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
import { SetPasswordSchema, type SetPasswordType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Paths } from "@/config/constants";

export default function SetPasswordPage({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const submit = useSubmit();
  const actionData = useActionData();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SetPasswordSchema),
  });

  const onSubmit = (data: SetPasswordType) =>
    submit(data, { method: "post", action: "/auth/set-password" });
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
          <h1 className="text-2xl font-bold">Set password to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter password below to sign up your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" {...register("password")} />
          <FieldError errors={[errors.password]} />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Confirm Password</FieldLabel>
          </div>
          <Input
            id="confirm-password"
            type="password"
            {...register("confirmPassword")}
          />
          <FieldError errors={[errors.confirmPassword]} />
        </Field>
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Don&apos;t have an account? <Link to={Paths.signIn}>Sign In</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
