'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useMemo } from 'react';
import {
  ChevronDown, Eye, Bone, Heart, Wind, Apple, Brain, Dumbbell,
  X, Languages, Search, BookOpen, GraduationCap,
  RotateCcw, ZoomIn, Info, Sparkles, Menu, ChevronLeft
} from 'lucide-react';
import { useExplorerStore } from '@/stores/useExplorerStore';
import { bodySystems } from '@/data/systems';
import { BodySystem } from '@/types';

// ============================================================================
// DATA: Sketchfab Models from University of Dundee
// ============================================================================
const SKETCHFAB_MODELS: Record<string, { uid: string; title: string; hasAnnotations: boolean; source: string }> = {
  // NERVOUS SYSTEM
  nervous: { uid: '2e6be1399756494b9f185ce8c5900911', title: 'The Nervous System', hasAnnotations: true, source: 'University of Dundee, CAHID' },
  'nervous-cranial': { uid: '82d87cb89d6c48f0984a59c4f2a4cf9a', title: 'Cranial Nerves', hasAnnotations: true, source: 'University of Dundee, CAHID' },
  'nervous-spinal': { uid: 'd4af33ccf03b4fec8754180bcb480516', title: 'Spinal Cord Anatomy', hasAnnotations: true, source: 'University of Dundee, CAHID' },
  'nervous-limbic': { uid: '7981dff55a8d40259aff2f1d53649ef6', title: 'Limbic System', hasAnnotations: true, source: 'University of Dundee, CAHID' },
  // CIRCULATORY
  circulatory: { uid: '9f48eaa481cc4a43baeb9e1f03882cff', title: 'Internal Human Heart Anatomy', hasAnnotations: true, source: 'University of Dundee, CAHID' },
  'circulatory-external': { uid: '10472481071e4375b8233289c277d411', title: 'External Human Heart Anatomy', hasAnnotations: true, source: 'University of Dundee, CAHID' },
  lymphatic: { uid: '14800d739ecb46678d7584a401b0aa77', title: 'Lymphatic System', hasAnnotations: true, source: 'University of Dundee, CAHID' },
  // DIGESTIVE
  digestive: { uid: '3a920101c4304eacaa3a422faacfc660', title: 'Bowel Anatomy', hasAnnotations: true, source: 'University of Dundee, CAHID' },
  // MUSCULAR
  muscular: { uid: '4f258907dfb6477aa9bf4dfb5833a797', title: 'Simplified Male Muscular System', hasAnnotations: true, source: 'Alexander' },
  'muscular-knee': { uid: '765feaaebb4743dab7eeabb35c89cf10', title: 'Knee Anatomy: Muscles', hasAnnotations: true, source: 'University of Dundee, CAHID' },
  'muscular-mastication': { uid: 'b362acea258f4bc6af6d2e46d37d30fc', title: 'Muscles of Mastication', hasAnnotations: true, source: 'University of Dundee, CAHID' },
  'muscular-pelvic': { uid: 'd42a4dc074e14530ae3bfee5eba71493', title: '3D Pelvic Floor Muscles', hasAnnotations: true, source: 'University of Dundee, CAHID' },
  // SKELETAL
  skeletal: { uid: '911b9df7e7834175b69b4840ea15e054', title: 'Human Skeleton', hasAnnotations: true, source: 'Terrie Simmons-Ehrhardt' },
  'skeletal-skull': { uid: '3571157d910c483e8dd9eb3138952fbd', title: 'Adult Male Skull', hasAnnotations: true, source: 'University of Dundee, CAHID' },
  // RESPIRATORY
  respiratory: { uid: '1cd55d26c1254ab7a5d0845fb9a207fe', title: 'Anatomy of the Airways', hasAnnotations: true, source: 'E-learning UMCG' },
  'respiratory-larynx': { uid: 'a00bc73a303c46248db6a13a88b23404', title: 'Anatomy of the Larynx', hasAnnotations: true, source: 'University of Dundee, CAHID' },
  // SENSORY
  'sensory-eye': { uid: 'b023a73eadcc47be83e637175f32adf2', title: 'Eyeball and Extra-ocular Muscles', hasAnnotations: true, source: 'University of Dundee, CAHID' },
  // FULL BODY
  full: { uid: 'faf0f3eaec554bcf854be2038993024f', title: 'Human Anatomy', hasAnnotations: false, source: 'Sketchfab Community' },
};

