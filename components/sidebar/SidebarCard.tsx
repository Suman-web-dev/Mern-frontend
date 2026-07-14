import { cn } from "@/lib/utils";

interface SidebarCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function SidebarCard({ title, children, className }: SidebarCardProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6", className)}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}
