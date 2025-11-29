'use client';

import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { UserProfile } from '@/lib/types';

type ExperienceOption = {
  value: UserProfile['experience'];
  emoji: string;
  labelKey: string;
  description: { en: string; hi: string };
};

const experienceOptions: ExperienceOption[] = [
  {
    value: 'never',
    emoji: '🌱',
    labelKey: 'exp.never',
    description: {
      en: 'Completely new to investing',
      hi: 'निवेश में बिल्कुल नए हैं',
    },
  },
  {
    value: 'fds_rds',
    emoji: '🏦',
    labelKey: 'exp.fds_rds',
    description: {
      en: 'Have FD or RD accounts',
      hi: 'FD या RD खाते हैं',
    },
  },
  {
    value: 'mutual_funds',
    emoji: '📊',
    labelKey: 'exp.mutual_funds',
    description: {
      en: 'Invested in mutual funds',
      hi: 'म्यूचुअल फंड में निवेश किया है',
    },
  },
  {
    value: 'stocks',
    emoji: '📈',
    labelKey: 'exp.stocks',
    description: {
      en: 'Traded in stock market',
      hi: 'शेयर बाजार में ट्रेड किया है',
    },
  },
];

export function ExperienceStep() {
  const { language, quizAnswers, updateQuizAnswer } = useAppStore();
  const selected = quizAnswers.experience || 'never';

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {t('quiz.step.experience', language)}
        </h2>
        <p className="mt-2 text-gray-600">
          {language === 'en'
            ? 'Be honest - there\'s no wrong answer here!'
            : 'ईमानदार रहें - यहाँ कोई गलत जवाब नहीं है!'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {experienceOptions.map((option) => (
          <Card
            key={option.value}
            className={cn(
              'cursor-pointer transition-all hover:shadow-lg',
              selected === option.value
                ? 'border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-emerald-100'
                : 'border-2 border-transparent hover:border-emerald-200'
            )}
            onClick={() => updateQuizAnswer('experience', option.value)}
          >
            <CardContent className="flex items-center gap-4 p-6">
              <div
                className={cn(
                  'flex h-14 w-14 items-center justify-center rounded-xl text-3xl transition-all',
                  selected === option.value
                    ? 'bg-emerald-100'
                    : 'bg-gray-100'
                )}
              >
                {option.emoji}
              </div>
              <div className="flex-1">
                <p
                  className={cn(
                    'font-semibold',
                    selected === option.value ? 'text-emerald-700' : 'text-gray-900'
                  )}
                >
                  {t(option.labelKey, language)}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {option.description[language]}
                </p>
              </div>
              {selected === option.value && (
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
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

