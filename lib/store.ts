'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, UserProfile, UserLevel, PlaygroundState, MentorResponse, QuizStep } from './types';
import { createInitialPlaygroundState, buyInstrument, sellInstrument, simulateMarketMove, calculateGainLoss, calculateInvestedValue } from './playground/engine';
import { missions } from './concepts';

interface AppState {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // User Profile
  userProfile: UserProfile | null;
  userLevel: UserLevel | null;
  setUserProfile: (profile: UserProfile) => void;
  setUserLevel: (level: UserLevel) => void;
  hasCompletedQuiz: boolean;
  setHasCompletedQuiz: (completed: boolean) => void;

  // Quiz
  currentQuizStep: QuizStep;
  quizAnswers: Partial<UserProfile>;
  setQuizStep: (step: QuizStep) => void;
  updateQuizAnswer: <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => void;
  resetQuiz: () => void;

  // Playground
  playground: PlaygroundState;
  executeBuy: (instrumentId: string, amount: number) => { success: boolean; error?: string };
  executeSell: (instrumentId: string, amount: number) => { success: boolean; error?: string };
  executeMarketMove: (percent: number) => void;
  resetPlayground: () => void;
  getGainLoss: () => number;
  getInvestedValue: () => number;

  // Missions
  missions: typeof missions;
  completeMission: (missionId: string) => void;

  // Mentor Response
  mentorResponse: MentorResponse | null;
  setMentorResponse: (response: MentorResponse) => void;
  mentorLoading: boolean;
  setMentorLoading: (loading: boolean) => void;

  // Reset all
  resetAll: () => void;
}

const initialQuizAnswers: Partial<UserProfile> = {
  age: 25,
  experience: 'never',
  riskComfort: 3,
  timeHorizon: '1_to_3',
  mainGoal: 'grow_wealth',
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Language
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      // User Profile
      userProfile: null,
      userLevel: null,
      setUserProfile: (profile) => set({ userProfile: profile }),
      setUserLevel: (level) => set({ userLevel: level }),
      hasCompletedQuiz: false,
      setHasCompletedQuiz: (completed) => set({ hasCompletedQuiz: completed }),

      // Quiz
      currentQuizStep: 'age',
      quizAnswers: initialQuizAnswers,
      setQuizStep: (step) => set({ currentQuizStep: step }),
      updateQuizAnswer: (key, value) =>
        set((state) => ({
          quizAnswers: { ...state.quizAnswers, [key]: value },
        })),
      resetQuiz: () =>
        set({
          currentQuizStep: 'age',
          quizAnswers: initialQuizAnswers,
          hasCompletedQuiz: false,
          userProfile: null,
          userLevel: null,
        }),

      // Playground
      playground: createInitialPlaygroundState(),
      executeBuy: (instrumentId, amount) => {
        const state = get();
        const result = buyInstrument(state.playground, instrumentId, amount);
        if ('error' in result) {
          return { success: false, error: result.error };
        }
        set({ playground: result });
        return { success: true };
      },
      executeSell: (instrumentId, amount) => {
        const state = get();
        const result = sellInstrument(state.playground, instrumentId, amount);
        if ('error' in result) {
          return { success: false, error: result.error };
        }
        set({ playground: result });
        return { success: true };
      },
      executeMarketMove: (percent) => {
        const state = get();
        const newState = simulateMarketMove(state.playground, percent);
        set({ playground: newState });
      },
      resetPlayground: () => set({ playground: createInitialPlaygroundState() }),
      getGainLoss: () => calculateGainLoss(get().playground),
      getInvestedValue: () => calculateInvestedValue(get().playground.holdings),

      // Missions
      missions: missions.map((m) => ({ ...m })),
      completeMission: (missionId) =>
        set((state) => ({
          missions: state.missions.map((m) =>
            m.id === missionId ? { ...m, completed: true } : m
          ),
        })),

      // Mentor Response
      mentorResponse: null,
      setMentorResponse: (response) => set({ mentorResponse: response }),
      mentorLoading: false,
      setMentorLoading: (loading) => set({ mentorLoading: loading }),

      // Reset all
      resetAll: () =>
        set({
          language: 'en',
          userProfile: null,
          userLevel: null,
          hasCompletedQuiz: false,
          currentQuizStep: 'age',
          quizAnswers: initialQuizAnswers,
          playground: createInitialPlaygroundState(),
          missions: missions.map((m) => ({ ...m, completed: false })),
          mentorResponse: null,
          mentorLoading: false,
        }),
    }),
    {
      name: 'playinvest-storage',
      partialize: (state) => ({
        language: state.language,
        userProfile: state.userProfile,
        userLevel: state.userLevel,
        hasCompletedQuiz: state.hasCompletedQuiz,
        quizAnswers: state.quizAnswers,
        playground: state.playground,
        missions: state.missions,
      }),
    }
  )
);

// Helper hook for calculating user level from profile
export function calculateUserLevel(profile: UserProfile): UserLevel {
  let score = 0;
  let reasons: string[] = [];

  // Experience scoring
  switch (profile.experience) {
    case 'never':
      score += 0;
      reasons.push('new to investing');
      break;
    case 'fds_rds':
      score += 0.5;
      reasons.push('familiar with FDs');
      break;
    case 'mutual_funds':
      score += 1;
      reasons.push('has mutual fund experience');
      break;
    case 'stocks':
      score += 1.5;
      reasons.push('has stock market experience');
      break;
  }

  // Risk comfort adds to score
  if (profile.riskComfort >= 4) {
    score += 0.5;
  }

  // Longer time horizon shows more commitment
  if (profile.timeHorizon === '3_to_5' || profile.timeHorizon === 'more_than_5') {
    score += 0.5;
  }

  // Goal clarity
  if (profile.mainGoal === 'grow_wealth' || profile.mainGoal === 'build_habit') {
    score += 0.5;
  }

  // Determine level
  let label: UserLevel['label'];
  if (score < 1) {
    label = 'Curious';
  } else if (score < 2) {
    label = 'Getting Started';
  } else {
    label = 'Confident Beginner';
  }

  return {
    label,
    score_0_to_3: Math.min(3, Math.round(score)),
    short_reason: reasons[0] || 'Starting your investment journey',
  };
}

