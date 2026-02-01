'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useLanguageStore } from '@/stores/useLanguageStore';

export default function Footer() {
  const { t } = useLanguageStore();

  return (
    <footer className="bg-gradient-to-r from-primary-100 to-lavender py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🫀</span>
            <span className="font-heading text-lg font-bold text-primary-600">
              CoThe.Info
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              href="/kham-pha"
              className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
            >
              {t('explore')}
            </Link>
            <Link
              href="/tro-choi"
              className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
            >
              {t('quiz')}
            </Link>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>{t('madeWith')}</span>
            <Heart className="w-4 h-4 text-circulatory fill-current" />
            <span>{t('forKids')}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
