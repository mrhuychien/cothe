'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizQuestion } from '@/types';
import { getRandomQuestions } from '@/data/quiz';

interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  streak: number;
  bestStreak: number;
  isComplete: boolean;
  showHint: boolean;
  lastAnswer: 'correct' | 'wrong' | null;
  totalGamesPlayed: number;
  highScore: number;

  // Actions
  startGame: (questionCount?: number) => void;
  checkAnswer: (organId: string) => boolean;
  nextQuestion: () => void;
  showHintAction: () => void;
  resetGame: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      streak: 0,
      bestStreak: 0,
      isComplete: false,
      showHint: false,
      lastAnswer: null,
      totalGamesPlayed: 0,
      highScore: 0,

      startGame: (questionCount = 5) => {
        const questions = getRandomQuestions(questionCount);
        set({
          questions,
          currentQuestionIndex: 0,
          score: 0,
          streak: 0,
          isComplete: false,
          showHint: false,
          lastAnswer: null,
        });
      },

      checkAnswer: (organId) => {
        const { questions, currentQuestionIndex, score, streak, bestStreak, highScore } = get();
        const currentQuestion = questions[currentQuestionIndex];

        if (!currentQuestion) return false;

        const isCorrect = currentQuestion.targetOrgan === organId;

        if (isCorrect) {
          const newStreak = streak + 1;
          const newScore = score + (10 * (1 + Math.floor(newStreak / 3)));
          const newBestStreak = Math.max(bestStreak, newStreak);

          set({
            score: newScore,
            streak: newStreak,
            bestStreak: newBestStreak,
            lastAnswer: 'correct',
            highScore: Math.max(highScore, newScore),
          });
        } else {
          set({
            streak: 0,
            lastAnswer: 'wrong',
          });
        }

        return isCorrect;
      },

      nextQuestion: () => {
        const { currentQuestionIndex, questions, totalGamesPlayed } = get();
        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex >= questions.length) {
          set({
            isComplete: true,
            totalGamesPlayed: totalGamesPlayed + 1,
          });
        } else {
          set({
            currentQuestionIndex: nextIndex,
            showHint: false,
            lastAnswer: null,
          });
        }
      },

      showHintAction: () => set({ showHint: true }),

      resetGame: () => {
        set({
          questions: [],
          currentQuestionIndex: 0,
          score: 0,
          streak: 0,
          isComplete: false,
          showHint: false,
          lastAnswer: null,
        });
      },
    }),
    {
      name: 'cothe-quiz',
      partialize: (state) => ({
        bestStreak: state.bestStreak,
        highScore: state.highScore,
        totalGamesPlayed: state.totalGamesPlayed,
      }),
    }
  )
);
