// src/components/ExamGuide.tsx
import React from 'react';
import { CheckCircle2, Target, Lightbulb } from 'lucide-react';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="card" style={{ marginBottom: '1.5rem' }}>
    <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', color: 'var(--primary)', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>{title}</h3>
    {children}
  </div>
);

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.4rem 0', borderBottom: '1px solid #f1f5f9', gap: '1rem' }}>
    <span style={{ fontSize: '0.85rem', color: '#64748b', flexShrink: 0 }}>{label}</span>
    <span style={{ fontSize: '0.85rem', fontWeight: 600, textAlign: 'right' }}>{value}</span>
  </div>
);

const PhaseCard: React.FC<{ phase: string; title: string; body: string }> = ({ phase, title, body }) => (
  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
    <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>{phase}</div>
    <div>
      <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{title}</div>
      <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.6 }}>{body}</div>
    </div>
  </div>
);

const BookItem: React.FC<{ title: string; stars: number; tag: string; desc: string }> = ({ title, stars, tag, desc }) => (
  <div style={{ padding: '0.6rem 0', borderBottom: '1px solid #f1f5f9' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{title}</span>
      <span className="stat-badge" style={{ background: stars === 5 ? '#ef4444' : '#3b82f6', color: 'white', fontSize: '0.65rem' }}>{tag}</span>
    </div>
    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{'★'.repeat(stars) + '☆'.repeat(5 - stars)}　{desc}</div>
  </div>
);

const ResourceItem: React.FC<{ name: string; type: string; desc: string }> = ({ name, type, desc }) => (
  <div style={{ display: 'flex', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9', alignItems: 'flex-start' }}>
    <span className="stat-badge" style={{ flexShrink: 0, fontSize: '0.65rem', background: '#f1f5f9', color: '#475569' }}>{type}</span>
    <div>
      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{name}</div>
      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.15rem' }}>{desc}</div>
    </div>
  </div>
);

const FieldItem: React.FC<{ priority: '最重要' | '重要' | '標準'; title: string; detail: string }> = ({ priority, title, detail }) => {
  const color = priority === '最重要' ? '#ef4444' : priority === '重要' ? '#f59e0b' : '#3b82f6';
  return (
    <div style={{ display: 'flex', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9', alignItems: 'flex-start' }}>
      <span className="stat-badge" style={{ flexShrink: 0, fontSize: '0.65rem', background: color, color: 'white' }}>{priority}</span>
      <div>
        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.15rem' }}>{detail}</div>
      </div>
    </div>
  );
};

export const ExamGuide: React.FC = () => (
  <div>
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
        <Target size={20} color="var(--primary)" />
        <h2 style={{ margin: 0, fontSize: '1.1rem' }}>試験ガイド</h2>
      </div>
      <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
        統計検定準1級の試験概要・学習戦略・推奨リソースをまとめています。
      </p>
    </div>

    {/* 試験の概要 */}
    <Section title="試験の概要">
      <Row label="実施方式" value="CBT（Computer Based Testing）— 通年受験可" />
      <Row label="出題形式" value="5肢選択 ＋ 数値入力" />
      <Row label="問題数 / 試験時間" value="25〜30問 / 90分（1問あたり約3分）" />
      <Row label="合格基準" value="100点満点中 60点以上" />
      <Row label="受験料" value="一般 8,000円 / 学割 6,000円（税込）" />
      <Row label="電卓" value="持ち込み可（四則演算・ルート・メモリのみ）" />
      <Row label="再受験" value="前回受験終了から7日以上経過後に可" />
      <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.8rem', background: '#fef9c3', borderRadius: 8, fontSize: '0.8rem', color: '#92400e' }}>
        <Lightbulb size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
        90分で30問近くの高度な計算・解釈問題を解くには<strong>解法の自動化</strong>が鍵。理論を理解するだけでなく、典型問題を反射的に解けるまで繰り返す。
      </div>
      <div style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: '#94a3b8' }}>
        ※ 受験料・試験形式は変更される場合があります。最新情報は<a href="https://www.toukei-kentei.jp/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>統計検定公式サイト</a>でご確認ください。
      </div>
    </Section>

    {/* 学習時間の目安 */}
    <Section title="必要な学習時間の目安">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
        {[
          { bg: '#fef2f2', border: '#fecaca', label: '統計学が初めて', time: '400〜500時間', period: '6ヶ月〜1年', note: '統計の学習経験なし' },
          { bg: '#eff6ff', border: '#bfdbfe', label: '統計検定2級合格済み', time: '200〜300時間', period: '4〜6ヶ月', note: '統計の基礎知識あり' },
        ].map(c => (
          <div key={c.label} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 10, padding: '0.75rem' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '0.25rem' }}>{c.note}</div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.1rem' }}>{c.label}</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)' }}>{c.time}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.period}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: '#64748b' }}>
        ※ 短期合格者の記録に惑わされず、着実に積み上げることが重要。未経験者は数式の背景まで掘り下げると想定以上に時間がかかる傾向がある。線形代数・微積分の素養がある方は2級ルートでもさらに短縮できる場合がある。
      </div>
    </Section>

    {/* 3段階学習フェーズ */}
    <Section title="3段階の学習フェーズ">
      <PhaseCard
        phase="1"
        title="インプット・概観フェーズ"
        body="『統計学実践ワークブック』を一通り読み、試験範囲の全体像を把握する。細かな数式に固執せず、まず「どんな手法があり、どう関連しているか」のマップを頭に入れる。"
      />
      <PhaseCard
        phase="2"
        title="理論深化・ノート作成フェーズ"
        body="各章を精読し、数式の導出を自力で行う。合格者の多くが「自作ノート」を作成している。線形代数・微積分の基礎を固めると多変量解析の理解が加速する。"
      />
      <PhaseCard
        phase="3"
        title="アウトプット・定着フェーズ"
        body="章末問題を解法が自動化されるまで繰り返す（目安5〜6周）。その後、公式過去問集で本番の問い方・時間配分に慣れる。"
      />
    </Section>

    {/* 推奨書籍 */}
    <Section title="推奨書籍">
      <BookItem title="統計学実践ワークブック" stars={5} tag="必須" desc="試験範囲をほぼ網羅。CBT出題のベース。章末問題の習得が合格の絶対条件。" />
      <BookItem title="統計検定準1級 公式問題集" stars={5} tag="必須" desc="過去の出題パターン確認に不可欠。解説が簡素なためワークブックと併用する。" />
      <BookItem title="統計学入門（東京大学出版会）" stars={4} tag="推奨" desc="通称「赤本」。基礎理論を深く理解するための補完書。" />
      <BookItem title="はじめての多変量解析" stars={4} tag="推奨" desc="主成分分析・因子分析など難解な多変量手法を平易に解説。" />
      <BookItem title="道具としてのベイズ統計" stars={3} tag="参考" desc="ベイズ統計の入門書。準1級の出題比重に合わせた概念理解に。" />
    </Section>

    {/* オンラインリソース */}
    <Section title="おすすめ無料リソース">
      <ResourceItem name="とけたろうチャンネル" type="YouTube / note" desc="準1級の全範囲を網羅した解説動画とチートシート。受験生から「最強の武器」と評される。" />
      <ResourceItem name="あつまれ統計の森 / DataArts" type="ブログ" desc="ワークブックの解答例が不十分な箇所の詳細な導出と補足。答え合わせの補助として有用。" />
      <ResourceItem name="Yuya Kawaguchi" type="YouTube" desc="数学的な導出をホワイトボードで丁寧に解説。文系出身・数式に不安がある人向け。" />
      <ResourceItem name="生成AI（ChatGPT / Perplexity）" type="AI" desc="ワークブックの難解な数式をステップバイステップで解説させる。証明の行間を埋める24時間家庭教師として活用できる。" />
    </Section>

    {/* 重要出題分野 */}
    <Section title="重要出題分野">
      <FieldItem priority="最重要" title="多変量解析" detail="主成分分析・因子分析・判別分析・クラスター分析。準1級の合否を最も左右するエリア。" />
      <FieldItem priority="最重要" title="統計ソフト出力の解釈" detail="R/Pythonの回帰分析・分散分析表の出力からp値・VIF・F値を読み取る問題が増加中。" />
      <FieldItem priority="重要" title="ベイズ統計" detail="共役事前分布・事後分布の更新・MCMCの基本的な考え方。" />
      <FieldItem priority="重要" title="時系列解析" detail="AR・MAモデル・自己相関・定常性の概念。ARIMA・スペクトル解析。" />
      <FieldItem priority="重要" title="モデル選択・評価" detail="AIC・BIC・ROC曲線・AUC。計算だけでなく意味を深く問われる。" />
      <FieldItem priority="標準" title="分散分析（ANOVA）" detail="自由度・平均平方・F値の関係性。分散分析表の空欄補充。" />
    </Section>

    {/* 実践的アドバイス */}
    <Section title="本番に向けた実践アドバイス">
      {[
        { icon: '⏱', title: '時間感覚を身につける', body: '1問あたり平均3分が目安。解けない問題に時間をかけすぎず、確実に取れる問題から先に解く。' },
        { icon: '🔢', title: '電卓操作に習熟する', body: 'ルート計算・メモリ機能を含む操作に慣れておく。CBTでは計算ミスが直接失点につながる。' },
        { icon: '🗂', title: '優先度をつけて学習する', body: '多変量解析と統計ソフト出力解釈を最優先に。ただしCBTは問題のランダム性が高いため、極端な捨て科目はリスクを伴う。' },
        { icon: '📐', title: '数学的基礎を固める', body: '行列の積・逆行列・固有値分解の理解が多変量解析の理解を劇的に加速させる。' },
      ].map(a => (
        <div key={a.title} style={{ display: 'flex', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{a.icon}</span>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.15rem' }}>{a.title}</div>
            <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.6 }}>{a.body}</div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.8rem', background: '#f0fdf4', borderRadius: 8, fontSize: '0.8rem', color: '#166534', display: 'flex', gap: '0.5rem' }}>
        <CheckCircle2 size={14} style={{ flexShrink: 0, marginTop: 2 }} />
        <span>このサイトの学習リファレンスは、試験範囲に沿って構成されています。各モジュールの理解度チェックで定着を確認しながら進めましょう。</span>
      </div>
    </Section>
  </div>
);
