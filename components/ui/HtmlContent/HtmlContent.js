import sanitizeHtml from "sanitize-html";

export default function HtmlContent({ html, className = "" }) {
  if (!html?.trim()) return null;

  const clean = sanitizeHtml(html, {
    allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li", "a", "span"],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      span: ["class"],
      p: ["class"],
    },
  });

  return (
    <div
      className={`cms-content font-light leading-relaxed text-black [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_strong]:font-medium [&_b]:font-medium ${className}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
