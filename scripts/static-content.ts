/**
 * static-content.ts
 * prerender.ts と deploy-root.ts で共有する静的HTMLコンテンツ。
 * base: リンクのベースパス（stats-pre1側は'/stats-pre1', root側は''）
 */

export function buildCheatsheetHtml(base: string): string {
  return `<div style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:860px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#1e3a8a;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div><article id="static-fallback" style="font-family:sans-serif;line-height:1.7;max-width:860px;margin:0 auto;padding:24px 16px">
  <nav style="margin-bottom:16px"><a href="${base}/" style="color:#2563eb;text-decoration:none">← ホームへ戻る</a></nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:20px">公式集</h1>
  <p style="color:#555;margin-bottom:24px">統計検定準1級の重要公式を分野別にまとめています。試験で頻出の公式・定理を網羅しています。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 10px;padding-left:10px;border-left:4px solid #2563eb">確率の基礎</h2>
  <p style="color:#444"><strong>コルモゴロフの公理</strong>：確率は「非負性 P(A)≥0」「正規化 P(Ω)=1」「加法性（互いに排反な事象の和の確率は各確率の和）」の3条件を満たします。</p>
  <p style="color:#444"><strong>包除原理</strong>：P(A∪B) = P(A) + P(B) − P(A∩B)。3事象では P(A∪B∪C) = P(A)+P(B)+P(C) − P(A∩B) − P(B∩C) − P(A∩C) + P(A∩B∩C)。</p>
  <p style="color:#444"><strong>条件付き確率</strong>：P(B|A) = P(A∩B) / P(A)（P(A)&gt;0 のとき）。Aが起きたという情報のもとでBが起きる確率です。</p>
  <p style="color:#444"><strong>乗法定理</strong>：P(A∩B) = P(B|A)P(A) = P(A|B)P(B)。</p>
  <p style="color:#444"><strong>全確率の定理</strong>：完全系 {A₁,…,Aₖ} に対して P(B) = ΣP(B|Aᵢ)P(Aᵢ)。</p>
  <p style="color:#444"><strong>ベイズの定理</strong>：P(Aᵢ|B) = P(B|Aᵢ)P(Aᵢ) / ΣP(B|Aⱼ)P(Aⱼ)。事前確率P(Aᵢ)に尤度P(B|Aᵢ)を掛けて正規化することで事後確率を得ます。</p>
  <p style="color:#444"><strong>統計的独立</strong>：P(A∩B) = P(A)P(B) ⟺ P(B|A) = P(B)。一方の情報がもう一方の確率を変えません。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 10px;padding-left:10px;border-left:4px solid #2563eb">主要な確率分布</h2>
  <p style="color:#444"><strong>正規分布 N(μ,σ²)</strong>：期待値μ、分散σ²の釣り鐘型分布。μ±σに68.3%、μ±2σに95.4%、μ±3σに99.7%が入ります。標準正規分布N(0,1)に標準化：Z=(X−μ)/σ。</p>
  <p style="color:#444"><strong>二項分布 B(n,p)</strong>：n回のベルヌーイ試行で成功がk回起きる確率 P(X=k)=C(n,k)p^k(1−p)^(n−k)。期待値E[X]=np、分散Var(X)=np(1−p)。</p>
  <p style="color:#444"><strong>ポアソン分布 Po(λ)</strong>：P(X=k)=e^(−λ)λ^k/k!。期待値=分散=λ。稀な事象の件数モデル。二項分布でn→∞, p→0, np=λ の極限。</p>
  <p style="color:#444"><strong>超幾何分布</strong>：N個中K個の当たりがある母集団からn個を非復元抽出したときの当たり数。期待値E[X]=nK/N、分散は有限修正係数(N−n)/(N−1)が付きます。</p>
  <p style="color:#444"><strong>幾何分布</strong>：初めて成功するまでの試行回数。P(X=k)=(1−p)^(k−1)p、期待値1/p。無記憶性：P(X&gt;s+t|X&gt;s)=P(X&gt;t)。</p>
  <p style="color:#444"><strong>負の二項分布</strong>：r回成功するまでの試行回数。期待値r/p、分散r(1−p)/p²。</p>
  <p style="color:#444"><strong>指数分布 Exp(λ)</strong>：f(x)=λe^(−λx)（x≥0）。期待値1/λ、分散1/λ²。無記憶性を持つ連続型分布。ポアソン過程の待ち時間。</p>
  <p style="color:#444"><strong>ガンマ分布 Ga(α,β)</strong>：形状パラメータα、レートパラメータβ。期待値α/β、分散α/β²。指数分布はα=1の特殊ケース。カイ二乗分布はGa(k/2,1/2)。</p>
  <p style="color:#444"><strong>ベータ分布 Be(α,β)</strong>：[0,1]上の分布。期待値α/(α+β)。ベルヌーイ・二項分布の共役事前分布。</p>
  <p style="color:#444"><strong>多変量正規分布 N(μ,Σ)</strong>：平均ベクトルμ、分散共分散行列Σ。正規分布の多変量版。相関係数ρ=0 ⟺ 独立（正規分布の特別な性質）。</p>
  <p style="color:#444"><strong>t分布 t(ν)</strong>：自由度ν。N(0,1)÷√(χ²(ν)/ν)として定義。ν→∞で正規分布に収束。母分散未知のときの小標本推定・検定で使用。</p>
  <p style="color:#444"><strong>カイ二乗分布 χ²(k)</strong>：k個の独立な標準正規変数の二乗和。期待値k、分散2k。分散の推定・適合度検定で使用。</p>
  <p style="color:#444"><strong>F分布 F(m,n)</strong>：χ²(m)/m ÷ χ²(n)/n として定義。分散分析・回帰分析のF検定で使用。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 10px;padding-left:10px;border-left:4px solid #2563eb">分布の特性値</h2>
  <p style="color:#444"><strong>期待値</strong>：E[X] = ΣxP(X=x)（離散型）、∫xf(x)dx（連続型）。線形性：E[aX+b]=aE[X]+b。</p>
  <p style="color:#444"><strong>分散</strong>：Var(X) = E[(X−μ)²] = E[X²]−(E[X])²。Var(aX+b)=a²Var(X)。独立なとき Var(X+Y)=Var(X)+Var(Y)。</p>
  <p style="color:#444"><strong>歪度（わいど）</strong>：E[(X−μ)³]/σ³。正→右裾が重い。ゼロ→対称。</p>
  <p style="color:#444"><strong>尖度（せんど）</strong>：E[(X−μ)⁴]/σ⁴ − 3（過剰尖度）。正規分布は0。正→裾が重い（ファットテール）。</p>
  <p style="color:#444"><strong>モーメント母関数（MGF）</strong>：M_X(t)=E[e^(tX)]。存在すればすべてのモーメントを生成。k次モーメント：M_X^(k)(0)=E[X^k]。独立な和のMGFは積になります。</p>
  <p style="color:#444"><strong>相関係数</strong>：ρ(X,Y)=Cov(X,Y)/(σ_X σ_Y)∈[−1,1]。−1≤ρ≤1、ρ=0は線形無相関（独立は別）。</p>
  <p style="color:#444"><strong>偏相関係数</strong>：r_{XY·Z} = (r_XY − r_XZ·r_YZ) / √((1−r_XZ²)(1−r_YZ²))。第3変数Zを制御した後のXとYの相関。</p>
  <p style="color:#444"><strong>全期待値の法則</strong>：E[X] = E[E[X|Y]]。全分散の法則：Var(X) = E[Var(X|Y)] + Var(E[X|Y])。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 10px;padding-left:10px;border-left:4px solid #2563eb">大標本理論・漸近理論</h2>
  <p style="color:#444"><strong>大数の弱法則</strong>：iid サンプルの標本平均は真の期待値μに確率収束します（n→∞でP(|X̄−μ|&gt;ε)→0）。</p>
  <p style="color:#444"><strong>中心極限定理（CLT）</strong>：iid でE[X]=μ、Var(X)=σ²のとき、√n(X̄−μ)/σ → N(0,1)（分布収束）。元の分布が何でも成立します。</p>
  <p style="color:#444"><strong>デルタ法</strong>：√n(θ̂−θ)→N(0,σ²)のとき、√n(g(θ̂)−g(θ))→N(0,[g'(θ)]²σ²)。推定量の変換の漸近分散を求める公式。</p>
  <p style="color:#444"><strong>フィッシャー情報量</strong>：I(θ)=−E[∂²logf(X;θ)/∂θ²]=E[(∂logf/∂θ)²]。対数尤度の曲率の大きさ。大きいほどθを精密に推定できます。</p>
  <p style="color:#444"><strong>MLE漸近正規性</strong>：正則条件下で√n(θ̂_MLE−θ)→N(0,1/I(θ))。MLEはクラーメル・ラオ下界を漸近的に達成する最良推定量。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 10px;padding-left:10px;border-left:4px solid #2563eb">点推定</h2>
  <p style="color:#444"><strong>不偏性</strong>：E[θ̂]=θ。バイアス：Bias(θ̂)=E[θ̂]−θ=0。標本分散S²=(1/(n−1))Σ(Xᵢ−X̄)²は母分散σ²の不偏推定量。</p>
  <p style="color:#444"><strong>一致性</strong>：n→∞でθ̂→θ（確率収束）。大標本での保証。</p>
  <p style="color:#444"><strong>クラーメル・ラオの下界（CR不等式）</strong>：不偏推定量の分散は Var(θ̂) ≥ 1/(n·I(θ))。この下界を達成する推定量を有効推定量と呼びます。</p>
  <p style="color:#444"><strong>最尤推定法（MLE）</strong>：L(θ)=Πf(xᵢ;θ) を最大化するθ̂_MLE を求める方法。対数尤度 logL を微分してゼロとおいた尤度方程式を解きます。</p>
  <p style="color:#444"><strong>モーメント法</strong>：k次母モーメントE[X^k]をk次標本モーメント(1/n)ΣXᵢ^kで置き換えて連立方程式を解きます。パラメータが2つなら2つの方程式が必要。</p>
  <p style="color:#444"><strong>十分統計量</strong>：ネイマンの分解定理：T(X)が十分統計量 ⟺ f(x;θ)=g(T(x),θ)h(x)と分解できます。Tに含まれない情報はθに無関係。</p>
  <p style="color:#444"><strong>ガウス・マルコフの定理</strong>：線形モデルの仮定（誤差の期待値0・等分散・無相関）のもとで、OLS推定量はBLUE（最良線形不偏推定量）。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 10px;padding-left:10px;border-left:4px solid #2563eb">区間推定（信頼区間）</h2>
  <p style="color:#444"><strong>母平均（σ²既知）</strong>：X̄ ± z_{α/2}·σ/√n。95%信頼区間はz_{0.025}=1.96。</p>
  <p style="color:#444"><strong>母平均（σ²未知・正規母集団）</strong>：X̄ ± t_{α/2}(n−1)·S/√n。t分布の自由度はn−1。</p>
  <p style="color:#444"><strong>母比率</strong>：p̂ ± z_{α/2}·√(p̂(1−p̂)/n)。大標本近似（np̂≥5, n(1−p̂)≥5が目安）。</p>
  <p style="color:#444"><strong>母分散</strong>：((n−1)S²/χ²_{α/2,n−1}, (n−1)S²/χ²_{1−α/2,n−1})。χ²分布は非対称なので両端の分位点が異なります。</p>
  <p style="color:#444"><strong>2標本の母平均差（等分散）</strong>：プール分散Sp²=((n₁−1)S₁²+(n₂−1)S₂²)/(n₁+n₂−2) を使い、自由度n₁+n₂−2のt分布。</p>
  <p style="color:#444"><strong>被覆確率</strong>：同じ手順で構成した信頼区間が真の値を含む長期的な割合。95%CI→被覆確率95%。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 10px;padding-left:10px;border-left:4px solid #2563eb">仮説検定</h2>
  <p style="color:#444"><strong>検定統計量と棄却域</strong>：帰無仮説H₀のもとで検定統計量の分布を導出し、観測値が棄却域に入ればH₀を棄却。</p>
  <p style="color:#444"><strong>P値</strong>：帰無仮説が正しいとしたとき、観測値以上に極端な結果が起きる確率。P値&lt;α（有意水準）なら棄却。「P値が小さい」≠「効果が大きい」。</p>
  <p style="color:#444"><strong>第1種の過誤（α）</strong>：H₀が真なのに棄却してしまう確率。有意水準αで制御。</p>
  <p style="color:#444"><strong>第2種の過誤（β）・検出力（1−β）</strong>：H₁が真なのに棄却しない確率がβ。検出力=1−β=H₁のもとで棄却できる確率。サンプルサイズを増やすと検出力が上がります。</p>
  <p style="color:#444"><strong>z検定（母平均・σ²既知）</strong>：Z=(X̄−μ₀)/(σ/√n)、H₀のもとでN(0,1)に従います。</p>
  <p style="color:#444"><strong>t検定（母平均・σ²未知）</strong>：T=(X̄−μ₀)/(S/√n)、H₀のもとでt(n−1)に従います。</p>
  <p style="color:#444"><strong>カイ二乗検定（母分散）</strong>：χ²=(n−1)S²/σ₀²、H₀のもとでχ²(n−1)に従います。</p>
  <p style="color:#444"><strong>適合度検定</strong>：χ²=Σ(Oᵢ−Eᵢ)²/Eᵢ。期待度数Eᵢ≥5が条件。自由度はカテゴリ数−1（パラメータを推定した数だけ追加で引く）。</p>
  <p style="color:#444"><strong>ネイマン・ピアソン定理</strong>：単純仮説の検定では尤度比 L(θ₁)/L(θ₀)&gt;cの棄却域が一様最強力検定（UMP）を与えます。</p>
  <p style="color:#444"><strong>尤度比検定統計量</strong>：−2log(L₀/L₁)→χ²(自由度=制約数)（大標本）。複合仮説の検定に使います。</p>
  <p style="color:#444"><strong>ウィルコクソン順位和検定</strong>：2標本の中央値比較のノンパラ版。データを順位に変換して検定統計量を計算します。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 10px;padding-left:10px;border-left:4px solid #2563eb">分散分析（ANOVA）</h2>
  <p style="color:#444"><strong>一元配置</strong>：全変動=群間変動+群内変動（SS_T=SS_B+SS_W）。F=MS_B/MS_W（MS=SS/自由度）。H₀:全群の平均が等しい。</p>
  <p style="color:#444"><strong>二元配置</strong>：2つの因子A・BとAB交互作用を同時に検定。交互作用が有意なら主効果の解釈に注意が必要。</p>
  <p style="color:#444"><strong>多重比較</strong>：ANOVAで有意後の事後検定。ボンフェロー二補正：各検定の有意水準をα/m（m=比較数）に設定。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 10px;padding-left:10px;border-left:4px solid #2563eb">回帰分析</h2>
  <p style="color:#444"><strong>重回帰モデル</strong>：y = β₀ + β₁x₁ + … + βₚxₚ + ε、ε～N(0,σ²)。OLS推定：β̂=(XᵀX)⁻¹Xᵀy。</p>
  <p style="color:#444"><strong>決定係数R²</strong>：R²=1−SS_Res/SS_Tot∈[0,1]。変数を増やすと必ず増加するため、自由度調整済みR²を使います。</p>
  <p style="color:#444"><strong>AIC（赤池情報量規準）</strong>：AIC=−2logL+2k（kはパラメータ数）。値が小さいほど良いモデル。BIC=−2logL+k·logn（大標本でペナルティが強い）。</p>
  <p style="color:#444"><strong>多重共線性</strong>：説明変数間の強い相関。VIF（分散拡大因子）≥10が目安で不安定な推定になります。</p>
  <p style="color:#444"><strong>Lasso（L1正則化）</strong>：ペナルティ項λΣ|βⱼ|を加えた最小化。係数を完全にゼロにして変数選択を行います。Ridge（L2正則化）は係数を縮小しますが変数選択はしません。</p>
  <p style="color:#444"><strong>クックの距離</strong>：各データ点が全推定係数に与える影響度。値が1以上（または4/nが目安）の点は影響力のある外れ値と判断します。</p>
  <p style="color:#444"><strong>ロジスティック回帰</strong>：log(p/(1−p))=β₀+β₁x₁+…。係数の解釈：xⱼが1増えるとオッズがe^βⱼ倍になります。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 10px;padding-left:10px;border-left:4px solid #2563eb">多変量解析</h2>
  <p style="color:#444"><strong>主成分分析（PCA）</strong>：分散共分散行列（または相関行列）の固有ベクトルが主成分軸。第1主成分は分散最大方向。固有値=主成分の分散。寄与率=固有値の和の何%かを示します。</p>
  <p style="color:#444"><strong>判別分析（LDA）</strong>：グループ間分散/グループ内分散を最大化する判別関数を求めます。等分散仮定で判別境界は線形（LDA）、各グループ別分散では二次（QDA）。</p>
  <p style="color:#444"><strong>マハラノビス距離</strong>：D²=(x−μ)ᵀΣ⁻¹(x−μ)。共分散構造を考慮した距離。Σが単位行列のときユークリッド距離²に退化。</p>
  <p style="color:#444"><strong>因子分析</strong>：観測変数X=Λf+ε（Λ:因子負荷行列、f:共通因子、ε:独自因子）。共通性=各行の因子負荷量の二乗和。バリマックス回転（直交）・プロマックス回転（斜交）で解釈を容易にします。</p>
  <p style="color:#444"><strong>モデル選択基準</strong>：AIC（赤池）＝過学習防止・小標本向き。BIC（ベイズ）＝大標本で一致的なモデル選択。クロスバリデーション＝予測誤差の直接推定。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 10px;padding-left:10px;border-left:4px solid #2563eb">ベイズ統計</h2>
  <p style="color:#444"><strong>ベイズの定理（統計版）</strong>：p(θ|x) ∝ p(x|θ)p(θ)。事後分布∝尤度×事前分布。共役事前分布を使うと事後分布が閉じた形になります。</p>
  <p style="color:#444"><strong>代表的な共役対</strong>：二項-ベータ、ポアソン-ガンマ、正規-正規（精度パラメータ既知）。</p>
  <p style="color:#444"><strong>MCMC（マルコフ連鎖モンテカルロ）</strong>：目標分布を定常分布とするマルコフ連鎖を設計しサンプルを得る。ギブスサンプリング（条件付き分布から1つずつ更新）とメトロポリス・ヘイスティングス法が代表的。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 10px;padding-left:10px;border-left:4px solid #2563eb">時系列解析</h2>
  <p style="color:#444"><strong>弱定常性</strong>：平均・分散・自己共分散が時点tによらず一定。ARIMAモデルの前提条件。</p>
  <p style="color:#444"><strong>自己回帰モデル AR(p)</strong>：Xₜ=φ₁Xₜ₋₁+…+φₚXₜ₋ₚ+εₜ。ACF（自己相関関数）は指数的に減衰し、PACF（偏自己相関関数）はラグp以降でゼロに切断。</p>
  <p style="color:#444"><strong>移動平均モデル MA(q)</strong>：Xₜ=εₜ+θ₁εₜ₋₁+…+θqεₜ₋q。ACFはラグq以降でゼロ、PACFは指数減衰。</p>
  <p style="color:#444"><strong>ARIMAモデル ARIMA(p,d,q)</strong>：d回差分を取って定常化したうえでAR(p)+MA(q)を当てはめるモデル。</p>
  <p style="color:#444"><strong>マルコフ連鎖</strong>：P(Xₜ₊₁|Xₜ,Xₜ₋₁,…)=P(Xₜ₊₁|Xₜ)（マルコフ性）。定常分布πは πP=π を満たします。既約・非周期ならば定常分布は一意に存在します。</p>

  <p style="margin-top:32px"><a href="${base}/" style="color:#2563eb">← ホームへ戻る</a></p>
  <p style="font-size:0.8rem;color:#888;margin-top:12px">※本サイトは個人による学習支援サイトです。最新の試験情報は公式サイトをご確認ください。</p>
</article>`;
}

