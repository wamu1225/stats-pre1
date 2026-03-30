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
} from 'recharts';
import { motion } from 'framer-motion';
import { normalPDF, tPDF, chi2PDF, fPDF } from '../utils/math';
import { BarChart3 } from 'lucide-react';

interface Props {
  type: 'normal' | 't' | 'chi2' | 'f' | 'pca' | 'regression' | 'logistic' | 'mcmc' | 'gibbs' | 'update' | 'overfit' | 'outlier' | 'multico';
  renderContent?: (text: string) => React.ReactNode;
}

const typeToTitle: Record<string, string> = {
  normal: '中心極限定理：正規分布への収束',
  t: 't分布：サンプルサイズと裾の厚さ',
  chi2: 'χ²分布：自由度による形状の変化',
  f: 'F分布：2つの分散の比較',
  pca: '主成分分析：情報の集約',
  update: 'ベイズ更新：確信度の変化',
  overfit: '過学習：モデルの複雑さと汎化性能',
  multico: '多重共線性：不安定な係数'
};

export const InteractiveGraph: React.FC<Props> = ({ type }) => {
  const title = typeToTitle[type] || '統計シミュレーター';
  const [n, setN] = useState(5);
  const [df, setDf] = useState(5);
  const [degree, setDegree] = useState(1);
  const [corr, setCorr] = useState(0.9);

  // Data generation for charts
  const chartData = useMemo(() => {
    const data = [];
    if (type === 'normal') {
      // Simulation of CLT: Distribution of the mean of n independent Uniform(0, 1) variables
      // (Irwin-Hall distribution shifted and scaled to mean 0)
      const sigma = 1 / Math.sqrt(12 * n); // Std dev of mean of n Uniform(0,1)
      for (let x = -2; x <= 2; x += 0.05) {
        let y = 0;
        if (n === 1) {
          // Uniform distribution [-0.5, 0.5]
          y = (x >= -0.5 && x <= 0.5) ? 1 : 0;
        } else if (n === 2) {
          // Triangular distribution (Convolution of 2 uniforms)
          y = Math.max(0, 1 - Math.abs(x));
        } else {
          // Approximation for n >= 3 using Normal PDF with correct variance
          y = normalPDF(x, 0, sigma);
        }
        data.push({ x: x.toFixed(2), y });
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
    }
    return data;
  }, [type, n, df, degree]);

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

    if (type === 'multico') {
      const instability = corr > 0.95 ? (corr - 0.95) * 100 : 0;
      return (
        <div style={{ height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', borderRadius: '12px' }}>
          <div className="stat-badge" style={{ marginBottom: '1rem', background: corr > 0.9 ? '#ef4444' : '#22c55e', color: 'white' }}>
            VIF: {(1 / (1 - corr)).toFixed(1)}
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
