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
  sessionExpiredToast: "Your session has expired. Please sign in again.",
} as const;

export const AUTH_ERROR_COPY = {
  unauthorized: {
    title: "Unauthorized",
    description:
      "You need to sign in to access this page. Your session may have ended or you do not have access.",
    ctaLabel: "Sign in",
    ctaHref: "/login",
  },
  forbidden: {
    title: "Access denied",
    description:
      "You do not have permission to view this page. Contact your administrator if you believe this is a mistake.",
    ctaLabel: "Go back",
    ctaHref: "/dashboard",
  },
  sessionExpired: {
    title: "Session expired",
    description:
      "Your session has ended for security reasons. Sign in again to continue working in the dashboard.",
    ctaLabel: "Sign in again",
    ctaHref: "/login",
  },
} as const;

export const SETTINGS_ALLOWED_ROLES = ["dba", "admin"] as const;

export const DEMO_RESET_TOKENS = {
  valid: "valid_reset_token",
  expired: "expired_reset_token",
} as const;
