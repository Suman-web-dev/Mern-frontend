import { cn } from "@/lib/utils";

interface FormCardProps {
  title: string;
  stepNumber?: number;
  stepIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function FormCard({ title, stepNumber, stepIcon, children, className }: FormCardProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 w-full min-w-0", className)}>
      <div className="flex items-center mb-4 sm:mb-6 flex-wrap gap-2">
        {stepIcon && (
          <div className="w-10 h-10 bg-primary-700 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            {stepIcon}
          </div>
        )}
        {stepNumber && !stepIcon && (
          <div className="w-10 h-10 bg-primary-700 text-white rounded-full flex items-center justify-center font-semibold mr-4 flex-shrink-0">
            {stepNumber}
          </div>
        )}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">{title}</h2>
      </div>
      <div className="w-full min-w-0">
        {children}
      </div>
    </div>
  );
}
