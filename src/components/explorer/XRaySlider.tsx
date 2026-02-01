'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useExplorerStore } from '@/stores/useExplorerStore';
import { useLanguageStore } from '@/stores/useLanguageStore';

export default function XRaySlider() {
  const { xrayOpacity, setXrayOpacity } = useExplorerStore();
  const { t } = useLanguageStore();

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-kid p-4 shadow-kid">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-sky/30 flex items-center justify-center">
          {xrayOpacity > 0.5 ? (
            <Eye className="w-5 h-5 text-sky" />
          ) : (
            <EyeOff className="w-5 h-5 text-sky" />
          )}
        </div>
        <span className="font-heading font-semibold text-foreground">
          {t('xrayMode')}
        </span>
      </div>

      <div className="relative">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={xrayOpacity}
          onChange={(e) => setXrayOpacity(parseFloat(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer touch-target"
          style={{
            background: `linear-gradient(to right, #87CEEB ${xrayOpacity * 100}%, #E5E7EB ${xrayOpacity * 100}%)`,
          }}
        />
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>X-Ray</span>
          <span>Normal</span>
        </div>
      </div>
    </div>
  );
}
