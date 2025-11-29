'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { LanguageToggle } from './LanguageToggle';
import { Home, BookOpen, Gamepad2, Settings, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const { language, hasCompletedQuiz } = useAppStore();
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: t('nav.home', language), icon: Home },
    { href: '/dashboard', label: t('nav.learn', language), icon: BookOpen },
    { href: '/playground', label: t('nav.playground', language), icon: Gamepad2 },
    { href: '/settings', label: t('nav.settings', language), icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-100 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-200">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="hidden text-lg font-bold text-gray-900 sm:inline-block">
            Play<span className="text-emerald-600">Invest</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {hasCompletedQuiz && navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
          <div className="ml-2 border-l border-gray-200 pl-2">
            <LanguageToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

