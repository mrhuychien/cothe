'use client';

import { motion } from 'framer-motion';
import { useLanguageStore } from '@/stores/useLanguageStore';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="flex items-center gap-1 bg-slate-800/60 backdrop-blur-sm rounded-full p-1 border border-slate-700/50">
      <motion.button
        onClick={() => setLanguage('vi')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all touch-target ${
          language === 'vi'
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        VI
      </motion.button>
      <motion.button
        onClick={() => setLanguage('en')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all touch-target ${
          language === 'en'
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        EN
      </motion.button>
    </div>
  );
}
