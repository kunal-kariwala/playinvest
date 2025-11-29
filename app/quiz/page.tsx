'use client';

import { useRouter } from 'next/navigation';
import { useAppStore, calculateUserLevel } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { AgeStep } from '@/components/quiz/AgeStep';
import { ExperienceStep } from '@/components/quiz/ExperienceStep';
import { RiskStep } from '@/components/quiz/RiskStep';
import { HorizonStep } from '@/components/quiz/HorizonStep';
import { GoalStep } from '@/components/quiz/GoalStep';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { QuizStep, UserProfile } from '@/lib/types';

const stepOrder: QuizStep[] = ['age', 'experience', 'risk', 'horizon', 'goal'];

export default function QuizPage() {
  const router = useRouter();
  const { 
    language, 
    currentQuizStep, 
    setQuizStep, 
    quizAnswers,
    setUserProfile,
    setUserLevel,
    setHasCompletedQuiz
  } = useAppStore();

  const currentIndex = stepOrder.indexOf(currentQuizStep);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === stepOrder.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      // Complete the quiz
      const profile: UserProfile = {
        age: quizAnswers.age || 25,
        experience: quizAnswers.experience || 'never',
        riskComfort: quizAnswers.riskComfort || 3,
        timeHorizon: quizAnswers.timeHorizon || '1_to_3',
        mainGoal: quizAnswers.mainGoal || 'grow_wealth',
      };
      setUserProfile(profile);
      setUserLevel(calculateUserLevel(profile));
      setHasCompletedQuiz(true);
      router.push('/dashboard');
    } else {
      setQuizStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setQuizStep(stepOrder[currentIndex - 1]);
    }
  };

  const renderStep = () => {
    switch (currentQuizStep) {
      case 'age':
        return <AgeStep />;
      case 'experience':
        return <ExperienceStep />;
      case 'risk':
        return <RiskStep />;
      case 'horizon':
        return <HorizonStep />;
      case 'goal':
        return <GoalStep />;
      default:
        return <AgeStep />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {t('quiz.title', language)}
        </h1>
        <p className="text-gray-600">
          {language === 'en' 
            ? `Step ${currentIndex + 1} of ${stepOrder.length}`
            : `चरण ${currentIndex + 1} में से ${stepOrder.length}`}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <QuizProgress currentStep={currentQuizStep} />
      </div>

      {/* Step Content */}
      <Card className="border-2 border-emerald-100 shadow-lg shadow-emerald-50 mb-8">
        <CardContent className="p-6 md:p-8">
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={isFirstStep}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('quiz.back', language)}
        </Button>

        <Button
          onClick={handleNext}
          className={`gap-2 ${
            isLastStep 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600' 
              : 'bg-emerald-500 hover:bg-emerald-600'
          }`}
        >
          {isLastStep ? (
            <>
              <Sparkles className="h-4 w-4" />
              {t('quiz.finish', language)}
            </>
          ) : (
            <>
              {t('quiz.next', language)}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

