"use client";
import { updateAvatarAction } from "@/app/actions/user";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";

export function AvatarUploader({ userId }: { userId: string }) {
  return (
    <UploadButton<OurFileRouter, "imageUploader">
      appearance={{
        button: "bg-transparent hover:bg-transparent text-white font-medium",
        allowedContent: "hidden",
      }}
      onClientUploadComplete={(res) => {
        updateAvatarAction(userId, res[0].url);
        alert("Аватар обновлен!");
      }}
      endpoint="imageUploader"
    />
  );
}
