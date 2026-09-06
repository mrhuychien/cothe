'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Boxes, Check, Info } from 'lucide-react';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { SYSTEMS, systemName } from '@/lib/atlas/anatomy';

export default function AtlasTeaser() {
  const { t, language } = useLanguageStore();
  const points = [t('atlasPoint1'), t('atlasPoint2'), t('atlasPoint3')];

  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 py-24">
      <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="container relative z-10 mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-blue-300">
              <Boxes className="h-4 w-4" />
              {t('atlasBadge')}
            </span>

            <h2 className="mt-6 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
              {t('atlasTitle')}
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">
              {t('atlasDesc')}
            </p>

            <ul className="mt-6 space-y-2.5">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/atlas">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-7 py-4 font-heading text-lg font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
                >
                  <Boxes className="h-5 w-5" />
                  {t('atlasOpen')}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.span>
              </Link>
            </div>

            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {t('atlasNote')}
            </p>
          </motion.div>

          {/* Bảng màu 15 hệ cơ quan — xem trước những gì bật tắt được trong atlas. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-slate-700/40 bg-slate-900/60 p-5 backdrop-blur-sm"
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {SYSTEMS.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-2 rounded-xl border border-slate-700/30 bg-slate-800/40 px-3 py-2.5"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: s.color }}
                  />
                  <span className="truncate text-xs text-slate-300">
                    {systemName(s, language)}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[11px] text-slate-500">
              BodyParts3D 4.0 · CC BY 4.0 · 2.288.268 tam giác
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
