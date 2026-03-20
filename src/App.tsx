// stats-app/src/App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { modules, type Module } from './data/modules';
import { InteractiveGraph } from './components/InteractiveGraph';
import { MathDisplay } from './components/MathDisplay';
import { Quiz } from './components/Quiz';
import { BookOpen, CheckCircle2, ChevronLeft, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('stats_progress');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const handleComplete = (id: string) => {
    const nextProgress = { ...progress, [id]: true };
    setProgress(nextProgress);
    localStorage.setItem('stats_progress', JSON.stringify(nextProgress));
    setActiveModuleId(null);
    window.scrollTo(0, 0);
  };

  const activeModule = modules.find(m => m.id === activeModuleId);
  const completedCount = Object.keys(progress).length;
  const progressPercent = (completedCount / modules.length) * 100;

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Stats Grade Pre-1</h1>
        <p className="subtitle">準1級へのステップアップ</p>
      </header>

      <AnimatePresence mode="wait">
        {!activeModuleId ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>進捗状況</h2>
                <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{Math.round(progressPercent)}%</span>
              </div>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
                {completedCount} / {modules.length} セクション完了
              </p>
            </div>

            <h3 style={{ margin: '1.5rem 0 1rem' }}>学習コース（全セクション公開中）</h3>
            {modules.map((m) => (
              <div 
                key={m.id} 
                className="card" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.5rem',
                  borderLeft: progress[m.id] ? '4px solid #22c55e' : '4px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'transform 0.1s'
                }}
                onClick={() => setActiveModuleId(m.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', background: '#dbeafe', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      Phase {m.phase}
                    </span>
                    {progress[m.id] && (
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#16a34a', background: '#dcfce7', padding: '0.2rem 0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <CheckCircle2 size={12} /> 完了済み
                      </span>
                    )}
                  </div>
                </div>
                <h4 style={{ margin: '0.25rem 0' }}>{m.title}</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>{m.description}</p>
                <button className="btn" style={{ marginTop: '0.5rem', background: progress[m.id] ? '#64748b' : 'var(--primary)' }}>
                  <BookOpen size={18} /> {progress[m.id] ? 'もう一度学習する' : '学習を始める'}
                </button>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="module"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <button 
              className="btn" 
              style={{ background: 'transparent', color: 'var(--text)', justifyContent: 'flex-start', paddingLeft: 0, marginBottom: '1rem' }}
              onClick={() => setActiveModuleId(null)}
            >
              <ChevronLeft size={18} /> 一覧に戻る
            </button>

            <div className="card">
              <h2 style={{ marginTop: 0 }}>{activeModule?.title}</h2>
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {/* Simplified Markdown rendering (replace $...$ with MathDisplay) */}
                {activeModule?.content.split(/(\$.*?\$)/).map((part, i) => (
                  part.startsWith('$') ? <MathDisplay key={i} formula={part.slice(1, -1)} /> : part
                ))}
              </div>
            </div>

            {activeModule?.mathFormula && (
              <div className="card" style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>定義式</p>
                <MathDisplay formula={activeModule.mathFormula} block />
              </div>
            )}

            {activeModule?.interactiveType && (
              <InteractiveGraph type={activeModule.interactiveType} />
            )}

            <Quiz 
              questions={activeModule?.quiz || []} 
              onComplete={() => handleComplete(activeModule!.id)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
