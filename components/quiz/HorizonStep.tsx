'use client';

import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { UserProfile } from '@/lib/types';

type HorizonOption = {
  value: UserProfile['timeHorizon'];
  icon: string;
  labelKey: string;
  suggestion: { en: string; hi: string };
};

const horizonOptions: HorizonOption[] = [
  {
    value: 'less_than_1',
    icon: '⏱️',
    labelKey: 'horizon.less_than_1',
    suggestion: {
      en: 'Best for: Fixed deposits, liquid funds',
      hi: 'बेस्ट: फिक्स्ड डिपॉजिट, लिक्विड फंड',
    },
  },
  {
    value: '1_to_3',
    icon: '📅',
    labelKey: 'horizon.1_to_3',
    suggestion: {
      en: 'Best for: Balanced funds, debt funds',
      hi: 'बेस्ट: बैलेंस्ड फंड, डेट फंड',
    },
  },
  {
    value: '3_to_5',
    icon: '🗓️',
    labelKey: 'horizon.3_to_5',
    suggestion: {
      en: 'Best for: Equity funds, index funds',
      hi: 'बेस्ट: इक्विटी फंड, इंडेक्स फंड',
    },
  },
  {
    value: 'more_than_5',
    icon: '🎯',
    labelKey: 'horizon.more_than_5',
    suggestion: {
      en: 'Best for: Equity-heavy portfolio, SIPs',
      hi: 'बेस्ट: इक्विटी-भारी पोर्टफोलियो, SIP',
    },
  },
];

export function HorizonStep() {
  const { language, quizAnswers, updateQuizAnswer } = useAppStore();
  const selected = quizAnswers.timeHorizon || '1_to_3';

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {t('quiz.step.horizon', language)}
        </h2>
        <p className="mt-2 text-gray-600">
          {language === 'en'
            ? 'How long can you keep your money invested?'
            : 'आप अपना पैसा कितने समय तक निवेशित रख सकते हैं?'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {horizonOptions.map((option) => (
          <Card
            key={option.value}
            className={cn(
              'cursor-pointer transition-all hover:shadow-lg',
              selected === option.value
                ? 'border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-emerald-100'
                : 'border-2 border-transparent hover:border-emerald-200'
            )}
            onClick={() => updateQuizAnswer('timeHorizon', option.value)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'flex h-14 w-14 items-center justify-center rounded-xl text-3xl',
                    selected === option.value ? 'bg-emerald-100' : 'bg-gray-100'
                  )}
                >
                  {option.icon}
                </div>
                <div className="flex-1">
                  <p
                    className={cn(
                      'text-lg font-semibold',
                      selected === option.value ? 'text-emerald-700' : 'text-gray-900'
                    )}
                  >
                    {t(option.labelKey, language)}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {option.suggestion[language]}
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

