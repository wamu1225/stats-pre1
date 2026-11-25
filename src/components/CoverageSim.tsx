// 1.16 信頼区間：「95%」は区間を作る手順の確率であることを、引き直して確かめる模擬。
// 仮の母集団 μ = 171、σ = 6、n = 25（標準誤差 1.2）。最初の20本は固定の乱数（ページを開くたびに同じ図）。
import { useMemo, useState } from 'react';

const MU = 171, SIGMA = 6, N = 20;
const Z: Record<number, number> = { 90: 1.645, 95: 1.96, 99: 2.576 };
const INDIGO = '#4338ca', ROSE = '#be123c', SLATE = '#64748b';

function mulberry32(a: number) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function draw(rand: () => number): number[] {
  return Array.from({ length: N }, () => {
    const u = Math.max(rand(), 1e-12), v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  });
}

export function CoverageSim() {
  const [level, setLevel] = useState(95);
  const [size, setSize] = useState(25);
  const [zs, setZs] = useState<number[]>(() => draw(mulberry32(1016)));
  const [total, setTotal] = useState({ n: 0, hit: 0 });
  const SE = SIGMA / Math.sqrt(size);
  const xs = useMemo(() => zs.map((z) => MU + SE * z), [zs, SE]);
  const m = Z[level] * SE;
  const hits = useMemo(() => xs.filter((x) => Math.abs(x - MU) <= m).length, [xs, m]);
  const sumN = total.n + N, sumHit = total.hit + hits;

  const again = () => {
    setTotal({ n: sumN, hit: sumHit });
    setZs(draw(Math.random));
  };
  const switchLevel = (l: number) => { setLevel(l); setTotal({ n: 0, hit: 0 }); };
  const switchSize = (k: number) => { setSize(k); setTotal({ n: 0, hit: 0 }); };
  const btn = (on: boolean) => ({ padding: '6px 12px', borderRadius: 6, border: `1.5px solid ${INDIGO}`, background: on ? INDIGO : 'transparent', color: on ? '#fff' : INDIGO, fontWeight: 700, fontSize: '0.9rem' });

  const W = 340, x0 = 14, w = 312, lo = 165, hi = 177, top = 30;
  const px = (v: number) => x0 + ((v - lo) / (hi - lo)) * w;
  const base = top + N * 8.4 + 8;
  const ticks = [166, 168, 170, 172, 174, 176];

  return (
    <figure className="venn-figure">
      <div role="group" aria-label="信頼係数" style={{ display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: '0.85rem', color: SLATE, width: '4.2em', whiteSpace: 'nowrap' }}>信頼係数</span>
        {[90, 95, 99].map((l) => (
          <button key={l} type="button" onClick={() => switchLevel(l)} aria-pressed={level === l} style={btn(level === l)}>{l}%</button>
        ))}
      </div>
      <div role="group" aria-label="1回に測る人数" style={{ display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: '0.85rem', color: SLATE, width: '4.2em', whiteSpace: 'nowrap' }}>人数</span>
        {[10, 25, 100].map((k) => (
          <button key={k} type="button" onClick={() => switchSize(k)} aria-pressed={size === k} style={btn(size === k)}>{k}人</button>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${base + 34}`} className="venn-svg" role="img" aria-label={`${size}人の${level}%信頼区間を20本作った模擬。${N}本中${hits}本が真の平均を含む`}>
        <line x1={px(MU)} y1={22} x2={px(MU)} y2={base} stroke={ROSE} strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={px(MU)} y={15} textAnchor="middle" fontSize={12.4} fontWeight={700} fill={ROSE}>真の平均 μ ＝ {MU}（動かない）</text>
        {xs.map((x, i) => {
          const y = top + 6 + i * 8.4, miss = Math.abs(x - MU) > m, c = miss ? ROSE : INDIGO;
          return (
            <g key={i}>
              <line x1={Math.max(x0, px(x - m))} y1={y} x2={Math.min(x0 + w, px(x + m))} y2={y} stroke={c} strokeWidth={miss ? 2.6 : 2} />
              <circle cx={px(x)} cy={y} r={2.2} fill={c} />
            </g>
          );
        })}
        <line x1={x0} y1={base} x2={x0 + w} y2={base} stroke={SLATE} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={px(t)} y1={base} x2={px(t)} y2={base + 4} stroke={SLATE} />
            <text x={px(t)} y={base + 16} textAnchor="middle" fontSize={12.4} fill={SLATE}>{t}</text>
          </g>
        ))}
        <text x={W / 2} y={base + 31} textAnchor="middle" fontSize={12.4} fill={SLATE}>横軸＝身長（cm）／点＝その回の x̄、横線＝x̄ ± {m.toFixed(2)}</text>
      </svg>
      <div style={{ textAlign: 'center', fontSize: '0.95rem', marginTop: 6, lineHeight: 1.7 }}>
        この20本：μ を含む <b style={{ color: INDIGO }}>{hits}本</b>、外す <b style={{ color: ROSE }}>{N - hits}本</b>
        <br />
        {level}%・{size}人の区間のこれまでの合計：{sumN}本中 {sumHit}本が μ を含む（<b>{((sumHit / sumN) * 100).toFixed(1)}%</b>）
      </div>
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <button type="button" onClick={again}
          style={{ padding: '8px 18px', borderRadius: 6, border: 'none', background: INDIGO, color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
          別の{size}人で、もう20本作る
        </button>
      </div>
      <figcaption className="venn-caption">
        仮に μ ＝ 171、σ ＝ 6 として、人を測って区間を作ることをコンピュータでくり返します。赤は μ を外した区間です。信頼係数を上げると区間は長くなり、外れが減ります。人数を4倍にすると区間は半分の長さになりますが、μ を含む割合は信頼係数のままです。
      </figcaption>
    </figure>
  );
}
