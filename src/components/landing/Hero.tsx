'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Gamepad2, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguageStore } from '@/stores/useLanguageStore';

export default function Hero() {
  const { t } = useLanguageStore();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4 bg-slate-950 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">3D Interactive Anatomy Atlas</span>
            </motion.div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              {t('heroTitle').split(' ').map((word, i) => (
                <span key={i}>
                  {i >= 2 ? (
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">{word} </span>
                  ) : (
                    <span>{word} </span>
                  )}
                </span>
              ))}
            </h1>

            <p className="font-body text-lg md:text-xl text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/kham-pha">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-heading font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
                >
                  <Play className="w-5 h-5" />
                  {t('startExploring')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/tro-choi">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-800/80 text-white border border-slate-700/50 font-heading font-semibold text-lg hover:bg-slate-700/80 transition-all"
                >
                  <Gamepad2 className="w-5 h-5" />
                  {t('playQuiz')}
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Animated Body Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-80 h-[28rem] md:w-96 md:h-[32rem]">
              {/* Glowing rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-72 h-72 md:w-80 md:h-80 rounded-full border border-blue-500/20"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="w-80 h-80 md:w-96 md:h-96 rounded-full border border-purple-500/10"
                />
              </div>

              {/* Animated body parts */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  <div className="text-[12rem] md:text-[14rem] opacity-15 grayscale">🧍</div>

                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute top-[25%] left-1/2 -translate-x-1/2 text-4xl drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                  >
                    ❤️
                  </motion.div>
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-[10%] left-1/2 -translate-x-1/2 text-4xl drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  >
                    🧠
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute top-[20%] left-[22%] text-3xl drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  >
                    🫁
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute top-[20%] right-[22%] text-3xl drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  >
                    🫁
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 0.95, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-[45%] left-1/2 -translate-x-1/2 text-3xl drop-shadow-[0_0_10px_rgba(245,230,211,0.5)]"
                  >
                    🦴
                  </motion.div>
                </div>
              </motion.div>

              {/* Ambient glow */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '20+', label: 'Mo hinh 3D' },
            { value: '6', label: 'He co quan' },
            { value: '100+', label: 'Chu thich' },
            { value: '2', label: 'Ngon ngu' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
              <p className="text-2xl md:text-3xl font-heading font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
