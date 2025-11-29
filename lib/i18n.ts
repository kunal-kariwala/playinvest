import { Language } from './types';

export const translations: Record<string, Record<Language, string>> = {
  // App General
  'app.name': {
    en: 'PlayInvest by Groww',
    hi: 'PlayInvest by Groww',
  },
  'app.tagline': {
    en: 'Learn investing with fake money, real knowledge',
    hi: 'नकली पैसे से सीखें, असली ज्ञान पाएं',
  },

  // Navigation
  'nav.home': {
    en: 'Home',
    hi: 'होम',
  },
  'nav.learn': {
    en: 'Learn',
    hi: 'सीखें',
  },
  'nav.playground': {
    en: 'Playground',
    hi: 'प्लेग्राउंड',
  },
  'nav.settings': {
    en: 'Settings',
    hi: 'सेटिंग्स',
  },

  // Landing Page
  'landing.hero.title': {
    en: 'Start Your Investment Journey',
    hi: 'अपनी निवेश यात्रा शुरू करें',
  },
  'landing.hero.subtitle': {
    en: 'Learn investing basics with a risk-free playground. Practice with ₹1,00,000 virtual money.',
    hi: 'जोखिम-मुक्त प्लेग्राउंड में निवेश की मूल बातें सीखें। ₹1,00,000 वर्चुअल मनी के साथ अभ्यास करें।',
  },
  'landing.cta.start': {
    en: 'Get Started',
    hi: 'शुरू करें',
  },
  'landing.cta.explore': {
    en: 'Explore Concepts',
    hi: 'अवधारणाएं देखें',
  },

  // Quiz
  'quiz.title': {
    en: 'Let\'s understand you better',
    hi: 'आइए आपको बेहतर समझें',
  },
  'quiz.step.age': {
    en: 'How old are you?',
    hi: 'आपकी उम्र क्या है?',
  },
  'quiz.step.experience': {
    en: 'What\'s your investing experience?',
    hi: 'आपका निवेश अनुभव क्या है?',
  },
  'quiz.step.risk': {
    en: 'How comfortable are you with risk?',
    hi: 'आप जोखिम के साथ कितने सहज हैं?',
  },
  'quiz.step.horizon': {
    en: 'What\'s your investment timeline?',
    hi: 'आपकी निवेश समय-सीमा क्या है?',
  },
  'quiz.step.goal': {
    en: 'What\'s your main goal?',
    hi: 'आपका मुख्य लक्ष्य क्या है?',
  },
  'quiz.next': {
    en: 'Next',
    hi: 'आगे',
  },
  'quiz.back': {
    en: 'Back',
    hi: 'पीछे',
  },
  'quiz.finish': {
    en: 'See My Profile',
    hi: 'मेरी प्रोफाइल देखें',
  },

  // Experience Options
  'exp.never': {
    en: 'Never invested',
    hi: 'कभी निवेश नहीं किया',
  },
  'exp.fds_rds': {
    en: 'Only FDs/RDs',
    hi: 'केवल FD/RD',
  },
  'exp.mutual_funds': {
    en: 'Some mutual funds',
    hi: 'कुछ म्यूचुअल फंड',
  },
  'exp.stocks': {
    en: 'Stocks before',
    hi: 'पहले स्टॉक्स में',
  },

  // Time Horizon Options
  'horizon.less_than_1': {
    en: 'Less than 1 year',
    hi: '1 साल से कम',
  },
  'horizon.1_to_3': {
    en: '1-3 years',
    hi: '1-3 साल',
  },
  'horizon.3_to_5': {
    en: '3-5 years',
    hi: '3-5 साल',
  },
  'horizon.more_than_5': {
    en: 'More than 5 years',
    hi: '5 साल से ज्यादा',
  },

  // Goal Options
  'goal.grow_wealth': {
    en: 'Grow wealth',
    hi: 'धन बढ़ाएं',
  },
  'goal.save_tax': {
    en: 'Save tax',
    hi: 'टैक्स बचाएं',
  },
  'goal.short_term_gain': {
    en: 'Short-term gain',
    hi: 'अल्पकालिक लाभ',
  },
  'goal.build_habit': {
    en: 'Build habit',
    hi: 'आदत बनाएं',
  },

  // Risk Scale
  'risk.low': {
    en: 'Very Conservative',
    hi: 'बहुत सुरक्षित',
  },
  'risk.medium': {
    en: 'Balanced',
    hi: 'संतुलित',
  },
  'risk.high': {
    en: 'Aggressive',
    hi: 'आक्रामक',
  },

  // Dashboard
  'dashboard.welcome': {
    en: 'Welcome back!',
    hi: 'वापसी पर स्वागत है!',
  },
  'dashboard.level': {
    en: 'Your Level',
    hi: 'आपका स्तर',
  },
  'dashboard.portfolio': {
    en: 'Your Portfolio',
    hi: 'आपका पोर्टफोलियो',
  },
  'dashboard.concepts': {
    en: 'Learn Concepts',
    hi: 'अवधारणाएं सीखें',
  },
  'dashboard.missions': {
    en: 'Missions',
    hi: 'मिशन',
  },

  // Playground
  'playground.title': {
    en: 'Virtual Playground',
    hi: 'वर्चुअल प्लेग्राउंड',
  },
  'playground.cash': {
    en: 'Cash Balance',
    hi: 'नकद शेष',
  },
  'playground.invested': {
    en: 'Invested',
    hi: 'निवेशित',
  },
  'playground.total': {
    en: 'Total Value',
    hi: 'कुल मूल्य',
  },
  'playground.gainLoss': {
    en: 'Gain/Loss',
    hi: 'लाभ/हानि',
  },
  'playground.buy': {
    en: 'Buy',
    hi: 'खरीदें',
  },
  'playground.sell': {
    en: 'Sell',
    hi: 'बेचें',
  },
  'playground.amount': {
    en: 'Amount (₹)',
    hi: 'राशि (₹)',
  },
  'playground.simulate': {
    en: 'Simulate Market',
    hi: 'मार्केट सिमुलेट करें',
  },
  'playground.holdings': {
    en: 'Your Holdings',
    hi: 'आपकी होल्डिंग्स',
  },
  'playground.history': {
    en: 'Portfolio History',
    hi: 'पोर्टफोलियो इतिहास',
  },
  'playground.empty': {
    en: 'No holdings yet. Start investing!',
    hi: 'अभी कोई होल्डिंग नहीं। निवेश शुरू करें!',
  },

  // Instruments
  'instrument.large_cap': {
    en: 'Large Cap Fund',
    hi: 'लार्ज कैप फंड',
  },
  'instrument.balanced': {
    en: 'Balanced Mix Fund',
    hi: 'बैलेंस्ड मिक्स फंड',
  },
  'instrument.index': {
    en: 'Index Basket',
    hi: 'इंडेक्स बास्केट',
  },
  'instrument.debt': {
    en: 'Debt Saver Fund',
    hi: 'डेट सेवर फंड',
  },

  // Concepts
  'concept.risk_return': {
    en: 'Risk vs Return',
    hi: 'जोखिम बनाम रिटर्न',
  },
  'concept.diversification': {
    en: 'Diversification',
    hi: 'विविधीकरण',
  },
  'concept.time_horizon': {
    en: 'Time Horizon',
    hi: 'समय सीमा',
  },
  'concept.sip': {
    en: 'SIP & Rupee-Cost Averaging',
    hi: 'SIP और रुपये-लागत औसत',
  },
  'concept.compounding': {
    en: 'Compounding',
    hi: 'चक्रवृद्धि',
  },
  'concept.volatility': {
    en: 'Volatility',
    hi: 'अस्थिरता',
  },

  // Actions
  'action.play_audio': {
    en: 'Play Audio',
    hi: 'ऑडियो चलाएं',
  },
  'action.try_playground': {
    en: 'Try this in Playground',
    hi: 'प्लेग्राउंड में आज़माएं',
  },
  'action.close': {
    en: 'Close',
    hi: 'बंद करें',
  },

  // Settings
  'settings.title': {
    en: 'Settings',
    hi: 'सेटिंग्स',
  },
  'settings.language': {
    en: 'Language',
    hi: 'भाषा',
  },
  'settings.reset': {
    en: 'Reset Progress',
    hi: 'प्रगति रीसेट करें',
  },
  'settings.resetConfirm': {
    en: 'Are you sure? This will reset all your progress.',
    hi: 'क्या आप सुनिश्चित हैं? इससे आपकी सारी प्रगति रीसेट हो जाएगी।',
  },

  // User Levels
  'level.curious': {
    en: 'Curious',
    hi: 'उत्सुक',
  },
  'level.getting_started': {
    en: 'Getting Started',
    hi: 'शुरुआत कर रहे हैं',
  },
  'level.confident_beginner': {
    en: 'Confident Beginner',
    hi: 'आत्मविश्वासी शुरुआती',
  },

  // Safety Notes
  'safety.emergency_fund': {
    en: 'Always keep an emergency fund of 3-6 months expenses before investing.',
    hi: 'निवेश करने से पहले हमेशा 3-6 महीने के खर्च का इमरजेंसी फंड रखें।',
  },
  'safety.long_term': {
    en: 'Investing works best over the long term. Avoid panic selling.',
    hi: 'निवेश लंबी अवधि में सबसे अच्छा काम करता है। घबराहट में बेचने से बचें।',
  },
  'safety.virtual_only': {
    en: 'This is a virtual playground. No real money is involved.',
    hi: 'यह एक वर्चुअल प्लेग्राउंड है। कोई असली पैसा शामिल नहीं है।',
  },

  // Errors
  'error.generic': {
    en: 'Something went wrong. Please try again.',
    hi: 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
  },
  'error.insufficient_funds': {
    en: 'Insufficient funds',
    hi: 'अपर्याप्त धनराशि',
  },
  'error.insufficient_units': {
    en: 'Insufficient units to sell',
    hi: 'बेचने के लिए अपर्याप्त यूनिट्स',
  },
};

export function t(key: string, language: Language): string {
  return translations[key]?.[language] || key;
}

// Helper function for formatted currency
export function formatCurrency(amount: number, language: Language): string {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
  return formatted;
}

// Helper function for percentage
export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

