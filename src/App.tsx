// stats-app/src/App.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import { modules } from './data/modules';
import { glossary } from './data/glossary';
import { InteractiveGraph } from './components/InteractiveGraph';
import { MathDisplay } from './components/MathDisplay';
import { Quiz } from './components/Quiz';
import { TermText } from './components/TermGlossary';
import { DistributionSelector } from './components/DistributionSelector';
import { ModuleSidebar } from './components/ModuleSidebar';
import { ExamGuide } from './components/ExamGuide';
import { buildUsecaseHtml } from './data/usecaseGuide';
import { ChevronLeft, Book, LayoutDashboard, ArrowRight, Search as SearchIcon, X, Lightbulb, Target, ArrowDown, Dumbbell, Trash2, FileText, Shuffle, CheckCircle2, XCircle, Sigma, ChevronUp, ListOrdered, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const chapterNames: Record<number, string> = {
  1: '確率論の基礎',
  2: '確率分布',
  3: '標本分布と漸近理論',
  4: '統計的推測',
  5: '多変量解析',
  6: 'ベイズ・確率過程・発展',
};

const chapterColors: Record<number, { bg: string; text: string; accent: string; light: string }> = {
  1: { bg: '#e0e7ff', text: '#3730a3', accent: '#4338ca', light: '#eef2ff' },  // インディゴ（基礎）
  2: { bg: '#cffafe', text: '#155e75', accent: '#0891b2', light: '#ecfeff' },  // シアン（分布）
  3: { bg: '#d1fae5', text: '#065f46', accent: '#059669', light: '#ecfdf5' },  // 緑（標本・漸近）
  4: { bg: '#fef3c7', text: '#92400e', accent: '#d97706', light: '#fffbeb' },  // 琥珀（推測）
  5: { bg: '#ede9fe', text: '#5b21b6', accent: '#7c3aed', light: '#f5f3ff' },  // 紫（多変量）
  6: { bg: '#fce7f3', text: '#9d174d', accent: '#db2777', light: '#fdf2f8' },  // ピンク（発展）
};

const PROGRESS_KEY = 'stats-pre1-progress';
const THEME_KEY = 'stats-pre1-theme';

function loadTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch { return 'light'; }
}
function saveTheme(t: 'light' | 'dark') {
  try { localStorage.setItem(THEME_KEY, t); } catch { /* noop */ }
}

interface ProgressEntry { score: number; total: number; completedAt: string; }
type Progress = Record<string, ProgressEntry>;

