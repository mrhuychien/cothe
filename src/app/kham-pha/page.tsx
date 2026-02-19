'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { ChevronDown, ChevronRight, Eye, Bone, Heart, Wind, Apple, Brain, Dumbbell, Lightbulb, X, Languages } from 'lucide-react';
import { Header } from '@/components/shared';
import { InfoCard } from '@/components/explorer';
import { useExplorerStore } from '@/stores/useExplorerStore';
import { bodySystems } from '@/data/systems';
import { BodySystem } from '@/types';

// Sketchfab model UIDs - prioritizing models from University of Dundee, CAHID
// Source: https://sketchfab.com/anatomy_dundee
const SKETCHFAB_MODELS: Record<string, { uid: string; title: string; hasAnnotations: boolean; source: string }> = {
  // === UNIVERSITY OF DUNDEE MODELS - NERVOUS SYSTEM ===
  nervous: {
    uid: '2e6be1399756494b9f185ce8c5900911',
    title: 'The Nervous System',
    hasAnnotations: true,
    source: 'University of Dundee, CAHID',
  },
  'nervous-cranial': {
    uid: '82d87cb89d6c48f0984a59c4f2a4cf9a',
    title: 'Cranial Nerves',
    hasAnnotations: true,
    source: 'University of Dundee, CAHID',
  },
  'nervous-spinal': {
    uid: 'd4af33ccf03b4fec8754180bcb480516',
    title: 'Spinal Cord Anatomy',
    hasAnnotations: true,
    source: 'University of Dundee, CAHID',
  },
  'nervous-limbic': {
    uid: '7981dff55a8d40259aff2f1d53649ef6',
    title: 'Limbic System',
    hasAnnotations: true,
    source: 'University of Dundee, CAHID',
  },
  // === UNIVERSITY OF DUNDEE MODELS - CIRCULATORY ===
  circulatory: {
    uid: '9f48eaa481cc4a43baeb9e1f03882cff',
    title: 'Internal Human Heart Anatomy',
    hasAnnotations: true,
    source: 'University of Dundee, CAHID',
  },
  'circulatory-external': {
    uid: '10472481071e4375b8233289c277d411',
    title: 'External Human Heart Anatomy',
    hasAnnotations: true,
    source: 'University of Dundee, CAHID',
  },
  // === UNIVERSITY OF DUNDEE MODELS - DIGESTIVE ===
  digestive: {
    uid: '3a920101c4304eacaa3a422faacfc660',
    title: 'Bowel Anatomy',
    hasAnnotations: true,
    source: 'University of Dundee, CAHID',
  },
  // === UNIVERSITY OF DUNDEE MODELS - MUSCULAR ===
  'muscular-knee': {
    uid: '765feaaebb4743dab7eeabb35c89cf10',
    title: 'Knee Anatomy: Muscles',
    hasAnnotations: true,
    source: 'University of Dundee, CAHID',
  },
  'muscular-mastication': {
    uid: 'b362acea258f4bc6af6d2e46d37d30fc',
    title: 'Muscles of Mastication',
    hasAnnotations: true,
    source: 'University of Dundee, CAHID',
  },
  'muscular-pelvic': {
    uid: 'd42a4dc074e14530ae3bfee5eba71493',
    title: '3D Pelvic Floor Muscles',
    hasAnnotations: true,
    source: 'University of Dundee, CAHID',
  },
  // === UNIVERSITY OF DUNDEE MODELS - SKELETAL ===
  'skeletal-skull': {
    uid: '3571157d910c483e8dd9eb3138952fbd',
    title: 'Adult Male Skull',
    hasAnnotations: true,
    source: 'University of Dundee, CAHID',
  },
  // === UNIVERSITY OF DUNDEE MODELS - RESPIRATORY ===
  'respiratory-larynx': {
    uid: 'a00bc73a303c46248db6a13a88b23404',
    title: 'Anatomy of the Larynx',
    hasAnnotations: true,
    source: 'University of Dundee, CAHID',
  },
  // === UNIVERSITY OF DUNDEE MODELS - LYMPHATIC ===
  lymphatic: {
    uid: '14800d739ecb46678d7584a401b0aa77',
    title: 'Lymphatic System',
    hasAnnotations: true,
    source: 'University of Dundee, CAHID',
  },
  // === UNIVERSITY OF DUNDEE MODELS - SENSORY ===
  'sensory-eye': {
    uid: 'b023a73eadcc47be83e637175f32adf2',
    title: 'Eyeball and Extra-ocular Muscles',
    hasAnnotations: true,
    source: 'University of Dundee, CAHID',
  },
  // === OTHER EDUCATIONAL MODELS ===
  full: {
    uid: 'faf0f3eaec554bcf854be2038993024f',
    title: 'Human Anatomy',
    hasAnnotations: false,
    source: 'Sketchfab Community',
  },
  skeletal: {
    uid: '911b9df7e7834175b69b4840ea15e054',
    title: 'Human Skeleton',
    hasAnnotations: true,
    source: 'Terrie Simmons-Ehrhardt',
  },
  muscular: {
    uid: '4f258907dfb6477aa9bf4dfb5833a797',
    title: 'Simplified Male Muscular System',
    hasAnnotations: true,
    source: 'Alexander',
  },
  respiratory: {
    uid: '1cd55d26c1254ab7a5d0845fb9a207fe',
    title: 'Anatomy of the Airways',
    hasAnnotations: true,
    source: 'E-learning UMCG',
  },
};

