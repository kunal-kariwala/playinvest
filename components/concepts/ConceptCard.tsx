'use client';

import { ConceptDetail } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ConceptCardProps {
  concept: ConceptDetail;
  onClick: () => void;
}

export function ConceptCard({ concept, onClick }: ConceptCardProps) {
  const { language } = useAppStore();

  const oneLiners: Record<string, { en: string; hi: string }> = {
    risk_return: {
      en: 'Higher potential returns usually come with higher risk.',
      hi: 'उच्च संभावित रिटर्न आमतौर पर उच्च जोखिम के साथ आता है।',
    },
    diversification: {
      en: "Don't put all eggs in one basket - spread your money.",
      hi: 'सारे अंडे एक टोकरी में न रखें - अपना पैसा बाँटें।',
    },
    time_horizon: {
      en: 'Longer investment periods help ride out market ups and downs.',
      hi: 'लंबी निवेश अवधि बाजार के उतार-चढ़ाव से निपटने में मदद करती है।',
    },
    sip: {
      en: 'Invest regularly to average out market highs and lows.',
      hi: 'बाजार के उतार-चढ़ाव को औसत करने के लिए नियमित निवेश करें।',
    },
    compounding: {
      en: 'Earn returns on your returns - money grows faster over time.',
      hi: 'रिटर्न पर रिटर्न कमाएं - समय के साथ पैसा तेज़ी से बढ़ता है।',
    },
    volatility: {
      en: "Markets go up and down - it's normal, not scary.",
      hi: 'बाजार ऊपर-नीचे होते हैं - यह सामान्य है, डरावना नहीं।',
    },
  };

  const titles: Record<string, { en: string; hi: string }> = {
    risk_return: { en: 'Risk vs Return', hi: 'जोखिम बनाम रिटर्न' },
    diversification: { en: 'Diversification', hi: 'विविधीकरण' },
    time_horizon: { en: 'Time Horizon', hi: 'समय सीमा' },
    sip: { en: 'SIP & Averaging', hi: 'SIP और औसतीकरण' },
    compounding: { en: 'Compounding', hi: 'चक्रवृद्धि' },
    volatility: { en: 'Volatility', hi: 'अस्थिरता' },
  };

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-lg hover:shadow-emerald-100',
        'border-2 border-transparent hover:border-emerald-200',
        'bg-gradient-to-br from-white to-gray-50'
      )}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-2xl shadow-sm">
            {concept.icon_emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {titles[concept.id]?.[language] || concept.title}
            </h3>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {oneLiners[concept.id]?.[language] || concept.one_liner}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end">
          <span className="text-xs font-medium text-emerald-600">
            {language === 'en' ? 'Learn more →' : 'और जानें →'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

