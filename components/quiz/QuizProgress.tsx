'use client';

import { QuizStep } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizProgressProps {
  currentStep: QuizStep;
}

const steps: QuizStep[] = ['age', 'experience', 'risk', 'horizon', 'goal'];

export function QuizProgress({ currentStep }: QuizProgressProps) {
  const currentIndex = steps.indexOf(currentStep);
  const progress = ((currentIndex) / (steps.length - 1)) * 100;

  return (
    <div className="w-full space-y-4">
      <Progress value={progress} className="h-2 bg-emerald-100" />
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={step}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all',
                isCompleted && 'bg-emerald-500 text-white',
                isCurrent && 'bg-emerald-500 text-white ring-4 ring-emerald-100',
                !isCompleted && !isCurrent && 'bg-gray-200 text-gray-500'
              )}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}

