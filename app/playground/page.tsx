'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { PortfolioSummary } from '@/components/playground/PortfolioSummary';
import { InstrumentCard } from '@/components/playground/InstrumentCard';
import { HoldingCard } from '@/components/playground/HoldingCard';
import { MissionCard } from '@/components/playground/MissionCard';
import { MarketSimulator } from '@/components/playground/MarketSimulator';
import { PortfolioChart } from '@/components/playground/PortfolioChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wallet, 
  Target, 
  ShoppingBag, 
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

export default function PlaygroundPage() {
  const router = useRouter();
  const { 
    language, 
    hasCompletedQuiz, 
    playground,
    missions,
    resetPlayground
  } = useAppStore();

  useEffect(() => {
    if (!hasCompletedQuiz) {
      router.push('/quiz');
    }
  }, [hasCompletedQuiz, router]);

  if (!hasCompletedQuiz) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {t('playground.title', language)} 🎮
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'en' 
              ? 'Practice investing with virtual money - no real risk!'
              : 'वर्चुअल मनी के साथ निवेश का अभ्यास करें - कोई असली जोखिम नहीं!'}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={resetPlayground}
          className="gap-2 text-gray-600"
        >
          <RefreshCw className="h-4 w-4" />
          {language === 'en' ? 'Reset Playground' : 'प्लेग्राउंड रीसेट करें'}
        </Button>
      </div>

      {/* Portfolio Summary */}
      <div className="mb-8">
        <PortfolioSummary />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="invest" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="invest" className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">
              {language === 'en' ? 'Invest' : 'निवेश करें'}
            </span>
          </TabsTrigger>
          <TabsTrigger value="holdings" className="gap-2">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">
              {t('playground.holdings', language)}
            </span>
          </TabsTrigger>
          <TabsTrigger value="missions" className="gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">
              {language === 'en' ? 'Missions' : 'मिशन'}
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Invest Tab */}
        <TabsContent value="invest" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Instruments */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-emerald-500" />
                  {language === 'en' ? 'Available Instruments' : 'उपलब्ध इंस्ट्रूमेंट्स'}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {playground.instruments.map((instrument) => (
                    <InstrumentCard key={instrument.id} instrument={instrument} />
                  ))}
                </div>
              </div>

              {/* Market Simulator */}
              <MarketSimulator />
            </div>

            <div className="space-y-6">
              {/* Portfolio Chart */}
              <PortfolioChart />

              {/* Quick Tips */}
              <Card className="border-2 border-blue-100 bg-blue-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-blue-800">
                    {language === 'en' ? '💡 Quick Tips' : '💡 त्वरित सुझाव'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-blue-700 space-y-2">
                  <p>
                    {language === 'en' 
                      ? '• Diversify by buying at least 3 different funds'
                      : '• कम से कम 3 अलग फंड खरीदकर विविधता लाएं'}
                  </p>
                  <p>
                    {language === 'en'
                      ? '• Mix low and medium risk instruments'
                      : '• कम और मध्यम जोखिम वाले इंस्ट्रूमेंट मिलाएं'}
                  </p>
                  <p>
                    {language === 'en'
                      ? '• Simulate market moves to see how your portfolio reacts'
                      : '• मार्केट मूव सिमुलेट करके देखें पोर्टफोलियो कैसे रिएक्ट करता है'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Holdings Tab */}
        <TabsContent value="holdings" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Wallet className="h-5 w-5 text-emerald-500" />
                {t('playground.holdings', language)}
              </h2>
              
              {playground.holdings.length > 0 ? (
                <div className="space-y-4">
                  {playground.holdings.map((holding) => (
                    <HoldingCard key={holding.id} holding={holding} />
                  ))}
                </div>
              ) : (
                <Card className="border-2 border-dashed border-gray-200">
                  <CardContent className="p-8 text-center">
                    <Wallet className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {t('playground.empty', language)}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <PortfolioChart />
              
              {/* Virtual Money Reminder */}
              <Card className="border-2 border-amber-100 bg-amber-50/50">
                <CardContent className="p-4 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    {t('safety.virtual_only', language)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Missions Tab */}
        <TabsContent value="missions" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-amber-500" />
                {language === 'en' ? 'Learning Missions' : 'लर्निंग मिशन'}
              </h2>
              <div className="space-y-4">
                {missions.map((mission) => (
                  <MissionCard key={mission.id} mission={mission} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Mission Progress */}
              <Card className="border-2 border-emerald-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    {language === 'en' ? 'Your Progress' : 'आपकी प्रगति'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      {language === 'en' ? 'Completed' : 'पूर्ण'}
                    </span>
                    <span className="font-semibold">
                      {missions.filter(m => m.completed).length}/{missions.length}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all"
                      style={{ 
                        width: `${(missions.filter(m => m.completed).length / missions.length) * 100}%` 
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Why Missions Matter */}
              <Card className="border-2 border-purple-100 bg-purple-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-purple-800">
                    {language === 'en' ? '🎯 Why Complete Missions?' : '🎯 मिशन क्यों पूरे करें?'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-purple-700">
                  <p>
                    {language === 'en'
                      ? 'Each mission teaches you a key investing concept through hands-on practice. Complete them all to become a confident beginner investor!'
                      : 'प्रत्येक मिशन आपको हाथों-हाथ अभ्यास के माध्यम से एक मुख्य निवेश अवधारणा सिखाता है। एक आत्मविश्वासी शुरुआती निवेशक बनने के लिए सभी पूरे करें!'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

