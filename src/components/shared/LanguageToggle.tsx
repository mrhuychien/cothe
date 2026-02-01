'use client';

import { motion } from 'framer-motion';
import { useLanguageStore } from '@/stores/useLanguageStore';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-kid">
      <motion.button
        onClick={() => setLanguage('vi')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all touch-target ${
          language === 'vi'
            ? 'bg-primary-400 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        VI
      </motion.button>
      <motion.button
        onClick={() => setLanguage('en')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all touch-target ${
          language === 'en'
            ? 'bg-primary-400 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        EN
      </motion.button>
    </div>
  );
}
