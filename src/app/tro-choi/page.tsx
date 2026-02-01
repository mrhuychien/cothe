'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Header } from '@/components/shared';
import { QuizCard } from '@/components/game';
import { useQuizStore } from '@/stores/useQuizStore';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { Organ } from '@/types';

// Dynamic import for 3D Scene (SSR disabled)
const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-cream to-mint/30">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🎮</div>
        <p className="text-lg text-gray-600 font-body">Đang tải trò chơi...</p>
      </div>
    </div>
  ),
});

export default function QuizPage() {
  const { t } = useLanguageStore();
  const { questions, currentQuestionIndex, checkAnswer, nextQuestion, lastAnswer } = useQuizStore();

  const currentQuestion = questions[currentQuestionIndex];

  const handleOrganClick = (organ: Organ) => {
    if (!currentQuestion || lastAnswer) return;

    checkAnswer(organ.id);

    // Auto advance after feedback
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-16 bg-gradient-to-b from-cream to-mint/30">
        <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
          {/* Quiz Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-96 p-4 flex-shrink-0"
          >
            <QuizCard />
          </motion.div>

          {/* 3D Canvas */}
          <div className="flex-1 relative">
            <Scene
              onOrganClick={handleOrganClick}
              highlightOrgan={currentQuestion?.targetOrgan}
            />

            {/* Game title overlay */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 shadow-kid">
                <h1 className="font-heading text-xl font-bold text-foreground">
                  🎯 {t('quizTitle')}
                </h1>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
