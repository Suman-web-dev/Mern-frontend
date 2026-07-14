import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-500",
      secondary: "bg-primary-700 text-white hover:bg-primary-800 focus-visible:ring-primary-600",
      outline: "border-2 border-primary-700 text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-500",
      ghost: "text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500",
    };
    
    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-4 text-base",
      lg: "h-13 px-6 text-lg",
    };
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
