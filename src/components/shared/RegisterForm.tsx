"use client";
import { useActionState, useState } from "react";
import { FormGroup } from "../ui/FormGroup";
import { OpenEye } from "../icon/OpenEye";
import { CloseEye } from "../icon/CloseEye";
import { cn } from "cn";
import { FormState, registerAction } from "@/app/actions/auth";

export function RegisterForm() {
  const [inputData, setInputData] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
  }>({ email: "", password: "", confirmPassword: "" });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const initialState: FormState = { error: undefined, success: false };
  const [showPass, setShowPass] = useState(false);
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );
  const formStyle = {
    input:
      "w-full p-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all",
    label: " flex gap-2 items-center text-sm text-slate-400",
  };

  return (
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
          value={inputData.email}
          onChange={handleInputChange}
        />
        {state.error && <p className="text-red-500">{state.error.email}</p>}
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
          value={inputData.password}
          onChange={handleInputChange}
        />
        {state.error && <p className="text-red-500">{state.error.password}</p>}
      </FormGroup>

      <FormGroup>
        <label className={formStyle.label} htmlFor="confirm-password">
          CONFIRM PASSWORD:
        </label>
        <input
          className={formStyle.input}
          name="confirmPassword"
          id="confirm-password"
          type={showPass ? "text" : "password"}
          required
          value={inputData.confirmPassword}
          onChange={handleInputChange}
        />
        {state.error && (
          <p className="text-red-500">{state.error.confirmPassword}</p>
        )}
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
          className="hidden"
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
        register
      </button>
    </form>
  );
}
