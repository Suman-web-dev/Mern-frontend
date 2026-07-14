import { FileText, Users, Cloud, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const timelineSteps: TimelineStep[] = [
  {
    icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Abstract Details",
    description: "Enter your abstract information",
  },
  {
    icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Presenter & Authors",
    description: "Add presenter and co-authors",
  },
  {
    icon: <Cloud className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Uploads & Consent",
    description: "Upload files and accept declarations",
  },
  {
    icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Review & Submit",
    description: "Review your submission before final submission",
  },
];

const iconBase = cn(
  "rounded-full flex items-center justify-center border-2 transition-all duration-300",
  "bg-[#063B31] border-[#22C55E] text-[#22C55E]",
  "group-hover:bg-[#22C55E] group-hover:text-white group-hover:scale-110",
  "group-hover:shadow-lg group-hover:shadow-[#22C55E]/30"
);

const glowBase =
  "absolute inset-0 rounded-full bg-[#22C55E]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300";

const connectorBase =
  "flex-1 border-t-2 border-dashed border-white/25 self-center mx-2";

export default function Timeline() {
  return (
    <div className="w-full mb-8">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ backgroundColor: "#032E24" }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#032E24] via-[#063B31] to-[#0B4D3E]" />

        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-4 w-32 h-32 sm:w-48 sm:h-48 bg-[#0E5B47]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-4 right-4 w-24 h-24 sm:w-40 sm:h-40 bg-[#063B31]/30 rounded-full blur-3xl" />
        </div>

        <div className="relative px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">

          <div className="overflow-x-auto pb-4 hide-scrollbar w-full">
            <div className="min-w-[500px] relative w-full flex justify-between mt-2">
              
              {/* Connector Line */}
              <div className="absolute top-[20px] sm:top-[24px] lg:top-[28px] left-[12.5%] right-[12.5%] h-0 border-t-2 border-dashed border-white/25 z-0" />

              {/* Steps */}
              {timelineSteps.map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center flex-1 px-2">
                  {/* Icon */}
                  <div className="relative group cursor-pointer mb-2 sm:mb-3 flex-shrink-0 bg-[#032E24] rounded-full">
                    <div className={cn(iconBase, "w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14")}>
                      {step.icon}
                    </div>
                    <div className={glowBase} />
                  </div>
                  
                  {/* Label */}
                  <div className="group cursor-pointer text-center px-1">
                    <h3 className="text-white font-semibold text-[10px] sm:text-xs lg:text-sm group-hover:text-[#22C55E] transition-colors leading-tight">
                      {step.title}
                    </h3>
                    <p className="block text-gray-400 text-[10px] lg:text-xs mt-0.5 sm:mt-1 max-w-[120px] lg:max-w-[160px] mx-auto leading-tight">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
