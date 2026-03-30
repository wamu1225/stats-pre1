// stats-app/src/components/DistributionSelector.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, HelpCircle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: { label: string; nextId: string | null; result?: string }[];
}

const flow: Record<string, Question> = {
  start: {
    id: 'start',
    text: '分析の目的は何ですか？',
    options: [
      { label: '平均値やグループ間の差を調べたい', nextId: 'mean' },
      { label: '情報の要約や予測モデルを作りたい', nextId: 'model' },
      { label: '時間の経過による変化を予測したい', nextId: null, result: '3.2-timeseries' },
      { label: '知識をデータで更新（学習）させたい', nextId: null, result: '3.1-bayes' }
    ]
  },
  mean: {
    id: 'mean',
    text: '比較したいグループ（群）の数は？',
    options: [
      { label: '1つ（またはサンプル数が非常に多い）', nextId: null, result: '1.1-clt' },
      { label: '2つ（A/Bテストなど）', nextId: null, result: '1.2-sampling' },
      { label: '3つ以上（複数の条件比較）', nextId: null, result: '1.3-anova' },
      { label: '検定のP値・検出力・サンプルサイズを設計したい', nextId: null, result: '1.4-inference' }
    ]
  },
  model: {
    id: 'model',
    text: 'どのようなアプローチを希望しますか？',
    options: [
      { label: '要因から結果を予測したい（売上予測など）', nextId: null, result: '2.1-regression' },
      { label: 'たくさんの変数をギュッとまとめたい', nextId: null, result: '2.2-pca' },
      { label: 'データをグループに分類・判別したい', nextId: null, result: '2.3-discriminant' },
      { label: '見えない共通因子を発見したい（アンケート分析など）', nextId: null, result: '2.4-factor' }
    ]
  }
};

interface Props {
  onSelect: (id: string) => void;
}

export const DistributionSelector: React.FC<Props> = ({ onSelect }) => {
  const [currentId, setCurrentId] = useState('start');
  const [history, setHistory] = useState<string[]>([]);

  const handleOption = (nextId: string | null, result?: string) => {
    if (result) {
      onSelect(result);
    } else if (nextId) {
      setHistory([...history, currentId]);
      setCurrentId(nextId);
    }
  };

  const handleBack = () => {
    const prev = history[history.length - 1];
    if (prev) {
      setCurrentId(prev);
      setHistory(history.slice(0, -1));
    }
  };

  const current = flow[currentId];

  return (
    <div className="card" style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Search size={20} />
        <h3 style={{ margin: 0 }}>目的から探す（逆引き診断）</h3>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentId}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
        >
          <p style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>{current.text}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {current.options.map((opt, i) => (
              <button
                key={i}
                className="btn"
                style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  justifyContent: 'space-between', 
                  textAlign: 'left',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
                onClick={() => handleOption(opt.nextId, opt.result)}
              >
                <span>{opt.label}</span>
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {history.length > 0 && (
        <button 
          onClick={handleBack}
          style={{ 
            marginTop: '1.5rem', 
            background: 'none', 
            border: 'none', 
            color: 'rgba(255,255,255,0.7)', 
            fontSize: '0.875rem',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          前の質問に戻る
        </button>
      )}

      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', display: 'flex', gap: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
        <HelpCircle size={14} />
        <span>知りたい内容を選ぶだけで、適切な学習コンテンツへ導きます。</span>
      </div>
    </div>
  );
};
