'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb } from 'lucide-react';
import { useExplorerStore } from '@/stores/useExplorerStore';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { getOrganById } from '@/data/systems';

export default function InfoCard() {
  const { selectedOrgan, isInfoCardOpen, closeInfoCard } = useExplorerStore();
  const { language, t } = useLanguageStore();

  if (!selectedOrgan) return null;

  const organData = getOrganById(selectedOrgan.id);
  if (!organData) return null;

  const { organ, system } = organData;

  return (
    <AnimatePresence>
      {isInfoCardOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed right-4 top-24 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-kid shadow-kid-hover overflow-hidden z-40"
        >
          {/* Header */}
          <div
            className="p-4"
            style={{ backgroundColor: system.color + '40' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{system.icon}</span>
                  <span className="text-sm font-medium text-gray-600">
                    {language === 'vi' ? system.nameVi : system.nameEn}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {language === 'vi' ? organ.nameVi : organ.nameEn}
                </h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeInfoCard}
                className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center touch-target"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="font-body text-gray-700 mb-4">
              {language === 'vi' ? organ.descriptionVi : organ.descriptionEn}
            </p>

            {/* Fun Fact */}
            <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <span className="font-heading font-bold text-yellow-700">
                  {t('funFact')}
                </span>
              </div>
              <p className="font-body text-sm text-yellow-800">
                {language === 'vi' ? organ.funFactVi : organ.funFactEn}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