// English to Vietnamese annotation translations
// When user clicks on English annotation in Sketchfab, they can find Vietnamese here
const ANNOTATION_TRANSLATIONS: Record<string, Record<string, { vi: string; description: string }>> = {
  skeletal: {
    'Skull': { vi: 'Hộp Sọ', description: 'Bảo vệ não bộ, gồm 22 mảnh xương' },
    'Cranium': { vi: 'Hộp Sọ', description: 'Phần xương bao quanh não' },
    'Mandible': { vi: 'Xương Hàm Dưới', description: 'Xương di động duy nhất của đầu' },
    'Clavicle': { vi: 'Xương Đòn', description: 'Nối xương ức với xương bả vai' },
    'Scapula': { vi: 'Xương Bả Vai', description: 'Xương dẹt hình tam giác ở lưng' },
    'Sternum': { vi: 'Xương Ức', description: 'Xương dẹt ở giữa ngực' },
    'Ribs': { vi: 'Xương Sườn', description: '12 cặp xương bảo vệ tim và phổi' },
    'Vertebrae': { vi: 'Đốt Sống', description: '33 đốt sống tạo thành cột sống' },
    'Spine': { vi: 'Cột Sống', description: 'Trục chính của bộ xương' },
    'Cervical': { vi: 'Đốt Sống Cổ', description: '7 đốt sống vùng cổ' },
    'Thoracic': { vi: 'Đốt Sống Ngực', description: '12 đốt sống vùng ngực' },
    'Lumbar': { vi: 'Đốt Sống Thắt Lưng', description: '5 đốt sống vùng lưng dưới' },
    'Sacrum': { vi: 'Xương Cùng', description: '5 đốt sống hợp nhất' },
    'Pelvis': { vi: 'Xương Chậu', description: 'Nâng đỡ nội tạng và nối với chân' },
    'Humerus': { vi: 'Xương Cánh Tay', description: 'Xương dài từ vai đến khuỷu' },
    'Radius': { vi: 'Xương Quay', description: 'Xương cẳng tay phía ngón cái' },
    'Ulna': { vi: 'Xương Trụ', description: 'Xương cẳng tay phía ngón út' },
    'Femur': { vi: 'Xương Đùi', description: 'Xương dài và chắc nhất cơ thể' },
    'Patella': { vi: 'Xương Bánh Chè', description: 'Xương bảo vệ khớp gối' },
    'Tibia': { vi: 'Xương Chày', description: 'Xương ống chân lớn' },
    'Fibula': { vi: 'Xương Mác', description: 'Xương ống chân nhỏ' },
  },
  muscular: {
    'Trapezius': { vi: 'Cơ Thang', description: 'Cơ lưng trên, giúp cử động vai và cổ' },
    'Deltoid': { vi: 'Cơ Delta', description: 'Cơ vai hình tam giác' },
    'Pectoralis Major': { vi: 'Cơ Ngực Lớn', description: 'Cơ ngực chính, giúp đẩy và ôm' },
    'Biceps': { vi: 'Cơ Nhị Đầu', description: 'Cơ trước cánh tay, giúp gập khuỷu' },
    'Triceps': { vi: 'Cơ Tam Đầu', description: 'Cơ sau cánh tay, giúp duỗi khuỷu' },
    'Latissimus Dorsi': { vi: 'Cơ Lưng Rộng', description: 'Cơ lưng lớn nhất' },
    'Rectus Abdominis': { vi: 'Cơ Thẳng Bụng', description: 'Cơ bụng 6 múi' },
    'Obliques': { vi: 'Cơ Chéo Bụng', description: 'Cơ hai bên hông' },
    'Gluteus Maximus': { vi: 'Cơ Mông Lớn', description: 'Cơ lớn nhất cơ thể' },
    'Quadriceps': { vi: 'Cơ Tứ Đầu Đùi', description: 'Cơ trước đùi, giúp duỗi gối' },
    'Hamstrings': { vi: 'Cơ Gân Kheo', description: 'Cơ sau đùi, giúp gập gối' },
    'Gastrocnemius': { vi: 'Cơ Bắp Chân', description: 'Cơ sau cẳng chân' },
    'Soleus': { vi: 'Cơ Dép', description: 'Cơ sâu dưới bắp chân' },
  },
  circulatory: {
    'Heart': { vi: 'Tim', description: 'Cơ quan bơm máu đi khắp cơ thể' },
    'Left Ventricle': { vi: 'Tâm Thất Trái', description: 'Buồng tim bơm máu đi toàn thân' },
    'Right Ventricle': { vi: 'Tâm Thất Phải', description: 'Buồng tim bơm máu đến phổi' },
    'Left Atrium': { vi: 'Tâm Nhĩ Trái', description: 'Nhận máu giàu oxy từ phổi' },
    'Right Atrium': { vi: 'Tâm Nhĩ Phải', description: 'Nhận máu nghèo oxy từ cơ thể' },
    'Aorta': { vi: 'Động Mạch Chủ', description: 'Động mạch lớn nhất cơ thể' },
    'Pulmonary Artery': { vi: 'Động Mạch Phổi', description: 'Đưa máu từ tim đến phổi' },
    'Pulmonary Vein': { vi: 'Tĩnh Mạch Phổi', description: 'Đưa máu giàu oxy từ phổi về tim' },
    'Vena Cava': { vi: 'Tĩnh Mạch Chủ', description: 'Tĩnh mạch lớn nhất đưa máu về tim' },
    'Superior Vena Cava': { vi: 'Tĩnh Mạch Chủ Trên', description: 'Nhận máu từ phần trên cơ thể' },
    'Inferior Vena Cava': { vi: 'Tĩnh Mạch Chủ Dưới', description: 'Nhận máu từ phần dưới cơ thể' },
    'Coronary Arteries': { vi: 'Động Mạch Vành', description: 'Nuôi dưỡng cơ tim' },
    'Mitral Valve': { vi: 'Van Hai Lá', description: 'Van giữa tâm nhĩ và tâm thất trái' },
    'Tricuspid Valve': { vi: 'Van Ba Lá', description: 'Van giữa tâm nhĩ và tâm thất phải' },
    'Aortic Valve': { vi: 'Van Động Mạch Chủ', description: 'Van giữa tâm thất trái và động mạch chủ' },
    'Pulmonary Valve': { vi: 'Van Động Mạch Phổi', description: 'Van giữa tâm thất phải và động mạch phổi' },
  },
  respiratory: {
    'Trachea': { vi: 'Khí Quản', description: 'Ống dẫn khí từ họng đến phổi' },
    'Bronchi': { vi: 'Phế Quản', description: 'Nhánh của khí quản vào phổi' },
    'Bronchus': { vi: 'Phế Quản', description: 'Nhánh khí quản chính' },
    'Left Bronchus': { vi: 'Phế Quản Trái', description: 'Nhánh vào phổi trái' },
    'Right Bronchus': { vi: 'Phế Quản Phải', description: 'Nhánh vào phổi phải' },
    'Bronchioles': { vi: 'Tiểu Phế Quản', description: 'Nhánh nhỏ của phế quản' },
    'Lungs': { vi: 'Phổi', description: 'Cơ quan trao đổi khí' },
    'Left Lung': { vi: 'Phổi Trái', description: 'Có 2 thùy, nhỏ hơn phổi phải' },
    'Right Lung': { vi: 'Phổi Phải', description: 'Có 3 thùy, lớn hơn phổi trái' },
    'Alveoli': { vi: 'Phế Nang', description: 'Túi khí nhỏ trao đổi O2 và CO2' },
    'Diaphragm': { vi: 'Cơ Hoành', description: 'Cơ chính cho việc hô hấp' },
    'Pleura': { vi: 'Màng Phổi', description: 'Màng bao quanh phổi' },
    'Larynx': { vi: 'Thanh Quản', description: 'Hộp thoại, chứa dây thanh âm' },
    'Epiglottis': { vi: 'Nắp Thanh Quản', description: 'Đậy khí quản khi nuốt' },
    'Carina': { vi: 'Mào Khí Quản', description: 'Điểm phân chia khí quản thành 2 phế quản' },
  },
  digestive: {
    'Mouth': { vi: 'Miệng', description: 'Nơi bắt đầu tiêu hóa' },
    'Oral Cavity': { vi: 'Khoang Miệng', description: 'Chứa răng và lưỡi' },
    'Esophagus': { vi: 'Thực Quản', description: 'Ống nối họng với dạ dày' },
    'Stomach': { vi: 'Dạ Dày', description: 'Túi chứa và nghiền thức ăn' },
    'Liver': { vi: 'Gan', description: 'Cơ quan lớn nhất, lọc độc tố' },
    'Gallbladder': { vi: 'Túi Mật', description: 'Chứa mật do gan tiết ra' },
    'Pancreas': { vi: 'Tuyến Tụy', description: 'Tiết enzyme và insulin' },
    'Small Intestine': { vi: 'Ruột Non', description: 'Hấp thu 90% chất dinh dưỡng' },
    'Duodenum': { vi: 'Tá Tràng', description: 'Phần đầu ruột non' },
    'Jejunum': { vi: 'Hỗng Tràng', description: 'Phần giữa ruột non' },
    'Ileum': { vi: 'Hồi Tràng', description: 'Phần cuối ruột non' },
    'Large Intestine': { vi: 'Ruột Già', description: 'Hấp thu nước và tạo phân' },
    'Colon': { vi: 'Đại Tràng', description: 'Phần chính của ruột già' },
    'Ascending Colon': { vi: 'Đại Tràng Lên', description: 'Phần bên phải bụng' },
    'Transverse Colon': { vi: 'Đại Tràng Ngang', description: 'Phần ngang bụng trên' },
    'Descending Colon': { vi: 'Đại Tràng Xuống', description: 'Phần bên trái bụng' },
    'Sigmoid Colon': { vi: 'Đại Tràng Sigma', description: 'Phần hình chữ S' },
    'Rectum': { vi: 'Trực Tràng', description: 'Phần cuối ruột già' },
    'Appendix': { vi: 'Ruột Thừa', description: 'Phần nhỏ ở đầu ruột già' },
    'Spleen': { vi: 'Lá Lách', description: 'Lọc máu và miễn dịch' },
  },
  nervous: {
    'Brain': { vi: 'Não', description: 'Trung tâm điều khiển cơ thể' },
    'Cerebrum': { vi: 'Đại Não', description: 'Phần lớn nhất, điều khiển suy nghĩ' },
    'Cerebral Cortex': { vi: 'Vỏ Não', description: 'Lớp ngoài của đại não' },
    'Frontal Lobe': { vi: 'Thùy Trán', description: 'Điều khiển tính cách, quyết định' },
    'Parietal Lobe': { vi: 'Thùy Đỉnh', description: 'Xử lý xúc giác và không gian' },
    'Temporal Lobe': { vi: 'Thùy Thái Dương', description: 'Xử lý âm thanh và ký ức' },
    'Occipital Lobe': { vi: 'Thùy Chẩm', description: 'Xử lý hình ảnh từ mắt' },
    'Cerebellum': { vi: 'Tiểu Não', description: 'Điều khiển thăng bằng và phối hợp' },
    'Brain Stem': { vi: 'Thân Não', description: 'Điều khiển chức năng sống cơ bản' },
    'Brainstem': { vi: 'Thân Não', description: 'Nối não với tủy sống' },
    'Medulla Oblongata': { vi: 'Hành Não', description: 'Điều khiển nhịp tim, thở' },
    'Pons': { vi: 'Cầu Não', description: 'Kết nối các phần của não' },
    'Midbrain': { vi: 'Não Giữa', description: 'Xử lý thị giác và thính giác' },
    'Spinal Cord': { vi: 'Tủy Sống', description: 'Truyền tín hiệu giữa não và cơ thể' },
    'Vertebral Column': { vi: 'Cột Sống', description: 'Bảo vệ tủy sống' },
    'Spinal Nerves': { vi: 'Dây Thần Kinh Tủy', description: '31 cặp dây thần kinh' },
    'Cervical Nerves': { vi: 'Dây Thần Kinh Cổ', description: '8 cặp dây thần kinh vùng cổ' },
    'Thoracic Nerves': { vi: 'Dây Thần Kinh Ngực', description: '12 cặp dây thần kinh vùng ngực' },
    'Lumbar Nerves': { vi: 'Dây Thần Kinh Thắt Lưng', description: '5 cặp dây thần kinh vùng lưng' },
    'Sacral Nerves': { vi: 'Dây Thần Kinh Cùng', description: '5 cặp dây thần kinh vùng cùng' },
    'Corpus Callosum': { vi: 'Thể Chai', description: 'Kết nối 2 bán cầu não' },
    'Thalamus': { vi: 'Đồi Thị', description: 'Trạm trung chuyển tín hiệu' },
    'Hypothalamus': { vi: 'Vùng Dưới Đồi', description: 'Điều hòa nội tiết và nhiệt độ' },
  },
};

