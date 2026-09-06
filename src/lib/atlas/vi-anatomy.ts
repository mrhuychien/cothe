/**
 * Lớp tiếng Việt đặt lên trên bộ dữ liệu BodyParts3D (vốn chỉ có tên tiếng Anh).
 *
 * - `VI_NAMES`  : tên Việt cho các cấu trúc lớn, hiển thị kèm tên gốc.
 * - `VI_KEYWORDS`: từ khoá tiếng Việt (đã bỏ dấu) -> chuỗi tiếng Anh cần tìm,
 *   để trẻ gõ "phổi", "xương đùi", "dạ dày"… vẫn ra đúng cấu trúc.
 *
 * Bộ dữ liệu gốc có 3.432 khái niệm nên không thể dịch hết; phần chưa có tên
 * Việt vẫn hiển thị nguyên tên giải phẫu tiếng Anh.
 */

import { Concept } from './anatomy';

export const VI_NAMES: Record<string, string> = {
  // Nội tạng
  heart: 'Tim',
  brain: 'Não',
  cerebellum: 'Tiểu não',
  liver: 'Gan',
  stomach: 'Dạ dày',
  spleen: 'Lách',
  pancreas: 'Tụy',
  gallbladder: 'Túi mật',
  'urinary bladder': 'Bàng quang',
  kidney: 'Thận',
  'left kidney': 'Thận trái',
  'right kidney': 'Thận phải',
  'left lung': 'Phổi trái',
  'right lung': 'Phổi phải',
  trachea: 'Khí quản',
  bronchus: 'Phế quản',
  diaphragm: 'Cơ hoành',
  esophagus: 'Thực quản',
  'small intestine': 'Ruột non',
  'large intestine': 'Ruột già',
  duodenum: 'Tá tràng',
  'ascending colon': 'Đại tràng lên',
  'transverse colon': 'Đại tràng ngang',
  'descending colon': 'Đại tràng xuống',
  rectum: 'Trực tràng',
  appendix: 'Ruột thừa',
  skin: 'Da',
  tongue: 'Lưỡi',
  tooth: 'Răng',
  nose: 'Mũi',
  'spinal cord': 'Tủy sống',
  ureter: 'Niệu quản',
  urethra: 'Niệu đạo',
  prostate: 'Tuyến tiền liệt',
  testis: 'Tinh hoàn',
  thymus: 'Tuyến ức',
  'adrenal gland': 'Tuyến thượng thận',
  'pituitary gland': 'Tuyến yên',
  'salivary gland': 'Tuyến nước bọt',

  // Xương
  skull: 'Hộp sọ',
  neurocranium: 'Sọ não',
  viscerocranium: 'Sọ mặt',
  'vertebral column': 'Cột sống',
  rib: 'Xương sườn',
  sternum: 'Xương ức',
  clavicle: 'Xương đòn',
  scapula: 'Xương bả vai',
  humerus: 'Xương cánh tay',
  radius: 'Xương quay',
  ulna: 'Xương trụ',
  femur: 'Xương đùi',
  patella: 'Xương bánh chè',
  tibia: 'Xương chày',
  fibula: 'Xương mác',
  pelvis: 'Khung chậu',
  'hip bone': 'Xương chậu',
  sacrum: 'Xương cùng',
  mandible: 'Xương hàm dưới',
  'nasal bone': 'Xương mũi',
  'nasal septum': 'Vách ngăn mũi',
  'temporal bone': 'Xương thái dương',
  'thyroid cartilage': 'Sụn giáp',

  // Cơ
  'gluteus maximus': 'Cơ mông lớn',
  sartorius: 'Cơ may',
  'tibialis anterior': 'Cơ chày trước',
  'tibialis posterior': 'Cơ chày sau',
  'pectoralis minor': 'Cơ ngực bé',
  'left pectoralis major': 'Cơ ngực lớn trái',
  'right pectoralis major': 'Cơ ngực lớn phải',
  'muscle of larynx': 'Cơ thanh quản',
  'muscle of pharynx': 'Cơ hầu',

  // Mạch máu và thần kinh
  aorta: 'Động mạch chủ',
  artery: 'Động mạch',
  vein: 'Tĩnh mạch',
  nerve: 'Dây thần kinh',
  'optic nerve': 'Dây thần kinh thị giác',

  // Giác quan
  'left eye': 'Mắt trái',
  'right eye': 'Mắt phải',
  'left eyeball': 'Nhãn cầu trái',
  'right eyeball': 'Nhãn cầu phải',
  'external ear': 'Tai ngoài',
  eyebrow: 'Lông mày',
};

