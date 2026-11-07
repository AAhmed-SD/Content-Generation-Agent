import { redirect } from "next/navigation";
import { linkAction } from "@/app/actions";
import { DeskFrame } from "@/components/desk-frame";
import { PendingButton } from "@/components/pending-button";
import { FILM_PLATFORMS, NICHES, blotatoAccounts, blotatoReady, linkedAccounts, type BlotatoAccount } from "@/lib/posting";
import { readSession } from "@/lib/session";

/** Reads the signed-in session at request time, so this page may block on the server. */
export const instant = false;

const PLATFORM: Record<string, string> = { tiktok: "TikTok", instagram: "Instagram", facebook: "Facebook", youtube: "YouTube Shorts" };

export default async function AccountsPage() {
  const person = await readSession();
  if (!person) redirect("/");
  const ready = blotatoReady();
  let accounts: BlotatoAccount[] = [];
  let error: string | null = null;
  if (ready) {
    try {
      accounts = await blotatoAccounts();
    } catch (e) {
      error = (e as Error).message;
    }
  }
  const linked = await linkedAccounts();
  const current = (niche: string, platform: string) => {
    const l = linked.find((x) => x.niche === niche && x.platform === platform);
    return l?.blotatoAccountId ? `${l.blotatoAccountId}${l.blotatoPageId ? `:${l.blotatoPageId}` : ""}` : "";
  };
  // options per platform: one per account, or one per Facebook Page
  const options = (platform: string) =>
    accounts
      .filter((a) => a.platform === platform)
      .flatMap((a) =>
        platform === "facebook"
          ? a.pages.map((p) => ({ key: `${a.id}:${p.id}`, value: `${a.id}:${p.id}|${p.name}`, label: `${p.name} (Page of ${a.fullname || a.username})` }))
          : [{ key: a.id, value: `${a.id}|${a.username}`, label: `@${a.username}${a.fullname && a.fullname !== a.username ? ` · ${a.fullname}` : ""}` }],
      );

  return (
    <DeskFrame person={person} current="blotato">
      <p className="file-no">Accounts</p>
      <h2 className="page-title">Blotato links.</h2>
      <p className="split">
        Each of our accounts posts through one account connected in Blotato. Connect the accounts at my.blotato.com first, then pick them here. Films go to TikTok, Instagram, Facebook (a Page) and YouTube Shorts.
      </p>
      {!ready ? (
        <p className="data-note">Blotato is not connected. Put the API key in web/.env.local as BLOTATO_API_KEY and restart the desk.</p>
      ) : error ? (
        <p className="data-note">{error}</p>
      ) : !accounts.length ? (
        <p className="data-note">The key works, but no accounts are connected in Blotato yet.</p>
      ) : (
        <p className="data-note">
          {accounts.length} account{accounts.length === 1 ? "" : "s"} connected in Blotato.
        </p>
      )}
      <form action={linkAction} className="data-table">
        <table>
          <thead>
            <tr>
              <th>Account</th>
              {FILM_PLATFORMS.map((p) => (
                <th key={p}>{PLATFORM[p]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(NICHES).map(([niche, n]) => (
              <tr key={niche}>
                <td>
                  <strong>{n.handle}</strong>
                </td>
                {FILM_PLATFORMS.map((platform) => {
                  const opts = options(platform);
                  const cur = current(niche, platform);
                  const known = opts.find((o) => o.key === cur);
                  const saved = linked.find((x) => x.niche === niche && x.platform === platform);
                  return (
                    <td key={platform}>
                      <select name={`link:${niche}:${platform}`} defaultValue={known?.value ?? (cur ? `${cur}|${saved?.username ?? ""}` : "")} aria-label={`${n.handle} on ${PLATFORM[platform]}`} disabled={!ready || !!error}>
                        <option value="">Not linked</option>
                        {opts.map((o) => (
                          <option key={o.key} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                        {cur && !known ? <option value={`${cur}|${saved?.username ?? ""}`}>{saved?.username || cur} (not found in Blotato)</option> : null}
                      </select>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {ready && !error ? <PendingButton idle="Save links" pending="Saving…" /> : null}
      </form>
    </DeskFrame>
  );
}
