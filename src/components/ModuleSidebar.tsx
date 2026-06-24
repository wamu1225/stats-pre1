// stats-app/src/components/ModuleSidebar.tsx
// 読書中も章→モジュールの地図が見える左レール（広い画面の左余白に固定表示）。
// 中央800pxの読書カラムには干渉せず、狭い画面では非表示（既存レイアウト不変）。
import React from 'react';
import type { Module } from '../data/modules';

interface Props {
  modules: Module[];
  activeId: string | null;
  onSelect: (id: string) => void;
  chapterNames: Record<number, string>;
  chapterColors: Record<number, { accent: string }>;
}

export const ModuleSidebar: React.FC<Props> = ({ modules, activeId, onSelect, chapterNames, chapterColors }) => {
  const chapters = [...new Set(modules.map((m) => m.chapter))].sort((a, b) => a - b);
  return (
    <nav className="module-nav-rail" aria-label="学習モジュール一覧">
      <div className="module-nav-rail-title">学習モジュール</div>
      {chapters.map((ch) => (
        <div key={ch} className="module-nav-chapter">
          <div className="module-nav-chapter-head">
            <span className="module-nav-dot" style={{ background: chapterColors[ch]?.accent }} />
            第{ch}章 {chapterNames[ch]}
          </div>
          <ul>
            {modules
              .filter((m) => m.chapter === ch)
              .map((m) => {
                const active = m.id === activeId;
                return (
                  <li key={m.id}>
                    <button
                      className={`module-nav-link${active ? ' active' : ''}`}
                      style={active ? { borderLeftColor: chapterColors[ch]?.accent, color: chapterColors[ch]?.accent } : undefined}
                      onClick={() => onSelect(m.id)}
                      aria-current={active ? 'true' : undefined}
                    >
                      {m.title}
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </nav>
  );
};
