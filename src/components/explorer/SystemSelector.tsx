'use client';

import { motion } from 'framer-motion';
import { useExplorerStore } from '@/stores/useExplorerStore';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { bodySystems } from '@/data/systems';
import { BodySystem } from '@/types';

export default function SystemSelector() {
  const { activeSystem, setActiveSystem } = useExplorerStore();
  const { language } = useLanguageStore();

  const handleSystemClick = (systemId: BodySystem | null) => {
    if (activeSystem === systemId) {
      setActiveSystem(null);
    } else {
      setActiveSystem(systemId);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {bodySystems.map((system) => {
        const isActive = activeSystem === system.id;
        return (
          <motion.button
            key={system.id}
            onClick={() => handleSystemClick(system.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
              transition-all duration-200 touch-target
              ${
                isActive
                  ? 'bg-white text-foreground shadow-kid-hover'
                  : 'bg-white/60 text-gray-600 hover:bg-white/80'
              }
            `}
            style={{
              borderWidth: isActive ? '2px' : '0px',
              borderStyle: 'solid',
              borderColor: isActive ? system.color : 'transparent',
              boxShadow: isActive ? `0 0 0 2px ${system.color}40` : undefined,
            }}
          >
            <span className="text-lg">{system.icon}</span>
            <span>{language === 'vi' ? system.nameVi : system.nameEn}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
