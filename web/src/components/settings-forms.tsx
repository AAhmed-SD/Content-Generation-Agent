"use client";

import { useActionState } from "react";
import { changePassword, manageUser, type SettingsState } from "@/app/actions";

const none: SettingsState = {};

function Result({ s }: { s: SettingsState }) {
  return (
    <>
      {s.error ? <p className="error">{s.error}</p> : null}
      {s.ok ? <p className="data-note">{s.ok}</p> : null}
      {s.temp ? (
        <p className="settings-temp">
          <code>{s.temp}</code> <span className="data-note">Shown once. Send it privately.</span>
        </p>
      ) : null}
    </>
  );
}

export function PasswordForm({ first }: { first: boolean }) {
  const [s, action, pending] = useActionState(changePassword, none);
  return (
    <form action={action} className="settings-form">
      {first ? <p className="error">You signed in with a one-time password. Choose your own now.</p> : null}
      <label>
        Current password
        <input type="password" name="current" autoComplete="current-password" required />
      </label>
      <label>
        New password (at least 10 characters)
        <input type="password" name="next" autoComplete="new-password" minLength={10} required />
      </label>
      <label>
        New password again
        <input type="password" name="again" autoComplete="new-password" minLength={10} required />
      </label>
      <button type="submit" disabled={pending}>{pending ? "Saving" : "Change password"}</button>
      <Result s={s} />
    </form>
  );
}

export function AddPersonForm() {
  const [s, action, pending] = useActionState(manageUser, none);
  return (
    <form action={action} className="settings-form">
      <input type="hidden" name="what" value="add" />
      <label>
        Name
        <input name="name" required />
      </label>
      <label>
        Username (lowercase, used to sign in)
        <input name="username" pattern="[a-z0-9._\-]{2,40}" autoCapitalize="none" required />
      </label>
      <label>
        Role or title (optional)
        <input name="title" />
      </label>
      <label>
        Access
        <select name="role" defaultValue="member">
          <option value="member">Member: makes, approves and posts</option>
          <option value="admin">Admin: also adds people and resets passwords</option>
        </select>
      </label>
      <button type="submit" disabled={pending}>{pending ? "Adding" : "Add person"}</button>
      <Result s={s} />
    </form>
  );
}

export function PersonActions({ username, active, self }: { username: string; active: boolean; self: boolean }) {
  const [s, action, pending] = useActionState(manageUser, none);
  return (
    <form action={action} className="settings-row-actions">
      <input type="hidden" name="username" value={username} />
      {active ? (
        <button type="submit" name="what" value="reset" className="text-button" disabled={pending}>
          Reset password
        </button>
      ) : null}
      {!self ? (
        <button type="submit" name="what" value={active ? "off" : "on"} className="text-button" disabled={pending}>
          {active ? "Turn off" : "Turn back on"}
        </button>
      ) : null}
      <Result s={s} />
    </form>
  );
}
