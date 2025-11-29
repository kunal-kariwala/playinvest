'use client';

import { useAppStore } from '@/lib/store';
import { t, formatCurrency, formatPercent } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet, PiggyBank, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PortfolioSummary() {
  const { language, playground, getGainLoss, getInvestedValue } = useAppStore();
  
  const totalValue = playground.totalValue;
  const cashBalance = playground.cashBalance;
  const investedValue = getInvestedValue();
  const gainLoss = getGainLoss();
  const isPositive = gainLoss >= 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {t('playground.total', language)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatCurrency(totalValue, language)}</p>
          <p className="text-xs opacity-75 mt-1">
            {language === 'en' ? 'Your total portfolio value' : 'आपका कुल पोर्टफोलियो मूल्य'}
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-100 bg-blue-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            {t('playground.cash', language)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-blue-900">{formatCurrency(cashBalance, language)}</p>
          <p className="text-xs text-blue-600 mt-1">
            {language === 'en' ? 'Available to invest' : 'निवेश के लिए उपलब्ध'}
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-purple-100 bg-purple-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
            {t('playground.invested', language)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-purple-900">{formatCurrency(investedValue, language)}</p>
          <p className="text-xs text-purple-600 mt-1">
            {language === 'en' ? 'Currently invested' : 'वर्तमान में निवेशित'}
          </p>
        </CardContent>
      </Card>

      <Card className={cn(
        'border-2',
        isPositive ? 'border-green-100 bg-green-50/50' : 'border-red-100 bg-red-50/50'
      )}>
        <CardHeader className="pb-2">
          <CardTitle className={cn(
            'text-sm font-medium flex items-center gap-2',
            isPositive ? 'text-green-700' : 'text-red-700'
          )}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {t('playground.gainLoss', language)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={cn(
            'text-2xl font-bold',
            isPositive ? 'text-green-900' : 'text-red-900'
          )}>
            {formatPercent(gainLoss)}
          </p>
          <p className={cn(
            'text-xs mt-1',
            isPositive ? 'text-green-600' : 'text-red-600'
          )}>
            {isPositive 
              ? (language === 'en' ? 'You\'re in profit!' : 'आप लाभ में हैं!')
              : (language === 'en' ? 'Stay patient, markets recover' : 'धैर्य रखें, बाजार ठीक होते हैं')
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

