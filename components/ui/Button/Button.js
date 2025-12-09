import Link from "next/link";

const Button = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "font-bold rounded-lg transition-all duration-300 inline-flex items-center justify-center";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-opacity-90 active:scale-95 cursor-pointer",
    secondary:
      "bg-secondary text-foreground hover:bg-opacity-90 active:scale-95 cursor-pointer",
    outline:
      "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white active:scale-95 cursor-pointer",
    ghost:
      "text-primary hover:bg-primary hover:bg-opacity-10 active:scale-95 cursor-pointer",
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

  // Si href est fourni, utiliser Link (pour navigation interne)
  if (href && !disabled) {
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
