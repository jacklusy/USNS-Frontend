import { AuthRequireGuard } from "@/components/layouts/AuthRequireGuard";

export default function DashboardRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthRequireGuard>{children}</AuthRequireGuard>;
}
