# PlayInvest by Groww 🚀

A beginner-friendly investing education platform that helps new investors learn core investing concepts and practice with virtual money. Built with Next.js 14, TypeScript, and Tailwind CSS.

![PlayInvest](https://via.placeholder.com/800x400/10b981/ffffff?text=PlayInvest+by+Groww)

## ✨ Features

### 🎯 Onboarding Quiz
- **5-step questionnaire** to gauge your investing experience
- Questions about age, experience level, risk comfort, time horizon, and goals
- Generates a personalized user level: Curious, Getting Started, or Confident Beginner

### 📚 Concept Explorer (Learn Tab)
- **6 key investing concepts** with visual explanations:
  - Risk vs Return
  - Diversification
  - Time Horizon
  - SIP & Rupee-Cost Averaging
  - Compounding
  - Volatility
- Interactive charts (line, bar, pie) for each concept
- **Bilingual voiceover scripts** (English & Hindi) with TTS-ready buttons

### 🎮 Fake-Money Playground
- Start with **₹1,00,000 virtual money**
- **4 generic instruments** to invest in:
  - Large Cap Fund (Low Risk)
  - Balanced Mix Fund (Medium Risk)
  - Index Basket (Medium Risk)
  - Debt Saver Fund (Low Risk)
- Buy and sell with real-time portfolio tracking
- **Market simulation** (-10% to +10%)
- Portfolio history chart
- **3 learning missions** with step-by-step guidance

### 🌐 Language Support
- **Hindi/English toggle** accessible on all pages
- Complete i18n for all UI labels
- Bilingual voiceover scripts for concepts

### 🤖 LLM-Powered Coaching
- `/api/mentor` endpoint for personalized advice
- Uses OpenAI GPT-4o-mini (falls back to mock data if no API key)
- Personalized recommendations based on user profile and playground behavior

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **State Management**: Zustand (with persistence)
- **Icons**: Lucide React
- **LLM**: OpenAI API (optional)

## 📁 Project Structure

```
app/
├── page.tsx              # Landing page
├── quiz/page.tsx         # Onboarding quiz
├── dashboard/page.tsx    # Learn tab with concepts
├── playground/page.tsx   # Virtual trading playground
├── settings/page.tsx     # Settings & profile
├── api/
│   ├── mentor/route.ts   # LLM coaching API
│   └── tts/route.ts      # TTS stub API
└── layout.tsx            # Root layout

lib/
├── types.ts              # TypeScript types
├── i18n.ts               # Translations
├── store.ts              # Zustand store
├── concepts.ts           # Concept data
├── utils.ts              # Utilities
└── playground/
    └── engine.ts         # Trading engine

components/
├── Header.tsx            # Navigation header
├── LanguageToggle.tsx    # Language switcher
├── quiz/                 # Quiz step components
├── concepts/             # Concept cards & detail view
├── playground/           # Playground widgets
└── ui/                   # shadcn/ui components
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd PlayInvest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional - for LLM features)
   
   Create a `.env.local` file:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   > Note: The app works without an API key - it will use mock data for the mentor feature.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3001](http://localhost:3001)

   > **Note**: The dev server runs on port 3001 by default. You can change this in `package.json` if needed.

## 📱 Usage Flow

1. **Landing Page**: Learn about PlayInvest features
2. **Quiz**: Answer 5 questions about your investing profile
3. **Dashboard**: 
   - See your personalized user level
   - Explore investing concepts with visual explanations
   - Get safety tips and next step recommendations
4. **Playground**:
   - Browse available instruments
   - Make virtual investments
   - Track your portfolio value
   - Simulate market movements
   - Complete learning missions
5. **Settings**: Change language, view profile, reset progress

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | OpenAI API key for LLM-powered coaching. If not set, the app uses mock responses. |

## 🎨 Customization

### Adding New Concepts
Edit `lib/concepts.ts` to add new investing concepts with:
- Title and one-liner (English & Hindi)
- Visual type and data
- Voiceover scripts
- Related mission ID

### Adding New Instruments
Edit `lib/playground/engine.ts` to modify `defaultInstruments` array.

### Adding Translations
Edit `lib/i18n.ts` to add new translation keys for both English and Hindi.

## 📄 API Endpoints

### POST /api/mentor
Personalized investing advice based on user profile.

**Request Body:**
```json
{
  "userProfile": {
    "age": 25,
    "experience_summary": "never",
    "risk_profile": "medium",
    "primary_language": "en",
    "secondary_language": "hi",
    "user_question": "How should I start?"
  },
  "playground": {
    "created_portfolio": false,
    "sim_trades_count": 0,
    "behavior_summary": "New user"
  }
}
```

### POST /api/tts
Text-to-speech stub (echoes back the text).

**Request Body:**
```json
{
  "text": "Your voiceover text here",
  "language": "en"
}
```

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🚀 Deployment to Vercel

This Next.js app is optimized for deployment on Vercel. Follow these steps:

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import project on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js

3. **Configure Environment Variables**
   - In your Vercel project settings, go to "Environment Variables"
   - Add `OPENAI_API_KEY` if you want LLM features (optional)
   - Deploy!

### Vercel Configuration

- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

The app will automatically:
- Build and optimize on Vercel's edge network
- Handle API routes at `/api/*`
- Deploy with zero configuration needed

### Environment Variables on Vercel

If you want to use OpenAI features, add this environment variable in Vercel:

| Variable | Value | Required |
|----------|-------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | No (app works without it) |

**Note**: Without the API key, the mentor feature will use mock responses, so the app is fully functional without it.

## 📝 Notes

- All investments are **virtual** - no real money is involved
- The app is designed for **educational purposes only**
- Market simulations use simplified random movements
- Progress is saved in browser local storage

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is for educational purposes.

---

Built with ❤️ for new investors learning to navigate the world of investing.
