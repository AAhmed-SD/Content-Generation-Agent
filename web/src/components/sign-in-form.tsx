"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "@/app/actions";
import { directory } from "@/lib/people";

const initial: SignInState = {};

export function SignInForm() {
  const [state, action, pending] = useActionState(signIn, initial);

  return (
    <form action={action} className="sign-in">
      <fieldset>
        <legend>Who is signing in?</legend>
        {directory.map((person) => (
          <label key={person.id} className="person">
            <input type="radio" name="who" value={person.id} required />
            <span>
              <strong>{person.name}</strong>
              {person.title ? <small>{person.title}</small> : null}
            </span>
          </label>
        ))}
      </fieldset>
      <label className="password">
        Password
        <input type="password" name="password" autoComplete="current-password" required />
      </label>
      <p className="local-passwords">
        On this computer: Hadiqa Ahmed uses <code>Desk-Hadiqa-2</code>. Laiba Ahmed uses{" "}
        <code>Desk-Laiba-2</code>.
      </p>
      {state.error ? <p className="error">{state.error}</p> : null}
      <button type="submit" disabled={pending}>
        {pending ? "Opening" : "Open the desk"}
      </button>
    </form>
  );
}