// ============================================================================
// DATA: Vietnamese Annotations for each system
// ============================================================================
const SYSTEM_ANNOTATIONS: Record<string, {
  title: string;
  titleEn: string;
  description: string;
  funFact: string;
  source: string;
  color: string;
  parts: Array<{ nameEn: string; nameVi: string; description: string; detail: string }>;
}> = {
  full: {
    title: 'Cơ Thể Người',
    titleEn: 'Human Body',
    description: 'Cơ thể người là một hệ thống phức tạp gồm nhiều cơ quan phối hợp hoạt động.',
    funFact: 'Cơ thể người có khoảng 37.2 nghìn tỷ tế bào!',
    source: 'Sketchfab Community',
    color: '#3B82F6',
    parts: [
      { nameEn: 'Skeletal System', nameVi: 'Hệ Xương', description: '206 xương tạo khung đỡ', detail: 'Bảo vệ các cơ quan quan trọng' },
      { nameEn: 'Muscular System', nameVi: 'Hệ Cơ', description: 'Hơn 600 cơ giúp cử động', detail: 'Chiếm 40% trọng lượng cơ thể' },
      { nameEn: 'Circulatory System', nameVi: 'Hệ Tuần Hoàn', description: 'Tim và mạch máu', detail: 'Tim đập 100,000 lần/ngày' },
      { nameEn: 'Respiratory System', nameVi: 'Hệ Hô Hấp', description: 'Phổi trao đổi khí', detail: 'Thở 20,000 lần/ngày' },
      { nameEn: 'Digestive System', nameVi: 'Hệ Tiêu Hóa', description: 'Phân giải thức ăn', detail: 'Ruột non dài 6-7 mét' },
      { nameEn: 'Nervous System', nameVi: 'Hệ Thần Kinh', description: 'Não và dây thần kinh', detail: '86 tỷ tế bào thần kinh' },
    ],
  },
  skeletal: {
    title: 'Hệ Xương',
    titleEn: 'Skeletal System',
    description: 'Hệ xương gồm 206 chiếc xương tạo thành bộ khung nâng đỡ toàn bộ cơ thể.',
    funFact: 'Xương đùi có thể chịu lực gấp 30 lần trọng lượng cơ thể!',
    source: 'Terrie Simmons-Ehrhardt',
    color: '#F5F5DC',
    parts: [
      { nameEn: 'Skull', nameVi: 'Hộp Sọ', description: 'Bảo vệ não bộ', detail: 'Gồm 22 mảnh xương ghép lại' },
      { nameEn: 'Spine', nameVi: 'Cột Sống', description: '33 đốt sống xếp chồng', detail: 'Bảo vệ tủy sống' },
      { nameEn: 'Ribs', nameVi: 'Xương Sườn', description: '12 cặp xương sườn', detail: 'Bảo vệ tim và phổi' },
      { nameEn: 'Pelvis', nameVi: 'Xương Chậu', description: 'Nối cột sống với chân', detail: 'Chịu trọng lượng phần trên' },
      { nameEn: 'Femur', nameVi: 'Xương Đùi', description: 'Xương dài nhất', detail: 'Chiếm 1/4 chiều cao' },
      { nameEn: 'Humerus', nameVi: 'Xương Cánh Tay', description: 'Xương từ vai đến khuỷu', detail: 'Nối với xương quay và trụ' },
    ],
  },
  'skeletal-skull': {
    title: 'Hộp Sọ Chi Tiết',
    titleEn: 'Adult Male Skull',
    description: 'Mô hình chi tiết hộp sọ người trưởng thành từ CT scan.',
    funFact: 'Hộp sọ trẻ sơ sinh có 6 thóp, đóng lại khi 2 tuổi!',
    source: 'University of Dundee, CAHID',
    color: '#F5F5DC',
    parts: [
      { nameEn: 'Frontal Bone', nameVi: 'Xương Trán', description: 'Xương phía trước', detail: 'Tạo thành trán và mái hốc mắt' },
      { nameEn: 'Parietal Bones', nameVi: 'Xương Đỉnh', description: '2 xương trên đỉnh', detail: 'Tạo phần lớn nóc sọ' },
      { nameEn: 'Temporal Bones', nameVi: 'Xương Thái Dương', description: '2 xương hai bên', detail: 'Chứa tai trong' },
      { nameEn: 'Occipital Bone', nameVi: 'Xương Chẩm', description: 'Xương phía sau', detail: 'Có lỗ chẩm cho tủy sống' },
      { nameEn: 'Maxilla', nameVi: 'Xương Hàm Trên', description: 'Xương cố định', detail: 'Chứa răng hàm trên' },
      { nameEn: 'Mandible', nameVi: 'Xương Hàm Dưới', description: 'Xương di động', detail: 'Xương mặt lớn nhất' },
    ],
  },
  muscular: {
    title: 'Hệ Cơ',
    titleEn: 'Muscular System',
    description: 'Cơ thể có hơn 600 cơ, giúp cử động và tạo ra nhiệt.',
    funFact: 'Cơ mặt có hơn 40 cơ nhỏ, tạo hàng nghìn biểu cảm!',
    source: 'Alexander - Sketchfab',
    color: '#DC2626',
    parts: [
      { nameEn: 'Trapezius', nameVi: 'Cơ Thang', description: 'Cơ lưng trên', detail: 'Giúp cử động vai và cổ' },
      { nameEn: 'Pectoralis Major', nameVi: 'Cơ Ngực Lớn', description: 'Cơ ngực chính', detail: 'Giúp đẩy và ôm' },
      { nameEn: 'Biceps', nameVi: 'Cơ Nhị Đầu', description: 'Cơ trước cánh tay', detail: 'Giúp gập khuỷu tay' },
      { nameEn: 'Quadriceps', nameVi: 'Cơ Tứ Đầu Đùi', description: 'Cơ trước đùi', detail: 'Giúp đi, chạy, đá' },
      { nameEn: 'Gluteus Maximus', nameVi: 'Cơ Mông Lớn', description: 'Cơ lớn nhất', detail: 'Giúp đứng và leo cầu thang' },
      { nameEn: 'Gastrocnemius', nameVi: 'Cơ Bắp Chân', description: 'Cơ sau cẳng chân', detail: 'Giúp nhón chân và nhảy' },
    ],
  },
  'muscular-knee': {
    title: 'Cơ Vùng Gối',
    titleEn: 'Knee Muscles',
    description: 'Giải phẫu chi tiết các cơ quanh khớp gối.',
    funFact: 'Khớp gối chịu lực gấp 6 lần trọng lượng khi chạy!',
    source: 'University of Dundee, CAHID',
    color: '#DC2626',
    parts: [
      { nameEn: 'Quadriceps Femoris', nameVi: 'Cơ Tứ Đầu Đùi', description: 'Nhóm 4 cơ trước đùi', detail: 'Duỗi thẳng đầu gối' },
      { nameEn: 'Hamstrings', nameVi: 'Cơ Gân Kheo', description: 'Nhóm cơ sau đùi', detail: 'Gập gối và duỗi hông' },
      { nameEn: 'Gastrocnemius', nameVi: 'Cơ Bụng Chân', description: 'Cơ bắp chân', detail: 'Qua khớp gối' },
      { nameEn: 'Sartorius', nameVi: 'Cơ May', description: 'Cơ dài nhất', detail: 'Chạy chéo từ hông đến cẳng chân' },
    ],
  },
  'muscular-mastication': {
    title: 'Cơ Nhai',
    titleEn: 'Muscles of Mastication',
    description: 'Các cơ điều khiển hàm dưới, giúp nhai thức ăn.',
    funFact: 'Cơ nhai có thể tạo lực cắn lên đến 90 kg!',
    source: 'University of Dundee, CAHID',
    color: '#DC2626',
    parts: [
      { nameEn: 'Masseter', nameVi: 'Cơ Cắn', description: 'Cơ nhai chính', detail: 'Cơ mạnh nhất, nâng hàm' },
      { nameEn: 'Temporalis', nameVi: 'Cơ Thái Dương', description: 'Cơ hình quạt', detail: 'Nâng và kéo hàm về sau' },
      { nameEn: 'Medial Pterygoid', nameVi: 'Cơ Chân Bướm Trong', description: 'Cơ sâu trong', detail: 'Giúp nâng và đưa hàm' },
      { nameEn: 'Lateral Pterygoid', nameVi: 'Cơ Chân Bướm Ngoài', description: 'Cơ mở hàm', detail: 'Giúp há miệng' },
    ],
  },
  'muscular-pelvic': {
    title: 'Cơ Sàn Chậu',
    titleEn: 'Pelvic Floor Muscles',
    description: 'Nhóm cơ nâng đỡ các cơ quan vùng chậu.',
    funFact: 'Cơ sàn chậu hoạt động 24/7 để nâng đỡ cơ quan!',
    source: 'University of Dundee, CAHID',
    color: '#DC2626',
    parts: [
      { nameEn: 'Levator Ani', nameVi: 'Cơ Nâng Hậu Môn', description: 'Cơ sàn chính', detail: 'Gồm 3 phần' },
      { nameEn: 'Pubococcygeus', nameVi: 'Cơ Mu-Cụt', description: 'Phần giữa', detail: 'Kiểm soát tiểu tiện' },
      { nameEn: 'Coccygeus', nameVi: 'Cơ Cụt', description: 'Cơ phía sau', detail: 'Nâng đỡ xương cụt' },
    ],
  },
  circulatory: {
    title: 'Tim - Cấu Trúc Bên Trong',
    titleEn: 'Internal Heart Anatomy',
    description: 'Mô hình chi tiết cấu trúc bên trong của tim.',
    funFact: 'Nếu nối tất cả mạch máu lại, chúng dài 100,000 km!',
    source: 'University of Dundee, CAHID',
    color: '#EF4444',
    parts: [
      { nameEn: 'Left Ventricle', nameVi: 'Tâm Thất Trái', description: 'Buồng tim mạnh nhất', detail: 'Bơm máu đi khắp cơ thể' },
      { nameEn: 'Right Ventricle', nameVi: 'Tâm Thất Phải', description: 'Buồng tim dưới phải', detail: 'Bơm máu đến phổi' },
      { nameEn: 'Aorta', nameVi: 'Động Mạch Chủ', description: 'Động mạch lớn nhất', detail: 'Đưa máu từ tim đi toàn thân' },
      { nameEn: 'Mitral Valve', nameVi: 'Van Hai Lá', description: 'Van giữa nhĩ-thất trái', detail: 'Ngăn máu chảy ngược' },
    ],
  },
  'circulatory-external': {
    title: 'Tim - Cấu Trúc Bên Ngoài',
    titleEn: 'External Heart Anatomy',
    description: 'Mô hình bề ngoài của tim với động mạch vành.',
    funFact: 'Động mạch vành được đặt tên vì bao quanh tim như vương miện!',
    source: 'University of Dundee, CAHID',
    color: '#EF4444',
    parts: [
      { nameEn: 'Coronary Arteries', nameVi: 'Động Mạch Vành', description: 'Nuôi cơ tim', detail: 'Tim cần oxy liên tục' },
      { nameEn: 'Pulmonary Trunk', nameVi: 'Thân Động Mạch Phổi', description: 'Mạch đến phổi', detail: 'Chia thành 2 nhánh' },
      { nameEn: 'Superior Vena Cava', nameVi: 'Tĩnh Mạch Chủ Trên', description: 'Tĩnh mạch từ nửa trên', detail: 'Đưa máu từ đầu về tim' },
      { nameEn: 'Inferior Vena Cava', nameVi: 'Tĩnh Mạch Chủ Dưới', description: 'Tĩnh mạch lớn nhất', detail: 'Đưa máu từ chân về tim' },
    ],
  },
  lymphatic: {
    title: 'Hệ Bạch Huyết',
    titleEn: 'Lymphatic System',
    description: 'Mạng lưới mạch và hạch giúp chống nhiễm trùng.',
    funFact: 'Hệ bạch huyết dựa vào cử động cơ để lưu thông!',
    source: 'University of Dundee, CAHID',
    color: '#22C55E',
    parts: [
      { nameEn: 'Lymph Nodes', nameVi: 'Hạch Bạch Huyết', description: 'Trạm lọc', detail: 'Khoảng 600 hạch trong cơ thể' },
      { nameEn: 'Spleen', nameVi: 'Lá Lách', description: 'Cơ quan lọc máu', detail: 'Phá hủy tế bào máu cũ' },
      { nameEn: 'Thymus', nameVi: 'Tuyến Ức', description: 'Cơ quan miễn dịch', detail: 'Phát triển tế bào T' },
      { nameEn: 'Thoracic Duct', nameVi: 'Ống Ngực', description: 'Ống lớn nhất', detail: 'Thu gom bạch huyết' },
    ],
  },
  respiratory: {
    title: 'Hệ Hô Hấp',
    titleEn: 'Respiratory System',
    description: 'Hệ hô hấp giúp cơ thể lấy oxy và thải CO2.',
    funFact: 'Tổng diện tích bề mặt phổi bằng một sân tennis!',
    source: 'E-learning UMCG',
    color: '#06B6D4',
    parts: [
      { nameEn: 'Trachea', nameVi: 'Khí Quản', description: 'Ống dẫn khí chính', detail: 'Dài 10-12 cm' },
      { nameEn: 'Bronchi', nameVi: 'Phế Quản', description: 'Nhánh vào phổi', detail: 'Phải ngắn và thẳng hơn' },
      { nameEn: 'Lungs', nameVi: 'Phổi', description: 'Cơ quan trao đổi khí', detail: 'Phổi phải có 3 thùy' },
      { nameEn: 'Alveoli', nameVi: 'Phế Nang', description: 'Túi khí siêu nhỏ', detail: '300 triệu phế nang' },
    ],
  },
  'respiratory-larynx': {
    title: 'Thanh Quản',
    titleEn: 'Larynx',
    description: 'Thanh quản chứa dây thanh âm và kiểm soát đường thở.',
    funFact: 'Dây thanh âm rung 100-1000 lần/giây khi nói!',
    source: 'University of Dundee School of Medicine',
    color: '#06B6D4',
    parts: [
      { nameEn: 'Epiglottis', nameVi: 'Nắp Thanh Môn', description: 'Sụn hình lá', detail: 'Đậy thanh quản khi nuốt' },
      { nameEn: 'Thyroid Cartilage', nameVi: 'Sụn Giáp', description: 'Sụn lớn nhất', detail: 'Tạo "trái cổ Adam"' },
      { nameEn: 'Vocal Cords', nameVi: 'Dây Thanh Âm', description: 'Tạo âm thanh', detail: 'Rung để phát giọng nói' },
    ],
  },
  digestive: {
    title: 'Giải Phẫu Ruột',
    titleEn: 'Bowel Anatomy',
    description: 'Mô hình chi tiết ống tiêu hóa từ dạ dày đến trực tràng.',
    funFact: 'Ruột non có hàng triệu lông nhung tăng diện tích hấp thu!',
    source: 'University of Dundee, CAHID',
    color: '#F59E0B',
    parts: [
      { nameEn: 'Stomach', nameVi: 'Dạ Dày', description: 'Túi chứa thức ăn', detail: 'Dung tích khoảng 1 lít' },
      { nameEn: 'Small Intestine', nameVi: 'Ruột Non', description: 'Nơi hấp thu chính', detail: 'Hấp thu 90% chất dinh dưỡng' },
      { nameEn: 'Colon', nameVi: 'Đại Tràng', description: 'Ruột già', detail: 'Hấp thu nước và tạo phân' },
      { nameEn: 'Rectum', nameVi: 'Trực Tràng', description: 'Phần cuối ruột già', detail: 'Chứa phân trước khi thải' },
    ],
  },
  nervous: {
    title: 'Hệ Thần Kinh',
    titleEn: 'Nervous System',
    description: 'Hệ thần kinh là "trung tâm điều khiển" của cơ thể.',
    funFact: 'Não có 86 tỷ tế bào thần kinh, mỗi neuron kết nối 10,000 neuron khác!',
    source: 'University of Dundee, CAHID',
    color: '#A855F7',
    parts: [
      { nameEn: 'Brain', nameVi: 'Đại Não', description: 'Phần lớn nhất của não', detail: 'Suy nghĩ, học tập, cảm xúc' },
      { nameEn: 'Cerebellum', nameVi: 'Tiểu Não', description: 'Phần sau não', detail: 'Điều khiển thăng bằng' },
      { nameEn: 'Brainstem', nameVi: 'Thân Não', description: 'Nối não với tủy sống', detail: 'Điều khiển nhịp thở, tim' },
      { nameEn: 'Spinal Cord', nameVi: 'Tủy Sống', description: 'Dây thần kinh trong cột sống', detail: 'Truyền tín hiệu não-cơ thể' },
    ],
  },
  'nervous-cranial': {
    title: '12 Dây Thần Kinh Sọ',
    titleEn: 'Cranial Nerves',
    description: '12 cặp dây thần kinh sọ điều khiển các chức năng của đầu và mặt.',
    funFact: 'Dây thần kinh khứu giác kết nối trực tiếp với vỏ não!',
    source: 'University of Dundee, CAHID',
    color: '#A855F7',
    parts: [
      { nameEn: 'Olfactory (I)', nameVi: 'Thần Kinh Khứu Giác', description: 'Dây số 1', detail: 'Giúp ngửi mùi' },
      { nameEn: 'Optic (II)', nameVi: 'Thần Kinh Thị Giác', description: 'Dây số 2', detail: 'Truyền hình ảnh từ mắt' },
      { nameEn: 'Trigeminal (V)', nameVi: 'Thần Kinh Tam Thoa', description: 'Dây số 5', detail: 'Cảm giác mặt và nhai' },
      { nameEn: 'Facial (VII)', nameVi: 'Thần Kinh Mặt', description: 'Dây số 7', detail: 'Biểu cảm mặt' },
      { nameEn: 'Vagus (X)', nameVi: 'Thần Kinh Phế Vị', description: 'Dây số 10', detail: 'Dây dài nhất, điều khiển tim phổi' },
    ],
  },
  'nervous-spinal': {
    title: 'Tủy Sống Chi Tiết',
    titleEn: 'Spinal Cord Anatomy',
    description: 'Tủy sống là cầu nối giữa não và cơ thể.',
    funFact: 'Tủy sống dài 45cm và nặng chỉ 35 gram!',
    source: 'University of Dundee, CAHID',
    color: '#A855F7',
    parts: [
      { nameEn: 'Spinal Cord', nameVi: 'Tủy Sống', description: 'Dây thần kinh trung ương', detail: 'Nằm trong ống sống' },
      { nameEn: 'Ventral Root', nameVi: 'Rễ Bụng', description: 'Rễ phía trước', detail: 'Mang tín hiệu vận động' },
      { nameEn: 'Dorsal Root', nameVi: 'Rễ Lưng', description: 'Rễ phía sau', detail: 'Mang tín hiệu cảm giác' },
      { nameEn: 'Gray Matter', nameVi: 'Chất Xám', description: 'Phần giữa tủy', detail: 'Chứa thân tế bào' },
    ],
  },
  'nervous-limbic': {
    title: 'Hệ Viền',
    titleEn: 'Limbic System',
    description: 'Hệ viền liên quan đến cảm xúc, trí nhớ và hành vi.',
    funFact: 'Hồi hải mã được đặt tên theo hình dạng cá ngựa!',
    source: 'University of Dundee, CAHID',
    color: '#A855F7',
    parts: [
      { nameEn: 'Hippocampus', nameVi: 'Hồi Hải Mã', description: 'Trung tâm trí nhớ', detail: 'Chuyển ký ức ngắn thành dài hạn' },
      { nameEn: 'Amygdala', nameVi: 'Hạch Hạnh Nhân', description: 'Trung tâm cảm xúc', detail: 'Xử lý sợ hãi và khoái cảm' },
      { nameEn: 'Thalamus', nameVi: 'Đồi Thị', description: 'Trạm trung chuyển', detail: 'Chuyển tiếp tín hiệu' },
      { nameEn: 'Hypothalamus', nameVi: 'Vùng Dưới Đồi', description: 'Điều hòa nội tiết', detail: 'Kiểm soát đói, khát, nhiệt độ' },
    ],
  },
  'sensory-eye': {
    title: 'Mắt và Cơ Vận Nhãn',
    titleEn: 'Eye Anatomy',
    description: 'Giải phẫu nhãn cầu và 6 cơ vận nhãn.',
    funFact: 'Mắt có thể phân biệt 10 triệu màu sắc khác nhau!',
    source: 'University of Dundee, CAHID',
    color: '#14B8A6',
    parts: [
      { nameEn: 'Cornea', nameVi: 'Giác Mạc', description: 'Lớp trong suốt', detail: 'Khúc xạ 2/3 ánh sáng' },
      { nameEn: 'Iris', nameVi: 'Mống Mắt', description: 'Phần màu của mắt', detail: 'Điều chỉnh ánh sáng' },
      { nameEn: 'Lens', nameVi: 'Thủy Tinh Thể', description: 'Hội tụ ánh sáng', detail: 'Thay đổi hình dạng để lấy nét' },
      { nameEn: 'Retina', nameVi: 'Võng Mạc', description: 'Màng cảm quang', detail: '120 triệu tế bào que và nón' },
    ],
  },
};

