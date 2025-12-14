export default function PageTitle({
  subtitle,
  title,
  description,
  className = "",
  showDivider = true,
}) {
  return (
    <section className={`mb-32 text-center title-section ${className}`}>
      {subtitle && (
        <span className="block text-[var(--color-primary)] font-bold tracking-[0.2em] text-sm uppercase mb-4">
          {subtitle}
        </span>
      )}
      {title && (
        <h1 className="text-5xl md:text-7xl font-bold text-black mb-8">
          {title}
        </h1>
      )}
      {showDivider && (
        <div className="w-px h-20 bg-[var(--color-primary)] mx-auto mb-8"></div>
      )}
      {description && (
        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          {description}
        </p>
      )}
    </section>
  );
}
