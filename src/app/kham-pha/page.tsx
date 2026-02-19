'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { ChevronDown, ChevronRight, Eye, Bone, Heart, Wind, Apple, Brain, Dumbbell } from 'lucide-react';
import { Header } from '@/components/shared';
import { InfoCard } from '@/components/explorer';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { useExplorerStore } from '@/stores/useExplorerStore';
import { bodySystems } from '@/data/systems';
import { BodySystem } from '@/types';

// Sketchfab model UIDs for each body system
const SKETCHFAB_MODELS: Record<string, { uid: string; title: string }> = {
  full: {
    uid: 'faf0f3eaec554bcf854be2038993024f',
    title: 'Human Anatomy',
  },
  skeletal: {
    uid: '911b9df7e7834175b69b4840ea15e054',
    title: 'Human Skeleton',
  },
  muscular: {
    uid: 'faf0f3eaec554bcf854be2038993024f',
    title: 'Human Anatomy - Muscular',
  },
  circulatory: {
    uid: '6a7a537a71444f6e8201e18a685a013d',
    title: 'Circulatory System',
  },
  respiratory: {
    uid: '5ca9b0b5d95942aeb5a746a9f56d5d82',
    title: 'Cardiovascular and Respiratory Organs',
  },
  digestive: {
    uid: 'bced6b6ebded4845bcfb2496a6e6d35c',
    title: 'Human Organs - Digestive',
  },
  nervous: {
    uid: '2e6be1399756494b9f185ce8c5900911',
    title: 'The Nervous System',
  },
};

// Build Sketchfab embed URL with options
function getSketchfabEmbedUrl(uid: string): string {
  const params = new URLSearchParams({
    autostart: '1',
    ui_theme: 'dark',
    ui_infos: '0',
    ui_stop: '0',
    ui_inspector: '0',
    ui_watermark_link: '0',
    ui_help: '0',
    ui_settings: '0',
    ui_vr: '0',
    ui_fullscreen: '1',
    ui_annotations: '1',
    transparent: '1',
    camera: '0',
  });
  return `https://sketchfab.com/models/${uid}/embed?${params.toString()}`;
}

// System icon mapping
const SYSTEM_ICONS: Record<string, React.ReactNode> = {
  skeletal: <Bone className="w-4 h-4" />,
  muscular: <Dumbbell className="w-4 h-4" />,
  circulatory: <Heart className="w-4 h-4" />,
  respiratory: <Wind className="w-4 h-4" />,
  digestive: <Apple className="w-4 h-4" />,
  nervous: <Brain className="w-4 h-4" />,
};