// Detailed Vietnamese annotations for each system
const SYSTEM_ANNOTATIONS: Record<string, {
  title: string;
  description: string;
  funFact: string;
  source: string;
  parts: Array<{
    nameEn: string;
    nameVi: string;
    description: string;
    detail: string;
  }>;
}> = {
  full: {
    title: 'Cơ Thể Người',
    description: 'Cơ thể người là một hệ thống phức tạp gồm nhiều cơ quan phối hợp hoạt động. Mỗi hệ cơ quan đảm nhận một chức năng riêng biệt để duy trì sự sống.',
    funFact: 'Cơ thể người có khoảng 37.2 nghìn tỷ tế bào!',
    source: 'mohamedhussien - Sketchfab',
    parts: [
      { nameEn: 'Skeletal System', nameVi: 'Hệ Xương', description: '206 xương tạo khung đỡ cơ thể', detail: 'Bảo vệ các cơ quan và tạo hình dáng' },
      { nameEn: 'Muscular System', nameVi: 'Hệ Cơ', description: 'Hơn 600 cơ giúp cử động', detail: 'Chiếm khoảng 40% trọng lượng cơ thể' },
      { nameEn: 'Circulatory System', nameVi: 'Hệ Tuần Hoàn', description: 'Tim và mạch máu vận chuyển dinh dưỡng', detail: 'Tim đập 100,000 lần mỗi ngày' },
      { nameEn: 'Respiratory System', nameVi: 'Hệ Hô Hấp', description: 'Phổi trao đổi oxy và CO2', detail: 'Thở khoảng 20,000 lần/ngày' },
      { nameEn: 'Digestive System', nameVi: 'Hệ Tiêu Hóa', description: 'Phân giải thức ăn thành năng lượng', detail: 'Ruột non dài khoảng 6-7 mét' },
      { nameEn: 'Nervous System', nameVi: 'Hệ Thần Kinh', description: 'Não và dây thần kinh điều khiển cơ thể', detail: 'Não có 86 tỷ tế bào thần kinh' },
    ],
  },
  skeletal: {
    title: 'Hệ Xương',
    description: 'Hệ xương gồm 206 chiếc xương, tạo thành bộ khung nâng đỡ toàn bộ cơ thể. Xương còn bảo vệ các cơ quan quan trọng như não, tim và phổi.',
    funFact: 'Xương đùi là xương dài và chắc nhất trong cơ thể, có thể chịu lực gấp 30 lần trọng lượng cơ thể!',
    source: 'Human Skeleton - Sketchfab',
    parts: [
      { nameEn: 'Skull / Cranium', nameVi: 'Hộp Sọ', description: 'Bảo vệ não bộ', detail: 'Gồm 22 mảnh xương ghép lại với nhau' },
      { nameEn: 'Mandible', nameVi: 'Xương Hàm Dưới', description: 'Xương di động duy nhất của đầu', detail: 'Giúp nhai và nói chuyện' },
      { nameEn: 'Vertebrae / Spine', nameVi: 'Cột Sống', description: '33 đốt sống xếp chồng', detail: 'Bảo vệ tủy sống và giữ thăng bằng' },
      { nameEn: 'Ribs', nameVi: 'Xương Sườn', description: '12 cặp xương sườn', detail: 'Bảo vệ tim và phổi' },
      { nameEn: 'Sternum', nameVi: 'Xương Ức', description: 'Xương dẹt giữa ngực', detail: 'Nơi gắn kết xương sườn phía trước' },
      { nameEn: 'Clavicle', nameVi: 'Xương Đòn', description: 'Nối vai với thân', detail: 'Xương thường gãy nhất khi ngã' },
      { nameEn: 'Scapula', nameVi: 'Xương Bả Vai', description: 'Xương dẹt hình tam giác', detail: 'Tạo khớp vai với xương cánh tay' },
      { nameEn: 'Humerus', nameVi: 'Xương Cánh Tay', description: 'Xương dài từ vai đến khuỷu', detail: 'Nối với xương quay và xương trụ' },
      { nameEn: 'Pelvis', nameVi: 'Xương Chậu', description: 'Nối cột sống với chân', detail: 'Chịu toàn bộ trọng lượng phần trên' },
      { nameEn: 'Femur', nameVi: 'Xương Đùi', description: 'Xương dài nhất cơ thể', detail: 'Chiếm khoảng 1/4 chiều cao cơ thể' },
      { nameEn: 'Patella', nameVi: 'Xương Bánh Chè', description: 'Bảo vệ khớp gối', detail: 'Xương hình tam giác phía trước gối' },
      { nameEn: 'Tibia', nameVi: 'Xương Chày', description: 'Xương ống chân lớn', detail: 'Chịu phần lớn trọng lượng cơ thể' },
    ],
  },
  muscular: {
    title: 'Hệ Cơ',
    description: 'Cơ thể có hơn 600 cơ, giúp chúng ta cử động, giữ tư thế và tạo ra nhiệt. Cơ chiếm khoảng 40% trọng lượng cơ thể.',
    funFact: 'Cơ mặt có hơn 40 cơ nhỏ, giúp chúng ta biểu lộ hàng nghìn biểu cảm khác nhau!',
    source: 'Alexander - Simplified Male Muscular System',
    parts: [
      { nameEn: 'Trapezius', nameVi: 'Cơ Thang', description: 'Cơ lưng trên hình thang', detail: 'Giúp cử động vai và nghiêng cổ' },
      { nameEn: 'Deltoid', nameVi: 'Cơ Delta', description: 'Cơ vai hình tam giác', detail: 'Giúp nâng cánh tay lên cao' },
      { nameEn: 'Pectoralis Major', nameVi: 'Cơ Ngực Lớn', description: 'Cơ ngực chính', detail: 'Giúp đẩy, ôm và xoay cánh tay' },
      { nameEn: 'Biceps', nameVi: 'Cơ Nhị Đầu', description: 'Cơ trước cánh tay', detail: 'Giúp gập khuỷu tay (cơ bắp tay)' },
      { nameEn: 'Triceps', nameVi: 'Cơ Tam Đầu', description: 'Cơ sau cánh tay', detail: 'Giúp duỗi thẳng khuỷu tay' },
      { nameEn: 'Latissimus Dorsi', nameVi: 'Cơ Lưng Rộng', description: 'Cơ lưng lớn nhất', detail: 'Giúp kéo và bơi lội' },
      { nameEn: 'Rectus Abdominis', nameVi: 'Cơ Thẳng Bụng', description: '6 múi cơ bụng', detail: 'Bảo vệ nội tạng và gập thân' },
      { nameEn: 'Gluteus Maximus', nameVi: 'Cơ Mông Lớn', description: 'Cơ lớn nhất cơ thể', detail: 'Giúp đứng lên, chạy và leo cầu thang' },
      { nameEn: 'Quadriceps', nameVi: 'Cơ Tứ Đầu Đùi', description: 'Cơ trước đùi', detail: 'Giúp đi, chạy, đá và duỗi gối' },
      { nameEn: 'Hamstrings', nameVi: 'Cơ Gân Kheo', description: 'Cơ sau đùi', detail: 'Giúp gập gối và duỗi hông' },
      { nameEn: 'Gastrocnemius', nameVi: 'Cơ Bắp Chân', description: 'Cơ sau cẳng chân', detail: 'Giúp đứng nhón chân và nhảy' },
    ],
  },
  circulatory: {
    title: 'Hệ Tuần Hoàn',
    description: 'Hệ tuần hoàn gồm tim, máu và mạch máu. Tim bơm máu đi khắp cơ thể, mang oxy và chất dinh dưỡng đến các tế bào.',
    funFact: 'Nếu nối tất cả mạch máu trong cơ thể lại, chúng sẽ dài khoảng 100,000 km - đủ để quấn quanh Trái Đất 2.5 vòng!',
    source: 'University of Dundee, CAHID',
    parts: [
      { nameEn: 'Heart', nameVi: 'Tim', description: 'Cơ quan bơm máu', detail: 'Đập khoảng 100,000 lần mỗi ngày' },
      { nameEn: 'Left Ventricle', nameVi: 'Tâm Thất Trái', description: 'Buồng tim mạnh nhất', detail: 'Bơm máu giàu oxy đi khắp cơ thể' },
      { nameEn: 'Right Ventricle', nameVi: 'Tâm Thất Phải', description: 'Buồng tim dưới phải', detail: 'Bơm máu nghèo oxy đến phổi' },
      { nameEn: 'Left Atrium', nameVi: 'Tâm Nhĩ Trái', description: 'Buồng tim trên trái', detail: 'Nhận máu giàu oxy từ phổi' },
      { nameEn: 'Right Atrium', nameVi: 'Tâm Nhĩ Phải', description: 'Buồng tim trên phải', detail: 'Nhận máu nghèo oxy từ cơ thể' },
      { nameEn: 'Aorta', nameVi: 'Động Mạch Chủ', description: 'Động mạch lớn nhất', detail: 'Đưa máu giàu oxy từ tim đi khắp cơ thể' },
      { nameEn: 'Pulmonary Artery', nameVi: 'Động Mạch Phổi', description: 'Mạch máu đến phổi', detail: 'Đưa máu nghèo oxy đến phổi để lấy oxy' },
      { nameEn: 'Coronary Arteries', nameVi: 'Động Mạch Vành', description: 'Nuôi dưỡng cơ tim', detail: 'Tắc động mạch vành gây nhồi máu cơ tim' },
      { nameEn: 'Vena Cava', nameVi: 'Tĩnh Mạch Chủ', description: 'Tĩnh mạch lớn nhất', detail: 'Đưa máu nghèo oxy về tim' },
      { nameEn: 'Mitral Valve', nameVi: 'Van Hai Lá', description: 'Van giữa nhĩ-thất trái', detail: 'Ngăn máu chảy ngược' },
    ],
  },
  respiratory: {
    title: 'Hệ Hô Hấp',
    description: 'Hệ hô hấp giúp cơ thể lấy oxy từ không khí và thải khí CO2. Phổi là cơ quan chính của hệ này.',
    funFact: 'Phổi trái nhỏ hơn phổi phải để nhường chỗ cho tim. Tổng diện tích bề mặt phổi bằng một sân tennis!',
    source: 'E-learning UMCG - Anatomy of the Airways',
    parts: [
      { nameEn: 'Trachea', nameVi: 'Khí Quản', description: 'Ống dẫn khí chính', detail: 'Dài khoảng 10-12 cm' },
      { nameEn: 'Carina', nameVi: 'Mào Khí Quản', description: 'Điểm phân chia', detail: 'Nơi khí quản chia thành 2 phế quản' },
      { nameEn: 'Left Bronchus', nameVi: 'Phế Quản Trái', description: 'Nhánh vào phổi trái', detail: 'Dài và nghiêng hơn phế quản phải' },
      { nameEn: 'Right Bronchus', nameVi: 'Phế Quản Phải', description: 'Nhánh vào phổi phải', detail: 'Ngắn và thẳng hơn, dễ hít dị vật' },
      { nameEn: 'Bronchioles', nameVi: 'Tiểu Phế Quản', description: 'Nhánh nhỏ của phế quản', detail: 'Chia nhỏ dần đến phế nang' },
      { nameEn: 'Right Lung', nameVi: 'Phổi Phải', description: 'Phổi bên phải', detail: 'Có 3 thùy, lớn hơn phổi trái' },
      { nameEn: 'Left Lung', nameVi: 'Phổi Trái', description: 'Phổi bên trái', detail: 'Có 2 thùy, nhỏ hơn để nhường chỗ cho tim' },
      { nameEn: 'Alveoli', nameVi: 'Phế Nang', description: 'Túi khí siêu nhỏ', detail: 'Khoảng 300 triệu phế nang ở mỗi người' },
      { nameEn: 'Diaphragm', nameVi: 'Cơ Hoành', description: 'Cơ hô hấp chính', detail: 'Co giãn để hít vào và thở ra' },
    ],
  },
  digestive: {
    title: 'Giải Phẫu Ruột',
    description: 'Mô hình chi tiết ống tiêu hóa từ dạ dày đến trực tràng. Giúp hiểu quá trình tiêu hóa và các giai đoạn của ung thư ruột.',
    funFact: 'Ruột non có lông nhung (villi) - hàng triệu cấu trúc nhỏ xíu giúp tăng diện tích hấp thu lên gấp 600 lần!',
    source: 'University of Dundee, CAHID - Imi Ridley',
    parts: [
      { nameEn: 'Stomach', nameVi: 'Dạ Dày', description: 'Túi chứa và nghiền thức ăn', detail: 'Dung tích khoảng 1 lít khi trống' },
      { nameEn: 'Pylorus', nameVi: 'Môn Vị', description: 'Cửa ra của dạ dày', detail: 'Cơ vòng kiểm soát thức ăn vào ruột non' },
      { nameEn: 'Duodenum', nameVi: 'Tá Tràng', description: 'Phần đầu ruột non', detail: 'Dài khoảng 25cm, nhận mật và dịch tụy' },
      { nameEn: 'Pancreas', nameVi: 'Tuyến Tụy', description: 'Tiết enzyme tiêu hóa', detail: 'Nằm sau dạ dày' },
      { nameEn: 'Small Intestine', nameVi: 'Ruột Non', description: 'Nơi hấp thu chính', detail: 'Hấp thu 90% chất dinh dưỡng' },
      { nameEn: 'Cecum', nameVi: 'Manh Tràng', description: 'Phần đầu ruột già', detail: 'Nơi ruột thừa gắn vào' },
      { nameEn: 'Ascending Colon', nameVi: 'Đại Tràng Lên', description: 'Phần bên phải', detail: 'Đi từ dưới lên' },
      { nameEn: 'Transverse Colon', nameVi: 'Đại Tràng Ngang', description: 'Phần ngang bụng', detail: 'Nối đại tràng lên và xuống' },
      { nameEn: 'Descending Colon', nameVi: 'Đại Tràng Xuống', description: 'Phần bên trái', detail: 'Đi từ trên xuống' },
      { nameEn: 'Sigmoid Colon', nameVi: 'Đại Tràng Sigma', description: 'Phần hình chữ S', detail: 'Nối đại tràng xuống với trực tràng' },
      { nameEn: 'Rectum', nameVi: 'Trực Tràng', description: 'Phần cuối ruột già', detail: 'Chứa phân trước khi thải' },
    ],
  },
  nervous: {
    title: 'Hệ Thần Kinh',
    description: 'Hệ thần kinh là "trung tâm điều khiển" của cơ thể, gồm não, tủy sống và các dây thần kinh. Nó điều khiển mọi hoạt động từ suy nghĩ đến nhịp tim.',
    funFact: 'Não người có khoảng 86 tỷ tế bào thần kinh (neuron), và mỗi neuron có thể kết nối với 10,000 neuron khác!',
    source: 'University of Dundee, CAHID - Abigail de Rancourt',
    parts: [
      { nameEn: 'Brain / Cerebrum', nameVi: 'Đại Não', description: 'Phần lớn nhất của não', detail: 'Chịu trách nhiệm suy nghĩ, học tập, cảm xúc' },
      { nameEn: 'Frontal Lobe', nameVi: 'Thùy Trán', description: 'Phần trước đại não', detail: 'Điều khiển tính cách, quyết định, ngôn ngữ' },
      { nameEn: 'Parietal Lobe', nameVi: 'Thùy Đỉnh', description: 'Phần trên đại não', detail: 'Xử lý xúc giác và không gian' },
      { nameEn: 'Temporal Lobe', nameVi: 'Thùy Thái Dương', description: 'Phần bên đại não', detail: 'Xử lý âm thanh và ký ức' },
      { nameEn: 'Occipital Lobe', nameVi: 'Thùy Chẩm', description: 'Phần sau đại não', detail: 'Xử lý hình ảnh từ mắt' },
      { nameEn: 'Cerebellum', nameVi: 'Tiểu Não', description: 'Phần sau não', detail: 'Điều khiển thăng bằng và phối hợp cử động' },
      { nameEn: 'Brain Stem / Brainstem', nameVi: 'Thân Não', description: 'Nối não với tủy sống', detail: 'Điều khiển nhịp thở, tim đập' },
      { nameEn: 'Spinal Cord', nameVi: 'Tủy Sống', description: 'Dây thần kinh trong cột sống', detail: 'Truyền tín hiệu giữa não và cơ thể' },
      { nameEn: 'Spinal Nerves', nameVi: 'Dây Thần Kinh Tủy', description: '31 cặp dây thần kinh', detail: 'Truyền tín hiệu với tốc độ 120 m/s' },
      { nameEn: 'Vertebral Column', nameVi: 'Cột Sống', description: 'Bảo vệ tủy sống', detail: '33 đốt sống tạo thành ống bảo vệ' },
    ],
  },
  // === UNIVERSITY OF DUNDEE SUB-MODELS ===
  'nervous-cranial': {
    title: 'Dây Thần Kinh Sọ',
    description: '12 cặp dây thần kinh sọ xuất phát trực tiếp từ não, điều khiển các chức năng quan trọng của đầu và mặt.',
    funFact: 'Dây thần kinh khứu giác (I) là dây duy nhất kết nối trực tiếp với vỏ não mà không qua đồi thị!',
    source: 'University of Dundee, CAHID',
    parts: [
      { nameEn: 'Olfactory Nerve (I)', nameVi: 'Thần Kinh Khứu Giác', description: 'Dây thần kinh số 1', detail: 'Giúp ngửi mùi' },
      { nameEn: 'Optic Nerve (II)', nameVi: 'Thần Kinh Thị Giác', description: 'Dây thần kinh số 2', detail: 'Truyền tín hiệu hình ảnh từ mắt đến não' },
      { nameEn: 'Oculomotor Nerve (III)', nameVi: 'Thần Kinh Vận Nhãn', description: 'Dây thần kinh số 3', detail: 'Điều khiển cử động mắt và mở mí' },
      { nameEn: 'Trochlear Nerve (IV)', nameVi: 'Thần Kinh Ròng Rọc', description: 'Dây thần kinh số 4', detail: 'Điều khiển cơ chéo trên của mắt' },
      { nameEn: 'Trigeminal Nerve (V)', nameVi: 'Thần Kinh Tam Thoa', description: 'Dây thần kinh số 5', detail: 'Cảm giác mặt và điều khiển nhai' },
      { nameEn: 'Abducens Nerve (VI)', nameVi: 'Thần Kinh Giạng', description: 'Dây thần kinh số 6', detail: 'Điều khiển cử động mắt sang bên' },
      { nameEn: 'Facial Nerve (VII)', nameVi: 'Thần Kinh Mặt', description: 'Dây thần kinh số 7', detail: 'Biểu cảm mặt và vị giác' },
      { nameEn: 'Vestibulocochlear Nerve (VIII)', nameVi: 'Thần Kinh Tiền Đình Ốc Tai', description: 'Dây thần kinh số 8', detail: 'Nghe và thăng bằng' },
      { nameEn: 'Glossopharyngeal Nerve (IX)', nameVi: 'Thần Kinh Thiệt Hầu', description: 'Dây thần kinh số 9', detail: 'Nuốt và vị giác' },
      { nameEn: 'Vagus Nerve (X)', nameVi: 'Thần Kinh Phế Vị', description: 'Dây thần kinh số 10', detail: 'Dây dài nhất, điều khiển tim, phổi, tiêu hóa' },
      { nameEn: 'Accessory Nerve (XI)', nameVi: 'Thần Kinh Phụ', description: 'Dây thần kinh số 11', detail: 'Điều khiển cơ ức đòn chũm và cơ thang' },
      { nameEn: 'Hypoglossal Nerve (XII)', nameVi: 'Thần Kinh Hạ Thiệt', description: 'Dây thần kinh số 12', detail: 'Điều khiển cử động lưỡi' },
    ],
  },
  'nervous-spinal': {
    title: 'Giải Phẫu Tủy Sống',
    description: 'Tủy sống là cầu nối giữa não và cơ thể, truyền tín hiệu vận động và cảm giác. Mô hình này cho thấy cấu trúc chi tiết của tủy sống.',
    funFact: 'Tủy sống dài khoảng 45cm và nặng chỉ 35 gram, nhưng chứa hàng triệu tế bào thần kinh!',
    source: 'University of Dundee, CAHID - Abigail de Rancourt',
    parts: [
      { nameEn: 'Spinal Cord', nameVi: 'Tủy Sống', description: 'Dây thần kinh trung ương', detail: 'Nằm trong ống sống, bảo vệ bởi đốt sống' },
      { nameEn: 'Ventral Root', nameVi: 'Rễ Bụng', description: 'Rễ phía trước', detail: 'Mang tín hiệu vận động từ não đến cơ' },
      { nameEn: 'Dorsal Root', nameVi: 'Rễ Lưng', description: 'Rễ phía sau', detail: 'Mang tín hiệu cảm giác từ cơ thể đến não' },
      { nameEn: 'Dorsal Root Ganglion', nameVi: 'Hạch Rễ Lưng', description: 'Cụm tế bào thần kinh', detail: 'Chứa thân tế bào thần kinh cảm giác' },
      { nameEn: 'Spinal Nerve', nameVi: 'Dây Thần Kinh Tủy', description: 'Dây thần kinh hỗn hợp', detail: 'Gồm cả sợi vận động và cảm giác' },
      { nameEn: 'Gray Matter', nameVi: 'Chất Xám', description: 'Phần giữa tủy sống', detail: 'Chứa thân tế bào thần kinh' },
      { nameEn: 'White Matter', nameVi: 'Chất Trắng', description: 'Phần ngoài tủy sống', detail: 'Chứa các bó sợi thần kinh có myelin' },
    ],
  },
  'circulatory-external': {
    title: 'Giải Phẫu Tim Ngoài',
    description: 'Mô hình chi tiết bề ngoài của tim, cho thấy các tâm thất, tâm nhĩ, mạch máu lớn và động mạch vành nuôi tim.',
    funFact: 'Động mạch vành được đặt tên vì chúng bao quanh tim như một vương miện (corona)!',
    source: 'University of Dundee, CAHID - Alexandra Wilkins',
    parts: [
      { nameEn: 'Left Ventricle', nameVi: 'Tâm Thất Trái', description: 'Buồng tim dưới trái', detail: 'Thành dày nhất vì bơm máu đi xa nhất' },
      { nameEn: 'Right Ventricle', nameVi: 'Tâm Thất Phải', description: 'Buồng tim dưới phải', detail: 'Bơm máu đến phổi gần đó' },
      { nameEn: 'Left Atrium', nameVi: 'Tâm Nhĩ Trái', description: 'Buồng tim trên trái', detail: 'Nhận máu giàu oxy từ 4 tĩnh mạch phổi' },
      { nameEn: 'Right Atrium', nameVi: 'Tâm Nhĩ Phải', description: 'Buồng tim trên phải', detail: 'Nhận máu từ tĩnh mạch chủ trên và dưới' },
      { nameEn: 'Aorta', nameVi: 'Động Mạch Chủ', description: 'Động mạch lớn nhất cơ thể', detail: 'Đường kính khoảng 2.5cm' },
      { nameEn: 'Pulmonary Trunk', nameVi: 'Thân Động Mạch Phổi', description: 'Mạch đến phổi', detail: 'Chia thành động mạch phổi trái và phải' },
      { nameEn: 'Superior Vena Cava', nameVi: 'Tĩnh Mạch Chủ Trên', description: 'Tĩnh mạch từ nửa trên', detail: 'Đưa máu từ đầu, tay về tim' },
      { nameEn: 'Inferior Vena Cava', nameVi: 'Tĩnh Mạch Chủ Dưới', description: 'Tĩnh mạch từ nửa dưới', detail: 'Tĩnh mạch lớn nhất cơ thể' },
      { nameEn: 'Coronary Arteries', nameVi: 'Động Mạch Vành', description: 'Nuôi cơ tim', detail: 'Tim cần oxy liên tục để bơm máu' },
      { nameEn: 'Cardiac Veins', nameVi: 'Tĩnh Mạch Tim', description: 'Dẫn máu từ cơ tim', detail: 'Đổ vào xoang vành rồi về tâm nhĩ phải' },
    ],
  },
  'muscular-knee': {
    title: 'Cơ Vùng Gối',
    description: 'Giải phẫu chi tiết các cơ quanh khớp gối, giúp hiểu cách đầu gối vận động và các chấn thương thường gặp.',
    funFact: 'Khớp gối là khớp lớn nhất và phức tạp nhất trong cơ thể, chịu lực gấp 6 lần trọng lượng khi chạy!',
    source: 'University of Dundee, CAHID - Renske Hoste',
    parts: [
      { nameEn: 'Quadriceps Femoris', nameVi: 'Cơ Tứ Đầu Đùi', description: 'Nhóm 4 cơ trước đùi', detail: 'Duỗi thẳng đầu gối' },
      { nameEn: 'Rectus Femoris', nameVi: 'Cơ Thẳng Đùi', description: 'Cơ giữa tứ đầu', detail: 'Cơ duy nhất qua cả hông và gối' },
      { nameEn: 'Vastus Lateralis', nameVi: 'Cơ Rộng Ngoài', description: 'Cơ ngoài tứ đầu', detail: 'Cơ lớn nhất trong tứ đầu' },
      { nameEn: 'Vastus Medialis', nameVi: 'Cơ Rộng Trong', description: 'Cơ trong tứ đầu', detail: 'Quan trọng cho ổn định xương bánh chè' },
      { nameEn: 'Vastus Intermedius', nameVi: 'Cơ Rộng Giữa', description: 'Cơ sâu nhất', detail: 'Nằm dưới cơ thẳng đùi' },
      { nameEn: 'Hamstrings', nameVi: 'Cơ Gân Kheo', description: 'Nhóm cơ sau đùi', detail: 'Gập gối và duỗi hông' },
      { nameEn: 'Biceps Femoris', nameVi: 'Cơ Nhị Đầu Đùi', description: 'Cơ ngoài gân kheo', detail: 'Có 2 đầu: dài và ngắn' },
      { nameEn: 'Gastrocnemius', nameVi: 'Cơ Bụng Chân', description: 'Cơ bắp chân', detail: 'Qua khớp gối, giúp gập gối' },
      { nameEn: 'Popliteus', nameVi: 'Cơ Khoeo', description: 'Cơ nhỏ sau gối', detail: 'Mở khóa gối khi bắt đầu gập' },
      { nameEn: 'Sartorius', nameVi: 'Cơ May', description: 'Cơ dài nhất cơ thể', detail: 'Chạy chéo từ hông đến cẳng chân' },
    ],
  },
  // === NEW DUNDEE MODELS ===
  'nervous-limbic': {
    title: 'Hệ Viền (Limbic System)',
    description: 'Hệ viền là nhóm cấu trúc não liên quan đến cảm xúc, trí nhớ và hành vi. Nó đóng vai trò quan trọng trong học tập và phản ứng stress.',
    funFact: 'Hồi hải mã (hippocampus) được đặt tên theo hình dạng giống con cá ngựa trong tiếng Hy Lạp!',
    source: 'University of Dundee, CAHID',
    parts: [
      { nameEn: 'Hippocampus', nameVi: 'Hồi Hải Mã', description: 'Trung tâm trí nhớ', detail: 'Chuyển ký ức ngắn hạn thành dài hạn' },
      { nameEn: 'Amygdala', nameVi: 'Hạch Hạnh Nhân', description: 'Trung tâm cảm xúc', detail: 'Xử lý sợ hãi và khoái cảm' },
      { nameEn: 'Thalamus', nameVi: 'Đồi Thị', description: 'Trạm trung chuyển', detail: 'Chuyển tiếp tín hiệu cảm giác' },
      { nameEn: 'Hypothalamus', nameVi: 'Vùng Dưới Đồi', description: 'Điều hòa nội tiết', detail: 'Kiểm soát đói, khát, nhiệt độ' },
      { nameEn: 'Cingulate Gyrus', nameVi: 'Hồi Đai', description: 'Xử lý cảm xúc', detail: 'Liên quan đến đau và hành vi' },
      { nameEn: 'Fornix', nameVi: 'Vòm Não', description: 'Bó sợi thần kinh', detail: 'Kết nối các phần của hệ viền' },
    ],
  },
  'skeletal-skull': {
    title: 'Hộp Sọ Nam Trưởng Thành',
    description: 'Mô hình chi tiết hộp sọ người trưởng thành dựa trên CT scan. Cho thấy cấu trúc xương sọ, hốc mắt, xoang và các chi tiết giải phẫu.',
    funFact: 'Hộp sọ của trẻ sơ sinh có 6 thóp (fontanelle) để não có thể phát triển, sau đó đóng lại khi 2 tuổi!',
    source: 'University of Dundee, CAHID',
    parts: [
      { nameEn: 'Frontal Bone', nameVi: 'Xương Trán', description: 'Xương phía trước', detail: 'Tạo thành trán và mái hốc mắt' },
      { nameEn: 'Parietal Bones', nameVi: 'Xương Đỉnh', description: '2 xương trên đỉnh', detail: 'Tạo thành phần lớn nóc sọ' },
      { nameEn: 'Temporal Bones', nameVi: 'Xương Thái Dương', description: '2 xương hai bên', detail: 'Chứa tai trong và xương con' },
      { nameEn: 'Occipital Bone', nameVi: 'Xương Chẩm', description: 'Xương phía sau', detail: 'Có lỗ chẩm cho tủy sống đi qua' },
      { nameEn: 'Sphenoid Bone', nameVi: 'Xương Bướm', description: 'Xương hình cánh bướm', detail: 'Nền sọ, chứa yên tuyến yên' },
      { nameEn: 'Maxilla', nameVi: 'Xương Hàm Trên', description: 'Xương cố định', detail: 'Chứa răng hàm trên và xoang' },
      { nameEn: 'Mandible', nameVi: 'Xương Hàm Dưới', description: 'Xương di động', detail: 'Xương mặt lớn và mạnh nhất' },
      { nameEn: 'Zygomatic Bone', nameVi: 'Xương Gò Má', description: 'Xương má', detail: 'Tạo nên gò má và hốc mắt' },
      { nameEn: 'Nasal Bones', nameVi: 'Xương Mũi', description: '2 xương nhỏ', detail: 'Tạo sống mũi' },
      { nameEn: 'Orbit', nameVi: 'Hốc Mắt', description: 'Ổ chứa mắt', detail: 'Gồm 7 xương tạo thành' },
    ],
  },
  'muscular-mastication': {
    title: 'Cơ Nhai',
    description: 'Các cơ điều khiển hàm dưới, giúp nhai thức ăn. Đây là nhóm cơ mạnh nhất so với kích thước trong cơ thể.',
    funFact: 'Cơ nhai có thể tạo lực cắn lên đến 90 kg - mạnh hơn cả lực cắn của chó!',
    source: 'University of Dundee, CAHID',
    parts: [
      { nameEn: 'Masseter', nameVi: 'Cơ Cắn', description: 'Cơ nhai chính', detail: 'Cơ mạnh nhất, nâng hàm dưới' },
      { nameEn: 'Temporalis', nameVi: 'Cơ Thái Dương', description: 'Cơ hình quạt', detail: 'Nâng và kéo hàm về sau' },
      { nameEn: 'Medial Pterygoid', nameVi: 'Cơ Chân Bướm Trong', description: 'Cơ sâu trong', detail: 'Giúp nâng và đưa hàm sang bên' },
      { nameEn: 'Lateral Pterygoid', nameVi: 'Cơ Chân Bướm Ngoài', description: 'Cơ mở hàm', detail: 'Duy nhất giúp há miệng và đẩy hàm' },
    ],
  },
  'muscular-pelvic': {
    title: 'Cơ Sàn Chậu',
    description: 'Nhóm cơ tạo thành "sàn" nâng đỡ các cơ quan vùng chậu. Quan trọng cho kiểm soát tiểu tiện và chức năng sinh sản.',
    funFact: 'Cơ sàn chậu hoạt động 24/7 để nâng đỡ cơ quan, nhưng hầu hết mọi người không biết cách tập luyện chúng!',
    source: 'University of Dundee, CAHID - Dr. Clare Lamb',
    parts: [
      { nameEn: 'Levator Ani', nameVi: 'Cơ Nâng Hậu Môn', description: 'Cơ sàn chính', detail: 'Gồm 3 phần: mu, chậu, cụt' },
      { nameEn: 'Pubococcygeus', nameVi: 'Cơ Mu-Cụt', description: 'Phần giữa', detail: 'Kiểm soát tiểu tiện' },
      { nameEn: 'Iliococcygeus', nameVi: 'Cơ Chậu-Cụt', description: 'Phần bên', detail: 'Tạo thành phần lớn sàn chậu' },
      { nameEn: 'Coccygeus', nameVi: 'Cơ Cụt', description: 'Cơ phía sau', detail: 'Nâng đỡ xương cụt' },
      { nameEn: 'External Sphincter', nameVi: 'Cơ Thắt Ngoài', description: 'Cơ vòng kiểm soát', detail: 'Kiểm soát đại tiện' },
    ],
  },
  'respiratory-larynx': {
    title: 'Thanh Quản',
    description: 'Thanh quản nằm ở cổ, chứa dây thanh âm và kiểm soát đường thở. Quan trọng cho phát âm và bảo vệ đường hô hấp.',
    funFact: 'Dây thanh âm rung khoảng 100-1000 lần/giây khi nói, và nam giới có dây thanh dài hơn nên giọng trầm hơn!',
    source: 'University of Dundee School of Medicine',
    parts: [
      { nameEn: 'Epiglottis', nameVi: 'Nắp Thanh Môn', description: 'Sụn hình lá', detail: 'Đậy thanh quản khi nuốt' },
      { nameEn: 'Thyroid Cartilage', nameVi: 'Sụn Giáp', description: 'Sụn lớn nhất', detail: 'Tạo "trái cổ Adam"' },
      { nameEn: 'Cricoid Cartilage', nameVi: 'Sụn Nhẫn', description: 'Sụn hình vòng', detail: 'Duy nhất tạo vòng hoàn chỉnh' },
      { nameEn: 'Arytenoid Cartilages', nameVi: 'Sụn Phễu', description: '2 sụn nhỏ', detail: 'Điều khiển dây thanh âm' },
      { nameEn: 'Vocal Cords', nameVi: 'Dây Thanh Âm', description: 'Tạo âm thanh', detail: 'Rung để phát ra giọng nói' },
      { nameEn: 'Glottis', nameVi: 'Thanh Môn', description: 'Khe giữa dây thanh', detail: 'Không khí đi qua đây' },
    ],
  },
  lymphatic: {
    title: 'Hệ Bạch Huyết',
    description: 'Hệ bạch huyết là mạng lưới mạch và hạch giúp loại bỏ chất thải, chống nhiễm trùng và duy trì cân bằng dịch trong cơ thể.',
    funFact: 'Hệ bạch huyết không có bơm riêng - nó dựa vào cử động cơ và thở để lưu thông dịch bạch huyết!',
    source: 'University of Dundee, CAHID',
    parts: [
      { nameEn: 'Lymph Nodes', nameVi: 'Hạch Bạch Huyết', description: 'Trạm lọc', detail: 'Khoảng 600 hạch trong cơ thể' },
      { nameEn: 'Lymph Vessels', nameVi: 'Mạch Bạch Huyết', description: 'Mạng lưới ống dẫn', detail: 'Chạy song song với tĩnh mạch' },
      { nameEn: 'Spleen', nameVi: 'Lá Lách', description: 'Cơ quan lọc máu', detail: 'Phá hủy tế bào máu cũ' },
      { nameEn: 'Thymus', nameVi: 'Tuyến Ức', description: 'Cơ quan miễn dịch', detail: 'Phát triển tế bào T' },
      { nameEn: 'Tonsils', nameVi: 'Amidan', description: 'Hạch ở họng', detail: 'Bảo vệ đường hô hấp' },
      { nameEn: 'Thoracic Duct', nameVi: 'Ống Ngực', description: 'Ống lớn nhất', detail: 'Thu gom bạch huyết từ 3/4 cơ thể' },
      { nameEn: 'Bone Marrow', nameVi: 'Tủy Xương', description: 'Nơi sinh tế bào', detail: 'Sản xuất tế bào bạch cầu' },
    ],
  },
  'sensory-eye': {
    title: 'Mắt và Cơ Vận Nhãn',
    description: 'Giải phẫu nhãn cầu và 6 cơ vận nhãn điều khiển cử động mắt. Mô hình cho thấy cấu trúc chi tiết từ giác mạc đến võng mạc.',
    funFact: 'Mắt có thể phân biệt khoảng 10 triệu màu sắc khác nhau và xử lý 36,000 bit thông tin mỗi giờ!',
    source: 'University of Dundee, CAHID - Laura-Jane Logue & Emily M. Adams',
    parts: [
      { nameEn: 'Cornea', nameVi: 'Giác Mạc', description: 'Lớp trong suốt', detail: 'Khúc xạ 2/3 ánh sáng vào mắt' },
      { nameEn: 'Iris', nameVi: 'Mống Mắt', description: 'Phần màu của mắt', detail: 'Điều chỉnh lượng ánh sáng' },
      { nameEn: 'Pupil', nameVi: 'Đồng Tử', description: 'Lỗ giữa mống', detail: 'Có thể mở rộng gấp 3 lần' },
      { nameEn: 'Lens', nameVi: 'Thủy Tinh Thể', description: 'Hội tụ ánh sáng', detail: 'Thay đổi hình dạng để lấy nét' },
      { nameEn: 'Retina', nameVi: 'Võng Mạc', description: 'Màng cảm quang', detail: '120 triệu tế bào que và nón' },
      { nameEn: 'Optic Nerve', nameVi: 'Thần Kinh Thị Giác', description: 'Truyền hình ảnh', detail: 'Hơn 1 triệu sợi thần kinh' },
      { nameEn: 'Superior Rectus', nameVi: 'Cơ Thẳng Trên', description: 'Cơ vận nhãn', detail: 'Đưa mắt nhìn lên' },
      { nameEn: 'Inferior Rectus', nameVi: 'Cơ Thẳng Dưới', description: 'Cơ vận nhãn', detail: 'Đưa mắt nhìn xuống' },
      { nameEn: 'Lateral Rectus', nameVi: 'Cơ Thẳng Ngoài', description: 'Cơ vận nhãn', detail: 'Đưa mắt nhìn ra ngoài' },
      { nameEn: 'Medial Rectus', nameVi: 'Cơ Thẳng Trong', description: 'Cơ vận nhãn', detail: 'Đưa mắt nhìn vào trong' },
    ],
  },
};

