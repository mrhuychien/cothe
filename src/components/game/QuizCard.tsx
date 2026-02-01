'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Zap, Trophy } from 'lucide-react';
import { useQuizStore } from '@/stores/useQuizStore';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { Button } from '@/components/shared';

export default function QuizCard() {
  const {
    questions,
    currentQuestionIndex,
    score,
    streak,
    isComplete,
    showHint,
    lastAnswer,
    highScore,
    showHintAction,
    startGame,
  } = useQuizStore();

  const { language, t } = useLanguageStore();

  const currentQuestion = questions[currentQuestionIndex];

  if (isComplete) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-kid p-6 shadow-kid text-center"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
          {t('gameComplete')}
        </h2>
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-500">{score}</div>
            <div className="text-sm text-gray-500">{t('score')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500">{highScore}</div>
            <div className="text-sm text-gray-500">Best</div>
          </div>
        </div>
        <Button onClick={() => startGame(5)} variant="primary" size="lg">
          {t('playAgain')}
        </Button>
      </motion.div>
    );
  }

  if (!currentQuestion) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-kid p-6 shadow-kid text-center"
      >
        <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
          {t('quizTitle')}
        </h2>
        <p className="text-gray-600 mb-6">{t('quizInstruction')}</p>
        <Button onClick={() => startGame(5)} variant="primary" size="lg">
          {t('startExploring')}
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-kid p-6 shadow-kid"
    >
      {/* Score and Streak */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-lg">{score}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Zap className="w-5 h-5 text-orange-500" />
            <span className="font-semibold">{streak}</span>
          </div>
          <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">
          {language === 'vi'
            ? currentQuestion.questionVi
            : currentQuestion.questionEn}
        </h3>
        <p className="text-sm text-gray-500">{t('quizInstruction')}</p>
      </div>

      {/* Feedback */}
      <AnimatePresence mode="wait">
        {lastAnswer && (
          <motion.div
            key={lastAnswer}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`mb-4 p-4 rounded-xl text-center font-bold ${
              lastAnswer === 'correct'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {lastAnswer === 'correct' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="text-2xl">🎉</span> {t('correct')}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span className="text-2xl">😅</span> {t('tryAgain')}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200"
        >
          <p className="text-sm text-yellow-800">
            💡 {language === 'vi' ? currentQuestion.hintVi : currentQuestion.hintEn}
          </p>
        </motion.div>
      )}

      {/* Hint Button */}
      {!showHint && !lastAnswer && (
        <Button
          onClick={showHintAction}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          {t('hint')}
        </Button>
      )}
    </motion.div>
  );
}
