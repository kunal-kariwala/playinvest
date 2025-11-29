'use client';

import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useAppStore();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
      className="flex items-center gap-2 font-medium text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50"
    >
      <Languages className="h-4 w-4" />
      <span className="text-sm">{language === 'en' ? 'हिंदी' : 'English'}</span>
    </Button>
  );
}

