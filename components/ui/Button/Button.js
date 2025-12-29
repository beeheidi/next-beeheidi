"use client";
import { Link } from "@/i18n/navigation";

const Button = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  rounded = "lg",
  className = "",
  type = "button",
  disabled = false,
  ...props
}) => {
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const baseStyles = `font-bold ${roundedStyles[rounded] || roundedStyles.lg} transition-all duration-300 inline-flex items-center justify-center`;

  const variants = {
    primary:
      "bg-primary text-white hover:bg-opacity-90 hover:scale-105 active:scale-95 cursor-pointer shadow-lg",
    outline:
      "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white hover:scale-105 active:scale-95 cursor-pointer shadow-lg font-medium",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  const combinedClassName =
    `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`.trim();

  // Détecter si c'est un lien externe ou un fichier (PDF, images, etc.)
  const isExternalLink =
    href &&
    (href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.endsWith(".pdf") ||
      href.endsWith(".jpg") ||
      href.endsWith(".jpeg") ||
      href.endsWith(".png") ||
      href.endsWith(".gif") ||
      href.endsWith(".zip") ||
      href.endsWith(".doc") ||
      href.endsWith(".docx"));

  // Si href est fourni, utiliser Link (pour navigation interne) ou <a> (pour liens externes/fichiers)
  if (href && !disabled) {
    if (isExternalLink) {
      return (
        <a
          href={href}
          className={combinedClassName}
          target={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "noopener noreferrer"}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  // Sinon, utiliser un bouton standard
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
