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
      color: 'from-primary-400 to-primary-500',
      bgColor: 'bg-primary-50',
    },
    {
      title: t('feature2Title'),
      description: t('feature2Desc'),
      color: 'from-circulatory to-muscular',
      bgColor: 'bg-red-50',
    },
    {
      title: t('feature3Title'),
      description: t('feature3Desc'),
      color: 'from-digestive to-mint',
      bgColor: 'bg-green-50',
    },
    {
      title: t('feature4Title'),
      description: t('feature4Desc'),
      color: 'from-sky to-respiratory',
      bgColor: 'bg-blue-50',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 text-foreground"
        >
          {t('featuresTitle')}
        </motion.h2>

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
                whileHover={{ y: -8, scale: 1.02 }}
                className={`${feature.bgColor} rounded-kid p-6 shadow-kid hover:shadow-kid-hover transition-all duration-300`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="font-body text-gray-600 text-sm leading-relaxed">
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
