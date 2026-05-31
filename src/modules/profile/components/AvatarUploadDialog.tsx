"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PROFILE_COPY } from "../constants/profile-management.constants";
import { useUploadAvatar } from "../hooks/useProfile";
import { cropImageToSquareDataUrl } from "../utils/avatar-crop";
import { useToast } from "@/hooks/useToast";

interface AvatarUploadDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AvatarUploadDialog({ open, onClose }: AvatarUploadDialogProps) {
  const toast = useToast();
  const uploadMutation = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!open) {
      setPreviewUrl(null);
      setScale(1);
    }
  }, [open]);

  const handleFileChange = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setScale(1);
  };

  const handleApply = async () => {
    const image = imageRef.current;
    if (!image || !image.complete) return;
    const dataUrl = cropImageToSquareDataUrl(image, scale);
    if (!dataUrl) return;
    try {
      await uploadMutation.mutateAsync({ dataUrl });
      toast.success({
        title: PROFILE_COPY.avatarSuccessTitle,
        description: PROFILE_COPY.avatarSuccessDescription,
      });
      onClose();
    } catch {
      toast.error({ title: PROFILE_COPY.saveErrorTitle });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={PROFILE_COPY.uploadAvatarTitle}
      description={PROFILE_COPY.uploadAvatarDescription}
      footer={
        <div className="flex flex-wrap justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            {PROFILE_COPY.uploadAvatarCancel}
          </Button>
          <Button
            type="button"
            variant="primary"
            loading={uploadMutation.isPending}
            disabled={!previewUrl}
            onClick={() => void handleApply()}
          >
            {PROFILE_COPY.uploadAvatarApply}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => handleFileChange(event.target.files?.[0])}
        />
        <Button
          type="button"
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
        >
          {PROFILE_COPY.uploadAvatarChoose}
        </Button>
        {previewUrl ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-48 w-48 overflow-hidden rounded-lg border border-border bg-surface">
              <img
                ref={(element) => {
                  imageRef.current = element;
                }}
                src={previewUrl}
                alt=""
                className="h-full w-full object-cover"
                style={{ transform: `scale(${scale})` }}
              />
            </div>
            <label className="flex w-full flex-col gap-2 text-[13px] text-muted-fg">
              <span>{PROFILE_COPY.uploadAvatarScale}</span>
              <input
                type="range"
                min={1}
                max={2}
                step={0.05}
                value={scale}
                onChange={(event) => setScale(Number(event.target.value))}
                className="h-2 w-full accent-brand"
              />
            </label>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
