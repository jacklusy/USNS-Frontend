import { AuthGuestGuard } from "@/components/layouts/AuthGuestGuard";
import { AuthLayout } from "@/components/layouts/AuthLayout";

export default function AuthRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthLayout>
      <AuthGuestGuard>{children}</AuthGuestGuard>
    </AuthLayout>
  );
}