// System icon mapping
const SYSTEM_ICONS: Record<string, React.ReactNode> = {
  skeletal: <Bone className="w-4 h-4" />,
  'skeletal-skull': <Bone className="w-4 h-4" />,
  muscular: <Dumbbell className="w-4 h-4" />,
  'muscular-knee': <Dumbbell className="w-4 h-4" />,
  'muscular-mastication': <Dumbbell className="w-4 h-4" />,
  'muscular-pelvic': <Dumbbell className="w-4 h-4" />,
  circulatory: <Heart className="w-4 h-4" />,
  'circulatory-external': <Heart className="w-4 h-4" />,
  lymphatic: <Heart className="w-4 h-4" />,
  respiratory: <Wind className="w-4 h-4" />,
  'respiratory-larynx': <Wind className="w-4 h-4" />,
  digestive: <Apple className="w-4 h-4" />,
  nervous: <Brain className="w-4 h-4" />,
  'nervous-cranial': <Brain className="w-4 h-4" />,
  'nervous-spinal': <Brain className="w-4 h-4" />,
  'nervous-limbic': <Brain className="w-4 h-4" />,
  'sensory-eye': <Eye className="w-4 h-4" />,
};

// Sub-models for each system (from University of Dundee)
const DUNDEE_SUBMODELS: Record<string, Array<{ key: string; label: string }>> = {
  nervous: [
    { key: 'nervous', label: 'Hệ Thần Kinh Toàn Bộ' },
    { key: 'nervous-cranial', label: '12 Dây Thần Kinh Sọ' },
    { key: 'nervous-spinal', label: 'Tủy Sống Chi Tiết' },
    { key: 'nervous-limbic', label: 'Hệ Viền (Limbic)' },
  ],
  circulatory: [
    { key: 'circulatory', label: 'Tim - Cấu Trúc Bên Trong' },
    { key: 'circulatory-external', label: 'Tim - Cấu Trúc Bên Ngoài' },
    { key: 'lymphatic', label: 'Hệ Bạch Huyết' },
  ],
  skeletal: [
    { key: 'skeletal', label: 'Bộ Xương Toàn Thân' },
    { key: 'skeletal-skull', label: 'Hộp Sọ Chi Tiết' },
  ],
  muscular: [
    { key: 'muscular', label: 'Hệ Cơ Toàn Thân' },
    { key: 'muscular-knee', label: 'Cơ Vùng Gối' },
    { key: 'muscular-mastication', label: 'Cơ Nhai (Mặt)' },
    { key: 'muscular-pelvic', label: 'Cơ Sàn Chậu' },
  ],
  respiratory: [
    { key: 'respiratory', label: 'Đường Hô Hấp' },
    { key: 'respiratory-larynx', label: 'Thanh Quản Chi Tiết' },
  ],
};