// Sub-models mapping
const DUNDEE_SUBMODELS: Record<string, Array<{ key: string; label: string; icon?: string }>> = {
  nervous: [
    { key: 'nervous', label: 'Toàn Bộ Hệ Thần Kinh', icon: '🧠' },
    { key: 'nervous-cranial', label: '12 Dây Thần Kinh Sọ', icon: '🔢' },
    { key: 'nervous-spinal', label: 'Tủy Sống Chi Tiết', icon: '🦴' },
    { key: 'nervous-limbic', label: 'Hệ Viền (Cảm Xúc)', icon: '💜' },
  ],
  circulatory: [
    { key: 'circulatory', label: 'Tim - Bên Trong', icon: '❤️' },
    { key: 'circulatory-external', label: 'Tim - Bên Ngoài', icon: '🫀' },
    { key: 'lymphatic', label: 'Hệ Bạch Huyết', icon: '💚' },
  ],
  skeletal: [
    { key: 'skeletal', label: 'Bộ Xương Toàn Thân', icon: '💀' },
    { key: 'skeletal-skull', label: 'Hộp Sọ Chi Tiết', icon: '🦴' },
  ],
  muscular: [
    { key: 'muscular', label: 'Hệ Cơ Toàn Thân', icon: '💪' },
    { key: 'muscular-knee', label: 'Cơ Vùng Gối', icon: '🦵' },
    { key: 'muscular-mastication', label: 'Cơ Nhai (Mặt)', icon: '😬' },
    { key: 'muscular-pelvic', label: 'Cơ Sàn Chậu', icon: '🩺' },
  ],
  respiratory: [
    { key: 'respiratory', label: 'Đường Hô Hấp', icon: '🌬️' },
    { key: 'respiratory-larynx', label: 'Thanh Quản', icon: '🗣️' },
  ],
};

