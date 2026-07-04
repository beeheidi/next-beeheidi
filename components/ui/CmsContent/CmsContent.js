import { PortableText } from "@portabletext/react";
import HtmlContent from "@/components/ui/HtmlContent/HtmlContent";
import { isPortableText, isStringArray } from "@/lib/content";

const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 whitespace-pre-line font-light leading-relaxed last:mb-0">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="mb-4 mt-6 text-3xl font-medium text-primary">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-6 text-2xl font-medium text-primary">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-5 text-xl font-medium text-primary">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-3 mt-4 text-lg font-medium text-primary">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-4 border-primary/30 pl-4 font-light italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-5 font-light">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-5 font-light">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-gray-700">{children}</li>,
    number: ({ children }) => <li className="text-gray-700">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">{children}</code>
    ),
    underline: ({ children }) => <span className="underline">{children}</span>,
    "strike-through": ({ children }) => <s>{children}</s>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-primary underline hover:opacity-80"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
};

export default function CmsContent({ value, className = "" }) {
  if (!value) return null;

  if (typeof value === "string") {
    if (/<[a-z][\s\S]*>/i.test(value)) {
      return <HtmlContent html={value} className={className} />;
    }
    return (
      <div
        className={`whitespace-pre-line font-light leading-relaxed text-black ${className}`}
      >
        {value}
      </div>
    );
  }

  if (isStringArray(value)) {
    return (
      <ul className={`space-y-2 font-light ${className}`}>
        {value.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-700">
            <span className="font-medium text-primary">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (isPortableText(value)) {
    return (
      <div className={`prose prose-lg max-w-none text-black ${className}`}>
        <PortableText value={value} components={portableTextComponents} />
      </div>
    );
  }

  return null;
}
