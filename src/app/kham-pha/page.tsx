'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { ChevronDown, ChevronRight, Eye, Bone, Heart, Wind, Apple, Brain, Dumbbell, Info, Lightbulb, X } from 'lucide-react';
import { Header } from '@/components/shared';
import { InfoCard } from '@/components/explorer';
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

// Detailed Vietnamese annotations for each system
const SYSTEM_ANNOTATIONS: Record<string, {
  title: string;
  description: string;
  funFact: string;
  parts: Array<{
    name: string;
    description: string;
    detail: string;
  }>;
}> = {
  full: {
    title: 'Cơ Thể Người',
    description: 'Cơ thể người là một hệ thống phức tạp gồm nhiều cơ quan phối hợp hoạt động. Mỗi hệ cơ quan đảm nhận một chức năng riêng biệt để duy trì sự sống.',
    funFact: 'Cơ thể người có khoảng 37.2 nghìn tỷ tế bào!',
    parts: [
      { name: 'Hệ Xương', description: '206 xương tạo khung đỡ cơ thể', detail: 'Bảo vệ các cơ quan và tạo hình dáng' },
      { name: 'Hệ Cơ', description: 'Hơn 600 cơ giúp cử động', detail: 'Chiếm khoảng 40% trọng lượng cơ thể' },
      { name: 'Hệ Tuần Hoàn', description: 'Tim và mạch máu vận chuyển dinh dưỡng', detail: 'Tim đập 100,000 lần mỗi ngày' },
      { name: 'Hệ Hô Hấp', description: 'Phổi trao đổi oxy và CO2', detail: 'Thở khoảng 20,000 lần/ngày' },
      { name: 'Hệ Tiêu Hóa', description: 'Phân giải thức ăn thành năng lượng', detail: 'Ruột non dài khoảng 6-7 mét' },
      { name: 'Hệ Thần Kinh', description: 'Não và dây thần kinh điều khiển cơ thể', detail: 'Não có 86 tỷ tế bào thần kinh' },
    ],
  },
  skeletal: {
    title: 'Hệ Xương',
    description: 'Hệ xương gồm 206 chiếc xương, tạo thành bộ khung nâng đỡ toàn bộ cơ thể. Xương còn bảo vệ các cơ quan quan trọng như não, tim và phổi.',
    funFact: 'Xương đùi là xương dài và chắc nhất trong cơ thể, có thể chịu lực gấp 30 lần trọng lượng cơ thể!',
    parts: [
      { name: 'Hộp Sọ', description: 'Bảo vệ não bộ', detail: 'Gồm 22 mảnh xương ghép lại với nhau' },
      { name: 'Cột Sống', description: '33 đốt sống xếp chồng lên nhau', detail: 'Bảo vệ tủy sống và giúp cơ thể đứng thẳng' },
      { name: 'Lồng Ngực', description: '12 cặp xương sườn', detail: 'Bảo vệ tim và phổi' },
      { name: 'Xương Chậu', description: 'Nối cột sống với chân', detail: 'Chịu toàn bộ trọng lượng phần trên cơ thể' },
      { name: 'Xương Đùi', description: 'Xương dài nhất cơ thể', detail: 'Chiếm khoảng 1/4 chiều cao cơ thể' },
      { name: 'Xương Cánh Tay', description: 'Xương cánh tay trên (xương cánh)', detail: 'Nối vai với khuỷu tay' },
      { name: 'Xương Bàn Tay', description: '27 xương nhỏ ở mỗi bàn tay', detail: 'Cho phép cử động linh hoạt' },
      { name: 'Xương Bàn Chân', description: '26 xương ở mỗi bàn chân', detail: 'Hỗ trợ đi lại và giữ thăng bằng' },
    ],
  },
  muscular: {
    title: 'Hệ Cơ',
    description: 'Cơ thể có hơn 600 cơ, giúp chúng ta cử động, giữ tư thế và tạo ra nhiệt. Cơ chiếm khoảng 40% trọng lượng cơ thể.',
    funFact: 'Cơ mặt có hơn 40 cơ nhỏ, giúp chúng ta biểu lộ hàng nghìn biểu cảm khác nhau!',
    parts: [
      { name: 'Cơ Delta', description: 'Cơ vai hình tam giác', detail: 'Giúp nâng cánh tay lên cao' },
      { name: 'Cơ Ngực Lớn', description: 'Cơ ngực chính', detail: 'Giúp đẩy và ôm' },
      { name: 'Cơ Nhị Đầu', description: 'Cơ trước cánh tay', detail: 'Giúp gập khuỷu tay (cơ bắp tay)' },
      { name: 'Cơ Tam Đầu', description: 'Cơ sau cánh tay', detail: 'Giúp duỗi thẳng khuỷu tay' },
      { name: 'Cơ Bụng', description: '6 múi cơ bụng', detail: 'Bảo vệ nội tạng và giữ thăng bằng' },
      { name: 'Cơ Tứ Đầu Đùi', description: 'Cơ trước đùi', detail: 'Giúp đi, chạy và đá' },
      { name: 'Cơ Bắp Chân', description: 'Cơ sau cẳng chân', detail: 'Giúp đứng nhón chân và nhảy' },
      { name: 'Cơ Mông', description: 'Cơ lớn nhất cơ thể', detail: 'Giúp đứng lên và leo cầu thang' },
    ],
  },
  circulatory: {
    title: 'Hệ Tuần Hoàn',
    description: 'Hệ tuần hoàn gồm tim, máu và mạch máu. Tim bơm máu đi khắp cơ thể, mang oxy và chất dinh dưỡng đến các tế bào.',
    funFact: 'Nếu nối tất cả mạch máu trong cơ thể lại, chúng sẽ dài khoảng 100,000 km - đủ để quấn quanh Trái Đất 2.5 vòng!',
    parts: [
      { name: 'Tim', description: 'Cơ quan bơm máu', detail: 'Đập khoảng 100,000 lần mỗi ngày' },
      { name: 'Động Mạch Chủ', description: 'Động mạch lớn nhất', detail: 'Đưa máu giàu oxy từ tim đi khắp cơ thể' },
      { name: 'Động Mạch', description: 'Mạch máu mang máu đỏ tươi', detail: 'Chứa máu giàu oxy từ tim đi' },
      { name: 'Tĩnh Mạch', description: 'Mạch máu mang máu đỏ sẫm', detail: 'Đưa máu nghèo oxy về tim' },
      { name: 'Mao Mạch', description: 'Mạch máu siêu nhỏ', detail: 'Nơi trao đổi oxy và chất dinh dưỡng' },
      { name: 'Hồng Cầu', description: 'Tế bào máu đỏ', detail: 'Vận chuyển oxy đi khắp cơ thể' },
      { name: 'Bạch Cầu', description: 'Tế bào máu trắng', detail: 'Chiến đấu chống lại vi khuẩn và virus' },
    ],
  },
  respiratory: {
    title: 'Hệ Hô Hấp',
    description: 'Hệ hô hấp giúp cơ thể lấy oxy từ không khí và thải khí CO2. Phổi là cơ quan chính của hệ này.',
    funFact: 'Phổi trái nhỏ hơn phổi phải để nhường chỗ cho tim. Tổng diện tích bề mặt phổi bằng một sân tennis!',
    parts: [
      { name: 'Mũi', description: 'Cửa ngõ không khí vào cơ thể', detail: 'Lọc bụi và làm ấm không khí' },
      { name: 'Khí Quản', description: 'Ống dẫn khí chính', detail: 'Dài khoảng 10-12 cm' },
      { name: 'Phế Quản', description: 'Nhánh của khí quản', detail: 'Chia thành phế quản trái và phải' },
      { name: 'Phổi Phải', description: 'Phổi bên phải', detail: 'Có 3 thùy, lớn hơn phổi trái' },
      { name: 'Phổi Trái', description: 'Phổi bên trái', detail: 'Có 2 thùy, nhỏ hơn để nhường chỗ cho tim' },
      { name: 'Phế Nang', description: 'Túi khí siêu nhỏ trong phổi', detail: 'Khoảng 300 triệu phế nang ở mỗi người' },
      { name: 'Cơ Hoành', description: 'Cơ hô hấp chính', detail: 'Co giãn để hít vào và thở ra' },
    ],
  },
  digestive: {
    title: 'Hệ Tiêu Hóa',
    description: 'Hệ tiêu hóa phân giải thức ăn thành chất dinh dưỡng để cơ thể hấp thu. Quá trình này mất khoảng 24-72 giờ.',
    funFact: 'Ruột non dài khoảng 6-7 mét, nhưng nếu trải phẳng bề mặt bên trong, nó có diện tích bằng một sân tennis!',
    parts: [
      { name: 'Miệng', description: 'Nơi bắt đầu tiêu hóa', detail: 'Răng nghiền thức ăn, nước bọt phân giải tinh bột' },
      { name: 'Thực Quản', description: 'Ống nối miệng với dạ dày', detail: 'Dài khoảng 25 cm' },
      { name: 'Dạ Dày', description: 'Túi chứa và nghiền thức ăn', detail: 'Acid trong dạ dày mạnh đến mức có thể hòa tan kim loại' },
      { name: 'Gan', description: 'Cơ quan lớn nhất bên trong cơ thể', detail: 'Thực hiện hơn 500 chức năng khác nhau' },
      { name: 'Túi Mật', description: 'Chứa mật do gan tạo ra', detail: 'Mật giúp tiêu hóa chất béo' },
      { name: 'Tụy', description: 'Tiết enzyme tiêu hóa', detail: 'Cũng sản xuất insulin điều hòa đường huyết' },
      { name: 'Ruột Non', description: 'Nơi hấp thu dinh dưỡng', detail: 'Dài 6-7 mét, hấp thu 90% chất dinh dưỡng' },
      { name: 'Ruột Già', description: 'Hấp thu nước và tạo phân', detail: 'Dài khoảng 1.5 mét' },
    ],
  },
  nervous: {
    title: 'Hệ Thần Kinh',
    description: 'Hệ thần kinh là "trung tâm điều khiển" của cơ thể, gồm não, tủy sống và các dây thần kinh. Nó điều khiển mọi hoạt động từ suy nghĩ đến nhịp tim.',
    funFact: 'Não người có khoảng 86 tỷ tế bào thần kinh (neuron), và mỗi neuron có thể kết nối với 10,000 neuron khác!',
    parts: [
      { name: 'Đại Não', description: 'Phần lớn nhất của não', detail: 'Chịu trách nhiệm suy nghĩ, học tập, cảm xúc' },
      { name: 'Tiểu Não', description: 'Phần sau não', detail: 'Điều khiển thăng bằng và phối hợp cử động' },
      { name: 'Thân Não', description: 'Nối não với tủy sống', detail: 'Điều khiển nhịp thở, tim đập' },
      { name: 'Tủy Sống', description: 'Dây thần kinh trong cột sống', detail: 'Truyền tín hiệu giữa não và cơ thể' },
      { name: 'Dây Thần Kinh', description: 'Mạng lưới dây dẫn tín hiệu', detail: 'Truyền tín hiệu với tốc độ 120 m/s' },
      { name: 'Thùy Trán', description: 'Phần trước đại não', detail: 'Điều khiển tính cách, quyết định, ngôn ngữ' },
      { name: 'Thùy Đỉnh', description: 'Phần trên đại não', detail: 'Xử lý xúc giác và không gian' },
      { name: 'Thùy Chẩm', description: 'Phần sau đại não', detail: 'Xử lý hình ảnh từ mắt' },
    ],
  },
};

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
            {system.nameVi}
          </span>
          <span className="text-xs text-slate-400">
            {system.organs.length} bộ phận
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
                {organ.nameVi}
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

  // Build Sketchfab embed URL with options
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
  const embedUrl = `https://sketchfab.com/models/${model.uid}/embed?${params.toString()}`;

  return (
    <iframe
      title={model.title}
      className="w-full h-full border-0"
      src={embedUrl}
      allow="autoplay; fullscreen; xr-spatial-tracking"
      allowFullScreen
    />
  );
}

