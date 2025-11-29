'use client';

import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

export function AgeStep() {
  const { language, quizAnswers, updateQuizAnswer } = useAppStore();
  const age = quizAnswers.age || 25;

  const getAgeEmoji = (age: number) => {
    if (age < 25) return '🎓';
    if (age < 35) return '💼';
    if (age < 50) return '🏠';
    return '🌟';
  };

  const getAgeLabel = (age: number) => {
    if (age < 25) return language === 'en' ? 'Young & Early Career' : 'युवा और करियर की शुरुआत';
    if (age < 35) return language === 'en' ? 'Building Wealth Phase' : 'धन निर्माण चरण';
    if (age < 50) return language === 'en' ? 'Peak Earning Years' : 'शीर्ष कमाई के वर्ष';
    return language === 'en' ? 'Planning for Future' : 'भविष्य की योजना';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {t('quiz.step.age', language)}
        </h2>
        <p className="mt-2 text-gray-600">
          {language === 'en' 
            ? 'This helps us suggest age-appropriate investment strategies.'
            : 'इससे हमें उम्र-उपयुक्त निवेश रणनीतियाँ सुझाने में मदद मिलती है।'}
        </p>
      </div>

      <Card className="border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50">
        <CardContent className="p-8">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">
              <span className="text-5xl">{getAgeEmoji(age)}</span>
            </div>
            <span className="text-5xl font-bold text-emerald-600">{age}</span>
            <span className="mt-2 text-lg text-gray-600">
              {language === 'en' ? 'years old' : 'वर्ष'}
            </span>
            <span className="mt-1 text-sm font-medium text-emerald-700">
              {getAgeLabel(age)}
            </span>
          </div>

          <Slider
            value={[age]}
            onValueChange={([value]) => updateQuizAnswer('age', value)}
            min={18}
            max={65}
            step={1}
            className="w-full"
          />

          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <span>18</span>
            <span>65</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

