export type Language = 'vi' | 'en';

export type BodySystem =
  | 'skeletal'
  | 'muscular'
  | 'circulatory'
  | 'digestive'
  | 'respiratory'
  | 'nervous';

export interface Organ {
  id: string;
  nameVi: string;
  nameEn: string;
  descriptionVi: string;
  descriptionEn: string;
  system: BodySystem;
  funFactVi: string;
  funFactEn: string;
  position?: [number, number, number];
}

export interface SystemInfo {
  id: BodySystem;
  nameVi: string;
  nameEn: string;
  descriptionVi: string;
  descriptionEn: string;
  color: string;
  icon: string;
  organs: Organ[];
}

export interface QuizQuestion {
  id: string;
  questionVi: string;
  questionEn: string;
  targetOrgan: string;
  system: BodySystem;
  difficulty: 'easy' | 'medium' | 'hard';
  hintVi?: string;
  hintEn?: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  totalQuestions: number;
  isComplete: boolean;
  streak: number;
}

export interface ExplorerState {
  activeSystem: BodySystem | null;
  selectedOrgan: Organ | null;
  xrayOpacity: number;
  isInfoCardOpen: boolean;
  cameraPosition: [number, number, number];
}
