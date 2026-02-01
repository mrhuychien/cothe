'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronRight, Eye, EyeOff, RotateCcw, ZoomIn, ZoomOut, Move3D } from 'lucide-react';
import { Header } from '@/components/shared';
import { InfoCard } from '@/components/explorer';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { useExplorerStore } from '@/stores/useExplorerStore';
import { bodySystems } from '@/data/systems';
import { BodySystem } from '@/types';

// Dynamic import for 3D Scene (SSR disabled)
const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/80">Đang tải mô hình 3D...</p>
      </div>
    </div>
  ),
});

// System item in sidebar
function SystemItem({
  system,
  isExpanded,
  onToggle,
  isVisible,
  onVisibilityToggle
}: {
  system: typeof bodySystems[0];
  isExpanded: boolean;
  onToggle: () => void;
  isVisible: boolean;
  onVisibilityToggle: () => void;
}) {
  const { language } = useLanguageStore();
  const { setSelectedOrgan, setActiveSystem } = useExplorerStore();

  return (
    <div className="border-b border-slate-700">
      <div
        className="flex items-center gap-2 p-3 hover:bg-slate-700/50 cursor-pointer transition-colors"
        onClick={onToggle}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onVisibilityToggle();
          }}
          className="p-1 hover:bg-slate-600 rounded transition-colors"
        >
          {isVisible ? (
            <Eye className="w-4 h-4 text-green-400" />
          ) : (
            <EyeOff className="w-4 h-4 text-slate-500" />
          )}
        </button>

        <div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: system.color }}
        />

        <span className="flex-1 text-sm font-medium text-white">
          {language === 'vi' ? system.nameVi : system.nameEn}
        </span>

        <span className="text-lg">{system.icon}</span>

        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-slate-400" />
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
                className="flex items-center gap-2 px-4 py-2 pl-10 hover:bg-slate-600/50 cursor-pointer transition-colors text-sm text-slate-300 hover:text-white"
                onClick={() => {
                  setSelectedOrgan(organ);
                  setActiveSystem(system.id);
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
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

export default function ExplorerPage() {
  const { language } = useLanguageStore();
  const { setActiveSystem, xrayOpacity, setXrayOpacity } = useExplorerStore();

  const [expandedSystems, setExpandedSystems] = useState<Set<string>>(new Set());
  const [visibleSystems, setVisibleSystems] = useState<Set<BodySystem>>(
    new Set<BodySystem>(['skeletal', 'muscular', 'circulatory', 'digestive', 'respiratory', 'nervous'])
  );

  const toggleExpand = (systemId: string) => {
    const newExpanded = new Set(expandedSystems);
    if (newExpanded.has(systemId)) {
      newExpanded.delete(systemId);
    } else {
      newExpanded.add(systemId);
    }
    setExpandedSystems(newExpanded);
  };

  const toggleVisibility = (systemId: BodySystem) => {
    const newVisible = new Set(visibleSystems);
    if (newVisible.has(systemId)) {
      newVisible.delete(systemId);
    } else {
      newVisible.add(systemId);
    }
    setVisibleSystems(newVisible);
  };

  const showAllSystems = () => {
    setVisibleSystems(new Set<BodySystem>(['skeletal', 'muscular', 'circulatory', 'digestive', 'respiratory', 'nervous']));
    setActiveSystem(null);
  };

  const hideAllSystems = () => {
    setVisibleSystems(new Set());
  };

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
              <h2 className="text-lg font-bold text-white mb-2">
                {language === 'vi' ? 'Hệ Cơ Quan' : 'Body Systems'}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={showAllSystems}
                  className="flex-1 text-xs bg-blue-600 hover:bg-blue-500 text-white py-1.5 px-3 rounded transition-colors"
                >
                  {language === 'vi' ? 'Hiện tất cả' : 'Show All'}
                </button>
                <button
                  onClick={hideAllSystems}
                  className="flex-1 text-xs bg-slate-600 hover:bg-slate-500 text-white py-1.5 px-3 rounded transition-colors"
                >
                  {language === 'vi' ? 'Ẩn tất cả' : 'Hide All'}
                </button>
              </div>
            </div>

            {/* System List */}
            <div className="flex-1 overflow-y-auto">
              {bodySystems.map((system) => (
                <SystemItem
                  key={system.id}
                  system={system}
                  isExpanded={expandedSystems.has(system.id)}
                  onToggle={() => toggleExpand(system.id)}
                  isVisible={visibleSystems.has(system.id)}
                  onVisibilityToggle={() => toggleVisibility(system.id)}
                />
              ))}
            </div>

            {/* X-Ray Slider */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">
                  {language === 'vi' ? 'Độ trong suốt' : 'Transparency'}
                </span>
                <span className="text-sm text-slate-400">{Math.round(xrayOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={xrayOpacity}
                onChange={(e) => setXrayOpacity(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </motion.div>

          {/* Main 3D Canvas */}
          <div className="flex-1 relative">
            <Scene visibleSystems={visibleSystems} />

            {/* Top Controls */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute top-4 left-1/2 -translate-x-1/2"
            >
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
                <h1 className="text-white font-bold text-center">
                  {language === 'vi' ? '🔬 Khám Phá Cơ Thể Người' : '🔬 Human Body Explorer'}
                </h1>
              </div>
            </motion.div>

            {/* Control Buttons */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2"
            >
              <button className="p-3 bg-slate-800/90 hover:bg-slate-700 rounded-lg border border-slate-700 text-white transition-colors group">
                <ZoomIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button className="p-3 bg-slate-800/90 hover:bg-slate-700 rounded-lg border border-slate-700 text-white transition-colors group">
                <ZoomOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button className="p-3 bg-slate-800/90 hover:bg-slate-700 rounded-lg border border-slate-700 text-white transition-colors group">
                <RotateCcw className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button className="p-3 bg-slate-800/90 hover:bg-slate-700 rounded-lg border border-slate-700 text-white transition-colors group">
                <Move3D className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </motion.div>

            {/* Bottom Instructions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
            >
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700 flex items-center gap-4 text-sm text-slate-300">
                <span>🖱️ {language === 'vi' ? 'Kéo để xoay' : 'Drag to rotate'}</span>
                <span>🔍 {language === 'vi' ? 'Cuộn để zoom' : 'Scroll to zoom'}</span>
                <span>👆 {language === 'vi' ? 'Nhấn vào bộ phận để xem chi tiết' : 'Click organ for details'}</span>
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
