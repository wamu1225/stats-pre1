// stats-app/src/components/InteractiveGraph.tsx
import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
  ReferenceLine
} from 'recharts';
import { normalPDF, tPDF, chi2PDF, fPDF } from '../utils/math';

interface Props {
  type: 'normal' | 't' | 'chi' | 'f' | 'pca';
}

export const InteractiveGraph: React.FC<Props> = ({ type }) => {
  // Common states
  const [df, setDf] = useState(5);
  const [df2, setDf2] = useState(10);
  const [mean, setMean] = useState(0);
  const [variance, setVariance] = useState(1);
  const [correlation, setCorrelation] = useState(0.7);

  const data = useMemo(() => {
    const points = [];
    if (type === 'normal') {
      const std = Math.sqrt(variance);
      for (let x = -5; x <= 5; x += 0.2) {
        points.push({ x: parseFloat(x.toFixed(1)), y: normalPDF(x, mean, std) });
      }
    } else if (type === 't') {
      for (let x = -5; x <= 5; x += 0.2) {
        points.push({ x: parseFloat(x.toFixed(1)), y: tPDF(x, df) });
      }
    } else if (type === 'chi') {
      for (let x = 0; x <= 20; x += 0.5) {
        points.push({ x: parseFloat(x.toFixed(1)), y: chi2PDF(x, df) });
      }
    } else if (type === 'f') {
      for (let x = 0; x <= 5; x += 0.1) {
        points.push({ x: parseFloat(x.toFixed(1)), y: fPDF(x, df, df2) });
      }
    } else if (type === 'pca') {
      // Generate synthetic 2D data with specific correlation
      for (let i = 0; i < 50; i++) {
        const x = (Math.random() - 0.5) * 4;
        const noise = (Math.random() - 0.5) * (1 - Math.abs(correlation)) * 4;
        const y = x * correlation + noise;
        points.push({ x, y });
      }
    }
    return points;
  }, [type, mean, variance, df, df2, correlation]);

  // PCA component axis calculation
  const pcaLine = useMemo(() => {
    if (type !== 'pca') return null;
    // Simple PCA vector based on correlation
    const angle = Math.atan2(correlation, 1);
    const length = 3;
    return [
      { x: -Math.cos(angle) * length, y: -Math.sin(angle) * length },
      { x: Math.cos(angle) * length, y: Math.sin(angle) * length }
    ];
  }, [type, correlation]);

  const renderChart = () => {
    if (type === 'pca') {
      return (
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" domain={[-4, 4]} />
            <YAxis type="number" dataKey="y" domain={[-4, 4]} />
            <ZAxis type="number" range={[50, 50]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Data" data={data} fill="#64748b" />
            <Line
              type="monotone"
              data={pcaLine || []}
              dataKey="y"
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
            />
          </ScatterChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis hide />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="y"
            stroke="#2563eb"
            fill="#2563eb33"
            animationDuration={300}
          />
          {type === 't' && (
            <Area
              type="monotone"
              data={data.map(p => ({ x: p.x, y: normalPDF(p.x, 0, 1) }))}
              dataKey="y"
              stroke="#94a3b8"
              fill="transparent"
              strokeDasharray="5 5"
              isAnimationActive={false}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>
        {type.toUpperCase()}分布 シミュレーター
      </h3>
      <div style={{ width: '100%', height: 250 }}>
        {renderChart()}
      </div>

      <div style={{ marginTop: '1rem' }}>
        {type === 'normal' && (
          <>
            <div className="slider-container">
              <div className="slider-label"><span>平均 (μ): {mean}</span></div>
              <input type="range" min="-3" max="3" step="0.1" value={mean} onChange={e => setMean(parseFloat(e.target.value))} />
            </div>
            <div className="slider-container">
              <div className="slider-label"><span>分散 (σ²): {variance}</span></div>
              <input type="range" min="0.1" max="3" step="0.1" value={variance} onChange={e => setVariance(parseFloat(e.target.value))} />
            </div>
          </>
        )}

        {(type === 't' || type === 'chi' || type === 'f') && (
          <div className="slider-container">
            <div className="slider-label"><span>自由度 (df): {df}</span></div>
            <input type="range" min="1" max="30" step="1" value={df} onChange={e => setDf(parseInt(e.target.value))} />
          </div>
        )}

        {type === 'f' && (
          <div className="slider-container">
            <div className="slider-label"><span>自由度2 (df2): {df2}</span></div>
            <input type="range" min="1" max="30" step="1" value={df2} onChange={e => setDf2(parseInt(e.target.value))} />
          </div>
        )}

        {type === 'pca' && (
          <div className="slider-container">
            <div className="slider-label"><span>相関係数: {correlation.toFixed(2)}</span></div>
            <input type="range" min="-1" max="1" step="0.1" value={correlation} onChange={e => setCorrelation(parseFloat(e.target.value))} />
          </div>
        )}
      </div>

      {type === 't' && (
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          点線は標準正規分布。自由度が大きくなると正規分布に近づきます。
        </p>
      )}
    </div>
  );
};
