'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Compass, Gamepad2, Home, Boxes } from 'lucide-react';
import { useState } from 'react';
import { useLanguageStore } from '@/stores/useLanguageStore';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguageStore();

  const navItems = [
    { href: '/', label: t('home'), icon: Home },
    { href: '/kham-pha', label: t('explore'), icon: Compass },
    { href: '/atlas', label: t('atlas'), icon: Boxes },
    { href: '/tro-choi', label: t('quiz'), icon: Gamepad2 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25"
            >
              <span className="text-xl">🫀</span>
            </motion.div>
            <div>
              <span className="font-heading text-xl font-bold text-white">CoThe.Info</span>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Atlas 3D</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            <div className="ml-2 pl-2 border-l border-slate-700/50">
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-slate-800/60 transition-colors touch-target"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 py-4 px-4"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all touch-target"
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-2 mt-2 border-t border-slate-700/50 flex justify-center">
                <LanguageToggle />
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
