/**
 * Mô hình dữ liệu cho Atlas Giải Phẫu 3D.
 *
 * Hình học và metadata lấy từ BodyParts3D 4.0 (CC BY 4.0) — xem
 * `public/models/ATTRIBUTION.md`. Cấu trúc atlas.json được port từ
 * dự án nguồn https://github.com/ashemag/human-atlas (MIT).
 */

import { Language } from '@/types';

export type SystemId =
  | 'skeletal'
  | 'muscular'
  | 'arterial'
  | 'venous'
  | 'nervous'
  | 'digestive'
  | 'respiratory'
  | 'urinary'
  | 'reproductive'
  | 'lymphatic'
  | 'endocrine'
  | 'integumentary'
  | 'connective'
  | 'sensory'
  | 'cardiac';

export interface AtlasSystem {
  id: SystemId;
  nameVi: string;
  nameEn: string;
  color: string;
  icon: string;
  descriptionVi: string;
  descriptionEn: string;
}

export const SYSTEMS: AtlasSystem[] = [
  {
    id: 'skeletal',
    nameVi: 'Bộ xương',
    nameEn: 'Skeleton',
    color: '#e2d9ba',
    icon: '🦴',
    descriptionVi:
      'Xương tạo nên bộ khung nâng đỡ cơ thể, bảo vệ nội tạng và là điểm bám cho cơ. Bên trong xương còn dự trữ khoáng chất và sinh ra tế bào máu.',
    descriptionEn:
      'Bones form the supporting framework of the body, protect organs, and provide attachment points for muscles. Their internal tissue also stores minerals and produces blood cells.',
  },
  {
    id: 'muscular',
    nameVi: 'Hệ cơ',
    nameEn: 'Muscles',
    color: '#a85b50',
    icon: '💪',
    descriptionVi:
      'Cơ vân tạo ra chuyển động bằng cách kéo vào điểm bám của chúng. Cùng với gân, cơ làm cử động khớp, giữ tư thế và sinh nhiệt cho cơ thể.',
    descriptionEn:
      'Skeletal muscles generate movement by pulling on their attachments. Together with tendons, they move joints, stabilize posture, and produce heat.',
  },
  {
    id: 'cardiac',
    nameVi: 'Tim',
    nameEn: 'Heart',
    color: '#b96760',
    icon: '❤️',
    descriptionVi:
      'Tim là một khối cơ rỗng có bốn buồng, hoạt động như máy bơm. Các van tim giữ cho máu chỉ chảy theo một chiều qua vòng tuần hoàn phổi và vòng tuần hoàn lớn.',
    descriptionEn:
      'The heart is a muscular pump with four chambers. Its valves direct blood forward through the pulmonary and systemic circuits.',
  },
  {
    id: 'sensory',
    nameVi: 'Cơ quan giác quan',
    nameEn: 'Sensory organs',
    color: '#b0c8ce',
    icon: '👁️',
    descriptionVi:
      'Đây là các cấu trúc phụ trách những giác quan đặc biệt như nhìn, nghe và giữ thăng bằng. Mô chuyên biệt của chúng nhận kích thích rồi phối hợp với hệ thần kinh để truyền thông tin.',
    descriptionEn:
      'These structures contribute to special senses, including sight, hearing, and balance. Their specialized tissues detect stimuli and work with the nervous system to convey information.',
  },
  {
    id: 'arterial',
    nameVi: 'Động mạch',
    nameEn: 'Arteries',
    color: '#c05245',
    icon: '🩸',
    descriptionVi:
      'Tim đẩy máu đi khắp vòng tuần hoàn. Động mạch mang máu rời khỏi tim để nuôi các mô, hoặc đưa máu lên phổi trong vòng tuần hoàn phổi.',
    descriptionEn:
      'The heart drives blood through the circulation. Arteries carry blood away from the heart to supply tissues or, in the pulmonary circuit, to the lungs.',
  },
  {
    id: 'venous',
    nameVi: 'Tĩnh mạch',
    nameEn: 'Veins',
    color: '#527c9f',
    icon: '💧',
    descriptionVi:
      'Tĩnh mạch đưa máu trở về tim. Mạng tĩnh mạch nông và sâu thu máu từ các mô; riêng tĩnh mạch phổi mang máu giàu oxy từ phổi về tim.',
    descriptionEn:
      'Veins return blood toward the heart. Superficial and deep networks collect blood from the tissues; the pulmonary veins bring oxygenated blood back from the lungs.',
  },
  {
    id: 'nervous',
    nameVi: 'Hệ thần kinh',
    nameEn: 'Nervous system',
    color: '#d8b565',
    icon: '🧠',
    descriptionVi:
      'Não, tủy sống và các dây thần kinh ngoại biên dẫn truyền và xử lý tín hiệu. Chúng đảm nhiệm cảm giác, vận động, phối hợp và điều hòa tự động các chức năng cơ thể.',
    descriptionEn:
      'The brain, spinal cord, and peripheral nerves carry and process signals. They support sensation, movement, coordination, and automatic regulation of body functions.',
  },
  {
    id: 'respiratory',
    nameVi: 'Hệ hô hấp',
    nameEn: 'Respiratory',
    color: '#b98991',
    icon: '🫁',
    descriptionVi:
      'Đường dẫn khí đưa không khí vào phổi, nơi oxy và khí carbonic trao đổi giữa không khí và máu. Nhịp thở phụ thuộc vào thay đổi áp suất do các cơ hô hấp tạo ra.',
    descriptionEn:
      'The airways conduct air to the lungs, where oxygen and carbon dioxide move between air and blood. Breathing depends on pressure changes produced by respiratory muscles.',
  },
  {
    id: 'digestive',
    nameVi: 'Hệ tiêu hóa',
    nameEn: 'Digestive',
    color: '#b8916b',
    icon: '🍎',
    descriptionVi:
      'Ống tiêu hóa phân giải thức ăn, hấp thu chất dinh dưỡng cùng nước rồi đẩy chất thải đi tiếp. Các tuyến phụ thuộc tiết ra mật và men tiêu hóa.',
    descriptionEn:
      'The digestive tract breaks down food, absorbs nutrients and water, and moves waste onward. Accessory organs contribute bile and digestive enzymes.',
  },
  {
    id: 'urinary',
    nameVi: 'Hệ tiết niệu',
    nameEn: 'Urinary',
    color: '#b47961',
    icon: '💦',
    descriptionVi:
      'Thận lọc máu và điều hòa cân bằng nước, điện giải cùng độ pH. Nước tiểu theo niệu quản xuống bàng quang rồi thoát ra ngoài qua niệu đạo.',
    descriptionEn:
      'The kidneys filter blood and regulate fluid, electrolyte, and acid–base balance. Urine travels through the ureters to the bladder and exits through the urethra.',
  },
  {
    id: 'lymphatic',
    nameVi: 'Hệ bạch huyết',
    nameEn: 'Lymphatic',
    color: '#879f7c',
    icon: '🛡️',
    descriptionVi:
      'Mạch bạch huyết đưa dịch thừa ở mô trở lại vòng tuần hoàn. Hạch bạch huyết và các cơ quan lympho khác tham gia giám sát và đáp ứng miễn dịch.',
    descriptionEn:
      'Lymphatic vessels return excess tissue fluid to the circulation. Lymph nodes and other lymphoid organs support immune surveillance and responses.',
  },
  {
    id: 'endocrine',
    nameVi: 'Hệ nội tiết',
    nameEn: 'Endocrine',
    color: '#c5a09a',
    icon: '⚗️',
    descriptionVi:
      'Các tuyến nội tiết tiết hormone vào máu để điều phối những quá trình như chuyển hóa, tăng trưởng, phản ứng với căng thẳng và sinh sản.',
    descriptionEn:
      'Endocrine organs release hormones into the blood to coordinate processes such as metabolism, growth, stress responses, and reproduction.',
  },
  {
    id: 'reproductive',
    nameVi: 'Hệ sinh dục',
    nameEn: 'Reproductive',
    color: '#bda098',
    icon: '🧬',
    descriptionVi:
      'Các cấu trúc sinh dục nam được mô hình hóa ở đây tham gia vào việc sinh tinh, làm tinh trùng trưởng thành, vận chuyển tinh trùng và sản xuất hormone sinh dục.',
    descriptionEn:
      'The male reproductive structures represented here contribute to sperm production, maturation, transport, and the production of sex hormones.',
  },
  {
    id: 'integumentary',
    nameVi: 'Bề mặt cơ thể',
    nameEn: 'Body surface',
    color: '#ba9b7d',
    icon: '🧍',
    descriptionVi:
      'Bề mặt cơ thể là mốc giải phẫu bên ngoài. Hệ da tạo hàng rào bảo vệ, đồng thời góp phần vào cảm giác và điều hòa thân nhiệt.',
    descriptionEn:
      'The body surface provides an outer anatomical reference. The integumentary system forms a protective barrier and contributes to sensation and temperature regulation.',
  },
  {
    id: 'connective',
    nameVi: 'Mô liên kết',
    nameEn: 'Connective tissue',
    color: '#aec3bb',
    icon: '🪢',
    descriptionVi:
      'Sụn, dây chằng và các mô liên kết khác nâng đỡ, nối và ngăn cách các cấu trúc. Chúng giữ vững khớp và phân tán lực cơ học.',
    descriptionEn:
      'Cartilage, ligaments, and other connective tissues support, connect, and separate structures. Their roles include stabilizing joints and distributing mechanical loads.',
  },
];

