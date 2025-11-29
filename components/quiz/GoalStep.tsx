'use client';

import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { UserProfile } from '@/lib/types';

type GoalOption = {
  value: UserProfile['mainGoal'];
  emoji: string;
  labelKey: string;
  description: { en: string; hi: string };
  color: string;
};

const goalOptions: GoalOption[] = [
  {
    value: 'grow_wealth',
    emoji: '💰',
    labelKey: 'goal.grow_wealth',
    description: {
      en: 'Build long-term wealth and financial security',
      hi: 'दीर्घकालिक धन और वित्तीय सुरक्षा बनाएं',
    },
    color: 'from-emerald-400 to-teal-500',
  },
  {
    value: 'save_tax',
    emoji: '🧾',
    labelKey: 'goal.save_tax',
    description: {
      en: 'Maximize tax savings under 80C and more',
      hi: '80C और अधिक के तहत टैक्स बचत को अधिकतम करें',
    },
    color: 'from-blue-400 to-indigo-500',
  },
  {
    value: 'short_term_gain',
    emoji: '⚡',
    labelKey: 'goal.short_term_gain',
    description: {
      en: 'Quick returns for near-term goals',
      hi: 'निकट-अवधि लक्ष्यों के लिए त्वरित रिटर्न',
    },
    color: 'from-orange-400 to-red-500',
  },
  {
    value: 'build_habit',
    emoji: '🌱',
    labelKey: 'goal.build_habit',
    description: {
      en: 'Develop a regular saving and investing habit',
      hi: 'नियमित बचत और निवेश की आदत विकसित करें',
    },
    color: 'from-purple-400 to-pink-500',
  },
];

export function GoalStep() {
  const { language, quizAnswers, updateQuizAnswer } = useAppStore();
  const selected = quizAnswers.mainGoal || 'grow_wealth';

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {t('quiz.step.goal', language)}
        </h2>
        <p className="mt-2 text-gray-600">
          {language === 'en'
            ? 'What brings you here today?'
            : 'आज आप यहाँ क्यों आए हैं?'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {goalOptions.map((option) => (
          <Card
            key={option.value}
            className={cn(
              'cursor-pointer overflow-hidden transition-all hover:shadow-lg',
              selected === option.value
                ? 'border-2 border-emerald-500 shadow-emerald-100'
                : 'border-2 border-transparent hover:border-gray-200'
            )}
            onClick={() => updateQuizAnswer('mainGoal', option.value)}
          >
            <CardContent className="p-0">
              <div
                className={cn(
                  'h-2 w-full bg-gradient-to-r',
                  option.color,
                  selected !== option.value && 'opacity-30'
                )}
              />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'flex h-14 w-14 items-center justify-center rounded-xl text-3xl transition-all',
                      selected === option.value
                        ? 'bg-gradient-to-br shadow-lg ' + option.color
                        : 'bg-gray-100'
                    )}
                  >
                    <span className={selected === option.value ? 'grayscale-0' : ''}>
                      {option.emoji}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p
                      className={cn(
                        'text-lg font-semibold',
                        selected === option.value ? 'text-gray-900' : 'text-gray-700'
                      )}
                    >
                      {t(option.labelKey, language)}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {option.description[language]}
                    </p>
                  </div>
                </div>
                {selected === option.value && (
                  <div className="mt-4 flex items-center justify-end">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

