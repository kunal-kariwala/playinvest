import { ConceptDetail } from './types';

export const concepts: ConceptDetail[] = [
  {
    id: 'risk_return',
    title: 'Risk vs Return',
    one_liner: 'Higher potential returns usually come with higher risk.',
    icon_emoji: '⚖️',
    explanation: 'Every investment has a trade-off between risk and return. Safe options like FDs give lower but guaranteed returns. Stocks can give high returns but can also lose value. Understanding your comfort with risk helps you choose the right investments.',
    visual_type: 'bar_chart',
    visual_data: [2, 4, 6, 8, 10], // Risk levels showing return potential
    voiceover_en: 'Risk and return go hand in hand. Safe investments like fixed deposits give you guaranteed but lower returns, around 6-7% per year. On the other hand, stocks can give you 12-15% returns over the long term, but they can also fall in value. The key is to match your investments with how much risk you can handle. Start small, learn, and gradually build confidence.',
    voiceover_hi: 'जोखिम और रिटर्न साथ-साथ चलते हैं। फिक्स्ड डिपॉजिट जैसे सुरक्षित निवेश आपको गारंटीड लेकिन कम रिटर्न देते हैं, लगभग 6-7% प्रति वर्ष। दूसरी ओर, स्टॉक्स आपको लंबी अवधि में 12-15% रिटर्न दे सकते हैं, लेकिन इनकी वैल्यू गिर भी सकती है। मुख्य बात यह है कि अपने निवेश को अपनी जोखिम क्षमता के साथ मिलाएं।',
    relatedMissionId: 'diversified_portfolio',
  },
  {
    id: 'diversification',
    title: 'Diversification',
    one_liner: 'Don\'t put all eggs in one basket - spread your money.',
    icon_emoji: '🧺',
    explanation: 'Diversification means spreading your money across different types of investments. If one investment performs poorly, others might do well. This reduces overall risk. A mix of large-cap funds, debt funds, and index funds creates a balanced portfolio.',
    visual_type: 'pie',
    visual_data: [30, 25, 25, 20], // Portfolio allocation percentages
    voiceover_en: 'Imagine putting all your savings in one company\'s stock. If that company fails, you lose everything. But if you spread your money across different investments - some in large companies, some in bonds, some in index funds - even if one falls, others can balance it out. This is diversification. It\'s like having multiple safety nets. In the playground, try buying at least 3 different funds to see how it works.',
    voiceover_hi: 'सोचिए अगर आप अपनी सारी बचत एक कंपनी के स्टॉक में लगा दें। अगर वह कंपनी फेल हो जाए तो आप सब कुछ खो देंगे। लेकिन अगर आप अपना पैसा अलग-अलग निवेशों में बांट दें - कुछ बड़ी कंपनियों में, कुछ बॉन्ड में, कुछ इंडेक्स फंड में - तो अगर एक गिरता है, तो दूसरे संतुलित कर सकते हैं। यही है डायवर्सिफिकेशन।',
    relatedMissionId: 'diversified_portfolio',
  },
  {
    id: 'time_horizon',
    title: 'Time Horizon',
    one_liner: 'Longer investment periods help ride out market ups and downs.',
    icon_emoji: '⏰',
    explanation: 'Time horizon is how long you plan to keep your money invested. Short-term goals (1-2 years) need safer investments. Long-term goals (5+ years) can handle more risk because there\'s time to recover from market dips.',
    visual_type: 'line_chart',
    visual_data: [100, 95, 105, 98, 110, 108, 120, 115, 130, 140], // Long-term growth with volatility
    voiceover_en: 'Think of investing like planting a tree. You can\'t expect fruits in the first month. Markets go up and down daily, but over 5-10 years, they generally grow. If you need money in 6 months, keep it in fixed deposits. But for goals 5 years away - like buying a house - you can invest in equity funds. Time is your best friend in investing. The longer you stay, the more your money can grow.',
    voiceover_hi: 'निवेश को पेड़ लगाने जैसा समझें। आप पहले महीने में फल की उम्मीद नहीं कर सकते। बाजार रोज़ ऊपर-नीचे होते हैं, लेकिन 5-10 साल में आम तौर पर बढ़ते हैं। अगर आपको 6 महीने में पैसे चाहिए तो फिक्स्ड डिपॉजिट में रखें। लेकिन 5 साल दूर के लक्ष्यों के लिए - जैसे घर खरीदना - इक्विटी फंड में निवेश कर सकते हैं। समय निवेश में आपका सबसे अच्छा दोस्त है।',
    relatedMissionId: 'market_simulation',
  },
  {
    id: 'sip',
    title: 'SIP & Rupee-Cost Averaging',
    one_liner: 'Invest regularly to average out market highs and lows.',
    icon_emoji: '📅',
    explanation: 'SIP (Systematic Investment Plan) means investing a fixed amount regularly - say ₹5,000 every month. When markets are down, you buy more units. When up, you buy fewer. Over time, this averages out your purchase cost and removes the stress of timing the market.',
    visual_type: 'bar_chart',
    visual_data: [10, 12, 8, 11, 9, 13, 10, 11], // Units bought each month (varying with price)
    voiceover_en: 'Trying to predict when the market is high or low is very difficult, even for experts. SIP solves this problem. When you invest a fixed amount every month, you automatically buy more units when prices are low and fewer when prices are high. Over time, your average cost becomes balanced. It\'s like a shopping strategy - you buy more when there\'s a sale! Start with even ₹500 per month to build the habit.',
    voiceover_hi: 'यह अनुमान लगाना बहुत मुश्किल है कि बाजार कब ऊंचा या नीचा है, विशेषज्ञों के लिए भी। SIP इस समस्या को हल करता है। जब आप हर महीने एक निश्चित राशि निवेश करते हैं, तो आप स्वचालित रूप से कम कीमत पर ज्यादा यूनिट और ज्यादा कीमत पर कम यूनिट खरीदते हैं। समय के साथ, आपकी औसत लागत संतुलित हो जाती है। यह शॉपिंग रणनीति जैसा है - सेल में ज्यादा खरीदो!',
    relatedMissionId: 'sip_simulation',
  },
  {
    id: 'compounding',
    title: 'Compounding',
    one_liner: 'Earn returns on your returns - money grows faster over time.',
    icon_emoji: '🚀',
    explanation: 'Compounding is when your investment returns also start earning returns. ₹1,00,000 at 12% becomes ₹1,12,000 in year 1. In year 2, you earn 12% on ₹1,12,000 = ₹1,25,440. This snowball effect makes money grow exponentially over long periods.',
    visual_type: 'line_chart',
    visual_data: [100, 112, 125, 140, 157, 176, 197, 221, 247, 277], // Compound growth curve
    voiceover_en: 'Compounding is called the eighth wonder of the world. Here\'s how it works: If you invest ₹1 lakh at 12% return, after one year you have ₹1.12 lakh. In the second year, you earn 12% on ₹1.12 lakh, not just ₹1 lakh. Your returns start earning returns! After 20 years, that ₹1 lakh becomes almost ₹10 lakh. The earlier you start, the more time compounding has to work its magic. Even small amounts grow big over time.',
    voiceover_hi: 'कंपाउंडिंग को दुनिया का आठवां अजूबा कहा जाता है। यह ऐसे काम करता है: अगर आप 12% रिटर्न पर ₹1 लाख निवेश करें, तो एक साल बाद आपके पास ₹1.12 लाख हैं। दूसरे साल में, आप ₹1.12 लाख पर 12% कमाते हैं, सिर्फ ₹1 लाख पर नहीं। आपके रिटर्न भी रिटर्न कमाने लगते हैं! 20 साल बाद, वह ₹1 लाख लगभग ₹10 लाख बन जाता है। जितना जल्दी शुरू करें, उतना ज्यादा कंपाउंडिंग का जादू।',
  },
  {
    id: 'volatility',
    title: 'Volatility',
    one_liner: 'Markets go up and down - it\'s normal, not scary.',
    icon_emoji: '📈',
    explanation: 'Volatility means how much prices move up and down. High volatility doesn\'t mean bad - it\'s just more movement. Understanding volatility helps you stay calm during market dips and not panic sell. Long-term investors can use volatility to their advantage.',
    visual_type: 'line_chart',
    visual_data: [100, 105, 95, 110, 85, 115, 100, 120, 90, 125], // Volatile price movement
    voiceover_en: 'When you see news about markets crashing 2% in a day, it feels scary. But volatility is normal. Markets have always had ups and downs - during 2008, 2020, and many other times. What matters is the long-term trend, which is usually upward. If you invested in 2008 and stayed till now, you would have great returns despite all the crashes. Don\'t check prices daily. Review quarterly. Stay invested through the noise.',
    voiceover_hi: 'जब आप बाजार में एक दिन में 2% गिरावट की खबर देखते हैं तो डरावना लगता है। लेकिन अस्थिरता सामान्य है। बाजारों में हमेशा उतार-चढ़ाव आते रहे हैं - 2008, 2020 और कई अन्य समय में। जो मायने रखता है वह है लंबी अवधि का रुझान, जो आमतौर पर ऊपर की ओर होता है। अगर आपने 2008 में निवेश किया और अब तक रहे, तो सभी गिरावटों के बावजूद अच्छा रिटर्न मिलता। रोज़ कीमतें न देखें। तिमाही में समीक्षा करें।',
    relatedMissionId: 'market_simulation',
  },
];

