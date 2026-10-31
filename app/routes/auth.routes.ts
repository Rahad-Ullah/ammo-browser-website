import { route } from "@react-router/dev/routes";

export const authRoutes = [
  route("login", "pages/auth/login.tsx"),
  route("otp-verification", "pages/auth/otp.tsx"),
];
