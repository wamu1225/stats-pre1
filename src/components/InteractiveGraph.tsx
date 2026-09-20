// stats-app/src/components/InteractiveGraph.tsx
import React, { useState, useMemo } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  Line,
  ComposedChart,
  Area,
  Bar,
} from 'recharts';
import { motion } from 'framer-motion';
import { normalPDF, tPDF, chi2PDF, fPDF } from '../utils/math';
import { BarChart3 } from 'lucide-react';

interface Props {
  type: 'normal' | 't' | 'chi2' | 'f' | 'pca' | 'regression' | 'logistic' | 'mcmc' | 'gibbs' | 'update' | 'overfit' | 'outlier' | 'multico' | 'skewkurt';
  renderContent?: (text: string) => React.ReactNode;
}

const typeToTitle: Record<string, string> = {
  normal: '中心極限定理：正規分布への収束',
  t: 't分布：サンプルサイズと裾の厚さ',
  chi2: 'χ²分布：自由度による形状の変化',
  f: 'F分布：2つの分散の比較',
  pca: '主成分分析：情報の集約',
  outlier: '判別分析：グループ境界の決まり方',
  mcmc: 'MCMC：サンプリングで分布を近似する',
  update: 'ベイズ更新：確信度の変化',
  overfit: '過学習：モデルの複雑さと汎化性能',
  multico: '多重共線性：不安定な係数',
  skewkurt: '歪度と尖度：分布の形を読む'
};

// 固定シードの疑似乱数（mulberry32）。スライダーを動かすたびに点群が
// 総入れ替えになると「動かして観察する」体験にならないため、独立な
// 標準正規乱数だけを一度生成し、相関係数はその上への線形変換で表現する。
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function standardNormalPairs(count: number, seed: number): { z1: number; z2: number }[] {
  const rand = mulberry32(seed);
  const out: { z1: number; z2: number }[] = [];
  for (let i = 0; i < count; i++) {
    // Box-Muller
    const u1 = Math.max(rand(), 1e-9);
    const u2 = rand();
    const r = Math.sqrt(-2 * Math.log(u1));
    out.push({ z1: r * Math.cos(2 * Math.PI * u2), z2: r * Math.sin(2 * Math.PI * u2) });
  }
  return out;
}

// MCMC実演用の目標分布（双峰）とメトロポリス法サンプラー。
// 乱数列は固定シードで一度だけ生成し、スライダーは「先頭から何個使うか」を
// 動かすだけにする＝サンプルが増えるほどヒストグラムが目標分布に近づく様子を
// 滑らかに観察できる（毎回再サンプリングすると軌跡が飛んで比較にならない）。
function mcmcTarget(x: number): number {
  return 0.5 * normalPDF(x, -2, 0.7) + 0.5 * normalPDF(x, 2, 0.7);
}
function runMetropolis(steps: number, seed: number): number[] {
  const rand = mulberry32(seed);
  let x = 0;
  const samples: number[] = [];
  for (let i = 0; i < steps; i++) {
    const u1 = Math.max(rand(), 1e-9);
    const u2 = rand();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const xProp = x + z * 1.2;
    const accept = Math.min(1, mcmcTarget(xProp) / Math.max(mcmcTarget(x), 1e-12));
    if (rand() < accept) x = xProp;
    samples.push(x);
  }
  return samples;
}

