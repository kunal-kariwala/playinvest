'use client';

import { useState } from 'react';
import { Holding } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { t, formatCurrency, formatPercent } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HoldingCardProps {
  holding: Holding;
}

const holdingNames: Record<string, { en: string; hi: string }> = {
  'Large Cap Fund': { en: 'Large Cap Fund', hi: 'लार्ज कैप फंड' },
  'Balanced Mix Fund': { en: 'Balanced Mix Fund', hi: 'बैलेंस्ड मिक्स फंड' },
  'Index Basket': { en: 'Index Basket', hi: 'इंडेक्स बास्केट' },
  'Debt Saver Fund': { en: 'Debt Saver Fund', hi: 'डेट सेवर फंड' },
};

export function HoldingCard({ holding }: HoldingCardProps) {
  const { language, executeSell } = useAppStore();
  const [showSellDialog, setShowSellDialog] = useState(false);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const currentValue = holding.units * holding.currentPrice;
  const investedValue = holding.units * holding.avgBuyPrice;
  const gainLoss = currentValue - investedValue;
  const gainLossPercent = ((currentValue - investedValue) / investedValue) * 100;
  const isPositive = gainLoss >= 0;

  const handleSell = () => {
    setError('');
    const amountNum = parseFloat(amount);
    
    if (isNaN(amountNum) || amountNum <= 0) {
      setError(language === 'en' ? 'Enter a valid amount' : 'सही राशि दर्ज करें');
      return;
    }

    if (amountNum > currentValue) {
      setError(t('error.insufficient_units', language));
      return;
    }

    const result = executeSell(holding.instrumentId, amountNum);
    if (!result.success) {
      setError(result.error || '');
      return;
    }

    setShowSellDialog(false);
    setAmount('');
  };

  const handleSellAll = () => {
    setAmount(currentValue.toFixed(2));
  };

  return (
    <>
      <Card className="overflow-hidden border-l-4 border-l-emerald-500">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">
                {holdingNames[holding.name]?.[language] || holding.name}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {holding.units.toFixed(4)} {language === 'en' ? 'units' : 'यूनिट्स'} @ {formatCurrency(holding.avgBuyPrice, language)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">
                {formatCurrency(currentValue, language)}
              </p>
              <div className={cn(
                'flex items-center justify-end text-sm font-medium',
                isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {formatCurrency(Math.abs(gainLoss), language)} ({formatPercent(gainLossPercent)})
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowSellDialog(true)}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Minus className="h-4 w-4 mr-1" />
              {t('playground.sell', language)}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showSellDialog} onOpenChange={setShowSellDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Minus className="h-5 w-5 text-red-500" />
              {language === 'en' ? 'Sell' : 'बेचें'} {holdingNames[holding.name]?.[language]}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{language === 'en' ? 'Current Value' : 'वर्तमान मूल्य'}</span>
              <span className="font-semibold text-emerald-600">
                {formatCurrency(currentValue, language)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{language === 'en' ? 'Total Units' : 'कुल यूनिट्स'}</span>
              <span className="font-medium">{holding.units.toFixed(4)}</span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {language === 'en' ? 'Amount to sell (₹)' : 'बेचने की राशि (₹)'}
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={currentValue.toFixed(2)}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSellAll}
              className="w-full"
            >
              {language === 'en' ? 'Sell All' : 'सब बेचें'} ({formatCurrency(currentValue, language)})
            </Button>

            {parseFloat(amount) > 0 && (
              <div className="rounded-lg bg-red-50 p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{language === 'en' ? 'Units to sell' : 'बेचने के लिए यूनिट्स'}</span>
                  <span className="font-semibold text-red-700">
                    {(parseFloat(amount) / holding.currentPrice).toFixed(4)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSellDialog(false)}>
              {language === 'en' ? 'Cancel' : 'रद्द करें'}
            </Button>
            <Button
              onClick={handleSell}
              variant="destructive"
            >
              {language === 'en' ? 'Confirm Sale' : 'बिक्री पुष्टि करें'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