export function buildGuideHtml(base: string): string {
  return `<div style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:860px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#1e3a8a;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div><article id="static-fallback" style="font-family:sans-serif;line-height:1.7;max-width:860px;margin:0 auto;padding:24px 16px">
  <nav style="margin-bottom:16px"><a href="${base}/" style="color:#2563eb;text-decoration:none">← ホームへ戻る</a></nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:20px">統計検定 準1級 試験ガイド</h1>
  <p style="color:#555;margin-bottom:24px">統計検定準1級の試験概要・出題範囲・学習の進め方を解説します。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 8px">試験概要</h2>
  <p style="color:#444">統計検定準1級（統計検定準1級・Pre-1）は、統計学の実践的な応用力を問う試験です。大学教養〜専門課程レベルの統計知識が求められます。試験時間は90分、マークシート（多肢選択式）形式です。CBT（コンピュータ受験）方式で年間を通じて受験できます。</p>
  <p style="color:#444">合格基準は概ね正答率70%以上が目安とされていますが、試験回によって調整があります。難易度は統計検定2級より大幅に上がり、確率論・推測統計の理論的理解と多変量解析の実践的知識が問われます。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 8px">主な出題範囲</h2>
  <ul style="color:#444;padding-left:20px;line-height:2">
    <li><strong>確率と確率変数</strong>：確率の公理・条件付き確率・ベイズの定理・確率分布・期待値・分散・モーメント・MGF</li>
    <li><strong>種々の確率分布</strong>：正規・t・χ²・F・二項・ポアソン・指数・ガンマ・ベータ・多変量正規分布など</li>
    <li><strong>統計的推測（推定）</strong>：最尤法・モーメント法・不偏性・一致性・有効性・CR不等式・信頼区間</li>
    <li><strong>統計的推測（検定）</strong>：P値・検出力・NP定理・尤度比検定・適合度検定・ノンパラメトリック検定</li>
    <li><strong>回帰分析</strong>：重回帰・ロジスティック回帰・変数選択・残差分析・多重共線性・GLM</li>
    <li><strong>多変量解析</strong>：主成分分析・判別分析・クラスター分析・因子分析・正準相関</li>
    <li><strong>分散分析</strong>：一元配置・二元配置・交互作用・実験計画法</li>
    <li><strong>ベイズ統計</strong>：事前・事後分布・共役分布・MCMC</li>
    <li><strong>時系列解析</strong>：定常性・ARIMAモデル・自己相関・状態空間モデル</li>
    <li><strong>その他</strong>：マルコフ連鎖・分割表・生存時間解析・モデル選択・シミュレーション</li>
  </ul>

  <h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 8px">推奨学習時間の目安</h2>
  <p style="color:#444">統計検定2級合格程度の基礎知識がある場合：100〜150時間。統計の基礎から始める初学者：200〜300時間。確率論・線形代数・微積分の素養があると効率的に学習できます。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 8px">学習の進め方</h2>
  <p style="color:#444"><strong>ステップ1：確率論の基礎固め</strong>。確率の公理・条件付き確率・ベイズの定理・各種確率分布を理解します。本サイトの第1章前半（1.1〜1.9）が対応します。</p>
  <p style="color:#444"><strong>ステップ2：推測統計の理論</strong>。標本分布（t・χ²・F）・点推定・区間推定・仮説検定の理論を習得します。本サイトの第1章後半（1.10〜1.23）が対応します。</p>
  <p style="color:#444"><strong>ステップ3：多変量解析と応用</strong>。回帰分析・主成分分析・判別分析などを学びます。本サイトの第2章（2.1〜2.7）が対応します。</p>
  <p style="color:#444"><strong>ステップ4：発展的トピック</strong>。ベイズ統計・時系列・マルコフ連鎖・分割表解析などを学びます。本サイトの第3章（3.1〜3.6）が対応します。</p>

  <h2 style="font-size:1.2rem;font-weight:700;margin:20px 0 8px">よくある質問</h2>
  <p style="color:#444"><strong>Q：統計検定2級との難易度の差はどのくらいですか？</strong><br>A：準1級は2級と比べて大幅に難しく、確率論の厳密な理解・推定理論（クラーメル・ラオの下界など）・多変量解析の実践が求められます。2級合格後にさらに半年〜1年の学習期間を見込む方が多いです。</p>
  <p style="color:#444"><strong>Q：数学の事前知識はどのくらい必要ですか？</strong><br>A：微分・積分（基礎レベル）、行列（基本的な演算）、集合・論理の知識が役立ちます。本サイトでは高校数学レベルから丁寧に説明しています。</p>
  <p style="color:#444"><strong>Q：過去問はどこで入手できますか？</strong><br>A：日本統計学会が公式テキスト・過去問集を出版しています。CBT試験は問題が非公開のため、公式の例題集を活用することをおすすめします。</p>

  <p style="margin-top:24px;font-size:0.85rem;color:#888">※本ページの情報は個人による学習支援目的のものです。最新の試験情報・申込方法・合否については、必ず公式サイトをご確認ください。</p>
  <p style="margin-top:16px"><a href="${base}/" style="color:#2563eb">← ホームへ戻る</a></p>
</article>`;
}

