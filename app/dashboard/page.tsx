'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { concepts } from '@/lib/concepts';
import { ConceptCard } from '@/components/concepts/ConceptCard';
import { ConceptDetailView } from '@/components/concepts/ConceptDetailView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Gamepad2, 
  Shield, 
  Star,
  AlertTriangle,
  Loader2,
  BookOpen
} from 'lucide-react';
import { ConceptDetail, MentorResponse } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const { 
    language, 
    hasCompletedQuiz, 
    userProfile, 
    userLevel,
    playground,
    setMentorResponse,
    mentorResponse,
    mentorLoading,
    setMentorLoading
  } = useAppStore();

  const [selectedConcept, setSelectedConcept] = useState<ConceptDetail | null>(null);
  const [isConceptOpen, setIsConceptOpen] = useState(false);

  useEffect(() => {
    if (!hasCompletedQuiz) {
      router.push('/quiz');
    }
  }, [hasCompletedQuiz, router]);

  // Fetch mentor response on load
  useEffect(() => {
    const fetchMentorAdvice = async () => {
      if (!userProfile || mentorResponse) return;
      
      setMentorLoading(true);
      try {
        const response = await fetch('/api/mentor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userProfile: {
              age: userProfile.age,
              experience_summary: userProfile.experience,
              risk_profile: userProfile.riskComfort <= 2 ? 'low' : userProfile.riskComfort >= 4 ? 'high' : 'medium',
              primary_language: language,
              secondary_language: language === 'en' ? 'hi' : 'en',
              user_question: 'How should I start my investment journey?',
            },
            playground: {
              created_portfolio: playground.holdings.length > 0,
              sim_trades_count: playground.simTradesCount,
              behavior_summary: playground.holdings.length > 0 
                ? `Has ${playground.holdings.length} holdings worth ${playground.totalValue}`
                : 'No investments yet',
            },
          }),
        });
        const data = await response.json();
        setMentorResponse(data);
      } catch (error) {
        console.error('Failed to fetch mentor advice:', error);
      } finally {
        setMentorLoading(false);
      }
    };

    fetchMentorAdvice();
  }, [userProfile, language, playground, mentorResponse, setMentorResponse, setMentorLoading]);

  const handleConceptClick = (concept: ConceptDetail) => {
    setSelectedConcept(concept);
    setIsConceptOpen(true);
  };

  const levelLabels: Record<string, { en: string; hi: string }> = {
    'Curious': { en: 'Curious', hi: 'उत्सुक' },
    'Getting Started': { en: 'Getting Started', hi: 'शुरुआत कर रहे हैं' },
    'Confident Beginner': { en: 'Confident Beginner', hi: 'आत्मविश्वासी शुरुआती' },
  };

  const levelColors = {
    'Curious': 'from-blue-500 to-indigo-500',
    'Getting Started': 'from-emerald-500 to-teal-500',
    'Confident Beginner': 'from-purple-500 to-pink-500',
  };

  if (!hasCompletedQuiz) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {t('dashboard.welcome', language)} 👋
        </h1>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Explore investing concepts and practice with virtual money.'
            : 'निवेश की अवधारणाओं का पता लगाएं और वर्चुअल मनी के साथ अभ्यास करें।'}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Level Card */}
          {userLevel && (
            <Card className={`overflow-hidden border-0 text-white bg-gradient-to-r ${levelColors[userLevel.label as keyof typeof levelColors] || 'from-emerald-500 to-teal-500'}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">{t('dashboard.level', language)}</p>
                    <h2 className="text-2xl font-bold">
                      {levelLabels[userLevel.label]?.[language] || userLevel.label}
                    </h2>
                    <p className="text-sm opacity-80 mt-2">
                      {mentorResponse?.user_level?.short_reason || userLevel.short_reason}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {[...Array(3)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-6 w-6 ${i < userLevel.score_0_to_3 ? 'fill-white' : 'opacity-40'}`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{language === 'en' ? 'Progress' : 'प्रगति'}</span>
                    <span>{Math.round(userLevel.score_0_to_3 / 3 * 100)}%</span>
                  </div>
                  <Progress 
                    value={userLevel.score_0_to_3 / 3 * 100} 
                    className="h-2 bg-white/30" 
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Concepts Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-900">
                {t('dashboard.concepts', language)}
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {concepts.map((concept) => (
                <ConceptCard
                  key={concept.id}
                  concept={concept}
                  onClick={() => handleConceptClick(concept)}
                />
              ))}
            </div>
          </div>

          {/* Mentor Loading State */}
          {mentorLoading && (
            <Card className="border-2 border-dashed border-emerald-200">
              <CardContent className="p-6 flex items-center justify-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
                <span className="text-gray-600">
                  {language === 'en' ? 'Getting personalized advice...' : 'व्यक्तिगत सलाह प्राप्त हो रही है...'}
                </span>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="border-2 border-emerald-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                {t('dashboard.portfolio', language)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    {language === 'en' ? 'Total Value' : 'कुल मूल्य'}
                  </span>
                  <span className="font-semibold">
                    ₹{playground.totalValue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    {language === 'en' ? 'Holdings' : 'होल्डिंग्स'}
                  </span>
                  <span className="font-semibold">{playground.holdings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    {language === 'en' ? 'Trades Made' : 'किए गए ट्रेड'}
                  </span>
                  <span className="font-semibold">{playground.simTradesCount}</span>
                </div>
              </div>
              <Link href="/playground">
                <Button className="w-full mt-4 gap-2 bg-emerald-500 hover:bg-emerald-600">
                  <Gamepad2 className="h-4 w-4" />
                  {language === 'en' ? 'Go to Playground' : 'प्लेग्राउंड पर जाएं'}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Safety Notes */}
          <Card className="border-2 border-amber-100 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 text-amber-800">
                <Shield className="h-4 w-4" />
                {language === 'en' ? 'Safety Tips' : 'सुरक्षा टिप्स'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(mentorResponse?.safety_notes || [
                t('safety.emergency_fund', language),
                t('safety.long_term', language),
                t('safety.virtual_only', language),
              ]).map((note, index) => (
                <div key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">{note}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Next Steps from Mentor */}
          {mentorResponse?.ui_copy && (
            <Card className="border-2 border-purple-100 bg-purple-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-purple-800">
                  {language === 'en' ? 'Next Steps' : 'अगले कदम'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-purple-700">
                  {language === 'en' 
                    ? mentorResponse.ui_copy.next_step_hint_en 
                    : mentorResponse.ui_copy.next_step_hint_hi}
                </p>
                <Link href="/playground">
                  <Button variant="outline" className="w-full mt-3 border-purple-200 text-purple-700 hover:bg-purple-100">
                    {language === 'en' 
                      ? mentorResponse.ui_copy.cta_label_en 
                      : mentorResponse.ui_copy.cta_label_hi}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Concept Detail Modal */}
      <ConceptDetailView
        concept={selectedConcept}
        isOpen={isConceptOpen}
        onClose={() => setIsConceptOpen(false)}
      />
    </div>
  );
}