export const InteractiveGraph: React.FC<Props> = ({ type }) => {
  const title = typeToTitle[type] || '統計シミュレーター';
  const [n, setN] = useState(5);
  const [df, setDf] = useState(5);
  const [degree, setDegree] = useState(1);
  const [corr, setCorr] = useState(0.9);
  const [pcaCorr, setPcaCorr] = useState(0.8);
  const [ldaCorr, setLdaCorr] = useState(0);
  const [mcmcN, setMcmcN] = useState(50);
  const basePairs = useMemo(() => standardNormalPairs(60, 42), []);
  const mcmcSamples = useMemo(() => runMetropolis(1500, 123), []);
  const ldaBasePairs = useMemo(
    () => ({ g1: standardNormalPairs(30, 7), g2: standardNormalPairs(30, 99) }),
    [],
  );

  // Data generation for charts
  const chartData = useMemo(() => {
    const data = [];
    if (type === 'normal') {
      // CLT visualization using Gamma distribution (exact sum of n Exp(1) variables).
      // Exp(1) has mean=1, var=1 and skewness=2 — visibly skewed at small n, converging
      // to N(0,1) around n=10~30, which matches the explanatory text.
      // Z = (X - n) / sqrt(n) standardizes Gamma(n,1) to mean=0, var=1.
      // f_Z(z) = gammaPDF(z*sqrt(n) + n, n) * sqrt(n)
      // gammaPDF computed in log-space to avoid factorial overflow.
      const sqrtN = Math.sqrt(n);

      const gammaPDF = (x: number, k: number): number => {
        if (x <= 0) return 0;
        let logFactKm1 = 0;
        for (let i = 2; i <= k - 1; i++) logFactKm1 += Math.log(i);
        return Math.exp((k - 1) * Math.log(x) - x - logFactKm1);
      };

      for (let z = -4; z <= 4; z += 0.05) {
        const s = z * sqrtN + n;
        // For n>25, Gamma(n,1) standardized is visually indistinguishable from N(0,1)
        const density = n <= 25
          ? gammaPDF(s, n) * sqrtN
          : normalPDF(z, 0, 1);
        data.push({ x: z.toFixed(2), y: Math.max(0, density), ref: normalPDF(z, 0, 1) });
      }
    } else if (type === 't') {
      for (let x = -4; x <= 4; x += 0.1) {
        data.push({ x: x.toFixed(1), y: tPDF(x, df), normal: normalPDF(x, 0, 1) });
      }
    } else if (type === 'chi2') {
      for (let x = 0; x <= 20; x += 0.2) {
        data.push({ x: x.toFixed(1), y: chi2PDF(x, df) });
      }
    } else if (type === 'f') {
      for (let x = 0; x <= 5; x += 0.1) {
        data.push({ x: x.toFixed(1), y: fPDF(x, 5, df) });
      }
    } else if (type === 'update') {
      // Simple Bayesian Update Visualization
      const pMean = 0, pStd = 1.0;
      const dMean = 1.5, dStd = 0.5;
      const postVar = 1 / (1/(pStd**2) + n/(dStd**2));
      const postMean = postVar * (pMean/(pStd**2) + (n * dMean)/(dStd**2));
      const postStd = Math.sqrt(postVar);
      for (let x = -4; x <= 4; x += 0.1) {
        data.push({ x: x.toFixed(1), prior: normalPDF(x, pMean, pStd), posterior: normalPDF(x, postMean, postStd) });
      }
    } else if (type === 'skewkurt') {
      const skewData: { x: string; sym: number; right: number; left: number }[] = [];
      const kurtData: { x: string; normal: number; fat: number }[] = [];
      for (let x = -4; x <= 5; x += 0.12) {
        const rU = x + 1;
        const lU = 1 - x;
        const right = rU > 0 ? rU * Math.exp(-rU) * Math.E : 0;
        const left = lU > 0 ? lU * Math.exp(-lU) * Math.E : 0;
        const sym = normalPDF(x, 0, 1.4) * 1.4 * Math.sqrt(2 * Math.PI);
        skewData.push({ x: x.toFixed(1), sym, right, left });
      }
      for (let x = -5; x <= 5; x += 0.12) {
        const normalY = Math.exp(-x * x / 2);           // 正規分布（尖度3）、ピーク=1に正規化
        const laplaceY = Math.exp(-Math.abs(x) / 1.2);  // ラプラス分布（尖度6）、ピーク=1に正規化
        kurtData.push({ x: x.toFixed(1), normal: normalY, fat: laplaceY });
      }
      return { skewData, kurtData };
    } else if (type === 'overfit') {
      const basePoints = [{ x: -3, y: -2 }, { x: -1, y: -0.5 }, { x: 0, y: 0.2 }, { x: 1, y: 0.8 }, { x: 3, y: 2.5 }];
      const line = [];
      for (let x = -4; x <= 4; x += 0.2) {
        let y = 0;
        if (degree === 1) y = 0.7 * x;
        else if (degree === 2) y = 0.1 * x * x + 0.7 * x;
        else y = 0.05 * Math.pow(x, 5) - 0.1 * Math.pow(x, 3) + 0.7 * x + Math.sin(x * 3) * 0.5;
        line.push({ x, y });
      }
      return { line, dots: basePoints };
    } else if (type === 'pca') {
      // 分散1の標準化済み2変数（相関 pcaCorr）。共分散行列 [[1,ρ],[ρ,1]] の固有ベクトルは
      // 常に (1,1)/√2 と (1,-1)/√2、固有値は 1+ρ と 1-ρ（ρ≥0の場合、第1主成分は(1,1)方向）。
      const rho = pcaCorr;
      const points = basePairs.map(({ z1, z2 }) => ({
        x: z1,
        y: rho * z1 + Math.sqrt(1 - rho * rho) * z2,
      }));
      const dir = { x: Math.SQRT1_2, y: Math.SQRT1_2 }; // 第1主成分の方向（ρ≥0）
      const span = 2.8;
      const axis = [
        { x: -span * dir.x, y: -span * dir.y },
        { x: span * dir.x, y: span * dir.y },
      ];
      const contribution = (1 + rho) / 2;
      return { points, axis, contribution };
    } else if (type === 'outlier') {
      // 判別分析：等分散2群 Σ=[[1,ρ],[ρ,1]]、平均差 μ1-μ2=(-2sep,0) のとき、
      // フィッシャーの判別方向は w ∝ Σ^-1(μ1-μ2) ∝ (1, -ρ)。境界（wに直交）は方向 (ρ, 1) を通る。
      const rho = ldaCorr;
      const sep = 1.4;
      const transform = (z1: number, z2: number, cx: number) => ({
        x: cx + z1,
        y: rho * z1 + Math.sqrt(1 - rho * rho) * z2,
      });
      const group1 = ldaBasePairs.g1.map(({ z1, z2 }) => transform(z1, z2, -sep));
      const group2 = ldaBasePairs.g2.map(({ z1, z2 }) => transform(z1, z2, sep));
      const span = 3.2;
      const bLen = Math.sqrt(rho * rho + 1);
      const boundary = [
        { x: -span * (rho / bLen), y: -span * (1 / bLen) },
        { x: span * (rho / bLen), y: span * (1 / bLen) },
      ];
      return { group1, group2, boundary };
    } else if (type === 'mcmc') {
      const used = mcmcSamples.slice(0, mcmcN);
      const binWidth = 0.5;
      const min = -5, max = 5;
      const binCount = Math.round((max - min) / binWidth);
      const counts = new Array(binCount).fill(0);
      for (const s of used) {
        const idx = Math.min(binCount - 1, Math.max(0, Math.floor((s - min) / binWidth)));
        counts[idx]++;
      }
      const hist = counts.map((c, i) => {
        const x = min + (i + 0.5) * binWidth;
        return { x, density: c / (used.length * binWidth), target: mcmcTarget(x) };
      });
      return { hist };
    }
    return data;
  }, [type, n, df, degree, pcaCorr, basePairs, ldaCorr, ldaBasePairs, mcmcN, mcmcSamples]);

  const renderChart = () => {
    if (type === 'overfit') {
      const { line, dots } = chartData as { line: { x: number; y: number }[], dots: { x: number; y: number }[] };
      const aic = degree === 1 ? 45 : degree === 2 ? 42 : 88;
      return (
        <div style={{ position: 'relative' }}>
          <div className="stat-badge" style={{ position: 'absolute', top: -10, right: 0, zIndex: 10, background: aic > 50 ? '#ef4444' : '#22c55e', color: 'white' }}>
            AIC: {aic} ({aic > 50 ? '過学習' : '良好'})
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={line} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="x" hide />
              <YAxis domain={[-4, 4]} hide />
              <Line type="monotone" dataKey="y" stroke="var(--primary)" strokeWidth={3} dot={false} isAnimationActive={false} />
              <Scatter data={dots} fill="#1e293b" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (type === 'pca') {
      const { points, axis, contribution } = chartData as { points: { x: number; y: number }[]; axis: { x: number; y: number }[]; contribution: number };
      return (
        <div style={{ position: 'relative' }}>
          <div className="stat-badge" style={{ position: 'absolute', top: -10, right: 0, zIndex: 10, background: 'var(--primary)', color: 'white' }}>
            第1主成分の寄与率: {(contribution * 100).toFixed(0)}%
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" domain={[-3, 3]} hide />
              <YAxis type="number" dataKey="y" domain={[-3, 3]} hide />
              <Scatter data={points} dataKey="y" fill="var(--primary)" fillOpacity={0.55} isAnimationActive={false} />
              <Line data={axis} dataKey="y" stroke="#ef4444" strokeWidth={2.5} dot={false} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', fontSize: '0.68rem', color: '#94a3b8', marginTop: 2 }}>
            赤線: 第1主成分の方向。相関を強めるとデータが赤線上に集中し、寄与率が上がります。
          </div>
        </div>
      );
    }

    if (type === 'outlier') {
      const { group1, group2, boundary } = chartData as { group1: { x: number; y: number }[]; group2: { x: number; y: number }[]; boundary: { x: number; y: number }[] };
      return (
        <div>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" domain={[-4, 4]} hide />
              <YAxis type="number" dataKey="y" domain={[-3, 3]} hide />
              <Scatter data={group1} dataKey="y" fill="#3b82f6" fillOpacity={0.6} isAnimationActive={false} />
              <Scatter data={group2} dataKey="y" fill="#f59e0b" fillOpacity={0.6} isAnimationActive={false} />
              <Line data={boundary} dataKey="y" stroke="#1e293b" strokeWidth={2.5} strokeDasharray="6 3" dot={false} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', fontSize: '0.68rem', color: '#94a3b8', marginTop: 2 }}>
            破線: 判別境界。2群の分散共分散が同じでも、変数間の相関が変わると境界の傾きが変わります。
          </div>
        </div>
      );
    }

    if (type === 'mcmc') {
      const { hist } = chartData as { hist: { x: number; density: number; target: number }[] };
      return (
        <div>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={hist} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="x" hide />
              <YAxis hide />
              <Bar dataKey="density" fill="var(--primary)" fillOpacity={0.5} isAnimationActive={false} />
              <Line dataKey="target" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', fontSize: '0.68rem', color: '#94a3b8', marginTop: 2 }}>
            赤線: 目標分布（双峰）。棒: これまでに生成したサンプルのヒストグラム。サンプル数を増やすと棒が赤線に近づきます。
          </div>
        </div>
      );
    }

    if (type === 'multico') {
      const instability = corr > 0.95 ? (corr - 0.95) * 100 : 0;
      return (
        <div style={{ height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-warm)', borderRadius: '12px' }}>
          <div className="stat-badge" style={{ marginBottom: '1rem', background: corr > 0.9 ? '#ef4444' : '#22c55e', color: 'white' }}>
            VIF: {(1 / (1 - corr * corr)).toFixed(1)}
          </div>
          <motion.div
            animate={{ rotateX: 45, rotateZ: instability * 10 }}
            style={{ width: 80, height: 80, background: 'var(--primary)', opacity: 0.6, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 800 }}
          >
            回帰平面
          </motion.div>
          <div style={{ fontSize: '0.75rem', marginTop: '1rem', color: '#64748b' }}>相関が高いと推定量が不安定になります</div>
        </div>
      );
    }

    if (type === 'normal') {
      const chartD = chartData as { x: string; y: number; ref: number }[];
      return (
        <div>
          <ResponsiveContainer width="100%" height={190}>
            <ComposedChart data={chartD} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="x" hide />
              <YAxis hide />
              <Area type="monotone" dataKey="y" fill="var(--primary)" stroke="var(--primary)" fillOpacity={0.3} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="ref" stroke="#94a3b8" strokeDasharray="5 5" dot={false} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', fontSize: '0.68rem', color: '#94a3b8', marginTop: 2 }}>
            点線: N(0,1)（収束の目標）。n を増やすと青い分布が近づく様子が分かります。
          </div>
        </div>
      );
    }

    if (type === 'skewkurt') {
      const { skewData, kurtData } = chartData as { skewData: { x: string; sym: number; right: number; left: number }[], kurtData: { x: string; normal: number; fat: number }[] };
      const skewRows: { key: 'left' | 'sym' | 'right'; label: string; example: string; color: string }[] = [
        { key: 'left',  label: '左に裾（歪度マイナス）', example: '例：簡単な試験の点数分布',  color: '#ef4444' },
        { key: 'sym',   label: '対称（歪度ゼロ）',       example: '例：身長・体重など',         color: '#22c55e' },
        { key: 'right', label: '右に裾（歪度プラス）',   example: '例：年収分布',               color: '#3b82f6' },
      ];
      const kurtRows: { key: 'normal' | 'fat'; label: string; example: string; color: string }[] = [
        { key: 'normal', label: '正規分布（尖度3・基準）',      example: '裾が薄く、なだらかな山',           color: '#94a3b8' },
        { key: 'fat',    label: 'ラプラス分布（尖度6・高尖度）', example: '山が鋭くV字形・裾が厚くて外れ値多', color: 'var(--primary)' },
      ];
      return (
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', marginBottom: 4 }}>歪度の違い</div>
          {skewRows.map(row => (
            <div key={row.key} style={{ marginBottom: 6 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, color: row.color }}>
                {row.label} <span style={{ color: '#94a3b8', fontWeight: 400 }}>— {row.example}</span>
              </div>
              <ResponsiveContainer width="100%" height={52}>
                <ComposedChart data={skewData} margin={{ top: 2, right: 4, left: -28, bottom: 0 }}>
                  <YAxis hide domain={[0, 1.15]} />
                  <Area type="monotone" dataKey={row.key} fill={row.color} fillOpacity={0.25} stroke={row.color} strokeWidth={2} dot={false} isAnimationActive={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          ))}
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', margin: '6px 0 4px' }}>尖度の違い（山の鋭さ・裾の厚さ）</div>
          {kurtRows.map(row => (
            <div key={row.key} style={{ marginBottom: 6 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, color: row.color }}>
                {row.label} <span style={{ color: '#94a3b8', fontWeight: 400 }}>— {row.example}</span>
              </div>
              <ResponsiveContainer width="100%" height={52}>
                <ComposedChart data={kurtData} margin={{ top: 2, right: 4, left: -28, bottom: 0 }}>
                  <YAxis hide domain={[0, 1.15]} />
                  <Area type="monotone" dataKey={row.key} fill={row.color} fillOpacity={0.25} stroke={row.color} strokeWidth={2} dot={false} isAnimationActive={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      );
    }

    const data = chartData as { x: string | number; [key: string]: unknown }[];
    return (
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="x" hide />
          <YAxis hide />
          <Tooltip />
          {type === 'update' ? (
            <>
              <Line type="monotone" dataKey="prior" stroke="#94a3b8" strokeDasharray="5 5" dot={false} name="事前分布" />
              <Area type="monotone" dataKey="posterior" fill="var(--primary)" stroke="var(--primary)" fillOpacity={0.3} name="事後分布" />
            </>
          ) : type === 't' ? (
            <>
              <Line type="monotone" dataKey="normal" stroke="#94a3b8" strokeDasharray="5 5" dot={false} name="正規分布" />
              <Line type="monotone" dataKey="y" stroke="var(--primary)" strokeWidth={2} dot={false} name="t分布" />
            </>
          ) : (
            <Area type="monotone" dataKey="y" fill="var(--primary)" stroke="var(--primary)" fillOpacity={0.3} dot={false} />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="card-simulator">
      <div className="simulator-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div className="simulator-icon"><BarChart3 size={18} color="var(--primary)" /></div>
          <h3 style={{ margin: 0, fontSize: '0.9rem' }}>{title}</h3>
        </div>
      </div>
      <div className="chart-area">{renderChart()}</div>
      <div className="controls">
        {type === 'normal' && (
          <div className="slider-container">
            <div className="slider-label"><span>サンプルサイズ ($n$)</span> <span>{n}</span></div>
            <input type="range" min="1" max="50" step="1" value={n} onChange={e => setN(parseInt(e.target.value))} />
          </div>
        )}
        {(type === 't' || type === 'chi2' || type === 'f') && (
          <div className="slider-container">
            <div className="slider-label"><span>自由度 ($df$)</span> <span>{df}</span></div>
            <input type="range" min="1" max="50" step="1" value={df} onChange={e => setDf(parseInt(e.target.value))} />
          </div>
        )}
        {type === 'update' && (
          <div className="slider-container">
            <div className="slider-label"><span>観測データ数 ($n$)</span> <span>{n}</span></div>
            <input type="range" min="1" max="50" step="1" value={n} onChange={e => setN(parseInt(e.target.value))} />
          </div>
        )}
        {type === 'overfit' && (
          <div className="slider-container">
            <div className="slider-label"><span>モデルの複雑さ</span></div>
            <div className="btn-group">
              {[1, 2, 5].map(d => <button key={d} className={`btn-sm ${degree === d ? 'active' : ''}`} onClick={() => setDegree(d)}>{d === 1 ? '直線' : d === 2 ? '曲線' : '複雑'}</button>)}
            </div>
          </div>
        )}
        {type === 'pca' && (
          <div className="slider-container">
            <div className="slider-label"><span>2変数の相関</span> <span>{pcaCorr.toFixed(2)}</span></div>
            <input type="range" min="0" max="0.95" step="0.05" value={pcaCorr} onChange={e => setPcaCorr(parseFloat(e.target.value))} />
          </div>
        )}
        {type === 'outlier' && (
          <div className="slider-container">
            <div className="slider-label"><span>2変数の相関（両群共通）</span> <span>{ldaCorr.toFixed(2)}</span></div>
            <input type="range" min="-0.9" max="0.9" step="0.1" value={ldaCorr} onChange={e => setLdaCorr(parseFloat(e.target.value))} />
          </div>
        )}
        {type === 'mcmc' && (
          <div className="slider-container">
            <div className="slider-label"><span>サンプル数</span> <span>{mcmcN}</span></div>
            <input type="range" min="20" max="1500" step="20" value={mcmcN} onChange={e => setMcmcN(parseInt(e.target.value))} />
          </div>
        )}
        {type === 'multico' && (
          <div className="slider-container">
            <div className="slider-label"><span>説明変数間の相関</span> <span>{corr.toFixed(2)}</span></div>
            <input type="range" min="0" max="0.99" step="0.01" value={corr} onChange={e => setCorr(parseFloat(e.target.value))} />
          </div>
        )}
      </div>
    </div>
  );
};
