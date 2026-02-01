'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock } from 'lucide-react';
import { useLanguageStore } from '@/stores/useLanguageStore';
import Button from './Button';

interface ParentalGateProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

function generateMathProblem(): { question: string; answer: number } {
  const a = Math.floor(Math.random() * 20) + 10;
  const b = Math.floor(Math.random() * 10) + 5;
  const operators = ['+', '-', '*'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let answer: number;
  switch (operator) {
    case '+':
      answer = a + b;
      break;
    case '-':
      answer = a - b;
      break;
    case '*':
      answer = a * b;
      break;
    default:
      answer = a + b;
  }

  return {
    question: `${a} ${operator} ${b} = ?`,
    answer,
  };
}

export default function ParentalGate({ isOpen, onClose, onSuccess }: ParentalGateProps) {
  const { t } = useLanguageStore();
  const [problem, setProblem] = useState(() => generateMathProblem());
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProblem(generateMathProblem());
      setUserAnswer('');
      setError(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAnswer = parseInt(userAnswer, 10);

    if (numAnswer === problem.answer) {
      onSuccess();
    } else {
      setError(true);
      setProblem(generateMathProblem());
      setUserAnswer('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-kid p-6 max-w-sm w-full shadow-kid-hover"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary-500" />
                </div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  {t('parentalGateTitle')}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors touch-target"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">{t('parentalGateDesc')}</p>

            {/* Math Problem */}
            <form onSubmit={handleSubmit}>
              <div className="bg-gradient-to-r from-primary-50 to-lavender rounded-xl p-6 mb-4 text-center">
                <p className="font-heading text-3xl font-bold text-foreground">
                  {problem.question}
                </p>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mb-4 text-center"
                >
                  Sai rồi, thử lại nhé!
                </motion.p>
              )}

              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Nhập câu trả lời..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:outline-none text-center text-xl font-bold mb-4 touch-target"
                autoFocus
              />

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  {t('cancel')}
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  {t('submit')}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
