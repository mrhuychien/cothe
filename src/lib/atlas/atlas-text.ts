/**
 * Chuỗi hiển thị riêng của trang /atlas.
 *
 * Để riêng khỏi `src/data/translations.ts` vì bộ này chỉ dùng cho một trang và
 * khá dài; các key dùng chung toàn site vẫn nằm ở file translations gốc.
 */

import { Language } from '@/types';
import type { AtlasErrorCode } from './model-download';

const vi = {
  eyebrow: 'GIẢI PHẪU TƯƠNG TÁC',
  title: 'Atlas Giải Phẫu 3D',
  pieces: 'mảnh giải phẫu',
  source: 'Nguồn BodyParts3D',
  back: 'Về trang chủ',

  search: 'Tìm cấu trúc',
  searchPlaceholder: 'Tim, gan, xương đùi, phổi…',
  searchAria: 'Tìm kiếm cấu trúc giải phẫu theo tên',
  searchEmpty: 'Không tìm thấy cấu trúc nào phù hợp.',
  searchHintIdle: 'Bắt đầu với một cơ quan lớn, hoặc gõ tên bất kỳ cấu trúc nào.',
  searchHintResults: 'Hiển thị tối đa 80 kết quả. Gõ cụ thể hơn để tìm cấu trúc nhỏ.',
  searchClose: 'Đóng tìm kiếm',
  piecesShort: 'mảnh',

  systems: 'Hệ cơ quan',
  systemsOpen: 'Mở danh sách hệ cơ quan',
  systemsClose: 'Đóng danh sách hệ cơ quan',
  presetAll: 'Tất cả',
  presetSkeleton: 'Bộ xương',
  presetOrgans: 'Nội tạng',
  showOnly: (name: string) => `Chỉ hiện ${name.toLowerCase()}`,
  toggleSystem: (name: string) => `Bật/tắt ${name.toLowerCase()}`,
  visiblePieces: (n: string) => `${n} mảnh đang hiện`,
  hideAll: 'Ẩn hết',

  views: 'Góc nhìn',
  viewThreeQuarter: 'Góc chéo',
  viewFront: 'Trước',
  viewSide: 'Bên',
  viewBack: 'Sau',
  rotate: 'Tự xoay',
  pauseRotate: 'Dừng xoay',
  reset: 'Đặt lại',
  resetAria: 'Lắp lại mô hình và đặt lại góc nhìn',

  explode: 'Tách rời cơ thể',
  explodeStart: 'Nguyên khối',
  explodeEnd: 'Từng mảnh',

  captionBody: 'CƠ THỂ NGƯỜI TRƯỞNG THÀNH · NAM',
  captionSeparated: 'CÁC CẤU TRÚC ĐANG TÁCH RA',
  captionInventory: 'BẢNG KIỂM KÊ GIẢI PHẪU',
  captionSelected: 'CẤU TRÚC ĐANG CHỌN',

  hintOrbit: 'Kéo để xoay',
  hintPan: 'Kéo để di chuyển',
  hintZoom: 'Chụm hai ngón để phóng to',
  hintTap: 'Chạm vào một bộ phận để xem chi tiết',

  loadingTitle: 'Đang chuẩn bị mô hình giải phẫu',
  loadingDetail: (percent: number, pieces: string) =>
    `${percent}% · Đang tải ${pieces} mảnh`,
  loadingNote: 'Lần đầu vào trang cần tải khoảng 32 MB dữ liệu 3D.',
  reload: 'Tải lại',

  detailReference: 'Mã tra cứu',
  detailSelected: 'Số mảnh đã chọn',
  detailMembers: 'Các cấu trúc bên trong',
  detailMore: (n: number) => `Và ${n} mảnh nữa.`,
  detailContextNote: 'Mô tả chung của hệ cơ quan · cấu trúc lấy từ dữ liệu gốc',
  isolate: 'Tách riêng cấu trúc',
  unisolate: 'Hiện lại phần xung quanh',
  clearSelection: 'Bỏ chọn',
  closeDetail: 'Đóng bảng chi tiết',
  sourceLink: 'Xem nguồn giải phẫu',

  aboutOpen: 'Về bộ dữ liệu',
  aboutEyebrow: 'NGUỒN & PHẠM VI',
  aboutTitle: 'Một cơ thể, mở ra từng lớp.',
  aboutLead:
    'Khám phá bộ giải phẫu tham chiếu của người nam trưởng thành từ BodyParts3D.',
  aboutBody: [
    'Bộ dữ liệu gồm 2.234 lưới riêng biệt và 3.432 khái niệm giải phẫu có tên, dựng từ một cơ thể nam trưởng thành tham chiếu.',
    'Đây không phải là toàn bộ cấu trúc hay mọi biến thể của cơ thể người. Một khái niệm có tên có thể gồm nhiều mảnh; mỗi lưới gốc chỉ được vẽ một lần.',
    'Màu sắc và cách nhóm hệ cơ quan được chọn để dễ khám phá. Hình học đã được đơn giản hoá cho web, phần mô tả chỉ mang tính giáo dục phổ thông. Đây là tài liệu tham khảo, KHÔNG dùng để chẩn đoán hay phẫu thuật.',
    'Phần lớn tên cấu trúc giữ nguyên tiếng Anh theo dữ liệu gốc; các cơ quan lớn đã có tên tiếng Việt và có thể tìm bằng tiếng Việt không dấu.',
  ],
  aboutSourceHeading: 'Nguồn dữ liệu',
  aboutSourceBody:
    'BodyParts3D, © The Database Center for Life Science, phát hành theo giấy phép CC Attribution 4.0 International.',
  aboutLicense: 'Giấy phép bộ dữ liệu',
  aboutGeometry: 'Hình học & metadata gốc',
  aboutPaper: 'Bài báo khoa học gốc',
  aboutViewer: 'Mã nguồn trình xem gốc (human-atlas)',
  aboutClose: 'Đóng',

  errors: {
    catalogue: 'Không tải được danh mục giải phẫu. Vui lòng kiểm tra kết nối rồi thử lại.',
    'chunk-fetch': 'Không tải được một tệp dữ liệu 3D. Vui lòng kiểm tra kết nối rồi thử lại.',
    'chunk-incomplete': 'Một tệp dữ liệu 3D bị thiếu. Vui lòng tải lại trang.',
    'no-decompression':
      'Trình duyệt này không giải nén được dữ liệu 3D. Hãy dùng bản Chrome, Edge, Firefox hoặc Safari mới hơn.',
    assemble: 'Không dựng được hình học giải phẫu.',
    webgl: 'Trình duyệt này chưa bật WebGL nên không mở được khung nhìn 3D.',
    'context-lost': 'Thiết bị đã tạm dừng phiên 3D. Hãy tải lại trang để tiếp tục.',
    unknown: 'Không tải được mô hình giải phẫu.',
  } satisfies Record<AtlasErrorCode, string>,

  canvasAria:
    'Mô hình giải phẫu người tương tác. Kéo để xoay, chụm hoặc lăn chuột để phóng to, chạm vào một cấu trúc để xem chi tiết.',
};

