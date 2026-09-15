"use client";

import { useActionState, useState } from "react";
import { FormGroup } from "../ui/FormGroup";
import { loginAction } from "@/app/actions/auth";
import { cn } from "cn";
import { Card } from "../ui/card";
import { OpenEye } from "../icon/OpenEye";
import { CloseEye } from "../icon/CloseEye";

export function LoginForm() {
  const initialState = { message: "", success: false };
  const [state, formAction] = useActionState(loginAction, initialState);
  const [showPass, setShowPass] = useState(false);
  const formStyle = {
    input:
      "w-full p-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all",
    label: " flex gap-2 items-center text-sm text-slate-400",
  };

  return (
    <Card>
      <form
        action={formAction}
        className="flex flex-col gap-4  p-6 rounded-2xl"
        noValidate
      >
        <FormGroup>
          <label className={formStyle.label} htmlFor="email">
            E-MAIL:
          </label>
          <input
            className={formStyle.input}
            name="email"
            id="email"
            type="email"
            required
          />
        </FormGroup>
        <FormGroup>
          <label className={formStyle.label} htmlFor="password">
            PASSWORD:
          </label>
          <input
            className={formStyle.input}
            name="password"
            id="password"
            type={showPass ? "text" : "password"}
            required
          />
        </FormGroup>
        <FormGroup className="flex-row">
          <label className={formStyle.label} htmlFor="show-pass">
            {showPass ? "HIDE" : "SHOW"} PASSWORD
            {showPass ? (
              <OpenEye className="w-8 h-8" />
            ) : (
              <CloseEye className="w-8 h-8" />
            )}
          </label>
          <input
            id="show-pass"
            type="checkbox"
            checked={showPass}
            className="hidden "
            onChange={(e) => setShowPass(e.target.checked)}
          />
        </FormGroup>
        <p className={cn(state.success ? "text-emerald-500" : "text-red-500")}>
          {state.message}
        </p>
        <button
          className="w-full bg-linear-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-bold py-2 rounded-lg transition-all shadow-lg hover:shadow-indigo-500/20"
          type="submit"
        >
          LOGIN
        </button>
      </form>
    </Card>
  );
}
