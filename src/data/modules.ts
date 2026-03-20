// stats-app/src/data/modules.ts
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
  phase: number;
  description: string;
  content: string;
  mathFormula?: string;
  interactiveType?: 'normal' | 't' | 'chi' | 'pca';
  quiz: QuizQuestion[];
}

export const modules: Module[] = [
  {
    id: '1.1-normal',
    title: '正規分布の再確認',
    phase: 1,
    description: '統計学の基本中の基本、正規分布の性質をパラメータを動かしながら学び直します。',
    content: `正規分布は、平均 $\\mu$ と分散 $\\sigma^2$ の2つのパラメータで決まる分布です。
    
準1級では、この正規分布をベースとした推測統計の理解が不可欠です。スライダーを動かして、平均が位置を、分散が裾の広がりをどう変えるか確認しましょう。`,
    mathFormula: 'f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}',
    interactiveType: 'normal',
    quiz: [
      {
        id: 'q1',
        question: '標準正規分布の平均と分散の組み合わせとして正しいものはどれ？',
        options: ['平均0, 分散0', '平均1, 分散1', '平均0, 分散1', '平均1, 分散0'],
        correctAnswer: 2,
        explanation: '標準正規分布は平均 $\\mu=0$、分散 $\\sigma^2=1$ と定義されます。'
      }
    ]
  },
  {
    id: '2.2-pca',
    title: '主成分分析 (PCA)',
    phase: 2,
    description: '多次元のデータを要約し、情報の損失を最小限に抑えつつ低次元化する手法です。',
    content: `主成分分析は、相関のある多数の変数から、互いに無相関な少数の合成変数（主成分）を合成する手法です。
    
準1級では、寄与率や固有値の解釈が重要になります。`,
    interactiveType: 'pca',
    quiz: [
      {
        id: 'q2',
        question: '第1主成分が持つ性質として適切なものは？',
        options: ['データの分散を最小にする', 'データの分散を最大にする', '平均値を0にする', '常に1に収束する'],
        correctAnswer: 1,
        explanation: '第1主成分は、データの情報の損失を最小限にする（＝分散を最大にする）方向に軸を引いたものです。'
      }
    ]
  }
];
