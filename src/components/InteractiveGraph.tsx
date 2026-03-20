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
  Area
} from 'recharts';

interface Props {
  type: 'normal' | 't' | 'chi' | 'pca';
}

export const InteractiveGraph: React.FC<Props> = ({ type }) => {
  const [mean, setMean] = useState(0);
  const [variance, setVariance] = useState(1);

  const data = useMemo(() => {
    if (type === 'normal') {
      const points = [];
      const std = Math.sqrt(variance);
      for (let x = -5; x <= 5; x += 0.2) {
        const y =
          (1 / (std * Math.sqrt(2 * Math.PI))) *
          Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
        points.push({ x: parseFloat(x.toFixed(1)), y });
      }
      return points;
    }
    return [];
  }, [type, mean, variance]);

  if (type !== 'normal') return <div className="card">Coming Soon...</div>;

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>シミュレーター</h3>
      <div style={{ width: '100%', height: 200 }}>
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
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="slider-container">
        <div className="slider-label">
          <span>平均 (μ): {mean}</span>
        </div>
        <input
          type="range"
          min="-3"
          max="3"
          step="0.1"
          value={mean}
          onChange={(e) => setMean(parseFloat(e.target.value))}
        />
      </div>

      <div className="slider-container">
        <div className="slider-label">
          <span>分散 (σ²): {variance}</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={variance}
          onChange={(e) => setVariance(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};
