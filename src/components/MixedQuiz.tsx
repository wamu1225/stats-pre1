// stats-app/src/components/MixedQuiz.tsx
// 複数モジュールの問題を混ぜて出す出題画面（章のまとめテスト・全範囲クイズで共用）。
// 選択肢の順番は入れ替えない（解説が「選択肢2は…」と位置で指している問題があるため）
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, XCircle, Shuffle } from 'lucide-react';
import type { QuizQuestion } from '../data/modules';

export interface MixedItem { q: QuizQuestion; moduleId: string; moduleTitle: string; }

interface Props {
  title: string;
  draw: () => MixedItem[];
  renderContent: (text: string) => React.ReactNode;
  onOpenModule: (id: string) => void;
  onFinish?: (score: number, total: number) => void;
  best?: { score: number; total: number } | null;
  accent?: string;
}

export const MixedQuiz: React.FC<Props> = ({ title, draw, renderContent, onOpenModule, onFinish, best, accent }) => {
  const [items, setItems] = useState<MixedItem[]>(draw);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [results, setResults] = useState<{ moduleId: string; moduleTitle: string; correct: boolean }[]>([]);
  const [done, setDone] = useState(false);

  const top = () => window.scrollTo({ top: 0, behavior: 'instant' });

  const retry = () => {
    setItems(draw());
    setIdx(0);
    setSelected(null);
    setResults([]);
    setDone(false);
    top();
  };

  const next = () => {
    const cur = items[idx];
    const newResults = [...results, { moduleId: cur.moduleId, moduleTitle: cur.moduleTitle, correct: selected === cur.q.correctAnswer }];
    setResults(newResults);
    if (idx + 1 < items.length) {
      setIdx(idx + 1);
      setSelected(null);
    } else {
      setDone(true);
      onFinish?.(newResults.filter(r => r.correct).length, newResults.length);
    }
    top();
  };

  if (done) {
    const score = results.filter(r => r.correct).length;
    const byModule: Record<string, { title: string; correct: number; total: number }> = {};
    results.forEach(r => {
      if (!byModule[r.moduleId]) byModule[r.moduleId] = { title: r.moduleTitle, correct: 0, total: 0 };
      byModule[r.moduleId].total++;
      if (r.correct) byModule[r.moduleId].correct++;
    });
    const weak = Object.entries(byModule).filter(([, v]) => v.correct < v.total);
    return (
      <div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: accent ?? 'var(--primary)' }}>
            {score} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ {results.length} 問正解</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>{title}</p>
          {best && <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>これまでの最高：{best.score}/{best.total}</p>}
        </div>
        <div className="card">
          <h3 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>モジュール別の結果</h3>
          {Object.entries(byModule).map(([id, v]) => (
            <div key={id} className="rq-result-row">
              <span className={`rq-result-dot ${v.correct === v.total ? 'ok' : 'ng'}`} />
              <span style={{ flex: 1, fontSize: '0.85rem' }}>{v.title}</span>
              <span style={{ fontSize: '0.8rem', color: v.correct === v.total ? '#16a34a' : '#dc2626', fontWeight: 700 }}>{v.correct}/{v.total}</span>
            </div>
          ))}
          {weak.length > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', margin: '0 0 0.5rem' }}>間違えた問題のモジュールを読み直す：</p>
              <div className="links-row">
                {weak.map(([id, v]) => (
                  <button key={id} className="btn-link" onClick={() => onOpenModule(id)}>
                    {v.title} <ArrowRight size={12} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <button className="btn" onClick={retry} style={{ marginTop: '0.5rem' }}>
          <Shuffle size={16} /> 別の問題でもう一度
        </button>
      </div>
    );
  }

  const cur = items[idx];
  if (!cur) return null;
  const isCorrect = selected !== null && selected === cur.q.correctAnswer;
  return (
    <div className="card" style={{ border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{title}</h3>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>{cur.moduleTitle}</span>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', flex: 'none' }}>{idx + 1} / {items.length}</span>
      </div>
      <div style={{ marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 600, lineHeight: 1.6 }}>
        {renderContent(cur.q.question)}
      </div>
      <div className="quiz-options">
        {cur.q.options.map((opt, i) => (
          <button
            key={`mq-${idx}-${i}`}
            className="btn"
            style={{
              background: selected === i ? (i === cur.q.correctAnswer ? '#166534' : '#b91c1c') : 'var(--card-bg)',
              color: selected === i ? 'white' : 'var(--text)',
              justifyContent: 'space-between',
              border: selected === i ? 'none' : '1px solid var(--border)',
              textAlign: 'left',
              padding: '0.75rem 1rem',
              boxShadow: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
            }}
            onClick={() => { if (selected === null) setSelected(i); }}
          >
            <div style={{ flex: 1 }}>{renderContent(opt)}</div>
            {selected === i && (i === cur.q.correctAnswer ? <CheckCircle2 size={18} /> : <XCircle size={18} />)}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selected !== null && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-warm)', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
            <div style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.6 }}>
              <strong style={{ color: isCorrect ? '#166534' : '#b91c1c' }}>{isCorrect ? '正解！' : '不正解...'}</strong><br />
              {renderContent(cur.q.explanation)}
            </div>
            <button className="btn" style={{ marginTop: '1rem', width: 'auto', padding: '0.5rem 1rem' }} onClick={next}>
              {idx + 1 < items.length ? '次の問題へ' : '結果を見る'} <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