// System item in sidebar
function SystemItem({
  system,
  isExpanded,
  onToggle,
  isSelected,
  onSelect,
}: {
  system: typeof bodySystems[0];
  isExpanded: boolean;
  onToggle: () => void;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { language } = useLanguageStore();
  const { setSelectedOrgan, setActiveSystem } = useExplorerStore();

  return (
    <div className={`border-b border-slate-700 ${isSelected ? 'bg-slate-700/60' : ''}`}>
      <div
        className="flex items-center gap-2 p-3 hover:bg-slate-700/50 cursor-pointer transition-colors"
        onClick={() => {
          onSelect();
          onToggle();
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: system.color + '30', color: system.color }}
        >
          {SYSTEM_ICONS[system.id] || <span className="text-sm">{system.icon}</span>}
        </div>

        <div className="flex-1">
          <span className="text-sm font-medium text-white block leading-tight">
            {language === 'vi' ? system.nameVi : system.nameEn}
          </span>
          <span className="text-xs text-slate-400">
            {system.organs.length} {language === 'vi' ? 'bộ phận' : 'parts'}
          </span>
        </div>

        {isSelected && (
          <Eye className="w-4 h-4 text-green-400 flex-shrink-0" />
        )}

        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-slate-800/50"
          >
            {system.organs.map((organ) => (
              <div
                key={organ.id}
                className="flex items-center gap-2 px-4 py-2 pl-12 hover:bg-slate-600/50 cursor-pointer transition-colors text-sm text-slate-300 hover:text-white"
                onClick={() => {
                  setSelectedOrgan(organ);
                  setActiveSystem(system.id);
                }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: system.color }}
                />
                {language === 'vi' ? organ.nameVi : organ.nameEn}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sketchfab 3D Viewer component
function SketchfabViewer({ modelKey }: { modelKey: string }) {
  const model = SKETCHFAB_MODELS[modelKey] || SKETCHFAB_MODELS.full;

  return (
    <iframe
      title={model.title}
      className="w-full h-full border-0"
      src={getSketchfabEmbedUrl(model.uid)}
      allow="autoplay; fullscreen; xr-spatial-tracking"
      allowFullScreen
    />
  );
}

export default function ExplorerPage() {
  const { language } = useLanguageStore();
  const { setActiveSystem } = useExplorerStore();
  const [expandedSystems, setExpandedSystems] = useState<Set<string>>(new Set());
  const [activeModelKey, setActiveModelKey] = useState<string>('full');

  const toggleExpand = useCallback((systemId: string) => {
    setExpandedSystems(prev => {
      const next = new Set(prev);
      if (next.has(systemId)) {
        next.delete(systemId);
      } else {
        next.add(systemId);
      }
      return next;
    });
  }, []);

  const selectSystem = useCallback((systemId: BodySystem) => {
    setActiveModelKey(systemId);
    setActiveSystem(systemId);
  }, [setActiveSystem]);

  const showFullBody = useCallback(() => {
    setActiveModelKey('full');
    setActiveSystem(null);
  }, [setActiveSystem]);

  return (
    <>
      <Header />
      <main className="flex-1 pt-16 bg-slate-900">
        <div className="h-[calc(100vh-4rem)] flex">
          {/* Left Sidebar - System List */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-72 bg-slate-800 border-r border-slate-700 flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-slate-700">
              <h2 className="text-lg font-bold text-white mb-3">
                {language === 'vi' ? 'Hệ Cơ Quan' : 'Body Systems'}
              </h2>
              <button
                onClick={showFullBody}
                className={`w-full text-sm py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 font-medium ${
                  activeModelKey === 'full'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
              >
                <Eye className="w-4 h-4" />
                {language === 'vi' ? 'Toàn bộ cơ thể' : 'Full Body'}
              </button>
            </div>

            {/* System List */}
            <div className="flex-1 overflow-y-auto">
              {bodySystems.map((system) => (
                <SystemItem
                  key={system.id}
                  system={system}
                  isExpanded={expandedSystems.has(system.id)}
                  onToggle={() => toggleExpand(system.id)}
                  isSelected={activeModelKey === system.id}
                  onSelect={() => selectSystem(system.id)}
                />
              ))}
            </div>

            {/* Credits */}
            <div className="p-3 border-t border-slate-700">
              <p className="text-[10px] text-slate-500 text-center">
                {language === 'vi' ? 'Mô hình 3D được cung cấp bởi' : '3D models provided by'}{' '}
                <a
                  href="https://sketchfab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Sketchfab
                </a>
              </p>
            </div>
          </motion.div>

          {/* Main 3D Viewer */}
          <div className="flex-1 relative bg-slate-900">
            {/* Sketchfab Embed */}
            <SketchfabViewer modelKey={activeModelKey} />

            {/* Top Title */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none"
            >
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-5 py-2 border border-slate-700">
                <h1 className="text-white font-bold text-center text-sm">
                  {language === 'vi' ? 'Khám Phá Cơ Thể Người' : 'Human Body Explorer'}
                  {activeModelKey !== 'full' && (
                    <span className="text-blue-400 ml-2">
                      — {language === 'vi'
                        ? bodySystems.find(s => s.id === activeModelKey)?.nameVi
                        : bodySystems.find(s => s.id === activeModelKey)?.nameEn}
                    </span>
                  )}
                </h1>
              </div>
            </motion.div>

            {/* Bottom Instructions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
            >
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700 flex items-center gap-4 text-xs text-slate-400">
                <span>{language === 'vi' ? 'Kéo để xoay' : 'Drag to rotate'}</span>
                <span>{language === 'vi' ? 'Cuộn để zoom' : 'Scroll to zoom'}</span>
                <span>{language === 'vi' ? 'Chọn hệ cơ quan ở bên trái' : 'Select system on left'}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Info Card Modal */}
        <InfoCard />
      </main>
    </>
  );
}
