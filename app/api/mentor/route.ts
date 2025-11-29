import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { MentorRequest, MentorResponse } from '@/lib/types';

const SYSTEM_PROMPT = `You are "PlayInvest Mentor", an investing coach for new investors.

GOAL:
- Gauge how new a user is to investing.
- Explain investing concepts using minimal text, visuals, and simple language.
- Suggest safe, beginner-friendly actions in a virtual-money playground.
- Support bilingual output: English and Hindi.

OUTPUT FORMAT:
Always respond as a single JSON object with these keys:

{
  "user_level": { "label": string, "score_0_to_3": number, "short_reason": string },
  "concept_tiles": [
    { "id": string, "title": string, "one_liner": string, "icon_emoji": string }
  ],
  "visual_ideas": [
    { "concept_id": string,
      "visual_type": "line_chart" | "bar_chart" | "pie" | "timeline" | "card_stack",
      "caption": string
    }
  ],
  "playground_actions": [
    { "title": string, "description": string, "steps": [string], "risk_note": string }
  ],
  "voiceover_script_en": string,
  "voiceover_script_hi": string,
  "ui_copy": {
      "primary_language": "en" | "hi",
      "cta_label_en": string,
      "cta_label_hi": string,
      "next_step_hint_en": string,
      "next_step_hint_hi": string
  },
  "safety_notes": [string]
}

GUIDELINES:
- Levels: 0 = Totally new, 1 = Knows basics, 2 = Has invested a bit, 3 = Comfortable beginner.
- Tone: simple, conversational, Indian context; avoid jargon.
- Keep one_liner <= 14 words; visual captions <= 18 words; voiceover scripts 45–70 words.
- Focus only on fake-money simulation; never suggest real trades.
- No specific stock or real fund names; keep instruments generic.
- Include at least 2 safety_notes about risk, long-term view, and emergency funds.
Return ONLY the JSON object.`;

