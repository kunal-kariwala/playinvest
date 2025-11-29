// User Profile Types
export interface UserProfile {
  age: number;
  experience: 'never' | 'fds_rds' | 'mutual_funds' | 'stocks';
  riskComfort: number; // 1-5 scale
  timeHorizon: 'less_than_1' | '1_to_3' | '3_to_5' | 'more_than_5';
  mainGoal: 'grow_wealth' | 'save_tax' | 'short_term_gain' | 'build_habit';
}

export interface UserLevel {
  label: 'Curious' | 'Getting Started' | 'Confident Beginner';
  score_0_to_3: number;
  short_reason: string;
}

// Playground Types
export interface Instrument {
  id: string;
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  currentPrice: number;
  priceHistory: number[];
}

export interface Holding {
  id: string;
  instrumentId: string;
  name: string;
  units: number;
  avgBuyPrice: number;
  currentPrice: number;
}

export interface HistoryEntry {
  step: number;
  portfolioValue: number;
  timestamp: Date;
}

export interface PlaygroundState {
  cashBalance: number;
  holdings: Holding[];
  history: HistoryEntry[];
  marketMovePercent: number;
  instruments: Instrument[];
  totalValue: number;
  simTradesCount: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  steps: string[];
  riskNote: string;
  completed: boolean;
}

// Concept Types
export interface ConceptTile {
  id: string;
  title: string;
  one_liner: string;
  icon_emoji: string;
}

export interface VisualIdea {
  concept_id: string;
  visual_type: 'line_chart' | 'bar_chart' | 'pie' | 'timeline' | 'card_stack';
  caption: string;
}

export interface ConceptDetail {
  id: string;
  title: string;
  one_liner: string;
  icon_emoji: string;
  explanation: string;
  visual_type: 'line_chart' | 'bar_chart' | 'pie' | 'timeline' | 'card_stack';
  visual_data: number[];
  voiceover_en: string;
  voiceover_hi: string;
  relatedMissionId?: string;
}

// Mentor API Types
export interface MentorRequest {
  userProfile: {
    age: number;
    experience_summary: string;
    risk_profile: 'low' | 'medium' | 'high';
    primary_language: 'en' | 'hi';
    secondary_language: 'en' | 'hi';
    user_question: string;
  };
  playground: {
    created_portfolio: boolean;
    sim_trades_count: number;
    behavior_summary: string;
  };
}

export interface MentorResponse {
  user_level: {
    label: string;
    score_0_to_3: number;
    short_reason: string;
  };
  concept_tiles: ConceptTile[];
  visual_ideas: VisualIdea[];
  playground_actions: {
    title: string;
    description: string;
    steps: string[];
    risk_note: string;
  }[];
  voiceover_script_en: string;
  voiceover_script_hi: string;
  ui_copy: {
    primary_language: 'en' | 'hi';
    cta_label_en: string;
    cta_label_hi: string;
    next_step_hint_en: string;
    next_step_hint_hi: string;
  };
  safety_notes: string[];
}

// Language Types
export type Language = 'en' | 'hi';

// Quiz Step Types
export type QuizStep = 'age' | 'experience' | 'risk' | 'horizon' | 'goal';

