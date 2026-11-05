/** A storyboard: one portrait frame per beat, in order. */
export function Storyboard({ frames, small = false }: { frames: string[]; small?: boolean }) {
  if (!frames.length) return null;
  return (
    <ol className={small ? "storyboard is-small" : "storyboard"} aria-label="Storyboard">
      {frames.map((f, i) => (
        <li key={i}>
          <span>{i + 1}</span>
          <p>{f}</p>
        </li>
      ))}
    </ol>
  );
}
