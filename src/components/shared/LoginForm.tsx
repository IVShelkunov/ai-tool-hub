"use client";

import { useActionState, useState } from "react";
import { FormGroup } from "../ui/FormGroup";
import { loginAction } from "@/app/actions/auth";
import { cn } from "cn";
import { Card } from "../ui/card";

export function LoginForm() {
  const initialState = { message: "", success: false };
  const [state, formAction] = useActionState(loginAction, initialState);
  const [showPass, setShowPass] = useState(false);
  return (
    <Card>
      <form
        action={formAction}
        className="flex flex-col gap-4  p-6 rounded-2xl"
        noValidate
      >
        <FormGroup>
          <label htmlFor="email">E-MAIL:</label>
          <input name="email" id="email" type="email" required />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">PASSWORD:</label>
          <input
            name="password"
            id="password"
            type={showPass ? "text" : "password"}
            required
          />
        </FormGroup>
        <FormGroup className="flex-row">
          <label htmlFor="show-pass">SHOW PASSWORD</label>
          <input
            id="show-pass"
            type="checkbox"
            checked={showPass}
            onChange={(e) => setShowPass(e.target.checked)}
          />
        </FormGroup>
        <p className={cn(state.success ? "text-emerald-500" : "text-red-500")}>
          {state.message}
        </p>
        <button className="bg-emerald-500 rounded-2xl" type="submit">
          LOGIN
        </button>
      </form>
    </Card>
  );
}
