'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Header } from '@/components/shared';
import { SystemSelector, XRaySlider, InfoCard } from '@/components/explorer';
import { useLanguageStore } from '@/stores/useLanguageStore';

// Dynamic import for 3D Scene (SSR disabled)
const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-cream to-primary-50">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🫀</div>
        <p className="text-lg text-gray-600 font-body">Đang tải mô hình 3D...</p>
      </div>
    </div>
  ),
});

export default function ExplorerPage() {
  const { t } = useLanguageStore();

  return (
    <>
      <Header />
      <main className="flex-1 pt-16 bg-gradient-to-b from-cream to-primary-50">
        <div className="h-[calc(100vh-4rem)] flex flex-col">
          {/* Top Controls */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-white/50 backdrop-blur-sm"
          >
            <div className="container mx-auto">
              <h1 className="font-heading text-2xl font-bold text-center mb-4 text-foreground">
                {t('explore')}
              </h1>
              <SystemSelector />
            </div>
          </motion.div>

          {/* 3D Canvas */}
          <div className="flex-1 relative">
            <Scene />

            {/* Side Controls */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute left-4 top-4 w-64"
            >
              <XRaySlider />
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-kid">
                <p className="font-body text-sm text-gray-600">
                  {t('clickToLearn')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Info Card (appears on organ click) */}
        <InfoCard />
      </main>
    </>
  );
}
