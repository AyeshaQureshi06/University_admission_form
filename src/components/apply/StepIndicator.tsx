"use client"

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  "Personal",
  "Academic",
  "Program",
  "Documents",
  "Review"
];

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="w-full py-8">
      <div className="relative flex justify-between items-center max-w-2xl mx-auto">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500 ease-in-out" 
          style={{ width: `${progress}%` }}
        />

        {steps.map((label, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={label} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                  isActive ? "bg-primary border-primary text-white scale-110 shadow-lg" : 
                  isCompleted ? "bg-primary border-primary text-white" : 
                  "bg-white border-border text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <span className={cn(
                "text-xs font-medium uppercase tracking-wider",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
