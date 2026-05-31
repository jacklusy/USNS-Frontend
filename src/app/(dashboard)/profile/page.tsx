"use client";

import { Suspense } from "react";
import { ProfilePageContent } from "@/modules/profile/components/ProfilePageContent";

function ProfilePageFallback() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <div className="h-24 animate-pulse rounded-lg bg-border" />
      <div className="h-[480px] animate-pulse rounded-lg bg-border" />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfilePageFallback />}>
      <ProfilePageContent />
    </Suspense>
  );
}
