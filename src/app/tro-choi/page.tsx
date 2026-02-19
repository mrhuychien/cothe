'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Header } from '@/components/shared';
import { QuizCard } from '@/components/game';
import { useQuizStore } from '@/stores/useQuizStore';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { Organ } from '@/types';

const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🎮</div>
        <p className="text-lg text-slate-400 font-body">Dang tai tro choi...</p>
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
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
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
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-full px-6 py-2 border border-slate-700/50">
                <h1 className="font-heading text-xl font-bold text-white">
                  🎯 {t('quizTitle')}
                </h1>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