export function buildAboutHtml(base: string): string {
  return `<div style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:860px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#1e3a8a;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div><article id="static-fallback" style="font-family:sans-serif;line-height:1.7;max-width:860px;margin:0 auto;padding:24px 16px">
  <nav style="margin-bottom:16px"><a href="${base}/" style="color:#2563eb;text-decoration:none">← ホームへ戻る</a></nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:20px">サイトについて</h1>

  <section style="margin-bottom:28px">
    <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:10px">このサイトについて</h2>
    <p style="color:#444">「統計検定 準1級 学習リファレンス」は、統計検定準1級の合格を目指す方のために作られた個人運営の学習支援サイトです。確率論・推測統計・多変量解析・ベイズ統計・時系列分析など準1級の全出題範囲を36の学習モジュールに分けて解説しています。</p>
    <p style="color:#444">数学的な素養が中学〜高校レベルの方でも理解できるよう、すべての概念を「具体的な日常の例」から出発し、直感的な説明を経て数式・理論へと進む構成になっています。インタラクティブなグラフで分布の形を視覚的に確認し、各モジュール10問のクイズで理解度を確認できます。</p>
    <p style="color:#888;font-size:0.9rem;border-left:3px solid #fbbf24;padding-left:12px;margin-top:12px">本サイトは個人による学習支援サイトであり、統計質保証推進協会および日本統計学会の公式サイトではありません。掲載内容は個人の見解に基づくものであり、公式の情報を保証するものではありません。</p>
  </section>

  <section style="margin-bottom:28px">
    <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:10px">コンテンツ構成</h2>
    <ul style="color:#444;padding-left:20px;line-height:2">
      <li><strong>学習モジュール（全36モジュール・3章構成）</strong>：各モジュールに本文・インタラクティブグラフ・10問クイズ</li>
      <li><strong>第1章（23モジュール）</strong>：確率論の基礎・各種確率分布・推測統計（推定・検定・漸近理論）</li>
      <li><strong>第2章（7モジュール）</strong>：多変量解析（回帰分析・主成分分析・判別分析・因子分析・クラスター・GLM）</li>
      <li><strong>第3章（6モジュール）</strong>：ベイズ統計・時系列分析・マルコフ連鎖・分割表・生存時間・シミュレーション</li>
      <li><strong>用語集</strong>：準1級頻出用語の解説（英語名・難易度レベル付き）</li>
      <li><strong>公式集</strong>：全分野の重要公式・定理を一覧（印刷対応）</li>
      <li><strong>試験ガイド</strong>：試験概要・出題範囲・学習の進め方</li>
      <li><strong>全範囲ランダムクイズ</strong>：全モジュールから横断的に出題</li>
    </ul>
  </section>

  <section style="margin-bottom:28px">
    <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:10px">学習の特徴</h2>
    <p style="color:#444">本サイトの最大の特徴は「具体→抽象」の学習順序です。すべてのモジュールは日常の場面から出発し、直感的な理解を経て数式・定理へと進みます。「なぜその公式が成り立つのか」「どう使うのか」まで踏み込んだ解説を心がけています。</p>
    <p style="color:#444">インタラクティブなグラフでは、スライダーを動かして分布の形がどう変わるかをリアルタイムで確認できます。正規分布・t分布・χ²分布・F分布・ベイズ更新・ロジスティック回帰・主成分分析などの可視化に対応しています。</p>
  </section>

  <section style="margin-bottom:28px">
    <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:10px">編集・制作方針</h2>
    <p style="color:#444">本サイトのコンテンツは、統計検定の公式の出題範囲（試験要項）や一般に流通している統計学の教科書・専門書を参照しつつ、運営者が内容を一から再構成し、初学者がつまずきやすい点を補う形で独自に解説しています。他サイトの文章をそのまま転載することはありません。図解・インタラクティブなグラフ・確認クイズはすべて本サイト向けに独自に制作したものです。内容の誤りや古くなった情報に気づいた場合は、お問い合わせを受けて随時見直し・修正します。</p>
  </section>

  <section style="margin-bottom:28px">
    <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:10px">お問い合わせ</h2>
    <p style="color:#444">内容の誤り・ご意見・ご要望は<a href="https://forms.gle/ccMv7oKwz6ysDHBe6" target="_blank" rel="noopener noreferrer" style="color:#2563eb">こちらのGoogleフォーム</a>からお願いします。統計的な誤りのご指摘は特に歓迎しています。</p>
  </section>

  <section>
    <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:10px">免責事項</h2>
    <p style="color:#444">本サイトの解説・問題・公式は学習目的で作成されており、内容の正確性・完全性を保証するものではありません。本サイトの情報を利用したことによるいかなる損害についても、運営者は責任を負いかねます。また、本サイトは統計検定への合格を保証するものではありません。試験の最新情報・申込方法・合否については、必ず公式サイトをご確認ください。</p>
  </section>

  <p style="margin-top:32px"><a href="${base}/" style="color:#2563eb">← ホームへ戻る</a></p>
</article>`;
}

