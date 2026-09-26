"use client";

import { updateNameAction } from "@/app/actions/user";
import { users } from "@/db/schema";
import { useState, useTransition } from "react";

export function ProfileEditForm({
  initialValue,
  user,
}: {
  user: typeof users.$inferSelect;
  initialValue: string | null;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isPending, startTransition] = useTransition();
  const handleEditData = (formData: FormData) => {
    startTransition(() => updateNameAction(user.id, formData));
    setIsEdit(false);
  };
  if (isEdit) {
    return (
      <form className="flex gap-4" action={handleEditData} noValidate>
        <input
          name="name"
          defaultValue={initialValue || ""}
          className="bg-slate-900 border border-white/10 rounded-lg p-2 text-white"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-indigo-600 px-4 py-2 rounded-lg text-white hover:bg-indigo-500"
        >
          {isPending ? "..." : "SAVE"}
        </button>
      </form>
    );
  } else {
    return (
      <div className="flex gap-4 justify-around items-center ">
        <p>{user.name}</p>
        <button
          onClick={() => setIsEdit(true)}
          className="bg-indigo-600 px-4 py-2 rounded-lg text-white hover:bg-indigo-500"
        >
          EDIT
        </button>
      </div>
    );
  }
}
