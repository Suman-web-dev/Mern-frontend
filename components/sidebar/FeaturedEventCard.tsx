import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedEventCardProps {
  title: string;
  date: string;
  location: string;
  time?: string;
  className?: string;
}

export default function FeaturedEventCard({
  title,
  date,
  location,
  time,
  className,
}: FeaturedEventCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl shadow-lg text-white mb-6",
        className
      )}
    >
      {/* ── Background image (top half) ── */}
      <div className="relative h-28 overflow-hidden">
        <img
          src="/hero-image.jpg"
          alt="Event background"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* dark gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />

        {/* "FEATURED EVENT" badge — top-left, small */}
        <span className="absolute top-2.5 left-2.5 bg-orange-500 text-white text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full shadow">
          Featured Event
        </span>
      </div>

      {/* ── Content (bottom half) ── */}
      <div
        className="px-4 py-3"
        style={{ background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)" }}
      >
        {/* Title */}
        <h3 className="text-sm font-bold mb-2 leading-tight">{title}</h3>

        {/* Details */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center text-white/80">
            <Calendar className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
            <span className="text-xs">{date}</span>
          </div>
          <div className="flex items-center text-white/80">
            <MapPin className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
            <span className="text-xs">{location}</span>
          </div>
          {time && (
            <div className="flex items-center text-white/80">
              <Clock className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
              <span className="text-xs">{time}</span>
            </div>
          )}
        </div>

        {/* CTA button */}
        <button className="w-full flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors">
          Learn More & Register
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
