export function Markdown({ text }: { text: string }) {
  const blocks: { type: "h1" | "h2" | "p" | "ul"; text: string; items?: string[] }[] = [];
  let paragraph: string[] = [];
  let items: string[] = [];

  function flushParagraph() {
    if (paragraph.length === 0) return;
    blocks.push({ type: "p", text: paragraph.join(" ") });
    paragraph = [];
  }

  function flushItems() {
    if (items.length === 0) return;
    blocks.push({ type: "ul", text: "", items: [...items] });
    items = [];
  }

  for (const line of text.split("\n")) {
    if (line.startsWith("# ")) {
      flushParagraph();
      flushItems();
      blocks.push({ type: "h1", text: line.slice(2).trim() });
    } else if (line.startsWith("## ")) {
      flushParagraph();
      flushItems();
      blocks.push({ type: "h2", text: line.slice(3).trim() });
    } else if (line.startsWith("- ")) {
      flushParagraph();
      items.push(line.slice(2).trim());
    } else if (!line.trim()) {
      flushParagraph();
      flushItems();
    } else {
      flushItems();
      paragraph.push(line.trim());
    }
  }
  flushParagraph();
  flushItems();

  return (
    <div className="doc">
      {blocks.map((block, index) => {
        if (block.type === "h1") return <h1 key={index}>{block.text}</h1>;
        if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
        if (block.type === "ul") {
          return (
            <ul key={index}>
              {block.items?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
