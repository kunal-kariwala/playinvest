'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Gamepad2, 
  BookOpen, 
  Shield, 
  ArrowRight,
  Sparkles,
  Target,
  Languages
} from 'lucide-react';

export default function LandingPage() {
  const { language, hasCompletedQuiz } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (hasCompletedQuiz) {
      router.push('/dashboard');
    }
  }, [hasCompletedQuiz, router]);

  const features = [
    {
      icon: BookOpen,
      title: language === 'en' ? 'Learn Concepts' : 'अवधारणाएं सीखें',
      description: language === 'en' 
        ? 'Visual explanations of key investing terms' 
        : 'मुख्य निवेश शब्दों की दृश्य व्याख्या',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Gamepad2,
      title: language === 'en' ? 'Practice Safely' : 'सुरक्षित अभ्यास',
      description: language === 'en' 
        ? '₹1,00,000 virtual money playground' 
        : '₹1,00,000 वर्चुअल मनी प्लेग्राउंड',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Languages,
      title: language === 'en' ? 'Hindi & English' : 'हिंदी और अंग्रेजी',
      description: language === 'en' 
        ? 'Learn in your preferred language' 
        : 'अपनी पसंदीदा भाषा में सीखें',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: Shield,
      title: language === 'en' ? 'Zero Risk' : 'शून्य जोखिम',
      description: language === 'en' 
        ? 'No real money involved ever' 
        : 'कभी भी असली पैसा शामिल नहीं',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <Badge 
            variant="secondary" 
            className="mb-6 px-4 py-2 text-sm bg-emerald-100 text-emerald-700 border-emerald-200"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {language === 'en' ? 'For New Investors' : 'नए निवेशकों के लिए'}
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {language === 'en' ? (
              <>
                Start Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                  Investment Journey
                </span>
              </>
            ) : (
              <>
                अपनी{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                  निवेश यात्रा
                </span>{' '}
                शुरू करें
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            {t('landing.hero.subtitle', language)}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz">
              <Button 
                size="lg" 
                className="w-full sm:w-auto gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-200 text-lg px-8"
              >
                {t('landing.cta.start', language)}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              {language === 'en' ? 'No Sign-up Required' : 'साइन-अप आवश्यक नहीं'}
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              {language === 'en' ? '100% Free' : '100% मुफ्त'}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-2 border-transparent hover:border-emerald-200 transition-all hover:shadow-lg group"
            >
              <CardContent className="p-6">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          {language === 'en' ? 'How It Works' : 'यह कैसे काम करता है'}
        </h2>

        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {[
            {
              step: '1',
              title: language === 'en' ? 'Take the Quiz' : 'क्विज़ लें',
              description: language === 'en' 
                ? 'Answer 5 quick questions about your goals and comfort level'
                : 'अपने लक्ष्यों और आराम स्तर के बारे में 5 त्वरित प्रश्नों का उत्तर दें',
              icon: Target,
            },
            {
              step: '2',
              title: language === 'en' ? 'Learn Concepts' : 'अवधारणाएं सीखें',
              description: language === 'en'
                ? 'Explore visual explanations of investing basics'
                : 'निवेश की मूल बातों की दृश्य व्याख्याएं देखें',
              icon: BookOpen,
            },
            {
              step: '3',
              title: language === 'en' ? 'Practice Trading' : 'ट्रेडिंग का अभ्यास करें',
              description: language === 'en'
                ? 'Buy and sell with virtual money to build confidence'
                : 'आत्मविश्वास बनाने के लिए वर्चुअल मनी से खरीदें और बेचें',
              icon: TrendingUp,
            },
          ].map((item, index) => (
            <div key={index} className="text-center relative">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 mb-4 mx-auto">
                <item.icon className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">
                {item.step}
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 border-0 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWOGgydjR6bTAtNmgtMlY2aDJ2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
          <CardContent className="p-8 md:p-12 text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {language === 'en' 
                ? 'Ready to Start Learning?' 
                : 'सीखना शुरू करने के लिए तैयार?'}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
              {language === 'en'
                ? 'Join thousands of new investors who started their journey with PlayInvest.'
                : 'हजारों नए निवेशकों से जुड़ें जिन्होंने PlayInvest के साथ अपनी यात्रा शुरू की।'}
            </p>
            <Link href="/quiz">
              <Button 
                size="lg" 
                variant="secondary"
                className="gap-2 bg-white text-emerald-600 hover:bg-gray-100 shadow-xl text-lg px-8"
              >
                {t('landing.cta.start', language)}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">
              Play<span className="text-emerald-600">Invest</span>
            </span>
            <span className="text-sm text-gray-500">by Groww</span>
          </div>
          <p className="text-sm text-gray-500">
            {language === 'en' 
              ? '© 2024 PlayInvest. For educational purposes only.'
              : '© 2024 PlayInvest. केवल शैक्षिक उद्देश्यों के लिए।'}
          </p>
        </div>
      </footer>
    </div>
  );
}
