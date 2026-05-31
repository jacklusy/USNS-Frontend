"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { TextInput, TextareaInput } from "@/components/ui/inputs";
import { useToast } from "@/hooks/useToast";
import { PROFILE_COPY } from "../constants/profile-management.constants";
import {
  profileEditSchema,
  type ProfileEditFormData,
} from "../schemas/profile.schema";
import { useUpdateProfile } from "../hooks/useProfile";
import type { UserProfile } from "../types/profile.types";

interface ProfileEditFormProps {
  profile: UserProfile;
  onCancel: () => void;
  onSaved: () => void;
}

export function ProfileEditForm({
  profile,
  onCancel,
  onSaved,
}: ProfileEditFormProps) {
  const toast = useToast();
  const updateMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      displayName: profile.displayName,
      phone: profile.phone,
      bio: profile.bio,
    },
  });

  useEffect(() => {
    reset({
      displayName: profile.displayName,
      phone: profile.phone,
      bio: profile.bio,
    });
  }, [profile, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateMutation.mutateAsync(data);
      toast.success({
        title: PROFILE_COPY.saveSuccessTitle,
        description: PROFILE_COPY.saveSuccessDescription,
      });
      onSaved();
    } catch {
      toast.error({ title: PROFILE_COPY.saveErrorTitle });
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <FormField
        name="displayName"
        label={PROFILE_COPY.fieldDisplayName}
        required
        error={errors.displayName?.message}
      >
        <TextInput
          id="profile-display-name"
          hasError={Boolean(errors.displayName)}
          aria-required="true"
          {...register("displayName")}
        />
      </FormField>
      <FormField
        name="phone"
        label={PROFILE_COPY.fieldPhone}
        error={errors.phone?.message}
      >
        <TextInput
          id="profile-phone"
          hasError={Boolean(errors.phone)}
          {...register("phone")}
        />
      </FormField>
      <FormField name="bio" label={PROFILE_COPY.fieldBio} error={errors.bio?.message}>
        <TextareaInput
          id="profile-bio"
          rows={4}
          hasError={Boolean(errors.bio)}
          {...register("bio")}
        />
      </FormField>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" variant="primary" loading={updateMutation.isPending}>
          {PROFILE_COPY.saveProfile}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          {PROFILE_COPY.cancelEdit}
        </Button>
      </div>
    </form>
  );
}
