'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { 
  Settings, 
  Languages, 
  Trash2, 
  User, 
  AlertTriangle,
  Check
} from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { 
    language, 
    setLanguage,
    hasCompletedQuiz, 
    userProfile,
    userLevel,
    playground,
    resetAll
  } = useAppStore();

  const [showResetDialog, setShowResetDialog] = useState(false);

  useEffect(() => {
    if (!hasCompletedQuiz) {
      router.push('/quiz');
    }
  }, [hasCompletedQuiz, router]);

  const handleReset = () => {
    resetAll();
    setShowResetDialog(false);
    router.push('/');
  };

  const experienceLabels: Record<string, { en: string; hi: string }> = {
    never: { en: 'Never invested', hi: 'कभी निवेश नहीं किया' },
    fds_rds: { en: 'Only FDs/RDs', hi: 'केवल FD/RD' },
    mutual_funds: { en: 'Some mutual funds', hi: 'कुछ म्यूचुअल फंड' },
    stocks: { en: 'Stocks before', hi: 'पहले स्टॉक्स में' },
  };

  const horizonLabels: Record<string, { en: string; hi: string }> = {
    less_than_1: { en: 'Less than 1 year', hi: '1 साल से कम' },
    '1_to_3': { en: '1-3 years', hi: '1-3 साल' },
    '3_to_5': { en: '3-5 years', hi: '3-5 साल' },
    more_than_5: { en: 'More than 5 years', hi: '5 साल से ज्यादा' },
  };

  const goalLabels: Record<string, { en: string; hi: string }> = {
    grow_wealth: { en: 'Grow wealth', hi: 'धन बढ़ाएं' },
    save_tax: { en: 'Save tax', hi: 'टैक्स बचाएं' },
    short_term_gain: { en: 'Short-term gain', hi: 'अल्पकालिक लाभ' },
    build_habit: { en: 'Build habit', hi: 'आदत बनाएं' },
  };

  if (!hasCompletedQuiz) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="h-7 w-7 text-gray-600" />
          {t('settings.title', language)}
        </h1>
      </div>

      <div className="space-y-6">
        {/* Language Settings */}
        <Card className="border-2 border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Languages className="h-5 w-5 text-emerald-500" />
              {t('settings.language', language)}
            </CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Choose your preferred language'
                : 'अपनी पसंदीदा भाषा चुनें'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
              >
                {language === 'en' && <Check className="h-4 w-4 mr-2" />}
                English
              </Button>
              <Button
                variant={language === 'hi' ? 'default' : 'outline'}
                onClick={() => setLanguage('hi')}
                className={language === 'hi' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
              >
                {language === 'hi' && <Check className="h-4 w-4 mr-2" />}
                हिंदी
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Summary */}
        {userProfile && (
          <Card className="border-2 border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-blue-500" />
                {language === 'en' ? 'Your Profile' : 'आपकी प्रोफाइल'}
              </CardTitle>
              {userLevel && (
                <Badge className="w-fit bg-emerald-100 text-emerald-700">
                  {userLevel.label}
                </Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? 'Age' : 'उम्र'}
                  </p>
                  <p className="font-medium">{userProfile.age} {language === 'en' ? 'years' : 'वर्ष'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? 'Experience' : 'अनुभव'}
                  </p>
                  <p className="font-medium">
                    {experienceLabels[userProfile.experience]?.[language]}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? 'Risk Comfort' : 'जोखिम आराम'}
                  </p>
                  <p className="font-medium">
                    {userProfile.riskComfort}/5
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? 'Time Horizon' : 'समय सीमा'}
                  </p>
                  <p className="font-medium">
                    {horizonLabels[userProfile.timeHorizon]?.[language]}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? 'Main Goal' : 'मुख्य लक्ष्य'}
                  </p>
                  <p className="font-medium">
                    {goalLabels[userProfile.mainGoal]?.[language]}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Playground Stats */}
        <Card className="border-2 border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg">
              {language === 'en' ? '📊 Playground Stats' : '📊 प्लेग्राउंड आंकड़े'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-2xl font-bold text-emerald-600">
                  {playground.simTradesCount}
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'en' ? 'Trades' : 'ट्रेड'}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-2xl font-bold text-blue-600">
                  {playground.holdings.length}
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'en' ? 'Holdings' : 'होल्डिंग्स'}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-2xl font-bold text-purple-600">
                  {playground.history.length}
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'en' ? 'History' : 'इतिहास'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reset Section */}
        <Card className="border-2 border-red-100 bg-red-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-red-700">
              <Trash2 className="h-5 w-5" />
              {t('settings.reset', language)}
            </CardTitle>
            <CardDescription className="text-red-600">
              {language === 'en'
                ? 'This will delete all your progress and start fresh.'
                : 'इससे आपकी सारी प्रगति हट जाएगी और नए सिरे से शुरू होगा।'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              onClick={() => setShowResetDialog(true)}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              {t('settings.reset', language)}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Reset Confirmation Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              {t('settings.reset', language)}
            </DialogTitle>
            <DialogDescription>
              {t('settings.resetConfirm', language)}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>
              {language === 'en' ? 'Cancel' : 'रद्द करें'}
            </Button>
            <Button variant="destructive" onClick={handleReset}>
              {language === 'en' ? 'Yes, Reset Everything' : 'हाँ, सब रीसेट करें'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

