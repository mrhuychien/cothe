'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useLanguageStore } from '@/stores/useLanguageStore';

export default function Footer() {
  const { t } = useLanguageStore();

  return (
    <footer className="bg-slate-900/80 border-t border-slate-700/50 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-sm">🫀</span>
            </div>
            <span className="font-heading text-lg font-bold text-white">CoThe.Info</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
              {t('home')}
            </Link>
            <Link href="/kham-pha" className="text-sm text-slate-400 hover:text-white transition-colors">
              {t('explore')}
            </Link>
            <Link href="/tro-choi" className="text-sm text-slate-400 hover:text-white transition-colors">
              {t('quiz')}
            </Link>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <span>{t('madeWith')}</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>{t('forKids')}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/50 text-center">
          <p className="text-xs text-slate-600">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