function loadProgress(): Progress {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); } catch { return {}; }
}
function saveProgress(p: Progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

// Draw n random items from an array
function sampleN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

type View = 'dashboard' | 'glossary' | 'cheatsheet' | 'randomquiz' | 'privacy' | 'about' | 'guide' | 'usecase';

function App() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [view, setView] = useState<View>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [theme, setTheme] = useState<'light' | 'dark'>(loadTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(t => t === 'light' ? 'dark' : 'light'), []);

  // Random quiz state
  const [rqQuestions, setRqQuestions] = useState<{ q: typeof modules[0]['quiz'][0]; moduleTitle: string; moduleId: string }[]>([]);
  const [rqIdx, setRqIdx] = useState(0);
  const [rqSelected, setRqSelected] = useState<number | null>(null);
  const [rqIsCorrect, setRqIsCorrect] = useState<boolean | null>(null);
  const [rqResults, setRqResults] = useState<{ moduleId: string; moduleTitle: string; correct: boolean }[]>([]);
  const [rqDone, setRqDone] = useState(false);

  const startRandomQuiz = useCallback(() => {
    // Draw 2 questions per module (20 total from 10 modules)
    const qs = modules.flatMap(m =>
      sampleN(m.quiz, 2).map(q => ({ q, moduleTitle: m.title, moduleId: m.id }))
    ).sort(() => Math.random() - 0.5);
    setRqQuestions(qs);
    setRqIdx(0);
    setRqSelected(null);
    setRqIsCorrect(null);
    setRqResults([]);
    setRqDone(false);
    setView('randomquiz');
    window.scrollTo(0, 0);
  }, []);

  const rqHandleSelect = (idx: number) => {
    if (rqSelected !== null) return;
    setRqSelected(idx);
    const correct = idx === rqQuestions[rqIdx].q.correctAnswer;
    setRqIsCorrect(correct);
  };

  const rqNext = () => {
    const cur = rqQuestions[rqIdx];
    const correct = rqSelected === cur.q.correctAnswer;
    const newResults = [...rqResults, { moduleId: cur.moduleId, moduleTitle: cur.moduleTitle, correct }];
    if (rqIdx + 1 < rqQuestions.length) {
      setRqResults(newResults);
      setRqIdx(rqIdx + 1);
      setRqSelected(null);
      setRqIsCorrect(null);
      window.scrollTo(0, 0);
    } else {
      setRqResults(newResults);
      setRqDone(true);
      window.scrollTo(0, 0);
    }
  };

  const updateModuleId = useCallback((id: string | null) => {
    // pathnameの変更とHistory APIの活用
    const basePath = window.location.pathname.startsWith('/stats-pre1/') ? '/stats-pre1' : '';
    const newPath = id ? `${basePath}/${id}/` : `${basePath}/`;
    window.history.pushState(null, '', newPath);
    
    if (!id) {
      setActiveModuleId(null);
      setView('dashboard');
    } else {
      setActiveModuleId(id);
      setView('dashboard');
    }
    setQuizCompleted(false);
    window.scrollTo(0, 0);
  }, []);

  const switchView = useCallback((newView: View) => {
    setActiveModuleId(null);
    setView(newView);
    const basePath = window.location.pathname.startsWith('/stats-pre1/') ? '/stats-pre1' : '';
    const newPath = newView === 'dashboard' ? `${basePath}/` : `${basePath}/${newView}/`;
    window.history.pushState(null, '', newPath);
    window.scrollTo(0, 0);
  }, []);

  const handleQuizComplete = useCallback((moduleId: string, score: number, total: number) => {
    setQuizCompleted(true);
    const entry: ProgressEntry = { score, total, completedAt: new Date().toLocaleDateString('ja-JP') };
    const next = { ...loadProgress(), [moduleId]: entry };
    saveProgress(next);
    setProgress(next);
  }, []);

  useEffect(() => {
    const handlePath = () => {
      const segments = window.location.pathname.split('/').filter(Boolean);
      const lastSegment = segments[segments.length - 1];
      
      const isCustomView = ['glossary', 'cheatsheet', 'privacy', 'about', 'guide', 'usecase'].includes(lastSegment || '');

      if (isCustomView) {
        setView(lastSegment as View);
        setActiveModuleId(null);
        if (lastSegment === 'privacy') document.title = 'プライバシーポリシー | 統計検定 準1級 学習リファレンス';
        else if (lastSegment === 'about') document.title = 'サイトについて | 統計検定 準1級 学習リファレンス';
        else if (lastSegment === 'guide') document.title = '試験ガイド | 統計検定 準1級 学習リファレンス';
        else if (lastSegment === 'usecase') document.title = '検定・分布の使い分けガイド | 統計検定 準1級 学習リファレンス';
      } else if (lastSegment && lastSegment !== 'stats-pre1') {
        const found = modules.find(m => m.id === lastSegment);
        if (found) {
          setActiveModuleId(found.id);
          setView('dashboard');
          document.title = `${found.title} | 統計検定 準1級`;
        } else {
          setActiveModuleId(null);
          setView('dashboard');
        }
      } else {
        setActiveModuleId(null);
        setView('dashboard');
        document.title = '統計検定 準1級 学習リファレンス';
      }
    };
    handlePath();
    window.addEventListener('popstate', handlePath);
    return () => window.removeEventListener('popstate', handlePath);
  }, []);

  const parseInlineContent = useCallback((text: string): React.ReactNode => {
    function parseInline(t: string): React.ReactNode {
      const regex = /(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$|\*\*[\s\S]*?\*\*|\[\[term:.*?\]\][\s\S]*?\[\[\/term\]\]|\[\[translate:.*?\]\][\s\S]*?\[\[\/translate\]\]|\[\[darts\]\]|\[\[practical:.*?\]\][\s\S]*?\[\[\/practical\]\]|\[\[conjugate\]\]|\[\[hierarchy\]\]|\[\[venn-inclusion\]\]|\[\[venn-conditional\]\]|\[\[total-probability\]\]|\[\[ci-coverage\]\]|\[\[power-curve\]\]|\[\[markov-chain\]\]|\[\[logistic-sigmoid\]\]|\[\[interactive:.*?\]\]|\[\[regularization-card\]\]|\[\[pvalue-table\]\]|\[\[anova-table\]\]|\[\[type-error-table\]\]|\[\[confusion-matrix\]\]|\[\[pca-vs-fa-table\]\]|\[\[conjugate-table\]\])/g;
      const parts = t.split(regex);
      return (
        <>
          {parts.map((part, i) => {
            if (!part) return null;
            const key = `inline-${i}`;
            if (part.startsWith('$$') && part.endsWith('$$')) return <MathDisplay key={key} formula={part.slice(2, -2)} block={true} />;
            if (part.startsWith('$') && part.endsWith('$')) return <MathDisplay key={key} formula={part.slice(1, -1)} />;
            if (part.startsWith('**') && part.endsWith('**')) return <strong key={key}>{parseInline(part.slice(2, -2))}</strong>;
            if (part.startsWith('[[term:')) {
              const idMatch = part.match(/\[\[term:(.*?)\]\]/);
              const contentMatch = part.match(/\]\]([\s\S]*?)\[\[\/term\]\]/);
              if (idMatch && contentMatch) return <TermText key={key} termId={idMatch[1]} onNavigate={updateModuleId} renderMath={parseInline}>{contentMatch[1]}</TermText>;
            }
            if (part.startsWith('[[translate:')) {
              const transMatch = part.match(/\[\[translate:(.*?)\]\]/);
              const contentMatch = part.match(/\]\]([\s\S]*?)\[\[\/translate\]\]/);
              if (transMatch && contentMatch) return <span key={key} className="formula-wrapper">{parseInline(contentMatch[1])}<span className="formula-translation">{transMatch[1]}</span></span>;
            }
            if (part === '[[darts]]') return (
              <div key={key} className="darts-container">
                <div className="dart-target"><Target size={32} color="#22c55e" className="target-svg" /><div className="dart-label">不偏性あり</div><div className="dart-desc">中心が真値を射抜いている</div></div>
                <div className="dart-target"><Target size={32} color="#3b82f6" className="target-svg" /><div className="dart-label">一致性あり</div><div className="dart-desc">n増で一点に集中する</div></div>
              </div>
            );
            if (part === '[[conjugate]]') return (
              <div key={key} className="conjugate-card">
                <div className="pair-row">
                  <div className="dist-box"><strong>二項分布</strong><br/><small>成功確率 p</small></div>
                  <div className="update-arrow"><ArrowRight size={16}/><span>共役</span></div>
                  <div className="dist-box"><strong>ベータ分布</strong><br/><small>形状 α, β</small></div>
                </div>
                <div className="update-arrow" style={{ margin: '8px 0' }}><ArrowDown size={16}/><span>更新</span></div>
                <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 800 }}>α' = α + 成功数 , β' = β + 失敗数</div>
              </div>
            );
            if (part === '[[hierarchy]]') return (
              <div key={key} className="matryoshka-container">
                <div className="shell shell-outer"><span className="shell-label">集団の差 (学校)</span>
                  <div className="shell shell-mid"><span className="shell-label">個人の差 (クラス)</span><div className="shell shell-inner">データ</div></div>
                </div>
              </div>
            );
            if (part === '[[venn-inclusion]]') return (
              <figure key={key} className="venn-figure">
                <svg viewBox="0 0 340 200" role="img" aria-label="包除原理のベン図：A と B の重なりを一度だけ引く" className="venn-svg">
                  <circle cx="132" cy="92" r="78" fill="#4338ca" fillOpacity={0.22} stroke="#4338ca" strokeWidth={1.5} />
                  <circle cx="208" cy="92" r="78" fill="#d97706" fillOpacity={0.22} stroke="#d97706" strokeWidth={1.5} />
                  <text x="94" y="99" textAnchor="middle" fontSize={22} fontWeight={700} fill="#3730a3">A</text>
                  <text x="246" y="99" textAnchor="middle" fontSize={22} fontWeight={700} fill="#b45309">B</text>
                  <text x="170" y="99" textAnchor="middle" fontSize={13} fontWeight={700} fill="#1f2937">A∩B</text>
                </svg>
                <figcaption className="venn-caption">
                  和事象 A∪B は、重なり A∩B を一度だけ引く：P(A∪B) = P(A) + P(B) − P(A∩B)。単純に足すと、重なり部分を二重に数えてしまうため。
                </figcaption>
              </figure>
            );
            if (part === '[[venn-conditional]]') return (
              <figure key={key} className="venn-figure">
                <svg viewBox="0 0 340 200" role="img" aria-label="条件付き確率：A が起きた世界の中での B の割合" className="venn-svg">
                  <rect x="6" y="6" width="328" height="188" rx="8" fill="#f3f4f6" stroke="#d1d5db" strokeWidth={1} />
                  <text x="20" y="26" fontSize={12} fill="#6b7280">Ω</text>
                  <circle cx="140" cy="104" r="68" fill="#4338ca" fillOpacity={0.16} stroke="#4338ca" strokeWidth={3} />
                  <circle cx="205" cy="104" r="68" fill="#d97706" fillOpacity={0.16} stroke="#d97706" strokeWidth={1.2} />
                  <text x="104" y="110" textAnchor="middle" fontSize={22} fontWeight={700} fill="#3730a3">A</text>
                  <text x="242" y="110" textAnchor="middle" fontSize={20} fontWeight={700} fill="#b45309">B</text>
                  <text x="172" y="110" textAnchor="middle" fontSize={12} fontWeight={700} fill="#1f2937">A∩B</text>
                </svg>
                <figcaption className="venn-caption">
                  条件付き確率 P(B∣A) = P(A∩B) / P(A)。A が起きたとわかった時点で、考える世界は A の中（太線）だけ。その中で B にも入っている割合が P(B∣A)。
                </figcaption>
              </figure>
            );
            if (part === '[[total-probability]]') return (
              <figure key={key} className="venn-figure">
                <svg viewBox="0 0 360 200" role="img" aria-label="全確率の定理：原因 B1 B2 B3 ごとの寄与を足す" className="venn-svg">
                  <rect x="10" y="22" width="340" height="150" fill="#ffffff" stroke="#9ca3af" strokeWidth={1} />
                  <line x1="158" y1="22" x2="158" y2="172" stroke="#9ca3af" strokeWidth={1} />
                  <line x1="262" y1="22" x2="262" y2="172" stroke="#9ca3af" strokeWidth={1} />
                  <rect x="10" y="120" width="148" height="52" fill="#4338ca" fillOpacity={0.3} />
                  <rect x="158" y="92" width="104" height="80" fill="#4338ca" fillOpacity={0.3} />
                  <rect x="262" y="146" width="88" height="26" fill="#4338ca" fillOpacity={0.3} />
                  <text x="84" y="40" textAnchor="middle" fontSize={13} fontWeight={700} fill="#374151">B₁</text>
                  <text x="210" y="40" textAnchor="middle" fontSize={13} fontWeight={700} fill="#374151">B₂</text>
                  <text x="306" y="40" textAnchor="middle" fontSize={13} fontWeight={700} fill="#374151">B₃</text>
                  <text x="84" y="150" textAnchor="middle" fontSize={11} fontWeight={700} fill="#312e81">A∩B₁</text>
                  <text x="210" y="136" textAnchor="middle" fontSize={11} fontWeight={700} fill="#312e81">A∩B₂</text>
                  <text x="306" y="162" textAnchor="middle" fontSize={10} fontWeight={700} fill="#312e81">A∩B₃</text>
                </svg>
                <figcaption className="venn-caption">
                  全確率の定理 P(A) = Σ P(A∣Bᵢ)·P(Bᵢ)。全体 Ω を排反な原因 B₁,B₂,B₃ … に分け、各原因の中で A が起きる量（青）を足し合わせると P(A) になる。列の幅が P(Bᵢ)、青い高さが P(A∣Bᵢ) のイメージ。
                </figcaption>
              </figure>
            );
            if (part === '[[ci-coverage]]') {
              const trueX = 182;
              const intervals: [number, number][] = [
                [150, 214], [138, 202], [160, 226], [148, 210], [134, 198],
                [168, 230], [120, 168], [156, 220], [142, 206], [164, 228],
                [130, 194], [152, 216], [146, 208], [170, 232], [136, 200],
                [158, 222], [144, 204], [162, 226], [140, 202], [154, 218],
              ];
              return (
                <figure key={key} className="venn-figure">
                  <svg viewBox="0 0 360 220" role="img" aria-label="信頼区間の被覆：別々の標本から作った95%信頼区間と、固定された真の値θ。約95%が真値をまたぐ" className="venn-svg ci-svg">
                    <line x1={trueX} y1={22} x2={trueX} y2={210} stroke="#dc2626" strokeWidth={1.5} strokeDasharray="4 3" />
                    <text x={trueX} y={15} textAnchor="middle" fontSize={12} fontWeight={700} fill="#b91c1c">θ（真の値・固定）</text>
                    {intervals.map(([lo, hi], idx) => {
                      const y = 30 + idx * 9;
                      const covers = lo <= trueX && trueX <= hi;
                      const color = covers ? '#4338ca' : '#dc2626';
                      const cx = (lo + hi) / 2;
                      return (
                        <g key={idx}>
                          <line x1={lo} y1={y} x2={hi} y2={y} stroke={color} strokeWidth={2} />
                          <line x1={lo} y1={y - 3} x2={lo} y2={y + 3} stroke={color} strokeWidth={2} />
                          <line x1={hi} y1={y - 3} x2={hi} y2={y + 3} stroke={color} strokeWidth={2} />
                          <circle cx={cx} cy={y} r={1.7} fill={color} />
                        </g>
                      );
                    })}
                  </svg>
                  <figcaption className="venn-caption">
                    各横線は、別々の標本から作った95%信頼区間（中央の点が標本平均 x̄）。真の値 θ は1つに決まっていて動かない（赤い縦線）。標本ごとに区間のほうが左右に揺れる。この手順をくり返すと約95%の区間が θ をまたぐ（青）が、たまに外す（赤）。「95%」はこの手順の長期的な成功率であって、ある1つの区間に θ が入る確率ではない。
                  </figcaption>
                </figure>
              );
            }
            if (part === '[[power-curve]]') {
              const base = 190, A = 120, sig = 34, mu0 = 150, mu1 = 235, c = 206;
              const g = (x: number, mu: number) => base - A * Math.exp(-0.5 * ((x - mu) / sig) ** 2);
              const curve = (mu: number, a: number, b: number) => {
                let s = '';
                for (let x = a; x <= b; x += 3) s += `${x},${g(x, mu).toFixed(1)} `;
                return s.trim();
              };
              const fillArea = (mu: number, a: number, b: number) => {
                let s = `${a},${base} `;
                for (let x = a; x <= b; x += 3) s += `${x},${g(x, mu).toFixed(1)} `;
                return s + `${b},${base}`;
              };
              return (
                <figure key={key} className="venn-figure">
                  <svg viewBox="0 0 420 214" role="img" aria-label="検定の2分布図：H0とH1の重なりに第1種の過誤α・第2種の過誤β・検出力1−βを示す" className="venn-svg ci-svg">
                    <line x1={48} y1={base} x2={372} y2={base} stroke="#9ca3af" strokeWidth={1} />
                    <polygon points={fillArea(mu1, c, 360)} fill="#16a34a" fillOpacity={0.16} />
                    <polygon points={fillArea(mu1, 140, c)} fill="#6b7280" fillOpacity={0.3} />
                    <polygon points={fillArea(mu0, c, 290)} fill="#dc2626" fillOpacity={0.32} />
                    <polyline points={curve(mu0, 52, 300)} fill="none" stroke="#4338ca" strokeWidth={2} />
                    <polyline points={curve(mu1, 130, 360)} fill="none" stroke="#0f766e" strokeWidth={2} />
                    <line x1={c} y1={52} x2={c} y2={base} stroke="#111827" strokeWidth={1.2} strokeDasharray="4 3" />
                    <text x={mu0} y={base + 15} textAnchor="middle" fontSize={12} fill="#3730a3">μ₀</text>
                    <text x={mu1} y={base + 15} textAnchor="middle" fontSize={12} fill="#0f766e">μ₁</text>
                    <text x={c} y={48} textAnchor="middle" fontSize={11} fill="#111827">境界 c</text>
                    <text x={mu0} y={64} textAnchor="middle" fontSize={11} fontWeight={700} fill="#3730a3">H₀ 真</text>
                    <text x={mu1} y={64} textAnchor="middle" fontSize={11} fontWeight={700} fill="#0f766e">H₁ 真</text>
                    <text x={224} y={183} textAnchor="middle" fontSize={12} fontWeight={700} fill="#991b1b">α</text>
                    <text x={189} y={170} textAnchor="middle" fontSize={12} fontWeight={700} fill="#374151">β</text>
                    <text x={262} y={150} textAnchor="middle" fontSize={12} fontWeight={700} fill="#166534">1−β</text>
                  </svg>
                  <figcaption className="venn-caption">
                    左の山は差がない（H₀ が真）ときの検定統計量の分布、右の山は差がある（H₁ が真）ときの分布。境界 c より右に出たら H₀ を棄却する。α（赤）＝H₀ が真なのに棄却してしまう第1種の過誤、β（灰）＝H₁ が真なのに見逃す第2種の過誤、1−β（緑）＝検出力。境界 c を左へ動かすと α は増え β は減る（トレードオフ）。標本数 n を増やすと両方の山が細くなって重なりが減り、α を保ったまま検出力を上げられる。
                  </figcaption>
                </figure>
              );
            }
            if (part === '[[markov-chain]]') return (
              <figure key={key} className="venn-figure">
                <svg viewBox="0 0 360 200" role="img" aria-label="マルコフ連鎖の状態遷移図：晴れと雨の2状態と推移確率" className="venn-svg ci-svg">
                  <defs>
                    <marker id="mkArrow" markerUnits="userSpaceOnUse" markerWidth={10} markerHeight={10} refX={7} refY={4} orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill="#475569" />
                    </marker>
                  </defs>
                  <path d="M139,93 Q180,55 221,93" fill="none" stroke="#475569" strokeWidth={1.6} markerEnd="url(#mkArrow)" />
                  <path d="M221,127 Q180,165 139,127" fill="none" stroke="#475569" strokeWidth={1.6} markerEnd="url(#mkArrow)" />
                  <path d="M78,98 C40,80 40,140 78,122" fill="none" stroke="#475569" strokeWidth={1.6} markerEnd="url(#mkArrow)" />
                  <path d="M282,98 C320,80 320,140 282,122" fill="none" stroke="#475569" strokeWidth={1.6} markerEnd="url(#mkArrow)" />
                  <circle cx={110} cy={110} r={34} fill="#fef3c7" stroke="#d97706" strokeWidth={2} />
                  <circle cx={250} cy={110} r={34} fill="#dbeafe" stroke="#2563eb" strokeWidth={2} />
                  <text x={110} y={117} textAnchor="middle" fontSize={20} fontWeight={700} fill="#b45309">晴</text>
                  <text x={250} y={117} textAnchor="middle" fontSize={20} fontWeight={700} fill="#1d4ed8">雨</text>
                  <text x={180} y={50} textAnchor="middle" fontSize={12} fontWeight={700} fill="#334155">0.2</text>
                  <text x={180} y={181} textAnchor="middle" fontSize={12} fontWeight={700} fill="#334155">0.4</text>
                  <text x={33} y={114} textAnchor="middle" fontSize={12} fontWeight={700} fill="#b45309">0.8</text>
                  <text x={327} y={114} textAnchor="middle" fontSize={12} fontWeight={700} fill="#1d4ed8">0.6</text>
                </svg>
                <figcaption className="venn-caption">
                  天気を晴れ・雨の2状態にしたマルコフ連鎖。矢印は推移確率 pᵢⱼ（晴→雨 = 0.2、雨→晴 = 0.4、自己ループは晴→晴 = 0.8、雨→雨 = 0.6）。各状態から出る矢印の確率の和は必ず1で、これが推移確率行列 P の各行の和が1になることに対応する。次の状態は今の状態だけで決まり、それより前の履歴にはよらない（マルコフ性）。
                </figcaption>
              </figure>
            );
            if (part === '[[logistic-sigmoid]]') {
              const x0 = 44, x1 = 332, yTop = 30, yBot = 182;
              const px = (eta: number) => x0 + ((eta + 6) / 12) * (x1 - x0);
              const py = (p: number) => yBot - p * (yBot - yTop);
              const sig = (eta: number) => 1 / (1 + Math.exp(-eta));
              let scurve = '';
              for (let e = -6; e <= 6.0001; e += 0.25) scurve += `${px(e).toFixed(1)},${py(sig(e)).toFixed(1)} `;
              return (
                <figure key={key} className="venn-figure">
                  <svg viewBox="0 0 360 220" role="img" aria-label="ロジスティック回帰のシグモイド曲線：線形予測子に対し確率が0と1の間に収まる" className="venn-svg ci-svg">
                    <line x1={x0} y1={py(1)} x2={x1} y2={py(1)} stroke="#cbd5e1" strokeWidth={1} strokeDasharray="3 3" />
                    <line x1={x0} y1={py(0)} x2={x1} y2={py(0)} stroke="#cbd5e1" strokeWidth={1} strokeDasharray="3 3" />
                    <line x1={x0} y1={yTop - 6} x2={x0} y2={yBot + 6} stroke="#9ca3af" strokeWidth={1} />
                    <line x1={px(-6)} y1={py(0.5 + 0.11 * -6)} x2={px(6)} y2={py(0.5 + 0.11 * 6)} stroke="#9ca3af" strokeWidth={1.5} strokeDasharray="5 3" />
                    <polyline points={scurve.trim()} fill="none" stroke="#0f766e" strokeWidth={2.4} />
                    <circle cx={px(0)} cy={py(0.5)} r={2.8} fill="#0f766e" />
                    <text x={x0 - 6} y={py(1) + 4} textAnchor="end" fontSize={11} fill="#6b7280">1</text>
                    <text x={x0 - 6} y={py(0) + 4} textAnchor="end" fontSize={11} fill="#6b7280">0</text>
                    <text x={px(0) + 7} y={py(0.5) - 6} textAnchor="start" fontSize={11} fontWeight={700} fill="#0f766e">p=0.5</text>
                    <text x={x1} y={yBot + 20} textAnchor="end" fontSize={11} fill="#6b7280">β₀+β·x（線形予測子）</text>
                    <text x={x0 - 4} y={yTop - 12} textAnchor="start" fontSize={11} fill="#6b7280">確率 p</text>
                  </svg>
                  <figcaption className="venn-caption">
                    ロジスティック回帰のシグモイド関数 p = 1 / (1 + e^−(β₀+β·x))。線形予測子（横軸）がどれだけ大きく・小さくなっても、確率（縦軸）は必ず0と1の間に収まる。確率をそのまま直線で当てはめると（灰の破線）0を下回り1を超えてしまうのに対し、シグモイドはなめらかに0↔1を結ぶ。中央 β₀+β·x = 0 で p = 0.5、そこで傾きが最も急になる。
                  </figcaption>
                </figure>
              );
            }
            if (part.startsWith('[[interactive:')) {
              const typeMatch = part.match(/\[\[interactive:(.*?)\]\]/);
              if (typeMatch) {
                const type = typeMatch[1] as 'normal' | 't' | 'chi2' | 'f' | 'pca' | 'regression' | 'logistic' | 'mcmc' | 'gibbs' | 'update' | 'overfit' | 'outlier' | 'multico';
                return <InteractiveGraph key={key} type={type} renderContent={parseInline} />;
              }
            }
            if (part === '[[pvalue-table]]') return (
              <div key={key} style={{ overflowX: 'auto', margin: '1rem 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th style={{ background: '#fef2f2', color: '#991b1b', padding: '0.6rem 0.75rem', border: '1px solid #fecaca', textAlign: 'left', fontWeight: 800 }}>❌ 間違った解釈</th>
                      <th style={{ background: '#f0fdf4', color: '#166534', padding: '0.6rem 0.75rem', border: '1px solid #bbf7d0', textAlign: 'left', fontWeight: 800 }}>✅ 正しい解釈</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', verticalAlign: 'top' }}>「帰無仮説が正しい確率が3%」</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', verticalAlign: 'top' }}>「帰無仮説が正しいと仮定したとき、この結果が偶然起きる確率が3%」</td>
                    </tr>
                    <tr style={{ background: 'var(--bg-warm)' }}>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', verticalAlign: 'top' }}>「P=0.03は効果が大きいことを示す」</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', verticalAlign: 'top' }}>P値はサンプルサイズに影響される。効果の大きさは<strong>効果量</strong>（コーエンの d など）で測る</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
            if (part === '[[anova-table]]') return (
              <div key={key} style={{ overflowX: 'auto', margin: '1rem 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.6rem 0.75rem', border: '1px solid #bfdbfe', textAlign: 'left', fontWeight: 800 }}>グループ</th>
                      <th style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.6rem 0.75rem', border: '1px solid #bfdbfe', textAlign: 'left', fontWeight: 800 }}>10日間の売上例</th>
                      <th style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.6rem 0.75rem', border: '1px solid #bfdbfe', textAlign: 'left', fontWeight: 800 }}>10日間の平均</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)' }}>煮玉子</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)' }}>52, 48, 55, 51, 49…</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', fontWeight: 700 }}>51万円</td>
                    </tr>
                    <tr style={{ background: 'var(--bg-warm)' }}>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)' }}>チャーシュー</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)' }}>58, 61, 57, 60, 59…</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', fontWeight: 700, color: '#1d4ed8' }}>59万円</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)' }}>メンマ</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)' }}>50, 52, 48, 51, 49…</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', fontWeight: 700 }}>50万円</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
            if (part === '[[type-error-table]]') return (
              <div key={key} style={{ overflowX: 'auto', margin: '1rem 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th style={{ background: 'var(--bg-warm)', padding: '0.6rem 0.75rem', border: '1px solid var(--border)', textAlign: 'left', fontWeight: 800 }}></th>
                      <th style={{ background: '#f0fdf4', color: '#166534', padding: '0.6rem 0.75rem', border: '1px solid #bbf7d0', textAlign: 'left', fontWeight: 800 }}>H₀ が真（本当は差なし）</th>
                      <th style={{ background: '#fef2f2', color: '#991b1b', padding: '0.6rem 0.75rem', border: '1px solid #fecaca', textAlign: 'left', fontWeight: 800 }}>H₀ が偽（本当は差あり）</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', fontWeight: 700 }}>棄却（差ありと判断）</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', background: '#fef2f2', color: '#991b1b', fontWeight: 700 }}>第1種の過誤 α（冤罪）</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', background: '#f0fdf4', color: '#166534' }}>正解 ✓</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', fontWeight: 700 }}>棄却しない（差なし）</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', background: '#f0fdf4', color: '#166534' }}>正解 ✓</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', background: '#fef2f2', color: '#991b1b', fontWeight: 700 }}>第2種の過誤 β（見逃し）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
            if (part === '[[confusion-matrix]]') return (
              <div key={key} style={{ overflowX: 'auto', margin: '1rem 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th style={{ background: 'var(--bg-warm)', padding: '0.6rem 0.75rem', border: '1px solid var(--border)', textAlign: 'left', fontWeight: 800 }}></th>
                      <th style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.6rem 0.75rem', border: '1px solid #bfdbfe', textAlign: 'left', fontWeight: 800 }}>予測: スパム</th>
                      <th style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.6rem 0.75rem', border: '1px solid #bfdbfe', textAlign: 'left', fontWeight: 800 }}>予測: 正常</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', fontWeight: 700 }}>実際: スパム</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', background: '#f0fdf4', color: '#166534', fontWeight: 700 }}>正解（TP）</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', background: '#fef2f2', color: '#991b1b' }}>見逃し（FN）</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', fontWeight: 700 }}>実際: 正常</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', background: '#fef2f2', color: '#991b1b' }}>誤検知（FP）</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', background: '#f0fdf4', color: '#166534', fontWeight: 700 }}>正解（TN）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
            if (part === '[[pca-vs-fa-table]]') return (
              <div key={key} style={{ overflowX: 'auto', margin: '1rem 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th style={{ background: 'var(--bg-warm)', padding: '0.6rem 0.75rem', border: '1px solid var(--border)', textAlign: 'left', fontWeight: 800 }}></th>
                      <th style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.6rem 0.75rem', border: '1px solid #bfdbfe', textAlign: 'center', fontWeight: 800 }}>主成分分析（PCA）</th>
                      <th style={{ background: '#fdf4ff', color: '#7e22ce', padding: '0.6rem 0.75rem', border: '1px solid #e9d5ff', textAlign: 'center', fontWeight: 800 }}>因子分析</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', fontWeight: 700 }}>目的</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', textAlign: 'center' }}>データの次元圧縮・要約</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', textAlign: 'center' }}>潜在因子の発見</td>
                    </tr>
                    <tr style={{ background: 'var(--bg-warm)' }}>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', fontWeight: 700 }}>方向性</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', textAlign: 'center' }}>観測変数 → 主成分</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', textAlign: 'center' }}>因子 → 観測変数（因果的解釈）</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', fontWeight: 700 }}>扱う分散</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', textAlign: 'center' }}>ノイズを含む「全分散」</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', textAlign: 'center' }}>共通性（共分散部分）だけ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
            if (part === '[[conjugate-table]]') return (
              <div key={key} style={{ overflowX: 'auto', margin: '1rem 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.6rem 0.75rem', border: '1px solid #bfdbfe', textAlign: 'left', fontWeight: 800 }}>尤度</th>
                      <th style={{ background: '#fdf4ff', color: '#7e22ce', padding: '0.6rem 0.75rem', border: '1px solid #e9d5ff', textAlign: 'left', fontWeight: 800 }}>共役事前分布</th>
                      <th style={{ background: '#f0fdf4', color: '#166534', padding: '0.6rem 0.75rem', border: '1px solid #bbf7d0', textAlign: 'left', fontWeight: 800 }}>事後分布</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)' }}>二項分布（成功/失敗）</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)' }}>ベータ分布</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', fontWeight: 700 }}>ベータ分布</td>
                    </tr>
                    <tr style={{ background: 'var(--bg-warm)' }}>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)' }}>ポアソン分布（回数）</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)' }}>ガンマ分布</td>
                      <td style={{ padding: '0.6rem 0.75rem', border: '1px solid var(--border)', fontWeight: 700 }}>ガンマ分布</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
            if (part === '[[regularization-card]]') return (
              <div key={key} className="reg-card-container">
                <div className="reg-side lasso">
                  <div className="reg-header"><Trash2 size={20}/> <strong>Lasso (L1)</strong></div>
                  <div className="reg-metaphor">「断捨離」</div>
                  <ul className="reg-list">
                    <li>不要な係数を **完全に 0** にする</li>
                    <li>**変数選択** の機能がある</li>
                    <li>スパースな解を得やすい</li>
                  </ul>
                </div>
                <div className="reg-side ridge">
                  <div className="reg-header"><Dumbbell size={20}/> <strong>Ridge (L2)</strong></div>
                  <div className="reg-metaphor">「シェイプアップ」</div>
                  <ul className="reg-list">
                    <li>係数を **全体的に縮小** する</li>
                    <li>完全に 0 にはならない</li>
                    <li>マルチコに強く安定する</li>
                  </ul>
                </div>
              </div>
            );
            if (part.startsWith('[[practical:')) {
              const titleMatch = part.match(/\[\[practical:(.*?)\]\]/);
              const contentMatch = part.match(/\]\]([\s\S]*?)\[\[\/practical\]\]/);
              if (titleMatch && contentMatch) return <div key={key} className="column-practical"><div className="column-title"><Lightbulb size={16} /> 実務Tips: {titleMatch[1]}</div><div style={{ fontSize: '0.85rem' }}>{parseInline(contentMatch[1])}</div></div>;
            }
            return <span key={key} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
          })}
        </>
      );
    }
    return parseInline(text);
  }, [updateModuleId]);

  const parseContent = useCallback((text: string): React.ReactNode => {
    if (!text) return null;
    const lines = text.split('\n');
    const result: React.ReactNode[] = [];
    let currentList: React.ReactNode[] = [];
    let currentOL: React.ReactNode[] = [];
    let tableLines: string[] = [];
    let h2Counter = 0;
    const flushList = (key: string) => {
      if (currentList.length > 0) {
        result.push(<ul key={`list-${key}`}>{currentList}</ul>);
        currentList = [];
      }
      if (currentOL.length > 0) {
        result.push(<ol key={`ol-${key}`}>{currentOL}</ol>);
        currentOL = [];
      }
    };
    const flushTable = (key: string) => {
      if (tableLines.length < 2) { tableLines = []; return; }
      const rows = tableLines.map(r =>
        r.split('|').slice(1, -1).map(cell => cell.trim())
      );
      const isSep = (r: string[]) => r.every(c => /^[-:]+$/.test(c));
      const headerRow = rows[0];
      const dataRows = rows.slice(1).filter(r => !isSep(r));
      result.push(
        <div key={`table-${key}`} className="content-table-wrap">
          <table className="content-table">
            <thead>
              <tr>{headerRow.map((cell, ci) => <th key={ci}>{parseInlineContent(cell)}</th>)}</tr>
            </thead>
            <tbody>
              {dataRows.map((row, ri) => (
                <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{parseInlineContent(cell)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableLines = [];
    };
    lines.forEach((line, lineIdx) => {
      const trimmedLine = line.trim();
      const key = `line-${lineIdx}`;
      if (trimmedLine.startsWith('|')) {
        flushList(key);
        tableLines.push(trimmedLine);
        return;
      }
      if (tableLines.length > 0) { flushTable(key); }
      if (trimmedLine.startsWith('#### ')) { flushList(key); result.push(<h4 key={key} className="content-h4">{parseInlineContent(trimmedLine.slice(5))}</h4>); return; }
      if (trimmedLine.startsWith('### ')) { flushList(key); result.push(<h3 key={key} className="content-h3">{parseInlineContent(trimmedLine.slice(4))}</h3>); return; }
      if (trimmedLine.startsWith('## ')) { flushList(key); const sectionId = `section-${h2Counter++}`; result.push(<h2 key={key} id={sectionId} className="content-h2">{parseInlineContent(trimmedLine.slice(3))}</h2>); return; }
      if (trimmedLine.startsWith('---')) { flushList(key); result.push(<hr key={key} className="content-hr" />); return; }
      if (trimmedLine.startsWith('- ')) { if (currentOL.length > 0) { result.push(<ol key={`ol-${key}`}>{currentOL}</ol>); currentOL = []; } currentList.push(<li key={`li-${lineIdx}`}>{parseInlineContent(trimmedLine.slice(2))}</li>); return; }
      const olMatch = trimmedLine.match(/^(\d+)\. (.*)$/);
      if (olMatch) { if (currentList.length > 0) { result.push(<ul key={`list-${key}`}>{currentList}</ul>); currentList = []; } currentOL.push(<li key={`oli-${lineIdx}`}>{parseInlineContent(olMatch[2])}</li>); return; }
      if (trimmedLine === '') { flushList(key); return; }
      flushList(key);
      // 💡 と 🎯 と ⚠️ で始まる行を視覚的なコールアウトに
      if (trimmedLine.startsWith('💡 ')) {
        result.push(<p key={key} className="content-p callout-tip">{parseInlineContent(trimmedLine.slice(2))}</p>);
        return;
      }
      if (trimmedLine.startsWith('🎯 ')) {
        result.push(<p key={key} className="content-p callout-target">{parseInlineContent(trimmedLine.slice(2))}</p>);
        return;
      }
      if (trimmedLine.startsWith('⚠️ ')) {
        result.push(<p key={key} className="content-p callout-warning">{parseInlineContent(trimmedLine.slice(3))}</p>);
        return;
      }
      result.push(<p key={key} className="content-p">{parseInlineContent(line)}</p>);
    });
    flushTable('final');
    flushList('final');
    return <>{result}</>;
  }, [parseInlineContent]);

  const filteredModules = useMemo(() => {
    const base = !searchQuery ? modules : modules.filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // 章順にソート（同一章内は配列の元順序を維持＝stable sort）
    return [...base].sort((a, b) => a.chapter - b.chapter);
  }, [searchQuery]);

  const activeModule = useMemo(() => modules.find(m => m.id === activeModuleId), [activeModuleId]);
  const nextModule = useMemo(() => {
    if (!activeModuleId) return null;
    const idx = modules.findIndex(m => m.id === activeModuleId);
    return idx >= 0 && idx < modules.length - 1 ? modules[idx + 1] : null;
  }, [activeModuleId]);
  const findModulesByTerm = useCallback((termId: string) => modules.filter(m => m.content.includes(`[[term:${termId}]]`)), []);

  // モジュール目次（h2 見出しを抽出）
  const tocItems = useMemo(() => {
    if (!activeModule) return [];
    const items: { id: string; text: string }[] = [];
    let counter = 0;
    for (const line of activeModule.content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
        items.push({
          id: `section-${counter++}`,
          text: trimmed.slice(3).replace(/\*\*/g, '').replace(/\$[^$]+\$/g, '').trim(),
        });
      }
    }
    return items;
  }, [activeModule]);

  // スクロール進捗とトップ戻るボタン
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (!activeModuleId) { setScrollProgress(0); setShowBackToTop(false); return; }
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 500);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeModuleId]);

  const completedCount = modules.filter(m => progress[m.id]).length;
  const totalModules = modules.length;

  return (
    <div className="container" style={{ maxWidth: activeModuleId ? '800px' : view === 'glossary' ? '1000px' : '800px' }}>
      <header className="header">
        <div className="brand" onClick={() => updateModuleId(null)}>
          <Sigma className="brand-icon" strokeWidth={1.5} />
          <h1 className="title">統計検定 準1級</h1>
        </div>
        <p className="subtitle">学習リファレンス</p>
      </header>

      {!activeModuleId && (
        <nav style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => switchView('dashboard')} className={`nav-tab ${view === 'dashboard' ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> ロードマップ
            {completedCount > 0 && <span className="nav-progress-badge">{completedCount}/{totalModules}</span>}
          </button>
          <button onClick={() => switchView('glossary')} className={`nav-tab ${view === 'glossary' ? 'active' : ''}`}>
            <Book size={18} /> 用語集
          </button>
          <button onClick={() => switchView('cheatsheet')} className={`nav-tab ${view === 'cheatsheet' ? 'active' : ''}`}>
            <FileText size={18} /> 公式集
          </button>
          <button onClick={startRandomQuiz} className={`nav-tab ${view === 'randomquiz' ? 'active' : ''}`}>
            <Shuffle size={18} /> 全範囲クイズ
          </button>
          <button onClick={() => switchView('guide')} className={`nav-tab ${view === 'guide' ? 'active' : ''}`}>
            <Target size={18} /> 試験ガイド
          </button>
          <button onClick={() => switchView('usecase')} className={`nav-tab ${view === 'usecase' ? 'active' : ''}`}>
            <Lightbulb size={18} /> 使い分けガイド
          </button>
          <button onClick={toggleTheme} className="nav-tab" title={theme === 'light' ? 'ダークモードに切替' : 'ライトモードに切替'} aria-label="テーマ切替">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </nav>
      )}

      <main>
        <AnimatePresence mode="wait">
          {activeModuleId ? (
            <motion.div key={activeModuleId} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
              <ModuleSidebar modules={modules} activeId={activeModuleId} onSelect={updateModuleId} chapterNames={chapterNames} chapterColors={chapterColors} />
              <button className="btn-back" onClick={() => updateModuleId(null)}><ChevronLeft size={18} /> 一覧に戻る</button>
              <div
                className="scroll-progress"
                style={{
                  width: `${scrollProgress}%`,
                  background: chapterColors[activeModule?.chapter ?? 1].accent,
                }}
              />
              <div
                className="card"
                style={{
                  borderTop: `4px solid ${chapterColors[activeModule?.chapter ?? 1].accent}`,
                  '--ch-accent': chapterColors[activeModule?.chapter ?? 1].accent,
                } as React.CSSProperties}
              >
                <span style={{
                  background: chapterColors[activeModule?.chapter ?? 1].bg,
                  color: chapterColors[activeModule?.chapter ?? 1].text,
                  fontSize: '0.6875rem', fontWeight: 700,
                  padding: '3px 10px', borderRadius: '9999px',
                  display: 'inline-block', marginBottom: '0.5rem',
                }}>Chapter {activeModule?.chapter}：{chapterNames[activeModule?.chapter ?? 1]}</span>
                <h2 style={{ marginTop: '0.5rem' }}>{parseContent(activeModule?.title || '')}</h2>
                {tocItems.length > 2 && (
                  <details className="module-toc" open>
                    <summary>
                      <ListOrdered size={14} />
                      このモジュールの目次（{tocItems.length}セクション）
                    </summary>
                    <ol>
                      {tocItems.map(item => (
                        <li key={item.id}>
                          <a href={`#${item.id}`}>{item.text}</a>
                        </li>
                      ))}
                    </ol>
                  </details>
                )}
                <div className="content-body">{activeModule && parseContent(activeModule.content)}</div>
                {activeModule?.keyFormulas && activeModule.keyFormulas.length > 0 && (
                  <div className="module-key-formulas">
                    <h3 className="module-key-formulas-title">
                      <span className="module-key-formulas-icon">🔑</span>
                      このモジュールの主要公式
                    </h3>
                    {activeModule.keyFormulas.map((kf, i) => (
                      <div key={i} className="module-key-formula-row">
                        <span className="module-key-formula-label">{kf.label}</span>
                        <div className="module-key-formula-math"><MathDisplay formula={kf.formula} /></div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="module-bottom-nav">
                  <button
                    className="btn-back-to-list"
                    onClick={() => updateModuleId(null)}
                  >
                    <ChevronLeft size={16} /> モジュール一覧へ
                  </button>
                  {nextModule && (
                    <button
                      className="btn-next-module"
                      onClick={() => updateModuleId(nextModule.id)}
                    >
                      次のモジュール：{nextModule.title} <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
              <button
                className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{ background: chapterColors[activeModule?.chapter ?? 1].accent }}
                aria-label="ページトップへ戻る"
              >
                <ChevronUp size={22} />
              </button>
              <div style={{ marginTop: '2rem' }}>
                <Quiz
                  key={activeModuleId}
                  questions={activeModule?.quiz || []}
                  onComplete={(score, total) => handleQuizComplete(activeModuleId, score, total)}
                  renderContent={parseContent}
                />
              </div>
              {quizCompleted && (
                <div style={{ marginTop: '1rem' }}>
                  {activeModuleId && progress[activeModuleId] && (
                    <div className="score-banner">
                      {progress[activeModuleId].score} / {progress[activeModuleId].total} 問正解
                      {progress[activeModuleId].score === progress[activeModuleId].total && ' 🎉 パーフェクト！'}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                    <button className="btn" onClick={() => updateModuleId(null)} style={{ flex: 1, background: 'var(--bg-warm)', color: 'var(--text)', border: '1px solid var(--border)' }}>
                      <ChevronLeft size={16} /> 一覧に戻る
                    </button>
                    {nextModule && (
                      <button className="btn" onClick={() => updateModuleId(nextModule.id)} style={{ flex: 2 }}>
                        次のモジュールへ：{nextModule.title} <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ) : view === 'randomquiz' ? (
            <motion.div key="rq" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <button className="btn-back" onClick={() => switchView('dashboard')}><ChevronLeft size={18} /> 一覧に戻る</button>
              {rqDone ? (
                /* Results screen */
                <div>
                  <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)' }}>
                      {rqResults.filter(r => r.correct).length} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ {rqResults.length} 問正解</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>全範囲クイズ完了</p>
                  </div>
                  {/* Breakdown by module */}
                  {(() => {
                    const byModule: Record<string, { title: string; correct: number; total: number }> = {};
                    rqResults.forEach(r => {
                      if (!byModule[r.moduleId]) byModule[r.moduleId] = { title: r.moduleTitle, correct: 0, total: 0 };
                      byModule[r.moduleId].total++;
                      if (r.correct) byModule[r.moduleId].correct++;
                    });
                    const weak = Object.entries(byModule).filter(([, v]) => v.correct < v.total);
                    return (
                      <div className="card">
                        <h3 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>モジュール別結果</h3>
                        {Object.entries(byModule).map(([id, v]) => (
                          <div key={id} className="rq-result-row">
                            <span className={`rq-result-dot ${v.correct === v.total ? 'ok' : 'ng'}`} />
                            <span style={{ flex: 1, fontSize: '0.85rem' }}>{v.title}</span>
                            <span style={{ fontSize: '0.8rem', color: v.correct === v.total ? '#16a34a' : '#dc2626', fontWeight: 700 }}>{v.correct}/{v.total}</span>
                          </div>
                        ))}
                        {weak.length > 0 && (
                          <div style={{ marginTop: '1.25rem' }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', margin: '0 0 0.5rem' }}>復習が必要なモジュール：</p>
                            <div className="links-row">
                              {weak.map(([id, v]) => (
                                <button key={id} className="btn-link" onClick={() => updateModuleId(id)}>
                                  {v.title} <ArrowRight size={12} />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                  <button className="btn" onClick={startRandomQuiz} style={{ marginTop: '0.5rem' }}>
                    <Shuffle size={16} /> もう一度
                  </button>
                </div>
              ) : rqQuestions.length > 0 ? (
                /* Quiz screen */
                <div className="card" style={{ border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>全範囲クイズ</h3>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>{rqQuestions[rqIdx].moduleTitle}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {rqIdx + 1} / {rqQuestions.length}
                    </span>
                  </div>
                  <div style={{ marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 600, lineHeight: 1.6 }}>
                    {parseContent(rqQuestions[rqIdx].q.question)}
                  </div>
                  <div className="quiz-options">
                    {rqQuestions[rqIdx].q.options.map((opt, i) => (
                      <button
                        key={`rq-${rqIdx}-${i}`}
                        className="btn"
                        style={{
                          background: rqSelected === i ? (i === rqQuestions[rqIdx].q.correctAnswer ? '#22c55e' : '#ef4444') : 'var(--card-bg)',
                          color: rqSelected === i ? 'white' : 'var(--text)',
                          justifyContent: 'space-between',
                          border: rqSelected === i ? 'none' : '1px solid var(--border)',
                          textAlign: 'left',
                          padding: '0.75rem 1rem',
                          boxShadow: 'none',
                          fontWeight: 500,
                          fontSize: '0.9rem',
                        }}
                        onClick={() => rqHandleSelect(i)}
                      >
                        <div style={{ flex: 1 }}>{parseContent(opt)}</div>
                        {rqSelected === i && (i === rqQuestions[rqIdx].q.correctAnswer ? <CheckCircle2 size={18} /> : <XCircle size={18} />)}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {rqSelected !== null && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-warm)', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                        <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.6 }}>
                          <strong style={{ color: rqIsCorrect ? '#22c55e' : '#ef4444' }}>{rqIsCorrect ? '正解！' : '不正解...'}</strong><br />
                          {parseContent(rqQuestions[rqIdx].q.explanation)}
                        </p>
                        <button className="btn" style={{ marginTop: '1rem', width: 'auto', padding: '0.5rem 1rem' }} onClick={rqNext}>
                          {rqIdx + 1 < rqQuestions.length ? '次の問題へ' : '結果を見る'} <ArrowRight size={16} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : null}
            </motion.div>
          ) : view === 'cheatsheet' ? (
            <motion.div key="cs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ margin: '0 0 0.25rem', fontSize: '1.25rem', fontWeight: 800 }}>公式集</h2>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>試験直前の確認用。各モジュールの重要公式をまとめました。</p>
              </div>
              {[1, 2, 3].map(ch => (
                <div key={ch}>
                  <div className="chapter-header">
                    <span className="badge-chapter" style={{ fontSize: '0.7rem' }}>Chapter {ch}</span>
                    <h3 className="content-h3" style={{ margin: '0.25rem 0 0' }}>{chapterNames[ch]}</h3>
                  </div>
                  {modules.filter(m => m.chapter === ch && m.keyFormulas && m.keyFormulas.length > 0).map(m => (
                    <div key={m.id} className="card cs-module-card" onClick={() => updateModuleId(m.id)} style={{ cursor: 'pointer' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>{m.title}</h4>
                        {progress[m.id] && (
                          <span className="progress-badge-small">
                            {progress[m.id].score}/{progress[m.id].total}点
                          </span>
                        )}
                      </div>
                      <div className="cs-formulas">
                        {m.keyFormulas!.map((kf, i) => (
                          <div key={i} className="cs-formula-row">
                            <span className="cs-label">{kf.label}</span>
                            <div className="cs-formula"><MathDisplay formula={kf.formula} /></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          ) : view === 'dashboard' ? (
            <motion.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <DistributionSelector onSelect={updateModuleId} />
              <div className="search-container">
                <div className="search-input-wrapper">
                  <SearchIcon size={18} className="search-icon" />
                  <input type="text" placeholder="トピックを検索..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
                  {searchQuery && <button onClick={() => setSearchQuery('')} className="search-clear"><X size={16} /></button>}
                </div>
              </div>
              <div className="roadmap-grid">
                {filteredModules.reduce<React.ReactNode[]>((acc, m, idx) => {
                  const prev = filteredModules[idx - 1];
                  const cc = chapterColors[m.chapter] ?? chapterColors[1];
                  if (!prev || prev.chapter !== m.chapter) {
                    if (prev) acc.push(<div key={`ch-end-${prev.chapter}`} style={{ marginBottom: '1.5rem' }} />);
                    const chMods = modules.filter(x => x.chapter === m.chapter);
                    const chDone = chMods.filter(x => progress[x.id]).length;
                    acc.push(
                      <div key={`ch-${m.chapter}`} className="chapter-header"
                        style={{
                          '--ch-accent': cc.accent,
                          '--ch-bg': cc.bg,
                        } as React.CSSProperties}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{
                            background: cc.accent, color: '#fff',
                            fontSize: '0.65rem', fontWeight: 700,
                            padding: '2px 8px', borderRadius: '9999px', letterSpacing: '0.05em',
                          }}>Chapter {m.chapter}</span>
                          <span style={{ fontSize: '0.7rem', color: cc.text, fontWeight: 600 }}>
                            {chDone}/{chMods.length}モジュール
                          </span>
                        </div>
                        <h3 style={{
                          margin: '0.35rem 0 0', fontSize: '1.05rem', fontWeight: 800,
                          color: cc.text, letterSpacing: '-0.2px',
                        }}>{chapterNames[m.chapter]}</h3>
                      </div>
                    );
                  }
                  const p = progress[m.id];
                  const hasGraph = m.content.includes('[[interactive:');
                  // 文字数から学習時間を概算（日本語600文字/分）
                  const charCount = m.content.length;
                  const readMin = Math.max(5, Math.round(charCount / 600));
                  acc.push(
                    <div key={m.id} className="card-module" onClick={() => updateModuleId(m.id)}
                      style={{
                        '--ch-accent': cc.accent,
                        '--ch-light': cc.light,
                        borderRadius: idx === filteredModules.length - 1 || filteredModules[idx + 1]?.chapter !== m.chapter
                          ? '0 0 var(--radius-card) var(--radius-card)' : '0',
                        marginBottom: 0,
                        borderTop: 'none',
                      } as React.CSSProperties}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                          <span style={{
                            background: cc.bg, color: cc.text,
                            fontSize: '0.6875rem', fontWeight: 600,
                            padding: '2px 8px', borderRadius: '9999px',
                          }}>Ch{m.chapter}</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>約{readMin}分</span>
                          {hasGraph && (
                            <span title="インタラクティブグラフあり" style={{ fontSize: '0.7rem' }} aria-label="グラフ">📊</span>
                          )}
                          {m.keyFormulas && m.keyFormulas.length > 0 && (
                            <span title="主要公式あり" style={{ fontSize: '0.7rem' }} aria-label="公式">🔑</span>
                          )}
                        </div>
                        {p && (
                          <span className={`progress-badge ${p.score === p.total ? 'perfect' : ''}`}>
                            {p.score === p.total ? '✓ ' : ''}{p.score}/{p.total}点
                          </span>
                        )}
                      </div>
                      <h4 style={{ margin: '0.4rem 0 0.2rem', fontSize: '0.95rem' }}>{parseContent(m.title)}</h4>
                      <div className="module-desc">{parseContent(m.description)}</div>
                    </div>
                  );
                  return acc;
                }, [])}
              </div>
            </motion.div>
          ) : view === 'about' ? (
            <motion.div key="about" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="privacy-page">
                <h2>サイトについて</h2>

                <section>
                  <h3>このサイトについて</h3>
                  <p>「統計検定 準1級 学習リファレンス」は、統計検定準1級の合格を目指す方のために作られた、個人運営の学習支援サイトです。</p>
                  <p>数学的な素養が中学〜高校レベルの方でも理解できるよう、概念の直感的な説明・インタラクティブなグラフ・確認クイズを提供しています。</p>
                  <p className="privacy-disclaimer">⚠️ 本サイトは個人による学習支援サイトであり、統計質保証推進協会および日本統計学会の公式サイトではありません。掲載内容は個人の見解に基づくものであり、公式の情報を保証するものではありません。試験の最新情報・申込方法・合否については、必ず公式サイトをご確認ください。</p>
                </section>

                <section>
                  <h3>コンテンツ構成</h3>
                  <ul>
                    <li><strong>学習モジュール（全{totalModules}モジュール）</strong>：確率分布・推定・検定・多変量解析・ベイズ統計・時系列分析など</li>
                    <li><strong>用語集</strong>：準1級頻出用語の解説</li>
                    <li><strong>公式集</strong>：重要公式の一覧（印刷対応）</li>
                    <li><strong>全範囲クイズ</strong>：全モジュールからランダム出題</li>
                  </ul>
                </section>

                <section>
                  <h3>編集・制作方針</h3>
                  <p>本サイトのコンテンツは、統計検定の公式の出題範囲（試験要項）や、一般に流通している統計学の教科書・専門書を参照しつつ、運営者が内容を一から再構成し、初学者がつまずきやすい点を補う形で独自に解説しています。他サイトの文章をそのまま転載することはありません。</p>
                  <p>図解・インタラクティブなグラフ・確認クイズは、すべて本サイト向けに独自に制作したものです。内容の誤りや古くなった情報に気づいた場合は、お問い合わせを受けて随時見直し・修正します。</p>
                </section>

                <section>
                  <h3>運営者について</h3>
                  <p>本サイトは、統計学の学習を個人的に進める中で、同じように学んでいる方の助けになればと思い作成・公開しています。</p>
                  <p>お問い合わせは<a href="https://forms.gle/ccMv7oKwz6ysDHBe6" target="_blank" rel="noopener noreferrer">こちらのGoogleフォーム</a>からお願いします。</p>
                </section>

                <section>
                  <h3>免責事項</h3>
                  <p>本サイトの解説・問題・公式は学習目的で作成されており、内容の正確性・完全性を保証するものではありません。本サイトの情報を利用したことによるいかなる損害についても、運営者は責任を負いかねます。また、本サイトは統計検定への合格を保証するものではありません。</p>
                </section>
              </div>
            </motion.div>
          ) : view === 'guide' ? (
            <motion.div key="guide" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <ExamGuide />
            </motion.div>
          ) : view === 'usecase' ? (
            <motion.div key="usecase" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div dangerouslySetInnerHTML={{ __html: buildUsecaseHtml(window.location.pathname.startsWith('/stats-pre1/') ? '/stats-pre1' : '') }} />
            </motion.div>
          ) : view === 'privacy' ? (
            <motion.div key="privacy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="privacy-page">
                <h2>プライバシーポリシー</h2>
                <p className="privacy-updated">最終更新：2025年4月</p>

                <section>
                  <h3>1. サイトについて</h3>
                  <p>本サイト「統計検定 準1級 学習リファレンス」は、統計検定準1級の学習を支援することを目的とした個人運営のサイトです。</p>
                  <p className="privacy-disclaimer">⚠️ 本サイトは個人による学習支援サイトであり、統計質保証推進協会および日本統計学会の公式サイトではありません。掲載内容は個人の見解に基づくものであり、公式の情報を保証するものではありません。試験の出題範囲・申込方法・合否については、必ず公式サイトをご確認ください。</p>
                </section>

                <section>
                  <h3>2. Google Analytics の利用について</h3>
                  <p>本サイトでは、アクセス状況を把握するために <strong>Google Analytics</strong>（Google LLC 提供）を使用しています。</p>
                  <p><strong>送信される情報の例：</strong>閲覧したページのURL・滞在時間・使用デバイス・おおまかな地域情報（IPアドレスから推定）など。これらの情報はCookieを通じてGoogleのサーバーに送信されます。個人を特定する情報は収集しません。</p>
                  <p><strong>利用目的：</strong>コンテンツ改善のためのアクセス分析</p>
                  <p><strong>オプトアウト：</strong><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google アナリティクス オプトアウト アドオン</a>をインストールすることで、データ送信を無効にできます。</p>
                  <p>Googleのプライバシーポリシーは<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">こちら</a>をご参照ください。</p>
                </section>

                <section>
                  <h3>3. Google AdSense の利用について</h3>
                  <p>本サイトでは、広告配信のために <strong>Google AdSense</strong>（Google LLC 提供）を使用しています。</p>
                  <p><strong>送信される情報の例：</strong>閲覧履歴・Cookieに保存された識別情報など。これらは広告のパーソナライズ（行動ターゲティング）に使用されます。</p>
                  <p><strong>利用目的：</strong>サイト運営費用の確保</p>
                  <p><strong>オプトアウト：</strong><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">広告設定ページ</a>でパーソナライズ広告を無効にできます。また、<a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance</a> のオプトアウトツールもご利用いただけます。</p>
                </section>

                <section>
                  <h3>4. Cookieについて</h3>
                  <p>本サイトでは、Google Analytics および Google AdSense の機能提供のためにCookieを使用しています。ブラウザの設定からCookieを無効にすることができますが、一部機能が正常に動作しない場合があります。</p>
                </section>

                <section>
                  <h3>5. 学習進捗データについて</h3>
                  <p>クイズの得点・完了状況は、お使いのブラウザの <strong>ローカルストレージ</strong> にのみ保存されます。このデータは外部サーバーへ送信されることはなく、運営者も閲覧できません。ブラウザのデータ削除により消去されます。</p>
                </section>

                <section>
                  <h3>6. コンテンツの免責事項</h3>
                  <p>本サイトの解説・問題・公式は学習目的で作成されており、内容の正確性を保証するものではありません。本サイトの情報を利用したことによるいかなる損害についても、運営者は責任を負いかねます。また、本サイトは統計検定への合格を保証するものではありません。</p>
                </section>

                <section>
                  <h3>7. 本ポリシーの変更</h3>
                  <p>本ポリシーは予告なく変更される場合があります。変更後のポリシーはこのページへの掲載をもって効力を生じます。</p>
                </section>
              </div>
            </motion.div>
          ) : (
            /* Glossary view */
            <motion.div key="glos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="search-container" style={{ marginBottom: '2rem' }}>
                <div className="search-input-wrapper">
                  <SearchIcon size={18} className="search-icon" />
                  <input type="text" placeholder="用語を検索..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
                  {searchQuery && <button onClick={() => setSearchQuery('')} className="search-clear"><X size={16} /></button>}
                </div>
              </div>
              <div className="glossary-grid">
                {Object.values(glossary)
                  .filter(term => !searchQuery || term.term.toLowerCase().includes(searchQuery.toLowerCase()) || term.explanation.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(term => {
                    const relatedModules = findModulesByTerm(term.id);
                    return (
                      <div key={term.id} id={`glossary-${term.id}`} className="card-glossary">
                        <div className="glossary-header">
                          <h4>{parseContent(term.term)}</h4>
                          <span className={`badge-level ${{ '基礎': 'basic', '中級': 'intermediate', '上級': 'advanced' }[term.level] ?? 'basic'}`}>{term.level}</span>
                        </div>
                        <div className="glossary-explanation">{parseContent(term.explanation)}</div>
                        {term.formula && (
                          <div className="glossary-formula">
                            <MathDisplay formula={term.formula} />
                          </div>
                        )}
                        {term.relatedTerms && term.relatedTerms.length > 0 && (
                          <div className="related-links">
                            <p className="label-related">関連用語：</p>
                            <div className="links-row">
                              {term.relatedTerms.map(rtId => glossary[rtId] && (
                                <button key={rtId} className="btn-link" onClick={() => {
                                  const el = document.getElementById(`glossary-${rtId}`);
                                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }}>
                                  {glossary[rtId].term} <ArrowRight size={12} />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {relatedModules.length > 0 && (
                          <div className="related-links">
                            <p className="label-related">解説ページ：</p>
                            <div className="links-row">
                              {relatedModules.map(m => (
                                <button key={m.id} className="btn-link" onClick={() => updateModuleId(m.id)}>
                                  {parseContent(m.title)} <ArrowRight size={12} />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="site-footer">
        <p className="footer-disclaimer">
          本サイトは個人による学習支援サイトであり、統計質保証推進協会および日本統計学会の公式サイトではありません。掲載内容は個人の見解に基づくものであり、公式の情報を保証するものではありません。
        </p>
        <div className="footer-links">
          <button className="footer-link" onClick={() => switchView('about')}>サイトについて</button>
          <button className="footer-link" onClick={() => switchView('privacy')}>プライバシーポリシー</button>
          <a className="footer-link" href="https://forms.gle/ccMv7oKwz6ysDHBe6" target="_blank" rel="noopener noreferrer">お問い合わせ</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} 統計検定 準1級 学習リファレンス</p>
      </footer>
    </div>
  );
}

export default App;
