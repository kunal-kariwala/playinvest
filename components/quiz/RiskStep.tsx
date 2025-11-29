'use client';

import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const riskLevels = [
  { value: 1, emoji: '😰', label: { en: 'Very Low', hi: 'बहुत कम' } },
  { value: 2, emoji: '😟', label: { en: 'Low', hi: 'कम' } },
  { value: 3, emoji: '😊', label: { en: 'Balanced', hi: 'संतुलित' } },
  { value: 4, emoji: '😎', label: { en: 'Moderate', hi: 'मध्यम' } },
  { value: 5, emoji: '🚀', label: { en: 'High', hi: 'उच्च' } },
];

export function RiskStep() {
  const { language, quizAnswers, updateQuizAnswer } = useAppStore();
  const selected = quizAnswers.riskComfort || 3;

  const getDescription = (value: number) => {
    if (value <= 2) {
      return language === 'en'
        ? 'I prefer stability over high returns. Safety first!'
        : 'मुझे उच्च रिटर्न से ज्यादा स्थिरता पसंद है। सुरक्षा पहले!';
    }
    if (value === 3) {
      return language === 'en'
        ? 'I can handle some ups and downs for better returns.'
        : 'बेहतर रिटर्न के लिए कुछ उतार-चढ़ाव झेल सकता हूँ।';
    }
    return language === 'en'
      ? 'I\'m okay with volatility for potentially higher gains.'
      : 'संभावित उच्च लाभ के लिए अस्थिरता ठीक है।';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {t('quiz.step.risk', language)}
        </h2>
        <p className="mt-2 text-gray-600">
          {language === 'en'
            ? 'How do you feel about your investments going up and down?'
            : 'अपने निवेश के उतार-चढ़ाव के बारे में आप कैसा महसूस करते हैं?'}
        </p>
      </div>

      <Card className="border-2 border-emerald-100">
        <CardContent className="p-8">
          <div className="mb-8 flex justify-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-emerald-50 to-teal-100 shadow-inner">
              <span className="text-7xl">
                {riskLevels.find((r) => r.value === selected)?.emoji}
              </span>
            </div>
          </div>

          <div className="flex justify-between gap-2">
            {riskLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => updateQuizAnswer('riskComfort', level.value)}
                className={cn(
                  'flex flex-1 flex-col items-center gap-2 rounded-xl p-4 transition-all',
                  selected === level.value
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                <span className="text-2xl">{level.emoji}</span>
                <span className="text-xs font-medium">{level.label[language]}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 p-4">
            <p className="text-center text-sm text-gray-700">
              {getDescription(selected)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

