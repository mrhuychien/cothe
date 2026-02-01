'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, Info } from 'lucide-react';
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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeInfoCard}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed right-4 top-24 w-96 max-w-[calc(100vw-2rem)] bg-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 border border-slate-700"
          >
            {/* Header */}
            <div
              className="p-4 relative"
              style={{ backgroundColor: system.color + '30' }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${system.color}40 0%, transparent 100%)`
                }}
              />
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{system.icon}</span>
                    <span
                      className="text-sm font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: system.color + '40', color: system.color }}
                    >
                      {language === 'vi' ? system.nameVi : system.nameEn}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-2">
                    {language === 'vi' ? organ.nameVi : organ.nameEn}
                  </h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeInfoCard}
                  className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Description */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Info className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-1">
                    {language === 'vi' ? 'Mô tả' : 'Description'}
                  </h4>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {language === 'vi' ? organ.descriptionVi : organ.descriptionEn}
                  </p>
                </div>
              </div>

              {/* Fun Fact */}
              <div
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: system.color + '15',
                  borderColor: system.color + '40'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: system.color + '30' }}
                  >
                    <Lightbulb className="w-4 h-4" style={{ color: system.color }} />
                  </div>
                  <span className="font-bold" style={{ color: system.color }}>
                    {t('funFact')}
                  </span>
                </div>
                <p className="text-slate-200 text-sm pl-8">
                  {language === 'vi' ? organ.funFactVi : organ.funFactEn}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={closeInfoCard}
                className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
              >
                {language === 'vi' ? 'Đóng' : 'Close'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
