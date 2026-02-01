'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Gamepad2 } from 'lucide-react';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { Button } from '@/components/shared';

export default function Hero() {
  const { t } = useLanguageStore();

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 bg-gradient-to-b from-cream to-primary-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-500 via-circulatory to-primary-600 bg-clip-text text-transparent">
              {t('heroTitle')}
            </h1>
            <p className="font-body text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/kham-pha">
                <Button variant="primary" size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  {t('startExploring')}
                </Button>
              </Link>
              <Link href="/tro-choi">
                <Button variant="secondary" size="lg">
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  {t('playQuiz')}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Animated Body Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-72 h-96 md:w-80 md:h-[28rem]">
              {/* Animated body parts */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  {/* Body outline */}
                  <div className="text-[12rem] md:text-[14rem] opacity-20">🧍</div>

                  {/* Floating organs */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute top-[25%] left-1/2 -translate-x-1/2 text-4xl"
                  >
                    ❤️
                  </motion.div>
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-[10%] left-1/2 -translate-x-1/2 text-4xl"
                  >
                    🧠
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute top-[20%] left-[25%] text-3xl"
                  >
                    🫁
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute top-[20%] right-[25%] text-3xl"
                  >
                    🫁
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 0.95, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-[45%] left-1/2 -translate-x-1/2 text-3xl"
                  >
                    🦴
                  </motion.div>
                </div>
              </motion.div>

              {/* Decorative circles */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-50 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-sky rounded-full opacity-50 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
