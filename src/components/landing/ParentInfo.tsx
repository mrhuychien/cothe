'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';
import { useLanguageStore } from '@/stores/useLanguageStore';

export default function ParentInfo() {
  const { t } = useLanguageStore();

  const features = [
    t('parentFeature1'),
    t('parentFeature2'),
    t('parentFeature3'),
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-lavender/50 to-cream">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white rounded-kid p-8 md:p-12 shadow-kid"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-500" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              {t('parentTitle')}
            </h2>
          </div>

          <p className="font-body text-lg text-gray-600 mb-8">
            {t('parentDesc')}
          </p>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-mint/20 rounded-xl"
              >
                <div className="w-10 h-10 rounded-full bg-digestive/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="font-body text-gray-700">{feature}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
