import Link from "next/link";

interface ButtonProps {
  href?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  style?: string; // For backward compatibility
}

export default function Button({
  href,
  children = "SEE PRODUCT",
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  disabled = false,
  style, // Backward compatibility prop
}: ButtonProps) {
  const baseStyles =
    "inline-block px-8 py-4 text-[13px] font-bold tracking-[1px] uppercase transition-colors duration-200 text-center";

  const variants = {
    primary: "bg-primary hover:bg-accent text-white",
    secondary: "bg-black hover:bg-[#4C4C4C] text-white",
    outline: "border border-black hover:bg-black hover:text-white text-black",
  };

  const buttonClasses = style
    ? `${baseStyles} ${style} ${className}`
    : `${baseStyles} ${variants[variant]} ${className}`;

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  if (href) {
    return (
      <Link href={href} className={`${buttonClasses} ${disabledClasses}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonClasses} ${disabledClasses}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