export interface Part {
  id: string;
  name: string;
  conceptId: string;
  system: SystemId;
  chunk: number;
  positions: number;
  normals: number;
  indices: number;
  vertexCount: number;
  indexCount: number;
  bounds: [number[], number[]];
}

export interface Concept {
  id: string;
  name: string;
  elements: string[];
}

export interface AtlasChunk {
  url?: string;
  bytes: number;
  gzip?: string;
  gzipBytes?: number;
}

export interface Atlas {
  version: string;
  sex?: 'male';
  source?: string;
  scope?: string;
  parts: Part[];
  concepts: Concept[];
  chunks: AtlasChunk[];
  triangles: number;
}

export type View = 'three-quarter' | 'front' | 'back' | 'side';

export interface SceneState {
  inspectorOpen?: boolean;
  explode: number;
  visible: SystemId[];
  selected: string[];
  isolate: boolean;
  view: View;
  rotate: boolean;
  reset: number;
}

/** Bề mặt da bị tắt mặc định để nhìn thấy ngay các cơ quan bên trong. */
export const DEFAULT_VISIBLE: SystemId[] = [
  'cardiac',
  'sensory',
  'skeletal',
  'muscular',
  'arterial',
  'venous',
  'nervous',
  'respiratory',
  'digestive',
  'urinary',
  'lymphatic',
  'endocrine',
  'reproductive',
  'connective',
];