export function buildRootStaticContent(base: string, moduleListHtml: string): string {
  return `<div style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:860px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#1e3a8a;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div><article id="static-fallback" style="font-family:sans-serif;line-height:1.7;max-width:860px;margin:0 auto;padding:24px 16px">
  <h1 style="font-size:1.8rem;font-weight:700;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:16px">統計検定 準1級 学習リファレンス</h1>

  <p style="color:#444;margin-bottom:16px">統計検定準1級の合格を目指す方のための学習サイトです。確率論・推測統計・多変量解析・ベイズ統計・時系列分析など全出題範囲を36の学習モジュールに分けて解説しています。数学的な素養が中学〜高校レベルの方でも理解できるよう、すべての概念を日常の具体例から説明します。</p>

  <p style="color:#444;margin-bottom:24px">各モジュールにはインタラクティブなグラフ（分布の形をスライダーで確認）と10問の確認クイズが付いています。学習進捗はブラウザに自動保存されます。</p>

  <section style="margin-bottom:28px;background:#f0f7ff;padding:16px;border-radius:8px">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:12px;color:#1e3a5f">このサイトで学べること</h2>
    <ul style="color:#444;padding-left:20px;margin:0;line-height:2">
      <li><strong>第1章（23モジュール）</strong>：確率の公理・各種確率分布・標本分布・点推定・区間推定・仮説検定・漸近理論</li>
      <li><strong>第2章（7モジュール）</strong>：重回帰分析・主成分分析・判別分析・因子分析・クラスター分析・GLM・多変量解析</li>
      <li><strong>第3章（6モジュール）</strong>：ベイズ統計・時系列分析・マルコフ連鎖・分割表・生存時間解析・シミュレーション</li>
    </ul>
  </section>

  <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px">学習モジュール一覧</h2>
  <ul style="list-style:none;padding:0">
${moduleListHtml}
  </ul>

  <nav style="margin-top:32px;border-top:1px solid #ddd;padding-top:16px;display:flex;gap:16px;flex-wrap:wrap">
    <a href="${base}/glossary/" style="color:#2563eb">用語集</a>
    <a href="${base}/cheatsheet/" style="color:#2563eb">公式集</a>
    <a href="${base}/guide/" style="color:#2563eb">試験ガイド</a>
    <a href="${base}/faq/" style="color:#2563eb">よくある質問</a>
    <a href="${base}/randomquiz/" style="color:#2563eb">ランダムクイズ</a>
    <a href="${base}/about/" style="color:#2563eb">サイトについて</a>
    <a href="${base}/privacy/" style="color:#2563eb;font-size:0.85rem">プライバシーポリシー</a>
  </nav>
  <p style="font-size:0.8rem;color:#888;margin-top:16px;border-top:1px solid #eee;padding-top:12px">※本サイトは個人による学習支援サイトであり、統計質保証推進協会・日本統計学会の公式サイトではありません。</p>
</article>`;
}

