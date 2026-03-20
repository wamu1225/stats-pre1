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
  interactiveType?: 'normal' | 't' | 'chi' | 'f' | 'pca';
  quiz: QuizQuestion[];
}

export const modules: Module[] = [
  {
    id: '1.1-normal',
    title: '正規分布の性質とパラメータ',
    phase: 1,
    description: '統計学の根幹をなす正規分布。平均 μ と分散 σ² が分布の形状に与える影響を視覚的に理解します。',
    content: `正規分布は、自然界や社会現象の多くに現れる最も重要な確率分布です。
    
準1級の学習においては、単に公式を覚えるだけでなく、パラメータの変化が分布の「位置」と「広がり」にどう影響するかを直感的に把握しておくことが、推定や検定の深い理解に繋がります。`,
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
    id: '1.2-sampling-dist',
    title: '標本分布の相互関係 (t, χ², F)',
    phase: 1,
    description: '正規分布から派生する3つの重要な分布。それぞれの定義と、自由度が分布の形状に与える影響を学びます。',
    content: `統計的推定や検定において、標本から計算される統計量が従う分布を「標本分布」と呼びます。

1. **t分布**: 標準正規分布 $Z$ と $\\chi^2$ 分布 $W$ から $t = Z / \\sqrt{W/n}$ として定義されます。標本サイズが小さい時の母平均の検定に使われます。
2. **$\\chi^2$分布**: 独立な標準正規分布の二乗和が従う分布です。分散の検定や適合度検定に使われます。
3. **F分布**: 2つの独立な $\\chi^2$ 分布の比（それぞれを自由度で割ったもの）が従う分布です。分散分析（ANOVA）などで利用されます。`,
    interactiveType: 't',
    quiz: [
      {
        id: 'q3',
        question: 't分布の自由度が大きくなると、どの分布に近づく？',
        options: ['二項分布', '標準正規分布', 'ポアソン分布', 'F分布'],
        correctAnswer: 1,
        explanation: 't分布は自由度が大きくなる（標本サイズが大きくなる）につれて、標準正規分布に収束していきます。'
      }
    ]
  },
  {
    id: '2.2-pca',
    title: '主成分分析 (PCA) の仕組み',
    phase: 2,
    description: '多変量データの情報を集約し、情報の損失を最小限に抑えつつ低次元化する手法の本質を学びます。',
    content: `主成分分析は、多数の変数間の相関を利用して、互いに独立な少数の合成変数（主成分）へと変換する手法です。
    
準1級では、寄与率や固有値の解釈、そしてデータの「分散を最大にする」方向に軸を引くという幾何学的な意味の理解が問われます。`,
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