/** Từ khoá tiếng Việt (viết thường, KHÔNG dấu) -> chuỗi tiếng Anh trong tên gốc. */
export const VI_KEYWORDS: Record<string, string> = {
  tim: 'heart',
  nao: 'brain',
  'tieu nao': 'cerebellum',
  gan: 'liver',
  'da day': 'stomach',
  lach: 'spleen',
  tuy: 'pancreas',
  'tuy song': 'spinal cord',
  'tui mat': 'gallbladder',
  'bang quang': 'bladder',
  than: 'kidney',
  phoi: 'lung',
  'khi quan': 'trachea',
  'phe quan': 'bronch',
  'co hoanh': 'diaphragm',
  'thuc quan': 'esophagus',
  'ruot non': 'small intestine',
  'ruot gia': 'large intestine',
  'ruot thua': 'appendix',
  'ta trang': 'duodenum',
  'dai trang': 'colon',
  'truc trang': 'rectum',
  da: 'skin',
  luoi: 'tongue',
  rang: 'tooth',
  mui: 'nose',
  'nieu quan': 'ureter',
  'nieu dao': 'urethra',
  'tuyen tien liet': 'prostate',
  'tinh hoan': 'testis',
  'tuyen uc': 'thymus',
  'tuyen thuong than': 'adrenal',
  'tuyen yen': 'pituitary',
  'tuyen nuoc bot': 'salivary',
  'tuyen giap': 'thyroid',
  'hop so': 'skull',
  so: 'skull',
  'cot song': 'vertebral column',
  'dot song': 'vertebra',
  'xuong suon': 'rib',
  'xuong uc': 'sternum',
  'xuong don': 'clavicle',
  'xuong ba vai': 'scapula',
  'xuong canh tay': 'humerus',
  'xuong quay': 'radius',
  'xuong tru': 'ulna',
  'xuong dui': 'femur',
  'xuong banh che': 'patella',
  'xuong chay': 'tibia',
  'xuong mac': 'fibula',
  'khung chau': 'pelvis',
  'xuong chau': 'hip bone',
  'xuong cung': 'sacrum',
  'xuong ham': 'mandible',
  'xuong thai duong': 'temporal bone',
  sun: 'cartilage',
  'day chang': 'ligament',
  khop: 'joint',
  'gan co': 'tendon',
  'co mong': 'gluteus',
  'co may': 'sartorius',
  'co chay': 'tibialis',
  'co nguc': 'pectoralis',
  'co delta': 'deltoid',
  'co thang': 'trapezius',
  'co nhi dau': 'biceps',
  'dong mach': 'artery',
  'dong mach chu': 'aorta',
  'tinh mach': 'vein',
  'mach mau': 'vessel',
  'than kinh': 'nerve',
  'day than kinh': 'nerve',
  'thanh quan': 'larynx',
  hau: 'pharynx',
  mat: 'eye',
  'nhan cau': 'eyeball',
  tai: 'ear',
  'long may': 'eyebrow',
  'tam that': 'ventricle',
  'tam nhi': 'atrium',
  'van tim': 'valve',
  'mang phoi': 'pleura',
  'tuyen mo hoi': 'sweat',
};

/** Bỏ dấu tiếng Việt và chuẩn hoá khoảng trắng để so khớp không phân biệt dấu. */
export function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\u0111/g, 'd')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Tên tiếng Việt của một khái niệm, nếu có trong từ điển. */
export function viName(name: string) {
  return VI_NAMES[name.toLowerCase()];
}

/** Nhãn hiển thị: tiếng Việt kèm tên giải phẫu gốc khi đang ở chế độ tiếng Việt. */
export function conceptLabel(name: string, lang: 'vi' | 'en') {
  if (lang !== 'vi') return { primary: name, secondary: '' };
  const vi = viName(name);
  return vi ? { primary: vi, secondary: name } : { primary: name, secondary: '' };
}

/** Các cấu trúc gợi ý khi ô tìm kiếm còn trống. */
export const SUGGESTED = [
  'heart',
  'brain',
  'liver',
  'stomach',
  'left lung',
  'right lung',
  'kidney',
  'spleen',
  'pancreas',
  'skull',
  'vertebral column',
  'femur',
];

/**
 * Từ khoá tiếng Anh suy ra từ câu tìm kiếm tiếng Việt.
 *
 * Khớp theo ranh giới từ (" than " nằm trong " than kinh ") nên phải loại bỏ
 * từ khoá ngắn bị chứa trong từ khoá dài hơn — nếu không, gõ "thần kinh" sẽ
 * kéo theo cả kết quả của "thận".
 */
function englishTerms(query: string) {
  const padded = ` ${query} `;
  const matched: string[] = [];
  for (const vi of Object.keys(VI_KEYWORDS)) {
    if (padded.includes(` ${vi} `) || vi.startsWith(query)) matched.push(vi);
  }
  const kept = matched.filter(
    (vi) => !matched.some((other) => other !== vi && ` ${other} `.includes(` ${vi} `))
  );
  const terms = new Set<string>([query]);
  for (const vi of kept) terms.add(normalize(VI_KEYWORDS[vi]));
  return Array.from(terms);
}

/**
 * Tìm khái niệm theo tên tiếng Anh, tên tiếng Việt, mã FMA hoặc từ khoá tiếng
 * Việt không dấu. Trả về tối đa `limit` kết quả, ưu tiên khớp chính xác.
 */
export function searchConcepts(concepts: Concept[], query: string, limit = 80) {
  const q = normalize(query);
  if (!q) {
    return SUGGESTED.map((name) =>
      concepts.find((c) => c.name.toLowerCase() === name)
    ).filter((c): c is Concept => !!c);
  }

  const terms = englishTerms(q);
  const scored: { concept: Concept; score: number }[] = [];

  for (const concept of concepts) {
    const name = normalize(concept.name);
    const vi = viName(concept.name);
    const viNormalized = vi ? normalize(vi) : '';

    let score = -1;
    if (name === q || viNormalized === q) score = 0;
    else if (viNormalized && viNormalized.includes(q)) score = 1;
    else if (name.startsWith(q)) score = 2;
    else if (normalize(concept.id).includes(q)) score = 3;
    else {
      for (const term of terms) {
        if (!term || !name.includes(term)) continue;
        score = name.startsWith(term) ? 4 : 5;
        break;
      }
    }

    if (score >= 0) scored.push({ concept, score });
  }

  scored.sort(
    (a, b) =>
      a.score - b.score ||
      a.concept.name.length - b.concept.name.length ||
      a.concept.name.localeCompare(b.concept.name)
  );
  return scored.slice(0, limit).map((s) => s.concept);
}
