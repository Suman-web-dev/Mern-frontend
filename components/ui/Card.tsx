import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-white rounded-lg shadow-sm border border-gray-200", className)}
      {...props}
    />
  )
);

Card.displayName = "Card";

export default Card;
