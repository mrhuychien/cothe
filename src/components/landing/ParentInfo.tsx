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
    <section className="py-24 px-4 bg-slate-950">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-slate-800/50 rounded-2xl p-8 md:p-12 border border-slate-700/30 shadow-kid"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
              {t('parentTitle')}
            </h2>
          </div>

          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            {t('parentDesc')}
          </p>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/20"
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-slate-300">{feature}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
