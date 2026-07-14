import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface ChecklistCardProps {
  items: ChecklistItem[];
  className?: string;
}

export default function ChecklistCard({ items, className }: ChecklistCardProps) {
  const completedCount = items.filter((i) => i.completed).length;

  return (
    <div className={cn("bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Abstract Checklist</h3>
       
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-500 rounded-full mb-3 overflow-hidden">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-300"
          style={{ width: `${items.length ? (completedCount / items.length) * 100 : 0}%` }}
        />
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-2">
            <div
              className={cn(
                "w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5",
                item.completed ? "bg-primary-500" : "bg-gray-100 border border-gray-300"
              )}
            >
              {item.completed && <Check className="w-2.5 h-2.5 text-white" />}
            </div>
            <span
              className={cn(
                "text-xs leading-tight",
                item.completed ? "text-gray-400 line-through" : "text-gray-600"
              )}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
