import { StoryFrame } from "@/components/story-frame";

/**
 * An idea's storyboard, drawn the same way as Hooks: one sketched phone frame per beat. Idea frames are plain text,
 * often "what we see. Voice: 'what is said'", so the text is split into the screen and the voice.
 */
export function Storyboard({ frames, small = false }: { frames: string[]; small?: boolean }) {
  if (!frames.length) return null;
  return (
    <div className={small ? "story-strip is-small" : "story-strip"} aria-label="Storyboard">
      {frames.map((f, i) => {
        // drop a leading "Frame 3:" or "Frame 3 (chaos):", since the frame number is drawn
        const text = f.replace(/^\s*frame\s*\d+\s*(\([^)]*\))?\s*[:.\-–]\s*/i, "");
        const [screen, voice = ""] = text.split(/\s*\bVoice(?:,[^:]*)?:\s*/i);
        return <StoryFrame key={i} frame={{ screen: screen.trim(), voice: voice.replace(/^['‘“"]|['’”"]\.?$/g, "").trim() }} format="" i={i} total={frames.length} />;
      })}
    </div>
  );
}
