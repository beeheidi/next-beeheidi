export default function PageTitle({
  subtitle,
  title,
  description,
  className = "",
  textMaxWidth = "2xl",
  align = "center",
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

  const alignClass =
    align === "right"
      ? "text-right"
      : align === "left"
      ? "text-left"
      : "text-center";


  const descClass =
    align === "right"
      ? "ml-auto"
      : align === "left"
      ? "mr-auto"
      : "mx-auto";

  return (
    <section
      className={`mb-32 relative z-10 title-section ${alignClass} ${className}`}
    >
      {subtitle && (
        <span className="block text-primary font-bold tracking-[0.2em] text-sm uppercase mb-4">
          {subtitle}
        </span>
      )}
      {title && (
        <h1 className="text-5xl md:text-7xl font-light text-anthracite mb-8">
          {title}
        </h1>
      )}
      {description && (
        <p
          className={`text-xl md:text-2xl text-gray-500 ${maxWidthClass} ${descClass} font-light leading-relaxed whitespace-pre-line`}
        >
          {description}
        </p>
      )}
    </section>
  );
}
