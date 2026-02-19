'use client';

import { motion } from 'framer-motion';
import { Box, Layers, Gamepad2, Scan } from 'lucide-react';
import { useLanguageStore } from '@/stores/useLanguageStore';

const featureIcons = [Box, Layers, Gamepad2, Scan];

export default function Features() {
  const { t } = useLanguageStore();

  const features = [
    {
      title: t('feature1Title'),
      description: t('feature1Desc'),
      gradient: 'from-blue-500 to-cyan-500',
      glow: 'shadow-blue-500/20',
    },
    {
      title: t('feature2Title'),
      description: t('feature2Desc'),
      gradient: 'from-red-500 to-pink-500',
      glow: 'shadow-red-500/20',
    },
    {
      title: t('feature3Title'),
      description: t('feature3Desc'),
      gradient: 'from-green-500 to-emerald-500',
      glow: 'shadow-green-500/20',
    },
    {
      title: t('feature4Title'),
      description: t('feature4Desc'),
      gradient: 'from-purple-500 to-violet-500',
      glow: 'shadow-purple-500/20',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24 px-4 bg-slate-900/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            {t('featuresTitle')}
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`rounded-2xl p-6 bg-slate-800/50 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 shadow-lg ${feature.glow}`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
