'use client';

import { useState } from 'react';
import { Instrument } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { t, formatCurrency } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, ShoppingCart, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InstrumentCardProps {
  instrument: Instrument;
}

const riskColors = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

const instrumentNames: Record<string, { en: string; hi: string }> = {
  large_cap: { en: 'Large Cap Fund', hi: 'लार्ज कैप फंड' },
  balanced: { en: 'Balanced Mix Fund', hi: 'बैलेंस्ड मिक्स फंड' },
  index: { en: 'Index Basket', hi: 'इंडेक्स बास्केट' },
  debt: { en: 'Debt Saver Fund', hi: 'डेट सेवर फंड' },
};

const instrumentDescs: Record<string, { en: string; hi: string }> = {
  large_cap: {
    en: 'Top 100 companies. Lower risk, steady returns.',
    hi: 'शीर्ष 100 कंपनियां। कम जोखिम, स्थिर रिटर्न।',
  },
  balanced: {
    en: 'Mix of equity and debt. Moderate growth.',
    hi: 'इक्विटी और डेट का मिश्रण। मध्यम वृद्धि।',
  },
  index: {
    en: 'Tracks market index. Low cost, diversified.',
    hi: 'मार्केट इंडेक्स ट्रैक करता है। कम लागत, विविध।',
  },
  debt: {
    en: 'Government & corporate bonds. Very safe.',
    hi: 'सरकारी और कॉर्पोरेट बॉन्ड। बहुत सुरक्षित।',
  },
};

export function InstrumentCard({ instrument }: InstrumentCardProps) {
  const { language, playground, executeBuy } = useAppStore();
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [amount, setAmount] = useState('10000');
  const [error, setError] = useState('');

  const priceChange = instrument.priceHistory.length >= 2
    ? ((instrument.currentPrice - instrument.priceHistory[instrument.priceHistory.length - 2]) / instrument.priceHistory[instrument.priceHistory.length - 2]) * 100
    : 0;

  const isPositive = priceChange >= 0;

  const handleBuy = () => {
    setError('');
    const amountNum = parseFloat(amount);
    
    if (isNaN(amountNum) || amountNum <= 0) {
      setError(language === 'en' ? 'Enter a valid amount' : 'सही राशि दर्ज करें');
      return;
    }

    const result = executeBuy(instrument.id, amountNum);
    if (!result.success) {
      setError(t(`error.${result.error?.replace(/ /g, '_').toLowerCase()}`, language) || result.error || '');
      return;
    }

    setShowBuyDialog(false);
    setAmount('10000');
  };

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-lg border-2 border-transparent hover:border-emerald-200">
        <div className={cn(
          'h-1 w-full',
          instrument.riskLevel === 'low' && 'bg-green-500',
          instrument.riskLevel === 'medium' && 'bg-yellow-500',
          instrument.riskLevel === 'high' && 'bg-red-500'
        )} />
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">
                {instrumentNames[instrument.id]?.[language] || instrument.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-[180px]">
                {instrumentDescs[instrument.id]?.[language] || instrument.description}
              </p>
            </div>
            <Badge className={riskColors[instrument.riskLevel]}>
              {instrument.riskLevel === 'low' && (language === 'en' ? 'Low Risk' : 'कम जोखिम')}
              {instrument.riskLevel === 'medium' && (language === 'en' ? 'Medium' : 'मध्यम')}
              {instrument.riskLevel === 'high' && (language === 'en' ? 'High' : 'उच्च')}
            </Badge>
          </div>

          <div className="flex items-end justify-between mt-4">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Price/Unit' : 'मूल्य/यूनिट'}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(instrument.currentPrice, language)}
                </span>
                <span className={cn(
                  'flex items-center text-sm font-medium',
                  isPositive ? 'text-green-600' : 'text-red-600'
                )}>
                  {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
                </span>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => setShowBuyDialog(true)}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {t('playground.buy', language)}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-emerald-500" />
              {language === 'en' ? 'Buy' : 'खरीदें'} {instrumentNames[instrument.id]?.[language]}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{language === 'en' ? 'Available Cash' : 'उपलब्ध नकद'}</span>
              <span className="font-semibold text-emerald-600">
                {formatCurrency(playground.cashBalance, language)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{language === 'en' ? 'Price/Unit' : 'मूल्य/यूनिट'}</span>
              <span className="font-medium">
                {formatCurrency(instrument.currentPrice, language)}
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {t('playground.amount', language)}
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-9"
                  placeholder="10000"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <div className="rounded-lg bg-emerald-50 p-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{language === 'en' ? 'Units you\'ll get' : 'आपको मिलेंगी यूनिट्स'}</span>
                <span className="font-semibold text-emerald-700">
                  {(parseFloat(amount) / instrument.currentPrice || 0).toFixed(4)}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              {[5000, 10000, 25000].map((val) => (
                <Button
                  key={val}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(val.toString())}
                  className="flex-1"
                >
                  {formatCurrency(val, language)}
                </Button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBuyDialog(false)}>
              {language === 'en' ? 'Cancel' : 'रद्द करें'}
            </Button>
            <Button onClick={handleBuy} className="bg-emerald-500 hover:bg-emerald-600">
              {language === 'en' ? 'Confirm Purchase' : 'खरीद पुष्टि करें'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

