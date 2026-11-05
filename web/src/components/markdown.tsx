import type { ReactNode } from "react";

/**
 * Markdown for the desk's documents: headings, paragraphs, bullet and numbered lists, tables, quotes, rules,
 * code blocks, and inline bold, italics, code and links. No HTML is passed through.
 */
type Block =
  | { type: "h"; level: 1 | 2 | 3 | 4; text: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "quote"; text: string }
  | { type: "code"; text: string }
  | { type: "hr" };

const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const cells = (line: string) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());

function parse(text: string): Block[] {
  const blocks: Block[] = [];
  const lines = text.replace(/\r/g, "").split("\n");
  let i = 0;
  // front matter
  if (lines[0]?.trim() === "---") {
    const close = lines.indexOf("---", 1);
    if (close > 0) i = close + 1;
  }
  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (!t) {
      i++;
    } else if (t.startsWith("```")) {
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) body.push(lines[i++]);
      i++;
      blocks.push({ type: "code", text: body.join("\n") });
    } else if (/^#{1,4} /.test(t)) {
      const level = t.match(/^#+/)![0].length as 1 | 2 | 3 | 4;
      blocks.push({ type: "h", level, text: t.slice(level + 1).trim() });
      i++;
    } else if (/^(-{3,}|\*{3,})$/.test(t)) {
      blocks.push({ type: "hr" });
      i++;
    } else if (t.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(cells(lines[i++]));
      const sep = rows.findIndex((r) => r.every((c) => /^:?-{2,}:?$/.test(c)));
      const head = sep === 1 ? rows[0] : [];
      blocks.push({ type: "table", head, rows: rows.filter((_, k) => k !== sep && !(sep === 1 && k === 0)) });
    } else if (t.startsWith(">")) {
      const body: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) body.push(lines[i++].trim().replace(/^>\s?/, ""));
      blocks.push({ type: "quote", text: body.join(" ") });
    } else if (/^[-*] /.test(t) || /^\d+[.)] /.test(t)) {
      const ordered = /^\d/.test(t);
      const items: string[] = [];
      while (i < lines.length) {
        const l = lines[i];
        const lt = l.trim();
        if (ordered ? /^\d+[.)] /.test(lt) : /^[-*] /.test(lt)) items.push(lt.replace(/^([-*]|\d+[.)]) /, ""));
        else if (lt && /^\s{2,}/.test(l) && items.length) items[items.length - 1] += ` ${lt}`;
        else break;
        i++;
      }
      blocks.push({ type: ordered ? "ol" : "ul", items });
    } else {
      const body: string[] = [];
      while (i < lines.length && lines[i].trim() && !/^(#{1,4} |```|\||>|[-*] |\d+[.)] |-{3,}$)/.test(lines[i].trim())) body.push(lines[i++].trim());
      blocks.push({ type: "p", text: body.join(" ") });
    }
  }
  return blocks;
}

/** Inline: `code`, **bold**, *italics* or _italics_, [links](https://...). */
function inline(text: string, key = ""): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*\s][^*]*\*)|(\b_[^_]+_\b)|(\[[^\]]+\]\([^)\s]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const k = `${key}${n++}`;
    if (m[1]) out.push(<code key={k}>{tok.slice(1, -1)}</code>);
    else if (m[2]) out.push(<strong key={k}>{inline(tok.slice(2, -2), k)}</strong>);
    else if (m[3] || m[4]) out.push(<em key={k}>{inline(tok.slice(1, -1), k)}</em>);
    else {
      const [, label, href] = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/)!;
      const safe = /^(https?:|mailto:|\/|#)/.test(href);
      out.push(safe ? <a key={k} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inline(label, k)}</a> : label);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ text }: { text: string }) {
  const blocks = parse(text);
  const sections = blocks.filter((b): b is Extract<Block, { type: "h" }> => b.type === "h" && b.level === 2);
  return (
    <article className="doc">
      {blocks.map((b, index) => {
        switch (b.type) {
          case "h": {
            const Tag = `h${b.level}` as "h1" | "h2" | "h3" | "h4";
            const heading = <Tag key={index} id={b.level === 2 ? slug(b.text) : undefined}>{inline(b.text)}</Tag>;
            if (b.level === 1 && sections.length >= 3) {
              return [
                heading,
                <nav key={`${index}-toc`} className="doc-toc" aria-label="On this page">
                  {sections.map((s) => (
                    <a key={s.text} href={`#${slug(s.text)}`}>
                      {s.text.replace(/[*`]/g, "")}
                    </a>
                  ))}
                </nav>,
              ];
            }
            return heading;
          }
          case "p":
            return <p key={index}>{inline(b.text)}</p>;
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List key={index}>
                {b.items.map((item, k) => (
                  <li key={k}>{inline(item)}</li>
                ))}
              </List>
            );
          }
          case "table":
            return (
              <div key={index} className="doc-table">
                <table>
                  {b.head.length ? (
                    <thead>
                      <tr>
                        {b.head.map((c, k) => (
                          <th key={k}>{inline(c)}</th>
                        ))}
                      </tr>
                    </thead>
                  ) : null}
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((c, k) => (
                          <td key={k}>{inline(c)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "quote":
            return <blockquote key={index}>{inline(b.text)}</blockquote>;
          case "code":
            return (
              <pre key={index}>
                <code>{b.text}</code>
              </pre>
            );
          case "hr":
            return <hr key={index} />;
        }
      })}
    </article>
  );
}