export function getConceptById(id: string): ConceptDetail | undefined {
  return concepts.find(c => c.id === id);
}

export const missions = [
  {
    id: 'diversified_portfolio',
    title: 'Build a Diversified Portfolio',
    description: 'Create a portfolio with at least 3 different instruments to reduce risk.',
    steps: [
      'Review the 4 available instruments',
      'Buy at least 3 different funds',
      'Try to include both equity and debt funds',
      'Check your portfolio composition',
    ],
    riskNote: 'Diversification reduces risk but doesn\'t eliminate it. All investments carry some risk.',
    completed: false,
  },
  {
    id: 'market_simulation',
    title: 'Survive a Market Dip',
    description: 'Simulate a -5% market move and see how your portfolio responds.',
    steps: [
      'First, build a portfolio with some investments',
      'Click "Simulate Market" and select -5%',
      'Observe how different funds react differently',
      'Check your total portfolio value change',
    ],
    riskNote: 'Market dips are temporary. Panic selling locks in losses. Stay invested for long-term goals.',
    completed: false,
  },
  {
    id: 'sip_simulation',
    title: 'Start a Monthly Investment',
    description: 'Practice regular investing by making multiple purchases over time.',
    steps: [
      'Choose one fund to invest in regularly',
      'Buy ₹10,000 worth of it',
      'Simulate a market move',
      'Buy ₹10,000 again',
      'Notice how your average buy price changes',
    ],
    riskNote: 'SIP works best over 3+ years. Short-term SIPs may not show averaging benefits.',
    completed: false,
  },
];

