'use client';

import { ConceptDetail } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Volume2, Gamepad2, X } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

interface ConceptDetailViewProps {
  concept: ConceptDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

const COLORS = ['#10b981', '#14b8a6', '#0ea5e9', '#8b5cf6', '#f59e0b'];

export function ConceptDetailView({ concept, isOpen, onClose }: ConceptDetailViewProps) {
  const { language } = useAppStore();

  if (!concept) return null;

  const titles: Record<string, { en: string; hi: string }> = {
    risk_return: { en: 'Risk vs Return', hi: 'जोखिम बनाम रिटर्न' },
    diversification: { en: 'Diversification', hi: 'विविधीकरण' },
    time_horizon: { en: 'Time Horizon', hi: 'समय सीमा' },
    sip: { en: 'SIP & Averaging', hi: 'SIP और औसतीकरण' },
    compounding: { en: 'Compounding', hi: 'चक्रवृद्धि' },
    volatility: { en: 'Volatility', hi: 'अस्थिरता' },
  };

  const explanations: Record<string, { en: string; hi: string }> = {
    risk_return: {
      en: 'Every investment has a trade-off between risk and return. Safe options like FDs give lower but guaranteed returns. Stocks can give high returns but can also lose value.',
      hi: 'हर निवेश में जोखिम और रिटर्न के बीच एक समझौता होता है। FD जैसे सुरक्षित विकल्प कम लेकिन गारंटीड रिटर्न देते हैं। स्टॉक्स उच्च रिटर्न दे सकते हैं लेकिन मूल्य भी खो सकते हैं।',
    },
    diversification: {
      en: 'Diversification means spreading your money across different types of investments. If one performs poorly, others might do well. This reduces overall risk.',
      hi: 'विविधीकरण का मतलब है अपने पैसे को अलग-अलग प्रकार के निवेशों में बांटना। अगर एक खराब प्रदर्शन करता है, तो दूसरे अच्छा कर सकते हैं।',
    },
    time_horizon: {
      en: 'Time horizon is how long you plan to keep your money invested. Short-term goals need safer investments. Long-term goals can handle more risk.',
      hi: 'समय सीमा यह है कि आप कितने समय तक अपना पैसा निवेशित रखने की योजना बनाते हैं। अल्पकालिक लक्ष्यों को सुरक्षित निवेश की जरूरत है।',
    },
    sip: {
      en: 'SIP means investing a fixed amount regularly. When markets are down, you buy more units. When up, you buy fewer. This averages out your cost.',
      hi: 'SIP का मतलब है नियमित रूप से एक निश्चित राशि निवेश करना। जब बाजार नीचे होता है, आप अधिक यूनिट खरीदते हैं। जब ऊपर, तो कम।',
    },
    compounding: {
      en: 'Compounding is when your investment returns also start earning returns. This snowball effect makes money grow exponentially over long periods.',
      hi: 'चक्रवृद्धि तब होती है जब आपके निवेश के रिटर्न भी रिटर्न कमाने लगते हैं। यह स्नोबॉल इफेक्ट लंबी अवधि में पैसे को तेज़ी से बढ़ाता है।',
    },
    volatility: {
      en: "Volatility means how much prices move up and down. High volatility doesn't mean bad - it's just more movement. Understanding it helps you stay calm.",
      hi: 'अस्थिरता का मतलब है कि कीमतें कितनी ऊपर-नीचे होती हैं। उच्च अस्थिरता का मतलब बुरा नहीं है - यह सिर्फ अधिक उतार-चढ़ाव है।',
    },
  };

  const chartData = concept.visual_data.map((value, index) => ({
    name: `${index + 1}`,
    value,
  }));

  const pieData = concept.visual_data.map((value, index) => ({
    name: ['Large Cap', 'Balanced', 'Index', 'Debt'][index] || `Segment ${index + 1}`,
    value,
  }));

  const handlePlayAudio = async (text: string, lang: 'en' | 'hi') => {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: lang }),
      });
      const data = await response.json();
      // In a real app, this would play actual audio
      alert(language === 'en' 
        ? `Audio would play: "${data.text.substring(0, 50)}..."` 
        : `ऑडियो बजेगा: "${data.text.substring(0, 50)}..."`
      );
    } catch (error) {
      console.error('TTS error:', error);
    }
  };

  const renderChart = () => {
    switch (concept.visual_type) {
      case 'line_chart':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar_chart':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-2xl">
              {concept.icon_emoji}
            </div>
            <div>
              <DialogTitle className="text-xl">
                {titles[concept.id]?.[language] || concept.title}
              </DialogTitle>
              <Badge variant="secondary" className="mt-1">
                {language === 'en' ? 'Beginner Concept' : 'शुरुआती अवधारणा'}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Visual */}
          <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            {renderChart()}
          </div>

          {/* Explanation */}
          <div>
            <h4 className="mb-2 font-semibold text-gray-900">
              {language === 'en' ? 'What is this?' : 'यह क्या है?'}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {explanations[concept.id]?.[language] || concept.explanation}
            </p>
          </div>

          {/* Voiceover Scripts */}
          <div>
            <h4 className="mb-3 font-semibold text-gray-900">
              {language === 'en' ? 'Listen & Learn' : 'सुनें और सीखें'}
            </h4>
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="hi">हिंदी</TabsTrigger>
              </TabsList>
              <TabsContent value="en" className="mt-3">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {concept.voiceover_en}
                  </p>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handlePlayAudio(concept.voiceover_en, 'en')}
                    className="gap-2"
                  >
                    <Volume2 className="h-4 w-4" />
                    Play Audio
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="hi" className="mt-3">
                <div className="rounded-lg bg-orange-50 p-4">
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {concept.voiceover_hi}
                  </p>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handlePlayAudio(concept.voiceover_hi, 'hi')}
                    className="gap-2"
                  >
                    <Volume2 className="h-4 w-4" />
                    ऑडियो चलाएं
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* CTA */}
          {concept.relatedMissionId && (
            <Link href="/playground" onClick={onClose}>
              <Button className="w-full gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                <Gamepad2 className="h-4 w-4" />
                {language === 'en' ? 'Try this in Playground' : 'प्लेग्राउंड में आज़माएं'}
              </Button>
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

