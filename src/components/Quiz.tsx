// stats-app/src/components/Quiz.tsx
import React, { useState } from 'react';
import { type QuizQuestion } from '../data/modules';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export const Quiz: React.FC<Props> = ({ questions, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const question = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === question.correctAnswer;
    setIsCorrect(correct);
  };

  const next = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      onComplete();
    }
  };

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>理解度チェック</h3>
      <p style={{ fontWeight: 600 }}>{question.question}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {question.options.map((opt, i) => (
          <button
            key={i}
            className="btn"
            style={{
              background: selected === i 
                ? (i === question.correctAnswer ? '#22c55e' : '#ef4444')
                : '#f1f5f9',
              color: selected === i ? 'white' : 'var(--text)',
              justifyContent: 'flex-start',
              border: '1px solid #e2e8f0',
              textAlign: 'left'
            }}
            onClick={() => handleSelect(i)}
          >
            {opt}
            {selected === i && (
              i === question.correctAnswer ? <CheckCircle2 size={18} /> : <XCircle size={18} />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
          >
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              <strong>解説:</strong> {question.explanation}
            </p>
            <button className="btn" style={{ marginTop: '1rem' }} onClick={next}>
              {currentIdx + 1 < questions.length ? '次の問題へ' : 'セクションを完了する'}
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
