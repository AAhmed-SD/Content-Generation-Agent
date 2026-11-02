const banned =
  /\b(cure|guaranteed|diagnos|suicide|kill myself|onlyfans|escort|nude|porn|hostess|ai-powered)\b/i;

export type ClaudeScript = {
  onScreen: string;
  narration: string;
  beats: string[];
};

function line(text: string, label: string) {
  const match = text.match(new RegExp(`^${label}:\\s*(.+)$`, "im"));
  return match?.[1]?.trim().replace(/^["“]|["”]$/g, "") ?? "";
}

export function parseScript(text: string): ClaudeScript | null {
  const onScreen = line(text, "on screen").slice(0, 140);
  const narration = line(text, "narration").slice(0, 280);
  const beats = [line(text, "beat 1"), line(text, "beat 2"), line(text, "beat 3")].map((beat) => beat.slice(0, 140));
  if (!onScreen || !narration || beats.some((beat) => !beat)) return null;
  const joined = [onScreen, narration, ...beats].join(" ");
  if (banned.test(joined) || /\d/.test(joined) || /https?:\/\//i.test(joined)) return null;
  return { onScreen, narration, beats };
}

export function publicClaudeError(message: string) {
  return message.replace(/sk-ant-[A-Za-z0-9_-]+/g, "the saved key").slice(0, 220);
}

export async function askClaude(prompt: string) {
  const key = process.env.ANTHROPIC_API_KEY?.trim();
  if (!key) throw new Error("ANTHROPIC_API_KEY is empty.");
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL?.trim() || "claude-sonnet-5-5",
      max_tokens: 500,
      thinking: { type: "between_tools" },
      system:
        "Reply with the five labeled lines and nothing else. Do not refuse, apologize, or mention missing files. If a sentence is unset, stay with the card line.",
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const json = (await response.json()) as {
    error?: { message?: string };
    stop_reason?: string;
    content?: { type?: string; text?: string }[];
  };
  if (!response.ok) throw new Error(json.error?.message || `Claude returned ${response.status}.`);
  const blocks = Array.isArray(json.content) ? json.content : [];
  const text = blocks
    .map((block) => block.text ?? "")
    .join("\n")
    .trim();
  if (!text) {
    const types = blocks.map((block) => block.type || "unknown").join(", ") || "none";
    throw new Error(`Claude returned an empty script (${json.stop_reason || "no stop"}, blocks: ${types}).`);
  }
  return text;
}
