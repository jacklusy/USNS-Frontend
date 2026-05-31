"use client";

import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileQueryKeys } from "../constants/profile.query-keys";
import { profileService } from "../services";
import type { AccountPreferences } from "../types/profile.types";
import { applyAccountPreferencesToUi } from "../utils/apply-account-preferences";

export function useAccountPreferences() {
  const query = useQuery({
    queryKey: profileQueryKeys.preferences,
    queryFn: () => profileService.getPreferences(),
  });

  useEffect(() => {
    if (query.data?.data) {
      applyAccountPreferencesToUi(query.data.data);
    }
  }, [query.data?.data]);

  return query;
}

export function useUpdateAccountPreferences() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: AccountPreferences) =>
      profileService.updatePreferences(input),
    onSuccess: (response) => {
      applyAccountPreferencesToUi(response.data);
      void queryClient.invalidateQueries({
        queryKey: profileQueryKeys.preferences,
      });
    },
  });
}
