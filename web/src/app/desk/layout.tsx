/**
 * Every desk page reads the signed-in session, which only exists at request time, so the desk is allowed to
 * block on the server (Next 16 cache components: docs/app/guides/authentication-with-cache-components).
 */
export const instant = false;

export default function DeskLayout({ children }: { children: React.ReactNode }) {
  return children;
}
