export const AUTH_BRAND_TAGLINE = "Administration built for modern universities.";

export const AUTH_COPY = {
  loginTitle: "Sign in",
  loginSubtitle: "Enter your credentials to access the dashboard.",
  forgotTitle: "Forgot password",
  forgotSubtitle: "Enter your email and we will send reset instructions.",
  resetTitle: "Reset password",
  resetSubtitle: "Choose a new password for your account.",
  invalidCredentials: "Invalid email or password. Please try again.",
  forgotSuccess:
    "If an account exists for that email, you will receive reset instructions shortly.",
  forgotUnknownEmail:
    "We could not find an account with that email address. Please check and try again.",
  resetSuccess: "Your password has been reset. You can sign in now.",
  resetInvalidToken:
    "This reset link is invalid or has expired. Request a new link from the sign-in page.",
} as const;

export const DEMO_RESET_TOKENS = {
  valid: "valid_reset_token",
  expired: "expired_reset_token",
} as const;
