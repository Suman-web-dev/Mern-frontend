import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  label: string;
  icon: React.ReactNode;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
}

export default function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  return (
    <div className="relative w-full overflow-hidden" style={{ backgroundColor: '#032E24' }}>
      {/* Dark Green Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#032E24] via-[#063B31] to-[#0B4D3E]"></div>
      
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#0E5B47]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#063B31]/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative flex items-center justify-between p-4 sm:p-6 md:p-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "rounded-full flex items-center justify-center border-2 transition-all",
                  "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14",
                  index < currentStep 
                    ? "bg-[#22C55E] border-[#22C55E] text-white" 
                    : index === currentStep 
                    ? "bg-[#063B31] border-[#22C55E] text-[#22C55E]" 
                    : "bg-white/10 border-white/20 text-gray-400"
                )}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                ) : (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center">
                    {step.icon}
                  </div>
                )}
              </div>
              <span
                className={cn(
                  "mt-3 text-sm font-medium",
                  index <= currentStep ? "text-white" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 h-0.5">
                <div
                  className={cn(
                    "h-full border-t-2 border-dashed transition-all",
                    index < currentStep ? "border-[#22C55E]" : "border-white/20"
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
