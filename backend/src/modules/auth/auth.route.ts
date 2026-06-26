import { Router } from "express";
import {
  confirmPassword,
  login,
  logout,
  register,
  verifyOtp,
  refreshToken,
  forgetPassword,
  verifyResetPassword,
  resetPassword,
  check,
} from "./auth.controller";
import {
  ConfirmPasswordSchema,
  LoginSchema,
  RegisterSchema,
  VerifyOtpSchema,
} from "./auth.schema";
import { validate } from "../../middlewares/validate.middleware";

const router = Router();
// prefix: /api/v1/auth
router.get("/check", check);
router.post("/sign-in", validate(LoginSchema), login);
router.post("/sign-up", validate(RegisterSchema), register);
router.post("/verify-otp", validate(VerifyOtpSchema), verifyOtp);
router.post(
  "/confirm-password",
  validate(ConfirmPasswordSchema),
  confirmPassword,
);
router.post("/refresh-token", refreshToken);

router.post("/forget-password/otp", forgetPassword);
router.post("/forget-password/verify", verifyResetPassword);
router.post("/reset-password", resetPassword);

router.post("/logout", logout);

export default router;
