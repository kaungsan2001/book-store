import { Loader2, RefreshCwIcon } from "lucide-react";

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
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OtpSchema, type OtpFormData } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useActionData, useNavigation, useSubmit } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { Paths } from "@/config/constants";

export default function OTPPage() {
  const submit = useSubmit();
  const isSubmitting = useNavigation().state === "submitting";
  const actionData = useActionData();
  const { handleSubmit, control } = useForm<OtpFormData>({
    resolver: zodResolver(OtpSchema),
  });

  const onSubmit = (data: OtpFormData) =>
    submit(data, { method: "post", action: Paths.otp });

  useEffect(() => {
    if (actionData) {
      toast.info(actionData.message);
    }
  }, [actionData]);
  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium">m@example.com</span>.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="otp-verification">
                Verification code
              </FieldLabel>
              <Button variant="outline" size="xs">
                <RefreshCwIcon />
                Resend Code
              </Button>
            </div>

            <Controller
              name="otp"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <InputOTP maxLength={6} id="otp-verification" {...field}>
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator className="mx-2" />
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <FieldDescription>
              <a href="#">I no longer have access to this email address.</a>
            </FieldDescription>
          </Field>
        </CardContent>
        <CardFooter>
          <Field>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Verify"}
            </Button>
            <div className="text-sm text-muted-foreground">
              Having trouble signing in?{" "}
              <a
                href="#"
                className="underline underline-offset-4 transition-colors hover:text-primary"
              >
                Contact support
              </a>
            </div>
          </Field>
        </CardFooter>
      </form>
    </Card>
  );
}