const en: typeof vi = {
  eyebrow: 'INTERACTIVE ANATOMY',
  title: '3D Anatomy Atlas',
  pieces: 'modeled pieces',
  source: 'Source: BodyParts3D',
  back: 'Back to home',

  search: 'Find a structure',
  searchPlaceholder: 'Heart, liver, femur, lung…',
  searchAria: 'Search named anatomical structures',
  searchEmpty: 'No structures match your search.',
  searchHintIdle: 'Start with a major organ, or search every named structure.',
  searchHintResults: 'Showing up to 80 matches. Refine your search to find smaller structures.',
  searchClose: 'Close search',
  piecesShort: 'pieces',

  systems: 'Systems',
  systemsOpen: 'Open system layers',
  systemsClose: 'Close system layers',
  presetAll: 'All',
  presetSkeleton: 'Skeleton',
  presetOrgans: 'Organs',
  showOnly: (name: string) => `Show only ${name.toLowerCase()}`,
  toggleSystem: (name: string) => `Toggle ${name.toLowerCase()}`,
  visiblePieces: (n: string) => `${n} pieces visible`,
  hideAll: 'Hide all',

  views: 'Camera',
  viewThreeQuarter: 'Three-quarter',
  viewFront: 'Front',
  viewSide: 'Side',
  viewBack: 'Back',
  rotate: 'Auto rotate',
  pauseRotate: 'Pause rotation',
  reset: 'Reset',
  resetAria: 'Assemble the body and reset the view',

  explode: 'Explode anatomy',
  explodeStart: 'Assembled',
  explodeEnd: 'Every piece',

  captionBody: 'ADULT HUMAN · MALE',
  captionSeparated: 'SEPARATED STRUCTURES',
  captionInventory: 'ANATOMICAL INVENTORY',
  captionSelected: 'SELECTED STRUCTURE',

  hintOrbit: 'Drag to orbit',
  hintPan: 'Drag to pan',
  hintZoom: 'Pinch to zoom',
  hintTap: 'Tap a structure to inspect it',

  loadingTitle: 'Preparing the anatomy',
  loadingDetail: (percent: number, pieces: string) => `${percent}% · Loading ${pieces} pieces`,
  loadingNote: 'The first visit downloads about 32 MB of 3D geometry.',
  reload: 'Reload',

  detailReference: 'Atlas reference',
  detailSelected: 'Selected pieces',
  detailMembers: 'Included structures',
  detailMore: (n: number) => `And ${n} more modeled pieces.`,
  detailContextNote: 'System overview · structure identified from source anatomy',
  isolate: 'Isolate structure',
  unisolate: 'Show surrounding anatomy',
  clearSelection: 'Clear selection',
  closeDetail: 'Close details',
  sourceLink: 'View anatomical source',

  aboutOpen: 'About the dataset',
  aboutEyebrow: 'SOURCE & SCOPE',
  aboutTitle: 'A body, revealed.',
  aboutLead: 'Explore the adult male reference anatomy from BodyParts3D.',
  aboutBody: [
    '2,234 individual meshes and 3,432 named concepts from an adult male reference anatomy.',
    'This reference does not contain every human structure or variation. Named concepts can contain multiple pieces; each source mesh is rendered once.',
    'Colors and system groupings are designed for exploration. The geometry is simplified for the web, and short explanations provide general educational context. This is an anatomical reference, not a diagnostic or surgical tool.',
    'Most structure names stay in English as in the source data; major organs also carry Vietnamese names and can be searched in Vietnamese.',
  ],
  aboutSourceHeading: 'Source',
  aboutSourceBody:
    'BodyParts3D, © The Database Center for Life Science, licensed under CC Attribution 4.0 International.',
  aboutLicense: 'Dataset license',
  aboutGeometry: 'Original geometry & metadata',
  aboutPaper: 'Read the source publication',
  aboutViewer: 'Original viewer source (human-atlas)',
  aboutClose: 'Close',

  errors: {
    catalogue: 'The anatomy catalogue could not be loaded. Check your connection and try again.',
    'chunk-fetch': 'An anatomy file could not be loaded. Check your connection and try again.',
    'chunk-incomplete': 'An anatomy file was incomplete. Please reload the viewer.',
    'no-decompression':
      'This browser cannot decompress the 3D data. Please use a recent Chrome, Edge, Firefox or Safari.',
    assemble: 'Could not assemble anatomy geometry.',
    webgl: 'This browser could not start the 3D viewer. Please try a browser with WebGL enabled.',
    'context-lost': 'The 3D session was paused by your device. Reload to continue.',
    unknown: 'Could not load the anatomy.',
  },

  canvasAria:
    'Interactive human anatomy. Drag to orbit, pinch or scroll to zoom, and tap a structure to inspect it.',
};

export type AtlasText = typeof vi;

export function atlasText(language: Language): AtlasText {
  return language === 'en' ? en : vi;
}