export const PRESET_ORGANS: SystemId[] = [
  'cardiac',
  'respiratory',
  'digestive',
  'urinary',
  'endocrine',
  'reproductive',
];

interface Explanation {
  vi: string;
  en: string;
}

/** Giải thích riêng cho một số cơ quan lớn; phần còn lại dùng mô tả của hệ cơ quan. */
export const EXPLANATIONS: Record<string, Explanation> = {
  heart: {
    vi: 'Một khối cơ rỗng nằm trong lồng ngực, làm nhiệm vụ bơm máu. Nửa phải đẩy máu lên phổi, nửa trái đẩy máu đi nuôi toàn bộ cơ thể.',
    en: 'A muscular pump in the chest. Its right side sends blood to the lungs; its left side sends blood through the systemic circulation.',
  },
  liver: {
    vi: 'Cơ quan lớn nằm ngay dưới cơ hoành bên phải. Gan xử lý dưỡng chất vừa hấp thu, tạo ra mật và tổng hợp nhiều loại protein lưu thông trong máu.',
    en: 'A large organ beneath the right side of the diaphragm. It processes absorbed nutrients, produces bile, and synthesizes many proteins carried in the blood.',
  },
  brain: {
    vi: 'Cơ quan trung ương của hệ thần kinh. Các vùng não liên kết với nhau để tạo nên nhận thức, vận động, trí nhớ, ngôn ngữ và điều hòa hoạt động của cơ thể.',
    en: 'The central organ of the nervous system. Its interconnected regions support perception, movement, memory, language, and the regulation of bodily functions.',
  },
  stomach: {
    vi: 'Túi cơ nằm giữa thực quản và ruột non. Dạ dày chứa và nhào trộn thức ăn với acid cùng men tiêu hóa trước khi đẩy xuống tá tràng.',
    en: 'A muscular chamber between the esophagus and small intestine. It stores and mixes food with acid and enzymes before releasing it into the duodenum.',
  },
  spleen: {
    vi: 'Cơ quan lympho nằm ở vùng bụng trên bên trái. Lách lọc máu, loại bỏ tế bào máu già và tham gia vào đáp ứng miễn dịch.',
    en: 'A lymphoid organ in the upper left abdomen. It filters blood, removes aging blood cells, and participates in immune responses.',
  },
  pancreas: {
    vi: 'Cơ quan trong ổ bụng vừa tiêu hóa vừa nội tiết. Tụy tiết men xuống ruột non và giải phóng hormone như insulin cùng glucagon vào máu.',
    en: 'An abdominal organ with digestive and endocrine roles. It supplies enzymes to the small intestine and releases hormones including insulin and glucagon.',
  },
  'urinary bladder': {
    vi: 'Túi cơ nằm trong tiểu khung, chứa nước tiểu do thận đưa xuống qua hai niệu quản.',
    en: 'A muscular reservoir in the pelvis that stores urine arriving from the kidneys through the ureters.',
  },
  trachea: {
    vi: 'Đường dẫn khí chính nối thanh quản với hai phế quản. Các vòng sụn giữ cho khí quản luôn mở khi thở.',
    en: 'The main airway connecting the larynx to the bronchi. Its cartilage supports keep the airway open during breathing.',
  },
  diaphragm: {
    vi: 'Cơ dẹt rộng ngăn giữa lồng ngực và ổ bụng. Khi co lại, cơ hoành làm lồng ngực nở ra và hút không khí vào phổi.',
    en: 'A broad muscle separating the chest and abdomen. When it contracts, it increases chest volume and helps draw air into the lungs.',
  },
  'left lung': {
    vi: 'Phổi trái có hai thùy và chừa chỗ cho tim. Tại đây oxy đi vào máu còn khí carbonic được thải ra.',
    en: 'The left lung has two lobes and leaves room for the heart. Oxygen enters the blood here while carbon dioxide leaves it.',
  },
  'right lung': {
    vi: 'Phổi phải có ba thùy nên lớn hơn phổi trái một chút. Đây là nơi trao đổi khí giữa không khí và máu.',
    en: 'The right lung has three lobes and is slightly larger than the left. It is where air and blood exchange gases.',
  },
  kidney: {
    vi: 'Hai quả thận lọc máu suốt ngày đêm, giữ lại chất cần thiết và tạo ra nước tiểu để thải phần dư thừa.',
    en: 'The two kidneys filter blood continuously, keeping what the body needs and forming urine from the rest.',
  },
  skin: {
    vi: 'Da là cơ quan lớn nhất cơ thể. Da che chắn khỏi vi khuẩn, giữ nước, cảm nhận va chạm và giúp điều hòa thân nhiệt.',
    en: 'Skin is the largest organ of the body. It shields against microbes, retains water, senses touch, and helps regulate temperature.',
  },
  skull: {
    vi: 'Hộp sọ gồm nhiều xương ghép khít với nhau để bảo vệ não và nâng đỡ khuôn mặt.',
    en: 'The skull is made of many bones fitted tightly together to protect the brain and support the face.',
  },
  'vertebral column': {
    vi: 'Cột sống xếp chồng từ nhiều đốt sống, giúp cơ thể đứng thẳng và bao bọc tủy sống bên trong.',
    en: 'The vertebral column stacks many vertebrae, keeps the body upright, and shelters the spinal cord inside.',
  },
  'spinal cord': {
    vi: 'Tủy sống là bó thần kinh chạy trong ống sống, truyền tín hiệu giữa não và phần còn lại của cơ thể.',
    en: 'The spinal cord is a nerve bundle running inside the spine, relaying signals between the brain and the rest of the body.',
  },
};

export function systemName(system: AtlasSystem | undefined, lang: Language) {
  if (!system) return lang === 'vi' ? 'Giải phẫu' : 'Anatomy';
  return lang === 'vi' ? system.nameVi : system.nameEn;
}

export function systemDescription(system: AtlasSystem | undefined, lang: Language) {
  if (!system) return '';
  return lang === 'vi' ? system.descriptionVi : system.descriptionEn;
}

/** Mô tả cho một cấu trúc: ưu tiên giải thích riêng, nếu không thì mô tả hệ cơ quan. */
export function explanation(name: string, system: SystemId, lang: Language) {
  const specific = EXPLANATIONS[name.toLowerCase()];
  if (specific) return lang === 'vi' ? specific.vi : specific.en;
  return systemDescription(
    SYSTEMS.find((s) => s.id === system),
    lang
  );
}

export function hasSpecificExplanation(name: string) {
  return !!EXPLANATIONS[name.toLowerCase()];
}