// System icons mapping
const SYSTEM_ICONS: Record<string, React.ReactNode> = {
  skeletal: <Bone className="w-5 h-5" />,
  muscular: <Dumbbell className="w-5 h-5" />,
  circulatory: <Heart className="w-5 h-5" />,
  respiratory: <Wind className="w-5 h-5" />,
  digestive: <Apple className="w-5 h-5" />,
  nervous: <Brain className="w-5 h-5" />,
};

// System colors
const SYSTEM_COLORS: Record<string, string> = {
  skeletal: '#F5F5DC',
  muscular: '#DC2626',
  circulatory: '#EF4444',
  respiratory: '#06B6D4',
  digestive: '#F59E0B',
  nervous: '#A855F7',
};

// ============================================================================
// COMPONENTS
// ============================================================================

// Professional Header
function ExplorerHeader({ onMenuToggle, sidebarOpen }: { onMenuToggle: () => void; sidebarOpen: boolean }) {
  return (
    <header className="h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 flex items-center px-4 gap-4 backdrop-blur-xl">
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
      >
        {sidebarOpen ? <ChevronLeft className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
      </button>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
          <span className="text-xl">🫀</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">CoThe.Info</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">Khám Phá Cơ Thể Người</p>
        </div>
      </div>

      <div className="flex-1" />

      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full border border-slate-700/50">
        <GraduationCap className="w-4 h-4 text-amber-400" />
        <span className="text-xs text-slate-300">University of Dundee</span>
      </div>
    </header>
  );
}

// Sidebar System Card
function SystemCard({
  system,
  isActive,
  isExpanded,
  onToggle,
  onSelect,
  activeModelKey,
  onSelectSubModel,
}: {
  system: typeof bodySystems[0];
  isActive: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onSelect: () => void;
  activeModelKey: string;
  onSelectSubModel: (key: string) => void;
}) {
  const subModels = DUNDEE_SUBMODELS[system.id];
  const color = SYSTEM_COLORS[system.id] || '#3B82F6';

  return (
    <motion.div
      layout
      className={`rounded-xl overflow-hidden transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-slate-700/80 to-slate-700/40 ring-1 ring-white/10'
          : 'bg-slate-800/30 hover:bg-slate-800/50'
      }`}
    >
      <button
        onClick={() => { onSelect(); onToggle(); }}
        className="w-full p-3 flex items-center gap-3 text-left"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300"
          style={{
            backgroundColor: `${color}20`,
            color: color,
            transform: isActive ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          {SYSTEM_ICONS[system.id]}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm truncate">{system.nameVi}</h3>
          <p className="text-[11px] text-slate-400">
            {subModels ? `${subModels.length} mô hình` : `${system.organs.length} bộ phận`}
          </p>
        </div>

        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
          />
        )}

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && subModels && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-1">
              {subModels.map((sub) => (
                <button
                  key={sub.key}
                  onClick={(e) => { e.stopPropagation(); onSelectSubModel(sub.key); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs transition-all ${
                    activeModelKey === sub.key
                      ? 'bg-white/10 text-white ring-1 ring-white/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-sm">{sub.icon}</span>
                  <span className="flex-1 truncate">{sub.label}</span>
                  {activeModelKey === sub.key && (
                    <Eye className="w-3 h-3 text-green-400" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Sketchfab 3D Viewer
function ModelViewer({ modelKey }: { modelKey: string }) {
  const model = SKETCHFAB_MODELS[modelKey] || SKETCHFAB_MODELS.full;

  const embedUrl = useMemo(() => {
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
      annotation_cycle: '5',
    });
    return `https://sketchfab.com/models/${model.uid}/embed?${params.toString()}`;
  }, [model.uid]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <iframe
        title={model.title}
        className="w-full h-full border-0"
        src={embedUrl}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
      />

      {/* Model Info Badge */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/60 backdrop-blur-xl rounded-2xl px-4 py-2 border border-white/10"
        >
          <p className="text-white font-medium text-sm">{model.title}</p>
          <p className="text-slate-400 text-[10px] flex items-center gap-1">
            <GraduationCap className="w-3 h-3" />
            {model.source}
          </p>
        </motion.div>

        {model.hasAnnotations && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-green-500/20 backdrop-blur-xl rounded-full px-3 py-1.5 border border-green-500/30 flex items-center gap-1.5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300 text-[10px] font-medium">Có chú thích</span>
          </motion.div>
        )}
      </div>

      {/* Controls Hint */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <div className="bg-black/60 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10 flex items-center gap-4 text-[11px] text-slate-300">
          <span className="flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> Kéo để xoay
          </span>
          <span className="w-px h-3 bg-slate-600" />
          <span className="flex items-center gap-1.5">
            <ZoomIn className="w-3.5 h-3.5" /> Cuộn để zoom
          </span>
          <span className="w-px h-3 bg-slate-600" />
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" /> Nhấn số để xem chú thích
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// Annotation Panel
function AnnotationPanel({
  systemKey,
  onClose
}: {
  systemKey: string;
  onClose: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPart, setExpandedPart] = useState<number | null>(null);

  const annotation = SYSTEM_ANNOTATIONS[systemKey] || SYSTEM_ANNOTATIONS.full;

  const filteredParts = useMemo(() => {
    if (!searchTerm) return annotation.parts;
    const search = searchTerm.toLowerCase();
    return annotation.parts.filter(part =>
      part.nameVi.toLowerCase().includes(search) ||
      part.nameEn.toLowerCase().includes(search)
    );
  }, [annotation.parts, searchTerm]);

  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="w-80 bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/50 flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${annotation.color}20`, color: annotation.color }}
            >
              <Languages className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">{annotation.title}</h3>
              <p className="text-[10px] text-slate-500">{annotation.titleEn}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">{annotation.description}</p>
      </div>

      {/* Fun Fact */}
      <div className="px-4 py-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-b border-slate-700/50">
        <div className="flex gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider mb-0.5">Bạn có biết?</p>
            <p className="text-xs text-amber-200/80 leading-relaxed">{annotation.funFact}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-slate-700/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Tìm kiếm (VD: Heart, Tim...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/50 text-white text-sm rounded-xl pl-9 pr-4 py-2.5 placeholder-slate-500 border border-slate-700/50 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
      </div>

      {/* Parts List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Từ điển Anh - Việt
          </h4>
          <span className="text-[10px] text-slate-600">{filteredParts.length} mục</span>
        </div>

        {filteredParts.map((part, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <button
              onClick={() => setExpandedPart(expandedPart === index ? null : index)}
              className={`w-full text-left p-3 rounded-xl transition-all ${
                expandedPart === index
                  ? 'bg-slate-700/60 ring-1 ring-white/10'
                  : 'bg-slate-800/40 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-start gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: annotation.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-blue-400 font-medium mb-0.5">
                    🇬🇧 {part.nameEn}
                  </p>
                  <h5 className="text-sm font-semibold text-white mb-0.5">
                    🇻🇳 {part.nameVi}
                  </h5>
                  <p className="text-[11px] text-slate-400">{part.description}</p>

                  <AnimatePresence>
                    {expandedPart === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="mt-2 pt-2 border-t text-[11px] leading-relaxed"
                          style={{ borderColor: `${annotation.color}30`, color: annotation.color }}
                        >
                          💡 {part.detail}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700/50 bg-slate-900/50">
        <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
          <GraduationCap className="w-3 h-3" />
          {annotation.source}
        </p>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function ExplorerPage() {
  const { setActiveSystem } = useExplorerStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSystems, setExpandedSystems] = useState<Set<string>>(new Set());
  const [activeModelKey, setActiveModelKey] = useState('full');
  const [showAnnotations, setShowAnnotations] = useState(true);

  const toggleExpand = useCallback((systemId: string) => {
    setExpandedSystems(prev => {
      const next = new Set(prev);
      if (next.has(systemId)) next.delete(systemId);
      else next.add(systemId);
      return next;
    });
  }, []);

  const selectSystem = useCallback((systemId: BodySystem) => {
    setActiveModelKey(systemId);
    setActiveSystem(systemId);
    setShowAnnotations(true);
  }, [setActiveSystem]);

  const selectSubModel = useCallback((key: string, systemId: string) => {
    setActiveModelKey(key);
    setActiveSystem(systemId as BodySystem);
    setShowAnnotations(true);
  }, [setActiveSystem]);

  const showFullBody = useCallback(() => {
    setActiveModelKey('full');
    setActiveSystem(null);
    setShowAnnotations(true);
  }, [setActiveSystem]);

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      <ExplorerHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-slate-900/50 border-r border-slate-700/50 flex flex-col overflow-hidden"
            >
              {/* Full Body Button */}
              <div className="p-3 border-b border-slate-700/50">
                <button
                  onClick={showFullBody}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                    activeModelKey === 'full'
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 ring-1 ring-blue-500/30 text-white'
                      : 'bg-slate-800/30 hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activeModelKey === 'full'
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                      : 'bg-slate-700/50'
                  }`}>
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm">Toàn Bộ Cơ Thể</p>
                    <p className="text-[10px] text-slate-400">Xem tổng quan</p>
                  </div>
                </button>
              </div>

              {/* Systems List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-1 mb-2">
                  Hệ Cơ Quan
                </p>
                {bodySystems.map((system) => (
                  <SystemCard
                    key={system.id}
                    system={system}
                    isActive={activeModelKey === system.id || activeModelKey.startsWith(system.id + '-')}
                    isExpanded={expandedSystems.has(system.id)}
                    onToggle={() => toggleExpand(system.id)}
                    onSelect={() => selectSystem(system.id)}
                    activeModelKey={activeModelKey}
                    onSelectSubModel={(key) => selectSubModel(key, system.id)}
                  />
                ))}
              </div>

              {/* Credits */}
              <div className="p-3 border-t border-slate-700/50">
                <p className="text-[9px] text-slate-500 text-center">
                  Mô hình 3D từ{' '}
                  <a href="https://sketchfab.com/anatomy_dundee" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    University of Dundee
                  </a>
                  {' '}&{' '}
                  <a href="https://sketchfab.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    Sketchfab
                  </a>
                </p>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 flex overflow-hidden">
          {/* 3D Viewer */}
          <div className="flex-1 relative">
            <ModelViewer modelKey={activeModelKey} />

            {/* Toggle Annotation Button */}
            {!showAnnotations && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-4 right-4 bg-slate-800/90 hover:bg-slate-700 text-white px-4 py-2 rounded-xl border border-slate-600/50 flex items-center gap-2 text-sm transition-colors shadow-xl"
                onClick={() => setShowAnnotations(true)}
              >
                <BookOpen className="w-4 h-4" />
                <span>Từ Điển</span>
              </motion.button>
            )}
          </div>

          {/* Annotation Panel */}
          <AnimatePresence>
            {showAnnotations && (
              <AnnotationPanel
                systemKey={activeModelKey}
                onClose={() => setShowAnnotations(false)}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
