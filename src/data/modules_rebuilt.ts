// stats-app/src/data/modules.ts
// AUTO-RECONSTRUCTED from dist build

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  chapter: number;
  description: string;
  content: string;
  keyFormulas?: { label: string; formula: string }[];
  interactiveType?: string;
  quiz: QuizQuestion[];
}

export const modules: Module[] = ;