// System item in sidebar
function SystemItem({
  system,
  isExpanded,
  onToggle,
  isSelected,
  onSelect,
  activeModelKey,
  onSelectSubModel,
}: {
  system: typeof bodySystems[0];
  isExpanded: boolean;
  onToggle: () => void;
  isSelected: boolean;
  onSelect: () => void;
  activeModelKey: string;
  onSelectSubModel: (key: string) => void;
}) {
  const { setSelectedOrgan, setActiveSystem } = useExplorerStore();
  const subModels = DUNDEE_SUBMODELS[system.id];
  const hasSubModels = subModels && subModels.length > 1;

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
            {hasSubModels ? `${subModels.length} mô hình 3D` : `${system.organs.length} bộ phận`}
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
            {/* Sub-models from Dundee (if available) */}
            {hasSubModels && (
              <div className="px-3 py-2 border-b border-slate-700/50">
                <p className="text-[10px] text-amber-400 uppercase tracking-wider mb-2 px-1">
                  🎓 University of Dundee
                </p>
                {subModels.map((sub) => (
                  <div
                    key={sub.key}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all text-sm mb-1 ${
                      activeModelKey === sub.key
                        ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                        : 'hover:bg-slate-600/50 text-slate-300 hover:text-white'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSubModel(sub.key);
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: activeModelKey === sub.key ? '#60A5FA' : system.color }}
                    />
                    {sub.label}
                    {activeModelKey === sub.key && (
                      <Eye className="w-3 h-3 ml-auto text-blue-400" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Organ list */}
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

// Annotation panel component with English-Vietnamese translation
function AnnotationPanel({
  systemKey,
  onClose
}: {
  systemKey: string;
  onClose: () => void;
}) {
  const [hoveredPart, setHoveredPart] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const annotation = SYSTEM_ANNOTATIONS[systemKey] || SYSTEM_ANNOTATIONS.full;
  const translations = ANNOTATION_TRANSLATIONS[systemKey] || {};
  const systemInfo = bodySystems.find(s => s.id === systemKey);
  const systemColor = systemInfo?.color || '#3B82F6';
  const model = SKETCHFAB_MODELS[systemKey] || SKETCHFAB_MODELS.full;

  // Filter parts based on search (both English and Vietnamese)
  const filteredParts = annotation.parts.filter(part => {
    const search = searchTerm.toLowerCase();
    return part.nameVi.toLowerCase().includes(search) ||
           part.nameEn.toLowerCase().includes(search) ||
           part.description.toLowerCase().includes(search);
  });

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
            <Languages className="w-5 h-5" style={{ color: systemColor }} />
            {annotation.title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          {annotation.description}
        </p>
        {model.hasAnnotations && (
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-2">
            <p className="text-xs text-blue-300">
              💡 <strong>Mẹo:</strong> Nhấn vào các điểm đánh số trên mô hình 3D để xem chú thích tiếng Anh, sau đó tìm bản dịch tiếng Việt bên dưới.
            </p>
          </div>
        )}
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

      {/* Search */}
      <div className="px-3 py-2 border-b border-slate-700">
        <input
          type="text"
          placeholder="Tìm kiếm (VD: Heart, Tim...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-700/50 text-white text-sm rounded-lg px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Parts List with English-Vietnamese */}
      <div className="flex-1 overflow-y-auto p-3">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1 flex items-center gap-2">
          <span>Từ điển Anh - Việt</span>
          <span className="text-slate-500">({filteredParts.length})</span>
        </h4>
        <div className="space-y-1">
          {filteredParts.map((part, index) => (
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
                    {/* English name */}
                    <p className="text-xs text-blue-400 font-medium">
                      🇬🇧 {part.nameEn}
                    </p>
                    {/* Vietnamese name */}
                    <h5 className="text-sm font-semibold text-white">
                      🇻🇳 {part.nameVi}
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

        {/* Additional translations from model annotations */}
        {Object.keys(translations).length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Thuật ngữ khác trong mô hình
            </h4>
            <div className="space-y-1">
              {Object.entries(translations)
                .filter(([en]) => !annotation.parts.some(p => p.nameEn.includes(en)))
                .slice(0, 10)
                .map(([en, { vi, description }]) => (
                  <div key={en} className="p-2 bg-slate-700/30 rounded text-xs">
                    <span className="text-blue-400">{en}</span>
                    <span className="text-slate-500 mx-1">→</span>
                    <span className="text-white font-medium">{vi}</span>
                    {description && (
                      <p className="text-slate-500 mt-0.5">{description}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700 bg-slate-800/50">
        <p className="text-[10px] text-slate-500 text-center">
          Nguồn: {annotation.source}
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
  const currentModel = SKETCHFAB_MODELS[activeModelKey];

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
                  isSelected={activeModelKey === system.id || activeModelKey.startsWith(system.id + '-')}
                  onSelect={() => selectSystem(system.id)}
                  activeModelKey={activeModelKey}
                  onSelectSubModel={(key) => {
                    setActiveModelKey(key);
                    setActiveSystem(system.id);
                    setShowAnnotations(true);
                  }}
                />
              ))}
            </div>

            {/* Credits */}
            <div className="p-3 border-t border-slate-700">
              <p className="text-[10px] text-slate-500 text-center">
                Mô hình 3D từ{' '}
                <a
                  href="https://sketchfab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Sketchfab
                </a>
                {' '}& University of Dundee
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
                {currentModel?.hasAnnotations && (
                  <p className="text-xs text-green-400 text-center mt-1">
                    ✓ Có chú thích chi tiết
                  </p>
                )}
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
                <Languages className="w-4 h-4" />
                Từ điển Anh-Việt
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
                <span>📍 Nhấn số để xem chú thích</span>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Annotations with English-Vietnamese */}
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
