'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Mission {
  id: string;
  title: string;
  description: string;
  steps: string[];
  riskNote: string;
  completed: boolean;
}

interface MissionCardProps {
  mission: Mission;
}

const missionTitles: Record<string, { en: string; hi: string }> = {
  diversified_portfolio: {
    en: 'Build a Diversified Portfolio',
    hi: 'विविध पोर्टफोलियो बनाएं',
  },
  market_simulation: {
    en: 'Survive a Market Dip',
    hi: 'मार्केट गिरावट से बचें',
  },
  sip_simulation: {
    en: 'Start Monthly Investing',
    hi: 'मासिक निवेश शुरू करें',
  },
};

const missionDescriptions: Record<string, { en: string; hi: string }> = {
  diversified_portfolio: {
    en: 'Create a portfolio with at least 3 different instruments.',
    hi: 'कम से कम 3 अलग-अलग इंस्ट्रूमेंट्स के साथ पोर्टफोलियो बनाएं।',
  },
  market_simulation: {
    en: 'Simulate a -5% market move and observe your portfolio.',
    hi: '-5% मार्केट मूव सिमुलेट करें और अपना पोर्टफोलियो देखें।',
  },
  sip_simulation: {
    en: 'Practice regular investing by making multiple purchases.',
    hi: 'कई खरीदारी करके नियमित निवेश का अभ्यास करें।',
  },
};

const missionSteps: Record<string, { en: string[]; hi: string[] }> = {
  diversified_portfolio: {
    en: [
      'Review the 4 available instruments',
      'Buy at least 3 different funds',
      'Try to include both equity and debt',
      'Check your portfolio composition',
    ],
    hi: [
      '4 उपलब्ध इंस्ट्रूमेंट्स देखें',
      'कम से कम 3 अलग फंड खरीदें',
      'इक्विटी और डेट दोनों शामिल करें',
      'अपना पोर्टफोलियो कंपोजीशन देखें',
    ],
  },
  market_simulation: {
    en: [
      'First, build a portfolio with some investments',
      'Click "Simulate Market" and select -5%',
      'Observe how different funds react',
      'Check your total portfolio value change',
    ],
    hi: [
      'पहले, कुछ निवेश के साथ पोर्टफोलियो बनाएं',
      '"Simulate Market" क्लिक करें और -5% चुनें',
      'देखें कि अलग-अलग फंड कैसे प्रतिक्रिया करते हैं',
      'अपने कुल पोर्टफोलियो मूल्य में बदलाव देखें',
    ],
  },
  sip_simulation: {
    en: [
      'Choose one fund to invest in regularly',
      'Buy ₹10,000 worth of it',
      'Simulate a market move',
      'Buy ₹10,000 again',
      'Notice how your average buy price changes',
    ],
    hi: [
      'नियमित रूप से निवेश के लिए एक फंड चुनें',
      '₹10,000 का खरीदें',
      'मार्केट मूव सिमुलेट करें',
      'फिर से ₹10,000 खरीदें',
      'देखें कि आपकी औसत खरीद कीमत कैसे बदलती है',
    ],
  },
};

const riskNotes: Record<string, { en: string; hi: string }> = {
  diversified_portfolio: {
    en: 'Diversification reduces risk but doesn\'t eliminate it.',
    hi: 'विविधीकरण जोखिम कम करता है लेकिन खत्म नहीं करता।',
  },
  market_simulation: {
    en: 'Market dips are temporary. Panic selling locks in losses.',
    hi: 'मार्केट गिरावट अस्थायी है। घबराहट में बेचना नुकसान तय करता है।',
  },
  sip_simulation: {
    en: 'SIP works best over 3+ years. Short-term may not show benefits.',
    hi: 'SIP 3+ साल में सबसे अच्छा काम करता है। अल्पकालिक में फायदा न दिखे।',
  },
};

export function MissionCard({ mission }: MissionCardProps) {
  const { language } = useAppStore();

  return (
    <Card className={cn(
      'transition-all',
      mission.completed
        ? 'border-2 border-green-200 bg-green-50/50'
        : 'border-2 border-amber-100 hover:border-amber-200 hover:shadow-md'
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {mission.completed ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <Target className="h-5 w-5 text-amber-500" />
            )}
            <CardTitle className="text-base">
              {missionTitles[mission.id]?.[language] || mission.title}
            </CardTitle>
          </div>
          <Badge variant={mission.completed ? 'default' : 'secondary'} className={
            mission.completed ? 'bg-green-500' : ''
          }>
            {mission.completed 
              ? (language === 'en' ? 'Completed' : 'पूरा हुआ')
              : (language === 'en' ? 'In Progress' : 'प्रगति में')
            }
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          {missionDescriptions[mission.id]?.[language] || mission.description}
        </p>

        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-700 uppercase tracking-wide">
            {language === 'en' ? 'Steps' : 'चरण'}
          </p>
          <ol className="space-y-1">
            {(missionSteps[mission.id]?.[language] || mission.steps).map((step, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                  {index + 1}
                </span>
                <span className="text-gray-600">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
          <p className="text-xs text-amber-800">
            {riskNotes[mission.id]?.[language] || mission.riskNote}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