export function buildFaqPageHtml(base: string): string {
  return `<div style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:860px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#1e3a8a;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div><article id="static-fallback" style="font-family:sans-serif;line-height:1.7;max-width:860px;margin:0 auto;padding:24px 16px">
  <nav style="margin-bottom:16px"><a href="${base}/" style="color:#2563eb;text-decoration:none">← ホームへ戻る</a></nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:20px">よくある質問（FAQ）</h1>
  <p style="color:#555;margin-bottom:24px">統計検定準1級の試験・学習・このサイトについてよくある質問をまとめました。</p>

  <h2 style="font-size:1.15rem;font-weight:700;margin:24px 0 8px;color:#1e3a5f">試験について</h2>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. 統計検定準1級はどのくらい難しいですか？</p>
    <p style="color:#444;margin-top:4px">A. 統計検定2級より大幅に難しく、大学の統計学専門科目レベルの知識が求められます。確率論（ベイズの定理・モーメント母関数）・推測統計の理論（クラーメル・ラオの下界・最尤推定の漸近正規性）・多変量解析（主成分分析・判別分析）など、実践的かつ理論的な内容が出題されます。合格率はおよそ30〜40%程度で、十分な準備期間が必要です。</p>
  </div>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. 試験時間・出題形式はどうなっていますか？</p>
    <p style="color:#444;margin-top:4px">A. 試験時間は90分で、マークシート（多肢選択式）形式です。CBT（コンピュータ受験）方式で年間を通じて全国の試験センターで受験できます。問題数・配点などの詳細は公式サイトでご確認ください。</p>
  </div>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. 合格基準は何点（何%）ですか？</p>
    <p style="color:#444;margin-top:4px">A. 概ね正答率70%以上が目安とされていますが、試験回によって調整（素点換算）が行われる場合があります。明確な点数基準は公式には公表されていないため、最新情報は公式サイトでご確認ください。</p>
  </div>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. 統計検定2級と準1級の主な違いは何ですか？</p>
    <p style="color:#444;margin-top:4px">A. 2級は記述統計・基本的な推測統計（t検定・回帰分析の使い方）が中心です。準1級では確率論の理論的理解（確率分布の性質・収束定理）・推定理論（有効性・一致性・クラーメル・ラオの下界）・多変量解析（主成分分析・因子分析・判別分析）・ベイズ統計・時系列分析など、より幅広く深い知識が求められます。</p>
  </div>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. 受験に必要な数学の前提知識は？</p>
    <p style="color:#444;margin-top:4px">A. 微分・積分（基礎レベル、偏微分が理解できる程度）、行列の基本演算（積・逆行列・固有値）、集合と論理の基礎知識があると学習効率が上がります。高校数学（数学II・B・III）レベルの素養があれば、丁寧に学べば取り組めます。</p>
  </div>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. 推奨学習時間はどのくらいですか？</p>
    <p style="color:#444;margin-top:4px">A. 統計検定2級合格程度の知識がある方で100〜150時間、統計の基礎から始める方は200〜300時間が目安です。社会人の方は週10〜15時間の学習で3〜6ヶ月を見込む方が多いです。</p>
  </div>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. 過去問はどこで入手できますか？</p>
    <p style="color:#444;margin-top:4px">A. 日本統計学会が公式テキスト（「統計学」シリーズ）と例題集を出版しています。CBT形式の試験は問題が非公開のため、公式の例題集・参考書を中心に対策することをおすすめします。</p>
  </div>

  <h2 style="font-size:1.15rem;font-weight:700;margin:28px 0 8px;color:#1e3a5f">学習内容について</h2>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. 確率と統計の違いは何ですか？</p>
    <p style="color:#444;margin-top:4px">A. 確率論は「母集団・モデルが既知のとき、そこからサンプルがどう振る舞うか」を数学的に分析する分野です。統計学は逆に「手元のサンプルから、未知の母集団・モデルを推測する」分野です。試験では両方が問われ、確率論は統計的推測の理論的基盤になっています。</p>
  </div>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. 中心極限定理はなぜ重要ですか？</p>
    <p style="color:#444;margin-top:4px">A. 中心極限定理（CLT）は「元のデータがどんな分布に従っていても、十分大きな標本の平均の分布は正規分布に近づく」という定理です。これにより、正規分布に関する検定・信頼区間の理論を幅広いデータに適用できます。t検定・z検定などの多くの統計手法の理論的根拠になっています。</p>
  </div>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. 最尤推定法（MLE）とモーメント法の違いは？</p>
    <p style="color:#444;margin-top:4px">A. MLEは「観測データが得られる確率（尤度）を最大化するパラメータ」を求める方法で、漸近的に最良の性質（一致性・漸近有効性）を持ちます。モーメント法は「標本モーメントを母モーメントと等置して連立方程式を解く」単純な方法で、計算が簡単ですが一般に有効性はMLEより低いです。</p>
  </div>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. P値とはどういう意味ですか？よく誤解されると聞きますが？</p>
    <p style="color:#444;margin-top:4px">A. P値は「帰無仮説が正しいと仮定したとき、観測値以上に極端な結果が偶然生じる確率」です。よくある誤解は「P値＝帰無仮説が正しい確率」や「P値が小さい＝効果が大きい」という解釈です。P値は標本サイズにも依存するため、大きなサンプルでは小さな（実用上無意味な）差でも有意になります。効果量（Cohen's dなど）と合わせて解釈することが重要です。</p>
  </div>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. 主成分分析（PCA）はどういうときに使いますか？</p>
    <p style="color:#444;margin-top:4px">A. 多数の変数（例：30項目のアンケート）を少数の「主成分」に圧縮したいときに使います。第1主成分は「データのばらつきが最大になる方向」で、固有値がその方向のばらつき（分散）を表します。寄与率（各主成分の固有値÷固有値の総和）が高い主成分だけを使うことで、情報をほぼ保持しながら次元を削減できます。</p>
  </div>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. ベイズ統計と頻度論統計の違いは何ですか？</p>
    <p style="color:#444;margin-top:4px">A. 頻度論では確率を「長期的な頻度」として定義し、パラメータは固定値（不確実性はデータの偶然性のみ）とします。ベイズ統計ではパラメータ自体に確率分布（事前分布）を設定し、データを観測してその分布を更新（事後分布）する枠組みです。ベイズ統計は事前知識の取り込みや少数サンプルでの推論に強みがあります。</p>
  </div>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. ARIMAモデルのp・d・qはそれぞれ何を意味しますか？</p>
    <p style="color:#444;margin-top:4px">A. ARIMA(p,d,q)の各パラメータは：p＝自己回帰（AR）の次数（何期前の値を使うか）、d＝差分の次数（定常化のために何回差分を取るか）、q＝移動平均（MA）の次数（何期前の誤差を使うか）です。時系列データが非定常な場合（トレンドや季節性がある場合）はd≥1として差分を取り定常化します。</p>
  </div>

  <h2 style="font-size:1.15rem;font-weight:700;margin:28px 0 8px;color:#1e3a5f">このサイトについて</h2>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. このサイトは無料で使えますか？</p>
    <p style="color:#444;margin-top:4px">A. はい、すべての機能（学習モジュール・用語集・公式集・クイズ）を無料でご利用いただけます。会員登録も不要です。学習進捗はブラウザのローカルストレージに保存されます。</p>
  </div>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. スマートフォンでも使えますか？</p>
    <p style="color:#444;margin-top:4px">A. はい、スマートフォン・タブレット・PCすべてに対応したレスポンシブデザインになっています。インタラクティブなグラフも画面幅に合わせて表示されます。</p>
  </div>

  <div style="margin-bottom:20px">
    <p style="font-weight:600;color:#333">Q. 内容に誤りがあった場合はどうすればよいですか？</p>
    <p style="color:#444;margin-top:4px">A. フッターのお問い合わせフォームからご連絡ください。統計的な誤りのご指摘は特に歓迎しています。確認のうえ速やかに修正します。</p>
  </div>

  <p style="margin-top:32px;font-size:0.85rem;color:#888">※試験に関する情報は変更される場合があります。最新情報は必ず公式サイトでご確認ください。</p>
  <p style="margin-top:12px"><a href="${base}/" style="color:#2563eb">← ホームへ戻る</a></p>
</article>`;
}

