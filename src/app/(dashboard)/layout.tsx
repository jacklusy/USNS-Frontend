import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { RouteGuard } from "@/modules/auth/guards/RouteGuard";

export default function DashboardRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RouteGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </RouteGuard>
  );
}
