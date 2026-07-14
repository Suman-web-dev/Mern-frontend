import { CheckCircle2 } from "lucide-react";
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
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl shadow-lg p-4 mb-6 text-white",
        className
      )}
      style={{ background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)" }}
    >
      <h3 className="text-sm font-bold mb-3">Abstract Checklist</h3>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <CheckCircle2
              className={cn(
                "w-3.5 h-3.5 flex-shrink-0",
                item.completed ? "text-white" : "text-white/40"
              )}
            />
            <span
              className={cn(
                "text-xs leading-tight",
                item.completed ? "text-white/60 line-through" : "text-white/90"
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