export function buildModuleSeoHtml(
  base: string,
  title: string,
  description: string,
  seoText: string,
  quizSnippet: string,
  prevLink: string,
  nextLink: string
): string {
  return `<div style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:860px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#1e3a8a;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div><article id="static-fallback" style="font-family:sans-serif;line-height:1.7;max-width:860px;margin:0 auto;padding:24px 16px">
  <nav style="margin-bottom:16px;display:flex;gap:12px;font-size:0.9rem">
    <a href="${base}/" style="color:#2563eb;text-decoration:none">← ホーム</a>
    ${prevLink}
    ${nextLink}
  </nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:12px">${title}</h1>
  <p style="color:#555;margin-bottom:20px;font-size:1.05rem">${description}</p>
  <div style="white-space:pre-line;color:#333">${seoText}</div>
  ${quizSnippet}
  <nav style="margin-top:32px;border-top:1px solid #ddd;padding-top:16px;display:flex;gap:12px;font-size:0.9rem;flex-wrap:wrap">
    <a href="${base}/" style="color:#2563eb;text-decoration:none">← ホームへ戻る</a>
    ${prevLink}
    ${nextLink}
  </nav>
  <nav style="margin-top:12px;display:flex;gap:14px;flex-wrap:wrap;font-size:0.82rem">
    <a href="${base}/glossary/" style="color:#6b7280;text-decoration:none">用語集</a>
    <a href="${base}/cheatsheet/" style="color:#6b7280;text-decoration:none">公式集</a>
    <a href="${base}/faq/" style="color:#6b7280;text-decoration:none">よくある質問</a>
    <a href="${base}/randomquiz/" style="color:#6b7280;text-decoration:none">ランダムクイズ</a>
    <a href="${base}/privacy/" style="color:#6b7280;text-decoration:none">プライバシーポリシー</a>
  </nav>
  <p style="font-size:0.8rem;color:#888;margin-top:16px;border-top:1px solid #eee;padding-top:12px">※本サイトは個人による学習支援サイトであり、統計質保証推進協会・日本統計学会の公式サイトではありません。</p>
</article>`;
}
