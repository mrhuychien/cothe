'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '@/types';
import { translations, TranslationKey } from '@/data/translations';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'vi',
      setLanguage: (lang) => set({ language: lang }),
      t: (key) => {
        const currentLang = get().language;
        return translations[currentLang][key] || key;
      },
    }),
    {
      name: 'cothe-language',
    }
  )
);
