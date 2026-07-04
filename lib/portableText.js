function span(text, marks = []) {
  return { _type: "span", text, marks };
}

function block(children, options = {}) {
  return {
    _type: "block",
    style: options.style || "normal",
    ...(options.listItem ? { listItem: options.listItem, level: 1 } : {}),
    markDefs: [],
    children: Array.isArray(children) ? children : [span(children)],
  };
}

export function paragraphsToPortableText(paragraphs = []) {
  return paragraphs
    .filter((paragraph) => paragraph?.trim())
    .map((paragraph) => block(paragraph.trim()));
}

export function listToPortableText(items = []) {
  return items
    .filter((item) => item?.trim())
    .map((item) => block(item.trim(), { listItem: "bullet" }));
}

export function linesToPortableText(lines = []) {
  return lines
    .filter((line) => line?.trim())
    .map((line) => block(line.trim()));
}
