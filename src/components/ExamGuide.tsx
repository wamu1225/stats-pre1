// src/components/ExamGuide.tsx
// 本文は src/data/examGuide.ts（静的HTMLと共用）。ここは見た目だけを持つ
import React from 'react';
import { CheckCircle2, Target, Lightbulb } from 'lucide-react';
import { CHECKED_AT, OFFICIAL, overview, overviewTip, rangeParagraphs, studyTimeSummary, studyTimeCases, phases, books, resources, advice } from '../data/examGuide';

const muted = 'var(--text-muted)';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="card" style={{ marginBottom: '1.5rem' }}>
    <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>{title}</h3>
    {children}
  </div>
);

const link = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>{label}</a>
);

export const ExamGuide: React.FC = () => (
  <div>
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
        <Target size={20} color="var(--primary)" />
        <h2 style={{ margin: 0, fontSize: '1.1rem' }}>試験ガイド</h2>
      </div>
      <p style={{ margin: 0, fontSize: '0.85rem', color: muted }}>
        統計検定準1級の試験の概要、出題範囲、学習の進め方をまとめています。
      </p>
    </div>

    <Section title="試験の概要">
      {overview.map(r => (
        <div key={r.label} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.75rem', color: muted }}>{r.label}</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.6 }}>{r.value}</div>
        </div>
      ))}
      <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.8rem', background: 'var(--bg-warm)', borderRadius: 8, fontSize: '0.82rem', lineHeight: 1.6 }}>
        <Lightbulb size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
        {overviewTip}
      </div>
      <div style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: muted, lineHeight: 1.6 }}>
        ※ {CHECKED_AT}に{link(OFFICIAL.apply, '統計検定公式サイトの試験要項')}で確認した内容です。受験料や試験形式は変わることがあるので、申し込み前に公式サイトで確かめてください。
      </div>
    </Section>

    <Section title="出題範囲">
      {rangeParagraphs.map((p, i) => (
        <p key={i} style={{ fontSize: '0.85rem', lineHeight: 1.7, margin: '0 0 0.75rem' }}>{p}</p>
      ))}
      <p style={{ fontSize: '0.8rem', lineHeight: 1.7, margin: 0, color: muted }}>
        範囲表：{link(OFFICIAL.range2027, '2027年1月1日からの範囲表（PDF）')}、{link(OFFICIAL.range2018, '2026年12月31日までの範囲表（PDF）')}（どちらも{link(OFFICIAL.grade, '公式サイトの準1級のページ')}から）
      </p>
    </Section>

    <Section title="学習時間の目安（合格者の体験記から）">
      {studyTimeSummary.map((p, i) => (
        <p key={i} style={{ fontSize: '0.85rem', lineHeight: 1.7, margin: '0 0 0.75rem' }}>{p}</p>
      ))}
      {studyTimeCases.map(c => (
        <div key={c.href} style={{ padding: '0.5rem 0', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{c.hours}</div>
          <div style={{ fontSize: '0.8rem', color: muted, lineHeight: 1.6 }}>{c.who}（{link(c.href, c.source)}）</div>
        </div>
      ))}
    </Section>

    <Section title="学習の進め方">
      {phases.map((ph, i) => (
        <div key={ph.title} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>{i + 1}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{ph.title}</div>
            <div style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>{ph.body}</div>
          </div>
        </div>
      ))}
    </Section>

    <Section title="本">
      {books.map(b => (
        <div key={b.title} style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="stat-badge" style={{ flexShrink: 0, background: b.tag === '公式' ? 'var(--primary)' : 'var(--bg-warm)', color: b.tag === '公式' ? 'white' : 'var(--text)', fontSize: '0.65rem' }}>{b.tag}</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>{b.title}</span>
          </div>
          <div style={{ fontSize: '0.82rem', color: muted, lineHeight: 1.6 }}>{b.desc}</div>
        </div>
      ))}
    </Section>

    <Section title="無料で使える学習の助け">
      {resources.map(r => (
        <div key={r.name} style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{r.name}<span style={{ fontWeight: 400, fontSize: '0.75rem', color: muted }}>（{r.type}）</span></div>
          <div style={{ fontSize: '0.82rem', color: muted, lineHeight: 1.6, marginTop: '0.15rem' }}>{r.desc}</div>
        </div>
      ))}
    </Section>

    <Section title="本番に向けて">
      {advice.map(a => (
        <div key={a.title} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.15rem' }}>{a.title}</div>
          <div style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>{a.body}</div>
        </div>
      ))}
      <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.8rem', background: 'var(--bg-warm)', borderRadius: 8, fontSize: '0.82rem', display: 'flex', gap: '0.5rem', lineHeight: 1.6 }}>
        <CheckCircle2 size={14} style={{ flexShrink: 0, marginTop: 3 }} />
        <span>このサイトのモジュールは出題範囲に沿って並んでいます。各モジュールのクイズと章のまとめテストで、理解を確かめながら進めてください。</span>
      </div>
    </Section>
  </div>
);
