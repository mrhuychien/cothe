'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguageStore } from '@/stores/useLanguageStore';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguageStore();

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/kham-pha', label: t('explore') },
    { href: '/tro-choi', label: t('quiz') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md shadow-sm">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="text-3xl"
            >
              🫀
            </motion.div>
            <span className="font-heading text-2xl font-bold bg-gradient-to-r from-primary-500 to-circulatory bg-clip-text text-transparent">
              CoThe.Info
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-body text-lg font-medium text-foreground hover:text-primary-500 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 touch-target"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-cream shadow-lg py-4"
          >
            <div className="flex flex-col items-center gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-body text-xl font-medium text-foreground hover:text-primary-500 transition-colors touch-target"
                >
                  {item.label}
                </Link>
              ))}
              <LanguageToggle />
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
