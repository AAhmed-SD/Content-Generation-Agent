"use client";

import { useActionState, useState } from "react";
import { signIn, type SignInState } from "@/app/actions";

const initial: SignInState = {};

export function SignInForm() {
  const [state, action, pending] = useActionState(signIn, initial);
  const [forgot, setForgot] = useState(false);

  return (
    <form action={action} className="sign-in">
      <label className="password">
        Username
        <input name="username" autoComplete="username" autoCapitalize="none" spellCheck={false} required />
      </label>
      <label className="password">
        Password
        <input type="password" name="password" autoComplete="current-password" required />
      </label>
      {state.error ? <p className="error">{state.error}</p> : null}
      <button type="submit" disabled={pending}>
        {pending ? "Opening" : "Open the desk"}
      </button>
      <button type="button" className="text-button" onClick={() => setForgot(!forgot)} aria-expanded={forgot}>
        Forgotten your password?
      </button>
      {forgot ? <p className="data-note">Ask Hadiqa or Laiba. An admin resets it in Settings and gives you a one-time password; you choose a new one when you sign in.</p> : null}
    </form>
  );
}
