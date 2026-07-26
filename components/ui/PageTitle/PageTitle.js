import HtmlContent from "@/components/ui/HtmlContent/HtmlContent";

function renderDescription({
  content,
  asHtml,
  className,
}) {
  if (!content) return null;

  if (asHtml) {
    return <HtmlContent html={content} className={className} />;
  }

  return <p className={`${className} whitespace-pre-line`}>{content}</p>;
}

export default function PageTitle({
  subtitle,
  title,
  description,
  descriptionAsHtml = false,
  descriptionSize = "md",
  description2,
  description2AsHtml = false,
  description2Size,
  className = "",
  textMaxWidth = "2xl",
  align = "center",
  titleColor = "anthracite",
  titleBold = false,
}) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  };

  const maxWidthClass = textMaxWidth.startsWith("max-w-")
    ? textMaxWidth
    : maxWidthClasses[textMaxWidth] || maxWidthClasses["2xl"];

  const descriptionSizeClasses = {
    sm: "text-sm md:text-base",
    md: "text-m md:text-xl",
    lg: "text-lg md:text-2xl",
    xl: "text-xl md:text-3xl",
  };

  const descriptionSizeClass = descriptionSize.startsWith("text-")
    ? descriptionSize
    : descriptionSizeClasses[descriptionSize] || descriptionSizeClasses.md;

  const alignClass =
    align === "right"
      ? "text-right"
      : align === "left"
        ? "text-left"
        : "text-center";


  const titleColorClass = titleColor === "primary" ? "text-primary" : "text-anthracite";
  const titleWeightClass = titleBold ? "font-bold" : "font-light";

  const descClass =
    align === "right"
      ? "ml-auto"
      : align === "left"
        ? "mr-auto"
        : "mx-auto";

  const descriptionClassName = `${descriptionSizeClass} text-anthracite ${maxWidthClass} ${descClass} font-light leading-relaxed`;

  const description2SizeClass = description2Size
    ? description2Size.startsWith("text-")
      ? description2Size
      : descriptionSizeClasses[description2Size] || descriptionSizeClasses.md
    : descriptionSizeClass;

  const description2ClassName = `${description2SizeClass} text-anthracite ${maxWidthClass} ${descClass} font-light leading-relaxed mt-6`;

  return (
    <section
      className={`mb-32 relative z-10 title-section ${alignClass} ${className}`}
    >
      {subtitle && (
        <span className="block text-primary font-bold text-m  mb-4">
          {subtitle}
        </span>
      )}
      {title && (
        <h1 className={`text-3xl md:text-4xl ${titleWeightClass} ${titleColorClass} mb-4`}>
          {title}
        </h1>
      )}
      {renderDescription({
        content: description,
        asHtml: descriptionAsHtml,
        className: descriptionClassName,
      })}
      {renderDescription({
        content: description2,
        asHtml: description2AsHtml,
        className: description2ClassName,
      })}
    </section>
  );
}