// Mock response for when OpenAI is not available
const getMockResponse = (request: MentorRequest): MentorResponse => {
  const { userProfile, playground } = request;
  
  // Determine user level based on experience
  let level = 0;
  let label = 'Curious';
  if (userProfile.experience_summary === 'fds_rds') {
    level = 1;
    label = 'Getting Started';
  } else if (userProfile.experience_summary === 'mutual_funds') {
    level = 2;
    label = 'Getting Started';
  } else if (userProfile.experience_summary === 'stocks') {
    level = 3;
    label = 'Confident Beginner';
  }

  const isHindi = userProfile.primary_language === 'hi';

  return {
    user_level: {
      label,
      score_0_to_3: level,
      short_reason: isHindi 
        ? 'आप अपनी निवेश यात्रा शुरू कर रहे हैं' 
        : 'You are starting your investment journey',
    },
    concept_tiles: [
      {
        id: 'risk_return',
        title: isHindi ? 'जोखिम बनाम रिटर्न' : 'Risk vs Return',
        one_liner: isHindi 
          ? 'उच्च रिटर्न के साथ उच्च जोखिम आता है।'
          : 'Higher returns usually come with higher risk.',
        icon_emoji: '⚖️',
      },
      {
        id: 'diversification',
        title: isHindi ? 'विविधीकरण' : 'Diversification',
        one_liner: isHindi
          ? 'अपने पैसे को अलग-अलग निवेशों में बांटें।'
          : 'Spread your money across different investments.',
        icon_emoji: '🧺',
      },
      {
        id: 'compounding',
        title: isHindi ? 'चक्रवृद्धि' : 'Compounding',
        one_liner: isHindi
          ? 'आपके रिटर्न पर भी रिटर्न कमाएं।'
          : 'Earn returns on your returns over time.',
        icon_emoji: '🚀',
      },
    ],
    visual_ideas: [
      {
        concept_id: 'risk_return',
        visual_type: 'bar_chart',
        caption: isHindi 
          ? 'जोखिम स्तर बढ़ने पर संभावित रिटर्न बढ़ता है'
          : 'Potential returns increase as risk level increases',
      },
      {
        concept_id: 'compounding',
        visual_type: 'line_chart',
        caption: isHindi
          ? 'समय के साथ पैसा तेज़ी से बढ़ता है'
          : 'Money grows exponentially over time',
      },
    ],
    playground_actions: playground.created_portfolio
      ? [
          {
            title: isHindi ? 'मार्केट मूव सिमुलेट करें' : 'Simulate a Market Move',
            description: isHindi
              ? 'देखें कि आपका पोर्टफोलियो बाजार में गिरावट पर कैसे प्रतिक्रिया करता है।'
              : 'See how your portfolio reacts to a market dip.',
            steps: isHindi
              ? ['मार्केट सिमुलेटर पर जाएं', '-5% चुनें', 'अपने पोर्टफोलियो का प्रभाव देखें']
              : ['Go to Market Simulator', 'Select -5%', 'Observe your portfolio impact'],
            risk_note: isHindi
              ? 'याद रखें: असली बाजार में धैर्य रखें। घबराहट में न बेचें।'
              : 'Remember: In real markets, stay patient. Don\'t panic sell.',
          },
        ]
      : [
          {
            title: isHindi ? 'अपना पहला निवेश करें' : 'Make Your First Investment',
            description: isHindi
              ? 'अपने वर्चुअल ₹1,00,000 में से कुछ निवेश करके शुरू करें।'
              : 'Start by investing some of your virtual ₹1,00,000.',
            steps: isHindi
              ? ['प्लेग्राउंड पर जाएं', 'एक फंड चुनें', '₹10,000 निवेश करें']
              : ['Go to Playground', 'Choose a fund', 'Invest ₹10,000'],
            risk_note: isHindi
              ? 'यह वर्चुअल मनी है - प्रयोग करने में संकोच न करें!'
              : 'This is virtual money - don\'t hesitate to experiment!',
          },
          {
            title: isHindi ? 'विविध पोर्टफोलियो बनाएं' : 'Build a Diversified Portfolio',
            description: isHindi
              ? 'जोखिम कम करने के लिए कम से कम 3 अलग फंड में निवेश करें।'
              : 'Invest in at least 3 different funds to reduce risk.',
            steps: isHindi
              ? ['4 उपलब्ध फंड देखें', '3 अलग फंड खरीदें', 'अपना पोर्टफोलियो कंपोजीशन जांचें']
              : ['Review 4 available funds', 'Buy 3 different funds', 'Check your portfolio composition'],
            risk_note: isHindi
              ? 'विविधीकरण जोखिम कम करता है लेकिन खत्म नहीं करता।'
              : 'Diversification reduces risk but doesn\'t eliminate it.',
          },
        ],
    voiceover_script_en:
      'Welcome to PlayInvest! You have virtual money to practice investing safely. Start by understanding key concepts like risk versus return and diversification. Then try buying your first fund. Remember, this is a learning playground - make mistakes, learn, and build confidence before investing real money.',
    voiceover_script_hi:
      'PlayInvest में आपका स्वागत है! आपके पास सुरक्षित रूप से निवेश का अभ्यास करने के लिए वर्चुअल मनी है। जोखिम बनाम रिटर्न और विविधीकरण जैसी मुख्य अवधारणाओं को समझकर शुरू करें। फिर अपना पहला फंड खरीदने की कोशिश करें। याद रखें, यह एक लर्निंग प्लेग्राउंड है।',
    ui_copy: {
      primary_language: userProfile.primary_language,
      cta_label_en: playground.created_portfolio ? 'Explore More' : 'Start Investing',
      cta_label_hi: playground.created_portfolio ? 'और देखें' : 'निवेश शुरू करें',
      next_step_hint_en: playground.created_portfolio
        ? 'Try simulating a market move to see how your portfolio reacts.'
        : 'Head to the Playground and make your first virtual investment.',
      next_step_hint_hi: playground.created_portfolio
        ? 'यह देखने के लिए मार्केट मूव सिमुलेट करें कि आपका पोर्टफोलियो कैसे प्रतिक्रिया करता है।'
        : 'प्लेग्राउंड पर जाएं और अपना पहला वर्चुअल निवेश करें।',
    },
    safety_notes: isHindi
      ? [
          'निवेश करने से पहले हमेशा 3-6 महीने के खर्च का इमरजेंसी फंड रखें।',
          'निवेश लंबी अवधि में सबसे अच्छा काम करता है। घबराहट में बेचने से बचें।',
          'यह एक वर्चुअल प्लेग्राउंड है। कोई असली पैसा शामिल नहीं है।',
        ]
      : [
          'Always keep an emergency fund of 3-6 months expenses before investing.',
          'Investing works best over the long term. Avoid panic selling.',
          'This is a virtual playground. No real money is involved.',
        ],
  };
};

export async function POST(request: NextRequest) {
  try {
    const body: MentorRequest = await request.json();

    // Check if OpenAI API key exists
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Return mock response if no API key
      const mockResponse = getMockResponse(body);
      return NextResponse.json(mockResponse);
    }

    // Use OpenAI if API key exists
    const openai = new OpenAI({ apiKey });

    const userMessage = `
User Profile:
- Age: ${body.userProfile.age}
- Experience: ${body.userProfile.experience_summary}
- Risk Profile: ${body.userProfile.risk_profile}
- Primary Language: ${body.userProfile.primary_language}
- Question: ${body.userProfile.user_question}

Playground Status:
- Has Portfolio: ${body.playground.created_portfolio}
- Trades Made: ${body.playground.sim_trades_count}
- Behavior: ${body.playground.behavior_summary}

Please provide personalized guidance based on this profile.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const responseText = completion.choices[0]?.message?.content || '';
    
    // Try to parse JSON from response
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, responseText];
      const jsonStr = jsonMatch[1]?.trim() || responseText.trim();
      const parsedResponse: MentorResponse = JSON.parse(jsonStr);
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      // Fall back to mock response on parse error
      return NextResponse.json(getMockResponse(body));
    }
  } catch (error) {
    console.error('Mentor API error:', error);
    // Return mock response on any error
    return NextResponse.json(getMockResponse({
      userProfile: {
        age: 25,
        experience_summary: 'never',
        risk_profile: 'medium',
        primary_language: 'en',
        secondary_language: 'hi',
        user_question: 'How should I start?',
      },
      playground: {
        created_portfolio: false,
        sim_trades_count: 0,
        behavior_summary: 'New user',
      },
    }));
  }
}

