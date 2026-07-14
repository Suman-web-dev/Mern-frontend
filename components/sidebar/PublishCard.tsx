import { Globe, CheckCircle, Shield, Users, ArrowRight } from "lucide-react";

export default function PublishCard() {
  return (
    <div
      className="relative overflow-hidden rounded-xl shadow-lg p-4 mb-6 text-white"
      style={{ background: "linear-gradient(135deg, #0D9488 0%, #065F46 100%)" }}
    >
      {/* Decorative SVG background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <path d="M10,25 Q25,20 40,25 T70,25 T90,25" stroke="white" strokeWidth="0.5" fill="none" opacity="0.5" />
          <circle cx="20" cy="20" r="8" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
          <circle cx="50" cy="25" r="12" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
          <circle cx="80" cy="20" r="8" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
        </svg>
      </div>

      <div className="relative">
        <h3 className="text-sm font-bold mb-3">Publish with ARCC</h3>

        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {[
            { icon: Globe, label: "Global Visibility" },
            { icon: CheckCircle, label: "Peer Review" },
            { icon: Shield, label: "Trusted Journal" },
            { icon: Users, label: "Editorial Support" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5 flex-shrink-0 text-white/80" />
              <span className="text-[11px] text-white/90">{label}</span>
            </div>
          ))}
        </div>

        <button className="w-full flex items-center justify-center gap-1.5 bg-white text-teal-700 hover:bg-gray-100 text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors">
          Learn More
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
