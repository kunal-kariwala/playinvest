'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Activity, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MarketSimulator() {
  const { language, executeMarketMove } = useAppStore();
  const [showDialog, setShowDialog] = useState(false);
  const [movePercent, setMovePercent] = useState([0]);

  const handleSimulate = () => {
    executeMarketMove(movePercent[0]);
    setShowDialog(false);
    setMovePercent([0]);
  };

  const getEmoji = (percent: number) => {
    if (percent <= -5) return '📉';
    if (percent < 0) return '😟';
    if (percent === 0) return '😐';
    if (percent <= 5) return '😊';
    return '🚀';
  };

  const getMessage = (percent: number) => {
    if (percent <= -5) {
      return language === 'en' 
        ? 'Major market correction - stay calm!' 
        : 'बड़ी मार्केट गिरावट - शांत रहें!';
    }
    if (percent < 0) {
      return language === 'en' 
        ? 'Minor dip - normal market behavior' 
        : 'छोटी गिरावट - सामान्य मार्केट व्यवहार';
    }
    if (percent === 0) {
      return language === 'en' 
        ? 'No change - flat market' 
        : 'कोई बदलाव नहीं - फ्लैट मार्केट';
    }
    if (percent <= 5) {
      return language === 'en' 
        ? 'Healthy growth - good times!' 
        : 'स्वस्थ वृद्धि - अच्छे दिन!';
    }
    return language === 'en' 
      ? 'Strong rally - but stay diversified!' 
      : 'मजबूत रैली - लेकिन विविध रहें!';
  };

  return (
    <>
      <Card className="border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Activity className="h-4 w-4 text-purple-500" />
            {t('playground.simulate', language)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-500 mb-4">
            {language === 'en' 
              ? 'See how your portfolio reacts to market changes' 
              : 'देखें कि आपका पोर्टफोलियो मार्केट बदलाव पर कैसे प्रतिक्रिया करता है'}
          </p>
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={() => { setMovePercent([-5]); setShowDialog(true); }}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <TrendingDown className="h-4 w-4 mr-1" />
              -5%
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => { setMovePercent([-2]); setShowDialog(true); }}
              className="text-orange-600 border-orange-200 hover:bg-orange-50"
            >
              <TrendingDown className="h-4 w-4 mr-1" />
              -2%
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => { setMovePercent([3]); setShowDialog(true); }}
              className="text-green-600 border-green-200 hover:bg-green-50"
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              +3%
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => { setMovePercent([5]); setShowDialog(true); }}
              className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              +5%
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setShowDialog(true)}
            >
              <Zap className="h-4 w-4 mr-1" />
              {language === 'en' ? 'Custom' : 'कस्टम'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-500" />
              {language === 'en' ? 'Simulate Market Move' : 'मार्केट मूव सिमुलेट करें'}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? 'Adjust the slider to simulate a market change and see how your portfolio responds.'
                : 'स्लाइडर एडजस्ट करें और देखें कि आपका पोर्टफोलियो कैसे प्रतिक्रिया करता है।'}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-6">
            <div className="text-center">
              <span className="text-6xl">{getEmoji(movePercent[0])}</span>
              <p className={cn(
                'text-4xl font-bold mt-4',
                movePercent[0] < 0 ? 'text-red-600' : movePercent[0] > 0 ? 'text-green-600' : 'text-gray-600'
              )}>
                {movePercent[0] >= 0 ? '+' : ''}{movePercent[0]}%
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {getMessage(movePercent[0])}
              </p>
            </div>

            <div className="px-4">
              <Slider
                value={movePercent}
                onValueChange={setMovePercent}
                min={-10}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>-10%</span>
                <span>0%</span>
                <span>+10%</span>
              </div>
            </div>

            <div className="rounded-lg bg-amber-50 p-4">
              <p className="text-sm text-amber-800">
                <strong>{language === 'en' ? 'Remember:' : 'याद रखें:'}</strong>{' '}
                {language === 'en' 
                  ? 'This is a simulation. Real markets can move unpredictably. The goal is to understand how diversification and risk levels affect your portfolio.'
                  : 'यह एक सिमुलेशन है। असली बाजार अप्रत्याशित रूप से चल सकते हैं। लक्ष्य यह समझना है कि विविधीकरण और जोखिम स्तर आपके पोर्टफोलियो को कैसे प्रभावित करते हैं।'}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              {language === 'en' ? 'Cancel' : 'रद्द करें'}
            </Button>
            <Button 
              onClick={handleSimulate} 
              className={cn(
                movePercent[0] < 0 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-emerald-500 hover:bg-emerald-600'
              )}
            >
              {language === 'en' ? 'Apply Change' : 'बदलाव लागू करें'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

