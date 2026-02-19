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
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/30 text-center"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-heading text-2xl font-bold text-white mb-2">
          {t('gameComplete')}
        </h2>
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{score}</div>
            <div className="text-sm text-slate-500">{t('score')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400">{highScore}</div>
            <div className="text-sm text-slate-500">Best</div>
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
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/30 text-center"
      >
        <h2 className="font-heading text-2xl font-bold text-white mb-4">
          {t('quizTitle')}
        </h2>
        <p className="text-slate-400 mb-6">{t('quizInstruction')}</p>
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
      className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/30"
    >
      {/* Score and Streak */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-lg text-white">{score}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Zap className="w-5 h-5 text-orange-400" />
            <span className="font-semibold text-white">{streak}</span>
          </div>
          <div className="bg-slate-700/50 px-3 py-1 rounded-full text-sm text-slate-300 border border-slate-600/30">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="font-heading text-xl font-bold text-white mb-2">
          {language === 'vi'
            ? currentQuestion.questionVi
            : currentQuestion.questionEn}
        </h3>
        <p className="text-sm text-slate-500">{t('quizInstruction')}</p>
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
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
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
          className="mb-4 p-3 bg-amber-500/10 rounded-xl border border-amber-500/20"
        >
          <p className="text-sm text-amber-300">
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
