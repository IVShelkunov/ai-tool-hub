"use client";
import { updateAvatarAction } from "@/app/actions/user";
import { useUploadThing } from "@/lib/utils/uploadthing";

export function AvatarUploader({ userId }: { userId: string }) {
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      updateAvatarAction(userId, res[0].ufsUrl);
    },
  });
  return (
    <div className="flex flex-col hover:bg-slate-900/40">
      <input
        id="avatar-upload"
        className="hidden"
        type="file"
        onChange={(e) =>
          e.target.files && startUpload(Array.from(e.target.files))
        }
      />
      <label
        htmlFor="avatar-upload"
        className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-4xl transition-all"
      >
        CHANGE AVATAR
      </label>
    </div>
  );
}