// Annotation panel component
function AnnotationPanel({
  systemKey,
  onClose
}: {
  systemKey: string;
  onClose: () => void;
}) {
  const [hoveredPart, setHoveredPart] = useState<number | null>(null);
  const annotation = SYSTEM_ANNOTATIONS[systemKey] || SYSTEM_ANNOTATIONS.full;
  const systemInfo = bodySystems.find(s => s.id === systemKey);
  const systemColor = systemInfo?.color || '#3B82F6';

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="w-80 bg-slate-800/95 backdrop-blur-sm border-l border-slate-700 flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Info className="w-5 h-5" style={{ color: systemColor }} />
            {annotation.title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          {annotation.description}
        </p>
      </div>

      {/* Fun Fact */}
      <div className="px-4 py-3 bg-amber-500/10 border-b border-slate-700">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200 leading-relaxed">
            <span className="font-semibold">Bạn có biết? </span>
            {annotation.funFact}
          </p>
        </div>
      </div>

      {/* Parts List */}
      <div className="flex-1 overflow-y-auto p-3">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
          Các bộ phận chính
        </h4>
        <div className="space-y-1">
          {annotation.parts.map((part, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredPart(index)}
              onMouseLeave={() => setHoveredPart(null)}
            >
              <div
                className={`p-2.5 rounded-lg cursor-pointer transition-all ${
                  hoveredPart === index
                    ? 'bg-slate-600/80 shadow-lg'
                    : 'bg-slate-700/50 hover:bg-slate-700/80'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                    style={{ backgroundColor: systemColor }}
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-white">
                      {part.name}
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {part.description}
                    </p>
                  </div>
                </div>

                {/* Expanded detail on hover */}
                <AnimatePresence>
                  {hoveredPart === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mt-2 pt-2 border-t text-xs leading-relaxed"
                        style={{ borderColor: systemColor + '40', color: systemColor }}
                      >
                        💡 {part.detail}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700 bg-slate-800/50">
        <p className="text-[10px] text-slate-500 text-center">
          Di chuột vào từng bộ phận để xem chi tiết
        </p>
      </div>
    </motion.div>
  );
}

export default function ExplorerPage() {
  const { setActiveSystem } = useExplorerStore();
  const [expandedSystems, setExpandedSystems] = useState<Set<string>>(new Set());
  const [activeModelKey, setActiveModelKey] = useState<string>('full');
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);

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
    setShowAnnotations(true);
  }, [setActiveSystem]);

  const showFullBody = useCallback(() => {
    setActiveModelKey('full');
    setActiveSystem(null);
    setShowAnnotations(true);
  }, [setActiveSystem]);

  const currentSystem = bodySystems.find(s => s.id === activeModelKey);

  return (
    <>
      <Header />
      <main className="flex-1 pt-16 bg-slate-900">
        <div className="h-[calc(100vh-4rem)] flex">
          {/* Left Sidebar - System List */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-slate-700">
              <h2 className="text-lg font-bold text-white mb-3">
                Hệ Cơ Quan
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
                Toàn bộ cơ thể
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
                Mô hình 3D được cung cấp bởi{' '}
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
                  Khám Phá Cơ Thể Người
                  {activeModelKey !== 'full' && currentSystem && (
                    <span className="text-blue-400 ml-2">
                      — {currentSystem.nameVi}
                    </span>
                  )}
                </h1>
              </div>
            </motion.div>

            {/* Toggle Annotation Button */}
            {!showAnnotations && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-4 right-4 bg-slate-800/90 hover:bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 flex items-center gap-2 text-sm transition-colors"
                onClick={() => setShowAnnotations(true)}
              >
                <Info className="w-4 h-4" />
                Hiện chú thích
              </motion.button>
            )}

            {/* Bottom Instructions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
            >
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700 flex items-center gap-4 text-xs text-slate-400">
                <span>🖱️ Kéo để xoay</span>
                <span>🔍 Cuộn để zoom</span>
                <span>👆 Chọn hệ cơ quan ở bên trái</span>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Annotations */}
          <AnimatePresence>
            {showAnnotations && (
              <AnnotationPanel
                systemKey={activeModelKey}
                onClose={() => setShowAnnotations(false)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Info Card Modal */}
        <InfoCard />
      </main>
    </>
  );
}
