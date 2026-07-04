import DOMPurify from "isomorphic-dompurify";

export default function HtmlContent({ html, className = "" }) {
  if (!html?.trim()) return null;

  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "br", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li", "a", "span"],
    ALLOWED_ATTR: ["href", "target", "rel", "class"],
  });

  return (
    <div
      className={`cms-content font-light leading-relaxed text-black [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_strong]:font-medium [&_b]:font-medium ${className}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
