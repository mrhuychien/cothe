import { QuizQuestion } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  // Easy questions
  {
    id: 'q1',
    questionVi: 'Tìm bộ phận bơm máu đi khắp cơ thể',
    questionEn: 'Find the organ that pumps blood throughout the body',
    targetOrgan: 'heart',
    system: 'circulatory',
    difficulty: 'easy',
    hintVi: 'Nằm ở bên trái ngực',
    hintEn: 'Located on the left side of the chest',
  },
  {
    id: 'q2',
    questionVi: 'Tìm bộ phận giúp bạn suy nghĩ',
    questionEn: 'Find the organ that helps you think',
    targetOrgan: 'brain',
    system: 'nervous',
    difficulty: 'easy',
    hintVi: 'Nằm trong đầu của bạn',
    hintEn: 'Located in your head',
  },
  {
    id: 'q3',
    questionVi: 'Tìm bộ phận giúp bạn thở',
    questionEn: 'Find the organs that help you breathe',
    targetOrgan: 'lungs',
    system: 'respiratory',
    difficulty: 'easy',
    hintVi: 'Có hai cái, nằm trong lồng ngực',
    hintEn: 'There are two, located in the chest',
  },
  {
    id: 'q4',
    questionVi: 'Tìm bộ phận nghiền nát thức ăn',
    questionEn: 'Find the organ that crushes food',
    targetOrgan: 'stomach',
    system: 'digestive',
    difficulty: 'easy',
    hintVi: 'Nằm ở vùng bụng',
    hintEn: 'Located in the belly area',
  },

  // Medium questions
  {
    id: 'q5',
    questionVi: 'Tìm bộ phận bảo vệ não',
    questionEn: 'Find the part that protects the brain',
    targetOrgan: 'skull',
    system: 'skeletal',
    difficulty: 'medium',
    hintVi: 'Là một khung xương cứng bao quanh não',
    hintEn: 'It is a hard bone frame surrounding the brain',
  },
  {
    id: 'q6',
    questionVi: 'Tìm bộ phận lọc máu và tạo mật',
    questionEn: 'Find the organ that filters blood and creates bile',
    targetOrgan: 'liver',
    system: 'digestive',
    difficulty: 'medium',
    hintVi: 'Cơ quan lớn nằm bên phải bụng',
    hintEn: 'Large organ on the right side of the belly',
  },
  {
    id: 'q7',
    questionVi: 'Tìm ống dẫn không khí đến phổi',
    questionEn: 'Find the tube that carries air to the lungs',
    targetOrgan: 'trachea',
    system: 'respiratory',
    difficulty: 'medium',
    hintVi: 'Nằm ở cổ họng',
    hintEn: 'Located in the throat',
  },
  {
    id: 'q8',
    questionVi: 'Tìm nhóm cơ giúp bạn chạy và nhảy',
    questionEn: 'Find the muscles that help you run and jump',
    targetOrgan: 'quadriceps',
    system: 'muscular',
    difficulty: 'medium',
    hintVi: 'Nằm ở phía trước đùi',
    hintEn: 'Located at the front of your thigh',
  },

  // Hard questions
  {
    id: 'q9',
    questionVi: 'Tìm dây truyền tín hiệu từ não đến cơ thể',
    questionEn: 'Find the cord that transmits signals from brain to body',
    targetOrgan: 'spinalcord',
    system: 'nervous',
    difficulty: 'hard',
    hintVi: 'Nằm bên trong cột sống',
    hintEn: 'Located inside the spine',
  },
  {
    id: 'q10',
    questionVi: 'Tìm bộ phận hấp thụ chất dinh dưỡng từ thức ăn',
    questionEn: 'Find the organ that absorbs nutrients from food',
    targetOrgan: 'intestines',
    system: 'digestive',
    difficulty: 'hard',
    hintVi: 'Dài khoảng 6 mét, cuộn trong bụng',
    hintEn: 'About 6 meters long, coiled in the belly',
  },
  {
    id: 'q11',
    questionVi: 'Tìm cột xương giữ cơ thể đứng thẳng',
    questionEn: 'Find the bone column that keeps the body upright',
    targetOrgan: 'spine',
    system: 'skeletal',
    difficulty: 'hard',
    hintVi: 'Nằm ở lưng, từ cổ đến mông',
    hintEn: 'Located on the back, from neck to buttocks',
  },
  {
    id: 'q12',
    questionVi: 'Tìm mạch máu mang máu giàu oxy từ tim',
    questionEn: 'Find the vessels that carry oxygen-rich blood from the heart',
    targetOrgan: 'arteries',
    system: 'circulatory',
    difficulty: 'hard',
    hintVi: 'Màu đỏ tươi, phân nhánh từ tim',
    hintEn: 'Bright red color, branching from the heart',
  },
];

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): QuizQuestion[] => {
  return quizQuestions.filter((q) => q.difficulty === difficulty);
};

export const getRandomQuestions = (count: number): QuizQuestion[] => {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getQuestionsBySystem = (system: string): QuizQuestion[] => {
  return quizQuestions.filter((q) => q.system === system);
};
