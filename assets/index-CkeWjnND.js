import{a as e}from"./rolldown-runtime-COnpUsM8.js";import{i as t,n,r,t as i}from"./motion-Ml2aNURp.js";import{i as a}from"./react-DL9wba-t.js";import{t as o}from"./katex-kEq3Onh-.js";import{a as s,c,d as l,f as u,i as d,l as f,n as p,o as m,r as h,s as g,t as _,u as v}from"./recharts-BprmY7hJ.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var ee=a(),y=e(t());function te(e){let t=e;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ne(e,t){let n=te(t),r=[];for(;r.length<e;){let e=Math.max(n(),1e-9),t=n(),i=Math.sqrt(-2*Math.log(e));r.push(i*Math.cos(2*Math.PI*t),i*Math.sin(2*Math.PI*t))}return r.slice(0,e)}var b=e=>e.reduce((e,t)=>e+t,0)/e.length,x=(e,t)=>{let n=b(e),r=b(t);return e.reduce((e,i,a)=>e+(i-n)*(t[a]-r),0)/e.length},re=(e,t)=>x(e,t)/Math.sqrt(x(e,e)*x(t,t)),S=e=>e.toFixed(2),C=e=>e.toFixed(1),w=`#4338ca`,T=`#d97706`,E=`#64748b`,ie=`#1e293b`;function ae(){let e=ne(36,11),t=ne(36,29),n=e,r=e.map((e,n)=>.7*e+.72*t[n]),i=b(n),a=b(r),o=-2.8,s=-2.8,c=e=>14+(e-o)/(2.8-o)*312,l=e=>214-(e-s)/(2.8-s)*188,u=c(i),d=l(a),f=n.map((e,t)=>(e-i)*(r[t]-a)),p=f.filter(e=>e>0).length,m=f.reduce((e,t,r)=>t>f[e]*.55&&Math.abs(n[r]-i)>.9&&t>0&&t<2.6?r:e,f.indexOf(Math.max(...f))),h=0;f.forEach((e,t)=>{e<f[h]&&(h=t)});let g=(e,t)=>{let i=Math.min(u,c(n[e])),a=Math.max(u,c(n[e])),o=Math.min(d,l(r[e])),s=Math.max(d,l(r[e]));return`<rect x="${C(i)}" y="${C(o)}" width="${C(a-i)}" height="${C(s-o)}" fill="${t}" fill-opacity="0.28" stroke="${t}" stroke-width="1.5" />`},_=n.map((e,t)=>{let n=t===m||t===h,i=f[t]>0?w:T;return`<circle cx="${C(c(e))}" cy="${C(l(r[t]))}" r="${n?4.2:3}" fill="${i}" fill-opacity="${n?1:.78}" />`}).join(``);return`<figure class="venn-figure">${`<svg viewBox="0 0 340 236" role="img" aria-label="共分散の4象限：平均を原点にすると、右上と左下の点は積が正、左上と右下の点は積が負になる" class="venn-svg">
    <rect x="${C(u)}" y="26" width="${C(326-u)}" height="${C(d-26)}" fill="${w}" fill-opacity="0.07" />
    <rect x="14" y="${C(d)}" width="${C(u-14)}" height="${C(214-d)}" fill="${w}" fill-opacity="0.07" />
    <rect x="14" y="26" width="${C(u-14)}" height="${C(d-26)}" fill="${T}" fill-opacity="0.09" />
    <rect x="${C(u)}" y="${C(d)}" width="${C(326-u)}" height="${C(214-d)}" fill="${T}" fill-opacity="0.09" />
    <line x1="14" y1="${C(d)}" x2="326" y2="${C(d)}" stroke="${E}" stroke-width="1.2" stroke-dasharray="4 3" />
    <line x1="${C(u)}" y1="26" x2="${C(u)}" y2="214" stroke="${E}" stroke-width="1.2" stroke-dasharray="4 3" />
    ${g(m,w)}${g(h,T)}
    ${_}
    <text x="322" y="40" text-anchor="end" font-size="12" font-weight="700" fill="${w}">積 ＞ 0</text>
    <text x="18" y="208" font-size="12" font-weight="700" fill="${w}">積 ＞ 0</text>
    <text x="18" y="40" font-size="12" font-weight="700" fill="#b45309">積 ＜ 0</text>
    <text x="322" y="208" text-anchor="end" font-size="12" font-weight="700" fill="#b45309">積 ＜ 0</text>
    <text x="${C(u+4)}" y="18" font-size="12" fill="${ie}">x̄</text>
    <text x="312" y="${C(d-5)}" font-size="12" fill="${ie}">ȳ</text>
    <text x="${340/2}" y="230" text-anchor="middle" font-size="12" fill="${E}">横軸 x（平均 x̄ より右ほど x−x̄ が正）／縦軸 y</text>
  </svg>`}<figcaption class="venn-caption">${`青は面積が正の点（右上と左下）、橙は負の点（左上と右下）です。この例では36点中${p}点が右上か左下にあり、Cov = ${S(x(n,r))}（相関係数 r = ${S(re(n,r))}）と正になります。点が左上から右下へ並べば負の点が増え、Cov は負になります。`}</figcaption></figure>`}function oe(){let e=ne(30,5),t=ne(30,17),n=ne(30,41),r=e.map((e,n)=>.9*e+.45*t[n]),i=e.map((e,t)=>.85*e+.5*n[t]),a=(e,t)=>{let n=x(e,t)/x(e,e);return{k:n,c:b(t)-n*b(e)}},o=a(e,r),s=a(e,i),c=r.map((t,n)=>t-(o.k*e[n]+o.c)),l=i.map((t,n)=>t-(s.k*e[n]+s.c)),u=re(r,i),d=re(r,e),f=re(i,e),p=re(c,l),m=(e,t,n,r,i,a,o)=>{let s=e+6,c=e+156-6,l=t+34,u=t+34+106-14,d=-2.6,f=2.6,p=e=>s+(e-d)/(f-d)*(c-s),m=e=>u-(e-d)/(f-d)*(u-l),h=`<rect x="${e}" y="${t}" width="156" height="140" rx="3" fill="none" stroke="#cbd5e1" stroke-width="1" />`;if(h+=`<text x="${e+6}" y="${t+15}" font-size="12" font-weight="700" fill="${ie}">${n}</text>`,h+=`<text x="${e+6}" y="${t+29}" font-size="12" fill="${E}">${r}</text>`,o.zero&&(h+=`<line x1="${s}" y1="${C(m(0))}" x2="${c}" y2="${C(m(0))}" stroke="${E}" stroke-width="1" stroke-dasharray="3 3" />`,h+=`<line x1="${C(p(0))}" y1="${l}" x2="${C(p(0))}" y2="${u}" stroke="${E}" stroke-width="1" stroke-dasharray="3 3" />`),o.line){let e=o.line.k*d+o.line.c,t=o.line.k*f+o.line.c;o.resid&&i.forEach((e,t)=>{let n=o.line.k*e+o.line.c;h+=`<line x1="${C(p(e))}" y1="${C(m(a[t]))}" x2="${C(p(e))}" y2="${C(m(n))}" stroke="${T}" stroke-width="1.2" />`}),h+=`<line x1="${C(p(d))}" y1="${C(Math.max(l,Math.min(u,m(e))))}" x2="${C(p(f))}" y2="${C(Math.max(l,Math.min(u,m(t))))}" stroke="${ie}" stroke-width="1.6" />`}return i.forEach((e,t)=>{h+=`<circle cx="${C(p(e))}" cy="${C(m(a[t]))}" r="2.8" fill="${o.color}" fill-opacity="0.85" />`}),h};return`<figure class="venn-figure">${`<svg viewBox="0 0 340 292" role="img" aria-label="偏相関の手順：X と Y の見かけの相関、Z で X と Y をそれぞれ回帰して残差を作り、残差どうしの相関を見る" class="venn-svg">
    ${m(0,0,`① X と Y そのまま`,`r = ${S(u)}（見かけ）`,r,i,{color:w})}
    ${m(172,0,`② Z で X を説明`,`橙の線＝残差 e_X`,e,r,{color:w,line:o,resid:!0})}
    ${m(0,152,`③ Z で Y を説明`,`橙の線＝残差 e_Y`,e,i,{color:w,line:s,resid:!0})}
    ${m(172,152,`④ 残差 e_X と e_Y`,`r = ${S(p)}（偏相関）`,c,l,{color:T,zero:!0})}
  </svg>`}<figcaption class="venn-caption">${`X（アイスの売上）と Y（溺死者数）は、どちらも Z（気温）に引っぱられて動きます。① そのままでは r = ${S(u)} と、強い正の相関に見えます。② ③ Z で X と Y をそれぞれ直線で説明し（Z との相関は r(X,Z) = ${S(d)}、r(Y,Z) = ${S(f)}）、直線で説明しきれなかった差（橙の線）を残差 e_X、e_Y とします。④ 気温の影響を引いた残差どうしを散布図にすると、相関は r = ${S(p)} までほぼ消えます。この ④ の相関が偏相関係数 r(XY·Z) で、前の式で計算した値と一致します。`}</figcaption></figure>`}var D=`#4338ca`,se=`#d97706`,ce=`#64748b`,le=`#1e293b`,O=e=>e.toFixed(1),ue=e=>e.toFixed(2);function de(){let e=e=>1*Math.exp(-1*e),t=e=>1-Math.exp(-1*e),n=e=>44+e/4*282,r=e=>150-e*126,i=e=>340-e*126,a=(e,t,r,i)=>{let a=[];for(let o=0;o<=60;o++){let s=r+(i-r)*o/60;a.push(`${O(n(s))},${O(t(e(s)))}`)}return a},o=a(e,r,0,4).join(` `),s=`${O(n(0))},${O(r(0))} ${a(e,r,0,1).join(` `)} ${O(n(1))},${O(r(0))}`,c=a(t,i,0,4).join(` `),l=e(1),u=.09999999999999998,d=1.9,f=e=>t(1)+l*(e-1),p=[0,1,2,3,4],m=(e,t,r)=>`
    <line x1="44" y1="${t}" x2="326" y2="${t}" stroke="${ce}" stroke-width="1.2" />
    <line x1="44" y1="${e}" x2="44" y2="${t}" stroke="${ce}" stroke-width="1.2" />
    ${p.map(e=>`<text x="${O(n(e))}" y="${t+15}" text-anchor="middle" font-size="12" fill="${ce}">${e}</text>`).join(``)}
    <text x="38" y="${O(r(0)+4)}" text-anchor="end" font-size="12" fill="${ce}">0</text>
    <text x="38" y="${O(r(1)+4)}" text-anchor="end" font-size="12" fill="${ce}">1</text>`;return`<figure class="venn-figure">${`<svg viewBox="0 0 340 386" role="img" aria-label="指数分布の確率密度関数と累積分布関数：PDF の 0 から x までの面積が、CDF の x での高さになる" class="venn-svg">
    <text x="44" y="14" font-size="12" font-weight="700" fill="${le}">上：確率密度関数 f(x)</text>
    ${m(24,150,r)}
    <polygon points="${s}" fill="${D}" fill-opacity="0.22" />
    <polyline points="${o}" fill="none" stroke="${D}" stroke-width="2.2" />
    <text x="${O(n(1)-6)}" y="${O(r(.18))}" text-anchor="end" font-size="12" font-weight="700" fill="${D}">面積 ${ue(t(1))}</text>
    <line x1="${O(n(1))}" y1="${O(r(e(1)))}" x2="${O(n(1))}" y2="150" stroke="${D}" stroke-width="1.4" />
    <text x="${O(n(1)+6)}" y="${O(r(e(1))-6)}" font-size="12" fill="${le}">高さ f(1) = ${ue(e(1))}</text>

    <text x="44" y="202" font-size="12" font-weight="700" fill="${le}">下：累積分布関数 F(x)</text>
    ${m(214,340,i)}
    <polyline points="${c}" fill="none" stroke="${se}" stroke-width="2.2" />
    <line x1="${O(n(u))}" y1="${O(i(f(u)))}" x2="${O(n(d))}" y2="${O(i(f(d)))}" stroke="${le}" stroke-width="1.4" stroke-dasharray="4 3" />
    <line x1="${O(n(1))}" y1="340" x2="${O(n(1))}" y2="${O(i(t(1)))}" stroke="${se}" stroke-width="1.2" stroke-dasharray="3 3" />
    <line x1="44" y1="${O(i(t(1)))}" x2="${O(n(1))}" y2="${O(i(t(1)))}" stroke="${se}" stroke-width="1.2" stroke-dasharray="3 3" />
    <circle cx="${O(n(1))}" cy="${O(i(t(1)))}" r="4.5" fill="${se}" />
    <text x="${O(n(1)+8)}" y="${O(i(t(1))+20)}" font-size="12" font-weight="700" fill="#b45309">F(1) = ${ue(t(1))}</text>
    <text x="${O(n(1.6))}" y="${O(i(.17))}" font-size="12" fill="${le}">破線の傾き = f(1) = ${ue(l)}</text>
    <text x="${O(370/2)}" y="382" text-anchor="middle" font-size="12" fill="${ce}">横軸 x（指数分布 λ = 1）</text>
  </svg>`}<figcaption class="venn-caption">${`指数分布（λ = 1）で、同じ x = 1 を2つの図で見ています。上の図で 0 から 1 までの<strong>面積</strong>（青）は ${ue(t(1))} で、これが下の図の F(1) = ${ue(t(1))}、つまり<strong>曲線の高さ</strong>になります。逆に、下の図の曲線の<strong>傾き</strong>（破線）は ${ue(l)} で、これが上の図の f(1) = ${ue(e(1))} という高さです。「PDF を積分すると CDF、CDF を微分すると PDF」は、面積と傾きの往復を言っています。`}</figcaption></figure>`}var k=`#4338ca`,A=`#d97706`,j=`#0f766e`,M=`#be123c`,N=`#64748b`,P=`#1e293b`,F=e=>e.toFixed(1),I=e=>e.toFixed(2),L=(e,t=1)=>(e*100).toFixed(t)+`%`,R=e=>String(Math.round(e*10)/10);function z(e){let t=[.9999999999998099,676.5203681218851,-1259.1392167224028,771.3234287776531,-176.61503916999186,12.507343278686905,-.13857109526572012,9984369578019572e-21,1.5056327351493116e-7];if(e<.5)return Math.log(Math.PI/Math.sin(Math.PI*e))-z(1-e);--e;let n=t[0];for(let r=1;r<9;r++)n+=t[r]/(e+r);let r=e+7.5;return .5*Math.log(2*Math.PI)+(e+.5)*Math.log(r)-r+Math.log(n)}var fe=(e,t)=>Math.exp(z(e+1)-z(t+1)-z(e-t+1)),pe=(e,t,n)=>fe(e,n)*t**n*(1-t)**(e-n),me=(e,t)=>Math.exp(-e+t*Math.log(e)-z(t+1)),B=(e,t=0,n=1)=>Math.exp(-.5*((e-t)/n)**2)/(n*Math.sqrt(2*Math.PI));function he(e){let t=Math.sign(e);e=Math.abs(e);let n=1/(1+.3275911*e);return t*(1-((((1.061405429*n-1.453152027)*n+1.421413741)*n-.284496736)*n+.254829592)*n*Math.exp(-e*e))}var V=e=>.5*(1+he(e/Math.SQRT2)),ge=e=>t=>t<=0?e===1?1:0:Math.exp((e-1)*Math.log(t)-t-z(e)),_e=(e,t)=>n=>n<=0||n>=1?0:Math.exp((e-1)*Math.log(n)+(t-1)*Math.log(1-n)-(z(e)+z(t)-z(e+t))),ve=e=>t=>t<=0?0:Math.exp(-.5*(Math.log(t)/e)**2)/(t*e*Math.sqrt(2*Math.PI)),ye=e=>1/(Math.PI*(1+e*e)),H=(e,t)=>e.x+(t-e.xMin)/(e.xMax-e.xMin)*e.w,U=(e,t)=>e.y+e.h-Math.min(t,e.yMax)/e.yMax*e.h;function W(e,t,n){let r=e.y+e.h;return`<line x1="${e.x}" y1="${r}" x2="${e.x+e.w}" y2="${r}" stroke="${N}" stroke-width="1" />
    ${t.map(t=>`<text x="${F(H(e,t))}" y="${r+14}" text-anchor="middle" font-size="12.4" fill="${N}">${t}</text>`).join(``)}
    ${n?`<text x="${e.x}" y="${e.y-4}" font-size="12.4" fill="${N}">${n}</text>`:``}`}function G(e,t,n,r=e.xMin,i=e.xMax,a=2,o=``){let s=[];for(let n=0;n<=120;n++){let a=r+(i-r)*n/120,o=t(a);isFinite(o)&&s.push(`${F(H(e,a))},${F(U(e,o))}`)}return`<polyline points="${s.join(` `)}" fill="none" stroke="${n}" stroke-width="${a}"${o?` stroke-dasharray="${o}"`:``} />`}function K(e,t,n,r,i,a=.22){let o=[`${F(H(e,n))},${F(U(e,0))}`];for(let i=0;i<=80;i++){let a=n+(r-n)*i/80;o.push(`${F(H(e,a))},${F(U(e,t(a)))}`)}return o.push(`${F(H(e,r))},${F(U(e,0))}`),`<polygon points="${o.join(` `)}" fill="${i}" fill-opacity="${a}" />`}function be(e,t,n,r,i=.18){let a=(H(e,1)-H(e,0))*(1-i);return t.map((t,i)=>{let o=H(e,t)-a/2,s=U(e,n[i]);return`<rect x="${F(o)}" y="${F(s)}" width="${F(a)}" height="${F(e.y+e.h-s)}" fill="${r}" fill-opacity="0.75" />`}).join(``)}var q=(e,t)=>`<figure class="venn-figure">${e}<figcaption class="venn-caption">${t}</figcaption></figure>`,J=(e,t,n)=>`<svg viewBox="0 0 ${e} ${t}" role="img" aria-label="${n}" class="venn-svg">`,xe=(e,t)=>Array.from({length:t-e+1},(t,n)=>e+n);function Se(){let e={x:40,y:30,w:286,h:120,xMin:.5,xMax:6.5,yMax:.25};return q(`${J(340,190,`サイコロの確率質量関数：6本の棒の高さがそれぞれ確率1/6`)}
    ${W(e,[1,2,3,4,5,6])}
    ${be(e,[1,2,3,4,5,6],[,,,,,,].fill(1/6),k,.35)}
    <line x1="${e.x}" y1="${F(U(e,1/6))}" x2="${e.x+e.w}" y2="${F(U(e,1/6))}" stroke="${P}" stroke-width="1" stroke-dasharray="3 3" />
    <text x="${e.x-6}" y="${F(U(e,1/6)+4)}" text-anchor="end" font-size="12.4" fill="${N}">1/6</text>
    <text x="${e.x+e.w/2}" y="${F(U(e,1/6)-8)}" text-anchor="middle" font-size="13.2" fill="${P}">P(X = x) ＝ 棒の高さ ＝ 1/6</text>
    <text x="${e.x+e.w/2}" y="184" text-anchor="middle" font-size="13.2" fill="${k}">横軸 ＝ 出た目 x　6本の高さの合計 ＝ 1</text>
  </svg>`,`サイコロの目の確率質量関数です。とりうる値（1〜6）ごとに棒が1本立ち、その<strong>高さ</strong>がそのまま確率 P(X = x) です。6本の高さを足すと 6 × 1/6 = 1 になります。`)}function Ce(){let e={x:14,y:34,w:312,h:130,xMin:152,xMax:188,yMax:.075},t=e=>B(e,170,6),n=V(2/6)-V(0/6);return q(`${J(340,210,`身長の確率密度関数：170から172cmに入る確率は曲線の下の塗った面積`)}
    ${W(e,[155,160,165,170,175,180,185])}
    ${K(e,t,170,172,A,.55)}
    ${G(e,t,A)}
    <line x1="${F(H(e,170))}" y1="${F(U(e,0))}" x2="${F(H(e,170))}" y2="${F(U(e,t(170))-10)}" stroke="${P}" stroke-width="1" />
    <line x1="${F(H(e,172))}" y1="${F(U(e,0))}" x2="${F(H(e,172))}" y2="${F(U(e,t(170))-10)}" stroke="${P}" stroke-width="1" />
    <text x="${F(H(e,171))}" y="${e.y-14}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">170〜172cm の面積 ＝ ${I(n)}</text>
    <text x="${F(H(e,179))}" y="${F(U(e,t(179))-18)}" font-size="13.2" fill="${P}">曲線 f(x)</text>
    <text x="${e.x+e.w/2}" y="204" text-anchor="middle" font-size="13.2" fill="${N}">横軸 ＝ 身長 x（cm）　曲線の下の面積の合計 ＝ 1</text>
  </svg>`,`身長の分布を、平均 170cm・標準偏差 6cm の正規分布（左右対称の釣鐘形の分布。<a href="/stats-pre1/1.10-normal-dist/">正規分布の性質</a>で詳しく学びます）と仮定して描いた確率密度関数です。「170〜172cm に入る確率」は、その区間で曲線の下を塗った<strong>面積</strong>で、約 ${I(n)} です。区間の幅を狭めると面積も小さくなり、幅が0の「ぴったり170cm」では面積が0、つまり確率0です。`)}function we(){let e={x:40,y:30,w:286,h:110,xMin:-.25,xMax:1.25,yMax:2.4};return q(`${J(340,180,`0から0.5の一様分布では密度の高さが2になるが、面積は1`)}
    ${W(e,[0,.5,1])}
    <rect x="${F(H(e,0))}" y="${F(U(e,2))}" width="${F(H(e,.5)-H(e,0))}" height="${F(U(e,0)-U(e,2))}" fill="${A}" fill-opacity="0.35" stroke="${A}" stroke-width="2" />
    <line x1="${e.x}" y1="${F(U(e,1))}" x2="${e.x+e.w}" y2="${F(U(e,1))}" stroke="${N}" stroke-width="1" stroke-dasharray="3 3" />
    <text x="${e.x-6}" y="${F(U(e,1)+4)}" text-anchor="end" font-size="12.4" fill="${N}">1</text>
    <text x="${e.x-6}" y="${F(U(e,2)+4)}" text-anchor="end" font-size="12.4" fill="${N}">2</text>
    <text x="${F(H(e,.25))}" y="${F(U(e,.45))}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">面積 1</text>
    <text x="${F(H(e,.58))}" y="${F(U(e,1.45))}" font-size="13.2" fill="#b45309">幅 0.5 × 高さ 2 ＝ 1</text>
    <text x="${F(H(e,.55))}" y="${F(U(e,2)+4)}" font-size="13.2" fill="${P}">高さ 2（1を超える）</text>
    <text x="${e.x+e.w/2}" y="174" text-anchor="middle" font-size="13.2" fill="${N}">0〜0.5 の一様分布</text>
  </svg>`,`0〜0.5 のどこかに一様に出る値の確率密度関数です。幅が 0.5 しかないので、面積を1にするには高さが2必要です。高さ（密度）は1を超えていますが、確率はどの区間でも面積で測るので1を超えることはありません。`)}function Te(){let e={x:34,y:20,w:290,h:150,xMin:0,xMax:3,yMax:1.05},t=e=>1-Math.exp(-e),n=e=>Math.exp(-e),r=Math.log(2);return q(`${J(340,210,`累積分布関数と生存関数は足すと常に1になり、中央値で交わる`)}
    ${W(e,[0,1,2,3])}
    <text x="${e.x-6}" y="${F(U(e,1)+4)}" text-anchor="end" font-size="12.4" fill="${N}">1</text>
    <text x="${e.x-6}" y="${F(U(e,.5)+4)}" text-anchor="end" font-size="12.4" fill="${N}">0.5</text>
    ${G(e,t,A)}
    ${G(e,n,j)}
    <line x1="${F(H(e,2))}" y1="${F(U(e,0))}" x2="${F(H(e,2))}" y2="${F(U(e,1))}" stroke="${N}" stroke-width="1" stroke-dasharray="3 3" />
    <text x="${F(H(e,2)+5)}" y="${F(U(e,t(2))+14)}" font-size="13.2" fill="#b45309">F(2) = ${I(t(2))}</text>
    <text x="${F(H(e,2)+5)}" y="${F(U(e,n(2))-6)}" font-size="13.2" fill="${j}">S(2) = ${I(n(2))}</text>
    <circle cx="${F(H(e,r))}" cy="${F(U(e,.5))}" r="3.5" fill="${P}" />
    <text x="${F(H(e,r)+6)}" y="${F(U(e,.5)-6)}" font-size="13.2" fill="${P}">x = ${I(r)} で交わる（中央値）</text>
    <text x="${F(H(e,2.55))}" y="${F(U(e,t(2.55))-6)}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">F(x)</text>
    <text x="${F(H(e,.35))}" y="${F(U(e,n(.35))-6)}" font-size="13.2" font-weight="700" fill="${j}">S(x)</text>
    <text x="${e.x+e.w/2}" y="206" text-anchor="middle" font-size="12.4" fill="${N}">横軸 x（指数分布 λ = 1。例：故障までの年数）</text>
  </svg>`,`指数分布（λ = 1）で、<strong>F(x)</strong>（x 以下で終わる確率）と<strong>S(x)</strong>（x を超えて続く確率）を重ねました。どの x でも2本の高さを足すと1です（x = 2 なら ${I(t(2))} + ${I(n(2))} = 1）。F は0から1へ上がり、S は1から0へ下がり、両者は確率がちょうど半々になる中央値 x = ${I(r)} で交わります。`)}function Ee(){let e={x:30,y:24,w:294,h:146,xMin:-3,xMax:4,yMax:1.05},t=e=>B(e);return q(`${J(340,210,`平均0・分散1が同じでも、歪度が違う2つの分布`)}
    ${W(e,[-3,-2,-1,0,1,2,3,4])}
    <line x1="${F(H(e,0))}" y1="${e.y}" x2="${F(H(e,0))}" y2="${e.y+e.h}" stroke="${N}" stroke-width="1" stroke-dasharray="3 3" />
    ${K(e,t,-3,4,k,.12)}
    ${G(e,t,k)}
    ${G(e,e=>e<-1?0:Math.exp(-(e+1)),A,-1,4)}
    <line x1="${F(H(e,-1))}" y1="${F(U(e,0))}" x2="${F(H(e,-1))}" y2="${F(U(e,1))}" stroke="${A}" stroke-width="2" />
    <text x="${F(H(e,-1.12))}" y="${F(U(e,.62))}" text-anchor="end" font-size="13.2" font-weight="700" fill="${k}">正規分布</text>
    <text x="${F(H(e,-1.12))}" y="${F(U(e,.62)+15)}" text-anchor="end" font-size="13.2" fill="${k}">歪度 0・尖度 3</text>
    <text x="${F(H(e,1.3))}" y="${F(U(e,.42))}" font-size="13.2" font-weight="700" fill="#b45309">右に裾が長い分布</text>
    <text x="${F(H(e,1.3))}" y="${F(U(e,.42)+15)}" font-size="13.2" fill="#b45309">歪度 2・尖度 9</text>
    <text x="${F(H(e,0)+4)}" y="${e.y+10}" font-size="12.4" fill="${N}">平均 0</text>
    <text x="${e.x+e.w/2}" y="206" text-anchor="middle" font-size="12.4" fill="${N}">どちらも 平均 0・分散 1（1次と2次のモーメントが同じ）</text>
  </svg>`,`青は平均0・分散1の正規分布、橙は指数分布（本文の節2で使った待ち時間の分布）を1だけ左にずらしたもの（X − 1、X は λ = 1 の指数分布）です。どちらも<strong>平均 0・分散 1</strong>で、期待値と分散だけでは区別できません。違いが出るのは3次と4次の中心モーメントで、歪度は 0 と 2、尖度は 3 と 9 です。「次数を上げるほど形を細かく区別できる」とはこのことです。`)}function De(){let e={x:20,y:30,w:304,h:140,xMin:0,xMax:16,yMax:.45},t=e=>B(e,5,1),n=e=>B(e,8,1),r=e=>B(e,10,2);return q(`${J(340,220,`定数を足すと分布は形を変えずに平行移動し、定数倍すると横に伸びて低くなる`)}
    ${W(e,[0,2,4,6,8,10,12,14,16])}
    ${G(e,t,k)}
    ${G(e,n,j,e.xMin,e.xMax,2,`5 3`)}
    ${G(e,r,A)}
    <text x="${F(H(e,4.3))}" y="${F(U(e,t(5))+4)}" text-anchor="end" font-size="13.2" font-weight="700" fill="${k}">X</text>
    <text x="${F(H(e,4.3))}" y="${F(U(e,t(5))+18)}" text-anchor="end" font-size="12.4" fill="${k}">平均5・SD1</text>
    <text x="${F(H(e,8.7))}" y="${F(U(e,n(8))+4)}" font-size="13.2" font-weight="700" fill="${j}">X + 3</text>
    <text x="${F(H(e,8.7))}" y="${F(U(e,n(8))+18)}" font-size="12.4" fill="${j}">平均8・SD1</text>
    <text x="${F(H(e,13))}" y="${F(U(e,r(12))-4)}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">2X</text>
    <text x="${F(H(e,13.6))}" y="${F(U(e,r(12))+11)}" text-anchor="middle" font-size="12.4" fill="#b45309">平均10・SD2</text>
  </svg>`,`X（平均5・標準偏差1）に<strong>3を足す</strong>と、山はそのまま右へ3ずれるだけで幅は変わりません（分散は1のまま）。<strong>2倍する</strong>と平均は10になり、幅は2倍、そのぶん山は半分の高さになります。分散は 2² = 4 倍です。Var(aX + b) = a²Var(X) の b が消えて a が2乗で効くのは、この「ずらしても幅は変わらない・伸ばすと幅が a 倍」の言い換えです。`)}function Oe(){let e=[{n:10,p:.2},{n:10,p:.5},{n:10,p:.8},{n:50,p:.2}],t=t=>{let n=t%2,r=Math.floor(t/2);return e[t].n===50?{x:194,y:44+r*162,w:146,h:100,xMin:-.5,xMax:25.5,yMax:.32}:{x:18+n*176,y:44+r*162,w:146,h:100,xMin:-.5,xMax:10.5,yMax:.32}},n=e.map((e,n)=>{let r=t(n),i=e.n===50?xe(0,25):xe(0,10),a=i.map(t=>pe(e.n,e.p,t)),o=e.n*e.p,s=Math.sqrt(e.n*e.p*(1-e.p)),c=e.n===50?[0,5,10,15,20,25]:[0,2,4,6,8,10];return`<text x="${r.x}" y="${r.y-22}" font-size="13.2" font-weight="700" fill="${P}">B(${e.n}, ${e.p})</text>
      <text x="${r.x}" y="${r.y-7}" font-size="12.4" fill="${N}">平均 ${o}・SD ${I(s)}</text>
      ${W(r,c)}
      ${be(r,i,a,e.n===50?j:k,e.n===50?.25:.3)}
      <line x1="${F(H(r,o))}" y1="${r.y}" x2="${F(H(r,o))}" y2="${r.y+r.h}" stroke="${A}" stroke-width="1.4" stroke-dasharray="3 2" />`}).join(``),r=`${J(350,350,`二項分布の形：p が小さいと右に裾、p=0.5 で左右対称、p が大きいと左に裾、n を大きくすると釣鐘形に近づく`)}${n}
    <text x="${350/2}" y="344" text-anchor="middle" font-size="12.4" fill="${N}">棒の高さ ＝ P(X = k)。橙の点線 ＝ 平均 np</text>
  </svg>`,i=pe(10,.2,0),a=pe(10,.2,2),o=Math.max(...xe(0,50).map(e=>pe(50,.2,e)));return q(r,`成功確率 p が小さい B(10, 0.2) は0〜2回に山があり、右に裾を引きます（0回の確率 ${I(i)}、2回が最大で ${I(a)}）。p = 0.5 で左右対称、p = 0.8 では鏡に映したように左へ裾を引きます。同じ p = 0.2 でも n を 50 に増やすと、山は平均 np = 10 に移り、左右がほぼ対称な釣鐘形になります（最も高い棒は ${I(o)}）。これが後で学ぶ「二項分布の正規近似」が n の大きいときに使える理由です。`)}function ke(){let e=[17.5,19.5],t=(t,n,r,i)=>{let a=312/n,o=new Set(e.map(e=>Math.floor(e/(60/n)))),s=xe(0,n-1).map(e=>`<rect x="${F(14+e*a)}" y="${t}" width="${F(a)}" height="26" fill="${o.has(e)?A:`#ffffff`}" fill-opacity="${o.has(e)?.45:1}" stroke="${N}" stroke-width="${n>20?.5:1}" />`).join(``),c=e.map(e=>`<circle cx="${F(14+e/60*312)}" cy="${t+13}" r="3.4" fill="${M}" />`).join(``);return`<text x="14" y="${t-7}" font-size="13.2" font-weight="700" fill="${P}">${r}</text>
      <text x="326" y="${t-7}" text-anchor="end" font-size="12.4" fill="${n>20?j:`#b45309`}">${i}</text>
      ${s}${c}`};return q(`${J(340,196,`1時間を5分ごとの12区間と1分ごとの60区間に区切った図。17分台と19分台の2件の事故が、12区間では同じ区間に入り、60区間では別々の区間に分かれる`)}
    ${t(40,12,`5分ごとに 12 区間`,`2件が同じ区間に入る`)}
    ${t(112,60,`1分ごとに 60 区間`,`別々の区間に分かれる`)}
    ${[0,15,30,45,60].map(e=>`<text x="${F(14+e/60*312)}" y="156" text-anchor="middle" font-size="12.4" fill="${N}">${e}分</text>`).join(``)}
    <circle cx="18" cy="182" r="3.4" fill="${M}" />
    <text x="26" y="186" font-size="12.4" fill="${P}">＝ 事故　</text>
    <rect x="84" y="175" width="12" height="12" fill="${A}" fill-opacity="0.45" stroke="${N}" stroke-width="1" />
    <text x="102" y="186" font-size="12.4" fill="${P}">＝「起きた」と数える区間</text>
  </svg>`,`1時間のうち、17分台と19分台に事故が2件起きた例です。5分ごとの12区間に区切ると、2件とも同じ区間（15〜20分）に入ってしまい、区間ごとの「起きた／起きない」で数えると1件になってしまいます。1分ごとの60区間なら別々の区間に分かれ、2件と正しく数えられます。区間を細かくするほど、件数を「事故が起きた区間の数」、つまり二項分布として扱えるようになります。`)}function Ae(){let e={x:18,y:40,w:312,h:150,xMin:-.5,xMax:12.5,yMax:.3},t=xe(0,12),n=t.map(e=>e<=8?pe(8,.5,e):0),r=t.map(e=>pe(100,.04,e)),i=t.map((t,r)=>`<circle cx="${F(H(e,t))}" cy="${F(U(e,n[r]))}" r="3.4" fill="${A}" />`).join(``),a=t.map((t,n)=>`<circle cx="${F(H(e,t))}" cy="${F(U(e,r[n]))}" r="3.6" fill="none" stroke="${P}" stroke-width="1.4" />`).join(``),o=`${J(340,230,`ポアソン分布 λ=4 の棒に、二項分布 B(8,0.5) と B(100,0.04) を点で重ねた図。100区間の方が棒の頭にほぼ重なる`)}
    ${W(e,[0,2,4,6,8,10,12])}
    ${be(e,t,t.map(e=>me(4,e)),k,.35)}
    ${i}${a}
    <rect x="${e.x+e.w-168}" y="${e.y-34}" width="10" height="10" fill="${k}" fill-opacity="0.75" />
    <text x="${e.x+e.w-152}" y="${e.y-25}" font-size="12.4" fill="${P}">ポアソン分布 λ = 4</text>
    <circle cx="${e.x+e.w-163}" cy="${e.y-12}" r="3.4" fill="${A}" />
    <text x="${e.x+e.w-152}" y="${e.y-8}" font-size="12.4" fill="#b45309">B(8, 0.5)：8 区間</text>
    <circle cx="${e.x+e.w-163}" cy="${e.y+5}" r="3.6" fill="none" stroke="${P}" stroke-width="1.4" />
    <text x="${e.x+e.w-152}" y="${e.y+9}" font-size="12.4" fill="${P}">B(100, 0.04)：100 区間</text>
    <text x="${e.x+e.w/2}" y="226" text-anchor="middle" font-size="12.4" fill="${N}">横軸 k（1時間の件数）／高さ ＝ P(X = k)</text>
  </svg>`,s=Math.max(...t.map((e,t)=>Math.abs(r[t]-me(4,e))));return q(o,`棒は平均4件のポアソン分布です。● は1時間を8区間に区切った二項分布 B(8, 0.5)、○ は100区間に区切った B(100, 0.04) で、どちらも平均は4件です。8区間では山が高く細く（4件の確率が ${I(n[4])}、ポアソン分布では ${I(me(4,4))}）、区間が8つしかないので9件以上は起こりえません。100区間にすると ○ は棒の頭とほぼ重なります（どの k でも差は ${s.toFixed(3)} 以下）。区間を細かくするほど二項分布がポアソン分布に近づく、というのがポアソン分布の式の成り立ちです。`)}function je(){let e={x:26,y:26,w:312,h:160,xMin:-.5,xMax:18.5,yMax:.4},t=[{l:1,c:k},{l:4,c:A},{l:10,c:j}],n=xe(0,18),r=(H(e,1)-H(e,0))*.26,i=t.map(({l:t,c:i},a)=>n.map(n=>{let o=U(e,me(t,n));return`<rect x="${F(H(e,n)-1.5*r+a*r)}" y="${F(o)}" width="${F(r)}" height="${F(e.y+e.h-o)}" fill="${i}" fill-opacity="0.8" />`}).join(``)).join(``);return q(`${J(350,240,`ポアソン分布の形：λ が大きいほど山が右に移り、低く広がる`)}
    ${W(e,[0,2,4,6,8,10,12,14,16,18])}
    ${i}
    <text x="${F(H(e,1)+6)}" y="${F(U(e,me(1,0))+2)}" font-size="13.2" font-weight="700" fill="${k}">λ = 1</text>
    <text x="${F(H(e,4)+8)}" y="${F(U(e,me(4,4))-8)}" font-size="13.2" font-weight="700" fill="#b45309">λ = 4</text>
    <text x="${F(H(e,10)+6)}" y="${F(U(e,me(10,10))-8)}" font-size="13.2" font-weight="700" fill="${j}">λ = 10</text>
    <text x="${e.x+e.w/2}" y="236" text-anchor="middle" font-size="12.4" fill="${N}">横軸 k（一定時間に起きる回数）／棒の高さ ＝ P(X = k)</text>
  </svg>`,`λ = 1 では0件と1件が同じ高さ（どちらも ${I(me(1,0))}）で、そこから急に減ります。λ = 4、10 と大きくなるにつれて、山は右へ移り、低く横に広がって、左右対称の形に近づきます。山の位置は平均 λ のあたりにあり、λ が大きいほど広がる理由は、すぐ下の「分散も λ」で説明します。λ が大きいと左右対称に近づくので、<a href="/stats-pre1/1.10-normal-dist/">正規分布</a>（左右対称の釣鐘形の分布）で近似できるようになります（この節の後半）。`)}function Me(){let e={x:14,y:40,w:316,h:150,xMin:5.5,xMax:27.5,yMax:.11},t=xe(6,27),n=H(e,1)-H(e,0),r=t.map(t=>{let r=U(e,me(16,t)),i=t<=20;return`<rect x="${F(H(e,t-.5))}" y="${F(r)}" width="${F(n)}" height="${F(e.y+e.h-r)}" fill="${i?k:N}" fill-opacity="${i?.55:.2}" stroke="#ffffff" stroke-width="0.8" />`}).join(``),i=e=>B(e,16,4),a=xe(0,20).reduce((e,t)=>e+me(16,t),0),o=V(4.5/4),s=V(4/4),c=(t,n,r)=>`<line x1="${F(H(e,t))}" y1="${e.y-4}" x2="${F(H(e,t))}" y2="${e.y+e.h}" stroke="${n}" stroke-width="1.6"${r?` stroke-dasharray="${r}"`:``} />`;return q(`${J(340,236,`ポアソン分布 λ=16 の棒に正規分布の曲線を重ねた図。20件の棒は19.5から20.5までの幅を持つので、20件以下は20.5までの面積で近似する`)}
    ${W(e,[8,12,16,20,24])}
    ${r}
    ${G(e,i,A,e.xMin,e.xMax,2.2)}
    ${c(20,M,`4 3`)}${c(20.5,j,``)}
    <text x="${F(H(e,20)-4)}" y="${e.y-22}" text-anchor="end" font-size="12.4" fill="${M}">20 で切る</text>
    <text x="${F(H(e,20)-4)}" y="${e.y-8}" text-anchor="end" font-size="12.4" fill="${M}">→ ${I(s)}</text>
    <text x="${F(H(e,20.5)+4)}" y="${e.y-22}" font-size="12.4" font-weight="700" fill="${j}">20.5 で切る</text>
    <text x="${F(H(e,20.5)+4)}" y="${e.y-8}" font-size="12.4" font-weight="700" fill="${j}">→ ${I(o)}</text>
    <text x="${e.x+e.w/2}" y="232" text-anchor="middle" font-size="12.4" fill="${N}">青の棒 ＝ 20件以下（合計 ${I(a)}）／橙 ＝ 正規分布</text>
  </svg>`,`平均16件のポアソン分布（棒）に、平均16・標準偏差4の正規分布（橙の曲線）を重ねました。棒は1本ずつ、整数 k を中心に k − 0.5 から k + 0.5 までの幅を持っています。20件以下の確率（青の棒の合計 ${I(a)}）を曲線の下の面積で近似するとき、20 で切ると20件の棒の右半分が入らず ${I(s)} と小さく出ます。20.5 で切れば棒が丸ごと入り、${I(o)} とほぼ一致します。これが連続修正です。`)}function Ne(){let e=1/6,t={x:14,y:30,w:316,h:150,xMin:.5,xMax:20.5,yMax:.18},n=xe(1,20),r=n.map(t=>(1-e)**(t-1)*e),i=(1-e)**10;return q(`${J(340,220,`サイコロで初めて6が出る回数の分布。1回目が最も高く、そこから5/6倍ずつ低くなる。平均は6回目`)}
    ${W(t,[1,5,10,15,20])}
    ${be(t,n.slice(0,10),r.slice(0,10),k,.3)}${be(t,n.slice(10),r.slice(10),N,.3)}
    <line x1="${F(H(t,6))}" y1="${t.y}" x2="${F(H(t,6))}" y2="${t.y+t.h}" stroke="${A}" stroke-width="1.6" stroke-dasharray="4 3" />
    <text x="${F(H(t,6)+5)}" y="${t.y+10}" font-size="12.4" font-weight="700" fill="#b45309">平均 1/p ＝ 6 回目</text>
    <text x="${F(H(t,1)+8)}" y="${F(U(t,r[0])+4)}" font-size="12.4" fill="${k}">1回目 ${I(r[0])}</text>
    <text x="${F(H(t,15))}" y="${F(U(t,r[10])-26)}" text-anchor="middle" font-size="12.4" fill="${N}">灰色（11回目以降）の合計 ${I(i)}</text>
    <text x="${t.x+t.w/2}" y="216" text-anchor="middle" font-size="12.4" fill="${N}">横軸 k（初めて6が出る回）／高さ ＝ P(X = k)</text>
  </svg>`,`サイコロで初めて6が出る回の分布（p = 1/6）です。山の頂上は1回目で、平均の6回目より左にあります。灰色の棒（11回目以降）の合計が、10回振っても出ない確率で、約${Math.round(i*100)}%です。`)}var Pe=.05,Fe=e=>e<0?0:Pe*Math.exp(-Pe*e);function Ie(){let e={x:14,y:34,w:316,h:150,xMin:0,xMax:100,yMax:.055},t=Math.exp(-Pe*20);return q(`${J(340,226,`指数分布：次の電話までの待ち時間。0分のところが最も高く、右へなだらかに下がる。20分より長く待つ確率は約0.37`)}
    ${W(e,[0,20,40,60,80,100])}
    ${K(e,Fe,20,100,k,.2)}
    ${G(e,Fe,k,0,100,2.2)}
    <line x1="${F(H(e,20))}" y1="${e.y}" x2="${F(H(e,20))}" y2="${e.y+e.h}" stroke="${A}" stroke-width="1.6" stroke-dasharray="4 3" />
    <text x="${F(H(e,20)+5)}" y="${e.y+10}" font-size="12.4" font-weight="700" fill="#b45309">平均 20分</text>
    <text x="${F(H(e,52))}" y="${F(U(e,Fe(40))-12)}" font-size="12.4" fill="${k}">20分より長く待つ確率</text>
    <text x="${F(H(e,52))}" y="${F(U(e,Fe(40))+4)}" font-size="12.4" font-weight="700" fill="${k}">＝ 塗った面積 ${I(t)}</text>
    <text x="${e.x+e.w/2}" y="222" text-anchor="middle" font-size="12.4" fill="${N}">横軸 t（次の電話までの待ち時間・分）／高さ ＝ 密度</text>
  </svg>`,`1時間に平均3件の電話が来る窓口で、次の電話までの待ち時間の分布です。すぐ来ることがいちばん多く、長く待つほど起こりにくくなります。平均は20分ですが、20分より長く待つことも約${Math.round(t*100)}%あります。`)}var Le=e=>t=>Pe*ge(e)(Pe*t);function Re(){let e={x:14,y:34,w:316,h:150,xMin:0,xMax:150,yMax:.055},t=[{k:1,c:k,lx:6,ly:.046,t:`1件目（指数分布）`},{k:2,c:A,lx:22,ly:.024,t:`2件目`},{k:3,c:j,lx:62,ly:.0165,t:`3件目`}];return q(`${J(340,226,`ガンマ分布：1件目・2件目・3件目の電話が来るまでの待ち時間。件数が増えるほど山が右へ移り、低く広がる。平均は20分・40分・60分`)}
    ${W(e,[0,30,60,90,120,150])}
    ${t.map(({k:t,c:n})=>G(e,Le(t),n,.01,150,2.2)).join(``)}
    ${t.map(({k:t,c:n})=>`<line x1="${F(H(e,20*t))}" y1="${F(U(e,Le(t)(20*t)))}" x2="${F(H(e,20*t))}" y2="${e.y+e.h}" stroke="${n}" stroke-width="1.2" stroke-dasharray="3 3" />`).join(``)}
    ${t.map(({c:t,lx:n,ly:r,t:i})=>`<text x="${F(H(e,n))}" y="${F(U(e,r))}" font-size="12.4" font-weight="700" fill="${t===A?`#b45309`:t}">${i}</text>`).join(``)}
    <text x="${e.x+e.w/2}" y="222" text-anchor="middle" font-size="12.4" fill="${N}">横軸 t（分）／点線 ＝ 平均（20分・40分・60分）</text>
  </svg>`,`同じ窓口で、1件目・2件目・3件目の電話が来るまでの待ち時間です。待つ件数 α が増えるほど山は右へ移り、低く横に広がります。平均は 20分 × α です。`)}function ze(){let e={x:14,y:34,w:316,h:150,xMin:0,xMax:1,yMax:2.7};return q(`${J(340,226,`ベータ分布：0から1の値の分布。(2,5) は左寄り、(5,2) は右寄り、(2,2) は真ん中、(1,1) は平らな一様分布`)}
    ${W(e,[0,.25,.5,.75,1])}
    ${G(e,()=>1,N,0,1,1.5,`4 3`)}
    ${G(e,_e(2,5),k,.001,.999,2.2)}${G(e,_e(5,2),A,.001,.999,2.2)}${G(e,_e(2,2),j,.001,.999,2.2)}
    <text x="${F(H(e,.1))}" y="${F(U(e,2.55))}" font-size="12.4" font-weight="700" fill="${k}">(2, 5)</text>
    <text x="${F(H(e,.83))}" y="${F(U(e,2.55))}" font-size="12.4" font-weight="700" fill="#b45309">(5, 2)</text>
    <text x="${F(H(e,.5))}" y="${F(U(e,1.62))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${j}">(2, 2)</text>
    <text x="${e.x+e.w/2}" y="222" text-anchor="middle" font-size="12.4" fill="${N}">横軸 x（割合）／点線 (1, 1) ＝ 一様分布</text>
  </svg>`,`α が β より大きいと山は右寄り、小さいと左寄りになり、等しいと真ん中で左右対称になります。平均は α/(α+β) で、(2, 5) は 0.29、(5, 2) は 0.71、(2, 2) は 0.5 です。(1, 1) は0〜1のどこも同じ高さの一様分布です。`)}function Be(){let e={x:14,y:34,w:316,h:150,xMin:0,xMax:5,yMax:.95},t=Math.exp(.5);return q(`${J(340,226,`対数正規分布：0より大きい値だけをとり、右に長い裾を引く。σ=1 では中央値1、平均1.65で、平均が中央値より右にある`)}
    ${W(e,[0,1,2,3,4,5])}
    ${G(e,ve(.5),j,.01,5,1.8,`5 3`)}
    ${G(e,ve(1),k,.01,5,2.2)}
    <line x1="${F(H(e,1))}" y1="${F(U(e,ve(1)(1)))}" x2="${F(H(e,1))}" y2="${e.y+e.h}" stroke="${N}" stroke-width="1.4" />
    <line x1="${F(H(e,t))}" y1="${F(U(e,ve(1)(t)))}" x2="${F(H(e,t))}" y2="${e.y+e.h}" stroke="${A}" stroke-width="1.6" stroke-dasharray="4 3" />
    <text x="${F(H(e,t)+5)}" y="${F(U(e,.42))}" font-size="12.4" font-weight="700" fill="#b45309">平均 ${I(t)}</text>
    <text x="${F(H(e,2.3))}" y="${F(U(e,.22))}" font-size="12.4" font-weight="700" fill="${k}">σ = 1</text>
    <text x="${F(H(e,1.25))}" y="${F(U(e,.82))}" font-size="12.4" font-weight="700" fill="${j}">σ = 0.5</text>
    <text x="${e.x+e.w/2}" y="222" text-anchor="middle" font-size="12.4" fill="${N}">灰の線 ＝ 中央値 1／橙の点線 ＝ 平均（σ = 1）</text>
  </svg>`,`ln X が平均0の正規分布に従うときの X の分布です。0より大きい値だけをとり、右に長い裾を引きます。σ = 1 では、真ん中の値（中央値）は1なのに、平均は裾に引っ張られて ${I(t)} になります。σ が大きいほど裾は長くなります。`)}function Ve(){let e={x:14,y:34,w:316,h:150,xMin:-6,xMax:6,yMax:.42},t=2*(1-V(3)),n=1-2/Math.PI*Math.atan(3);return q(`${J(340,226,`コーシー分布と標準正規分布：コーシー分布は山が低く裾が重い。3より外に出る確率は正規分布0.27%、コーシー分布20.5%`)}
    ${W(e,[-6,-3,0,3,6])}
    ${K(e,ye,-6,-3,M,.25)}${K(e,ye,3,6,M,.25)}
    ${G(e,e=>B(e),k,-6,6,2.2)}${G(e,ye,M,-6,6,2.2)}
    <text x="${F(H(e,.6))}" y="${F(U(e,.39))}" font-size="12.4" font-weight="700" fill="${k}">標準正規</text>
    <text x="${F(H(e,1.2))}" y="${F(U(e,.2))}" font-size="12.4" font-weight="700" fill="${M}">コーシー</text>
    <text x="${F(H(e,4.5))}" y="${F(U(e,.13))}" text-anchor="middle" font-size="12.4" fill="${M}">3 より外</text>
    <text x="${F(H(e,4.5))}" y="${F(U(e,.13)+15)}" text-anchor="middle" font-size="12.4" fill="${M}">（両側で ${L(n)}）</text>
    <text x="${e.x+e.w/2}" y="222" text-anchor="middle" font-size="12.4" fill="${N}">塗った面積 ＝ |X| が3を超える確率（正規は ${L(t,2)}）</text>
  </svg>`,`コーシー分布は真ん中の山が低く、そのぶん裾がゆっくりとしか下がりません。|X| が3を超える確率は、標準正規分布では ${L(t,2)} ですが、コーシー分布では ${L(n)} もあります。`)}function He(){let e={x:14,y:46,w:322,h:140,xMin:170-3.6*6,xMax:191.6,yMax:B(170,170,6)*1.08},t=e=>B(e,170,6),n=[3,2,1],r=[`#e0e7ff`,`#a5b4fc`,`#6366f1`],i=e=>2*V(e)-1;return q(`${J(350,250,`身長が平均170cm・標準偏差6cmの正規分布で、平均から1σ・2σ・3σの範囲に入る割合`)}
    ${n.map((n,i)=>K(e,t,170-n*6,170+n*6,r[i],.9)).join(``)}
    ${G(e,t,k)}
    ${W(e,[152,158,164,170,176,182,188])}
    <text x="${F(H(e,170))}" y="${F(U(e,t(170)*.35))}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#fff">±1σ ${L(i(1))}</text>
    <text x="${F(H(e,170-1.5*6))}" y="${F(U(e,t(170)*.08))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${P}">±2σ</text>
    <text x="${F(H(e,185.3))}" y="${F(U(e,t(170)*.2))}" text-anchor="middle" font-size="12.4" fill="${P}">±3σ</text>
    <text x="${350/2}" y="14" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">±1σ：${L(i(1))}　±2σ：${L(i(2))}　±3σ：${L(i(3))}</text>
    <text x="${350/2}" y="31" text-anchor="middle" font-size="13.2" fill="${M}">ちょうど95%になるのは ±1.96σ（158.2〜181.8cm）</text>
    <line x1="${F(H(e,170-1.96*6))}" y1="${e.y}" x2="${F(H(e,170-1.96*6))}" y2="${e.y+e.h}" stroke="${M}" stroke-width="1.2" stroke-dasharray="3 2" />
    <line x1="${F(H(e,181.76))}" y1="${e.y}" x2="${F(H(e,181.76))}" y2="${e.y+e.h}" stroke="${M}" stroke-width="1.2" stroke-dasharray="3 2" />
    <text x="${e.x+e.w/2}" y="246" text-anchor="middle" font-size="12.4" fill="${N}">身長（cm）。平均 170・標準偏差 6</text>
  </svg>`,`本文の身長の例（平均 170cm・標準偏差 6cm）を描いたものです。濃い順に、平均から ±1σ（164〜176cm）に ${L(i(1))}、±2σ（158〜182cm）までに ${L(i(2))}、±3σ（152〜188cm）までに ${L(i(3))} が入ります。赤の点線は ±1.96σ で、この内側がちょうど 95% です。どの正規分布も (X − μ)/σ で標準正規分布にそろうので、この割合は平均や標準偏差の値によらず同じです。`)}function Ue(){let e=B(0,0,4)*1.08,t={x:14,y:40,w:316,h:92,xMin:146,xMax:194,yMax:e},n={x:14,y:198,w:316,h:92,xMin:146,xMax:194,yMax:e},r=[150,160,170,180,190],i=[{m:164,c:j},{m:170,c:k},{m:176,c:A}],a=[{s:4,c:j,lx:158.5,ly:.088,t:`σ = 4`},{s:6,c:k,lx:177.5,ly:.058,t:`σ = 6`},{s:9,c:A,lx:185,ly:.03,t:`σ = 9`}],o=e=>e===A?`#b45309`:e;return q(`${J(344,330,`上は標準偏差6のまま平均を164・170・176と変えた正規分布で、形は同じまま左右に動く。下は平均170のまま標準偏差を4・6・9と変えたもので、大きいほど低く横に広がる`)}
    <text x="${t.x}" y="${t.y-22}" font-size="13.2" font-weight="700" fill="${P}">平均を変える（標準偏差は 6）</text>
    ${i.map(({m:e,c:n})=>G(t,t=>B(t,e,6),n)).join(``)}
    ${i.map(({m:e,c:n})=>`<text x="${F(H(t,e))}" y="${F(U(t,B(e,e,6))-5)}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${o(n)}">${e}</text>`).join(``)}
    ${W(t,r)}
    <text x="${n.x}" y="${n.y-22}" font-size="13.2" font-weight="700" fill="${P}">標準偏差を変える（平均は 170）</text>
    ${a.map(({s:e,c:t})=>G(n,t=>B(t,170,e),t)).join(``)}
    ${a.map(({c:e,lx:t,ly:r,t:i})=>`<text x="${F(H(n,t))}" y="${F(U(n,r))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${o(e)}">${i}</text>`).join(``)}
    ${W(n,r)}
    <text x="${344/2}" y="326" text-anchor="middle" font-size="12.4" fill="${N}">横軸 身長 cm</text>
  </svg>`,`上の3本は標準偏差を6cmに固定し、平均だけを164・170・176cmと変えたものです。山の形はまったく同じで、平均の位置へ平行に動きます。下の3本は平均を170cmに固定し、標準偏差を4・6・9cmと変えたものです。標準偏差が大きいほど横に広がり、面積は1のままなので山は低くなります。σ = 4 の山の高さは σ = 9 の${R(9/4)}倍です。`)}function We(){let e=10/6,t=1-V(e),n={x:14,y:40,w:316,h:120,xMin:152,xMax:188,yMax:B(170,170,6)*1.08},r=e=>B(e,170,6),i=n.y+n.h;return q(`${J(344,236,`身長が平均170cm・標準偏差6cmの正規分布で、180cm以上の部分に色を付けた図。下に標準化した Z の目盛りを並べてある`)}
    ${K(n,r,180,n.xMax,M,.45)}
    ${G(n,r,k)}
    <line x1="${F(H(n,180))}" y1="${n.y-4}" x2="${F(H(n,180))}" y2="${i}" stroke="${M}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${F(H(n,180))}" y="${n.y-10}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${M}">180cm（Z ≈ ${I(e)}）</text>
    <text x="${F(H(n,184.5))}" y="${F(U(n,.024))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${M}">約${(t*100).toFixed(1)}%</text>
    ${W(n,[152,158,164,170,176,182,188])}
    ${[-3,-2,-1,0,1,2,3].map(e=>`<text x="${F(H(n,170+e*6))}" y="${i+32}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${k}">${e}</text>`).join(``)}
    <text x="${344/2}" y="${i+56}" text-anchor="middle" font-size="12.4" fill="${N}">灰の目盛り＝身長 cm／藍の目盛り＝Z ＝（身長 − 170）÷ 6</text>
  </svg>`,`同じ山に、身長の目盛り（灰）と標準化した Z の目盛り（藍）を並べました。180cm は平均から 10cm、標準偏差6cmで割ると Z ≈ ${I(e)} の位置です。色を付けた180cm以上の面積は、標準正規分布の Z ≥ ${I(e)} の面積と同じで、約${(t*100).toFixed(1)}%です。`)}function Ge(){let e={x:14,y:44,w:316,h:104,xMin:0,xMax:180,yMax:B(0,0,10)*1.1},t=e=>B(e,50,10),n=e=>B(e,110,20);return q(`${J(344,196,`平均50点・標準偏差10点の点数を2倍して10点足すと、山の中心は110点へ動き、幅は2倍に広がって高さは半分になる`)}
    ${K(e,t,30,70,k,.18)}
    ${K(e,n,70,150,A,.18)}
    ${G(e,t,k)}
    ${G(e,n,A)}
    <text x="${F(H(e,50))}" y="${F(U(e,t(50))-20)}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${k}">X</text>
    <text x="${F(H(e,50))}" y="${F(U(e,t(50))-6)}" text-anchor="middle" font-size="12.4" fill="${k}">N(50, 10²)</text>
    <text x="${F(H(e,110))}" y="${F(U(e,n(110))-20)}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">2X + 10</text>
    <text x="${F(H(e,110))}" y="${F(U(e,n(110))-6)}" text-anchor="middle" font-size="12.4" fill="#b45309">N(110, 20²)</text>
    ${W(e,[10,30,50,70,90,110,130,150,170])}
    <text x="${344/2}" y="192" text-anchor="middle" font-size="12.4" fill="${N}">横軸 点数。色の帯＝平均 ± 2標準偏差</text>
  </svg>`,`平均50点・標準偏差10点の山（藍）を、全員2倍して10点足すと橙の山になります。中心は 50 × 2 + 10 = 110 点へ動き、幅は2倍、面積は1のままなので高さは半分です。色の帯（平均 ± 2標準偏差）も 30〜70点から 70〜150点へ、幅が40点から80点に伸びています。形は正規分布のまま変わりません。`)}function Ke(){let e=Math.sqrt(164),t={x:14,y:52,w:316,h:148,xMin:-40,xMax:160,yMax:B(0,0,8)*1.12},n=e=>B(e,60,10),r=e=>B(e,55,8),i=t=>B(t,115,e),a=t=>B(t,5,e);return q(`${J(344,250,`数学 N(60,100) と英語 N(55,64) の山、その合計 N(115,164) と点差 N(5,164) の山。合計と点差は同じ幅で、どちらも元の2科目より広い。標準偏差を足した18点の山は破線で、実際の合計より広すぎる`)}
    ${G(t,r,N,t.xMin,t.xMax,1.6)}
    ${G(t,n,j,t.xMin,t.xMax,1.6)}
    ${G(t,e=>B(e,115,18),M,t.xMin,t.xMax,1.6,`5 3`)}
    ${G(t,a,A)}
    ${G(t,i,k)}
    <text x="${F(H(t,41))}" y="${F(U(t,r(55))+4)}" text-anchor="end" font-size="12.4" font-weight="700" fill="${N}">英語</text>
    <text x="${F(H(t,73))}" y="${F(U(t,n(60))+4)}" font-size="12.4" font-weight="700" fill="${j}">数学</text>
    <text x="${F(H(t,5))}" y="${F(U(t,a(5))-20)}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">点差</text>
    <text x="${F(H(t,5))}" y="${F(U(t,a(5))-6)}" text-anchor="middle" font-size="12.4" fill="#b45309">N(5, 164)</text>
    <text x="${F(H(t,115))}" y="${F(U(t,i(115))-20)}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${k}">合計</text>
    <text x="${F(H(t,115))}" y="${F(U(t,i(115))-6)}" text-anchor="middle" font-size="12.4" fill="${k}">N(115, 164)</text>
    <line x1="196" y1="22" x2="218" y2="22" stroke="${M}" stroke-width="1.6" stroke-dasharray="5 3" />
    <text x="222" y="26" font-size="12.4" fill="${M}">SD 18点の山（誤り）</text>
    ${W(t,[-40,-20,0,20,40,60,80,100,120,140,160])}
    <text x="${344/2}" y="246" text-anchor="middle" font-size="12.4" fill="${N}">横軸 点数</text>
  </svg>`,`数学（緑・標準偏差10点）と英語（灰・8点）を足した合計（藍）は、中心が115点、標準偏差は約${F(e)}点です。点差（橙）は中心が5点に動くだけで、幅は合計とまったく同じです。どちらも元の2科目より広がっています。破線は標準偏差どうしを足した18点の山で、実際の合計より明らかに広すぎます。足しても引いても分散は 100 + 64 = 164 で、山の形は正規分布のままです。`)}function qe(){let e={x:14,y:40,w:316,h:168,xMin:29.5,xMax:70.5,yMax:.088},t=xe(30,70),n=t.map(e=>pe(100,.5,e)),r=U(e,B(55,50,5)),i=t.filter(e=>e>=45&&e<=55).reduce((e,t)=>e+pe(100,.5,t),0),a={x:22,y:44,w:92,h:66},o=e=>`<rect x="${e-11}" y="${a.y+20}" width="22" height="${a.h-34}" fill="${N}" fill-opacity="0.6" />`;return q(`${J(344,262,`コインを100回投げたときの表の枚数の確率。0と1の2本の棒しかない1回分の分布から、平均50・標準偏差5の釣鐘形になる`)}
    ${W(e,[30,40,50,60,70])}
    ${be(e,t,n,k,.25)}
    ${G(e,e=>B(e,50,5),M,29.5,70.5,2)}
    <line x1="${F(H(e,50))}" y1="${e.y-4}" x2="${F(H(e,50))}" y2="${e.y+e.h}" stroke="${A}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${F(H(e,50))}" y="${e.y-10}" text-anchor="middle" font-size="12.4" font-weight="700" fill="#b45309">平均 50</text>
    <line x1="${F(H(e,45))}" y1="${F(r)}" x2="${F(H(e,55))}" y2="${F(r)}" stroke="${P}" stroke-width="1.2" />
    <text x="${F(H(e,56))}" y="${F(r+4)}" font-size="12.4" fill="${P}">±5＝標準偏差</text>
    <rect x="${a.x}" y="${a.y}" width="${a.w}" height="${a.h}" fill="#fff" stroke="${N}" stroke-width="0.8" rx="4" />
    <text x="${a.x+a.w/2}" y="${a.y+14}" text-anchor="middle" font-size="12.1" fill="${P}">1回分のコイン</text>
    ${o(a.x+28)}${o(a.x+64)}
    <text x="${a.x+28}" y="${a.y+a.h-2}" text-anchor="middle" font-size="12.1" fill="${N}">裏 0</text>
    <text x="${a.x+64}" y="${a.y+a.h-2}" text-anchor="middle" font-size="12.1" fill="${N}">表 1</text>
    <text x="336" y="${e.y+30}" text-anchor="end" font-size="12.4" fill="${k}">棒＝実際の確率</text>
    <text x="336" y="${e.y+48}" text-anchor="end" font-size="12.4" fill="${M}">曲線＝N(50, 25)</text>
    <text x="${e.x+e.w/2}" y="258" text-anchor="middle" font-size="12.4" fill="${N}">横軸＝100回のうち表が出た枚数</text>
  </svg>`,`左上が1回分のコイン（棒2本）。100回投げたときの表の枚数の確率（青い棒）は、正規分布の曲線（赤）にほぼ重なります。45〜55枚に入る確率は約${L(i,0)}です。`)}function Je(){let e=1e3,t=.01,n=.95,r=.9,i=Math.round(e*t),a=e-i,o=Math.round(i*n*10)/10,s=Math.round((i-o)*10)/10,c=Math.round(a*(1-r)*10)/10,l=Math.round((a-c)*10)/10,u=Math.round((o+c)*10)/10,d=o/(o+c),f=(e,t,n,r,i,a)=>`<rect x="${e}" y="${t}" width="${n}" height="40" rx="4" fill="${a}" fill-opacity="0.14" stroke="${a}" stroke-width="1.2" />
     <text x="${e+n/2}" y="${t+17}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">${r}</text>
     <text x="${e+n/2}" y="${t+33}" text-anchor="middle" font-size="13.2" fill="${P}">${i}</text>`,p=(e,t,n,r,i)=>`<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="${N}" stroke-width="1.2" /><text x="${(e+n)/2+(n>e?4:-4)}" y="${(t+r)/2}" text-anchor="${n>e?`start`:`end`}" font-size="12.4" fill="${N}">${i}</text>`;return q(`${J(350,250,`1000人の検査を樹形図で数える`)}
    ${f(125,4,100,`検査を受ける`,`${e}人`,N)}
    ${p(150,44,80,80,`有病率 ${L(t,0)}`)}${p(200,44,270,80,``)}
    ${f(20,80,110,`病気`,`${i}人`,M)}${f(220,80,110,`健康`,`${a}人`,j)}
    ${p(55,120,40,160,``)}${p(95,120,110,160,``)}<text x="75" y="146" text-anchor="middle" font-size="12.4" fill="${N}">感度 ${L(n,0)}</text>
    ${p(255,120,240,160,``)}${p(295,120,310,160,``)}<text x="275" y="146" text-anchor="middle" font-size="12.4" fill="${N}">特異度 ${L(r,0)}</text>
    ${f(4,160,72,`陽性`,`${R(o)}人`,M)}${f(80,160,62,`陰性`,`${R(s)}人`,N)}
    ${f(206,160,72,`陽性`,`${R(c)}人`,A)}${f(282,160,64,`陰性`,`${R(l)}人`,N)}
    <text x="${350/2}" y="228" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">陽性 ${R(u)}人のうち、病気は ${R(o)}人</text>
    <text x="${350/2}" y="245" text-anchor="middle" font-size="13.2" font-weight="700" fill="${M}">P(病気 ∣ 陽性) = ${R(o)} ÷ ${R(u)} ≈ ${L(d)}</text>
  </svg>`,`${e}人で数えると、病気の${i}人からは${R(o)}人が陽性、健康な${a}人からも${R(c)}人が誤って陽性になります。陽性の${R(u)}人のうち本当に病気なのは${R(o)}人だけなので、陽性とわかっても病気である確率は約 ${L(d)} です。健康な人が圧倒的に多いため、わずか ${L(1-r,0)} の誤りでも陽性の大半を占めます。ベイズの定理の分母（全確率）は、この図の「陽性の合計」にあたります。`)}function Ye(){let e=[{x:140,y:95,n:`A`,col:k},{x:200,y:95,n:`B`,col:A},{x:170,y:147,n:`C`,col:j}],t=(e,t,n,r=400)=>`<text x="${e}" y="${t}" text-anchor="middle" font-size="12.4" font-weight="${r}" fill="${P}">${n}</text>`;return q(`${J(340,250,`3つの事象のベン図：各領域が何回数えられるか`)}
    ${e.map(e=>`<circle cx="${e.x}" cy="${e.y}" r="62" fill="${e.col}" fill-opacity="0.13" stroke="${e.col}" stroke-width="1.5" />`).join(``)}
    ${e.map((e,t)=>`<text x="${e.x+[-58,58,-66][t]}" y="${e.y+[-48,-48,50][t]}" text-anchor="middle" font-size="16" font-weight="700" fill="${e.col}">${e.n}</text>`).join(``)}
    ${t(112,82,`1`)}${t(228,82,`1`)}${t(170,186,`1`)}
    ${t(170,72,`2−1`)}${t(136,136,`2−1`)}${t(204,136,`2−1`)}
    ${t(170,113,`3−3+1`,700)}
    <text x="${340/2}" y="228" text-anchor="middle" font-size="13.2" fill="${P}">数字 ＝ 足す・引く・足すで、その領域を何回数えたか</text>
    <text x="${340/2}" y="244" text-anchor="middle" font-size="13.2" font-weight="700" fill="${k}">最後はどの領域もちょうど1回になる</text>
  </svg>`,`P(A) + P(B) + P(C) と足すと、2つが重なる部分は2回、3つが重なる中心は3回数えられます。2つずつの重なり3つを引くと、2つの重なりは 2 − 1 = 1 回に直りますが、中心は3回引かれて 3 − 3 = 0 回、つまり<strong>引き過ぎ</strong>になります。そこで最後に P(A∩B∩C) を1回足し戻すと、すべての領域がちょうど1回になります。`)}function Y(e){return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Xe(e){return()=>Math.sqrt(-2*Math.log(1-e()))*Math.cos(2*Math.PI*e())}function Ze(e,t){let n=t.length,r=e.map((e,n)=>[...e,t[n]]);for(let e=0;e<n;e++){let t=e;for(let i=e+1;i<n;i++)Math.abs(r[i][e])>Math.abs(r[t][e])&&(t=i);[r[e],r[t]]=[r[t],r[e]];for(let t=e+1;t<n;t++){let i=r[t][e]/r[e][e];for(let a=e;a<=n;a++)r[t][a]-=i*r[e][a]}}let i=Array(n).fill(0);for(let e=n-1;e>=0;e--){let t=r[e][n];for(let a=e+1;a<n;a++)t-=r[e][a]*i[a];i[e]=t/r[e][e]}return i}function Qe(e,t,n){let r=n+1,i=e.map(e=>Array.from({length:r},(t,n)=>e**n));return r===e.length?Ze(i,t):Ze(Array.from({length:r},(e,t)=>Array.from({length:r},(e,n)=>i.reduce((e,r)=>e+r[t]*r[n],0))),Array.from({length:r},(e,n)=>i.reduce((e,r,i)=>e+r[n]*t[i],0)))}var $e=(e,t)=>e.reduce((e,n,r)=>e+n*t**r,0),et=(e,t,n)=>Math.sqrt(t.reduce((t,r,i)=>t+(n[i]-$e(e,r))**2,0)/t.length);function tt(){let e=e=>.5+1.2*e-1.5*e*e,t=Xe(Y(20261011)),n=.25,r=Array.from({length:10},(e,t)=>-.9+.2*t),i=r.map(r=>e(r)+n*t()),a=Array.from({length:10},(e,t)=>-.95+.2*t);return{truth:e,xs:r,ys:i,tx:a,ty:a.map(r=>e(r)+n*t())}}function nt(){let{xs:e,ys:t,tx:n,ty:r}=tt(),i=[{d:1,name:`直線（1次）`},{d:2,name:`曲線（2次）`},{d:9,name:`9次式（10点すべてを通る）`}].map(i=>{let a=Qe(e,t,i.d);return{...i,coef:a,tr:et(a,e,t),te:et(a,n,r)}}),a=`${J(350,470,`同じ10点に直線・2次式・9次式を当てはめると、9次式は学習データを完全に通るがテストデータで大きく外れる`)}
    ${i.map((i,a)=>{let o={x:26,y:34+a*148,w:310,h:96,xMin:-1,xMax:1,yMax:1},s=-2.6,c=1.2,l=e=>o.y+o.h-(Math.max(s,Math.min(c,e))-s)/(c-s)*o.h,u=[];for(let e=0;e<=200;e++){let t=-1+2*e/200;u.push(`${F(H(o,t))},${F(l($e(i.coef,t)))}`)}let d=i.te>i.tr*2.5?M:k;return`<text x="${o.x}" y="${o.y-18}" font-size="13.2" font-weight="700" fill="${P}">${i.name}</text>
      <text x="${o.x}" y="${o.y-4}" font-size="12.4" fill="${N}">学習データの誤差 ${I(i.tr)}　テストの誤差 <tspan font-weight="700" fill="${d}">${I(i.te)}</tspan></text>
      <rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" fill="none" stroke="#e2e8f0" />
      <polyline points="${u.join(` `)}" fill="none" stroke="${d}" stroke-width="2" />
      ${e.map((e,n)=>`<circle cx="${F(H(o,e))}" cy="${F(l(t[n]))}" r="3.4" fill="${P}" />`).join(``)}
      ${n.map((e,t)=>`<circle cx="${F(H(o,e))}" cy="${F(l(r[t]))}" r="3.4" fill="#fff" stroke="${A}" stroke-width="1.6" />`).join(``)}`}).join(``)}
    <circle cx="40" cy="456" r="3.4" fill="${P}" /><text x="48" y="460" font-size="12.4" fill="${P}">学習データ（当てはめに使う10点）</text>
    <circle cx="232" cy="456" r="3.4" fill="#fff" stroke="${A}" stroke-width="1.6" /><text x="240" y="460" font-size="12.4" fill="${P}">テスト用の10点</text>
  </svg>`,[o,s,c]=i;return q(a,`真の関係が2次式のデータ（黒の10点）に、3通りの式を最小二乗法で当てはめました。誤差は各点のずれの二乗平均の平方根です。直線は曲がりを表せず、学習データでも ${I(o.tr)} ずれます。2次式は学習 ${I(s.tr)}、テスト ${I(s.te)} と、どちらも小さく収まります。9次式は10点すべてを通るので学習データの誤差は ${I(c.tr)} ですが、点と点の間で大きく波打ち、同じ仕組みで作った別の10点（白丸）では誤差が ${I(c.te)} と、2次式の約 ${Math.round(c.te/s.te)} 倍になります。手元のデータへの当てはまりだけでモデルを選ぶと、この9次式を選んでしまいます。`)}function rt(){let e=Xe(Y(8)),t=(t,n)=>{let r={x:n,y:30,w:150,h:150,xMin:-3,xMax:3,yMax:1},i=e=>r.y+r.h/2-e/3*(r.h/2),a=Array.from({length:150},()=>{let n=e(),r=e();return[n,t*n+Math.sqrt(1-t*t)*r]}),o=e=>{let n=[];for(let a=0;a<=72;a++){let o=2*Math.PI*a/72,s=e*Math.sqrt(1+t)*Math.cos(o),c=e*Math.sqrt(1-t)*Math.sin(o),l=(s-c)/Math.SQRT2,u=(s+c)/Math.SQRT2;n.push(`${F(H(r,l))},${F(i(u))}`)}return`<polygon points="${n.join(` `)}" fill="none" stroke="${k}" stroke-width="1.6" />`},s=(()=>{let e=a.length,t=a.reduce((e,t)=>e+t[0],0)/e,n=a.reduce((e,t)=>e+t[1],0)/e,r=0,i=0,o=0;return a.forEach(([e,a])=>{r+=(e-t)*(a-n),i+=(e-t)**2,o+=(a-n)**2}),r/Math.sqrt(i*o)})();return`<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="none" stroke="#e2e8f0" />
      ${a.filter(([e,t])=>Math.abs(e)<3&&Math.abs(t)<3).map(([e,t])=>`<circle cx="${F(H(r,e))}" cy="${F(i(t))}" r="1.8" fill="${N}" fill-opacity="0.55" />`).join(``)}
      ${o(1)}${o(2)}
      <text x="${r.x+r.w/2}" y="${r.y-10}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">相関 ρ = ${t}</text>
      <text x="${r.x+r.w/2}" y="${r.y+r.h+16}" text-anchor="middle" font-size="12.4" fill="${N}">150点の標本相関 ${I(s)}</text>`};return q(`${J(350,230,`2変量正規分布の等確率線：相関0なら円、相関0.7なら右上がりの楕円`)}${t(0,12)}${t(.7,188)}
    <text x="${350/2}" y="226" text-anchor="middle" font-size="12.4" fill="${N}">線＝同じ確率密度の点を結んだ等高線（内側 1σ、外側 2σ）</text></svg>`,`左は相関0で等高線は円、右は相関0.7で右上がりの楕円です。X が大きいほど Y も大きくなりやすいことが、楕円の傾きに表れます。`)}function it(){let e={x:14,y:40,w:130,h:140,xMin:0,xMax:1,yMax:3},t={x:198,y:40,w:130,h:140,xMin:0,xMax:1,yMax:3},n=[k,A,j,M],r=e=>1/(2*Math.sqrt(e)),i=[0,.25,.5,.75,1],a=i.slice(0,4).map((t,r)=>`<rect x="${F(H(e,t))}" y="${F(U(e,1))}" width="${F(H(e,i[r+1])-H(e,t))}" height="${F(U(e,0)-U(e,1))}" fill="${n[r]}" fill-opacity="0.35" stroke="${n[r]}" />`).join(``),o=i.slice(0,4).map((e,a)=>K(t,r,Math.max(e*e,.004),i[a+1]**2,n[a],.35)).join(``);return q(`${J(344,236,`一様分布の X を2乗すると、0に近い側の帯は細く高く、1に近い側の帯は太く低くなる。どの帯も面積は0.25のまま`)}
    <text x="${e.x+e.w/2}" y="${e.y-22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">X（0〜1の一様分布）</text>
    <text x="${t.x+t.w/2}" y="${t.y-22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">Y ＝ X²</text>
    ${a}${W(e,[0,.5,1])}
    ${o}${G(t,r,P,.004,1,1.6)}${W(t,[0,.5,1])}
    <text x="${F(H(e,.5))}" y="${F(U(e,1)-6)}" text-anchor="middle" font-size="12.4" fill="${N}">高さ 1</text>
    <text x="${F(H(t,.3))}" y="${F(U(t,2.6))}" font-size="12.4" fill="${k}">細く高い</text>
    <text x="${F(H(t,.98))}" y="${F(U(t,.9))}" text-anchor="end" font-size="12.4" fill="${M}">太く低い</text>
    <text x="${(e.x+e.w+t.x)/2}" y="${e.y+e.h/2+4}" text-anchor="middle" font-size="18" fill="${N}">→</text>
    <text x="${344/2}" y="214" text-anchor="middle" font-size="12.4" fill="${N}">4色の帯は、どれも面積（確率）0.25</text>
    <text x="${344/2}" y="231" text-anchor="middle" font-size="12.4" fill="${N}">右の曲線 ＝ f(y) ＝ 1/(2√y)</text>
  </svg>`,`X の値を4つの範囲に分け、それぞれの範囲の値を2乗した先へ移しました。X がその範囲に入る確率（帯の面積）は0.25のままなので、狭い範囲に移った帯は高く、広い範囲に移った帯は低くなります。`)}function at(){let e=e=>`<tspan baseline-shift="sub" font-size="12.4">${e}</tspan>`,t=e=>`<tspan baseline-shift="super" font-size="12.4">${e}</tspan>`,n=`#e0e7ff`,r=`#fef3c7`,i=(e,t,n,r,i,a,o,s=12.4)=>`<rect x="${e}" y="${t}" width="${n}" height="${r}" fill="${i}" stroke="${N}" stroke-width="1" />`+a.map((i,c)=>`<text x="${e+n/2}" y="${F(t+r/2+(c-(a.length-1)/2)*17+4.5)}" text-anchor="middle" font-size="${s}" font-weight="700" fill="${o}">${i}</text>`).join(``),a=`
    <text x="129" y="28" text-anchor="middle" font-size="12.4" font-weight="700" fill="${P}">列 X</text>
    <text x="259" y="28" text-anchor="middle" font-size="12.4" font-weight="700" fill="${P}">列 Y</text>
    <text x="56" y="68.5" text-anchor="end" font-size="12.4" font-weight="700" fill="${P}">行 X</text>
    <text x="56" y="124.5" text-anchor="end" font-size="12.4" font-weight="700" fill="${P}">行 Y</text>
    ${i(64,36,130,56,n,[`X の分散`,`σ${e(`X`)}${t(`2`)}`],k)}
    ${i(194,36,130,56,r,[`X と Y の共分散`,`ρσ${e(`X`)}σ${e(`Y`)}`],A)}
    ${i(64,92,130,56,r,[`Y と X の共分散`,`ρσ${e(`X`)}σ${e(`Y`)}`],A)}
    ${i(194,92,130,56,n,[`Y の分散`,`σ${e(`Y`)}${t(`2`)}`],k)}
    <text x="${344/2}" y="168" text-anchor="middle" font-size="12" fill="${N}">行と列の交わるマスに、その2つの組み合わせの値を書く</text>`,o=(e,t,a)=>`
    <text x="${e+52}" y="204" text-anchor="middle" font-size="12.4" font-weight="700" fill="${P}">${t}</text>
    ${i(e,214,52,30,n,[`1`],k,13)}${i(e+52,214,52,30,r,[a],A,13)}
    ${i(e,244,52,30,r,[a],A,13)}${i(e+52,244,52,30,n,[`1`],k,13)}`;return q(`${J(344,300,`分散共分散行列の並べ方。行と列にXとYを割り当て、対角に分散、右上と左下に共分散を置く。下に相関0と相関0.7の例`)}
    ${a}
    ${o(40,`左の図（相関0）`,`0`)}${o(200,`右の図（相関0.7）`,`0.7`)}
  </svg>`,`藍のマス（左上と右下）が分散、橙のマス（右上と左下）が共分散です。最初の散布図の2つは分散がどちらも1なので、共分散は ρ×1×1 で相関係数そのものになります。`)}function ot(){let e=.5,t={x:36,y:30,w:296,h:186,xMin:152,xMax:188,yMin:41,yMax:89},n=e=>t.x+(e-t.xMin)/(t.xMax-t.xMin)*t.w,r=e=>t.y+t.h-(e-t.yMin)/(t.yMax-t.yMin)*t.h,i=t=>{let i=[];for(let a=0;a<=72;a++){let o=2*Math.PI*a/72,s=t*Math.sqrt(1+e)*Math.cos(o),c=t*Math.sqrt(1-e)*Math.sin(o);i.push(`${F(n(170+6*(s-c)/Math.SQRT2))},${F(r(65+8*(s+c)/Math.SQRT2))}`)}return`<polygon points="${i.join(` `)}" fill="none" stroke="#cbd5e1" stroke-width="1.4" />`},a=t=>65+8/6*e*(t-170),o=8*Math.sqrt(1-e*e),s=(e,i)=>{let s=a(e),c=5/B(s,s,o),l=[];for(let t=0;t<=80;t++){let i=s-2.5*o+5*o*t/80;l.push(`${F(n(e+c*B(i,s,o)))},${F(r(i))}`)}return`<line x1="${F(n(e))}" y1="${t.y}" x2="${F(n(e))}" y2="${t.y+t.h}" stroke="${i}" stroke-width="1.2" stroke-dasharray="4 3" />
      <polyline points="${l.join(` `)}" fill="none" stroke="${i}" stroke-width="2" />
      <circle cx="${F(n(e))}" cy="${F(r(s))}" r="3.4" fill="${i}" />`};return q(`${J(344,262,`身長と体重の2変量正規分布。身長を決めると体重は正規分布になり、その中心は右上がりの直線の上にある`)}
    <rect x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" fill="none" stroke="#e2e8f0" />
    ${i(1)}${i(2)}
    <line x1="${F(n(t.xMin))}" y1="${F(r(a(t.xMin)))}" x2="${F(n(t.xMax))}" y2="${F(r(a(t.xMax)))}" stroke="${P}" stroke-width="1.4" />
    ${s(164,j)}${s(176,A)}
    ${(()=>{let e=5/B(0,0,o),i=[];for(let a=0;a<=80;a++){let o=65-2.5*8+40*a/80;o<t.yMin||o>t.yMax||i.push(`${F(n(153+e*B(o,65,8)))},${F(r(o))}`)}return`<polyline points="${i.join(` `)}" fill="none" stroke="${N}" stroke-width="1.8" stroke-dasharray="4 3" />
        <text x="${F(n(153)+4)}" y="${F(r(86))}" font-size="12.4" font-weight="700" fill="${N}">全体</text>`})()}
    ${[155,160,165,170,175,180,185].map(e=>`<text x="${F(n(e))}" y="${t.y+t.h+14}" text-anchor="middle" font-size="12.4" fill="${N}">${e}</text>`).join(``)}
    ${[45,55,65,75,85].map(e=>`<text x="${t.x-4}" y="${F(r(e)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${e}</text>`).join(``)}
    <text x="${t.x-30}" y="${t.y-8}" font-size="12.4" fill="${N}">体重kg</text>
    <text x="${F(n(176))}" y="${t.y-8}" text-anchor="middle" font-size="12.4" font-weight="700" fill="#b45309">176cm</text>
    <text x="${F(n(164))}" y="${t.y-8}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${j}">164cm</text>
    <text x="${t.x+t.w/2}" y="258" text-anchor="middle" font-size="12.4" fill="${N}">横軸 身長 cm／黒の直線 ＝ 身長ごとの体重の平均</text>
  </svg>`,`身長164cmと176cmで縦に切った体重の分布です。点はそれぞれの平均（${R(a(164))}kg・${R(a(176))}kg）、左端の灰の点線は身長を知らないときの体重の分布（標準偏差8kg）です。`)}function st(){let e={x:14,y:34,w:316,h:150,xMin:0,xMax:8,yMax:1},t=e=>t=>t<0?0:e*Math.exp(-t)*(1-Math.exp(-t))**(e-1),n=[{n:1,c:k,lx:.35,ly:.86,t:`n = 1`},{n:10,c:A,lx:2.6,ly:.47,t:`n = 10`},{n:100,c:j,lx:4.9,ly:.47,t:`n = 100`}];return q(`${J(344,226,`平均1の指数分布 n 個の最大値の分布。n を10倍にするごとに右へ約2.3ずれ、形はほぼ同じになっていく`)}
    ${W(e,[0,2,4,6,8])}
    ${n.map(({n,c:r})=>G(e,t(n),r,0,8,2.2)).join(``)}
    ${n.slice(1).map(({n,c:r})=>`<line x1="${F(H(e,Math.log(n)))}" y1="${F(U(e,t(n)(Math.log(n))))}" x2="${F(H(e,Math.log(n)))}" y2="${e.y+e.h}" stroke="${r}" stroke-width="1.2" stroke-dasharray="3 3" />`).join(``)}
    ${n.map(({c:t,lx:n,ly:r,t:i})=>`<text x="${F(H(e,n))}" y="${F(U(e,r))}" font-size="12.4" font-weight="700" fill="${t===A?`#b45309`:t}">${i}</text>`).join(``)}
    <text x="${e.x+e.w/2}" y="222" text-anchor="middle" font-size="12.4" fill="${N}">横軸 ＝ n 個の最大値／点線 ＝ ln n（${I(Math.log(10))}・${I(Math.log(100))}）</text>
  </svg>`,`n を10倍にするたびに山は右へ ${I(Math.log(10))} ずれ、形はほぼ同じです。ずらして重ねるとガンベル分布に近づきます。`)}function ct(){let e=.7,t={x:62,y:22,w:220,h:220,xMin:-3,xMax:3,yMax:1},n=e=>t.y+t.h/2-e/3*(t.h/2),r=(t,n)=>Math.sqrt((t*t-2*e*t*n+n*n)/(1-e*e)),i=r=>{let i=[];for(let a=0;a<=72;a++){let o=2*Math.PI*a/72,s=r*Math.sqrt(1+e)*Math.cos(o),c=r*Math.sqrt(1-e)*Math.sin(o);i.push(`${F(H(t,(s-c)/Math.SQRT2))},${F(n((s+c)/Math.SQRT2))}`)}return`<polygon points="${i.join(` `)}" fill="none" stroke="${k}" stroke-opacity="${1-r*.22}" stroke-width="1.5" />`},a=[1.2,1.2],o=[1.2,-1.2],s=Math.hypot(a[0],a[1]),c=Xe(Y(8)),l=Array.from({length:200},()=>{let t=c(),n=c();return[t,e*t+Math.sqrt(1-e*e)*n]}).filter(([e,t])=>Math.abs(e)<3&&Math.abs(t)<3),u=`<circle cx="${F(H(t,0))}" cy="${F(n(0))}" r="${F(H(t,s)-H(t,0))}" fill="none" stroke="${N}" stroke-width="1.4" stroke-dasharray="5 4" />`,d=([e,i],a,o)=>`<line x1="${F(H(t,0))}" y1="${F(n(0))}" x2="${F(H(t,e))}" y2="${F(n(i))}" stroke="${a}" stroke-width="1.4" stroke-dasharray="4 3" />
    <circle cx="${F(H(t,e))}" cy="${F(n(i))}" r="4.5" fill="${a}" />
    <text x="${F(H(t,e)+8)}" y="${F(n(i)+(i>0?-6:16))}" font-size="13.2" font-weight="700" fill="${a}">${o}（${I(r(e,i))}）</text>`;return q(`${J(344,290,`相関0.7の2変量正規分布で、中心から同じ距離にある2点。楕円に沿った点Pはマハラノビス距離が小さく、楕円を横切る点Qは大きい`)}
    <line x1="${t.x}" y1="${F(n(0))}" x2="${t.x+t.w}" y2="${F(n(0))}" stroke="#e2e8f0" />
    <line x1="${F(H(t,0))}" y1="${t.y}" x2="${F(H(t,0))}" y2="${t.y+t.h}" stroke="#e2e8f0" />
    ${l.map(([e,r])=>`<circle cx="${F(H(t,e))}" cy="${F(n(r))}" r="1.7" fill="${N}" fill-opacity="0.35" />`).join(``)}
    ${[1,2,3].map(i).join(``)}${u}
    ${d(a,j,`P`)}${d(o,M,`Q`)}
    <text x="${t.x+t.w+6}" y="${F(n(0)+4)}" font-size="12.4" fill="${N}">X</text>
    <text x="${F(H(t,0))}" y="${t.y-6}" text-anchor="middle" font-size="12.4" fill="${N}">Y</text>
    <text x="${344/2}" y="268" text-anchor="middle" font-size="12.4" fill="${N}">灰の点線の円＝ふつうの距離が P・Q と同じ</text>
    <text x="${344/2}" y="285" text-anchor="middle" font-size="12.4" fill="${N}">藍の楕円＝マハラノビス距離 1・2・3　かっこ内＝その点の値</text>
  </svg>`,`P と Q は同じ円の上にあり、ふつうの距離はどちらも ${I(s)} です。しかし P のまわりには点が多く、Q のまわりにはほとんどありません。円ではなく、点の散らばりに沿った楕円で測るのがマハラノビス距離です。`)}function lt(){let e=.7,t=4.5,n={x:14,y:44,w:150,h:150,xMin:-t,xMax:t,yMax:1},r={x:186,y:44,w:150,h:150,xMin:-t,xMax:t,yMax:1},i=(e,n)=>e.y+e.h/2-n/t*(e.h/2),a=Xe(Y(8)),o=Array.from({length:200},()=>{let t=a(),n=a();return[t,e*t+Math.sqrt(1-e*e)*n]}),s=o.map(([e,t])=>[e+t,e-t]),c=e=>Math.abs(e[0])<t&&Math.abs(e[1])<t,l=e=>`<rect x="${e.x}" y="${e.y}" width="${e.w}" height="${e.h}" fill="none" stroke="#e2e8f0" />
    <line x1="${e.x}" y1="${F(i(e,0))}" x2="${e.x+e.w}" y2="${F(i(e,0))}" stroke="#e2e8f0" />
    <line x1="${F(H(e,0))}" y1="${e.y}" x2="${F(H(e,0))}" y2="${e.y+e.h}" stroke="#e2e8f0" />`,u=(()=>{let t=[];for(let r=0;r<=72;r++){let a=2*Math.PI*r/72,o=2*Math.sqrt(1+e)*Math.cos(a),s=2*Math.sqrt(1-e)*Math.sin(a);t.push(`${F(H(n,(o-s)/Math.SQRT2))},${F(i(n,(o+s)/Math.SQRT2))}`)}return t.join(` `)})(),d=2+2*e,f=2-2*e,p=(()=>{let e=[];for(let t=0;t<=72;t++){let n=2*Math.PI*t/72;e.push(`${F(H(r,2*Math.sqrt(d)*Math.cos(n)))},${F(i(r,2*Math.sqrt(f)*Math.sin(n)))}`)}return e.join(` `)})(),m=o.findIndex(([e,t])=>e>1.1&&e<1.8&&t>.4&&t<1.2),[h,g]=o[m],[_,v]=s[m];return q(`${J(344,286,`相関0.7の点を1つずつ U=X+Y、V=X−Y に移すと、右上がりの楕円が横長の楕円になる。楕円は楕円のままで、U と V の相関は0`)}
    <text x="${n.x+n.w/2}" y="${n.y-24}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">(X, Y)：相関 0.7</text>
    <text x="${r.x+r.w/2}" y="${r.y-24}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">(U, V) ＝ (X＋Y, X−Y)</text>
    ${l(n)}${l(r)}
    ${o.filter(c).map(([e,t])=>`<circle cx="${F(H(n,e))}" cy="${F(i(n,t))}" r="1.7" fill="${N}" fill-opacity="0.45" />`).join(``)}
    ${s.filter(c).map(([e,t])=>`<circle cx="${F(H(r,e))}" cy="${F(i(r,t))}" r="1.7" fill="${N}" fill-opacity="0.45" />`).join(``)}
    <polygon points="${u}" fill="none" stroke="${k}" stroke-width="1.6" />
    <polygon points="${p}" fill="none" stroke="${k}" stroke-width="1.6" />
    <circle cx="${F(H(n,h))}" cy="${F(i(n,g))}" r="4" fill="${M}" />
    <circle cx="${F(H(r,_))}" cy="${F(i(r,v))}" r="4" fill="${M}" />
    <text x="${(n.x+n.w+r.x)/2}" y="${n.y+n.h/2+5}" text-anchor="middle" font-size="18" fill="${N}">→</text>
    <text x="${n.x+n.w-2}" y="${F(i(n,0)-4)}" text-anchor="end" font-size="12.4" fill="${N}">X</text>
    <text x="${F(H(n,0)+4)}" y="${n.y+12}" font-size="12.4" fill="${N}">Y</text>
    <text x="${r.x+r.w-2}" y="${F(i(r,0)-4)}" text-anchor="end" font-size="12.4" fill="${N}">U</text>
    <text x="${F(H(r,0)+4)}" y="${r.y+12}" font-size="12.4" fill="${N}">V</text>
    <text x="${344/2}" y="246" text-anchor="middle" font-size="12.4" fill="${N}">赤い点＝同じ1点（${F(h)}, ${F(g)}）→（${F(_)}, ${F(v)}）</text>
    <text x="${344/2}" y="264" text-anchor="middle" font-size="12.4" fill="${N}">藍の楕円＝2σ の等高線（両方とも同じ目盛り）</text>
    <text x="${344/2}" y="281" text-anchor="middle" font-size="12.4" fill="${N}">右：U の分散 ${F(d)}、V の分散 ${F(f)}、相関 0</text>
  </svg>`,`左の点を1つずつ U = X + Y、V = X − Y に移すと右になります。楕円は楕円のまま（多変量正規分布のまま）で、楕円の向きに沿った U と V では相関が0になります。`)}function ut(){let e=(e,t,n)=>{let r={x:t,y:40,w:150,h:170,xMin:154,xMax:186,yMin:41,yMax:89},i=e=>r.x+(e-r.xMin)/(r.xMax-r.xMin)*r.w,a=e=>r.y+r.h-(e-r.yMin)/(r.yMax-r.yMin)*r.h,o=t=>65+8/6*e*(t-170),s=8*Math.sqrt(1-e*e),c=3.2/B(0,0,8*Math.sqrt(.75)),l=(e,t)=>{let n=o(e),l=[];for(let t=0;t<=60;t++){let o=n-2.5*s+5*s*t/60;o<r.yMin||o>r.yMax||l.push(`${F(i(e+c*B(o,n,s)))},${F(a(o))}`)}return`<line x1="${F(i(e))}" y1="${r.y}" x2="${F(i(e))}" y2="${r.y+r.h}" stroke="${t}" stroke-width="1" stroke-dasharray="3 3" />
        <polyline points="${l.join(` `)}" fill="none" stroke="${t}" stroke-width="1.9" />
        <circle cx="${F(i(e))}" cy="${F(a(n))}" r="3" fill="${t}" />`};return`<text x="${r.x+r.w/2}" y="${r.y-22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">${n}</text>
      <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="none" stroke="#e2e8f0" />
      <line x1="${F(i(r.xMin))}" y1="${F(a(o(r.xMin)))}" x2="${F(i(r.xMax))}" y2="${F(a(o(r.xMax)))}" stroke="${P}" stroke-width="1.3" />
      ${l(160,j)}${l(170,k)}${l(180,A)}
      ${[160,170,180].map(e=>`<text x="${F(i(e))}" y="${r.y+r.h+14}" text-anchor="middle" font-size="12.4" fill="${N}">${e}</text>`).join(``)}
      <text x="${r.x+r.w/2}" y="${r.y-7}" text-anchor="middle" font-size="12.4" fill="${N}">体重の平均 ${R(o(160))}・${R(o(170))}・${R(o(180))}kg</text>`};return q(`${J(344,262,`身長160・170・180cmで縦に切った体重の分布。相関0では3つとも同じ、相関0.5では身長が高いほど上にずれる`)}
    ${e(0,12,`相関 0`)}${e(.5,186,`相関 0.5`)}
    <text x="${344/2}" y="240" text-anchor="middle" font-size="12.4" fill="${N}">横軸＝身長 cm　縦軸＝体重 41〜89kg</text>
    <text x="${344/2}" y="257" text-anchor="middle" font-size="12.4" fill="${N}">身長160・170・180cmで切った体重の分布</text>
  </svg>`,`相関0では、どの身長で切っても体重の分布は同じ（平均65kg・標準偏差8kg）で、身長を知っても体重の予想は変わりません。これが独立です。`)}function dt(){let e={x:62,y:22,w:220,h:220,xMin:-3,xMax:3,yMax:1},t=t=>e.y+e.h/2-t/3*(e.h/2),n=Xe(Y(91)),r=Y(19),i=Array.from({length:200},()=>{let e=n();return[e,(r()<.5?-1:1)*e]}),a=i.length,o=i.reduce((e,t)=>e+t[0],0)/a,s=i.reduce((e,t)=>e+t[1],0)/a,c=0,l=0,u=0;i.forEach(([e,t])=>{c+=(e-o)*(t-s),l+=(e-o)**2,u+=(t-s)**2});let d=c/Math.sqrt(l*u),f=i.filter(([e])=>Math.abs(e)<3);return q(`${J(344,280,`X は標準正規分布、Y は X に確率1/2で+1か−1を掛けた値。点は y=x と y=−x の2本の線の上にしかない`)}
    <rect x="${e.x}" y="${e.y}" width="${e.w}" height="${e.h}" fill="none" stroke="#e2e8f0" />
    <line x1="${e.x}" y1="${F(t(0))}" x2="${e.x+e.w}" y2="${F(t(0))}" stroke="#e2e8f0" />
    <line x1="${F(H(e,0))}" y1="${e.y}" x2="${F(H(e,0))}" y2="${e.y+e.h}" stroke="#e2e8f0" />
    ${f.map(([n,r])=>`<circle cx="${F(H(e,n))}" cy="${F(t(r))}" r="2.4" fill="${r*n>=0?j:M}" fill-opacity="0.6" />`).join(``)}
    <text x="${e.x+e.w+6}" y="${F(t(0)+4)}" font-size="12.4" fill="${N}">X</text>
    <text x="${F(H(e,0))}" y="${e.y-6}" text-anchor="middle" font-size="12.4" fill="${N}">Y</text>
    <text x="${F(H(e,2.1))}" y="${F(t(2.7))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${j}">y = x</text>
    <text x="${F(H(e,2.1))}" y="${F(t(-2.8))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${M}">y = −x</text>
    <text x="${344/2}" y="275" text-anchor="middle" font-size="12.4" fill="${N}">200点・標本相関 ${I(d)}</text>
  </svg>`,`X も Y も N(0, 1) で相関もほぼ0なのに、点は2本の線の上にしかなく、X が分かれば Y は2通りに絞られます。`)}function ft(){let e={x:10,y:44,w:150,h:140,xMin:-3,xMax:3,yMax:.45},t={x:190,y:44,w:144,h:140,xMin:0,xMax:4,yMax:.85},n=e=>Math.exp(-e/2)/Math.sqrt(2*Math.PI*e),r=e=>n(e)/2,i=2.25,a=Array.from({length:41},(e,t)=>1+(i-1)*t/40),o=`<polygon points="${[...a.map(e=>`${F(H(t,e))},${F(U(t,n(e)))}`),...[...a].reverse().map(e=>`${F(H(t,e))},${F(U(t,r(e)))}`)].join(` `)}" fill="${k}" fill-opacity="0.35" />`,s=V(1.5)-V(1);return q(`${J(344,240,`標準正規分布の X の、1〜1.5 と −1.5〜−1 の2つの帯は、2乗すると同じ 1〜2.25 に移り、積み重なる`)}
    <text x="${e.x+e.w/2}" y="${e.y-24}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">X（標準正規分布）</text>
    <text x="${t.x+t.w/2}" y="${t.y-24}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">Y ＝ X²</text>
    ${K(e,e=>B(e),-1.5,-1,A,.45)}${K(e,e=>B(e),1,1.5,k,.35)}
    ${G(e,e=>B(e),P,-3,3,1.6)}${W(e,[-2,-1,0,1,2])}
    ${K(t,r,1,i,A,.45)}${o}
    ${G(t,n,P,.2,4,1.6)}${G(t,r,N,1,i,1,`3 2`)}${W(t,[0,1,2,3,4])}
    <text x="${(e.x+e.w+t.x)/2}" y="${e.y+e.h/2+4}" text-anchor="middle" font-size="18" fill="${N}">→</text>
    <text x="${344/2}" y="218" text-anchor="middle" font-size="12.4" fill="${N}">橙：−1.5〜−1 から　藍：1〜1.5 から</text>
    <text x="${344/2}" y="235" text-anchor="middle" font-size="12.4" fill="${N}">右の曲線＝自由度1のカイ二乗分布</text>
  </svg>`,`左右2つの帯（各 ${L(s)}）が同じ 1〜2.25 に移り、積み重なって ${L(2*s)} になります。`)}function pt(){let e={x:46,y:40,w:110,h:110,xMin:0,xMax:3,yMax:3},t={x:186,y:40,w:150,h:120,xMin:0,xMax:6,yMax:1},n=t=>e.y+e.h-t/3*e.h,r=[{u:.5,c:j},{u:1.5,c:k},{u:2.5,c:M}];return q(`${J(344,250,`左：和が u になる (X, Y) の組は線分 x+y=u の上に並び、u が大きいほど線分が長い。右：和の密度 u e^(−u) は u=1 で最大`)}
    <text x="${e.x+e.w/2}" y="${e.y-22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">和が u になる組</text>
    <text x="${t.x+t.w/2}" y="${t.y-22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">和 U の密度</text>
    <rect x="${e.x}" y="${e.y}" width="${e.w}" height="${e.h}" fill="none" stroke="#e2e8f0" />
    ${r.map(({u:t,c:r})=>`<line x1="${F(H(e,0))}" y1="${F(n(t))}" x2="${F(H(e,t))}" y2="${F(n(0))}" stroke="${r}" stroke-width="2.4" />
      <text x="${F(H(e,0)-4)}" y="${F(n(t)+4)}" text-anchor="end" font-size="12.4" font-weight="700" fill="${r}">u=${t}</text>`).join(``)}
    ${[0,1,2,3].map(t=>`<text x="${F(H(e,t))}" y="${e.y+e.h+14}" text-anchor="middle" font-size="12.4" fill="${N}">${t}</text>`).join(``)}
    <text x="${e.x+e.w+4}" y="${e.y+e.h+4}" font-size="12.4" fill="${N}">X</text>
    <text x="${e.x}" y="${e.y-4}" text-anchor="middle" font-size="12.4" fill="${N}">Y</text>
    ${G(t,e=>Math.exp(-e),N,0,6,1.4,`4 3`)}
    ${G(t,e=>e*Math.exp(-e),k,0,6,2.2)}
    ${W(t,[0,2,4,6])}
    <text x="${F(H(t,1.9))}" y="${F(U(t,.66))}" font-size="12.4" fill="${N}">X 1つ e^(−x)</text>
    <text x="${F(H(t,1.9))}" y="${F(U(t,.38))}" font-size="12.4" font-weight="700" fill="${k}">和 u e^(−u)</text>
    <text x="${344/2}" y="228" text-anchor="middle" font-size="12.4" fill="${N}">線分の上では、どの点も密度は e^(−u) で同じ</text>
    <text x="${344/2}" y="245" text-anchor="middle" font-size="12.4" fill="${N}">λ = 1 の場合</text>
  </svg>`,`和が u になる組は線分の上に並び、u が大きいほど線分が長くなります。線分の長さ u と1点の密度 e^(−u) を掛けた u e^(−u) が和の密度です。`)}function mt(){let e={x:30,y:40,w:130,h:130,xMin:0,xMax:2,yMax:2},t={x:200,y:40,w:130,h:130,xMin:0,xMax:2,yMax:2},n=[[1,.3],[1.5,.3],[1.5,.8],[1,.8]],r=n.map(([e,t])=>[t,e-t]),i=(e,t,n)=>`<polygon points="${t.map(([t,n])=>`${F(H(e,t))},${F(U(e,n))}`).join(` `)}" fill="${n}" fill-opacity="0.25" stroke="${n}" stroke-width="1.6" />`,a=e=>Math.abs(e.reduce((t,[n,r],i)=>{let[a,o]=e[(i+1)%e.length];return t+n*o-a*r},0))/2,o=(e,t,n)=>`<rect x="${e.x}" y="${e.y}" width="${e.w}" height="${e.h}" fill="none" stroke="#e2e8f0" />
    ${[0,1,2].map(t=>`<text x="${F(H(e,t))}" y="${e.y+e.h+14}" text-anchor="middle" font-size="12.4" fill="${N}">${t}</text>`).join(``)}
    ${[1,2].map(t=>`<text x="${e.x-5}" y="${F(U(e,t)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${t}</text>`).join(``)}
    <text x="${e.x+e.w+4}" y="${e.y+e.h+4}" font-size="12.4" fill="${N}">${t}</text>
    <text x="${e.x}" y="${e.y-5}" text-anchor="middle" font-size="12.4" fill="${N}">${n}</text>`;return q(`${J(344,250,`(u, v) の小さな正方形を x = v、y = u − v で移すと平行四辺形になるが、面積は変わらない`)}
    <text x="${e.x+e.w/2}" y="${e.y-22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">(u, v) の正方形</text>
    <text x="${t.x+t.w/2}" y="${t.y-22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">(x, y) に移した形</text>
    ${o(e,`u`,`v`)}${o(t,`x`,`y`)}
    ${i(e,n,k)}${i(t,r,k)}
    <text x="${(e.x+e.w+t.x)/2-4}" y="${e.y+24}" text-anchor="middle" font-size="18" fill="${N}">→</text>
    <text x="${344/2}" y="228" text-anchor="middle" font-size="12.4" fill="${N}">x = v、y = u − v で移す</text>
    <text x="${344/2}" y="245" text-anchor="middle" font-size="12.4" fill="${N}">面積：${I(a(n))} → ${I(a(r))}（倍率 ${F(a(r)/a(n))}）</text>
  </svg>`,`正方形は傾いた平行四辺形に変わりますが、面積は同じです。面積の倍率が1なので、密度を補正する必要がなく、ヤコビアン |J| = 1 です。`)}function ht(){let e={x:40,y:26,w:290,h:160,xMin:0,xMax:1,yMax:1},t=[{n:1,c:N,t:`1個`},{n:5,c:k,t:`5個`},{n:20,c:M,t:`20個`}];return q(`${J(344,236,`0から1の一様分布から n 個とったときの最大値の分布関数 x の n 乗。n が増えると曲線は右下に下がり、最大値は1の近くに寄る`)}
    ${[0,.5,1].map(t=>`<text x="${e.x-6}" y="${F(U(e,t)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${t}</text>
      <line x1="${e.x}" y1="${F(U(e,t))}" x2="${e.x+e.w}" y2="${F(U(e,t))}" stroke="#eef2f7" />`).join(``)}
    <line x1="${F(H(e,.8))}" y1="${e.y}" x2="${F(H(e,.8))}" y2="${e.y+e.h}" stroke="${N}" stroke-width="1.1" stroke-dasharray="4 3" />
    ${t.map(({n:t,c:n})=>G(e,e=>e**t,n,0,1,2.2)).join(``)}
    ${t.map(({n:t,c:n,t:r})=>`<circle cx="${F(H(e,.8))}" cy="${F(U(e,.8**t))}" r="3.6" fill="${n}" />
      <text x="${F(H(e,.8)-7)}" y="${F(U(e,.8**t)+(t===20?-2:-5))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${n}">${r} ${(.8**t).toFixed(t===20?3:2)}</text>`).join(``)}
    ${W(e,[0,.2,.4,.6,.8,1])}
    <text x="${e.x+e.w/2}" y="231" text-anchor="middle" font-size="12.4" fill="${N}">横軸 x／縦軸＝最大値が x 以下になる確率 x^n</text>
  </svg>`,`最大値が0.8以下になる確率は、1個 ${I(.8)}、5個 ${I(.8**5)}、20個 ${(.8**20).toFixed(3)}。個数が増えるほど最大値は1に寄ります。`)}function gt(){let e=.5,t={x:14,y:30,w:316,h:150,xMin:1.8,xMax:6.6,yMax:.8},n=t=>{let n=(t-3)/e;return Math.exp(-(n+Math.exp(-n)))/e},r=t=>3-e*Math.log(-Math.log(1-1/t)),i=r(10),a=r(100);return q(`${J(344,240,`年最大水位の分布（ガンベル分布）。上側1%の境目が100年に1度の水位、10%の境目が10年に1度の水位`)}
    ${K(t,n,i,6.6,A,.25)}${K(t,n,a,6.6,M,.45)}
    ${G(t,n,k,1.8,6.6,2.2)}
    ${[{x:i,c:`#b45309`,t:`10年に1度`},{x:a,c:M,t:`100年に1度`}].map(({x:e,c:n,t:r},i)=>`<line x1="${F(H(t,e))}" y1="${t.y+6+i*26}" x2="${F(H(t,e))}" y2="${t.y+t.h}" stroke="${n}" stroke-width="1.3" stroke-dasharray="4 3" />
      <text x="${F(H(t,e)+(i?-4:4))}" y="${t.y+14+i*26}" text-anchor="${i?`end`:`start`}" font-size="12.4" font-weight="700" fill="${n}">${r} ${F(e)}m</text>`).join(``)}
    ${W(t,[2,3,4,5,6])}
    <text x="${t.x+t.w/2}" y="218" text-anchor="middle" font-size="12.4" fill="${N}">横軸＝その年の最大水位（m）</text>
    <text x="${t.x+t.w/2}" y="235" text-anchor="middle" font-size="12.4" fill="${N}">ガンベル分布（位置 3m・尺度 0.5m）の例</text>
  </svg>`,`塗った部分は、その年の最大水位が境目を超える確率で、橙が10%、赤が1%です。毎年1%の確率で超える水位 ${F(a)}m を「100年に1度の水位」と呼びます。`)}function _t(){let e={x:14,y:50,w:316,h:150,xMin:-3,xMax:6,yMax:.5},t=e=>t=>{if(e===0){let e=Math.exp(-t);return e*Math.exp(-e)}let n=1+e*t;if(n<=0)return 0;let r=n**(-1/e);return r**(e+1)*Math.exp(-r)},n=(e,t)=>{if(e===0)return 1-Math.exp(-Math.exp(-t));let n=1+e*t;return n<=0?e<0?0:1:1-Math.exp(-(n**(-1/e)))},r=`${J(344,252,`極値分布の3つの型。ガンベル型は右の裾が指数的に減り、フレシェ型は右の裾が長く、ワイブル型は上限で止まる`)}
    ${K(e,t(.5),4,6,A,.3)}${K(e,t(0),4,6,k,.3)}
    <line x1="${F(H(e,2))}" y1="${e.y}" x2="${F(H(e,2))}" y2="${e.y+e.h}" stroke="${j}" stroke-width="1.2" stroke-dasharray="3 3" />
    ${G(e,t(-.5),j,-3,2,2.2)}
    ${G(e,t(0),k,-3,6,2.2)}
    ${G(e,t(.5),A,-1.95,6,2.2)}
    ${W(e,[-2,0,2,4,6])}
    <text x="2" y="16" font-size="12.4" font-weight="700" fill="${k}">ガンベル型 ξ=0</text>
    <text x="${344/2-6}" y="16" text-anchor="middle" font-size="12.4" font-weight="700" fill="#b45309">フレシェ型 ξ=0.5</text>
    <text x="342" y="16" text-anchor="end" font-size="12.4" font-weight="700" fill="${j}">ワイブル型 ξ=−0.5</text>
    <text x="${F(H(e,2)+4)}" y="${e.y+12}" font-size="12.4" fill="${j}">上限 2</text>
    <text x="${F(H(e,4.1))}" y="${F(U(e,.1))}" font-size="12.4" fill="#b45309">長い裾</text>
    <text x="${e.x+e.w/2}" y="247" text-anchor="middle" font-size="12.4" fill="${N}">塗り＝4を超える部分（右の裾）</text>
  </svg>`,i=e=>L(n(e,4));return q(r,`4を超える確率は、フレシェ型 ${i(.5)}、ガンベル型 ${i(0)}、ワイブル型 0 です。裾の長い分布の最大値ほど、とびぬけた値が出ます。`)}function vt(){let e=.7,t={x:92,y:14,w:180,h:180,xMin:-3,xMax:3,yMax:1},n=e=>t.y+t.h/2-e/3*(t.h/2),r=Xe(Y(8)),i=Array.from({length:200},()=>{let t=r(),n=r();return[t,e*t+Math.sqrt(1-e*e)*n]}).filter(([e,t])=>Math.abs(e)<3&&Math.abs(t)<3),a=40/B(0),o=[],s=[];for(let e=0;e<=80;e++){let r=-3+6*e/80;o.push(`${F(H(t,r))},${F(t.y+t.h+44-a*B(r))}`),s.push(`${F(t.x-4-a*B(r))},${F(n(r))}`)}return q(`${J(344,262,`相関0.7の2変量正規分布の点と、横軸と縦軸に落とした周辺分布。どちらも標準正規分布の形`)}
    <rect x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" fill="none" stroke="#e2e8f0" />
    ${i.map(([e,r])=>`<circle cx="${F(H(t,e))}" cy="${F(n(r))}" r="1.8" fill="${N}" fill-opacity="0.5" />`).join(``)}
    <polyline points="${o.join(` `)}" fill="none" stroke="${k}" stroke-width="2.2" />
    <polyline points="${s.join(` `)}" fill="none" stroke="${j}" stroke-width="2.2" />
    <line x1="${t.x}" y1="${t.y+t.h+44}" x2="${t.x+t.w}" y2="${t.y+t.h+44}" stroke="${N}" />
    <line x1="${t.x-4}" y1="${t.y}" x2="${t.x-4}" y2="${t.y+t.h}" stroke="${N}" />
    <text x="${t.x+t.w+6}" y="${t.y+t.h+40}" font-size="12.4" font-weight="700" fill="${k}">X だけ</text>
    <text x="${t.x-50}" y="${t.y+10}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${j}">Y だけ</text>
    <text x="${t.x+t.w+6}" y="${t.y+14}" font-size="12.4" fill="${N}">相関</text>
    <text x="${t.x+t.w+6}" y="${t.y+30}" font-size="12.4" fill="${N}">0.7</text>
    <text x="${344/2}" y="258" text-anchor="middle" font-size="12.4" fill="${N}">藍・緑の曲線＝N(0, 1) の密度</text>
  </svg>`,`相関0.7の点を横軸に落としても縦軸に落としても、標準正規分布の形になります。相関は、2つの値の組み合わせ方にだけ表れます。`)}function yt(){let e={x:40,y:26,w:290,h:160,xMin:0,xMax:1500,yMax:1},t=e=>Math.exp(-e/1e3),n=e=>Math.exp(-e/100);return q(`${J(344,236,`平均寿命1000時間の部品1個が動き続ける確率と、10個が全部動き続ける確率。10個のほうがずっと早く下がる`)}
    ${[0,.5,1].map(t=>`<text x="${e.x-6}" y="${F(U(e,t)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${t}</text>
      <line x1="${e.x}" y1="${F(U(e,t))}" x2="${e.x+e.w}" y2="${F(U(e,t))}" stroke="#eef2f7" />`).join(``)}
    ${G(e,t,k,0,1500,2.2)}${G(e,n,M,0,1500,2.2)}
    ${[{t:100,c:M},{t:1e3,c:k}].map(({t,c:n})=>`<line x1="${F(H(e,t))}" y1="${e.y}" x2="${F(H(e,t))}" y2="${e.y+e.h}" stroke="${n}" stroke-width="1.1" stroke-dasharray="4 3" />`).join(``)}
    ${W(e,[0,500,1e3,1500])}
    <text x="${F(H(e,560))}" y="${F(U(e,.72))}" font-size="12.4" font-weight="700" fill="${k}">1個（平均1000時間）</text>
    <text x="${F(H(e,240))}" y="${F(U(e,.3))}" font-size="12.4" font-weight="700" fill="${M}">10個とも（平均100時間）</text>
    <text x="${e.x+e.w/2}" y="231" text-anchor="middle" font-size="12.4" fill="${N}">横軸 時間／縦軸＝まだ1個も壊れていない確率</text>
  </svg>`,`1個なら1000時間後も ${L(t(1e3))} が動いていますが、10個が全部動き続ける確率は300時間で ${L(n(300))} まで下がります。最初の故障は、平均100時間でやって来ます。`)}function bt(){let e={x:34,y:30,w:300,h:194,xMin:0,xMax:3,yMax:1},t=t=>e.y+e.h-(Math.max(1,Math.min(6,t))-1)/5*e.h,n=[1101,2202,3303].map(e=>{let t=Y(e),n=0;return Array.from({length:1e3},(e,r)=>(n+=1+Math.floor(t()*6),n/(r+1)))}),r=[k,A,j],i=n.map((n,i)=>`<polyline points="${n.map((n,r)=>`${F(H(e,Math.log10(r+1)))},${F(t(n))}`).join(` `)}" fill="none" stroke="${r[i]}" stroke-width="1.6" />`).join(``),a=Math.sqrt(35/12),o=Array.from({length:61},(e,t)=>10**(t/20)),s=`<polygon points="${[...o.map(n=>`${F(H(e,Math.log10(n)))},${F(t(3.5+2*a/Math.sqrt(n)))}`),...o.reverse().map(n=>`${F(H(e,Math.log10(n)))},${F(t(3.5-2*a/Math.sqrt(n)))}`)].join(` `)}" fill="${N}" fill-opacity="0.16" />`,c=`${J(350,270,`サイコロを振る回数を増やすと、3人それぞれの平均が3.5に近づいていく。灰色の帯（平均のほとんどが入る範囲）は回数とともに細くなる`)}
    ${s}
    ${[1,2,3,4,5,6].map(n=>`<text x="${e.x-6}" y="${F(t(n)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${n}</text>`).join(``)}
    <line x1="${e.x}" y1="${F(t(3.5))}" x2="${e.x+e.w}" y2="${F(t(3.5))}" stroke="${M}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${e.x+e.w}" y="${e.y-8}" text-anchor="end" font-size="12.4" fill="${M}">赤の点線＝期待値 3.5</text>
    ${i}
    <line x1="${e.x}" y1="${e.y+e.h}" x2="${e.x+e.w}" y2="${e.y+e.h}" stroke="${N}" />
    ${[[0,`1`],[1,`10`],[2,`100`],[3,`1000`]].map(([t,n])=>`<text x="${F(H(e,t))}" y="${e.y+e.h+14}" text-anchor="middle" font-size="12.4" fill="${N}">${n}</text>`).join(``)}
    <text x="${e.x+e.w/2}" y="264" text-anchor="middle" font-size="12.4" fill="${N}">横軸＝振った回数（10倍ごと）／縦軸＝目の平均</text>
  </svg>`,l=e=>n.map(t=>t[e-1].toFixed(2)).join(`・`),u=e=>`${(3.5-2*a/Math.sqrt(e)).toFixed(2)}〜${(3.5+2*a/Math.sqrt(e)).toFixed(2)}`;return q(c,`線は3人それぞれの平均の推移（乱数で振ったシミュレーション）。緑の人は最初の6回が ${((e,t)=>{let n=Y([1101,2202,3303][e]);return Array.from({length:t},()=>1+Math.floor(n()*6)).join(`・`)})(2,6)} と偏って平均が2を下回り、10回目でも3人は ${l(10)} とばらばらですが、1000回目は ${l(1e3)} です。灰色の帯は平均の約95%が入る範囲で、100回で ${u(100)}、1000回で ${u(1e3)} です。`)}function xt(){let e={x:14,y:30,w:316,h:170,xMin:0,xMax:3,yMax:3.6},t=e=>t=>t<=0?e===1?1:0:e*ge(e)(e*t),n=[{n:1,c:N,lx:.3,t:`n = 1（元の分布）`},{n:4,c:j,lx:.75,t:`n = 4`},{n:16,c:A,lx:.94,t:`n = 16`},{n:64,c:k,lx:.985,t:`n = 64`}];return q(`${J(344,250,`指数分布から n 個とった平均の分布。n が増えると山の幅が縮んで期待値の1に集まり、形は右に歪んだ形から左右対称の釣鐘形に変わる`)}
    <line x1="${F(H(e,1))}" y1="${e.y-6}" x2="${F(H(e,1))}" y2="${e.y+e.h}" stroke="${M}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${F(H(e,1)+4)}" y="${e.y+4}" font-size="12.4" fill="${M}">期待値 1</text>
    ${n.map(({n,c:r})=>G(e,t(n),r,.001,3,n===64?2.2:1.8)).join(``)}
    <text x="${F(H(e,1.7))}" y="${F(U(e,.45))}" font-size="12.4" font-weight="700" fill="${N}">${n[0].t}</text>
    <text x="${F(H(e,.55))}" y="${F(U(e,1.05))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${j}">${n[1].t}</text>
    <text x="${F(H(e,1.26))}" y="${F(U(e,t(16)(.94))+4)}" font-size="12.4" font-weight="700" fill="${(e=>e===A?`#b45309`:e)(A)}">${n[2].t}</text>
    <text x="${F(H(e,1.13))}" y="${F(U(e,t(64)(.985))+8)}" font-size="12.4" font-weight="700" fill="${k}">${n[3].t}</text>
    ${W(e,[0,.5,1,1.5,2,2.5,3])}
    <text x="${344/2}" y="246" text-anchor="middle" font-size="12.4" fill="${N}">横軸＝n 個の平均の値</text>
  </svg>`,`灰色が元の指数分布。n を増やすと山は期待値1のまわりに細く集まり、形は左右対称に近づきます。標準偏差は 1/√n で、n = 64 では 0.125 です。`)}function St(){let e=`df-arrow`,t=(e,t,n,r,i,a)=>`<rect x="${F(e-n/2)}" y="${F(t-24)}" width="${n}" height="48" rx="8" fill="#fff" stroke="${r}" stroke-width="2" />
    <text x="${e}" y="${t-4}" text-anchor="middle" font-size="14" font-weight="700" fill="${r}">${i}</text>
    <text x="${e}" y="${t+14}" text-anchor="middle" font-size="12.1" fill="${N}">${a}</text>`,n=(t,n,r,i)=>`<line x1="${t}" y1="${n}" x2="${r}" y2="${i}" stroke="${P}" stroke-width="1.6" marker-end="url(#${e})" />`;return q(`${J(344,300,`3つの分布の組み立て。標準正規分布 Z を2乗して k 個足すとカイ二乗分布、Z をカイ二乗分布を自由度で割った値の平方根で割ると t 分布、自由度で割った2つのカイ二乗分布の比が F 分布。t 分布を2乗すると分子の自由度1の F 分布`)}
    <defs><marker id="${e}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${P}" /></marker></defs>
    ${t(172,32,190,P,`標準正規分布 Z`,`N(0, 1)`)}
    ${n(172,57,172,100)}
    <text x="180" y="83" font-size="12.1" fill="${P}">2乗して k 個足す</text>
    ${t(172,126,190,j,`カイ二乗分布 χ²(k)`,`例：(n−1)s² / σ²`)}
    ${n(120,151,92,210)}
    ${n(224,151,252,210)}
    <path d="M77,40 C14,60 14,170 66,210" fill="none" stroke="${P}" stroke-width="1.6" marker-end="url(#${e})" />
    <text x="34" y="120" font-size="12.1" fill="${P}">Z を</text>
    <text x="34" y="136" font-size="12.1" fill="${P}">分子に</text>
    <text x="104" y="172" text-anchor="end" font-size="12.1" fill="${P}">÷ √(χ²/k)</text>
    <text x="242" y="172" font-size="12.1" fill="${P}">χ²/k の比</text>
    ${t(86,236,150,k,`t 分布 t(k)`,`例：平均を s で標準化`)}
    ${t(258,236,150,A,`F 分布 F(k₁, k₂)`,`例：2つの s² の比`)}
    <path d="M86,262 V276 H258 V262" fill="none" stroke="${M}" stroke-width="1.6" stroke-dasharray="4 3" />
    <text x="172" y="295" text-anchor="middle" font-size="12.1" fill="${M}">t(k)² = F(1, k)</text>
  </svg>`,`3つとも Z から作れます。t と F で割る2つの量は、互いに独立であることが条件です。`)}function Ct(){let e=2.262,t={x:14,y:30,w:316,h:170,xMin:-4,xMax:8,yMax:.42},n=e=>e<=0?0:Math.exp((9/2-1)*Math.log(e)-e/2-9/2*Math.log(2)-z(9/2)),r=e=>Math.exp(-e*e/2)/Math.sqrt(2*Math.PI),i=(e,t,n,r)=>{let i=(n-t)/r,a=e(t)+e(n);for(let n=1;n<r;n++)a+=e(t+n*i)*(n%2?4:2);return a*i/3},a=e=>t=>i(i=>{let a=Math.sqrt(i/9);return r(t*a-e)*a*n(i)},1e-6,60,300),o=t=>i(a(t),e,14,120),s=[{d:0,c:N,lx:-1.9,t:`δ = 0`},{d:2,c:j,lx:.2,t:`δ = 2`},{d:3,c:k,lx:4.6,t:`δ = 3`}];return q(`${J(344,250,`自由度9の t 分布と非心度2・3の非心 t 分布。非心度が大きいほど山が右へずれ、2.262 より右の面積が増える`)}
    ${K(t,a(3),e,8,k,.16)}
    <line x1="${F(H(t,e))}" y1="${t.y-6}" x2="${F(H(t,e))}" y2="${t.y+t.h}" stroke="${M}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${F(H(t,e)+4)}" y="${t.y+4}" font-size="12.4" fill="${M}">2.262</text>
    ${s.map(({d:e,c:n})=>G(t,a(e),n,-4,8,2)).join(``)}
    <text x="${F(H(t,-1.6))}" y="${F(U(t,.36))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${N}">${s[0].t}</text>
    <text x="${F(H(t,1))}" y="${F(U(t,.4))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${j}">${s[1].t}</text>
    <text x="${F(H(t,4.4))}" y="${F(U(t,.28))}" font-size="12.4" font-weight="700" fill="${k}">${s[2].t}</text>
    ${W(t,[-4,-2,0,2,4,6,8])}
    <text x="${344/2}" y="246" text-anchor="middle" font-size="12.4" fill="${N}">横軸＝T の値（自由度9）</text>
  </svg>`,`δ = 0 が普通の t 分布です。2.262 を超える確率は、δ = 0 で ${L(o(0),1)}、δ = 2 で ${L(o(2),0)}、δ = 3 で ${L(o(3),0)} です。`)}var wt=(e,t,n,r=400)=>{let i=(n-t)/r,a=e(t)+e(n);for(let n=1;n<r;n++)a+=e(t+n*i)*(n%2?4:2);return a*i/3},Tt=e=>t=>t<=0?0:Math.exp((e/2-1)*Math.log(t)-t/2-e/2*Math.log(2)-z(e/2)),Et=e=>t=>Math.exp(z((e+1)/2)-z(e/2)-.5*Math.log(e*Math.PI)-(e+1)/2*Math.log(1+t*t/e)),Dt=(e,t)=>n=>n<=0?0:Math.exp(z((e+t)/2)-z(e/2)-z(t/2)+e/2*Math.log(e/t)+(e/2-1)*Math.log(n)-(e+t)/2*Math.log(1+e*n/t));function Ot(){let e=9*.07**2/.05**2,t={x:14,y:30,w:316,h:150,xMin:0,xMax:30,yMax:.115},n=Tt(9),r=wt(n,e,80);return q(`${J(344,226,`自由度9のカイ二乗分布。観測値17.64より右の面積が約4%`)}
    ${K(t,n,e,30,M,.4)}${G(t,n,k,.01,30,2.2)}
    <line x1="${F(H(t,e))}" y1="${t.y+10}" x2="${F(H(t,e))}" y2="${t.y+t.h}" stroke="${M}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${F(H(t,e)+4)}" y="${t.y+20}" font-size="12.4" font-weight="700" fill="${M}">観測値 ${e.toFixed(2)}</text>
    <text x="${F(H(t,21))}" y="${F(U(t,.03))}" font-size="12.4" font-weight="700" fill="${M}">右の面積 ${L(r)}</text>
    ${W(t,[0,5,10,15,20,25,30])}
    <text x="${t.x+t.w/2}" y="222" text-anchor="middle" font-size="12.4" fill="${N}">χ²(9)：σ が 0.05 のままのときの (n−1)s²/σ² の分布</text>
  </svg>`,`σ = 0.05 のままなら、10本の (n−1)s²/σ² はこの山のどこかに出ます。赤く塗った部分が、観測値 17.64 より右に出る確率です。`)}function kt(){let e=5/(6/Math.sqrt(10)),t={x:14,y:30,w:316,h:150,xMin:1.5,xMax:4.5,yMax:.14},n=Et(9),r=e=>B(e),i=2*wt(n,e,40),a=2*(1-V(e));return q(`${J(344,236,`自由度9のt分布と標準正規分布の右の裾を拡大。2.64より右の面積は t の方が大きい`)}
    ${K(t,n,e,4.5,M,.3)}${K(t,r,e,4.5,N,.45)}
    ${G(t,r,N,1.5,4.5,1.8,`4 3`)}${G(t,n,k,1.5,4.5,2.2)}
    <line x1="${F(H(t,e))}" y1="${t.y+30}" x2="${F(H(t,e))}" y2="${t.y+t.h}" stroke="${M}" stroke-width="1.3" stroke-dasharray="4 3" />
    <text x="${F(H(t,e)+4)}" y="${t.y+40}" font-size="12.4" font-weight="700" fill="${M}">T = ${e.toFixed(2)}</text>
    <text x="2" y="14" font-size="12.4" font-weight="700" fill="${k}">t(9)：両側 ${L(i)}</text>
    <text x="342" y="14" text-anchor="end" font-size="12.4" font-weight="700" fill="${N}">N(0, 1)（点線・灰）：両側 ${L(a)}</text>
    ${W(t,[1.5,2,2.5,3,3.5,4,4.5])}
    <text x="${t.x+t.w/2}" y="214" text-anchor="middle" font-size="12.4" fill="${N}">右の裾だけを拡大（左の裾も同じ形）</text>
    <text x="${t.x+t.w/2}" y="231" text-anchor="middle" font-size="12.4" fill="${N}">薬の効果が無いときの T の分布</text>
  </svg>`,`裾を拡大すると、t(9)（藍）は正規分布（灰の点線）より高く、2.64 より右の面積（赤）も正規分布の面積（灰）より大きいことが分かります。`)}function At(){let e={x:14,y:30,w:316,h:150,xMin:0,xMax:4,yMax:.85},t=Dt(10,15),n=wt(t,2,60,2e3);return q(`${J(344,226,`F(10,15) 分布。2.0より右の面積は約11%`)}
    ${K(e,t,2,4,M,.4)}${G(e,t,k,.01,4,2.2)}
    <line x1="${F(H(e,1))}" y1="${e.y}" x2="${F(H(e,1))}" y2="${e.y+e.h}" stroke="${N}" stroke-width="1" stroke-dasharray="2 3" />
    <line x1="${F(H(e,2))}" y1="${e.y+10}" x2="${F(H(e,2))}" y2="${e.y+e.h}" stroke="${M}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${F(H(e,2)+4)}" y="${e.y+20}" font-size="12.4" font-weight="700" fill="${M}">観測した比 2.0</text>
    <text x="${F(H(e,2.55))}" y="${F(U(e,.16))}" font-size="12.4" font-weight="700" fill="${M}">右の面積 ${L(n)}</text>
    ${W(e,[0,1,2,3,4])}
    <text x="${e.x+e.w/2}" y="222" text-anchor="middle" font-size="12.4" fill="${N}">F(10, 15)：母分散が等しいときの s₁²/s₂² の分布</text>
  </svg>`,`母分散が等しくても、標本分散の比は1（点線）のまわりで大きくばらつきます。赤く塗った部分が、比が2.0以上になる確率です。`)}function jt(){let e=2.262,t=e*e,n=Et(9),r=Dt(1,9),i=2*wt(n,e,60,2e3),a=wt(r,t,400,8e3),o={x:14,y:30,w:316,h:106,xMin:-4,xMax:4,yMax:.42},s={x:14,y:226,w:316,h:106,xMin:0,xMax:10,yMax:.42},c=(e,t,n,r)=>`<line x1="${F(H(e,t))}" y1="${e.y+18}" x2="${F(H(e,t))}" y2="${e.y+e.h}" stroke="${M}" stroke-width="1.3" stroke-dasharray="4 3" />
    <text x="${F(H(e,t)+(r===`end`?-4:4))}" y="${e.y+28}" text-anchor="${r}" font-size="12.4" font-weight="700" fill="${M}">${n}</text>`;return q(`${J(344,360,`上は自由度9のt分布で、2.262より外側の左右の裾が合わせて5%。2乗すると左右が重なり、下のF(1,9)分布の5.12より右の裾5%になる`)}
    <defs><marker id="tf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${P}" /></marker></defs>
    <text x="2" y="14" font-size="12.4" font-weight="700" fill="${k}">t(9)：左右の裾を合わせて ${L(i)}</text>
    ${K(o,n,-4,-e,M,.45)}${K(o,n,e,4,M,.45)}${G(o,n,k,-4,4,2.2)}
    ${c(o,-e,`−2.262`,`end`)}${c(o,e,`2.262`,`start`)}
    ${W(o,[-4,-2,0,2,4])}
    <line x1="${344/2}" y1="164" x2="${344/2}" y2="194" stroke="${P}" stroke-width="1.6" marker-end="url(#tf-arrow)" />
    <text x="182" y="176" font-size="12.4" fill="${P}">2乗する</text>
    <text x="182" y="192" font-size="12.4" fill="${N}">−3 も 3 も 9 になる</text>
    <text x="2" y="210" font-size="12.4" font-weight="700" fill="${A}">F(1, 9)：右の裾 ${L(a)}</text>
    ${K(s,r,t,10,M,.45)}${G(s,r,A,.05,10,2.2)}
    ${c(s,t,`2.262² = `+t.toFixed(2),`start`)}
    ${W(s,[0,2,4,6,8,10])}
  </svg>`,`2乗すると、絶対値が同じ左右の値が同じ1つの値になります。t の左右の裾（合わせて ${L(i,0)}）が重なって、F(1, 9) の右の裾（${L(a,0)}）になります。`)}function Mt(){let e={x:14,y:30,w:316,h:170,xMin:0,xMax:1,yMax:5.2},t=e=>Math.exp(z(6)-z(e)-z(5-e+1)),n=e=>n=>t(e)*n**(e-1)*(1-n)**(5-e),r=[{k:1,c:N,x:.06,y:4.3,a:`start`,t:`1番目（最小）`},{k:2,c:j,x:.25,y:2.35,a:`middle`,t:`2番目`},{k:3,c:k,x:.5,y:2.1,a:`middle`,t:`3番目（中央値）`},{k:4,c:`#b45309`,x:.75,y:2.35,a:`middle`,t:`4番目`},{k:5,c:M,x:.94,y:4.3,a:`end`,t:`5番目（最大）`}];return q(`${J(344,250,`0から1の一様分布から5個とったときの、小さい方から1番目から5番目の値の分布。1番目は0の近く、5番目は1の近くに山があり、3番目の中央値は0.5を中心に左右対称`)}
    ${r.map(({k:t,c:r})=>G(e,n(t),r,5e-4,.9995,2)).join(``)}
    ${r.map(({c:t,x:n,y:r,a:i,t:a})=>`<text x="${F(H(e,n))}" y="${F(U(e,r))}" text-anchor="${i}" font-size="12.4" font-weight="700" fill="${t}">${a}</text>`).join(``)}
    ${W(e,[0,.2,.4,.6,.8,1])}
    <text x="${344/2}" y="246" text-anchor="middle" font-size="12.4" fill="${N}">横軸＝小さい方から k 番目の値</text>
  </svg>`,`5個の値は 0 から 1 をおよそ6等分する位置に並び、k 番目の値の期待値は k/6 です。端の2つ（最小・最大）は山が鋭く、中央値は広がります。`)}function Nt(){let e=[{x:62,c:j},{x:112,c:j},{x:172,c:k},{x:236,c:A},{x:290,c:A}];return q(`${J(344,210,`5個のうち3番目の値が x に来るのは、2個が x より小さく、1個が x のあたりにあり、2個が x より大きいとき`)}
    <rect x="20" y="58" width="142" height="48" rx="6" fill="${j}" fill-opacity="0.08" />
    <rect x="182" y="58" width="142" height="48" rx="6" fill="${A}" fill-opacity="0.08" />
    <line x1="20" y1="92" x2="324" y2="92" stroke="${N}" stroke-width="1.2" />
    <line x1="172" y1="52" x2="172" y2="104" stroke="${k}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="172" y="48" text-anchor="middle" font-size="13.2" font-weight="700" fill="${k}">x</text>
    ${e.map(({x:e,c:t})=>`<circle cx="${e}" cy="92" r="7" fill="${t}" />`).join(``)}
    <text x="${182/2}" y="76" text-anchor="middle" font-size="12.4" fill="${j}">x より小さい</text>
    <text x="${506/2}" y="76" text-anchor="middle" font-size="12.4" fill="#b45309">x より大きい</text>
    <text x="${182/2}" y="126" text-anchor="middle" font-size="13.2" font-weight="700" fill="${j}">2個：F(x)²</text>
    <text x="172" y="148" text-anchor="middle" font-size="13.2" font-weight="700" fill="${k}">1個：f(x)</text>
    <text x="${506/2}" y="126" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">2個：{1−F(x)}²</text>
    <text x="${344/2}" y="180" text-anchor="middle" font-size="12.4" fill="${P}">どの2個・どの1個・どの2個にするかの分け方</text>
    <text x="${344/2}" y="198" text-anchor="middle" font-size="12.4" fill="${P}">5! ÷ (2! × 1! × 2!) ＝ 30 通り</text>
  </svg>`,`5個のうち3番目（中央値）が x に来るときの例です。3つの組の確率を掛け、分け方の数 30 を掛けたものが密度になります。`)}function Pt(){let e=Math.sqrt(3),t={x:14,y:30,w:316,h:96,xMin:-2.6,xMax:2.6,yMax:.46},n={x:14,y:196,w:316,h:106,xMin:-1.3,xMax:1.3,yMax:1.75},r=1/(2*e),i=B(0),a=1/(10*i),o=1/(10*r);return q(`${J(344,340,`分散が同じ1の正規分布と一様分布。真ん中の密度は正規分布0.40、一様分布0.29。25個の中央値の分布は、正規分布からのほうが細い`)}
    <text x="${t.x}" y="${t.y-12}" font-size="12.4" font-weight="700" fill="${P}">元の分布（どちらも平均0・分散1）</text>
    ${G(t,e=>B(e),k)}
    ${(t=>`<polyline points="${F(H(t,-2.6))},${F(U(t,0))} ${F(H(t,-e))},${F(U(t,0))} ${F(H(t,-e))},${F(U(t,r))} ${F(H(t,e))},${F(U(t,r))} ${F(H(t,e))},${F(U(t,0))} ${F(H(t,2.6))},${F(U(t,0))}" fill="none" stroke="#b45309" stroke-width="2" />`)(t)}
    <circle cx="${F(H(t,0))}" cy="${F(U(t,i))}" r="3.5" fill="${k}" />
    <circle cx="${F(H(t,0))}" cy="${F(U(t,r))}" r="3.5" fill="#b45309" />
    <text x="${F(H(t,.12))}" y="${F(U(t,i)-4)}" font-size="12.4" fill="${k}">f(m) = 0.40</text>
    <text x="${F(H(t,0))}" y="${F(U(t,.12))}" text-anchor="middle" font-size="12.4" fill="#b45309">f(m) = 0.29</text>
    <text x="${F(H(t,-2.5))}" y="${F(U(t,.37))}" font-size="12.4" font-weight="700" fill="${k}">正規</text>
    <text x="${F(H(t,2.5))}" y="${F(U(t,.37))}" text-anchor="end" font-size="12.4" font-weight="700" fill="#b45309">一様</text>
    ${W(t,[-2,-1,0,1,2])}
    <text x="${n.x}" y="${n.y-12}" font-size="12.4" font-weight="700" fill="${P}">25個の中央値 M の分布</text>
    ${G(n,e=>B(e,0,a),k)}
    ${G(n,e=>B(e,0,o),`#b45309`)}
    <text x="${F(H(n,.3))}" y="${F(U(n,1.5))}" font-size="12.4" fill="${k}">正規：標準偏差 ${I(a)}</text>
    <text x="${F(H(n,.62))}" y="${F(U(n,.72))}" font-size="12.4" fill="#b45309">一様：${I(o)}</text>
    ${W(n,[-1,-.5,0,.5,1])}
  </svg>`,`分散は同じでも、真ん中の密度 f(m) が高い正規分布のほうが、中央値の分布は細くなります。標準偏差は 1/(2√n f(m)) なので、f(m) が 0.40 と 0.29 なら、25個の中央値の標準偏差は 0.25 と 0.35 です。`)}function Ft(){let e=6.25/2.25,t=2.101;1/t;let n={x:14,y:30,w:316,h:120,xMin:0,xMax:3,yMax:1.25},r=Dt(29,29),i={x:14,y:206,w:316,h:54,xMin:0,xMax:7,yMax:1},a=i.y+i.h;return q(`${J(344,312,`F(29,29) 分布の両側2.5%点は0.48と2.10。標本分散の比2.78をそれぞれで割ると、母分散の比の95%信頼区間は1.32から5.84で、1を含まない`)}
    <text x="${n.x}" y="${n.y-12}" font-size="12.4" font-weight="700" fill="${P}">F(29, 29) の両側に 2.5% ずつ</text>
    ${K(n,r,.01,.47596382674916704,M,.4)}${K(n,r,t,3,M,.4)}${G(n,r,k,.01,3,2.2)}
    <text x="${F(H(n,.4))}" y="${F(U(n,.22))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${M}">0.48</text>
    <text x="${F(H(n,t))}" y="${F(U(n,.32))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${M}">2.10</text>
    ${W(n,[0,1,2,3])}
    <text x="${i.x}" y="${i.y-12}" font-size="12.4" font-weight="700" fill="${P}">母分散の比 σ₁²/σ₂² の95%信頼区間</text>
    <line x1="${F(H(i,1))}" y1="${i.y-4}" x2="${F(H(i,1))}" y2="${a}" stroke="${N}" stroke-width="1.2" stroke-dasharray="3 3" />
    <text x="${F(H(i,1)+5)}" y="${i.y+6}" font-size="12.4" fill="${N}">比が1＝等しい</text>
    <line x1="${F(H(i,e/t))}" y1="${a-22}" x2="${F(H(i,e*t))}" y2="${a-22}" stroke="${j}" stroke-width="4" stroke-linecap="round" />
    <circle cx="${F(H(i,e))}" cy="${a-22}" r="5" fill="${P}" />
    <text x="${F(H(i,e))}" y="${a-32}" text-anchor="middle" font-size="12.4" fill="${P}">2.78</text>
    <text x="${F(H(i,e/t))}" y="${a-32}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${j}">1.32</text>
    <text x="${F(H(i,e*t))}" y="${a-32}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${j}">5.84</text>
    ${W(i,[0,1,2,3,4,5,6,7])}
    <text x="${344/2}" y="308" text-anchor="middle" font-size="12.4" fill="${N}">黒丸＝標本分散の比 2.5² / 1.5² ＝ 2.78</text>
  </svg>`,`標本分散の比 2.78 を、上の図の 2.10 で割ると下端 1.32、0.48 で割ると上端 5.84 です。区間は 2.78 の左右で長さが違い、比が1の点線を含みません。`)}function It(){let e={x:34,y:24,w:290,h:150,xMin:0,xMax:3.2,yMax:1.05},t=e=>1-Math.exp(-e),n=[{p:.5,c:j},{p:.9,c:M}].map(e=>({...e,x:-Math.log(1-e.p)}));return q(`${J(340,216,`指数分布の累積分布関数を逆に読む。確率0.5から横へ進むと0.69年、確率0.9からだと2.30年`)}
    <line x1="${e.x}" y1="${e.y+e.h}" x2="${e.x+e.w}" y2="${e.y+e.h}" stroke="${N}" stroke-width="1" />
    <line x1="${e.x}" y1="${e.y}" x2="${e.x}" y2="${e.y+e.h}" stroke="${N}" stroke-width="1" />
    <text x="${e.x-6}" y="${F(U(e,1)+4)}" text-anchor="end" font-size="12.4" fill="${N}">1</text>
    <text x="${e.x-6}" y="${F(U(e,0)+4)}" text-anchor="end" font-size="12.4" fill="${N}">0</text>
    ${G(e,t,A,0,3.2,2.2)}
    ${n.map(({p:t,c:n,x:r})=>`
    <line x1="${e.x}" y1="${F(U(e,t))}" x2="${F(H(e,r))}" y2="${F(U(e,t))}" stroke="${n}" stroke-width="1.6" stroke-dasharray="5 3" />
    <line x1="${F(H(e,r))}" y1="${F(U(e,t))}" x2="${F(H(e,r))}" y2="${e.y+e.h}" stroke="${n}" stroke-width="1.6" stroke-dasharray="5 3" />
    <polygon points="${F(H(e,r)-4)},${e.y+e.h-8} ${F(H(e,r)+4)},${e.y+e.h-8} ${F(H(e,r))},${e.y+e.h-1}" fill="${n}" />
    <circle cx="${F(H(e,r))}" cy="${F(U(e,t))}" r="3.2" fill="${n}" />
    <text x="${e.x-6}" y="${F(U(e,t)+4)}" text-anchor="end" font-size="12.4" font-weight="700" fill="${n}">${t}</text>
    <text x="${F(H(e,r))}" y="${e.y+e.h+15}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${n}">${I(r)}</text>`).join(``)}
    <text x="${F(H(e,2.45))}" y="${F(U(e,.8))}" font-size="12.4" font-weight="700" fill="#b45309">F(x)</text>
    <text x="${F(H(e,.72)+6)}" y="${F(U(e,.5)+16)}" font-size="12.4" fill="${j}">中央値</text>
    <text x="${e.x+e.w/2}" y="212" text-anchor="middle" font-size="12.4" fill="${N}">横軸 ＝ 故障までの年数／縦軸 ＝ 確率 F(x)</text>
  </svg>`,`確率 p から横へ進んで曲線に当て、真下の x を読むのが分位点関数です。p ＝ 0.5 なら中央値の ${I(n[0].x)} 年、p ＝ 0.9 なら ${I(n[1].x)} 年です。`)}function Lt(){let e=[11,12,13,14,15],t={x:20,y:0,w:300,h:210,xMin:9,xMax:16,yMax:1},n=t=>e.reduce((e,n)=>e+(n-t)**2,0),r=(n,r,i)=>e.map((e,a)=>{let o=r+a*12;return`<line x1="${F(H(t,n))}" y1="${o}" x2="${F(H(t,e))}" y2="${o}" stroke="${i}" stroke-width="2" stroke-opacity="0.55" /><circle cx="${F(H(t,e))}" cy="${o}" r="3.6" fill="${P}" />`}).join(``),i=(e,n,r,i)=>`<line x1="${F(H(t,e))}" y1="${n}" x2="${F(H(t,e))}" y2="${r}" stroke="${i}" stroke-width="1.5" stroke-dasharray="4 3" />`;return q(`${J(340,246,`5個のデータを真の平均10から測るとずれの2乗の和は55、データ自身の平均13から測ると10`)}
    <text x="4" y="18" font-size="12.4" font-weight="700" fill="${M}">真の平均 μ ＝ 10 から：2乗の和 ${n(10)}</text>
    ${i(10,28,92,M)}${r(10,36,M)}
    <text x="4" y="118" font-size="12.4" font-weight="700" fill="${k}">標本平均 x̄ ＝ 13 から：2乗の和 ${n(13)}</text>
    ${i(13,128,192,k)}${r(13,136,k)}
    ${W(t,[9,10,11,12,13,14,15,16])}
    <text x="${340/2}" y="242" text-anchor="middle" font-size="12.4" fill="${N}">差 ${n(10)-n(13)} ＝ 5 ×（13 − 10）² ＝ n(x̄ − μ)²</text>
  </svg>`,`5個のデータ（11〜15）のずれを、真の平均 μ ＝ 10 から測った場合と、データ自身の平均 x̄ ＝ 13 から測った場合です。x̄ はデータの真ん中にあるので、2乗の和はほかのどの点から測るより小さくなります。`)}function Rt(){let e=1.2,t=1.96*e,n={x:14,y:34,w:312,h:140,xMin:-4.5,xMax:4.5,yMax:.36},r=t=>B(t,0,e),i=n.y+n.h,a=(e,t,r)=>`<line x1="${F(H(n,e))}" y1="${i}" x2="${F(H(n,e))}" y2="${i+4}" stroke="${r}" stroke-width="1.2" /><text x="${F(H(n,e))}" y="${i+17}" text-anchor="middle" font-size="12.4" fill="${r}">${t}</text>`;return q(`${J(340,226,`25人の平均身長の分布。真の平均から上下2.35cmの内側に95%が入り、外側は左右2.5%ずつ`)}
    ${K(n,r,-t,t,k,.22)}${K(n,r,-4.5,-t,M,.45)}${K(n,r,t,4.5,M,.45)}
    ${G(n,r,k,-4.5,4.5,2.2)}
    <line x1="${n.x}" y1="${i}" x2="${n.x+n.w}" y2="${i}" stroke="${N}" stroke-width="1" />
    ${[-t,t].map(e=>`<line x1="${F(H(n,e))}" y1="${F(U(n,r(e))-14)}" x2="${F(H(n,e))}" y2="${i}" stroke="${M}" stroke-width="1.3" stroke-dasharray="4 3" />`).join(``)}
    ${a(-t,`μ − 2.35`,M)}${a(0,`μ`,P)}${a(t,`μ ＋ 2.35`,M)}
    <text x="${F(H(n,0))}" y="${F(U(n,.1))}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${k}">95%</text>
    <text x="${F(H(n,-3.5))}" y="${F(U(n,.06))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${M}">2.5%</text>
    <text x="${F(H(n,3.5))}" y="${F(U(n,.06))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${M}">2.5%</text>
    <text x="${340/2}" y="16" text-anchor="middle" font-size="12.4" fill="${N}">25人の平均 X̄ の分布（標準誤差 6/√25 ＝ 1.2 cm）</text>
    <text x="${340/2}" y="222" text-anchor="middle" font-size="12.4" fill="${N}">±2.35 ＝ 1.96 × 1.2（1.96 は標準正規分布で中央95%の端）</text>
  </svg>`,`25人の平均 X̄ は、真の平均 μ を中心に標準誤差 1.2 cm で散らばります。μ から ±2.35 cm の内側に95%が入り、外側に出るのは左右2.5%ずつです。`)}function zt(){let e=1.2,t=1.96*e,n={x:14,y:30,w:312,h:176,xMin:165,xMax:177,yMax:1},r=Xe(Y(1016)),i=Array.from({length:20},()=>171+e*r()),a=i.filter(e=>Math.abs(e-171)>t).length;return q(`${J(340,244,`25人を測って95%信頼区間を作ることを20回くり返した模擬。20本中${a}本が真の平均を外す`)}
    <line x1="${F(H(n,171))}" y1="22" x2="${F(H(n,171))}" y2="${n.y+n.h}" stroke="${M}" stroke-width="1.5" stroke-dasharray="4 3" />
    <text x="${F(H(n,171))}" y="15" text-anchor="middle" font-size="12.4" font-weight="700" fill="${M}">真の平均 μ ＝ 171（動かない）</text>
    ${i.map((e,r)=>{let i=n.y+6+r*8.4,a=Math.abs(e-171)>t?M:k;return`<line x1="${F(H(n,e-t))}" y1="${F(i)}" x2="${F(H(n,e+t))}" y2="${F(i)}" stroke="${a}" stroke-width="2" /><circle cx="${F(H(n,e))}" cy="${F(i)}" r="2.2" fill="${a}" />`}).join(``)}
    ${W(n,[166,168,170,172,174,176])}
    <text x="${340/2}" y="240" text-anchor="middle" font-size="12.4" fill="${N}">横軸 ＝ 身長（cm）／点 ＝ その回の x̄、横線 ＝ x̄ ± 2.35</text>
  </svg>`,`μ ＝ 171、σ ＝ 6 として、25人を測り区間を作ることをコンピュータで20回くり返しました。区間は標本ごとに左右に揺れ、20本中${a}本が μ を外しています（赤）。`)}function Bt(){let e=2.7004,t=19.0228,n={x:14,y:30,w:312,h:144,xMin:0,xMax:26,yMax:.115},r=Tt(9),i=n.y+n.h;return q(`${J(340,226,`自由度9のカイ二乗分布。2.70から19.02の間に95%が入り、左右に2.5%ずつ残る。山は左に寄っている`)}
    ${K(n,r,e,t,k,.22)}${K(n,r,.001,e,M,.5)}${K(n,r,t,26,M,.5)}
    ${G(n,r,k,.01,26,2.2)}
    ${[e,t].map(e=>`<line x1="${F(H(n,e))}" y1="${F(U(n,r(e))-16)}" x2="${F(H(n,e))}" y2="${i}" stroke="${M}" stroke-width="1.3" stroke-dasharray="4 3" />`).join(``)}
    ${W(n,[0,10])}
    <text x="${F(H(n,e))}" y="${i+14}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${M}">2.70</text>
    <text x="${F(H(n,t))}" y="${i+14}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${M}">19.02</text>
    <text x="${F(H(n,9))}" y="${F(U(n,.04))}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${k}">95%</text>
    <text x="${F(H(n,e)-4)}" y="${F(U(n,r(e))-20)}" text-anchor="end" font-size="12.4" font-weight="700" fill="${M}">2.5%</text>
    <text x="${F(H(n,22))}" y="${F(U(n,.022))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${M}">2.5%</text>
    <text x="${n.x+n.w/2}" y="222" text-anchor="middle" font-size="12.4" fill="${N}">横軸 ＝ 9s²/σ²（自由度9のカイ二乗分布）</text>
  </svg>`,`ボルト10本の 9s²/σ² は、95%の確率で 2.70 から 19.02 の間に出ます。山の頂上は7で左に寄っているので、2つの端は頂上から等しい距離になりません。`)}function Vt(){let e=.52,t={x:70,y:40,w:256,h:110,xMin:.44,xMax:.6,yMax:1},n=[250,1e3,4e3].map((n,r)=>{let i=1.96*Math.sqrt(e*(1-e)/n),a=t.y+18+r*36,o=e-i>.5?j:k;return`<text x="${t.x-8}" y="${a+4}" text-anchor="end" font-size="12.4" fill="${P}">${n}人</text>
    <line x1="${F(H(t,e-i))}" y1="${a}" x2="${F(H(t,e+i))}" y2="${a}" stroke="${o}" stroke-width="4" stroke-linecap="round" />
    <circle cx="${F(H(t,e))}" cy="${a}" r="4.5" fill="${P}" />
    <text x="${F(Math.abs(e-i-.5)<.015?H(t,.5)+4:H(t,e-i))}" y="${a-9}" text-anchor="${Math.abs(e-i-.5)<.015?`start`:`middle`}" font-size="12.4" font-weight="700" fill="${o}" stroke="#fff" stroke-width="4" paint-order="stroke">${(e-i).toFixed(3)}</text>
    <text x="${F(Math.abs(e-i-.5)<.015?H(t,e+i)+6:H(t,e+i))}" y="${Math.abs(e-i-.5)<.015?a+4:a-9}" text-anchor="${Math.abs(e-i-.5)<.015?`start`:`middle`}" font-size="12.4" font-weight="700" fill="${o}" stroke="#fff" stroke-width="4" paint-order="stroke">${(e+i).toFixed(3)}</text>`}).join(``);return q(`${J(340,196,`標本比率0.52の95%信頼区間。250人と1000人では0.5をまたぎ、4000人では0.505から0.535で0.5を含まない`)}
    <line x1="${F(H(t,.5))}" y1="${t.y-6}" x2="${F(H(t,.5))}" y2="${t.y+t.h}" stroke="${M}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${F(H(t,.5))}" y="${t.y-12}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${M}">過半数の境目 0.5</text>
    ${n}
    ${W(t,[.44,.48,.52,.56,.6])}
    <text x="${340/2}" y="192" text-anchor="middle" font-size="12.4" fill="${N}">黒丸 ＝ 標本比率 0.52（どの人数でも同じ）</text>
  </svg>`,`標本比率が同じでも、聞いた人数で区間の幅が変わります。幅は人数の平方根に反比例するので、4倍の4000人に聞くと幅が半分になり、区間が0.5の右に収まります。`)}function Ht(){let e=2.5/Math.sqrt(30),t=1.5/Math.sqrt(30),n=2.045,r=Math.sqrt(e**2+t**2),i=2.012*r,a={x:70,y:30,w:256,h:64,xMin:46,xMax:52,yMax:1},o={x:70,y:158,w:256,h:50,xMin:-1,xMax:4,yMax:1},s=(e,t,n,r,i,a)=>`
    <text x="${e.x-8}" y="${t+4}" text-anchor="end" font-size="12.4" fill="${P}">${i}</text>
    <line x1="${F(H(e,n-r))}" y1="${t}" x2="${F(H(e,n+r))}" y2="${t}" stroke="${a}" stroke-width="4" stroke-linecap="round" />
    <circle cx="${F(H(e,n))}" cy="${t}" r="4.5" fill="${P}" />`,c=o.y+o.h;return q(`${J(340,262,`工場Aの平均50.0gと工場Bの平均48.0gの区間、その下に差2.0gの95%信頼区間0.93から3.07。差の区間は0を含まない`)}
    <text x="4" y="16" font-size="12.4" font-weight="700" fill="${P}">それぞれの平均（g）と95%区間</text>
    ${s(a,a.y+14,50,n*e,`工場A`,k)}${s(a,a.y+44,48,n*t,`工場B`,A)}
    ${W(a,[46,48,50,52])}
    <text x="4" y="${o.y-22}" font-size="12.4" font-weight="700" fill="${P}">差 A − B の95%信頼区間</text>
    <line x1="${F(H(o,0))}" y1="${o.y-10}" x2="${F(H(o,0))}" y2="${c}" stroke="${M}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${F(H(o,0)+5)}" y="${o.y-1}" font-size="12.4" fill="${M}">差 0</text>
    ${s(o,c-20,2,i,`A − B`,j)}
    <text x="${F(H(o,2-i))}" y="${c-30}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${j}">${I(2-i)}</text>
    <text x="${F(H(o,2+i))}" y="${c-30}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${j}">${I(2+i)}</text>
    ${W(o,[-1,0,1,2,3,4])}
    <text x="${340/2}" y="258" text-anchor="middle" font-size="12.4" fill="${N}">差の標準誤差 ＝ √(${I(e)}² ＋ ${I(t)}²) ＝ ${I(r)}</text>
  </svg>`,`差の区間の幅は、2つの区間の幅を足したものより狭くなります。標準誤差は足すのではなく、2乗して足してから平方根をとるからです。区間は0を含みません。`)}function Ut(){let e=[150,138,162,145,170,155],t=[144,135,154,141,163,150],n={x:40,y:34,w:130,h:170,xMin:0,xMax:1,yMax:1},r=e=>n.y+n.h-(e-130)/45*n.h,i={x:236,y:34,w:90,h:170,xMin:0,xMax:1,yMax:1},a=e=>i.y+i.h-e/10*i.h,o=e.map((e,n)=>e-t[n]),s=3.537,c=7.463;return q(`${J(340,250,`6人の血圧の前後を線で結んだ図と、6人の下がり幅。人どうしの差は138から170と大きいが、下がり幅は3から8にまとまり、平均5.5の区間は3.54から7.46`)}
    <text x="${n.x+n.w/2}" y="16" text-anchor="middle" font-size="12.4" font-weight="700" fill="${P}">6人の前と後</text>
    ${[130,145,160,175].map(e=>`<text x="${n.x-6}" y="${F(r(e)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${e}</text><line x1="${n.x}" y1="${F(r(e))}" x2="${n.x+n.w}" y2="${F(r(e))}" stroke="#e2e8f0" />`).join(``)}
    ${e.map((e,i)=>`<line x1="${n.x+20}" y1="${F(r(e))}" x2="${n.x+n.w-20}" y2="${F(r(t[i]))}" stroke="${k}" stroke-width="1.6" /><circle cx="${n.x+20}" cy="${F(r(e))}" r="3.4" fill="${k}" /><circle cx="${n.x+n.w-20}" cy="${F(r(t[i]))}" r="3.4" fill="${A}" />`).join(``)}
    <text x="${n.x+20}" y="${n.y+n.h+16}" text-anchor="middle" font-size="12.4" fill="${k}">前</text>
    <text x="${n.x+n.w-20}" y="${n.y+n.h+16}" text-anchor="middle" font-size="12.4" fill="${A}">後</text>
    <text x="${i.x+i.w/2}" y="16" text-anchor="middle" font-size="12.4" font-weight="700" fill="${P}">下がり幅</text>
    ${[0,5,10].map(e=>`<text x="${i.x-6}" y="${F(a(e)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${e}</text><line x1="${i.x}" y1="${F(a(e))}" x2="${i.x+i.w}" y2="${F(a(e))}" stroke="#e2e8f0" />`).join(``)}
    ${o.map((e,t)=>`<circle cx="${i.x+18+t%2*12}" cy="${F(a(e))}" r="3.6" fill="${j}" />`).join(``)}
    <line x1="${i.x+62}" y1="${F(a(s))}" x2="${i.x+62}" y2="${F(a(c))}" stroke="${j}" stroke-width="4" stroke-linecap="round" />
    <circle cx="${i.x+62}" cy="${F(a(5.5))}" r="4.5" fill="${P}" />
    <text x="${i.x+62}" y="${F(a(c)-8)}" text-anchor="middle" font-size="12.4" fill="${j}">${I(c)}</text>
    <text x="${i.x+62}" y="${F(a(s)+16)}" text-anchor="middle" font-size="12.4" fill="${j}">${I(s)}</text>
    <text x="${340/2}" y="246" text-anchor="middle" font-size="12.4" fill="${N}">縦軸の単位 mmHg／右の縦線 ＝ 下がり幅の平均の95%区間</text>
  </svg>`,`左の6本の線は高さが大きく違いますが、どれも同じくらい右下がりです。人ごとに差をとると人どうしの違いが消え、右の下がり幅は3〜8にまとまります。`)}function Wt(){let e={x:14,y:30,w:312,h:84,xMin:-3.6,xMax:3.6,yMax:.42},t={x:14,y:168,w:312,h:84,xMin:-3.6,xMax:3.6,yMax:.42},n=e=>B(e),r=(e,t,r)=>`<line x1="${F(H(e,t))}" y1="${F(U(e,n(t))-12)}" x2="${F(H(e,t))}" y2="${e.y+e.h}" stroke="${M}" stroke-width="1.3" stroke-dasharray="4 3" /><text x="${F(H(e,t))}" y="${e.y+e.h+15}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${M}">${r}</text>`,i=e=>`<line x1="${e.x}" y1="${e.y+e.h}" x2="${e.x+e.w}" y2="${e.y+e.h}" stroke="${N}" stroke-width="1" />`;return q(`${J(340,286,`上は両側の区間で、左右の裾に2.5%ずつ残し端は±1.96。下は片側の限界で、右の裾だけに5%を残し端は1.645`)}
    <text x="4" y="16" font-size="12.4" font-weight="700" fill="${P}">両側の区間：左右に 2.5% ずつ</text>
    ${K(e,n,-1.96,1.96,k,.2)}${K(e,n,-3.6,-1.96,M,.5)}${K(e,n,1.96,3.6,M,.5)}${G(e,n,k,-3.6,3.6,2)}${i(e)}
    ${r(e,-1.96,`−1.96`)}${r(e,1.96,`1.96`)}
    <text x="${F(H(e,0))}" y="${F(U(e,.12))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${k}">95%</text>
    <text x="4" y="${t.y-14}" font-size="12.4" font-weight="700" fill="${P}">片側の限界：右だけに 5%</text>
    ${K(t,n,-3.6,1.645,k,.2)}${K(t,n,1.645,3.6,M,.5)}${G(t,n,k,-3.6,3.6,2)}${i(t)}
    ${r(t,1.645,`1.645`)}
    <text x="${F(H(t,-.3))}" y="${F(U(t,.12))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${k}">95%</text>
    <text x="${F(H(t,2.75))}" y="${F(U(t,.1))}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${M}">5%</text>
    <text x="${340/2}" y="282" text-anchor="middle" font-size="12.4" fill="${N}">横軸 ＝ (X̄ − μ) ÷ 標準誤差</text>
  </svg>`,`片側の限界は、外れる5%を片方の裾にまとめます。端が1.96から1.645に下がるので、「最低でもこれ以上」と言える値が、両側の区間の下端より内側に来ます。`)}function Gt(){let e={x:40,y:24,w:286,h:160,xMin:0,xMax:1,yMax:1},t=t=>e.y+e.h-t*e.h,n=e=>{let t=0;for(let n=0;n<=20;n++){let r=n/20,i=1.96*Math.sqrt(r*(1-r)/20);r-i<=e&&e<=r+i&&(t+=pe(20,e,n))}return t},r=[];for(let i=4;i<=396;i++){let a=i/400;r.push(`${F(H(e,a))},${F(t(n(a)))}`)}let i=n(.05);return q(`${J(340,236,`20人に聞いて正規近似の式で作った95%区間が、真の比率を含む割合。pが0.5付近では95%前後だが、pが0や1に近いと大きく下がり、p＝0.05で${L(i,0)}`)}
    ${[0,.5,.95].map(n=>`<text x="${e.x-6}" y="${F(t(n)+4)}" text-anchor="end" font-size="12.4" fill="${n===.95?M:N}">${L(n,0)}</text>`).join(``)}
    <line x1="${e.x}" y1="${F(t(.95))}" x2="${e.x+e.w}" y2="${F(t(.95))}" stroke="${M}" stroke-width="1.3" stroke-dasharray="4 3" />
    <line x1="${e.x}" y1="${e.y}" x2="${e.x}" y2="${e.y+e.h}" stroke="${N}" stroke-width="1" />
    <polyline points="${r.join(` `)}" fill="none" stroke="${k}" stroke-width="1.4" />
    <circle cx="${F(H(e,.05))}" cy="${F(t(i))}" r="4" fill="${M}" />
    <text x="${F(H(e,.05)+8)}" y="${F(t(i)+4)}" font-size="12.4" font-weight="700" fill="${M}">p ＝ 0.05 で ${L(i,0)}</text>
    ${W(e,[0,.25,.5,.75,1])}
    <text x="${340/2}" y="232" text-anchor="middle" font-size="12.4" fill="${N}">横軸 ＝ 真の比率 p／縦軸 ＝ 区間が p を含む確率</text>
  </svg>`,`20人の結果は0〜20人の21通りしかないので、線はギザギザになります。公称は95%でも、p が0や1に近いと大きく下回ります。確率は二項分布から正確に計算しました。`)}function Kt(){let e=[3,5,6,8,13],t={x:20,y:30,w:236,h:160,xMin:2,xMax:14,yMax:1},n=e=>e.reduce((e,t)=>e+t,0)/e.length,r=e.map((r,i)=>{let a=t.y+14+i*30,o=n(e.filter((e,t)=>t!==i));return`${e.map((e,n)=>n===i?`<circle cx="${F(H(t,e))}" cy="${a}" r="4.6" fill="none" stroke="${M}" stroke-width="1.6" />`:`<circle cx="${F(H(t,e))}" cy="${a}" r="4.6" fill="${k}" />`).join(``)}
    <line x1="${F(H(t,o))}" y1="${a-10}" x2="${F(H(t,o))}" y2="${a+10}" stroke="${A}" stroke-width="2.4" />
    <text x="${t.x+t.w+14}" y="${a+4}" font-size="12.4" fill="${P}">${o}</text>`}).join(``);return q(`${J(340,236,`5個のデータ3,5,6,8,13から1個ずつ除いた5通りの平均は8,7.5,7.25,6.75,5.5。13を除いたときに最も大きく動く`)}
    <text x="${t.x+t.w+14}" y="${t.y-10}" font-size="12.4" font-weight="700" fill="${A}">残りの平均</text>
    <line x1="${F(H(t,7))}" y1="${t.y-2}" x2="${F(H(t,7))}" y2="${t.y+t.h-8}" stroke="${N}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${F(H(t,7))}" y="${t.y-8}" text-anchor="middle" font-size="12.4" fill="${N}">全体の平均 7</text>
    ${r}
    ${W(t,[2,4,6,8,10,12,14])}
    <text x="${340/2}" y="232" text-anchor="middle" font-size="12.4" fill="${N}">白抜き ＝ 除いた1個／縦線 ＝ 残り4個の平均</text>
  </svg>`,`1行に1通りずつ、白抜きの1個を除いて残り4個の平均を縦線で示しました。離れた13を除くと平均が大きく動きます。この動き方の大きさから標準誤差を見積もります。`)}function qt(){let e=.12,t=.09,n=1e3,r=1.96*Math.sqrt(e*(1-e)/n),i=1.96*Math.sqrt(t*(1-t)/n),a=Math.sqrt(e*(1-e)/n+t*(1-t)/n),o=1.96*a,s=e-t,c={x:70,y:30,w:256,h:64,xMin:6,xMax:16,yMax:1},l={x:70,y:158,w:256,h:50,xMin:-1,xMax:7,yMax:1},u=(e,t,n,r,i,a)=>`
    <text x="${e.x-8}" y="${t+4}" text-anchor="end" font-size="12.4" fill="${P}">${i}</text>
    <line x1="${F(H(e,n-r))}" y1="${t}" x2="${F(H(e,n+r))}" y2="${t}" stroke="${a}" stroke-width="4" stroke-linecap="round" />
    <circle cx="${F(H(e,n))}" cy="${t}" r="4.5" fill="${P}" />`,d=100*(e-r),f=100*(t+i),p=l.y+l.h;return q(`${J(340,262,`案Aのクリック率12%の区間10.0から14.0%と案Bの9%の区間7.2から10.8%は一部が重なる。それでも差3ポイントの95%信頼区間0.3から5.7ポイントは0を含まない`)}
    <text x="4" y="16" font-size="12.4" font-weight="700" fill="${P}">それぞれのクリック率（%）と95%区間</text>
    <rect x="${F(H(c,d))}" y="${c.y}" width="${F(H(c,f)-H(c,d))}" height="${c.h}" fill="${M}" fill-opacity="0.12" />
    <text x="${F((H(c,d)+H(c,f))/2)}" y="${c.y+32}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${M}">重なる</text>
    ${u(c,c.y+12,100*e,100*r,`案A`,k)}${u(c,c.y+52,100*t,100*i,`案B`,A)}
    ${W(c,[6,8,10,12,14,16])}
    <text x="4" y="${l.y-22}" font-size="12.4" font-weight="700" fill="${P}">差 A − B の95%信頼区間（ポイント）</text>
    <line x1="${F(H(l,0))}" y1="${l.y-10}" x2="${F(H(l,0))}" y2="${p}" stroke="${M}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${F(H(l,0)-5)}" y="${l.y-1}" text-anchor="end" font-size="12.4" fill="${M}">差 0</text>
    ${u(l,p-20,100*s,100*o,`A − B`,j)}
    <text x="${F(H(l,100*(s-o)))}" y="${p-30}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${j}">${(100*(s-o)).toFixed(1)}</text>
    <text x="${F(H(l,100*(s+o)))}" y="${p-30}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${j}">${(100*(s+o)).toFixed(1)}</text>
    ${W(l,[-1,0,1,2,3,4,5,6,7])}
    <text x="${340/2}" y="258" text-anchor="middle" font-size="12.4" fill="${N}">差の標準誤差 ＝ √(1.03² ＋ 0.90²) ＝ ${(100*a).toFixed(2)} ポイント</text>
  </svg>`,`上の2本の区間は ${d.toFixed(1)}〜${f.toFixed(1)}% の範囲で重なっていますが、下の差の区間は0を含みません。`)}function Jt(){let e=3.5,t=(t,n,r)=>{let i=8*Math.sqrt(2/t),a=1.96*i,o=V((e-a)/i)+V((-a-e)/i),s={x:14,y:n+22,w:312,h:76,xMin:-4,xMax:8,yMax:.34},c=e=>B(e,0,i),l=t=>B(t,e,i),u=s.y+s.h;return`
    <text x="4" y="${n+12}" font-size="12.4" font-weight="700" fill="${P}">${t}人ずつ（標準誤差 ${I(i)}）：検出力 ${I(o)}</text>
    ${K(s,l,-4,a,N,.32)}${K(s,l,a,8,j,.22)}
    ${K(s,c,a,8,M,.55)}${K(s,c,-4,-a,M,.55)}
    ${G(s,c,k)}${G(s,l,j)}
    <line x1="${F(H(s,a))}" y1="${s.y-4}" x2="${F(H(s,a))}" y2="${u}" stroke="${P}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${F(H(s,a)+4)}" y="${s.y+6}" font-size="12.4" fill="${P}" stroke="#fff" stroke-width="4" paint-order="stroke">境界 ${I(a)}</text>
    <text x="${F(H(s,-2.4))}" y="${s.y+30}" text-anchor="end" font-size="12.4" font-weight="700" fill="${k}">差 0</text>
    <text x="${F(H(s,5.6))}" y="${s.y+30}" text-anchor="start" font-size="12.4" font-weight="700" fill="${j}">差 3.5</text>
    <text x="${F(H(s,a-.45))}" y="${u-5}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${P}" stroke="#fff" stroke-width="3" paint-order="stroke">β</text>
    ${r?`
    <line x1="${F(H(s,0))}" y1="${u+28}" x2="${F(H(s,a))}" y2="${u+28}" stroke="${k}" stroke-width="2" />
    <line x1="${F(H(s,a))}" y1="${u+28}" x2="${F(H(s,e))}" y2="${u+28}" stroke="${j}" stroke-width="2" />
    ${[0,a,e].map(e=>`<line x1="${F(H(s,e))}" y1="${u+23}" x2="${F(H(s,e))}" y2="${u+33}" stroke="${P}" stroke-width="1.2" />`).join(``)}
    <text x="${F(H(s,a/2))}" y="${u+46}" text-anchor="middle" font-size="12.4" fill="${k}">1.96 × SE</text>
    <text x="${F(H(s,e)+4)}" y="${u+46}" text-anchor="start" font-size="12.4" fill="${j}">0.84 × SE</text>`:``}
    ${W(s,[-4,-2,0,2,4,6,8])}`};return q(`${J(340,306,`差が0の山と差が3.5の山。50人ずつでは境界3.14の右に出る確率が0.59、82人ずつでは山が細くなり境界2.45で検出力0.80。境界までの距離は1.96SEと0.84SEの和`)}
    ${t(50,0,!1)}
    ${t(82,136,!0)}
    <text x="${340/2}" y="302" text-anchor="middle" font-size="12.4" fill="${N}">赤 ＝ α（両側で5%）／灰 ＝ β／緑 ＝ 検出力</text>
  </svg>`,`横軸は観測される差（mmHg）。青の山は差が本当に0のとき、緑の山は差が本当に3.5のときの分布です。境界より外に出たら棄却します。人数を増やすと2つの山が細くなり、同じ α のまま検出力が上がります。下段では、境界までの 1.96 個分と、境界から 3.5 までの 0.84 個分の標準誤差が、差 3.5 をちょうど埋めています。`)}function Yt(){let e=3.5,t={x:40,y:24,w:282,h:176,xMin:0,xMax:8,yMax:1},n=[[20,N],[50,k],[82,j]],r=e=>t=>{let n=8*Math.sqrt(2/e),r=1.96*n;return V((t-r)/n)+V((-r-t)/n)},i=[.05,.5,.8,1].map(e=>`<line x1="${t.x}" y1="${F(U(t,e))}" x2="${t.x+t.w}" y2="${F(U(t,e))}" stroke="#e2e8f0" />
    <text x="${t.x-6}" y="${F(U(t,e)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${e}</text>`).join(``),a=n.map(([n,i])=>{let a=r(n)(e);return`<circle cx="${F(H(t,e))}" cy="${F(U(t,a))}" r="4" fill="${i}" />
    <text x="${F(H(t,e)-7)}" y="${F(U(t,a)+4)}" text-anchor="end" font-size="12.4" font-weight="700" fill="${i}" stroke="#fff" stroke-width="4" paint-order="stroke">${I(a)}</text>`}).join(``),o=n.map(([e,n],r)=>`<line x1="${t.x+196}" y1="${t.y+112+r*18}" x2="${t.x+216}" y2="${t.y+112+r*18}" stroke="${n}" stroke-width="2.4" />
    <text x="${t.x+222}" y="${t.y+116+r*18}" font-size="12.4" fill="${n}">${e}人ずつ</text>`).join(``);return q(`${J(340,250,`本当の差が0から8までの検出力。差0ではどれも0.05。差3.5で20人ずつ0.28、50人ずつ0.59、82人ずつ0.80`)}
    ${i}
    <line x1="${F(H(t,e))}" y1="${t.y}" x2="${F(H(t,e))}" y2="${t.y+t.h}" stroke="${N}" stroke-width="1" stroke-dasharray="3 3" />
    ${n.map(([e,n])=>G(t,r(e),n,0,8,2.2)).join(``)}
    ${a}${o}
    ${W(t,[0,1,2,3,3.5,4,5,6,7,8].filter(e=>e!==3&&e!==4))}
    <text x="${t.x-34}" y="${t.y-10}" font-size="12.4" fill="${N}">検出力</text>
    <text x="${t.x+t.w/2}" y="246" text-anchor="middle" font-size="12.4" fill="${N}">本当の差（mmHg）</text>
  </svg>`,`標準偏差 8、有意水準 5%（両側）で2群を比べたときの検出力です。差が0の左端ではどの線も 0.05 で、これは第1種の過誤の確率です。`)}function Xt(){let e=Array.from({length:40},(e,t)=>10+Math.round(90*t/39)),t=[7.8,9.1,9.4,10.3,13.5,10.8,10.9,17,18.4,17.9,20,13.2,21.9,23.4,20.1,25.4,22.6,29.3,28.3,25.3,30,29.7,36.1,41.3,37.9,45.2,33.3,34.1,41.2,45.1,45,56.2,43,41.5,45.3,41.4,50.1,50.3,59,47.1],n=n=>{let r=0,i=0,a=0,o=0,s=0;e.forEach((e,c)=>{r+=n[c],i+=n[c]*e,a+=n[c]*t[c],o+=n[c]*e*e,s+=n[c]*e*t[c]});let c=(r*s-i*a)/(r*o-i*i);return[(a-c*i)/r,c]},r=n(e.map(()=>1)),i=n(e.map(e=>1/(e*e))),a={x:36,y:20,w:290,h:184,xMin:0,xMax:100,yMax:70},o=e=>a.y+a.h-e/70*a.h,s=[...e.map(e=>`${F(H(a,e))},${F(o(2+.5*e+.16*e))}`),...[...e].reverse().map(e=>`${F(H(a,e))},${F(o(2+.5*e-.16*e))}`)].join(` `),c=(e,t,n=``)=>`<line x1="${F(H(a,5))}" y1="${F(o(e[0]+e[1]*5))}" x2="${F(H(a,100))}" y2="${F(o(e[0]+e[1]*100))}" stroke="${t}" stroke-width="2.2"${n?` stroke-dasharray="${n}"`:``} />`;return q(`${J(340,250,`店の広さ10から100平方メートルの40店の売上。広い店ほど点の散らばりが大きい。最小二乗法と重み付き最小二乗法の直線はほぼ重なる`)}
    ${[0,20,40,60].map(e=>`<line x1="${a.x}" y1="${F(o(e))}" x2="${a.x+a.w}" y2="${F(o(e))}" stroke="#e2e8f0" /><text x="${a.x-6}" y="${F(o(e)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${e}</text>`).join(``)}
    <polygon points="${s}" fill="${k}" fill-opacity="0.07" />
    ${e.map((e,n)=>`<circle cx="${F(H(a,e))}" cy="${F(o(t[n]))}" r="${F(1.6+30/e)}" fill="${k}" fill-opacity="0.7" />`).join(``)}
    ${c(r,A,`6 4`)}${c(i,j)}
    <text x="${a.x+4}" y="${a.y+12}" font-size="12.4" fill="${A}">点線 ＝ 最小二乗法（傾き ${r[1].toFixed(3)}）</text>
    <text x="${a.x+4}" y="${a.y+30}" font-size="12.4" fill="${j}">実線 ＝ 重み付き（傾き ${i[1].toFixed(3)}）</text>
    ${W(a,[0,20,40,60,80,100])}
    <text x="${a.x-30}" y="${a.y-6}" font-size="12.4" fill="${N}">売上</text>
    <text x="${a.x+a.w/2}" y="246" text-anchor="middle" font-size="12.4" fill="${N}">店の広さ（㎡）　点が大きいほど重みが大きい</text>
  </svg>`,`模擬データです（真の直線は 売上 ＝ 2 ＋ 0.5 × 広さ、誤差の標準偏差は広さの 0.08 倍）。薄い帯は真の直線から標準偏差2つ分の範囲で、右へ行くほど広がります。重み付き最小二乗法は、散らばりの小さい左側の店を重く数えます。`)}function Zt(){let e=.2,t=.5,n=1.6449*e,r={x:14,y:40,w:312,h:100,xMin:-.6,xMax:1.1,yMax:2.1},i=t=>B(t,0,e),a=n=>B(n,t,e),o=1-V((n-t)/e),s={x:40,y:196,w:286,h:96},c=e=>s.x+(e-r.xMin)/(r.xMax-r.xMin)*s.w,l=e=>s.y+s.h-(Math.max(-3,Math.min(3,e))- -3)/6*s.h,u=e=>25*(t*e-t*t/2)/Math.LN10,d=``;for(let e=0;e<=120;e++){let t=r.xMin+(r.xMax-r.xMin)*e/120,n=u(t);n<-3||n>3||(d+=`${d?`L`:`M`}${F(c(t))},${F(l(n))}`)}let f=Math.exp(25*(t*n-t*t/2));return q(`${J(340,330,`上段は帰無仮説と対立仮説のもとでの標本平均の分布。標本平均が0.329を超えたら棄却し、αは0.05、検出力は0.80。下段は尤度比で、標本平均が大きいほど大きくなり、0.329でちょうど2.68になる`)}
    <text x="4" y="14" font-size="12.4" font-weight="700" fill="${P}">標本平均の分布（25個の平均）</text>
    ${K(r,a,n,1.1,j,.25)}${K(r,i,n,1.1,M,.6)}
    ${G(r,i,k)}${G(r,a,j)}
    <text x="${F(H(r,-.2))}" y="${F(U(r,1.75))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${k}">μ = 0</text>
    <text x="${F(H(r,.72))}" y="${F(U(r,1.75))}" text-anchor="start" font-size="12.4" font-weight="700" fill="${j}">μ = 0.5</text>
    <text x="${F(H(r,.72))}" y="${F(U(r,1.4))}" text-anchor="start" font-size="12.4" fill="${j}" stroke="#fff" stroke-width="3" paint-order="stroke">検出力 ${I(o)}</text>
    <text x="${F(H(r,.36))}" y="${F(U(r,.08)-2)}" text-anchor="start" font-size="12.4" font-weight="700" fill="${M}" stroke="#fff" stroke-width="3" paint-order="stroke">α</text>
    ${W(r,[-.5,0,.5,1])}
    <line x1="${F(H(r,n))}" y1="${r.y-12}" x2="${F(H(r,n))}" y2="${s.y+s.h}" stroke="${P}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${F(H(r,n)+4)}" y="${r.y-2}" font-size="12.4" fill="${P}" stroke="#fff" stroke-width="4" paint-order="stroke">k = ${n.toFixed(3)}</text>
    <text x="4" y="${s.y-16}" font-size="12.4" font-weight="700" fill="${P}">尤度比 Λ ＝ L(0.5) ／ L(0)（対数目盛り）</text>
    ${[[-2,`1/100`],[0,`1`],[2,`100`]].map(([e,t])=>`<line x1="${s.x}" y1="${F(l(e))}" x2="${s.x+s.w}" y2="${F(l(e))}" stroke="#e2e8f0" />
    <text x="${s.x-5}" y="${F(l(e)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${t}</text>`).join(``)}
    <line x1="${s.x}" y1="${F(l(Math.log10(f)))}" x2="${s.x+s.w}" y2="${F(l(Math.log10(f)))}" stroke="${A}" stroke-width="1.6" />
    <text x="${s.x+4}" y="${F(l(Math.log10(f))-5)}" font-size="12.4" font-weight="700" fill="${A}" stroke="#fff" stroke-width="3" paint-order="stroke">c = ${f.toFixed(2)}</text>
    <path d="${d}" fill="none" stroke="${P}" stroke-width="2" />
    <circle cx="${F(c(n))}" cy="${F(l(Math.log10(f)))}" r="4" fill="${A}" />
    <line x1="${s.x}" y1="${s.y+s.h}" x2="${s.x+s.w}" y2="${s.y+s.h}" stroke="${N}" />
    ${[-.5,0,.5,1].map(e=>`<text x="${F(c(e))}" y="${s.y+s.h+16}" text-anchor="middle" font-size="12.4" fill="${N}">${e}</text>`).join(``)}
    <text x="${340/2}" y="328" text-anchor="middle" font-size="12.4" fill="${N}">横軸はどちらも標本平均 x̄</text>
  </svg>`,`上段の赤は μ = 0 のときに棄却してしまう確率（α = 0.05）、緑は μ = 0.5 のときに棄却できる確率（検出力）です。下段の尤度比は x̄ が大きいほど大きくなるので、「Λ が ${f.toFixed(2)} を超える」と「x̄ が ${n.toFixed(3)} を超える」は同じ棄却域を指します。`)}function Qt(){let e=.5,t=32/50,n=e=>32*Math.log(e)+18*Math.log(1-e),r={x:44,y:26,w:282,h:216},i=.38,a=.82,o=-38.4,s=e=>r.x+(e-i)/(a-i)*r.w,c=e=>r.y+r.h-(e-o)/(-31-o)*r.h,l=``;for(let e=0;e<=100;e++){let t=i+(a-i)*e/100,r=n(t);r<o||(l+=`${l?`L`:`M`}${F(s(t))},${F(c(r))}`)}32/e-18/(1-e);let u=t=>n(e)+28*(t-e),d=2*(n(t)-n(e)),f=(t-e)**2/(t*(1-t)/50);784/(50/(e*(1-e)));let p=r.y+r.h;return q(`${J(340,300,`コイン50回で表32回のときの対数尤度の曲線。尤度比検定は山頂とp=0.5の高さの差、ワルド検定は山頂の位置と0.5の横の距離、スコア検定はp=0.5での曲線の傾きを測る`)}
    ${[-38,-36,-34,-32].map(e=>`<line x1="${r.x}" y1="${F(c(e))}" x2="${r.x+r.w}" y2="${F(c(e))}" stroke="#e2e8f0" />
    <text x="${r.x-5}" y="${F(c(e)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${e}</text>`).join(``)}
    <path d="${l}" fill="none" stroke="${k}" stroke-width="2.2" />
    <line x1="${F(s(.43))}" y1="${F(c(u(.43)))}" x2="${F(s(.57))}" y2="${F(c(u(.57)))}" stroke="${j}" stroke-width="2" />
    <line x1="${F(s(e))}" y1="${F(c(n(e)))}" x2="${F(s(t))}" y2="${F(c(n(e)))}" stroke="${N}" stroke-dasharray="3 3" />
    <line x1="${F(s(t))}" y1="${F(c(n(e)))}" x2="${F(s(t))}" y2="${F(c(n(t)))}" stroke="${M}" stroke-width="2.6" />
    <line x1="${F(s(e))}" y1="${p-14}" x2="${F(s(t))}" y2="${p-14}" stroke="${A}" stroke-width="2.6" />
    ${[e,t].map(e=>`<line x1="${F(s(e))}" y1="${F(c(n(e)))}" x2="${F(s(e))}" y2="${p}" stroke="${N}" stroke-width="1" stroke-dasharray="2 3" />
    <circle cx="${F(s(e))}" cy="${F(c(n(e)))}" r="3.6" fill="${P}" />`).join(``)}
    <text x="${F(s(t)+6)}" y="${F(c(-31.45))}" font-size="12.4" font-weight="700" fill="${M}">尤度比：高さの差</text>
    <text x="${F(s(t)+6)}" y="${F(c(-31.45)+16)}" font-size="12.4" fill="${M}">${I(n(t)-n(e))}（2倍で ${I(d)}）</text>
    <text x="${F(s(t)+6)}" y="${p-24}" font-size="12.4" font-weight="700" fill="${A}">ワルド：横の距離</text>
    <text x="${F(s(t)+6)}" y="${p-8}" font-size="12.4" fill="${A}">${I(t-e)}（→ ${I(f)}）</text>
    <text x="${F(s(.51))}" y="${F(c(-36))}" font-size="12.4" font-weight="700" fill="${j}">スコア：傾き</text>
    <text x="${F(s(.51))}" y="${F(c(-36)+16)}" font-size="12.4" fill="${j}">28（→ ${I(3.92)}）</text>
    <line x1="${r.x}" y1="${p}" x2="${r.x+r.w}" y2="${p}" stroke="${N}" />
    ${[.4,.5,.6,.7,.8].map(e=>`<text x="${F(s(e))}" y="${p+16}" text-anchor="middle" font-size="12.4" fill="${N}">${e}</text>`).join(``)}
    <text x="${F(s(e))}" y="${p+34}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${P}">p₀</text>
    <text x="${F(s(t))}" y="${p+34}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${P}">推定値</text>
    <text x="${r.x+r.w}" y="${p+34}" text-anchor="end" font-size="12.4" fill="${N}">表の確率 p</text>
    <text x="4" y="13" font-size="12.4" fill="${N}">対数尤度 ℓ(p)</text>
  </svg>`,`50回投げて表が32回のときの対数尤度です。3つの検定は、同じ曲線の別の場所を測っています。括弧の中は、それぞれを χ²(1) と比べる統計量に直した値です。`)}function $t(){let e=[[[10.1,5.7],[8.3,4.9],[10.1,6],[10.8,6.3],[9.9,5.9],[11.5,6.8],[11,6.9],[11.3,6.6],[11.2,6.3],[11.1,6.7],[10.4,6.4],[9.2,5.7],[10.9,6.4],[10.9,6.7],[9.9,6]],[[11.1,6],[12.8,6.9],[12.3,6.8],[10.9,6.3],[10.5,5.9],[11.8,6.1],[11,6.3],[10.1,5.5],[12,7.1],[10.6,6.1],[11.6,6.7],[9.9,5],[10.9,6.3],[11.5,6.5],[9.7,5.1]],[[12,6.3],[13.5,6.8],[12.7,6.5],[13.6,6.9],[12.8,6.9],[11.9,6.6],[12.3,6.3],[12.4,6.4],[12.1,6.4],[12.5,6.4],[12.7,6.4],[12.1,6.4],[11.2,5.7],[12.3,6],[13,6.5]]],t=[.598,-.802],n=[k,A,j],r=[`品種A`,`品種B`,`品種C`],i={x:36,y:22,w:290,h:160,xMin:8,xMax:14,yMax:1},a=4.6,o=e=>i.y+i.h-(e-a)/(7.4-a)*i.h,s=e.map((e,t)=>e.map(([e,r])=>`<circle cx="${F(H(i,e))}" cy="${F(o(r))}" r="3.4" fill="${n[t]}" fill-opacity="0.75" />`).join(``)).join(``),c=11.3,l=6.27,u=.9,d=`<line x1="${F(H(i,c-t[0]*u))}" y1="${F(o(l-t[1]*u))}" x2="${F(H(i,c+t[0]*u))}" y2="${F(o(l+t[1]*u))}" stroke="${M}" stroke-width="2.4" marker-end="url(#cdaArrow)" />`,f=(t,r,i,a,o,s)=>{let c=e=>36+(e-a)/(o-a)*290;return`<text x="4" y="${t}" font-size="12.4" font-weight="700" fill="${P}">${r}</text>
    ${e.map((e,r)=>e.map(e=>`<circle cx="${F(c(i(e)))}" cy="${t+14+r*12}" r="3.2" fill="${n[r]}" fill-opacity="0.75" />`).join(``)).join(``)}
    <line x1="36" y1="${t+50}" x2="326" y2="${t+50}" stroke="${N}" />
    ${s.map(e=>`<text x="${F(c(e))}" y="${t+64}" text-anchor="middle" font-size="12.4" fill="${N}">${e}</text>`).join(``)}`};return q(`${J(340,396,`3品種の豆の長さと幅の散布図。長さだけでは品種が重なるが、細長さの向きの軸に射影すると3品種がよく分かれる`)}
    <defs><marker id="cdaArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${M}" /></marker></defs>
    ${[5,6,7].map(e=>`<line x1="${i.x}" y1="${F(o(e))}" x2="${i.x+i.w}" y2="${F(o(e))}" stroke="#e2e8f0" /><text x="${i.x-5}" y="${F(o(e)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${e}</text>`).join(``)}
    ${s}${d}
    <text x="${F(H(i,12.3))}" y="${F(o(5.25))}" font-size="12.4" font-weight="700" fill="${M}" stroke="#fff" stroke-width="3" paint-order="stroke">正準軸の向き</text>
    ${W(i,[8,10,12,14])}
    <text x="4" y="13" font-size="12.4" fill="${N}">幅（mm）</text>
    <text x="${i.x+i.w}" y="${i.y+i.h+30}" text-anchor="end" font-size="12.4" fill="${N}">長さ（mm）</text>
    ${r.map((e,t)=>`<circle cx="${i.x+10+t*70}" cy="${i.y+6}" r="4" fill="${n[t]}" /><text x="${i.x+18+t*70}" y="${i.y+10}" font-size="12.4" fill="${n[t]}">${e}</text>`).join(``)}
    ${f(236,`長さだけで並べる`,e=>e[0],8,14,[8,10,12,14])}
    ${f(326,`正準得点 0.60×長さ − 0.80×幅`,e=>t[0]*e[0]+t[1]*e[1],.8,2.8,[1,1.5,2,2.5])}
  </svg>`,`品種ごとに15粒の模擬データです。長さと幅は、どの品種の中でも一緒に増える（大きい豆はどちらも大きい）ので、長さだけで並べると品種が大きく重なります。大きさの違いを打ち消す「細長さ」の向きに並べ直すと、重なりが減ります。`)}function en(){let e=[11,12,13,14,15,16,60],t=[17,18,19,20,21,22,23],n=[...e,...t].sort((e,t)=>e-t),r=e=>n.indexOf(e)+1,i=e=>e>=50?322:34+(e-10)/14*240,a=(e,t,n,a,o)=>`
    <rect x="10" y="${t-46}" width="${o}" height="19" fill="#ffffff" />
    <text x="14" y="${t-32}" font-size="12.8" font-weight="700" fill="${n}">${a}</text>
    ${e.map(e=>`<text x="${F(i(e))}" y="${t-10}" text-anchor="middle" font-size="12.4" fill="${P}">${r(e)}</text>
    <circle cx="${F(i(e))}" cy="${t}" r="5.5" fill="${n}" />
    <line x1="${F(i(e))}" y1="${t+6}" x2="${F(i(e))}" y2="166" stroke="${n}" stroke-width="0.8" stroke-dasharray="2 3" />`).join(``)}`,o=[10,15,20].map(e=>`<line x1="${F(i(e))}" y1="166" x2="${F(i(e))}" y2="171" stroke="${N}" /><text x="${F(i(e))}" y="185" text-anchor="middle" font-size="12.4" fill="${N}">${e}</text>`).join(``);return q(`${J(350,246,`順位和検定：14人の作業時間を小さい順に並べ、A の順位は1から6と14、B の順位は7から13`)}
    ${a(e,74,k,`A 新しい手順（数字＝順位）`,190)}
    ${a(t,136,`#b45309`,`B 今の手順`,80)}
    <line x1="24" y1="166" x2="296" y2="166" stroke="${N}" stroke-width="1.2" />
    <line x1="304" y1="166" x2="336" y2="166" stroke="${N}" stroke-width="1.2" />
    <line x1="294" y1="172" x2="300" y2="160" stroke="${N}" stroke-width="1.2" />
    <line x1="302" y1="172" x2="308" y2="160" stroke="${N}" stroke-width="1.2" />
    ${o}
    <line x1="322" y1="166" x2="322" y2="171" stroke="${N}" /><text x="322" y="185" text-anchor="middle" font-size="12.4" fill="${N}">60</text>
    <text x="${350/2}" y="203" text-anchor="middle" font-size="12.4" fill="${N}">作業時間（分）</text>
    <text x="14" y="238" font-size="12.8" font-weight="700" fill="${k}">A の順位の和＝1+2+3+4+5+6+14＝35</text>
  </svg>`,`2つのグループの14人を合わせて、作業時間の短い順に順位を付けました。A は7人中6人が B の全員より短く、60分の1人だけが最後の14位です。この人が25分でも60分でも、順位は14のまま変わりません。`)}function tn(){let e=e=>44+(63-e)/18*132,t=`#b45309`,n=(n,r,i,a,o,s)=>{let c=(t,i)=>`<line x1="${n}" y1="${F(e(t[0]))}" x2="${r}" y2="${F(e(t[1]))}" stroke="${i}" stroke-width="2.4" />
      <circle cx="${n}" cy="${F(e(t[0]))}" r="4.5" fill="${i}" /><circle cx="${r}" cy="${F(e(t[1]))}" r="4.5" fill="${i}" />`,l=(t,n,r,i)=>s?`<text x="${t}" y="${F(e(n)+(i?19:-10))}" text-anchor="middle" font-size="12.4" fill="${r}">${n}</text>`:``,u=(n+r)/2;return`<rect x="${n-26}" y="38" width="${r-n+52}" height="144" fill="none" stroke="${N}" stroke-width="0.8" />
      ${c(i,t)}${c(a,k)}
      ${l(n,i[0],t,!0)}${l(n,a[0],k,!1)}${l(r,i[1],t,!1)}${l(r,a[1],k,!0)}
      <text x="${u}" y="30" text-anchor="middle" font-size="12.8" font-weight="700" fill="${P}">${o}</text>
      <text x="${n}" y="200" text-anchor="middle" font-size="12.4" fill="${N}">オフィス街</text>
      <text x="${r}" y="200" text-anchor="middle" font-size="12.4" fill="${N}">住宅街</text>`};return q(`${J(350,236,`交互作用プロット：この例では煮玉子とチャーシューの線が交わり、交互作用が無いときは2本が平行になる`)}
    ${n(44,132,[50,54],[60,52],`この例：線が交わる`,!0)}
    ${n(222,310,[50,48],[60,58],`交互作用が無いとき`,!1)}
    <line x1="70" y1="224" x2="92" y2="224" stroke="${k}" stroke-width="2.4" />
    <text x="98" y="228" font-size="12.8" font-weight="700" fill="${k}">チャーシュー</text>
    <line x1="200" y1="224" x2="222" y2="224" stroke="${t}" stroke-width="2.4" />
    <text x="228" y="228" font-size="12.8" font-weight="700" fill="${t}">煮玉子</text>
  </svg>`,`縦は各組み合わせ3日分の平均売上（万円）です。左の実際の例では、オフィス街ではチャーシューが10万円高く、住宅街では煮玉子が2万円高くなり、線が交わります。右のように2本が平行なら、トッピングの差はどちらの立地でも同じで、交互作用はありません。`)}function nn(){let e={x:14,y:34,w:316,h:150,xMin:-.5,xMax:13.5,yMax:.22},t=xe(0,13),n=1,r=t.map(e=>(e>0&&(n*=e),Math.exp(-4)*4**e/n)),i=1-r.slice(0,9).reduce((e,t)=>e+t,0);return q(`${J(340,226,`平均4のポアソン分布。4件前後が最も出やすく、9件以上の棒を足すと約0.021で、これがP値`)}
    ${W(e,[0,2,4,6,8,10,12])}
    ${be(e,t.slice(0,9),r.slice(0,9),k,.3)}${be(e,t.slice(9),r.slice(9),M,.3)}
    <line x1="${F(H(e,8.5))}" y1="${e.y+20}" x2="${F(H(e,8.5))}" y2="${e.y+e.h}" stroke="${M}" stroke-width="1.4" stroke-dasharray="4 3" />
    <text x="${F(H(e,11))}" y="${F(U(e,.075))}" text-anchor="middle" font-size="12.4" fill="${M}">9件以上の合計</text>
    <text x="${F(H(e,11))}" y="${F(U(e,.075)+16)}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${M}">P値 ＝ ${i.toFixed(3)}</text>
    <text x="${F(H(e,4))}" y="${e.y-10}" text-anchor="middle" font-size="12.4" fill="${k}">平均 λ ＝ 4 件</text>
    <text x="${e.x+e.w/2}" y="222" text-anchor="middle" font-size="12.4" fill="${N}">横軸 1年の事故の件数／高さ ＝ 確率（H₀: λ ＝ 4）</text>
  </svg>`,`年平均4件が正しいとしたときの、1年の事故の件数の分布です。今年の9件以上になる赤い棒をすべて足した約${(i*100).toFixed(1)}%が P値です。左右対称でなく、右に裾を引いている形にも注目します。`)}function rn(){let e={x:30,y:24,w:304,h:150,xMin:0,xMax:1,yMax:1.08},t=(e,t)=>n=>Math.exp(t*Math.log(n)+(e-t)*Math.log(1-n)-(t*Math.log(t/e)+(e-t)*Math.log(1-t/e)));return q(`${J(350,220,`尤度関数：10回中7回表なら p=0.7 で最大、100回中70回なら同じ場所でずっと鋭い山になる`)}
    ${W(e,[0,.2,.4,.6,.8,1])}
    ${K(e,t(10,7),.001,.999,k,.12)}
    ${G(e,t(10,7),k,.001,.999)}
    ${G(e,t(100,70),A,.001,.999)}
    <line x1="${F(H(e,.7))}" y1="${e.y}" x2="${F(H(e,.7))}" y2="${e.y+e.h}" stroke="${M}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${F(H(e,.7)+4)}" y="${e.y+10}" font-size="12.4" fill="${M}">p̂ = 0.7</text>
    <text x="${F(H(e,.3))}" y="${F(U(e,.62))}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${k}">10回中7回</text>
    <text x="${F(H(e,.655))}" y="${F(U(e,.95))}" text-anchor="end" font-size="13.2" font-weight="700" fill="#b45309">100回中70回</text>
    <text x="${e.x+e.w/2}" y="216" text-anchor="middle" font-size="12.4" fill="${N}">横軸＝表の確率 p の候補／縦軸＝尤度（最大を1にそろえた）</text>
  </svg>`,`10回中7回表なら、山の頂上の p = 0.7 が最尤推定値です。同じ7割でも100回中70回なら、頂上は同じ位置のまま山が鋭くなり、p の候補を狭く絞り込めます。`)}function an(){let e=[{t:`母集団（母数 θ は未知）`,e:`表の確率 p`,c:N},{t:`標本 X₁, …, Xₙ`,e:`10回投げた結果`,c:j},{t:`推定量 θ̂ ＝ データの関数`,e:`表の割合 X̄`,c:k},{t:`推定値（1つの数）`,e:`0.7`,c:M}];return q(`${J(344,250,`母集団から標本をとり、推定量という関数に入れて、推定値という1つの数を得る流れ。右はコインの例`)}
    <text x="112" y="16" text-anchor="middle" font-size="12.4" font-weight="700" fill="${N}">一般</text>
    <text x="278" y="16" text-anchor="middle" font-size="12.4" font-weight="700" fill="${N}">コインの例</text>
    ${e.map(({t:e,e:t,c:n},r)=>{let i=28+r*56;return`<rect x="12" y="${i}" width="200" height="36" rx="6" fill="${n}" fill-opacity="0.1" stroke="${n}" stroke-width="1.4" />
        <text x="112" y="${i+36/2+5}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${n===N?P:n}">${e}</text>
        <text x="278" y="${i+36/2+5}" text-anchor="middle" font-size="12.4" fill="${P}">${t}</text>
        ${r<3?`<line x1="112" y1="${i+36+2}" x2="112" y2="${i+36+20-4}" stroke="${N}" stroke-width="1.4" />
        <polygon points="108,${i+36+20-8} 116,${i+36+20-8} 112,${i+36+20-2}" fill="${N}" />`:``}`}).join(``)}
  </svg>`,`推定量はデータを入れると数が出てくる関数で、出てきた1つの数が推定値です。標本が変われば推定値も変わります。`)}function on(){let e={x:40,y:30,w:290,h:110,xMin:.2,xMax:1,yMax:1.1},t={x:40,y:212,w:290,h:100,xMin:.2,xMax:1,yMin:-6,yMax:.6},n=e=>7*Math.log(e/.7)+3*Math.log((1-e)/.3),r=e=>t.x+(e-t.xMin)/(t.xMax-t.xMin)*t.w,i=e=>t.y+t.h-(e-t.yMin)/(t.yMax-t.yMin)*t.h,a=[];for(let e=0;e<=120;e++){let t=.2+.78*e/120;a.push(`${F(r(t))},${F(i(n(t)))}`)}let o=[.2,.4,.6,.8,1];return q(`${J(344,350,`10回中7回表のときの尤度（上）と対数尤度（下）。どちらも p=0.7 で最大になり、頂上では傾きが0`)}
    <text x="${e.x}" y="${e.y-12}" font-size="13.2" font-weight="700" fill="${k}">尤度 L(p)（最大を1にそろえた）</text>
    ${K(e,e=>Math.exp(n(e)),.2,.999,k,.12)}${G(e,e=>Math.exp(n(e)),k,.2,.999)}
    ${W(e,o)}
    <text x="${t.x}" y="${t.y-12}" font-size="13.2" font-weight="700" fill="${j}">対数尤度 ℓ(p) ＝ log L(p)</text>
    <polyline points="${a.join(` `)}" fill="none" stroke="${j}" stroke-width="2" />
    <line x1="${F(r(.58))}" y1="${F(i(0))}" x2="${F(r(.82))}" y2="${F(i(0))}" stroke="${P}" stroke-width="1.6" />
    <text x="${F(r(.84))}" y="${F(i(0)+4)}" font-size="12.4" fill="${P}">傾き 0</text>
    <line x1="${t.x}" y1="${t.y+t.h}" x2="${t.x+t.w}" y2="${t.y+t.h}" stroke="${N}" />
    ${o.map(e=>`<text x="${F(r(e))}" y="${t.y+t.h+14}" text-anchor="middle" font-size="12.4" fill="${N}">${e}</text>`).join(``)}
    <line x1="${F(H(e,.7))}" y1="${e.y}" x2="${F(r(.7))}" y2="${t.y+t.h}" stroke="${M}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${F(H(e,.7)+4)}" y="${e.y+8}" font-size="12.4" fill="${M}">p̂ = 0.7</text>
    <text x="${344/2}" y="346" text-anchor="middle" font-size="12.4" fill="${N}">横軸＝表の確率 p の候補</text>
  </svg>`,`対数をとると山の形は変わりますが、頂上の位置は p = 0.7 のままです。頂上では傾きが0なので、対数尤度を微分して0とおけば頂上が求まります。`)}function sn(){let e={x:10,y:40,w:150,h:130,xMin:0,xMax:2,yMax:1.1},t={x:186,y:40,w:150,h:130,xMin:-6,xMax:6,yMax:1.1},n=[.12,.35,.51,.64,.83],r=Math.max(...n),i=e=>e<r?0:(r/e)**n.length,a=[-3.3,-2.1,2.3,2.9],o=e=>-a.reduce((t,n)=>t+Math.log(1+(n-e)**2),0),s=Array.from({length:1201},(e,t)=>-6+12*t/1200),c=Math.max(...s.map(o)),l=e=>Math.exp(o(e)-c),u=s.filter((e,t)=>t>0&&t<s.length-1&&o(e)>o(s[t-1])&&o(e)>=o(s[t+1])),d=`${J(344,250,`左：一様分布の尤度は最大の観測値で跳び、そこが最大。右：データが2か所に分かれると尤度の山が2つできる`)}
    <text x="${e.x+e.w/2}" y="${e.y-22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">一様分布 U(0, θ)</text>
    <text x="${t.x+t.w/2}" y="${t.y-22}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">山が2つある尤度</text>
    <line x1="${F(H(e,0))}" y1="${F(U(e,0))}" x2="${F(H(e,r))}" y2="${F(U(e,0))}" stroke="${k}" stroke-width="2.4" />
    ${G(e,i,k,r,2,2.4)}
    <line x1="${F(H(e,r))}" y1="${F(U(e,0))}" x2="${F(H(e,r))}" y2="${F(U(e,1))}" stroke="${k}" stroke-width="1" stroke-dasharray="2 2" />
    <circle cx="${F(H(e,r))}" cy="${F(U(e,1))}" r="4" fill="${M}" />
    <text x="${F(H(e,r)+6)}" y="${F(U(e,1)+12)}" font-size="12.4" font-weight="700" fill="${M}">最大値 ${r}</text>
    ${n.map(t=>`<circle cx="${F(H(e,t))}" cy="${F(U(e,0)-6)}" r="2.6" fill="${j}" />`).join(``)}
    ${W(e,[0,1,2])}
    ${G(t,l,k,-6,6,2.2)}
    ${a.map(e=>`<circle cx="${F(H(t,e))}" cy="${F(U(t,0)-6)}" r="2.6" fill="${j}" />`).join(``)}
    ${u.map(e=>`<circle cx="${F(H(t,e))}" cy="${F(U(t,l(e)))}" r="3.6" fill="${l(e)>.999?M:A}" />`).join(``)}
    ${W(t,[-4,0,4])}
    <text x="${344/2}" y="228" text-anchor="middle" font-size="12.4" fill="${N}">緑の点＝観測値　縦軸＝尤度（最大を1にそろえた）</text>
    <text x="${344/2}" y="245" text-anchor="middle" font-size="12.4" fill="${N}">右はコーシー分布の位置 θ の尤度</text>
  </svg>`,f=u.find(e=>l(e)<.999);return q(d,`左は最大値 ${r} で跳ぶ尤度で、傾きが0になる点がありません。右は頂上 θ ≈ ${F(u.find(e=>l(e)>.999)??0)} のほかに、θ ≈ ${F(f??0)} にも山があります。`)}function cn(){let e={x:14,y:30,w:316,h:160,xMin:.4,xMax:1.6,yMax:10.5},t=e=>Math.exp(z(e+1)),n=e=>{if(e<=0||e>=10)return 0;let n=0;for(let t=0;t<=Math.floor(e);t++)n+=(-1)**t*fe(10,t)*(e-t)**9;return n/t(9)},r=e=>5*n(5*e),i=e=>e<=0||e>1?0:10*e**9,a=2*Math.sqrt(1/12/10),o=10/11,s=Math.sqrt(.006887052341597796+(o-1)**2);return q(`${J(344,250,`一様分布 U(0,1) から10個とったときの、モーメント推定量 2X̄ と最尤推定量（最大値）の分布。最尤推定量は1の少し手前に鋭く集まり、モーメント推定量は広く散らばる`)}
    <line x1="${F(H(e,1))}" y1="${e.y-4}" x2="${F(H(e,1))}" y2="${e.y+e.h}" stroke="${M}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${F(H(e,1)+4)}" y="${e.y+6}" font-size="12.4" fill="${M}">真の θ = 1</text>
    ${K(e,r,.4,1.6,A,.25)}${G(e,r,A,.4,1.6,2)}
    ${K(e,i,.4,1,k,.2)}${G(e,i,k,.4,1,2.2)}
    <line x1="${F(H(e,1))}" y1="${F(U(e,10))}" x2="${F(H(e,1))}" y2="${F(U(e,0))}" stroke="${k}" stroke-width="2.2" />
    ${W(e,[.4,.6,.8,1,1.2,1.4,1.6])}
    <text x="${F(H(e,.88))}" y="${F(U(e,6.5))}" text-anchor="end" font-size="12.4" font-weight="700" fill="${k}">最尤：最大値</text>
    <text x="${F(H(e,1.22))}" y="${F(U(e,2.3))}" font-size="12.4" font-weight="700" fill="#b45309">モーメント：2X̄</text>
    <text x="${e.x+e.w/2}" y="228" text-anchor="middle" font-size="12.4" fill="${N}">横軸＝推定値／縦軸＝密度</text>
    <text x="${e.x+e.w/2}" y="245" text-anchor="middle" font-size="12.4" fill="${N}">U(0, 1) から10個とった場合</text>
  </svg>`,`同じ10個のデータでも、2X̄ は標準偏差 ${I(a)} で広く散らばり、最大値は1の少し手前（平均 ${I(o)}）に鋭く集まります。真の値からのずれの大きさ（二乗誤差の平方根）は、最尤 ${I(s)}、モーメント ${I(a)} です。`)}function ln(){let e=Xe(Y(1515)),t=[{bx:0,by:0,sd:.12,t:`偏りなし・ばらつき小`,s:`不偏で有効`},{bx:0,by:0,sd:.34,t:`偏りなし・ばらつき大`,s:`不偏だが有効でない`},{bx:.42,by:-.3,sd:.12,t:`偏りあり・ばらつき小`,s:`精度は高いが的外れ`},{bx:.42,by:-.3,sd:.34,t:`偏りあり・ばらつき大`,s:`最悪`}].map((t,n)=>{let r=92+n%2*170,i=92+Math.floor(n/2)*150,a=Array.from({length:12},()=>[t.bx+t.sd*e(),t.by+t.sd*e()]),o=a.reduce((e,t)=>e+t[0],0)/12,s=a.reduce((e,t)=>e+t[1],0)/12;return`${[1,.66,.33].map(e=>`<circle cx="${r}" cy="${i}" r="${F(56*e)}" fill="none" stroke="#cbd5e1" />`).join(``)}
      <circle cx="${r}" cy="${i}" r="2.5" fill="${M}" />
      ${a.map(([e,t])=>`<circle cx="${F(r+e*56)}" cy="${F(i-t*56)}" r="2.6" fill="${k}" />`).join(``)}
      <path d="M${F(r+o*56-5)},${F(i-s*56)} h10 M${F(r+o*56)},${F(i-s*56-5)} v10" stroke="${A}" stroke-width="2" />
      <text x="${r}" y="${i+56+16}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">${t.t}</text>
      <text x="${r}" y="${i+56+30}" text-anchor="middle" font-size="12.4" fill="${N}">${t.s}</text>`}).join(``);return q(`${J(350,330,`ダーツのたとえ：偏りの有無とばらつきの大小の4通り`)}${t}</svg>`,`赤い点が真の値、青い点が1回分のデータから計算した推定値、橙の十字が推定値の平均です。上の段は平均が中心に来ていて（不偏）、左の列はばらつきが小さい（有効）推定量です。`)}function un(){let e={x:14,y:40,w:316,h:150,xMin:0,xMax:3.5,yMax:1.05},t=e=>e<=0?0:Math.exp((4/2-1)*Math.log(e)-e/2-4/2*Math.log(2)-z(4/2)),n=e=>4*t(4*e),r=e=>5*t(5*e),i=4/5;return q(`${J(344,250,`正規分布から5個とったときの、不偏分散 S² と n で割った分散の分布。S² の平均は真の値1、n で割った方は0.8で、少し左にずれるが幅は狭い`)}
    <line x1="${F(H(e,1))}" y1="${e.y-4}" x2="${F(H(e,1))}" y2="${e.y+e.h}" stroke="${M}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${F(H(e,1)+4)}" y="${e.y+4}" font-size="12.4" fill="${M}">真の σ² = 1</text>
    ${G(e,n,k,.001,3.5,2.2)}${G(e,r,A,.001,3.5,2.2)}
    ${[{m:1,c:k},{m:i,c:A}].map(({m:t,c:n})=>`<line x1="${F(H(e,t))}" y1="${F(U(e,0))}" x2="${F(H(e,t))}" y2="${F(U(e,0)+8)}" stroke="${n}" stroke-width="3" />`).join(``)}
    ${W(e,[0,.5,1,1.5,2,2.5,3])}
    <text x="2" y="14" font-size="12.4" font-weight="700" fill="#b45309">n で割る（平均 ${I(i)}）</text>
    <text x="342" y="14" text-anchor="end" font-size="12.4" font-weight="700" fill="${k}">S²：n−1 で割る（平均 1）</text>
    <text x="${e.x+e.w/2}" y="228" text-anchor="middle" font-size="12.4" fill="${N}">横軸＝推定値／軸の下の短い線＝分布の平均</text>
    <text x="${e.x+e.w/2}" y="245" text-anchor="middle" font-size="12.4" fill="${N}">正規分布から5個とった場合</text>
  </svg>`,`S² は平均がちょうど1（不偏）ですが広く散らばり、n で割った方は平均 ${I(i)} と小さめで、幅は狭くなります。どちらが真の値に近いかは、下の平均二乗誤差で比べます。`)}function dn(){let e={x:10,y:44,w:150,h:150,xMin:-3,xMax:3,yMax:1.9},t={x:186,y:44,w:150,h:150,xMin:-3,xMax:3,yMax:1.9},n=[{n:1,c:N},{n:4,c:j},{n:16,c:k}],r=(e,t,n,r)=>`<text x="${F(e.x+e.w-2)}" y="${e.y+14+r*15}" text-anchor="end" font-size="12.4" font-weight="700" fill="${n}">n = ${t}</text>`;return q(`${J(344,262,`左：標本平均は n を増やすと真の値0に集まる（一致）。右：最初の1個だけを使う推定量は n を増やしても広がったまま（不偏だが一致しない）`)}
    <text x="${e.x+e.w/2}" y="${e.y-24}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">標本平均 X̄</text>
    <text x="${t.x+t.w/2}" y="${t.y-24}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">最初の1個 X₁</text>
    ${n.map(({n:t,c:n})=>G(e,e=>B(e,0,1/Math.sqrt(t)),n,-3,3,2)).join(``)}
    ${n.map(({n:t,c:n},i)=>r(e,t,n,i)).join(``)}
    ${G(t,e=>B(e),N,-3,3,2)}
    ${n.map(({n:e,c:n},i)=>r(t,e,n,i)).join(``)}
    <text x="${F(H(t,0))}" y="${F(U(t,.75))}" text-anchor="middle" font-size="12.4" fill="${N}">3本とも同じ</text>
    ${W(e,[-2,0,2])}${W(t,[-2,0,2])}
    <text x="${344/2}" y="240" text-anchor="middle" font-size="12.4" fill="${N}">N(0, 1) から n 個とったときの推定値の分布</text>
    <text x="${344/2}" y="257" text-anchor="middle" font-size="12.4" fill="${N}">真の値＝0</text>
  </svg>`,`どちらも平均は真の値0で不偏です。X̄ は n を4倍にするたびに幅が半分になり0に集まります（一致）が、X₁ は何個データを集めても1個しか使わないので広がったままです。`)}function fn(){let e={x:14,y:30,w:316,h:150,xMin:-1,xMax:1,yMax:2.2},t=1/5,n=Math.sqrt(Math.PI/50),r=e=>2*V(-.2/e);return q(`${J(344,236,`正規分布から25個とったときの標本平均と標本中央値の分布。どちらも中心は真の値0だが、中央値の方が広い`)}
    ${G(e,e=>B(e,0,n),A,-1,1,2.2)}
    ${G(e,e=>B(e,0,t),k,-1,1,2.2)}
    ${W(e,[-1,-.5,0,.5,1])}
    <text x="2" y="14" font-size="12.4" font-weight="700" fill="${k}">平均 X̄（分散 σ²/n）</text>
    <text x="342" y="14" text-anchor="end" font-size="12.4" font-weight="700" fill="#b45309">中央値（分散 約1.57倍）</text>
    <text x="${e.x+e.w/2}" y="214" text-anchor="middle" font-size="12.4" fill="${N}">横軸＝推定値（真の値 0）</text>
    <text x="${e.x+e.w/2}" y="231" text-anchor="middle" font-size="12.4" fill="${N}">N(0, 1) から25個（中央値は近似）</text>
  </svg>`,`どちらも不偏ですが、中央値の分散は平均の約1.57倍です。真の値から0.2以上ずれる確率は、平均が ${L(r(t))}、中央値が ${L(r(n))} です。`)}function pn(){let e=(e,t,n,r,i,a,o)=>`<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="10" fill="${i}" fill-opacity="0.08" stroke="${i}" stroke-width="1.5" />
    <text x="${e+10}" y="${t+18}" font-size="13.2" font-weight="700" fill="${i===N?P:i}">${a}</text>
    ${o?`<text x="${e+10}" y="${t+34}" font-size="12.4" fill="${N}">${o}</text>`:``}`;return q(`${J(344,250,`すべての推定量の中に不偏推定量があり、その中に線形不偏推定量がある。ガウス・マルコフの定理は線形不偏の中で最小分散、正規誤差ならすべての不偏の中で最小分散`)}
    ${e(6,6,332,238,N,`すべての推定量`,`偏りがあるもの（リッジ回帰など）も含む`)}
    ${e(22,50,300,184,j,`不偏推定量`,`正規誤差なら OLS がこの中で最小分散`)}
    ${e(38,98,268,126,k,`線形不偏推定量`,`y の1次式で、不偏なもの`)}
    <circle cx="172" cy="182" r="22" fill="${M}" fill-opacity="0.15" stroke="${M}" stroke-width="1.6" />
    <text x="172" y="187" text-anchor="middle" font-size="13.2" font-weight="700" fill="${M}">OLS</text>
    <text x="204" y="178" font-size="12.4" fill="${M}">← この中で</text>
    <text x="204" y="194" font-size="12.4" fill="${M}">分散が最小</text>
  </svg>`,`ガウス・マルコフの定理が言えるのは、藍の枠（線形不偏推定量）の中で OLS の分散が最小ということです。誤差が正規分布なら、緑の枠（すべての不偏推定量）の中でも最小になります。`)}function mn(){let e={x:14,y:30,w:322,h:140,xMin:-4,xMax:4,yMax:.44},t=2.19,n=2*(1-V(t));return q(`${J(350,220,`P値は帰無仮説のもとでの分布で、観測値より極端な側の面積`)}
    ${K(e,B,-4,-t,M,.45)}${K(e,B,t,4,M,.45)}
    ${K(e,B,-1.96,1.96,k,.08)}
    ${G(e,B,k)}
    ${W(e,[-4,-3,-2,-1,0,1,2,3,4])}
    <line x1="${F(H(e,t))}" y1="${e.y+6}" x2="${F(H(e,t))}" y2="${e.y+e.h}" stroke="${M}" stroke-width="1.6" />
    <text x="${F(H(e,t)+4)}" y="${e.y+16}" font-size="13.2" font-weight="700" fill="${M}">観測値 ${t}</text>
    <line x1="${F(H(e,-t))}" y1="${e.y+40}" x2="${F(H(e,-t))}" y2="${e.y+e.h}" stroke="${M}" stroke-width="1" stroke-dasharray="3 2" />
    <text x="${F(H(e,3.1))}" y="${F(U(e,.06))}" text-anchor="middle" font-size="12.4" fill="${M}">${(1-V(t)).toFixed(3)}</text>
    <text x="${F(H(e,-3.1))}" y="${F(U(e,.06))}" text-anchor="middle" font-size="12.4" fill="${M}">${(1-V(t)).toFixed(3)}</text>
    <text x="${F(H(e,0))}" y="${F(U(e,.15))}" text-anchor="middle" font-size="12.4" fill="${k}">「差がない」なら</text>
    <text x="${F(H(e,0))}" y="${F(U(e,.15)+16)}" text-anchor="middle" font-size="12.4" fill="${k}">普通に出る範囲</text>
    <text x="${350/2}" y="16" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">P値 ＝ 赤い面積の合計 ＝ ${I(n)}</text>
    <text x="${e.x+e.w/2}" y="216" text-anchor="middle" font-size="12.4" fill="${N}">帰無仮説（差がない）のもとでの検定統計量の分布</text>
  </svg>`,`曲線は、本当に差がないと仮定したときに検定統計量がとる値の分布です。赤い面積は観測値 ${t} より外側（左右とも）で、合わせて ${I(n)} です。`)}function hn(){let e=Object.entries({煮玉子:[52,48,55,51,49],チャーシュー:[58,61,57,60,59],メンマ:[50,52,48,51,49]}).map(([e,t])=>{let n=t.reduce((e,t)=>e+t,0)/t.length;return[e,[...t,...t.map(e=>2*n-e)]]}),t=e.flatMap(([,e])=>e),n=t.reduce((e,t)=>e+t,0)/t.length,r=e.map(([,e])=>e.reduce((e,t)=>e+t,0)/e.length),i=e.reduce((e,[,t],i)=>e+t.length*(r[i]-n)**2,0),a=e.reduce((e,[,t],n)=>e+t.reduce((e,t)=>e+(t-r[n])**2,0),0),o=e.length,s=t.length,c=i/(o-1)/(a/(s-o)),l={x:40,y:24,w:296,h:170,xMin:0,xMax:3,yMax:1},u=e=>l.y+l.h-(e-44)/20*l.h,d=[A,M,j],f=e.map(([e,t],n)=>{let i=H(l,n+.5),a={};return`${t.map(e=>{let t=(a[e]=(a[e]||0)+1)-1;return`<circle cx="${F(i-12+t*7)}" cy="${F(u(e))}" r="3.2" fill="${d[n]}" fill-opacity="0.8" />`}).join(``)}
      <line x1="${F(i-34)}" y1="${F(u(r[n]))}" x2="${F(i+34)}" y2="${F(u(r[n]))}" stroke="${d[n]}" stroke-width="2.4" />
      <text x="${F(i)}" y="${l.y+l.h+16}" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">${e}</text>
      <text x="${F(i+36)}" y="${F(u(r[n])+4)}" font-size="12.4" fill="${d[n]}">${r[n]}</text>`}).join(``);return q(`${J(350,250,`3つのトッピングの日ごとの売上：群の平均どうしの離れ方（群間）と、群の中の散らばり（群内）`)}
    ${[45,50,55,60].map(e=>`<text x="${l.x-6}" y="${F(u(e)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${e}</text><line x1="${l.x}" y1="${F(u(e))}" x2="${l.x+l.w}" y2="${F(u(e))}" stroke="#f1f5f9" />`).join(``)}
    <line x1="${l.x}" y1="${F(u(n))}" x2="${l.x+l.w}" y2="${F(u(n))}" stroke="${N}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${l.x+2}" y="${F(u(n)-4)}" font-size="12.4" fill="${N}">全体平均 ${F(n)}</text>
    ${f}
    <text x="${350/2}" y="244" text-anchor="middle" font-size="12.4" fill="${N}">点＝1日の売上（万円）・太線＝そのトッピングの平均</text>
  </svg>`,`点は1日ごとの売上、太線は各トッピングの平均です。<strong>群間変動</strong>は太線が全体平均（点線）からどれだけ離れているか、<strong>群内変動</strong>は同じ色の点が太線のまわりにどれだけ散らばっているかです。この10日ずつのデータで計算すると、群間平方和 ${F(i)}、群内平方和 ${F(a)}、F = (${F(i)} ÷ ${o-1}) ÷ (${F(a)} ÷ ${s-o}) ≈ ${F(c)} です。チャーシューの太線だけが群内の散らばりよりはるかに大きく離れているので、F が大きくなります。`)}function gn(){let e=[[`A`,1,1],[`B`,1.5,1.4],[`C`,1.2,2.2],[`D`,5,5],[`E`,5.6,4.6],[`F`,5.2,6.2]],t=e.map((e,t)=>({ids:[t],h:0})),n=(t,n)=>Math.hypot(e[t][1]-e[n][1],e[t][2]-e[n][2]),r=(e,t)=>{let r=0;return e.ids.forEach(e=>t.ids.forEach(t=>r+=n(e,t))),r/(e.ids.length*t.ids.length)},i=[];for(;t.length>1;){let e=[0,1],n=1/0;for(let i=0;i<t.length;i++)for(let a=i+1;a<t.length;a++){let o=r(t[i],t[a]);o<n&&(n=o,e=[i,a])}let[a,o]=e,s={ids:[...t[a].ids,...t[o].ids],h:n,l:t[a],r:t[o]};i.push(n),t=t.filter((e,t)=>t!==a&&t!==o).concat(s)}let a=t[0],o=[],s=e=>{e.l?(s(e.l),s(e.r)):o.push(e.ids[0])};s(a);let c={x:16,y:34,w:130,h:130,xMin:0,xMax:7,yMax:7},l={x:176,y:34,w:160,h:150},u=a.h*1.1,d=e=>l.y+l.h-e/u*l.h,f=t=>l.x+10+o.indexOf(t)*(l.w-20)/(e.length-1),p=e=>{if(!e.l)return e.x=f(e.ids[0]),``;let t=p(e.l),n=p(e.r);return e.x=(e.l.x+e.r.x)/2,t+n+`<path d="M${F(e.l.x)},${F(d(e.l.h))} V${F(d(e.h))} H${F(e.r.x)} V${F(d(e.r.h))}" fill="none" stroke="${k}" stroke-width="1.6" />`},m=p(a),h=(a.h+a.l.h+0)/2>Math.max(a.l.h,a.r.h)?(a.h+Math.max(a.l.h,a.r.h))/2:a.h*.6;return q(`${J(350,250,`6人の顧客の散布図と、近い順に併合していくデンドログラム`)}
    <text x="${c.x}" y="${c.y-12}" font-size="13.2" font-weight="700" fill="${P}">顧客の位置（2つの指標）</text>
    <rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" fill="none" stroke="#e2e8f0" />
    ${e.map(([e,t,n],r)=>`<circle cx="${F(H(c,t))}" cy="${F(c.y+c.h-n/7*c.h)}" r="4" fill="${r<3?A:j}" /><text x="${F(H(c,t)+7)}" y="${F(c.y+c.h-n/7*c.h+4)}" font-size="13.2" fill="${P}">${e}</text>`).join(``)}
    <text x="${l.x}" y="${l.y-12}" font-size="13.2" font-weight="700" fill="${P}">デンドログラム</text>
    ${m}
    <line x1="${l.x}" y1="${F(d(h))}" x2="${l.x+l.w}" y2="${F(d(h))}" stroke="${M}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${l.x+l.w}" y="${F(d(h)-4)}" text-anchor="end" font-size="12.4" fill="${M}">ここで切ると2群</text>
    ${e.map(([e],t)=>`<text x="${F(f(t))}" y="${l.y+l.h+14}" text-anchor="middle" font-size="13.2" fill="${P}">${e}</text>`).join(``)}
    <text x="${l.x-4}" y="${F(d(0)+4)}" text-anchor="end" font-size="12.4" fill="${N}">0</text>
    <text x="${l.x-4}" y="${F(d(a.h)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${F(a.h)}</text>
    <text x="${350/2}" y="244" text-anchor="middle" font-size="12.4" fill="${N}">縦軸＝併合したときの距離（群平均法）</text>
  </svg>`,`左の6人を、距離の近い組から順に1つずつまとめていった過程が右の樹形図です。最初に結ばれるのは距離 ${I([...i].sort((e,t)=>e-t)[0])} の2人で、低い位置の横線ほど似ている組です。A・B・C と D・E・F はそれぞれ距離 ${F(Math.max(a.l.h,a.r.h))} 以下でまとまりますが、2つの群どうしは距離 ${F(a.h)} になってようやく結ばれます。赤い点線の高さで切ると2つのクラスターに分かれます。切る高さを下げるほど、クラスターの数は増えます。`)}function _n(){let e=331.25,t=1.25,n=n=>e+t*n-181.25*Math.cos(2*Math.PI*n/12),r={x:40,y:24,w:296,h:150,xMin:0,xMax:35,yMax:1},i=e=>r.y+r.h-(e-0)/600*r.h,a=Array.from({length:36},(e,t)=>`${F(H(r,t))},${F(i(n(t)))}`).join(` `);return q(`${J(350,230,`アイスクリームの月次売上：夏に高く冬に低い季節性と、少しずつ伸びるトレンド`)}
    ${[100,300,500].map(e=>`<text x="${r.x-6}" y="${F(i(e)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${e}</text><line x1="${r.x}" y1="${F(i(e))}" x2="${r.x+r.w}" y2="${F(i(e))}" stroke="#f1f5f9" />`).join(``)}
    <polyline points="${a}" fill="none" stroke="${k}" stroke-width="2" />
    ${Array.from({length:36},(e,t)=>`<circle cx="${F(H(r,t))}" cy="${F(i(n(t)))}" r="2.2" fill="${k}" />`).join(``)}
    <line x1="${F(H(r,0))}" y1="${F(i(e))}" x2="${F(H(r,35))}" y2="${F(i(e+t*35))}" stroke="${A}" stroke-width="1.8" stroke-dasharray="5 3" />
    <text x="${F(H(r,35))}" y="${F(i(e+t*35)-6)}" text-anchor="end" font-size="12.4" fill="#b45309">トレンド</text>
    ${[0,12,24].map((e,t)=>`<text x="${F(H(r,e))}" y="${r.y+r.h+14}" text-anchor="middle" font-size="12.4" fill="${N}">${t+1}年目1月</text>`).join(``)}
    <text x="${F(H(r,6))}" y="${F(i(n(6))-8)}" text-anchor="middle" font-size="12.4" fill="${P}">7月 ${Math.round(n(6))}</text>
    <text x="${F(H(r,0)+4)}" y="${F(i(n(0))+16)}" font-size="12.4" fill="${P}">1月 ${Math.round(n(0))}</text>
    <text x="${r.x+r.w/2}" y="226" text-anchor="middle" font-size="12.4" fill="${N}">月次売上（万円）の3年分</text>
  </svg>`,`本文の数字（1月 ${Math.round(n(0))}万円・7月 ${Math.round(n(6))}万円・翌1月 ${Math.round(n(12))}万円）に合わせて3年分を描いたものです。12か月ごとに山と谷をくり返す波が<strong>季節性</strong>、波の中心が少しずつ上がっていく橙の点線が<strong>トレンド</strong>です。12か月前の値と今の値がよく似ているので、ラグ12の自己相関が高くなります。トレンドがある系列は平均が時間とともに変わるので、そのままでは定常ではありません。差分をとると、この右上がりが取り除かれます。`)}function vn(){let e=[...[[.8,!0],[1.2,!1],[1.5,!0],[2,!0],[2.4,!1],[3.1,!0],[3.5,!1],[4,!0],[4.6,!1],[5,!1]]].sort((e,t)=>e[0]-t[0]),t=1,n=e.length,r=[[0,1]],i=[],a=[];for(let[o,s]of e){if(s){let e=t;t*=1-1/n,r.push([o,t]),a.push(`${o}年 ${n}人中1人 → ${I(e)}×(1−1/${n}) = ${I(t)}`)}else i.push([o,t]);n--}let o={x:36,y:20,w:296,h:160,xMin:0,xMax:5.2,yMax:1.05},s=`M${F(H(o,0))},${F(U(o,1))}`;for(let e=1;e<r.length;e++)s+=` H${F(H(o,r[e][0]))} V${F(U(o,r[e][1]))}`;return s+=` H${F(H(o,5.2))}`,q(`${J(350,230,`カプラン・マイヤー曲線：死亡のたびに階段状に下がり、打ち切りは印だけで下がらない`)}
    ${W(o,[0,1,2,3,4,5])}
    ${[0,.5,1].map(e=>`<text x="${o.x-6}" y="${F(U(o,e)+4)}" text-anchor="end" font-size="12.4" fill="${N}">${e}</text>`).join(``)}
    <path d="${s}" fill="none" stroke="${k}" stroke-width="2.2" />
    ${i.map(([e,t])=>`<line x1="${F(H(o,e))}" y1="${F(U(o,t)-6)}" x2="${F(H(o,e))}" y2="${F(U(o,t)+6)}" stroke="${A}" stroke-width="2" />`).join(``)}
    <text x="${o.x+o.w}" y="${o.y+12}" text-anchor="end" font-size="12.4" fill="#b45309">｜＝打ち切り（その時点まで生存）</text>
    <text x="${o.x+o.w/2}" y="226" text-anchor="middle" font-size="12.4" fill="${N}">横軸＝追跡年数／縦軸＝推定した生存割合 Ŝ(t)</text>
  </svg>`,`10人を最長5年追跡した例です。死亡が起きた時点でだけ、そのときまだ観察中の人数（リスク集合）を分母にして曲線が下がります（${a.slice(0,2).join(`、`)} …）。橙の縦線は打ち切りで、その人は以後の分母から外れますが、曲線は下がりません。5年時点の推定生存割合は ${I(t)} です。打ち切りを「死亡」として数えると下がり過ぎ、「最初からいなかった」として除くと分母を誤ります。`)}function yn(){let e=Y(3606),t=Array.from({length:500},()=>[e(),e()]),n=t.filter(([e,t])=>e*e+t*t<=1).length,r=4*n/500,i=Array.from({length:61},(e,t)=>{let n=Math.PI/2*(t/60);return`${F(20+Math.cos(n)*190)},${F(210-Math.sin(n)*190)}`}).join(` `);return q(`${J(340,250,`正方形に500点を打ち、四分円の内側に入った割合から円周率を推定する`)}
    <rect x="20" y="20" width="190" height="190" fill="none" stroke="${N}" />
    <polyline points="${i}" fill="none" stroke="${P}" stroke-width="1.6" />
    ${t.map(([e,t])=>`<circle cx="${F(20+e*190)}" cy="${F(210-t*190)}" r="1.7" fill="${e*e+t*t<=1?k:A}" />`).join(``)}
    <text x="224" y="40" font-size="13.2" fill="${P}">点の数 500</text>
    <text x="224" y="60" font-size="13.2" fill="${k}">内側 ${n}</text>
    <text x="224" y="80" font-size="13.2" fill="#b45309">外側 ${500-n}</text>
    <text x="224" y="112" font-size="13.2" font-weight="700" fill="${P}">4 × ${n} ÷ 500</text>
    <text x="224" y="130" font-size="13.2" font-weight="700" fill="${P}">＝ ${r.toFixed(3)}</text>
    <text x="224" y="154" font-size="12.4" fill="${N}">（π ＝ 3.142）</text>
  </svg>`,`一辺1の正方形に 500 個の点を一様にばらまき、半径1の四分円の内側に落ちた点（青）を数えました。四分円の面積は π/4 なので、内側に落ちる割合の4倍が π の推定値になり、今回は 4 × ${n} ÷ 500 = ${r.toFixed(3)} です。点を増やすほど推定値は π に近づきますが、誤差は点の数の平方根に反比例してしか減りません（点を100倍にして誤差がようやく1/10）。`)}function bn(){let e={x:30,y:26,w:296,h:120,xMin:.5,xMax:6.5,yMax:.25},t=3.5,n=35/12;return q(`${J(340,200,`サイコロの目は1から6まで同じ確率1/6の離散一様分布`)}
    ${W(e,[1,2,3,4,5,6])}
    ${be(e,[1,2,3,4,5,6],[,,,,,,].fill(1/6),k,.4)}
    <text x="${e.x-4}" y="${F(U(e,1/6)+4)}" text-anchor="end" font-size="12.4" fill="${N}">1/6</text>
    <line x1="${F(H(e,t))}" y1="${e.y}" x2="${F(H(e,t))}" y2="${e.y+e.h}" stroke="${A}" stroke-width="1.6" stroke-dasharray="4 3" />
    <text x="${F(H(e,t))}" y="${e.y-8}" text-anchor="middle" font-size="13.2" font-weight="700" fill="#b45309">平均 3.5（どの目でもない）</text>
    <line x1="${F(H(e,t-Math.sqrt(n)))}" y1="${e.y+e.h+26}" x2="${F(H(e,t+Math.sqrt(n)))}" y2="${e.y+e.h+26}" stroke="${j}" stroke-width="2" />
    <text x="${F(H(e,t))}" y="${e.y+e.h+42}" text-anchor="middle" font-size="12.4" fill="${j}">平均 ± 標準偏差 √(35/12) ≈ ${I(Math.sqrt(n))}</text>
  </svg>`,`サイコロの目の分布です。棒の高さはどれも 1/6 で、山も谷もない平らな形が<strong>一様</strong>という名前の意味です。平均 (6+1)/2 = 3.5 は棒の真ん中の位置で、実際には出ない値です。分散は (6² − 1)/12 = 35/12 ≈ ${I(n)}、標準偏差は約 ${I(Math.sqrt(n))} で、緑の線の幅がそのおおよその広がりです。`)}function xn(){let e={x:22,y:36,w:120,h:130,xMin:-.5,xMax:1.5,yMax:1},t={x:186,y:36,w:150,h:130,xMin:0,xMax:1,yMax:.3},n=.3;return q(`${J(350,220,`ベルヌーイ分布は0と1の2本の棒。分散 p(1−p) は p=0.5 で最大の0.25`)}
    <text x="${e.x}" y="16" font-size="13.2" font-weight="700" fill="${P}">p = ${n} のとき</text>
    ${W(e,[0,1])}
    ${be(e,[0,1],[1-n,n],k,.45)}
    <text x="${F(H(e,0))}" y="${F(U(e,1-n)-6)}" text-anchor="middle" font-size="13.2" fill="${P}">${1-n}</text>
    <text x="${F(H(e,1))}" y="${F(U(e,n)-6)}" text-anchor="middle" font-size="13.2" fill="${P}">${n}</text>
    <text x="${F(H(e,0))}" y="${e.y+e.h+28}" text-anchor="middle" font-size="12.4" fill="${N}">失敗</text>
    <text x="${F(H(e,1))}" y="${e.y+e.h+28}" text-anchor="middle" font-size="12.4" fill="${N}">成功</text>
    <text x="${t.x}" y="16" font-size="13.2" font-weight="700" fill="${P}">分散 p(1−p) と p の関係</text>
    ${W(t,[0,.5,1])}
    ${G(t,e=>e*(1-e),j)}
    <circle cx="${F(H(t,.5))}" cy="${F(U(t,.25))}" r="3.5" fill="${j}" />
    <text x="${F(H(t,.5))}" y="${F(U(t,.25)-8)}" text-anchor="middle" font-size="12.4" fill="${j}">p=0.5 で最大 0.25</text>
    <circle cx="${F(H(t,n))}" cy="${F(U(t,n*(1-n)))}" r="3.5" fill="${k}" />
    <text x="${F(H(t,n)-6)}" y="${F(U(t,n*(1-n))+16)}" text-anchor="end" font-size="12.4" fill="${k}">${I(n*(1-n))}</text>
    <text x="${t.x+t.w/2}" y="${t.y+t.h+28}" text-anchor="middle" font-size="12.4" fill="${N}">横軸 ＝ 成功確率 p</text>
  </svg>`,`左はベルヌーイ分布そのもので、値は0（失敗）と1（成功）の2つだけです。p = ${n} なら成功の棒が ${n}、失敗の棒が ${1-n} です。右は分散 p(1−p) を p の関数として描いたもので、p = 0.5（どちらが出るか最も読めない）で最大の 0.25 になり、p が0や1に近づくほど結果が決まりきって分散は0に近づきます。p = ${n} の分散は ${I(n*(1-n))} です。`)}function Sn(){let e=e=>fe(5,e)*fe(10,4-e)/fe(15,4),t=e=>pe(4,5/15,e),n=xe(0,4),r={x:30,y:30,w:296,h:140,xMin:-.5,xMax:4.5,yMax:.5},i=(H(r,1)-H(r,0))*.34,a=(e,t,n,a)=>{let o=U(r,t);return`<rect x="${F(H(r,e)+n)}" y="${F(o)}" width="${F(i)}" height="${F(r.y+r.h-o)}" fill="${a}" fill-opacity="0.8" />`},o=5/15*4*(10/15)*(11/14),s=5/15*4*(1-5/15);return q(`${J(340,220,`赤玉5個・青玉10個から4個取り出す：戻さない超幾何分布と、戻す二項分布の比較`)}
    ${W(r,n)}
    ${n.map(n=>a(n,e(n),-i,k)+a(n,t(n),0,A)).join(``)}
    ${n.map(t=>`<text x="${F(H(r,t)-i/2)}" y="${F(U(r,e(t))-4)}" text-anchor="middle" font-size="12.4" fill="${k}">${e(t)<.01?e(t).toFixed(3):I(e(t))}</text>`).join(``)}
    <rect x="${r.x+150}" y="${r.y-2}" width="10" height="10" fill="${k}" /><text x="${r.x+164}" y="${r.y+7}" font-size="12.4" fill="${P}">戻さない（超幾何）</text>
    <rect x="${r.x+150}" y="${r.y+14}" width="10" height="10" fill="${A}" /><text x="${r.x+164}" y="${r.y+23}" font-size="12.4" fill="${P}">戻す（二項 B(4, 1/3)）</text>
    <text x="${r.x+r.w/2}" y="216" text-anchor="middle" font-size="12.4" fill="${N}">横軸 ＝ 4個のうちの赤玉の数 k</text>
  </svg>`,`本文の例（赤玉5個・青玉10個の計15個から4個取り出す）を描きました。青が戻さない場合（超幾何分布）、橙が毎回戻す場合（二項分布 B(4, 1/3)）です。平均はどちらも 4 × 5/15 ≈ ${I(20/15)} ですが、戻さない方が両端（0個・4個）が出にくく、真ん中に寄ります。分散で比べると超幾何 ${I(o)}、二項 ${I(s)} で、比 ${I(o/s)} がちょうど有限母集団修正 (15−4)/(15−1) です。母集団が取り出す数よりずっと大きければ、この差はほとんど消えます。`)}function Cn(){let e={x:30,y:24,w:304,h:144,xMin:.4,xMax:.95,yMax:6},t=.7,n=e=>n=>Math.max(0,6+e*(t*Math.log(n/t)+(1-t)*Math.log((1-n)/(1-t)))),r=e=>e/(t*(1-t));return q(`${J(350,236,`対数尤度の曲がり具合：同じ 7 割でも、100回のデータの山は10回のデータの山より鋭く、曲率が10倍になる`)}
    ${W(e,[.4,.5,.6,.7,.8,.9])}
    ${G(e,n(10),k,.4,.95,2.4)}
    ${G(e,n(100),A,.4,.95,2.4)}
    <line x1="${F(H(e,t))}" y1="${e.y}" x2="${F(H(e,t))}" y2="${e.y+e.h}" stroke="${M}" stroke-width="1.2" stroke-dasharray="4 3" />
    <text x="${F(H(e,t)+5)}" y="${e.y+12}" font-size="12.4" fill="${M}">頂上 ${t}</text>
    <text x="${F(H(e,.41))}" y="${F(U(e,5.4))}" font-size="13.2" font-weight="700" fill="${k}">10回中7回</text>
    <text x="${F(H(e,.69))}" y="${F(U(e,1))}" text-anchor="end" font-size="13.2" font-weight="700" fill="#b45309">100回中70回</text>
    <text x="${e.x+e.w/2}" y="216" text-anchor="middle" font-size="12.4" fill="${N}">横軸＝p の候補</text>
    <text x="${e.x+e.w/2}" y="231" text-anchor="middle" font-size="12.4" fill="${N}">縦軸＝対数尤度（頂上を 0 とし、下は −6 で打ち切り）</text>
  </svg>`,`同じ「表が7割」のデータでも、回数で山の鋭さが変わります。対数尤度は頂上付近で放物線に近く、その<strong>曲がり具合（頂上での曲率）</strong>が、実測データで見た情報量です。ここでは 10回で ${F(r(10))}、100回で ${F(r(100))} と、観測数に比例して 10 倍になります。山が鋭いほど、頂上から少し p をずらしただけで尤度が急に下がるので、頂上の位置を狭い範囲に絞り込めます。観測1回あたりでは ${F(r(1))} で、これが 1 回分のフィッシャー情報量 I(p) = 1/(p(1−p)) にあたります。`)}function wn(){let e=Xe(Y(7)),t=Array.from({length:30},()=>e()).sort((e,t)=>e-t),n=e=>(e+.5)/30,r=(e,t)=>{let n=-40,r=40;for(let i=0;i<80;i++){let i=(n+r)/2;e(i)<t?n=i:r=i}return(n+r)/2},i=Array.from({length:30},(e,t)=>-Math.log(1-n(t))),a=e=>.5+(e/(Math.sqrt(3)*(1+e*e/3))+Math.atan(e/Math.sqrt(3)))/Math.PI,o=Array.from({length:30},(e,t)=>r(a,n(t))),s=Array.from({length:30},(e,t)=>r(V,n(t))),c=e=>{let t=e.reduce((e,t)=>e+t,0)/e.length,n=Math.sqrt(e.reduce((e,n)=>e+(n-t)**2,0)/(e.length-1));return e.map(e=>(e-t)/n)},l=3.4,u=[18,132,246],d=[[c(t),k,`正規分布`,`直線上に並ぶ`,``],[c(i),`#b45309`,`右に裾が長い`,`弓なりで`,`右上が上へそる`],[c(o),j,`両裾が重い`,`左下は下、`,`右上は上へ離れる`]].map(([e,t,n,r,i],a)=>{let o=u[a],c=e=>o+(e+l)/(2*l)*96,d=e=>130-(e+l)/(2*l)*96,f=e.map((e,n)=>`<circle cx="${F(c(s[n]))}" cy="${F(d(Math.max(-l,Math.min(l,e))))}" r="2.6" fill="${t}" fill-opacity="0.85" />`).join(``),p=[-2,0,2].map(e=>`<text x="${F(c(e))}" y="144" text-anchor="middle" font-size="12" fill="${N}">${e}</text>`).join(``);return`<rect x="${o}" y="34" width="96" height="96" fill="none" stroke="${N}" stroke-width="1" />
    <line x1="${F(c(-l))}" y1="${F(d(-l))}" x2="${F(c(l))}" y2="${F(d(l))}" stroke="${N}" stroke-width="1.1" stroke-dasharray="4 3" />
    ${f}${p}
    <text x="${o+96/2}" y="24" text-anchor="middle" font-size="12.8" font-weight="700" fill="${t}">${n}</text>
    <text x="${o+96/2}" y="162" text-anchor="middle" font-size="12" fill="${t}">${r}</text>
    <text x="${o+96/2}" y="177" text-anchor="middle" font-size="12" fill="${t}">${i}</text>`}).join(``);return q(`${J(350,236,`正規 Q-Q プロット3例：正規分布のデータは直線上、右に裾の長いデータは弓なりで右上が上へそり、両裾の重いデータは左下が下に右上が上に離れる`)}
    ${d}
    <text x="${350/2}" y="214" text-anchor="middle" font-size="12" fill="${N}">横軸＝正規分布なら来るはずの値</text>
    <text x="${350/2}" y="230" text-anchor="middle" font-size="12" fill="${N}">縦軸＝データを小さい順に並べて標準化した値</text>
  </svg>`,`どれも30個のデータです。左は正規乱数、中央は指数分布、右は自由度3の t 分布から作りました。正規分布でないデータは、どちらの端がどちら向きに直線から離れるかで見分けられます。`)}function Tn(){let e=[.8,.7,.6],t=[`人前で話せる`,`友人が多い`,`パーティー好き`],n=[50,90,130],r=(e,t,n,r,i)=>`<line x1="${F(e)}" y1="${F(t)}" x2="${F(n)}" y2="${F(r)}" stroke="${i}" stroke-width="1.8" marker-end="url(#pa-arrow)" />`,i=t.map((t,i)=>{let a=n[i],o={x:272/2,y:(90+a)/2};return`
    <rect x="172" y="${a-28/2}" width="112" height="28" rx="3" fill="#ffffff" stroke="${k}" stroke-width="1.6" />
    <text x="228" y="${a+4.5}" text-anchor="middle" font-size="12.3" fill="${P}">${t}</text>
    ${r(100,90+(a-90)*.35,171,a,k)}
    <text x="${F(o.x)}" y="${F(o.y-8)}" text-anchor="middle" font-size="12.3" font-weight="700" fill="${k}">${F(e[i])}</text>
    ${r(302,a,285,a,A)}
    <circle cx="322" cy="${a}" r="15" fill="#fff7ed" stroke="${A}" stroke-width="1.6" />
    <text x="322" y="${a+4.5}" text-anchor="middle" font-size="12.3" fill="#b45309">u${i+1}</text>`}).join(``),a=[206,246,286],o=t.map((e,t)=>`
    <rect x="20" y="${a[t]-28/2}" width="112" height="28" rx="3" fill="#ffffff" stroke="${N}" stroke-width="1.6" />
    <text x="76" y="${a[t]+4.5}" text-anchor="middle" font-size="12.3" fill="${P}">${e}</text>
    ${r(133,a[t],242,246+(a[t]-246)*.35,N)}`).join(``),s=`${J(350,300,`因子分析のパス図：潜在因子から各観測変数へ矢印が出て、各変数には独自因子が付く。主成分分析は向きが逆で、観測変数から主成分を作る`)}
    <defs><marker id="pa-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${N}" /></marker></defs>
    <text x="10" y="16" font-size="13" font-weight="700" fill="${P}">因子分析：因子が変数を生む</text>
    <ellipse cx="62" cy="90" rx="38" ry="26" fill="#eef2ff" stroke="${k}" stroke-width="1.8" />
    <text x="62" y="88" text-anchor="middle" font-size="12.3" font-weight="700" fill="${k}">外向性</text>
    <text x="62" y="102" text-anchor="middle" font-size="12.3" fill="${k}">（因子 F）</text>
    ${i}
    <text x="10" y="176" font-size="13" font-weight="700" fill="${P}">主成分分析：変数から軸を作る</text>
    ${o}
    <ellipse cx="280" cy="246" rx="38" ry="26" fill="#f1f5f9" stroke="${N}" stroke-width="1.8" />
    <text x="280" y="250.5" text-anchor="middle" font-size="12.3" font-weight="700" fill="${P}">主成分 Z</text>
  </svg>`,c=e.map(e=>I(e*e)),l=e.map(e=>I(1-e*e));return q(s,`上は因子分析のパス図です。矢印の上の数が因子負荷量 λ で、「外向性が高いほど、その行動をとりやすい」強さを表します。各変数を標準化すると、λ の2乗が因子で説明できる割合（共通性）で、${c.join(`・`)} になります。残りの ${l.join(`・`)} は、その変数だけに固有の独自因子 u の分です。下の主成分分析は矢印の向きが逆で、観測変数を合成して主成分を作ります。因子分析は「原因（因子）から結果（変数）」、主成分分析は「結果（変数）から要約（主成分）」の向きです。`)}function En(){let e=[`#60a5fa`,`#a78bfa`,`#f472b6`],t=(t,n,r,i)=>r.map((r,a)=>{let o=t+12+a%4*17,s=n+16+Math.floor(a/4)*22;return i[a]?`<circle cx="${o}" cy="${s}" r="6" fill="${e[r]}" stroke="${P}" stroke-width="2.2" />`:`<circle cx="${o}" cy="${s}" r="6" fill="${e[r]}" fill-opacity="0.38" />`}).join(``),n=(e,n,r,i,a,o)=>`<rect x="${e}" y="${n}" width="78" height="58" rx="4" fill="${o?`#f8fafc`:`#ffffff`}" stroke="${o?P:N}" stroke-width="${o?2:1}" />
    ${t(e,n,i,a)}
    <text x="${e+39}" y="${n+74}" text-anchor="middle" font-size="12.3" fill="${N}">${r}</text>`,r=[0,1,1,2].map(e=>Array(8).fill(e)),i=e=>Array.from({length:8},(e,t)=>t===1||t===6),a=[0,1,2,1,0,2,1,1],o=[8,92,176,260];return q(`${J(350,286,`層化抽出と集落抽出：層化は似たものどうしの層から少しずつ、集落抽出は縮図になっている集落を丸ごと1つ選ぶ`)}
    <text x="8" y="16" font-size="13" font-weight="700" fill="${P}">層化抽出：各層から 2 個ずつ（計 8 個）</text>
    ${r.map((e,t)=>n(o[t],28,`層`+`ABCD`[t],e,i(t),!0)).join(``)}
    <text x="8" y="160" font-size="13" font-weight="700" fill="${P}">集落抽出：集落を丸ごと 1 つ選ぶ（計 8 個）</text>
    ${[0,1,2,3].map(e=>n(o[e],172,`集落`+(e+1),a,Array(8).fill(e===2),e===2)).join(``)}
    <text x="8" y="280" font-size="12.3" fill="${N}">色＝調べたい値（低・中・高）。濃い輪郭が選ばれた個体</text>
  </svg>`,`どちらも 32 個の母集団から 8 個を選んでいますが、選び方が違います。上の層化抽出は、層の中が似ている（同じ色）ように分け、各層から2個ずつ抜くので、低・中・高がもれなく入ります。下の集落抽出は、集落ごとに低・中・高が混ざっている（全体の縮図になっている）ことを前提に、1つの集落を丸ごと選びます。層化は<strong>層の中が似ているほど</strong>、集落抽出は<strong>集落の中が全体の縮図であるほど</strong>精度がよくなります。逆に集落の中が似た個体ばかりだと、1つ選んだだけでは偏ります。`)}function Dn(){let e=6371,t=[{n:`東京`,lat:35.68,lon:139.69},{n:`名古屋`,lat:35.18,lon:136.91},{n:`大阪`,lat:34.69,lon:135.5},{n:`福岡`,lat:33.59,lon:130.4}],n=e=>e*Math.PI/180,r=(t,r)=>{let i=n(r.lat-t.lat),a=n(r.lon-t.lon),o=Math.sin(i/2)**2+Math.cos(n(t.lat))*Math.cos(n(r.lat))*Math.sin(a/2)**2;return 2*e*Math.asin(Math.sqrt(o))},i=t.length,a=t.map(e=>t.map(t=>r(e,t))),o=a.map(e=>e.map(e=>e*e)),s=o.map(e=>e.reduce((e,t)=>e+t,0)/i),c=s.reduce((e,t)=>e+t,0)/i,l=o.map((e,t)=>e.map((e,n)=>-.5*(e-s[t]-s[n]+c))),u=[],d=l.map(e=>e.slice());for(let e=0;e<2;e++){let t=Array.from({length:i},(t,n)=>1+.3*Math.sin(n*1.7+e)),n=0;for(let e=0;e<400;e++){let e=d.map(e=>e.reduce((e,n,r)=>e+n*t[r],0)),r=Math.sqrt(e.reduce((e,t)=>e+t*t,0))||1;t=e.map(e=>e/r),n=r}u.push({val:n,vec:t}),d=d.map((e,r)=>e.map((e,i)=>e-n*t[r]*t[i]))}let f=t.map((e,t)=>({x:u[0].vec[t]*Math.sqrt(u[0].val),y:u[1].vec[t]*Math.sqrt(u[1].val)})),p=n(35),m=t.map(t=>({x:e*Math.cos(p)*n(t.lon),y:e*n(t.lat)})),h=e=>({x:e.reduce((e,t)=>e+t.x,0)/i,y:e.reduce((e,t)=>e+t.y,0)/i}),g=h(m),_=h(f),v=m.map(e=>({x:e.x-g.x,y:e.y-g.y})),ee=e=>{let t=f.map(t=>({x:t.x-_.x,y:e?-(t.y-_.y):t.y-_.y})),n=0,r=0;t.forEach((e,t)=>{n+=e.x*v[t].y-e.y*v[t].x,r+=e.x*v[t].x+e.y*v[t].y});let i=Math.atan2(n,r),a=t.map(e=>({x:e.x*Math.cos(i)-e.y*Math.sin(i),y:e.x*Math.sin(i)+e.y*Math.cos(i)}));return{Q:a,err:a.reduce((e,t,n)=>e+(t.x-v[n].x)**2+(t.y-v[n].y)**2,0)}},y=ee(!1),te=ee(!0),ne=y.err<=te.err?y:te,b=Math.max(...ne.Q.map((e,t)=>Math.hypot(e.x-v[t].x,e.y-v[t].y))),x=v.map(e=>e.x).concat(ne.Q.map(e=>e.x)),re=v.map(e=>e.y).concat(ne.Q.map(e=>e.y)),S=Math.min(...x),C=Math.max(...x),w=Math.min(...re),T=Math.max(...re),E=Math.min(256/(C-S),152/(T-w)),ie=44+(256-(C-S)*E)/2,ae=34+(152-(T-w)*E)/2,oe=e=>ie+(e-S)*E,D=e=>ae+(T-e)*E,se=[6,8,-8,-4],ce=[`start`,`start`,`end`,`start`],le=ne.Q.map((e,n)=>`
    <circle cx="${F(oe(v[n].x))}" cy="${F(D(v[n].y))}" r="7" fill="none" stroke="${N}" stroke-width="1.6" />
    <circle cx="${F(oe(e.x))}" cy="${F(D(e.y))}" r="4" fill="${k}" />
    <text x="${F(oe(v[n].x)+se[n]*(ce[n]===`end`?1:1.4))}" y="${F(D(v[n].y)-12)}" text-anchor="${ce[n]}" font-size="12.4" font-weight="700" fill="${P}">${t[n].n}</text>`).join(``);return q(`${J(350,252,`多次元尺度法：都市間の距離だけから都市の位置を復元すると、実際の地図の位置にほぼ重なる`)}
    <text x="8" y="18" font-size="13" font-weight="700" fill="${P}">距離（km）だけから位置を復元</text>
    ${le}
    <text x="8" y="214" font-size="12.4" fill="${N}">灰の輪＝実際の位置／青の点＝復元した位置</text>
    <text x="8" y="230" font-size="12.4" fill="${N}">入力は 4 都市の距離 6 個だけ（東京−大阪は ${((e,t)=>Math.round(a[e][t]/10)*10)(0,2)} km など）</text>
    <text x="8" y="246" font-size="12.4" fill="${N}">北は上（向きは実際にそろえた）</text>
  </svg>`,`MDS に渡したのは、4都市の間の距離（球面上の最短距離）だけです。地図も緯度経度も渡していません。それでも復元した位置（青）は、実際の位置（灰の輪）と最大 ${Math.round(b)} km のずれにおさまります。距離から座標を作ると、回転や反転の自由度が残ります（距離は回しても裏返しても変わらないため）。図では実際の向きにそろえて重ねました。ずれが小さいのは、4点がほぼ平面に並んでいて、2次元で距離をほとんど説明できるからです。`)}function On(){let e=.8,t=[-1.2,.6],n=[1.2,-.6],r=e=>175+e*34,i=e=>124-e*34,a=1.8,o=a*Math.sqrt(1+e),s=a*Math.sqrt(1-e),c=(e,t)=>`<ellipse cx="${F(r(e[0]))}" cy="${F(i(e[1]))}" rx="${F(o*34)}" ry="${F(s*34)}" transform="rotate(-45 ${F(r(e[0]))} ${F(i(e[1]))})" fill="${t}" fill-opacity="0.12" stroke="${t}" stroke-width="1.6" />`,l=Xe(Y(11)),u=(t,n)=>Array.from({length:n},()=>{let n=l(),r=l();return[t[0]+n,t[1]+e*n+Math.sqrt(1-e*e)*r]}),d=(e,t)=>e.map(e=>`<circle cx="${F(r(e[0]))}" cy="${F(i(e[1]))}" r="2.8" fill="${t}" fill-opacity="0.85" />`).join(``),f=1-e*e,p=[t[0]-n[0],t[1]-n[1]],m=[(p[0]-e*p[1])/f,(-e*p[0]+p[1])/f],h=[(t[0]+n[0])/2,(t[1]+n[1])/2],g=(e,t,n)=>{let a=[-e[1],e[0]],o=5/Math.hypot(a[0],a[1]),s=[h[0]-a[0]*o,h[1]-a[1]*o],c=[h[0]+a[0]*o,h[1]+a[1]*o];return`<line x1="${F(r(s[0]))}" y1="${F(i(s[1]))}" x2="${F(r(c[0]))}" y2="${F(i(c[1]))}" stroke="${t}" stroke-width="2.2" ${n?`stroke-dasharray="${n}"`:``} />`},_=e=>Math.round(Math.atan2(e[1],e[0])*180/Math.PI);return q(`${J(350,300,`線形判別分析の境界：2群が同じ向きの楕円状に広がるとき、LDA の境界は中点の垂直二等分線ではなく、楕円の形に合わせて傾く`)}
    <rect x="8" y="14" width="334" height="220" fill="none" stroke="${N}" stroke-width="1" />
    ${c(t,k)}${c(n,A)}
    ${d(u(t,16),k)}${d(u(n,16),A)}
    <clipPath id="lda-clip"><rect x="8" y="14" width="334" height="220" /></clipPath>
    <g clip-path="url(#lda-clip)">${g(p,N,`5 4`)}${g(m,M,``)}</g>
    <circle cx="${F(r(t[0]))}" cy="${F(i(t[1]))}" r="4.5" fill="#ffffff" stroke="${k}" stroke-width="2" />
    <circle cx="${F(r(n[0]))}" cy="${F(i(n[1]))}" r="4.5" fill="#ffffff" stroke="${A}" stroke-width="2" />
    <text x="14" y="30" font-size="13" font-weight="700" fill="${k}">グループ 1</text>
    <text x="336" y="226" text-anchor="end" font-size="13" font-weight="700" fill="#b45309">グループ 2</text>
    <line x1="14" y1="252" x2="40" y2="252" stroke="${M}" stroke-width="2.2" />
    <text x="46" y="256" font-size="12.4" fill="${P}">LDA の境界（楕円の形を考慮）</text>
    <line x1="14" y1="272" x2="40" y2="272" stroke="${N}" stroke-width="2.2" stroke-dasharray="5 4" />
    <text x="46" y="276" font-size="12.4" fill="${P}">2 つの平均の中点で垂直に切る境界</text>
    <text x="14" y="293" font-size="12.3" fill="${N}">輪＝各群の平均／楕円＝平均からマハラノビス距離 ${a} の範囲</text>
  </svg>`,`2群の広がりが同じ向きの楕円（ここでは相関 ${e}）のとき、灰の破線のように2つの平均の中点で垂直に切ると、楕円の長軸方向に伸びた裾が相手側にはみ出します。LDA の境界（赤）は、グループ内の分散共分散行列の逆行列を平均の差にかけた方向に垂直な線で、楕円の形に合わせて傾きます。この図では、灰の破線から約 ${Math.abs(_(m)-_(p))} 度回っています。楕円はマハラノビス距離が等しい点を結んだ線で、次の節のマハラノビス距離は、この楕円を測る物差しです。`)}function kn(){let e=.3,t=e=>Math.sin(Math.PI*(e+.3)),n=Xe(Y(5)),r=Array.from({length:15},(e,t)=>-1+2*t/14),i=Array.from({length:41},(e,t)=>-1+t/20),a=(e,t)=>{let n=t.length,r=e.map((e,n)=>[...e,t[n]]);for(let e=0;e<n;e++){let t=e;for(let i=e+1;i<n;i++)Math.abs(r[i][e])>Math.abs(r[t][e])&&(t=i);[r[e],r[t]]=[r[t],r[e]];for(let t=e+1;t<n;t++){let i=r[t][e]/r[e][e];for(let a=e;a<=n;a++)r[t][a]-=i*r[e][a]}}let i=Array(n).fill(0);for(let e=n-1;e>=0;e--){let t=r[e][n];for(let a=e+1;a<n;a++)t-=r[e][a]*i[a];i[e]=t/r[e][e]}return i},o=Array.from({length:9},(o,s)=>{let c=s+1,l=c+1,u=[],d=0;for(let o=0;o<300;o++){let o=r.map(r=>t(r)+e*n()),s=a(Array.from({length:l},(e,t)=>Array.from({length:l},(e,n)=>r.reduce((e,r)=>e+r**(t+n),0))),Array.from({length:l},(e,t)=>r.reduce((e,n,r)=>e+o[r]*n**t,0))),c=e=>s.reduce((t,n,r)=>t+n*e**r,0);d+=r.reduce((e,t,n)=>e+(c(t)-o[n])**2,0)/15,u.push(i.map(c))}let f=i.map((e,t)=>u.reduce((e,n)=>e+n[t],0)/300),p=i.reduce((e,n,r)=>e+(f[r]-t(n))**2,0)/i.length,m=i.reduce((e,t,n)=>e+u.reduce((e,t)=>e+(t[n]-f[n])**2,0)/300,0)/i.length;return{d:c,train:d/300,bias2:p,vr:m,test:p+m+e*e}}),s=.55,c=e=>42+(e-1)/8*292,l=e=>194-Math.min(e,s)/s*170,u=(e,t,n,r=``)=>`<polyline points="${o.map(t=>`${F(c(t.d))},${F(l(t[e]))}`).join(` `)}" fill="none" stroke="${t}" stroke-width="${n}" ${r?`stroke-dasharray="${r}"`:``} />`,d=o.reduce((e,t)=>t.test<e.test?t:e);return q(`${J(350,300,`バイアスとバリアンスのトレードオフ：多項式の次数を上げるとバイアスは減りバリアンスは増え、将来データの誤差は中くらいの次数で最小になる`)}
    <rect x="42" y="24" width="292" height="170" fill="none" stroke="${N}" stroke-width="1" />
    ${[0,.2,.4].map(e=>`<line x1="42" y1="${F(l(e))}" x2="334" y2="${F(l(e))}" stroke="${N}" stroke-opacity="0.2" /><text x="36" y="${F(l(e)+4)}" text-anchor="end" font-size="12.3" fill="${N}">${e}</text>`).join(``)}
    ${o.map(e=>`<text x="${F(c(e.d))}" y="210" text-anchor="middle" font-size="12.3" fill="${N}">${e.d}</text>`).join(``)}
    ${u(`train`,N,1.8,`5 4`)}${u(`bias2`,A,2.2)}${u(`vr`,k,2.2)}${u(`test`,M,3)}
    <circle cx="${F(c(d.d))}" cy="${F(l(d.test))}" r="5" fill="#ffffff" stroke="${M}" stroke-width="2" />
    <text x="${F(c(d.d))}" y="${F(l(d.test)-10)}" text-anchor="middle" font-size="12.4" font-weight="700" fill="${M}">最小：${d.d} 次</text>
    <text x="188" y="228" text-anchor="middle" font-size="12.4" fill="${N}">横軸＝当てはめる多項式の次数（右ほど複雑）</text>
    <line x1="14" y1="264" x2="38" y2="264" stroke="${M}" stroke-width="3" /><text x="44" y="268" font-size="12.4" fill="${P}">将来データの誤差（3つの和）</text>
    <line x1="14" y1="280" x2="38" y2="280" stroke="${A}" stroke-width="2.2" /><text x="44" y="284" font-size="12.4" fill="${P}">バイアス²</text>
    <line x1="112" y1="280" x2="136" y2="280" stroke="${k}" stroke-width="2.2" /><text x="142" y="284" font-size="12.4" fill="${P}">バリアンス</text>
    <line x1="210" y1="280" x2="234" y2="280" stroke="${N}" stroke-width="1.8" stroke-dasharray="5 4" /><text x="240" y="284" font-size="12.4" fill="${P}">手元データの誤差</text>
    <text x="14" y="297" font-size="12.3" fill="${N}">データ 15 点・ノイズ sd ${e}・300 回の取り直しの平均</text>
  </svg>`,`真の曲線（波形）から 15 点のデータを 300 回取り直し、次数を変えて多項式を当てはめた結果です。次数が低いと、曲線が真の形を捉えられず（<strong>バイアス</strong>が大きい）、どのデータを使っても同じようにずれます。次数を上げるとバイアスは ${I(o[0].bias2)} から ${I(o[8].bias2)} へ下がりますが、データごとに曲線が揺れる量（<strong>バリアンス</strong>）が ${I(o[0].vr)} から ${I(o[8].vr)} へ増えます。将来データの誤差はこの2つとノイズの合計なので、${d.d} 次で最小（${I(d.test)}）になります。灰の破線の手元データの誤差は次数とともに減り続けるため、これだけで次数を選ぶと複雑すぎるモデルを選んでしまいます。情報量規準や Cp は、この差を補正して選ぶ道具です。`)}function An(e,t,n){let r=Object.fromEntries(e.map(e=>[e.id,e]));return t.map(([e,t,i])=>{let a=r[e],o=r[t],s=o.x-a.x,c=o.y-a.y,l=Math.hypot(s,c),u=s/l,d=c/l,f=i??P;return`<line x1="${F(a.x+u*18)}" y1="${F(a.y+d*18)}" x2="${F(o.x-u*20)}" y2="${F(o.y-d*20)}" stroke="${f}" stroke-width="2" marker-end="url(#${n})" />`}).join(``)+e.map(e=>`
    <circle cx="${e.x}" cy="${e.y}" r="17" fill="${e.hidden?`#f8fafc`:`#ffffff`}" stroke="${e.hidden?N:k}" stroke-width="1.8"${e.hidden?` stroke-dasharray="4 3"`:``} />
    <text x="${e.x}" y="${e.y+5}" text-anchor="middle" font-size="14" font-weight="700" fill="${e.hidden?N:k}">${e.label}</text>`).join(``)}function jn(){let e=`dag-arrow`,t=(e,t,n)=>`<text x="10" y="${e}" font-size="13" font-weight="700" fill="${P}">${t}</text><text x="10" y="${e+16}" font-size="12.3" fill="${N}">${n}</text>`,n=An([{id:`Z`,x:255,y:28,label:`Z`},{id:`X`,x:200,y:96,label:`X`},{id:`Y`,x:310,y:96,label:`Y`}],[[`Z`,`X`,A],[`Z`,`Y`,A],[`X`,`Y`]],e),r=An([{id:`X`,x:190,y:220,label:`X`},{id:`M`,x:250,y:220,label:`M`},{id:`Y`,x:310,y:220,label:`Y`}],[[`X`,`M`,j],[`M`,`Y`,j]],e),i=An([{id:`X`,x:200,y:296,label:`X`},{id:`Y`,x:310,y:296,label:`Y`},{id:`C`,x:255,y:340,label:`C`}],[[`X`,`C`,M],[`Y`,`C`,M]],e);return q(`${J(350,372,`因果グラフ（DAG）の基本3形：交絡（Zが共通原因）、媒介（XからMを通ってY）、合流点（XとYがCに向かう）`)}
    <defs><marker id="${e}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${P}" /></marker></defs>
    ${t(24,`① 交絡（分岐）`,`Z が X と Y の共通原因`)}
    ${n}
    <line x1="10" y1="132" x2="340" y2="132" stroke="#e2e8f0" />
    ${t(176,`② 媒介（連鎖）`,`X が M を介して Y へ`)}
    ${r}
    <line x1="10" y1="252" x2="340" y2="252" stroke="#e2e8f0" />
    ${t(270,`③ 合流点`,`X と Y の結果が C`)}
    ${i}
  </svg>`,`矢印は原因から結果の向き。①は Z で調整して交絡を切る。②は M を調整すると X の効果の通り道を塞ぐ。③は C を調整すると、もともと無関係の X と Y に見かけの関連が生まれる。`)}function Mn(){let e=`dagf-arrow`,t=An([{id:`U`,x:175,y:28,label:`U`,hidden:!0},{id:`X`,x:60,y:108,label:`X`},{id:`M`,x:175,y:108,label:`M`},{id:`Y`,x:290,y:108,label:`Y`}],[[`U`,`X`,N],[`U`,`Y`,N],[`X`,`M`,j],[`M`,`Y`,j]],e);return q(`${J(350,150,`フロントドア基準のDAG：観測できない U が X と Y の両方に影響し、X から M を通って Y に届く経路がある`)}
    <defs><marker id="${e}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${P}" /></marker></defs>
    ${t}
    <text x="218" y="40" font-size="12.3" fill="${N}">観測できない交絡</text>
    <text x="175" y="146" text-anchor="middle" font-size="12.3" fill="${j}">X→M と M→Y を別々にたどる</text>
  </svg>`,`点線の U は測れない共通原因。X と Y を直接比べても U の影響が混ざるが、途中の M を観測できれば、X→M と M→Y の2段に分けて効果を求められる。`)}function Nn(){let e=`dagiv-arrow`,t=An([{id:`U`,x:230,y:30,label:`U`,hidden:!0},{id:`Z`,x:40,y:108,label:`Z`},{id:`X`,x:160,y:108,label:`X`},{id:`Y`,x:300,y:108,label:`Y`}],[[`Z`,`X`,j],[`X`,`Y`,k],[`U`,`X`,N],[`U`,`Y`,N]],e);return q(`${J(350,170,`操作変数のDAG：くじで配ったクーポン Z が利用時間 X を動かし、X が点数 Y に届く。測れないやる気 U は X と Y の両方に影響するが、Z とはつながっていない`)}
    <defs><marker id="${e}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${P}" /></marker></defs>
    ${t}
    <text x="252" y="26" font-size="12.3" fill="${N}">やる気</text>
    <text x="252" y="42" font-size="12.3" fill="${N}">（測れない）</text>
    <text x="40" y="142" text-anchor="middle" font-size="12.3" fill="${j}">クーポン</text>
    <text x="40" y="158" text-anchor="middle" font-size="12.3" fill="${j}">（くじ）</text>
    <text x="160" y="142" text-anchor="middle" font-size="12.3" fill="${P}">利用時間</text>
    <text x="300" y="142" text-anchor="middle" font-size="12.3" fill="${P}">点数</text>
  </svg>`,`Z から Y へは X を通る道しか無く、Z は U とつながっていません。Z が動かした分の X の変化だけを使えば、U の混ざらない効果が求まります。`)}function Pn(e){let t=e.length,n=e.map(e=>e.slice()),r=Array.from({length:t},(e,n)=>Array.from({length:t},(e,t)=>n===t?1:0));for(let e=0;e<100;e++){let e=0,i=1,a=0;for(let r=0;r<t;r++)for(let o=r+1;o<t;o++)Math.abs(n[r][o])>a&&(a=Math.abs(n[r][o]),e=r,i=o);if(a<1e-14)break;let o=(n[i][i]-n[e][e])/(2*n[e][i]),s=Math.sign(o||1)/(Math.abs(o)+Math.sqrt(o*o+1)),c=1/Math.sqrt(s*s+1),l=s*c;for(let r=0;r<t;r++){if(r===e||r===i)continue;let t=n[r][e],a=n[r][i];n[r][e]=n[e][r]=c*t-l*a,n[r][i]=n[i][r]=l*t+c*a}let u=n[e][e],d=n[i][i],f=n[e][i];n[e][e]=u-s*f,n[i][i]=d+s*f,n[e][i]=n[i][e]=0;for(let n=0;n<t;n++){let t=r[n][e],a=r[n][i];r[n][e]=c*t-l*a,r[n][i]=l*t+c*a}}return{vals:n.map((e,t)=>e[t]),vecs:r}}var Fn={rows:[`20代`,`40代`,`60代`],cols:[`コーヒー`,`紅茶`,`緑茶`,`ジュース`],counts:[[30,10,5,35],[25,25,20,10],[10,20,45,5]]};function In(){let e=Fn.counts,t=e.length,n=e[0].length,r=e.flat().reduce((e,t)=>e+t,0),i=e.map(e=>e.reduce((e,t)=>e+t,0)/r),a=Array.from({length:n},(t,n)=>e.reduce((e,t)=>e+t[n],0)/r),o=e.map((e,t)=>e.map((e,n)=>(e/r-i[t]*a[n])/Math.sqrt(i[t]*a[n]))),{vals:s,vecs:c}=Pn(Array.from({length:t},(e,n)=>Array.from({length:t},(e,t)=>o[n].reduce((e,n,r)=>e+n*o[t][r],0)))),l=s.map((e,t)=>t).sort((e,t)=>s[t]-s[e]),u=o.flat().reduce((e,t)=>e+t*t,0),d=l.slice(0,2).map(e=>{let t=Math.sqrt(Math.max(s[e],0)),r=c.map(t=>t[e]),l=Array.from({length:n},(e,n)=>o.reduce((e,t,i)=>e+t[n]*r[i],0)/t);return{d:t,share:s[e]/u,rows:r.map((e,n)=>e*t/Math.sqrt(i[n])),cols:l.map((e,n)=>e*t/Math.sqrt(a[n]))}});return d[0].rows[0]>0&&(d[0].rows=d[0].rows.map(e=>-e),d[0].cols=d[0].cols.map(e=>-e)),{n:r,inertia:u,chi2:r*u,axes:d}}function Ln(){let{axes:e}=In(),t=.95,n=.34,r=e=>20+(e+t)/(2*t)*310,i=e=>232-(e+n)/(2*n)*208,a=[[0,`u`],[1,`u`],[2,`u`]],o=[[0,`u`],[1,`r`],[2,`d`],[3,`d`]],s=(e,t,n,a,o)=>{let s=a===`r`?9:0,c=a===`u`?-9:a===`d`?19:4;return`<text x="${F(r(e)+s)}" y="${F(i(t)+c)}" text-anchor="${a===`r`?`start`:`middle`}" font-size="12.5" font-weight="700" fill="${o}">${n}</text>`},c=a.map(([t,n])=>{let a=e[0].rows[t],o=e[1].rows[t];return`<rect x="${F(r(a)-5)}" y="${F(i(o)-5)}" width="10" height="10" fill="${k}" />${s(a,o,Fn.rows[t],n,k)}`}).join(``),l=o.map(([t,n])=>{let a=e[0].cols[t],o=e[1].cols[t];return`<circle cx="${F(r(a))}" cy="${F(i(o))}" r="5.5" fill="${A}" />${s(a,o,Fn.cols[t],n,`#b45309`)}`}).join(``),u=(e[0].share*100).toFixed(1),d=(e[1].share*100).toFixed(1);return q(`${J(350,270,`対応分析の散布図：年代（四角）と好きな飲み物（丸）を同じ平面に置く。20代はジュースとコーヒー、40代は紅茶、60代は緑茶の近く`)}
    <line x1="20" y1="${F(i(0))}" x2="330" y2="${F(i(0))}" stroke="#cbd5e1" stroke-width="1" />
    <line x1="${F(r(0))}" y1="18" x2="${F(r(0))}" y2="238" stroke="#cbd5e1" stroke-width="1" />
    ${c}${l}
    <text x="330" y="264" text-anchor="end" font-size="12.5" fill="${N}">第1軸（寄与率 ${u}%）</text>
    <text x="20" y="16" text-anchor="start" font-size="12.5" fill="${N}">第2軸（${d}%）</text>
  </svg>`,`四角が年代、丸が飲み物。同じ平面に置くので、四角と丸が同じ方向にあれば、おおまかに「その年代にその飲み物が多い」傾向を表します。原点は全体の平均的な好みです。数値は上の表（240人の架空データ）を特異値分解して計算しました。`)}function Rn(){let e=1/6,t=292/12,n={y0:30,h:96},r={y0:190,h:96},i=t=>(1-e)**(t-1)*e,a=e*1.05,o=e=>34+e*t,s=(e,n,r,i,s,c)=>`<rect x="${F(o(e)+2)}" y="${F(r+i-n/a*i)}" width="${F(t-4)}" height="${F(n/a*i)}" fill="${s}" fill-opacity="${c}" />`,c=Array.from({length:12},(e,t)=>s(t,i(t+1),n.y0,n.h,t+1>5?A:k,t+1>5?.85:.55)).join(``),l=1/(1-e)**5,u=Array.from({length:7},(e,t)=>s(t,i(5+t+1)*l,r.y0,r.h,A,.85)).join(``),d=Array.from({length:7},(e,n)=>`<rect x="${F(o(n)+2)}" y="${F(r.y0+r.h-i(n+1)/a*r.h)}" width="${F(t-4)}" height="${F(i(n+1)/a*r.h)}" fill="none" stroke="${k}" stroke-width="1.6" />`).join(``),f=(e,n,r)=>Array.from({length:r},(r,i)=>`<text x="${F(o(i)+t/2)}" y="${e}" text-anchor="middle" font-size="12.4" fill="${N}">${n+i}</text>`).join(``);return q(`${J(340,316,`サイコロで初めて6が出るまでの回数の分布。5回外れた後の残りの部分だけを切り出して高さを伸ばすと、最初の分布と同じ形に重なる`)}
    <text x="34" y="18" font-size="13.2" font-weight="700" fill="${P}">最初から：初めて6が出るまでの回数</text>
    <line x1="34" y1="${n.y0+n.h}" x2="326" y2="${n.y0+n.h}" stroke="${N}" />
    ${c}${f(n.y0+n.h+15,1,12)}
    <text x="${F(o(5)+4)}" y="${n.y0+14}" font-size="12.4" fill="#b45309">5回外れた後に残る部分</text>
    <text x="34" y="178" font-size="13.2" font-weight="700" fill="${P}">残りを切り出し、高さを ${l.toFixed(2)} 倍に伸ばす</text>
    <line x1="34" y1="${r.y0+r.h}" x2="326" y2="${r.y0+r.h}" stroke="${N}" />
    ${u}${d}${f(r.y0+r.h+15,1,7)}
    <text x="326" y="${r.y0+14}" text-anchor="end" font-size="12.4" fill="${k}">青い枠：最初の分布</text>
    <text x="326" y="${r.y0+30}" text-anchor="end" font-size="12.4" fill="#b45309">橙：切り出した残り</text>
  </svg>`,`上は、サイコロを振って初めて6が出るまでの回数の分布です。5回目まで外れた場合に残る部分（橙）だけを取り出し、1回目から数え直して高さを ${l.toFixed(2)} 倍に伸ばしたのが下の橙の棒で、青い枠で示した最初の分布にぴったり重なります。何回外れていても、そこから先の待ち方は変わらないことが、形として見えます。`)}function zn(){let e=1.5,t={y0:30,h:96},n={y0:190,h:96},r=e=>34+e/5*292,i=(e,t)=>t.y0+t.h-e/1.05*t.h,a=(e,t,n,a)=>Array.from({length:101},(o,s)=>{let c=n+(a-n)*s/100;return`${F(r(c))},${F(i(e(c),t))}`}).join(` `),o=e=>1*Math.exp(-1*e),s=`${a(o,t,e,5)} ${F(r(5))},${F(t.y0+t.h)} ${F(r(e))},${F(t.y0+t.h)}`,c=t=>o(e+t)*Math.exp(1*e),l=[0,1,2,3,4,5],u=(e,t)=>`<line x1="34" y1="${e.y0+e.h}" x2="326" y2="${e.y0+e.h}" stroke="${N}" />`+l.map(n=>`<text x="${F(r(n))}" y="${e.y0+e.h+15}" text-anchor="middle" font-size="12.4" fill="${N}">${n+t}</text>`).join(``);return q(`${J(340,316,`指数分布の密度。s分待った後の残りの部分だけを切り出して高さを伸ばすと、最初の曲線と同じ形に重なる`)}
    <text x="34" y="18" font-size="13.2" font-weight="700" fill="${P}">最初から：待ち時間の分布</text>
    ${u(t,0)}
    <polygon points="${s}" fill="${A}" fill-opacity="0.35" />
    <polyline points="${a(o,t,0,5)}" fill="none" stroke="${k}" stroke-width="2" />
    <line x1="${F(r(e))}" y1="${t.y0}" x2="${F(r(e))}" y2="${t.y0+t.h}" stroke="${A}" stroke-width="1.6" stroke-dasharray="4 3" />
    <text x="${F(r(e)+6)}" y="${t.y0+14}" font-size="12.4" fill="#b45309">${e} 分待った後に残る部分</text>
    <text x="34" y="178" font-size="13.2" font-weight="700" fill="${P}">残りを切り出し、高さを ${Math.exp(1*e).toFixed(2)} 倍に伸ばす</text>
    ${u(n,0)}
    <polyline points="${a(o,n,0,5)}" fill="none" stroke="${k}" stroke-width="4.5" stroke-opacity="0.35" />
    <polyline points="${a(c,n,0,5)}" fill="none" stroke="${A}" stroke-width="1.8" />
    <text x="326" y="${n.y0+14}" text-anchor="end" font-size="12.4" fill="${k}">太い青：最初の曲線</text>
    <text x="326" y="${n.y0+30}" text-anchor="end" font-size="12.4" fill="#b45309">橙：切り出した残り</text>
  </svg>`,`上は指数分布（λ=1）の密度で、橙の部分が ${e} 分待った後に残る領域です。これを横軸の左端に寄せ、面積が1に戻るよう高さを e^${e} ≈ ${Math.exp(1*e).toFixed(2)} 倍に伸ばしたのが下の橙の線で、太い青線の最初の曲線とぴったり重なります。待った時間は、この先の待ち時間の分布に影響しないことが、形として見えます。`)}function Bn(){let e=e=>24+(e-124)/72*302,t=(e,t)=>Math.exp(-((e-t)**2)/200),n=e=>164-e*124,r=r=>Array.from({length:73},(i,a)=>{let o=124+a;return`${F(e(o))},${F(n(t(o,r)))}`}).join(` `),i=t(155,150),a=t(155,170),o=i/(i+a);return q(`${J(340,236,`女性の山（平均150）と男性の山（平均170）を同じ軸に描き、身長155cmでの2つの高さの比から、女性である確率0.73を求める`)}
    <line x1="24" y1="164" x2="326" y2="164" stroke="${N}" />
    ${[130,150,170,190].map(t=>`<text x="${F(e(t))}" y="179" text-anchor="middle" font-size="12.4" fill="${N}">${t}</text>`).join(``)}
    <text x="326" y="195" text-anchor="end" font-size="12.4" fill="${N}">身長（cm）</text>
    <polyline points="${r(150)}" fill="none" stroke="${M}" stroke-width="2" />
    <polyline points="${r(170)}" fill="none" stroke="${k}" stroke-width="2" />
    <text x="${F(e(150)-6)}" y="42" text-anchor="end" font-size="13.2" font-weight="700" fill="${M}">女性（平均150）</text>
    <text x="${F(e(170)+6)}" y="42" text-anchor="start" font-size="13.2" font-weight="700" fill="${k}">男性（平均170）</text>
    <line x1="${F(e(155))}" y1="30" x2="${F(e(155))}" y2="164" stroke="${A}" stroke-width="1.6" stroke-dasharray="4 3" />
    <circle cx="${F(e(155))}" cy="${F(n(i))}" r="4.5" fill="${M}" />
    <circle cx="${F(e(155))}" cy="${F(n(a))}" r="4.5" fill="${k}" />
    <text x="${F(e(155)+8)}" y="${F(n(i)-4)}" font-size="12.4" font-weight="700" fill="${M}">高さ ${i.toFixed(2)}</text>
    <text x="${F(e(155)+8)}" y="${F(n(a)+4)}" font-size="12.4" font-weight="700" fill="${k}">高さ ${a.toFixed(2)}</text>
    <text x="${F(e(155))}" y="195" text-anchor="middle" font-size="12.4" font-weight="700" fill="#b45309">155</text>
    <text x="${340/2}" y="230" text-anchor="middle" font-size="13.2" font-weight="700" fill="${P}">女性の確率 ＝ ${i.toFixed(2)} ÷ (${i.toFixed(2)}＋${a.toFixed(2)}) ＝ ${o.toFixed(2)}</text>
  </svg>`,`女性（平均150cm）と男性（平均170cm）の身長が、標準偏差10cmの正規分布に従うと仮に置いた図です。155cmの人のところで縦線を引くと、女性の山の高さは ${i.toFixed(2)}、男性の山の高さは ${a.toFixed(2)} です。この2つの高さの比が、その人が女性である確率（負担率）になります。山の頂上を1とした相対的な高さなので、割合を取れば同じ値になります。`)}var Vn={"f-pmf":Se,"f-pdf":Ce,"f-density-over-1":we,"f-survival":Te,"f-same-moments":Ee,"f-linear-transform":De,"f-binomial":Oe,"f-uniform":bn,"f-bernoulli":xn,"f-hypergeo":Sn,"f-poisson":je,"f-poisson-slice":ke,"f-poisson-binom":Ae,"f-continuity":Me,"f-geometric":Ne,"f-exponential":Ie,"f-wait-total":Re,"f-ratio-dist":ze,"f-lognormal":Be,"f-cauchy":Ve,"f-normal-areas":He,"f-normal-params":Ue,"f-standardize":We,"f-normal-affine":Ge,"f-normal-plus":Ke,"f-clt-coin":qe,"f-bayes-tree":Je,"f-venn3":Ye,"f-overfit":nt,"f-bivariate":rt,"f-cov-matrix":at,"f-transform-strips":it,"f-conditional":ot,"f-max-shift":st,"f-mahalanobis":ct,"f-uncorr-dependent":dt,"f-fold-square":ft,"f-wait-pair":pt,"f-shear-area":mt,"f-max-cdf":ht,"f-gev-types":_t,"f-return-level":gt,"f-marginal":vt,"f-linear-uv":lt,"f-independent-slices":ut,"f-min-parts":yt,"f-lln":bt,"f-mean-narrow":xt,"f-dist-family":St,"f-noncentral-t":Ct,"f-chi2-tail":Ot,"f-t-tail":kt,"f-t-fold":jt,"f-f-tail":At,"f-order-stats":Mt,"f-order-split":Nt,"f-median-spread":Pt,"f-var-ratio-ci":Ft,"f-poisson-test":nn,"f-quantile":It,"f-nminus1":Lt,"f-ci-z":Rt,"f-ci-coverage":zt,"f-ci-chi2":Bt,"f-ci-prop-n":Vt,"f-ci-diff":Ht,"f-paired":Ut,"f-one-sided":Wt,"f-wald-coverage":Gt,"f-jackknife":Kt,"f-np-region":Zt,"f-three-tests":Qt,"f-canonical-disc":$t,"f-ci-ad":qt,"f-power-design":Jt,"f-power-curve":Yt,"f-wls":Xt,"f-likelihood":rn,"f-estimator-flow":an,"f-likelihood-peak":on,"f-likelihood-trouble":sn,"f-mm-vs-mle":cn,"f-darts":ln,"f-variance-estimators":un,"f-consistency":dn,"f-mean-vs-median":fn,"f-estimator-classes":pn,"f-pvalue":mn,"f-anova":hn,"f-dendrogram":gn,"f-timeseries":_n,"f-km":vn,"f-montecarlo":yn,"f-loglik":Cn,"f-qq":wn,"f-rank-ab":en,"f-interaction":tn,"f-factor-path":Tn,"f-strata-cluster":En,"f-mds":Dn,"f-lda":On,"f-biasvar":kn,"f-dag-basic":jn,"f-dag-front":Mn,"f-dag-iv":Nn,"f-ca":Ln,"f-memoryless-geo":Rn,"f-memoryless-cont":zn,"f-em":Bn},X=[{id:`1.1-probability`,updatedAt:`2026-06-25`,title:`確率の公理と包除原理`,chapter:1,description:`コルモゴロフの公理・補事象・包除原理で、確率論の数学的基礎を学びます。`,content:`💡 **このモジュールで学ぶこと**

「サイコロで偶数か3の倍数が出る確率は？」を正確に解くための土台として、確率が守るルール（**コルモゴロフの公理**）と、重なりのある事象を足すときのルール（**包除原理**）を学びます。

---

### 1. コルモゴロフの公理：確率が守る3つのルール

まず、サイコロを1回振る場面で言葉をそろえます。

| 用語 | 意味 | サイコロの例 |
|---|---|---|
| 標本空間 $\\Omega$ | 起こりうる結果の全体 | $\\{1, 2, 3, 4, 5, 6\\}$ |
| 事象 | 標本空間の一部 | 偶数 $A = \\{2, 4, 6\\}$ |
| 和事象 $A \\cup B$ | $A$ または $B$ | 偶数か3の倍数 $\\{2, 3, 4, 6\\}$ |
| 積事象 $A \\cap B$ | $A$ かつ $B$ | 偶数かつ3の倍数 $\\{6\\}$ |
| 補事象 $A^c$ | $A$ が起きない | 奇数 $\\{1, 3, 5\\}$ |
| 空事象 $\\emptyset$ | 何も含まない | 7が出る |

確率 $P$ は、次の3つを満たすものと決めます。これが**コルモゴロフの公理**です。

1. **公理1（非負性）**：どの事象 $A$ でも $P(A) \\geq 0$
2. **公理2（全体は1）**：$P(\\Omega) = 1$
3. **公理3（加法性）**：$A$ と $B$ が排反（同時に起きない）なら $P(A \\cup B) = P(A) + P(B)$

公理3は、厳密には排反な事象が無限個あっても成り立つ形（可算加法性）で置かれます。この3つから、よく使う性質が導けます。

- **空事象の確率は0**：$A$ と $\\emptyset$ は排反で $A \\cup \\emptyset = A$ なので、公理3より $P(A) = P(A) + P(\\emptyset)$。よって $P(\\emptyset) = 0$
- **補事象の確率**：$A$ と $A^c$ は排反で $A \\cup A^c = \\Omega$ なので、公理2と3より $P(A) + P(A^c) = 1$。よって $P(A^c) = 1 - P(A)$

🎯 **押さえどころ**：$P(A^c) = 1 - P(A)$ は最もよく使う公式の1つです。「少なくとも1回」のように直接数えにくい確率は、起きない側から求めます。

---

### 2. 包除原理：重なりを二重に数えない

クラス40人のうち、数学が得意な人が20人、英語が得意な人が15人、両方得意な人が5人います。「少なくとも一方が得意な人」は $20 + 15 = 35$ 人ではありません。両方得意な5人を二重に数えているので、$20 + 15 - 5 = 30$ 人です。確率でも同じで、この「足して、重なりを引く」計算を**包除原理**（Inclusion-Exclusion Principle）と呼びます。

$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$

[[venn-inclusion]]

冒頭の問いでは、偶数が $P(A) = 3/6$、3の倍数が $P(B) = 2/6$、両方（6の目）が $P(A \\cap B) = 1/6$ なので、$P(A \\cup B) = 3/6 + 2/6 - 1/6 = 2/3$ です。上の表の $\\{2, 3, 4, 6\\}$ の4つの目と一致します。$A$ と $B$ が排反なら $P(A \\cap B) = 0$ で、公理3の式に戻ります。

#### 3つの事象の場合

2つずつの重なりを引くと、3つ全部が重なる部分を引きすぎるので、最後に1回足し戻します。

$$\\begin{aligned} &P(A \\cup B \\cup C) \\\\ &= P(A) + P(B) + P(C) \\\\ &\\quad - P(A \\cap B) - P(B \\cap C) \\\\ &\\quad - P(A \\cap C) + P(A \\cap B \\cap C) \\end{aligned}$$

[[f-venn3]]

#### ド・モルガンの法則

「$A$ も $B$ も起きない」は「$A$ が起きない、かつ $B$ が起きない」と同じです。「どちらか一方でも起きない」は「$A$ が起きない、または $B$ が起きない」と同じです。

$$(A \\cup B)^c = A^c \\cap B^c$$

$$(A \\cap B)^c = A^c \\cup B^c$$

🎯 **使いどころ**：「少なくとも一方が起きる」確率は、補事象と組み合わせて $P(A \\cup B) = 1 - P(A^c \\cap B^c)$ と求められます。「どちらも起きない」確率のほうが計算しやすいときに使います。`,keyFormulas:[{label:`補事象`,formula:`P(A^c) = 1 - P(A)`},{label:`包除原理（2事象）`,formula:`\\begin{aligned} &P(A \\cup B) \\\\ &= P(A) + P(B) - P(A \\cap B) \\end{aligned}`},{label:`包除原理（3事象）`,formula:`\\begin{aligned} &P(A \\cup B \\cup C) \\\\ &= P(A)+P(B)+P(C) \\\\ &\\quad -P(A\\cap B)-P(B\\cap C) \\\\ &\\quad -P(A\\cap C)+P(A\\cap B\\cap C) \\end{aligned}`}],quiz:[{id:`p1-11`,question:`コルモゴロフの確率の公理から導かれる性質として正しいものはどれか？`,options:[`空事象の確率は $P(\\emptyset) = 0$ が成り立つ`,`$P(A \\cup B) = P(A) + P(B)$ がすべての事象 $A, B$ で成立する`,`$P(A \\cap B) = P(A) \\cdot P(B)$ がすべての事象 $A, B$ で成立する`,`$P(A) \\geq P(B)$ ならば $A \\supseteq B$ が必ず成立する`],correctAnswer:0,explanation:`公理3（加法性）から $A$ と $\\emptyset$ は互いに排反なので $P(A) + P(\\emptyset) = P(A \\cup \\emptyset) = P(A)$、よって $P(\\emptyset) = 0$ が導かれる。選択肢2は排反な場合にのみ成立（一般には $-P(A \\cap B)$ が必要）、選択肢3は独立の場合のみ成立する。`},{id:`p1-12`,question:`10枚のコインを同時に投げるとき、少なくとも1枚が表になる確率として正しいものはどれか（各コインの表裏は等確率）？`,options:[`$\\left(\\dfrac{1}{2}\\right)^{10}$`,`$1 - \\left(\\dfrac{1}{2}\\right)^{10}$`,`$\\dfrac{10}{2^{10}}$`,`$\\dfrac{10 \\cdot 2^9}{2^{10}}$`],correctAnswer:1,explanation:`余事象「1枚も表が出ない（全部裏）」の確率は $(1/2)^{10}$ なので、少なくとも1枚表 $= 1 - (1/2)^{10} \\approx 0.999$。このように「少なくとも1回」という問いでは余事象が直接計算より圧倒的に簡単になる典型例。`},{id:`p1-13`,question:`$P(A) = 0.4$, $P(B) = 0.3$, $P(A \\cap B) = 0.1$ のとき、$P(A \\cup B)$ はいくらか？`,options:[`$0.12$`,`$0.5$`,`$0.6$`,`$0.7$`],correctAnswer:2,explanation:`包除原理 $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0.4 + 0.3 - 0.1 = 0.6$ です。両方が同時に起きる確率（$0.1$）を引かないと二重計算になります。`},{id:`p1-4`,question:`クラス30人で、読書が好きな人18人・音楽が好きな人12人・両方好きな人6人のとき、少なくともどちらか一方が好きな人の割合はいくらか？`,options:[`$24/30$`,`$30/30$`,`$12/30$`,`$18/30$`],correctAnswer:0,explanation:`包除原理 $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ より $18/30 + 12/30 - 6/30 = 24/30$ です。単純に足すと両方が好きな6人を二重に数えてしまうため、引く必要があります。`},{id:`p1-16`,question:`標本空間 $\\Omega$ とはどのような集合か？`,options:[`実験で最も確率が高い結果だけの集合`,`実験で起こりうるすべての結果の集合`,`確率が0より大きい結果の集合`,`実際に観測された結果の集合`],correctAnswer:1,explanation:`標本空間 $\\Omega$ は「その実験で起こりうるすべての結果」の集合です。例えばサイコロ投げでは $\\Omega = \\{1,2,3,4,5,6\\}$。コルモゴロフの公理2では $P(\\Omega) = 1$（必ずどれかが起きる）が要請されます。`},{id:`p1-17`,question:`公理1「$P(A) \\geq 0$」が意味することとして正しいものはどれか？`,options:[`確率は整数でなければならない`,`確率は必ず1より小さい`,`確率は負にならない（0以上）`,`確率は必ず0か1のどちらか`],correctAnswer:2,explanation:`公理1は「確率は非負（0以上）」を要請します。「まったく起こらない」に対応するのが確率0で、負の確率は意味を持ちません。確率の値は $[0, 1]$ の範囲に収まります（公理1・2から導かれます）。`},{id:`p1-18`,question:`ド・モルガンの法則 $(A \\cup B)^c$ と等しい集合はどれか？`,options:[`$A \\cap B$`,`$A^c \\cup B$`,`$A^c \\cup B^c$`,`$A^c \\cap B^c$`],correctAnswer:3,explanation:`ド・モルガンの法則：$(A \\cup B)^c = A^c \\cap B^c$（「AまたはBでない」＝「AでもなくBでもない」）です。確率では $P(A^c \\cap B^c) = 1 - P(A \\cup B)$ として使います。`},{id:`p1-19`,question:`互いに排反な事象 $A$, $B$ のとき $P(A \\cup B)$ はどうなるか？`,options:[`$P(A) + P(B)$`,`$P(A) - P(B)$`,`$P(A) \\cdot P(B)$`,`$P(A) + P(B) - P(A \\cap B)$`],correctAnswer:0,explanation:`排反な事象では $P(A \\cap B) = 0$ なので、包除原理 $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ が $P(A) + P(B)$ に簡略されます。これはコルモゴロフの公理3そのものです。`},{id:`p1-20`,question:`$P(A) = 0.6$、$P(B) = 0.5$、$P(A \\cup B) = 0.8$ のとき、$P(A \\cap B)$ はいくらか？`,options:[`$0.1$`,`$0.2$`,`$0.3$`,`$0.4$`],correctAnswer:2,explanation:`包除原理を変形すると $P(A \\cap B) = P(A) + P(B) - P(A \\cup B) = 0.6 + 0.5 - 0.8 = 0.3$ です。包除原理は逆方向にも使えます。`},{id:`p1-21`,question:`3事象 $A$, $B$, $C$ が互いに排反（どの2つも同時に起きない）なとき、$P(A \\cup B \\cup C)$ はどうなるか？`,options:[`$1 - P(A^c) \\cdot P(B^c) \\cdot P(C^c)$`,`$P(A) \\cdot P(B) \\cdot P(C)$`,`$P(A) + P(B) + P(C) - P(A \\cap B \\cap C)$`,`$P(A) + P(B) + P(C)$`],correctAnswer:3,explanation:`どの2つも排反なら $P(A \\cap B) = P(B \\cap C) = P(A \\cap C) = P(A \\cap B \\cap C) = 0$ なので、3事象の包除原理が $P(A) + P(B) + P(C)$ に簡略されます。コルモゴロフの公理3の有限加法性を3事象に適用した結果です。`}]},{id:`1.2-conditional`,updatedAt:`2026-06-29`,title:`条件付き確率と統計的独立`,chapter:1,description:`条件付き確率の定義・乗法定理・統計的独立で、「前提が変わると確率が変わる」仕組みを学びます。`,content:`💡 **このモジュールで学ぶこと**

「天気予報は降水確率30%」でも朝から空が曇っていたら、あなたの感じる雨の確率は30%より高くなるはずです。このように「ある情報が得られたとき、確率がどう変わるか」を数学にしたのが**条件付き確率**です。また、コインを何度投げても前の結果が次に影響しないように「情報が確率を変えない」状態を**統計的独立**と呼びます。この2つは全確率の定理・ベイズの定理（どちらも次のモジュール[全確率の定理とベイズの定理](/stats-pre1/1.3-total-prob/)で学びます）の直接の土台です。

---

### 1. 条件付き確率：「前提が変わると確率も変わる」

あるクラスで男子20人・女子20人が試験を受けました。合格者は30人で、うち女子は20人でした。無作為に選んだ1人が「合格者だった」とわかったとき、その人が女子である確率は？

全体で見ると女子は50%ですが、「合格者の中での女子の割合」は $20/30 \\approx 66.7\\%$ です。「合格者」という情報が確率を変えました。これが**条件付き確率**（Conditional Probability）です。

$$P(B \\mid A) = \\frac{P(A \\cap B)}{P(A)} \\quad (P(A) > 0)$$

$P(B \\mid A)$ は「$A$ が起きたという条件のもとで $B$ が起きる確率」と読みます。縦棒「$|$」は「〜が与えられたとき（given that）」を意味します。

[[venn-conditional]]

この定義を変形すると**乗法定理**が得られます：

$$P(A \\cap B) = P(B \\mid A) \\cdot P(A) = P(A \\mid B) \\cdot P(B)$$

「$A$ と $B$ が同時に起きる確率」＝「$A$ が起きる確率」×「$A$ のもとで $B$ が起きる確率」という直感的な分解です。

🎯 **押さえどころ**：$P(B \\mid A) \\neq P(B)$ であれば、$A$ と $B$ は「関係がある（独立でない）」ことを意味します。「$A$ を知っても $B$ の確率が変わらない」のが独立で、その逆がこの関係です。次の独立の定義でこの対応を確かめます。

---

### 2. 統計的独立：「知っても確率が変わらない」

条件付き確率の定義から自然に「情報が何の役にも立たない」状態を定義できます。

コインを2回投げます。1回目の結果は2回目の確率に何も影響しません。1回目が表（事象 $A$）でも裏でも、2回目が表（事象 $B$）になる確率は常に $1/2$ です。これを**統計的独立**（Statistical Independence）と呼びます。

$$A \\text{ と } B \\text{ が独立} \\iff P(A \\cap B) = P(A) \\cdot P(B)$$

条件付き確率の式に代入すると $P(B \\mid A) = P(B)$ となり、「$A$ を知っても $B$ の確率が変わらない」ことと同値です。

📖 **「排反」と「独立」の混同に注意**

- **排反（Mutually Exclusive）**：$A$ が起きれば $B$ は絶対起きない（$P(A \\cap B) = 0$）
  - 例：サイコロで「1が出る（$A$）」と「2が出る（$B$）」。同じ1回の試行で同時に両方は出ない
- **独立（Independent）**：$A$ が起きても $B$ の確率は変わらない（$P(B \\mid A) = P(B)$）
  - 例：コインを2回投げて「1回目が表（$A$）」と「2回目が表（$B$）」。1回目の結果は2回目に無関係

$P(A) > 0$ かつ $P(B) > 0$ のとき、排反と独立は**同時に成立しません**。排反なら $P(A \\cap B) = 0$ ですが、独立なら $P(A \\cap B) = P(A) \\cdot P(B) > 0$ となり矛盾します。`,keyFormulas:[{label:`条件付き確率`,formula:`P(B \\mid A) = \\dfrac{P(A \\cap B)}{P(A)}`},{label:`乗法定理`,formula:`P(A \\cap B) = P(B \\mid A) \\cdot P(A)`},{label:`統計的独立`,formula:`P(A \\cap B) = P(A) \\cdot P(B)`}],quiz:[{id:`p1-1`,question:`条件付き確率 $P(B \\mid A)$ の定義として正しいものはどれか？`,options:[`$P(A) \\cdot P(B)$`,`$\\dfrac{P(A \\cap B)}{P(A)}$`,`$\\dfrac{P(A \\cap B)}{P(B)}$`,`$P(A) + P(B)$`],correctAnswer:1,explanation:`条件付き確率は「$A$ と $B$ が同時に起きる確率」を「$A$ が起きる確率」で割ったものです。$P(A)$ で割ることで「$A$ が起きた世界を全体として見直す」操作になります。`},{id:`p1-14`,question:`$P(A) = 0.5$, $P(B \\mid A) = 0.6$ のとき $P(A \\cap B)$ はいくらか？`,options:[`$0.5$`,`$0.8$`,`$0.1$`,`$0.3$`],correctAnswer:3,explanation:`乗法定理 $P(A \\cap B) = P(B \\mid A) \\times P(A) = 0.6 \\times 0.5 = 0.3$ です。条件付き確率の定義 $P(B \\mid A) = P(A \\cap B)/P(A)$ を変形した形です。`},{id:`p1-3`,question:`事象 $A$ と $B$ が統計的に独立である条件として正しいものはどれか？`,options:[`$P(B \\mid A) = P(A)$`,`$P(A \\cap B) = 0$`,`$P(A \\cup B) = P(A) + P(B)$`,`$P(A \\cap B) = P(A) \\cdot P(B)$`],correctAnswer:3,explanation:`独立の定義は $P(A \\cap B) = P(A) \\cdot P(B)$ です。$P(A \\cap B) = 0$ は「排反」の条件であり、独立とは異なります。また独立なら $P(B \\mid A) = P(B)$（$A$ ではなく $B$）になります。`},{id:`p1-8`,question:`互いに排反な2つの事象 $A$, $B$（$P(A)>0$, $P(B)>0$）は統計的独立と言えるか？`,options:[`言えない（排反と独立は別の概念）`,`場合による`,`$P(A)=P(B)$ のときのみ言える`,`言える（排反なら独立）`],correctAnswer:0,explanation:`排反は $P(A \\cap B) = 0$、独立は $P(A \\cap B) = P(A) \\cdot P(B) > 0$（$P(A), P(B)>0$ のとき）を意味するので矛盾します。排反な事象は「片方が起きると、もう片方は絶対起きない」のですから、むしろ強い依存関係があります。`},{id:`p1-9`,question:`事象 $A$, $B$, $C$ が互いに独立なとき、$P(A \\cap B \\cap C)$ はどう表されるか？`,options:[`$P(A) \\cdot P(B \\mid A) \\cdot P(C \\mid A \\cap B)$`,`$P(A) \\cdot P(B) \\cdot P(C)$`,`$P(A \\cup B \\cup C)$`,`$P(A) + P(B) + P(C)$`],correctAnswer:1,explanation:`互いに独立な場合、どの2つをとっても独立が成立するため $P(A \\cap B \\cap C) = P(A) \\cdot P(B) \\cdot P(C)$ が成り立ちます。選択肢0は乗法定理の一般形（独立でない場合）ですが、独立のときは各条件付き確率が単純確率に等しくなり同値になります。`},{id:`p1-15`,question:`標本空間 $\\Omega = \\{1,2,3,4,5,6\\}$ でサイコロを振るとき、事象 $A=\\{2,4,6\\}$（偶数）と事象 $B=\\{3,4,5,6\\}$（3以上）は独立か？`,options:[`独立（$P(A \\cap B) = P(A)P(B)$ が成立）`,`独立でない（成立しない）`,`排反なので独立`,`情報不足で判断できない`],correctAnswer:0,explanation:`$P(A) = 1/2$, $P(B) = 4/6 = 2/3$, $P(A \\cap B) = P(\\{4,6\\}) = 2/6 = 1/3$。$P(A) \\cdot P(B) = 1/2 \\times 2/3 = 1/3 = P(A \\cap B)$ が成立するため独立です。直感と異なりますが、計算で確認することが重要です。`},{id:`p1-22`,question:`$P(A) = 0.6$、$P(A \\cap B) = 0.3$ のとき $P(B \\mid A)$ はいくらか？`,options:[`$0.5$`,`$0.3$`,`$0.9$`,`$0.18$`],correctAnswer:0,explanation:`$P(B \\mid A) = P(A \\cap B) / P(A) = 0.3 / 0.6 = 0.5$ です。条件付き確率は「$A$ が起きた世界の中での $B$ の割合」であり、分母を $P(A)$ で割って標準化しています。`},{id:`p1-23`,question:`2つのサイコロを振るとき、1つ目が4（事象 $A$）、2つ目が3（事象 $B$）として、$P(B \\mid A)$ はいくらか？`,options:[`$1/12$`,`$1/6$`,`$1/2$`,`$1/36$`],correctAnswer:1,explanation:`2つのサイコロは独立なので、1つ目の結果は2つ目に影響しません。$P(B \\mid A) = P(B) = 1/6$ です。独立な場合、条件付き確率は元の確率と同じになります。`},{id:`p1-24`,question:`赤玉3個・白玉2個の袋から1個取り出す（事象 $A$：赤玉）、もう1個取り出す（事象 $B$：赤玉）。戻さない場合、$P(B \\mid A)$ はいくらか？`,options:[`$2/5$`,`$3/5$`,`$2/4$`,`$3/4$`],correctAnswer:2,explanation:`1個目で赤玉（$A$）を取り出した後は、残り4個（赤2・白2）から取り出します。$P(B \\mid A) = 2/4 = 1/2$ です。戻さない場合は1回目と2回目が独立でなくなります（非復元抽出）。`},{id:`p1-25`,question:`$P(B \\mid A) = P(A \\mid B)$ が成り立つ条件はどれか？`,options:[`$P(A \\cap B) = 0$ のとき`,`常に成り立つ`,`$A$ と $B$ が独立なとき`,`$P(A) = P(B)$ のとき`],correctAnswer:3,explanation:`$P(B \\mid A) = P(A \\cap B)/P(A)$、$P(A \\mid B) = P(A \\cap B)/P(B)$ なので、両辺が等しいのは $P(A) = P(B)$ のときです。一般に $P(B \\mid A) \\neq P(A \\mid B)$ であることに注意（例：「コロナ陽性→検査陽性」と「検査陽性→コロナ陽性」は違う）。`}]},{id:`1.3-total-prob`,updatedAt:`2026-06-29`,title:`全確率の定理とベイズの定理`,chapter:1,description:`「結果から原因を推測する」全確率の定理とベイズの定理を具体的な病気検査の例で学びます。`,content:`💡 **このモジュールで学ぶこと**

「病気の検査で陽性と出ました。では、あなたが本当に病気である確率はどのくらいでしょうか？」直感では「陽性＝ほぼ病気」と思いがちですが、実際は検査の精度と病気の希少さによって大きく変わります。この問いに答えるために、原因を複数に分けて確率を計算する「全確率の定理」と、結果から原因を逆算する「ベイズの定理」を学びます。

💡 **「複数の原因」を考えるための準備**

前のモジュールで条件付き確率と独立を学びました。次のステップは「複数の原因があるとき、それぞれの寄与を足し合わせて全体の確率を求める」方法です。これが全確率の定理の発想です。

---

### 1. 乗法定理と全確率の定理

条件付き確率の定義を変形すると、積事象を「段階的に計算できる」**乗法定理**が得られます：

$$P(A \\cap B) = P(B \\mid A) \\cdot P(A)$$

例：袋に赤玉3個・白玉2個。1個取り出して戻さずにもう1個取る。2個とも赤の確率は？

$$\\begin{aligned}P(\\text{1回目赤} \\cap \\text{2回目赤}) &= P(\\text{2回目赤} \\mid \\text{1回目赤}) \\cdot P(\\text{1回目赤}) \\\\ &= \\frac{2}{4} \\times \\frac{3}{5} = \\frac{3}{10}\\end{aligned}$$

次に、互いに排反で全事象を分割する事象の組 $B_1, B_2, \\ldots, B_n$（これを**完全系**と呼びます）を使うと、任意の事象 $A$ の確率を次のように表せます。これが**全確率の定理**（Total Probability Theorem）です：

$$P(A) = \\sum_{i=1}^{n} P(A \\mid B_i) \\cdot P(B_i)$$

例：工場Aが製品全体の60%、工場Bが40%を生産。不良品率はそれぞれ2%・5%。無作為に選んだ1個が不良品である確率は？

$$P(\\text{不良}) = 0.02 \\times 0.6 + 0.05 \\times 0.4 = 0.012 + 0.020 = 0.032$$

全確率の定理は、各原因 $B_i$ からの寄与（$P(A \\mid B_i) \\cdot P(B_i)$）を足し合わせる構造です。次のベイズの定理の分母の計算に必ず登場します。

[[total-probability]]

---

### 2. ベイズの定理：「結果から原因を推測する」

全確率の定理で「全体の確率」が計算できました。次は逆方向です。「結果を観測したとき、各原因がどのくらい疑わしいか」を問います。これが統計的推測の核心です。

冒頭の問いに戻りましょう。3つの数値を整理します：

- **有病率 1%**：検査を受ける人1000人のうち、実際に病気なのは10人
- **感度 95%**：病気の10人中 9.5人が「陽性」と正しく検出される
- **特異度 90%**：健康な990人中 891人が「陰性」と正しく判定される → 残り **99人が誤って「陽性」**（偽陽性）

つまり「陽性と出た人」は $9.5 + 99 = 108.5$ 人いるのに、本当に病気なのは9.5人だけです（1000人あたりの平均の人数なので小数になります）。直感より大幅に低い値になりそうです。ベイズの定理で正確に計算します：

[[f-bayes-tree]]

$$P(\\text{病気} \\mid \\text{陽性}) = \\frac{P(\\text{陽性} \\mid \\text{病気}) \\cdot P(\\text{病気})}{P(\\text{陽性})}$$

分母を全確率の定理で展開します（健康な人が陽性になる確率 $= 1 - 0.90 = 0.10$）：

$$P(\\text{陽性}) = 0.95 \\times 0.01 + 0.10 \\times 0.99 = 0.0095 + 0.0990 = 0.1085$$

よって：

$$P(\\text{病気} \\mid \\text{陽性}) = \\frac{0.95 \\times 0.01}{0.1085} \\approx 0.0876 \\approx 8.8\\%$$

陽性でも約9%しか病気でないのは、有病率（検査前に病気である確率）が低いと、感度が高くても「陽性だったときに病気である確率」は大きく上がりません。

**ベイズの定理の一般形：**

$$P(B_i \\mid A) = \\frac{P(A \\mid B_i) \\cdot P(B_i)}{\\sum_{j=1}^{n} P(A \\mid B_j) \\cdot P(B_j)}$$

- $P(B_i)$：**事前確率**（Prior Probability）、観察前にわかっている確率
- $P(A \\mid B_i)$：**尤度**（Likelihood）、原因 $B_i$ のもとで結果 $A$ が起きる確率
- $P(B_i \\mid A)$：**事後確率**（Posterior Probability）、結果 $A$ を観測した後に更新された確率

分母 $P(A) = \\sum_j P(A \\mid B_j)P(B_j)$ はすべての $B_i$ に共通の定数です。そのため事後確率の**大小関係**は分子 $P(A \\mid B_i) P(B_i)$ だけで決まります。これを利用して「$\\propto$（比例する）」という簡略表記が使われます：

$$P(B_i \\mid A) \\propto P(A \\mid B_i) \\cdot P(B_i)$$

実際の確率値が必要なときは分母で割って正規化します。この意味で分母を**正規化定数**（normalizing constant）と呼びます。分母で割ることで「すべての $B_i$ にわたる事後確率の合計が1」になることが保証されます。

🎯 **押さえどころ**：「事前確率 × 尤度 に比例して事後確率が決まる」、「分母は正規化定数」、「$\\propto$ は分母が定数なので省略できる」という3点は、ベイズ統計の土台になります。`,keyFormulas:[{label:`乗法定理`,formula:`P(A \\cap B) = P(B \\mid A) \\cdot P(A)`},{label:`全確率の定理`,formula:`P(A) = \\sum_{i} P(A \\mid B_i) \\cdot P(B_i)`},{label:`ベイズの定理`,formula:`P(B_i \\mid A) = \\dfrac{P(A \\mid B_i) \\cdot P(B_i)}{\\sum_j P(A \\mid B_j) \\cdot P(B_j)}`}],quiz:[{id:`p1-2`,question:`ベイズの定理 $P(B_i \\mid A) = \\dfrac{P(A \\mid B_i) \\cdot P(B_i)}{\\sum_j P(A \\mid B_j) P(B_j)}$ において、$P(B_i)$ を何と呼ぶか？`,options:[`尤度`,`事後確率`,`事前確率`,`周辺確率`],correctAnswer:2,explanation:`$P(B_i)$ はデータ $A$ を観察する前から持っている確率であり、事前確率（Prior Probability）と呼びます。観察後に更新された $P(B_i \\mid A)$ が事後確率、$P(A \\mid B_i)$ が尤度です。`},{id:`p1-5`,question:`工場Xが製品の70%を作り不良率2%、工場Yが30%を作り不良率6%のとき、無作為に1個選んだ製品が不良品である確率はいくらか？`,options:[`$0.020$`,`$0.032$`,`$0.060$`,`$0.040$`],correctAnswer:1,explanation:`全確率の定理より $P(\\text{不良}) = 0.02 \\times 0.7 + 0.06 \\times 0.3 = 0.014 + 0.018 = 0.032$ です。2つの工場からの寄与を「各工場のシェア × 不良率」で計算して足し合わせます。`},{id:`p1-6`,question:`袋に赤玉4個・青玉2個。1個取り出して戻さずにもう1個取る。両方赤の確率はいくらか？`,options:[`$\\dfrac{8}{15}$`,`$\\dfrac{4}{15}$`,`$\\dfrac{2}{5}$`,`$\\dfrac{2}{3}$`],correctAnswer:2,explanation:`乗法定理より $P(\\text{1枚目赤}) \\times P(\\text{2枚目赤} \\mid \\text{1枚目赤}) = \\frac{4}{6} \\times \\frac{3}{5} = \\frac{12}{30} = \\frac{2}{5}$ です。1枚目を取り出した後は残り5個のうち赤が3個になる点に注意します。`},{id:`p1-7`,question:`ある病気の有病率が0.1%（1000人に1人）、検査の感度95%・特異度99%のとき、陽性結果の人が実際に病気である確率（陽性的中率）に最も近いものはどれか？`,options:[`$\\approx 50\\%$`,`$\\approx 95\\%$`,`約1%`,`$\\approx 9\\%$`],correctAnswer:3,explanation:`$P(\\text{陽性}) = 0.95 \\times 0.001 + 0.01 \\times 0.999 = 0.00095 + 0.00999 = 0.01094$。よって $P(\\text{病気} \\mid \\text{陽性}) = 0.00095 / 0.01094 \\approx 0.087 \\approx 9\\%$。有病率が低いと偽陽性が多くなり、陽性的中率は感度より大幅に低くなります。`},{id:`p1-10`,question:`ベイズの定理で事後確率を求める際、分母（全確率）の役割として最も適切な説明はどれか？`,options:[`観測データの尤もらしさそのものを表す`,`事前確率の更新量を制御する`,`尤度の大きさを正規化する`,`事後確率の合計が1になるように調整する正規化定数として機能する`],correctAnswer:3,explanation:`分母 $P(A) = \\sum_j P(A \\mid B_j) P(B_j)$ はすべての原因についての寄与を足し合わせた値で、これで割ることで「すべての原因の事後確率の合計が1」になります。この意味で「正規化定数（normalizing constant）」と呼ばれます。`},{id:`tp1-1`,question:`全確率の定理で使う「完全系」とはどのような事象の組か？`,options:[`すべての確率が等しい事象の組`,`互いに排反で全事象 $\\Omega$ を覆う事象の組 $B_1, \\ldots, B_n$`,`独立な事象の組`,`確率が0の事象を除いた組`],correctAnswer:1,explanation:`完全系（分割）とは $B_1 \\cup B_2 \\cup \\cdots \\cup B_n = \\Omega$（全体を覆う）かつ $B_i \\cap B_j = \\emptyset$（$i \\neq j$ のとき排反）を満たす事象の組です。工場A・工場Bがすべての製品を分担する例がこれにあたります。`},{id:`tp1-2`,question:`乗法定理 $P(A \\cap B) = P(B \\mid A) \\cdot P(A)$ を一般化した3事象版 $P(A \\cap B \\cap C)$ はどれか？`,options:[`$P(A \\cap B) + P(A \\cap C)$`,`$P(A) + P(B) + P(C)$`,`$P(C \\mid A \\cap B) \\cdot P(B \\mid A) \\cdot P(A)$`,`$P(A) \\cdot P(B) \\cdot P(C)$`],correctAnswer:2,explanation:`乗法定理を2回適用すると $P(A \\cap B \\cap C) = P(C \\mid A \\cap B) \\cdot P(A \\cap B) = P(C \\mid A \\cap B) \\cdot P(B \\mid A) \\cdot P(A)$ となります。事象が独立のとき各条件付き確率が単純確率に等しくなり、$P(A) \\cdot P(B) \\cdot P(C)$ に一致します。`},{id:`tp1-3`,question:`ベイズの定理で事前確率が等しい（$P(B_1) = P(B_2) = \\cdots$）とき、事後確率の大小は何で決まるか？`,options:[`事前確率そのもの`,`全確率 $P(A)$ の大小`,`事象の数`,`尤度 $P(A \\mid B_i)$ の大小`],correctAnswer:3,explanation:`事前確率がすべて等しいとき、$P(B_i \\mid A) \\propto P(A \\mid B_i) \\cdot P(B_i) = P(A \\mid B_i) \\cdot \\text{定数}$ となり、尤度の大きさだけが事後確率の順序を決めます。これは「最尤原理」（データを最もよく説明する原因を選ぶ）と同じ直感です。`},{id:`tp1-4`,question:`次の状況でベイズの定理を使う。赤袋（赤玉2・白玉1）と青袋（赤玉1・白玉2）から1つを等確率で選び、赤玉を取り出した。選んだ袋が赤袋だった確率は？`,options:[`$2/3$`,`$1/3$`,`$3/4$`,`$1/2$`],correctAnswer:0,explanation:`事前確率 $P(\\text{赤袋}) = P(\\text{青袋}) = 1/2$。$P(\\text{赤} \\mid \\text{赤袋}) = 2/3$、$P(\\text{赤} \\mid \\text{青袋}) = 1/3$。全確率 $P(\\text{赤}) = 2/3 \\times 1/2 + 1/3 \\times 1/2 = 1/2$。事後確率 $= (2/3 \\times 1/2)/(1/2) = 2/3$。`},{id:`tp1-5`,question:`ベイズの定理 $P(B_i \\mid A) \\propto P(A \\mid B_i) P(B_i)$ の表現で「$\\propto$」が使われる理由は？`,options:[`等式ではないから`,`計算が難しいから`,`分母（全確率）が定数なので省略して「比例する」と表現できるから`,`近似だから`],correctAnswer:2,explanation:`分母 $P(A) = \\sum_j P(A \\mid B_j) P(B_j)$ はすべての $i$ に対して共通の定数です。事後確率の大小関係は分子 $P(A \\mid B_i) P(B_i)$ だけで決まるため、「比例する（$\\propto$）」という表現を使うことができます。実際の値が必要なときは分母で正規化します。`}]},{id:`1.4-dist-basics`,updatedAt:`2026-10-20`,title:`確率分布の基礎：PMF・PDF・CDF・期待値・分散`,chapter:2,description:`PMF・PDF・CDF・期待値・分散で、確率分布を数学的に記述する道具を学びます。`,content:`💡 **このモジュールで学ぶこと**

「この試験の平均点は60点」という情報だけでは、「80点以上が何%いるか」はわかりません。分布の形全体（どの値がどのくらい出やすいか）を記述するには、確率分布という道具が必要です。このモジュールでは確率分布の数学的な表現方法（PMF・PDF・CDF）と、分布の中心と広がりを数値で表す期待値・分散・モーメントを学びます。

💡 **離散と連続：確率の表し方は2種類ある**

確率変数（Random Variable）$X$ とは、試行の結果に応じて値が決まる変数です。たとえばサイコロを1回振った目の数は確率変数で、値は必ず整数（1〜6）になります。これが**離散型**確率変数です。一方、日本人男性の身長のように連続的な値をとる変数を**連続型**確率変数と呼びます。2種類で確率の表し方が変わります。

---

### 1. 確率質量関数（PMF）と確率密度関数（PDF）

サイコロを1回振ります。次の目は不確かですが「1が出る確率は1/6」と言えます。目の数は1, 2, …, 6のどれかに確定しています。これが**離散型**の確率の表し方です。一方、「日本人男性の身長が170〜172cmに入る確率は？」身長は任意の実数をとり、点1点に確率を割り当てることができません。この2種類の「確率の測り方」の違いを見ていきます。

**離散型**では「$X = x$ になる確率」を直接 $P(X = x)$ と書けます。この対応を**確率質量関数**（Probability Mass Function, PMF）と呼びます。サイコロの例では $P(X=1) = \\cdots = P(X=6) = 1/6$ で、全部足すと1になります。

[[f-pmf]]

**連続型**では、特定の1点（例：身長がぴったり170.0000…cm）の確率は 0 です。連続的な実数は無限通りあり、各点に有限の確率を与えると合計が発散してしまうからです。代わりに「区間内に入る確率」を計算します。直感的には「棒グラフの各棒の面積（高さ×幅）が確率」という考え方を連続化したものです。幅を限りなく細かくして「面積 = 確率」のまま連続化した関数が**確率密度関数**（Probability Density Function, PDF）$f(x)$ です：

$$P(a \\le X \\le b) = \\int_a^b f(x)\\,dx$$

[[f-pdf]]

PMF と PDF に共通する性質：
- すべての値で $f(x) \\geq 0$（確率は負にならない）
- 合計（離散）または全区間の積分（連続）が 1 になる

🎯 **つまずきやすい点**：PDF の値 $f(x_0)$ 自体は確率ではありません（1より大きくなることもあります）。確率はあくまで「面積（積分）」で表されます。

[[f-density-over-1]]

---

### 2. 累積分布関数（CDF）と生存関数

PMF や PDF が「各点の出やすさ」を表すのに対し、「$x$ 以下になる確率」をまとめて表すのが**累積分布関数**（Cumulative Distribution Function, CDF）です：

$$F(x) = P(X \\le x)$$

試験の得点分布を例にすると、$F(60) = 0.5$ は「60点以下が全体の50%」を意味します。CDF の性質：$F(-\\infty) = 0$、$F(\\infty) = 1$、単調非減少。

**生存関数**（Survival Function）$S(x) = 1 - F(x) = P(X > x)$ は、信頼性工学や医学研究で「$x$ 時間以上生存する確率」として使われます。CDF と生存関数は互いに補完する関係にあり、一方から他方が計算できます。

下の図は、機械が故障するまでの年数のような「待ち時間」によく使う**指数分布**で描いた例です（指数分布は[指数分布とガンマ分布](/stats-pre1/1.8-continuous/)で詳しく学びます。ここでは $F(x) = 1 - e^{-x}$ という式の形だけ使います）。

[[f-survival]]

連続型では CDF を微分すると PDF が得られます。$F(x) = \\int_{-\\infty}^x f(t)\\,dt$ なので、両辺を $x$ で微分すると $f(x) = F'(x)$ です（微積分の基本定理）：

$$f(x) = \\frac{d}{dx} F(x)$$

上の図と同じ指数分布を例に、この対応を図で確かめます。同じ $x$ について、PDF では「0 から $x$ までの面積」が、CDF では「$x$ での曲線の高さ」になります。

[[cdf-pdf]]

#### 確率から値を逆に読む：分位点関数

CDF は「値 $x$ から、$x$ 以下になる確率」を読む関数でした。逆に「確率から値」を知りたい場面もあります。「部品の90%が壊れるのは何年後か」「得点の上位10%に入るには何点要るか」です。

確率 $p$ に対して $F(x) = p$ となる $x$ を返す関数を**分位点関数**（quantile function）と呼び、CDF の逆関数として $F^{-1}(p)$ と書きます。$F^{-1}(p)$ の値を、$p$ の**分位点**（下側 $100p$% 点）と呼びます。

$$Q(p) = F^{-1}(p)$$

上の指数分布 $F(x) = 1 - e^{-x}$ なら、$1 - e^{-x} = p$ を $x$ について解きます。$e^{-x} = 1 - p$ の両辺の自然対数（$e \\approx 2.718$ を底とする対数で、$\\ln$ と書きます。$\\ln y$ は「$e$ を何乗すると $y$ になるか」）をとると、次の式になります。

$$Q(p) = -\\ln(1 - p)$$

[[f-quantile]]

- $Q(0.5) = \\ln 2 \\approx 0.69$：中央値。生存関数の図で、2本の曲線が交わった点と同じ
- $Q(0.9) = \\ln 10 \\approx 2.30$：90%の部品が壊れるまでの年数
- $Q(0.25)$ と $Q(0.75)$ を**四分位点**と呼び、その差が四分位範囲

離散型では CDF が階段の形になり、$F(x) = p$ がちょうど成り立つ $x$ が無いことがあります。そのときは $F(x) \\ge p$ となる最小の $x$ を分位点とします。信頼区間や検定で使う「上側 $\\alpha$ 点」は、右側に確率 $\\alpha$ を残す点なので $Q(1 - \\alpha)$ です（[信頼区間：1標本の推定](/stats-pre1/1.16-ci/)で使います）。

---

PMF・PDF・CDF で「どの値がどのくらい出やすいか」という分布の形を記述できるようになりました。次は、その分布全体を1〜2個の数値に要約する指標（期待値と分散）を学びます。

### 3. モーメント：分布の形を「次数」で捉えるものさし

分布の形を数で要約するとき、まず知りたいのは「中心はどこか」と「どれだけ広がっているか」です。中心を表すのが**期待値**、広がりを表すのが**分散**です。この2つは、節の後半で学ぶ**モーメント**という1つの道具の1次と2次にあたります。モーメントは次数を上げるほど分布の形を細かく区別できる「ものさし」で、平均からのずれで測ると、2次が広がり、3次が左右への傾き、4次が裾の重さを表します。

**期待値**（Expected Value）$E[X]$ は確率による加重平均です。サイコロ（1〜6が等確率）の期待値は $(1+2+3+4+5+6)/6 = 3.5$ です。一般形：

$$\\begin{aligned}E[X] &= \\sum_x x \\cdot P(X=x) && \\text{（離散）} \\\\ E[X] &= \\int_{-\\infty}^{\\infty} x f(x)\\,dx && \\text{（連続）}\\end{aligned}$$

**分散**（Variance）$\\text{Var}(X) = E[(X - \\mu)^2]$ は「期待値からのズレの二乗の平均」で、広がりを表します。この定義式を展開すると計算で便利な形が導かれます：

$$\\begin{aligned}\\text{Var}(X) &= E[(X-\\mu)^2] \\\\ &= E[X^2 - 2\\mu X + \\mu^2] \\\\ &= E[X^2] - 2\\mu E[X] + \\mu^2 \\\\ &= E[X^2] - (E[X])^2\\end{aligned}$$

（途中で $E[X] = \\mu$、$E[2\\mu X] = 2\\mu E[X]$ という期待値の線形性を使っています。）標準偏差は $\\sigma = \\sqrt{\\text{Var}(X)}$ です。

期待値は $X$ の期待値、分散の計算式に出てくる $E[X^2]$ は $X^2$ の期待値でした。これを一般化した $E[X^n]$ を**$n$ 次モーメント**（Moment）と呼びます。


モーメントには、$E[X^n]$ をそのまま使う**生モーメント**と、平均からのずれ $E[(X-\\mu)^n]$ を使う**中心モーメント**の2種類があります。同じ次数で並べると、2つの関係がはっきりします：

| 次数 $n$ | 生モーメント $E[X^n]$ | 中心モーメント $E[(X-\\mu)^n]$ |
| --- | --- | --- |
| 1 | 期待値 $\\mu$ | 常に $0$ |
| 2 | $E[X^2]$ | **分散 $\\sigma^2$** |
| 3 | $E[X^3]$ | 歪度の分子 |
| 4 | $E[X^4]$ | 尖度の分子 |

🎯 この表がモーメントの要点です。**(a) 分散は2次中心モーメント**です（さきほど $E[X^2]-(E[X])^2$ まで展開した式と $E[(X-\\mu)^2]$ は同じものを指しています）。**(b) 1次中心モーメントは必ず0**になります（平均からのずれそのものの平均は0になるため）。そのため中心モーメントは2次から意味を持ちます。3次中心モーメントを $\\sigma^3$ で割ったものが**歪度**（分布の左右の非対称さ）、4次中心モーメントを $\\sigma^4$ で割ったものが**尖度**（裾の重さ）です。詳細は次のモジュールで学びます。

[[f-same-moments]]

---

### 4. 期待値・分散の基本性質

「給与を全員一律に10万円上げたら、平均と分散はどう変わるか？」この問いへの答えが、どんな分布でも成り立つ変換のルールです。

**期待値の線形性**：定数 $a$, $b$ に対して

$$E[aX + b] = aE[X] + b$$

定数倍・定数加算は期待値の外に出せます。また分布の種類を問わず $E[X + Y] = E[X] + E[Y]$ も成立します（独立かどうか不問）。独立な場合はさらに $E[XY] = E[X] \\cdot E[Y]$ が成立します。

🎯 **押さえどころ**：期待値の線形性は $E[X]$ が有限に存在する限り成立します。期待値が存在しない分布（例：コーシー分布）では使えません。

**分散の変換公式**：

$$\\text{Var}(aX + b) = a^2\\,\\text{Var}(X)$$

$b$（平行移動）は分散に影響しません。分布の形を変えずにシフトするだけです。$a$ のスケール変換は二乗されます。

[[f-linear-transform]]

**独立な確率変数の和の分散**：$X$ と $Y$ が独立なとき：

$$\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y)$$

独立でない場合は**共分散**（Covariance：2つの変数が一緒に動く度合い。[相関・偏相関・条件付き期待値](/stats-pre1/1.5b-correlation/)で詳しく学びます）$\\text{Cov}(X,Y) = E[(X-\\mu_X)(Y-\\mu_Y)]$ が加わります：

$$\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y) + 2\\,\\text{Cov}(X, Y)$$

**連続型の端点の性質**：連続型では1点の確率がゼロなので、端点を含むか否かで確率の値は変わりません：

$$P(a < X < b) = P(a \\le X \\le b)$$

離散型では端点の扱いで確率が変わることがあるため、この性質は連続型に特有です。`,keyFormulas:[{label:`PDF の確率`,formula:`P(a \\le X \\le b) = \\int_a^b f(x)\\,dx`},{label:`CDF`,formula:`F(x) = P(X \\le x)`},{label:`期待値（連続型）`,formula:`E[X] = \\int_{-\\infty}^{\\infty} x\\,f(x)\\,dx`},{label:`分散`,formula:`\\text{Var}(X) = E[X^2] - (E[X])^2`}],quiz:[{id:`d1-1`,question:`確率密度関数（PDF）$f(x)$ の値について正しい説明はどれか？`,options:[`$f(x_0)$ は $X = x_0$ になる確率を表す`,`$f(x_0)$ は確率ではなく、区間内の積分が確率を表す`,`$f(x)$ の値域は必ず $[0,1]$ に収まる`,`$f(x_0)$ は常に1以下である`],correctAnswer:1,explanation:`連続型では特定の1点の確率は0です。$f(x)$ は確率密度であり、$P(a \\le X \\le b) = \\int_a^b f(x)dx$ という面積（積分）が確率を表します。$f(x)$ 自体は1を超えることもあります。`},{id:`d1-2`,question:`累積分布関数（CDF）$F(x) = P(X \\le x)$ の性質として誤っているものはどれか？`,options:[`$F(-\\infty) = 0$ かつ $F(\\infty) = 1$`,`連続型では微分すると PDF が得られる`,`値域は $(-\\infty, \\infty)$ である`,`単調非減少関数である`],correctAnswer:2,explanation:`CDF の値域は $[0, 1]$ です（確率なので0以上1以下）。$F(-\\infty)=0$、$F(\\infty)=1$、単調非減少は正しい性質です。連続型では $f(x) = F'(x)$ が成立します。`},{id:`d1-4`,question:`確率変数 $X$ の分散を計算する公式 $\\text{Var}(X) = E[X^2] - (E[X])^2$ を用いて、$E[X]=3$、$E[X^2]=13$ のとき分散はいくらか？`,options:[`$4$`,`$10$`,`$13$`,`$9$`],correctAnswer:0,explanation:`$\\text{Var}(X) = E[X^2] - (E[X])^2 = 13 - 3^2 = 13 - 9 = 4$ です。この公式は $\\text{Var}(X) = E[(X-\\mu)^2]$ を展開して導かれ、計算が楽になります。`},{id:`d1-21`,question:`PMF（確率質量関数）とPDF（確率密度関数）の最大の違いはどれか？`,options:[`両者に違いはない`,`PDFは値が常に1以下`,`PMFは連続型、PDFは離散型に使う`,`PMFは $P(X=x)$ が直接確率、PDFは $f(x)$ 自体が確率ではなく積分が確率`],correctAnswer:3,explanation:`PMFは離散型確率変数に使い、$P(X=k)$ が直接確率（0〜1の値）です。PDFは連続型に使い、$f(x)$ の値は密度（1を超えることもある）であり、$P(a \\le X \\le b) = \\int_a^b f(x)dx$ という積分が確率を与えます。`},{id:`d1-22`,question:`連続型確率変数 $X$ で $P(X = x_0) = 0$ となる理由はどれか？`,options:[`PDF を1点で積分すると $\\int_{x_0}^{x_0} f(x)dx = 0$ だから`,`確率変数の定義が誤っているから`,`連続分布では確率が定義されないから`,`$f(x_0) = 0$ だから`],correctAnswer:0,explanation:`連続型では確率は積分（面積）で定義されるため、$P(X=x_0) = \\int_{x_0}^{x_0} f(x)dx = 0$ です。$f(x_0) > 0$ であっても1点の確率はゼロです。この性質から連続型では端点を含むか否かで確率は変わらず、$P(a < X < b) = P(a \\le X \\le b)$ が成り立ちます（離散型では端点の扱いで確率が変わります）。`},{id:`d1-23`,question:`期待値の線形性 $E[aX + b] = aE[X] + b$ はどんな分布でも成立するか？`,options:[`すべての分布で成立する`,`$E[X]$ が有限のとき成立する`,`正規分布のみ`,`離散型のみ`],correctAnswer:1,explanation:`$E[aX+b] = aE[X] + b$ は期待値の線形性と呼ばれ、分布の種類を問わず $E[X]$ が存在（有限）すれば成立します。コーシー分布のように期待値が存在しない場合は適用できません。`},{id:`d1-24`,question:`分散の性質 $\\text{Var}(aX+b)$ はどれか？`,options:[`$a\\,\\text{Var}(X) + b$`,`$a^2\\,\\text{Var}(X) + b^2$`,`$a^2\\,\\text{Var}(X)$`,`$|a|\\,\\text{Var}(X)$`],correctAnswer:2,explanation:`$\\text{Var}(aX+b) = a^2\\,\\text{Var}(X)$ です。定数 $b$（平行移動）は分散に影響しません（分布の形を変えずにシフトするだけ）。係数 $a$ は二乗されます。なお $\\text{Var}(aX+b) = E[(aX+b-aE[X]-b)^2] = E[a^2(X-E[X])^2] = a^2\\text{Var}(X)$ と導けます。`},{id:`d1-25`,question:`生存関数 $S(x) = 1 - F(x)$ の解釈として最も適切なものはどれか？`,options:[`$x$ での PDF の値`,`CDF の逆関数`,`$x$ 以下になる確率`,`$x$ より大きい値をとる確率 $P(X > x)$`],correctAnswer:3,explanation:`生存関数 $S(x) = P(X > x) = 1 - F(x)$ は「$x$ より大きい値をとる確率」です。信頼性工学では「機器が時刻 $x$ まで故障しない確率（生存確率）」として使われ、生存時間解析の基礎となります。`},{id:`d1-26`,question:`$n$ 次モーメント $E[X^n]$ について、1次モーメント $E[X]$ は何を表すか？`,options:[`期待値（平均）`,`尖度`,`分散`,`歪度`],correctAnswer:0,explanation:`1次モーメント $E[X^1] = E[X]$ は期待値（平均）です。2次モーメント $E[X^2]$ は分散の計算に使われます。$n$ 次中心モーメント $E[(X-\\mu)^n]$ は3次が歪度、4次が尖度の計算に使われます。`},{id:`d1-27`,question:`離散型確率変数のPMFが満たすべき必要十分条件はどれか？`,options:[`$\\sum_x P(X=x) = 1$ のみ`,`$P(X=x) \\geq 0$ かつ $\\sum_x P(X=x) = 1$`,`$P(X=x) > 0$ のみ`,`$P(X=x) \\leq 1$ かつ $\\sum_x P(X=x) \\leq 1$`],correctAnswer:1,explanation:`PMFが正当な確率分布である条件は「すべての $x$ で $P(X=x) \\geq 0$（非負性）」かつ「すべての $x$ の確率を合計すると $\\sum_x P(X=x) = 1$（正規化条件）」です。この2条件を満たす関数がPMFとして使えます。`}]},{id:`1.5-dist-features`,updatedAt:`2026-05-29`,title:`分布の特性値：歪度・尖度・変動係数`,chapter:2,description:`歪度・尖度・変動係数で、分布の「形」を数値で読む3つの道具を習得します。`,content:`💡 **このモジュールで学ぶこと**

「同じ平均・分散でも、分布の形が全く違う場合があります。なぜ？」前のモジュールで期待値・分散という道具を学びました。このモジュールでは、分布の「歪み」「裾の重さ」「相対的なばらつき」を数値で読む3つの指標を習得します。3つとも統計検定準1級の出題範囲表に載っている用語です。

💡 **なぜ期待値・分散だけでは足りないのか**

「年収の平均500万円、標準偏差200万円」と言われても、それだけでは「高所得者が少数ながら分布を右へ引っ張っているのか、それとも左右対称なのか」がわかりません。2つの分布が同じ平均・分散を持ちながら形が全く違うことがあります。分布の「形」をもう一歩詳しく捉えるには、3次・4次のモーメントを使った指標を使います。

---

### 1. 歪度：分布の「左右の非対称さ」

期待値（平均）と分散（広がり）を学んだので、次は分布の「傾き（非対称さ）」を数値化します。

「年収分布」を想像してください。ほとんどの人は年収200〜600万円くらいに集まっていますが、一部の超高所得者（1億円超）が分布を右に引っ張っています。これが**右裾が長い（正の歪み）**分布です。逆に、簡単な試験の得点分布では、ほとんどの人が高得点で、一部の低得点者が左に裾を引きます。これが**左裾が長い（負の歪み）**です。

この「左右の非対称さ」を1つの数値で表したのが**歪度（わいど）**（Skewness）です。3次のべき乗を使うのは、3乗がプラス・マイナスの符号を保つからです。平均より右に外れた値（$X - \\mu > 0$）は3乗してもプラス、左に外れた値（$X - \\mu < 0$）は3乗してもマイナス。右への外れが多ければ合計がプラス、左への外れが多ければマイナスになります。これを $\\sigma^3$ で割って単位を消したものが歪度です：

$$\\text{Skewness} = \\frac{E[(X-\\mu)^3]}{\\sigma^3}$$

- **歪度 = 0**：左右対称（左右対称な釣鐘形の**正規分布**がその典型です。正規分布は[正規分布の性質](/stats-pre1/1.10-normal-dist/)で詳しく学びます）
- **歪度 > 0（右裾が長い）**：右に長い尾がある。多くの場合、平均 > 中央値になる（年収分布・地震規模など）
- **歪度 < 0（左裾が長い）**：左に長い尾がある。多くの場合、平均 < 中央値になる（簡単な試験の得点分布など）

---

### 2. 尖度：分布の「裾の重さ」

歪度で「左右の非対称さ」がわかりました。次は「分布の裾がどれだけ重いか（外れ値が出やすいか）」を表す指標を学びます。

「株価の日次変動」を想像してください。ほとんどの日は小さな変動（$\\pm 1$%以内）ですが、年に数回は大暴落や急騰（$\\pm 10$%以上）が起きます。正規分布を使うと「10%以上の変動は確率的にほぼゼロ」と予測してしまいますが、現実はそうではありません。このような「裾が重い」分布を正規分布と区別するための指標が**尖度（せんど）**（Kurtosis）です。

$$\\text{Kurtosis} = \\frac{E[(X-\\mu)^4]}{\\sigma^4}$$

4次のべき乗は常にプラスで、平均から遠い値（外れ値）ほど値が爆発的に大きくなります。つまり外れ値が多いほど尖度は大きくなります。後で学ぶ正規分布の尖度はちょうど **3** になります。「超過尖度（= 尖度 − 3）」として正規分布を基準（0）にした定義も広く使われます。

- **尖度 > 3（超過尖度 > 0）**：裾が重く外れ値が出やすい（株価変動、保険の大災害）
- **尖度 = 3（超過尖度 = 0）**：正規分布と同じ裾の重さ（比較の基準値）
- **尖度 < 3（超過尖度 < 0）**：裾が軽くなだらかな形（一様分布など）

🎯 **押さえどころ**：正規分布の歪度は 0、尖度は 3（超過尖度は 0）。この2値は、他の分布の形を測る基準になります。

[[interactive:skewkurt]]

上の図は歪度・尖度の値が異なる分布を比較したものです。正の歪度（右裾が長い形）・負の歪度（左裾が長い形）の違い、そして尖度の大小による裾の重さの変化を視覚的に確認してください。

---

### 3. 変動係数：「単位が違うデータ」を比べる

「身長のばらつき（標準偏差 6 cm）」と「体重のばらつき（標準偏差 10 kg）」単位が違うのでそのまま比べられません。また「100円のお菓子と8万円のパソコンの価格ばらつき」も絶対額では比べにくいです。

このような場合に使うのが**変動係数**（Coefficient of Variation, CV）です。標準偏差を平均で割ることで「平均を1としたときの相対的なばらつき」を求めます：

$$\\text{CV} = \\frac{\\sigma}{\\mu}$$

例えば、お菓子（平均100円、$\\sigma$ = 30円、CV = 0.30）とパソコン（平均80000円、$\\sigma$ = 10000円、CV = 0.13）なら、お菓子の方が相対的にばらつきが大きいとわかります。なお、平均 $\\mu > 0$（正の値）のときに意味のある指標です。

📖 **モーメント母関数（MGF）について**

「全次数のモーメントをまとめて扱える強力な道具・モーメント母関数（MGF）」は、正規分布などの具体的な分布と一緒に学ぶと意味が実感できます。MGF は[正規分布の性質](/stats-pre1/1.10-normal-dist/)で、点数の合計の例とともに解説します。

`,keyFormulas:[{label:`歪度`,formula:`\\text{Skewness} = \\dfrac{E[(X-\\mu)^3]}{\\sigma^3}`},{label:`尖度（ピアソン）`,formula:`\\text{Kurtosis} = \\dfrac{E[(X-\\mu)^4]}{\\sigma^4}`},{label:`超過尖度`,formula:`\\text{超過尖度} = \\dfrac{E[(X-\\mu)^4]}{\\sigma^4} - 3`},{label:`変動係数`,formula:`\\text{CV} = \\sigma / \\mu`}],quiz:[{id:`d1-3`,question:`正規分布の歪度と尖度（ピアソン定義）の値として正しい組み合わせはどれか？`,options:[`歪度 = 3、尖度 = 0`,`歪度 = 1、尖度 = 3`,`歪度 = 0、尖度 = 0`,`歪度 = 0、尖度 = 3`],correctAnswer:3,explanation:`正規分布は完全に左右対称なので歪度 = 0 です。尖度はピアソンの定義で $E[(X-\\mu)^4]/\\sigma^4 = 3$ です（3を引いた「超過尖度」を使う定義では0）。この2値が他の分布の歪度・尖度を評価するときの基準となります。`},{id:`d1-28`,question:`歪度が正（プラス）の分布の形の特徴はどれか？`,options:[`右裾が長く、高い値側に外れ値が出やすい（多くの場合、平均 > 中央値）`,`左裾が長く、右側に大きな値が少ない`,`峰が鋭く裾が薄い`,`完全に左右対称`],correctAnswer:0,explanation:`歪度が正（右歪み）の分布は右側に裾が長く伸びています。年収分布がその典型で、ほとんどの人は中〜低所得ですが、高所得者が右の裾を引きます。このとき平均は中央値より大きくなることが多いです（超高所得者が平均を引き上げるため）。歪度が負（左歪み）の場合は左裾が長くなります。`},{id:`d1-29`,question:`尖度（ピアソン定義）が3より大きい分布の特徴はどれか？`,options:[`歪度が必ず正になる`,`期待値が必ず0になる`,`正規分布より山が低く平ら`,`正規分布より裾が重い（外れ値が出やすい）`],correctAnswer:3,explanation:`尖度 > 3（超過尖度 > 0）の分布は正規分布より裾が重い形です（山も尖って見えることが多い）。株価の日次変動がその例で、ほとんどの日は小変動ですが、たまに大暴落・急騰が起きます（ファット・テール）。`},{id:`d1-6`,question:`変動係数（CV）の定義として正しいものはどれか？`,options:[`$\\sigma / \\mu$`,`$\\sigma^2 / \\mu$`,`$\\sigma / \\mu^2$`,`$\\mu / \\sigma$`],correctAnswer:0,explanation:`変動係数は $\\text{CV} = \\sigma / \\mu$ です。平均の大きさに対する標準偏差の相対的な割合を表すため、単位の異なる複数のデータのばらつきを比較するときに使います。平均が大きいほど同じ標準偏差でも相対的なばらつきは小さくなります。`},{id:`d1-41`,question:`超過尖度（excess kurtosis）の定義と正規分布での値はどれか？`,options:[`$E[(X-\\mu)^4]/\\sigma^4$、正規分布で 3`,`尖度（ピアソン） $- 3$、正規分布で 0`,`歪度 $\\div$ 尖度、正規分布で 1`,`$E[(X-\\mu)^3]/\\sigma^3$、正規分布で 0`],correctAnswer:1,explanation:`超過尖度 $=$ ピアソン尖度 $- 3$ と定義され、正規分布を基準（0）とした相対的な裾の重さを表します。超過尖度 $> 0$（ファット・テール）は外れ値が出やすい分布、$< 0$ は裾が軽い分布（一様分布など）に対応します。RやPythonのデフォルトの尖度計算は超過尖度を返すことが多いので注意が必要です。`},{id:`d1-43`,question:`製品Aの寸法（平均 50mm、標準偏差 2mm）と製品Bの重量（平均 500g、標準偏差 15g）のばらつきを比較するとき、変動係数（CV）が大きいのはどちらか？`,options:[`AもBも同じ`,`製品A（CV $= 0.04$）`,`製品B（CV $= 0.03$）`,`標準偏差が大きい製品B`],correctAnswer:1,explanation:`CV $= \\sigma / \\mu$ なので製品A：$2/50 = 0.04$（4%）、製品B：$15/500 = 0.03$（3%）。製品Aの方が平均に対する相対的なばらつきが大きいです。単位の異なるデータ（mmとg）を直接比べるには絶対値（標準偏差）ではなく相対値（CV）を使います。`},{id:`d1-51`,question:`歪度が正（右歪み）の分布でよく見られる、平均・中央値・最頻値の大小関係はどれか？`,options:[`最頻値 > 中央値 > 平均`,`平均 = 中央値 = 最頻値`,`平均 > 中央値 > 最頻値`,`中央値 > 平均 > 最頻値`],correctAnswer:2,explanation:`右歪みの分布では、右の裾に引っ張られて平均が最も大きくなります。最頻値（山の頂点）＜ 中央値（50%点）＜ 平均（外れ値の影響大）という順になることが多いです。ただし必ず成り立つ規則ではなく、歪度が正でも平均が中央値より小さい分布もあります。年収分布の例：最頻値300万円・中央値430万円・平均550万円のように、一部の高収入者が平均を右に引き上げます。`},{id:`d1-52`,question:`歪度の式で3次乗 $(X-\\mu)^3$ を使う理由はどれか？`,options:[`計算が最も簡単だから`,`2乗より値が大きくなるから`,`常に正の値になるから`,`正負の符号が保たれ、平均からどちらに外れているかを区別できるから`],correctAnswer:3,explanation:`3次乗は元の符号を保ちます（正の数の3乗はプラス、負の数の3乗はマイナス）。これにより「平均より右（プラス方向）に外れた値」と「左（マイナス方向）に外れた値」を区別して合計できます。右に外れた値の寄与が左より大きければ歪度はプラスになります。一方、4次乗（尖度に使用）は常にプラスのため方向は区別できません。`},{id:`d1-53`,question:`「全員が同じ点数を取った試験の得点データ」の変動係数（CV）はいくらか？`,options:[`1`,`無限大`,`0`,`計算不能`],correctAnswer:2,explanation:`全員が同じ値なら標準偏差 $\\sigma = 0$ なので、CV $= 0/\\mu = 0$ です。CV = 0 は「相対的なばらつきがゼロ」すなわち全データが同一値であることを意味します。逆に CV が大きいほど「平均値に対してデータの散らばりが大きい」ことを示します。`},{id:`d1-54`,question:`歪度が負（左歪み）の分布の例として最も適切なものはどれか？`,options:[`地震のマグニチュード分布`,`年収分布`,`難易度が低い試験の得点分布（ほとんどの人が高得点）`,`人口の年齢分布`],correctAnswer:2,explanation:`難易度が低い試験では、ほとんどの人が高得点（右側）に集まり、少数の低得点者が左に裾を引きます。左歪み（負の歪度）の典型例です。年収分布は右歪み（正の歪度）、地震のマグニチュードも右歪み（小さい地震が多く大きな地震が稀）です。`}]},{id:`1.5b-correlation`,updatedAt:`2026-05-29`,title:`相関・偏相関・条件付き期待値`,chapter:2,description:`相関係数・偏相関係数・全期待値の法則で、多変数の関係を分析する道具を習得します。`,content:`💡 **このモジュールで学ぶこと**

前のモジュールで1変数の分布の特性値（歪度・尖度・変動係数）を学びました。ここでは視野を2変数以上に広げます。「2変数の間にどんな線形関係があるか」を測る相関係数、「第3の変数の影響を除いた純粋な関係」を測る偏相関係数、そして「ある情報を得たとき期待値がどう変わるか」を扱う条件付き期待値を学びます。これらは後の章で学ぶ回帰分析・多変量解析すべての基礎となる考え方です。

💡 **「制御する」という発想**

相関係数は2変数の関係を測りますが、第3の変数が両者に影響していると「実際には直接の関係がないのに相関があるように見える」現象を、**擬似相関**（spurious correlation）といいます。偏相関係数と条件付き期待値はいずれも「ある変数を固定・制御したときの残りの変数の振る舞い」を見る、という共通の発想に基づいています。

---

### 1. 相関係数：2変数の線形関係の強さ

散布図に平均の位置（$\\bar{x}$、$\\bar{y}$）の線を引くと、平面が4つの区画に分かれます。各点について $(x-\\bar{x})(y-\\bar{y})$ を作ると、これは「点」と「平均の交点」を対角とする長方形の、符号つきの面積です。右上と左下の点では正、左上と右下の点では負になります。この面積を全点で平均したものが**共分散**です。

[[cov-quadrants]]

データの平均 $\\bar{x}$、$\\bar{y}$ を期待値 $\\mu_X$、$\\mu_Y$ に、「全点で平均する」を「期待値をとる」に置き換えると、確率変数の共分散 $\\text{Cov}(X, Y) = E[(X-\\mu_X)(Y-\\mu_Y)]$ になります（[確率分布の基礎](/stats-pre1/1.4-dist-basics/)の和の分散の公式に出てきたものです）。共分散は関係の向きと大きさを表しますが、単位に依存するという弱点があります。身長を cm から m に直すだけで、値は 1/100 になります。これを標準化（単位を消す）したものが**ピアソン相関係数**（Pearson Correlation Coefficient）です：

$$r_{XY} = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y}$$

- 値域は $-1 \\leq r_{XY} \\leq 1$ です。標準化（$\\sigma_X \\sigma_Y$ で割る）によって、どんな強さの線形関係も必ず $\\pm 1$ の範囲に収まるよう設計されています（コーシー・シュワルツ不等式により $|\\text{Cov}(X,Y)| \\leq \\sigma_X \\sigma_Y$ が保証されます）。
- $r = 1$：完全な正の線形関係、$r = -1$：完全な負の線形関係、$r = 0$：線形関係なし

**重要な注意**：$r = 0$（無相関）は「独立」を意味しない。たとえば $Y = X^2$（$X$ が平均0の対称分布）では $r_{XY} = 0$ でも $X$ と $Y$ の間には強い非線形の関係があります。

🎯 **つまずきやすい点**：独立 $\\Rightarrow$ 無相関（$r=0$）は、相関係数が定義できる（分散が有限な）とき成立しますが、逆（無相関 $\\Rightarrow$ 独立）は一般に成立しません。ただし多変量正規分布では「無相関 $\\Leftrightarrow$ 独立」が成立します（後の多変量分布の章で詳述）。

---

### 2. 偏相関係数：擬似相関を見破る

「アイスクリームの売上（$X$）と溺死者数（$Y$）には強い正の相関がある」しかしこれはアイスも溺死も「気温が高い夏に増える」だけで、直接の因果関係はありません。気温（$Z$）という共通の原因によって生じた**擬似相関**です。

気温（$Z$）の影響を取り除いたときの $X$ と $Y$ の純粋な関係を測るのが**偏相関係数**です。操作のイメージは「$Z$ を取り除いた残り同士の相関」です：

1. $X$ から $Z$ との線形関係を引き算した残差 $e_X$（$Z$ の影響を除いた $X$）を作る
2. $Y$ から $Z$ との線形関係を引き算した残差 $e_Y$（$Z$ の影響を除いた $Y$）を作る
3. $e_X$ と $e_Y$ の相関係数が偏相関係数

この3つの手順を、同じデータで順に描くと次のようになります。

[[resid-steps]]

この手順を3変数の相関係数 $r_{XY}, r_{XZ}, r_{YZ}$ だけで表すと：

$$r_{XY \\cdot Z} = \\frac{r_{XY} - r_{XZ} r_{YZ}}{\\sqrt{(1-r_{XZ}^2)(1-r_{YZ}^2)}}$$

アイス売上と溺死者数の例では、気温 $Z$ の影響を直線で取り除くと偏相関係数は 0 に近くなります。2つの間の相関は、ほぼ気温を通じたものだったということです（因果の有無まではこの計算だけでは言えません）。

---

### 3. 条件付き期待値と条件付き分散

「男女（$Y$）で分けたとき、それぞれの身長（$X$）の平均はどう変わるか？」条件付き確率の章で学んだ発想を期待値・分散に適用したものです。

$Y = y$ という条件のもとでの $X$ の期待値を**条件付き期待値** $E[X \\mid Y = y]$ と呼びます。「$Y = y$ とわかったとき $X$ はどの確率分布に従うか」を表す関数が**条件付き密度** $f_{X|Y}(x \\mid y)$（= $Y=y$ を固定したときの $X$ の PDF）で、これを使って期待値を計算します：

$$E[X \\mid Y = y] = \\int x \\, f_{X|Y}(x \\mid y)\\, dx$$

条件付き期待値は $y$ の値によって変わる関数です（$y = $ 男性なら男性の平均身長、$y = $ 女性なら女性の平均身長）。

**全期待値の法則（Law of Total Expectation）**：

$$E[X] = E[E[X \\mid Y]]$$

「グループ（$Y$）ごとの平均を、グループの大きさ（出現確率）で加重平均したものが全体の平均に等しい」という法則です。例：男性の平均身長 170cm（比率 60%）、女性 157cm（比率 40%）なら全体 $= 170 \\times 0.6 + 157 \\times 0.4 = 164.8$ cm。

**全分散の法則（Law of Total Variance）**：

全体の分散はどこから来るのでしょうか。先ほどの身長の例で考えます。全員の身長がばらつく理由は2つあります。

- **グループ内のばらつき**：男性同士でも身長は違う（個人差）
- **グループ間のばらつき**：男性の平均（170cm）と女性の平均（157cm）がそもそも違う

この2つを足し合わせると全体のばらつきになります：

$$\\text{Var}(X) = E[\\text{Var}(X \\mid Y)] + \\text{Var}(E[X \\mid Y])$$

- 第1項 $E[\\text{Var}(X \\mid Y)]$：群内変動（各グループ内のばらつきの平均）
- 第2項 $\\text{Var}(E[X \\mid Y])$：群間変動（グループ平均のばらつき）

具体的に計算してみます（男性 $\\sigma^2=36$、女性 $\\sigma^2=25$、比率60%/40%と仮定。全体平均は164.8cm）：

- **群内変動**：$36 \\times 0.6 + 25 \\times 0.4$ $= 21.6 + 10.0 = 31.6$
- **群間変動**：各グループ平均と全体平均の差の二乗に比率を掛けて合計し、$5.2^2 \\times 0.6 + (-7.8)^2 \\times 0.4$ $= 16.224 + 24.336 = 40.56$（男性は $170-164.8=5.2$、女性は $157-164.8=-7.8$ の差）
- **全体の分散**：$31.6 + 40.56 = 72.16$（標準偏差にすると約 8.5cm）

後の章で学ぶ分散分析（ANOVA）は、この分解を利用して「グループ間の差が偶然では説明できないほど大きいか」を検定します（$SS_{\\text{全体}} = SS_{\\text{群内}} + SS_{\\text{群間}}$）。`,keyFormulas:[{label:`ピアソン相関係数`,formula:`r_{XY} = \\dfrac{\\text{Cov}(X,Y)}{\\sigma_X \\sigma_Y}`},{label:`偏相関係数`,formula:`r_{XY\\cdot Z} = \\dfrac{r_{XY} - r_{XZ}r_{YZ}}{\\sqrt{(1-r_{XZ}^2)(1-r_{YZ}^2)}}`},{label:`条件付き期待値`,formula:`E[X \\mid Y=y] = \\int x\\,f_{X|Y}(x|y)\\,dx`},{label:`全期待値の法則`,formula:`E[X] = E[E[X\\mid Y]]`},{label:`全分散の法則`,formula:`\\begin{aligned} &\\text{Var}(X) \\\\ &= E[\\text{Var}(X\\mid Y)] + \\text{Var}(E[X\\mid Y]) \\end{aligned}`}],quiz:[{id:`d1-8`,question:`偏相関係数 $r_{XY\\cdot Z}$ が何を表すかとして正しいものはどれか？`,options:[`$Z$ の影響を除いた $X$ と $Y$ の純粋な相関`,`$X$・$Y$・$Z$ の3変数の平均相関`,`$Z$ と $X$ の相関から $Z$ と $Y$ の相関を引いたもの`,`$X$ と $Y$ の積率相関係数を $Z$ で割ったもの`],correctAnswer:0,explanation:`偏相関係数は「第3の変数 $Z$ の効果を統計的にコントロール（除去）した後の $X$ と $Y$ の関係の強さ」を測ります。例：アイス売上と溺死者数の見かけ上の相関（擬似相関）は、気温という共通原因 $Z$ の影響を除くと消えることが偏相関係数で確認できます。`},{id:`d1-9`,question:`全分散の法則 $\\text{Var}(X) = E[\\text{Var}(X|Y)] + \\text{Var}(E[X|Y])$ の2つの成分はそれぞれ何を表すか？`,options:[`系統誤差と偶然誤差`,`期待値と分散の差`,`1次・2次モーメントの差`,`グループ内のばらつきの平均とグループ平均のばらつき（分散分析の群内・群間変動に対応）`],correctAnswer:3,explanation:`$E[\\text{Var}(X|Y)]$ は「各グループ内のばらつきを平均したもの（群内変動）」、$\\text{Var}(E[X|Y])$ は「グループ平均のばらつき（群間変動）」です。分散分析のSS分解（$SS_{\\text{全体}} = SS_{\\text{群内}} + SS_{\\text{群間}}$）はこの法則の応用です。`},{id:`d1-30`,question:`全期待値の法則 $E[X] = E[E[X \\mid Y]]$ の実用的な意味として最も適切なものはどれか？`,options:[`期待値を2回計算すれば精度が上がる`,`グループ（$Y$）ごとの平均を、グループの大きさで加重平均したものが全体の平均に等しい`,`条件付き期待値は常に全体の期待値と等しい`,`$X$ と $Y$ が独立のときのみ成立する`],correctAnswer:1,explanation:`全期待値の法則は「男性の平均身長 × 男性の比率 + 女性の平均身長 × 女性の比率 = 全体の平均身長」という直感に対応します。$E[E[X \\mid Y]] = \\sum_y E[X \\mid Y=y] P(Y=y)$ という計算が全体の期待値を与えます。独立かどうかに関わらず常に成立します。`},{id:`d1-44`,question:`確率変数 $X$, $Y$ のピアソン相関係数 $r_{XY}$ の定義として正しいものはどれか？`,options:[`$\\text{Cov}(X,Y) / (\\sigma_X \\sigma_Y)$`,`$\\text{Cov}(X,Y) / \\sigma_X$`,`$\\text{Cov}(X,Y)$`,`$E[XY]$`],correctAnswer:0,explanation:`ピアソン相関係数は $r_{XY} = \\text{Cov}(X,Y) / (\\sigma_X \\sigma_Y)$ です。共分散を両変数の標準偏差の積で割ることで単位が消え、$-1 \\leq r \\leq 1$ の無次元の指標になります（コーシー・シュワルツ不等式 $|\\text{Cov}(X,Y)| \\leq \\sigma_X \\sigma_Y$ による）。`},{id:`d1-45`,question:`相関係数 $r_{XY} = 0$（無相関）が意味することとして正しいものはどれか？`,options:[`$X$ と $Y$ は独立である`,`$X$ と $Y$ の間に一切の関係がない`,`$E[XY] = 0$ である`,`$X$ と $Y$ の間に線形の関係がない`],correctAnswer:3,explanation:`無相関（$r=0$）は「線形関係がない」ことを意味するにすぎません。例えば $Y = X^2$（$X$ が平均0の対称分布）では $r_{XY} = 0$ でも $X$ と $Y$ の間には強い非線形関係があります。独立 $\\Rightarrow$ 無相関は成立しますが、逆は一般には成立しません（多変量正規分布では成立します）。`},{id:`d1-46`,question:`$r_{XY} = 0.7$、$r_{XZ} = 0.5$、$r_{YZ} = 0.5$ のとき、偏相関係数 $r_{XY \\cdot Z}$ はいくらか？`,options:[`$0.25$`,`$0.45$`,`$0.60$`,`$0.70$`],correctAnswer:2,explanation:`$r_{XY \\cdot Z} = (r_{XY} - r_{XZ}r_{YZ}) / \\sqrt{(1-r_{XZ}^2)(1-r_{YZ}^2)} = (0.7 - 0.5 \\times 0.5) / \\sqrt{(1-0.25)(1-0.25)} = 0.45 / \\sqrt{0.75^2} = 0.45 / 0.75 = 0.60$。$Z$ の影響を除くと元の相関 0.7 から 0.60 に下がります。`},{id:`d1-47`,question:`条件付き期待値 $E[X \\mid Y = y]$ の説明として正しいものはどれか？`,options:[`$X$ と $Y$ の積の期待値`,`$Y = y$ と観測されたときの $X$ の平均（条件付き確率分布に基づく）`,`$Y$ の期待値を $X$ で割ったもの`,`すべての $y$ で同じ値をとる定数`],correctAnswer:1,explanation:`$E[X \\mid Y = y]$ は「$Y = y$ という情報を得たときの $X$ の条件付き確率分布 $f_{X|Y}(x|y)$ に基づく期待値」です。例えば $Y = $ 性別のとき $E[身長 \\mid Y = 男性]$ は「男性の平均身長」を意味します。$y$ の値によって異なる値をとる $y$ の関数です。`},{id:`d1-48`,question:`男性（比率60%・平均身長170cm）と女性（比率40%・平均身長157cm）のとき、全期待値の法則で全体の平均身長はいくらか？`,options:[`$163.5$cm`,`$163.8$cm`,`$164.8$cm`,`$165.2$cm`],correctAnswer:2,explanation:`$E[\\text{身長}] = E[E[\\text{身長} \\mid \\text{性別}]] = 170 \\times 0.6 + 157 \\times 0.4 = 102 + 62.8 = 164.8$cm。男性比率60%・女性比率40%での加重平均です。全期待値の法則は「グループ分けして計算した後にグループの確率で加重平均する」操作です。`},{id:`d1-49`,question:`独立な確率変数 $X$, $Y$ の共分散 $\\text{Cov}(X,Y)$ と相関係数 $r_{XY}$ はそれぞれいくらか？`,options:[`$\\text{Cov}=1,\\ r=1$`,`$\\text{Cov}=0,\\ r=0$`,`$\\text{Cov}=0,\\ r=1$`,`$\\text{Cov}=1,\\ r=0$`],correctAnswer:1,explanation:`独立な確率変数については $\\text{Cov}(X,Y) = E[XY] - E[X]E[Y] = E[X]E[Y] - E[X]E[Y] = 0$（独立なら $E[XY]=E[X]E[Y]$）。相関係数はその定義より $r_{XY} = 0/(\\sigma_X \\sigma_Y) = 0$ です。独立 $\\Rightarrow$ 無相関（$r=0$）は、相関係数が定義できる（分散が有限な）とき成立します。`},{id:`d1-50`,question:`全分散の法則 $\\text{Var}(X) = E[\\text{Var}(X \\mid Y)] + \\text{Var}(E[X \\mid Y])$ で、「群間変動」に対応する項はどれか？`,options:[`$\\text{Var}(X)$ 全体`,`$E[\\text{Var}(X \\mid Y)]$（各グループ内のばらつきの平均）`,`$\\text{Var}(E[X \\mid Y])$（グループ平均のばらつき）`,`両項の積`],correctAnswer:2,explanation:`$\\text{Var}(E[X \\mid Y])$ は「グループごとの平均 $E[X \\mid Y=y]$ がどれだけばらついているか」すなわち群間変動です。一方 $E[\\text{Var}(X \\mid Y)]$ は「各グループ内のばらつきを平均したもの」（群内変動）です。ANOVAの $SS_{\\text{群間}} / SS_{\\text{全体}}$（$\\eta^2$）の分解がこの法則に対応します。`}]},{id:`1.6-binomial`,updatedAt:`2026-05-29`,title:`離散分布の基礎：二項・超幾何・一様分布`,chapter:3,description:`「成功・失敗の繰り返し」から生まれる離散分布（ベルヌーイ・二項・超幾何）と離散一様分布を整理します。`,content:`💡 **このモジュールで学ぶこと**

「サイコロの目はどれが出やすいか？」「新薬の治験で10人に投与したとき、何人に効果が出るか？」このような「数を数える（離散型の）」データには、試行の条件によって使う分布が変わります。このモジュールでは、最もシンプルな「離散一様分布」から出発し、「成功か失敗か」の繰り返しから生まれるベルヌーイ分布・二項分布・超幾何分布を具体例とともに学びます。

---

### 1. 離散一様分布：最もシンプルな離散分布

「公正なサイコロを1回振ったときの目の数」どの値も全く同じ確率で出る場合が**離散一様分布**（Discrete Uniform Distribution）です。

$X$ が $1, 2, \\ldots, n$ の値を等確率でとるとき：

$$P(X = k) = \\frac{1}{n}, \\quad k = 1, 2, \\ldots, n$$

期待値 $E[X] = \\frac{n+1}{2}$（例：サイコロは $7/2 = 3.5$）、分散 $\\text{Var}(X) = \\frac{n^2-1}{12}$。

[[f-uniform]]

乱数生成・ゲーム理論・くじ引きなど、すべての選択肢が等確率の場面の基本分布です。

---

### 2. ベルヌーイ試行とベルヌーイ分布

ここからは「成功か失敗か」の2択に注目します。コインを1回投げて表（成功）か裏（失敗）かを見るような「2択の1回勝負」を**ベルヌーイ試行**と呼びます。

これを記述するのが**ベルヌーイ分布**（Bernoulli Distribution）です。成功確率を $p$（$0 < p < 1$）とすると：

$$P(X = 1) = p, \\quad P(X = 0) = 1-p$$

期待値は「成功なら1、失敗なら0」なので $E[X] = 1 \\times p + 0 \\times (1-p) = p$。分散は $X^2 = X$（0か1の二乗はもとの値と同じ）なので $E[X^2] = p$ となり、分散は次のとおりです：

$$\\text{Var}(X) = E[X^2] - (E[X])^2 = p - p^2 = p(1-p)$$

[[f-bernoulli]]

---

### 3. 二項分布：「復元あり」の繰り返し

ベルヌーイ試行を**互いに独立に**（以前の結果に影響されず）$n$ 回繰り返したときの「成功回数」が従う分布が**二項分布**（Binomial Distribution）$B(n, p)$ です。「10回中何回成功するか」という問いに答えます：

$$P(X = k) = {}_{n}\\mathrm{C}_{k} p^k (1-p)^{n-k}, \\quad k = 0, 1, \\ldots, n$$

$\\,{}_{n}\\mathrm{C}_{k}$ は「$n$ 回のうち、どの $k$ 回で成功するかの選び方の数」で、高校で習う組み合わせの記号と同じです（例：$\\,{}_{5}\\mathrm{C}_{2} = 10$）。大学の教科書や英語の文献では同じものを $\\binom{n}{k}$ と書くこともあります。

期待値 $E[X] = np$、分散 $\\text{Var}(X) = np(1-p)$。

[[f-binomial]]

🎯 **押さえどころ**：$n$ が大きいと組み合わせの数が膨大になり、二項分布の確率をそのまま計算するのは大変です。そこで、形の似た別の分布で近似します。どちらも後のモジュールで詳しく学ぶので、ここでは「近似できる」ことが分かれば十分です。

- **$p$ が小さいとき**（めったに起きないことを数える）：次のモジュールで学ぶ**[ポアソン分布](/stats-pre1/1.7-poisson/)**で近似できます。ポアソン分布は「平均 $\\lambda$ 回起きる稀な出来事が、実際に何回起きるか」を表す分布で、$\\lambda = np$ とおくと二項分布とほぼ同じ形になります（少数法則）。
- **$np$ と $n(1-p)$ がどちらも大きいとき**（目安はどちらも5以上）：上の図の $n = 50$ のように山が左右対称の釣鐘形に近づくので、後のモジュールで学ぶ釣鐘形の分布＝**[正規分布](/stats-pre1/1.10-normal-dist/)**で近似できます。そうなる理由は[大数の法則と中心極限定理](/stats-pre1/1.11-lln-clt/)で説明します。

---

### 4. 超幾何分布：「復元なし」の繰り返し

「袋に赤玉5個・青玉10個。無作為に4個取り出したとき、赤玉が $k$ 個入っている確率は？」これが**超幾何分布**（Hypergeometric Distribution）の典型的な状況です。二項分布との決定的な違いは「**復元なし**（取り出した玉を戻さないため、毎回の成功確率が変わる）」という点です。

母集団 $N$ 個のうち $K$ 個が特定の種類（成功）。そこから $n$ 個を無作為に（復元なしで）取り出したとき、特定の種類が $k$ 個入る確率：

$$P(X = k) = \\frac{{}_{K}\\mathrm{C}_{k} \\times {}_{N-K}\\mathrm{C}_{n-k}}{{}_{N}\\mathrm{C}_{n}}$$

期待値 $E[X] = nK/N$（二項分布の $np$ に相当）、分散は：

$$\\text{Var}(X) = n \\cdot \\frac{K}{N} \\cdot \\frac{N-K}{N} \\cdot \\frac{N-n}{N-1}$$

係数 $\\dfrac{N-n}{N-1}$ を**有限母集団修正**（FPC: Finite Population Correction）と呼びます。$n \\geq 2$ なら1未満なので、分散は対応する二項分布 $B(n,\\ K/N)$ の分散より小さくなります。母集団 $N$ が大きければ（$n/N < 5\\%$）超幾何分布は二項分布で近似できます。これが「復元なし ≈ 母集団が非常に大きければ復元ありと同じ」という直感に対応します。

[[f-hypergeo]]`,keyFormulas:[{label:`二項分布 PMF`,formula:`P(X=k) = {}_{n}\\mathrm{C}_{k} p^k (1-p)^{n-k}`},{label:`二項分布の期待値・分散`,formula:`E[X] = np,\\quad \\text{Var}(X) = np(1-p)`},{label:`超幾何分布 PMF`,formula:`P(X=k) = \\dfrac{{}_{K}\\mathrm{C}_{k} \\times {}_{N-K}\\mathrm{C}_{n-k}}{{}_{N}\\mathrm{C}_{n}}`},{label:`離散一様分布`,formula:`E[X] = \\dfrac{n+1}{2},\\quad \\text{Var}(X) = \\dfrac{n^2-1}{12}`}],quiz:[{id:`dis1-1`,question:`二項分布 $B(n, p)$ の分散として正しいものはどれか？`,options:[`$np^2$`,`$n^2p$`,`$np$`,`$np(1-p)$`],correctAnswer:3,explanation:`二項分布の期待値は $np$、分散は $np(1-p)$ です。$p = 0.5$ のとき分散が最大になります。$p \\to 0$ または $p \\to 1$ のときに分散が 0 に近づく（結果がほぼ確定する）という直感とも一致します。`},{id:`dis1-5`,question:`袋に赤玉6個・白玉4個（計10個）。無作為に3個取り出す（復元なし）。赤玉が2個入っている確率はいくらか？`,options:[`$\\,{}_{6}\\mathrm{C}_{2} \\cdot (0.6)^2 \\cdot (0.4)^1$`,`$(0.6)^2 \\cdot 0.4$`,`$\\,{}_{10}\\mathrm{C}_{3} (0.6)^2 (0.4)^1$`,`$\\,{}_{6}\\mathrm{C}_{2} \\times {}_{4}\\mathrm{C}_{1}/{}_{10}\\mathrm{C}_{3}$`],correctAnswer:3,explanation:`復元なし（非復元）の抽出には超幾何分布を使います。$P(X=2) = {}_{6}\\mathrm{C}_{2} \\times {}_{4}\\mathrm{C}_{1}/{}_{10}\\mathrm{C}_{3} = 15 \\times 4 / 120 = 0.5$。復元ありなら二項分布 $B(3, 0.6)$ を使います。`},{id:`dis1-8`,question:`二項分布と超幾何分布の最大の違いは何か？`,options:[`パラメータの数の違い`,`試行回数の多さ`,`復元あり（二項）か復元なし（超幾何）かの違い`,`成功確率の大きさ`],correctAnswer:2,explanation:`二項分布は各試行が独立（復元あり）で成功確率が一定のとき使います。超幾何分布は非復元抽出（取り出すたびに母集団が変わる）のときに使います。母集団が大きければ超幾何分布は二項分布で近似できます。`},{id:`dis1-9`,question:`離散一様分布 $X \\in \\{1, 2, \\ldots, 6\\}$（サイコロ）の期待値と分散として正しいものはどれか？`,options:[`期待値 3、分散 1`,`期待値 3.5、分散 1`,`期待値 3.0、分散 3.5`,`期待値 3.5、分散 35/12`],correctAnswer:3,explanation:`離散一様分布（$1$ から $n$）の期待値は $(n+1)/2$、分散は $(n^2-1)/12$ です。$n=6$ では期待値 $= 7/2 = 3.5$、分散 $= 35/12 \\approx 2.917$。サイコロ1回振りの基本計算として定着させておきましょう。`},{id:`dis1-31`,question:`ベルヌーイ分布の期待値と分散として正しいものはどれか（成功確率 $p$）？`,options:[`期待値 $p$、分散 $p(1-p)$`,`期待値 $1/p$、分散 $(1-p)/p^2$`,`期待値 $p$、分散 $p^2$`,`期待値 $p^2$、分散 $p(1-p)$`],correctAnswer:0,explanation:`ベルヌーイ分布は $P(X=1)=p$, $P(X=0)=1-p$ の分布です。期待値 $E[X] = 1 \\times p + 0 \\times (1-p) = p$。分散 $E[X^2] - (E[X])^2 = p - p^2 = p(1-p)$。$p=1/2$ のとき分散が最大（$1/4$）になります。`},{id:`dis1-32`,question:`二項分布 $B(n,p)$ で成功が独立に繰り返されることが重要な理由はどれか？`,options:[`計算が楽になるため`,`成功と失敗の1つの並び方の確率を各回の確率の掛け算で求められ、PMFの式 $\\,{}_{n}\\mathrm{C}_{k}p^k(1-p)^{n-k}$ が成立するため`,`サンプルサイズが大きくなるため`,`正規近似が使えるため`],correctAnswer:1,explanation:`二項分布の前提は「各試行が独立（以前の結果が次に影響しない）」と「成功確率 $p$ が毎回同じ」の2つです。独立なら、例えば「成功・成功・失敗」の確率は $p \\cdot p \\cdot (1-p)$ と掛け算で求まり、並び方の数 $\\,{}_{n}\\mathrm{C}_{k}$ を掛けるとPMFになります。非復元抽出では、前に何が出たかで次の成功確率が変わる（独立でない）ので、超幾何分布を使います。`},{id:`dis1-33`,question:`二項分布 $B(10, 0.3)$ の期待値はいくらか？`,options:[`$0.3$`,`$7$`,`$3$`,`$2.1$`],correctAnswer:2,explanation:`$E[X] = np = 10 \\times 0.3 = 3$。成功確率 $p=0.3$ で10回試行すれば、平均3回成功する、という直感と一致します。分散は $np(1-p) = 10 \\times 0.3 \\times 0.7 = 2.1$。`},{id:`dis1-34`,question:`超幾何分布の期待値 $E[X] = nK/N$ が二項分布の期待値 $np$ と同じ形になる理由はどれか？`,options:[`偶然の一致`,`超幾何分布が二項分布の特殊ケースだから`,`両者は同じ分布だから`,`母集団 $N$ 個中 $K$ 個が特定種類なので「成功確率に相当する値」は $K/N$`],correctAnswer:3,explanation:`超幾何分布で $K/N$ は「母集団全体での特定種類の割合」すなわち「（復元抽出なら）1回の成功確率」です。したがって期待値 $nK/N = n \\times (K/N)$ は「試行数 × 各試行の成功確率」の形と同じです。ただし分散は有限母集団修正係数 $(N-n)/(N-1)$ が入ります。`},{id:`dis1-35`,question:`コインを5回投げて3回以上表が出る確率はどのように計算するか（$p=0.5$）？`,options:[`$P(X=3) + P(X=4) + P(X=5)$（二項分布の和）`,`ポアソン近似で計算`,`正規近似で計算`,`$\\,{}_{5}\\mathrm{C}_{3}(0.5)^3(0.5)^2$ のみ`],correctAnswer:0,explanation:`「3回以上」は $P(X \\geq 3) = P(X=3) + P(X=4) + P(X=5)$。各項を二項分布で計算すると $\\,{}_{5}\\mathrm{C}_{3}(0.5)^5 + {}_{5}\\mathrm{C}_{4}(0.5)^5 + {}_{5}\\mathrm{C}_{5}(0.5)^5 = (10+5+1)/32 = 16/32 = 0.5$。対称性（$p=0.5$）から $P(X \\geq 3) = P(X \\leq 2) = 0.5$ とも確認できます。`},{id:`dis1-36`,question:`母集団が十分大きいとき（$n/N < 5\\%$）、超幾何分布はどの分布で近似できるか？`,options:[`正規分布`,`二項分布`,`幾何分布`,`ポアソン分布`],correctAnswer:1,explanation:`非復元抽出でも $n/N$ が小さければ各試行でほぼ同じ確率 $K/N$ が保たれ、独立近似が成り立ちます。この場合 $B(n, K/N)$ で近似できます。例：日本全国100万人の母集団から100人を抽出する場合、非復元でも近似的に独立とみなせます。`}]},{id:`1.7-poisson`,updatedAt:`2026-10-14`,title:`ポアソン分布：稀な出来事の件数の分布`,chapter:3,description:`1時間の事故の件数のように、平均件数だけが分かっている稀な出来事の件数を、二項分布から作って学びます。`,content:`💡 **このモジュールで学ぶこと**

前のモジュール[離散分布の基礎](/stats-pre1/1.6-binomial/)では、「$n$ 回試して何回成功するか」を表す二項分布を学びました。

このモジュールでは、「1時間に起きる事故の件数」のような、何回試したかを数えられない件数を扱います。これを表すのがポアソン分布で、二項分布から作ることができます。

二項分布を出発点にした分布は、ほかにもあります。下の表の2行目と3行目は、次のモジュール[幾何・負の二項・多項分布](/stats-pre1/1.7b-geometric-multinomial/)で扱います。

| 分布 | 何を数えるか |
| --- | --- |
| ポアソン分布（このモジュール） | 一定の時間・範囲に、稀な出来事が何件起きるか |
| 幾何分布・負の二項分布 | 成功するまでに何回かかるか |
| 多項分布 | 結果が3種類以上あるとき、それぞれ何回出たか |

---

### どんな件数を表す分布か

「ある交差点で1時間に起きる交通事故の件数」「本1ページあたりの誤植の数」「1日に届く迷惑メールの数」。こうした件数には、共通する特徴が3つあります。

- 起きるチャンスは数えきれないほどあるのに、その1回1回ではめったに起きない
- 1件起きたかどうかが、次に起きるかどうかに影響しない
- 分かっているのは「平均して何件くらい」だけ

交差点の事故には、二項分布の「$n$ 回の試行」にあたる回数がありません。1時間のどの瞬間にも、事故は起こりうるからです。

このように、平均件数だけが分かっている稀な出来事の件数を表すのが**ポアソン分布**（Poisson Distribution）です。

- 平均件数を $\\lambda$（ラムダ）と書きます。1時間に平均2件なら $\\lambda = 2$ です
- 「$X$ は平均 $\\lambda$ のポアソン分布に従う」を $X \\sim \\text{Po}(\\lambda)$ と書きます

### 二項分布から式を作る

「$n$ 回の試行」が無いなら、作ってしまいます。1時間を $n$ 個の短い区間に区切り、区間ごとに「事故が起きる／起きない」の2択とみなします。

[[f-poisson-slice]]

区間を十分短くすれば、1つの区間に2件入ることはなくなります。すると件数は、次のように二項分布で表せます。

1. 件数＝「事故が起きた区間の数」
2. 1時間に平均 $\\lambda$ 件なので、1つの区間で起きる確率は $p = \\lambda / n$
3. よって件数は二項分布 $B(n, \\lambda/n)$ に従う

区間をどこまでも細かくする（$n \\to \\infty$）と、この二項分布の確率は次の式に近づきます。これがポアソン分布の確率関数です。

$$P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\quad k = 0, 1, 2, \\ldots$$

$e$ は自然対数の底（$e \\approx 2.718$）です。$k = 0$ を入れると、1件も起きない確率は $P(X = 0) = e^{-\\lambda}$ になります。

🔍 **式の導き方（二項分布の極限を計算する）**

先へ進むのに必要なのは、上の式と「二項分布 $B(n, \\lambda/n)$ で $n$ を大きくした極限」という成り立ちまでです。ここでは、計算の筋道を確かめたい人向けに、二項分布の確率 $\\,{}_{n}\\mathrm{C}_{k}\\, p^k (1-p)^{n-k}$ に $p = \\lambda/n$ を入れ、前半と後半に分けて $n$ を大きくします。

**前半** $\\,{}_{n}\\mathrm{C}_{k}\\, p^k$：組み合わせの数を分数で書いて並べ替えると、次のようになります。

$$\\begin{aligned} {}_{n}\\mathrm{C}_{k} \\left(\\frac{\\lambda}{n}\\right)^k &= \\frac{n(n-1)\\cdots(n-k+1)}{k!} \\cdot \\frac{\\lambda^k}{n^k} \\\\ &= \\frac{\\lambda^k}{k!} \\times \\frac{n}{n} \\times \\frac{n-1}{n} \\times \\cdots \\times \\frac{n-k+1}{n} \\end{aligned}$$

$\\dfrac{n-1}{n}$ のような分数は、$n$ が大きいとどれも1に近づきます。なので前半は $\\dfrac{\\lambda^k}{k!}$ に近づきます。

**後半** $(1-p)^{n-k}$：$e$ には「$n$ を大きくすると $(1 + a/n)^n$ が $e^{a}$ に近づく」という性質があります。$a = -\\lambda$ とおくと $(1 - \\lambda/n)^n$ は $e^{-\\lambda}$ に近づきます。指数から引いた $k$ の分 $(1 - \\lambda/n)^{-k}$ は1に近づくので、結果には影響しません。

**合わせると**：前半と後半を掛けた $\\dfrac{\\lambda^k}{k!} \\times e^{-\\lambda}$ が、ポアソン分布の式です。

🔍/

実際に区間の数 $n$ を増やすと、二項分布がポアソン分布に近づいていく様子を図で確かめます。

[[f-poisson-binom]]

この作り方を逆から見ると、「$n$ が大きく $p$ が小さい二項分布は、ポアソン分布で近似できる」ことになります。これを**少数法則**と呼びます（前のモジュール[離散分布の基礎](/stats-pre1/1.6-binomial/)の押さえどころで触れたものです）。

例えば不良品の数のように、本当に $n$ 回の試行がある場合でも使えます。$n$ が大きく $p$ が小さければ、$\\lambda = np$ のポアソン分布で計算できます。

### 計算してみる

1時間に平均2件（$\\lambda = 2$）の交差点で、1時間に起きる件数の確率は次のとおりです。

| 1時間の件数 $k$ | 確率 $P(X = k)$ |
| --- | --- |
| 0 | 0.135 |
| 1 | 0.271 |
| 2 | 0.271 |
| 3 | 0.180 |
| 4 | 0.090 |
| 5以上 | 0.053 |

1件も起きない確率は $e^{-2} \\approx 0.135$（約14%）です。3件以上起きる確率は、0〜2件の確率を1から引いて $1 - (0.135 + 0.271 + 0.271) = 0.323$ になります。

手で計算するときは、$P(X = k) = P(X = k-1) \\times \\dfrac{\\lambda}{k}$ という関係を使うと速く求まります。0件の確率から順に、$0.135 \\times \\dfrac{2}{1} = 0.271$、$0.271 \\times \\dfrac{2}{2} = 0.271$、$0.271 \\times \\dfrac{2}{3} = 0.180$ のように掛けていくだけです。

### $\\lambda$ によって形がどう変わるか

[[f-poisson]]

### 期待値と分散がどちらも $\\lambda$

ポアソン分布の期待値と分散は、どちらも $\\lambda$ に等しくなります。

$$E[X] = \\lambda, \\quad \\text{Var}(X) = \\lambda$$

これも二項分布からの作り方で確かめられます。$B(n, \\lambda/n)$ の期待値は $np = \\lambda$、分散は $np(1-p) = \\lambda(1 - \\lambda/n)$ で、$n \\to \\infty$ とすると $\\lambda$ になります。

つまり、平均が大きいほど、ばらつきも同じだけ大きくなります。上の図で $\\lambda$ が大きい山ほど横に広がっていたのは、このためです。

この性質は、実際のデータにポアソン分布を当てはめてよいかの目安になります。

- 件数データの平均と分散がほぼ等しい → ポアソン分布を当てはめてよさそう
- 分散が平均よりずっと大きい → 「1件ずつが互いに無関係に起きる」という前提が崩れている疑いがある（雨の日に事故がまとめて起きる、など）

### 足し合わせてもポアソン分布

交差点Aでは1時間に平均2件、交差点Bでは平均3件の事故が、互いに無関係に起きるとします。2つの交差点を合わせた件数は、平均 $2 + 3 = 5$ 件のポアソン分布に従います。

$$\\begin{aligned} &X \\sim \\text{Po}(\\lambda_1),\\ Y \\sim \\text{Po}(\\lambda_2) \\text{ が独立なら} \\\\ &X + Y \\sim \\text{Po}(\\lambda_1 + \\lambda_2) \\end{aligned}$$

細かい区間で考えると、これは自然です。AとBを合わせても「稀な出来事が互いに無関係に起きる」状況は変わらず、平均件数が足し算になるだけだからです。

同じ理由で、1時間に平均2件の交差点の、3時間の件数は $\\text{Po}(6)$ に従います。

このように、同じ種類の分布どうしを足すと同じ種類の分布になる性質を、**再生性**と呼びます。

📖 **確率母関数（PGF）で再生性を確かめる**

0, 1, 2, … の整数をとる分布では、確率 $P(X = k)$ を $s^k$ の係数として1本の式に並べた**確率母関数**（Probability Generating Function）を使えます。

$$G_X(s) = E[s^X] = \\sum_{k} s^k P(X = k)$$

ポアソン分布 $\\text{Po}(\\lambda)$ では $G_X(s) = \\exp\\!\\big(\\lambda(s-1)\\big)$ です。$s = 1$ で微分すると $G_X'(1) = E[X] = \\lambda$ になり、期待値が取り出せます。

独立な変数の和の確率母関数は、それぞれの積になります（$E[s^{X+Y}] = E[s^X]\\,E[s^Y]$）。交差点の例では

$$\\begin{aligned} G_{X+Y}(s) &= e^{2(s-1)} \\times e^{3(s-1)} \\\\ &= e^{5(s-1)} \\end{aligned}$$

で、これは $\\text{Po}(5)$ の確率母関数そのものです。確率母関数が同じなら分布も同じなので、合計が $\\text{Po}(5)$ に従うことが確かめられます。連続な分布でも同じことをする道具がモーメント母関数で、[正規分布の性質](/stats-pre1/1.10-normal-dist/)で学びます。

### $\\lambda$ が大きいときは正規分布で近似する

$\\lambda$ が大きいと、$P(X \\leq 20)$ のような確率は手計算では大変です。$P(X = 0)$ から $P(X = 20)$ まで、21個の確率を足すことになるからです。

一方、形の図で見たように、$\\lambda$ が大きいとポアソン分布は左右対称の釣鐘形に近づきます。そこで目安として $\\lambda \\geq 10$ なら、**正規分布**（左右対称の釣鐘形の分布。[正規分布の性質](/stats-pre1/1.10-normal-dist/)で詳しく学びます）で近似します。

使う正規分布は、ポアソン分布と同じ平均と分散を持つものです。

- 平均 $\\lambda$、分散 $\\lambda$（標準偏差 $\\sqrt{\\lambda}$）
- 正規分布を $N(\\text{平均}, \\text{分散})$ と書く記法では、$\\text{Po}(\\lambda) \\approx N(\\lambda, \\lambda)$

このとき、**連続修正**（Continuity Correction）という補正を入れます。ポアソン分布は0, 1, 2, … の整数しかとりませんが、正規分布はあらゆる実数をとる連続な分布です。整数 $k$ の確率（棒1本）を、正規分布では「$k - 0.5$ から $k + 0.5$ までの面積」に対応させます。

[[f-continuity]]

例として、1時間に平均16件（$\\lambda = 16$）のとき、20件以下になる確率を近似します。

1. 標準偏差は $\\sqrt{16} = 4$
2. 20件の棒は 20.5 までの幅を持つので、20.5 までの面積を求める
3. 平均を引いて標準偏差で割ると $z = (20.5 - 16)/4 = 1.125$
4. これを正規分布の表で読むと 0.870（表の読み方は[正規分布の性質](/stats-pre1/1.10-normal-dist/)で学びます）

正確な値は 0.868 なので、ほぼ一致します。連続修正をせずに 20 までで計算すると、$z = 1$ で 0.841 になり、ずれが大きくなります。

二項分布を正規分布で近似するとき（[離散分布の基礎](/stats-pre1/1.6-binomial/)の押さえどころ）も、同じ補正を使います。例えば $B(100, 0.5)$（平均50、標準偏差5）で $P(X \\leq 50)$ を求めるなら、50 ではなく 50.5 までの面積を求めます。

🎯 **押さえどころ**：連続修正では、求めたい整数の棒が丸ごと入るように境界を 0.5 ずらします。$P(X \\leq k)$ なら $k + 0.5$ まで、$P(X \\geq k)$ なら $k - 0.5$ から、$P(X = k)$ なら $k - 0.5$ から $k + 0.5$ までの面積です。

---

次のモジュール[幾何・負の二項・多項分布](/stats-pre1/1.7b-geometric-multinomial/)では、二項分布を別の方向に広げて、「成功するまでに何回かかるか」（幾何分布・負の二項分布）と「結果が3種類以上あるとき、それぞれ何回出たか」（多項分布）を学びます。`,keyFormulas:[{label:`ポアソン分布 PMF`,formula:`P(X=k) = \\dfrac{\\lambda^k e^{-\\lambda}}{k!}`},{label:`ポアソン分布の期待値・分散`,formula:`E[X] = \\text{Var}(X) = \\lambda`}],quiz:[{id:`dis1-2`,question:`ポアソン分布の「期待値と分散」の関係として正しいものはどれか？`,options:[`期待値 < 分散`,`期待値 = $\\lambda$、分散 = $\\lambda^2$`,`期待値 > 分散`,`期待値 = 分散 = $\\lambda$`],correctAnswer:3,explanation:`ポアソン分布の最大の特徴は期待値と分散がともに $\\lambda$ で等しいことです。実データで「平均 ≈ 分散」であればポアソン分布が適合しやすいと判断する手がかりになります。`},{id:`dis1-4`,question:`1日あたり平均3件の注文があるオンラインショップ。1日に5件以上注文が入る確率を求めるに最も適した分布はどれか？`,options:[`正規分布`,`二項分布`,`ポアソン分布`,`超幾何分布`],correctAnswer:2,explanation:`「単位時間あたり平均 $\\lambda$ 件の稀な事象の発生件数」はポアソン分布が適します。$\\lambda = 3$ として $P(X \\geq 5) = 1 - P(X \\leq 4)$ で計算します。二項分布は「何回試行して何回成功か」という状況に使います。`},{id:`dis1-6`,question:`二項分布 $B(100, 0.02)$ をポアソン近似する場合、パラメータ $\\lambda$ はいくらか？`,options:[`$0.02$`,`$50$`,`$100$`,`$2$`],correctAnswer:3,explanation:`少数法則によるポアソン近似の条件は「$n$ が大きく $p$ が小さく $\\lambda = np$ が一定」です。$\\lambda = np = 100 \\times 0.02 = 2$ となります。$n$ が大きく $p$ が小さいほど近似精度が高くなります。`},{id:`dis1-10`,question:`二項分布 $B(100, 0.5)$ で $P(X \\leq 50)$ を正規近似するとき、連続修正ありの計算式はどれか？`,options:[`$P(Z \\leq 0)$（連続修正なし）`,`$P\\left(Z \\leq \\frac{50.5 - 50}{5}\\right) = P(Z \\leq 0.1)$`,`$P\\left(Z \\leq \\frac{49.5 - 50}{5}\\right) = P(Z \\leq -0.1)$`,`$P\\left(Z \\leq \\frac{51 - 50}{5}\\right) = P(Z \\leq 0.2)$`],correctAnswer:1,explanation:`連続修正では整数値 $k$ の「$\\leq k$」を連続変数の「$\\leq k + 0.5$」に置き換えます（整数 $50$ が区間 $[49.5, 50.5)$ を代表するため）。$\\mu = np = 50$、$\\sigma = \\sqrt{np(1-p)} = 5$ として $P(Z \\leq 0.5/5) = P(Z \\leq 0.1)$。連続修正なしより精度が高くなります。`},{id:`dis1-37`,question:`ポアソン分布が二項分布の極限として導かれる「少数法則」の条件はどれか？`,options:[`$\\lambda > 10$`,`$n$ が小さく $p$ が大きい`,`$n \\to \\infty$、$p \\to 0$、$np \\to \\lambda$（一定）`,`$n$ と $p$ の両方が固定`],correctAnswer:2,explanation:`少数法則：二項分布 $B(n,p)$ で $n \\to \\infty$、$p \\to 0$ としながら $\\lambda = np$ を一定に保つ極限がポアソン分布 $\\text{Po}(\\lambda)$ です。「試行数が多く、各試行での成功確率が小さい」という条件で二項分布をポアソンで近似できます。`},{id:`dis1-39`,question:`ポアソン分布で独立な $X \\sim \\text{Po}(\\lambda_1)$ と $Y \\sim \\text{Po}(\\lambda_2)$ の和 $X+Y$ の分布はどれか？`,options:[`$\\text{Po}(\\lambda_1 + \\lambda_2)$`,`二項分布 $B(2, \\lambda_1)$`,`正規分布`,`$\\text{Po}(\\lambda_1 \\cdot \\lambda_2)$`],correctAnswer:0,explanation:`ポアソン分布の再生性：独立な $X \\sim \\text{Po}(\\lambda_1)$ と $Y \\sim \\text{Po}(\\lambda_2)$ の和は $\\text{Po}(\\lambda_1 + \\lambda_2)$ に従います。例：東口から1時間に平均3人、西口から平均5人が来るとき、両口合計は平均8人のポアソン分布になります。`},{id:`dis1-41`,question:`1時間に平均2件の事故が起きる交差点（ポアソン分布 $\\lambda = 2$）で、ある1時間に事故が1件も起きない確率に最も近いものはどれか？`,options:[`$0.135$`,`$0.271$`,`$0.5$`,`$0.865$`],correctAnswer:0,explanation:`$P(X = 0) = \\dfrac{\\lambda^0 e^{-\\lambda}}{0!} = e^{-2} \\approx 0.135$ です。$0.271$ は1件（または2件）の確率、$0.865$ は「1件以上起きる」確率 $1 - e^{-2}$ です。`},{id:`dis1-42`,question:`ポアソン分布で、$P(X = k)$ を1つ前の $P(X = k-1)$ から求めるときに掛ける数はどれか？`,options:[`$\\lambda / k$`,`$k / \\lambda$`,`$\\lambda$`,`$e^{-\\lambda}$`],correctAnswer:0,explanation:`$\\dfrac{P(X=k)}{P(X=k-1)} = \\dfrac{\\lambda^k / k!}{\\lambda^{k-1} / (k-1)!} = \\dfrac{\\lambda}{k}$ です（$e^{-\\lambda}$ は約分で消えます）。$\\lambda = 2$ なら $P(X=0) = 0.135$ から $0.135 \\times 2 = 0.271$、$0.271 \\times 2/2 = 0.271$、$0.271 \\times 2/3 = 0.180$ と順に求まります。`},{id:`dis1-43`,question:`1時間に平均2件の事故が起きる交差点がある。1時間ごとの件数は互いに独立なポアソン分布に従うとき、3時間の事故の件数はどの分布に従うか？`,options:[`$\\text{Po}(2)$`,`$\\text{Po}(6)$`,`$\\text{Po}(8)$`,`$B(3, 2/3)$`],correctAnswer:1,explanation:`独立なポアソン分布の和は、平均を足したポアソン分布になります（再生性）。1時間ごとの件数 $\\text{Po}(2)$ を3つ足すので $\\text{Po}(2 + 2 + 2) = \\text{Po}(6)$ です。`},{id:`dis1-44`,question:`ある窓口の1日の苦情件数を100日分集めたところ、平均は4.1件、分散は12.3だった。ポアソン分布を当てはめる前に最も疑うべきことはどれか？`,options:[`データが少なすぎる`,`苦情が互いに無関係に起きているという前提が崩れている（まとめて起きる日がある）`,`平均が小さすぎる`,`件数が整数でない`],correctAnswer:1,explanation:`ポアソン分布なら分散は平均とほぼ等しくなるはずです。分散が平均の約3倍もあるのは、1件ずつが互いに無関係に起きるという前提が崩れている疑いを示します（障害が起きた日に苦情が集中する、など）。このように分散が平均より大きい状態を過分散と呼びます。`}]},{id:`1.7b-geometric-multinomial`,updatedAt:`2026-10-12`,title:`幾何・負の二項・多項分布：待ち回数と多択の分布`,chapter:3,description:`成功するまでに何回かかるか、結果が3種類以上あるときそれぞれ何回出たかを、二項分布を広げて学びます。`,content:`💡 **このモジュールで学ぶこと**

前のモジュールの[ポアソン分布](/stats-pre1/1.7-poisson/)では、「一定の時間に何件起きるか」を数えました。このモジュールでは、二項分布を別の2つの方向に広げます。

- **成功するまでに何回かかるか**：1回目の成功までなら幾何分布、$r$ 回目の成功までなら負の二項分布
- **結果が3種類以上あるとき、それぞれ何回出たか**：多項分布

どちらも、1回ごとの確率が決まっていて、各回が互いに影響しない試行を繰り返す場面です。

---

### 1. 幾何分布・負の二項分布

サイコロを振り続けて、初めて6が出るのは何回目でしょうか。1回目で出ることもあれば、10回振っても出ないこともあります。

この「**初めて成功するまでの回数**」を表すのが**幾何分布**（Geometric Distribution）です。前提は、1回ごとの成功確率が $p$ で、各回が互いに影響しない試行（[離散分布の基礎](/stats-pre1/1.6-binomial/)で学んだベルヌーイ試行）を繰り返すことです。

「$k$ 回目に初めて成功する」とは、最初の $k-1$ 回がすべて失敗し（各回の確率 $1-p$）、$k$ 回目に成功する（確率 $p$）ことです。各回は互いに影響しないので、確率を掛け合わせます。

$$P(X = k) = (1-p)^{k-1} p, \\quad k = 1, 2, 3, \\ldots$$

サイコロ（$p = 1/6$）なら、1回目で6が出る確率は $1/6 \\approx 0.167$、2回目で初めて出る確率は $(5/6) \\times (1/6) \\approx 0.139$、3回目は $(5/6)^2 \\times (1/6) \\approx 0.116$ です。1回ごとに $5/6$ 倍ずつ小さくなっていきます。

[[f-geometric]]

期待値と分散は次のとおりです。

$$E[X] = \\frac{1}{p}, \\quad \\text{Var}(X) = \\frac{1-p}{p^2}$$

サイコロなら、初めて6が出るのは平均して $1/(1/6) = 6$ 回目です。

$1/p$ になる理由は、たくさん振ったときを考えるとつかめます。600回振ると、6はおよそ100回出ます。6が1回出るごとに、平均6回振っていることになります。

ただし、平均6回でも、6回で必ず出るわけではありません。6回振って一度も出ない確率は $(5/6)^6 \\approx 0.33$ あります。

成功しにくい（$p$ が小さい）ほど、待つ回数の平均もばらつきも大きくなります。

⚠️ 教科書によっては、「初めて成功するまでに何回失敗したか」（成功の回は数えない）を $X$ とすることがあります。その場合 $X$ は0から始まり、$P(X = k) = (1-p)^k p$、期待値は $(1-p)/p$ と1だけ小さくなります。問題文がどちらで数えているかを確かめてください。

#### 無記憶性：これまでの失敗は、この先に影響しない

「$n$ 回振っても6が出ない」確率は、$n$ 回続けて失敗する確率なので $P(X > n) = (1-p)^n$ です。これを使うと、すでに $m$ 回失敗したという条件のもとで、さらに $n$ 回失敗する確率は

$$\\begin{aligned} P(X > m+n \\mid X > m) &= \\frac{(1-p)^{m+n}}{(1-p)^{m}} \\\\ &= (1-p)^n = P(X > n) \\end{aligned}$$

となり、最初から $n$ 回失敗する確率と同じです。この性質を**無記憶性**（Memoryless Property）と呼びます。

例えば、5回振ってまだ6が出ていないとします。そこから3回以内に6が出る確率は $1 - (5/6)^3 \\approx 0.42$ で、振り始めたときの「3回以内に出る確率」と変わりません。「これだけ外れたのだから、そろそろ出るはず」とはならないのです。

[[f-memoryless-geo]]

連続型の分布では、次のモジュール[指数分布とガンマ分布](/stats-pre1/1.8-continuous/)で学ぶ指数分布（待ち時間を表す連続型の分布）が、同じ性質を持ちます。

#### 負の二項分布：$r$ 回成功するまでの回数

幾何分布は「1回成功するまで」でした。これを「$r$ 回成功するまで」に広げたのが**負の二項分布**（Negative Binomial Distribution）です。$r = 1$ のときが幾何分布です。

「$k$ 回目にちょうど $r$ 回目の成功が来る」とは、最後の $k$ 回目が成功で、それより前の $k-1$ 回の中に成功がちょうど $r-1$ 回あることです。前の $k-1$ 回のどこで成功するかの選び方が $\\,{}_{k-1}\\mathrm{C}_{r-1}$ 通りあるので、

$$P(X = k) = {}_{k-1}\\mathrm{C}_{r-1}\\, p^r (1-p)^{k-r}$$

（$k$ は $r, r+1, r+2, \\ldots$ のどれか）

例えばコインで表が3回出るまで投げるとき（$r = 3$、$p = 1/2$）、ちょうど5回目で終わる確率は $\\,{}_{4}\\mathrm{C}_{2} \\times (1/2)^5 = 6/32 \\approx 0.19$ です。

$r$ 回成功するまでの回数は、「1回目の成功までの回数」「そこから2回目の成功までの回数」…と、幾何分布に従う待ち回数を $r$ 個足したものです。そのため期待値と分散は幾何分布のちょうど $r$ 倍になります。

$$E[X] = \\frac{r}{p}, \\quad \\text{Var}(X) = \\frac{r(1-p)}{p^2}$$

---

### 2. 多項分布

二項分布は、1回の結果が「成功か失敗か」の2種類でした。結果が3種類以上ある場合に広げたのが**多項分布**（Multinomial Distribution）です。

工場の製品が、確率 0.7 で良品、0.2 で不良A、0.1 で不良Bになるとします。5個作ったとき、良品3個・不良A1個・不良B1個になる確率を考えます。

- 「良品・良品・良品・不良A・不良B」という特定の順番で出る確率は $0.7^3 \\times 0.2 \\times 0.1 = 0.00686$
- 5個の中で、どれが良品・不良A・不良Bになるかの並べ方は $\\dfrac{5!}{3!\\,1!\\,1!} = 20$ 通り

なので、求める確率は $20 \\times 0.00686 \\approx 0.137$ です。

一般に、$k$ 種類の結果が確率 $p_1, p_2, \\ldots, p_k$（合計1）で起きる試行を $n$ 回繰り返したとき、各結果が $x_1, x_2, \\ldots, x_k$ 回（合計 $n$）出る確率は次の式です。

$$\\begin{aligned} &P(X_1=x_1, \\ldots, X_k=x_k) \\\\ &= \\frac{n!}{x_1!\\,x_2!\\cdots x_k!}\\, p_1^{x_1} p_2^{x_2} \\cdots p_k^{x_k} \\end{aligned}$$

前の分数が並べ方の数、後ろが1つの並べ方の確率です。結果が2種類（$k = 2$）なら、並べ方の数 $\\dfrac{n!}{x_1!\\,x_2!}$ は $\\,{}_{n}\\mathrm{C}_{x_1}$ と同じになり、二項分布の式に戻ります。

1つの結果だけに注目すると、二項分布になります。例えば不良Aの個数だけを見れば、1個ごとに「不良Aか、それ以外か」の2択なので、$B(5, 0.2)$ に従います。

このように、いくつかの変数をまとめて扱う分布（同時分布）から、1つの変数だけを取り出して見た分布を**周辺分布**と呼びます。多項分布の $X_i$ の周辺分布は二項分布 $B(n, p_i)$ で、期待値は $np_i$、分散は $np_i(1-p_i)$ です。

別々の結果の個数どうしは、負の相関を持ちます。合計が $n$ 個に決まっているので、良品が多ければそのぶん不良は少なくなるからです。共分散（[相関・偏相関・条件付き期待値](/stats-pre1/1.5b-correlation/)で学びました）は $\\text{Cov}(X_i, X_j) = -np_ip_j$（$i \\neq j$）です。

多項分布は、品質管理での良品・不良の種類別の個数や、アンケートの選択肢ごとの回答数、選挙の候補者ごとの得票数などに使われます。`,keyFormulas:[{label:`幾何分布 PMF`,formula:`P(X=k) = (1-p)^{k-1}p`},{label:`幾何分布の期待値・分散`,formula:`E[X] = 1/p,\\quad \\text{Var}(X) = (1-p)/p^2`},{label:`負の二項分布の期待値・分散`,formula:`E[X] = r/p,\\quad \\text{Var}(X) = r(1-p)/p^2`},{label:`多項分布`,formula:`\\begin{aligned} &P(X_1=x_1, \\ldots, X_k=x_k) \\\\ &= \\dfrac{n!}{x_1! \\cdots x_k!}\\, p_1^{x_1} \\cdots p_k^{x_k} \\end{aligned}`}],quiz:[{id:`dis1-3`,question:`幾何分布の「無記憶性」とはどういう性質か？`,options:[`すでに何回失敗していても、そこから初めて成功するまでの残り回数の分布は、最初と同じ`,`累積分布関数が一定になる`,`期待値がパラメータ $p$ に依存しない`,`分散が0になる`],correctAnswer:0,explanation:`無記憶性とは「すでに $m$ 回失敗していても、そこから成功するまでの残り試行回数の分布は最初と同じ」という性質です。式では $P(X > m+n \\mid X > m) = P(X > n)$ です。「これだけ外れたのだから、そろそろ当たるはず」とはなりません。離散分布でこの性質を持つのは幾何分布だけです。`},{id:`dis1-7`,question:`コインを投げ続けて3回表が出るまでの試行回数の分布は何か？`,options:[`負の二項分布`,`幾何分布`,`ポアソン分布`,`二項分布`],correctAnswer:0,explanation:`「$r$ 回成功するまでの試行回数」は負の二項分布（Negative Binomial Distribution）です。幾何分布は $r=1$ の特殊ケース（最初の成功まで）です。$r=3$、$p=0.5$ の負の二項分布を使います。`},{id:`dis1-38`,question:`多項分布の各周辺分布はどの分布になるか？`,options:[`一様分布`,`ポアソン分布`,`幾何分布`,`二項分布`],correctAnswer:3,explanation:`多項分布 $(n; p_1, \\ldots, p_k)$ で $X_i$（$i$ 番目の結果の回数）の周辺分布は $B(n, p_i)$ です。$n$ 回試行して確率 $p_i$ の結果が何回出るかを単独で見ると二項分布になります。`},{id:`dis1-40`,question:`初めて成功するまでの試行回数（幾何分布）の期待値が $1/p$ になる理由の説明として、最も適切なものはどれか？`,options:[`$1/p$ 回試行すれば必ず1回は成功するので、初めての成功はそれより後にはならない`,`失敗が続くほど次の回の成功確率が上がっていき、$1/p$ 回目でちょうど確率1になる`,`初めて成功するまでの回数は、最大でも $1/p$ 回である`,`試行を長く続けると、1回あたり平均 $p$ 回の成功が起きるので、成功1回ぶんには平均 $1/p$ 回の試行が要る`],correctAnswer:3,explanation:`サイコロで6を待つなら（$p = 1/6$）、600回振ると6はおよそ100回出ます。100回の成功に600回かかるので、1回の成功までは平均6回、つまり $1/p$ 回です。「$1/p$ 回振れば必ず出る」「最大でも $1/p$ 回」は誤りで、6回振っても一度も出ない確率は $(5/6)^6 \\approx 0.33$ あります。「失敗が続くと成功しやすくなる」も誤りで、各回の成功確率はずっと $p$ のままです（無記憶性）。`},{id:`dis1-45`,question:`サイコロを振り続けるとき、3回目に初めて6が出る確率はどれか？`,options:[`$1/6$`,`$5/36$`,`$25/216$`,`$1/216$`],correctAnswer:2,explanation:`1回目と2回目が6以外（各 $5/6$）、3回目が6（$1/6$）なので $(5/6)^2 \\times (1/6) = 25/216 \\approx 0.116$ です。$5/36$ は2回目に初めて出る確率、$1/216$ は3回続けて6が出る確率です。`},{id:`dis1-46`,question:`サイコロを10回振って、一度も6が出ない確率はどれか？`,options:[`$(1/6)^{10}$`,`$1 - (5/6)^{10}$`,`$(5/6)^{10}$`,`$10/6$`],correctAnswer:2,explanation:`10回続けて6以外が出る確率なので $(5/6)^{10} \\approx 0.16$ です。幾何分布で言えば $P(X > 10) = (1-p)^{10}$ です。$1 - (5/6)^{10}$ は「10回以内に少なくとも1回6が出る」確率です。`},{id:`dis1-47`,question:`成功確率 $p$ の試行を繰り返し、「初めて成功するまでに何回失敗したか」（成功した回は数えない）を $Y$ とします。$Y$ の期待値はどれか？`,options:[`$1/p$`,`$(1-p)/p$`,`$p/(1-p)$`,`$(1-p)/p^2$`],correctAnswer:1,explanation:`成功した回まで数える幾何分布 $X$ の期待値は $1/p$ です。$Y = X - 1$ なので $E[Y] = 1/p - 1 = (1-p)/p$ です。問題文がどちらで数えているかで答えが変わるので注意します。$(1-p)/p^2$ は分散です。`},{id:`dis1-48`,question:`コインを表が3回出るまで投げ続ける。ちょうど5回目で終わる確率はどれか？`,options:[`$\\,{}_{5}\\mathrm{C}_{3} (1/2)^5$`,`$\\,{}_{4}\\mathrm{C}_{2} (1/2)^5$`,`$(1/2)^3$`,`$\\,{}_{4}\\mathrm{C}_{3} (1/2)^5$`],correctAnswer:1,explanation:`5回目が3回目の表で、それより前の4回の中に表がちょうど2回あればよいので、並び方は $\\,{}_{4}\\mathrm{C}_{2} = 6$ 通りです。確率は $6 \\times (1/2)^5 = 6/32 \\approx 0.19$ です。$\\,{}_{5}\\mathrm{C}_{3}$ では、5回目が裏の並びまで数えてしまいます。`},{id:`dis1-49`,question:`成功確率 $0.2$ の試行で、4回成功するまでの試行回数の期待値はいくらか？`,options:[`$4$`,`$5$`,`$20$`,`$80$`],correctAnswer:2,explanation:`負の二項分布の期待値は $r/p = 4 / 0.2 = 20$ です。1回成功するまでに平均 $1/0.2 = 5$ 回かかり、それを4回繰り返すと考えても $5 \\times 4 = 20$ 回になります。`},{id:`dis1-50`,question:`製品が確率0.7で良品、0.2で不良A、0.1で不良Bになる。5個作って、良品3個・不良A1個・不良B1個になる確率に最も近いものはどれか？`,options:[`$0.007$`,`$0.137$`,`$0.343$`,`$0.200$`],correctAnswer:1,explanation:`多項分布で $\\dfrac{5!}{3!\\,1!\\,1!} \\times 0.7^3 \\times 0.2 \\times 0.1 = 20 \\times 0.00686 \\approx 0.137$ です。$0.007$ は特定の1つの並び方の確率だけで、並べ方の数20を掛け忘れています。`}]},{id:`1.8-continuous`,updatedAt:`2026-10-13`,title:`指数分布とガンマ分布：待ち時間の分布`,chapter:3,description:`次の出来事までの待ち時間を表す指数分布と、α件目までの待ち時間を表すガンマ分布を、ポアソン分布とのつながりから学びます。`,content:`💡 **このモジュールで学ぶこと**

前のモジュールまでは、回数のように 0, 1, 2, … と飛び飛びの値をとる分布（離散型の分布）を学びました。ここからは、待ち時間や割合のように、連続した値をとる量の分布（連続型の分布）を学びます。このモジュールでは、待ち時間を表す2つの分布を扱います。

- **指数分布**：次の出来事までの待ち時間
- **ガンマ分布**：$\\alpha$ 件目の出来事までの待ち時間

[ポアソン分布](/stats-pre1/1.7-poisson/)は、ランダムに起きる出来事の件数を数えました。同じ場面で、件数ではなく待ち時間を測ると、この2つの分布になります。

割合や所得など、待ち時間以外の量の分布は、次の[ベータ・対数正規・コーシー分布](/stats-pre1/1.8b-ratio-lognormal-cauchy/)で学びます。

---

### 1. 指数分布：次の出来事までの待ち時間

1時間に平均3件の電話が来る窓口で、次の電話は何分後に来るでしょうか。件数がポアソン分布に従うとき、この待ち時間 $X$ は**指数分布**（Exponential Distribution）に従います。

式は、ポアソン分布から次のように作れます。

1. 待ち時間が $t$ より長いのは、長さ $t$ の時間に電話が1件も来ないときです
2. 単位時間あたりの平均件数を $\\lambda$ とすると、長さ $t$ の時間の件数は平均 $\\lambda t$ のポアソン分布に従います
3. 平均 $m$ のポアソン分布で0件の確率は $e^{-m}$ なので、$P(X > t) = e^{-\\lambda t}$ です

1からこれを引いた $F(t) = 1 - e^{-\\lambda t}$ が累積分布関数で、それを $t$ で微分すると確率密度関数になります。

$$f(t) = \\lambda e^{-\\lambda t}, \\quad t \\geq 0$$

[[f-exponential]]

窓口の例では、1分あたり $\\lambda = 3/60 = 0.05$ 件です。20分より長く待つ確率は $e^{-0.05 \\times 20} = e^{-1} \\approx 0.37$ です。

期待値と分散は次のとおりです。

$$E[X] = \\frac{1}{\\lambda}, \\quad \\text{Var}(X) = \\frac{1}{\\lambda^2}$$

1分に0.05件なら、平均の待ち時間は $1/0.05 = 20$ 分です。1時間に3件なら20分に1件の割合なので、直感とも合います。

分散が $1/\\lambda^2$ になるのは、時間の単位を変えると分かります。

1. 20分を1単位として測ると、平均1単位の指数分布（$\\lambda = 1$）になります。その分散は1です（下の参考で計算します）
2. 分に戻すには値を20倍するので、分散は $20^2 = 400$ 倍になります（[確率分布の基礎](/stats-pre1/1.4-dist-basics/)で学んだ $\\text{Var}(aX) = a^2\\,\\text{Var}(X)$ です）
3. $20 = 1/\\lambda$ なので、分散は $1/\\lambda^2$ です

標準偏差は $1/\\lambda$ で、平均と同じ大きさです。平均20分の待ち時間は、標準偏差も20分あり、ばらつきがとても大きい分布です。

🔍 **期待値と分散を積分で求める**

部分積分を使います。$t \\to \\infty$ で $t e^{-\\lambda t}$ も $t^2 e^{-\\lambda t}$ も0に近づくので、角かっこの項は0になります。

$$\\begin{aligned} E[X] &= \\int_0^\\infty t\\,\\lambda e^{-\\lambda t}\\,dt \\\\ &= \\Big[-t e^{-\\lambda t}\\Big]_0^\\infty + \\int_0^\\infty e^{-\\lambda t}\\,dt \\\\ &= \\frac{1}{\\lambda} \\end{aligned}$$

$$\\begin{aligned} E[X^2] &= \\int_0^\\infty t^2\\,\\lambda e^{-\\lambda t}\\,dt \\\\ &= \\Big[-t^2 e^{-\\lambda t}\\Big]_0^\\infty + \\int_0^\\infty 2t\\, e^{-\\lambda t}\\,dt \\\\ &= \\frac{2}{\\lambda}\\,E[X] = \\frac{2}{\\lambda^2} \\end{aligned}$$

$$\\begin{aligned} \\text{Var}(X) &= E[X^2] - (E[X])^2 \\\\ &= \\frac{2}{\\lambda^2} - \\frac{1}{\\lambda^2} = \\frac{1}{\\lambda^2} \\end{aligned}$$

🔍/

#### 無記憶性

指数分布は、[幾何分布](/stats-pre1/1.7b-geometric-multinomial/)と同じ**無記憶性**を持ちます。すでに $s$ 分待ったとき、さらに $t$ 分以上待つ確率は、最初から $t$ 分以上待つ確率と変わりません。

$$\\begin{aligned} P(X > s+t \\mid X > s) &= \\frac{e^{-\\lambda(s+t)}}{e^{-\\lambda s}} \\\\ &= e^{-\\lambda t} = P(X > t) \\end{aligned}$$

窓口で30分待って電話が来なくても、そこからさらに20分以上待つ確率は、やはり0.37です。「長く待ったから、そろそろ来るはず」とはなりません。連続型の分布で無記憶性を持つのは、指数分布だけです。

[[f-memoryless-cont]]

---

### 2. ガンマ分布：α 件目までの待ち時間

同じ窓口で、3件目の電話が来るまでの時間を考えます。1件ごとの待ち時間はどれも指数分布に従い、互いに影響しません。3件目までの時間は、その3つを足したものです。

このように、指数分布に従う独立な待ち時間を $\\alpha$ 個足した量の分布が**ガンマ分布** $\\text{Ga}(\\alpha, \\lambda)$ です。待ち時間として読めるのは $\\alpha$ が正の整数のときですが、下の式は $\\alpha = 0.5$ のような整数でない値でも使えます。

[[f-wait-total]]

確率密度関数は次の式です。$\\alpha = 1$ を入れると、指数分布の式に戻ります。

$$f(x) = \\frac{\\lambda^\\alpha}{\\Gamma(\\alpha)}\\, x^{\\alpha-1} e^{-\\lambda x}, \\quad x > 0$$

$\\Gamma(\\alpha)$ は**ガンマ関数**で、全体の面積を1にするための数です。定義は $\\Gamma(\\alpha) = \\int_0^\\infty t^{\\alpha-1} e^{-t}\\,dt$ で、次の性質を使います。

- $\\Gamma(\\alpha+1) = \\alpha\\,\\Gamma(\\alpha)$、$\\Gamma(1) = 1$
- 正の整数 $n$ では $\\Gamma(n) = (n-1)!$（例：$\\Gamma(3) = 2! = 2$）
- $\\Gamma(1/2) = \\sqrt{\\pi}$

期待値と分散は、指数分布のちょうど $\\alpha$ 倍です。$\\alpha$ が整数なら、独立な待ち時間を $\\alpha$ 個足しているので、期待値も分散も足し算になるからです。$\\alpha$ が整数でないときも、同じ式が成り立ちます。

$$E[X] = \\frac{\\alpha}{\\lambda}, \\quad \\text{Var}(X) = \\frac{\\alpha}{\\lambda^2}$$

窓口の例で3件目までなら、平均は $3/0.05 = 60$ 分です。

同じ理由で、$\\lambda$ が等しい独立なガンマ分布どうしを足すと、$\\alpha$ を足したガンマ分布になります（再生性）。2件目までの時間に、そこから3件来るまでの時間を足せば、5件目までの時間になるということです。

$$\\begin{aligned} &\\text{Ga}(\\alpha_1, \\lambda) + \\text{Ga}(\\alpha_2, \\lambda) \\\\ &= \\text{Ga}(\\alpha_1+\\alpha_2, \\lambda) \\end{aligned}$$

⚠️ 本によっては、2つ目の母数に $\\lambda$ ではなく、その逆数 $\\beta = 1/\\lambda$ を使って $\\text{Ga}(\\alpha, \\beta)$ と書きます。その場合、期待値は $\\alpha\\beta$、分散は $\\alpha\\beta^2$ です。問題文がどちらの書き方かを確かめてください。

ガンマ分布は、後で学ぶ**カイ二乗分布** $\\chi^2(k)$ とも同じ仲間で、$\\text{Ga}(k/2,\\, 1/2)$ と同じ分布です。$k$ が奇数なら $\\alpha = k/2$ は整数でなく、待ち時間としては読めないガンマ分布の例です。カイ二乗分布は、標準正規分布（平均0、分散1の正規分布）に従う独立な $k$ 個の変数の二乗和の分布で、[標本分布](/stats-pre1/1.12-sampling/)で学びます。正規分布は、平均を中心に左右対称な釣鐘形の分布で、[正規分布の性質](/stats-pre1/1.10-normal-dist/)で学びます。`,keyFormulas:[{label:`指数分布 PDF・P(X > t)`,formula:`f(t) = \\lambda e^{-\\lambda t},\\quad P(X > t) = e^{-\\lambda t}`},{label:`指数分布の期待値・分散`,formula:`E[X] = \\dfrac{1}{\\lambda},\\quad \\text{Var}(X) = \\dfrac{1}{\\lambda^2}`},{label:`無記憶性`,formula:`P(X > s+t \\mid X > s) = P(X > t)`},{label:`ガンマ分布 PDF`,formula:`f(x) = \\dfrac{\\lambda^\\alpha}{\\Gamma(\\alpha)} x^{\\alpha-1} e^{-\\lambda x}`},{label:`ガンマ分布の期待値・分散`,formula:`E[X] = \\dfrac{\\alpha}{\\lambda},\\quad \\text{Var}(X) = \\dfrac{\\alpha}{\\lambda^2}`},{label:`ガンマ関数`,formula:`\\Gamma(n) = (n-1)!,\\quad \\Gamma(1/2) = \\sqrt{\\pi}`}],quiz:[{id:`con1-1`,question:`指数分布の「無記憶性」の正しい説明はどれか？`,options:[`長く待つほど、そろそろ来るので残り時間は短くなる`,`期待値と分散が等しい`,`長く待つほど、残り時間も長くなる`,`すでにどれだけ待ったかに関わらず、残り時間の分布は最初と同じ`],correctAnswer:3,explanation:`無記憶性 $P(X>s+t \\mid X>s)=P(X>t)$ は「機械がすでに $s$ 時間動いていても、次の故障まであと $t$ 時間以上かかる確率は最初と変わらない」ことを意味します。「長く待ったから、そろそろ来るはず」は誤りです。連続型でこの性質を持つのは指数分布だけです。`},{id:`con1-2`,question:`指数分布とポアソン分布の関係として最も正しいものはどれか？`,options:[`件数がポアソン分布のとき、出来事の間隔が指数分布`,`ポアソン分布の平均 $\\lambda$ が、指数分布に従って変わる`,`指数分布に従う量を n 個足すとポアソン分布になる`,`同じ場面には現れない、無関係な分布`],correctAnswer:0,explanation:`本文の第1節のとおり、単位時間あたり平均 $\\lambda$ 件の出来事の件数がポアソン分布に従うとき、次の出来事までの待ち時間は指数分布 $\\text{Exp}(\\lambda)$ に従います。待ち時間が $t$ より長いのは長さ $t$ の間に0件のときなので、$P(X > t) = e^{-\\lambda t}$ です。同じ場面を、件数で数えるとポアソン分布、間隔で測ると指数分布になります。指数分布を足すとガンマ分布（第2節）で、ポアソン分布にはなりません。`},{id:`con1-3`,question:`ガンマ分布 $\\text{Ga}(\\alpha, \\lambda)$ で $\\alpha = 1$ のとき、何の分布と一致するか？`,options:[`一様分布`,`指数分布 $\\text{Exp}(\\lambda)$`,`ベータ分布`,`正規分布`],correctAnswer:1,explanation:`$\\alpha=1$ のとき $\\Gamma(1)=1$、$f(x) = \\lambda e^{-\\lambda x}$ となり指数分布と一致します。$\\alpha$ が整数のとき、ガンマ分布は「$\\alpha$ 件目の出来事までの待ち時間」を表し、$\\alpha=1$ は最初の1件までの待ち時間（＝指数分布）です。`},{id:`con1-13`,question:`1時間に平均6件の問い合わせが、互いに無関係にランダムに来る。次の問い合わせまでの平均の待ち時間と、15分以上待つ確率の組み合わせとして正しいものはどれか？`,options:[`平均6分、約0.37`,`平均10分、約0.78`,`平均10分、約0.22`,`平均15分、約0.37`],correctAnswer:2,explanation:`待ち時間は指数分布に従い、1分あたり $\\lambda = 6/60 = 0.1$ 件です。平均は $1/\\lambda = 10$ 分、15分以上待つ確率は $P(X > 15) = e^{-0.1 \\times 15} = e^{-1.5} \\approx 0.22$ です。0.78 は「15分以内に来る確率」$1 - e^{-1.5}$ です。`},{id:`con1-11`,question:`ガンマ分布 $\\text{Ga}(\\alpha_1, \\lambda)$ と $\\text{Ga}(\\alpha_2, \\lambda)$ が独立のとき、その和はどの分布に従うか？`,options:[`$\\text{Ga}(\\alpha_1 \\cdot \\alpha_2, \\lambda)$`,`$\\text{Ga}(\\alpha_1 + \\alpha_2, 2\\lambda)$`,`$\\text{Ga}(\\alpha_1 + \\alpha_2, \\lambda)$`,`ポアソン分布`],correctAnswer:2,explanation:`同一のレートパラメータ $\\lambda$ を持つ独立なガンマ変数の和は $\\text{Ga}(\\alpha_1+\\alpha_2, \\lambda)$ になります。$\\alpha$ が整数なら、「$\\alpha_1$ 件目までの時間」に「そこから $\\alpha_2$ 件来るまでの時間」を足すと「$\\alpha_1+\\alpha_2$ 件目までの時間」になる、と読めます。整数でないときも同じ結果が成り立ちます。`},{id:`con1-14`,question:`自由度 $k$ のカイ二乗分布は、期待値が $k$、分散が $2k$ のガンマ分布です。このガンマ分布を $\\text{Ga}(\\alpha, \\lambda)$（$\\lambda$ は単位時間あたりの件数で、期待値は $\\alpha/\\lambda$）の形で表したものはどれか？`,options:[`$\\text{Ga}(k,\\, 1)$`,`$\\text{Ga}(k/2,\\, 1/2)$`,`$\\text{Ga}(2k,\\, 2)$`,`$\\text{Ga}(k/2,\\, 2)$`],correctAnswer:1,explanation:`期待値 $\\alpha/\\lambda = k$ と分散 $\\alpha/\\lambda^2 = 2k$ の2つの式から $\\alpha$ と $\\lambda$ を求めます。分散の式を期待値の式で割ると、左辺は $(\\alpha/\\lambda^2) \\div (\\alpha/\\lambda) = 1/\\lambda$、右辺は $2k \\div k = 2$ です。よって $\\lambda = 1/2$ で、期待値の式に戻すと $\\alpha = k\\lambda = k/2$ となり、答えは $\\text{Ga}(k/2,\\, 1/2)$ です。ほかの選択肢も同じ式で確かめられます。$\\text{Ga}(k,\\, 1)$ は期待値 $k$・分散 $k$、$\\text{Ga}(2k,\\, 2)$ は期待値 $k$・分散 $k/2$ で、どちらも期待値は合っていますが分散が $2k$ になりません。$\\text{Ga}(k/2,\\, 2)$ は期待値が $(k/2) \\div 2 = k/4$ になります。ただし、2つ目の数に平均の待ち時間 $\\beta = 1/\\lambda$ を書く本もあり、その書き方では同じ分布が $\\text{Ga}(k/2,\\, 2)$ と表されます。どちらの書き方かは、期待値が $\\alpha/\\lambda$ か $\\alpha\\beta$ かで見分けます。`},{id:`con1-21`,question:`平均の待ち時間が5分の指数分布について、待ち時間の分散はいくらか？`,options:[`5`,`$1/5$`,`25`,`$1/25$`],correctAnswer:2,explanation:`平均が $1/\\lambda = 5$ なので $\\lambda = 1/5$ です。分散は $1/\\lambda^2 = 25$ です。指数分布では、標準偏差が平均と同じ5分になります。`},{id:`con1-22`,question:`次のバスまでの待ち時間が、平均10分の指数分布に従う。すでに10分待ったとき、そこからさらに10分以上待つ確率はいくらか？`,options:[`$e^{-2} \\approx 0.14$`,`$e^{-1} \\approx 0.37$`,`$1 - e^{-1} \\approx 0.63$`,`0`],correctAnswer:1,explanation:`無記憶性により、すでに待った10分は関係なく、最初から10分以上待つ確率と同じです。$\\lambda = 1/10$ なので $P(X > 10) = e^{-1} \\approx 0.37$ です。$e^{-2}$ は「最初から20分以上待つ確率」です。`},{id:`con1-23`,question:`ガンマ関数の値 $\\Gamma(5)$ はいくらか？`,options:[`5`,`4`,`120`,`24`],correctAnswer:3,explanation:`正の整数 $n$ では $\\Gamma(n) = (n-1)!$ なので、$\\Gamma(5) = 4! = 24$ です。$5! = 120$ と取り違えないように注意します。`},{id:`con1-24`,question:`1時間に平均3件の電話が、互いに無関係にランダムに来る。3件目の電話が来るまでの時間（分）の期待値と分散の組み合わせとして正しいものはどれか？`,options:[`期待値60分、分散1200`,`期待値60分、分散400`,`期待値20分、分散400`,`期待値60分、分散3600`],correctAnswer:0,explanation:`1件ごとの待ち時間は $\\lambda = 3/60 = 0.05$ の指数分布で、3件目までの時間は $\\text{Ga}(3,\\, 0.05)$ に従います。期待値は $3/0.05 = 60$ 分、分散は $3/0.05^2 = 1200$ です。分散400は1件分（$1/0.05^2$）だけの値です。`}]},{id:`1.8b-ratio-lognormal-cauchy`,updatedAt:`2026-10-13`,title:`ベータ・対数正規・コーシー分布：割合・掛け算・極端な値の分布`,chapter:3,description:`割合を表すベータ分布、掛け算で増える量を表す対数正規分布、期待値を持たないコーシー分布を学びます。`,content:`💡 **このモジュールで学ぶこと**

[指数分布とガンマ分布](/stats-pre1/1.8-continuous/)では、待ち時間の分布を学びました。このモジュールでは、待ち時間とは別の場面で使う連続型の分布を3つ学びます。

- **ベータ分布**：割合や確率（0から1の値）
- **対数正規分布**：所得や株価のように掛け算で増える量（0より大きい値）
- **コーシー分布**：極端な値がよく出る量（すべての実数）

---

### 1. ベータ分布：割合の分布

広告のクリック率や選手の打率のように、0から1の間の値をとる量があります。こうした割合がどのあたりにありそうかを表すのが**ベータ分布** $\\text{Beta}(\\alpha, \\beta)$ です。

[[f-ratio-dist]]

$$f(x) = \\frac{x^{\\alpha-1}(1-x)^{\\beta-1}}{B(\\alpha, \\beta)}, \\quad 0 < x < 1$$

分子の $x^{\\alpha-1}(1-x)^{\\beta-1}$ は、成功確率が $x$ のとき「成功 $\\alpha-1$ 回、失敗 $\\beta-1$ 回」が起きる確率と同じ形です。$\\alpha$ が大きいほど $x$ の大きい側が持ち上がり、山が右へ寄ります。

$B(\\alpha, \\beta)$ は**ベータ関数**で、全体の面積を1にするための数です。[前のモジュール](/stats-pre1/1.8-continuous/)で学んだガンマ関数を使うと $B(\\alpha, \\beta) = \\Gamma(\\alpha)\\Gamma(\\beta)/\\Gamma(\\alpha+\\beta)$ と書けます。

期待値と分散は次のとおりです。

$$\\begin{aligned} E[X] &= \\frac{\\alpha}{\\alpha+\\beta} \\\\ \\text{Var}(X) &= \\frac{\\alpha\\beta}{(\\alpha+\\beta)^2(\\alpha+\\beta+1)} \\end{aligned}$$

例えば $\\text{Beta}(2, 5)$ の期待値は $2/7 \\approx 0.29$ です。$\\alpha = \\beta = 1$ では $f(x) = 1$ となり、0から1のどこも同じ高さの一様分布になります。

ベータ分布は、[ベイズ推定](/stats-pre1/3.1-bayes/)で「成功確率がどのくらいの値でありそうか」を表す分布（事前分布）としてもよく使われます。

---

### 2. 対数正規分布：掛け算で増える量

所得や株価のように、0より大きく、一部がとても大きな値になる量があります。こうした量は、対数 $\\ln X$（$e$ を底とする自然対数。$\\ln X = a$ は $X = e^a$ と同じ）をとると正規分布に近い形になることがよくあります。正規分布は、平均を中心に左右対称な釣鐘形の分布で、[正規分布の性質](/stats-pre1/1.10-normal-dist/)で詳しく学びます。平均 $\\mu$、分散 $\\sigma^2$ の正規分布を $N(\\mu, \\sigma^2)$ と書きます。$\\ln X$ が $N(\\mu, \\sigma^2)$ に従うときの $X$ の分布が**対数正規分布** $\\text{LogN}(\\mu, \\sigma^2)$ です。$\\mu$ と $\\sigma^2$ は、$X$ ではなく $\\ln X$ の平均と分散です。

対数をとると正規分布になる理由は、掛け算にあります。株価が毎日「前の日の何倍か」で動くとすると、$n$ 日後の株価 $X_n$ は、最初の株価 $X_0$ に毎日の倍率 $r_1, r_2, \\ldots$ を掛けたものです。対数をとると、掛け算は足し算に変わります。

$$\\ln X_n = \\ln X_0 + \\ln r_1 + \\cdots + \\ln r_n$$

独立な量をたくさん足したものは正規分布に近づきます（中心極限定理。[大数の法則と中心極限定理](/stats-pre1/1.11-lln-clt/)で学びます）。なので $\\ln X_n$ は正規分布に近く、$X_n$ は対数正規分布に近くなります。

[[f-lognormal]]

期待値と分散は次のとおりです。

$$\\begin{aligned} E[X] &= e^{\\mu + \\sigma^2/2} \\\\ \\text{Var}(X) &= (e^{\\sigma^2}-1)\\,e^{2\\mu+\\sigma^2} \\end{aligned}$$

$\\mu = 0$、$\\sigma = 1$ で比べます。$\\ln X$ の真ん中の値は0なので、$X$ の真ん中の値（中央値）は $e^0 = 1$ です。一方、期待値は $e^{0.5} \\approx 1.65$ です。右に長い裾が平均を引っ張るので、平均は中央値より大きくなります。所得の平均が、真ん中の人の所得より高く出るのも同じ理由です。

---

### 3. コーシー分布：期待値を持たない分布

**コーシー分布**は、正規分布に似た左右対称の山の形をしていますが、裾がずっと重い分布です。標準的なコーシー分布の確率密度関数は次の式です。

$$f(x) = \\frac{1}{\\pi(1 + x^2)}, \\quad -\\infty < x < \\infty$$

[[f-cauchy]]

$x$ が大きくなっても、密度は $1/x^2$ くらいの速さでしか小さくなりません。正規分布の $e^{-x^2/2}$ よりずっと遅いので、極端な値がよく出ます。

この裾の重さのために、コーシー分布には**期待値も分散もありません**。期待値を計算する積分 $\\int |x|\\, f(x)\\,dx$ が無限大になるからです。

🔍 **積分が無限大になる理由**

$x$ が大きいところでは、$|x|\\, f(x) = \\dfrac{|x|}{\\pi(1+x^2)}$ はほぼ $\\dfrac{1}{\\pi |x|}$ です。$1/x$ を積分すると $\\ln x$ になり、$x$ を大きくするといくらでも大きくなるので、積分は収束しません。

🔍/

期待値が無いので、大数の法則（データを増やすほど標本平均が母平均に近づく）も成り立ちません。コーシー分布に従う独立な $n$ 個の値の平均は、$n$ をいくら増やしても、元と同じコーシー分布に従います。1万個の平均をとっても、1個だけ見たときと散らばり方が変わりません。

そのため、コーシー分布の真ん中を推定するときは、平均ではなく中央値を使います。

コーシー分布は、自由度1の $t$ 分布（[標本分布](/stats-pre1/1.12-sampling/)で学びます）と同じ分布です。また、標準正規分布に従う独立な2つの変数の比 $Z_1 / Z_2$ も、コーシー分布に従います。`,keyFormulas:[{label:`ベータ分布 PDF`,formula:`f(x) = \\dfrac{x^{\\alpha-1}(1-x)^{\\beta-1}}{B(\\alpha,\\beta)}, \\quad 0<x<1`},{label:`ベータ分布の期待値`,formula:`E[X] = \\dfrac{\\alpha}{\\alpha+\\beta}`},{label:`対数正規分布の期待値`,formula:`E[X] = e^{\\mu + \\sigma^2/2}`},{label:`コーシー分布 PDF`,formula:`f(x) = \\dfrac{1}{\\pi(1+x^2)}`}],quiz:[{id:`con1-25`,question:`$\\text{Beta}(3, 7)$ に従う確率変数の期待値はいくらか？`,options:[`0.3`,`0.43`,`0.5`,`0.7`],correctAnswer:0,explanation:`ベータ分布の期待値は $\\alpha/(\\alpha+\\beta)$ なので、$3/(3+7) = 0.3$ です。$3/7 \\approx 0.43$ は分母を $\\beta$ だけにした誤りです。`},{id:`con1-26`,question:`ベータ関数 $B(2, 3)$ の値はいくらか？`,options:[`$1/6$`,`6`,`$1/12$`,`$1/24$`],correctAnswer:2,explanation:`$B(\\alpha, \\beta) = \\Gamma(\\alpha)\\Gamma(\\beta)/\\Gamma(\\alpha+\\beta)$ を使います。$\\Gamma(2) = 1$、$\\Gamma(3) = 2$、$\\Gamma(5) = 24$ なので、$B(2, 3) = 1 \\times 2/24 = 1/12$ です。`},{id:`con1-27`,question:`ベータ分布 $\\text{Beta}(\\alpha, \\beta)$ で、$\\beta$ を変えずに $\\alpha$ を大きくすると、分布の山はどうなるか？`,options:[`0に近い側へ寄る`,`1に近い側へ寄る`,`位置は変わらず、幅だけが広がる`,`0から1の全体で平らになる`],correctAnswer:1,explanation:`密度の分子 $x^{\\alpha-1}(1-x)^{\\beta-1}$ で、$\\alpha$ が大きいほど $x$ の大きい側が持ち上がります。期待値 $\\alpha/(\\alpha+\\beta)$ も大きくなり、山は1に近い側へ寄ります。`},{id:`con1-12`,question:`ベータ分布 $\\text{Beta}(1, 1)$（$\\alpha=\\beta=1$）はどの分布と一致するか？`,options:[`コーシー分布`,`指数分布`,`標準正規分布`,`$[0, 1]$ 上の一様分布`],correctAnswer:3,explanation:`$\\alpha=\\beta=1$ のとき $f(x) = 1/(B(1,1)) = 1$（$0<x<1$）となり、$[0,1]$ 上の一様分布になります。ベータ分布は一様分布を含む広いファミリーで、比率・割合データのモデルに使われます。`},{id:`con1-4`,question:`対数正規分布に従う確率変数 $X$ の特徴として正しいものはどれか？`,options:[`左右対称な分布をする`,`負の値をとることがある`,`$\\ln X$ が正規分布に従う`,`期待値と分散が等しい`],correctAnswer:2,explanation:`対数正規分布の定義は「$\\ln X \\sim N(\\mu, \\sigma^2)$」です。$X$ 自体は必ず正の値をとり、右裾が重い（正の歪度）形になります。株価・所得・企業規模など「掛け算で成長する量」のモデルによく使われます。`},{id:`con1-28`,question:`$\\ln X$ が $N(0, 1)$（平均0、分散1の正規分布）に従うとき、$X$ の中央値と期待値の組み合わせとして正しいものはどれか？`,options:[`中央値1、期待値約1.65`,`中央値約1.65、期待値1`,`中央値も期待値も1`,`中央値0、期待値1`],correctAnswer:0,explanation:`$\\ln X$ の中央値は0なので、$X$ の中央値は $e^0 = 1$ です。期待値は $e^{\\mu + \\sigma^2/2} = e^{0.5} \\approx 1.65$ です。右に長い裾が平均を引っ張るので、期待値は中央値より大きくなります。`},{id:`con1-29`,question:`株価のように「前の日の何倍か」で動く量が、対数正規分布に近くなる理由として最も適切なものはどれか？`,options:[`値が必ず0から1の間に入るから`,`対数をとると倍率の掛け算が足し算になり、中心極限定理で正規分布に近づくから`,`毎日の倍率がすべて等しいから`,`値の期待値が存在しないから`],correctAnswer:1,explanation:`$n$ 日後の値は、最初の値に毎日の倍率を掛けたものです。対数をとると $\\ln X_n = \\ln X_0 + \\ln r_1 + \\cdots + \\ln r_n$ と足し算になり、中心極限定理により $\\ln X_n$ は正規分布に近づきます。そのため $X_n$ は対数正規分布に近くなります。`},{id:`con1-15`,question:`対数正規分布 $X \\sim \\text{LogN}(\\mu, \\sigma^2)$ の期待値はいくらか？`,options:[`$\\mu$`,`$e^\\mu$`,`$e^{\\mu + \\sigma^2/2}$`,`$e^{\\mu - \\sigma^2/2}$`],correctAnswer:2,explanation:`本文の式のとおり $E[X] = e^{\\mu + \\sigma^2/2}$ です。$\\mu = 0$、$\\sigma = 1$ なら $e^{0.5} \\approx 1.65$ でした。$e^{\\mu}$ は中央値（$\\ln X$ の真ん中 $\\mu$ を戻した値）で、右に長い裾が平均を引っ張るぶん、期待値はそれより $e^{\\sigma^2/2}$ 倍大きくなります。$\\mu$ は $X$ ではなく $\\ln X$ の平均です。`},{id:`con1-8`,question:`コーシー分布の特徴として正しいものはどれか？`,options:[`期待値が0で分散が1`,`正規分布より裾が軽い`,`期待値・分散が定義されない（発散する）`,`$t$ 分布の自由度無限大の極限`],correctAnswer:2,explanation:`本文のとおり、密度が $1/x^2$ くらいの速さでしか小さくならず、期待値を計算する積分が無限大になるので、期待値も分散もありません。裾は正規分布よりずっと重く、極端な値がよく出ます。本文の最後にあるとおり、コーシー分布は自由度1の $t$ 分布と同じです。`},{id:`con1-30`,question:`標準コーシー分布に従う独立な $n$ 個の値の標本平均は、どの分布に従うか？`,options:[`$n$ が大きいと $N(0, 1/n)$ に近づく`,`$n$ が大きいと0に収束する`,`自由度 $n$ の $t$ 分布`,`$n$ に関係なく、元と同じ標準コーシー分布`],correctAnswer:3,explanation:`コーシー分布には期待値が無いので、大数の法則も中心極限定理も成り立ちません。$n$ 個の平均は、$n$ をいくら増やしても元と同じコーシー分布に従います。真ん中を推定するときは、平均ではなく中央値を使います。`}]},{id:`1.10-normal-dist`,updatedAt:`2026-10-14`,title:`正規分布の性質`,chapter:4,description:`平均と標準偏差で決まる形、標準化と確率の求め方、和と1次変換をしても正規分布のままである性質、それを示すモーメント母関数（MGF）を学びます。`,content:`💡 **このモジュールで学ぶこと**

身長や測定の誤差のように、平均のあたりに値が多く集まり、平均から離れるほど少なくなる「鐘の形」の分布は、統計学のあらゆる場面で登場します。なぜ多くのデータが正規分布に近い形になるのか、そして正規分布をどう数式で扱うのかを学びます。

### 1. 正規分布：自然界の「鐘の形」

まず、具体的な場面を想像してください。

ある集団の身長を1万人分測り、ヒストグラムを描いたとします。平均は **170cm**、標準偏差は **6cm** だったとします（説明のための数字です）。グラフを描くと、真ん中（170cm付近）が最も多く、そこから遠ざかるほど人数が少なくなる、左右対称の山形になります。

この「鐘の形」が **正規分布**（Normal Distribution）です。身長に限らず、模試の点数・精密機械の製造誤差・気温のばらつきなど、自然界や社会の多くのデータが、この形に近くなります。

**正規分布の確率密度関数（PDF）：**

確率密度関数とは「グラフの面積が確率になる関数」です。$f(x)$ の値そのものは確率ではありません。「164cm〜176cm の確率は？」と聞かれたら、その区間の面積（グラフの下の領域）を計算します。

$$f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp \\left( -\\frac{(x-\\mu)^2}{2\\sigma^2} \\right)$$

$\\mu$（ミュー）は**平均**（分布の中心）、$\\sigma^2$（シグマ二乗）は**分散**（データの広がり具合）を表します。この2つだけで形が完全に決まるのが正規分布の大きな特徴です。平均 $\\mu$、分散 $\\sigma^2$ の正規分布を $N(\\mu, \\sigma^2)$ と書きます。

次の図のように、$\\mu$ を変えると山は形を変えずに左右へ動き、$\\sigma$ を大きくすると山は低く横に広がります。

[[f-normal-params]]

多くのデータがこの形に近くなる理由は、**中心極限定理**（次のモジュールで学びます）で説明できます。独立な小さい要因がたくさん足し合わさってできる量は、正規分布に近い形になるからです。

$X$ から $Z = (X-\\mu)/\\sigma$ という変換をすると、$Z$ は平均0・分散1の**標準正規分布** $N(0,1)$ に従います（**標準化**）。確率を求めるときはこの変換で標準正規分布表に帰着させるのが基本操作です。

例えば、身長が180cm以上の人の割合を求めます。$Z = (180 - 170)/6 \\approx 1.67$ なので、標準正規分布表から $P(Z \\ge 1.67) \\approx 0.048$、つまり約4.8%です。

[[f-standardize]]

💡 **68-95-99.7のルール：身長の例で覚えよう**

正規分布では、平均からどれくらい離れた範囲に何パーセントのデータが入るかが決まっています。先ほどの身長（$\\mu=170$cm, $\\sigma=6$cm）で確認しましょう：

- $\\mu \\pm 1\\sigma$（164〜176cm）：全体の約 **68.3%**
- $\\mu \\pm 2\\sigma$（158〜182cm）：全体の約 **95.4%**。この範囲の外は、両側を合わせて約4.6%
- $\\mu \\pm 3\\sigma$（152〜188cm）：全体の約 **99.7%**。この範囲の外は、両側を合わせて約0.3%

[[f-normal-areas]]

🎯 **押さえどころ**：「$\\pm 1.96\\sigma$ の範囲に **95%** のデータが入る」という値は、後の章で学ぶ95%信頼区間の公式に、$1.96$ という係数としてそのまま現れます。

📖 **1次変換や足し算をしても正規分布のまま**

点数を換算したり、2科目を合計したりしたとき、平均と分散がどう変わるかは[確率分布の基礎](/stats-pre1/1.4-dist-basics/)で学んだ式のとおりです（$\\text{Var}(aX + b) = a^2\\,\\text{Var}(X)$、独立なら $\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y)$）。正規分布で新しく言えるのは、**変換した後も正規分布のまま**だということです。だから変換した後の確率も、標準化して同じ表で求められます。

**① 何倍かして、何点か足す（1次変換）**

点数 $X$ が $N(50, 100)$（平均50点・標準偏差10点）に従うとき、全員を2倍して10点足すと、平均は $50 \\times 2 + 10 = 110$ 点、標準偏差は $10 \\times 2 = 20$ 点で、$N(110, 400)$ に従います。一般には次の形です。

$$aX + b \\sim N(a\\mu + b,\\; a^2\\sigma^2)$$

[[f-normal-affine]]

前の節の標準化 $Z = (X - \\mu)/\\sigma$ も、この1次変換の1つです。

**② 2つを足す（再生性）**

数学の点数が $N(60, 100)$（標準偏差10点）、英語の点数が $N(55, 64)$（標準偏差8点）で、2つが独立だとします。合計点の平均は $60 + 55 = 115$ 点、分散は $100 + 64 = 164$ で、標準偏差は $\\sqrt{164} \\approx 12.8$ 点です。

標準偏差どうしを足した18点にはなりません。18点になるのは、数学で高く出た人が英語でも必ず同じだけ高く出る、完全に連動する場合だけです。独立なら、ずれの一部が打ち消し合うので18点より小さくなります。

$$X + Y \\sim N(\\mu_1 + \\mu_2,\\; \\sigma_1^2 + \\sigma_2^2)$$

同じ種類の分布に従うものを足しても同じ種類の分布になる性質を**再生性**と呼びます。合計点も正規分布なので、例えば合計140.6点以上（平均より標準偏差2つ分上）の割合は約2.3%と、標準正規分布の表から求められます。

**③ 差をとる**

点差（数学 − 英語）は、平均 $60 - 55 = 5$ 点、分散は引かずに $100 + 64 = 164$ の正規分布です。英語のずれは、引き算でも打ち消されずに点差のばらつきとして残るからです（①で $a = -1$ とすると、分散は $(-1)^2 = 1$ 倍で変わりません）。

$$X - Y \\sim N(\\mu_1 - \\mu_2,\\; \\sigma_1^2 + \\sigma_2^2)$$

②と③の山を並べると、合計と点差は同じ幅で、標準偏差を足した18点の山より細くなります。

[[f-normal-plus]]

正規分布の歪度は0、尖度は3です。[分布の特性値](/stats-pre1/1.5-dist-features/)で学んだように、ほかの分布の歪みや裾の重さは、この正規分布を基準にして測ります。

📖 **（発展）モーメント母関数（MGF）**

上で見た「独立な正規分布の和も正規分布になる」ことは、**なぜそう言えるのか**。それを証明する道具が **モーメント母関数（MGF）** です。

$$M_X(t) = E\\left[e^{tX}\\right]$$

$t$ の関数で、[ポアソン分布](/stats-pre1/1.7-poisson/)の確率母関数 $E[s^X]$ の $s$ を $e^t$ に置き換えたものにあたります。次の3つの性質を使います。

- $t = 0$ で微分すると期待値が出る：$M_X'(0) = E[X]$（2回微分すると $E[X^2]$）。期待値などのモーメントを生み出すので、この名前です
- 独立な変数の和では積になる：$M_{X+Y}(t) = E[e^{tX}]\\,E[e^{tY}] = M_X(t)\\,M_Y(t)$
- MGF が同じなら、分布も同じ

正規分布 $N(\\mu, \\sigma^2)$ の MGF は次の形です（積分で求まりますが、計算は省きます）。$t = 0$ で微分すると $\\mu$ になり、1つ目の性質と合います。

$$M_X(t) = \\exp\\!\\left(\\mu t + \\frac{\\sigma^2 t^2}{2}\\right)$$

上の点数の例で、合計点 $Z = X + Y$（$X \\sim N(60, 100)$、$Y \\sim N(55, 64)$、独立）が $N(115, 164)$ になることを確かめます。

上の2つ目の性質（独立な和のMGFは積）を使います。

$$\\begin{aligned} M_Z(t) &= \\exp\\!\\left(60t + \\frac{100t^2}{2}\\right) \\\\ &\\quad \\times \\exp\\!\\left(55t + \\frac{64t^2}{2}\\right) \\\\ &= \\exp\\!\\left(115t + \\frac{164t^2}{2}\\right) \\end{aligned}$$

この形は $N(115, 164)$ のMGFと完全一致 → **合計点は $N(115, 164)$ に従う**と証明できます。

🎯 **押さえどころ**：正規分布のMGFの形 $\\exp\\!\\left(\\mu t + \\frac{\\sigma^2 t^2}{2}\\right)$ は、正規分布を見分ける目印になります。「このMGFはどの分布か」という識別は、MGFが分布を一意に決めるという性質の典型的な使い方です。

`,keyFormulas:[{label:`正規分布 PDF`,formula:`f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp\\!\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)`},{label:`平均から 1.96 標準偏差の範囲に入る確率`,formula:`\\begin{aligned} &P(\\mu-1.96\\sigma \\le X \\le \\mu+1.96\\sigma) \\\\ &= 0.95 \\end{aligned}`},{label:`MGF（正規分布）`,formula:`M_X(t) = \\exp\\!\\left(\\mu t + \\frac{\\sigma^2 t^2}{2}\\right)`}],quiz:[{id:`q1a-1`,question:`身長が $N(170, 6^2)$ に従うとき、180cm以上の人の割合に最も近いものはどれか？（標準正規分布表より $P(Z \\ge 1.67) = 0.0475$）`,options:[`約1%`,`約5%`,`約16%`,`約32%`],correctAnswer:1,explanation:`$Z = (180 - 170)/6 \\approx 1.67$ と標準化すると、$P(X \\ge 180) = P(Z \\ge 1.67) \\approx 0.048$ で約5%です。約16%は $Z \\ge 1$（176cm以上）の割合、約32%は $\\pm 1\\sigma$ の外側（164cm未満と176cm超）を合わせた割合です。`},{id:`q1a-2`,question:`数学の点数 $X \\sim N(60, 100)$ と英語の点数 $Y \\sim N(55, 64)$ が独立のとき、点差 $X - Y$ が従う分布はどれか？`,options:[`$N(5, 36)$`,`$N(5, 164)$`,`$N(115, 164)$`,`$N(5, 4)$`],correctAnswer:1,explanation:`平均は引き算で $60 - 55 = 5$、分散は引かずに足して $100 + 64 = 164$ です。$-Y$ の分散は $(-1)^2 \\times 64 = 64$ なので、引き算でもばらつきは増えます。$N(5, 36)$ は分散を引いた誤り、$N(5, 4)$ は標準偏差を引いた誤り、$N(115, 164)$ は合計点の分布です。`},{id:`q1a-3`,question:`モーメント母関数が $\\exp(\\mu t + \\frac{1}{2}\\sigma^2 t^2)$ で表される分布は？`,options:[`二項分布`,`ポアソン分布`,`指数分布`,`正規分布`],correctAnswer:3,explanation:`正規分布 $N(\\mu, \\sigma^2)$ のMGFは $M_X(t) = \\exp(\\mu t + \\sigma^2 t^2/2)$ です。MGFの形が分布を一意に特定するため、この式を見たら正規分布と識別できます。`},{id:`q1a-4`,question:`$X \\sim N(50, 100)$ のとき、$Y = 2X + 10$ が従う分布はどれか？`,options:[`$N(110, 400)$`,`$N(110, 200)$`,`$N(100, 400)$`,`$N(110, 210)$`],correctAnswer:0,explanation:`平均は $2 \\times 50 + 10 = 110$、分散は $2^2 \\times 100 = 400$ です。足した10は分布を動かすだけで、ばらつきは変えません。$N(110, 200)$ は分散に2をそのまま掛けた誤り、$N(100, 400)$ は平均に10を足し忘れた誤り、$N(110, 210)$ は分散にも10を足した誤りです。`},{id:`q1a-5`,question:`標準正規分布 $N(0,1)$ において $P(-1.96 \\leq Z \\leq 1.96) \\approx$ いくらか？`,options:[`約 $0.683$`,`約 $0.950$`,`約 $0.997$`,`約 $0.500$`],correctAnswer:1,explanation:`$P(-1.96 \\leq Z \\leq 1.96) \\approx 0.950$ です。1.96 は上側の確率が2.5%になる点（上側2.5%点）で、両側の外側を合わせると5%になります。0.954 は $\\pm 2$ の範囲の確率です。$\\pm 1$ は68.3%、$\\pm 2.58$ は99%に対応します。`},{id:`q1a-6`,question:`$X \\sim N(50, 100)$（平均50、分散100）のとき、$P(30 \\leq X \\leq 70)$ はおよそいくらか？`,options:[`約50%`,`約68%`,`約95%`,`約99.7%`],correctAnswer:2,explanation:`$\\sigma=\\sqrt{100}=10$ なので $\\pm 2\\sigma$ の範囲は $50 \\pm 20 = [30, 70]$ です。68-95-99.7ルールより $\\pm 2\\sigma$ には約95.4%が含まれます。`},{id:`q1a-7`,question:`正規分布の再生性として正しいものはどれか？`,options:[`$n$ 乗した変数も正規分布に従う`,`標本平均は必ず正規分布に従う`,`平均と分散を変えても形が変わらない`,`独立な正規分布に従う変数の和も正規分布に従う`],correctAnswer:3,explanation:`$X \\sim N(\\mu_1, \\sigma_1^2)$、$Y \\sim N(\\mu_2, \\sigma_2^2)$ が独立ならば $X+Y \\sim N(\\mu_1+\\mu_2, \\sigma_1^2+\\sigma_2^2)$ となります（再生性）。MGFを使って $M_{X+Y}(t)=M_X(t)M_Y(t)$ で証明できます。`},{id:`q1a-8`,question:`独立な $X \\sim N(60, 100)$ と $Y \\sim N(55, 64)$ の合計 $X + Y$ の標準偏差はおよそいくらか？`,options:[`18`,`164`,`約 12.8`,`約 6.0`],correctAnswer:2,explanation:`独立なら分散が足されて $100 + 64 = 164$、標準偏差は $\\sqrt{164} \\approx 12.8$ です。18 は標準偏差 10 と 8 をそのまま足した誤りで、2つが完全に連動するときにしか成り立ちません。164 は分散のままです。`},{id:`q1a-9`,question:`正規分布 $N(\\mu, \\sigma^2)$ を標準化した $Z = (X-\\mu)/\\sigma$ はどの分布に従うか？`,options:[`$N(0, \\sigma^2)$`,`$N(0, 1)$（標準正規分布）`,`$t$ 分布`,`$N(\\mu, \\sigma^2)$`],correctAnswer:1,explanation:`$Z = (X-\\mu)/\\sigma$ は平均0・分散1の標準正規分布 $N(0,1)$ に従います。この変換を「標準化」と呼び、正規分布表を使うための基本操作です。`},{id:`q1a-10`,question:`確率変数 $X$ のモーメント母関数が $M_X(t) = \\exp(3t + 2t^2)$ のとき、$X$ が従う分布はどれか？`,options:[`$N(3, 2)$`,`$N(2, 3)$`,`$N(3, 4)$`,`$N(3, 16)$`],correctAnswer:2,explanation:`正規分布のMGFは $\\exp\\!\\left(\\mu t + \\frac{\\sigma^2 t^2}{2}\\right)$ です。$\\mu = 3$、$\\frac{\\sigma^2}{2} = 2$ より $\\sigma^2 = 4$ なので $N(3, 4)$ です。$t^2$ の係数をそのまま分散と読むと $N(3, 2)$ と誤ります。`}]},{id:`1.9-multivariate`,updatedAt:`2026-10-17`,title:`多変量正規分布：相関をもつ正規分布と条件付き分布`,chapter:4,description:`相関をもつ2つ以上の量をまとめて扱う多変量正規分布を学びます。一方が分かったときのもう一方の分布、合計や差のばらつき、無相関と独立の関係、マハラノビス距離を、図と計算例で。`,content:`💡 **このモジュールで学ぶこと**

身長と体重のように、相関をもつ2つ以上の量をまとめて扱う**多変量正規分布**を学びます。読み終えると、次のことができるようになります。

- 身長が分かったときの、体重の予想とばらつきを計算する
- 2科目の合計点や差のばらつきを、相関から計算する
- 「無相関なら独立」が言えるのはどんなときかを説明する
- どの点が珍しいかを、相関を考えた距離で測る

---

### 1. 2つの量をまとめて表す

#### 散らばりは楕円になる

身長が高い人ほど体重も重い傾向があります。2つの量を組で表した分布が**多変量正規分布**（2つなら2変量正規分布）で、点は楕円の形に散らばります。

[[f-bivariate]]

#### 形を決める5つの数

| 決める数 | 図で決まるもの |
|---|---|
| 平均 $\\mu_X, \\mu_Y$ | 楕円の中心 |
| 分散 $\\sigma_X^2, \\sigma_Y^2$ | 横と縦の広がり |
| 相関係数 $\\rho$ | 楕円の傾きと細さ |

散らばりを決める3つの数（$X$ の分散、$Y$ の分散、2つの共分散 $\\rho\\sigma_X\\sigma_Y$）は、決まった位置に並べて1つの表にまとめます。行と列にそれぞれ $X, Y$ を割り当て、交わるマスにその組み合わせの値を書きます。この表を**分散共分散行列** $\\Sigma$ と呼びます。

[[f-cov-matrix]]

$$\\Sigma = \\begin{pmatrix} \\sigma_X^2 & \\rho\\sigma_X\\sigma_Y \\\\ \\rho\\sigma_X\\sigma_Y & \\sigma_Y^2 \\end{pmatrix}$$

右上と左下は「$X$ と $Y$」「$Y$ と $X$」で組み合わせの順が違うだけなので、必ず同じ値です。最初の散布図の2つは、平均がどちらも0、分散がどちらも1で、相関だけが違います。

平均を並べた $\\boldsymbol{\\mu}$（平均ベクトル）と合わせて $N_2(\\boldsymbol{\\mu}, \\Sigma)$ と書きます。変数が $p$ 個なら $\\Sigma$ は $p$ 行 $p$ 列になり、並べ方は同じです（$N_p(\\boldsymbol{\\mu}, \\Sigma)$）。

#### 1つずつ見ると普通の正規分布

$X$ だけ、$Y$ だけを見ると、相関がいくつでも普通の正規分布です（**周辺分布**）。相関は、2つの値の組み合わせ方にだけ表れます。

[[f-marginal]]

---

### 2. 一方が分かったら、もう一方はどうなる？

#### 身長で切ると、体重の分布が見える

身長（平均170cm、標準偏差6cm）と体重（平均65kg、標準偏差8kg）の相関が0.5だとします。身長を1つの値に決めて縦に切ると、その身長の人たちの体重の分布（**条件付き分布**）が見えます。

[[f-conditional]]

図から次の3つが読み取れます。

1. 切った所の体重も正規分布（山の形）
2. 山の中心は、身長が高いほど黒の直線に沿って上がる
3. 山の幅は全体（灰の点線、8kg）より狭く、どの身長で切っても同じ

#### 式で書くと

$$\\begin{aligned} E[Y \\mid X = x] &= \\mu_Y + \\rho\\,\\frac{\\sigma_Y}{\\sigma_X}\\,(x - \\mu_X) \\\\ \\text{Var}(Y \\mid X = x) &= \\sigma_Y^2\\,(1 - \\rho^2) \\end{aligned}$$

- **平均**（黒の直線）：$x$ が平均より標準偏差いくつぶん高いかを求め、その $\\rho$ 倍だけ、$Y$ の標準偏差の単位で上げる
- **分散**（山の幅）：$x$ を含まないので、どこで切っても同じ。全体の分散のうち $\\rho^2$ の割合が身長で説明され、残り $1 - \\rho^2$ が残る

#### 身長176cmの人で計算する

| 手順 | 計算 | 結果 |
|---|---|---|
| 平均より標準偏差いくつぶん高いか | $(176 - 170)/6$ | 1 |
| 体重の平均の上がり幅 | $0.5 \\times 1 \\times 8$ | 4kg |
| 体重の平均 | $65 + 4$ | 69kg |
| 体重の分散 | $64 \\times (1 - 0.5^2)$ | 48（標準偏差 約6.9kg） |

身長が分かると、体重の予想は65kgから69kgに動き、ばらつきは8kgから約6.9kgに小さくなります。黒の直線は、後で学ぶ[重回帰分析とモデル評価](/stats-pre1/2.1-regression/)の回帰直線と同じ式です。

---

### 3. 合計や差はどう散らばる？

#### 点を移しても楕円のまま

2科目の合計点 $X + Y$ や差 $X - Y$ のように、何倍かして足し合わせることを**線形変換**と呼びます。相関0.7の $(X, Y)$ を、点ごとに $U = X + Y$、$V = X - Y$ に移します。

[[f-linear-uv]]

1. 移した後も楕円で、多変量正規分布のまま
2. 合計 $U$ は大きく散らばり、差 $V$ は小さく散らばる
3. $U$ と $V$ の相関は0になる

#### 合計と差の分散

$$\\begin{aligned} \\text{Var}(X + Y) &= \\sigma_X^2 + \\sigma_Y^2 + 2\\rho\\sigma_X\\sigma_Y \\\\ \\text{Var}(X - Y) &= \\sigma_X^2 + \\sigma_Y^2 - 2\\rho\\sigma_X\\sigma_Y \\end{aligned}$$

正の相関があると、大きい値どうし・小さい値どうしが組になりやすいので、合計は大きく散らばり、差は小さく散らばります。図の例（分散1ずつ、相関0.7）では、合計の分散が $1 + 1 + 1.4 = 3.4$、差の分散が $1 + 1 - 1.4 = 0.6$ です。

**例**：数学（標準偏差10点）と英語（標準偏差15点）の相関が0.6のとき、合計点の分散は $100 + 225 + 2 \\times 0.6 \\times 10 \\times 15 = 505$ で、標準偏差は約22.5点です。相関0なら $\\sqrt{325} \\approx 18.0$ 点です。

#### まとめて書くと

変換を行列 $A$ で書くと、平均と分散共分散行列はまとめて次の式で求まります（$\\mathbf{b}$ は全体をずらす定数）。図の例は $A = \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$ で、計算すると $A\\Sigma A^\\top = \\begin{pmatrix} 3.4 & 0 \\\\ 0 & 0.6 \\end{pmatrix}$ となり、対角が上の2つの分散、右上と左下の0が「相関0」です。

$$A\\mathbf{X} + \\mathbf{b} \\sim N(A\\boldsymbol{\\mu} + \\mathbf{b},\\ A\\Sigma A^\\top)$$

---

### 4. 相関0なら独立と言えるか

#### 多変量正規分布なら言える

独立とは「一方を知っても、もう一方の分布が変わらない」ことです。第2節の図を、相関0と0.5で並べます。

[[f-independent-slices]]

第2節の式で $\\rho = 0$ とおくと、平均は $\\mu_Y$、分散は $\\sigma_Y^2$ で、どちらも $x$ によらず全体と同じです。だから多変量正規分布では、無相関なら独立です。

#### それぞれが正規分布なだけでは言えない

$X$ と $Y$ がそれぞれ正規分布に従うだけでは足りず、2つが**まとめて**多変量正規分布に従うことが条件です。

**例**：$X$ が $N(0, 1)$ に従い、$S$ は $X$ と独立に $+1$ か $-1$ を確率1/2ずつとるとします。$Y = SX$ とおくと、$Y$ も $N(0, 1)$ に従い、相関は0です。

[[f-uncorr-dependent]]

$X = 1.5$ と分かれば $Y$ は $1.5$ か $-1.5$ に絞られるので、独立ではありません。点が楕円に散らばっていないので、2変量正規分布でもありません。

---

### 5. どの点が珍しいか：マハラノビス距離

#### ふつうの距離では測れない

外れ値を見つけるときや、新しいデータがどのグループに近いかを決めるとき（[判別分析](/stats-pre1/2.3-discriminant/)）は、点がどれだけ珍しいかを測ります。相関があると、中心からの距離が同じでも、方向によって珍しさが違います。

[[f-mahalanobis]]

#### 相関で補正した距離

散らばりに沿った楕円で測る距離が**マハラノビス距離**です。2変数で、$z_X = (x - \\mu_X)/\\sigma_X$、$z_Y = (y - \\mu_Y)/\\sigma_Y$ とすると、次の式です。

$$d^2 = \\frac{z_X^2 - 2\\rho\\, z_X z_Y + z_Y^2}{1 - \\rho^2}$$

| 点 | $z_X$ | $z_Y$ | ふつうの距離 | マハラノビス距離 $d$ |
|---|---|---|---|---|
| P | 1.2 | 1.2 | 1.70 | 1.30 |
| Q | 1.2 | $-1.2$ | 1.70 | 3.10 |

散らばりの向きに沿う P は、$-2\\rho z_X z_Y$ の分だけ小さくなり、横切る Q は大きくなります。$\\rho = 0$ なら $d^2 = z_X^2 + z_Y^2$ で、ふつうの距離（の2乗）と同じです。

🔍 **多変量正規分布の密度の式**

1変数の正規分布の密度は $\\exp(-\\frac{1}{2}z^2)$ に比例し、中心からの距離 $z$ で高さが決まりました。多変量正規分布も同じで、$z^2$ をマハラノビス距離 $d^2$ に置き換えた形です。$d^2$ を分散共分散行列で書くと $(\\mathbf{x}-\\boldsymbol{\\mu})^\\top \\Sigma^{-1}(\\mathbf{x}-\\boldsymbol{\\mu})$ になります。

$$\\begin{aligned} f(\\mathbf{x}) &= \\frac{1}{(2\\pi)^{p/2}|\\Sigma|^{1/2}} \\\\ &\\times \\exp\\!\\left(-\\tfrac{1}{2}(\\mathbf{x}-\\boldsymbol{\\mu})^\\top \\Sigma^{-1}(\\mathbf{x}-\\boldsymbol{\\mu})\\right) \\end{aligned}$$

前の分数は、全体の確率を1にするための定数です。等高線（密度が同じ点）は $d^2$ が同じ点なので、楕円になります。

🔍/`,keyFormulas:[{label:`2変量正規分布の条件付き分布`,formula:`\\begin{aligned} E[Y \\mid X = x] &= \\mu_Y + \\rho\\,\\tfrac{\\sigma_Y}{\\sigma_X}(x - \\mu_X) \\\\ \\text{Var}(Y \\mid X = x) &= \\sigma_Y^2(1 - \\rho^2) \\end{aligned}`},{label:`和と差の分散`,formula:`\\text{Var}(X \\pm Y) = \\sigma_X^2 + \\sigma_Y^2 \\pm 2\\rho\\sigma_X\\sigma_Y`},{label:`線形変換`,formula:`A\\mathbf{X} + \\mathbf{b} \\sim N(A\\boldsymbol{\\mu} + \\mathbf{b},\\ A\\Sigma A^\\top)`},{label:`マハラノビス距離（2変数）`,formula:`d^2 = \\dfrac{z_X^2 - 2\\rho\\, z_X z_Y + z_Y^2}{1 - \\rho^2}`},{label:`多変量正規分布 PDF`,formula:`\\begin{aligned} &f(\\mathbf{x}) = \\frac{1}{(2\\pi)^{p/2}|\\Sigma|^{1/2}} \\\\ &\\times \\exp\\!\\left(-\\tfrac{1}{2}(\\mathbf{x}-\\boldsymbol{\\mu})^\\top \\Sigma^{-1}(\\mathbf{x}-\\boldsymbol{\\mu})\\right) \\end{aligned}`}],quiz:[{id:`con1-5`,question:`多変量正規分布において「相関係数が0」が意味することは何か？`,options:[`分散が等しい`,`周辺分布が等しい`,`統計的独立（一般の分布でも成立）`,`統計的独立（多変量正規分布では成立）`],correctAnswer:3,explanation:`相関が0なら、$X = x$ と決めたときの $Y$ の分布は平均 $\\mu_Y$、分散 $\\sigma_Y^2$ で、$x$ がいくつでも全体の分布と同じです（本文4節の図で、相関0の切り口がどれも同じ形だったこと）。$X$ を知っても $Y$ の分布が変わらないので独立です。ただし、これは $X$ と $Y$ がまとめて多変量正規分布に従うときだけです。それぞれが正規分布なだけなら、$Y = SX$ の例のように相関0でも独立でないことがあり、一般の分布でも無相関だから独立とは言えません。`},{id:`con1-31`,question:`身長 $X$（平均170cm、標準偏差6cm）と体重 $Y$（平均65kg、標準偏差8kg）が、相関係数0.5の2変量正規分布に従います。身長176cmの人の体重の条件付き期待値はいくらか？`,options:[`65 kg`,`69 kg`,`73 kg`,`68 kg`],correctAnswer:1,explanation:`$E[Y \\mid X = x] = \\mu_Y + \\rho\\,(\\sigma_Y/\\sigma_X)(x - \\mu_X) = 65 + 0.5 \\times (8/6) \\times 6 = 69$ kg です。73 kg は $\\rho$ を掛け忘れた値、68 kg は $\\sigma_Y/\\sigma_X$ を掛け忘れた値、65 kg は身長の情報を使っていない値です。`},{id:`con1-19`,question:`多変量正規分布 $\\mathbf{X} \\sim N_p(\\boldsymbol{\\mu}, \\Sigma)$ に対し、線形変換 $\\mathbf{Y} = A\\mathbf{X} + \\mathbf{b}$（$A$ は定数行列）の分布はどれか？`,options:[`$t$ 分布`,`カイ二乗分布`,`多変量正規分布`,`分布は特定できない`],correctAnswer:2,explanation:`本文3節の和と差がこの例です。$A = \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$ なら $A\\mathbf{X}$ は $(X + Y,\\, X - Y)$ の組で、これも多変量正規分布に従います。平均は $A\\boldsymbol{\\mu} + \\mathbf{b}$、分散共分散行列は $A\\Sigma A^\\top$ です。1変数で $aX + b$ が正規分布のままなのと同じで、足したり定数倍したりしても正規分布の形は崩れません。`},{id:`mvn-1`,question:`2変量正規分布で、$X$ と $Y$ の分散がどちらも1、相関係数が $\\rho = 0.7$ のとき、等高線（同じ確率密度の点を結んだ線）はどんな形か？`,options:[`円`,`右上がりの楕円`,`右下がりの楕円`,`縦長の楕円`],correctAnswer:1,explanation:`正の相関があると、$X$ が大きいほど $Y$ も大きくなりやすいので、等高線は右上がりに傾いた楕円になります。$\\rho = 0$ なら円、負の相関なら右下がりの楕円です。$\\rho$ の絶対値が1に近いほど、楕円は細くなります。`},{id:`mvn-2`,question:`$X$ と $Y$ が2変量正規分布に従い、分散はどちらも1、相関係数は0.5です。$X - Y$ の分散はいくらか？`,options:[`1`,`2`,`3`,`0.5`],correctAnswer:0,explanation:`$\\text{Var}(X - Y) = \\sigma_X^2 + \\sigma_Y^2 - 2\\rho\\sigma_X\\sigma_Y = 1 + 1 - 2 \\times 0.5 = 1$ です。差では共分散の符号が負になります。3 は和 $X + Y$ の分散と取り違えた値、2 は相関を無視した値です。`},{id:`mvn-3`,question:`体重 $Y$ の標準偏差が8kg、身長 $X$ との相関係数が0.5の2変量正規分布で、身長を1つの値に決めたときの体重の条件付き分散はいくらか？`,options:[`48`,`64`,`32`,`16`],correctAnswer:0,explanation:`$\\text{Var}(Y \\mid X = x) = \\sigma_Y^2(1 - \\rho^2) = 64 \\times (1 - 0.25) = 48$ です。身長が分かると、体重のばらつきは64から48に小さくなります。32 は $1 - \\rho$ を掛けた値、16 は $\\rho^2$ を掛けた値です。`},{id:`mvn-4`,question:`2変量正規分布の条件付き分布 $Y \\mid X = x$ について、正しいものはどれか？`,options:[`平均も分散も $x$ によらない`,`平均は $x$ の1次式で、分散は $x$ によらない`,`平均は $x$ によらず、分散は $x$ とともに増える`,`平均も分散も $x$ の1次式`],correctAnswer:1,explanation:`条件付き期待値 $\\mu_Y + \\rho(\\sigma_Y/\\sigma_X)(x - \\mu_X)$ は $x$ の1次式で、条件付き分散 $\\sigma_Y^2(1 - \\rho^2)$ は $x$ を含みません。図でいえば、縦に切った山の中心は直線に沿って動き、幅は変わりません。`},{id:`mvn-5`,question:`平均 $(0, 0)$、分散がどちらも1、相関係数0.7の2変量正規分布で、マハラノビス距離が大きい（より珍しい）のはどちらの点か？`,options:[`$(1, 1)$`,`$(1, -1)$`,`どちらも同じ`,`原点 $(0, 0)$`],correctAnswer:1,explanation:`マハラノビス距離の2乗は $(x^2 - 2\\rho xy + y^2)/(1 - \\rho^2)$ です。$(1, 1)$ は $(2 - 1.4)/0.51 \\approx 1.18$、$(1, -1)$ は $(2 + 1.4)/0.51 \\approx 6.67$ です。原点からのふつうの距離は同じでも、点が右上がりに散らばるので、それを横切る $(1, -1)$ のほうがずっと珍しい点です。`},{id:`mvn-6`,question:`$(X, Y)$ が2変量正規分布 $N_2(\\boldsymbol{\\mu}, \\Sigma)$ に従い、$X$ の平均は $\\mu_X$、分散は $\\sigma_X^2$、相関係数は $\\rho$ です。$X$ だけの分布（周辺分布）はどれか？`,options:[`$N(\\mu_X, \\sigma_X^2)$`,`$N(\\mu_X, \\sigma_X^2(1 - \\rho^2))$`,`$N(\\rho\\mu_X, \\sigma_X^2)$`,`正規分布とは限らない`],correctAnswer:0,explanation:`多変量正規分布の周辺分布は正規分布で、$X$ だけを見れば $\\rho$ によらず $N(\\mu_X, \\sigma_X^2)$ です。$\\sigma_X^2(1 - \\rho^2)$ は、$Y$ の値を決めたときの $X$ の条件付き分散です。`},{id:`mvn-7`,question:`$X$ が $N(0, 1)$ に従い、$S$ は $X$ と独立に $+1$ か $-1$ を確率1/2ずつとります。$Y = SX$ について正しいものはどれか？`,options:[`$X$ と $Y$ は独立である`,`$(X, Y)$ は2変量正規分布に従う`,`$X$ と $Y$ はそれぞれ正規分布に従い無相関だが、独立ではない`,`$\\text{Cov}(X, Y) = 1$ である`],correctAnswer:2,explanation:`$Y$ も $N(0, 1)$ に従い、$\\text{Cov}(X, Y) = E[S]E[X^2] = 0$ です。しかし $|Y| = |X|$ なので、$X$ が分かれば $Y$ は2通りに絞られ、独立ではありません。点は直線 $y = x$ と $y = -x$ の上にしかないので、2変量正規分布でもありません。「無相関なら独立」は、まとめて多変量正規分布に従うときだけ成り立ちます。`}]},{id:`1.9b-transform`,updatedAt:`2026-10-17`,title:`変数変換：変換した量や和の分布を求める（ヤコビアン）`,chapter:4,description:`量を変換したときの分布の求め方を学びます。山の高さの補正（ヤコビアン）、標準正規分布の2乗がカイ二乗分布になる理由、一様乱数から指数分布の乱数を作る方法、2つの待ち時間の合計の分布。`,content:`💡 **このモジュールで学ぶこと**

ある量 $X$ の分布が分かっているとき、それを変換した量 $Y = g(X)$（2倍する、2乗する、対数をとるなど）の分布を求める方法を学びます。読み終えると、次のことが分かります。

- 量を変換すると、分布の山の高さがどう変わるか
- 標準正規分布の2乗が、なぜ自由度1のカイ二乗分布になるか
- 一様乱数から指数分布の乱数を作れる理由
- 2つの待ち時間の合計がどんな分布になるか

---

### 1. 量を変換すると、分布はどう変わる？

#### 確率（面積）は移しても変わらない

$X$ を「0から1のどの値も同じ出やすさで出る数」（0から1の一様分布）とします。たとえば一辺が $X$ メートルの正方形をでたらめな大きさで作ると、面積は $Y = X^2$ です。一辺の長さの出やすさが分かっているとき、面積はどの値が出やすいでしょうか。

$X$ のとりうる値を4つの範囲（0〜0.25、0.25〜0.5、0.5〜0.75、0.75〜1）に分け、それぞれの範囲の値を2乗すると $Y$ のどこへ移るかを見ます。$X$ が0〜0.25 なら $Y$ は0〜0.0625 の狭い範囲に、$X$ が0.75〜1 なら $Y$ は約0.56〜1 の広い範囲に移ります。下の図の4色の帯が、この4つの範囲です。

[[f-transform-strips]]

図から次の3つが読み取れます。

1. どの帯も面積（確率）は0.25のまま
2. 幅が縮んだ帯（0の近く）は、面積を保つために高くなる
3. 幅が広がった帯（1の近く）は低くなる

変換した量の密度は「元の密度を、幅が何倍になったかで割る」と求まります。

---

### 2. 高さの補正を式にする

#### いちばん簡単な例：2倍する

$Y = 2X$ なら、どの帯も幅が2倍になるので、高さは半分です。$X$ が $U(0, 1)$ なら、$Y$ は0から2の範囲で高さ $1/2$ の一様分布です。

#### 一般の式

幅の倍率は場所によって違うので、$y$ を少し動かしたときに $x$ がどれだけ動くか（$dx/dy$）で測ります。$g$ が単調（増え続けるか減り続ける）なら、次の式です。

$$f_Y(y) = f_X(x)\\,\\left|\\frac{dx}{dy}\\right|, \\quad x = g^{-1}(y)$$

- $f_X(x)$：$y$ に移ってくる元の $x$ での高さ
- $\\left|\\dfrac{dx}{dy}\\right|$：幅の倍率の逆数（幅が2倍なら $1/2$）。これを**ヤコビアン**と呼ぶ

$Y = 2X$ では $x = y/2$、$dx/dy = 1/2$ で、高さが半分になることと一致します。

$dx/dy$ は $g$ の傾き $dy/dx = g'(x)$ の逆数です。$g$ の傾きが急な所ほど、$x$ の狭い幅が $y$ の広い幅に引き伸ばされるので、高さは低くなります。

#### 2乗の場合：最初の図の曲線を求める

最初の図の $Y = X^2$ に、3つの手順で当てはめます。

1. **$y$ に移ってくる $x$ を求める**：$y = x^2$ を $x$ について解くと $x = \\sqrt{y}$（$X$ は0〜1なので正の方だけ）
2. **幅の倍率の逆数を求める**：$x = \\sqrt{y} = y^{1/2}$ を $y$ で微分すると $\\dfrac{dx}{dy} = \\dfrac{1}{2}y^{-1/2} = \\dfrac{1}{2\\sqrt{y}}$
3. **元の高さに掛ける**：一様分布の高さは $f_X(x) = 1$ なので、$f_Y(y) = 1 \\times \\dfrac{1}{2\\sqrt{y}} = \\dfrac{1}{2\\sqrt{y}}$

図の帯で確かめます。いちばん左の帯は、幅0.25が幅0.0625に縮み、面積0.25を保つので平均の高さは $0.25 / 0.0625 = 4$ です。右端の帯は幅0.4375に広がり、平均の高さは約0.57です。

$y$ が0に近いほど高さ $1/(2\\sqrt{y})$ が大きいのは、0の近くでは2乗すると値がぎゅっと縮まるからです（0.1 は 0.01 に、0.2 は 0.04 に）。

#### よく使う変換

| 変換 | $x$ | $\\lvert dx/dy \\rvert$ | $Y$ の密度 |
|---|---|---|---|
| $U(0,1)$ で $Y = X^2$ | $\\sqrt{y}$ | $1/(2\\sqrt{y})$ | $1/(2\\sqrt{y})$ |
| $U(0,1)$ で $Y = -\\ln X$ | $e^{-y}$ | $e^{-y}$ | $e^{-y}$ |
| $N(0,1)$ で $Y = e^X$ | $\\ln y$ | $1/y$ | 下の式 |

1行目は上の図の曲線です。2行目の密度 $e^{-y}$ は指数分布 $\\text{Exp}(1)$ です。コンピュータが出す0〜1の一様乱数 $X$ から $-\\ln X$ を計算すれば、指数分布に従う乱数が得られます。3行目は次の式で、[対数正規分布](/stats-pre1/1.8b-ratio-lognormal-cauchy/) $\\text{LogN}(0, 1)$ の密度です。

$$f_Y(y) = \\frac{1}{\\sqrt{2\\pi}}\\, e^{-(\\ln y)^2/2} \\cdot \\frac{1}{y}, \\quad y > 0$$

---

### 3. 標準正規分布を2乗すると？

#### 左右の2か所が同じ所に重なる

$X$ が $N(0, 1)$ に従うとき、$Y = X^2$ の分布は、後で学ぶカイ二乗分布の出発点です。2乗は単調ではないので、$x = \\sqrt{y}$ と $x = -\\sqrt{y}$ の2か所が同じ $y$ に移ります。

[[f-fold-square]]

左右から来る2つの寄与を足します。それぞれは第2節の式と同じ計算です。

$$\\begin{aligned} f_Y(y) &= \\left\\{ f_X(\\sqrt{y}) + f_X(-\\sqrt{y}) \\right\\} \\frac{1}{2\\sqrt{y}} \\\\ &= \\frac{1}{\\sqrt{2\\pi y}}\\, e^{-y/2}, \\quad y > 0 \\end{aligned}$$

標準正規分布に従う量を2乗した分布を、**自由度1のカイ二乗分布** $\\chi^2(1)$ と呼びます。いま求めた式が、その密度です。標準正規分布に従う独立な量を $k$ 個2乗して足した分布が自由度 $k$ のカイ二乗分布で、ばらつき（分散）の推定に使います（[標本分布](/stats-pre1/1.12-sampling/)で学びます）。

---

### 4. 2つの待ち時間の合計は？

#### 合計が u になる組の数を数える

客が来るまでの待ち時間 $X$ と、その次の客までの待ち時間 $Y$ が、独立にどちらも指数分布 $\\text{Exp}(\\lambda)$ に従うとします。2人目が来るまでの時間 $U = X + Y$ はどんな分布でしょうか。

[[f-wait-pair]]

合計が $u$ になる組 $(x, u - x)$ は線分の上に並び、その長さは $u$ に比例します。線分の上の1点あたりの密度は $\\lambda e^{-\\lambda x} \\cdot \\lambda e^{-\\lambda(u - x)} = \\lambda^2 e^{-\\lambda u}$ で、どこでも同じです。長さと密度を掛けて、次の結果になります。

$$f_U(u) = \\lambda^2\\, u\\, e^{-\\lambda u}, \\quad u > 0$$

これは $\\text{Ga}(2, \\lambda)$ の密度で、[指数分布とガンマ分布](/stats-pre1/1.8-continuous/)で学んだ「2件目が起きるまでの待ち時間」と一致します。

#### 一般の手順：面積の倍率を掛ける

2つの変数を変換するときも、考え方は第2節と同じで、密度に「面積の倍率」の補正を掛けます。上の例で $V = X$ も一緒に置き、$(u, v)$ の小さな正方形が $(x, y)$ でどんな形になるかを見ます。

[[f-shear-area]]

面積の倍率は、偏微分を並べた行列式 $J$（これも**ヤコビアン**）の絶対値で計算できます。

$$f_{U,V}(u, v) = f_{X,Y}(x, y)\\,|J|$$

$$J = \\det\\begin{pmatrix} \\partial x/\\partial u & \\partial x/\\partial v \\\\ \\partial y/\\partial u & \\partial y/\\partial v \\end{pmatrix}$$

| 手順 | 例：$U = X + Y$、$V = X$ |
|---|---|
| 1. $x, y$ を $u, v$ で書く | $x = v$、$y = u - v$ |
| 2. $J$ を計算する | $\\det\\begin{pmatrix} 0 & 1 \\\\ 1 & -1 \\end{pmatrix} = 0 \\times (-1) - 1 \\times 1 = -1$、$\\lvert J \\rvert = 1$（図の倍率1） |
| 3. 同時密度を書く | $\\lambda^2 e^{-\\lambda u}$（$0 < v < u$） |
| 4. $v$ について積分する | $\\int_0^u \\lambda^2 e^{-\\lambda u}\\,dv = \\lambda^2 u\\, e^{-\\lambda u}$ |

手順4の積分の幅 $u$ が、上の図の線分の長さにあたります。

#### もう1つの例：和と差

$U = X + Y$、$V = X - Y$ なら、手順1で2つの式を $x, y$ について解きます。足すと $u + v = 2x$、引くと $u - v = 2y$ なので、$x = (u + v)/2$、$y = (u - v)/2$ です。

手順2の行列式は、2行2列なら「左上×右下 − 右上×左下」です。

$$\\begin{aligned} J &= \\det\\begin{pmatrix} 1/2 & 1/2 \\\\ 1/2 & -1/2 \\end{pmatrix} \\\\ &= \\frac{1}{2} \\times \\left(-\\frac{1}{2}\\right) - \\frac{1}{2} \\times \\frac{1}{2} = -\\frac{1}{2} \\end{aligned}$$

$|J| = 1/2$ で、$(u, v)$ の小さな正方形は $(x, y)$ では面積が半分の図形になります。

⚠️ 向きを逆にして $u, v$ を $x, y$ で微分すると、行列式は $-2$ になります。公式で使うのは、$x, y$ を $u, v$ で微分した方です。

---

### 5. このモジュールの変換のまとめ

| 元の分布 | 変換 | 結果 |
|---|---|---|
| 一様 $U(0, 1)$ | $Y = 2X$ | 一様 $U(0, 2)$ |
| 一様 $U(0, 1)$ | $Y = X^2$ | 密度 $1/(2\\sqrt{y})$ |
| 一様 $U(0, 1)$ | $Y = -\\ln X$ | 指数 $\\text{Exp}(1)$ |
| 標準正規 | $Y = e^X$ | 対数正規 $\\text{LogN}(0, 1)$ |
| 標準正規 | $Y = X^2$ | カイ二乗 $\\chi^2(1)$ |
| 指数 2つ | $U = X + Y$ | ガンマ $\\text{Ga}(2, \\lambda)$ |`,keyFormulas:[{label:`変数変換（ヤコビアン）`,formula:`f_Y(y) = f_X(x)\\,\\left|\\dfrac{dx}{dy}\\right|, \\quad x = g^{-1}(y)`},{label:`2変数の変数変換`,formula:`f_{U,V}(u, v) = f_{X,Y}(x, y)\\,|J|`},{label:`標準正規分布の2乗`,formula:`X \\sim N(0,1) \\Rightarrow X^2 \\sim \\chi^2(1)`}],quiz:[{id:`con1-9`,question:`密度の式 $f_Y(y) = f_X(x)\\,\\left|\\dfrac{dx}{dy}\\right|$（$x = g^{-1}(y)$）で、$\\left|\\dfrac{dx}{dy}\\right|$ は何を表すか？`,options:[`$x$ の幅が、$y$ では何倍の幅に広がるか`,`$y$ に移ってくる元の $x$ での、$X$ の密度の高さ`,`$x$ の幅が何倍になったかの逆数（2倍なら $1/2$）`,`$X$ が $x$ 以下になる確率`],correctAnswer:2,explanation:`本文の「一般の式」のとおり、$dx/dy$ は $y$ を少し動かしたときに $x$ がどれだけ動くかで、幅の倍率の逆数です（これをヤコビアンと呼ぶ）。$Y = 2X$ なら幅が2倍に広がるので $dx/dy = 1/2$ で、高さが半分になり面積（確率）が保たれます。幅の倍率そのもの（2）を掛けると、広がった所で高さまで上がり、面積が保たれません。$y$ に移ってくる $x$ での高さは、式の前半の $f_X(x)$ です。`},{id:`con1-17`,question:`変数変換で $X \\sim N(0,1)$、$Y = e^X$ のとき $Y$ は何の分布に従うか？`,options:[`指数分布`,`対数正規分布`,`$N(0,1)$`,`コーシー分布`],correctAnswer:1,explanation:`$Y = e^X$（つまり $X = \\ln Y$）とヤコビアン $|dX/dY| = 1/Y$ を用いると、$f_Y(y) = \\frac{1}{\\sqrt{2\\pi}} e^{-(\\ln y)^2/2} \\cdot (1/y)$（$y>0$）となり、これは対数正規分布 $\\text{LogN}(0,1)$ の PDF です。`},{id:`con1-33`,question:`$X$ と $Y$ が独立で、どちらも指数分布 $\\text{Exp}(\\lambda)$ に従うとき、$U = X + Y$ の分布はどれか？`,options:[`$\\text{Exp}(2\\lambda)$`,`$\\text{Exp}(\\lambda/2)$`,`$\\text{Ga}(2, \\lambda)$`,`$[0, 2/\\lambda]$ 上の一様分布`],correctAnswer:2,explanation:`第4節の図のとおり、合計が $u$ になる組 $(x, u - x)$ は長さが $u$ に比例する線分に並び、その上の密度はどこでも $\\lambda^2 e^{-\\lambda u}$ です。長さと密度を掛けて $f_U(u) = \\lambda^2 u\\, e^{-\\lambda u}$ で、これは $\\text{Ga}(2, \\lambda)$（2人目が来るまでの待ち時間）です。平均でも確かめられます。1人分の平均の待ち時間は $1/\\lambda$ なので、合計の平均は $2/\\lambda$ です。$\\text{Exp}(2\\lambda)$ の平均は $1/(2\\lambda)$ で1人分より短いので、合計ではありえません。$\\text{Exp}(\\lambda/2)$ は平均 $2/\\lambda$ で合いますが、0の近くが最も出やすい形です。2人分の合計は、線分が短い0の近くでは出にくいので、形が合いません。`},{id:`trf-1`,question:`$X$ が0から1の一様分布 $U(0, 1)$ に従うとき、$Y = X^2$ の確率密度関数（$0 < y < 1$）はどれか？`,options:[`$\\sqrt{y}$`,`$2y$`,`$\\dfrac{1}{2\\sqrt{y}}$`,`$1$`],correctAnswer:2,explanation:`$x = \\sqrt{y}$、$dx/dy = 1/(2\\sqrt{y})$、$f_X = 1$ なので $f_Y(y) = 1/(2\\sqrt{y})$ です。0の近くの帯は2乗すると縮むので、面積を保つために密度が高くなります。$1$ は変換しても密度が変わらないと考えた誤りです。`},{id:`trf-2`,question:`$X$ が $U(0, 1)$ に従うとき、$Y = 2X$ の確率密度関数はどれか？`,options:[`$0 < y < 2$ で $1$`,`$0 < y < 2$ で $2$`,`$0 < y < 1$ で $2$`,`$0 < y < 2$ で $1/2$`],correctAnswer:3,explanation:`$x = y/2$、$|dx/dy| = 1/2$ なので $f_Y(y) = 1 \\times 1/2 = 1/2$（$0 < y < 2$）です。幅が2倍に広がるので、面積1を保つために高さは半分になります。`},{id:`trf-3`,question:`$X$ が標準正規分布 $N(0, 1)$ に従い $Y = X^2$ のとき、$Y \\le 1$ となる確率はおよそいくらか？`,options:[`約0.34`,`約0.68`,`約0.84`,`約0.95`],correctAnswer:1,explanation:`$Y \\le 1$ になるのは $X^2 \\le 1$、つまり $-1 \\le X \\le 1$ のときです。第3節の図のように左右の2か所を合わせて数えるので、正規分布の「平均 $\\pm 1$ 標準偏差に約68%」から約0.68です。0.34 は右側（0〜1）だけを数えた値、0.84 は $X \\le 1$ の確率、0.95 は $\\pm 2$ の範囲（$Y \\le 4$）の確率です。`},{id:`trf-4`,question:`$X$ が指数分布 $\\text{Exp}(\\lambda)$ に従うとき、$Y = cX$（$c > 0$）が従う分布はどれか？`,options:[`$\\text{Exp}(c\\lambda)$`,`$\\text{Exp}(\\lambda/c)$`,`$\\text{Ga}(c, \\lambda)$`,`$\\text{Exp}(\\lambda)$`],correctAnswer:1,explanation:`第2節の式で、$x = y/c$、$|dx/dy| = 1/c$ なので、$f_Y(y) = \\lambda e^{-\\lambda y/c} \\cdot \\dfrac{1}{c} = \\dfrac{\\lambda}{c}\\, e^{-(\\lambda/c)\\,y}$ で、$\\text{Exp}(\\lambda/c)$ の密度です。値を $c$ 倍すると平均 $1/\\lambda$ も $c$ 倍の $c/\\lambda$ になるので、率は $1/c$ 倍です。`},{id:`trf-5`,question:`$X$ が $N(0, 1)$ に従い $Y = X^2$ のとき、密度の公式で $f_X(\\sqrt{y})$ と $f_X(-\\sqrt{y})$ を足す理由はどれか？`,options:[`2つの $x$ が同じ $y$ に移るから`,`正規分布が左右対称だから`,`ヤコビアンが負になるから`,`$y$ が負の値もとるから`],correctAnswer:0,explanation:`$Y = X^2$ は単調ではなく、$x = \\sqrt{y}$ と $x = -\\sqrt{y}$ の両方が同じ $y$ に移ります。$Y$ が $y$ の近くに来る確率は、両方から来る確率の和なので、寄与を足します。左右対称は2つの寄与が等しくなる理由で、足す理由ではありません。`},{id:`trf-6`,question:`$(X, Y)$ を $U = X + Y$、$V = X - Y$ に変換するとき、$f_{U,V}(u, v) = f_{X,Y}(x, y)\\,|J|$ の $|J|$ はいくらか？`,options:[`$1/2$`,`$2$`,`$1$`,`$1/4$`],correctAnswer:0,explanation:`第4節「和と差」の手順どおりです。足し引きして解くと $x = (u + v)/2$、$y = (u - v)/2$ です。行列式は「左上×右下 − 右上×左下」で $\\frac{1}{2} \\times (-\\frac{1}{2}) - \\frac{1}{2} \\times \\frac{1}{2} = -\\frac{1}{2}$、よって $|J| = 1/2$ です。$2$ は向きを逆にして $u, v$ を $x, y$ で微分した値です。$1/4$ は行列式の2つの項を引かずに片方だけとった値です。`},{id:`trf-7`,question:`$X$ が $U(0, 1)$ に従うとき、$Y = -\\ln X$ が従う分布はどれか？`,options:[`指数分布 $\\text{Exp}(1)$`,`$U(0, 1)$`,`$N(0, 1)$`,`対数正規分布`],correctAnswer:0,explanation:`$x = e^{-y}$、$|dx/dy| = e^{-y}$、$f_X = 1$ なので $f_Y(y) = e^{-y}$（$y > 0$）で、$\\text{Exp}(1)$ です。一様乱数から指数分布の乱数を作るときに使います。`}]},{id:`1.9c-extreme-value`,updatedAt:`2026-10-17`,title:`極値分布：最大値・最小値の分布とガンベル分布`,chapter:4,description:`たくさんの値の最大値・最小値の分布を学びます。最大値が x 以下になる確率、部品が1つも壊れない確率、最大値の期待値、年最大値にガンベル分布を当てはめて100年に1度の水位を見積もる考え方、極値分布の3つの型。`,content:`💡 **このモジュールで学ぶこと**

たくさんの値の中の最大値や最小値の分布を学びます。読み終えると、次のことができるようになります。

- 「5個のうち最大値が0.8以下」「10個の部品が1つも壊れない」確率を計算する
- 最大値の期待値を求める
- 年ごとの最大水位のデータから「100年に1度の水位」を見積もる考え方を説明する

---

### 1. 最大値・最小値はどう分布する？

#### 全部が x 以下になる確率

0から1の一様分布から5個とったとき、最大値が0.8以下になるのは、5個全部が0.8以下のときです。1個が0.8以下の確率は0.8なので、5個全部なら $0.8^5 \\approx 0.33$ です。個数を変えると次のようになります。

[[f-max-cdf]]

一般に、$X_1, \\ldots, X_n$ が独立で、どれも分布関数 $F(x) = P(X \\le x)$ に従うなら、最大値 $M$ と最小値 $m$ について次の式です。最小値は「全部が $x$ を超える」と考えます。

$$\\begin{aligned} P(M \\le x) &= F(x)^n \\\\ P(m > x) &= \\{1 - F(x)\\}^n \\end{aligned}$$

#### 最小値の例：部品が1つも壊れない確率

平均寿命1000時間の指数分布（$\\lambda = 1/1000$）に従う部品10個が独立に動くとき、$t$ 時間たっても1つも壊れていない確率は次の式です。

$$P(m > t) = (e^{-\\lambda t})^{10} = e^{-10\\lambda t}$$

[[f-min-parts]]

最初の故障までの時間は $\\text{Exp}(10\\lambda)$ に従い、平均は100時間です。部品が多いほど、最初の故障は早く来ます。

#### 最大値の密度と期待値

期待値を求めるには密度が要ります。分布関数を微分すると次の式です。

$$\\begin{aligned} f_M(x) &= n\\,F(x)^{n-1} f(x) \\\\ f_m(x) &= n\\,\\{1 - F(x)\\}^{n-1} f(x) \\end{aligned}$$

**例**：0から1の一様分布なら $F(x) = x$、$f(x) = 1$ なので、$f_M(x) = n x^{n-1}$ です。期待値は $\\int_0^1 x \\cdot n x^{n-1}\\,dx = \\dfrac{n}{n+1}$ で、5個なら約0.83、20個なら約0.95です。この密度の形は、[十分統計量・順序統計量](/stats-pre1/1.13-sufficient-stats/)の図の「5番目（最大）」の曲線です。

---

### 2. 100年に1度の水位はどう見積もる？

#### 元の分布が分からなくても、最大値の形は決まる

ある川の水位は毎日変わり、その分布を正確に知るのは困難です。それでも、毎年の最大水位（365日の最大値）の分布には、決まった形が現れます。元の分布が平均1の指数分布の場合で、$n$ 個の最大値の分布を見ます。

[[f-max-shift]]

最大値から $\\ln n$ を引いてずらすと、次の極限になります（$(1 + a/n)^n \\to e^a$ を使います）。

$$\\begin{aligned} P(M - \\ln n \\le x) &= \\left(1 - \\frac{e^{-x}}{n}\\right)^n \\\\ &\\to \\exp\\!\\left(-e^{-x}\\right) \\quad (n \\to \\infty) \\end{aligned}$$

この $\\exp(-e^{-x})$ が**ガンベル分布**の分布関数です。位置 $\\mu$ と尺度 $\\sigma$ を付けると $\\exp\\!\\left(-e^{-(x-\\mu)/\\sigma}\\right)$ です。

#### 年最大値にガンベル分布を当てはめる

毎年の最大水位のデータにガンベル分布を当てはめれば、「毎年1%の確率でしか超えない水位」が計算できます。これを**100年に1度の水位**と呼びます。

[[f-return-level]]

ガンベル分布の上側 $1/T$ の境目は $\\mu - \\sigma \\ln\\{-\\ln(1 - 1/T)\\}$ で、$T = 100$ なら $\\mu + 4.60\\sigma$、$T = 10$ なら $\\mu + 2.25\\sigma$ です。

---

### 3. 元の分布で、最大値の形はどう違う？

#### 3つの型しかない

ずらして幅をそろえた最大値の極限は、元の分布によらず3つの型のどれかです（Fisher-Tippett-Gnedenko の定理）。3つは、形状パラメータ $\\xi$ をもつ**一般極値分布**（GEV）にまとめられます。

[[f-gev-types]]

#### どの型になるかは元の分布の裾で決まる

元の分布の右の裾が指数的に減ればガンベル型、べき乗でゆっくり減ればフレシェ型、上限があればワイブル型になります。

| 型 | $\\xi$ | 元の分布の例 | 使う場面 |
|---|---|---|---|
| ガンベル | 0 | 正規、指数 | 洪水、気温 |
| フレシェ | 正 | コーシー、パレート | 金融の大損失、地震 |
| ワイブル | 負 | 一様 | 上限のある量 |

裾の長い量（金融の損失など）にガンベル分布を当てはめると、とびぬけた値が出る確率を小さく見積もってしまいます。

#### 最小値とワイブル分布

最小値は、符号を反転すれば最大値として扱えます。ワイブル型は正確には通常のワイブル分布を左右反転した形で、通常のワイブル分布は最小値の極限として現れます。部品の寿命（一番弱い所で壊れる）に使うのはこちらです。`,keyFormulas:[{label:`最大値・最小値の分布`,formula:`\\begin{aligned} P(M \\le x) &= F(x)^n \\\\ P(m > x) &= \\{1 - F(x)\\}^n \\end{aligned}`},{label:`最大値の密度`,formula:`f_M(x) = n\\,F(x)^{n-1} f(x)`},{label:`ガンベル分布 CDF`,formula:`F(x) = \\exp\\!\\left(-e^{-(x-\\mu)/\\sigma}\\right)`}],quiz:[{id:`con1-32`,question:`平均寿命1000時間の指数分布に従う部品10個が、独立に動いています。最初の1個が壊れるまでの時間の期待値はいくらか？`,options:[`約 2929 時間`,`1000 時間`,`100 時間`,`10000 時間`],correctAnswer:2,explanation:`平均1000時間なので、1個が壊れる速さは $\\lambda = 1/1000$ です。最初の1個が壊れるまでの時間 $m$ は10個の最小値で、「$m > t$」は「時刻 $t$ で10個すべてがまだ動いている」ことです。独立なので、1個が動いている確率 $e^{-\\lambda t}$ を10回掛けて $P(m > t) = e^{-10\\lambda t}$ になります。これは壊れる速さが10倍の指数分布 $\\text{Exp}(10\\lambda)$ と同じ形なので、期待値は $1/(10\\lambda) = 1000/10 = 100$ 時間です（10個あれば、全体で1000時間に10回のペースで壊れる）。約2929時間は最後の1個が壊れるまで（最大値）の期待値です。無記憶性から、残りが10個、9個、…、1個のときの待ち時間 $1000/10,\\ 1000/9,\\ \\ldots,\\ 1000/1$ を足して $1000 \\times (1/10 + 1/9 + \\cdots + 1) \\approx 2929$ 時間です。`},{id:`con1-10`,question:`極値分布（Fisher-Tippett-Gnedenko の定理）に関して、正規分布の最大値が収束する分布はどれか？`,options:[`フレシェ分布（Fréchet）`,`ガンベル分布（Gumbel）`,`ワイブル型（Weibull）`,`一様分布`],correctAnswer:1,explanation:`正規分布は「指数型の裾」を持つためガンベル分布（Type I）に収束します。フレシェ分布はコーシー・パレートなどの重い裾（べき乗則）の分布の最大値、ワイブル型は一様分布など上限がある分布の最大値に対応します。これら3族は一般極値分布（GEV）として統一されます。`},{id:`con1-18`,question:`一般極値分布（GEV）で形状パラメータ $\\xi > 0$ のとき、どの極値分布に対応するか？`,options:[`ガンベル分布（Type I）`,`フレシェ分布（Type II）`,`ワイブル型（Type III）`,`正規分布`],correctAnswer:1,explanation:`GEV の形状パラメータで $\\xi=0$ がガンベル、$\\xi>0$ がフレシェ、$\\xi<0$ がワイブルに対応します。フレシェ分布はべき乗則の重い裾（コーシー・パレートなど）の最大値が収束する分布で、金融リスク分析に使われます。`},{id:`con1-20`,question:`極値分布のうち、ワイブル型（Type III）はどのような分布の最大値が収束する分布か？`,options:[`コーシー分布などべき乗則の重い裾を持つ分布`,`ポアソン分布など離散分布`,`正規分布など指数型の裾を持つ分布`,`一様分布など有界な分布`],correctAnswer:3,explanation:`ワイブル型は「上限がある分布」の最大値が収束する極値分布です（$\\xi<0$）。例えば $[0,1]$ の一様分布の最大値はこの型に収束します。正確には通常のワイブル分布を左右反転した形で、部品の寿命に使う通常のワイブル分布は、最小値の極限として現れます。`},{id:`ext-1`,question:`0から1の一様分布から独立に5個とったとき、最大値が0.8以下になる確率に最も近いものはどれか？`,options:[`0.67`,`0.80`,`0.33`,`0.20`],correctAnswer:2,explanation:`最大値が0.8以下になるのは5個全部が0.8以下のときなので $0.8^5 \\approx 0.33$ です。0.67 は最大値が0.8を超える確率、0.80 は1個のときの確率です。`},{id:`ext-2`,question:`0から1の一様分布から独立に3個とったとき、最小値が0.5を超える確率はいくらか？`,options:[`0.25`,`0.5`,`0.875`,`0.125`],correctAnswer:3,explanation:`最小値が0.5を超えるのは3個全部が0.5を超えるときなので $(1 - 0.5)^3 = 0.125$ です。0.875 は最小値が0.5以下になる確率です。`},{id:`ext-3`,question:`独立に同じ分布（分布関数 $F$、密度 $f$）に従う $n$ 個の最大値 $M$ の密度はどれか？`,options:[`$F(x)^n$`,`$n\\,F(x)^{n-1} f(x)$`,`$f(x)^n$`,`$n\\,f(x)$`],correctAnswer:1,explanation:`$P(M \\le x) = F(x)^n$ を $x$ で微分すると $n F(x)^{n-1} f(x)$ です。1個が $x$ のあたりにあり、残り $n-1$ 個が $x$ 以下で、どの1個が最大かの $n$ 通りを掛けた形と読めます。$F(x)^n$ は密度ではなく分布関数です。`},{id:`ext-4`,question:`平均1の指数分布から独立に100個とったとき、最大値の分布の山（最頻値）はおよそどこにあるか？`,options:[`約4.6`,`約100`,`約1`,`約10`],correctAnswer:0,explanation:`平均1の指数分布の $n$ 個の最大値は、山が $\\ln n$ にあり、$n$ を10倍にするごとに右へ約2.3ずれます。$\\ln 100 \\approx 4.6$ です。個数に比例して大きくなるわけではありません。`},{id:`ext-5`,question:`ガンベル分布の分布関数（位置0・尺度1）はどれか？`,options:[`$\\exp(-e^{-x})$`,`$1 - e^{-x}$`,`$e^{-x^2/2}$`,`$1/(1 + e^{-x})$`],correctAnswer:0,explanation:`平均1の指数分布の最大値から $\\ln n$ を引くと、$(1 - e^{-x}/n)^n \\to \\exp(-e^{-x})$ となります。$e$ が2重になった形がガンベル分布です。$1 - e^{-x}$ は指数分布、$1/(1 + e^{-x})$ はロジスティック分布の分布関数です。`},{id:`ext-6`,question:`部品の寿命の分析に通常のワイブル分布がよく使われる理由として、適切なものはどれか？`,options:[`一番弱い所で壊れると考えると、寿命は最小値の分布になり、その極限として現れるから`,`寿命は最大値の分布になり、ガンベル型に収束するから`,`寿命は必ず正規分布に従うから`,`ワイブル分布は上限のない分布の最大値の極限だから`],correctAnswer:0,explanation:`多くの箇所のうち一番弱い所で壊れるなら、寿命は各箇所の寿命の最小値です。通常のワイブル分布は最小値の極限として現れるので、寿命の分析に使われます。極値分布のワイブル型（最大値の極限）は、これを左右反転した形です。`}]},{id:`1.11-lln-clt`,updatedAt:`2026-10-14`,title:`大数の法則と中心極限定理`,chapter:5,description:`サイコロの平均が3.5に近づく理由（大数の法則）と、コイン100回の表の枚数が釣鐘形になる理由（中心極限定理）を、数値と図で学びます。確率収束と分布収束の違いも図で見分けます。`,content:`💡 **このモジュールで学ぶこと**

標本の平均は、標本を増やすと真の平均に近づき（大数の法則）、そのばらつき方は正規分布の形になります（中心極限定理）。この2つが、手元の標本から母集団の平均を推測できる根拠です。

---

### 1. 大数の法則：回数を増やすと平均は真の値に近づく

#### 平均のばらつきは $\\sqrt{n}$ 分の1に縮む

1〜6の目が等確率で出るサイコロの期待値は $\\mu = 3.5$、1回の目の分散は $\\sigma^2 = 35/12 \\approx 2.92$（標準偏差は約1.71）です。$n$ 回振った目の平均 $\\bar{X}_n$ の分散は、次の3段で求まります。

1. 合計 $X_1 + \\cdots + X_n$ の分散は、各回が独立なので足し算になり $n\\sigma^2$
2. 平均は合計の $1/n$ 倍なので、分散は $1/n^2$ 倍（$\\text{Var}(aX) = a^2\\,\\text{Var}(X)$）
3. 合わせて $n\\sigma^2 \\times \\dfrac{1}{n^2} = \\dfrac{\\sigma^2}{n}$

$$\\text{Var}(\\bar{X}_n) = \\frac{\\sigma^2}{n}$$

標準偏差でいえば $\\sigma/\\sqrt{n}$ で、回数を100倍にすると、平均のばらつきの幅は1/10になります。次の図は、3人が1000回ずつ振った平均の動きです。

[[f-lln]]

#### 式で書くと

平均が $\\mu$ から離れる確率は、回数とともに0に近づきます。これが**大数の法則**（Law of Large Numbers）です。

$$\\bar{X}_n \\xrightarrow{p} \\mu \\quad (n \\to \\infty)$$

$\\xrightarrow{p}$ は**確率収束**の記号です。どんなに小さな幅 $\\varepsilon > 0$ をとっても、$P(|\\bar{X}_n - \\mu| > \\varepsilon)$ が0に近づく、という意味です。前提は、各回が独立に同じ分布に従い、期待値をもつことです。

🎯 **押さえどころ**：平均がちょうど3.5になるとは言っていません。言えるのは、3.5から離れる確率が回数とともに小さくなることです。図の3本の線も、帯の中で3.5のまわりを揺れ続けています。

🔍 **なぜ0に近づくのか（チェビシェフの不等式）**

どんな分布でも、平均から $\\varepsilon$ 以上離れる確率は「分散 ÷ $\\varepsilon^2$」以下です（チェビシェフの不等式）。$\\bar{X}_n$ の分散は $\\sigma^2/n$ なので、

$$P(|\\bar{X}_n - \\mu| \\geq \\varepsilon) \\leq \\frac{\\sigma^2}{n\\varepsilon^2}$$

右辺は $n$ を大きくすると0に向かうので、左辺の確率も0に向かいます。これが大数の法則の証明です。

🔍/

#### 弱法則と強法則

上の形は**大数の弱法則**です。収束の種類を強めた**大数の強法則**もあります。弱法則は確率収束、強法則は概収束で述べた形です。

| | 言っていること |
|---|---|
| 弱法則 | どの $n$ でも、$\\mu$ から離れる確率が $n$ とともに0に近づく |
| 強法則 | 平均の列そのものが、確率1で $\\mu$ に行き着く |

強法則を式で書くと次のとおりです。

$$P\\left(\\lim_{n\\to\\infty}\\bar{X}_n = \\mu\\right) = 1$$

出題範囲表には2018年版から弱法則があり、2027年1月からの版で概収束が加わりました。

---

### 2. 中心極限定理：平均のばらつき方は正規分布になる

#### コイン投げで見る

1回のコイン投げは、裏＝0・表＝1 が半分ずつの、棒が2本だけの分布です。100回投げた表の枚数は二項分布 $B(100, 0.5)$ に従い、期待値50、標準偏差5です。確率を棒グラフにすると、釣鐘形になります。

[[f-clt-coin]]

棒2本の分布から出発しても、たくさん足すと正規分布の形になります。これが**中心極限定理**（Central Limit Theorem）です。二項分布の正規近似 $B(n, p) \\approx N(np,\\; np(1-p))$ は、この定理の特別な場合です。

#### 式で書くと

$X_1, \\ldots, X_n$ が独立に同じ分布に従い、期待値 $\\mu$ と有限の分散 $\\sigma^2$ をもつとき、

$$\\frac{\\sqrt{n}\\,(\\bar{X}_n - \\mu)}{\\sigma} \\xrightarrow{d} N(0, 1) \\quad (n \\to \\infty)$$

$\\xrightarrow{d}$ は**分布収束**の記号で、分布の形が近づくことを表します。大数の法則の確率収束は「1点に集まる分布」への分布収束でもあるので、確率収束のほうが強い収束です（分布収束しても、確率収束するとは限りません）。計算では次の形で使います。

$$\\bar{X}_n \\approx N\\!\\left(\\mu,\\; \\frac{\\sigma^2}{n}\\right) \\quad (n \\text{ が大きいとき})$$

大数の法則のサイコロの図で、帯（平均から標準偏差2つ分まで）に約95%が入るのも、この近似から出る値です。

#### 2つの定理を1枚の図で見分ける

右に強く歪んだ指数分布（期待値1）から $n$ 個とった平均の分布です。

[[f-mean-narrow]]

| | 図で見ると | 分かること |
|---|---|---|
| 大数の法則（確率収束） | 山の幅が縮み、期待値 $\\mu$（この図では1）に集まる | 平均は $\\mu$ に近づく |
| 中心極限定理（分布収束） | 山の形が釣鐘形に変わる | 平均の誤差の確率が計算できる |

#### スライダーで形の変化を見る

上の図と同じ指数分布から $n$ 個とった平均を、標準化（$\\sqrt{n}$ 倍に引き伸ばす）して形だけを比べます。青が標準化した平均の分布、灰色の点線が $N(0,1)$ です。

[[interactive:normal]]

$n = 30$ でもわずかに右へ歪みが残ります。これは元の指数分布が右に歪んでいる（歪度2）からで、この例に限った話です。標準化した平均の歪度は「元の分布の歪度 ÷ $\\sqrt{n}$」になります。

| 元の分布 | 標準化した平均の歪度 |
|---|---|
| 右に歪む（指数分布、年収など） | プラスのまま0に近づく。指数分布なら $2/\\sqrt{n}$ で、$n = 30$ でも0.37 |
| 左に歪む | マイナスのまま0に近づく |
| 左右対称（サイコロの目など） | 最初から0。$n$ とともに変わるのは裾の厚さ（尖度） |

「$n \\geq 30$ なら正規近似」という目安は、元の分布の歪みが大きいほど当てはまりにくくなります。

🎯 **なぜ重要なのか**：前提は「独立に同じ分布から取り出すこと」と「分散が有限なこと」だけで、元の分布の形は問いません。だから母集団の分布が分からなくても、標本平均には正規分布の計算がおよそ使えます。`,keyFormulas:[{label:`大数の法則`,formula:`\\bar{X}_n \\xrightarrow{p} \\mu \\quad (n \\to \\infty)`},{label:`中心極限定理（CLT）`,formula:`\\sqrt{n}(\\bar{X}-\\mu)/\\sigma \\xrightarrow{d} N(0,1)`},{label:`標本平均の近似分布`,formula:`\\bar{X}_n \\approx N(\\mu,\\; \\sigma^2/n)`},{label:`標本平均の分散`,formula:`\\text{Var}(\\bar{X}) = \\sigma^2 / n`}],interactiveType:`normal`,quiz:[{id:`q1b-1`,question:`「元の分布が何であれ、サンプルサイズ $n$ を大きくすると標本平均の分布は正規分布に近づく」という定理は？`,options:[`不偏性の定理`,`大数の法則`,`中心極限定理`,`チェビシェフの不等式`],correctAnswer:2,explanation:`中心極限定理（CLT）です。独立に同じ分布から取り出し、分散が有限なら、元の分布の形によらず、標準化した標本平均 $\\sqrt{n}(\\bar{X}_n-\\mu)/\\sigma$ が $N(0,1)$ に分布収束します。$n$ が大きいとき、標本平均はおよそ $N(\\mu, \\sigma^2/n)$ に従います。大数の法則は、標本平均が $\\mu$ に近づくことだけを言い、分布の形には触れません。`},{id:`q1b-2`,question:`大数の法則 $\\bar{X}_n \\xrightarrow{p} \\mu$ の「$\\xrightarrow{p}$」の意味として正しいものはどれか？`,options:[`分布の形が $\\mu$ に近づく`,`標本の最大値が $\\mu$ に近づく`,`標本平均が必ず $\\mu$ になる`,`$n \\to \\infty$ のとき $P(|\\bar{X}_n - \\mu| > \\epsilon) \\to 0$（確率収束）`],correctAnswer:3,explanation:`確率収束（$\\xrightarrow{p}$）とは「$n$ を大きくすると $\\bar{X}_n$ が $\\mu$ から $\\epsilon$ 以上離れる確率が0に近づく」ことです。分布収束（$\\xrightarrow{d}$）とは別の概念で、値が1点に収束するイメージです。`},{id:`q1b-3`,question:`公平なコインを100回投げたとき、表が60枚以上出る確率に最も近いものはどれですか。中心極限定理による正規近似で考えます。`,options:[`約0.1%`,`約2.3%`,`約16%`,`約40%`],correctAnswer:1,explanation:`表の枚数は期待値 $100 \\times 0.5 = 50$、標準偏差 $\\sqrt{100 \\times 0.5 \\times 0.5} = 5$ で、およそ $N(50, 25)$ に従います。60枚は平均より標準偏差2つ分上なので $P(Z \\geq 2) \\approx 0.023$ です。約16%は標準偏差1つ分（55枚以上）、約0.1%は3つ分（65枚以上）の値です。二項分布で正確に計算すると約2.8%で、近似とのずれは連続修正（60 の代わりに 59.5 から数える。[ポアソン分布](/stats-pre1/1.7-poisson/)で学んだ補正）で小さくできます。`},{id:`q1b-4`,question:`二項分布 $B(n, p)$ において $n$ が十分に大きいとき、どの分布で近似できるか？`,options:[`カイ二乗分布`,`$N(np,\\; np(1-p))$`,`F分布`,`$t$ 分布`],correctAnswer:1,explanation:`二項分布 $B(n,p)$ は $n$ が十分大きければ $N(np, np(1-p))$ で近似できます（ド・モアブル=ラプラスの定理）。これはCLTの二項分布への適用です。`},{id:`q1b-5`,question:`大数の弱法則（WLLN）と強法則（SLLN）の収束の種類の違いとして正しいものはどれか？`,options:[`WLLNは概収束、SLLNは確率収束`,`WLLNとSLLNはどちらも概収束`,`WLLNは確率収束、SLLNは概収束`,`WLLNとSLLNはどちらも分布収束`],correctAnswer:2,explanation:`WLLNは確率収束（$P(|\\bar{X}_n - \\mu| > \\varepsilon) \\to 0$）、SLLNは概収束（$P(\\lim_{n\\to\\infty}\\bar{X}_n = \\mu) = 1$）。概収束のほうが強い収束概念。`},{id:`q1b-6`,question:`標本平均 $\\bar{X}$ の分散は、母分散 $\\sigma^2$ とサンプルサイズ $n$ を用いてどう表されるか？`,options:[`$\\sigma^2 / \\sqrt{n}$`,`$n\\sigma^2$`,`$\\sigma^2$`,`$\\sigma^2 / n$`],correctAnswer:3,explanation:`本文の3段のとおり、合計の分散は $n\\sigma^2$、平均は合計の $1/n$ 倍なので分散は $1/n^2$ 倍で、$\\text{Var}(\\bar{X}) = \\sigma^2/n$ です。$n$ が増えると標本平均のばらつきが小さくなり、$\\mu$ のまわりに集まります。これは大数の法則の理由です（中心極限定理は、そのばらつき方の形が正規分布になるという別の話です）。$\\sigma^2/\\sqrt{n}$ は標準偏差 $\\sigma/\\sqrt{n}$ と取り違えた形です。`},{id:`q1b-7`,question:`標本は独立に同じ分布から取り出すものとします。中心極限定理が成り立つために、元の分布に最低限必要な条件は？`,options:[`平均と分散が有限に存在すること`,`連続分布であること`,`正規分布に近いこと`,`左右対称であること`],correctAnswer:0,explanation:`独立に同じ分布から取り出すという前提のもとで、CLTは「平均 $\\mu$ と分散 $\\sigma^2$ が有限であること」さえ満たせば、元の分布の形を問わず成り立ちます。離散分布（コイン投げの0と1）にも、歪んだ連続分布（指数分布）にも使えます。分散が存在しないコーシー分布では成り立ちません。`},{id:`q1b-8`,question:`「$\\xrightarrow{d}$（分布収束）」と「$\\xrightarrow{p}$（確率収束）」の違いとして正しいものはどれか？`,options:[`分布収束は「値が1点に近づく」、確率収束は「分布の形が変化する」`,`確率収束は「値が1点に近づく」、分布収束は「分布の形全体が目標の分布に近づく」`,`分布収束の方が強い（確率収束を含む）`,`どちらも同じ収束の意味`],correctAnswer:1,explanation:`確率収束（$\\xrightarrow{p}$）は「値が目標の定数に近づく」という意味でLLNがこれにあたります。分布収束（$\\xrightarrow{d}$）は「分布の形が目標の分布に近づく」という意味でCLTがこれです。確率収束は分布収束を含意します（逆は一般に成り立ちません）。`},{id:`q1b-9`,question:`サイコロの目の分散は $\\sigma^2 = 35/12 \\approx 2.92$ です。サイコロを100回振ったときの目の平均 $\\bar{X}$ の標準偏差はおよそいくらか？`,options:[`約 0.017`,`約 0.17`,`約 1.71`,`約 0.029`],correctAnswer:1,explanation:`$\\text{Var}(\\bar{X}) = \\sigma^2/n = 2.92/100 = 0.0292$ なので、標準偏差は $\\sqrt{0.0292} \\approx 0.17$ です（$\\sigma/\\sqrt{n} = 1.71/10$ と同じ）。0.029 は分散のまま、1.71 は1回分の標準偏差、0.017 は1万回振ったときの値です。`},{id:`q1b-10`,question:`標本平均のばらつき（標準偏差 $\\sigma/\\sqrt{n}$）を半分にしたいとき、サンプルサイズ $n$ を何倍にすればよいですか。`,options:[`2倍`,`$\\sqrt{2}$ 倍`,`4倍`,`8倍`],correctAnswer:2,explanation:`標準偏差は $\\sqrt{n}$ に反比例するので、半分にするには $\\sqrt{n}$ を2倍、つまり $n$ を4倍にします。2倍にしても標準偏差は $1/\\sqrt{2} \\approx 0.71$ 倍にしかなりません。`}]},{id:`1.12-sampling`,updatedAt:`2026-10-26`,title:`標本分布：t 分布・カイ二乗分布・F 分布・非心分布`,chapter:5,description:`母分散が分からないときに平均や分散の確率を計算する t 分布・カイ二乗分布・F 分布を、標準正規分布からの組み立てと自由度による形の変化で学びます。本当に差があるときに使う非心分布も扱います。`,content:`💡 **このモジュールで学ぶこと**

母集団の標準偏差 $\\sigma$ が分からない、ふつうの場面で確率を計算するための3つの分布（$\\chi^2$・$t$・$F$）を学びます。読み終えると、次のことができるようになります。

- 工程のばらつきが大きくなったかを、10本の測定から判断する（$\\chi^2$ 分布）
- 10人の結果から、薬に効果があるかを判断する（$t$ 分布）
- 2つのクラスの点数のばらつきが違うかを判断する（$F$ 分布）

---

### 1. なぜ正規分布だけでは足りないのか

母集団が正規分布 $N(\\mu, \\sigma^2)$ のとき、標本平均を標準化した値は標準正規分布に従います（[正規分布の性質](/stats-pre1/1.10-normal-dist/)）。

$$Z = \\frac{\\bar{X} - \\mu}{\\sigma / \\sqrt{n}} \\sim N(0, 1)$$

「$\\sim$」は「この分布に従う」という意味です。この計算には母集団の標準偏差 $\\sigma$ が要りますが、実際の調査で $\\sigma$ が分かっていることはまずありません。そこで、データから計算した値で置き換えます。

#### 標本分散 $s^2$

$$s^2 = \\frac{1}{n-1}\\sum_{i=1}^{n} (X_i - \\bar{X})^2$$

その平方根 $s$ を標本標準偏差と呼びます。$n$ でなく $n-1$ で割るのは、平均からの差 $X_i - \\bar{X}$ の合計が必ず0になり、自由に動ける差が $n-1$ 個しかないからです。たとえば3人の点数の平均が70点なら、2人が60点と80点と分かった時点で3人目は70点に決まります。この $n-1$ を**自由度**と呼びます。$n-1$ で割ると $\\sigma^2$ を偏りなく推定できることは、[推定量の性質](/stats-pre1/1.15-estimator-props/)で確かめます。

$s$ も標本ごとにばらつくので、$\\sigma$ を $s$ に置き換えた値は $N(0,1)$ より外れやすくなります。どれだけ外れやすいかを知るには、先に $s^2$ がどうばらつくかを知る必要があります。そこで、まず $s^2$ のばらつき方を表すカイ二乗分布を学び（2節）、それを使って平均を判断する $t$ 分布（3節）、2つの $s^2$ を比べる $F$ 分布（4節）へ進みます。

---

### 2. ばらつきが大きくなったか？（カイ二乗分布）

#### ボルトの直径のばらつき

直径の標準偏差が $\\sigma = 0.05$ mm に保たれているはずの工程で、ボルトを10本測ると $s = 0.07$ mm でした。偶然この程度に大きく出ることはよくあるのでしょうか。母集団が正規分布なら、次の量が自由度 $n - 1 = 9$ の**カイ二乗分布**に従います。

$$\\frac{(n-1)s^2}{\\sigma^2} = \\frac{9 \\times 0.07^2}{0.05^2} = 17.64$$

[[f-chi2-tail]]

工程が変わらず $\\sigma = 0.05$ のままでも、どの10本を測るかで $s$ は毎回少しずつ違います。それでも 17.64 以上になる確率は約4.0%、25回に1回ほどです。たまたまそれが起きたと考えるより、$\\sigma$ が 0.05 より大きくなったと考える方が自然です。どれだけ珍しければ「変わった」と判断するか（よく使う基準は5%）は、[P値の解釈・検定の誤り・検出力](/stats-pre1/1.18-inference/)で扱います。

#### カイ二乗分布とは

独立な標準正規変数 $Z_1, \\ldots, Z_k$ の2乗の和が従う分布を、**自由度 $k$ のカイ二乗分布** $\\chi^2(k)$ と呼びます。

$$\\chi^2 = Z_1^2 + Z_2^2 + \\cdots + Z_k^2$$

$k = 1$ のときの密度は、[変数変換](/stats-pre1/1.9b-transform/)で $Z^2$ の分布として求めました。2乗の和なので0以上の値しかとりません。

期待値と分散は、$Z^2$ 1つ分から求めます。

$$\\begin{aligned} E[Z^2] &= V[Z] + (E[Z])^2 = 1 + 0 = 1 \\\\ V[Z^2] &= E[Z^4] - (E[Z^2])^2 = 3 - 1 = 2 \\end{aligned}$$

1行目は分散の式 $V[Z] = E[Z^2] - (E[Z])^2$ を移項したもの、2行目は標準正規分布で $E[Z^4] = 3$ となることを使っています。独立な $k$ 個を足すと期待値も分散も足し算になるので、$\\chi^2(k)$ の期待値は $k$、分散は $2k$ です。

#### $(n-1)s^2/\\sigma^2$ がカイ二乗分布に従う理由

ボルトの例で使った量は、$s^2$ の定義を代入すると次のように書き直せます。

$$\\frac{(n-1)s^2}{\\sigma^2} = \\sum_{i=1}^{n} \\left(\\frac{X_i - \\bar{X}}{\\sigma}\\right)^2$$

かっこの中は、平均からの差を $\\sigma$ で割って標準化した値です。もし $\\bar{X}$ の代わりに本当の平均 $\\mu$ を使えば、$(X_i - \\mu)/\\sigma$ は $n$ 個の独立な標準正規変数なので、2乗の和は $\\chi^2(n)$ です。$\\bar{X}$ を使うと、差の合計が必ず0になるという縛りが1つ入ります。1節で見たとおり自由に動ける差は $n-1$ 個になり、分布は $\\chi^2(n-1)$ になります。

#### 形と自由度

自由度を動かして形を見ます。

[[interactive:chi2]]

自由度を増やすと、山は右へ動いて広がり、左右対称に近づきます。$k$ が大きいときは中心極限定理から $N(k,\\, 2k)$ で近似できます。カイ二乗分布はガンマ分布 $\\text{Ga}(k/2,\\, 1/2)$ と同じ分布です（[指数分布とガンマ分布](/stats-pre1/1.8-continuous/)）。

正規母集団では、さらに $\\bar{X}$ と $s^2$ が独立になります。これが次の $t$ 分布の条件です。

---

### 3. 薬に効果はあるか？（t 分布）

#### $\\sigma$ が分からないまま平均を判断する

新薬を10人に使うと、血圧が平均 $\\bar{x} = 5$ mmHg 下がり、標本標準偏差は $s = 6$ mmHg でした。薬の効果が無い（$\\mu = 0$）としたら、この下がり方は珍しいでしょうか。1節の $Z$ の $\\sigma$ を $s$ に置き換えた量 $T$ を計算します。

$$T = \\frac{\\bar{x} - \\mu}{s / \\sqrt{n}} = \\frac{5 - 0}{6/\\sqrt{10}} \\approx 2.64$$

母集団が正規分布なら、$T$ は自由度 $n - 1 = 9$ の **$t$ 分布**に従います。

[[f-t-tail]]

$t(9)$ で $\\lvert T \\rvert$ が2.64以上になる確率は約2.7%です。薬に効果が無くても偶然これほど大きく動くのは37回に1回ほどなので、効果があると考える方が自然です。$s$ を $\\sigma$ のつもりで $N(0,1)$ を使うと約0.8%になり、確率を3分の1以下に小さく見積もってしまいます。

#### $T$ の分布が $\\sigma$ によらない理由

$T$ の式に $\\sigma$ はありません。ただ、$T$ がどんな分布に従うかを調べるときには $\\sigma$ を使います。分子と分母を同じ $\\sigma/\\sqrt{n}$ で割っても $T$ の値は変わらないので、割った形に書き直します。

$$\\begin{aligned} T &= \\frac{(\\bar{X} - \\mu)/(\\sigma/\\sqrt{n})}{s/\\sigma} \\\\ &= \\frac{Z}{\\sqrt{\\dfrac{(n-1)s^2/\\sigma^2}{n-1}}} \\\\ &= \\frac{Z}{\\sqrt{\\chi^2(n-1)/(n-1)}} \\end{aligned}$$

分子は1節の $Z$ で、分母のルートの中は2節のカイ二乗変数を自由度で割ったものです。$Z$ もカイ二乗変数も、$\\sigma$ がいくつでも同じ分布に従います。だから $T$ の分布は $\\sigma$ を知らなくても $t(n-1)$ と決まり、データだけで計算した $T$ を $t$ 分布と比べられます。

#### 形と自由度

[[interactive:t]]

$t$ 分布は0を中心に左右対称で、$N(0,1)$ より裾が厚い形です。分母の $s$ が小さめに出た標本では $T$ が大きくなるからです。自由度を増やすと $s$ が $\\sigma$ に近づき、$N(0,1)$ に近づきます。

| | 自由度9 | $N(0,1)$ |
|---|---|---|
| $\\lvert T \\rvert$ が2を超える確率 | 約7.7% | 約4.6% |
| 両側で5%になる点 | 2.262 | 1.96 |
| 分散 | $9/7 \\approx 1.29$ | 1 |

分散は自由度 $\\nu > 2$ のとき $\\nu/(\\nu - 2)$ です。自由度1の $t$ 分布は[コーシー分布](/stats-pre1/1.8b-ratio-lognormal-cauchy/)と同じで、期待値を持ちません。

---

### 4. 2つのばらつきは違うか？（F 分布）

#### 2つのクラスの点数

クラスA（11人）の点数の標本分散が120、クラスB（16人）が60でした。比は $120/60 = 2.0$ です。母分散が等しくても、この程度の比は偶然出るでしょうか。2つの正規母集団の母分散が等しいとき、標本分散の比は **$F$ 分布**に従います。

$$\\frac{s_1^2}{s_2^2} \\sim F(n_1 - 1,\\; n_2 - 1) = F(10,\\, 15)$$

[[f-f-tail]]

2.0以上になる確率は約11%で、この程度の差は偶然でも珍しくありません。

#### F 分布とは

独立な2つのカイ二乗変数を、それぞれ自由度で割ってから比をとった量の分布です。

$$F = \\frac{\\chi^2(k_1)/k_1}{\\chi^2(k_2)/k_2}$$

$s_1^2/\\sigma_1^2$ と $s_2^2/\\sigma_2^2$ の比をとると、等しい母分散は消えるので、標本分散の比がこの形になります。

[[interactive:f]]

分子と分母が同じ量を推定しているので、山は1の近くにできます。母分散が等しいなら1から大きく外れた比はめったに出ないので、そういう比が出たときは、2つの母分散が違うと考える方が自然です。

---

### 5. 3つの分布のつながり

ここまでの3つは、どれも標準正規分布に従う $Z$ から組み立てられています。

[[f-dist-family]]

| 分布 | 作り方 | 本文の例 |
|---|---|---|
| $\\chi^2(k)$ | $Z_1^2 + \\cdots + Z_k^2$ | ボルトのばらつき |
| $t(k)$ | $Z \\,/\\, \\sqrt{\\chi^2(k)/k}$ | 薬の効果 |
| $F(k_1, k_2)$ | $\\dfrac{\\chi^2(k_1)/k_1}{\\chi^2(k_2)/k_2}$ | 2クラスのばらつき |

自由度は、カイ二乗分布では足した個数、$t$ 分布では分母のカイ二乗変数の自由度、$F$ 分布では分子と分母の2つです。この組み立てから、次の2つの関係が出ます。

**$t$ 分布の2乗は $F(1,\\, k)$**：$T$ を2乗すると、次の形になります。

$$T^2 = \\frac{n(\\bar{X} - \\mu)^2}{s^2}$$

分母はデータの散らばりから、分子は平均のずれ1つから見積もった $\\sigma^2$ です（$\\bar{X}$ の分散は $\\sigma^2/n$ なので、$n$ 倍すると $\\sigma^2$ の見積もりになる）。$T^2$ も4節と同じ「分散の見積もり2つの比」で、自由度は1と $k = n - 1$ です。

[[f-t-fold]]

**$1/F(k_1,\\, k_2) = F(k_2,\\, k_1)$**：比の上下を入れ替えると、自由度も入れ替わります。$F$ 分布表の下側の値を上側の表から求めるときに使います。

---

### 6. 本当に差があるとき、どれくらい見つけられるか？（非心分布）

#### 中心がずれた t 分布

3節の $T$ は、式に入れた $\\mu$ が本当の母平均のときに $t$ 分布に従います。本当の母平均が別の値 $\\mu_1$ なら、$T$ の分子に $\\delta = (\\mu_1 - \\mu)\\sqrt{n}/\\sigma$ が加わり、山が右へずれます。

[[f-noncentral-t]]

$$T = \\frac{Z + \\delta}{\\sqrt{\\chi^2(n-1)/(n-1)}}$$

この $T$ が従う分布を**非心 $t$ 分布**、$\\delta$ を**非心度**と呼びます。$\\delta = 0$ のときが普通の $t$ 分布です。$\\delta$ が大きいほど（本当の差が大きいほど、$n$ が多いほど）山は右へずれ、2.262 のような大きな値を超えやすくなります。この面積が、本当に差があるときにそれを見つけられる確率（**検出力**）で、[P値の解釈・検定の誤り・検出力](/stats-pre1/1.18-inference/)で詳しく学びます。

カイ二乗分布と $F$ 分布にも同じ考え方の非心版があります。

- **非心 $\\chi^2$ 分布**：$Z_i$ を平均 $\\mu_i$・分散1の正規変数に替えた2乗の和。非心度は $\\lambda = \\sum \\mu_i^2$
- **非心 $F$ 分布**：分子を非心 $\\chi^2$ に替えた $F$。分散分析の検出力の計算で使う`,keyFormulas:[{label:`標本分散`,formula:`s^2 = \\frac{1}{n-1}\\sum_{i=1}^{n}(X_i - \\bar{X})^2`},{label:`カイ二乗分布`,formula:`\\chi^2 = Z_1^2 + Z_2^2 + \\cdots + Z_n^2 \\sim \\chi^2(n)`},{label:`標本分散とカイ二乗（正規母集団）`,formula:`\\frac{(n-1)s^2}{\\sigma^2} \\sim \\chi^2(n-1)`},{label:`t 分布の組み立て`,formula:`T = \\frac{Z}{\\sqrt{\\chi^2(k)/k}} \\sim t(k)`},{label:`t 統計量（正規母集団）`,formula:`T = \\frac{\\bar{X}-\\mu}{s/\\sqrt{n}} \\sim t(n-1)`},{label:`F 分布`,formula:`F = \\frac{\\chi^2(k_1)/k_1}{\\chi^2(k_2)/k_2}`}],interactiveType:`t`,quiz:[{id:`s1-1`,question:`$t$ 分布において、自由度を無限大に大きくしたときに近づく分布は？`,options:[`$F$ 分布`,`$\\chi^2$ 分布`,`標準正規分布`,`二項分布`],correctAnswer:2,explanation:`$t = Z / \\sqrt{\\chi^2(k)/k}$ の分母の $\\chi^2(k)/k$ は、期待値1・分散 $2/k$ なので、$k$ を増やすと1にほぼ決まります。分母が1なら $t$ は $Z$ そのもので、標準正規分布です。本文の操作図で自由度を上げると、裾が正規分布に重なっていくのが見えます。`},{id:`s1-2`,question:`独立な $n$ 個の標準正規変数を二乗して足し合わせたものが従う分布は？`,options:[`ガンマ分布`,`t分布`,`F分布`,`自由度 n のカイ二乗分布`],correctAnswer:3,explanation:`本文の組み立ての表のとおり、独立な標準正規変数 $Z_1, \\ldots, Z_n$ の2乗の和 $Z_1^2 + \\cdots + Z_n^2$ が自由度 $n$ のカイ二乗分布です。自由度は足した個数です。`},{id:`s1-3`,question:`F分布 $F(k_1, k_2)$ の逆数が従う分布は？`,options:[`$F(k_2, k_1)$`,`$\\chi^2(k_1)$`,`$t(k_2)$`,`$F(k_1, k_2)$`],correctAnswer:0,explanation:`$F = \\dfrac{\\chi^2(k_1)/k_1}{\\chi^2(k_2)/k_2}$ の逆数は、分子と分母を入れ替えた $\\dfrac{\\chi^2(k_2)/k_2}{\\chi^2(k_1)/k_1}$ です。これは分子の自由度が $k_2$、分母が $k_1$ の $F$ 分布なので、$F(k_2, k_1)$ に従います。`},{id:`s1-4`,question:`自由度 $k$ のカイ二乗分布の期待値はいくらか？`,options:[`$\\sqrt{k}$`,`$k$`,`$2k$`,`$k/2$`],correctAnswer:1,explanation:`分散の式 $V[Z] = E[Z^2] - (E[Z])^2$ で $E[Z] = 0$ なので、$Z^2$ 1つの期待値は $E[Z^2] = V[Z] = 1$ です。$k$ 個足すと期待値は $k$ です。分散は $Z^2$ 1つが2なので $2k$ です。$2k$ は分散と取り違えた値です。`},{id:`s1-5`,question:`正規母集団から10個の標本をとると、標本分散は $s^2 = 6$ だった。母分散を $\\sigma^2 = 4$ とすると、$(n-1)s^2/\\sigma^2$ の値と、それが従う分布の組み合わせはどれか？`,options:[`13.5、$\\chi^2(9)$`,`15、$\\chi^2(10)$`,`13.5、$\\chi^2(10)$`,`1.5、$F(9, 9)$`],correctAnswer:0,explanation:`値は $9 \\times 6 / 4 = 13.5$ です。平均からの差の合計が0になるので自由に動ける差は $n-1 = 9$ 個で、自由度9のカイ二乗分布 $\\chi^2(9)$ に従います。15 は $n = 10$ を掛けた誤り、1.5 は $s^2/\\sigma^2$ だけの値です。`},{id:`s1-6`,question:`自由度 1 の $t$ 分布は、どの特殊な分布と一致するか？`,options:[`指数分布`,`標準正規分布`,`カイ二乗分布`,`コーシー分布`],correctAnswer:3,explanation:`自由度1なら $t = Z / \\sqrt{Z_2^2} = Z / |Z_2|$ で、標準正規変数どうしの比です。[ベータ・対数正規・コーシー分布](/stats-pre1/1.8b-ratio-lognormal-cauchy/)で見たとおり、この比はコーシー分布に従い、期待値を持ちません。`},{id:`s1-7`,question:`自由度 $n$（$n > 2$）の $t$ 分布の分散について、正しい記述は？`,options:[`常に1より大きい`,`常に1より小さい`,`$n$ に依存しない`,`常に1である`],correctAnswer:0,explanation:`分散は $n/(n-2)$ で、分子が分母より2大きいので常に1より大きくなります（例：$n = 4$ で2、$n = 12$ で1.2）。分母の $s$ もばらつく分だけ、標準正規分布より裾が厚くなるためです。$n$ を増やすと1に近づくので、$n$ に依存しないは誤りです。`},{id:`s1-8`,question:`自由度 $n$ の $t$ 分布に従う変数を二乗すると、どの分布になるか？`,options:[`標準正規分布`,`自由度 (1, n) の F 分布`,`カイ二乗分布`,`コーシー分布`],correctAnswer:1,explanation:`$t = Z/\\sqrt{\\chi^2(n)/n}$ を2乗すると $t^2 = \\dfrac{Z^2/1}{\\chi^2(n)/n}$ で、$Z^2$ は自由度1のカイ二乗変数です。カイ二乗を自由度で割ったものの比なので $F(1, n)$ です。本文5節の図のとおり、$t$ の左右の裾が2乗で重なって $F$ の右の裾になります。`},{id:`s1-9`,question:`カイ二乗分布において自由度を大きくすると、どの分布に近似できるか？`,options:[`F分布`,`ポアソン分布`,`正規分布`,`t分布`],correctAnswer:2,explanation:`$\\chi^2(k)$ は独立な $Z_i^2$ を $k$ 個足したものなので、[中心極限定理](/stats-pre1/1.11-lln-clt/)から、$k$ が大きいと期待値 $k$・分散 $2k$ の正規分布 $N(k, 2k)$ で近似できます。本文の操作図で自由度を上げると、山が左右対称に近づきます。`},{id:`s1-10`,question:`自由度9の $t$ 統計量で、本当の母平均が式に入れた値からずれると非心 $t$ 分布に従う。非心度 $\\delta = (\\mu_1 - \\mu)\\sqrt{n}/\\sigma$ が大きくなると、何が起きるか？`,options:[`自由度が増える`,`$T$ の山が左へずれ、大きな値が出にくくなる`,`$T$ の山が右へずれ、2.262 のような大きな値を超える確率（検出力）が上がる`,`$T$ は必ず0に近い値になる`],correctAnswer:2,explanation:`非心度は分子に足される $\\delta$ で、本当の差 $\\mu_1 - \\mu$ が大きいほど、$n$ が多いほど大きくなります。$\\delta$ が大きいほど $T$ の山は右へずれ、2.262 を超える確率は $\\delta = 0$ の2.5% から、$\\delta = 2$ で約43%、$\\delta = 3$ で約76% に上がります。自由度は $n - 1$ のままです。`}]},{id:`1.13-sufficient-stats`,updatedAt:`2026-10-18`,title:`十分統計量と順序統計量`,chapter:5,description:`データを1つの値にまとめても母数の情報を失わない十分統計量（ネイマンの分解定理）と、小さい順に並べた k 番目の値の分布（順序統計量）を学びます。`,content:`💡 **このモジュールで学ぶこと**

読み終えると、次のことができるようになります。

- コインを10回投げた結果から表の確率 $p$ を推測するとき、表の回数だけ残して並び順を捨ててよい理由を言える（**十分統計量**）。ほかの分布でも、どの値を残せばよいかを**ネイマンの分解定理**で見つけられる
- 5個のデータを小さい順に並べたとき、3番目（中央値）がどの範囲に出やすいかを計算できる（**順序統計量**）
- 中央値のばらつきが、元の分布の真ん中の密度で決まることを説明できる

---

### 1. 十分統計量：情報を失わずにまとめる

#### コインの並び順は要るか

表の出る確率が $p$ のコインを10回投げ、次の順に出たとします。

表 表 表 裏 表 表 裏 表 表 裏

$p$ を知りたいとき、表が7回という数のほかに、この並び順は役に立つでしょうか。表が7回だったと分かったうえで、この並び順になる確率を $p$ を変えて比べます。

この並び順になる確率は $p^7(1-p)^3$ です。表が7回になる確率は、表の7回がどこに来るかの選び方 $\\binom{10}{7} = 120$ 通りを掛けた $120\\,p^7(1-p)^3$ です。

| | $p = 0.5$ | $p = 0.7$ |
|---|---|---|
| (a) この並び順になる確率 | 0.000977 | 0.002224 |
| (b) 表が7回になる確率 | 0.1172 | 0.2668 |
| 表が7回のとき、この並び順になる確率 (a)÷(b) | 1/120 | 1/120 |

表が7回と決まれば、並び方120通りはどれも同じ確率 $1/120$ で、$p$ によりません。並び順を見ても $p$ について何も分からないので、表の回数 $T = \\sum X_i$ だけを残せば足ります（表を1、裏を0として $X_i$ を足した値）。

このように、**$T$ を知ったうえでのデータの条件付き分布が母数によらない**とき、$T$ を**十分統計量**（Sufficient Statistic）と呼びます。$T$ を計算したら、元のデータを捨てても母数の推測で失うものはありません。

#### ネイマンの分解定理：残す値の見つけ方

条件付き分布を毎回計算するのは手間です。もっと簡単な見分け方を、同じコインで見ます。データ $\\mathbf{x} = (x_1, \\ldots, x_n)$ が得られる確率（連続なら密度）を、母数 $\\theta$ の関数として見たものを**尤度関数** $L(\\theta;\\, \\mathbf{x})$ と呼びます（[推定法](/stats-pre1/1.14-estimation/)で推定値を求めるのに使います）。コインを10回投げて表が $T$ 回なら、尤度関数は次の形です。

$$L(p;\\, \\mathbf{x}) = p^{T}(1-p)^{10-T}$$

$p$ を含むこの式に、データは表の回数 $T$ の形でしか入っていません。並び順は式のどこにも出てこないので、$p$ について何も教えません。上の表で確かめたことが、式を見るだけで分かります。

これを一般にしたのが**ネイマンの分解定理**です。尤度関数が、$T$ と $\\theta$ だけで決まる部分 $g$ と、$\\theta$ を含まない部分 $h$ の積に分けられるなら、$T$ は $\\theta$ の十分統計量です。

$$L(\\theta;\\, \\mathbf{x}) = g(T(\\mathbf{x}),\\, \\theta) \\cdot h(\\mathbf{x})$$

コインの例では $g = p^T(1-p)^{10-T}$、$h = 1$ です。$h$ にはデータが何の形で入っていてもかまいません。$\\theta$ を含まないので、$\\theta$ の推測には関係しないからです。

#### 分解の例

以下では、$X_1, \\ldots, X_n$ が互いに独立に同じ分布に従う（**i.i.d.** と書きます）とします。

**ポアソン分布** $\\text{Po}(\\lambda)$：

$$\\begin{aligned} L(\\lambda;\\, \\mathbf{x}) &= \\prod_{i=1}^{n} \\frac{e^{-\\lambda}\\lambda^{x_i}}{x_i!} \\\\ &= e^{-n\\lambda}\\lambda^{\\sum x_i} \\cdot \\frac{1}{\\prod x_i!} \\end{aligned}$$

- $g = e^{-n\\lambda}\\lambda^{\\sum x_i}$：$\\lambda$ を含む部分。データは合計 $\\sum x_i$ の形でしか入らない
- $h = 1/\\prod x_i!$：$\\lambda$ を含まない部分

よって、合計 $T = \\sum X_i$ が十分統計量です。

| 分布 | 母数 | 十分統計量 |
|---|---|---|
| ベルヌーイ（コイン） | $p$ | 表の回数 $\\sum X_i$ |
| ポアソン $\\text{Po}(\\lambda)$ | $\\lambda$ | 合計 $\\sum X_i$ |
| 正規 $N(\\mu, \\sigma^2)$、$\\sigma^2$ 既知 | $\\mu$ | 合計 $\\sum X_i$（または $\\bar{X}$） |
| 正規 $N(\\mu, \\sigma^2)$、両方未知 | $\\mu, \\sigma^2$ | 組 $(\\sum X_i,\\, \\sum X_i^2)$ |
| 一様 $U(0, \\theta)$ | $\\theta$ | 最大値 $X_{(n)}$ |

合計と平均のように1対1で行き来できる値は、どちらも十分統計量です。一様分布だけ形が違うのは、尤度が $\\theta^{-n}$（全部の $x_i$ が $\\theta$ 以下のとき）で、データは「最大値が $\\theta$ 以下か」という形でしか入らないからです。

---

### 2. 順序統計量：小さい順に並べた k 番目の値

#### 中央値はどこに出やすいか

5個のデータの代表として、小さい順に並べた3番目（中央値）を使うとします。データを取り直せば、中央値も変わります。中央値がどの範囲に出やすいかを知るには、「小さい順に並べて $k$ 番目の値」の分布が要ります。

$n$ 個の標本を小さい順に並べた $X_{(1)} \\leq X_{(2)} \\leq \\cdots \\leq X_{(n)}$ を**順序統計量**と呼びます。$X_{(1)}$ が最小値、$X_{(n)}$ が最大値で、中央値や四分位数も順序統計量です。

最大値と最小値の分布 $P(X_{(n)} \\leq x) = F(x)^n$、$P(X_{(1)} > x) = \\{1 - F(x)\\}^n$ は、[極値分布](/stats-pre1/1.9c-extreme-value/)で学びました。ここでは途中の $k$ 番目に広げます。

#### k 番目の値の密度

$X_{(k)}$ がちょうど $x$ のあたりに来るのは、$n$ 個が3つの組に分かれるときです。5個の3番目なら、図のように2個・1個・2個に分かれます。

[[f-order-split]]

1. $k-1$ 個が $x$ より小さい：確率 $F(x)^{k-1}$
2. 1個が $x$ のあたりにある：密度 $f(x)$
3. 残りの $n-k$ 個が $x$ より大きい：確率 $\\{1 - F(x)\\}^{n-k}$

3つを掛け、$n$ 個をこの3組に分ける分け方の数を掛けると、密度になります。

$$\\begin{aligned} f_{X_{(k)}}(x) &= \\frac{n!}{(k-1)!\\,(n-k)!} \\\\ &\\quad \\times F(x)^{k-1}\\, \\{1 - F(x)\\}^{n-k}\\, f(x) \\end{aligned}$$

先頭の分数が分け方の数です。$k = n$ とすると最大値の密度 $nF(x)^{n-1}f(x)$ になり、上の $F(x)^n$ を微分したものと一致します。

#### 一様分布で形を見る

0から1の一様分布 $U(0, 1)$ では $F(x) = x$、$f(x) = 1$ なので、$X_{(k)}$ の密度は $x^{k-1}(1-x)^{n-k}$ に比例します。これは[ベータ分布](/stats-pre1/1.8b-ratio-lognormal-cauchy/) $\\text{Be}(k,\\, n-k+1)$ で、期待値は $k/(n+1)$ です。

[[f-order-stats]]

**数値例**：5個とったとき、中央値 $X_{(3)}$ が0.3以下になるのは、5個のうち3個以上が0.3以下のときです。二項分布で数えると約16.3% です。

#### 中央値のばらつき

$n$ が大きいとき、標本中央値 $M$ は真の中央値 $m$（$F(m) = 0.5$）のまわりで正規分布に近づきます。

$$M \\approx N\\!\\left(m,\\; \\frac{1}{4n\\, f(m)^2}\\right)$$

$m$ での密度 $f(m)$ が高いほど、データが中央値の近くに集まるので、中央値のばらつきは小さくなります。分散がどちらも1の正規分布と一様分布で比べます。真ん中の密度は正規分布が0.40、一様分布が0.29なので、25個の中央値の標準偏差は $1/(2\\sqrt{25}\\, f(m))$ から 0.25 と 0.35 になります。

[[f-median-spread]]

**数値例**：正規分布 $N(\\mu, \\sigma^2)$ なら $m = \\mu$、$f(m) = 1/(\\sigma\\sqrt{2\\pi})$ なので、中央値の分散は $\\pi\\sigma^2/(2n) \\approx 1.57\\,\\sigma^2/n$ です。標本平均の分散 $\\sigma^2/n$ の約1.57倍で、正規分布では平均のほうがばらつきが小さくなります。`,keyFormulas:[{label:`ネイマンの分解定理`,formula:`L(\\theta;\\mathbf{x}) = g(T(\\mathbf{x}),\\theta)\\cdot h(\\mathbf{x})`},{label:`順序統計量の PDF`,formula:`\\begin{aligned} &f_{X_{(k)}}(x) = \\dfrac{n!}{(k-1)!(n-k)!} \\\\ &\\quad \\times [F(x)]^{k-1}[1-F(x)]^{n-k}f(x) \\end{aligned}`},{label:`一様分布の k 番目の値`,formula:`\\begin{aligned} &X_{(k)} \\sim \\text{Be}(k,\\, n-k+1) \\\\ &E[X_{(k)}] = \\dfrac{k}{n+1} \\end{aligned}`},{label:`標本中央値の近似分布`,formula:`M \\approx N\\!\\left(m,\\; \\dfrac{1}{4n\\,f(m)^2}\\right)`}],quiz:[{id:`ss1-1`,question:`ネイマンの分解定理で「十分統計量 $T$」を使う主な理由はどれか？`,options:[`推定量の不偏性を保証する`,`データを $T$ だけに圧縮してもパラメータの推定で情報損失がない`,`計算が容易になる`,`サンプルサイズを減らせる`],correctAnswer:1,explanation:`十分統計量 $T$ は、$T$ を知ったうえでのデータの条件付き分布が母数によらない統計量です。コインなら、表の回数が分かれば並び順は $p$ について何も教えてくれません。そのため $T$ だけを残しても、母数の推測で失う情報がありません。`},{id:`ss1-2`,question:`ポアソン分布 $\\text{Po}(\\lambda)$ のi.i.d.標本 $X_1,\\ldots,X_n$ における $\\lambda$ の十分統計量はどれか？`,options:[`$X_1$（1個目の値）`,`$\\sum X_i^2$（2乗の合計）`,`$\\sum X_i$（合計）`,`$\\max(X_i)$`],correctAnswer:2,explanation:`本文の分解の例のとおり、尤度は $g = e^{-n\\lambda}\\lambda^{\\sum x_i}$ と $h = 1/\\prod x_i!$ に分かれ、$\\lambda$ を含む $g$ にデータは合計 $\\sum x_i$ の形でしか入りません。よって合計が十分統計量です。合計と1対1で行き来できる標本平均でもかまいません。2乗の合計や最大値からは合計が決まらないので、十分統計量ではありません。`},{id:`ss1-3`,question:`順序統計量 $X_{(1)},\\ldots,X_{(n)}$ のうち、最小値 $X_{(1)}$ の分布の特徴はどれか？`,options:[`$n$ に依存しない分布`,`$P(X_{(1)} \\le x) = F(x)^n$`,`元の分布より大きい値に出やすい`,`$P(X_{(1)} > x) = [1-F(x)]^n$（全観測値が $x$ を超える確率）`],correctAnswer:3,explanation:`最小値が $x$ を超えるのは、$n$ 個全部が $x$ を超えるときだけなので $P(X_{(1)}>x) = [1-F(x)]^n$ です。$F(x)^n$ は全部が $x$ 以下になる確率で、最大値の式です。$n$ が増えると、最小値は元の分布の左端に近づきます。`},{id:`ss1-4`,question:`順序統計量 $X_{(k)}$ の分布において、$k=n/2$（中央値）の漸近分布はどれか（$n$ が大きいとき）？`,options:[`正規分布`,`$t$ 分布`,`ポアソン分布`,`一様分布`],correctAnswer:0,explanation:`本文の中央値のばらつきの式のとおり、$n$ が大きいと標本中央値は真の中央値 $m$（$F(m)=0.5$）を中心とする正規分布に近づき、分散は $1/(4n f(m)^2)$ です（$f$ は元の分布の密度）。真ん中の密度が高いほど細くなります。`},{id:`ss1-5`,question:`正規分布 $N(\\mu, \\sigma^2)$（$\\sigma^2$ 既知）の i.i.d. 標本における $\\mu$ の十分統計量はどれか？`,options:[`$\\sum X_i^2$`,`$\\bar{X}$（標本平均）`,`$\\max(X_i)$`,`$X_{(1)}$（最小値）`],correctAnswer:1,explanation:`尤度の指数の中の $\\sum(x_i-\\mu)^2$ を展開すると $\\sum x_i^2 - 2\\mu\\sum x_i + n\\mu^2$ です。$\\mu$ を含む項にデータは $\\sum x_i$ の形でしか入らず、$\\sum x_i^2$ の項は $\\mu$ を含まない部分 $h$ に入ります。よって $\\sum X_i$、または1対1で行き来できる $\\bar{X}$ が十分統計量です。`},{id:`ss1-6`,question:`0から1の一様分布 $U(0,1)$ から独立に5個とったとき、小さい方から2番目の値 $X_{(2)}$ の期待値はいくらか？`,options:[`$1/3$`,`$2/5$`,`$1/6$`,`$1/2$`],correctAnswer:0,explanation:`一様分布の $k$ 番目の値はベータ分布 $\\text{Be}(k,\\, n-k+1)$ に従い、期待値は $k/(n+1)$ です。$k = 2$、$n = 5$ なので $2/6 = 1/3$ です。5個の値は0から1をおよそ6等分する位置に並ぶ、と覚えられます。$2/5$ は $k/n$ と取り違えた値です。`},{id:`ss1-7`,question:`ネイマンの分解定理の因数分解 $L(\\theta;\\mathbf{x}) = g(T(\\mathbf{x}),\\theta) \\cdot h(\\mathbf{x})$ において $h(\\mathbf{x})$ の条件は何か？`,options:[`$\\theta$ と $T$ のいずれにも依存しない`,`$T$ のみに依存する`,`$\\theta$ と $T$ の両方に依存する`,`$\\theta$ に依存しない`],correctAnswer:3,explanation:`$h(\\mathbf{x})$ はデータだけで決まり、母数 $\\theta$ を含まないことが条件です。$\\theta$ を含む部分 $g$ にデータが $T$ の形でしか入っていなければ、$T$ 以外の情報は $\\theta$ の推測に関係しません。$h$ は $T$ 以外のデータを含んでいてもかまいません（ポアソン分布の $1/\\prod x_i!$ など）。`},{id:`ss1-8`,question:`一様分布 $U(0, \\theta)$ の i.i.d. 標本 $X_1,\\ldots,X_n$ における $\\theta$ の十分統計量はどれか？`,options:[`$X_{(n)}$（最大値）`,`$X_{(1)}$（最小値）`,`$\\bar{X}$`,`$\\sum X_i$`],correctAnswer:0,explanation:`$U(0,\\theta)$ の尤度 $L(\\theta;\\mathbf{x}) = \\theta^{-n} \\cdot \\mathbf{1}[x_{(n)} \\leq \\theta]$ は最大値 $X_{(n)}$ を通じてのみ $\\theta$ に依存します（$\\mathbf{1}[\\cdot]$ は指示関数）。したがって $X_{(n)}$ が $\\theta$ の十分統計量であり、最尤推定量にもなります。`},{id:`ss1-9`,question:`正規分布 $N(\\mu, \\sigma^2)$（$\\mu, \\sigma^2$ 両方未知）のi.i.d.標本における十分統計量はどれか？`,options:[`$S^2$（標本分散）のみ`,`$(\\bar{X}, S^2)$ の組`,`$X_{(1)}$ と $X_{(n)}$`,`$\\bar{X}$ のみ`],correctAnswer:1,explanation:`$\\sigma^2$ も未知だと、前の問いで $h$ に回せた $\\sum x_i^2$ の項も母数 $\\sigma^2$ を含みます。そのため2つの値の組 $(\\sum X_i, \\sum X_i^2)$ が十分統計量です。この組から $\\bar{X}$ と $S^2$ が計算でき、逆に $(\\bar{X}, S^2)$ からこの組も戻せるので、$(\\bar{X}, S^2)$ の組も十分統計量です。片方だけでは足りません。`},{id:`ss1-10`,question:`二項分布 $B(n, p)$ の i.i.d. 試行における $p$ の十分統計量はどれか？（$n$ 固定、各試行で1または0のベルヌーイ観測）`,options:[`$\\max(X_i)$`,`$X_1$（1回目の結果）`,`$X_1 + X_2$（最初の2回の合計）`,`$\\sum X_i$（表の合計回数）`],correctAnswer:3,explanation:`本文のコインの例と同じで、尤度 $p^{\\sum x_i}(1-p)^{n-\\sum x_i}$ にデータは表の合計回数の形でしか入りません（$h = 1$）。最初の1回や2回だけでは残りの試行の表の数が失われ、$p$ の推測に使える情報が減ります。`}]},{id:`1.14-estimation`,updatedAt:`2026-10-19`,title:`推定法：最尤推定法とモーメント法`,chapter:6,description:`データから母数の値を求める2つの方法、最尤推定法（尤度を最大にする）とモーメント法（平均をデータの平均と等しいとおく）を、図と例で学びます。`,content:`💡 **このモジュールでできるようになること**

- 10回中7回表のデータから、表の確率 $p$ の値を最尤推定法で計算できる
- 尤度の山の頂上を、対数をとってから微分して求める理由を言える
- 最尤推定とモーメント法の答えが違う一様分布で、どちらが良いかを図で言える

求めた値がどれだけ良いか（偏り・ばらつき）は、次の[推定量の性質](/stats-pre1/1.15-estimator-props/)で学びます。

---

### 1. データから母数の値を決める

#### データを入れると数が出てくる関数

コインの表の確率 $p$ は、無限に投げない限り分かりません。10回投げた結果から $p$ の値を1つ決めるには、データから数を作る決まりが要ります。

一般に、母数 $\\theta$ は未知です。データ $X_1, \\ldots, X_n$ から $\\theta$ を推測する関数を**推定量** $\\hat{\\theta}$（シータハット）と呼び、実際のデータを入れて出てきた数を**推定値**と呼びます。

[[f-estimator-flow]]

---

### 2. 最尤推定法

#### 尤度：母数ごとの「データの起こりやすさ」

コインを10回投げて7回表が出たとします。表の確率が $p$ なら、この結果が出る確率は $p^7(1-p)^3$ に比例します。これを $p$ の関数として見たものが**尤度関数** $L(p)$ です。

[[f-likelihood]]

一般には、母数が $\\theta$ のときに今のデータが得られる確率（連続なら密度）を $\\theta$ の関数として見たものが尤度 $L(\\theta)$ で、これを最大にする $\\hat{\\theta}$ が**最尤推定量**（MLE）です。

#### 対数をとっても頂上は同じ

独立なデータの尤度は積 $L(\\theta) = \\prod f(x_i; \\theta)$ です。対数をとると和になって微分しやすく、頂上の位置も変わりません。

[[f-likelihood-peak]]

#### 4つの手順で求める

10回中7回表の例で、$p$ の最尤推定値を求めます。

1. **尤度を書く**：$L(p) = p^7 (1-p)^3$
2. **対数をとる**：$\\ell(p) = 7\\log p + 3\\log(1-p)$
3. **微分して0とおく**（スコア方程式）：$\\dfrac{7}{p} - \\dfrac{3}{1-p} = 0$ より $\\hat{p} = 0.7$
4. **頂上か確かめる**：2階微分 $-\\dfrac{7}{p^2} - \\dfrac{3}{(1-p)^2}$ が負なので最大

一般に $n$ 回中 $k$ 回なら $\\hat{p} = k/n$ で、表の割合そのものです。

#### 正規分布の最尤推定量

身長や部品の重さのように正規分布 $N(\\mu, \\sigma^2)$ に従うデータ $n$ 個から、平均 $\\mu$ とばらつき $\\sigma^2$ を同じ手順で求めます。対数尤度は次の形です。

$$\\begin{aligned}\\ell(\\mu, \\sigma^2) = &-\\frac{n}{2}\\log(2\\pi\\sigma^2) \\\\ &- \\frac{1}{2\\sigma^2}\\sum_{i=1}^{n}(X_i - \\mu)^2\\end{aligned}$$

- $\\mu$ で微分して0とおくと $\\sum(X_i - \\mu) = 0$ なので、$\\hat{\\mu}$ はデータの平均
- $\\sigma^2$ で微分して0とおくと、平均からのずれの二乗を平均したものが $\\hat{\\sigma}^2$

$$\\hat{\\mu} = \\bar{X}, \\qquad \\hat{\\sigma}^2 = \\frac{1}{n}\\sum_{i=1}^{n}(X_i - \\bar{X})^2$$

$\\hat{\\sigma}^2$ は $n$ で割るので、平均すると真の $\\sigma^2$ より少し小さくなります（$E[\\hat{\\sigma}^2] = \\frac{n-1}{n}\\sigma^2$）。

| $n$ | 2 | 5 | 10 | 30 |
|---|---|---|---|---|
| $E[\\hat{\\sigma}^2] / \\sigma^2$ | 0.50 | 0.80 | 0.90 | 0.97 |

$n$ が大きければ偏りはほぼ消えます。最尤推定量は、いつも偏りがないとは限りません。誤差が正規分布に従う回帰では、最尤推定と最小二乗法が同じ答えになります（[重回帰分析とモデル評価](/stats-pre1/2.1-regression/)）。

---

### 3. モーメント法

#### 尤度を書かずに、平均から逆算する

尤度の式が複雑で微分が大変なときでも、分布の平均を母数で書けさえすれば使えるのがモーメント法です。分布の平均 $E[X]$ を母数で書き、それをデータの平均 $\\bar{X}$ と等しいとおいて解きます。母数が2つなら、$E[X^2]$ と $\\frac{1}{n}\\sum X_i^2$ も等しいとおきます。

**例**：指数分布 $\\text{Exp}(\\lambda)$ は $E[X] = 1/\\lambda$ なので、$1/\\hat{\\lambda} = \\bar{X}$ より $\\hat{\\lambda} = 1/\\bar{X}$ です。故障までの時間の平均が2時間なら $\\hat{\\lambda} = 0.5$（1時間あたり0.5回）です。

#### 2つの方法の答えを並べる

| 分布 | 最尤推定 | モーメント法 |
|---|---|---|
| ベルヌーイ $p$ | $\\bar{X}$ | $\\bar{X}$ |
| ポアソン $\\lambda$ | $\\bar{X}$ | $\\bar{X}$ |
| 指数 $\\lambda$ | $1/\\bar{X}$ | $1/\\bar{X}$ |
| 正規 $\\mu$ | $\\bar{X}$ | $\\bar{X}$ |
| 正規 $\\sigma^2$ | $\\hat{\\sigma}^2$（上の式） | 同じ |
| 一様 $U(0, \\theta)$ | 最大値 $X_{(n)}$ | $2\\bar{X}$ |

多くの分布で2つは一致しますが、一様分布では違います。$E[X] = \\theta/2$ なのでモーメント法は $2\\bar{X}$、最尤推定は最大値です（理由は次の節）。

たとえば $U(0, \\theta)$ から5個とって 1.2、4.9、0.6、2.8、0.5 だったとします。平均は 2.0 なので、モーメント法では $\\hat{\\theta} = 4.0$ です。ところが 4.9 という値が出ているので $\\theta$ は 4.9 以上のはずで、4.0 はありえない値です。最尤推定の最大値 4.9 なら、こうはなりません。

どちらが良いかを、推定値の散らばりで比べます。

[[f-mm-vs-mle]]

最尤推定は、データの情報を尤度を通してすべて使うので、$n$ が大きいとき一般にモーメント法よりばらつきが小さくなります。モーメント法は計算が簡単で、最尤推定を数値計算で求めるときの出発点にも使います。

---

### 4. 微分で求まらないとき

#### 尤度が跳ぶ・山が2つある

「微分して0」は、尤度がなめらかで頂上が1つのときの方法です。次の2つは注意が要ります。

[[f-likelihood-trouble]]

- **一様分布** $U(0, \\theta)$：尤度は $\\theta$ が最大値以上のとき $\\theta^{-n}$、それより小さいと0です。傾きが0になる点が無く、跳んだ所の最大値 $X_{(n)}$ が最尤推定量です
- **山が2つある尤度**：数値計算で頂上を探すと、出発点によって小さい方の山に止まります。出発点を変えて何度か計算し、尤度が最大のものを選びます`,keyFormulas:[{label:`対数尤度`,formula:`\\ell(\\theta) = \\log L(\\theta) = \\sum_{i=1}^n \\log f(x_i; \\theta)`},{label:`スコア方程式`,formula:`\\dfrac{\\partial \\ell}{\\partial \\theta} = 0`},{label:`正規分布のMLE（平均）`,formula:`\\hat{\\mu}_{\\text{MLE}} = \\bar{X}`},{label:`正規分布のMLE（分散）`,formula:`\\hat{\\sigma}^2_{\\text{MLE}} = \\dfrac{1}{n}\\sum(X_i-\\bar{X})^2`}],quiz:[{id:`est1-11`,question:`尤度関数 $L(\\theta)$ の直感的な意味として正しいものはどれか？`,options:[`$\\theta$ ごとに決まる、推定値と真の値のずれの大きさ`,`データを見たあとで、$\\theta$ が真の値である確率`,`今のデータが得られる確率を、$\\theta$ の関数として見たもの`,`$\\theta$ を1つ決めたときに、データの平均がとる値`],correctAnswer:2,explanation:`尤度は、母数を $\\theta$ と仮定したときに今のデータが得られる確率（連続なら密度）です。10回中7回表なら $L(p) = p^7(1-p)^3$ で、$p$ を動かして山の頂上を探すのが最尤推定です。$\\theta$ が真の値である確率ではありません（$p^7(1-p)^3$ を $p$ について0から1まで積分しても1になりません）。`},{id:`est1-3`,question:`最尤推定量を求める際に「対数尤度」を使う主な理由はどれか？`,options:[`対数をとると、頂上の位置が見つけやすい所へずれるから`,`積の形が和に変わり、微分しやすくなるから`,`対数をとると、尤度が正規分布の形に近づくから`,`尤度が負の値になっても計算できるようになるから`],correctAnswer:1,explanation:`独立なデータの尤度は $L = \\prod f(x_i;\\theta)$（積の形）です。$\\log L = \\sum \\log f(x_i;\\theta)$（和の形）にすると、項ごとに微分できます。本文の図のとおり、対数をとっても山の頂上の位置は変わりません（$\\log$ は増える関数なので、大小の順が保たれる）。`},{id:`est1-6`,question:`正規分布 $N(\\mu, \\sigma^2)$ の $\\mu$ の最尤推定量（MLE）はどれか？`,options:[`標本平均 $\\bar{X}$`,`$\\frac{1}{n}\\sum X_i^2$`,`中央値`,`$\\frac{1}{n-1}\\sum X_i$`],correctAnswer:0,explanation:`対数尤度 $\\ell(\\mu) = -\\frac{n}{2}\\log(2\\pi\\sigma^2) - \\frac{1}{2\\sigma^2}\\sum(X_i-\\mu)^2$ を最大化すると $\\hat{\\mu} = \\bar{X}$ が得られます。これは不偏推定量でもあります。一方 $\\hat{\\sigma}^2 = \\frac{1}{n}\\sum(X_i-\\bar{X})^2$ は不偏ではない点に注意。`},{id:`est1-7`,question:`モーメント法（Method of Moments）でポアソン分布 $\\text{Po}(\\lambda)$ の $\\lambda$ を推定するとき、推定量はどれか？`,options:[`$\\sum X_i$（合計）`,`$\\bar{X}$（標本平均）`,`$S^2$（標本分散）`,`$\\max(X_i)$（最大値）`],correctAnswer:1,explanation:`ポアソン分布の平均は $E[X] = \\lambda$ です。これをデータの平均 $\\bar{X}$ と等しいとおくと $\\hat{\\lambda} = \\bar{X}$ です。最尤推定も $\\bar{X}$ で、本文の表のとおり2つは一致します。$S^2$ は分散を等しいとおいた値で、まず平均から等しいとおくモーメント法の答えではありません。`},{id:`est1-10`,question:`正規分布 $N(\\mu, \\sigma^2)$ の $\\sigma^2$ の MLE $\\hat{\\sigma}^2 = \\frac{1}{n}\\sum(X_i-\\bar{X})^2$ はなぜ不偏でないか？`,options:[`$n$ で割るので、データが多いほど値が大きくなりすぎるから`,`$E[\\hat{\\sigma}^2] = \\frac{n-1}{n}\\sigma^2$ で、真の値より小さくなるから`,`平均 $\\mu$ が分かっていないと、計算できない式だから`,`最尤推定量は、どの分布でも必ず偏りを持つから`],correctAnswer:1,explanation:`$\\bar{X}$ はデータに最も近い点なので、$\\bar{X}$ からのずれの二乗和は、真の $\\mu$ からのずれの二乗和より小さくなります。そのため平均すると $E[\\hat{\\sigma}^2] = \\frac{n-1}{n}\\sigma^2$ で、本文の表のとおり $n = 10$ なら真の値の0.90倍です。偏りを無くすには分母を $n-1$ にした不偏分散 $S^2$ を使います。$\\hat{\\mu} = \\bar{X}$ のように偏りの無い最尤推定量もあります。`},{id:`est1-12`,question:`一様分布 $U(0, \\theta)$ の $\\theta$ をモーメント法で推定するとき、推定量はどれか？`,options:[`$2\\bar{X}$`,`$\\bar{X}$`,`$\\max(X_i)$`,`$\\bar{X}/2$`],correctAnswer:0,explanation:`$U(0, \\theta)$ の平均は $\\theta/2$ です。これをデータの平均と等しいとおくと $\\hat{\\theta}/2 = \\bar{X}$ なので $\\hat{\\theta} = 2\\bar{X}$ です。最尤推定量は最大値 $\\max(X_i)$ で、一様分布では2つの方法の答えが違います。$\\bar{X}/2$ は等式の向きを取り違えた値です。`},{id:`est1-13`,question:`指数分布 $\\text{Exp}(\\lambda)$（$f(x) = \\lambda e^{-\\lambda x}$、$E[X] = 1/\\lambda$）の MLE はどれか？`,options:[`$1/\\bar{X}$`,`$\\sqrt{\\bar{X}}$`,`$n / \\sum X_i^2$`,`$\\bar{X}$`],correctAnswer:0,explanation:`対数尤度 $\\ell(\\lambda) = n\\log\\lambda - \\lambda \\sum X_i$ を微分すると $n/\\lambda - \\sum X_i = 0$、解くと $\\hat{\\lambda} = n/\\sum X_i = 1/\\bar{X}$ です。モーメント法（$E[X] = 1/\\lambda$ から $\\hat{\\lambda} = 1/\\bar{X}$）と一致します。`},{id:`est1-14`,question:`モーメント法と MLE を比較したとき、一般に正しいものはどれか？`,options:[`モーメント法は計算が簡単なうえ、どの分布でも精度も高い`,`$n$ が大きいとき、一般に最尤推定の方がばらつきが小さい`,`どの分布でも、2つの方法は同じ推定量を与える`,`モーメント法は、正規分布のときにしか使えない`],correctAnswer:1,explanation:`最尤推定はデータの情報を尤度を通してすべて使うので、$n$ が大きいとき一般にモーメント法よりばらつきが小さくなります。一様分布 $U(0, 1)$ から10個とると、真の値からのずれ（二乗誤差の平方根）は最尤推定の最大値が約0.12、モーメント法の $2\\bar{X}$ が約0.18です。ポアソン分布のように両者が一致する場合もあります。`},{id:`est1-15`,question:`正規誤差モデルで最小二乗推定（OLS）と MLE の関係はどれか？`,options:[`最小二乗法は偏りが無いが、最尤推定は必ず偏りを持つ`,`どんな誤差でも、最小二乗法の方が最尤推定より精度が高い`,`誤差が正規分布なら、2つは同じ係数の推定値を与える`,`最尤推定は、直線でないモデルにしか使えない`],correctAnswer:2,explanation:`誤差が $N(0, \\sigma^2)$ に従うとき、対数尤度は「定数 $-$ 残差の二乗和 $/(2\\sigma^2)$」の形になります。尤度を最大にすることは残差の二乗和を最小にすることと同じなので、2つの方法は同じ係数を与えます。本文の正規分布の対数尤度で、$\\sum(X_i - \\mu)^2$ を小さくする $\\mu$ を選んだのと同じ形です。`},{id:`est1-16`,question:`連続一様分布 $\\text{Uniform}(0, \\theta)$ の MLE はどれか？`,options:[`$\\min(X_i)$（標本最小値）`,`$\\bar{X}$`,`$2\\bar{X}$`,`$\\max(X_i)$（標本最大値）`],correctAnswer:3,explanation:`尤度 $L(\\theta) = \\theta^{-n}$（$\\theta \\geq \\max(X_i)$ のとき）は $\\theta$ が小さいほど大きくなります。最小の $\\theta$ は $\\max(X_i)$（これより小さくするとデータが説明不可能）なので MLE は $\\hat{\\theta} = \\max(X_i)$ です。スコア方程式が使えない例として重要です。`}]},{id:`1.15-estimator-props`,updatedAt:`2026-10-20`,title:`推定量の性質：不偏性・一致性・有効性の理論`,chapter:6,description:`推定量の良さを測る物差し（不偏性・平均二乗誤差・一致性・有効性）と、分散の下限を与えるクラーメル・ラオの不等式、最小二乗法の良さを保証するガウス・マルコフの定理を、図で学びます。`,content:`💡 **このモジュールでできるようになること**

[推定法](/stats-pre1/1.14-estimation/)では、同じ一様分布のデータから、最尤推定とモーメント法で違う答えが出ました。どちらの推定量が良いのかを決めるには、物差しが要ります。

- 分散を $n$ で割る推定量と $n-1$ で割る推定量を、偏りとばらつきの両方で比べられる
- 母平均を標本平均と標本中央値のどちらで推定すべきかを、分散の比で言える
- 不偏推定量の分散がどこまで小さくできるか（クラーメル・ラオの下限）を、正規分布で計算できる

---

### 1. 良い推定量とは

#### ダーツで見る偏りとばらつき

1回の推定値が真の値に近かったかどうかでは、推定量の良し悪しは決まりません。データをとり直すたびに推定値は変わるからです。そこで、とり直しを何度も繰り返したときの推定値の散らばり方で比べます。的の中心を真の値 $\\theta$、矢1本を「1回分のデータから計算した推定値 $\\hat{\\theta}$」と見ます。

[[f-darts]]

この図の見方を、次の節から1つずつ式にします。

- **不偏性**：推定値の平均が真の値（$E[\\hat{\\theta}] = \\theta$）。図の上の段
- **一致性**：$n$ を増やすと真の値に集まる（$\\hat{\\theta} \\xrightarrow{p} \\theta$）
- **有効性**：不偏な推定量の中でばらつきが小さい（$\\text{Var}(\\hat{\\theta})$ が最小）。図の左上

---

### 2. 不偏性と平均二乗誤差

#### 不偏分散と n で割る分散

正規分布の分散 $\\sigma^2$ をデータから推定するとき、平均からのずれの二乗和を $n$ で割るか $n-1$ で割るかで、2つの推定量ができます。

$$S^2 = \\frac{1}{n-1}\\sum_{i=1}^{n}(X_i - \\bar{X})^2$$

$$\\hat{\\sigma}^2 = \\frac{1}{n}\\sum_{i=1}^{n}(X_i - \\bar{X})^2$$

[[f-variance-estimators]]

$S^2$ は $E[S^2] = \\sigma^2$ で不偏なので**不偏分散**と呼びます。$\\hat{\\sigma}^2$（最尤推定量）は平均が $\\frac{n-1}{n}\\sigma^2$ で、少し小さめに偏ります。

#### なぜ n−1 で割ると偏りが消えるのか

$\\bar{X}$ はデータ自身の真ん中なので、データから $\\bar{X}$ までのずれは、真の $\\mu$ までのずれより平均して小さくなります。どれだけ小さいかは、ずれの二乗和を2つに分けると分かります。

$$\\sum (X_i - \\mu)^2 = \\sum (X_i - \\bar{X})^2 + n(\\bar{X} - \\mu)^2$$

[[f-nminus1]]

- 左辺の平均は $n\\sigma^2$（1個あたり $\\sigma^2$ が $n$ 個）
- 右辺の第2項の平均は $n \\times \\sigma^2/n = \\sigma^2$（$\\bar{X}$ の分散が $\\sigma^2/n$ のため）
- だから第1項の平均は $(n-1)\\sigma^2$ で、$n-1$ で割るとちょうど $\\sigma^2$ になる

$n$ で割ると $\\sigma^2$ の $\\frac{n-1}{n}$ 倍しか出ません（$n = 5$ なら0.80倍）。[推定法](/stats-pre1/1.14-estimation/)の表で見た偏りは、ここから来ています。

#### 偏りが無い方が、真の値に近いとは限らない

図では、$S^2$ は平均が真の値にありますが幅が広く、$\\hat{\\sigma}^2$ は平均が少し左にずれていますが幅が狭くなっていました。どちらが真の値に近いかは、ずれの2乗の平均で測ります。これが**平均二乗誤差**（MSE）で、偏りの2乗と分散の和に分かれます。

$$\\begin{aligned} \\text{MSE}(\\hat{\\theta}) &= E[(\\hat{\\theta} - \\theta)^2] \\\\ &= \\{E[\\hat{\\theta}] - \\theta\\}^2 + \\text{Var}(\\hat{\\theta}) \\end{aligned}$$

第1項はダーツの図の「平均が中心からどれだけずれているか」、第2項は「矢がどれだけ散らばっているか」です。図の2つ（$n = 5$、$\\sigma^2 = 1$）を数で比べます。

| | 偏り | 分散 | MSE |
|---|---|---|---|
| $S^2$ | 0 | 0.50 | 0.50 |
| $\\hat{\\sigma}^2$ | $-0.20$ | 0.32 | 0.36 |

分散の数は、$4S^2/\\sigma^2$ が自由度4のカイ二乗分布に従い、その分散が $2 \\times 4 = 8$ であることから出ます（[標本分布](/stats-pre1/1.12-sampling/)）。$\\sigma^2 = 1$ なら $\\text{Var}(S^2) = 8/4^2 = 0.50$ で、$\\hat{\\sigma}^2 = \\frac{4}{5}S^2$ の分散は $0.8^2 \\times 0.50 = 0.32$ です。MSE は $\\hat{\\sigma}^2$ が $(-0.20)^2 + 0.32 = 0.36$ で、$S^2$ より小さくなります。

偏りがあっても、分散が小さければ MSE は小さくなることがあります。不偏性だけで推定量の良し悪しは決まりません。

---

### 3. 一致性

#### n を増やすと真の値に集まる

一致性は、**1つの推定量に使うデータの数 $n$** を増やしたとき、推定値が真の値に集まる性質です。

[[f-consistency]]

不偏性と一致性は別の性質です。$X_1$ は不偏ですが一致しません。逆に $\\hat{\\sigma}^2$ は不偏ではありませんが、偏り $-\\sigma^2/n$ と分散がどちらも0に近づくので一致します。

---

### 4. 有効性

#### 不偏な推定量どうしをばらつきで比べる

正規分布の平均 $\\mu$ を推定するとき、標本平均も標本中央値も、平均すると $\\mu$ になる不偏推定量です。どちらを使うべきでしょうか。不偏な推定量どうしなら、分散が小さい方が真の値の近くに集まります。分散の比を**相対効率**と呼びます。

[[f-mean-vs-median]]

相対効率は $\\pi/2 \\approx 1.57$ で、正規分布では平均の方が効率的です（中央値の分散は[十分統計量・順序統計量](/stats-pre1/1.13-sufficient-stats/)で求めました）。裾の重い分布では、中央値の方が有利になることもあります。

不偏推定量の中で分散が最小のものを**最小分散不偏推定量**（MVUE）と呼びます。十分統計量を使うと不偏推定量を改良できること（ラオ・ブラックウェルの定理）が、MVUE を探す手がかりになります。

---

### 5. 分散の下限：クラーメル・ラオの不等式

#### 平均よりばらつきの小さい不偏推定量はあるか

中央値は平均に負けました。では、もっと工夫すれば、平均より分散の小さい不偏推定量が見つかるでしょうか。答えは「見つからない」です。$n$ 個の独立なデータからの不偏推定量の分散には、どう工夫しても下回れない下限があります。

$$\\text{Var}(\\hat{\\theta}) \\geq \\frac{1}{n\\,I(\\theta)}, \\qquad I(\\theta) = E\\!\\left[\\left(\\frac{\\partial \\log f(X; \\theta)}{\\partial \\theta}\\right)^2\\right]$$

$I(\\theta)$ は**フィッシャー情報量**で、1個のデータが $\\theta$ についてもつ情報の量です。

- かっこの中の微分は、$\\theta$ を少し動かしたときに対数尤度がどれだけ変わるか（傾き）
- その2乗の平均が大きいほど、尤度の山が鋭く、$\\theta$ を狭く絞り込める
- データが $n$ 個なら情報も $n$ 倍になり、下限は $1/n$ に下がる

[推定法](/stats-pre1/1.14-estimation/)の尤度の図で、100回中70回の山が10回中7回の山より鋭かったのと同じです。

#### 正規分布の平均で確かめる

$\\sigma^2$ が既知の $N(\\mu, \\sigma^2)$ で $\\theta = \\mu$ とします。

$$\\begin{aligned} \\frac{\\partial \\log f}{\\partial \\mu} &= \\frac{x - \\mu}{\\sigma^2} \\\\ I(\\mu) &= E\\!\\left[\\frac{(X - \\mu)^2}{\\sigma^4}\\right] = \\frac{1}{\\sigma^2} \\end{aligned}$$

下限は $\\sigma^2/n$ で、$\\text{Var}(\\bar{X}) = \\sigma^2/n$ とちょうど等しくなります。下限に届く不偏推定量を**有効推定量**と呼び、$\\bar{X}$ はその代表例です。上の図の中央値は、この下限より約1.57倍大きい分散です。

---

### 6. 最小二乗法の良さ：ガウス・マルコフの定理

#### どの範囲で「最良」か

回帰の係数は、ふつう最小二乗法（OLS）で求めます。OLS より分散の小さい推定量はあるでしょうか。答えは、どの範囲の推定量と比べるかで変わります。線形モデル $\\mathbf{y} = X\\boldsymbol{\\beta} + \\boldsymbol{\\varepsilon}$ で考えます。

- 誤差が独立・等分散・期待値0なら、OLS は**線形不偏推定量の中で分散が最小**です（**BLUE**）。誤差の正規性は要りません
- 誤差が正規分布に従うなら、OLS は最尤推定と一致し、線形に限らずすべての不偏推定量の中で分散が最小（MVUE）になります

回帰そのものは[重回帰分析とモデル評価](/stats-pre1/2.1-regression/)で学びます。

[[f-estimator-classes]]`,keyFormulas:[{label:`不偏性`,formula:`E[\\hat{\\theta}] = \\theta`},{label:`一致性`,formula:`\\hat{\\theta} \\xrightarrow{p} \\theta \\quad (n \\to \\infty)`},{label:`クラーメル・ラオの不等式（n 個の独立なデータ）`,formula:`\\text{Var}(\\hat{\\theta}) \\geq \\dfrac{1}{n\\,I(\\theta)}`},{label:`フィッシャー情報量`,formula:`I(\\theta) = E\\!\\left[\\left(\\dfrac{\\partial \\log f}{\\partial \\theta}\\right)^2\\right]`},{label:`不偏分散`,formula:`S^2 = \\dfrac{1}{n-1}\\sum_{i=1}^n (X_i - \\bar{X})^2`},{label:`平均二乗誤差`,formula:`\\text{MSE}(\\hat{\\theta}) = \\{E[\\hat{\\theta}] - \\theta\\}^2 + \\text{Var}(\\hat{\\theta})`}],quiz:[{id:`est1-1`,question:`「推定量の期待値が真の値に等しい」という性質を何と呼ぶか？`,options:[`十分性`,`一致性`,`有効性`,`不偏性`],correctAnswer:3,explanation:`不偏性は $E[\\hat{\\theta}] = \\theta$ です。例：標本平均 $\\bar{X}$ は母平均 $\\mu$ の不偏推定量。一方 $\\frac{1}{n}\\sum(X_i-\\bar{X})^2$ は不偏でなく、$\\frac{1}{n-1}$ で割る不偏分散 $S^2$ が不偏推定量です。`},{id:`est1-2`,question:`正規分布から5個とり、分散 $\\sigma^2$ を不偏分散 $S^2$（$n-1$ で割る）と $\\hat{\\sigma}^2$（$n$ で割る）で推定します。平均二乗誤差（MSE）について正しいものはどれか？`,options:[`$\\hat{\\sigma}^2$ の方が MSE は小さい`,`$S^2$ は不偏なので MSE も必ず小さい`,`2つの MSE は等しい`,`$\\hat{\\sigma}^2$ は偏りがあるので MSE は必ず大きい`],correctAnswer:0,explanation:`MSE は偏りの2乗と分散の和です。$\\sigma^2 = 1$ とすると、$S^2$ は偏り0・分散0.50で MSE 0.50、$\\hat{\\sigma}^2$ は偏り $-0.20$・分散0.32で MSE $0.04 + 0.32 = 0.36$ です。偏りがあっても分散が小さければ MSE は小さくなるので、不偏性だけで良し悪しは決まりません。`},{id:`est1-4`,question:`クラーメル・ラオの不等式においてフィッシャー情報量 $I(\\theta)$ が大きいほど推定はどうなるか？`,options:[`一致性が保証されなくなり、$n$ を増やしても集まらない`,`分散の下限が上がり、精密な推定がそれだけ難しくなる`,`分散の下限が下がり、より精密な推定ができうる`,`推定量の期待値が大きくなり、偏りが生じやすくなる`],correctAnswer:2,explanation:`下限は $1/(nI(\\theta))$ なので、$I(\\theta)$ が大きいほど下限は低くなります。本文のとおり、情報量が大きいのは尤度の山が鋭いときで、$\\theta$ を狭く絞り込めます。下限が低いことは「その近くまで分散を小さくできる余地がある」という意味で、期待値や一致性とは関係しません。`},{id:`est1-5`,question:`ガウス・マルコフの定理が保証するのはどの範囲の最小分散性か？`,options:[`一致推定量の中で最小`,`すべての推定量の中で最小`,`すべての不偏推定量の中で最小`,`線形不偏推定量の中で最小`],correctAnswer:3,explanation:`本文の第6節のとおり、誤差が独立・等分散・期待値0なら、OLS は線形不偏推定量の中で分散が最小（BLUE）です。比べる相手は「線形」かつ「不偏」な推定量だけで、それ以外の推定量より分散が小さいとは言っていません。誤差が正規分布なら、すべての不偏推定量の中で最小まで強められます（本文の同じ節）。`},{id:`est1-8`,question:`正規分布で標本平均と標本中央値の相対効率（大標本）として正しいものはどれか？`,options:[`標本中央値のほうが効率的（相対効率 $2/\\pi \\approx 0.64$）`,`両者の効率は同じで、相対効率は $1$ になる`,`標本平均のほうが効率的（相対効率 $\\pi/2 \\approx 1.57$）`,`相対効率はサンプルサイズで変わり、一定にならない`],correctAnswer:2,explanation:`本文の図のとおり、正規分布では標本中央値の分散が $n$ が大きいとき約 $\\pi\\sigma^2/(2n)$、標本平均の分散が $\\sigma^2/n$ です。比は $\\pi/2 \\approx 1.57$ で $n$ によらず、平均の方が分散が小さく効率的です。$2/\\pi$ は同じ比を逆向きに割った値で、中央値が有利という意味にはなりません。裾の重い分布では中央値の方が有利になることもあります。`},{id:`est1-9`,question:`クラーメル・ラオ下限を達成する不偏推定量を何と呼ぶか？`,options:[`BLUE`,`一致推定量`,`十分統計量`,`有効推定量`],correctAnswer:3,explanation:`クラーメル・ラオの不等式が与える下限 $1/(nI(\\theta))$ をちょうど達成する不偏推定量を「有効推定量（efficient estimator）」と呼びます。正規分布の $\\mu$ に対する $\\bar{X}$ が代表例です。BLUEはガウス・マルコフの定理が保証する「線形不偏推定量の中の最小分散推定量」で、やや異なる概念です。`},{id:`est1-17`,question:`不偏性と一致性の関係として正しいものはどれか？`,options:[`一方だけを満たす推定量が、どちらの向きにも存在する`,`2つは同じ性質で、不偏ならば一致し、逆も成り立つ`,`不偏なら必ず一致するが、一致でも不偏とは限らない`,`一致なら必ず不偏だが、不偏でも一致とは限らない`],correctAnswer:0,explanation:`本文の第3節のとおり、$X_1$（最初の1個だけを使う）は平均すると $\\mu$ なので不偏ですが、$n$ を増やしても1個しか使わないので広がったままで、一致しません。逆に $\\hat{\\sigma}^2$（$n$ で割る分散）は不偏ではありませんが、偏り $-\\sigma^2/n$ と分散がどちらも0に近づくので一致します。どちらの向きにも反例があります。`},{id:`est1-18`,question:`最小分散不偏推定量（MVUE）とはどんな推定量か？`,options:[`すべての推定量の中で分散が最小`,`すべての不偏推定量の中で分散が最小`,`最も計算が簡単な不偏推定量`,`一致性も同時に満たす不偏推定量`],correctAnswer:1,explanation:`MVUE（Minimum Variance Unbiased Estimator）は「不偏性を満たすすべての推定量」の中で分散が最小のものです。クラーメル・ラオの下限に届く不偏推定量（有効推定量）があれば、それが MVUE です。本文のとおり、十分統計量を使って不偏推定量を改良できること（ラオ・ブラックウェルの定理）が、MVUE を探す手がかりになります。`},{id:`est1-19`,question:`BLUEが保証する「線形不偏推定量の中の最小分散」に、正規性の仮定を加えるとどう強化されるか？`,options:[`変わらない`,`「すべての推定量の中で最小分散」になる`,`「すべての不偏推定量の中で最小分散」になる`,`「一致推定量の中で最小分散」になる`],correctAnswer:2,explanation:`本文の第6節のとおり、ガウス・マルコフの定理は正規性なしで「線形不偏推定量の中で最小」（BLUE）を言います。誤差が正規分布に従うなら、OLS は最尤推定と一致し、線形に限らず「すべての不偏推定量の中で最小分散」（MVUE）になります。不偏でない推定量まで含めた「すべての推定量の中で最小」にはなりません（偏りのある推定量のほうが平均二乗誤差が小さいこともある、第2節）。`},{id:`est1-20`,question:`$n$ 個の独立同分布サンプルのとき、クラーメル・ラオの下限はどうなるか？`,options:[`$1/(n \\cdot I(\\theta))$`,`$1/(\\sqrt{n} \\cdot I(\\theta))$`,`$1/I(\\theta)$（$n$ によらない）`,`$n \\cdot I(\\theta)$`],correctAnswer:0,explanation:`本文のとおり、独立なデータが $n$ 個あると情報も $n$ 倍の $nI(\\theta)$ になり、分散の下限は $1/(nI(\\theta))$ です。正規分布の平均なら $I = 1/\\sigma^2$ で、下限は $\\sigma^2/n$ になり $\\text{Var}(\\bar{X})$ と一致します。$\\sqrt{n}$ で割るのは標準偏差のほうで、分散の下限は $n$ で割ります。`}]},{id:`1.22-asymptotic`,updatedAt:`2026-10-25`,title:`漸近理論の基礎：フィッシャー情報量・MLE漸近正規性・デルタ法`,chapter:6,description:`フィッシャー情報量を対数尤度の山の鋭さとして読み、最尤推定量の標準誤差と信頼区間、デルタ法による変換後の標準誤差をコインの例で計算します。`,content:`💡 **このモジュールで学ぶこと**

コインを100回投げて表が70回出たら、表の確率の推定値は0.70です。では、本当の確率はどのくらいの範囲にありそうか。10回中7回なら範囲はどれだけ広がるか。推定値を対数オッズに変えたら、その精度はどうなるか。大標本での推定量の振る舞い（**漸近的性質**）を使うと、これらに式1本ずつで答えられます。読み終えると、次の3つができるようになります。

1. フィッシャー情報量を対数尤度の山の鋭さとして説明し、ベルヌーイ分布で計算できる
2. 最尤推定量の漸近正規性から、標準誤差と信頼区間を出せる
3. デルタ法で、推定値を変換した量（対数オッズなど）の標準誤差を計算できる

---

### 1. フィッシャー情報量

[推定量の性質](/stats-pre1/1.15-estimator-props/)でクラーメル・ラオの不等式を学びました。そこに登場した**フィッシャー情報量**（Fisher Information）をより深く見ていきます。

$$I(\\theta) = E\\!\\left[\\left(\\frac{\\partial \\log f(X;\\theta)}{\\partial \\theta}\\right)^2\\right] = -E\\!\\left[\\frac{\\partial^2 \\log f(X;\\theta)}{\\partial \\theta^2}\\right]$$

$\\partial$（デル）は**偏微分記号**で、「複数の変数を持つ関数を1つの変数だけに着目して微分する操作」を表します。2つの表現は等価です（右側は2階偏微分で計算しやすいことが多い）。

**情報量の意味**：対数尤度関数の「曲がり具合」を測ります。対数尤度が急峻な山形になる（曲率が大きい）ほど $\\theta$ の位置が鋭く特定でき、$I(\\theta)$ が大きくなります。[推定法](/stats-pre1/1.14-estimation/)の尤度関数の図を、対数にして見直したのが次の図です。

[[f-loglik]]

コイン1回（ベルヌーイ分布）で計算すると、図の 4.8 が出てきます。

1. 表なら $x=1$、裏なら $x=0$ として、$\\log f(x;p) = x\\log p + (1-x)\\log(1-p)$
2. 2回微分すると $\\dfrac{\\partial^2 \\log f}{\\partial p^2} = -\\dfrac{x}{p^2} - \\dfrac{1-x}{(1-p)^2}$
3. $E[X] = p$ を入れてマイナスを付けると $I(p) = \\dfrac{1}{p} + \\dfrac{1}{1-p} = \\dfrac{1}{p(1-p)}$。$p = 0.7$ なら $1/0.21 = 4.76$

独立な $n$ 個の観測値の情報量は $n I(\\theta)$ です（加法性）。100回なら476で、図の山の鋭さが10回の10倍になっているのはこのためです。

---

### 2. 最尤推定量の漸近正規性

最尤推定量（MLE）$\\hat{\\theta}_n$ は大標本で次の漸近分布を持ちます：

$$\\sqrt{n}(\\hat{\\theta}_n - \\theta) \\xrightarrow{d} N\\!\\left(0,\\, \\frac{1}{I(\\theta)}\\right)$$

または等価に $\\hat{\\theta}_n \\approx N\\!\\left(\\theta,\\, \\frac{1}{nI(\\theta)}\\right)$。分散が情報量の逆数なので、山が鋭いほど推定値のばらつきは小さくなります。

コインの例で、未知の $p$ に推定値0.70を入れて計算します。

| | 10回中7回 | 100回中70回 |
|---|---|---|
| 情報量 $nI(\\hat{p})$ | 47.6 | 476 |
| 標準誤差 $1/\\sqrt{nI}$ | 0.145 | 0.046 |
| 95%区間 $\\hat{p} \\pm 1.96 \\times$ 標準誤差 | 0.42〜0.98 | 0.61〜0.79 |

標準誤差 $1/\\sqrt{n/(p(1-p))} = \\sqrt{p(1-p)/n}$ は、[信頼区間：1標本の推定](/stats-pre1/1.16-ci/)で母比率に使った式と同じです。比率の区間の公式は、最尤推定の一般則の1つの例でした。

これが「MLE は漸近有効」と言われる理由です。大標本極限でクラーメル・ラオの下限を達成します。この性質を使うと、複雑なモデルでも MLE の標準誤差や信頼区間を近似計算できます。

🎯 **押さえどころ**：MLE の漸近分散は $1/(nI(\\theta))$、フィッシャー情報量の逆数です。パラメータが複数のとき（$p$ 次元）は情報行列の逆行列が漸近分散共分散行列になります。

📖 **連続写像定理とスルツキーの補題：漸近分布を「組み立てる」道具**

デルタ法の前に、漸近分布の計算でよく使う2つの道具を確認します。

**連続写像定理**：$X_n$ が $X$ に分布収束するとき、連続な関数 $g$ について $g(X_n)$ は $g(X)$ に分布収束します。確率収束・概収束でも同じ形で成り立ちます。たとえば $\\sqrt{n}(\\bar{X}_n-\\mu)/\\sigma$ が標準正規分布に近づくなら、その2乗は $\\chi^2(1)$ に近づきます。

**スルツキーの補題**：$X_n$ が $X$ に分布収束し、$Y_n$ が定数 $c$ に確率収束するとき、次の3つが成り立ちます。

- $X_n + Y_n \\xrightarrow{d} X + c$
- $X_n Y_n \\xrightarrow{d} cX$
- $X_n / Y_n \\xrightarrow{d} X / c$（$c \\neq 0$）

ここで大切なのは、$Y_n$ の極限が確率変数ではなく**定数**であることです。

例として、$t$ 統計量を考えます。母分散 $\\sigma^2$ が未知のとき、$\\sqrt{n}(\\bar{X}_n-\\mu)/s_n$ の $s_n$ は大数の法則で $\\sigma$（定数）に確率収束し、$\\sqrt{n}(\\bar{X}_n-\\mu)$ は中心極限定理で $N(0,\\sigma^2)$ に分布収束します。スルツキーの補題から、割り算の結果は $N(0,1)$ に近づきます。母集団が正規でなくても、$n$ が大きければ $t$ 統計量を標準正規分布で近似してよいのは、この組み合わせのおかげです。

🎯 **つまずきやすい点**：$X_n$ と $Y_n$ がどちらも分布収束するだけでは、和や積の極限は決まりません（同時分布が必要）。$Y_n$ が定数に収束するときに限って、スルツキーの補題が使えます。
---

### 3. デルタ法

「$\\hat{\\theta}$ の漸近分布がわかっているとき、$g(\\hat{\\theta})$（$\\hat{\\theta}$ の関数）の漸近分布はどうなるか？」に答えるのが**デルタ法**（Delta Method）です。

$g$ が微分可能なら：

$$\\begin{aligned} &\\sqrt{n}(g(\\hat{\\theta}_n) - g(\\theta)) \\\\ &\\xrightarrow{d} N\\!\\left(0,\\, [g'(\\theta)]^2 \\cdot \\frac{1}{I(\\theta)}\\right) \\end{aligned}$$

考え方は、$g$ を $\\theta$ の近くで接線（傾き $g'(\\theta)$ の直線）で置き換えることです。$\\hat{\\theta}$ が $\\theta$ のまわりで $\\pm 1$ だけ揺れると、$g(\\hat{\\theta})$ はほぼ $\\pm g'(\\theta)$ だけ揺れます。揺れ幅が傾き倍になるので、分散は傾きの2乗倍です。

例として、比率 $\\hat{p}$ を対数オッズ $g(p) = \\log\\{p/(1-p)\\}$ に変えます。

$$\\begin{aligned} g'(p) &= \\frac{1}{p(1-p)} \\\\ \\mathrm{Var}(g(\\hat{p})) &\\approx \\frac{1}{p^2(1-p)^2} \\cdot \\frac{p(1-p)}{n} \\\\ &= \\frac{1}{np(1-p)} \\end{aligned}$$

100回中70回なら、対数オッズは $\\log(0.7/0.3) = 0.85$、標準誤差は $1/\\sqrt{100 \\times 0.21} = 0.22$ です。対数オッズで95%区間 0.42〜1.28 を作り、確率に戻すと 0.60〜0.78 になります。0.70 を中心に左右対称ではなく、1に近い側が短くなり、1を超えることもありません。[検定の理論](/stats-pre1/1.19-testing-adv/)で、対数オッズのワルド統計量が 3.81 になったのは、この標準誤差を使ったからです。

**多変量版**：$\\mathbf{g}(\\hat{\\boldsymbol{\\theta}})$ の漸近分散共分散行列は $J \\Sigma J^\\top$（$J$ はヤコビアン行列＝各成分が $\\partial g_i/\\partial \\theta_j$ の偏微分からなる行列、$\\Sigma$ は $\\hat{\\boldsymbol{\\theta}}$ の漸近分散共分散行列）。`,keyFormulas:[{label:`フィッシャー情報量`,formula:`I(\\theta) = -E\\!\\left[\\dfrac{\\partial^2 \\log f}{\\partial \\theta^2}\\right]`},{label:`MLE の漸近正規性`,formula:`\\sqrt{n}(\\hat{\\theta}_n - \\theta) \\xrightarrow{d} N\\!\\left(0,\\, \\dfrac{1}{I(\\theta)}\\right)`},{label:`デルタ法（1変数）`,formula:`\\begin{aligned} &\\sqrt{n}(g(\\hat{\\theta})-g(\\theta)) \\\\ &\\xrightarrow{d} N(0,\\,[g'(\\theta)]^2/I(\\theta)) \\end{aligned}`},{label:`フィッシャー情報量の加法性`,formula:`I_n(\\theta) = n \\cdot I(\\theta)`}],quiz:[{id:`asy1-1`,question:`デルタ法により $g(\\hat{\\theta})$ の漸近分散は $[g'(\\theta)]^2 / (nI(\\theta))$ となる。$[g'(\\theta)]^2$ の役割はどれか？`,options:[`フィッシャー情報量を補正する係数`,`推定量のバイアスを表す項`,`変換 $g$ による分散のスケーリング係数`,`標本サイズによる収束率の調整`],correctAnswer:2,explanation:`デルタ法は $g(\\hat{\\theta}) \\approx g(\\theta) + g'(\\theta)(\\hat{\\theta}-\\theta)$ の1次近似を使う。$[g'(\\theta)]^2$ は変換の局所的な傾きの2乗で、元の分散をスケーリングする係数として機能する。`},{id:`asy1-2`,question:`MLE $\\hat{\\theta}_n$ の漸近分布 $\\hat{\\theta}_n \\approx N(\\theta, 1/(nI(\\theta)))$ から言えることはどれか？`,options:[`MLE は常に不偏推定量である`,`小標本でも正確に成立する`,`$n$ が増えるほど分散が増加し推定が難しくなる`,`$n$ が増えるほど分散が $1/n$ で減少し推定精度が上がる`],correctAnswer:3,explanation:`漸近分散 $1/(nI(\\theta))$ は $n$ に反比例するため、サンプルが増えるほど精度が上がります（標準誤差 $\\propto 1/\\sqrt{n}$）。また MLE は漸近的に有効（CRBを達成）ですが、有限サンプルでは不偏でないこともあります。`},{id:`asy1-3`,question:`デルタ法を使う典型的な場面はどれか？`,options:[`推定量の変換（関数）の漸近分散を求めるとき`,`ノンパラメトリック検定を行うとき`,`欠測値を補完するとき`,`MLE を直接計算できないとき`],correctAnswer:0,explanation:`推定量 $\\hat{\\theta}$ の漸近分布がわかっているとき、その関数 $g(\\hat{\\theta})$ の漸近分布を $g'(\\theta)^2$ を使って導くのがデルタ法です。例：対数オッズの漸近分散、相関係数の変換（Fisher の $z$ 変換）などで使われます。`},{id:`asy1-7`,question:`正規モデルで MLE のフィッシャー情報量を使って標準誤差を求める。$N(\\mu, \\sigma^2)$ で $\\mu$ についての $I(\\mu)$ はいくらか（$\\sigma^2$ は既知）？`,options:[`$1/\\sigma^2$`,`$n/\\sigma^2$`,`$\\sigma/n$`,`$\\sigma^2$`],correctAnswer:0,explanation:`$\\log f(x;\\mu) = -\\frac{(x-\\mu)^2}{2\\sigma^2} + \\text{const}$、$\\frac{\\partial \\log f}{\\partial \\mu} = \\frac{x-\\mu}{\\sigma^2}$、$I(\\mu) = E[(x-\\mu)^2/\\sigma^4] = \\sigma^2/\\sigma^4 = 1/\\sigma^2$。これより漸近分散は $1/(nI(\\mu)) = \\sigma^2/n$、標準誤差 $= \\sigma/\\sqrt{n}$（標本平均の標準誤差の公式と一致）。`},{id:`asy1-9`,question:`デルタ法で $g(\\hat{p}) = \\log(\\hat{p}/(1-\\hat{p}))$（対数オッズ）の漸近分散を求める。$\\hat{p}$ の漸近分散が $p(1-p)/n$ のとき、対数オッズの漸近分散はどれか？`,options:[`$np(1-p)$`,`$p(1-p)/n$`,`$1/(np(1-p))$`,`$1/(n(1-p)^2)$`],correctAnswer:2,explanation:`$g'(p) = 1/(p(1-p))$ より、デルタ法で漸近分散 $= [g'(p)]^2 \\cdot \\text{Var}(\\hat{p}) = \\frac{1}{p^2(1-p)^2} \\cdot \\frac{p(1-p)}{n} = \\frac{1}{np(1-p)}$。対数オッズ変換はロジスティック回帰で頻繁に使われます。`},{id:`asy1-11`,question:`フィッシャー情報量の加法性とは何か？`,options:[`2つの分布のKL情報量の和`,`MLE が不偏であることの条件`,`フィッシャー情報量同士を足し算できる`,`$n$ 個の独立な観測値の情報量は $1$ 個のときの $n$ 倍`],correctAnswer:3,explanation:`$n$ 個の独立な観測値 $X_1,\\ldots,X_n$ が同一分布に従うとき、フィッシャー情報量は $I_n(\\theta) = n \\cdot I(\\theta)$ と $n$ 倍になります（加法性）。これにより MLE の漸近分散が $1/(nI(\\theta))$（$n$ に反比例）になることが直接示せます。`},{id:`asy1-12`,question:`MLE が「漸近有効」であるとはどういう意味か？`,options:[`大標本でクラーメル・ラオ下限を達成する`,`常に不偏推定量である`,`計算が簡単`,`有限サンプルで分散が最小`],correctAnswer:0,explanation:`漸近有効とは「$n \\to \\infty$ の極限でクラーメル・ラオ下限 $1/(nI(\\theta))$ に等しい分散を持つ」ことです。有限 $n$ では不偏でないこともあり、必ずしも分散が最小ではありませんが、大標本では「理論的に最善の精度」を達成します。`},{id:`asy1-13`,question:`デルタ法の多変量版で $\\mathbf{g}(\\hat{\\boldsymbol{\\theta}})$ の漸近分散共分散行列はどれか？`,options:[`$J^\\top \\Sigma J$`,`$J \\Sigma J^\\top$`,`$\\Sigma^{-1}$`,`$J \\Sigma J$`],correctAnswer:1,explanation:`デルタ法の多変量版では、漸近分散共分散行列は $J \\Sigma J^\\top$ です。ここで $J$ はヤコビアン行列（$\\partial g_i/\\partial \\theta_j$ の偏微分からなる行列）、$\\Sigma$ は $\\hat{\\boldsymbol{\\theta}}$ の漸近分散共分散行列です。`},{id:`asy1-14`,question:`フィッシャー情報量を「対数尤度の2階微分」で表した $I(\\theta) = -E[\\partial^2 \\log f / \\partial \\theta^2]$ の符号が負になる理由は？`,options:[`期待値をとると負になるから`,`対数尤度は常に負だから`,`対数尤度の最大点では2階微分が負（上に凸）だから`,`偏微分は常に負になるから`],correctAnswer:2,explanation:`対数尤度関数の最大点（MLE の位置）では「山のピーク」になるため、2階微分（曲率）は負になります（上に凸の山形）。この「上に凸の度合い」（負の曲率）にマイナスをつけて正にしたものがフィッシャー情報量です。曲率が大きい（急な山）ほど $I(\\theta)$ が大きく、$\\theta$ を精密に特定できます。`},{id:`asy1-15`,question:`コイン投げの確率 $p$（表が出る確率）の MLE は $\\hat{p} = X/n$（$X$：表の回数）。フィッシャー情報量 $I(p)$ は何か？`,options:[`$p$`,`$p(1-p)$`,`$n/(p(1-p))$`,`$1/(p(1-p))$`],correctAnswer:3,explanation:`ベルヌーイ分布で $I(p) = 1/(p(1-p))$ です。$n$ 回の観測では $nI(p) = n/(p(1-p))$、MLE の漸近分散は $1/(nI(p)) = p(1-p)/n$ となります。これは $\\hat{p}$ の標本分散 $p(1-p)/n$ と完全一致し、MLE が漸近有効であることの確認になります。`}]},{id:`1.16-ci`,updatedAt:`2026-10-20`,title:`信頼区間：1標本の推定`,chapter:6,description:`母平均・母比率・母分散の信頼区間を、身長・出口調査・ボルトの数値例と図で計算します。「95%」が何の確率かも、くり返しの模擬で確かめます。`,content:`💡 **このモジュールでできるようになること**

[標本分布](/stats-pre1/1.12-sampling/)では、新薬を10人に使って血圧が平均5mmHg下がった例で「効果が無いとしたら珍しいか」を調べました。次に知りたいのは「では効果は何mmHgくらいと言えるのか」です。1つの数（点推定）では、それがどれだけ当てになるかが分かりません。そこで「この範囲に真の値がある」と幅で答えます。この幅を**信頼区間**（CI: Confidence Interval）と言い、幅を作る手順を**区間推定**と言います。

- 標本の平均・比率・分散から、95%信頼区間を計算できる
- 1.96 や $t$ の値がどこから来るかを、分布の面積で説明できる
- 「95%」が何の確率なのかを正しく言える

2つの標本を比べる区間は[信頼区間：2標本問題と発展的話題](/stats-pre1/1.17-ci-advanced/)で扱います。

---

### 1. 母平均の信頼区間

#### 標本平均は真の平均からどれくらいずれるか

ある地域の成人の平均身長 $\\mu$ を、25人を測って推定します。身長の標準偏差は過去の調査から $\\sigma = 6$ cm と分かっているとします（説明のための数字）。25人の平均は $\\bar{x} = 172.0$ cm でした。

25人の平均 $\\bar{X}$ は、測る25人が変わるたびに変わります。母集団が正規分布なら、$\\bar{X}$ は平均 $\\mu$、標準偏差 $\\sigma/\\sqrt{n} = 6/5 = 1.2$ cm の正規分布に従います（この標準偏差を**標準誤差**と呼びます）。標準正規分布では中央の95%が $-1.96$ から $1.96$ の間に入るので、$\\bar{X}$ の95%は $\\mu$ から $\\pm 1.96 \\times 1.2 = \\pm 2.35$ cm の内側に入ります。

[[f-ci-z]]

「$\\bar{X}$ が $\\mu$ から2.35 cm 以内にある」ことは、「$\\mu$ が $\\bar{X}$ から2.35 cm 以内にある」ことと同じです。そこで $\\bar{x}$ の左右に2.35 cm をとった範囲を、$\\mu$ の95%信頼区間とします。

$$\\begin{aligned} \\bar{X} &\\pm z_{\\alpha/2} \\frac{\\sigma}{\\sqrt{n}} \\\\ &= 172.0 \\pm 2.35 = [169.65,\\ 174.35] \\end{aligned}$$

- $z_{\\alpha/2}$：標準正規分布で、右側に面積 $\\alpha/2$ を残す点（**上側 $\\alpha/2$ 点**）。95%区間なら $\\alpha = 0.05$ で、左右に2.5%ずつ残す $z_{0.025} = 1.96$。99%区間なら $z_{0.005} = 2.576$ で、区間は広がる
- $\\sigma/\\sqrt{n}$：標準誤差。$n$ を4倍にすると半分になり、区間の幅も半分になる
- 上側 $\\alpha/2$ 点は、累積分布関数を逆に読んだ値です（[確率分布の基礎](/stats-pre1/1.4-dist-basics/)の分位点関数）。$z_{0.025}$ は「その値以下になる確率が0.975」の点です

#### 「95%」は何の確率か

同じ手順を、別の25人でくり返すことを考えます。区間の中心 $\\bar{x}$ は毎回変わり、区間は左右に揺れます。真の平均 $\\mu$ は1つに決まっていて動きません。

[[f-ci-coverage]]

「95%」は、この手順で作った区間のうち $\\mu$ を含むものの割合です。手元の1つの区間 $[169.65,\\ 174.35]$ は、$\\mu$ を含むか含まないかのどちらかに決まっていて、「$\\mu$ がこの中にある確率が95%」とは言えません。確率が付いているのは、区間を作る手順の方です。

#### $\\sigma$ が分からないとき：$t$ 分布を使う

ふつうは $\\sigma$ も分かりません。新薬の例（10人、平均 $\\bar{x} = 5$ mmHg 低下、標本標準偏差 $s = 6$ mmHg）では、$\\sigma$ の代わりに $s$ を使います。このとき [標本分布](/stats-pre1/1.12-sampling/) で見たとおり、標準化した量は自由度 $n-1 = 9$ の $t$ 分布に従うので、1.96 の代わりに $t$ 分布の上側2.5%点 $t_{0.025}(9) = 2.262$ を使います。

$$\\begin{aligned} \\bar{X} &\\pm t_{\\alpha/2}(n-1) \\frac{S}{\\sqrt{n}} \\\\ &= 5 \\pm 2.262 \\times \\frac{6}{\\sqrt{10}} = 5 \\pm 4.29 = [0.71,\\ 9.29] \\end{aligned}$$

1.96 を使うと $[1.28,\\ 8.72]$ になり、幅を狭く見積もりすぎます。$s$ 自体が標本ごとに揺れる分だけ、$t$ 分布は裾が厚く、上側2.5%点が大きくなるためです。$n$ が大きくなると $s$ が $\\sigma$ に近づき、$t$ の値は1.96に近づきます。

| $n$ | 自由度 | $t_{0.025}$ |
|---|---|---|
| 5 | 4 | 2.776 |
| 10 | 9 | 2.262 |
| 25 | 24 | 2.064 |
| 100 | 99 | 1.984 |
| とても大きい | | 1.960 |

区間 $[0.71,\\ 9.29]$ は0を含みません。これは、標本分布のページで「効果が無いとしたら、両側で約2.7%しか起きない」とした結果と合っています。両側5%の検定で棄却される値は、95%信頼区間の外にあります。

---

### 2. 母比率の信頼区間

選挙の出口調査で1000人に聞いたところ、520人が候補者Aに投票していました（標本比率 $\\hat{p} = 0.52$）。Aの得票率 $p$ は過半数と言えるでしょうか。

投票した人数は二項分布に従い、$n$ が大きいので $\\hat{p}$ は平均 $p$、分散 $p(1-p)/n$ の正規分布で近似できます（[大数の法則と中心極限定理](/stats-pre1/1.11-lln-clt/)）。分散の中の $p$ は分からないので、$\\hat{p}$ を入れて標準誤差を計算します。

$$\\begin{aligned} \\hat{p} &\\pm z_{\\alpha/2} \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}} \\\\ &= 0.52 \\pm 1.96 \\times 0.0158 = [0.489,\\ 0.551] \\end{aligned}$$

区間は0.5をまたぐので、この調査だけでは過半数とは言い切れません。

[[f-ci-prop-n]]

4000人に聞いて同じ52%だったなら、区間は $[0.505,\\ 0.535]$ で、過半数と言えます。

- **$n$ が小さいとき、$p$ が0や1に近いとき**は、正規分布の近似が合いません。たとえば20人中0人なら $\\hat{p} = 0$ で、上の式の幅は0になってしまいます。このときは二項分布から直接区間を作る**正確法**（クロッパー・ピアソン法）を使います。20人中0人なら、上の端は「20人中0人になる確率が2.5%になる $p$」で、$(1-p)^{20} = 0.025$ を解いて $p \\approx 0.168$、区間は $[0,\\ 0.168]$ です
- **何人に聞けばよいか**：$\\hat{p}(1-\\hat{p})$ は $\\hat{p} = 0.5$ のとき最大の0.25です。区間の半分の幅を3%以内にしたいなら、$1.96\\sqrt{0.25/n} \\le 0.03$ を解いて $n \\ge 1068$ 人です。$p$ が見当つかなくても、0.5 を入れておけば幅が足りなくなることはありません

---

### 3. 母分散の信頼区間

標本分布のページのボルトの例です。直径の標準偏差が0.05 mm のはずの工程で、10本を測ると $s = 0.07$ mm でした。ばらつき $\\sigma^2$ はどの範囲と言えるでしょうか。

母集団が正規分布なら、$9s^2/\\sigma^2$（一般には $(n-1)S^2/\\sigma^2$）は自由度9のカイ二乗分布に従います。平均の場合と同じく、この分布の中央95%の範囲を求めます。

[[f-ci-chi2]]

$$2.70 \\le \\frac{9s^2}{\\sigma^2} \\le 19.02$$

これを $\\sigma^2$ について解きます。分母にある $\\sigma^2$ を外に出すので、大きい方の19.02 が左の端に、小さい方の2.70 が右の端に回ります。

$$\\begin{aligned} \\frac{9s^2}{19.02} &\\le \\sigma^2 \\le \\frac{9s^2}{2.70} \\\\ 0.00232 &\\le \\sigma^2 \\le 0.0163 \\end{aligned}$$

標準偏差に直すと $0.048 \\le \\sigma \\le 0.128$ mm で、元の0.05 mm も区間に入っています。

一般の式は次のとおりです。$\\chi^2_{\\alpha/2}(n-1)$ は上側 $\\alpha/2$ 点（右の端・19.02）、$\\chi^2_{1-\\alpha/2}(n-1)$ は上側 $1-\\alpha/2$ 点（左の端・2.70）です。

$$\\left[\\frac{(n-1)S^2}{\\chi^2_{\\alpha/2}(n-1)},\\ \\frac{(n-1)S^2}{\\chi^2_{1-\\alpha/2}(n-1)}\\right]$$

- $s = 0.07$ から左の端までは0.022、右の端までは0.058 で、区間は $s$ を中心に左右対称になりません。カイ二乗分布の山が左に寄り、右に長い裾を引くためです
- 平均の区間と違い、母集団が正規分布でないと、$n$ を大きくしても正しい95%に近づきません。正規性を確かめてから使います`,keyFormulas:[{label:`母平均 CI（既知分散）`,formula:`\\bar{X} \\pm z_{\\alpha/2} \\cdot \\dfrac{\\sigma}{\\sqrt{n}}`},{label:`母平均 CI（未知分散）`,formula:`\\bar{X} \\pm t_{\\alpha/2}(n-1) \\cdot \\dfrac{S}{\\sqrt{n}}`},{label:`母比率の CI`,formula:`\\hat{p} \\pm z_{\\alpha/2}\\sqrt{\\dfrac{\\hat{p}(1-\\hat{p})}{n}}`},{label:`母分散の CI`,formula:`\\left[\\dfrac{(n-1)S^2}{\\chi^2_{\\alpha/2}},\\; \\dfrac{(n-1)S^2}{\\chi^2_{1-\\alpha/2}}\\right]`}],quiz:[{id:`ci1-1`,question:`$n=25$、$\\bar{X}=50$、既知の $\\sigma=10$ のとき、母平均の95%信頼区間はどれか（$z_{0.025}=1.96$）？`,options:[`$[48.04,\\, 51.96]$`,`$[40,\\, 60]$`,`$[49,\\, 51]$`,`$[46.08,\\, 53.92]$`],correctAnswer:3,explanation:`標準誤差 $\\sigma/\\sqrt{n} = 10/5 = 2$、余裕幅 $= 1.96 \\times 2 = 3.92$。よって $[50-3.92,\\, 50+3.92] = [46.08,\\, 53.92]$。信頼区間の半幅は「$z_{\\alpha/2} \\times$ 標準誤差」です。`},{id:`ci1-2`,question:`母分散が未知の場合に母平均の信頼区間で $t$ 分布を使う理由はどれか？`,options:[`標本ごとに揺れる $S$ を $\\sigma$ の代わりに使う分だけ、裾が厚くなるから`,`$n$ が小さいときは、母集団が正規分布でも標本平均が正規分布に従わないから`,`$t$ 分布を使うと区間が狭くなり、同じ $n$ でも推定の精度が上がるから`,`母集団が正規分布でなくても、どんな $n$ でも正確な95%の区間が作れるから`],correctAnswer:0,explanation:`$\\sigma$ の代わりに $s$ を使うと、$s$ 自体が標本ごとに揺れるので、標準化した量は正規分布より裾の厚い $t$ 分布に従います。そのため上側2.5%点が1.96より大きくなり（$n = 10$ なら2.262）、区間は広がります。正規母集団なら標本平均は $n$ によらず正規分布に従い、$t$ を使った区間もその前提で作ります。`},{id:`ci1-3`,question:`「95%信頼区間」の正しい解釈はどれか？`,options:[`手元の1つの区間の中に、真の値が入っている確率が95%`,`同じ手順で区間を作り直すと、その95%が真の値を含む`,`標本のデータのうち95%が、この区間の中に収まる`,`標本を取り直すと、標本平均の95%がこの区間に入る`],correctAnswer:1,explanation:`真の値 $\\mu$ は動かないので、手元の1つの区間は $\\mu$ を含むか含まないかのどちらかです。95%は、区間を作る手順をくり返したときに $\\mu$ を含む区間の割合です（模擬の図の、20本のうち青の割合）。データの95%が入る範囲は区間よりずっと広く、取り直した標本平均は手元の $\\bar{x}$ ではなく $\\mu$ を中心に散らばります。`},{id:`ci1-4`,question:`母比率 $p$ の信頼区間 $\\hat{p} \\pm z_{\\alpha/2}\\sqrt{\\hat{p}(1-\\hat{p})/n}$ の理論的根拠はどれか？`,options:[`二項分布が、$p$ の値によらず左右対称な形をしていること`,`超幾何分布を使った、近似を使わない正確な計算`,`$n$ が大きいとき、標本比率が正規分布で近似できること`,`事前分布から求めた、$p$ の事後分布の幅`],correctAnswer:2,explanation:`成功の数は二項分布に従い、$n$ が大きいと中心極限定理から $\\hat{p}$ は平均 $p$、分散 $p(1-p)/n$ の正規分布に近づきます。この近似が式の根拠なので、$n$ が小さいときや $p$ が0・1に近いときは合わず、二項分布から直接作る正確法（クロッパー・ピアソン法）を使います。二項分布は $p = 0.5$ のとき以外は左右対称ではありません。`},{id:`ci1-5`,question:`母分散の信頼区間で $\\chi^2$ 分布を使い、両端に異なる点を使う理由はどれか？`,options:[`2つの標本の分散を比べるので、自由度が2つあるから`,`正規分布より裾が厚いので、端の点を大きくとる必要があるから`,`分散は負にならないので、左の端だけを0に近づけて補正するから`,`$(n-1)S^2/\\sigma^2$ が従う分布が、左に寄った非対称な形だから`],correctAnswer:3,explanation:`正規母集団では $(n-1)S^2/\\sigma^2$ が自由度 $n-1$ のカイ二乗分布に従います。この分布は0以上で山が左に寄り、右に裾を引くので、中央95%の両端（$n = 10$ なら2.70と19.02）は山から等しい距離になりません。そのため両端の点を別々に求めます。2つの分散を比べるときに使うのは F 分布です。`},{id:`ci1-11`,question:`$n$ が大きくなるとき $t(n-1)$ 分布はどうなるか？`,options:[`変わらない`,`$\\chi^2(n-1)$ 分布に近づく`,`$N(0,1)$ に近づく`,`$F(1, n-1)$ 分布に近づく`],correctAnswer:2,explanation:`$t$ 分布の裾が厚いのは、$\\sigma$ の代わりに使う $s$ が標本ごとに揺れるためです。$n$ が大きくなると $s$ は $\\sigma$ に近づいて揺れが消えるので、$t(n-1)$ は $N(0,1)$ に近づきます。上側2.5%点は $n = 5$ で2.776、$n = 25$ で2.064、$n = 100$ で1.984 と、1.96 に近づきます。`},{id:`ci1-12`,question:`母平均の信頼区間の幅（= $2 \\times$ 半幅）と $n$ の関係として正しいものはどれか？`,options:[`$n$ に反比例して狭くなる（$n$ が4倍になると幅は4分の1）`,`$n$ に関係なく一定（幅は $\\sigma$ だけで決まる）`,`$n$ に比例して広くなる（データが増えると散らばる）`,`$\\sqrt{n}$ に反比例して狭くなる（$n$ が4倍で幅は半分）`],correctAnswer:3,explanation:`半幅は $z_{\\alpha/2}\\,\\sigma/\\sqrt{n}$ なので、幅は $1/\\sqrt{n}$ に比例します。$n$ を4倍にすると $\\sqrt{n}$ は2倍で、幅は半分です。幅を半分にするには、4倍のデータが要ります。`},{id:`ci1-13`,question:`母比率 $p$ が不明なとき、信頼区間の幅が最大になる $p$ の値はどれか？`,options:[`$p = 0.5$`,`$p = 1$`,`$p$ の値によらず一定`,`$p = 0$`],correctAnswer:0,explanation:`標準誤差 $\\sqrt{\\hat{p}(1-\\hat{p})/n}$ は $\\hat{p}(1-\\hat{p})$ が最大のとき最大です。$f(p)=p(1-p)$ は $p=0.5$ で最大（$= 0.25$）になります。$p$ が不明なときの保守的なサンプルサイズ計算では $p=0.5$ を代入します。`},{id:`ci1-14`,question:`正規母集団から16個とり、標本分散 $s^2 = 4$ を得た。母分散 $\\sigma^2$ の95%信頼区間はどれか（自由度15のカイ二乗分布の上側2.5%点は27.49、上側97.5%点は6.26）？`,options:[`$[2.33,\\ 10.22]$`,`$[2.18,\\ 9.58]$`,`$[0.15,\\ 0.64]$`,`$[2.18,\\ 5.82]$`],correctAnswer:1,explanation:`$(n-1)s^2 = 15 \\times 4 = 60$ を、大きい方の点27.49で割ると左の端 $2.18$、小さい方の点6.26で割ると右の端 $9.58$ です。$n s^2 = 64$ を使うと $[2.33,\\ 10.22]$、$(n-1)$ を掛け忘れると $[0.15,\\ 0.64]$ になります。区間は $s^2 = 4$ を中心に左右対称になりません。`},{id:`ci1-15`,question:`信頼係数 $1-\\alpha$ を高くする（例：95%→99%）と信頼区間の幅はどうなるか？`,options:[`$n$ によって異なる`,`狭くなる`,`広くなる`,`変わらない`],correctAnswer:2,explanation:`$\\alpha$ を小さくすると $z_{\\alpha/2}$ が大きくなります（例：$z_{0.025}=1.96$ から $z_{0.005}=2.576$）。半幅 $= z_{\\alpha/2} \\cdot \\sigma/\\sqrt{n}$ が大きくなり、区間が広くなります。「より確実に真値を捕まえたい（高信頼）⟺ より広い区間が必要」というトレードオフです。`}]},{id:`1.17-ci-advanced`,updatedAt:`2026-10-21`,title:`信頼区間：2標本問題と発展的話題`,chapter:6,description:`2つの平均の差・対応のあるデータ・比率の差・分散の比・片側の限界を数値例と図で計算し、「95%」が守られない場面を学びます。`,content:`💡 **このモジュールでできるようになること**

[信頼区間：1標本の推定](/stats-pre1/1.16-ci/)では、1つの集団の平均・比率・分散を幅で答えました。実際の調査では「AとBで差はあるか、あるならどれくらいか」を知りたいことがよくあります。ここでは2つを比べる区間を作ります。

- 2つの平均の差の95%信頼区間を計算し、等分散を仮定してよいかで式を選べる
- 同じ人を2回測ったデータを差にして、区間が狭くなる理由を言える
- 比率の差・分散の比・片側の限界を計算し、「95%」が実際には守られない場面を言える

---

### 1. 2つの平均の差：どれくらい違うか

2つの工場で同じパンを作っています。それぞれ30個を量ると、工場Aは平均 $\\bar{x}_1 = 50.0$ g・標準偏差 $s_1 = 2.5$ g、工場Bは平均 $\\bar{x}_2 = 48.0$ g・標準偏差 $s_2 = 1.5$ g でした（説明のための数字）。重さの差 $\\mu_1 - \\mu_2$ はどの範囲と言えるでしょうか。

標本平均の差 $\\bar{x}_1 - \\bar{x}_2 = 2.0$ g が中心です。幅を決めるのは差の標準誤差で、2つの標本が独立なら、差の分散はそれぞれの分散の和になります。

$$\\begin{aligned} \\text{SE} &= \\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}} \\\\ &= \\sqrt{\\frac{6.25}{30} + \\frac{2.25}{30}} = \\sqrt{0.208 + 0.075} = 0.532 \\end{aligned}$$

[[f-ci-diff]]

1標本と同じく、1.96 の代わりに $t$ 分布の点を使います。このときの自由度は次の式（ウェルチ・サタースウェイトの近似）で求めます。

$$\\nu \\approx \\frac{(s_1^2/n_1 + s_2^2/n_2)^2}{\\dfrac{(s_1^2/n_1)^2}{n_1-1} + \\dfrac{(s_2^2/n_2)^2}{n_2-1}}$$

数を入れると $\\nu = 0.0802 / (0.001496 + 0.000194) \\approx 47.5$ です。整数の表しかないときは、切り捨てた47を使います（自由度が小さいほど $t$ の点が大きくなり、区間が広い安全側に動くため）。$t_{0.025}(47) = 2.012$ なので、区間は次のとおりです。

$$\\begin{aligned} (\\bar{x}_1 - \\bar{x}_2) &\\pm t_{\\alpha/2}(\\nu)\\,\\text{SE} \\\\ &= 2.0 \\pm 2.012 \\times 0.532 = [0.93,\\ 3.07] \\end{aligned}$$

区間は0を含まないので、工場Aのパンは0.93〜3.07 g 重いと言えます。この区間の作り方を**ウェルチの方法**と呼びます。

---

### 2. 等分散を仮定してよいか

2つの母分散が等しい（$\\sigma_1^2 = \\sigma_2^2$）と分かっているなら、2つの標本分散を1つにまとめて使えます。まとめた分散を**プール分散**と呼び、自由度で重みをつけた平均です。

$$S_p^2 = \\frac{(n_1-1)S_1^2 + (n_2-1)S_2^2}{n_1+n_2-2}$$

$$\\begin{aligned} &(\\bar{X}_1 - \\bar{X}_2) \\\\ &\\pm t_{\\alpha/2}(n_1+n_2-2)\\, S_p \\sqrt{\\frac{1}{n_1}+\\frac{1}{n_2}} \\end{aligned}$$

自由度は、2つの平均を推定した分の2を引いた $n_1+n_2-2$ です。パンの例では $S_p^2 = 4.25$ で、2つの工場の個数が同じなので標準誤差はウェルチと同じ0.532、区間も $[0.93,\\ 3.07]$ でほとんど変わりません。

違いが出るのは、**個数も分散も違う**ときです。工場Aを10個（$s_1 = 4$）、工場Bを40個（$s_2 = 1$）量ったとします。

| | プール | ウェルチ |
|---|---|---|
| 標準誤差 | 0.69 | 1.27 |
| 自由度 | 48 | 9.3 |
| 被覆確率（真の差を含む割合） | 約70% | 約95% |

個数の多い工場Bの小さな分散がプール分散を引き下げ、標準誤差を半分近くに見積もってしまいます。最後の行は、この設定で区間を作ることをコンピュータで2万回くり返して数えた割合です。

- 等分散かどうか分からないときはウェルチを使う。等分散が正しいときも、ウェルチの区間はわずかに広いだけで済む
- 等分散かどうかを、下の第5節の分散の比の区間で確かめることもできる

---

### 3. 同じ人を2回測ったら：対応のあるデータ

6人に新しい薬を飲んでもらい、飲む前と後の血圧を測りました（説明のための数字）。

| 人 | 前 | 後 | 下がり幅 $d$ |
|---|---|---|---|
| 1 | 150 | 144 | 6 |
| 2 | 138 | 135 | 3 |
| 3 | 162 | 154 | 8 |
| 4 | 145 | 141 | 4 |
| 5 | 170 | 163 | 7 |
| 6 | 155 | 150 | 5 |

「前」と「後」は同じ人を測っているので、独立な2つの標本ではありません。このようなデータを**対応のあるデータ**と呼びます。人ごとに差 $d_i$ をとると、1標本の問題になります。

[[f-paired]]

下がり幅の平均は $\\bar{d} = 5.5$、標準偏差は $s_d = 1.87$ です。1標本の $t$ 区間を当てはめます。

$$\\begin{aligned} \\bar{d} &\\pm t_{\\alpha/2}(n-1)\\,\\frac{s_d}{\\sqrt{n}} \\\\ &= 5.5 \\pm 2.571 \\times \\frac{1.87}{\\sqrt{6}} = [3.54,\\ 7.46] \\end{aligned}$$

同じデータを独立な2標本として扱うと、「前」の標準偏差11.6と「後」の10.0が標準誤差に入り、区間は $5.5 \\pm 13.9$ で0をまたぎます。人による血圧の違い（138〜170）は差をとると消えますが、独立として扱うとそれがそのまま幅になるためです。

- 同じ人の前後、双子、条件をそろえて組にした2人などは、対応のあるデータとして差をとる
- 別々の人を2つのグループに分けたときは、第1節・第2節の方法を使う

---

### 4. 2つの比率の差

ウェブ広告の案Aと案Bを、それぞれ1000人に見せました。クリックしたのは案Aが120人（$\\hat{p}_1 = 0.12$）、案Bが90人（$\\hat{p}_2 = 0.09$）です。クリック率の差はどの範囲と言えるでしょうか。

平均の差と同じく、差の分散はそれぞれの分散の和です。各比率の分散は [1標本の比率](/stats-pre1/1.16-ci/) と同じ $\\hat{p}(1-\\hat{p})/n$ で見積もります。

$$\\begin{aligned} (\\hat{p}_1 - \\hat{p}_2) &\\pm z_{\\alpha/2} \\sqrt{\\frac{\\hat{p}_1(1-\\hat{p}_1)}{n_1} + \\frac{\\hat{p}_2(1-\\hat{p}_2)}{n_2}} \\\\ &= 0.03 \\pm 1.96 \\times 0.0137 = [0.003,\\ 0.057] \\end{aligned}$$

区間は0をわずかに外れていて、案Aのクリック率は0.3〜5.7ポイント高いと言えます。下端が0に近いので、差がとても小さい可能性も残ります。

[[f-ci-ad]]

2つのクリック率それぞれの区間は 10.0〜14.0% と 7.2〜10.8% で、一部が重なっています。それでも差の区間は0を含みません。区間が重なるかどうかで差の有無を判断すると、差を見逃します。

- 「差が0か」を調べる検定では、2つの比率が等しいと仮定して1つにまとめた比率で標準誤差を計算します（[検定の応用](/stats-pre1/1.20-testing-applied/)）。差の大きさを見積もる区間では、上のようにまとめずに計算します

---

### 5. 2つの分散の比

#### 工場Aのばらつきは、工場Bの何倍か

第1節のパンの例では、標準偏差が2.5 g と1.5 g でした。母分散そのものはどれくらい違うと言えるでしょうか。分散は差ではなく「何倍か」で比べます。

2つの母集団がどちらも正規分布で、標本が互いに独立なら、次の量は母分散の値によらず $F(n_1-1,\\, n_2-1)$ 分布に従います（[標本分布](/stats-pre1/1.12-sampling/)の F 分布）。

$$F = \\frac{S_1^2/\\sigma_1^2}{S_2^2/\\sigma_2^2}$$

この F が両側の2.5%点の間に入る確率は95%です。その不等式を $\\sigma_1^2/\\sigma_2^2$ について解くと、区間の両端が出ます（$F_{\\alpha/2}$ は上側 $\\alpha/2$ 点）。

- 下端：$\\dfrac{S_1^2/S_2^2}{F_{\\alpha/2}(n_1-1,\\, n_2-1)}$
- 上端：$\\dfrac{S_1^2/S_2^2}{F_{1-\\alpha/2}(n_1-1,\\, n_2-1)}$

F 分布の表には上側の点しか載っていないことが多いので、下側の点は自由度を入れ替えた逆数で求めます：$F_{1-\\alpha/2}(m,\\, n) = 1/F_{\\alpha/2}(n,\\, m)$。

#### 数を入れる

1. 標本分散の比：$S_1^2/S_2^2 = 6.25/2.25 \\approx 2.78$
2. $F(29,\\, 29)$ の上側2.5%点は約 2.10、下側2.5%点は $1/2.10 \\approx 0.48$
3. 下端は $2.78/2.10 \\approx 1.32$、上端は $2.78 \\times 2.10 \\approx 5.84$（0.48 で割るのと同じ）

[[f-var-ratio-ci]]

工場Aの母分散は、工場Bの約1.3〜5.8倍と見積もれます。区間が1を含まないので、等分散とみなすのは無理があり、第1節でウェルチの方法を使ったのは妥当でした。

区間が 2.78 の左右で対称でないのは、F 分布が右に裾の長い分布だからです。1標本の母分散の信頼区間で、$\\chi^2$ 分布の左右の点が違ったのと同じ理由です。

⚠️ この区間は、母集団が正規分布であることに強く頼ります。裾の長い分布では、95% のつもりの区間が真の比を含む割合が、95% から大きくずれることがあります。

---

### 6. 片側の限界：「最低でも」を言う

電池の寿命を25個で調べ、平均 $\\bar{x} = 500$ 時間でした（標準偏差 $\\sigma = 40$ 時間は既知とします）。客に伝えたいのは「最低でも何時間持つか」で、上の端には関心がありません。

このようなときは、外れる5%を片方の裾にまとめた**片側信頼限界**を使います。

[[f-one-sided]]

$$\\begin{aligned} \\bar{x} - z_{\\alpha}\\,\\frac{\\sigma}{\\sqrt{n}} &= 500 - 1.645 \\times \\frac{40}{\\sqrt{25}} \\\\ &= 500 - 13.2 = 486.8 \\end{aligned}$$

「$\\mu$ は486.8時間以上」が95%の片側信頼限界（下側限界）です。両側の95%区間 $[484.3,\\ 515.7]$ の下端より内側で、同じデータからより強いことが言えます。そのかわり、上の端については何も言いません。

| 言いたいこと | 使う限界 | 例 |
|---|---|---|
| 最低でもこれ以上 | 下側限界 $\\bar{x} - z_\\alpha\\,\\sigma/\\sqrt{n}$ | 寿命、強度 |
| 多くてもこれ以下 | 上側限界 $\\bar{x} + z_\\alpha\\,\\sigma/\\sqrt{n}$ | 副作用の率、不純物の濃度 |

どちらの側を使うかは、データを見る前に決めます。データを見てから都合のよい側を選ぶと、外れる確率は5%ではなくなります。

---

### 7. 被覆確率：「95%」は本当に95%か

区間の作り方をくり返したときに、真の値を含む割合を**被覆確率**と呼びます。式を作るときに置いた前提（正規分布、正規近似、等分散）が崩れると、公称の95%と実際の被覆確率がずれます。

[[f-wald-coverage]]

20人に聞いて [1標本の比率の式](/stats-pre1/1.16-ci/) で区間を作るとき、真の比率が0.05なら、95%のつもりの区間が真の値を含むのは64%だけです。

| 場面 | 実際の被覆確率 | 対処 |
|---|---|---|
| 正規母集団で $t$ 区間 | 95% | そのままでよい |
| 比率で $n$ が小さい、$p$ が0や1に近い | 95%を大きく下回る（上の図） | 正確法（クロッパー・ピアソン法） |
| 個数も分散も違う2群をプール分散で | 約70%（第2節の例） | ウェルチの方法 |
| 95%の区間を10本同時に見て、全部当たる | 約60%（独立なら $0.95^{10}$） | 1本ごとの信頼係数を上げる（ボンフェローニ） |

最後の行は、1本ずつは95%でも、何本も同時に見ると「どれかが外れる」確率が大きくなることを表します。10本全部を95%で当てたいなら、1本ごとに99.5%の区間（$\\alpha$ を10で割る）を作ります。`,keyFormulas:[{label:`2標本CI（等分散）`,formula:`\\begin{aligned} &(\\bar{X}_1-\\bar{X}_2) \\\\ &\\pm t_{\\alpha/2}(n_1+n_2-2)\\cdot S_p\\sqrt{\\frac{1}{n_1}+\\frac{1}{n_2}} \\end{aligned}`},{label:`プール分散`,formula:`S_p^2 = \\dfrac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}`},{label:`2母比率の差のCI`,formula:`(\\hat{p}_1-\\hat{p}_2) \\pm z_{\\alpha/2}\\sqrt{\\frac{\\hat{p}_1(1-\\hat{p}_1)}{n_1}+\\frac{\\hat{p}_2(1-\\hat{p}_2)}{n_2}}`},{label:`母分散の比のCI`,formula:`\\left[\\dfrac{S_1^2/S_2^2}{F_{\\alpha/2}},\\; \\dfrac{S_1^2/S_2^2}{F_{1-\\alpha/2}}\\right]`},{label:`2つの平均の差の標準誤差（ウェルチ）`,formula:`\\text{SE} = \\sqrt{\\dfrac{S_1^2}{n_1} + \\dfrac{S_2^2}{n_2}}`},{label:`対応のあるデータ（差 d をとる）`,formula:`\\bar{d} \\pm t_{\\alpha/2}(n-1)\\,\\dfrac{s_d}{\\sqrt{n}}`},{label:`片側の下側限界`,formula:`\\bar{X} - z_{\\alpha}\\,\\dfrac{\\sigma}{\\sqrt{n}}`}],quiz:[{id:`ci1-6`,question:`2標本問題（等分散仮定あり）で2母平均の差の信頼区間に使うプール分散 $S_p^2$ の自由度はどれか？`,options:[`$n_1 + n_2 - 2$`,`$n_1 - 1$`,`$n_2 - 1$`,`$n_1 + n_2 - 1$`],correctAnswer:0,explanation:`プール分散は、2つの標本分散を自由度 $n_1 - 1$ と $n_2 - 1$ で重みをつけて平均したものです。それぞれのグループで平均を1つずつ推定するので、自由度は合計 $n_1 + n_2$ から2を引いた $n_1 + n_2 - 2$ になります。パンの例（30個ずつ）なら58です。`},{id:`ci1-7`,question:`5人の体重を食事の改善の前後で測り、人ごとの減少量 $d$ が 2, 4, 3, 5, 6（kg）だった。減少量の平均の95%信頼区間はどれか（$t_{0.025}(4) = 2.776$）？`,options:[`$[2.61,\\ 5.39]$`,`$[2.04,\\ 5.96]$`,`$[3.12,\\ 4.88]$`,`$[1.81,\\ 6.19]$`],correctAnswer:1,explanation:`対応のあるデータなので、差 $d$ を1つの標本として扱います。$\\bar{d} = 4$、$s_d = \\sqrt{10/4} = 1.58$ で、半幅は $2.776 \\times 1.58/\\sqrt{5} = 1.96$、区間は $[2.04,\\ 5.96]$ です。1.96 を使うと $[2.61,\\ 5.39]$、$\\sqrt{n}$ でなく $n$ で割ると $[3.12,\\ 4.88]$、$\\sqrt{n-1}$ で割ると $[1.81,\\ 6.19]$ になります。`},{id:`ci1-8`,question:`被覆確率（Coverage Probability）が理論値 $1-\\alpha$ からずれやすい状況はどれか？`,options:[`母集団が正規分布で、母分散が未知のため $t$ 区間を使うとき`,`$n$ が十分に大きく、母比率 $p$ が0.5の近くにあるとき`,`$n$ が小さく、母比率 $p$ が0や1に近いときに正規近似の式を使うとき`,`母分散 $\\sigma^2$ が既知で、正規母集団から $z$ 区間を作るとき`],correctAnswer:2,explanation:`母比率の区間 $\\hat{p} \\pm 1.96\\sqrt{\\hat{p}(1-\\hat{p})/n}$ は正規近似が前提です。$n$ が小さく $p$ が0や1に近いと近似が合わず、本文の図のとおり20人・$p = 0.05$ では被覆確率が64%まで下がります。このときは正確法（クロッパー・ピアソン法）を使います。正規母集団の $t$ 区間・$z$ 区間は、前提が成り立つ限り正確に95%です。`},{id:`ci1-9`,question:`片側信頼限界（上側95%信頼限界）を構成するとき、両側95%信頼区間と比べて何が変わるか？`,options:[`信頼係数が95%から90%に下がり、主張が弱くなる`,`$t$ 分布の代わりに、必ず正規分布を使うことになる`,`片方の端を無限大にするので、両側の区間より広くなる`,`$z_{0.025} = 1.96$ の代わりに $z_{0.05} = 1.645$ を使い、限界が内側に来る`],correctAnswer:3,explanation:`両側の95%区間は外れる5%を左右に2.5%ずつ分けますが、片側の限界は片方の裾に5%をまとめます（本文の図）。端の点が1.96から1.645に下がるので、電池の例では下側限界が486.8時間で、両側区間の下端484.3時間より内側です。信頼係数は95%のままです。`},{id:`ci1-10`,question:`2母比率の差 $p_1 - p_2$ の大標本信頼区間で使う標準誤差の近似式はどれか？`,options:[`$\\sqrt{\\hat{p}(1-\\hat{p})(1/n_1+1/n_2)}$（プール比率 $\\hat{p}$ を使う）`,`$\\sqrt{\\hat{p}_1(1-\\hat{p}_1)/n_1 + \\hat{p}_2(1-\\hat{p}_2)/n_2}$`,`$\\sqrt{(\\hat{p}_1+\\hat{p}_2)/(n_1+n_2)}$`,`$S_p\\sqrt{1/n_1+1/n_2}$（プール分散を使う）`],correctAnswer:1,explanation:`2母比率の差の信頼区間では、各グループの比率の分散 $\\hat{p}_i(1-\\hat{p}_i)/n_i$ を独立に推定して足します。最初の選択肢のプール比率は、$p_1 = p_2$ を仮定した検定で使う形で、差の大きさを見積もる信頼区間には使いません。`},{id:`ci1-16`,question:`Welch法（等分散を仮定しない2標本 $t$ 検定）を使う理由はどれか？`,options:[`片側の信頼限界を作りたいときに、自由度を増やすため`,`$n$ がとても大きく、$t$ 分布が正規分布とほぼ同じになるとき`,`2つのグループの個数が等しく、分散も等しいと分かっているとき`,`2つの母分散が等しいかどうか分からず、プール分散を使えないとき`],correctAnswer:3,explanation:`等分散でないのにプール分散を使うと、標準誤差を誤って見積もり、95%のつもりの区間が真の差を含む割合がずれます（本文の例では約70%）。ウェルチの方法は2つの分散を別々に使い、自由度をウェルチ・サタースウェイトの近似で求めます。等分散と分かっているときはプール分散を使えます。`},{id:`ci1-17`,question:`2母分散の比 $\\sigma_1^2/\\sigma_2^2$ の信頼区間を構成するとき使う分布はどれか？`,options:[`$F$ 分布`,`正規分布`,`$t$ 分布`,`$\\chi^2$ 分布`],correctAnswer:0,explanation:`$(S_1^2/\\sigma_1^2)/(S_2^2/\\sigma_2^2) \\sim F(n_1-1, n_2-1)$ を利用します。$F$ 分布は2つの独立した $\\chi^2$ 変数の比の分布で、分散比の推論に使います。$\\chi^2$ 分布が1標本の分散推定に使われるのに対し、$F$ 分布は2標本の分散比に使われます。`},{id:`ci1-18`,question:`対応のある2標本（同一人物の前後比較など）で平均差の信頼区間を構成するとき、最も適切な方法はどれか？`,options:[`前と後を独立な2標本とみなして、プール分散で区間を作る`,`人ごとの差 $d_i$ を計算し、1標本の $t$ 区間を当てはめる`,`前と後の分散が違うかもしれないので、ウェルチの方法を使う`,`前と後の分散の比をとり、F 分布で区間を作る`],correctAnswer:1,explanation:`同じ人を2回測ったデータは独立ではありません。人ごとの差 $d_i$ をとると人による違いが消え、$\\bar{d} \\pm t_{\\alpha/2}(n-1)\\, s_d/\\sqrt{n}$ で区間を作れます。本文の血圧の例では、独立として扱うと区間が $5.5 \\pm 13.9$ で0をまたぎ、差をとると $[3.54,\\ 7.46]$ でした。ウェルチの方法も独立な2標本のための方法です。`},{id:`ci1-19`,question:`電池の寿命について「最低でも何時間持つか」を示したい。使う片側信頼限界と、その式の組み合わせとして正しいものはどれか？`,options:[`上側限界 $\\bar{X} + z_\\alpha \\cdot \\sigma/\\sqrt{n}$`,`下側限界 $\\bar{X} + z_\\alpha \\cdot \\sigma/\\sqrt{n}$`,`下側限界 $\\bar{X} - z_\\alpha \\cdot \\sigma/\\sqrt{n}$`,`両側区間の $\\bar{X} \\pm z_{\\alpha/2} \\cdot \\sigma/\\sqrt{n}$`],correctAnswer:2,explanation:`「最低でも」は「$\\mu$ はこの値以上」という主張なので、下側限界 $\\bar{X} - z_\\alpha \\cdot \\sigma/\\sqrt{n}$ を使います（本文の電池の例）。上側限界は「多くてもこの値以下」を言うときで、副作用の率や不純物の濃度に使います。両側区間は、片側だけを言いたい場面では $z_{\\alpha/2}$ を使う分だけ下端が外側に来ます。`},{id:`ci1-20`,question:`工場Aを10個（$s_1 = 4$）、工場Bを40個（$s_2 = 1$）量り、プール分散を使って平均の差の95%区間を作った。何が起きるか？`,options:[`標準誤差を小さく見積もり、区間が真の差を含む割合が95%を大きく下回る`,`標準誤差を大きく見積もり、区間が広くなりすぎて差を見逃しやすくなる`,`個数の多い工場Bに重みがかかるが、区間が真の差を含む割合は95%のまま`,`自由度が大きくなりすぎて、区間が真の差を含む割合が100%に近づく`],correctAnswer:0,explanation:`プール分散は自由度で重みをつけるので、個数の多い工場Bの小さな分散 $1$ に引っ張られ、$S_p^2 = 3.81$ になります。標準誤差はプールで0.69、ウェルチで1.27 と半分近くに見積もられ、本文の模擬では95%のつもりの区間が真の差を含むのは約70%でした。個数も分散も違うときはウェルチの方法を使います。`}]},{id:`1.18-inference`,updatedAt:`2026-10-21`,title:`P値の解釈・検定の誤り・検出力`,chapter:7,description:`P値を面積として計算し、2種類の誤りと検出力を2つの山で見て、必要な人数を逆算します。`,content:`💡 **このモジュールで学ぶこと**

新薬を50人ずつに試したところ、血圧の下がり方の差が 3.5 mmHg で、P値は 0.03 でした。この数字から言えることと言えないことを分けられるようになるのが、このモジュールの目標です。読み終えると、次の3つができるようになります。

1. P値を「帰無仮説のもとでの分布の面積」として計算し、よくある読み違いを見分けられる
2. 第1種の過誤、第2種の過誤、検出力を、2つの山と1本の境界で説明できる
3. 見逃しを20%以下にするのに何人要るかを計算し、見つけたい差が半分なら人数が4倍になる理由を言える

---

### 1. 仮説検定の手順

差が偶然で説明できるかを確かめる手順が**仮説検定**です。裁判にたとえると、被告（薬）をまず無実（効果なし）と仮定し、その仮定のもとでは起きにくい証拠が出たときに無実の仮定を退けます。

新薬の例で手順を追います。新薬とプラセボに50人ずつ割り当て、1か月後の血圧の下がり方を測りました。標準偏差はどちらも 8 mmHg とします（説明のための数字です）。

| | 新薬 | プラセボ |
|---|---|---|
| 人数 | 50 | 50 |
| 平均の下がり方 | 8.2 mmHg | 4.7 mmHg |
| 標準偏差 | 8 | 8 |

1. **仮説を2つ立てる**：**帰無仮説** $H_0$「新薬とプラセボの効果は同じ（差は0）」と、**対立仮説** $H_1$「差がある」。退けたいほうを $H_0$ に置きます
2. **検定統計量を計算する**：差を標準誤差で割り、「差が0のときの揺れ幅の何倍か」に直します。標準誤差は [2つの平均の差](/stats-pre1/1.17-ci-advanced/) と同じ式で $8\\sqrt{1/50 + 1/50} = 1.6$、統計量は $z = 3.5 / 1.6 = 2.19$ です
3. **$H_0$ のもとでの分布と比べる**：$H_0$ が正しければ、$z$ はほぼ標準正規分布に従います（人数が多いので t 分布との違いはわずかです）
4. **判断する**：前もって決めた**有意水準** $\\alpha$（多くは 5%）と比べます。$|z|$ が 1.96 を超える範囲（**棄却域**）に入ったら $H_0$ を棄却します。$2.19 > 1.96$ なので棄却し、「差がある」と判断します

---

### 2. P値は面積

棄却域に入ったかどうかだけでは、ぎりぎりなのか大きく外れたのかが分かりません。そこで、観測値より外側の面積を報告します。これが **P値** です。

$$P = P(|Z| \\ge |z_{\\text{obs}}| \\mid H_0)$$

$z_{\\text{obs}}$ は観測された統計量（obs は observed の略）、$\\mid H_0$ は「$H_0$ が正しいと仮定したとき」を表します。両側検定なので、$+2.19$ より右と $-2.19$ より左を合わせます。

[[f-pvalue]]

P値 0.03 が言っているのは、「差が本当に0なら、3.5 mmHg 以上の差が偶然出るのは100回に3回ほど」ということです。$P < \\alpha$ と「統計量が棄却域に入る」は同じことを別の言い方で表しています。

#### P値で言えないこと

| よくある読み違い | 正しくは |
|---|---|
| 帰無仮説が正しい確率は3% | 帰無仮説が正しいと**仮定したとき**に、この差以上が出る確率が3%。仮説そのものが正しい確率ではない |
| P値が小さいほど効果が大きい | P値は人数を増やしても小さくなる。効果の大きさは差そのものや効果量で見る |
| P > 0.05 だから差は無い | 差を見つける力が足りなかっただけかもしれない（第3節） |

2行目を数で確かめます。差が 0.5 mmHg しかなくても、1万人ずつ集めれば標準誤差は $8\\sqrt{2/10000} = 0.11$ になり、$z = 4.4$、P値は 0.00001 程度です。差を標準偏差で割った**効果量** $d$ で比べると、違いがはっきりします。

| | 新薬の例 | 大人数の例 |
|---|---|---|
| 人数と差 | 50人ずつ、3.5 mmHg | 1万人ずつ、0.5 mmHg |
| P値 | 0.03 | 0.00001 |
| 効果量 $d$ | $3.5/8 = 0.44$ | $0.5/8 = 0.06$ |

大人数の例のほうがP値はずっと小さいのに、効果は7分の1です。「統計的に有意」は「偶然とは言いにくい」という意味で、「実用上意味のある大きさ」とは別のことです。

---

### 3. 2種類の誤りと検出力

検定の判断は、本当の状態と組み合わせると4通りあり、そのうち2つが誤りです。

[[type-error-table]]

- **第1種の過誤**：差が無いのに「差がある」とする誤り。起きる確率の上限が有意水準 $\\alpha$ で、検定の前に決めておきます
- **第2種の過誤**：差が有るのに見逃す誤り。その確率を $\\beta$ と書きます
- **検出力** $1-\\beta$：差が有るときに、正しく棄却できる確率

$\\alpha$ は自分で決められますが、$\\beta$ は本当の差の大きさと人数で決まります。新薬の本当の差が 3.5 mmHg だとして、50人ずつの検定がそれを見つける確率を計算します。

[[f-power-design]]

- 棄却の境界は、差の単位で $1.96 \\times 1.6 = 3.14$ mmHg です。青の山（差0）でこれより外側の面積が $\\alpha = 5\\%$ です
- 本当の差が 3.5 なら、観測される差は 3.5 を中心に標準誤差 1.6 で揺れます（緑の山）。境界 3.14 を超える確率が検出力で、$P(Z > (3.14 - 3.5)/1.6) = P(Z > -0.23) = 0.59$ です
- 50人ずつでは、効果が本当にあっても4割は見逃します。82人ずつにすると標準誤差が 1.25 に縮み、2つの山の重なりが減って、検出力は 0.80 になります

境界を右へ動かす（$\\alpha$ を厳しくする）と第1種の過誤は減り、灰色の $\\beta$ は増えます。人数が同じなら、片方を減らすともう片方が増えます。

#### 検出力曲線

本当の差の大きさごとに検出力を描いたものが**検出力曲線**です。

[[f-power-curve]]

- 差が0のとき、どの曲線も高さは $\\alpha = 0.05$ です。差が無いのに棄却する確率なので、第1種の過誤そのものです
- 差が大きいほど、人数が多いほど、曲線は早く1に近づきます
- 20人ずつだと、差が 3.5 でも検出力は 0.28 しかありません。この人数の検定で P > 0.05 が出ても、「差は無い」とは言えません

検出力を上げる方法は3つあります。人数を増やす、測定のばらつきを減らす（同じ人の前後を比べる[対応のあるデータ](/stats-pre1/1.17-ci-advanced/)にするなど）、$\\alpha$ を緩める、です。最後の方法は第1種の過誤が増えるので、ふつうは前の2つを使います。

---

### 4. 何人集めればよいか

試験の前に「本当の差が 3.5 mmHg なら、検出力 80% で見つけたい」と決めて、人数を逆算します。答えは上の図の下段にあります。境界は、差0の山の中心から標準誤差 $z_{\\alpha/2}$ 個分だけ右にあり、同時に差 $\\delta$ の山の中心から $z_\\beta$ 個分だけ左にないといけません。2つを足すと、差 $\\delta$ がちょうど埋まります。

$$\\delta = (z_{\\alpha/2} + z_{\\beta}) \\times \\text{SE}, \\qquad \\text{SE} = \\sigma\\sqrt{\\frac{2}{n}}$$

$z_p$ は標準正規分布の上側 $p$ 点で、$\\alpha = 5\\%$ なら $z_{0.025} = 1.96$、検出力 80% なら $z_{0.2} = 0.84$ です。これを $n$ について解くと、1群あたりの人数が出ます。

$$\\begin{aligned} n &= \\frac{2(z_{\\alpha/2} + z_{\\beta})^2\\sigma^2}{\\delta^2} \\\\ &= \\frac{2 \\times (1.96 + 0.84)^2 \\times 8^2}{3.5^2} = 81.9 \\end{aligned}$$

切り上げて82人ずつ、合わせて164人です。

- $\\delta$ は2乗で分母にあるので、見つけたい差が半分（1.75 mmHg）になると、人数は4倍の328人ずつになります
- 1つの群の平均を決まった値と比べるとき（1標本）は、SE が $\\sigma/\\sqrt{n}$ なので式の 2 が消えます。対応のあるデータなら、差 $d$ の標準偏差 $\\sigma_d$ を入れた1標本の式を使います

---

### 5. 検定を何回も行うとき

1回の検定で第1種の過誤が起きる確率は5%でも、検定を何回も行えば、どれか1つで誤って「差がある」と言ってしまう確率は増えます。すべての $H_0$ が正しいとき、$k$ 回の独立な検定で少なくとも1回誤る確率は $1 - 0.95^k$ です。

| 検定の回数 $k$ | 少なくとも1回誤る確率 |
|---|---|
| 1 | 5% |
| 5 | 23% |
| 10 | 40% |
| 20 | 64% |

**ボンフェローニ補正**は、各検定の有意水準を $\\alpha/k$ にします。20回なら1回ごとに 0.0025 で判定します。どれか1つで誤る確率は、1回ごとの確率の和 $k \\times \\alpha/k = \\alpha$ を超えないので、全体を5%以下に抑えられます。その代わり、1回ごとの検出力は下がります。分散分析のあとで群の組を比べる方法は [分散分析](/stats-pre1/1.21-anova/) で扱います。`,keyFormulas:[{label:`P 値の定義（両側）`,formula:`P = P(|Z| \\ge |z_{\\text{obs}}| \\mid H_0)`},{label:`検出力`,formula:`1-\\beta = P(\\text{棄却} \\mid H_1 \\text{ が真})`},{label:`2群の比較で必要な1群の人数`,formula:`n = \\dfrac{2(z_{\\alpha/2}+z_{\\beta})^2 \\sigma^2}{\\delta^2}`},{label:`k 回の検定で少なくとも1回誤る確率`,formula:`1-(1-\\alpha)^k`}],quiz:[{id:`i1-1`,question:`P値の正しい定義は？`,options:[`帰無仮説のもとで観測値以上に極端なデータが得られる確率`,`データを見たあとで、対立仮説が正しいと言える確率`,`差の大きさを、標準偏差を単位にして表した指標`,`データを見たあとで、帰無仮説が正しいと言える確率`],correctAnswer:0,explanation:`P値は「帰無仮説が正しいという仮定のもとで、今回と同じかそれ以上に極端な結果が起きる確率」です。帰無仮説が正しい確率でも、対立仮説が正しい確率でもありません。P値が小さい（例：0.03 < 0.05）ほど「帰無仮説のもとではこのデータは起きにくい」ことを示し、帰無仮説を棄却する根拠になります。`},{id:`i1-2`,question:`「本当は差がないのに差があると判断する」誤りを何と呼ぶ？`,options:[`測定誤差`,`第1種の過誤`,`第2種の過誤`,`標本誤差`],correctAnswer:1,explanation:`第1種の過誤（偽陽性・$\\alpha$ エラー）は「帰無仮説が真なのに棄却する」誤りです。有意水準 $\\alpha$ はこの誤りを犯す確率の上限として事前に設定します（通常5%）。第2種の過誤（偽陰性・$\\beta$ エラー）は「対立仮説が真なのに帰無仮説を棄却しない」誤りで、$\\beta$ と表します。$\\alpha$ と $\\beta$ はトレードオフの関係にあり、$\\alpha$ を厳しくすると $\\beta$ が増えます。`},{id:`i1-3`,question:`20人ずつの2群を比べたところ、差は 3.5 mmHg、P値は 0.17 でした（有意水準 5%）。読み方として正しいものは？`,options:[`差は無いと分かったので、これ以上人数を増やして調べる必要はない`,`本当に差が有る確率は17%で、差が無い確率は83%である`,`棄却はできないが、この人数では見逃しやすく、差が無いとも言えない`,`帰無仮説が正しい確率が83%と高いので、帰無仮説を採択してよい`],correctAnswer:2,explanation:`P値は「帰無仮説が正しいと仮定したとき、この差以上が出る確率」で、仮説が正しい確率ではありません。標準偏差 8 なら、20人ずつの検定は本当の差が 3.5 でも検出力が 0.28 しかなく、7割以上の確率で見逃します（本文の検出力曲線）。P > 0.05 は「差がある」と言えなかっただけで、「差が無い」ことの証明にはなりません。`},{id:`i1-4`,question:`他の条件を一定として、サンプルサイズを増やすと検出力はどうなるか？`,options:[`有意水準に依存する`,`低下する`,`変わらない`,`上昇する`],correctAnswer:3,explanation:`サンプルサイズ $n$ が大きくなると標準誤差 $\\sigma/\\sqrt{n}$ が小さくなり、小さな差でも統計的に有意になります（検出力が上がる）。ただし統計的有意性は「実務的な意味のある差」を保証しません。サンプルが十分大きければ、ほぼ無意味な差でも有意になるため、効果量と合わせて判断することが重要です。`},{id:`i1-5`,question:`P値が 0.03 のとき、有意水準 5% では何と結論するか？`,options:[`帰無仮説を棄却する`,`判断保留`,`再検定が必要`,`帰無仮説を採択する`],correctAnswer:0,explanation:`$p = 0.03 < \\alpha = 0.05$ なので帰無仮説を棄却します。P値は「帰無仮説のもとでこれ以上極端な結果が起きる確率」であり、0.03は有意水準5%の棄却域内に入っています。帰無仮説を棄却することは「対立仮説が正しいと証明した」のでなく「帰無仮説と矛盾するデータが得られた」ことを意味します。P値が小さいほど証拠が強く、大きいほど帰無仮説と矛盾しません。`},{id:`i1-6`,question:`効果量（Effect Size）とは何か？`,options:[`P値の逆数`,`差の実務的な大きさの指標`,`サンプルサイズの関数`,`有意水準との差`],correctAnswer:1,explanation:`効果量は、差の大きさを人数に左右されない形で表す指標です。代表例はコーエンの $d = (\\mu_1-\\mu_2)/\\sigma$（平均の差を標準偏差で割ったもの）で、$d = 0.2$ が小、$0.5$ が中、$0.8$ が大の目安とされます。本当の差が0でない限り、人数を増やせばP値はいくらでも小さくなります。本文の例では、1万人ずつ集めた差 0.5 mmHg（$d = 0.06$）のほうが、50人ずつの差 3.5 mmHg（$d = 0.44$）よりP値がずっと小さくなりました。`},{id:`i1-7`,question:`両側検定と片側検定を比べたとき、片側検定の検出力はどうなるか？`,options:[`低くなる`,`変わらない`,`高くなる`,`サンプルサイズに依存する`],correctAnswer:2,explanation:`片側検定は「$\\mu > \\mu_0$」のように一方向だけを棄却域にするので、有意水準 5% を片側に全部使えます（境界が $z_{0.025}=1.96$ から $z_{0.05}=1.645$ に下がる）。そのため、予想した向きの差に対しては検出力が上がります。ただし向きはデータを見る前に決めておく必要があり、逆向きの差はどれだけ大きくても検出できません。`},{id:`i1-8`,question:`複数の検定を繰り返すと、全体の第1種の過誤の確率はどうなるか？`,options:[`1に収束する`,`変わらない`,`減少する`,`増大する`],correctAnswer:3,explanation:`$k$ 個の独立な検定をそれぞれ水準 $\\alpha$ で行うと、すべての帰無仮説が正しくても、少なくとも1回誤って棄却する確率は $1-(1-\\alpha)^k$ です。$\\alpha = 0.05$ なら $k=5$ で23%、$k=20$ で64%になります。ボンフェローニ補正では各検定を $\\alpha/k$ で行い、全体の誤りの確率を $\\alpha$ 以下に抑えます。`},{id:`i1-9`,question:`「検出力 80%」という設計は何を意味するか？`,options:[`真の効果があるとき 80% の確率で正しく検出できる`,`どの検定でもP値が 0.2 以下に収まるように設計する`,`差が無いのに差ありとする確率を 20% に抑える`,`差が無いのに差ありと誤って判定する確率が 80%`],correctAnswer:0,explanation:`検出力80%とは「実際に差があるとき80%の確率で正しく有意差を検出できる」設計です（$\\beta = 0.2$）。必要サンプルサイズは①効果量 $\\delta$、②有意水準 $\\alpha$、③検出力 $1-\\beta$ の3つが決まれば計算できます。例えば効果量が半分になると $n$ は約4倍必要（$n \\propto 1/\\delta^2$）。事前のPower Analysisで適切な $n$ を設計することが重要です。`},{id:`i1-10`,question:`標準偏差 10 の測定で、2群の差 5 を有意水準 5%（両側）、検出力 80% で見つけたい。1群あたり何人必要か（$z_{0.025}=1.96$、$z_{0.2}=0.84$）。`,options:[`32人`,`63人`,`126人`,`314人`],correctAnswer:1,explanation:`2群の比較では $n = 2(z_{\\alpha/2}+z_{\\beta})^2\\sigma^2/\\delta^2 = 2 \\times 2.8^2 \\times 10^2 / 5^2 = 62.7$ で、切り上げて63人ずつです。32人は式の 2 を落とした1標本の式、126人は2群の合計（63人×2）と取り違えた値、314人は $\\delta$ を2乗し忘れた値です。`}]},{id:`1.19-testing-adv`,updatedAt:`2026-10-21`,title:`検定の理論：ネイマン・ピアソンと大標本検定`,chapter:7,description:`同じ有意水準でも検出力が最も高い棄却域はどれか（ネイマン・ピアソンの基本定理と一様最強力検定）と、尤度比・ワルド・スコアの3つの検定を、正規分布とコイン投げの例で計算して学びます。`,content:`💡 **このモジュールで学ぶこと**

[P値の解釈・検定の誤り・検出力](/stats-pre1/1.18-inference/)では、有意水準 $\\alpha$ を決めて境界を引き、検出力を計算しました。けれども、同じ $\\alpha$ を守る棄却域の取り方は1つではありません。どれを選べば検出力が最も高くなるのか。パラメータの値を1つに決めない仮説はどう検定するのか。これがこのモジュールの問いです。読み終えると、次の3つができるようになります。

1. 尤度比の大きい順に棄却域を選ぶと検出力が最大になる理由を言え、正規分布の例で棄却域と検出力を計算できる
2. 片側の対立仮説には一様最強力検定があり、両側には無い理由を言える
3. 尤度比検定・ワルド検定・スコア検定を1本の対数尤度の曲線で説明し、同じデータで3つの統計量を計算できる

---

### 1. 同じ α でも検出力は違う

分散1の正規分布から25個のデータを取り、平均 $\\mu$ が0なのか0.5なのかを見分けたいとします。

- 帰無仮説 $H_0: \\mu = 0$、対立仮説 $H_1: \\mu = 0.5$
- 標本平均 $\\bar{X}$ の標準誤差は $1/\\sqrt{25} = 0.2$

このようにパラメータを1つの値に決める仮説を**単純仮説**、$\\mu > 0$ のように範囲で決める仮説を**複合仮説**と呼びます。ここでは両方とも単純仮説です。

$H_0$ のもとで確率がちょうど5%になる棄却域を3つ作り、$\\mu = 0.5$ のときの検出力を比べます。

| 棄却域（どれも α = 0.05） | 検出力 |
|---|---|
| 右側：$\\bar{X} > 0.329$ | 0.80 |
| 両側：$\\lvert\\bar{X}\\rvert > 0.392$ | 0.71 |
| 左側：$\\bar{X} < -0.329$ | 0.00002 |

第1種の過誤の確率は同じなのに、検出力は大きく違います。対立仮説が右にあるので右側に置くのがよさそうですが、もっと良い取り方が無いとはまだ言えません。それに答えるのが次の定理です。

---

### 2. ネイマン・ピアソンの基本定理

**ネイマン・ピアソンの基本定理**は、単純仮説どうしの検定で、水準 $\\alpha$ のもとで検出力が最大になる棄却域を与えます。この棄却域を使う検定を**最強力検定**と呼びます。使うのは、データ $\\boldsymbol{x}$ の尤度の比です。

$$\\Lambda(\\boldsymbol{x}) = \\frac{L(\\theta_1)}{L(\\theta_0)} = \\frac{f(\\boldsymbol{x};\\theta_1)}{f(\\boldsymbol{x};\\theta_0)}$$

$\\Lambda$ が大きいデータの値から順に棄却域に入れ、$H_0$ のもとでの確率がちょうど $\\alpha$ になったところで止めます。止めたところの $\\Lambda$ の値を $c$ とすると、棄却域は $\\Lambda(\\boldsymbol{x}) > c$ と書けます。

なぜ比の大きい順なのかは、限られた予算の使い方として読むと分かります。

- 棄却域にデータの値を1つ入れると、$H_0$ のもとでのその値の確率 $f(\\boldsymbol{x};\\theta_0)$ だけ $\\alpha$ を使う（費用）
- 同時に、$H_1$ のもとでの確率 $f(\\boldsymbol{x};\\theta_1)$ だけ検出力が増える（収入）
- 費用は合計 $\\alpha$ まで。収入を最大にするには、費用1あたりの収入 $f(\\boldsymbol{x};\\theta_1)/f(\\boldsymbol{x};\\theta_0)$ が大きい値から入れればよい

効率の低い値を含む棄却域があれば、その値を外に出し、外にある効率の高い値を同じ費用ぶん入れると、$\\alpha$ は同じまま検出力が上がります。尤度比の大きい順に選んだ棄却域には、この入れ替えの余地がありません。

📖 データが独立なら、尤度比は1個ずつの比の積 $\\prod_i f(x_i;\\theta_1)/f(x_i;\\theta_0)$ です。対数をとると、各データの寄与の和になります。

---

### 3. 正規分布の例で棄却域を求める

第1節の例で尤度比を計算します。分散1の正規分布の密度を25個掛けて比をとると、指数の中の $\\sum (x_i - \\mu)^2$ を展開したとき、$\\mu$ を含まない項が分子と分母で打ち消し合います。

$$\\begin{aligned} \\log \\Lambda &= 0.5\\sum_{i=1}^{25} x_i - \\frac{25 \\times 0.5^2}{2} \\\\ &= 25\\,(0.5\\,\\bar{x} - 0.125) \\end{aligned}$$

右辺は $\\bar{x}$ が大きいほど大きくなります。したがって「$\\Lambda$ が $c$ を超える」は「$\\bar{x}$ がある値 $k$ を超える」と同じ棄却域です。$k$ は $\\alpha$ から決めます。

$$P(\\bar{X} > k \\mid \\mu = 0) = 0.05 \\;\\Longrightarrow\\; k = 1.645 \\times 0.2 = 0.329$$

$\\bar{x} = 0.329$ を上の式に入れると $\\log\\Lambda = 0.987$ で、$c = e^{0.987} = 2.68$ です。

[[f-np-region]]

第1節の表の右側の棄却域が、尤度比で選んだ棄却域そのものでした。検出力は次のとおりで、水準5%のどの棄却域もこれを超えられません。

$$z = \\frac{0.329 - 0.5}{0.2} = -0.855$$

$$\\begin{aligned} &P(\\bar{X} > 0.329 \\mid \\mu = 0.5) \\\\ &= P(Z > -0.855) = 0.80 \\end{aligned}$$

---

### 4. 一様最強力検定：対立仮説が範囲のとき

実際の対立仮説は、「$\\mu = 0.5$」のような1点ではなく「$\\mu > 0$」のような範囲であることがほとんどです。

第3節の計算で、0.5 の代わりに正の値 $\\mu_1$ を入れると $\\log\\Lambda = 25(\\mu_1\\bar{x} - \\mu_1^2/2)$ になります。$\\mu_1 > 0$ なら、やはり $\\bar{x}$ が大きいほど大きくなるので、棄却域は同じ $\\bar{X} > 0.329$ です。$\\mu_1$ をいくつにしても、最強力の棄却域は変わりません。

対立仮説の範囲のどの値に対しても最強力になる検定を、**一様最強力検定**（UMP検定）と呼びます。$\\bar{X} > 0.329$ は、$H_1: \\mu > 0$ に対する一様最強力検定です。

両側の対立仮説 $H_1: \\mu \\neq 0$ では事情が変わります。

- $\\mu_1 < 0$ のときは、$\\log\\Lambda$ は $\\bar{x}$ が小さいほど大きくなり、最強力の棄却域は左側 $\\bar{X} < -0.329$ になる
- 第1節の表のとおり、左側の棄却域は $\\mu = 0.5$ に対して検出力がほぼ0
- 正の向きにも負の向きにも最強力な棄却域は1つも無いので、両側の対立仮説には一般に一様最強力検定が無い

ふだん使う両側検定 $\\lvert\\bar{X}\\rvert > 0.392$ は、どちらの向きにもそこそこの検出力を持たせた折り合いです。$\\mu = 0.5$ では、右側だけの検定より検出力が 0.80 から 0.71 に下がります。

---

### 5. 大標本の3つの検定

ネイマン・ピアソンの定理は、両方の仮説が1点のときの話でした。帰無仮説がパラメータの値を決め、対立仮説はそれ以外の全部、という形の検定には、最尤推定を使う方法が3つあります。

コインを50回投げて表が32回出たとします。表の確率を $p$ として $H_0: p = 0.5$ を検定します。対数尤度と最尤推定値は次のとおりです。

$$\\begin{aligned} \\ell(p) &= 32\\log p + 18\\log(1-p) \\\\ \\hat{p} &= \\frac{32}{50} = 0.64 \\end{aligned}$$

この対数尤度の曲線の上で、3つの検定は別々の場所を測ります。

[[f-three-tests]]

- **尤度比検定**：山頂 $\\hat{p}$ と $p_0$ の、高さの差を測る。$H_0$ が正しければ山頂は $p_0$ の近くにあり、高さの差は小さいはず
- **ワルド検定**：山頂の位置 $\\hat{p}$ と $p_0$ の横の距離を、$\\hat{p}$ の標準誤差を単位にして測る
- **スコア検定**：$p_0$ での曲線の傾き（**スコア**＝対数尤度の微分）を測る。$p_0$ が山頂なら傾きは0のはず

それぞれ $\\chi^2$ 分布と比べられる形に直すと、次の値になります。

- 尤度比：$-2\\log\\Lambda = 2\\{\\ell(\\hat{p}) - \\ell(p_0)\\} = 2 \\times 1.99 = 3.97$
- ワルド：$(\\hat{p} - p_0)^2 / \\widehat{\\mathrm{Var}}(\\hat{p}) = 0.14^2 / 0.0046 = 4.25$
- スコア：$U(p_0)^2 / I(p_0) = 28^2 / 200 = 3.92$

式の中身は次のとおりです。

- ワルドの分母 $\\hat{p}(1-\\hat{p})/50 = 0.0046$ は、[信頼区間：1標本の推定](/stats-pre1/1.16-ci/)で母比率の標準誤差に使ったものと同じ
- スコア $U(p) = 32/p - 18/(1-p)$ は $p_0 = 0.5$ で28。$I(p_0) = 50/\\{p_0(1-p_0)\\} = 200$ は[推定量の性質](/stats-pre1/1.15-estimator-props/)のフィッシャー情報量
- 尤度比に $-2$ を掛けるのは、正規分布の平均の検定でちょうど $z^2$ になるから。分散1・25個で $H_0: \\mu = 0$ なら $-2\\log\\Lambda = 25\\bar{x}^2 = (\\bar{x}/0.2)^2$

$H_0$ が正しいとき、大標本ではどれも自由度 $r$ の $\\chi^2$ 分布に近づきます。$r$ は $H_0$ が値を決めるパラメータの数で、この例では $p$ の1つなので $r = 1$ です。尤度比検定についてのこの結果を**ウィルクスの定理**と呼びます。$\\chi^2(1)$ の上側5%点は 3.84 なので、3つとも棄却します（P値は順に 0.046、0.039、0.048）。

#### 3つが食い違うとき

大標本では3つの値はほぼそろい、同じ結論になります（**漸近的に同等**）。50回ではまだ差が残り、境界の近くでは結論が分かれます。

- 同じ仮説を、確率 $p$ ではなく対数オッズ $\\log\\{p/(1-p)\\}$ で書いて（$H_0$：対数オッズ $= 0$）ワルド検定をすると、統計量は 3.81 で 3.84 に届かず、結論が変わる。ワルド検定は、パラメータの表し方を変えると値が変わる。尤度比検定とスコア検定は変わらない
- 二項分布から直接計算した正確な両側P値は 0.065 で、5%では棄却しない

#### 使い分け

- **尤度比検定**（推定は $H_0$ のもとと制約なしの2回）：表し方で値が変わらないので、ふつうはこれを基準にする
- **ワルド検定**（制約なしの1回）：推定値と標準誤差だけで計算できる。統計ソフトの係数表に出る z 値はこれ
- **スコア検定**（$H_0$ のもとの1回）：制約なしのモデルが推定しにくいときに便利。変数を加える前のモデルだけで、加えるべきかを調べられる

ワルド検定で棄却することは、信頼区間 $\\hat{p} \\pm 1.96 \\times \\text{標準誤差}$ が $p_0$ を含まないことと同じです。推定値がパラメータの端（$\\hat{p}$ が0や1の近く）にあると、標準誤差の見積もりが崩れて当てにならなくなります。`,keyFormulas:[{label:`ネイマン・ピアソンの棄却域（最強力検定）`,formula:`\\Lambda(\\boldsymbol{x}) = \\dfrac{f(\\boldsymbol{x};\\theta_1)}{f(\\boldsymbol{x};\\theta_0)} > c`},{label:`尤度比検定（ウィルクスの定理）`,formula:`-2\\log\\Lambda = 2\\{\\ell(\\hat{\\theta}) - \\ell(\\theta_0)\\} \\xrightarrow{d} \\chi^2(r)`},{label:`ワルド検定`,formula:`W = \\dfrac{(\\hat{\\theta}-\\theta_0)^2}{\\widehat{\\mathrm{Var}}(\\hat{\\theta})}`},{label:`スコア検定`,formula:`S = \\dfrac{U(\\theta_0)^2}{I(\\theta_0)}, \\quad U(\\theta) = \\dfrac{d\\ell}{d\\theta}`}],quiz:[{id:`tst1-1`,question:`ネイマン・ピアソンの基本定理が与える棄却域はどれか？`,options:[`水準 $\\alpha$ を守る棄却域のうち、検出力が最も高いもの`,`水準 $\\alpha$ を守る棄却域のうち、P値が最も小さくなるもの`,`検出力80%を守る棄却域のうち、必要な人数が最も少ないもの`,`第1種の過誤と第2種の過誤の確率の和が、最も小さくなるもの`],correctAnswer:0,explanation:`単純仮説どうしの検定で、第1種の過誤の確率を $\\alpha$ に固定したうえで、検出力（$1-\\beta$）が最大になる棄却域を与えます。尤度比 $L(\\theta_1)/L(\\theta_0)$ の大きい値から順に入れて、$H_0$ のもとでの確率が $\\alpha$ になったところで止めたものです。`},{id:`tst1-2`,question:`分散1の正規分布から25個取り、$H_0: \\mu = 0$ 対 $H_1: \\mu = 0.5$ を水準5%で検定するとき、最強力検定の検出力に最も近いのは？`,options:[`0.05`,`0.71`,`0.80`,`0.95`],correctAnswer:2,explanation:`尤度比は $\\bar{x}$ が大きいほど大きいので、最強力検定の棄却域は $\\bar{X} > 1.645 \\times 0.2 = 0.329$ です。$\\mu = 0.5$ のとき $P(Z > (0.329-0.5)/0.2) = P(Z > -0.855) = 0.80$。0.71 は両側の棄却域 $|\\bar{X}| > 0.392$ の検出力、0.05 は $\\mu = 0$ のときに棄却する確率（$\\alpha$）です。`},{id:`tst1-8`,question:`単純仮説と複合仮説の違いとして正しいものはどれか？`,options:[`単純仮説は片側の仮説で、複合仮説は両側の仮説である`,`単純仮説は分布を1つに決め、複合仮説は複数の分布を含む`,`単純仮説は帰無仮説に使い、複合仮説は対立仮説に使う`,`単純仮説は離散分布に使い、複合仮説は連続分布に使う`],correctAnswer:1,explanation:`単純仮説は $\\theta = 0.5$ のようにパラメータを1つの値に決めるので、データの分布が1つに決まります。$\\theta > 0$ のような範囲で決める複合仮説は、分布をたくさん含みます。片側か両側か、帰無か対立かとは関係ありません（$H_1: \\mu > 0$ は片側の複合仮説、$H_1: \\mu \\neq 0$ は両側の複合仮説）。`},{id:`tst1-11`,question:`本文の例（25個・分散1）で、棄却域 $\\bar{X} > 0.329$ が一様最強力検定になるのは、$H_0: \\mu = 0$ に対してどの対立仮説のときか？`,options:[`$H_1: \\mu \\neq 0$`,`$H_1: \\mu < 0$`,`どの対立仮説に対してもならない`,`$H_1: \\mu > 0$`],correctAnswer:3,explanation:`正の $\\mu_1$ なら、$\\log\\Lambda = 25(\\mu_1\\bar{x} - \\mu_1^2/2)$ は $\\bar{x}$ が大きいほど大きいので、どの $\\mu_1 > 0$ に対しても最強力の棄却域は $\\bar{X} > 0.329$ です。$\\mu_1 < 0$ に対しては左側が最強力になり、右側の棄却域の検出力はほぼ0です。両側の $H_1: \\mu \\neq 0$ には、両方の向きで最強力な棄却域がありません。`},{id:`tst1-12`,question:`$H_0$ がパラメータを $r$ 個決めるとき、$H_0$ のもとで $-2\\log\\Lambda$ が大標本で近づく分布はどれか？`,options:[`自由度 $n-r$ の $\\chi^2$ 分布`,`自由度 $r$ の $t$ 分布`,`自由度 $r$ の $\\chi^2$ 分布`,`自由度 $(r, n-r)$ の $F$ 分布`],correctAnswer:2,explanation:`ウィルクスの定理により、$-2\\log\\Lambda$ は自由度 $r$ の $\\chi^2$ 分布に近づきます。$r$ は $H_0$ が値を決めるパラメータの数で、データの数 $n$ には依存しません。コインの例（$H_0: p = 0.5$）では $r = 1$ で、$\\chi^2(1)$ の上側5%点 3.84 と比べます。`},{id:`tst1-13`,question:`コインを50回投げて表が32回出た。$H_0: p = 0.5$ のワルド検定統計量 $(\\hat{p}-p_0)^2/\\widehat{\\mathrm{Var}}(\\hat{p})$ に最も近いのは？`,options:[`3.92`,`4.25`,`3.97`,`1.98`],correctAnswer:1,explanation:`$\\hat{p} = 0.64$、ワルド検定は分散を $\\hat{p}$ で見積もるので $\\widehat{\\mathrm{Var}}(\\hat{p}) = 0.64 \\times 0.36/50 = 0.0046$、統計量は $0.14^2/0.0046 = 4.25$ です。分散を $p_0 = 0.5$ で見積もると $0.14^2/0.005 = 3.92$ でスコア検定の値、3.97 は尤度比検定の値、1.98 はスコア検定の値の平方根（$z$）です。`},{id:`tst1-14`,question:`ワルド検定とスコア検定の違いとして正しいものはどれか？`,options:[`ワルドは制約なしの推定値で分散を見積もり、スコアは $H_0$ の値で見積もる`,`ワルドは $H_0$ の値で分散を見積もり、スコアは制約なしの推定値で見積もる`,`ワルドは小標本用の正確な検定で、スコアは大標本用の近似の検定である`,`ワルドは $\\chi^2$ 分布と比べ、スコアは $t$ 分布と比べて棄却を決める`],correctAnswer:0,explanation:`ワルド検定は制約なしの最尤推定値 $\\hat{\\theta}$ と $\\theta_0$ の距離を、$\\hat{\\theta}$ の標準誤差で測ります。スコア検定は $\\theta_0$ での対数尤度の傾きを、$\\theta_0$ でのフィッシャー情報量で測ります。どちらも大標本の近似で、$H_0$ のもとで同じ $\\chi^2$ 分布に近づきます。`},{id:`tst1-15`,question:`スコア検定が特に便利なのはどんな場面か？`,options:[`帰無仮説のモデルが複雑で、$H_0$ のもとの最尤推定が難しいとき`,`対立仮説のモデルが複雑で、制約なしの最尤推定が難しいとき`,`標本が小さく、$\\chi^2$ 分布への近似が当てにならないとき`,`パラメータの表し方を変えても、値が変わらない検定がほしいとき`],correctAnswer:1,explanation:`スコア検定は $H_0$ のもとで推定したモデルだけで計算できます。変数を加えたモデルが推定しにくいときに、加える前のモデルだけで「加えるべきか」を調べられます。表し方で値が変わらないのは尤度比検定とスコア検定の両方なので、スコア検定だけの利点ではありません。`},{id:`tst1-16`,question:`同じデータ・同じ仮説でも、パラメータの表し方（$p$ を対数オッズに替えるなど）で統計量の値が変わるのはどれか？`,options:[`尤度比検定`,`スコア検定`,`3つとも変わらない`,`ワルド検定`],correctAnswer:3,explanation:`ワルド検定は推定値と標準誤差の比なので、目盛りの付け方を変えると値が変わります。本文のコインの例では、$p$ で書くと 4.25、対数オッズで書くと 3.81 で、5%の境界 3.84 をはさんで結論が分かれました。尤度比検定とスコア検定は、表し方を変えても値が変わりません。`},{id:`tst1-17`,question:`ネイマン・ピアソンの棄却域を、尤度比 $f(x;\\theta_1)/f(x;\\theta_0)$ の大きい値から順に選ぶ理由はどれか？`,options:[`$\\alpha$ を1だけ使うごとに、検出力を最も多く増やせる値から入れるため`,`尤度比の大きい値ほど、帰無仮説のもとで出やすい値になるため`,`尤度比の大きい値を選ぶと、第2種の過誤の確率が0になるため`,`尤度比の対数をとると、各データの寄与を足し算で表せるため`],correctAnswer:0,explanation:`値 $x$ を棄却域に入れると、$\\alpha$ を $f(x;\\theta_0)$ だけ使い、検出力が $f(x;\\theta_1)$ だけ増えます。使える $\\alpha$ が決まっているので、使う量あたりの増え方（尤度比）が大きい値から入れると検出力が最大になります。対数で足し算になるのは計算の便利さで、選び方の理由ではありません。尤度比が大きい値は、むしろ $H_1$ のもとで出やすい値です。`}]},{id:`1.20-testing-applied`,updatedAt:`2026-10-22`,title:`検定の実践：正規・適合度・ノンパラメトリック`,chapter:7,description:`Q-Q プロットで正規性を確かめ、母相関係数・適合度・母比率・ポアソン分布の検定と、外れ値に強い順位和検定を数値例で学びます。`,content:`💡 **このモジュールで学ぶこと**

[検定の理論](/stats-pre1/1.19-testing-adv/)では、どの棄却域が最も検出力が高いかを考えました。実際のデータを前にすると、問いは「このデータにはどの検定を使えばよいか」に変わります。データは測った値なのか、何人中何人と数えた値なのか、度数の表なのか。正規分布を仮定してよいのか。読み終えると、次の3つができるようになります。

1. Q-Q プロットの点の曲がり方から、データが正規分布からどうずれているかを言える
2. データの種類（比率・件数・度数の表）に合った検定を選び、統計量とP値を計算できる
3. 順位を使う検定がいつ役に立つかを言え、2群の順位和検定を計算できる

---

### 1. どの検定を使うかは、データの形で決まる

これまでのモジュールで、正規分布を仮定した検定をいくつも学びました。このモジュールで新しく扱うのは、データが数えた値のときと、正規分布の仮定が怪しいときです。

| データと知りたいこと | 使う検定 |
|---|---|
| 測った値の平均・分散（正規分布を仮定できる） | $t$ 検定・$\\chi^2$ 検定（[P値の解釈・検定の誤り](/stats-pre1/1.18-inference/)、[信頼区間](/stats-pre1/1.16-ci/)） |
| 2つの測った値の相関 | 母相関係数の検定（この節） |
| 正規分布か疑わしい | Q-Q プロットで確かめる（第2節） |
| 度数の表が、ある分布に合うか | 適合度検定（第3節） |
| 何人中何人・何件 | 母比率の検定・ポアソン分布の検定（第4節） |
| 外れ値がある・順位しか無い | 順位を使う検定（第5節） |

母分散の検定は、[信頼区間](/stats-pre1/1.16-ci/)で母分散の区間に使った量 $(n-1)S^2/\\sigma_0^2$ を、$\\chi^2(n-1)$ の棄却域と比べるだけです。区間が $\\sigma_0^2$ を含まないことと、検定で棄却することは同じです。

#### 母相関係数の検定：相関0と言えるか

20人について勉強時間と点数を調べ、相関係数 $r = 0.45$ を得ました。母集団の相関が0でも、20人ならこのくらいの相関は偶然に出るでしょうか。$H_0: \\rho = 0$ を、次の統計量で検定します（2つの変数が2変量正規分布に従うことが前提）。

$$t = \\frac{r\\sqrt{n-2}}{\\sqrt{1-r^2}} = \\frac{0.45\\sqrt{18}}{\\sqrt{1-0.2025}} = 2.14$$

$H_0$ のもとで $t$ は自由度 $n-2 = 18$ の $t$ 分布に従います。両側5%の境目は 2.10 なので、わずかに超えて棄却します（P値は約0.047）。

- 自由度が $n-2$ なのは、この $t$ が、回帰直線の傾きが0かを調べる $t$ 検定と同じ値になるから。直線を引くのに切片と傾きの2つを推定するので、2つ減る
- $r$ が同じ 0.45 でも、10人なら $t = 1.43$ で棄却されず、相関の大きさと、相関が0でないと言えるかは別の話

---

### 2. 正規分布か確かめる：Q-Q プロット

$t$ 検定や母分散の $\\chi^2$ 検定は、データが正規分布から来ていることを前提にしています。平均の $t$ 検定は $n$ が大きければ多少のずれに耐えますが、分散の検定はずれに弱く、P値が大きく狂います。まず目で確かめるのが **Q-Q プロット**です。作り方は次の3段です。

1. データを小さい順に並べ、標準化する（平均を引き、標準偏差で割る）
2. $n$ 個のうち $i$ 番目のデータに、標準正規分布で同じ位置に来るはずの値（確率 $(i-0.5)/n$ の分位点）を組にする
3. 横軸に正規分布の値、縦軸にデータを取って点を打つ

データが正規分布なら、点は斜め45度の直線の上に並びます。離れ方で、どんな分布かが分かります。

[[f-qq]]

- **右に裾が長い**（所得や待ち時間）：点が弓なりに並び、右上が直線より上へそる。大きい側に、正規分布よりずっと遠くまで値が出る
- **両裾が重い**：左下は直線より下、右上は直線より上に離れる。両側とも、正規分布より極端な値が出やすい
- **左に裾が長い**：右に裾が長いときを上下左右に裏返した形になる

同じことを数で判定する検定もあります。どれも帰無仮説は「データは正規分布に従う」です。

- **シャピロ・ウィルク検定**：考え方は、Q-Q プロットの点がどれだけ直線に近いかを1つの数にしたもの。よく使われる
- **コルモゴロフ・スミルノフ検定**：データの累積分布と、理論の累積分布の差の最大値を測る。平均と分散をデータから推定したときは、そのままの棄却域では甘くなる
- **ジャック・ベラ検定**：歪度と尖度が、正規分布の値（0 と 3）からどれだけ離れているかを測る。大標本向け

棄却されないことは、正規分布である証明にはなりません。

- $n$ が小さいと検出力が低く、正規分布でなくても棄却されにくい
- $n$ が数千あると、実用上かまわない小さなずれでも棄却される

検定の結果だけで決めず、Q-Q プロットの形と、データの性質（負の値が出ない・上限があるなど）と合わせて判断します。

---

### 3. 適合度検定と一般の分布の検定

「データが特定の分布に従うか」を調べる検定です。

**適合度検定**（Goodness-of-fit Test）：$k$ カテゴリの観測度数 $O_i$ と期待度数 $E_i$ の乖離を測ります：

$$\\chi^2 = \\sum_{i=1}^k \\frac{(O_i - E_i)^2}{E_i} \\xrightarrow{d} \\chi^2(k-1-p)$$

$p$ はデータから推定したパラメータ数（自由度から引く）。「サイコロは公正か？」「データは正規分布に従うか？」などに使います。二項分布やポアソン分布の母数そのもの（成功の確率・平均の件数）を検定するときは、次の節の方法を使います。

**具体例：サイコロは公正か？**

サイコロを60回投げた結果、各目の出現回数が以下のとおりでした。

| 目 | 1 | 2 | 3 | 4 | 5 | 6 |
|----|----|----|----|----|----|----|
| 観測 $O_i$ | 8 | 12 | 14 | 9 | 7 | 10 |
| 期待 $E_i$ | 10 | 10 | 10 | 10 | 10 | 10 |

公正なら各目の期待値は $60/6 = 10$。$\\chi^2$ 統計量を計算します：

$$\\begin{aligned}\\chi^2 =\\;& \\frac{(8-10)^2}{10} + \\frac{(12-10)^2}{10} + \\frac{(14-10)^2}{10} \\\\ &+ \\frac{(9-10)^2}{10} + \\frac{(7-10)^2}{10} + \\frac{(10-10)^2}{10}\\end{aligned}$$

$$= 0.4 + 0.4 + 1.6 + 0.1 + 0.9 + 0 = 3.4$$

自由度 $= k-1 = 5$（パラメータ推定なし）。$\\chi^2_{0.05}(5) = 11.07$。$3.4 < 11.07$ なので **棄却できない** → 「公正でないとは言えない」と結論します。P値はおよそ 0.64 です。

---

### 4. 母比率の検定とポアソン分布の検定

「新しい広告のクリック率は、これまでの10%より高いか？」「交差点の事故は増えたか？」のように、何人中何人・何件と数えたデータで母数を検定する場面です。正規分布の検定と同じく、帰無仮説の値を仮定して、観測した値がどれくらい起こりにくいかを測ります。

#### 母比率の検定：何人中何人

400人に新しい広告を見せたら、52人がクリックしました（$\\hat{p} = 0.13$）。帰無仮説 $H_0: p = 0.10$、対立仮説 $H_1: p > 0.10$ で検定します。

$H_0$ のもとでクリックした人数は $B(400,\\, 0.10)$ に従い、平均 $40$、標準偏差 $\\sqrt{400 \\times 0.1 \\times 0.9} = 6$ です。$n$ が大きいので正規分布で近似します（[二項分布](/stats-pre1/1.6-binomial/)）。比率で書くと次の式です。

$$Z = \\frac{\\hat{p} - p_0}{\\sqrt{p_0(1-p_0)/n}} = \\frac{0.13 - 0.10}{0.015} = 2.0$$

片側5%の境目 1.645 を超えるので、$H_0$ を棄却し「クリック率は10%より高い」と結論します。P値は約0.023です。

- 分母の標準誤差には、$\\hat{p}$ ではなく帰無仮説の値 $p_0$ を使う。検定は $H_0$ が正しいと仮定して計算するため。[信頼区間](/stats-pre1/1.16-ci/)では仮定する値が無いので $\\hat{p}$ を使う
- 連続修正をすると $(51.5 - 40)/6 \\approx 1.92$ で P値は約0.028、二項分布で正確に足すと約0.031。どれも5%を下回る
- $n$ が小さいときは二項分布で正確に計算する。たとえば10回中9回成功で $p_0 = 0.5$ なら、$P(X \\ge 9) = 11/1024 \\approx 0.011$

#### 2つの比率の差：2つの工場の不良率

工場Aは200個中12個（6%）、工場Bは300個中9個（3%）が不良でした。不良率に差があるかを両側で検定します。$H_0$ のもとでは2つの不良率は等しいので、2つを合わせた比率 $\\hat{p} = 21/500 = 0.042$ で標準誤差を計算します。

$$\\begin{aligned} Z &= \\frac{\\hat{p}_A - \\hat{p}_B}{\\sqrt{\\hat{p}(1-\\hat{p})\\left(\\frac{1}{n_A} + \\frac{1}{n_B}\\right)}} \\\\ &= \\frac{0.06 - 0.03}{0.0183} \\approx 1.64 \\end{aligned}$$

両側5%の境目 1.96 に届かないので、差があるとは言えません（P値は約0.10）。不良率は2倍でも、不良の数が12個と9個と少ないので、偶然の範囲を出ません。この $Z$ の2乗は、同じデータを2×2の分割表にしたときのカイ二乗統計量（[分割表の解析](/stats-pre1/3.4-contingency/)）と一致します。

#### ポアソン分布の検定：何件

ある交差点の事故は、これまで年平均4件でした。今年は9件起きています。増えたと言えるでしょうか。$H_0: \\lambda = 4$ のもとで、1年の事故の件数は $\\text{Po}(4)$ に従います（[ポアソン分布](/stats-pre1/1.7-poisson/)）。9件以上になる確率を、確率の式から直接足します。

$$P(X \\ge 9) = 1 - \\sum_{k=0}^{8} e^{-4}\\frac{4^k}{k!} \\approx 0.021$$

[[f-poisson-test]]

片側5%を下回るので、$H_0$ を棄却し「事故は増えた」と結論します。

- 正規近似 $Z = (9 - 4)/\\sqrt{4} = 2.5$ を使うと P値は約0.006 で、正確な値の3分の1以下になる。$\\lambda$ が小さいと分布が右に裾を引き、左右対称の正規分布では合わない
- $\\lambda_0$ が大きいときは $Z = (X - \\lambda_0)/\\sqrt{\\lambda_0}$ で近似できる。分母が $\\sqrt{\\lambda_0}$ なのは、ポアソン分布の分散が平均と同じ $\\lambda_0$ だから
- 何年分かをまとめるときは、ポアソン分布の和もポアソン分布になる性質を使い、$t$ 年の合計を $\\text{Po}(t\\lambda_0)$ で検定する

---

### 5. 順位で比べる：ウィルコクソンの順位和検定

新しい作業手順を7人、今の手順を7人に試し、作業時間（分）を測りました。

- 新しい手順 A：11, 12, 13, 14, 15, 16, 60
- 今の手順 B：17, 18, 19, 20, 21, 22, 23

A の7人のうち6人は、B の誰よりも早く終わりました。1人だけ機械の不調で60分かかっています。平均は A が 20.1分、B が 20.0分でほぼ同じで、2標本 $t$ 検定は $t = 0.02$、P値 0.98 です。60分の1人が、A の平均と標準偏差（17.7分）を大きく引き上げたからです。

**順位和検定**は、値の大きさの代わりに、14人を合わせて短い順に並べた順位を使います。

[[f-rank-ab]]

A の順位の和は $W_A = 35$ です。A と B に差が無ければ、1から14の順位はどちらのグループにも同じように散らばるはずです。そこから次の量を作ります。

$$U_A = W_A - \\frac{7 \\times 8}{2} = 35 - 28 = 7$$

$U_A$ は、A と B から1人ずつ選んだ $7 \\times 7 = 49$ 組のうち、A の方が遅かった組の数です（60分の人が B の7人全員より遅い7組）。差が無ければ平均は $49/2 = 24.5$ 組なので、7組はかなり少ない側です。

- **正確なP値**：14個の順位から A の7個を選ぶ選び方は $\\binom{14}{7} = 3432$ 通り。$U_A$ が7以下になるのはそのうち45通りで、片側 $45/3432 = 0.013$、両側 0.026
- **正規近似**：差が無いとき $U_A$ の分散は $7 \\times 7 \\times 15/12 = 61.25$。$z = (7 - 24.5)/\\sqrt{61.25} = -2.24$ で、両側P値 0.025

5%で棄却し、「A の方が短く終わりやすい」と結論します。60分が25分でも1000分でも順位は14のままなので、この結論は変わりません。$t$ 検定は、遅れた1人が25分なら P値 0.028 で差を見つけ、60分なら 0.98 で見逃します。

- 順位和検定が調べるのは「どちらのグループの値が大きくなりやすいか」で、平均の差ではない
- 2つの分布が同じ形で位置だけずれていると仮定できるときは、中央値の差の検定として読める
- 正規分布が正しいときは $t$ 検定より検出力がわずかに低い。外れ値が出るときや裾の重い分布では、順位の検定の方が強い
- **マン・ホイットニーの $U$ 検定**は、この $U$ を使う同じ検定の別名

#### 順位を使うほかの検定

データの形ごとに、正規分布を仮定する検定の代わりになる順位の検定があります。

- **対応のある2群**（同じ人の前と後）：対応のある $t$ 検定の代わりに、**ウィルコクソンの符号付き順位検定**。前後の差の絶対値に順位を付け、プラスの差の順位の和を見る
- **3群以上**：[分散分析](/stats-pre1/1.21-anova/)の代わりに、**クラスカル・ウォリス検定**。全員に順位を付け、群ごとの順位の平均がどれだけ散らばるかを見る
- **3群以上で対応あり**（同じ人が全部の条件を試す）：**フリードマン検定**。人ごとに条件の順位を付ける
- **2つの変数の関係**：相関係数の代わりに、**スピアマンの順位相関係数** $r_s = 1 - \\dfrac{6\\sum d_i^2}{n(n^2-1)}$（$d_i$ は2つの順位の差）。直線的でなくても、一方が増えると他方も必ず増える関係なら1になる

順位和検定の正確なP値は、ラベルの付け替えを全部数えて出しました。値そのものについて同じことをするのが**並べ替え検定**（順列検定）です。

- A と B に差が無ければ、14人の値を A と B に分けるどの分け方も同じように起こりうる
- 3432通りの分け方それぞれで平均の差を計算し、実際の差より極端なものの割合をP値にする
- 分布の仮定が要らず、小標本でもP値が正確。順位和検定は、順位について並べ替え検定をしたものになっている

---

### 6. 検定の選び方

検定は、データを見る前に、データの種類と調べ方から決めます。

1. **数えたデータか、測った値か**：何人中何人・何件なら第4節、度数の表なら第3節か[分割表の解析](/stats-pre1/3.4-contingency/)
2. **測った値なら、何群か、対応があるか**：2群は $t$ 検定、同じ人の前後は対応のある $t$ 検定、3群以上は分散分析
3. **外れ値が出やすい・裾が重い・順位しか無い**：上の順位の検定に置き換える
4. **$n$ がとても小さく、正規近似やカイ二乗近似が心配**：**正確検定**を使う。二項分布やポアソン分布で直接足す（第4節）、順位の分け方を数える（第5節）、期待度数の小さい分割表にはフィッシャーの正確検定

⚠️ 同じデータで「正規性の検定で棄却されたら順位の検定、されなければ $t$ 検定」と2段に重ねるやり方は、第1種の過誤の確率が名目の5%からずれます。正規性は、データの性質と Q-Q プロットで判断します。`,keyFormulas:[{label:`母相関係数の検定（相関0か）`,formula:`t = \\dfrac{r\\sqrt{n-2}}{\\sqrt{1-r^2}} \\sim t(n-2)`},{label:`適合度検定`,formula:`\\begin{aligned} \\chi^2 &= \\sum_{i=1}^k \\dfrac{(O_i-E_i)^2}{E_i} \\\\ &\\sim \\chi^2(k-1-p) \\end{aligned}`},{label:`母比率の検定`,formula:`Z = \\dfrac{\\hat{p}-p_0}{\\sqrt{p_0(1-p_0)/n}}`},{label:`順位和検定の U`,formula:`\\begin{aligned} U_A &= W_A - \\dfrac{m(m+1)}{2} \\\\ E[U_A] &= \\dfrac{mn}{2},\\ \\ \\mathrm{Var}(U_A) = \\dfrac{mn(m+n+1)}{12} \\end{aligned}`},{label:`スピアマンの順位相関係数`,formula:`r_s = 1 - \\dfrac{6\\sum d_i^2}{n(n^2-1)}`}],quiz:[{id:`tst1-3`,question:`Q-Q プロットで、点が左下では直線より下に、右上では直線より上に離れていた。データの分布について言えることはどれか？`,options:[`両側とも、正規分布より極端な値が出やすい`,`右に裾が長く、小さい側はあまり伸びていない`,`正規分布より、値が平均の近くに集まっている`,`左に裾が長く、大きい側はあまり伸びていない`],correctAnswer:0,explanation:`左下で直線より下＝小さい側の値が、正規分布で来るはずの値より遠くまで出ています。右上で直線より上＝大きい側も同じです。両側が遠くまで伸びる「両裾が重い」形です。右に裾が長いときは点が弓なりに並び、右上だけが大きく上へそります。`},{id:`tst1-4`,question:`1日の故障件数を100日分、0件・1件・2件・3件以上の4区分の度数表にまとめ、平均をデータから推定したポアソン分布に合うかを適合度検定したい。自由度はいくつか？`,options:[`4`,`3`,`2`,`1`],correctAnswer:2,explanation:`自由度は $k-1-p$ です。区分が $k=4$、度数の合計が100に決まっているので1つ減り、さらにポアソン分布の平均 $\\lambda$ をデータから $p=1$ 個推定したので1つ減ります。$4-1-1=2$ です。`},{id:`tst1-5`,question:`A の4人の作業時間が 5, 7, 8, 30 分、B の4人が 9, 10, 12, 13 分だった。8人を合わせて短い順に順位を付けたとき、A の順位の和 $W_A$ はいくつか？`,options:[`11`,`14`,`18`,`26`],correctAnswer:1,explanation:`短い順に 5(1位), 7(2位), 8(3位), 9, 10, 12, 13(4〜7位), 30(8位) です。A は1・2・3・8位で、$W_A = 1+2+3+8 = 14$ です。$U_A = 14 - 4 \\times 5/2 = 4$ で、30分の人が B の4人全員より遅い4組に当たります。30分が100分でも順位は8位のままです。`},{id:`tst1-6`,question:`勉強時間と点数の相関係数 $r = 0.45$ を得た。母相関が0かを両側5%で検定するとき、正しいものはどれか？`,options:[`人数によらず、$r$ が0.3を超えていれば棄却する`,`20人なら棄却し、10人なら棄却しない`,`10人なら棄却し、20人なら棄却しない`,`相関係数は人数で変わらないので、どちらも同じ結論になる`],correctAnswer:1,explanation:`$t = r\\sqrt{n-2}/\\sqrt{1-r^2}$ です。20人なら $t = 0.45\\sqrt{18}/\\sqrt{0.7975} = 2.14$ で、自由度18の境目2.10を超えて棄却します。10人なら $t = 1.43$ で、自由度8の境目2.31に届きません。同じ $r$ でも、人数が少ないと偶然の範囲に入ります。`},{id:`tst1-7`,question:`3つの店舗の待ち時間を比べたい。どの店にも極端に長い待ち時間が数件ある。分散分析の代わりに使う検定はどれか？`,options:[`ウィルコクソンの符号付き順位検定`,`フリードマン検定`,`マン・ホイットニーの $U$ 検定`,`クラスカル・ウォリス検定`],correctAnswer:3,explanation:`3群以上で対応が無いので、全員に順位を付けて群ごとの順位の平均の散らばりを見るクラスカル・ウォリス検定です。符号付き順位検定は対応のある2群、フリードマン検定は同じ人が全部の条件を試す3群以上、マン・ホイットニーの $U$ 検定は2群のための検定です。`},{id:`tst1-9`,question:`$x$ と $y$ が $y = x^3$ の関係にあり、同じ値は無い。このデータのスピアマンの順位相関係数 $r_s$ はいくつか？`,options:[`0`,`約0.9（直線ではないので1より小さい）`,`1`,`値が分からないので求められない`],correctAnswer:2,explanation:`$y = x^3$ では $x$ が大きいほど $y$ も必ず大きいので、$x$ の順位と $y$ の順位が完全に一致し、順位の差 $d_i$ はすべて0です。$r_s = 1 - 6 \\times 0/\\{n(n^2-1)\\} = 1$ です。順位しか見ないので、直線でなくても1になります。`},{id:`tst1-10`,question:`コインを10回投げて9回表が出た。表の確率0.5に対して片側検定するとき、正規近似ではなく二項分布で直接足したP値（正確検定）はいくつか？`,options:[`約0.001`,`約0.055`,`約0.10`,`約0.011`],correctAnswer:3,explanation:`9回以上になる確率を二項分布で足します。$P(X=9) = 10/1024$、$P(X=10) = 1/1024$ で、合わせて $11/1024 \\approx 0.011$ です。10回のような小さい $n$ では、正規近似より二項分布で直接計算する方が確かです。`},{id:`tst1-18`,question:`15個のデータでシャピロ・ウィルク検定をしたら、P値は0.40だった。正しい読み方はどれか？`,options:[`データが正規分布に従う確率が40%と分かった`,`正規分布でないとは言えないが、正規分布だとも言えない`,`15個でも十分なので、正規分布だと確かめられた`,`P値が0.05より大きいので、$t$ 検定は使えない`],correctAnswer:1,explanation:`帰無仮説は「正規分布に従う」で、棄却しないことは正規分布の証明になりません。15個では検出力が低く、正規分布でなくても棄却されにくいです。P値は仮説が正しい確率でもありません。Q-Q プロットの形とデータの性質と合わせて判断します。`},{id:`tst1-19`,question:`本文の作業時間の例（A：11〜16分の6人と60分の1人、B：17〜23分の7人）で、遅れた1人が60分ではなく25分だったらどうなるか？`,options:[`順位和検定の結論は同じで、$t$ 検定は差を見つけるようになる`,`$t$ 検定の結論は同じで、順位和検定は差を見つけるようになる`,`両方とも、差を見つけられなくなる`,`順位和検定は差を見つけられなくなり、$t$ 検定は変わらない`],correctAnswer:0,explanation:`25分でも60分でも、その人は14人の中で最後の14位なので、順位和検定の $U_A = 7$ もP値0.026も変わりません。$t$ 検定は、60分なら平均と標準偏差が大きく引き上げられてP値0.98でしたが、25分ならP値0.028で差を見つけます。`},{id:`tst1-20`,question:`並べ替え検定（順列検定）のP値の出し方として正しいものはどれか？`,options:[`グループのラベルを付け替えた全通りで統計量を計算し、実際より極端な割合を数える`,`データを復元抽出で何度も作り直して標準誤差を求め、正規分布の表と比べる`,`統計量を標準化して、$t$ 分布の表から棄却域を読む`,`各データを順位に置き換え、順位の平均を正規分布の表と比べる`],correctAnswer:0,explanation:`差が無ければ、どのデータがどちらのグループに入っても同じように起こりえます。分け方を全部（多いときは大量に無作為に）試して統計量の分布を作り、実際の値より極端なものの割合をP値にします。分布の仮定が要りません。復元抽出で作り直すのはブートストラップ法です。`}]},{id:`1.21-anova`,updatedAt:`2026-10-22`,title:`分散分析 (ANOVA)`,chapter:7,description:`3つ以上の群の平均を1回で比べる分散分析を、分散分析表・二元配置の交互作用・テューキー法・ブロック計画の数値例で学びます。`,content:`💡 **このモジュールで学ぶこと**

ラーメン屋で3種類のトッピングを10日ずつ試し、売上に差があるかを調べたいとします。[P値の解釈・検定の誤り](/stats-pre1/1.18-inference/)で見たとおり、2種類ずつ $t$ 検定を3回繰り返すと、本当は差が無くてもどこかで「差あり」が出る確率は約14%に膨らみます。3つ以上の群の平均を1回の検定で比べるのが**分散分析**です。読み終えると、次の3つができるようになります。

1. 全体のばらつきを群間と群内に分け、分散分析表を埋めて $F$ 検定ができる
2. 2つの要因を同時に調べ、主効果と交互作用をグラフと分散分析表から読み取れる
3. ブロックを使う実験計画が、なぜ同じ回数の実験で差を見つけやすくするかを数値で説明できる

---

### 1. 仕組み：ばらつきを「意味ある差」と「誤差」に分解する

**具体例**：ラーメン屋でトッピング（煮玉子・チャーシュー・メンマ）が売上に与える効果を検証します。各トッピングを10日間試したところ、日ごとの売上（万円）は以下のとおりでした。

[[anova-table]]

分散分析では全体の「ばらつき（変動）」を2つに分解します：

1. **群間変動**：トッピングの種類による「意味のある差」（3グループの平均 51・59・50 のばらつき）
2. **群内変動**：同じトッピングでも日によって違う「ランダムな誤差」

[[f-anova]]

$$F = \\frac{\\text{群間変動} \\div (k-1)}{\\text{群内変動} \\div (n-k)}$$

自由度（$k-1$、$n-k$）で割る理由：グループ数やデータ数が違っても公平に比較するため、「合計の変動」を「1自由度あたりの変動（平均平方）」に換算します。この比（群間の平均変動 ÷ 群内の平均変動）が大きいほど「グループの差 > ランダムな誤差」となり、本物の差がある証拠です（$k$ は群の数、$n$ は全データ数）。逆にトッピングで差が無ければ、群間の平均平方も群内と同じく日ごとの誤差の大きさを測るだけなので、F は1の近くになります。

#### 分散分析表にまとめる

この計算は、次の**分散分析表**にまとめると見通しがよくなります。上のトッピングの30日分で計算した値です。群間変動・群内変動は2乗の合計なので、**平方和**とも呼びます。

| | 群間 | 群内 | 全体 |
|---|---|---|---|
| 平方和 | 486.7 | 100.0 | 586.7 |
| 自由度 | 2 | 27 | 29 |
| 平均平方 | 243.3 | 3.70 | |
| $F$ | 65.7 | | |

上の行から順に、1つ前の行を使って次の行が出ます。教科書やソフトウェアの出力では、行と列を入れ替えて、要因（群間・群内・全体）を行に並べた形で書くのがふつうです。

- **平方和**：群間と群内を足すと全体になります（486.7 + 100.0 = 586.7）。全体の平方和は、30個の売上が全体平均 53.3 からどれだけ離れているかを2乗して足したものです
- **自由度**：群間は群の数 − 1 = 2、群内は全データ数 − 群の数 = 30 − 3 = 27 です。足すと全体の 30 − 1 = 29 になります
- **平均平方**：平方和 ÷ 自由度です（486.7 ÷ 2 = 243.3、100.0 ÷ 27 = 3.70）
- **$F$**：群間の平均平方 ÷ 群内の平均平方 = 243.3 ÷ 3.70 = 65.7 です

自由度 (2, 27) の $F$ 分布で、上側5%の点は約3.35です。65.7 はそれよりはるかに大きいので、「3つのトッピングで売上の平均は同じ」という仮説を退けます。表の一部が空欄でも、平方和の足し算と自由度の足し算から残りを埋められます。

🎯 **分散分析の前提条件**：各グループが**正規分布**に従い、グループ間で**分散が等しい（等分散性）**こと。

---

### 2. 二元配置：2つの要因と交互作用

売上はトッピングだけでなく、店の立地でも変わるかもしれません。トッピング（煮玉子・チャーシュー）と立地（オフィス街・住宅街）の2つの要因を同時に調べるのが**二元配置分散分析**です。第1節のように要因が1つなら**一元配置**と呼びます。

4つの組み合わせを、それぞれ3日ずつ試しました（説明のための模擬の数字）。

| | 煮玉子 | チャーシュー |
|---|---|---|
| オフィス街 | 48, 50, 52（平均50） | 58, 60, 62（平均60） |
| 住宅街 | 52, 54, 56（平均54） | 50, 52, 54（平均52） |

要因ごとに平均すると、トッピングは煮玉子52・チャーシュー56、立地はオフィス街55・住宅街53です。ここだけ見ると「チャーシューの方が4万円売れる」と言いたくなりますが、組み合わせごとの平均をグラフにすると話が変わります。

[[f-interaction]]

オフィス街ではチャーシューが10万円高いのに、住宅街では煮玉子の方が2万円高くなっています。一方の要因の効果が、もう一方の要因の水準によって変わることを**交互作用**と呼びます。それぞれの要因を単独で平均した効果は**主効果**です。

二元配置の分散分析表では、全体の平方和を4つに分けます。

| 要因 | 平方和 | 自由度 | $F$ |
|---|---|---|---|
| トッピング | 48 | 1 | 12.0 |
| 立地 | 12 | 1 | 3.0 |
| 交互作用 | 108 | 1 | 27.0 |
| 誤差 | 32 | 8 | |
| 全体 | 200 | 11 | |

- 誤差の平均平方は 32 ÷ 8 = 4。各要因の $F$ は、平方和 ÷ 自由度 ÷ 4
- 自由度 (1, 8) の $F$ 分布の上側5%点は 5.32。トッピング（P値 0.008）と交互作用（P値 0.0008）は有意で、立地（P値 0.12）は有意でない
- 交互作用の平方和は、組み合わせの平均と「全体平均＋トッピングの効果＋立地の効果」の差を2乗して足したもの。オフィス街のチャーシューなら、予想は 54＋2＋1＝57 万円で、実際の60万円との差3万円が交互作用の分

交互作用が有意なときは、主効果だけで結論しません。「チャーシューの方が売れる」はオフィス街でしか成り立たないので、立地ごとに分けてトッピングを比べます。

- 交互作用を調べるには、各組み合わせに2回以上のデータ（反復）が要る。1回ずつでは、交互作用と誤差を分けられない

---

### 3. 多重比較：どこが違うかを調べる

第1節の $F$ 検定で分かるのは「3つのトッピングのどこかに差がある」までです。どの組の間に差があるかを調べるのが**多重比較**です。全部の組を比べるときの定番が**テューキー法**で、次の幅（HSD）より平均の差が大きい組を「差あり」とします。

$$\\begin{aligned} \\text{HSD} &= q \\sqrt{\\frac{\\text{群内の平均平方}}{\\text{各群の個数}}} \\\\ &= 3.51 \\times \\sqrt{\\frac{3.70}{10}} = 2.13 \\end{aligned}$$

$q = 3.51$ は、群の数3・誤差の自由度27のときの**スチューデント化された範囲**の上側5%点です。差が無いときに「3つの平均のうち最大と最小の差」がどこまで広がるかから決まるので、3組を同時に比べても、どれか1組を誤って「差あり」とする確率が5%に収まります。

| 組 | 平均の差 | 2.13 と比べると |
|---|---|---|
| チャーシューと煮玉子 | 8 | 差あり |
| チャーシューとメンマ | 9 | 差あり |
| 煮玉子とメンマ | 1 | 差があるとは言えない |

平均は チャーシュー 59・煮玉子 51・メンマ 50 です。チャーシューだけが他の2つより売れ、煮玉子とメンマの差は誤差の範囲です。

- **ボンフェローニ法**：有意水準を比べる回数で割る（3組なら 0.05 ÷ 3）。どんな比べ方にも使えるが、テューキー法より差を見つけにくい
- **ダネット法**：対照群（たとえば今のトッピング）とほかの群だけを比べるときに使う。比べる組が少ない分、全部の組を比べるより差を見つけやすい

---

### 4. 実験計画法：誤差を小さくする計画

分散分析で差を見つけやすくするには、データを集める前の計画が効きます。その土台が、フィッシャーが示した**実験計画の3原則**です。

📖 **フィッシャーの3原則**
- **反復**（replication）：同じ条件で複数回測定します。反復があるから、群内のばらつき（誤差の大きさ）を見積もれます。1回ずつしか測っていないと、差が処理の効果か誤差かを区別できません。
- **無作為化**（randomization）：処理をどの実験単位に割り当てるかを、くじ引きのように偶然で決めます。割り当てを人が選ぶと、無意識に条件のよい畑へ新しい肥料を回すなど、系統的な偏りが入ります。無作為化は、測っていない要因も平均的に各群へ均等に散らします。
- **局所管理**（local control）：実験の場を、似た条件のまとまり（ブロック）に分け、ブロックの中で処理を比べます。ブロック間の違いを誤差から取り除けるので、同じ反復数でも検出力が上がります。

反復は誤差の大きさを見積もり、無作為化は偏りを取り除き、局所管理は誤差そのものを小さくします。

🎯 **つまずきやすい点**：「反復」と「繰り返し測定」は別物です。反復は独立な実験単位を増やすことで、同じ個体を何度も測るだけでは、誤差の見積もりは正しくなりません。

#### ブロック計画：畑の違いを誤差から取り除く

3種類の肥料 A・B・C の収量（kg）を比べます。使える畑は4枚で、畑によって土の良さがかなり違います。そこで各畑を3区画に分け、畑ごとに3つの肥料をくじで区画に割り当てました。似た条件のまとまり（ここでは畑）を**ブロック**と呼び、1つのブロックに全部の処理を1つずつ無作為に置く計画を**乱塊法**と呼びます（説明のための模擬の数字）。

| | A | B | C |
|---|---|---|---|
| 畑1 | 20 | 23 | 23 |
| 畑2 | 26 | 27 | 29 |
| 畑3 | 27 | 30 | 33 |
| 畑4 | 31 | 34 | 35 |
| 平均 | 26.0 | 28.5 | 30.0 |

畑の平均は 22.0・27.3・30.0・33.3 で、肥料の差（最大4kg）よりずっと大きく違います。同じ12個のデータを2通りに分析すると、結論が変わります。

| 分析 | 肥料の $F$ | P値 |
|---|---|---|
| 畑を無視した一元配置 | 0.70 | 0.52 |
| 畑をブロックにした二元配置 | 21.0 | 0.002 |

- 平方和は、肥料 32.7・畑 206.3・誤差 4.7 で、合わせて 243.7
- 一元配置では、畑の違い 206.3 が誤差に混ざる。誤差の平均平方は (206.3＋4.7) ÷ 9 = 23.4 で、肥料の平均平方 32.7 ÷ 2 = 16.3 はこれに埋もれる
- ブロックにすると畑の分を取り除ける。誤差の平均平方は 4.7 ÷ 6 = 0.78 になり、$F$ = 16.3 ÷ 0.78 = 21.0
- 誤差の自由度は 9 から 6 に減る（畑の分に3つ使う）。それでも誤差が大きく減れば、差は見つけやすくなる

ブロック計画には、ブロックの大きさで2つの型があります。

- **完備型**：1つのブロックに全部の処理が入る。上の乱塊法がこれ
- **不完備型**：1つのブロックに全部の処理は入らず、たとえば1日に2種類しか試食できないとき、3種類 A・B・C を {A, B}・{A, C}・{B, C} の3日に分ける。どの2つの処理も同じ回数ずつ同じブロックに入るように組んだものを、**釣合い型不完備ブロック計画**と呼ぶ

#### 因子が多いとき：一部実施要因計画と直交配列

2水準の因子が $k$ 個あると、全部の組み合わせは $2^k$ 通りで、$k = 10$ なら1024回の実験になります。**一部実施要因計画**は、高次の交互作用（3つ以上の因子の組み合わせの効果）は小さいと考えて調べるのをやめ、実験を $2^{k-p}$ 回に減らす計画です。

**直交配列**は、どの2つの因子を取り出しても、水準の組み合わせが同じ回数ずつ現れるように作った実験の表です。$L_8$ は8回の実験で2水準の因子を最大7個まで割り付けられる表で、$L_n$ の $n$ は実験の回数を表します。品質工学（タグチメソッド）でよく使われます。`,keyFormulas:[{label:`F 統計量（一元配置）`,formula:`F = \\dfrac{\\text{群間変動}/(k-1)}{\\text{群内変動}/(n-k)} \\sim F(k-1,\\,n-k)`},{label:`平方和の分解（二元配置）`,formula:`S_T = S_A + S_B + S_{A \\times B} + S_E`},{label:`テューキー法の幅（r は各群の個数）`,formula:`\\text{HSD} = q_{0.05}(k,\\,n-k)\\sqrt{\\frac{MS_E}{r}}`},{label:`乱塊法の自由度（処理 t・ブロック b）`,formula:`\\begin{aligned} &\\text{処理 } t-1,\\ \\ \\text{ブロック } b-1 \\\\ &\\text{誤差 } (t-1)(b-1) \\end{aligned}`}],quiz:[{id:`a1-1`,question:`一元配置分散分析で、群の数が4、全データが20個、群間平方和が60、群内平方和が48だった。$F$ の値はいくつか？`,options:[`1.25`,`6.67`,`5.00`,`20.0`],correctAnswer:1,explanation:`群間の自由度は $4-1=3$、群内の自由度は $20-4=16$ です。平均平方は群間 $60 \\div 3 = 20$、群内 $48 \\div 16 = 3$ で、$F = 20 \\div 3 = 6.67$ です。平方和どうしの比 $60/48 = 1.25$ ではなく、自由度で割った平均平方どうしの比をとります。`},{id:`a1-2`,question:`2つの要因 A・B の組み合わせごとの平均が、A1B1 = 10、A1B2 = 14、A2B1 = 12、A2B2 = 16 だった。正しいものはどれか？`,options:[`A の主効果は無い`,`B の主効果は無い`,`交互作用は無い`,`交互作用があり、B2 で A の差が大きい`],correctAnswer:2,explanation:`A2 と A1 の差は、B1 でも B2 でも $12-10 = 16-14 = 2$ で同じです。交互作用プロットでは2本の線が平行になり、交互作用はありません。A の効果（2）と B の効果（4）はどちらもあり、主効果は両方とも0ではありません。`},{id:`a1-3`,question:`本文の二元配置の例（トッピング×立地）で、交互作用が有意だった。結論の出し方として適切なものはどれか？`,options:[`トッピングの主効果が有意なので「チャーシューがよく売れる」とまとめる`,`立地の主効果は有意でないので、立地は無視して比べる`,`交互作用を誤差に入れ、一元配置で計算し直す`,`立地ごとに分けて、トッピングの売上を比べる`],correctAnswer:3,explanation:`交互作用が有意なら、トッピングの効果は立地によって違います。オフィス街ではチャーシューが10万円高く、住宅街では煮玉子が2万円高いので、主効果の「チャーシューが4万円高い」はどちらの立地にも当てはまりません。立地ごとに分けて比べます。`},{id:`a1-4`,question:`テューキー法の幅 HSD が 2.13 で、3群の平均が 59・51・50 だった。「差あり」となる組はいくつか？`,options:[`0組`,`1組`,`2組`,`3組`],correctAnswer:2,explanation:`平均の差は $59-51=8$、$59-50=9$、$51-50=1$ です。2.13 を超えるのは最初の2組だけなので、2組です。59 の群だけが他の2つと違い、51 と 50 の差は誤差の範囲です。`},{id:`a1-5`,question:`分散分析の結果、「差がある」と分かった後に具体的にどこに差があるか調べる手法は？`,options:[`多重比較`,`ロジスティック回帰`,`判別分析`,`主成分分析`],correctAnswer:0,explanation:`多重比較検定はANOVAで有意差が示された後、「どの群間に差があるか」を特定します。テューキー法（HSD）：等標本の全ペア比較に最適、ボンフェローニ法：保守的だが汎用的、ダネット法：対照群との比較専用。検定の多重性を補正しつつペア比較するため、単純な $t$ 検定よりも第1種の過誤率が制御されます。`},{id:`a1-6`,question:`一元配置分散分析において、自由度が (2, 27) のとき、群の数はいくつか？`,options:[`2`,`3`,`27`,`30`],correctAnswer:1,explanation:`一元配置ANOVAのF統計量の自由度は（群間自由度 $k-1$、群内自由度 $n-k$）です。自由度 $(2, 27)$ は $k-1=2$（群数 $k=3$）、$n-k=27$（全 $n=30$ 個、3群）を意味します。F表やソフトウェアでこの自由度に対応する臨界値と統計量を比較して有意性を判断します。`},{id:`a1-7`,question:`本文の乱塊法の例で、畑を無視して一元配置で分析すると、肥料の $F$ が 21.0 から 0.70 に下がった。主な理由はどれか？`,options:[`畑を無視すると、肥料どうしの平均の差が小さく計算されるから`,`畑の違いが誤差に混ざり、誤差の平均平方が大きくなったから`,`誤差の自由度が増え、$F$ 分布の境目が上がったから`,`畑ごとに肥料の順位が入れ替わっているから`],correctAnswer:1,explanation:`肥料の平方和 32.7 は、どちらの分析でも同じです。一元配置では畑の違い 206.3 が誤差に入り、誤差の平均平方が 0.78 から 23.4 に増えるので $F$ が小さくなります。誤差の自由度は 6 から 9 に増え、境目はむしろ下がります（5.14 から 4.26）。`},{id:`a1-8`,question:`分散分析の前提として必要な条件は？`,options:[`独立性のみ`,`データが正であること`,`各群が同じ分布であること`,`正規性と等分散性`],correctAnswer:3,explanation:`ANOVAの前提条件は①正規性（各群のデータが正規分布に従う）②等分散性（群間で $\\sigma^2$ が等しい）③独立性（観測値が互いに独立）です。正規性の違反には頑健ですが、等分散性違反（ルビーン検定で確認）や外れ値には注意が必要です。前提が満たされない場合はクラスカル・ウォリス検定（ノンパラ版）を検討します。`},{id:`a1-9`,question:`要因の効果がないとき、F統計量の値はいくつに近くなるか？`,options:[`1`,`10`,`無限大`,`0`],correctAnswer:0,explanation:`帰無仮説（全群の母平均が等しい）が正しいとき、群間変動は「偶然のばらつき」だけで群内変動と同じ $\\sigma^2$ を推定します。そのため $F = MS_{\\text{群間}}/MS_{\\text{群内}} \\approx \\sigma^2/\\sigma^2 = 1$ に近づきます。実際の効果（群間差）があると $MS_{\\text{群間}}$ が $\\sigma^2$ よりも大きくなり、F値が1より大きくなります。`},{id:`a1-10`,question:`乱塊法（RCBD）でブロックを設ける主な目的はどれか？`,options:[`ブロック間の差を誤差から取り除き、処理の差を見つけやすくするため`,`ブロックの数だけ実験回数を増やし、誤差の自由度を大きくするため`,`処理の割り当てを無作為にして、系統的な偏りを取り除くため`,`ブロックと処理の交互作用を調べ、組み合わせの効果を見つけるため`],correctAnswer:0,explanation:`畑や日程のように結果を大きく変える条件をブロックにまとめると、ブロック間の差を誤差から分けて取り除けます。誤差の平均平方が小さくなるので、同じ回数の実験でも処理の差を見つけやすくなります。割り当てを無作為にするのは無作為化の役目で、ブロックの中でも無作為化は行います。`}]},{id:`2.1-regression`,updatedAt:`2026-10-26`,title:`重回帰分析とモデル評価`,chapter:8,description:`偏回帰係数の読み方と最小二乗法、決定係数と AIC による変数選択、多重共線性や不等分散の診断と対処を、カフェの売上の例で学びます。`,content:`💡 **このモジュールで学ぶこと**

「売上を増やしたい。どの要因が最も効いているか？」これを数式で答えるのが重回帰分析です。読み終えると、次の3つができるようになります。

1. 重回帰の係数を「ほかの変数をそろえたときの差」として読み、最小二乗法の式で求め方を説明できる
2. 決定係数、自由度調整済み決定係数、AIC でモデルを比べ、変数を選べる
3. 多重共線性や誤差の分散の違いなど、前提が崩れたときに気づいて対処できる

💡 **「天気予報式」の予測方程式**

天気予報では「気温・湿度・気圧・風向き」といった複数の要因を組み合わせて「明日の降水確率」を算出します。これと同じ発想が**重回帰分析**です。

- **単回帰**：「気温だけ」で売上を予測する（1つの要因）
- **重回帰**：「気温＋曜日＋イベントの有無」で売上を予測する（複数の要因）

出発点となる単回帰そのもの（最小二乗法・決定係数・回帰直線が平均点を通ること）は、[統計検定2級の「回帰分析」](/stats-g2/5.1-regression/) で扱っています。

現実の現象は複数の要因が絡み合っています。それらを一本の方程式にまとめ、「どの要因がどれくらい貢献しているか」を定量化するのが、この章の目的です。

---

### 1. 重回帰モデル：予測の方程式

カフェの1日の売上（万円）を例に考えます。データに当てはめた結果が次の式だったとします。

$$\\hat{y} = 15 + 0.3 \\times \\text{気温} + 3.5 \\times \\text{週末} + 2.1 \\times \\text{イベント}$$

「気温が1度上がるごとに売上が0.3万円増加、週末は平日より3.5万円多い、近くでイベントがあると2.1万円上乗せ」このように各要因の「効果の大きさ」が $\\beta$ 係数として読み取れます。

ここで大事なのは、0.3 が「**週末かどうかとイベントの有無が同じ日どうしで比べたとき**の、気温1度あたりの差」だという点です。これを**偏回帰係数**と呼びます。暑い日に週末が多いデータで気温だけの単回帰をすると、週末の効果まで気温の係数に入り込み、0.3 より大きく出ます。ほかの変数を式に入れると、その分を取り除いた効果が読めます。

一般式は：

$$y = \\beta_0 + \\beta_1 X_1 + \\beta_2 X_2 + \\cdots + \\beta_k X_k + \\varepsilon$$

**最小二乗法（OLS）** を使って「実際のデータ」と「方程式の予測」のズレ（残差）の二乗和を最小化する $\\beta$ を求めます。データを行列にまとめ、$n$ 日分の売上を縦に並べたものを $\\mathbf{y}$、各日の説明変数（先頭に切片用の1）を行に並べたものを $X$ とすると、答えは1本の式で書けます。

$$\\hat{\\boldsymbol{\\beta}} = (X^{\\top}X)^{-1}X^{\\top}\\mathbf{y}$$

残差の二乗和を各係数で微分して0と置いた連立方程式（正規方程式 $X^{\\top}X\\boldsymbol{\\beta} = X^{\\top}\\mathbf{y}$）を解いたものです。説明変数どうしがほぼ同じ動きをすると $X^{\\top}X$ の逆行列が不安定になり、これが第3節の多重共線性です。

📖 **ガウス＝マルコフの仮定：推定量が「最良」であるために**

一般式の $\\varepsilon$（イプシロン）は**誤差項**と呼ばれます。方程式で説明しきれなかった「偶然のズレ」の受け皿です。例えば「気温・曜日・イベント」で売上の90%は説明できても、残り10%は「たまたまその日に近くで工事していた」など偶発的な要因によるもので、これを $\\varepsilon$ で表します。

最小二乗法の推定量が、線形で偏りのない推定量の中で分散が最小になるには、誤差項について次の3つが要ります。

1. 期待値が0（$E[\\varepsilon_i] = 0$）：系統的なずれが無い
2. 分散がどのデータでも同じ（$V[\\varepsilon_i] = \\sigma^2$）：第5節はこれが崩れた場合
3. 誤差どうしが無相関：時系列で前日のずれが翌日に残ると崩れる（第3節のダービン・ワトソン比で調べる）

正規分布であることは要りません。正規性は、係数の t 検定や区間を正確に出すときに使う追加の仮定です。この仮定が満たされるとき、OLS推定量は**最良線形不偏推定量（BLUE: Best Linear Unbiased Estimator）**になることを**ガウス＝マルコフの定理**が保証します。

---

### 2. モデルの評価：その方程式、信じて大丈夫？

変数を増やせば増やすほど、手元のデータへの「無理なこじつけ（過学習）」が起きてしまいます。

同じ10点に、複雑さの違う3つの式を当てはめて比べます。注目するのは、当てはめに使ったデータでの誤差と、使っていない別のデータでの誤差の差です。
[[f-overfit]]

複雑な式ほど手元のデータにはぴったり当てはまりますが、新しいデータでは大きく外れます。これが「過学習」です。AIC はパラメータ数に罰則を足すことで、この外れやすさを手元のデータだけから見積もる指標です。では、モデルを選んだ後に「本当に信頼できるか」をどう確かめるのでしょう？

**交差妥当化（Cross Validation）**は「訓練データだけで評価すると過学習を見逃す」問題を解決する手法です。$k$-分割交差妥当化（$k$-fold CV）ではデータを $k$ 個に分け、「$k-1$ 個で学習・残り1個でテスト」を $k$ 回繰り返して平均テスト誤差を汎化性能の推定値とします。「既に見たデータ」で評価すれば誰でも良いスコアを出せますが、**「見ていないデータ」で評価することが本当の性能を測る鍵**です。

**決定係数 $R^2$**（coefficient of determination）：「目的変数のばらつきのうち、モデルで説明できた割合」です。

$$R^2 = 1 - \\frac{\\text{残差の二乗和（説明できなかった部分）}}{\\text{全体の変動（総二乗和）}}$$

$R^2 = 1$ に近いほど当てはまりが良く、0 に近いほど説明力が低いです。ただし変数を増やすと $R^2$ は**必ず増大**するという落とし穴があります。

- **自由度調整済み決定係数 $\\bar{R}^2$**：変数の数 $k$ とサンプルサイズ $n$ で補正し、「増やした変数が本当に貢献しているか」を反映します。$\\bar{R}^2 = 1-(1-R^2)\\frac{n-1}{n-k-1}$。無駄な変数を加えると下がることがあります
- **AIC（赤池情報量規準）** $= -2\\log L + 2k$（$L$：最大尤度、$k$：パラメータ数）：当てはまりの良さ（$-2\\log L$）とパラメータ数の少なさ（$2k$ のペナルティ）のバランスを測る。変数を増やすと $-2\\log L$ は下がるが $2k$ が増えるため、本当に必要な変数だけが選ばれる。低いほど良い

🎯 **使いどころ**：$R^2$ は変数を増やすと必ず増大するため、準1級では**自由度調整済み決定係数 $\\bar{R}^2$**や**AIC**でモデルを比較します。

---

### 3. 回帰診断：見えない落とし穴を検出する

モデルに問題がないかを確認する「診断作業」も重要です。

- **多重共線性**：説明変数同士が「似た者同士（強い相関）」だと係数が不安定になります。**VIF（Variance Inflation Factor: 分散拡大係数）** が 10 を超えたら要注意。$\\text{VIF}_j = 1/(1-R_j^2)$ で、$R_j^2$ は変数 $j$ をほかの説明変数で回帰したときの決定係数です。たとえば気温を湿度と季節で $R_j^2 = 0.9$ まで説明できるなら VIF は 10 で、気温の係数の分散が相関の無い場合の10倍（標準誤差は約3.2倍）に膨らみます
- **leverage（てこ比）**：各データ点が「説明変数空間でどれだけ外れた位置にあるか」を表す指標。leverage が高い点は回帰直線を引っ張る力が強い（ハット行列 $H = X(X^\\top X)^{-1}X^\\top$ の対角成分 $h_{ii}$ で定義）
- **クックの距離**：「leverage が高く（説明変数の外れ値）かつ残差が大きい（目的変数の外れ値）」点を影響力の高い点として検出する指標。クックの距離 $\\geq 1$（または $4/n$）の点は特に要調査
- **ダービン・ワトソン比（DW比）**：「残差（予測とのズレ）に時間的なつながりがないか」を調べる指標。値が **2 に近い**ほど問題なし、0や4に近いほど「連続するデータが互いに影響し合っている（自己相関あり）」のサイン
- **ブートストラップ法**：手元のデータを繰り返し再抽出して標準誤差を計算機的に求める手法。分布の仮定が困難なときに有効

📖 **Box-Cox 変換：残差の形を整えるとき**
残差の分散が予測値とともに大きくなる、残差が右に裾を引く、といった仮定違反があるとき、目的変数 $y$（正の値）を次の形で変換すると改善することがあります。

$$y^{(l)} = \\begin{cases} \\dfrac{y^{l}-1}{l} & (l \\neq 0) \\\\ \\log y & (l = 0) \\end{cases}$$

- $l=1$ は変換なし（定数を引いただけ）、$l=0$ は対数変換、$l=1/2$ は平方根変換に相当します。
- $l$ は最尤法で選びます。変換後の残差が最も正規分布に近く、等分散になる $l$ を探す考え方です。
- 変換したスケールで推定した係数は、元の単位に戻すと解釈が変わります。予測値は逆変換して使います。

🎯 **つまずきやすい点**：Box-Cox 変換は $y>0$ が前提です。0や負の値を含むときは、定数を足してから使うか、別の変換を検討します。

📖 **正則化回帰：変数が多すぎるとき**
- **Lasso回帰（L1正則化）**：不要な変数の係数を「完全に0」にして自動選択。L1の制約領域がひし形（角が尖っている）のため、最適解が角（係数＝0の点）に来やすい
- **Ridge回帰（L2正則化）**：係数が極端な値をとるのを抑えてモデルを安定化。L2の制約領域は球形で角がないため係数はゼロに近づくが完全には0にならない

**Ridge 回帰の中身（L2正則化の拡充）**：残差平方和に係数の2乗和の罰則を足した量を最小にします。

$$\\hat{\\boldsymbol{\\beta}}_{\\text{ridge}} = \\arg\\min_{\\beta} \\left[ \\sum_{i}(y_i - \\boldsymbol{x}_i^{\\top}\\beta)^2 + \\lambda \\sum_{j=1}^{p} \\beta_j^2 \\right]$$

解は閉じた形で書けます。

$$\\hat{\\boldsymbol{\\beta}}_{\\text{ridge}} = (X^{\\top}X + \\lambda I)^{-1}X^{\\top}y$$

- $\\lambda=0$ なら通常の最小2乗法に一致し、$\\lambda$ を大きくするほど係数は0に向かって縮みます。
- 説明変数どうしの相関が高く $X^{\\top}X$ が特異に近いとき、最小2乗法の逆行列は不安定ですが、$\\lambda I$ を足すと安定します。多重共線性への対策として使われる理由です。
- 罰則は係数の大きさに課すので、説明変数は標準化してから使います。切片は罰則に含めません。
- $\\lambda$ はバイアスとバリアンスのバランスを決めます。大きいほどバイアスが増え、バリアンスが減ります。通常は交差検証で選びます（1.23 参照）。

---

### 4. どの変数を入れるか：変数選択

候補の説明変数が多いとき、どれをモデルに入れるかを決める作業が**変数選択**です。全部入れると $R^2$ は必ず上がりますが、効いていない変数は係数の推定を不安定にし、新しいデータでの予測を悪くします。

すべての組み合わせ（候補が $p$ 個なら $2^p$ 通り）を比べる**総当たり法**が確実ですが、$p$ が大きいと数が増えすぎます。そこで、1つずつ足したり外したりする方法を使います。

- **変数増加法**：変数なしから始め、AIC が最も下がる変数を1つずつ足す。どれを足しても下がらなくなったら止める
- **変数減少法**：全部入りから始め、外すと AIC が最も下がる変数を1つずつ外す
- **ステップワイズ法**：各段で、足すことと外すことの両方を試す

カフェ30日分の模擬データで、候補4つ（気温、週末、イベント、湿度）に変数増加法を当てはめます。湿度は売上に関係しないように作ってあります。ここでの AIC は、正規分布の回帰で使う $n\\log(\\text{残差平方和}/n) + 2 \\times (\\text{係数の数})$ です（$-2\\log L + 2k$ と定数だけ違い、大小の比べ方は同じです）。

| 段 | 足す候補ごとの AIC | 選ぶ |
|---|---|---|
| 0 | 変数なしで 68.7 | 出発点 |
| 1 | 気温 56.4、週末 58.8、イベント 58.8、湿度 70.4 | 気温 |
| 2 | 週末 38.6、イベント 52.3、湿度 58.4 | 週末 |
| 3 | イベント 35.2、湿度 40.6 | イベント |
| 4 | 湿度 36.7（今の 35.2 より大きい） | 止める |

湿度を足すと、$R^2$ は 0.731 から 0.736 に上がります。一方で AIC は 35.2 から 36.7 に、自由度調整済み決定係数は 0.700 から 0.693 に下がります。上がった $R^2$ は、手元の30日の偶然に合わせた分だからです。

- 1つずつ選ぶ方法は、最良の組み合わせを見つける保証がありません。選んだあとの係数のP値は、選ぶ過程を考えに入れないぶん小さく出がちです
- AIC の代わりに、罰則の重い BIC（$2k$ を $k\\log n$ に替えたもの）を使うと、変数は少なめに選ばれます（[モデル選択](/stats-pre1/1.23-model-selection/)）
- 上の Lasso 回帰は、係数を0にすることで、選択と推定を一度に行います

---

### 5. 誤差のばらつきがそろわないとき：一般化最小二乗法

ガウス＝マルコフの定理は、誤差の分散がどのデータでも同じで、誤差どうしが無相関であることを前提にしています。店の広さと売上のように、大きい店ほど売上の振れ幅も大きいと、この前提が崩れます。

[[f-wls]]

最小二乗法は、どの点のズレも同じ重みで数えます。振れ幅の大きい点のズレは偶然の部分が多いのに、ほかの点と同じだけ直線を引っ張ります。そこで、残差の2乗に誤差分散の逆数 $w_i = 1/\\sigma_i^2$ の重みをかけてから和を最小にします。これが**重み付き最小二乗法**（WLS）です。

$$\\min_{\\beta}\\ \\sum_i w_i\\,(y_i - \\boldsymbol{x}_i^{\\top}\\beta)^2$$

誤差どうしに相関がある場合（時系列で前日の誤差が翌日に残るなど）も含めて、誤差の分散共分散行列を $\\Sigma$ と書くと、推定量は次の形になります。これが**一般化最小二乗推定量**（GLS）です。

$$\\hat{\\beta}_{\\text{GLS}} = (X^{\\top}\\Sigma^{-1}X)^{-1}X^{\\top}\\Sigma^{-1}y$$

- $\\Sigma = \\sigma^2 I$（分散が同じで相関なし）なら、通常の最小二乗推定量 $(X^{\\top}X)^{-1}X^{\\top}y$ に戻ります。$\\Sigma$ が対角行列なら重み付き最小二乗法です
- 考え方は、データを変換して前提を満たす形に直してから最小二乗法を使う、というものです。WLS なら各行（$y_i$ と $\\boldsymbol{x}_i$）を $\\sigma_i$ で割ると、誤差の分散がそろいます
- $\\Sigma$ が分かっていれば、GLS 推定量は線形不偏推定量の中で分散が最小になります（ガウス＝マルコフの定理を広げたもの）。実際には $\\Sigma$ を残差から推定して使います

図と同じ条件でデータを5000回作り直して傾きを推定すると、平均はどちらも真の値 0.5 でした。ばらつき（標準偏差）は、最小二乗法が 0.031、重み付き最小二乗法が 0.020 です。どちらにも偏りはなく、違うのは精度です。最小二乗法で同じ精度を得るには、約2.4倍のデータが要ります。`,keyFormulas:[{label:`重回帰モデル`,formula:`\\hat{y} = \\beta_0 + \\beta_1 X_1 + \\cdots + \\beta_k X_k + \\varepsilon`},{label:`OLS 推定量（行列形）`,formula:`\\hat{\\boldsymbol{\\beta}} = (X^TX)^{-1}X^T\\mathbf{y}`},{label:`VIF（分散拡大係数）`,formula:`\\text{VIF}_j = \\frac{1}{1-R_j^2}`}],interactiveType:`overfit`,quiz:[{id:`r1-1`,question:`モデルの適合度と、パラメータ数の少なさを同時に評価する代表的な指標は？`,options:[`$t$ 値`,`相関係数`,`寄与率`,`AIC`],correctAnswer:3,explanation:`AIC（赤池情報量規準）$= -2\\log L + 2k$（$L$：最大尤度、$k$：パラメータ数）は「当てはまりの良さ」と「パラメータ数の少なさ（シンプルさ）」を同時に評価します。変数を増やすと $-2\\log L$ は必ず下がりますが $2k$ が増えるため、本当に必要な変数だけが選ばれます。AICが小さいモデルほど良いとされます。`},{id:`r1-2`,question:`VIF（分散拡大係数）がいくらを超えると、多重共線性が疑われるか？`,options:[`10`,`100`,`1`,`2`],correctAnswer:0,explanation:`VIF（Variance Inflation Factor）$= 1/(1-R_j^2)$ は「説明変数 $j$ が他の説明変数でどれだけ説明できるか」を表します。$R_j^2$ が高い（説明変数間の相関が強い）ほど VIF が大きくなります。VIF $\\geq 10$ は「その変数の標準誤差が多重共線性がない場合の $\\sqrt{10} \\approx 3.2$ 倍以上に膨らんでいる」ことを意味し、係数推定が不安定になるサインです。`},{id:`r1-3`,question:`不要な変数の回帰係数を完全に 0 にし、自動的に変数選択を行ってくれる手法は？`,options:[`Ridge回帰`,`Lasso回帰`,`最小二乗法`,`モーメント法`],correctAnswer:1,explanation:`Lasso回帰はL1正則化（係数の絶対値の和にペナルティ）を使います。L1ノルムの形状から、最適解が「軸上（係数＝0）」に来やすく、不要な変数の係数が厳密に0になる変数選択の性質を持ちます。Ridge回帰（L2正則化）は係数をゼロに近づけますが、完全に0にはなりません。`},{id:`r1-4`,question:`モデルを「訓練用」と「テスト用」に分けるなどして、汎化性能を客観的に測る手法は？`,options:[`最尤法`,`変数変換`,`交差妥当化`,`ブートストラップ`],correctAnswer:2,explanation:`交差妥当化（Cross Validation）は「訓練データだけで評価すると過学習を見逃す」問題を解決します。$k$-分割交差妥当化では、データを $k$ 個に分けて「$k-1$ 個で学習・残り1個でテスト」を $k$ 回繰り返し、平均テスト誤差を汎化性能の推定値とします。「既に見たデータ」で評価すれば誰でも良いスコアを出せますが、「見ていないデータ」で評価することが重要です。`},{id:`r1-5`,question:`外れ値が回帰モデルに与える影響力を測るための指標は？`,options:[`ダービン・ワトソン比`,`AIC`,`VIF`,`クックの距離`],correctAnswer:3,explanation:`クックの距離（Cook's Distance）は「$i$ 番目のデータを除外したとき、回帰係数の推定値がどれだけ変わるか」を測ります。leverage（てこ比）が高い点（説明変数空間で外れた点）かつ残差が大きい点が影響力の高い点です。クックの距離が1以上（または $4/n$ 以上）の点は特に調査が必要です。`},{id:`r1-6`,question:`決定係数 $R^2$ についての正しい説明はどれか？`,options:[`変数を増やすと必ず増大する`,`負の値しかとらない`,`計算ができない`,`常に 0 である`],correctAnswer:0,explanation:`$R^2 = 1 - SS_{res}/SS_{tot}$ は変数を増やすだけで必ず増加（または不変）します。役に立たない変数を加えても $R^2$ は下がらないからです。これが過学習を招く原因です。自由度調整済み $\\bar{R}^2 = 1-(1-R^2)\\frac{n-1}{n-k-1}$ はパラメータ数でペナルティを与えるため、不要な変数を加えると下がります。準1級では $\\bar{R}^2$ やAICを重視します。`},{id:`r1-7`,question:`Lasso回帰が用いるペナルティの形状（ノルム）は？`,options:[`0ノルム`,`L1ノルム`,`L2ノルム`,`L∞ノルム`],correctAnswer:1,explanation:`L1ノルム（$\\sum |\\beta_j|$）の制約領域はひし形（角が尖っている）のため、最適解が「角の点（係数＝0）」に来やすい性質があります。一方、Ridge（L2ノルム: $\\sum \\beta_j^2$）の制約領域は球形で角がないため、係数はゼロに近づくものの厳密に0にはなりません。この幾何学的な違いが変数選択の有無を生みます。`},{id:`r1-8`,question:`説明変数が $k$ 個あるカテゴリカルデータ（ダミー変数）を作る際、必要な変数の数は？`,options:[`$2k$`,`$k$`,`$k-1$`,`$k+1$`],correctAnswer:2,explanation:`例えば「血液型（A/B/O/AB）」を4つのダミー変数 $d_A, d_B, d_O, d_{AB}$ で全部作ると $d_A+d_B+d_O+d_{AB}=1$ が常に成立し、他の説明変数と完全な多重共線性が生じます。そのため1カテゴリを「基準」にして除外し、$k-1=3$ 個のダミー変数を使います。係数は「基準カテゴリとの差」として解釈します。`},{id:`r1-9`,question:`最小二乗推定量が「最良線形不偏推定量(BLUE)」であることを保証する定理は？`,options:[`大数の法則`,`ベイズの定理`,`中心極限定理`,`ガウス・マルコフの定理`],correctAnswer:3,explanation:`ガウス・マルコフの定理は「誤差が独立・等分散・期待値0という条件のもとで、最小二乗推定量（OLS）は線形不偏推定量の中で分散が最小（BLUE）」であることを保証します。正規性の仮定は不要です。ただし「線形不偏の中で」という制限があり、非線形推定量（リッジ回帰など）と比較するわけではありません。`},{id:`r1-10`,question:`再抽出（サンプリング）を繰り返して推定値の標準誤差を求めるシミュレーション手法は？`,options:[`最尤法`,`ブートストラップ法`,`主成分分析`,`因子分析`],correctAnswer:1,explanation:`ブートストラップ法は「元のデータから復元抽出で同サイズの標本を作る操作」を1000回以上繰り返し、推定量の分布を近似します。中央値・相関係数の変換など解析的な標準誤差の式が複雑な統計量でも標準誤差や信頼区間を計算できます。正規性の仮定も不要なため、小標本や非正規データに特に有効です。`}]},{id:`2.6-glm`,updatedAt:`2026-10-17`,title:`ロジスティック回帰と一般化線形モデル`,chapter:8,description:`「Yes/No」のデータを分析するロジスティック回帰とGLMの枠組みを学びます。`,content:`💡 **このモジュールで学ぶこと**

「新薬を投与すると完治するか（Yes/No）を予測したい」目的変数が連続値でなく「0か1か」の二値のとき、通常の回帰では確率が0〜1の範囲を超えてしまいます。このモジュールでは二値・カウント・その他の非正規データへの回帰を可能にする**ロジスティック回帰**と**一般化線形モデル**（GLM）を学びます。

💡 **「正規分布でない目的変数」への対応**

通常の線形回帰は誤差が正規分布に従うと仮定します。しかし：
- 二値データ（合否・生死）：ベルヌーイ/二項分布
- カウントデータ（事故件数・来店人数）：ポアソン分布
- 比率データ（0〜1）：ベータ分布

これらを統一的に扱う枠組みが**一般化線形モデル**（GLM: Generalized Linear Model）です。

---

### 1. ロジスティック回帰

「年齢・収入・健康状態から、糖尿病発症（有/無）を予測する」これがロジスティック回帰の典型例です。

直接 $P(Y=1|X)$ を予測しますが、確率は0〜1に収まる必要があります。そこで**ロジット変換**を使います：

$$\\log \\frac{p}{1-p} = \\beta_0 + \\beta_1 x_1 + \\cdots + \\beta_p x_p$$

$\\frac{p}{1-p}$ は**オッズ**（odds）で、「成功/失敗の比率」です。これの対数（**対数オッズ**またはロジット）を線形式でモデル化します。

解を整理すると：$p = \\frac{1}{1+e^{-(\\beta_0+\\boldsymbol{\\beta}^\\top\\mathbf{x})}}$（シグモイド関数）。

[[logistic-sigmoid]]

**係数の解釈**：$\\beta_j$ が1増えると、オッズが $e^{\\beta_j}$ 倍になります（**オッズ比**）。

**数値例**：年齢 $x$（歳）から糖尿病の発症を予測する式が $\\log\\dfrac{p}{1-p} = -5 + 0.08x$ と推定されたとします。年齢が1歳上がるとオッズは $e^{0.08}\\approx 1.083$ 倍、10歳上がると $e^{0.8}\\approx 2.23$ 倍です。

| 年齢 | 対数オッズ | オッズ | 確率 $p$ |
| --- | --- | --- | --- |
| 30 | $-2.6$ | $0.074$ | $0.069$ |
| 40 | $-1.8$ | $0.165$ | $0.142$ |
| 50 | $-1.0$ | $0.368$ | $0.269$ |
| 60 | $-0.2$ | $0.819$ | $0.450$ |
| 70 | $0.6$ | $1.822$ | $0.646$ |

10歳ごとにオッズは毎回 $2.23$ 倍（$0.165/0.074$、$0.368/0.165$ など）ですが、確率の増え方は一定ではありません。30歳から40歳では $+0.073$、50歳から60歳では $+0.181$ です。オッズ比は「倍率」で一定、確率の差は出発点によって変わるのが、ロジスティック回帰の読み方の要点です。

パラメータは**最尤法**で推定します（線形回帰のような解析解はなく、反復計算が必要）。

🎯 **押さえどころ**：ロジスティック回帰の係数 $\\beta_j$ の解釈は「$x_j$ が1増えるとオッズが $e^{\\beta_j}$ 倍」。オッズ比 $> 1$ なら正の効果、$< 1$ なら負の効果です。

---

### 2. プロビット分析

「薬の投与量が増えるにつれて副作用が出る確率はどう変化するか」毒性試験ではこのような「投与量 → 反応確率」の関係をモデル化します。ロジスティック回帰と同じ二値目的変数を扱いますが、確率の増え方を表す関数（リンク関数）が異なるのがプロビット分析です：

$$\\Phi^{-1}(p) = \\beta_0 + \\boldsymbol{\\beta}^\\top\\mathbf{x}$$

$\\Phi^{-1}$ は標準正規分布の累積分布関数の逆関数（プロビット関数）です。結果はロジスティック回帰と似ており、主に毒性研究や心理測定で使われます。同じデータに当てはめると、ロジットの係数はプロビットの係数のおよそ1.6〜1.8倍になります。ロジスティック分布の標準偏差が $\\pi/\\sqrt{3}\\approx 1.81$ で、標準正規分布より広いぶんだけ、同じ確率の変化を作るのに必要な線形予測子の動きが大きくなるためです。

ロジスティックとプロビットの違いは裾の形状にあります。ロジスティック分布は正規分布より裾がやや重いです。

---

### 3. 一般化線形モデル（GLM）

「交通事故の日別発生件数（0件・1件・2件…）と気象条件の関係を調べたい」件数は非負整数でポアソン分布に従いやすく、通常の線形回帰では予測値が負になる問題があります。ロジスティック回帰もプロビット分析も、じつはより大きな枠組み「一般化線形モデル（GLM: Generalized Linear Model）」の特殊ケースです。GLM は次の3つの要素で構成されます：

1. **確率分布**（Random Component）：$Y$ の分布族（指数型分布族：正規・二項・ポアソン・ガンマなど）
2. **線形予測子**：$\\eta = \\mathbf{X}\\boldsymbol{\\beta}$
3. **リンク関数**（Link Function）$g$：$g(E[Y]) = \\eta$ は、「期待値」を「線形予測子」につなぐ

主なGLMの組み合わせ（各リンク関数は「確率・カウントの値域を実数軸に変換する」自然な選択です）：

- 正規分布 + 恒等リンク $g(\\mu) = \\mu$：通常の線形回帰（$\\mu$ はすでに実数）
- 二項分布 + ロジットリンク $g(p) = \\log(p/(1-p))$：ロジスティック回帰（$0 \\leq p \\leq 1$ を実数全体に変換）
- ポアソン分布 + 対数リンク $g(\\mu) = \\log\\mu$：ポアソン回帰（カウントデータ；$\\mu > 0$ を実数全体に変換し負の予測値を防ぐ）

**ポアソン回帰の数値例**：1日の事故件数 $Y$ を、雨の日なら $x=1$、そうでなければ $x=0$ として $\\log\\mu = 0.5 + 0.4x$ と推定したとします。晴れの日の期待件数は $e^{0.5}\\approx 1.65$ 件、雨の日は $e^{0.9}\\approx 2.46$ 件です。対数リンクでは、係数は足し算ではなく**掛け算の倍率**になり、雨の日は晴れの日の $e^{0.4}\\approx 1.49$ 倍です。ロジスティック回帰の $e^{\\beta}$ が「オッズの倍率」だったのに対し、ポアソン回帰の $e^{\\beta}$ は「期待件数の倍率」です。

パラメータ推定は**スコア方程式**（最尤法）を反復法（IRLS: Iteratively Reweighted Least Squares）で解きます。

---

### 4. 回帰診断法

モデルを構築しても「残差に特定の時間パターンがある」「特定の1人の観測値が回帰直線を大きく引きずっている」などの問題があれば、モデルの仮定が破られて推定が信頼できません。モデルの健全性を確認する一連の手順が**回帰診断法**です。

**残差分析**：標準化残差のプロットで、ランダムな散布が望ましく、パターンがあれば仮定違反を示します。

**系列相関**（Serial Correlation）：時系列データで残差が連続して正または負になる現象。**DW比**（Durbin-Watson統計量）$d = \\sum_{t=2}^n (e_t - e_{t-1})^2 / \\sum_t e_t^2$ で検出します（$d \\approx 2$ なら無相関、$d < 2$ なら正の系列相関）。

たとえば残差が $e_1,\\dots,e_6 = 2,\\ 1,\\ 1,\\ -1,\\ -2,\\ -1$ なら、隣どうしの差の二乗和は $1+0+4+1+1=7$、残差の二乗和は $4+1+1+1+4+1=12$ なので $d = 7/12 \\approx 0.58$ です。同じ符号が続いて、隣り合う残差が似ているほど分子が小さくなり、$d$ は2より小さくなります。系列相関の係数を $r$ とすると、標本が大きいとき $d \\approx 2(1-r)$ という関係があります。

**はずれ値と影響度**：**leverage**（てこ比）$h_{ii}$ は「$i$ 番目のデータが予測値に与える影響の大きさ」を表します。$h_{ii} > 2p/n$ は高影響点の目安です（$p$：パラメータ数）。$h_{ii}$ の合計は $p$ なので、平均は $p/n$ です。目安の $2p/n$ は、平均の2倍を超えるデータに注意するという意味です。**Q-Qプロット**は残差の正規性を視覚的に確認します。

🎯 **押さえどころ**：DW比の解釈は、$d < 2$ は正の系列相関（残差が同じ符号で連続）、$d > 2$ は負の系列相関を示します。

---

### 5. ニューラルネットワークモデル

GLMが「線形予測子 + リンク関数」でさまざまな分布を扱う枠組みであるなら、その非線形拡張が**ニューラルネットワーク**（Neural Network）です。

入力層・隠れ層・出力層からなる多層構造で、各層で非線形変換（活性化関数：ReLU・sigmoid など）を適用します。十分な隠れユニット数があれば任意の関数を近似できる（普遍近似定理）ため、回帰・分類・パターン認識など幅広く使われます。

準1級では「一般化線形モデルのさらなる拡張として、非線形な関係を柔軟にモデル化できる手法」として位置づけられます。パラメータの多さから過学習が起きやすいため、正則化（ドロップアウト・L2正則化）やクロスバリデーションによるモデル選択が重要です。`,keyFormulas:[{label:`ロジスティック回帰モデル`,formula:`\\log\\dfrac{p}{1-p} = \\beta_0 + \\boldsymbol{\\beta}^\\top\\mathbf{x}`},{label:`GLM リンク関数`,formula:`g(E[Y]) = \\mathbf{X}\\boldsymbol{\\beta}`},{label:`DW 比`,formula:`d = \\dfrac{\\sum_{t=2}^n (e_t - e_{t-1})^2}{\\sum_t e_t^2}`}],quiz:[{id:`glm1-1`,question:`ロジスティック回帰でモデル化する「ロジット」とは何か？`,options:[`確率 $p$ そのもの`,`$\\log(p/(1-p))$（対数オッズ）`,`$p^2/(1-p)$`,`$\\sqrt{p(1-p)}$`],correctAnswer:1,explanation:`ロジット（logit）は $\\log(p/(1-p))$ で、確率 $p$ のオッズの対数です。$p$ が0〜1の範囲にあるとき、ロジットは $(-\\infty, +\\infty)$ の範囲をとるため、線形式のような制約のない予測子として使えます。`},{id:`glm1-2`,question:`ロジスティック回帰の係数 $\\beta_j = 0.5$ の解釈として正しいものはどれか？`,options:[`$x_j$ の標準化係数が0.5である`,`$x_j$ が1増えると確率 $p$ が0.5増加する`,`$x_j$ が1増えるとオッズが $e^{0.5} \\approx 1.65$ 倍になる`,`$x_j$ が1増えると確率が1.65倍になる`],correctAnswer:2,explanation:`ロジスティック回帰の係数はオッズ比の対数なので、$x_j$ が1増えるとオッズが $e^{\\beta_j}$ 倍になります。$e^{0.5} \\approx 1.65$ 倍。「確率が○倍」ではなく「オッズが○倍」という解釈が重要です。`},{id:`glm1-3`,question:`GLMの「リンク関数」の役割はどれか？`,options:[`パラメータの推定方法を決める`,`データの標準化を行う`,`確率分布の種類を決める`,`期待値と線形予測子をつなぐ変換`],correctAnswer:3,explanation:`GLMの3要素は①確率分布族、②線形予測子、③リンク関数です。リンク関数 $g$ は「$g(E[Y]) = \\mathbf{X}\\boldsymbol{\\beta}$」という形で期待値を線形予測子に結びつけます。ロジスティック回帰のロジットリンクがその典型例です。`},{id:`glm1-4`,question:`カウントデータ（非負整数）の回帰に適したGLMの組み合わせはどれか？`,options:[`ポアソン分布 + 対数リンク`,`ガンマ分布 + 逆数リンク`,`正規分布 + 恒等リンク`,`二項分布 + ロジットリンク`],correctAnswer:0,explanation:`カウントデータ（事故件数・来客数など）はポアソン分布が自然なモデルです。対数リンク $g(\\mu) = \\log\\mu$ を使うことで、負の予測値にならない非負の期待値を保証します。`},{id:`glm1-5`,question:`DW比（Durbin-Watson統計量）が $d = 0.8$ を示す場合、何を意味するか？`,options:[`残差が無相関`,`正の系列相関がある（残差が同じ符号で連続しやすい）`,`負の系列相関がある`,`誤差が正規分布に従わない`],correctAnswer:1,explanation:`$d \\approx 2$ が無相関、$d < 2$（特に$d < 1.5$程度）は正の系列相関を示します。時系列データで今期の残差が正なら次期も正になりやすい状態です。OLSの推定量は不偏ですが、効率が低下します。`},{id:`glm1-6`,question:`ロジスティック回帰のパラメータ推定に通常使われる方法はどれか？`,options:[`リッジ回帰`,`最小二乗法（OLS）`,`最尤法（MLE）`,`モーメント法`],correctAnswer:2,explanation:`ロジスティック回帰には線形回帰のような解析解がないため、最尤法を反復計算（IRLS：反復再重み付き最小二乗）で解きます。収束は一般に速く、サンプルが多ければ信頼性の高い推定が得られます。`},{id:`glm1-7`,question:`ロジスティック回帰とプロビット分析の主な違いはどれか？`,options:[`最尤推定かどうか`,`係数の解釈（オッズ比vs確率）`,`目的変数の型`,`リンク関数（ロジットvs正規分布の逆関数）`],correctAnswer:3,explanation:`ロジスティック回帰のリンク関数はロジット $\\log(p/(1-p))$、プロビットは標準正規分布の累積分布関数の逆関数 $\\Phi^{-1}(p)$ です。本文のとおり、どちらも二値の目的変数を最尤法で推定し、違うのは確率と線形予測子をつなぐ関数（リンク関数）です。当てはめた確率は通常ほぼ同じになります。`},{id:`glm1-8`,question:`leverage（てこ比）$h_{ii}$ が大きい観測値の意味はどれか？`,options:[`説明変数空間で「外れた」位置にあり予測値への影響が大きい`,`目的変数が異常値である`,`モデルの当てはまりが良い`,`残差が大きい`],correctAnswer:0,explanation:`leverage $h_{ii}$ は説明変数の空間で $i$ 番目の点が中心からどれほど離れているかを測ります。$h_{ii}$ が高い点は「てこの原理」で回帰直線を大きく動かす潜在力があります。残差が大きければ「影響点（influential point）」となります。`},{id:`glm1-9`,question:`Q-Qプロット（Quantile-Quantile Plot）は残差の何を確認するために使うか？`,options:[`系列相関`,`正規性（残差が正規分布に従うか）`,`ヘテロスケダスティシティ`,`クラスター構造`],correctAnswer:1,explanation:`Q-Qプロットは残差の分位点を正規分布の理論的分位点と対比します。点が対角線上に並べば正規性が支持され、大きく外れれば正規性の仮定に疑問が生じます。外れ値や裾の重さも視覚的に確認できます。`},{id:`glm1-10`,question:`同じ二値データにロジスティック回帰とプロビット分析を当てはめたとき、係数の大きさの関係として正しいものはどれか？`,options:[`2つの係数はほぼ等しい`,`プロビットの係数がロジットの約1.6〜1.8倍になる`,`2つの係数の符号が逆になる`,`ロジットの係数がプロビットの約1.6〜1.8倍になる`],correctAnswer:3,explanation:`本文の第2節のとおり、ロジットの係数はプロビットの係数のおよそ1.6〜1.8倍です。ロジスティック分布の標準偏差は $\\pi/\\sqrt{3} \\approx 1.81$ で標準正規分布（標準偏差1）より広いので、同じ確率の変化を作るのに、線形予測子を大きく動かす必要があるからです。向き（符号）は同じです。`}]},{id:`1.23-model-selection`,updatedAt:`2026-10-25`,title:`KL情報量・AIC・クロスバリデーション`,chapter:8,description:`モデル間の「ズレ」を定量化するKL情報量から、AIC・CVによるモデル選択まで学びます。`,content:`💡 **このモジュールで学ぶこと**

「直線で当てはめるか、曲線で当てはめるか？」データへの当てはまりだけなら曲線の勝ちですが、未来のデータへの予測は直線の方が正確なこともあります。これが「どのモデルを選ぶか」という問いの核心です。読み終えると、次の3つができるようになります。

1. カルバック・ライブラー情報量（KL情報量）を、モデルを使ったときの平均の損失として計算できる
2. AIC と BIC を対数尤度とパラメータ数から計算し、差を読んでモデルを選べる
3. クロスバリデーションの手順と、AIC との関係を説明できる対数尤度 $\\ell(\\hat{\\theta})$ の定義は[推定法](/stats-pre1/1.14-estimation/)で扱いました。

💡 **過学習の数値例：「9次多項式で10点を当てはめる」**

データ10点に対して**9次多項式**（係数10個）を当てはめると、訓練誤差はゼロ（完璧にフィット）になります。しかし新しいテストデータでの予測誤差は非常に大きくなります。曲線が「データの偶然のばらつき」までトレースしてしまうからです。これが**過学習**（overfitting）の典型例です。

次の図は、多項式の次数を変えたときの誤差を、実際にデータを取り直して確かめたものです。

[[f-biasvar]]

モデル選択の問題は本質的に「手元のデータへの当てはまり」と「将来のデータへの予測能力」をどうバランスするかです。

---

### 1. カルバック・ライブラー情報量

2つの確率分布 $p(x)$（真の分布）と $q(x)$（推定モデル）の「ズレ」を測る指標が**カルバック・ライブラー情報量**（KL情報量、KL-Divergence）です：

$$D_{\\text{KL}}(p \\| q) = E_p\\!\\left[\\log \\frac{p(X)}{q(X)}\\right] = \\int p(x) \\log \\frac{p(x)}{q(x)} dx$$

💡 **KL情報量の直感的意味**

$D_{\\text{KL}}(p\\|q)$ は「**真の分布 $p$ で観測したとき、$q$ を使った場合に生じる平均的な情報損失**」と解釈できます。$p = q$ なら情報損失はゼロ、ずれるほど大きくなります。

$D_{\\text{KL}}(p \\| q) \\geq 0$、等号は $p = q$ のとき。ただし対称ではない（$D_{\\text{KL}}(p\\|q) \\neq D_{\\text{KL}}(q\\|p)$）。「距離」ではなく「乖離量」（divergence）と呼ぶのはこのためです。

離散型なら積分が和になります。表と裏が半々の本物のコイン $p = (0.5,\\ 0.5)$ を、表が出やすいと思い込んだモデル $q = (0.8,\\ 0.2)$ で表したときのずれを計算します。

$$\\begin{aligned} D_{\\text{KL}}(p\\|q) &= 0.5\\log\\frac{0.5}{0.8} + 0.5\\log\\frac{0.5}{0.2} \\\\ &= 0.5 \\times (-0.470) + 0.5 \\times 0.916 = 0.223 \\end{aligned}$$

| | 真の分布 | モデル | KL情報量 |
|---|---|---|---|
| (a) | $p = (0.5,\\ 0.5)$ | $q = (0.8,\\ 0.2)$ | 0.223 |
| (b) | $q = (0.8,\\ 0.2)$ | $p = (0.5,\\ 0.5)$ | 0.193 |
| (c) | $p = (0.5,\\ 0.5)$ | $(0.6,\\ 0.4)$ | 0.020 |

(a) と (b) は同じ2つの分布なのに値が違います。これが非対称の意味です。(c) のようにモデルが真に近いほど値は0に近づきます。

---

### 2. AIC が KL情報量の近似になる理由

「フィットが良くてもパラメータが多すぎると将来データへの予測が悪くなる」このバランスを取るのが**情報量規準**です。

真の分布 $p$ と推定モデル $q_{\\hat{\\theta}}$（最尤推定パラメータ）の KL情報量を最小化したいですが、$p$ は未知です。赤池（1974）は次の近似を示しました。「平均的な KL情報量のずれ」は次の量で近似できます：

$$\\text{平均 KL 乖離} \\approx -2\\ell(\\hat{\\theta}) + 2k$$

ここで $k$ はパラメータ数。この量を**AIC**（赤池情報量規準、Akaike Information Criterion）と呼びます：

$$\\text{AIC} = -2\\ell(\\hat{\\theta}) + 2k$$

$\\ell(\\hat{\\theta})$ は最大対数尤度（フィットの良さ）、$2k$ は複雑さへのペナルティです。**AIC が小さい**モデルが優れています。

なぜ $2k$ なのかは、次の順で考えると分かります。

1. KL情報量のうちモデルによって変わる部分は、**新しいデータ**での平均の対数尤度 $E_p[\\log q_{\\hat{\\theta}}(X)]$ です。これが大きいモデルほど真に近い
2. 手元のデータで最大化した $\\ell(\\hat{\\theta})$ でこれを測ると、同じデータに合わせて $\\hat{\\theta}$ を選んだぶん、甘い値になります。その甘さは平均でおよそ $k$（パラメータ数）です
3. そこで $\\ell(\\hat{\\theta}) - k$ を新しいデータでの対数尤度の推定値とし、$-2$ 倍したものが AIC です

パラメータを1個増やすと、AIC で得をするには最大対数尤度が1より大きく増える必要があります。

🎯 **使いどころ**：AIC の比較は同一データに対して複数モデルを評価するときに使います。AIC の絶対値の意味はなく、**相対比較**が重要です。

⚠️ **よくある誤解**：「AIC が小さいモデル = 絶対的に良いモデル」と思いがちですが、誤りです。AIC は**同一データ・同一目的変数で計算された複数モデル間の相対指標**で、絶対値そのものに意味はありません（対数尤度の定数項や標本サイズの取り方で値が変わる）。「AIC = 200 のモデルは AIC = 5000 のモデルより25倍良い」のような解釈はできません。意味があるのは「差 $\\Delta\\text{AIC} = \\text{AIC}_i - \\text{AIC}_{\\min}$」で、慣例として $\\Delta < 2$ ならほぼ同等、$\\Delta > 10$ なら明確に劣ると判断します。

📖 **バイアス・バリアンス分解とマローズの $C_p$**

将来のデータに対する予測の2乗誤差の期待値は、次のように3つに分けられます。

$$E[(Y-\\hat{f}(x))^2] = (\\text{バイアス})^2 + \\text{バリアンス} + \\sigma^2$$

- バイアス：モデルが単純すぎることによるずれ
- バリアンス：データの揺れによる変動
- $\\sigma^2$：取り除けないノイズ

複雑なモデルほどバイアスは小さくなり、バリアンスは大きくなります。2つの和が最小になる複雑さを選ぶのがモデル選択の目標で、上の図の最小点がそれにあたります。

**マローズの $C_p$** は、線形回帰でこの考え方を使った規準です。全変数を使ったモデルの誤差分散の推定値を $s^2$、候補モデルの残差平方和を $RSS_p$、説明変数の数を $p$（定数項を含めた係数の数）、データ数を $n$ として、

$$C_p = \\frac{RSS_p}{s^2} - n + 2p$$

と定義します。係数の数 $p$ を増やすと $RSS_p$ は減りますが、$2p$ が罰則として増えます。バイアスのないモデルでは $C_p$ は $p$ の近くになるので、$C_p$ が小さく、かつ $C_p\\approx p$ になる候補が良いモデルです。誤差が正規分布に従う線形回帰では、AIC と $C_p$ は標本が大きいとき、ほぼ同じ順位づけになります。

🎯 **つまずきやすい点**：$C_p$ の $s^2$ は「全変数を入れたモデル」から求めるので、候補モデルごとに変わりません。候補モデルだけで $s^2$ を求めると、$C_p$ の意味が失われます。
---

### 3. AIC と BIC の違い

**BIC**（ベイズ情報量規準）は次の量を最小化します：

$$\\text{BIC} = -2\\ell(\\hat{\\theta}) + k\\log n$$

ペナルティが $k\\log n$ で**サンプルサイズに依存**する点が AIC と異なります。

| 規準 | ペナルティ | 哲学 | 大標本での傾向 |
|---|---|---|---|
| AIC | $2k$ | 予測精度を重視 | 真のモデルが候補にあっても複雑なモデルを選びがち |
| BIC | $k\\log n$ | 真のモデルが候補にある前提 | 一致性あり（真モデルを選ぶ確率→1） |
| CV | データから直接推定 | 実データの予測力を直接測定 | LOOCV は AIC と漸近的に同値 |

例：$n=100$ なら $\\log n \\approx 4.6 > 2$ なので、BIC はパラメータ追加に対し AIC より厳しい。$n$ が大きいほど差が広がります。

---

### 4. クロスバリデーション（交差検証）

**クロスバリデーション**（Cross-Validation, CV）は「データを訓練用と検証用に分けて、モデルの汎化性能を**直接**推定する」方法です。AIC が理論的な近似なのに対し、CV は実測値です。

**k分割交差検証（k-fold CV）**：データを $k$ 個のグループ（フォールド）に等分し、1つを検証用・残り $k-1$ を訓練用として $k$ 回繰り返します。各回の検証誤差の平均が汎化誤差の推定値です。

**Leave-One-Out CV（LOOCV）**：$k = n$（データ数と同じ）の場合。1つずつ除いて学習し、除いた1点で検証を繰り返します。ジャックナイフ法と構造が同じです。

💡 **CV と AIC の理論的関係**

LOOCV は AIC と**漸近的に同値**であることが知られています（Stone, 1977）。両者とも「予測誤差の不偏推定」を目指す立場で、大標本では同じモデルを選ぶ傾向があります。違いは：

- **AIC**：解析的な近似（計算が速い、対数尤度ベースで理論的）
- **CV**：実測ベース。分布の仮定が緩い、計算コストが高い（$k$ 回学習）

🎯 **使いどころ**：情報量規準（AIC など）とクロスバリデーションは、公式の出題範囲表にモデル選択の手法として挙がっています。「過学習の防止」「汎化性能の推定」という文脈で使い分けます。BIC との違い（予測重視 vs 真モデル仮定）も押さえておきます。

---

### 5. 数値例：AIC によるモデル比較

カフェの売上を予測するために3つのモデルを比較します（$n = 100$）：

| モデル | パラメータ数 $k$ | 最大対数尤度 $\\ell$ | AIC | BIC |
|---|---|---|---|---|
| M1（定数のみ） | 1 | $-150$ | $302$ | $304.6$ |
| M2（気温） | 2 | $-130$ | $264$ | $269.2$ |
| M3（気温＋曜日＋イベント） | 4 | $-125$ | $258$ | $268.4$ |

AIC では M3（最小値258）が選ばれます。M2 の $\\Delta\\text{AIC} = 264 - 258 = 6$ なので、M2 は M3 よりはっきり劣ります（$\\Delta > 2$）。一方でBIC では M2（最小値269.2）と M3（268.4）がほぼ同等です。$k\\log n = 4 \\times 4.6 \\approx 18.4$ という重いペナルティが BIC を「より単純なモデル寄り」にしている様子が分かります。

---

### 6. 関連モジュールへの導線

- **[推定法](/stats-pre1/1.14-estimation/)**：本モジュールの $\\ell(\\hat{\\theta})$（最大対数尤度）の定義と計算手順を扱います。
- **[推定量の性質](/stats-pre1/1.15-estimator-props/)**：MLE の一致性・有効性は AIC の理論的根拠を支えます。
- **[漸近理論の基礎](/stats-pre1/1.22-asymptotic/)**：フィッシャー情報量・MLE の漸近正規性が AIC 導出の背景にあります。

💡 **モデル選択の実務的な原則**

「AIC が最小だから最良」と機械的に決めるのは危険です。実務では：

1. **複数の規準を併用**：AIC・BIC・CV を比較し、結論が一致するモデルを優先
2. **解釈可能性**：複雑なモデルが少しだけ AIC が低くても、シンプルなモデルを選ぶ判断もある
3. **検証データの確保**：CV や別データセットで予測精度を確認することが理想`,keyFormulas:[{label:`KL情報量`,formula:`D_{\\text{KL}}(p\\|q) = E_p\\!\\left[\\log\\dfrac{p(X)}{q(X)}\\right]`},{label:`AIC`,formula:`\\text{AIC} = -2\\ell(\\hat{\\theta}) + 2k`},{label:`BIC`,formula:`\\text{BIC} = -2\\ell(\\hat{\\theta}) + k\\log n`}],quiz:[{id:`asy1-4`,question:`KL情報量 $D_{\\text{KL}}(p\\|q)$ の性質として正しいものはどれか？`,options:[`連続型には定義できない`,`常に0以上で、等号は $p = q$ のとき`,`対称性が成立する（$D_{\\text{KL}}(p\\|q) = D_{\\text{KL}}(q\\|p)$）`,`常に1以下`],correctAnswer:1,explanation:`$D_{\\text{KL}}(p\\|q) \\geq 0$（ギブスの不等式）で、等号は $p = q$ のときのみです。対称ではない（距離ではなく「乖離量」）という点が重要です。AIC の理論的根拠はKL情報量の最小化です。`},{id:`asy1-5`,question:`AIC = $-2\\ell(\\hat{\\theta}) + 2k$（$k$ はパラメータ数）において、$2k$ の項が存在する理由はどれか？`,options:[`BICとの互換性を保つため`,`尤度を正規化するため`,`パラメータ数が多いモデルへのペナルティ（過学習の防止）`,`残差の自由度を調整するため`],correctAnswer:2,explanation:`パラメータ数 $k$ が増えると訓練データへのフィットは良くなりますが、将来データへの予測は悪くなります（過学習）。$2k$ のペナルティ項がこの複雑さを罰することで、汎化性能と当てはまりのバランスをとります。`},{id:`asy1-6`,question:`AIC と BIC を比較したとき、BIC の特徴として正しいものはどれか？`,options:[`AIC と BIC は同じモデルを選ぶ`,`BIC は KL情報量の最小化と等価である`,`BIC は AIC より小さなモデルを選びにくい`,`BIC のペナルティ項は $k\\log n$ でサンプルが多いほど大きくなる`],correctAnswer:3,explanation:`BIC $= -2\\ell(\\hat{\\theta}) + k\\log n$ のペナルティ $k\\log n$ はサンプルサイズ $n$ が増えるほど大きくなります。そのため大きな $n$ では AIC より複雑なモデルを嫌い、より少ないパラメータのモデルを選ぶ傾向があります。`},{id:`asy1-8`,question:`k分割交差検証（k-fold CV）の主な目的はどれか？`,options:[`データを使い切ることで推定の偏りをなくす`,`訓練データで見られない新データへの汎化性能を推定する`,`サンプルサイズを $k$ 倍に増やす`,`モデルのパラメータを最尤法で推定する`],correctAnswer:1,explanation:`k-fold CVは「訓練に使っていない検証データでのエラー」を $k$ 回平均することで、モデルが新しいデータに対してどれだけうまく予測できるか（汎化性能）を推定します。過学習の検出とモデル選択（正則化パラメータ・モデル複雑度の決定）に使います。`},{id:`asy1-10`,question:`3つのモデルの AIC がそれぞれ 120, 115, 118 のとき、どのモデルを選ぶか？`,options:[`AIC の絶対値に意味はないので比較できない`,`AIC = 120 のモデル（最大）`,`AIC = 115 のモデル（最小）`,`AIC = 118 のモデル（中間）`],correctAnswer:2,explanation:`AIC は小さいほど「よいモデル」です。AIC = 115 が最小なのでこのモデルを選びます。AIC の絶対値自体に意味はなく（比較のみが意味を持ちます）、同一データに対して計算された値同士でのみ比較できます。`},{id:`asy1-16`,question:`KL情報量が「対称でない」ことの具体例として正しいものはどれか？`,options:[`$D_{KL}(p\\|q)$ と $D_{KL}(q\\|p)$ は一般に等しくない`,`KL情報量は距離の公理を満たす`,`負の値をとることがある`,`$D_{KL}(p\\|q)$ と $D_{KL}(q\\|p)$ は常に等しい`],correctAnswer:0,explanation:`「$p$ から見たときの $q$ のズレ」と「$q$ から見たときの $p$ のズレ」は一般に異なります。たとえばモデルの当てはめでは「真のモデル $p$ から当てはめたモデル $q$ を見る視点」が自然ですが、逆方向では結果が変わります。この非対称性から、KL情報量は「距離（メトリック）」ではなく「乖離量（ダイバージェンス）」と呼ばれます。`},{id:`asy1-17`,question:`Leave-One-Out CV（LOOCV）はどのような操作か？`,options:[`データを2分割してテストする`,`データ数と同じ回数だけ「1個除いて学習・その1個でテスト」を繰り返す`,`ランダムに10%を除いて学習を繰り返す`,`サンプルを複数の層に分けて層別抽出する`],correctAnswer:1,explanation:`LOOCV（Leave-One-Out Cross Validation）は $k=n$ の特殊な交差検証です。$n$ 個のデータのうち1個を除いた $n-1$ 個で学習し、除いた1個で予測精度を測る操作を $n$ 回繰り返します。バイアスが低い（全データをほぼ使う）一方、計算コストが高いのが特徴です。ジャックナイフ法と同じ構造を持ちます。`},{id:`asy1-18`,question:`AIC の理論的根拠（何の最小化と同値か）はどれか？`,options:[`ベイズ事後確率の最大化`,`最小二乗誤差の最小化`,`KL情報量（真のモデルから当てはめたモデルのズレ）の最小化`,`分散の最小化`],correctAnswer:2,explanation:`AIC は「KL情報量を推定量で置き換えたとき、そのバイアス補正項が $2p$ になる」という導出から得られます（赤池, 1974）。つまり AIC の最小化は「真のモデルとの乖離（KL情報量）を最小化するモデルを選ぶ」ことと漸近的に同値です。`},{id:`asy1-19`,question:`AIC と BIC について、小標本（$n$ が小さい）と大標本（$n$ が大きい）での違いとして正しいものはどれか？`,options:[`小標本では BIC が必ず優れている`,`AIC は大標本専用のモデル選択規準`,`小標本・大標本を問わず常に同じモデルを選ぶ`,`大標本では BIC のペナルティが大きくなり、よりシンプルなモデルを選ぶ傾向がある`],correctAnswer:3,explanation:`BIC のペナルティ $p \\log n$ は $n$ が大きいほど増加するため、大標本では AIC より重いペナルティが課されシンプルなモデルが選ばれやすくなります。小標本では $\\log n$ が小さく（$n=10$ で $\\log 10 \\approx 2.3$）AIC に近い結果になります。BIC は「真のモデルの一致性（consistency）」を持つためパラメータ選択に理論的優位性があります。`},{id:`asy1-20`,question:`k分割交差検証で $k=10$ のとき、学習に使うデータの割合はどれか？`,options:[`50%`,`90%`,`100%`,`10%`],correctAnswer:1,explanation:`10分割交差検証では全データを10のグループに分け、9グループ（90%）で学習・1グループ（10%）で検証を10回繰り返します。全回の検証誤差を平均したものが汎化誤差の推定値になります。$k$ を大きくすると学習データの割合が増えバイアスが減りますが、計算コストも増加します。`}]},{id:`2.2-pca`,updatedAt:`2026-10-26`,title:`主成分分析 (PCA)`,chapter:9,description:`相関行列の固有値から主成分の向きと寄与率を求め、主成分負荷量で各主成分の意味を読む手順を、2変数と4科目の例で学びます。`,content:`💡 **このモジュールで学ぶこと**

「10科目のテスト結果があるが、どう整理すれば全体像が見えるか？」情報が多すぎると人間には把握しきれません。このモジュールでは、多数の変数を情報の損失を最小化しながら少数の「本質的な指標」に凝縮する**主成分分析（PCA）**の仕組みを学びます。読み終えると、次の3つができるようになります。

1. 2変数の相関行列から、固有値と主成分の向きを手で求められる
2. 固有値から寄与率と累積寄与率を出し、主成分をいくつ残すか決められる
3. 主成分負荷量を見て、各主成分が何を表すかを読める

💡 **「演奏家の実力を2つの数字で表す」ような情報圧縮**

クラシックのピアニストを評価する際、「音の正確さ・スピード・音量の安定性・感情表現・リズム感・姿勢・表情・舞台映え…」と10項目を列挙しても比較しにくいですよね。実際には「技術力」と「表現力」という2軸で大半が説明できるかもしれません。

主成分分析とは、このように「10個の数字を2〜3個の本質的な指標（主成分）で代替する」手法です。情報を捨てているようで、実は**最も情報量を保つ方向**を選んでいます。

---

### 1. 数学的本質：「ばらつきが最大の方向」を新しい軸にする

10科目の成績から「理数系能力」と「言語系能力」という2つの主成分を取り出す場面を想像してください。コンピュータは、生徒一人ひとりを10次元の空間の1点と見て、「点の集まりがどの方向に最も広がっているか」を探します。その「最も広がっている方向」を数学的に求める手続きを**固有値問題**といいます（高校数学には登場しません。ここでは計算のやり方より、結果をどう読むかを中心に扱います）。

**分散共分散行列**とは：「各科目のばらつき（分散）」と「科目間の関係（共分散）」を数字の表にまとめたものです。例えば「数学が得意な人は物理も得意」という傾向があれば、その数字が行列の特定の場所に記録されています。この行列の固有値問題を解くと：
- **固有ベクトル**：データのばらつきが最も大きくなる「新しい軸」の向き。この固有ベクトルの各成分が「元の変数をどの重みで組み合わせるか」を表します
- **固有値**：その軸が保持している情報の量（分散）

**主成分スコア** $z = a_1 X_1 + a_2 X_2 + \\cdots + a_p X_p$ は、元の変数に固有ベクトルの重み $a_1, a_2, \\ldots$ をかけて足し合わせた値です。このように「複数の値を重みをかけて足し合わせる」操作を**線形結合**（Linear Combination）と呼びます。行列記法では $z_{ij} = \\mathbf{a}_j^T \\mathbf{x}_i$ と書きます。$^T$ は転置（縦に並んだベクトルを横に倒す操作）で、横にした $\\mathbf{a}_j$ と縦の $\\mathbf{x}_i$ を掛けると、成分どうしの積の和（内積）になります。

グラフで、データの散らばりがどの方向に最も集中しているかを観察してみましょう。
[[interactive:pca]]

主成分分析が「データのばらつきが最大になる方向を新しい軸として選ぶ」操作であることが、このグラフから直感的に理解できます。

**2変数で手計算する**：標準化した2変数の相関が $r = 0.8$ のとき、相関行列は $R = \\begin{pmatrix} 1 & 0.8 \\\\ 0.8 & 1 \\end{pmatrix}$ です。固有値は $\\det(R - \\lambda I) = 0$ を解いて求めます。

$$\\begin{aligned} (1-\\lambda)^2 - 0.8^2 &= 0 \\\\ \\lambda &= 1 \\pm 0.8 = 1.8,\\ 0.2 \\end{aligned}$$

大きい方の固有値 1.8 に対応する固有ベクトルは $(1/\\sqrt{2},\\ 1/\\sqrt{2})$ で、グラフの赤線（右上がり45度）の向きです。第1主成分スコアは $z_1 = 0.71X_1 + 0.71X_2$ で、2つの変数の合計に比例します。第2主成分は直交する $(1/\\sqrt{2},\\ -1/\\sqrt{2})$ の向き（灰色の破線）で、2つの差を表します。

| | 固有値 | 寄与率 |
|---|---|---|
| 第1主成分 | 1.8 | $1.8/2 = 90\\%$ |
| 第2主成分 | 0.2 | $0.2/2 = 10\\%$ |

固有値の和 $1.8 + 0.2 = 2$ は、標準化した2変数の分散の合計（$1 + 1$）と等しくなります。グラフで相関を動かすと、寄与率が $(1+r)/2$ で変わります。

---

### 2. 寄与率：どれくらいの情報を保持しているか

10科目の成績があるとして、主成分を2つだけ採用した場合に「全情報の何%が保持できているか」を示すのが**寄与率**と**累積寄与率**です。

- **寄与率**：その主成分1つが全体情報の何%を説明するか（例：第1主成分が45%、第2主成分が28%）
- **累積寄与率**：採用した主成分の合計（例：2つで73%）。実務では **70〜80%** を目安にします
- **主成分負荷量**：元の変数と主成分の相関係数。第 $k$ 主成分と変数 $j$ の負荷量は $\\sqrt{\\lambda_k} \\times a_{jk}$（$\\lambda_k$：固有値、$a_{jk}$：固有ベクトルの成分）。「どの変数が第1主成分に強く影響しているか」を示す。例えば身長の負荷量が $+0.8$・体重の負荷量が $+0.7$ なら「第1主成分は体の大きさを表す軸」と解釈できます

**トレース（trace）**：行列の対角要素の和のことです。分散共分散行列のトレースは全変数の分散の合計（全情報量）を表し、すべての固有値の和と等しいことが保証されています。

**カイザー基準**：主成分数を決める基準の一つで「固有値が 1 以上の主成分のみを採用する」というものです。標準化後の変数の分散が 1 なので「元の変数 1 個分以上の情報量がある主成分だけ残す」という意味になります。

**4科目の例**：数学・理科・国語・英語の相関が、数学と理科 0.7、国語と英語 0.6、文系と理系の組み合わせはどれも 0.3 だったとします。相関行列の固有値を計算すると、次のようになります。

| 主成分 | 固有値 | 寄与率 | 累積 | 負荷量（数・理・国・英） |
|---|---|---|---|---|
| 第1 | 2.25 | 56.3% | 56.3% | 0.78, 0.78, 0.72, 0.72 |
| 第2 | 1.05 | 26.2% | 82.5% | −0.49, −0.49, 0.53, 0.53 |
| 第3 | 0.40 | 10.0% | 92.5% | 0, 0, 0.45, −0.45 |
| 第4 | 0.30 | 7.5% | 100% | 0.39, −0.39, 0, 0 |

- 固有値の和は $2.25 + 1.05 + 0.40 + 0.30 = 4$ で、4科目の分散の合計（トレース）と一致します
- 第1主成分は4科目すべてに正の負荷量なので「総合的な学力」、第2主成分は理系2科目が負で文系2科目が正なので「文系寄りか理系寄りか」と読めます
- 残す数は、カイザー基準でも累積寄与率 70〜80% の目安でも2つです

---

### 3. 実務上のポイント：単位の壁を越える

「身長（cm）」と「年収（円）」をそのまま PCA にかけると、数字の大きい年収に軸が引っ張られてしまいます。これを防ぐため、事前にデータを**標準化**（平均0、分散1）し、**相関行列**に対して分析を行うのが鉄則です。

🎯 **押さえどころ**

- 各主成分は互いに**直交（無相関）**：主成分間の相関は 0
- 主成分スコア：各サンプルの新しい座標値（主成分軸上での位置）
- PCAは「教師なし学習」：正解ラベル（目的変数）を必要とせず、データ自体の構造を探索する`,keyFormulas:[{label:`寄与率（第 j 主成分）`,formula:`\\text{寄与率}_j = \\frac{\\lambda_j}{\\sum_i \\lambda_i}`},{label:`主成分スコア`,formula:`z_{ij} = \\mathbf{a}_j^T \\mathbf{x}_i`}],interactiveType:`pca`,quiz:[{id:`q2-1`,question:`第1主成分の分散の大きさに対応する数学的指標は？`,options:[`平均値`,`固有値`,`トレース`,`逆行列`],correctAnswer:1,explanation:`分散共分散行列（または相関行列）を固有値分解すると $\\Sigma \\mathbf{a} = \\lambda \\mathbf{a}$ という式が得られます。この固有値 $\\lambda$ が、その主成分軸が保持する分散の大きさそのものです。第1固有値が最大なので、第1主成分が最も多くの情報を持ちます。トレースは全固有値の和であり、個々の主成分の分散ではありません。`},{id:`q2-2`,question:`各変数の単位が異なる場合、主成分分析を行う前に使用すべき行列は？`,options:[`正方行列`,`分散共分散行列`,`相関行列`,`単位行列`],correctAnswer:2,explanation:`身長（cm）と体重（kg）のように単位が異なる変数を混ぜると、数値が大きい変数（身長は150〜180の範囲、体重は50〜80）が主成分を支配してしまいます。各変数を平均0・標準偏差1に標準化してから相関行列を使うと、単位に依存しない公平な比較ができます。単位がそろっている場合（例：複数の気温データ）は分散共分散行列でも構いません。`},{id:`q2-3`,question:`累積寄与率がどれくらいを超えると、情報の要約として十分とみなされることが多いか？`,options:[`100%`,`10%`,`30%`,`70-80%`],correctAnswer:3,explanation:`寄与率は「その主成分が全分散（全情報）のうち何%を説明するか」を表します。第1・第2・第3主成分の寄与率を足し合わせた累積寄与率が70〜80%を超えると、元データの主要な構造を保ちつつ次元を削減できていると判断するのが慣例です。100%は全次元を使う（圧縮しない）ことを意味し、30%以下では情報の損失が大きすぎます。`},{id:`q2-4`,question:`各主成分同士の相関はいくらか？`,options:[`0`,`0.5`,`1`,`-1`],correctAnswer:0,explanation:`PCAは分散共分散行列の固有ベクトルを軸として変換するため、得られた主成分は互いに直交（数学的に垂直な方向）になります。互いに直交する方向への射影は無相関になるので、主成分間の相関係数は必ず0です。これにより「重複した情報を持たない独立した軸」として解釈でき、多重共線性の問題も生じません。`},{id:`q2-5`,question:`主成分負荷量とは何か？`,options:[`主成分の平均`,`主成分と元の変数の相関係数`,`主成分の二乗和`,`データの個数`],correctAnswer:1,explanation:`主成分負荷量は「第 $k$ 主成分と元の変数 $X_j$ の相関係数」で、$\\sqrt{\\lambda_k} \\cdot a_{jk}$（固有値の平方根 $\\times$ 固有ベクトルの成分）として計算されます。例えば第1主成分の負荷量が身長 $+0.8$・体重 $+0.7$ なら「第1主成分は体の大きさを表す軸」と解釈できます。固有ベクトル（係数）と混同しやすいので注意してください。`},{id:`q2-6`,question:`分散共分散行列のトレース（対角要素の和）と固有値の和の関係は？`,options:[`トレースの方が大きい`,`固有値の和の方が大きい`,`等しい`,`無関係`],correctAnswer:2,explanation:`行列のトレースは固有値分解しても変わらない不変量です。分散共分散行列のトレースは「全変数の分散の合計」を表し、これは固有値の和と等しくなります。この性質を使って、各固有値を全固有値の和（＝トレース）で割ることで「その主成分の寄与率」が求まります。`},{id:`q2-7`,question:`PCAにおいて、情報を圧縮する際に最大化される目的関数は？`,options:[`平均`,`中央値`,`誤差`,`分散`],correctAnswer:3,explanation:`PCAの基本的な考え方は「元データをある方向に射影したとき、射影後の点のばらつき（分散）を最大化する方向を第1主成分軸とする」というものです。分散が大きい方向ほど、もとのデータの個体差（情報）をよく反映しています。第2主成分は「第1主成分と直交する制約のもとで、残りの分散を最大化する方向」として定まります。`},{id:`q2-8`,question:`固有値が 1 以上の主成分のみを採用する基準を何と呼ぶ？`,options:[`カイザー基準`,`エルボー法`,`AIC基準`,`スクリープロット法`],correctAnswer:0,explanation:`カイザー基準（Kaiser criterion）は「相関行列を使う場合、各標準化変数の分散は1なので、固有値1未満の主成分は元の変数1本よりも情報が少い」という論理です。固有値 $\\geq 1$ の主成分だけを採用することで、情報量が元の1変数を上回る主成分のみを残します。ただしこれはあくまで目安で、スクリープロット（固有値の折れ線グラフ）と合わせて判断します。`},{id:`q2-9`,question:`元の変数の線形結合で作られる、個々のデータの新しい座標値を何と呼ぶ？`,options:[`残差`,`主成分スコア`,`固有ベクトル`,`偏差`],correctAnswer:1,explanation:`主成分スコアは「各サンプルが主成分軸のどの位置にあるか」を示す値です。100人分のデータを2次元に圧縮した場合、各人に第1主成分スコア・第2主成分スコアの2つの値が割り当てられます。固有ベクトルは「軸の方向（係数）」であり、スコアは「その軸上のデータ点の座標値」です。スコアを散布図にプロットするとデータの構造が視覚化されます。`},{id:`q2-10`,question:`PCAが「教師なし学習」に分類される理由は？`,options:[`変数が少ないから`,`行列を使うから`,`計算が速いから`,`正解ラベル（目的変数）を必要としないから`],correctAnswer:3,explanation:`機械学習では「正解ラベル（目的変数 $y$）を使って学習する」手法を教師あり学習（回帰・分類など）と呼びます。PCAは「何かを予測する」のではなく「データ自体のばらつき構造を発見する」ため、$y$ なしで動作します。このように正解ラベルなしでデータの構造を探る手法を教師なし学習と呼び、クラスター分析や因子分析も同じカテゴリに属します。`}]},{id:`2.4-factor`,updatedAt:`2026-05-29`,title:`因子分析`,chapter:9,description:`目に見えない「性格」や「価値観」を、アンケートデータからあぶり出す。`,content:`💡 **このモジュールで学ぶこと**

「アンケートの10問の回答には、目に見えない『性格』が影響しているはず」この仮説を検証するのが因子分析です。このモジュールでは、観測変数の背後に潜む**共通因子**を発見する仕組みと、主成分分析との本質的な違いを学びます。

💡 **「3つの症状の背後に1つの病気」のような潜在構造**

「発熱・倦怠感・頭痛」という3つの症状は、「インフルエンザ（共通因子）」という目に見えない原因から生まれているかもしれません。因子分析はこれと同じ発想で、複数の観測変数の共通原因（共通因子）を統計的に探し出します。

10問の性格診断アンケートを例にすると：
- 「人前で話すのが得意か」「友人が多いか」「パーティーが好きか」→ すべて「外向性」から生まれている
- 「細部にこだわるか」「計画的か」「きれい好きか」→ すべて「誠実性」から生まれている

---

### 1. 因子分析のモデル

「外向性が高い人は、①人前で話すのが得意で、②友人が多く、③パーティーが好き」この3つの観測変数が1つの潜在変数（外向性）によって引き起こされているとしたら、どう数式で表せるでしょうか。因子分析の基本モデルは、各観測変数を「共通因子の線形結合＋その変数固有のノイズ」で表します。

$$x_j = \\lambda_{j1} F_1 + \\lambda_{j2} F_2 + \\cdots + \\lambda_{jm} F_m + u_j$$

- $x_j$：観測変数（アンケートの各回答）
- $F_k$：**共通因子**（目に見えない「性格」など）
- $\\lambda_{jk}$（ラムダ）：**因子負荷量**。変数 $j$ が因子 $k$ にどれだけ依存するかを示す係数。$-1$〜$1$ の値をとり、絶対値が大きいほど「その因子を強く反映している」
- $u_j$：**独自因子**。その変数だけに固有のばらつき

矢印で描くと、このモデルは次のようなパス図になります。

[[f-factor-path]]

このモデル、どこかで見たことがないでしょうか？主成分分析とよく似た構造です。では何が本質的に違うのでしょう？

💡 **PCAとの違い**

主成分分析（PCA）と因子分析（FA）は似ていますが、出発点が正反対です。PCAは「全分散（共通分散＋独自分散）を最大限保持する軸を探す」データを圧縮することが目的です。一方、因子分析は「共通分散（変数間に共通する部分）だけを説明する潜在因子を探す」隠れた原因を発見することが目的です。PCAの出力は「主成分（軸）」であるのに対し、FAの出力は「因子（解釈可能な概念）」です。

⚠️ **よくある誤解**：「PCA と因子分析は本質的に同じで、計算手順が少し違うだけ」と思いがちですが、誤りです。両者は**モデルの向きが正反対**です。PCA は「観測変数 → 合成された主成分」と**観測値から軸を作る**のに対し、因子分析は「潜在因子 → 観測変数」と**潜在変数モデルとして観測値を生成**します。因子分析にはモデル誤差項 $u_j$（独自因子）が明示的に存在し、PCA にはありません。「結果が似ているから」と混同すると、独自因子の解釈や因子回転の意味を見失います。

---

### 2. 因子回転：解釈しやすい因子へ

例えば、「計画的か」という変数が「誠実性」にも「知性」にも同程度の負荷量を持つ場合、「この変数は何を反映しているのか」解釈に迷います。そこで軸を回転させて、各変数が「一つの因子にだけ強く反応する」構造を目指します。これが**因子回転**です。

因子分析の解は一意ではなく、回転しても同じデータを説明できます。どの向きに回転させるかで2種類の方針があります：

- **バリマックス回転（直交回転）**：各変数が「一つの因子だけに強く負荷する」ようにする。因子間の独立性を維持
- **プロマックス回転（斜交回転）**：因子間の相関を許す。実際の「性格」は互いに相関することが多いため、より現実に近い場合がある

---

### 3. 因子数の決め方と共通性

💡 **因子数の決め方**

何個の因子を抽出するかを決める基準として以下があります：
- **カイザー基準**：固有値が 1 以上の因子のみを採用する（標準化変数の分散 1 を超える情報量を持つ因子）
- **スクリープロット法（エルボー法）**：固有値のグラフが急激に平坦になる「肘の部分」より上の因子を採用する

🎯 **押さえどころ：共通性**

変数 $j$ の分散の中で、共通因子によって説明できる割合が**共通性**です。各行の因子負荷量の二乗和 $h_j^2 = \\lambda_{j1}^2 + \\lambda_{j2}^2 + \\cdots$ として計算されます。共通性が低い変数は、因子には捕捉されていない独自のばらつきが大きいことを意味します。

---

### 4. 回転の使い分け（直交 vs 斜交）

因子回転には大きく分けて2つの流派があります。どちらを選ぶかで「解釈のしやすさ」と「現実の心理学的妥当性」のどちらを優先するかが変わります。

- **直交回転（Varimax・Quartimax 等）**：因子間の相関を 0 に固定する回転。各因子が独立した次元を表すため、解釈が単純で報告も明快です。
- **斜交回転（Promax・Oblimin 等）**：因子間に相関を許す回転。心理学・社会科学では「言語能力」と「数理能力」のように、潜在因子が互いに相関する場面が多く、現実をより忠実に反映できます。

🎯 **押さえどころ：直交 vs 斜交の比較表**

| 観点 | 直交回転（Varimax） | 斜交回転（Promax） |
|---|---|---|
| 因子間独立性の仮定 | 因子間相関を 0 に強制 | 因子間相関を許容 |
| 計算 | 比較的単純（1段階） | 直交回転後に追加変換 |
| 解釈の容易さ | 各因子が独立で明快 | 因子間の関係も加味して解釈 |
| 推奨場面 | 因子が概念的に独立とみなせるとき／工学・品質管理 | 心理学・教育・社会科学のような現実的な潜在概念 |

💡 **因子負荷量行列（loading matrix）の読み方**

回転後の因子負荷量行列は、行が観測変数・列が因子で構成されます。実務では次の目安で読みます。

- $|\\lambda_{jk}| \\geq 0.4$：その変数は因子 $k$ と関連が強い（採用）
- $0.3 \\leq |\\lambda_{jk}| < 0.4$：境界的・補助的に解釈
- $|\\lambda_{jk}| < 0.3$：無視してよい

例えば「責任感がある」「計画的だ」「約束を守る」の 3 項目がすべて第1因子に 0.7 以上の負荷を持ち、他因子では 0.2 未満であれば、第1因子は「誠実性」と命名できます。逆に、複数因子に 0.4 以上の負荷を持つ項目（クロスローディング）は単純構造を乱すため、項目削除や因子数の再検討の対象になります。

---

### 5. PCA vs 因子分析の使い分け

PCAと因子分析はモデル構造が異なるため、目的によって明確に使い分ける必要があります。

- **PCA**：分散を最大化する直交軸を順に抽出する手法。観測変数の線形結合として主成分を作る（合成）。データ圧縮・可視化が主目的。
- **因子分析**：観測変数の背後に潜む潜在因子を推定する統計モデル。観測変数が「共通因子 + 独自因子」の和で表せると仮定する（モデルベース）。潜在構造の発見が主目的。

🎯 **押さえどころ：PCA vs 因子分析の使い分け表**

| 観点 | PCA | 因子分析 |
|---|---|---|
| 目的 | 次元削減・データ圧縮 | 潜在構造の発見・仮説検証 |
| モデル | 観測変数の合成（成分は変数から作る） | 因子が観測変数を生み出す（潜在変数モデル） |
| 扱う分散 | 全分散（共通＋独自＋誤差） | 共通分散のみ |
| 出力 | 主成分（軸そのもの） | 因子（解釈可能な概念） |
| 独自因子 $u_j$ | 明示しない | 明示的にモデル化 |
| 典型用途 | 画像圧縮・指標合成・前処理 | アンケート分析・心理尺度開発 |

💡 **判断の目安**：「変数を減らしたい・指標を合成したい」なら PCA、「変数の裏にある概念を見つけたい」なら因子分析、と覚えると迷いません。`,keyFormulas:[{label:`因子モデル`,formula:`x_j = \\lambda_{j1}F_1 + \\cdots + \\lambda_{jm}F_m + u_j`},{label:`共通性`,formula:`h_j^2 = \\lambda_{j1}^2 + \\lambda_{j2}^2 + \\cdots + \\lambda_{jm}^2`}],quiz:[{id:`f1-1`,question:`因子分析において「目に見えない共通の要因」を何と呼ぶか？`,options:[`独自因子`,`固有ベクトル`,`主成分`,`共通因子`],correctAnswer:3,explanation:`因子分析は「なぜ複数の変数が互いに相関するのか」を「共通の潜在因子が複数の変数に影響するから」と説明するモデルです。例えばテストの数学・物理・化学の得点が相関するのは「理系的思考力」という共通因子が背景にあると解釈します。PCAが全分散を説明する軸を探すのと異なり、因子分析は共通分散の構造を探します。`},{id:`f1-2`,question:`因子負荷量 $\\lambda_{jk}$ は何を表すか？`,options:[`変数 $j$ と因子 $k$ の相関の強さ`,`因子 $k$ の固有値`,`観測値の平均`,`変数 $j$ の分散`],correctAnswer:0,explanation:`因子負荷量 $lambda_{jk}$ は変数 $j$ と因子 $k$ の相関係数で、$-1 \\leq lambda_{jk} \\leq 1$ の範囲をとります（直交回転の場合）。$|lambda_{jk}| \\geq 0.4$ が「その変数がその因子に有意に関連する」目安とされます。因子負荷量の絶対値を二乗したものが「変数 $j$ の分散のうちその因子で説明される割合」です。`},{id:`f1-3`,question:`変数の分散のうち共通因子で説明できる割合を何と呼ぶか？`,options:[`信頼性係数`,`共通性`,`VIF`,`寄与率`],correctAnswer:1,explanation:`共通性（communality）$h_j^2 = sum_k lambda_{jk}^2$ は「変数 $j$ の分散のうち共通因子全体で説明できる割合」です。$h_j^2$ が高い（1に近い）変数は共通因子をよく反映し、低い（0に近い）変数は独自因子（その変数固有のばらつき）が大きいことを意味します。因子数を増やすほど共通性は上がります。`},{id:`f1-4`,question:`バリマックス回転の特徴は？`,options:[`共通性を最大化する`,`因子間の相関を許す`,`各変数が1つの因子にのみ強く負荷するよう調整する（直交回転）`,`因子数を自動決定する`],correctAnswer:2,explanation:`バリマックス回転は各変数の因子負荷量の2乗の分散を最大化することで、「ある変数は特定の因子に大きく・他の因子にはほぼゼロ」という単純構造（simple structure）を求めます。因子間が直交（相関ゼロ）に保たれるため、各因子が独立した次元を表します。解釈が容易で最も広く使われる回転法です。`},{id:`f1-5`,question:`プロマックス回転がバリマックス回転と異なる点は？`,options:[`共通性を1に固定する`,`固有値を変える`,`計算が速い`,`因子間の相関を許す（斜交回転）`],correctAnswer:3,explanation:`斜交回転（プロマックスなど）は因子間の相関を許します。現実の潜在変数（例えば「言語能力」と「非言語能力」）は互いに相関することが多く、直交を強制するバリマックスより適合が改善することがあります。ただし因子間に相関があるため、各因子の解釈が単独でなく他の因子との関係を考慮して行う必要があります。`},{id:`f1-6`,question:`因子分析と主成分分析の最大の違いは？`,options:[`因子分析は共通分散のみを扱い、主成分分析は全分散を扱う`,`変数の数の制限`,`計算方法`,`使うデータの種類`],correctAnswer:0,explanation:`PCAは「分散の最大化」を目的に全分散（共通分散＋固有分散＋測定誤差）を扱い、データの要約・次元削減が主目的です。因子分析は「変数間の相関を潜在因子で説明する」ことを目的に共通分散のみをモデル化します。実用上は「データ圧縮→PCA、潜在構造の発見→因子分析」と使い分けます。`},{id:`f1-7`,question:`因子分析で何個の因子を抽出するかを決める基準として、固有値が 1 以上という基準を何と呼ぶか？`,options:[`バリマックス基準`,`カイザー基準`,`AIC基準`,`エルボー基準`],correctAnswer:1,explanation:`カイザー基準は「固有値 $\\geq 1$ の因子を採用する」基準です。相関行列を使った場合、各標準化変数の分散は1.0なので、固有値1未満の因子は元の変数1本よりも情報量が少いという論拠があります。実務では固有値1付近の因子を前後に追加・削除したときの解釈性も考慮して最終的な因子数を決定します。`},{id:`f1-8`,question:`独自因子 $u_j$ が表すものは何か？`,options:[`標本誤差`,`変数間の共通構造`,`その変数固有の独立したばらつき`,`測定の単位`],correctAnswer:2,explanation:`独自因子（unique factor）$u_j$ は変数 $j$ の「共通因子以外のばらつき」で、測定誤差と変数固有の真のばらつきの両方を含みます。変数 $j$ の分散 $= h_j^2$（共通性）$+ psi_j$（独自分散）に分解されます。独自分散が大きい変数は因子分析で説明しきれない部分が多く、測定の信頼性が低い可能性があります。`},{id:`f1-9`,question:`因子分析はどのような目的で主に使われるか？`,options:[`グループ間の平均差を検定する`,`変数間の回帰係数を推定する`,`将来の値を予測する`,`観測変数の背後にある潜在構造を発見する`],correctAnswer:3,explanation:`因子分析の主な用途：①探索的因子分析（EFA）：潜在構造の仮説を持たずデータから因子を発見する、②確認的因子分析（CFA）：事前に想定した因子構造がデータに適合するか検証する。EFAは探索段階で、CFAは共分散構造分析（SEM）の測定モデルとして理論を検証する段階で使われます。`},{id:`f1-10`,question:`因子分析において、因子行列の回転を行う主な目的は？`,options:[`推定精度を上げる`,`解釈しやすい因子構造を得る`,`共通性を大きくする`,`因子数を減らす`],correctAnswer:1,explanation:`因子分析の解（因子負荷量行列）は直交変換に対して不定性があり、同じデータに対して無数の解が存在します。回転はこの不定性を利用して「解釈しやすい」因子構造を選ぶ操作です。単純構造（各変数が特定の因子に大きく・他の因子にはほぼ0に負荷する）を目指すことで、各因子が何を表すかを明確に解釈できるようになります。`}]},{id:`2.7-multivariate`,updatedAt:`2026-10-18`,title:`正準相関・対応分析・共分散構造分析`,chapter:9,description:`多次元尺度法・正準相関分析・対応分析・共分散構造分析の4手法を、扱うデータの型と答える問いで整理します。`,content:`💡 **このモジュールで学ぶこと**

「理系科目の成績と文系科目の成績は、全体としてどれくらい関連しているか？」「職業と政党支持を同じ図の上に配置して関連を見たい」「学力という見えない概念を複数のテスト得点で測るモデルを作りたい」これらはPCA・判別分析・クラスター分析だけでは答えられません。このモジュールでは、そのような問いに答える多変量解析の手法群を学びます。公式の出題範囲表の多変量解析に挙がる、正準相関・対応分析・共分散構造分析（構造方程式モデル）を中心に扱います。

---

### 1. 多次元尺度法

「東京・大阪・名古屋・福岡の都市間距離から、地図上の位置関係を再現できるか？」このような問いに答えるのが**多次元尺度法**（MDS: Multidimensional Scaling）です。

$n$ 個の対象間の**非類似度（距離）行列**を与えると、それを近似的に再現する低次元（通常2次元）空間上の座標を求めます。「距離が近いもの同士を地図上で近くに配置する」操作です。

主成分分析が「変数の次元削減」なら、MDSは「対象間の距離を保ちながら次元削減」です。実際に4都市の距離だけから位置を復元してみます。

[[f-mds]]

**メトリックMDS**：距離を数値として使います。**ノンメトリックMDS**：順位情報だけを使います（「$i$ と $j$ は $i$ と $k$ より近い」という順序のみ）。

MDSは「対象間の距離」を使いましたが、次は「2つの変数グループ間の関係」を分析する手法を見ます。

---

### 2. 正準相関分析

「数学・理科の成績（変数セット$X$）と国語・英語の成績（変数セット$Y$）は全体としてどれだけ関連しているか？」これを答えるのが**正準相関分析**（Canonical Correlation Analysis）です。

2組の変数セット $\\mathbf{X}$（$p$ 変数）と $\\mathbf{Y}$（$q$ 変数）に対して、**正準変数**の組 $(U_k, V_k)$ を：

$$U_k = \\mathbf{a}_k^\\top \\mathbf{X}, \\quad V_k = \\mathbf{b}_k^\\top \\mathbf{Y}$$

$U_k$ と $V_k$ の相関（**正準相関係数** $\\rho_k^*$）が最大になるように $\\mathbf{a}_k, \\mathbf{b}_k$ を選びます。

$\\min(p, q)$ 組の正準対が存在し、各組は前の組と無相関になります。これはPCAの2変数版への拡張と見ることができます。

**数値例**：数学・理科（$X_1, X_2$）と国語・英語（$Y_1, Y_2$）の得点を標準化し、相関が次のとおりだったとします（架空の値です）。

| 組 | 相関 |
| --- | --- |
| 数学と理科 | $0.6$ |
| 国語と英語 | $0.5$ |
| 数学と国語、理科と英語 | $0.4$ |
| 数学と英語、理科と国語 | $0.3$ |

$X$ と $Y$ の間の相関は、どの1組を取っても最大 $0.4$ です。ところが、各組の合計点どうし（$U_1\\propto X_1+X_2$、$V_1\\propto Y_1+Y_2$）を取ると、相関は $\\rho_1^* = \\dfrac{0.4+0.3}{\\sqrt{(1+0.6)(1+0.5)}} \\approx 0.45$ に上がります。理系の総合力と文系の総合力のあいだの関連を、個々の科目よりよく捉えているわけです。第2の組は、差の得点（$U_2\\propto X_1-X_2$、$V_2\\propto Y_1-Y_2$）で、$\\rho_2^* = \\dfrac{0.4-0.3}{\\sqrt{(1-0.6)(1-0.5)}} \\approx 0.22$ です。意味は「数学寄りか理科寄りか」と「国語寄りか英語寄りか」の対応で、第1の組と無相関になります。$\\min(p,q)=2$ なので、組はここまでです。

⚠️ **よくある誤解**：「正準相関分析は重回帰分析の多変量版で、$X$ から $Y$ を予測する手法」と思いがちですが、誤りです。**正準相関分析は $X$ と $Y$ について対称な手法**で、「$X$ から $Y$ を予測する」のではなく「$X$ と $Y$ の間でもっとも相関が高い線形結合のペア $(U_k, V_k)$ を探す」分析です。$X$ と $Y$ を入れ替えても同じ正準相関係数 $\\rho_k^*$ が得られます。一方、重回帰では「説明変数 → 目的変数」の方向が固定されているため、変数の役割を入れ替えると結果が変わります。

正準相関は「数値変数のグループ間の関係」を見ましたが、次は変数がカテゴリ（名義尺度）のときの視覚化手法を見ます。

---

### 3. 対応分析

「職業と政党支持の2元分割表から、どの職業がどの政党を支持しやすいかを可視化したい」これが**対応分析**（Correspondence Analysis）の典型的な使い方です。

行カテゴリと列カテゴリを同一の低次元空間に布置し、「近い点は関連が強い」という解釈をします。分割表データを可視化する強力な探索的手法です。

基本的には分割表の行・列プロフィールに対して特異値分解（SVD: 行列を「成分に分解する」操作で、PCAの計算にも使われる行列の基本操作）を適用します。主成分分析のカテゴリデータ版と考えられます。

**数値例**：240人に年代と好きな飲み物を聞いた架空のデータです。各年代80人ずつで、次の分割表になりました。

| | コーヒー | 紅茶 | 緑茶 | ジュース | 計 |
| --- | --- | --- | --- | --- | --- |
| 20代 | 30 | 10 | 5 | 35 | 80 |
| 40代 | 25 | 25 | 20 | 10 | 80 |
| 60代 | 10 | 20 | 45 | 5 | 80 |
| 計 | 65 | 55 | 70 | 50 | 240 |

各年代の中での割合（行プロフィール）で見ると、好みの違いがはっきりします。

| | コーヒー | 紅茶 | 緑茶 | ジュース |
| --- | --- | --- | --- | --- |
| 20代 | 37.5% | 12.5% | 6.3% | 43.8% |
| 40代 | 31.3% | 31.3% | 25.0% | 12.5% |
| 60代 | 12.5% | 25.0% | 56.3% | 6.3% |
| 全体 | 27.1% | 22.9% | 29.2% | 20.8% |

年代と飲み物が独立なら、どの年代の行も一番下の「全体」と同じ割合になるはずです。このずれを、分割表の独立性検定（3.4）と同じ計算で測ると $\\chi^2 = 82.4$（自由度6）です。これを人数 $n=240$ で割った $0.343$ を**全慣性**と呼び、人数によらず「独立からどれだけずれているか」を表します。対応分析は、この全慣性を軸ごとに振り分ける手法です。軸の数は $\\min(3,4)-1=2$ 本までで、第1軸が $0.307$（**寄与率** 89.6%）、第2軸が $0.036$（10.4%）を受け持ちます。

[[f-ca]]

図の読み方は次のとおりです。

- 第1軸は左の「若い・甘い飲み物」から右の「高齢・緑茶」への並びです。20代はジュースとコーヒーの近く、60代は緑茶の近くにあります
- 第2軸は、40代と紅茶を、両端の年代から切り離す方向です。40代は両極のどちらにも寄らず、紅茶の近くに出ます
- 四角どうし、丸どうしの距離は、プロフィールの似かたを表します。四角と丸の距離そのものは厳密には比べられないので、「どちらの方向にあるか」で読みます

**数量化法**（Hayashi's Quantification Methods）は対応分析と関連する日本発の手法群で、カテゴリデータを扱う多変量解析に対応します。具体的には：

- **数量化I類**：カテゴリ変数（説明変数）をもつ**重回帰分析**に対応（目的変数は連続量）
- **数量化II類**：カテゴリ変数をもつ**判別分析**に対応
- **数量化III類**：**対応分析**（カテゴリデータの主成分分析）に対応
- **数量化IV類**：**クラスター分析**に対応

🎯 **つまずきやすい点**：「どの類がどの分析に対応するか」は混同しやすい対応です（I=回帰・II=判別・III=対応分析・IV=クラスター）。

対応分析が「観測変数間の関係」を可視化するのに対し、次は「直接測れない概念（潜在変数）」を含む因果構造をモデル化する手法を見ます。

---

### 4. 共分散構造分析（SEM）

「学力（潜在変数）は語彙力・読解力・計算力（観測変数）で測られる」このような「観測できない概念（潜在変数）」を含む因果関係をモデル化するのが**共分散構造分析**（SEM: Structural Equation Modeling）です。

SEMは2つのサブモデルからなります：
- **測定モデル**（因子分析部分）：潜在変数と観測変数の関係
- **構造モデル**（パス解析部分）：潜在変数間の因果関係

**パス図**（Path Diagram）：変数を四角（観測変数）や楕円（潜在変数）、矢印（因果・共分散）で表した図。

**パス係数**：矢印の重みで「原因変数が1標準偏差変化したとき、結果変数が何標準偏差変化するか」を表します。

モデルの適合度は $\\chi^2$ 検定・CFI（比較適合指標）・RMSEA（二乗平均平方根近似誤差）などで評価します。

🎯 **つまずきやすい点**：SEMでは「因果」は理論から来ます。矢印の向きはデータから決まるのではなく、研究者の理論的仮説を反映します。

---

### 5. 3手法の使い分け（正準相関・対応分析・SEM）

このモジュールで扱った 3 つの手法（正準相関・対応分析・SEM）は「2 つ以上の変数群の関係を捉える」という共通点がありますが、扱うデータ型と目的が異なります。

- **正準相関分析（CCA）**：2 セットの**量的変数群**の関連を、相関が最大になる線形結合のペアとして抽出します。例：学力テスト群（数学・国語・英語）と性格特性群（外向性・誠実性）の関係を全体として把握したい場面。
- **対応分析**：**質的変数（カテゴリ）**の関連を低次元プロットで可視化します。例：年代×購買カテゴリのクロス表から「20 代は化粧品、50 代は健康食品」といった対応関係を散布図で示したい場面。
- **共分散構造分析（SEM）**：**潜在変数を含む構造モデル全体**の適合度を検証します。例：「ストレス → 不眠 → 疲労」という因果モデルがデータに整合するかを確かめたい場面。

🎯 **押さえどころ：3手法の比較表**

| 観点 | CCA | 対応分析 | SEM |
|---|---|---|---|
| データ型 | 量的変数 × 2 セット | カテゴリ変数（分割表） | 量的変数（潜在変数を含む） |
| 目的 | 2 群間の最大相関構造を抽出 | カテゴリ間の関連を可視化 | 因果モデル全体の検証 |
| 出力 | 正準変数ペアと正準相関係数 | 低次元の散布図（バイプロット） | パス係数・適合度指標（CFI・RMSEA 等） |
| 必要サンプルサイズ | 中程度（変数の 10 倍程度） | 比較的少なくても可 | 大標本推奨（200 以上が目安） |
| 探索的/確認的 | 探索的 | 探索的 | 主に確認的 |

💡 **判断の目安**：データが量的か質的かでまず CCA・SEM と対応分析を分け、量的の場合「単に関連の強さを見たい」なら CCA、「因果構造を検証したい」なら SEM と進むと迷いません。

---

### 6. 多変量解析の選択フロー

多変量解析の手法は数が多く、目的に応じた選択が重要です。「何を知りたいか」から逆算するフローで覚えると整理しやすくなります。

**ステップ 1：目的を分類する**

- **関連の構造を見たい**
  - 探索的に構造を探す → **因子分析**・**主成分分析（PCA）**・**正準相関分析（CCA）**
  - 確認的に仮説モデルを検証 → **共分散構造分析（SEM）**
- **グループ化したい**
  - グループラベルが**ない**（教師なし）→ **クラスター分析**
  - グループラベルが**ある**（教師あり）→ **判別分析**・**ロジスティック回帰**
- **カテゴリ変数の関連を見たい**
  - 低次元で可視化 → **対応分析**（数量化 III 類）
  - 独立性の検定 → **分割表分析**（カイ二乗検定）

**ステップ 2：データ型を確認する**

| 目的変数 | 説明変数 | 推奨手法 |
|---|---|---|
| 量的 | 量的 | 重回帰・PCA・因子分析 |
| 量的 | 質的 | 数量化 I 類・分散分析 |
| 質的（2 値） | 量的 | ロジスティック回帰・判別分析 |
| 質的 | 質的 | 数量化 II 類・対応分析 |
| なし（教師なし） | 量的・質的混合 | クラスター分析・多次元尺度法 |

💡 **判断の目安**：「目的（要約・分類・予測・検証）」と「データ型（量的・質的）」の 2 軸を最初に決めれば、手法は自動的に絞り込めます。「○○を分析したいとき、どの手法を使うか」で迷わないよう、このフローで手法を絞り込む練習をしておくと整理できます。`,keyFormulas:[{label:`正準相関変数`,formula:`U_k = \\mathbf{a}_k^\\top \\mathbf{X},\\quad V_k = \\mathbf{b}_k^\\top \\mathbf{Y}`}],quiz:[{id:`mv1-1`,question:`多次元尺度法（MDS）の入力と出力を正しく説明したものはどれか？`,options:[`対象間の非類似度（距離）行列を入力し、低次元の座標を出力する`,`ラベル付きデータを入力し分類規則を出力する`,`時系列データを入力しARIMAモデルを出力する`,`変数の共分散行列を入力し因子を出力する`],correctAnswer:0,explanation:`MDSは対象間の非類似度（距離）行列を入力とし、距離関係を保ちながら低次元（通常2次元）の座標を出力します。主成分分析が「変数の次元削減」であるのに対し、MDSは「対象間の距離関係を保った次元削減」です。`},{id:`mv1-2`,question:`正準相関分析が答える問いはどれか？`,options:[`1組の変数セットの内部の主成分を見つける`,`2組の変数セット間の最大相関を見つける`,`変数をカテゴリに分類する`,`1変数を複数変数で予測する`],correctAnswer:1,explanation:`正準相関分析は2組の変数セット（$\\mathbf{X}$ と $\\mathbf{Y}$）の間の関係を、相関が最大になる線形結合（正準変数 $U, V$）のペアとして見つけます。「両セットが全体としてどれほど関連するか」を捉えます。`},{id:`mv1-3`,question:`対応分析（Correspondence Analysis）が主に使われるデータの種類はどれか？`,options:[`二値目的変数のデータ`,`連続変数の相関行列`,`カテゴリ変数の分割表`,`時系列データ`],correctAnswer:2,explanation:`対応分析は2元分割表（行・列がカテゴリ）のデータを低次元空間に可視化する手法です。「どの行カテゴリとどの列カテゴリが関連しているか」を散布図のように表示します。`},{id:`mv1-4`,question:`共分散構造分析（SEM）の「潜在変数」とは何か？`,options:[`欠測している変数`,`カテゴリ変数を数値化したもの`,`観測されるが誤差を含む変数`,`直接観測できない理論的概念（観測変数で測定される）`],correctAnswer:3,explanation:`潜在変数（latent variable）は「学力」「知能」「満足度」のように直接測れない理論的概念です。複数の観測変数（テスト得点など）を通じて間接的に測定されます。因子分析の因子も潜在変数の一種です。`},{id:`mv1-5`,question:`SEMのパス図において楕円で表されるのはどれか？`,options:[`潜在変数`,`誤差項`,`共分散の矢印`,`観測変数`],correctAnswer:0,explanation:`SEMのパス図では四角が観測変数（直接測定可能）、楕円が潜在変数（観測不可）、矢印が因果・回帰の方向、両頭矢印が共分散・相関を表します。`},{id:`mv1-6`,question:`ノンメトリックMDSが入力として使う情報はどれか？`,options:[`対象間の距離の数値そのもの`,`対象間の距離の大小関係（順位）だけ`,`各対象の変数の値の平均`,`対象を分けるグループのラベル`],correctAnswer:1,explanation:`ノンメトリックMDSは「$i$ と $j$ の距離は $i$ と $k$ の距離より小さい」といった順序情報だけを使い、その順序を保つ配置を探します。距離の数値を使うのがメトリックMDSです。アンケートの類似度評定のように、数値の間隔に自信がないデータで使われます。`},{id:`mv1-7`,question:`正準相関分析で、$\\mathbf{X}$ と $\\mathbf{Y}$ の役割を入れ替えたときの結果として正しいものはどれか？`,options:[`正準相関係数は変わらない`,`正準相関係数は逆数になる`,`$\\mathbf{Y}$ を目的変数とみなすため係数が変わる`,`第1正準相関だけが変わる`],correctAnswer:0,explanation:`正準相関分析は $\\mathbf{X}$ と $\\mathbf{Y}$ について対称な手法で、どちらを先に置いても同じ正準相関係数 $\\rho_k^*$ が得られます（重みベクトル $\\mathbf{a}_k, \\mathbf{b}_k$ の役割が入れ替わるだけです）。「$\\mathbf{X}$ から $\\mathbf{Y}$ を予測する」重回帰とはここが違います。`},{id:`mv1-8`,question:`数量化I類が対応する分析はどれか？`,options:[`分割表の可視化`,`クラスター分析`,`カテゴリ変数をもつ判別分析`,`カテゴリ変数をもつ重回帰分析`],correctAnswer:3,explanation:`数量化I類は目的変数が連続量でカテゴリ変数（説明変数）を持つ回帰分析に対応します。数量化II類は判別分析、数量化III類は対応分析（主成分分析）、数量化IV類はクラスター分析に対応します。`},{id:`mv1-9`,question:`SEMにおいて「モデルの適合度」を評価する指標として誤っているものはどれか？`,options:[`AUC（1に近いほど良い）`,`$\\chi^2$ 値（小さいほど良い）`,`CFI（比較適合指標、1に近いほど良い）`,`RMSEA（小さいほど良い、0.05以下が目安）`],correctAnswer:0,explanation:`AUCは分類モデル（ROC曲線）の評価指標でSEMには使いません。SEMでは $\\chi^2$（帰無仮説「完全適合」の検定）、CFI・TLI（比較的増分指標、$\\geq 0.95$ が目安）、RMSEA（$\\leq 0.05$ が良好）などを使います。`},{id:`mv1-10`,question:`「年代（5区分）と好きな飲料（6種類）のクロス表を、1枚の散布図で見たい」ときに最も適した手法はどれか？`,options:[`共分散構造分析`,`正準相関分析`,`対応分析`,`ロジスティック回帰`],correctAnswer:2,explanation:`行も列もカテゴリの分割表を、行と列を同じ平面に布置して「近い点は関連が強い」と読むのが対応分析です。正準相関分析は量的変数の2群、共分散構造分析は潜在変数を含む因果モデルの検証が目的で、どちらも分割表の可視化には向きません。`}]},{id:`2.3-discriminant`,updatedAt:`2026-10-21`,title:`判別分析とマハラノビス距離`,chapter:9,description:`「どのグループに属するか」を数式で判定し、外れ値を正確に見抜く技術。`,content:`💡 **このモジュールで学ぶこと**

「このメールはスパムか？」「この患者はどの病気か？」データの特徴を使って「どのグループに属するか」を判定したい。このモジュールでは、グループ間の差を最大化する**判別分析**の仕組みと、データの形状を考慮した距離の測り方（**マハラノビス距離**）を学びます。

💡 **「病院の診断」のような多次元の振り分け**

血液検査の結果（白血球数・赤血球数・血小板数…）だけで「健康・貧血・感染症・白血病」のどのグループに属するかを判定します。これが判別分析の本質です。

1つの数値だけでは判断しにくくても、**複数の検査値を組み合わせた「判別スコア」**を計算することで、かなり正確な振り分けができるようになります。

---

### 1. 線形判別分析（LDA）の仕組み

**具体例**：スパムメール判定を考えます。メールの特徴を「単語"無料"の出現回数」と「リンク数」の2変数で表したとき、スパムと正常メールをどう分けるか？

LDAは「グループ間の差を最大化し、グループ内のばらつきを最小化する」境界線を引きます。**フィッシャーの線形判別規準**とも呼ばれます。

$$w = S_W^{-1}(\\mu_1 - \\mu_2)$$

（右上の $^{-1}$ は「逆行列」、行列の世界での「割り算」に相当する操作です）

- $S_W$（$\\Sigma_W$ とも書く）：グループ内の分散共分散行列（各グループのデータがどの方向にどれだけ広がっているかを表す数字の表）
- $\\mu_1, \\mu_2$：各グループの平均ベクトル
- $w$：最適な判別方向（境界線に垂直な方向）

新しいデータ $x$ はこの方向 $w$ に射影した値を閾値と比較してグループを決定します。

2群が斜めの楕円状に広がっている場合の境界は、次の図のようになります。

[[f-lda]]

グラフで2つのグループの形と、判別境界がどう引かれるかを観察してください。
[[interactive:outlier]]

このグラフから、判別関数がグループの分布の形（分散共分散構造）を考慮した境界線を引いていることが分かります。

判別境界を引くには「新しいデータが各グループからどれだけ離れているか」を測る必要があります。では、データが楕円形に広がっているとき、この「離れ具合」をどう測るのが適切でしょうか？

---

### 2. マハラノビス距離：「形を考慮した距離」

普通のユークリッド距離は「円形」で測りますが、データは楕円形に分布することが多いです。例えば「身長と体重の関係」では、どちらも「平均 $\\pm 1\\sigma$」の範囲に収まることが多く、外れ値の判断には「楕円形の等高線」を使うべきです。

マハラノビス距離はデータの形（分散共分散行列 $\\Sigma$（シグマ。**注：正規分布の標準偏差 $\\sigma$ とは別の記号**で、ここでは「分散の表（行列）」を意味します））を考慮して測ります：

$$D^2(\\mathbf{x}) = (\\mathbf{x} - \\boldsymbol{\\mu})^T \\Sigma^{-1} (\\mathbf{x} - \\boldsymbol{\\mu})$$

（式中の $^T$ は「転置」、行列の行と列を入れ替える操作。$\\Sigma^{-1}$ は分散行列の逆行列です。式全体は「データ点 $\\mathbf{x}$ が平均 $\\boldsymbol{\\mu}$ からどれだけ離れているか」を分布の形を考慮して測っています）

- データが広がっている方向は「大した距離ではない」と判断
- データが少ない方向に外れると「異常」と判断
- **$\\Sigma$ が単位行列のとき**はユークリッド距離の二乗に退化します

🎯 **押さえどころ：判別分析 vs ロジスティック回帰**
- **判別分析**：各グループが多変量正規分布に従うと仮定。分散が等しいなら線形境界
- **ロジスティック回帰**：分布の仮定が緩やか。実務ではより広く使われる

---

### 3. 判別モデルの評価

判別のパフォーマンスは**混同行列（Confusion Matrix）**で評価します。混同行列は「実際のクラス」と「予測したクラス」の組み合わせを2×2の表で整理したものです。

- **TP（True Positive）**：本物のスパムを正しくスパムと判定（正解の陽性）
- **FP（False Positive）**：正常メールを誤ってスパムと判定（偽陽性。第1種の過誤）
- **FN（False Negative）**：本物のスパムを見逃して正常と判定（偽陰性。第2種の過誤）
- **TN（True Negative）**：正常メールを正しく正常と判定（正解の陰性）

この4つの組み合わせから、目的に応じた評価指標が導かれます。

- **再現率**（Recall）：本物のスパムを正しく検出できた割合 $= TP/(TP+FN)$。見逃し（$FN$）を減らしたいときに重視します。例：がん検診。見逃しは命取りなので再現率を最優先
- **適合率**（Precision）：スパムと判定したうち本物の割合 $= TP/(TP+FP)$。誤検知（$FP$）を減らしたいときに重視します。例：スパムフィルター。重要メールを誤ってスパム扱いしたくないので適合率を優先

この「再現率vs適合率」のトレードオフは実務での判断ポイントです。どちらを優先するかはビジネス上のコスト（見逃しのコスト vs. 誤検知のコスト）によって決まります。

---

### 4. ROC曲線とAUC

「閾値（スパムと判定するための判別スコアの基準値）を変えるとどうなるか？」高くすれば見逃しが増えて誤検知が減り、低くすれば逆になります。このトレードオフを一枚のグラフで表したものが **ROC曲線**（Receiver Operating Characteristic Curve）です。

- **横軸（偽陽性率）**：本物の陰性（正常メール）をスパムと誤判定した割合 $= FP/(FP+TN)$
- **縦軸（真陽性率／感度）**：本物のスパムを正しく検出した割合 $= TP/(TP+FN)$

閾値を変えるにつれてこの2点が動き、曲線を描きます。**AUC**（Area Under the Curve）はこの曲線の下面積です：

- **AUC = 1.0**：すべての正例を負例より高スコアに排除できる完璧な分類器
- **AUC = 0.5**：ランダム分類（対角線）と同じで、判別能力ゼロ
- **AUC = 0.7〜0.8**：実用的なモデルの目安

🎯 **押さえどころ**：AUC は「ランダムに選んだ正例のスコアが負例のスコアより高い確率」と等価です（Wilcoxon-Mann-Whitney 統計量と一致）。

---

### 5. 2次判別分析（QDA）とSVM

**線形判別分析（LDA）**はグループ間で共通の分散共分散行列 $\\Sigma$ を仮定するため、境界線が直線（線形）になります。しかし各グループが異なる形（楕円の向き・大きさが違う）に分布するとき、線形境界は適合が悪くなります。

**2次判別分析（QDA: Quadratic Discriminant Analysis）**は各グループが異なる $\\Sigma_k$ を持つと仮定します。尤度の対数の差をとると $\\mathbf{x}$ の2次式になるため、判別境界が曲線（楕円・放物線など）になります。

- 利点：より柔軟な境界でグループの形状を正確に反映できる
- 欠点：各グループで $\\Sigma_k$ を推定するためパラメータが多く、サンプル数が少ないと不安定

📖 **サポートベクターマシン（SVM）**：各グループの境界から最も近いデータ点（サポートベクター）との距離（マージン）を最大化する判別境界を求める手法です。カーネル関数（多項式・RBFカーネルなど）を使って非線形境界も扱えます。準1級では「判別分析の代替法のひとつ」として押さえておきます。

---

### 6. 3群以上を分ける：正準判別分析

第1節の判別方向 $w = S_W^{-1}(\\mu_1 - \\mu_2)$ は2群のためのものでした。3群以上を、少ない本数の軸で見分けたいときに使うのが**正準判別分析**です。

例として、3つの品種の豆を15粒ずつ、長さと幅で見分けます（説明のための模擬データです）。大きい豆は長さも幅も大きいので、どの品種の中でも2つの値は一緒に増えます。

[[f-canonical-disc]]

軸の向きを $\\boldsymbol{a}$ とし、各データを $z = \\boldsymbol{a}^{\\top}\\boldsymbol{x}$（**正準得点**）に置き換えます。$z$ について、群の平均どうしのばらつき（群間平方和）と各群の中のばらつき（群内平方和）の比が最大になる $\\boldsymbol{a}$ を選びます。

$$\\max_{\\boldsymbol{a}}\\ \\frac{\\boldsymbol{a}^{\\top} B\\,\\boldsymbol{a}}{\\boldsymbol{a}^{\\top} W\\,\\boldsymbol{a}}$$

- $B$：群間平方和行列（群平均が全体平均からどれだけ散らばるか）、$W$：群内平方和行列
- 答えは $W^{-1}B$ の固有ベクトルで、固有値がそのときの比になる。固有値の大きい順に第1軸、第2軸と呼ぶ
- 軸は最大で「群の数 − 1」本と「変数の数」の少ない方まで。2群なら1本で、向きは第1節の $w$ と同じ

この例の第1軸は $z = 0.60 \\times \\text{長さ} - 0.80 \\times \\text{幅}$ で、幅の割に長いほど大きくなる「細長さ」です。群間と群内の比（F 値）で比べると、どちらの軸が品種をよく分けるかが分かります。

| 並べ方 | F 値 | 一番近い群平均に振り分けたときの誤り |
|---|---|---|
| 長さだけ | 24.9 | 45粒中18粒 |
| 幅だけ | 1.1 | — |
| 第1正準軸 | 81.7 | 45粒中7粒 |

この例では第2軸の固有値は第1軸の0.5%ほどで、品種の違いはほぼ第1軸1本に集まっています。変数が多いときも、上位の2本で散布図を描けば、群の分かれ方を平面で見られます。主成分分析が全体の散らばりの大きい向きを探すのに対し、正準判別は群の違いが大きい向きを探す点が違います。`,keyFormulas:[{label:`フィッシャー線形判別`,formula:`w = S_W^{-1}(\\mu_1-\\mu_2)`},{label:`マハラノビス距離`,formula:`D^2(\\mathbf{x}) = (\\mathbf{x}-\\boldsymbol{\\mu})^T\\Sigma^{-1}(\\mathbf{x}-\\boldsymbol{\\mu})`},{label:`ROC の AUC（解釈）`,formula:`\\begin{aligned} &AUC \\\\ &= P(\\text{正例スコア} > \\text{負例スコア}) \\end{aligned}`}],quiz:[{id:`disc1-1`,question:`判別分析の目的は何か？`,options:[`変数の数を減らすこと`,`データをグループに分類すること`,`時系列を予測すること`,`分散を分解すること`],correctAnswer:1,explanation:`判別分析は既知のグループラベル（教師あり学習）をもつ訓練データから判別関数を作り、新しいサンプルをどのグループに分類するかを予測します。主成分分析（教師なし）と異なりラベルを使う点が特徴です。判別能力はAUCや誤判別率で評価します。`},{id:`disc1-2`,question:`線形判別分析 (LDA) の基本戦略は？`,options:[`主成分を回転させる`,`グループ内分散を最大化する`,`グループ間分散を最大化し、グループ内分散を最小化する`,`全分散を均等にする`],correctAnswer:2,explanation:`LDAはフィッシャーの線形判別規準（群間分散/群内分散を最大化する射影方向を求める）に基づきます。等分散仮定（各群が同じ $\\Sigma$ を共有）のもとで判別境界が直線（線形）になります。PCAが分散を最大化する無監督の軸を求めるのと異なり、LDAは群を最もよく分離する有監督の軸を求めます。`},{id:`disc1-3`,question:`マハラノビス距離がユークリッド距離と異なる点は？`,options:[`常に小さくなる`,`計算が速い`,`次元数に依存しない`,`データの相関・分散構造を考慮する`],correctAnswer:3,explanation:`マハラノビス距離 $D^2 = (\\mathbf{x}-\\boldsymbol{\\mu})^\\top \\Sigma^{-1}(\\mathbf{x}-\\boldsymbol{\\mu})$ は $\\Sigma^{-1}$ によって変数のスケール・相関を補正します。例えば身長（cm）と体重（kg）の単位の違いを自動的に吸収します。ユークリッド距離は相関のある変数では等方的でないため、相関を考慮したマハラノビス距離が判別分析に適しています。`},{id:`disc1-4`,question:`マハラノビス距離の公式 $D^2 = (x-\\mu)^T \\Sigma^{-1} (x-\\mu)$ において $\\Sigma$ が単位行列のとき、何と一致するか？`,options:[`ユークリッド距離の2乗`,`情報量`,`コサイン距離`,`マンハッタン距離`],correctAnswer:0,explanation:`$\\Sigma = I$（単位行列）のとき $D^2 = (\\mathbf{x}-\\boldsymbol{\\mu})^\\top I (\\mathbf{x}-\\boldsymbol{\\mu}) = |\\mathbf{x}-\\boldsymbol{\\mu}|^2$（ユークリッド距離の2乗）に一致します。変数が独立で等分散なら相関・スケールの補正が不要なため、マハラノビス距離がユークリッド距離と同じになります。`},{id:`disc1-5`,question:`判別分析の前提として、各グループは何の分布に従うと仮定されるか？`,options:[`ポアソン分布`,`多変量正規分布`,`一様分布`,`指数分布`],correctAnswer:1,explanation:`LDAは各グループ $k$ のデータが $N_p(\\boldsymbol{\\mu}_k, \\Sigma)$（共通の $\\Sigma$）に従うと仮定します。この仮定のもとで「事後確率最大の群に分類する」ことが最適となり、判別境界が線形になります。正規性が大きく崩れる場合（例えば二値変数が多い）はロジスティック回帰のほうが頑健です。`},{id:`disc1-6`,question:`2グループの分散共分散行列が等しいと仮定する場合の判別関数の形状は？`,options:[`二次関数`,`指数関数`,`線形（一次）関数`,`対数関数`],correctAnswer:2,explanation:`2群のマハラノビス距離を比較する判別規則 $D^2(\\mathbf{x}, \\boldsymbol{\\mu}_1) < D^2(\\mathbf{x}, \\boldsymbol{\\mu}_2)$ は、等分散（$Sigma_1 = Sigma_2 = \\Sigma$）のとき $\\mathbf{a}^\\top \\mathbf{x} > c$（線形式）に簡略化されます。等分散が成立しない場合は2次判別（QDA）が必要で、境界は楕円・放物線などの2次曲線になります。`},{id:`disc1-7`,question:`ROC曲線のAUCが 0.5 に近いとき、分類器について何が言えるか？`,options:[`再現率が高い`,`偽陽性率が低い`,`完璧な分類能力がある`,`ランダム分類と同じで、判別能力がほぼゼロ`],correctAnswer:3,explanation:`AUC = 0.5 は ROC曲線が対角線（ランダム分類の直線）と一致することを意味します。AUC = 1.0 が完璧な分類、AUC = 0.7〜0.8 が実用的なモデルの目安です。AUC は「正例のスコアが負例のスコアより高い確率」と等価です。`},{id:`disc1-8`,question:`ROC曲線において閾値を下げると何が起きるか？`,options:[`真陽性率（感度）が上がり、偽陽性率も上がる`,`精度（Precision）が上がる`,`AUCが上がる`,`真陽性率（感度）が下がり、偽陽性率も下がる`],correctAnswer:0,explanation:`閾値を下げると「陽性と判定するハードル」が下がるため、本物の陽性をより多く検出（真陽性率↑）できますが、本物の陰性も陽性と誤判定しやすくなります（偽陽性率↑）。このトレードオフを曲線で示したのが ROC です。`},{id:`disc1-9`,question:`線形判別分析（LDA）と2次判別分析（QDA）の主な違いはどれか？`,options:[`LDA は2グループ、QDA は3グループ以上に使う`,`LDA は共通の分散共分散行列を仮定し境界が線形、QDA は各グループ別の行列を仮定し境界が2次曲線`,`QDA はロジスティック回帰と同じ`,`LDA は距離を使わない`],correctAnswer:1,explanation:`LDA（等分散仮定）では判別境界が直線（hyperplane）になります。QDA では各グループが異なる $\\Sigma_k$ を持つと仮定するため、境界が楕円・放物線などの2次曲線になります。QDA はより柔軟ですが推定パラメータが多くなります。`},{id:`disc1-10`,question:`判別分析とロジスティック回帰の大きな違いはどれか？`,options:[`変数の数の違い`,`計算速度の違い`,`正解ラベルが必要かどうか`,`判別分析はグループが多変量正規分布に従うと仮定するが、ロジスティック回帰は分布の仮定が緩い`],correctAnswer:3,explanation:`判別分析は「各グループが多変量正規分布に従い分散が等しい」という強い仮定のもとで最適な境界を導きます。ロジスティック回帰は分布の仮定が緩く、外れ値にも頑健なため実務で広く使われます。理論的基礎として判別分析の理解は重要です。`}]},{id:`2.5-clustering`,updatedAt:`2026-05-29`,title:`クラスター分析`,chapter:9,description:`「似たもの同士をグループに分ける」自動分類の理論と手法を学びます。`,content:`💡 **このモジュールで学ぶこと**

「1000人の購買データから、自然なお客様のタイプ分けができるか？」事前にグループ数や特徴がわからない状態で、データを「似たもの同士のまとまり（クラスター）」に分けるのが**クラスター分析**です。判別分析が「既知のグループへの割り当て」なら、クラスター分析は「グループ自体を発見する」教師なし学習です。

💡 **「何をもって似ている？」：距離の定義**

クラスター分析ではまず「2点の近さ（距離）」を定義します。よく使う距離：

- **ユークリッド距離**：$d(i,j) = \\sqrt{\\sum_k (x_{ik}-x_{jk})^2}$（普通の直線距離）
- **マンハッタン距離**：$d(i,j) = \\sum_k |x_{ik}-x_{jk}|$（街路に沿った距離）
- **マハラノビス距離**：変数の分散・共分散を考慮した距離（スケールの影響を受けない）

---

### 1. 階層型クラスター分析とデンドログラム

50人の顧客の購買データがあるとします。最初は全員を「別々の50グループ」として出発し、最も似た2人を1グループに統合、また最も似たペア（またはグループ）を統合……という作業を繰り返すと、最終的に全員が1グループになります。この「くっつけていく」過程を追うのが**階層型クラスター分析**（Hierarchical Clustering）です（凝集型）。

結果は**デンドログラム**（樹形図）で表されます。横軸がデータ、縦軸が併合されたときの距離（非類似度）です。デンドログラムの「枝の高さ」でカットすることで任意のクラスター数を得られます。

[[f-dendrogram]]

クラスター間の距離の定義（**リンク法**）：
- **ウォード法**（Ward's Method）：クラスター内の偏差平方和の増分を最小化します。最もよく使われ、コンパクトなクラスターを作ります
- **完全リンク法**：2クラスター内の最大距離（最も遠いペア）で定義します。外れ値に対してロバストです
- **単リンク法**：2クラスター内の最小距離（最も近いペア）です。くさり状のクラスターになりやすい
- **群平均法**：全ペアの平均距離

🎯 **押さえどころ**：ウォード法は、最もよく使われるリンク法の1つです。「クラスター内平方和の増加を最小化する」という性質があり、大きさのそろった、まとまりのよい群ができやすい方法です。

---

### 2. k-means 法

10,000人の顧客を「買い物パターンで3タイプに分けたい」とします。階層型は全ペアの距離を計算するため計算量が膨大になりがちです。一方、「$k = 3$ と最初から決めて分ける」ことで大規模データにも対応できるのが**k-means 法**です。

アルゴリズム：
1. $k$ 個の重心（セントロイド）を初期配置
2. 各点を最も近い重心のクラスターに割り当て
3. 各クラスターの重心を更新
4. 2〜3を収束まで繰り返す

最小化する目的関数：$\\sum_{c=1}^k \\sum_{i \\in C_c} \\|\\mathbf{x}_i - \\bar{\\mathbf{x}}_c\\|^2$（クラスター内平方和）。

k-means の注意点：
- 初期値依存（複数の初期値で試す）
- クラスター数 $k$ を事前に決める必要がある（エルボー法で判断）
- スケールの影響を受けるため、事前に標準化が必要

⚠️ **よくある誤解**：「k-means はどんなデータにも使える万能な手法」と思いがちですが、誤りです。k-means は目的関数（クラスター内平方和の最小化）の構造上、**等方的（球状）でほぼ同じ大きさのクラスター**を仮定しています。そのため(a) 細長く伸びた帯状のクラスター（例：三日月型）、(b) クラスター間で大きさやばらつきが大きく異なる場合、(c) 階層構造を持つデータ、では明らかに不適切なグループ分けになります。このような場合は密度ベースの DBSCAN や階層クラスタリング（ウォード法・単リンク法）を検討します。

---

### 3. 距離行列とクラスター評価

**距離行列**（Distance Matrix）は $n \\times n$ の対称行列で、全データペア間の距離を格納します。階層型クラスター分析の入力として使われます。

クラスター分析の結果を評価する指標：

**シルエット係数**（Silhouette Score）：各点 $i$ について、クラスター内の平均距離 $a(i)$ と最近傍クラスターとの平均距離 $b(i)$ を使って：

$$s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}$$

$s(i)$ の範囲は $[-1, 1]$ で、1に近いほど適切なクラスタリングです。目安として平均シルエット係数が 0.5 以上なら概ね良好、0.25 未満なら構造が弱いと判断します。$s(i)$ が負の値の点は、別のクラスターに入った方が自然だったことを示します。

クラスター数の決定にはシルエット係数の平均値、エルボー法、デンドログラムの見た目などを総合して判断します。

---

### 4. k-means vs 階層クラスタリングの使い分け

クラスター分析は大きく分けて **非階層型（k-means）** と **階層型（凝集型）** の 2 系統があります。データの規模・目的・$k$ の事前知識に応じて選びます。

- **k-means**：あらかじめクラスター数 $k$ を指定し、各点をその重心に割り当てる手法。大規模データに強く、球状（等方的）なクラスタを想定するとき有効です。
- **階層クラスタリング**：すべてのペア間距離から樹形図（デンドログラム）を構築する手法。$k$ が未知でも構造を視覚化できますが、計算量が大きく大規模データには不向きです。

🎯 **押さえどころ：k-means vs 階層の比較表**

| 観点 | k-means | 階層クラスタリング |
|---|---|---|
| データ規模 | 大規模（数万〜数百万点）まで対応 | 小〜中規模（数千点まで）が現実的 |
| 計算量 | $O(nki)$（$i$ は反復回数）で線形に近い | $O(n^2)$〜$O(n^3)$で二乗以上 |
| $k$ の決定 | 事前に指定が必要 | 後からデンドログラムを切って決められる |
| 形状仮定 | 球状・等方的クラスタを仮定 | 任意形状（リンク法による） |
| 出力 | クラスタ割り当てと重心 | デンドログラム＋カット位置でクラスタ |
| 再現性 | 初期値依存（複数回実行を推奨） | 決定的（同じ入力で同じ結果） |

💡 **判断の目安**：「$k$ がだいたい分かっていて高速に分類したい」なら k-means、「$k$ が分からず、まずデータの構造を眺めたい」なら階層、というのが基本方針です。

---

### 5. $k$ の決定方法

k-means では $k$ を事前に決める必要があるため、複数の候補から最適値を選ぶ手続きが重要です。代表的な方法は次の 3 つです。

- **エルボー法**：$k$ ごとにクラスタ内平方和（WCSS）を計算し、$k$ を横軸・WCSS を縦軸にプロットします。$k$ を増やすほど WCSS は単調減少しますが、ある $k$ から減り方が緩やかになる「肘の点」を選びます。
- **シルエット係数**：各 $k$ について平均シルエット係数を計算し、最大となる $k$ を選びます。値の範囲は $-1$ から $+1$ で、$0.5$ 以上なら良好な分離、$0.25$ 未満なら構造が弱いと判断します。
- **ギャップ統計量**：観測データの WCSS と「一様分布から生成した参照データ」の WCSS の差（ギャップ）が最大となる $k$ を選びます。理論的根拠が比較的厳密で、エルボーが曖昧なときに有用です。

💡 **数値例**：アイリスデータ（がく片・花弁の 4 変数、150 個体）に k-means を適用すると、$k=3$ で WCSS の減少がカクッと緩やかになり（エルボー点）、平均シルエット係数もおよそ $0.55$ と $k=2$ や $k=4$ より高くなります。実際の品種数（setosa・versicolor・virginica）と一致するため、教科書の例としてよく使われます。

---

### 6. 距離尺度の使い分け

クラスター分析の結果は「何をもって似ているとみなすか」、すなわち距離尺度の選択に大きく依存します。

- **ユークリッド距離** $d = \\sqrt{\\sum_k (x_{ik} - x_{jk})^2}$：最も標準的な距離。連続変数で次元のスケールが揃っているとき（または標準化後）に使います。
- **マンハッタン距離** $d = \\sum_k |x_{ik} - x_{jk}|$：座標軸方向の絶対差の和。外れ値の影響を受けにくく、ロバストな分析が必要なときに使います。
- **マハラノビス距離** $d = \\sqrt{(\\mathbf{x}-\\mathbf{y})^\\top S^{-1}(\\mathbf{x}-\\mathbf{y})}$：共分散行列 $S$ で標準化するため、変数間の相関を考慮できます。多変量正規分布を仮定する場面で有効です。
- **コサイン類似度** $\\cos\\theta = \\dfrac{\\mathbf{x}^\\top \\mathbf{y}}{\\|\\mathbf{x}\\|\\|\\mathbf{y}\\|}$：ベクトルの「向き」を測る尺度。テキスト分類（TF-IDF ベクトル）や推薦システムなど、大きさより方向が意味を持つ場面で使います。

🎯 **押さえどころ：距離尺度の選び方**

| 状況 | 推奨される距離 |
|---|---|
| 標準的な連続変数（標準化済み） | ユークリッド距離 |
| 外れ値が多い／ロバストにしたい | マンハッタン距離 |
| 変数間に強い相関がある | マハラノビス距離 |
| 文書ベクトル・高次元疎データ | コサイン類似度 |

💡 **判断の目安**：距離尺度の選択は分析結果を左右します。「変数のスケールを揃えたか」「相関を考慮すべきか」「外れ値の影響を抑えたいか」の 3 点を確認してから選ぶと迷いません。`,keyFormulas:[{label:`ユークリッド距離`,formula:`d(i,j) = \\sqrt{\\sum_k (x_{ik}-x_{jk})^2}`},{label:`k-means 目的関数`,formula:`\\min \\sum_{c=1}^k \\sum_{i \\in C_c} \\|\\mathbf{x}_i - \\bar{\\mathbf{x}}_c\\|^2`},{label:`シルエット係数`,formula:`s(i) = \\dfrac{b(i)-a(i)}{\\max(a(i),b(i))}`}],quiz:[{id:`cl1-1`,question:`階層型クラスター分析の結果を可視化する図を何と呼ぶか？`,options:[`デンドログラム（樹形図）`,`バイプロット`,`ROC曲線`,`散布図行列`],correctAnswer:0,explanation:`デンドログラムは縦軸に併合時の距離（非類似度）、横軸にデータを配置した樹形図です。どの高さで「枝を切る」かによってクラスター数が変わります。クラスター分析の結果を直感的に理解できます。`},{id:`cl1-2`,question:`ウォード法（Ward's Method）がクラスター間距離を定義する方法はどれか？`,options:[`2クラスター内の最大距離`,`クラスター内平方和の増分を最小化`,`全ペアの平均距離`,`2クラスター内の最小距離`],correctAnswer:1,explanation:`ウォード法は「2クラスターを統合したとき、クラスター内平方和がどれだけ増加するか」を統合コストとして使います。コンパクトで均等な大きさのクラスターを作る傾向があり、併合の基準が明快で、最もよく使われるリンク法の1つです。`},{id:`cl1-3`,question:`k-means 法で必要な事前指定はどれか？`,options:[`デンドログラムのカット位置`,`リンク法の種類`,`クラスター数 $k$`,`距離行列`],correctAnswer:2,explanation:`k-means では分析前にクラスター数 $k$ を指定する必要があります（階層型と異なる大きな違い）。適切な $k$ を決めるためにエルボー法やシルエット係数を使います。`},{id:`cl1-4`,question:`k-means 法の目的関数として最小化するのはどれか？`,options:[`全変数の分散の和`,`距離行列の行列式`,`クラスター間平方和`,`クラスター内平方和`],correctAnswer:3,explanation:`k-means はクラスター内平方和（各点からその重心までの距離の二乗の合計）を最小化します。この値が小さいほど「コンパクトで密な」クラスターが形成されています。`},{id:`cl1-5`,question:`シルエット係数 $s(i)$ が1に近いことは何を意味するか？`,options:[`その点が自分のクラスターに良く適合し、隣接クラスターとよく分離されている`,`距離がユークリッドで計算されている`,`クラスター内分散が0に近い`,`クラスター数が1つになっている`],correctAnswer:0,explanation:`$s(i) = (b(i)-a(i))/\\max(a(i),b(i))$ で、$a(i)$ は自クラスター内の平均距離、$b(i)$ は最近傍クラスターとの平均距離です。$b(i) \\gg a(i)$ のとき $s(i) \\to 1$ となり、自分のクラスターに「よくはまり」、他クラスターから「遠い」理想状態です。`},{id:`cl1-6`,question:`単リンク法（最短距離法）の欠点として知られるものはどれか？`,options:[`外れ値に弱く球状クラスターしか作れない`,`くさり状（チェーン）現象が起きやすい`,`k を事前指定する必要がある`,`計算量が多すぎる`],correctAnswer:1,explanation:`単リンク法（最小距離で定義）では、細長くつながったくさり状のクラスターができやすい（chaining effect）という欠点があります。完全リンク法やウォード法のほうが「コンパクトなかたまり」を作ります。`},{id:`cl1-7`,question:`k-means 法でクラスタリングの前に標準化が推奨される理由はどれか？`,options:[`初期値依存性を解消するため`,`収束を速くするため`,`変数のスケール（単位）の違いが距離計算に影響するため`,`クラスター数の決定に必要なため`],correctAnswer:2,explanation:`k-means はユークリッド距離を使うため、スケールの大きな変数が距離を支配します。例：年齢（0〜100）と年収（0〜1000万）を同時に使うと年収の影響が圧倒的になります。標準化（平均0・分散1）で各変数を同等に扱います。`},{id:`cl1-8`,question:`階層型と非階層型（k-means）クラスター分析の主な違いはどれか？`,options:[`非階層型は大標本に適さない`,`非階層型は必ず最適解を得る`,`階層型は距離行列が不要`,`階層型はクラスター数を事前指定しないが結果が樹形図で得られ、k-meansは$k$を指定する`],correctAnswer:3,explanation:`階層型はクラスター数を決めずに全プロセスを可視化（デンドログラム）し、後からカット位置を決定します。k-meansは$k$を事前指定し大規模データに向いています。k-meansは局所最適に収束することがあります。`},{id:`cl1-9`,question:`マハラノビス距離がユークリッド距離と異なる主な点はどれか？`,options:[`変数の分散と共分散を考慮し、スケール・相関の影響を除去する`,`必ず0〜1の範囲をとる`,`2点間でなく3点間の距離を測る`,`整数しか計算できない`],correctAnswer:0,explanation:`マハラノビス距離 $d = \\sqrt{(\\mathbf{x}-\\mathbf{y})^\\top S^{-1}(\\mathbf{x}-\\mathbf{y})}$（$S$: 共分散行列）は、変数間の相関を除いてスケールの差を補正します。変数が独立・等分散のとき標準化したユークリッド距離に一致します。`},{id:`cl1-10`,question:`クラスター分析は教師あり学習か教師なし学習か？`,options:[`教師なし学習（グループを自動発見）`,`強化学習`,`どちらでもない`,`教師あり学習（グループが事前に既知）`],correctAnswer:0,explanation:`クラスター分析は事前にグループラベルのない「教師なし学習」です。[判別分析](/stats-pre1/2.3-discriminant/)は既知のグループラベルを使う「教師あり学習」と対比されます。クラスター分析は「データの中に潜む自然な構造を発見する」探索的分析です。`}]},{id:`3.1-bayes`,updatedAt:`2026-10-19`,title:`ベイズ推定とMCMC`,chapter:10,description:`「今の確信」を「新しいデータ」でアップデートし続ける、進化する統計学。`,content:`💡 **このモジュールで学ぶこと**

「昨日まで雨が続いていたから、今日も雨だろう」このように過去の経験を踏まえて確率を更新し続ける統計学の考え方が**ベイズ統計**です。このモジュールでは、事前知識とデータを組み合わせて確信を更新するベイズ推論の仕組みと、計算上難しい問題を解くためのシミュレーション手法（MCMC）を学びます。

💡 **「医師の診断」のような段階的な確率更新**

患者が「頭痛」を訴えています。医師は最初「風邪の可能性が80%、髄膜炎が5%、偏頭痛が15%」と経験から推測します（**事前分布**）。

次に「首を動かすと痛い」という新しい情報が加わります（**尤度**）。この情報は髄膜炎と高く関連するため、医師の判断が更新されます（**事後分布**）。

これがベイズ統計の核心です。「今の確信」に「新しい証拠」を掛け合わせて「更新された確信」を得るプロセスです。

---

### 1. ベイズの定理：確信を更新する方程式

**具体例**：迷惑メールフィルターを考えましょう。

1. **事前確率（事前分布）**：もともとメールの30%がスパムだと知っている
2. **尤度（Likelihood）**：「無料」「当選」という単語が含まれていた。スパムにこの組み合わせが出る確率は80%、正常メールでは5%
3. **事後確率（事後分布）**：ベイズの定理で計算すると「スパムの確率は約87%」

計算は、スパムとして出る確率と正常として出る確率を並べて、割合を取るだけです。スパムのほうは $0.3\\times0.8=0.24$、正常のほうは $0.7\\times0.05=0.035$ なので、事後確率は $\\dfrac{0.24}{0.24+0.035}\\approx 0.87$ です。事前確率が30%だったものが、2つの単語を見て87%まで上がりました。

$$P(\\theta \\mid \\text{data}) \\propto P(\\text{data} \\mid \\theta) \\times P(\\theta)$$

（「$\\propto$」は「比例する」という記号です。等号ではなく「形が同じ」という意味で使います。右辺の計算だけで事後分布の**形（山の形状）**が決まるため、難しい分母の計算を省略できます）

（事後分布）$\\propto$（尤度）$\\times$（事前分布）

観測データ数のスライダーを増やしながら、事後分布がどう変化するか観察してみましょう。
[[interactive:update]]

データが増えるほど事後分布が「細く高く」なり、確信が深まっていく様子が分かります。これがベイズ推定の「学習」です。

---

### 2. 計算上の問題とMCMC

事後分布を正確に求めようとすると分母の積分が複雑で計算できないことが多々あります。

$$P(\\theta \\mid \\text{data}) = \\frac{P(\\text{data} \\mid \\theta) \\times P(\\theta)}{\\int P(\\text{data} \\mid \\theta) P(\\theta) d\\theta}$$

分母が必要な理由：事後分布は確率なので全体の合計が1でなければなりません。分子（尤度×事前分布）だけでは合計が1になるとは限らないため、全 $\\theta$ にわたって足し合わせた分母で割ることで「合計が1になるよう正規化」します。この分母の積分が、パラメータが1つの単純なケースでは解けますが、パラメータが10個・100個と増えると「10次元・100次元の空間で体積を計算する」ことになり、事実上計算不可能になります。そこで登場するのが **MCMC（マルコフ連鎖モンテカルロ法）**です。

- **仕組み**：分布そのものを求める代わりに、その分布から「サンプル」を大量に抽出してヒストグラムで形を近似する
- **マルコフ連鎖**（Markov Chain）：「一つ前の状態のみに依存して次の状態が決まる」過程。これによって効率的なサンプリングが可能になる
- **ギブスサンプリング**：たくさんのパラメータがあるとき、1つずつ順番に更新していく効率的なサンプリング手法
- **周辺化**：母数が $\\theta_1, \\theta_2$ の2つあり、$\\theta_1$ だけを知りたいときは、$\\theta_2$ について積分して消した分布 $P(\\theta_1 \\mid \\text{data}) = \\int P(\\theta_1, \\theta_2 \\mid \\text{data})\\,d\\theta_2$ を見ます。MCMC のサンプルなら、$\\theta_1$ の値だけを取り出してヒストグラムにすれば済みます

MCMCがどのようにサンプルを生成していくか、その軌跡を観察してみましょう。
[[interactive:mcmc]]

このサンプルの集積が確率の高い領域を密に覆い、複雑な事後分布を近似します。「計算不可能な積分をサンプリングで回避する」のがMCMCの本質です。

---

### 3. 共役事前分布とMAP推定

📖 **事後分布からの点推定**

事後分布が得られたら、そこから代表値を1つ選ぶ必要があります：
- **事後平均（EAP: Expected A Posteriori）**：事後分布の平均値を採用する、最もよく使われる方法
- **MAP推定（Maximum A Posteriori）**：事後分布の**最頻値（確率が最も高い点）**を採用する方法。最尤推定（MLE）に事前分布の情報を加えた形と解釈できる

🎯 **重要ポイント：共役事前分布**

特定の事前分布と尤度の組み合わせを使うと、MCMCなしで足し算のような簡単な計算だけで事後分布が求められます。代表的な共役関係：

- **二項分布の確率 $p$**：事前分布にベータ $\\text{Beta}(\\alpha, \\beta)$ → 事後分布も $\\text{Beta}(\\alpha + k, \\beta + n - k)$（成功 $k$ 回、試行 $n$ 回を足すだけ）
- **ポアソン分布の $\\lambda$**：事前分布にガンマ $\\text{Ga}(\\alpha, \\beta)$ → 事後分布も $\\text{Ga}(\\alpha + \\sum x_i, \\beta + n)$
- **正規分布の平均 $\\mu$（分散既知）**：事前分布に正規分布 → 事後分布も正規分布

例えば「コインを10回投げて7回表」のデータに対して、ベータ事前分布を使うと事後分布がパラメータを足すだけで求まります。この「形が変わらない」組み合わせが共役関係です。

**数値例**：事前分布が $\\text{Beta}(1,1)$（一様分布）なら、事後分布は $\\text{Beta}(1+7,\\ 1+3)=\\text{Beta}(8,4)$ です。事後平均は $\\dfrac{8}{8+4}\\approx 0.67$、MAP推定は $\\dfrac{8-1}{8+4-2}=0.70$ で、最尤推定の $7/10$ と一致します。一方、「コインは偏っていないはずだ」という強い事前知識を $\\text{Beta}(5,5)$ で表すと、事後分布は $\\text{Beta}(12,8)$ になり、事後平均は $12/20=0.60$、MAP推定は $\\dfrac{11}{18}\\approx 0.61$ です。同じ「10回中7回」のデータでも、事前分布が強いほど推定値は $0.5$ のほうへ引き寄せられます。データが100回中70回に増えれば、$\\text{Beta}(75,35)$ で事後平均が約 $0.68$ となり、事前分布の影響は小さくなります。

---

📖 **無情報事前分布とジェフリーズ事前分布**

事前知識が全くないとき、「どの値も同じくらいもっともらしい」として一様分布を事前分布に使う考え方を**無情報事前分布**（Uninformative Prior）と呼びます。これを使うと事後分布は尤度だけで決まり、最尤法に近い推定になります。

ただし単純な一様分布は**変数変換に対して不変でない**という問題があります。例えば $p$ に一様分布を置いても、$\\log(p/(1-p))$ には一様分布にならない。この問題を解決するのが**ジェフリーズ事前分布**（Jeffreys Prior）で、フィッシャー情報量 $I(\\theta)$ を使って $\\pi(\\theta) \\propto \\sqrt{I(\\theta)}$ と定義します。ジェフリーズ事前分布は変数変換に対して不変（変換しても同じ無情報性を保つ）という理論的に自然な性質を持ちます。

---

📖 **階層ベイズモデル**

複数のグループ（たとえば複数の学校の平均点）を分析するとき、各グループの母数 $\\theta_j$ を別々に推定すると、データの少ないグループは推定が不安定になります。**階層ベイズモデル**（Hierarchical Bayes Model）では、各 $\\theta_j$ に共通の事前分布 $\\theta_j \\sim N(\\mu, \\tau^2)$ を置き、その $\\mu$ や $\\tau^2$ にもさらに事前分布（**超事前分布**）を置きます。

こうすると、グループどうしの似かたもデータから推定され、データの少ないグループの推定値は全体の平均に引き寄せられます（**縮小**）。事前分布の中の母数もデータから学ぶ、という二段構えが「階層」という名前の由来です。事後分布は複雑になるため、計算には MCMC を使うのが一般的です。`,keyFormulas:[{label:`ベイズの定理`,formula:`P(\\theta|\\text{data}) \\propto P(\\text{data}|\\theta) \\times P(\\theta)`},{label:`MAP 推定`,formula:`\\hat{\\theta}_{\\text{MAP}} = \\arg\\max_\\theta P(\\theta|\\text{data})`}],interactiveType:`update`,quiz:[{id:`b1-1`,question:`ベイズ推定において、データを得る前に設定する母数の確率分布を何と呼ぶ？`,options:[`尤度関数`,`標本分布`,`事後分布`,`事前分布`],correctAnswer:3,explanation:`事前分布（Prior Distribution）はデータを見る前に「母数 $\\theta$ がどのあたりにありそうか」という研究者の信念を確率分布で表したものです。例えば「コインが公正（$p = 0.5$）に近いと思う」という信念を $\\text{Beta}(5,5)$ で表現します。データを得た後、この事前分布が尤度で更新されて事後分布になります。`},{id:`b1-2`,question:`「事後分布は、事前分布と尤度の積に比例する」という関係を示す定理は？`,options:[`ベイズの定理`,`中心極限定理`,`ガウスの法則`,`大数の法則`],correctAnswer:0,explanation:`ベイズの定理 $P(\\theta \\mid \\text{data}) \\propto P(\\text{data} \\mid \\theta) \\times P(\\theta)$ は「新しいデータがあったとき、確信をどう更新するか」の方程式です。「尤度（そのデータが得られる確率）が高い $\\theta$ ほど事後確率が上がる」という直感を数式にしたものです。$\\propto$ は分母を無視して「形だけ」で更新できることを示します。`},{id:`b1-3`,question:`事前分布と事後分布が同じ種類の分布（関数形）になるような、計算上便利な事前分布は？`,options:[`一様事前分布`,`共役事前分布`,`階層事前分布`,`無情報事前分布`],correctAnswer:1,explanation:`共役事前分布を使うと、複雑な積分計算をせずに「足し算のような簡単な計算」だけで事後分布が求められます。例えば「二項分布＋ベータ事前分布→ベータ事後分布」のように、形が変わらないので計算が劇的に楽になります。`},{id:`b1-4`,question:`MCMC法において、一つ前の状態のみに依存して次の状態が決まる過程を何と呼ぶ？`,options:[`ベルヌーイ過程`,`ガウス過程`,`マルコフ連鎖`,`ポアソン過程`],correctAnswer:2,explanation:`マルコフ連鎖（Markov Chain）は「次の状態が現在の状態だけで決まり、それ以前の履歴は関係ない」という性質（マルコフ性）を持つ確率過程です。MCMCでは「目標とする事後分布を定常分布に持つマルコフ連鎖」を設計して長時間走らせることで、複雑な事後分布からのサンプリングを実現しています。`},{id:`b1-5`,question:`各パラメータを、他のパラメータを固定した条件付き分布から順番にサンプリングするMCMCの手法は？`,options:[`ハミルトニアン`,`逐次モンテカルロ`,`メトロポリス法`,`ギブスサンプリング`],correctAnswer:3,explanation:`ギブスサンプリングは「パラメータが $\\theta_1, \\theta_2, \\theta_3$ と複数あるとき、他を固定して1つずつ順番に更新する」手法です。例えば身長と体重の同時分布から「体重を固定して身長を、身長を固定して体重を」と交互にサンプリングします。条件付き分布がシンプルな形になることが多く、高次元でも効率的にサンプリングできます。`},{id:`b1-6`,question:`特定のパラメータに興味がある時、他の不要なパラメータを積分して消去する操作を何と呼ぶ？`,options:[`周辺化`,`標準化`,`正則化`,`正規化`],correctAnswer:0,explanation:`周辺化（Marginalization）は「興味のないパラメータ（ニューサンスパラメータ）を積分で消去して、注目するパラメータだけの分布を取り出す」操作です。例えば $P(\\theta_1, \\theta_2 \\mid \\text{data})$ から $\\theta_1$ だけに注目したいとき、$P(\\theta_1 \\mid \\text{data}) = \\int P(\\theta_1, \\theta_2 \\mid \\text{data})\\,d\\theta_2$ として $\\theta_2$ を消します。本文のとおり、MCMC で得たサンプルなら、$\\theta_1$ の値だけを取り出してヒストグラムにすれば、この積分をしたことになります。`},{id:`b1-7`,question:`事後分布の「平均値」ではなく「最頻値（最も高いところ）」を採用する推定法は？`,options:[`MLE`,`MAP推定`,`最小二乗法`,`モーメント法`],correctAnswer:1,explanation:`MAP推定（Maximum A Posteriori）は「事後分布のピーク（最も確率が高い点）をパラメータ推定値とする」方法です。最尤法（MLE）と比べると、MLE は尤度だけを最大化しますが、MAP は「尤度 × 事前分布」を最大化します。つまり事前情報による「正則化」が加わった形です。事前分布が一様分布のとき MAP = MLE になります。`},{id:`b1-8`,question:`ポアソン分布のパラメータ $\\lambda$ に対する共役事前分布は？`,options:[`パレート分布`,`正規分布`,`ガンマ分布`,`ベータ分布`],correctAnswer:2,explanation:`ポアソン分布の尤度 $\\lambda^{\\sum x_i} e^{-n\\lambda}$ に対して、ガンマ事前分布 $\\text{Ga}(\\alpha, \\beta)$ を使うと事後分布も $\\text{Ga}(\\alpha + \\sum x_i,\\, \\beta + n)$ というガンマ分布になります。「観測されたカウントの合計を $\\alpha$ に足す」だけで更新できるので計算が非常に楽です。ガンマ分布が「ポアソン分布の共役事前分布」になる理由はこの数式の形の一致にあります。`},{id:`b1-9`,question:`ベルヌーイ分布（成功・失敗）の確率 $p$ に対する共役事前分布は？`,options:[`ディリクレ分布`,`正規分布`,`ガンマ分布`,`ベータ分布`],correctAnswer:3,explanation:`ベータ分布 $\\text{Beta}(\\alpha, \\beta)$ は $[0,1]$ 上の確率変数（確率 $p$ そのもの）を記述するため、確率パラメータの事前分布として自然です。$n$ 回試行して $k$ 回成功したとき、事後分布は $\\text{Beta}(\\alpha+k, \\beta+n-k)$ になります。「成功数を $\\alpha$ に足し、失敗数を $\\beta$ に足す」だけで更新でき、MCMCなしで計算できます。`},{id:`b1-10`,question:`特定の情報を持っていない時に、全範囲に平らな確率を割り当てる事前分布は？`,options:[`強い事前分布`,`無情報事前分布`,`経験事前分布`,`階層事前分布`],correctAnswer:1,explanation:`無情報事前分布（Uninformative Prior）は「どの値も同じくらいもっともらしい」という状態を表し、一様分布がその代表例です。これを使うと事後分布は尤度だけで決まるため、最尤法に近い推定になります。ただし「本当に完全に無情報な事前分布」はジェフリーズ事前分布のような形で定義するのが理論的に適切で、単純な一様分布は変数変換に対して不変でない問題があります。`}]},{id:`3.3-markov`,updatedAt:`2026-10-20`,title:`マルコフ連鎖と確率過程の基礎`,chapter:10,description:`「次の状態は現在だけで決まる」確率過程の理論と、ランダムウォーク・ポアソン過程を学びます。`,content:`💡 **このモジュールで学ぶこと**

「今日の天気は昨日の天気だけに依存し、一昨日以前は関係ない」このような「現在が与えられれば過去と未来が独立になる性質」を持つ確率過程が**マルコフ連鎖**です。「ベイズ推定とマルコフ連鎖」で登場したMCMCの理論的基礎でもあります。

💡 **確率過程とは「時間とともに変わる確率変数の系列」**

$\\{X_t, t = 0, 1, 2, \\ldots\\}$ のように時刻ごとの確率変数の列を**確率過程**（Stochastic Process）と呼びます。株価、天気、ランダムウォークなど「時間とともに変化する不確かさ」を記述します。

---

### 1. マルコフ連鎖の定義と推移確率

**マルコフ性**（Markov Property）：

$$P(X_{t+1} = j \\mid X_t = i, X_{t-1}, \\ldots, X_0) = P(X_{t+1} = j \\mid X_t = i)$$

「未来 $X_{t+1}$ の確率は現在 $X_t$ だけで決まり、過去は関係ない」という性質です。

1時刻先への遷移確率 $p_{ij} = P(X_{t+1} = j \\mid X_t = i)$ を**推移確率**と呼びます。これを行列にした $P = (p_{ij})$ が**推移確率行列**で、各行の和は1です。

$t$ 時刻後の推移確率は $P^t$（行列の $t$ 乗）で得られます。

**数値例**：天気を「晴れ・雨」の2状態とし、晴れの翌日が晴れである確率を $0.8$、雨の翌日が晴れである確率を $0.4$ とします。

$$P = \\begin{pmatrix} 0.8 & 0.2 \\\\ 0.4 & 0.6 \\end{pmatrix}$$

今日が晴れなら、明後日（2時刻後）に晴れである確率は、「晴れ→晴れ→晴れ」と「晴れ→雨→晴れ」の2経路を足して $0.8\\times0.8+0.2\\times0.4=0.72$ です。これは $P^2$ の1行1列目に当たります。

[[markov-chain]]

---

### 2. 既約性・再帰性

**既約性**（Irreducibility）：すべての状態から他のすべての状態へ有限ステップで到達できること。つまり「孤立した状態が存在しない」状態です。

**再帰性**（Recurrence）：状態 $i$ から出発したとき、いつか必ず $i$ に戻ってくる確率が1であること。有限状態の既約なマルコフ連鎖はすべての状態が再帰的です。

**周期性**（Periodicity）：状態 $i$ に戻る時刻が $d$ の倍数になる場合、周期 $d$ を持つと言います。$d = 1$ を**非周期的**と呼びます。

既約・非周期の有限マルコフ連鎖は**エルゴード的**と呼ばれ、定常分布の存在が保証されます。

---

### 3. 定常分布

**定常分布**（Stationary Distribution）$\\boldsymbol{\\pi} = (\\pi_1, \\pi_2, \\ldots)$ は：

$$\\boldsymbol{\\pi} P = \\boldsymbol{\\pi}, \\quad \\sum_i \\pi_i = 1$$

を満たす確率分布です。「この分布から出発するとずっとこの分布にとどまる」という均衡状態です。

エルゴード的マルコフ連鎖では、初期状態によらず時刻 $t \\to \\infty$ で定常分布に収束します：$P(X_t = j) \\to \\pi_j$。

先の天気の例で $\\boldsymbol{\\pi}=(\\pi_1,\\pi_2)$ を求めます。$\\boldsymbol{\\pi}P=\\boldsymbol{\\pi}$ の1列目から $0.8\\pi_1+0.4\\pi_2=\\pi_1$、つまり $0.4\\pi_2=0.2\\pi_1$ です。$\\pi_1+\\pi_2=1$ と合わせると $\\boldsymbol{\\pi}=(2/3,\\ 1/3)$ になります。長い目で見ると、晴れが $2/3$、雨が $1/3$ の割合です。今日が晴れでも雨でも、日が経つにつれ、晴れの確率は $2/3$ に近づきます（$0.8\\to0.72\\to0.688\\to\\cdots$）。

MCMCではこの性質を使います。望む分布 $\\pi$ を定常分布に持つマルコフ連鎖を設計し、長時間走らせることで $\\pi$ からのサンプルを得ます。

---

### 4. ランダムウォーク

「コインを投げるたびに1歩右か左に動く人は、どこまで行くか？」これが**ランダムウォーク**（Random Walk）の直感です。株価の日々の変動・花粉の拡散・遺伝的浮動など、「現在の状態から小さなランダムな変化を繰り返す」現象の基礎モデルです。

$X_0 = 0$、各ステップで確率 $p$ で $+1$、確率 $1-p$ で $-1$ 動く：$X_t = X_{t-1} + Z_t$（$Z_t = \\pm 1$）。

$p = 1/2$ の**対称ランダムウォーク**は一次元ブラウン運動の離散近似です。$E[X_t] = 0$、$\\text{Var}(X_t) = t$ で、時間とともに広がります。たとえば100歩後の位置は、平均 $0$、標準偏差 $\\sqrt{100}=10$ です。距離は歩数に比例せず、$\\sqrt{t}$ に比例して広がります。

再帰性：1次元の対称ランダムウォークは再帰的（いつか必ず原点に戻る）。2次元も再帰的。3次元以上は非再帰的（原点に戻らずに終わる確率が正）。

---

### 5. ポアソン過程とブラウン運動

**ポアソン過程**（Poisson Process）は「単位時間に平均 $\\lambda$ 件のイベントが発生する」連続時間確率過程です。

- 任意の区間 $[s, t]$ でのイベント数は ポアソン分布に従う：$\\text{Po}(\\lambda(t-s))$
- 重ならない区間のイベント数は独立
- イベント間の時間は指数分布に従う

たとえば窓口に客が平均 $\\lambda=3$ 人/時間で来るなら、2時間の来客数は $\\text{Po}(6)$ で平均6人です。30分間に1人も来ない確率は、$\\text{Po}(1.5)$ の0人の確率 $e^{-1.5}\\approx0.22$ です。次の客までの待ち時間は平均 $1/\\lambda=20$ 分です。

**ブラウン運動**（Brownian Motion）$\\{B_t, t \\geq 0\\}$ は連続時間の極限的なランダムウォークです：
- $B_0 = 0$
- 独立増分：$B_t - B_s \\sim N(0, t-s)$（重ならない区間の増分が独立）
- 連続なパス（確率1で）

ブラウン運動は金融工学（株価モデル）・物理（拡散過程）・ベイズ統計（事前分布）で広く使われます。

🎯 **押さえどころ**：定常分布の方程式 $\\boldsymbol{\\pi}P = \\boldsymbol{\\pi}$ と、ポアソン過程のイベント数 $\\sim \\text{Po}(\\lambda t)$ が、この章の2本の柱です。前者は長期の割合、後者は時間 $t$ の間の件数を与えます。`,keyFormulas:[{label:`マルコフ性`,formula:`\\begin{aligned} &P(X_{t+1}=j \\mid X_t=i, X_{t-1},\\ldots) \\\\ &= P(X_{t+1}=j \\mid X_t=i) \\end{aligned}`},{label:`定常分布`,formula:`\\boldsymbol{\\pi} P = \\boldsymbol{\\pi},\\quad \\sum_i \\pi_i = 1`},{label:`ポアソン過程のカウント`,formula:`N(t) \\sim \\text{Po}(\\lambda t)`},{label:`ブラウン運動の増分`,formula:`B_t - B_s \\sim N(0,\\, t-s)`}],quiz:[{id:`mc1-1`,question:`マルコフ性の正しい説明はどれか？`,options:[`未来は過去だけに依存し現在は関係ない`,`過去・現在・未来が互いに独立`,`未来は過去と現在の両方に依存する`,`未来は現在の状態だけに依存し過去は関係ない`],correctAnswer:3,explanation:`マルコフ性は「$X_{t+1}$ の条件付き分布が $X_t$ だけで決まり、$X_{t-1}, X_{t-2},\\ldots$ には依存しない」性質です。「現在が与えられれば、過去と未来は独立」とも言えます。`},{id:`mc1-2`,question:`定常分布 $\\boldsymbol{\\pi}$ の方程式 $\\boldsymbol{\\pi} P = \\boldsymbol{\\pi}$ は何を意味するか？`,options:[`この分布から出発すると次の時刻でも同じ分布に留まる均衡状態`,`全状態の確率が等しい`,`マルコフ連鎖が収束している`,`推移確率行列が対角行列`],correctAnswer:0,explanation:`$\\boldsymbol{\\pi} P = \\boldsymbol{\\pi}$ は「分布 $\\boldsymbol{\\pi}$ のもとで1ステップ遷移しても分布が変わらない」ことを表します。エルゴード的なマルコフ連鎖では初期分布によらず長時間後に $\\boldsymbol{\\pi}$ に収束します。`},{id:`mc1-3`,question:`マルコフ連鎖の「既約性」とはどういう性質か？`,options:[`全ての状態の推移確率が等しい`,`どの状態からも他のすべての状態へ有限ステップで到達できる`,`推移確率行列が対称行列`,`ランダムウォークと同値`],correctAnswer:1,explanation:`既約性は「状態空間内の孤立したグループが存在しない」ことを意味します。すべての状態がひとつの連結成分に属し、どこからでもどこへでも行ける状態です。`},{id:`mc1-4`,question:`ポアソン過程で時間 $[0, t]$ に起きるイベント数はどの分布に従うか？`,options:[`指数分布`,`$N(\\lambda t, \\lambda t)$`,`$\\text{Po}(\\lambda t)$`,`$B(t, \\lambda)$`],correctAnswer:2,explanation:`$N(t) \\sim \\text{Po}(\\lambda t)$ で、期待値・分散ともに $\\lambda t$ です。区間の長さに比例して期待件数が増えます。また連続するイベント間の時間は $\\text{Exp}(\\lambda)$ に従います。`},{id:`mc1-5`,question:`ブラウン運動 $B_t$ の増分 $B_t - B_s$（$t > s$）が従う分布はどれか？`,options:[`$N(s, t)$`,`$\\text{Exp}(1/(t-s))$`,`$N(0, 1)$`,`$N(0, t-s)$`],correctAnswer:3,explanation:`ブラウン運動の増分は $B_t - B_s \\sim N(0, t-s)$ で、区間の長さ $t-s$ に比例する分散を持ちます。また重ならない区間の増分は互いに独立です。これが「分散が時間とともに増加する」ランダムな拡散を表します。`},{id:`mc1-6`,question:`MCMCでマルコフ連鎖の定常分布を活用する方法として正しいものはどれか？`,options:[`目標分布を定常分布として持つマルコフ連鎖を設計し長時間走らせることでサンプルを得る`,`定常分布は推移行列から解析的に求め直接サンプリングする`,`自由度を変えることで任意の分布からサンプリングできる`,`マルコフ連鎖を使わずモンテカルロ積分だけを行う`],correctAnswer:0,explanation:`MCMCでは「欲しい分布 $\\pi$ を定常分布に持つマルコフ連鎖を設計」します（メトロポリス・ヘイスティングス法やギブスサンプリング）。長時間走らせると状態の頻度が $\\pi$ に収束し、これを用いて期待値の近似計算を行います。`},{id:`mc1-7`,question:`1次元対称ランダムウォーク（$p=1/2$）の再帰性について正しいものはどれか？`,options:[`確率 $1/2$ で原点に戻る`,`確率1で原点に戻る（再帰的）`,`2次元以上より再帰的でない`,`時間が有限なら必ず戻る`],correctAnswer:1,explanation:`1次元・2次元の対称ランダムウォークは再帰的（確率1で原点に戻る）。しかし3次元以上では確率1未満で原点に戻らない（非再帰的）という有名な事実があります。「1次元は酔っ払いがいつか家に戻るが、3次元では迷子になる」と覚えましょう。`},{id:`mc1-8`,question:`エルゴード的なマルコフ連鎖の性質として正しいものはどれか？`,options:[`必ず対称な推移確率行列を持つ`,`定常分布が存在しない`,`初期状態に関わらず時刻 $t \\to \\infty$ で定常分布に収束する`,`有限ステップで収束する`],correctAnswer:2,explanation:`エルゴード的（既約・非周期的・正再帰的）なマルコフ連鎖は唯一の定常分布 $\\boldsymbol{\\pi}$ を持ち、初期状態によらず収束します。MCMCはこの性質を利用します。`},{id:`mc1-9`,question:`推移確率行列 $P$ の各行の和はいくらか？`,options:[`状態数 $n$`,`0`,`$\\pi_i$（定常確率）`,`1`],correctAnswer:3,explanation:`推移確率行列の各行は「状態 $i$ から各状態への遷移確率」を表すため、その和は必ず1です（確率の全事象の和 = 1）。これを確率行列（stochastic matrix）と呼びます。`},{id:`mc1-10`,question:`「3台の機械A, B, Cが順に並んでいてAが壊れる確率は状態AかBかで異なるが、A, Bの過去の状態は現在の状態だけで決まる」のはどの性質を使っているか？`,options:[`定常分布の一意性`,`マルコフ性（現在だけで未来が決まる）`,`ポアソン過程の無記憶性`,`ブラウン運動の独立増分`],correctAnswer:1,explanation:`「次の状態は現在の状態だけで決まる（過去は不要）」がマルコフ性です。機械の故障・修理のモデル化、在庫管理、ウェブページのランキング（PageRank）など、マルコフ連鎖は幅広い応用があります。`}]},{id:`3.2-timeseries`,updatedAt:`2026-10-19`,title:`時系列解析`,chapter:10,description:`「過去」から「未来」を読み解く、時間の流れを考慮した統計学。`,content:`💡 **このモジュールで学ぶこと**

「昨日の気温が高かったから、今日のアイス売上も多いだろう」このように過去が未来に影響するデータの分析が**時系列解析**です。このモジュールでは、データの中に潜む「時間のルール」（トレンド・季節性・自己相関）を発見し、ARIMAモデルで未来を予測する方法を学びます。

💡 **アイスクリーム売上には「3つのルール」が隠れている**

あるアイスクリームショップの月次売上（万円）を見てみましょう：

- 1月：150万円（冬は低い）
- 7月：520万円（夏はピーク）
- 翌1月：165万円（昨年より少し増えた）

このデータには3つのパターンが混じっています：
1. **トレンド**：年々売上が少しずつ伸びている（健康ブームの影響）
2. **季節性**：夏は3倍以上売れ、冬は落ち込む（1年周期のパターン）
3. **自己相関**：先週の売上が良いと今週も良い傾向がある

時系列解析では、これらのパターンを数式で捉えて未来を予測します。

[[f-timeseries]]

---

### 1. 自己相関：過去の自分が未来の自分に影響する

**自己相関係数**（Autocorrelation Coefficient）とは、「ある時点の値」と「$k$ 期前の値」の相関係数です。例えばアイス売上の「12か月前との相関」が高ければ「去年の7月が良かったなら今年の7月も良い」というパターンが確認できます。

🎯 **押さえどころ**：
- 自己相関が強い → 過去から予測できる構造がある
- 自己相関がゼロ → **ホワイトノイズ**（完全にランダム。過去から未来を一切予測できない）

**ホワイトノイズ**：平均0・分散一定・自己相関なし、という3条件を満たす系列です。時系列分析の目標は「残差がホワイトノイズになるモデルを見つけること」残差がホワイトノイズなら「取り出せる情報はすべて取り出した」ことになります。

式で書くと、$k$ 期前との自己相関係数は、平均 $\\bar{y}$ からのズレどうしの積を足し合わせて、全体のばらつきで割ったものです。

$$r_k = \\frac{\\sum_{t=1}^{n-k}(y_t-\\bar{y})(y_{t+k}-\\bar{y})}{\\sum_{t=1}^{n}(y_t-\\bar{y})^2}$$

$k$ を横軸、$r_k$ を縦軸に並べた図を**コレログラム**と呼びます。ホワイトノイズなら、$k\\ge1$ の $r_k$ はほぼ $\\pm 2/\\sqrt{n}$ の帯の中に収まります。たとえば $n=100$ なら、帯は $\\pm0.2$ です。

---

### 2. ARIMAモデル：3つの部品を組み合わせる

時系列データの予測で最も有名なモデルが **ARIMA** です。3つの要素の組み合わせです：

- **AR（自己回帰: AutoRegressive）**：過去の自分を参考にする。「昨日の売上が多ければ今日も多いだろう」
- **I（差分: Integrated）**：データの「坂道（トレンド）」を平らにして扱いやすくする操作
- **MA（移動平均: Moving Average）**：過去の「たまたまの外れ（誤差）」の影響を考慮する

3つの部品の次数を並べて **ARIMA$(p,d,q)$** と書きます。$p$ は AR で何期前まで見るか、$d$ は差分を何回取るか、$q$ は MA で何期前の誤差まで見るかです。

**AR(1) の数値例**：平均からのズレ $y_t$ が $y_t = 0.8\\,y_{t-1}+\\varepsilon_t$ に従うとします。今期のズレが $+10$ なら、次の期は平均して $+8$、その次は $+6.4$ と、$0.8$ 倍ずつ薄まります。自己相関も $r_1=0.8,\\ r_2=0.8^2=0.64,\\ r_3\\approx0.51$ と、ゆっくり小さくなります。係数が $1$ に近いほど記憶が長く、$1$ ちょうどになると薄まらず非定常（ランダムウォーク）になります。

**差分（I）の数値例**：月次の売上が $100,\\ 103,\\ 106,\\ 109,\\ 112$ と一定のペースで伸びているとき、隣どうしの差は $3,\\ 3,\\ 3,\\ 3$ で、右肩上がりが消えて平らになります。これが $d=1$ です。差を取っても曲がりが残るときは、もう一度差を取ります（$d=2$）。次数 $(p,d,q)$ は、AIC（小さいほど良い）などで候補を比べて選びます。

ただし、ARIMAモデルを使いこなすには重要な前提条件があります。それが「定常性」です。

---

### 3. 定常性：分析の「土台」

💡 **例で考えましょう**：常に右肩上がりの株価データは平均が時間とともに増え続けるため「非定常」です。一方、毎日の気温の「平均からのズレ」は平均もばらつきも時間によらず安定しているため「定常」です。

- **定常とは？**：平均やばらつきが、時間の経過に関わらず一定である状態

「非定常」なデータはそのままではARIMAモデルがうまく使えません。差分をとるなどして「定常」なデータに変換するのが鉄則です。

定常性を統計的に検定するには **ADF検定（Augmented Dickey-Fuller検定）** が代表的です。「単位根がある（＝非定常）」という帰無仮説を検定し、棄却されれば定常と判断します。

---

### 4. 状態空間モデル

**状態空間モデル**（State Space Model）は「観測できない真の状態」が時間変化し、そこからノイズを含む「観測値」が生成されるという二層構造を持ちます：状態方程式 $\\mathbf{x}_t = F\\mathbf{x}_{t-1} + \\mathbf{w}_t$ と観測方程式 $\\mathbf{y}_t = H\\mathbf{x}_t + \\mathbf{v}_t$ の組み合わせです。

🎯 **押さえどころ**：ARIMAモデルは状態空間モデルの特殊ケースとして表現できます。状態空間モデルはARIMAより一般的な枠組みで、非定常・多変量・欠測値にも対応できます。

---

🎯 **準1級の重要トピック：スペクトル解析**

時系列データには「1年周期」「1週間周期」など複数のリズムが混ざっていることがあります。これらを分解して「どの周期のリズムが最も強いか」を可視化する手法が**スペクトル解析**です。音楽に例えると「曲の中に含まれる音程（周波数）の強さを調べること」に相当します。アイスの例では「365日周期（1年）」のリズムが最も強く現れます。成分分解とは「トレンド＋季節変動＋不規則変動」に分けるプロセスです（加法モデルは単純な足し合わせ、乗法モデルは掛け合わせで、季節変動の振れ幅がトレンドに比例して大きくなる場合は乗法モデルが適します）。`,keyFormulas:[{label:`AR(p) モデル`,formula:`X_t = \\phi_1 X_{t-1} + \\cdots + \\phi_p X_{t-p} + \\varepsilon_t`},{label:`MA(q) モデル`,formula:`X_t = \\varepsilon_t + \\theta_1\\varepsilon_{t-1} + \\cdots + \\theta_q\\varepsilon_{t-q}`},{label:`自己相関係数`,formula:`\\rho_k = \\frac{\\text{Cov}(X_t,\\,X_{t-k})}{\\text{Var}(X_t)}`}],quiz:[{id:`t1-1`,question:`時系列データの統計的性質が時間に依存せず一定である性質を何と呼ぶ？`,options:[`線形性`,`定常性`,`周期性`,`収束性`],correctAnswer:1,explanation:`定常性とは「平均・分散・自己共分散が時点 $t$ によらず一定」という性質です。右肩上がりの株価は平均が時間とともに増えるため非定常、気温の平均からのズレは季節を除けば安定しているため定常に近いです。ARIMAモデルは定常系列にしか使えないため、分析前に差分や対数変換で定常化することが鉄則です。`},{id:`t1-2`,question:`自己回帰、移動平均、および差分を組み合わせた代表的な時系列モデルは？`,options:[`ANOVA`,`PCA`,`ARIMA`,`MCMC`],correctAnswer:2,explanation:`ARIMA（AutoRegressive Integrated Moving Average）は3つの要素の組み合わせです。AR（自己回帰）は「過去の自分の値で現在を予測」、I（差分）は「トレンドを除去して定常化」、MA（移動平均）は「過去の予測誤差を現在に活かす」という意味を持ちます。ARIMA(p,d,q) の $p, d, q$ がそれぞれの次数です。`},{id:`t1-3`,question:`状態空間モデルの「観測方程式」$\\mathbf{y}_t = H\\mathbf{x}_t + \\mathbf{v}_t$ の各要素の説明として正しいものはどれか？`,options:[`$H$ はノイズ、$\\mathbf{v}_t$ は変換行列`,`$\\mathbf{y}_t$ と $\\mathbf{x}_t$ は同じもの`,`$\\mathbf{y}_t$ は真の状態、$\\mathbf{x}_t$ は観測値`,`$\\mathbf{y}_t$ は観測値、$\\mathbf{x}_t$ は観測できない真の状態`],correctAnswer:3,explanation:`状態空間モデルでは「観測できない真の状態 $\\mathbf{x}_t$」から「ノイズを含む観測値 $\\mathbf{y}_t$」が生成される二層構造を持ちます。$H$ は観測行列（状態を観測値に変換）、$\\mathbf{v}_t$ は観測ノイズです。ARIMAも状態空間モデルの特殊ケースとして表現できます。`},{id:`t1-4`,question:`昨日のデータが今日のデータに与える影響の強さを測る指標は？`,options:[`自己相関係数`,`歪度`,`尖度`,`相関係数`],correctAnswer:0,explanation:`自己相関係数（ACF: Autocorrelation Function）は「時刻 $t$ の値と $k$ 期前の値の相関」を測ります。例えば月次売上の12期ラグACFが高ければ「去年の同月と今月に強い関係がある」を意味します。ACFのグラフをコレログラムと呼び、ARモデルとMAモデルを識別するために使います。`},{id:`t1-5`,question:`ARIMAモデルにおいて、データのトレンドを除去するために用いられるのは？`,options:[`AR`,`I（差分）`,`MA`,`定数項`],correctAnswer:1,explanation:`差分（Differencing）は「今期の値から前期の値を引く（$X_t - X_{t-1}$）」操作です。例えば右肩上がりの株価に1階差分をとると「前日比の変動」になり、トレンドが除去されて定常化されます。2回差分（$\\Delta^2 X_t$）で2次トレンドも除去できます。ARIMAの $d$ が差分の回数です。`},{id:`t1-6`,question:`「ホワイトノイズ」とはどのようなデータか？`,options:[`平均が無限大のデータ`,`常に増え続けるデータ`,`完全にランダムで規則性のないデータ`,`強い周期性を持つデータ`],correctAnswer:2,explanation:`ホワイトノイズは「過去のデータから未来を一切予測できない、完全にランダムな系列」です。平均0・分散一定・自己相関なし、という3条件を満たします。時系列分析の目標は「残差がホワイトノイズになるモデルを見つけること」であり、これが達成できれば「取り出せる情報はすべて取り出した」ことになります。`},{id:`t1-7`,question:`時系列データから長期的な傾向、季節変動、不規則変動を分ける操作を何と呼ぶ？`,options:[`主成分抽出`,`周辺化`,`標準化`,`成分分解`],correctAnswer:3,explanation:`時系列を「トレンド（長期傾向）＋季節変動＋不規則変動」に分けるプロセスです。加法モデル（単純な足し合わせ）と乗法モデル（掛け合わせ）があり、季節変動の振れ幅がトレンドに比例して大きくなる場合は乗法モデルが適します。成分分解すると各要因の影響を個別に分析できます。`},{id:`t1-8`,question:`定常性を判定するための代表的な統計的検定は？`,options:[`ADF検定`,`F検定`,`カイ二乗検定`,`t検定`],correctAnswer:0,explanation:`ADF検定（Augmented Dickey-Fuller検定）は「単位根がある（＝非定常）」という帰無仮説を検定します。p値が小さく帰無仮説を棄却できれば定常と判断します。「単位根」とは $X_t = X_{t-1} + \\varepsilon_t$（ランダムウォーク）のような構造で、差分をとると定常になります。ARIMAのモデル構築の最初のステップとして必ず確認します。`},{id:`t1-9`,question:`過去の誤差が現在の値に影響を与えるモデルを何と呼ぶ？`,options:[`ARモデル`,`MAモデル`,`回帰モデル`,`ポアソンモデル`],correctAnswer:1,explanation:`MA（Moving Average）モデル $X_t = \\varepsilon_t + \\theta_1\\varepsilon_{t-1} + \\cdots$ は「過去の予測誤差（ショック）が現在の値に影響を残す」構造です。例えば昨日の突発的な需要増（$\\varepsilon_{t-1}$）が今日の在庫にも影響する場合がこれに当たります。ARモデル（過去の自分の値）とは影響するものが異なる点に注意しましょう。`},{id:`t1-10`,question:`時系列データに含まれる複数の周期リズムを「周波数領域」で分析し、どの周期が最も強いかを可視化する手法は？`,options:[`成分分解`,`ADF検定`,`スペクトル解析`,`ARIMAモデル`],correctAnswer:2,explanation:`スペクトル解析は時系列データに混在する「1年周期」「1週間周期」などの複数のリズムを周波数領域で分析します。例えばアイスクリームの売上には365日周期のリズムが最も強く現れます。成分分解（トレンド＋季節変動＋不規則変動）が時間領域で分析するのに対し、スペクトル解析は周波数領域での分析です。加法モデル（単純な足し合わせ）と乗法モデル（掛け合わせ）の違いも重要で、季節変動の振れ幅がトレンドに比例する場合は乗法モデルが適します。`}]},{id:`3.4-contingency`,updatedAt:`2026-10-20`,title:`分割表の解析`,chapter:11,description:`カテゴリデータの関連性を測るオッズ比・連関係数から、対数線形モデルまで学びます。`,content:`💡 **このモジュールで学ぶこと**

「喫煙と肺がんの関連はどのくらい強いか？」「新聞購読と政治的意見は関連しているか？」カテゴリ変数どうしの関係を分析するのが**分割表の解析**です。連続変数の相関係数に相当するものとして、オッズ比・連関係数・対数線形モデルを学びます。

💡 **分割表：カテゴリ×カテゴリのクロス集計**

2つのカテゴリ変数を縦軸・横軸にとってカウントした表を**分割表**（Contingency Table）と呼びます。最もシンプルな2×2分割表の例：「喫煙×肺がん」

|  | 肺がん有 | 肺がん無 |
| --- | --- | --- |
| 喫煙者 | $a$ | $b$ |
| 非喫煙者 | $c$ | $d$ |

---

### 1. オッズ比と連関係数

**オッズ比**（Odds Ratio, OR）は2×2分割表の最重要指標です。喫煙→肺がんのオッズ比：

$$\\text{OR} = \\frac{a/b}{c/d} = \\frac{ad}{bc}$$

- $\\text{OR} = 1$：2変数は関連なし（独立）
- $\\text{OR} > 1$：リスク因子（喫煙者は非喫煙者より肺がんになりやすい）
- $\\text{OR} < 1$：保護因子

対数オッズ比 $\\log(\\text{OR})$ は正規分布で近似しやすく、信頼区間の計算に使われます：

$$\\text{SE}(\\log \\text{OR}) = \\sqrt{\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}+\\frac{1}{d}}$$

**数値例**：ある喫煙調査で $a=8,\\ b=2,\\ c=3,\\ d=7$（$n=20$）だったとします。

- オッズ比：$\\text{OR} = \\dfrac{8\\times7}{2\\times3} = \\dfrac{56}{6}\\approx 9.3$。喫煙者の肺がんのオッズは、非喫煙者の約9倍です
- 対数オッズ比：$\\log 9.33\\approx 2.23$、標準誤差：$\\sqrt{1/8+1/2+1/3+1/7}\\approx 1.05$
- 95%信頼区間：$2.23\\pm1.96\\times1.05$ より $(0.18,\\ 4.29)$。指数に戻すと **約1.2 から 73**

区間に1（関連なし）が含まれないので、補正なしの検定と同じく5%で有意ですが、幅は非常に広いです。20人の調査では、「9倍」という点推定をそのまま信じられません。オッズ比は、信頼区間とセットで読みます。

**ファイ係数**（$\\phi$）：2×2表の相関係数の類似物：$\\phi = \\dfrac{ad-bc}{\\sqrt{(a+b)(c+d)(a+c)(b+d)}}$。$-1 \\leq \\phi \\leq 1$（$|\\phi|$ が 0.1 前後は弱い関連、0.3 前後は中程度、0.5 以上は強い関連の目安）。上の数値例では $\\phi=\\dfrac{56-6}{\\sqrt{10\\times10\\times11\\times9}}\\approx 0.50$ で、強い関連です。$\\chi^2=n\\phi^2=20\\times0.25\\approx5.05$ という関係もあり、2.の補正なしの検定統計量と一致します。

**クラメルのV**：$k\\times l$ 表の連関の強さ：$V = \\sqrt{\\chi^2/(n \\cdot (\\min(k,l)-1))}$。2×2表では $\\min(k,l)-1=1$ なので $V=|\\phi|$ になり、0（独立）から1（完全な連関）の値をとります。

---

### 2. 分割表の独立性検定

「2変数が独立かどうか」を$\\chi^2$ 検定で判断します。

**$\\chi^2$ 検定**：独立の帰無仮説のもとで期待度数 $E_{ij} = n_{i\\cdot} n_{\\cdot j}/n$（行総計×列総計/全体）を計算し：

$$\\chi^2 = \\sum_{i,j} \\frac{(O_{ij} - E_{ij})^2}{E_{ij}} \\sim \\chi^2((k-1)(l-1))$$

（二乗する理由：正と負の差が相殺しないため。$E_{ij}$ で割る理由：期待度数が大きいセルでは同じ「ズレ」でも相対的に小さいため、各セルを公平に評価するよう正規化する）

自由度は $(k-1)(l-1)$（行数-1）×（列数-1）。

**注意**：期待度数が5未満のセルがある場合は$\\chi^2$ 近似が不適切で、フィッシャーの正確検定を使います。

**イエーツの連続性補正**：2×2表の検定統計量は整数の度数から作るのでとびとびの値をとりますが、比べる相手の $\\chi^2$ 分布は連続です。このずれで、補正なしの検定は有意になりやすくなります。そこで各セルのズレ $|O_{ij}-E_{ij}|$ から $0.5$ を引いてから二乗します。

$$\\chi^2_{\\text{Yates}} = \\sum_{i,j} \\frac{\\left(|O_{ij} - E_{ij}| - 0.5\\right)^2}{E_{ij}}$$

自由度が1になる2×2表で使う補正です。たとえば $a=8,\\ b=2,\\ c=3,\\ d=7$（$n=20$）では、期待度数は $5.5,\\ 4.5,\\ 5.5,\\ 4.5$ で、どのセルもズレは $2.5$ です。

| | 検定統計量 | $p$ 値（自由度1） |
| --- | --- | --- |
| 補正なし | $6.25\\times 0.808 \\approx 5.05$ | 約 $0.025$（5%で有意） |
| イエーツの補正 | $4\\times 0.808 \\approx 3.23$ | 約 $0.072$（5%では有意でない） |

（$0.808 = 2/5.5 + 2/4.5$）同じデータでも、補正すると結論が変わりました。補正は慎重な側に倒す操作なので、保守的すぎるという批判もあります。標本が小さい2×2表では、補正の有無で迷うより、フィッシャーの正確検定を使うほうが素直です。2×2表では、次の簡易式でも計算できます。

$$\\chi^2 = \\frac{n(ad-bc)^2}{(a+b)(c+d)(a+c)(b+d)}$$

補正を入れるときは、分子の $(ad-bc)^2$ を $(|ad-bc|-n/2)^2$ に置き換えます。上の例では $3.23$ になり、表の値と一致します。

---

### 3. 対数線形モデル

2変数の独立性検定を超えて、3変数以上のカテゴリ間の複雑な関係を記述するのが**対数線形モデル**です。

2変数 $A$, $B$ の2×2表で、独立モデルの対数線形表現：

$$\\log m_{ij} = \\mu + \\lambda_i^A + \\lambda_j^B$$

交互作用を加えると：$\\log m_{ij} = \\mu + \\lambda_i^A + \\lambda_j^B + \\lambda_{ij}^{AB}$

$\\lambda_{ij}^{AB} = 0$（すべての $i, j$）なら独立モデルです。

**階層モデル**（Hierarchical Model）：高次の交互作用項が含まれるなら、それより低次の項も必ず含めるモデルです。実用上ほとんどの対数線形モデルは階層モデルです。

---

### 4. 条件付き独立性とグラフィカルモデル

**条件付き独立性**（Conditional Independence）：第3の変数 $C$ を与えたとき、$A$ と $B$ が独立になる性質。

例：「気温」を固定すれば「犯罪率」と「アイスクリームの売上」は独立（暑さという共通原因が両方を増やしていた）。

**グラフィカルモデル**（Graphical Model）：変数を頂点、条件付き依存関係を辺とするグラフで分布の構造を表現します。辺のないペアは条件付き独立です。

$k \\times l$ 分割表の残差分析：ピアソン残差 $r_{ij} = (O_{ij} - E_{ij})/\\sqrt{E_{ij}}$ が絶対値2以上のセルは独立から大きく外れています。

🎯 **押さえどころ**：オッズ比の計算 $ad/bc$ と独立性検定の自由度 $(k-1)(l-1)$ が、分割表の計算で使う2つの式です。前者は関連の強さ、後者は独立性検定の判断に使います。`,keyFormulas:[{label:`オッズ比`,formula:`\\text{OR} = \\dfrac{ad}{bc}`},{label:`ファイ係数`,formula:`\\phi = \\dfrac{ad-bc}{\\sqrt{(a+b)(c+d)(a+c)(b+d)}}`},{label:`独立性検定の $\\chi^2$`,formula:`\\begin{aligned} \\chi^2 &= \\sum_{i,j}\\dfrac{(O_{ij}-E_{ij})^2}{E_{ij}} \\\\ &\\sim \\chi^2((k-1)(l-1)) \\end{aligned}`},{label:`独立モデルの期待度数`,formula:`E_{ij} = \\dfrac{n_{i\\cdot}\\, n_{\\cdot j}}{n}`}],quiz:[{id:`ct1-1`,question:`2×2分割表でオッズ比 $\\text{OR} = ad/bc$ において $\\text{OR} = 1$ は何を意味するか？`,options:[`2変数が独立（関連なし）`,`サンプルサイズが不十分`,`強い正の関連`,`強い負の関連`],correctAnswer:0,explanation:`$\\text{OR} = 1$ は「グループ間でオッズが等しい」ことを意味し、2変数が独立であることを示します。$\\text{OR} > 1$ はリスク因子、$\\text{OR} < 1$ は保護因子の存在を示します。`},{id:`ct1-2`,question:`2×2分割表で $a=40, b=10, c=20, d=30$ のときオッズ比はいくらか？`,options:[`$3$`,`$6$`,`$4$`,`$2$`],correctAnswer:1,explanation:`$\\text{OR} = ad/bc = 40 \\times 30 / (10 \\times 20) = 1200/200 = 6$。第1グループのオッズは第2グループの6倍です。`},{id:`ct1-3`,question:`3×4分割表の独立性検定の自由度はいくらか？`,options:[`$12$`,`$11$`,`$6$`,`$7$`],correctAnswer:2,explanation:`$(k-1)(l-1) = (3-1)(4-1) = 2 \\times 3 = 6$。一般に $k \\times l$ 分割表の自由度は $(k-1)(l-1)$ です。`},{id:`ct1-4`,question:`分割表の独立性検定でフィッシャーの正確検定を使うべき状況はどれか？`,options:[`3変数以上を扱うとき`,`連続変数との関連を調べるとき`,`サンプルが大きいとき`,`期待度数が小さい（5未満）セルがあるとき`],correctAnswer:3,explanation:`$\\chi^2$ 統計量はカウントが小さいとき漸近近似が悪くなります。期待度数が5未満のセルがあるとき（特に2×2表）は、超幾何分布に基づくフィッシャーの正確検定を使うことが推奨されます。`},{id:`ct1-5`,question:`対数線形モデル $\\log m_{ij} = \\mu + \\lambda_i^A + \\lambda_j^B$ が表すのはどの仮定か？`,options:[`$A$ と $B$ が独立（交互作用なし）`,`$A$ と $B$ の交互作用がある`,`全セルの度数が等しい`,`$A$ と $B$ が完全に依存している`],correctAnswer:0,explanation:`交互作用項 $\\lambda_{ij}^{AB}$ がないモデルは独立モデルです。$\\lambda_{ij}^{AB}$ を追加すると非独立（関連あり）モデルになります。対数線形モデルは $\\chi^2$ 検定を一般化したもので、多変数の関係を体系的に扱えます。`},{id:`ct1-6`,question:`条件付き独立性 $A \\perp B \\mid C$ の意味はどれか？`,options:[`$A$ と $B$ が周辺独立`,`$C$ を固定すると $A$ と $B$ が独立`,`$C$ が $A$ の原因であり $B$ の原因でもある`,`$A$, $B$, $C$ がすべて互いに独立`],correctAnswer:1,explanation:`条件付き独立性は「$C$ を与えたとき（$C$ の値を固定したとき）$A$ と $B$ が独立」です。周辺的に関連していても、交絡変数 $C$ を制御すると独立になることがあります（シンプソンのパラドックスの文脈でも重要）。`},{id:`ct1-7`,question:`ピアソン残差 $r_{ij} = (O_{ij} - E_{ij})/\\sqrt{E_{ij}}$ が $|r_{ij}| > 2$ のセルは何を示すか？`,options:[`期待度数が5以上ある`,`サンプルサイズが不足している`,`独立性から大きく外れているセル`,`分割表のモデルが正しい`],correctAnswer:2,explanation:`ピアソン残差の絶対値が2を超えると独立の仮定から5%水準で有意にずれているセルです（正規近似で約2標準偏差）。どのセルが独立性を乱しているかを特定する「残差分析」に使います。`},{id:`ct1-8`,question:`対数線形モデルの「階層モデル」とはどういうモデルか？`,options:[`AICで選ばれたモデル`,`サンプルサイズが大きいモデル`,`変数の数が多い順に並べたモデル`,`高次の交互作用を含むなら低次の主効果も必ず含めるモデル`],correctAnswer:3,explanation:`階層モデルは「$AB$ の交互作用 $\\lambda_{ij}^{AB}$ を含むなら $\\lambda_i^A$ と $\\lambda_j^B$ も必ず含む」という条件を課したモデルです。統計的に自然な解釈ができ、実用上ほとんどの対数線形モデルはこの形をとります。`},{id:`ct1-9`,question:`クラメルのV係数が測るものはどれか？`,options:[`$k \\times l$ 表における変数間の連関の強さ`,`カテゴリ変数と連続変数の相関`,`回帰係数の大きさ`,`2×2表の相関のみ`],correctAnswer:0,explanation:`クラメルのV $= \\sqrt{\\chi^2/(n(\\min(k,l)-1))}$ は2×2より大きな分割表でも使える連関指標で、$0 \\leq V \\leq 1$（0が独立、1が完全連関）です。ファイ係数は2×2表に特化しています。`},{id:`ct1-10`,question:`グラフィカルモデルで「辺のないペアの変数」が意味することはどれか？`,options:[`他のすべての変数を与えたとき条件付き独立`,`その2変数は同一分布`,`他の変数との辺の数が最大`,`その2変数の相関係数が1`],correctAnswer:0,explanation:`グラフィカルモデルでは辺の欠落が「条件付き独立性」を表します。辺がない $A-B$ ペアは「他の変数を与えたとき $A \\perp B$」です。これにより複雑な多変数の依存構造をグラフの形で直感的に理解できます。`}]},{id:`3.5-survival`,updatedAt:`2026-10-21`,title:`生存時間解析：カプラン・マイヤーとCox比例ハザード`,chapter:11,description:`打ち切りデータの扱い方・カプラン・マイヤー推定・Cox比例ハザードモデルを学びます。`,content:`💡 **このモジュールで学ぶこと**

「新薬を投与した患者が再発するまでの時間を追跡したが、調査終了時点でまだ再発していない患者がいる」このような「イベントが観測されていないデータ（打ち切り）」を正しく扱う手法が**生存時間解析**です。

💡 **具体例：100人の癌患者を5年追跡**

100人の癌患者を5年間追跡する研究を考えます。「イベント」は死亡、「打ち切り」は研究終了時にまだ生存しているか、転居等で連絡が途絶えたケースです。5年後に40人が死亡、60人が打ち切りだったとします。

このとき「平均生存時間 $=$ 観測された生存時間の単純平均」とすると **重大なバイアス** が生じます。なぜなら60人の打ち切り患者は「少なくとも5年以上生存した」ことが分かっていても、その後何年生きるかは不明だからです。「彼らは5年で死んだ」と扱うと過小推定、「除外」しても残ったのは早く死んだ人ばかりで過小推定になります。

生存関数 $S(t)$ を **Kaplan-Meier 法** で推定すると、打ち切り情報を「リスク集合の人数」として活用し、バイアスなく生存曲線を描けます。

**右打ち切り**（Right Censoring）：調査終了時やフォローアップ中断でイベント（死亡・再発）が観測されなかった場合です。「少なくとも $t$ 時間以上生存した」という情報は有効で、捨てるべきではありません。

---

### 1. 生存関数とハザード関数

**生存関数**（Survival Function）$S(t) = P(T > t)$：時刻 $t$ まで生存している確率。単調非増加で $S(0) = 1$、$S(\\infty) = 0$。

**ハザード関数**（Hazard Function）$h(t)$：時刻 $t$ まで生存した人が、$t$ から $dt$ の微小時間内に死亡する瞬間の「リスクの強さ」：

$$h(t) = \\lim_{\\Delta t \\to 0} \\frac{P(t \\leq T < t + \\Delta t \\mid T \\geq t)}{\\Delta t}$$

💡 **ハザード関数の直感**：「**今この瞬間に生きている人が、次の一瞬で死ぬ条件付きリスク率**」と読み替えられます。生存関数 $S(t)$ が「累積した結果」を表すのに対し、ハザード関数 $h(t)$ は「その時点の瞬間的な危険度」を表します。年齢で例えれば、$S(80)$ は「80歳まで生きる確率」、$h(80)$ は「80歳の人が81歳になる前に死ぬ条件付き割合」です。

生存関数とハザード関数は $S(t) = \\exp\\!\\left(-\\int_0^t h(u)\\,du\\right)$ で結びついています（$\\int_0^t h(u)du$ を累積ハザード関数と呼びます）。

---

### 2. カプラン・マイヤー推定量

**カプラン・マイヤー推定量**（Kaplan-Meier Estimator）は打ち切りデータを含む生存曲線の積極限推定量です：

$$\\hat{S}(t) = \\prod_{t_i \\leq t} \\left(1 - \\frac{d_i}{n_i}\\right)$$

$t_i$：死亡が起きた時刻、$d_i$：その時刻の死亡数、$n_i$：その直前のリスク集合（観察中の人数）。

[[f-km]]

「各イベント時刻で条件付き生存確率を掛け合わせる」という直感です。段階関数（階段状）として描かれ、打ち切り観測は推定に寄与しますが死亡とは扱いません。

**数値例**：10人を追跡し、死亡が2か月・5か月・8か月（2人）、打ち切り（まだ生存）が3か月と6か月にあったとします。

| 時刻 $t_i$ | 直前のリスク集合 $n_i$ | 死亡数 $d_i$ | $1-d_i/n_i$ | $\\hat{S}(t_i)$ |
| --- | --- | --- | --- | --- |
| 2 | 10 | 1 | $9/10$ | $0.900$ |
| 3（打ち切り） | 9 | 0 | $1$ | $0.900$ |
| 5 | 8 | 1 | $7/8$ | $0.788$ |
| 6（打ち切り） | 7 | 0 | $1$ | $0.788$ |
| 8 | 6 | 2 | $4/6$ | $0.525$ |

打ち切りの行では、曲線は下がりません。ただ、次の行の $n_i$ が1人ぶん減ります。5か月の $n_i=8$ は、10人から「2か月の死亡1人」と「3か月の打ち切り1人」が抜けた人数です。仮に3か月の人を死亡と数えると、$\\hat{S}$ が $0.900$ から $0.800$ に下がり、生存率を低く見積もってしまいます。

💡 **打ち切りはなぜ「捨てない」のか**：打ち切られた患者も「$t$ 時点まではリスク集合に含まれていた（生きていた）」という情報を提供します。Kaplan-Meier 法は、その時刻まで $n_i$ にカウントし、打ち切り後はリスク集合から外す、という形で全情報を活用します。

⚠️ **よくある誤解**：「打ち切り時刻を死亡時刻と同様に使って生存率を直接計算する」のは誤りです。Kaplan-Meier の式 $\\hat{S}(t) = \\prod (1 - d_i/n_i)$ で**打ち切り時刻 $c_j$ そのものは $d_i$（死亡数）にも分子の積にも入りません**。打ち切られた人は「その時刻までリスク集合の人数 $n_i$ を支えていた」という形でのみ寄与し、打ち切り時刻以降は静かに $n_i$ から抜けます。「打ち切り = 死亡として扱う」とすると生存時間を著しく過小評価することになります。

---

### 3. Cox比例ハザードモデル

**Cox比例ハザードモデル**（Cox Proportional Hazards Model）は、共変量（年齢・治療法など）がハザードに与える効果を推定します：

$$h(t \\mid \\mathbf{x}) = h_0(t) \\cdot \\exp(\\boldsymbol{\\beta}^\\top \\mathbf{x})$$

$h_0(t)$ は**ベースラインハザード**（形を指定しない）、$\\exp(\\boldsymbol{\\beta}^\\top\\mathbf{x})$ が共変量の効果を乗法的に修正します。

**比例ハザード仮定**：2つのグループのハザード比 $\\exp(\\boldsymbol{\\beta}^\\top(\\mathbf{x}_1-\\mathbf{x}_2))$ が時間 $t$ によらず一定。

パラメータは**部分尤度**で推定します。$e^{\\beta_j}$ が「$x_j$ が1増えたときのハザード比」です。

**数値例**：新薬群を $x=1$、従来薬群を $x=0$ として $\\hat\\beta=-0.5$ と推定されたとします。ハザード比は $e^{-0.5}\\approx0.61$ で、新薬群は、どの時点でも従来薬群の約6割のハザードです（約4割低い）。生存関数では $S_1(t)=S_0(t)^{0.61}$ の関係があるので、従来薬群の5年生存率が $0.50$ なら、新薬群は $0.50^{0.61}\\approx0.66$ です。ハザード比 $0.61$ は「生存率が6割になる」ではなく、「ある瞬間の死亡リスクが6割になる」という意味です。

💡 **「セミパラメトリック」の意味**：パラメトリックモデル（指数・ワイブル分布など）は $h_0(t)$ の形を完全に指定します。Cox モデルは $h_0(t)$ を一切指定せず（ノンパラメトリック）、共変量の効果 $\\boldsymbol{\\beta}$ のみをパラメトリックに推定します。この「半分だけパラメトリック」な構造が、柔軟性と解釈性を両立させる強みです。

---

### 4. 比例ハザード仮定の検証

比例ハザード（PH）仮定が成立しない場合、Cox モデルの解釈は怪しくなります。

**検証方法**：

1. **$\\log(-\\log \\hat{S}(t))$ プロット**：グループ別の Kaplan-Meier 曲線から計算した $\\log(-\\log \\hat{S}(t))$ を $\\log t$ に対してプロット。PH 仮定が成立すれば、曲線同士が **平行**（等間隔）になります。
2. **Schoenfeld 残差**：時間との相関が0であれば PH 仮定 OK。相関が有意なら違反のサイン。
3. **時間と共変量の交互作用項を追加**：$\\beta_j \\cdot x_j + \\gamma_j \\cdot x_j \\cdot t$ を当てはめて $\\gamma_j$ が有意なら違反。

💡 **PH 違反時の対処**：(a) 時間依存共変量を導入する、(b) データを時間区間で層別化する、(c) 加速失敗時間（AFT）モデルなど別の構造を検討する、といった選択肢があります。

---

### 5. Kaplan-Meier vs Cox：使い分け表

| 項目 | Kaplan-Meier 法 | Cox 比例ハザード |
|------|-----------------|------------------|
| 目的 | 生存曲線そのものの推定 | 共変量の効果（ハザード比）の推定 |
| 共変量 | 扱えない（群別比較のみ） | 連続・カテゴリの共変量を扱える |
| 仮定 | 打ち切りが無情報 | PH 仮定＋無情報打ち切り |
| 出力 | 階段状の $\\hat{S}(t)$ | $\\hat{\\boldsymbol{\\beta}}$ と $e^{\\hat{\\beta}_j}$（ハザード比） |
| 群間比較 | ログランク検定で実施 | 係数の Wald 検定で実施 |
| 推奨場面 | 「治療群と対照群の生存曲線を可視化したい」 | 「年齢・性別・治療を調整したリスクを評価したい」 |

🎯 **押さえどころ**：Cox モデルは $h_0(t)$ の形を指定しない「セミパラメトリックモデル」です。比例ハザード仮定の確認には $\\log$-$\\log$ プロットや Schoenfeld 残差を使います。係数 $\\beta_j = 0.7$ なら $e^{0.7} \\approx 2.0$ 倍のハザード比、と解釈できる点も押さえておきます。`,keyFormulas:[{label:`カプラン・マイヤー推定量`,formula:`\\hat{S}(t) = \\prod_{t_i \\leq t}\\left(1 - \\dfrac{d_i}{n_i}\\right)`},{label:`Cox比例ハザードモデル`,formula:`h(t\\mid\\mathbf{x}) = h_0(t)\\cdot\\exp(\\boldsymbol{\\beta}^\\top\\mathbf{x})`},{label:`生存関数とハザード`,formula:`S(t) = \\exp\\!\\left(-\\int_0^t h(u)\\,du\\right)`}],quiz:[{id:`sur1-1`,question:`生存時間解析で「打ち切り」データを除外して解析するとどうなるか？`,options:[`推定精度が上がる`,`バイアスが生じる（生存時間を過小推定する）`,`標準誤差が下がる`,`影響なし`],correctAnswer:1,explanation:`打ち切り観測を除外すると「長く生存した人」を除くことになり、生存時間を過小推定するバイアスが生じます。カプラン・マイヤー法は打ち切り情報を正しく利用することでバイアスのない推定を実現します。`},{id:`sur1-2`,question:`カプラン・マイヤー推定量の特徴として正しいものはどれか？`,options:[`パラメータが正規分布に従う`,`連続的な曲線を出力する`,`打ち切りデータを含む段階関数（階段状）の生存曲線を与える`,`Cox比例ハザードの特殊ケース`],correctAnswer:2,explanation:`カプラン・マイヤー推定量はイベント発生時刻で確率が下がる階段関数です。打ち切り観測はリスク集合 $n_i$ の計算に利用しますが、生存確率の「下がり」に寄与しません。ノンパラメトリックな方法です。`},{id:`sur1-3`,question:`Cox比例ハザードモデルが「セミパラメトリック」と呼ばれる理由はどれか？`,options:[`分布の仮定が半分しかない`,`共変量が連続とカテゴリの両方を含む`,`サンプルサイズが中程度のときのみ使える`,`共変量の効果がパラメータで表されるが、ベースラインハザードは指定しない`],correctAnswer:3,explanation:`Coxモデルは共変量の効果 $\\boldsymbol{\\beta}$（パラメトリック）を推定しますが、ベースラインハザード $h_0(t)$（ノンパラメトリック）の形を指定しません。この「半分だけパラメータ」な構造からセミパラメトリックと呼ばれます。`},{id:`sur1-4`,question:`Cox モデルの係数 $\\beta_j = 0.7$ の解釈として正しいものはどれか？`,options:[`$x_j$ が1増えるとハザード比が $e^{0.7} \\approx 2.0$ 倍になる`,`$x_j$ が1増えると生存確率が70%上がる`,`$x_j$ が1増えると生存時間の期待値が0.7年増加する`,`$x_j$ が1増えるとハザードが0.7増加する`],correctAnswer:0,explanation:`Cox モデルの係数はハザード比の対数なので、$x_j$ が1増えるとハザードが $e^{\\beta_j}$ 倍になります。$e^{0.7} \\approx 2.0$ 倍なので「$x_j$ が1増えるとリスクが約2倍になる」と解釈します。`},{id:`sur1-7`,question:`ハザード関数 $h(t)$ と生存関数 $S(t)$ の関係として正しいものはどれか？`,options:[`$h(t) = S'(t)$`,`$S(t) = 1/h(t)$`,`$S(t) = h(t)$`,`$S(t) = \\exp(-\\int_0^t h(u)du)$`],correctAnswer:3,explanation:`$S(t) = \\exp(-H(t))$（$H(t) = \\int_0^t h(u)du$ は累積ハザード）という関係があります。ハザードが大きいほど生存関数が急激に減少します。この関係はパラメトリックモデル（指数・ワイブル分布など）でも使われます。`},{id:`sur1-9`,question:`Cox比例ハザードモデルの「比例ハザード仮定」の検証に使われる手法はどれか？`,options:[`DW比`,`$\\log(-\\log S(t))$ に対するプロット（対数-対数プロット）`,`残差の正規性検定`,`Q-Qプロット`],correctAnswer:1,explanation:`比例ハザード仮定が成立するとき、カプラン・マイヤー曲線から求めた $\\log(-\\log \\hat{S}(t))$ を $\\log t$ に対してプロットすると、グループ間で曲線が平行（等間隔）になります。交差するようであれば仮定の違反を示します。`},{id:`sur1-11`,question:`右打ち切り（Right Censoring）が発生する典型的な状況はどれか？`,options:[`調査終了時点でまだイベントが観測されていない`,`データの入力ミスでイベント時刻が不明`,`イベントが複数回発生した`,`調査開始前にイベントが発生していた`],correctAnswer:0,explanation:`右打ち切りは「観察期間が終了した時点でイベント（死亡・再発等）がまだ起きていない」場合です。「少なくとも $t$ 時間以上生存した」という情報は有効であり、単純に除外するとバイアスが生じます。`},{id:`sur1-12`,question:`カプラン・マイヤー推定量 $\\hat{S}(t) = \\prod_{t_i \\leq t}(1 - d_i/n_i)$ において $n_i$ が表すものはどれか？`,options:[`時刻 $t_i$ での死亡者数`,`時刻 $t_i$ 直前のリスク集合（観察中の人数）`,`時刻 $t_i$ での打ち切り数`,`累積ハザード`],correctAnswer:1,explanation:`$n_i$ は時刻 $t_i$ の直前において「まだイベントを経験していない・打ち切られていない」観察対象の人数（リスク集合）です。$d_i/n_i$ は「その時刻でのリスク集合の中で実際に死亡した割合」であり、条件付き死亡確率の推定値です。`},{id:`sur1-13`,question:`生存関数 $S(t)$ の性質として正しくないものはどれか？`,options:[`$S(\\infty) = 0$`,`単調非増加`,`必ず連続関数`,`$S(0) = 1$`],correctAnswer:2,explanation:`生存関数は $S(0)=1$（初期は全員生存）、$S(\\infty)=0$（いずれは全員イベント）、単調非増加（時間とともに確率が下がる）の性質を持ちますが、カプラン・マイヤー推定量のように連続でない（段階関数）ことがあります。`},{id:`sur1-14`,question:`Cox比例ハザードモデルの「比例ハザード仮定」が意味することはどれか？`,options:[`ベースラインハザードが定数`,`ハザード関数が単調増加`,`すべての群のハザードが等しい`,`2つの群のハザード比が時間によらず一定`],correctAnswer:3,explanation:`比例ハザード仮定とは「2群のハザード比 $h_1(t)/h_2(t) = \\exp(\\beta^\\top(x_1-x_2))$ が時間 $t$ によらず一定」という仮定です。これが成立しないとき（群間でハザードが交差するとき）はCoxモデルの適用が問題になります。`}]},{id:`2.8-sampling`,updatedAt:`2026-10-18`,title:`標本調査法：有限母集団からの抽出`,chapter:11,description:`有限修正係数と、単純無作為・系統・層化・クラスター・多段の各抽出法を、分散の式と使い分けで整理します。`,content:`💡 **このモジュールで学ぶこと**

世論調査や品質検査は、母集団の全員を調べず、一部を抜き出して全体を推測します。このとき母集団が有限であること、そして**どう抜き出すか**が、推定の精度と費用を左右します。このモジュールでは、有限母集団の分散の補正と、5つの抽出法の特徴・長所短所・使い分けを整理します。

---

### 1. 有限母集団の補正：標本の割合が大きいときの分散

標準誤差の式 $\\sigma/\\sqrt{n}$ は、母集団が非常に大きい（または復元抽出）という前提で成り立ちます。母集団が $N$ 人しかいない有限母集団から**非復元**で $n$ 人を抜き出すと、一度選ばれた人は二度と選ばれないので、標本平均のばらつきは前提の式より小さくなります。

母分散を $\\sigma^2$（$N$ で割った分散）とすると、非復元の単純無作為抽出での標本平均の分散は次のとおりです。

$$\\text{Var}(\\bar{X}) = \\frac{\\sigma^2}{n} \\cdot \\frac{N-n}{N-1}$$

後ろの $\\dfrac{N-n}{N-1}$ が**有限修正係数**です。$N$ に対して $n$ が小さければほぼ1になり、補正は不要です。目安は $n/N$ が5%未満のときで、全国の有権者を数千人で調べる世論調査では補正を気にしなくてかまいません。逆に、クラス40人のうち30人を調べるような場合は係数が約0.26となり、標準誤差は大きく縮みます。全員を調べれば $n=N$ で係数は0、つまり誤差が消えます。

⚠️ **よくある取り違え**：有限修正は「標本が大きいと精度が上がる」という話の言い換えではありません。$n$ を増やす効果（$1/n$）とは別に、**母集団に占める割合 $n/N$** が効く補正です。

前節の式は、どの個体も同じ確率で選ばれる抜き出し方を前提にしていました。次は、実際に使われる抜き出し方の種類を見ます。

---

### 2. 単純無作為抽出と系統抽出

**単純無作為抽出**は、母集団のどの個体も、どの組み合わせも、同じ確率で選ばれる抽出です。理論の基準になる方法で、前節の式もこれを前提にしています。ただし、母集団の名簿が全員分そろっていて、乱数で選んだ人に実際に会いにいける必要があります。

**系統抽出**は、名簿から最初の1人を乱数で決め、あとは一定の間隔で拾う方法です。間隔は $k = N/n$ で決めます。名簿が100,000人で1,000人を選ぶなら、$k=100$ で、最初に乱数で37番を引けば 37, 137, 237, … と選びます。乱数表を何度も引かずに済むので作業が楽です。

⚠️ **系統抽出の落とし穴**：名簿の並びに間隔 $k$ と同じ周期があると、偏った標本になります。たとえば世帯名簿が「各ブロックの1番目が世帯主・以後は家族」の順で、$k$ がブロックの大きさと一致すると、世帯主ばかりを拾います。並びに周期性がないかを確かめるのが条件です。

---

### 3. 層化抽出：先に分けてから抜く

母集団を、調べたい量が似た者どうしの**層**に分け、各層から別々に無作為抽出する方法です。男女・年代・都道府県のように、事前にわかっている属性で分けます。

層 $h$ の大きさを $N_h$、標本数を $n_h$ とすると、母平均の推定量は層ごとの標本平均を層の重み $W_h = N_h/N$ で足し合わせたものです。

$$\\bar{x}_{st} = \\sum_h W_h \\bar{x}_h$$

その分散には、層の中のばらつきだけが入ります。

$$\\text{Var}(\\bar{x}_{st}) = \\sum_h W_h^2 \\cdot \\frac{S_h^2}{n_h}\\left(1-\\frac{n_h}{N_h}\\right)$$

層の間の差は分散に入らないので、**層を「中は似ていて、層どうしは違う」ように切る**ほど、単純無作為抽出より精度が上がります。層の切り方が悪い（層内がばらばら）と、効果はほとんどありません。

層ごとに標本数をどう配分するかには2つの考え方があります。

- **比例配分**：$n_h = n \\cdot N_h/N$。母集団の構成比と標本の構成比が一致します。
- **ネイマン配分**：$n_h \\propto N_h S_h$。大きい層、ばらつきの大きい層に多く割り当てると、同じ総数で分散が最小になります。

**数値例**：母集団 $N=1000$ 人を、層A（800人・平均50・標準偏差10）と層B（200人・平均70・標準偏差40）に分け、$n=100$ 人を抜きます。有限修正は省いて、標本平均の分散を比べます。

| 抜き方 | 標本数（A, B） | 標本平均の分散 | 標準誤差 |
| --- | --- | --- | --- |
| 単純無作為 | （層に分けない） | $464/100 = 4.64$ | $2.15$ |
| 層化・比例配分 | $80, 20$ | $0.64\\times\\frac{100}{80} + 0.04\\times\\frac{1600}{20} = 4.00$ | $2.00$ |
| 層化・ネイマン配分 | $50, 50$ | $0.64\\times\\frac{100}{50} + 0.04\\times\\frac{1600}{50} = 2.56$ | $1.60$ |

単純無作為の $464$ は、母集団全体の分散です。層の中のばらつきの平均 $0.8\\times100+0.2\\times1600=400$ に、層の平均の違いによるぶん $0.8\\times16+0.2\\times256=64$ が加わっています。比例配分は、この層間の $64$ を分散から除けるので、$4.64-4.00=64/100$ だけ小さくなります。ネイマン配分は、$N_hS_h$ が両層とも $8000$ で等しいため、層Bの人数を20人から50人に増やします。ばらつきの大きい層を厚く調べるほうが、全体の精度が上がります。

🎯 **押さえどころ**：「層化抽出は、層内の分散が小さいほど効果が大きい」「ネイマン配分は $N_h S_h$ に比例」の2点です。

---

### 4. クラスター抽出と多段抽出

**クラスター抽出**（集落抽出）は、個人を直接選ばず、学校・町丁・事業所のようなまとまり（クラスター）を無作為に選び、選ばれたクラスターの全員を調べる方法です。名簿が個人単位でなくても、移動や訪問の手間が小さくなるので、費用が安く済みます。

その代わり、同じクラスターの人は似通っているのがふつうです。同じ学校の生徒は、学力も生活環境も近いので、同じ人数でも情報量は少なくなります。クラスター内の個体どうしの相関を $\\rho$、クラスターの大きさを $m$ とすると、単純無作為抽出に比べて分散が何倍になるかを表す**デザイン効果**は、おおよそ次の式です。

$$\\text{deff} \\approx 1 + (m-1)\\rho$$

$\\rho>0$ なら1を超え、精度が落ちます。クラスターの人数 $m$ が大きいほど悪化します。たとえば $m=20$、$\\rho=0.05$ なら $\\text{deff}\\approx 1+19\\times0.05=1.95$ で、同じ精度を得るのに、単純無作為抽出のほぼ2倍の人数が要ります。クラスター内の似かたはわずか（$\\rho=0.05$）でも、クラスターが大きいと効いてきます。

**多段抽出**は、「市区町村を選ぶ → その中の地点を選ぶ → その地点の住民を選ぶ」のように、段階を踏んで絞る方法です。最終段で全員を調べず一部だけ抜くので、クラスター抽出より調査の手間と偏りのバランスを調整できます。全国規模の世論調査は、ほとんどが多段抽出を基本にしています。

⚠️ **層化とクラスターは逆向き**：層化は「層の中は似ている」ように、クラスターは「クラスターの中が似ていない（母集団の縮図になっている）」ほど良く、切り方の理想が正反対です。

---

### 5. 抽出法の使い分け

層化抽出と集落抽出は名前が似ていますが、母集団の見方が正反対です。同じ8個を選ぶ場合の違いを図で並べます。

[[f-strata-cluster]]

| 方法 | 抜き方 | 長所 | 短所 |
|---|---|---|---|
| 単純無作為 | 全体から等確率 | 理論が単純・基準になる | 全員の名簿が必要・調査費がかさむ |
| 系統 | 一定間隔で拾う | 作業が楽 | 並びに周期があると偏る |
| 層化 | 層ごとに無作為 | 層内が均質なら高精度 | 層の情報が事前に必要 |
| クラスター | まとまりごと全員 | 費用が安い | 内部が似ると精度低下 |
| 多段 | 段階的に絞る | 名簿なしで大規模調査 | 推定量の式が複雑 |

💡 **判断の目安**：精度を優先するなら層化、費用を優先するならクラスターか多段、名簿が整っていて作業を簡単にしたいなら系統、と考えると整理しやすくなります。実際の調査はこれらを組み合わせます（例：層化多段抽出）。
`,keyFormulas:[{label:`有限修正係数`,formula:`\\text{Var}(\\bar{X}) = \\dfrac{\\sigma^2}{n} \\cdot \\dfrac{N-n}{N-1}`},{label:`層化抽出の標本平均`,formula:`\\bar{x}_{st} = \\sum_h W_h \\bar{x}_h,\\quad W_h = N_h/N`},{label:`デザイン効果（クラスター抽出）`,formula:`\\text{deff} \\approx 1 + (m-1)\\rho`}],quiz:[{id:`sp1-1`,question:`有限修正係数が必要になるのはどの状況か？`,options:[`正規分布を仮定できないとき`,`標本サイズ $n$ が母集団サイズ $N$ に対して無視できない割合のとき`,`クラスター抽出を使うとき`,`測定誤差が大きいとき`],correctAnswer:1,explanation:`非復元抽出では、選ばれた個体が再び選ばれないぶん、標本平均のばらつきが小さくなります。係数 $(N-n)/(N-1)$ は $n/N$ が小さければほぼ1で無視できますが、$n/N$ が5%を超えるあたりから修正が必要です。`},{id:`sp1-2`,question:`$N=1000$ から非復元で $n=100$ を単純無作為抽出するとき、有限修正係数 $(N-n)/(N-1)$ に最も近い値はどれか？`,options:[`約0.50`,`約0.90`,`約0.10`,`約1.10`],correctAnswer:1,explanation:`$(1000-100)/(1000-1)=900/999\\approx 0.90$ です。有限修正により標本平均の分散は約90%、標準誤差は $\\sqrt{0.90}\\approx 0.95$ 倍になります。$n$ が $N$ の10%なので、係数は1より少し小さい程度です。`},{id:`sp1-3`,question:`層化抽出法（Stratified Sampling）の主な利点はどれか？`,options:[`クラスターをそのまま調査できる`,`費用が最も安い`,`各層を確実に代表でき、単純無作為より推定精度が上がる`,`ランダム性が最も高い`],correctAnswer:2,explanation:`層化抽出では性別・地域などの層ごとに独立した無作為抽出を行います。各層が必ず代表されるため、層内分散が小さいほど単純無作為より分散が小さくなり推定精度が上がります。`},{id:`sp1-4`,question:`層化抽出で標本平均の分散が小さくなるのは、層をどのように分けたときか？`,options:[`層の数をできるだけ少なくしたとき`,`層内の個体がばらばらで、層どうしが似ているとき`,`すべての層に同じ人数を割り当てたとき`,`層内の個体が似ていて、層どうしが異なるとき`],correctAnswer:3,explanation:`層化抽出の分散には層内のばらつき $S_h^2$ だけが入り、層間の差は入りません。そのため、層内を均質に（層内分散を小さく）切るほど効果が大きくなります。層内がばらばらなら、単純無作為抽出と変わりません。`},{id:`sp1-5`,question:`層化抽出で、同じ総標本数のもとで標本平均の分散を最小にする配分はどれか？`,options:[`各層に同数を配分する`,`$n_h \\propto N_h$ の比例配分`,`$n_h \\propto N_h S_h$ のネイマン配分`,`$n_h \\propto S_h$ のみに比例させる配分`],correctAnswer:2,explanation:`層の大きさ $N_h$ と層内の標準偏差 $S_h$ の積に比例して割り当てるネイマン配分が、分散最小の配分です。大きい層、ばらつきの大きい層ほど多く抜く、という直感と一致します。層内の標準偏差が全層で等しければ、比例配分と一致します。`},{id:`sp1-6`,question:`名簿から $k=50$ おきに抽出する系統抽出で、特に注意すべき点はどれか？`,options:[`名簿の並びに周期 $k$ と合う規則性があると標本が偏る`,`乱数を一切使ってはいけない`,`標本サイズが $N/k$ より大きくなる`,`層化抽出より必ず精度が低い`],correctAnswer:0,explanation:`系統抽出は最初の1人だけ乱数で決め、あとは一定間隔で拾います。名簿の並びに間隔と同じ周期があると、特定の位置（たとえば世帯主）ばかりを拾い、標本が偏ります。並びがランダムなら単純無作為抽出と同程度の精度になります。`},{id:`sp1-7`,question:`クラスター抽出（Cluster Sampling）の主なデメリットはどれか？`,options:[`クラスター内が似通っている場合に推定精度が低下する`,`すべての個体を調査できない`,`層化が困難`,`費用が高い`],correctAnswer:0,explanation:`クラスター抽出は費用効率が良い（学校単位で調査など）が、クラスター内の個体が互いに似ている（クラスター内相関が高い）と、同じサンプルサイズの単純無作為より推定精度が低下します。これを「デザイン効果（design effect）」と呼びます。`},{id:`sp1-8`,question:`クラスターの大きさが $m=20$、クラスター内相関が $\\rho=0.05$ のとき、デザイン効果 $1+(m-1)\\rho$ はいくつか？`,options:[`0.95`,`1.00`,`1.95`,`2.00`],correctAnswer:2,explanation:`$1+(20-1)\\times 0.05 = 1+0.95 = 1.95$ です。単純無作為抽出と同じ精度を得るには、約2倍の標本数が要ることを意味します。$\\rho$ が小さく見えても、$m$ が大きいと効いてきます。`},{id:`sp1-9`,question:`名簿のない広い地域で全国調査をするとき、費用を抑えながら実施できる抽出法として最も適切なものはどれか？`,options:[`単純無作為抽出`,`系統抽出`,`全数調査`,`多段抽出`],correctAnswer:3,explanation:`全国の全員の名簿がない場合、まず市区町村、次に調査地点、最後に住民、と段階を踏んで抽出する多段抽出が現実的です。各段階で必要な名簿だけを用意すればよく、移動の範囲も絞れます。`},{id:`sp1-10`,question:`層化抽出とクラスター抽出について、集団の切り方の理想として正しい組み合わせはどれか？`,options:[`層化は層内が似ているほどよく、クラスターは内部が母集団の縮図に近いほどよい`,`層化もクラスターも内部が似ているほどよい`,`層化は層内がばらばらなほどよく、クラスターは内部が似ているほどよい`,`層化もクラスターも内部のばらつきは無関係`],correctAnswer:0,explanation:`層化は「層内は均質、層間は異質」に切るほど分散が小さくなります。クラスター抽出は逆で、クラスターが母集団の縮図（内部がばらばら）ほどデザイン効果が小さく、内部が似ていると精度が落ちます。切り方の理想が正反対な点は、取り違えやすいところです。`}]},{id:`3.6-simulation`,updatedAt:`2026-10-21`,title:`シミュレーション手法と欠測値`,chapter:11,description:`ブートストラップ・モンテカルロ・欠測値のメカニズムとEMアルゴリズムを学びます。`,content:`💡 **このモジュールで学ぶこと**

「解析的に分布を求められないとき、どうすれば推測できるか？」「データが欠けているとき、単純に除外すると何が問題か？」このモジュールでは計算に頼る手法（シミュレーション）と欠測データの扱いを学びます。

💡 **「数式が解けないなら大量計算で解く」という発想**

確率論の多くの問題は解析的に解けませんが、コンピュータで乱数を大量に発生させて近似することができます。これが**モンテカルロ法**の基本的な考え方です。

---

### 1. モンテカルロ法

**モンテカルロ法**（Monte Carlo Method）は「乱数でシミュレーションして期待値・確率を推定する」手法の総称です。

例：円の面積を求めるモンテカルロ法では、正方形の中にランダムに点を打ち、円の内側に落ちた割合から面積（$\\pi$）を推定します。

[[f-montecarlo]]

点を $N=1000$ 個打つと、円の内側に入る割合 $\\hat{p}$ は $\\pi/4\\approx0.785$ のまわりでばらつきます。標準誤差は $\\sqrt{0.785\\times0.215/1000}\\approx0.013$ で、$\\pi=4\\hat{p}$ の誤差は約 $4\\times0.013=0.05$ です。つまり、$3.14$ の小数第1位あたりまでしか信用できません。

一般的な枠組み：積分 $\\int g(x) f(x) dx = E_f[g(X)]$ を推定したい場合、$f$ から $X_1,\\ldots,X_N$ を生成して $\\hat{\\mu} = \\frac{1}{N}\\sum g(X_i)$ で近似します（大数の法則による一致性）。

**棄却法**（Rejection Sampling）：$f(x)$ から直接サンプリングできない場合、包絡分布 $Mg(x) \\geq f(x)$ から $x$ を生成し、確率 $f(x)/(Mg(x))$ で採択します。

---

### 2. ブートストラップ法

「推定量の標準誤差や信頼区間を、分布の仮定なしで計算したい」これを可能にするのが**ブートストラップ法**（Bootstrap Method）です。

手順：
1. 元の $n$ 個のデータから**復元抽出**で $n$ 個を抽出（ブートストラップ標本）
2. そのブートストラップ標本で推定量 $\\hat{\\theta}^*$ を計算
3. これを $B$回（例：$B=1000$）繰り返して $\\{\\hat{\\theta}^*_1, \\ldots, \\hat{\\theta}^*_B\\}$ を得る
4. この分布を「標本分布の推定」として使い、標準偏差を標準誤差の推定値とします

ブートストラップの信頼区間：$\\hat{\\theta}^*$ の $\\alpha/2$ 分位点と $1-\\alpha/2$ 分位点で構成します。

たとえば $B=1000$ 個の $\\hat{\\theta}^*$ を小さい順に並べたとき、25番目と975番目の値が95%信頼区間（パーセンタイル法）の下限と上限です。データ 3, 5, 6, 8, 13 の平均なら、$B\\to\\infty$ でブートストラップの標準誤差は $\\sqrt{11.6/5}\\approx1.52$ に近づきます（11.6 は $n$ で割った分散）。次のジャックナイフ法の $1.70$ と少し違うのは、$n$ で割るか $n-1$ で割るかの差です。

**有効な場面**：標準誤差の計算式が複雑な統計量（中央値・スピアマン $\\rho$・回帰係数の非線形変換など）。正規性の仮定が危うい小標本。

#### 1個ずつ除く：ジャックナイフ法

ブートストラップより前からある、計算の軽い方法が**ジャックナイフ法**です。復元抽出で何千回も作り直す代わりに、データを1個ずつ除いた $n$ 通りの標本で推定量を計算します。

5個のデータ 3, 5, 6, 8, 13 で、平均（$\\hat{\\theta} = 7$）の標準誤差を求めてみます。1個ずつ除いて残り4個の平均 $\\hat{\\theta}_{(i)}$ を計算すると、8, 7.5, 7.25, 6.75, 5.5 になり、その平均は $\\bar{\\theta}_{(\\cdot)} = 7$ です。

[[f-jackknife]]

この5つのばらつきから標準誤差を見積もります。

$$\\begin{aligned} \\widehat{\\text{SE}}_{\\text{jack}} &= \\sqrt{\\frac{n-1}{n}\\sum_{i=1}^{n}\\left(\\hat{\\theta}_{(i)} - \\bar{\\theta}_{(\\cdot)}\\right)^2} \\\\ &= \\sqrt{\\frac{4}{5} \\times 3.625} = 1.70 \\end{aligned}$$

- 1個除いた標本どうしは4個を共有していて互いに似ているので、$\\hat{\\theta}_{(i)}$ のばらつきは小さく出ます。係数 $(n-1)/n$ は、ばらつきの平均（和を $n$ で割ったもの）を $n-1$ 倍して、小さく出た分を戻すためのものです
- 平均なら公式 $s/\\sqrt{n} = 3.81/\\sqrt{5} = 1.70$ と一致します。公式の無い推定量（比率の比、相関係数など）にも同じ手順が使えます
- 中央値のように、1個除いても値がほとんど動かないか、急に跳ぶ推定量では当てになりません。その場合はブートストラップを使います

ジャックナイフ法は**偏り**の補正にも使えます。偏りを $(n-1)(\\bar{\\theta}_{(\\cdot)} - \\hat{\\theta})$ と見積もり、補正した推定量を $n\\hat{\\theta} - (n-1)\\bar{\\theta}_{(\\cdot)}$ とします。同じ5個で、$n$ で割る分散 11.6 を補正すると 14.5 になり、$n-1$ で割る不偏分散（[推定量の性質](/stats-pre1/1.15-estimator-props/)）とちょうど一致します。

---

### 3. 乱数生成

シミュレーション法の基礎は**一様乱数**の生成です。線形合同法などの疑似乱数生成器（PRNG）が使われます。

**逆関数法**（Inverse CDF Method）：$U \\sim \\text{Uniform}(0,1)$ として $X = F^{-1}(U)$ とすれば $X \\sim F$。CDF の逆関数が求めやすい分布（指数分布など）に有効です。

**数値例**：指数分布 $F(x)=1-e^{-\\lambda x}$ なら、$F^{-1}(u)=-\\dfrac{\\ln(1-u)}{\\lambda}$ です。$\\lambda=2$ のとき、$u=0.5$ なら $x=\\ln2/2\\approx0.35$（中央値）、$u=0.9$ なら $x=\\ln10/2\\approx1.15$ です。一様乱数が $0.9$ のような大きい値のとき、指数分布の裾の長い側の値に変換されます。

複雑な分布には棄却法・重点サンプリング（Importance Sampling）・MCMC（「ベイズ推定とマルコフ連鎖」参照）などを組み合わせます。

---

乱数生成でデータをシミュレートできるようになりました。しかし現実のデータには「そもそも値が観測されていない（欠測）」という問題が伴います。欠測を無視した分析はバイアスを生む可能性があり、適切な扱い方を知ることが重要です。

### 4. 欠測値のメカニズム

データの欠測は3種類に分類されます（Rubin, 1976）：

**MCAR**（Missing Completely At Random）：欠測が完全にランダムであること。他のデータ（観測・非観測）と無関係。例：機器の偶発的故障。完全ケース分析でもバイアスは生じません。

**MAR**（Missing At Random）：欠測が観測済みデータに依存すること。未観測データには依存しない。例：「高齢者は収入を答えにくい」（年齢は観測済み）。適切な手法（多重代入法など）を使えば一致推定が得られます。

**MNAR**（Missing Not At Random / Non-Ignorable）：欠測が未観測データ自体に依存。例：「高収入の人ほど収入を答えない」。欠測モデルを明示的に扱う必要があり最も難しいケースです。

🎯 **つまずきやすい点**：MCAR・MAR・MNARの違いと、MNARがバイアスをもたらす理由を理解しましょう。

---

### 5. EMアルゴリズム

「男女が混在する身長データ100件があるが、それぞれがどちらの性別かがわからない（ラベルが欠落している）」このとき「男性の平均身長」と「女性の平均身長」をどう推定すればよいでしょうか？ラベルがわかれば平均を計算できますが、ラベル推定には平均が必要という循環があります。この「欠測している情報と推定したいパラメータを交互に更新して収束させる」のが**EMアルゴリズム**（Expectation-Maximization Algorithm）です。欠測データや観測できない潜在変数を含むモデルの最尤推定に広く使われます。

**Eステップ**（Expectation Step）：現在のパラメータ推定値 $\\theta^{(t)}$ を使って、欠測データの条件付き期待値 $Q(\\theta \\mid \\theta^{(t)})$ $= E[\\log L(\\theta; \\mathbf{Y}_\\text{obs}, \\mathbf{Y}_\\text{mis}) \\mid \\mathbf{Y}_\\text{obs}, \\theta^{(t)}]$ を計算。

**Mステップ**（Maximization Step）：$Q$ を最大化する $\\theta^{(t+1)}$ を求める。

**数値例**：男性が $N(170, 10^2)$、女性が $N(150, 10^2)$ で、割合は半々と仮に置きます。身長155cmの人1人について、Eステップでは「この人が女性である確率（負担率）」を計算します。女性の側が $e^{-5^2/200}\\approx0.88$、男性の側が $e^{-15^2/200}\\approx0.32$ なので、女性である確率は $0.88/(0.88+0.32)\\approx0.73$、男性は $0.27$ です。Mステップでは、全員の負担率を重みとして、男性と女性の平均を重み付き平均で更新します。155cmの人は、女性側の平均の計算に0.73人ぶん、男性側に0.27人ぶん加わります。この2つのステップを、値が動かなくなるまで繰り返します。

[[f-em]]

E・Mを繰り返すと対数尤度は単調増加して収束します。局所最大解に収束するため初期値の選択が重要です。

応用：混合正規分布のパラメータ推定、因子分析（欠測あり）、隠れマルコフモデルなど。

📖 **多重代入法**（Multiple Imputation）は欠測値を複数の代入値で置き換えて複数の完全データを作り、それぞれで分析して結果を結合します。MAR の仮定のもとで有効な推測が可能です。`,keyFormulas:[{label:`モンテカルロ積分推定`,formula:`\\hat{\\mu} = \\dfrac{1}{N}\\sum_{i=1}^N g(X_i),\\quad X_i \\sim f`},{label:`逆関数法`,formula:`X = F^{-1}(U),\\quad U \\sim \\text{Uniform}(0,1)`}],quiz:[{id:`sim1-1`,question:`モンテカルロ法の基本原理はどれか？`,options:[`行列演算で最適解を求める方法`,`解析的に積分を計算する方法`,`乱数シミュレーションを使って期待値・確率を近似する方法`,`微分方程式を数値的に解く方法`],correctAnswer:2,explanation:`モンテカルロ法は「$f$ から $N$ 個のサンプルを生成し $E[g(X)] \\approx \\frac{1}{N}\\sum g(X_i)$」という大数の法則に基づく近似法です。$N$ が大きくなるほど精度が上がります（標準誤差は $O(1/\\sqrt{N})$ で減少）。`},{id:`sim1-2`,question:`ブートストラップ法の手順として正しいものはどれか？`,options:[`正規分布から新データを生成する`,`データを等分割して交差検証する`,`元データを非復元抽出して新標本を作る`,`元データから復元抽出で $n$ 個を取り出し推定量を計算することを多数回繰り返す`],correctAnswer:3,explanation:`ブートストラップは元の $n$ 個のデータから「復元あり」で $n$ 個抽出（一部は重複）する操作を $B$ 回繰り返します。得られた $B$ 個の推定量の分布を使って標準誤差・信頼区間を求めます。`},{id:`sim1-3`,question:`欠測メカニズム MCAR（Missing Completely At Random）の定義として正しいものはどれか？`,options:[`欠測が観測・未観測のどのデータとも独立で完全にランダム`,`欠測理由が不明`,`欠測が未観測変数に依存する`,`欠測が観測済み変数に依存する`],correctAnswer:0,explanation:`MCARは「欠測のなりやすさが観測データにも未観測データにも依存しない」最も単純な欠測です。この場合、完全ケース分析（欠測を含む行を除外）でもバイアスは生じません（ただし効率は低下）。`},{id:`sim1-4`,question:`欠測メカニズム MNAR が問題になる理由はどれか？`,options:[`データ量が減るから`,`欠測が未観測の値そのものに依存するため、観測されたデータだけでは欠測プロセスを補正できない`,`計算量が増えるから`,`非正規分布になるから`],correctAnswer:1,explanation:`MNARでは「収入が高い人ほど収入を答えない」など、欠けた値そのものが欠測に影響します。観測データだけ分析すると系統的なバイアスが生じ、欠測モデルを明示的に含めた分析が必要です。`},{id:`sim1-5`,question:`EMアルゴリズムのEステップで行うことはどれか？`,options:[`収束判定を行う`,`パラメータを更新する`,`現在のパラメータで欠測データの条件付き期待値（補完対数尤度）を計算する`,`初期値を設定する`],correctAnswer:2,explanation:`Eステップでは現在のパラメータ推定値 $\\theta^{(t)}$ を使って「完全データ対数尤度の期待値 $Q(\\theta \\mid \\theta^{(t)})$」を計算します。次のMステップでこの $Q$ を最大化してパラメータを更新します。`},{id:`sim1-6`,question:`EMアルゴリズムが収束するとき、対数尤度はどのように変化するか？`,options:[`収束の保証がない`,`単調減少する`,`振動する`,`単調非減少（反復ごとに増加または同値）する`],correctAnswer:3,explanation:`EMアルゴリズムの重要な理論的性質として、各反復で対数尤度は単調非減少（減少しない）ことが保証されています。ただし局所最大解への収束が保証されるだけで、大域的最大解とは限りません。`},{id:`sim1-7`,question:`棄却法（Rejection Sampling）が使われる主な状況はどれか？`,options:[`目標分布からの直接サンプリングが難しいとき`,`分布が正規分布のとき`,`時系列データのとき`,`サンプルサイズが大きいとき`],correctAnswer:0,explanation:`棄却法は目標分布 $f(x)$ からの直接サンプリングが困難なとき、扱いやすい包絡分布 $Mg(x) \\geq f(x)$ を使います。採択率 $f(x)/(Mg(x))$ が低いと非効率になるため、良い提案分布の選択が重要です。`},{id:`sim1-8`,question:`ブートストラップ法が特に有効な場面はどれか？`,options:[`大標本で正規分布が成立するとき`,`推定量の標準誤差の解析的計算が困難、または正規性の仮定が危うい小標本のとき`,`パラメータが1つのシンプルなモデルのとき`,`データが時系列でないとき`],correctAnswer:1,explanation:`ブートストラップは分布の仮定をしないリサンプリング法で、中央値・相関係数の変換・複雑な回帰係数など解析的標準誤差が複雑な統計量や、正規近似が怪しい小標本で特に価値を発揮します。`},{id:`sim1-9`,question:`逆関数法（Inverse CDF Method）で一様乱数から指数分布に従う乱数を生成するとき、$F^{-1}(u)$ はどうなるか（パラメータ $\\lambda$）？`,options:[`$e^{-\\lambda u}$`,`$1 - e^{-\\lambda u}$`,`$-\\frac{1}{\\lambda}\\log(1-u)$`,`$\\lambda u$`],correctAnswer:2,explanation:`指数分布の CDF は $F(x) = 1 - e^{-\\lambda x}$。$u = F(x)$ を $x$ で解くと $x = -\\frac{1}{\\lambda}\\log(1-u)$。$1-U$ も一様分布なので $-\\frac{1}{\\lambda}\\log U$ としても同じです。これで $U \\sim \\text{Uniform}(0,1)$ から指数分布が生成できます。`},{id:`sim1-10`,question:`EMアルゴリズムの主な欠点はどれか？`,options:[`パラメータが1つのモデルにしか使えない`,`収束が非常に遅い（線形収束以下）`,`局所最大解に収束する可能性があり大域的最適を保証しない`,`欠測がない場合に使えない`],correctAnswer:2,explanation:`EMアルゴリズムは対数尤度を単調非減少に更新しますが、局所最大解（モード）に収束するだけで大域的最大解の保証がありません。この問題への対処として複数の初期値から試す方法が一般的です。`}]},{id:`3.7-causal`,updatedAt:`2026-10-22`,title:`統計的因果推論`,chapter:11,description:`因果グラフ（DAG）・バックドア基準・フロントドア基準・直接効果と間接効果で、相関から因果へ進む考え方を学びます。`,content:`💡 **このモジュールで学ぶこと**

「アイスの売上と水難事故は同時に増える。アイスを禁止すれば事故は減るのか？」相関から因果を読むには、データだけでなく**どんな原因の構造を仮定するか**が要ります。このモジュールでは、因果の構造を矢印で描く**因果グラフ（DAG）**と、その上で「どの変数を調整すれば因果効果が求まるか」を決める道具（バックドア基準・フロントドア基準）、そして効果を直接効果と間接効果に分ける考え方を学びます。

---

### 1. 因果効果とは：観測できない「もしも」との差

薬 $X$（飲む＝1、飲まない＝0）の効果を考えます。同じ人について、飲んだ場合の結果 $Y(1)$ と飲まなかった場合の結果 $Y(0)$ を**潜在結果**と呼びます。その人にとっての効果は $Y(1)-Y(0)$ ですが、実際に起きるのはどちらか一方だけで、もう一方は永久に観測できません。これが**因果推論の根本問題**です。

そこで集団で平均をとった**平均処置効果**（ATE）を目標にします。

$$\\text{ATE} = E[Y(1)-Y(0)]$$

観測できるのは $E[Y\\mid X=1]$ と $E[Y\\mid X=0]$ の差ですが、これが ATE に一致する保証はありません。薬を飲む人と飲まない人では、もともとの状態が違うかもしれないからです。**無作為割り付け**をすると、飲む人と飲まない人が（平均的に）同じ集団になるので、単純な差がそのまま ATE になります。$X$ が乱数だけで決まるので、$X$ に入る矢印が無くなり、第3節で述べるバックドア経路そのものが消えるからです。観察データではこの役目を、調整が担います。

---

### 2. 因果グラフ（DAG）：矢印で原因の構造を描く

変数を点、「原因→結果」を矢印で結び、矢印をたどって元の変数に戻る輪（循環）が無いグラフを**DAG**（有向非巡回グラフ）と呼びます。2変数のあいだの経路は、途中の矢印の向きで3つの基本形に分かれます。

[[f-dag-basic]]

| 形 | 経路 | 何もしないとき | 途中の変数で条件づけると |
| --- | --- | --- | --- |
| 交絡（分岐） | $X \\leftarrow Z \\rightarrow Y$ | 経路は開いている（見かけの関連） | 経路が閉じる（$Z$ ごとに比べる） |
| 媒介（連鎖） | $X \\rightarrow M \\rightarrow Y$ | 経路は開いている（本物の効果） | 経路が閉じる（効果の通り道を塞ぐ） |
| 合流点 | $X \\rightarrow C \\leftarrow Y$ | 経路は閉じている | 経路が**開く**（見かけの関連が生まれる） |

合流点だけ、条件づけの効果が逆なのが落とし穴です。「俳優は演技力と容姿の少なくとも一方が優れている」とすると、$C$＝俳優になれたか、です。一般の人では演技力と容姿に関係がなくても、俳優だけを集めると「演技力が低い人ほど容姿が良い」という負の関連が現れます。$C$ やその子孫で絞り込むと、こうした見かけの関連が作られます。

**有向分離**（d-分離）は、この開閉のルールを経路全体に当てはめたものです。変数の集合 $S$ で条件づけたとき、$X$ と $Y$ を結ぶすべての経路が閉じていれば、$X$ と $Y$ は $S$ で**有向分離される**といい、グラフが正しければ、$S$ を与えたとき $X$ と $Y$ は条件付き独立になります。経路が閉じる条件は次の2つです。

- 経路上に連鎖か分岐の中間変数があり、それが $S$ に入っている
- 経路上に合流点があり、その合流点もその子孫も $S$ に入っていない

**練習**：$A \\rightarrow B \\rightarrow C \\leftarrow D$ という4変数の鎖で、$A$ と $D$ を結ぶ経路は1本だけで、$C$ が合流点です。

- 何も条件づけない（$S=\\emptyset$）：合流点 $C$ が閉じているので、$A$ と $D$ は有向分離され、独立です
- $S=\\{B\\}$：合流点 $C$ はまだ条件に入っていないので、経路は閉じたままです。$A$ と $D$ は独立のままです
- $S=\\{C\\}$：合流点を条件に入れたので経路が開き、$A$ と $D$ は独立でなくなります
- $S=\\{B, C\\}$：$C$ が条件に入って合流点は開きますが、連鎖の中間変数 $B$ も条件に入っているので、そこで経路が閉じます。$A$ と $D$ は条件付き独立です

つまり、経路が閉じるには、連鎖・分岐の中間変数が1つでも条件に入っていれば足ります（合流点が開いても、別の場所で閉じていれば経路全体は閉じる）。

---

### 3. バックドア基準：交絡を調整で消す

$X$ から $Y$ への因果効果を求めたいとします。$X$ に**入る矢印から始まる経路**（$X \\leftarrow \\cdots Y$）を**バックドア経路**と呼びます。交絡の正体はこの経路で、$X$ と $Y$ の関連に、因果でない分が混ざる原因になります。

変数の集合 $Z$ が次の2つを満たすとき、**バックドア基準**を満たすといいます。

1. $Z$ に $X$ の子孫（$X$ から矢印をたどって行き着く変数）が含まれない
2. $Z$ が、$X$ に入る矢印で始まるすべての経路を閉じている

このとき、$Z$ で層別して平均をとる**調整公式**で因果効果が求まります。

$$P(y \\mid do(x)) = \\sum_{z} P(y \\mid x, z)\\, P(z)$$

$do(x)$ は「$X$ を外から $x$ に固定する」介入を表し、$P(y\\mid x)$（見ているだけ）とは区別します。条件1が要るのは、$X$ の結果である変数を調整すると、効果の一部（媒介）を消したり、合流点を開いたりするからです。

**数値例**：薬 $X$ を飲んだか、重症度 $Z$（重症の人ほど薬を飲みやすい）、回復 $Y$。1000人のデータ：

| | 治療群 回復／人数 | 非治療群 回復／人数 |
| --- | --- | --- |
| 軽症（500人） | 90 ／ 100（0.90） | 340 ／ 400（0.85） |
| 重症（500人） | 240 ／ 400（0.60） | 50 ／ 100（0.50） |
| 全体 | 330 ／ 500（0.66） | 390 ／ 500（0.78） |

全体で比べると、治療群の回復率は $0.66$、非治療群は $0.78$ で、薬を飲んだほうが $0.12$ **悪い**ように見えます。ところが、重症の人は治療を受けやすく、もともと回復しにくいので、治療群に重症者が集中しています（重症度 $Z$ が交絡）。$Z$ で調整すると、$P(Z=\\text{軽症})=P(Z=\\text{重症})=0.5$ なので：

$$\\begin{aligned} \\text{治療}: \\ & 0.5 \\times 0.90 + 0.5 \\times 0.60 = 0.75 \\\\ \\text{非治療}: \\ & 0.5 \\times 0.85 + 0.5 \\times 0.50 = 0.675 \\end{aligned}$$

差は $0.75-0.675=+0.075$ で、層ごとに見た向き（どちらの層でも治療群のほうが良い）と一致します。全体の差と調整後の差で符号が逆転する現象が**シンプソンのパラドックス**で、どちらを採るかはデータでなく、因果グラフ（この例では $Z\\to X$ と $Z\\to Y$）で決まります。

---

### 4. フロントドア基準：交絡を測れないとき

交絡 $U$ が観測できないと、バックドア基準は使えません。それでも、$X$ から $Y$ への影響がすべて**媒介変数 $M$ を通る**と仮定でき、$M$ が観測できるなら、別の道があります。

[[f-dag-front]]

次の3条件を満たす $M$ を使うのが**フロントドア基準**です。

1. $X$ から $Y$ へのすべての有向経路が $M$ を通る
2. $X$ から $M$ へのバックドア経路がない
3. $M$ から $Y$ へのバックドア経路は、すべて $X$ で閉じられる

このとき、効果を2段階に分けて求めます。$g(m)$ は「$M=m$ のときの $Y$ への効果」を $X$ で調整して求めた値です。

$$\\begin{aligned} P(y \\mid do(x)) &= \\sum_{m} P(m \\mid x)\\, g(m) \\\\ g(m) &= \\sum_{x'} P(y \\mid m, x')\\, P(x') \\end{aligned}$$

1段目 $P(m\\mid x)$ は「$X$ が $M$ をどう変えるか」で、$U$ の影響を受けません（$X\\to M$ に交絡がないため）。2段目は「$M$ が $Y$ をどう変えるか」を、$X$ で調整して求めます（$M\\leftarrow X\\leftarrow U\\to Y$ という裏道を $X$ で閉じる）。この2つを掛け合わせて足し上げるわけです。

---

### 5. 直接効果と間接効果

$X$ が $Y$ に与える効果には、$M$ を経由しない**直接効果**と、$M$ を経由する**間接効果**があります。

線形で、交互作用がなく、未観測の交絡もない場合に限って、係数で足し算ができます。$X\\to M$ の係数を $a$、$M\\to Y$ を $b$、$X\\to Y$ の直接の係数を $c$ とおくと：

$$\\text{総合効果} = c + ab,\\qquad \\text{直接効果} = c,\\qquad \\text{間接効果} = ab$$

たとえば $a=0.5,\\ b=0.8,\\ c=0.3$ なら、間接効果は $0.5\\times 0.8=0.4$、総合効果は $0.3+0.4=0.7$ です。

**$M$ を調整するかどうかで、求まる効果が変わる**点に注意が要ります。$X$ の総合効果を知りたいときは $M$ を調整してはいけません（間接の通り道を塞ぐため）。$M$ を回帰モデルに入れると求まるのは直接効果です。一般の（非線形な）モデルでは、直接効果・間接効果をそれぞれ「$M$ を固定した効果」「$M$ だけを変えた効果」として潜在結果で定義し直す必要があります。

---

### 6. 操作変数：交絡を測れず、媒介変数も無いとき

学習アプリの利用時間 $X$ が、試験の点数 $Y$ をどれだけ上げるかを知りたいとします。やる気 $U$ のある人ほど長く使い、点数も高いので、利用時間と点数を単純に比べると効果を大きく見積もります。$U$ は測れず、フロントドア基準に使える媒介変数もありません。

そこで、利用時間を動かすけれど、点数には利用時間を通してしか影響しない変数 $Z$ を探します。たとえば、アプリの割引クーポンを、くじで選んだ半数の人に配ったとします。

[[f-dag-iv]]

次の3条件を満たす $Z$ を**操作変数**と呼びます。

1. $Z$ は $X$ を動かす（クーポンをもらうと利用時間が増える）
2. $Z$ は $U$ と無関係（くじで配ったので、やる気と関係しない）
3. $Z$ から $Y$ への経路は、$X$ を通るものだけ（クーポン自体は点数を変えない）

クーポンをもらった群ともらわない群を比べます（説明のための模擬の数字）。

| | 平均利用時間 | 平均点 |
|---|---|---|
| クーポンあり | 10時間 | 68.0点 |
| クーポンなし | 6時間 | 66.0点 |
| 差 | 4時間 | 2.0点 |

クーポンは利用時間を4時間増やし、点数を2.0点上げました。点数の差は利用時間の差を通してしか生じないので、1時間あたりの効果は差の比で求まります。

$$\\begin{aligned} \\hat{\\beta}_{IV} &= \\frac{\\text{点数の差}}{\\text{利用時間の差}} \\\\ &= \\frac{2.0}{4} = 0.5\\ \\text{点／時間} \\end{aligned}$$

一般には共分散の比 $\\hat{\\beta}_{IV} = \\mathrm{Cov}(Z, Y)/\\mathrm{Cov}(Z, X)$ で、$Z$ が2値のときは上の差の比と一致します。同じデータで点数を利用時間に単純に回帰すると、傾きは1時間あたり1.5点になります。やる気の影響が混ざり、効果を3倍に見積もっていたことになります。

- 条件2と3はデータから確かめられず、「クーポンは点数を直接変えない」は場面の知識で主張するしかない
- $Z$ が $X$ をほとんど動かさない**弱い操作変数**では、分母が0に近くなり、推定値が大きくぶれる
- 効果が人によって違うときに求まるのは、クーポンで利用時間が変わった人たちにとっての効果。クーポンがあっても使い方を変えない人の効果は含まれない
- 変数が多いときは**2段階最小二乗法**を使う。1段目で $Z$ から $X$ を予測し、2段目でその予測値に $Y$ を回帰する方法で、$Z$ が1つなら上の比と同じ推定値になる

🎯 **押さえどころ**：まず「調整してよいのは交絡（分岐）の中間変数。媒介は塞ぎ、合流点は開くので調整してはいけない」という開閉の区別が大前提です。そのうえで、バックドア基準は「交絡を測れるときの調整公式 $\\sum_z P(y\\mid x,z)P(z)$」、フロントドア基準は「交絡を測れないが媒介 $M$ が測れるときの2段階の式」と使い分けます。`,keyFormulas:[{label:`平均処置効果`,formula:`\\text{ATE} = E[Y(1)-Y(0)]`},{label:`調整公式（バックドア）`,formula:`P(y \\mid do(x)) = \\sum_{z} P(y \\mid x, z)\\, P(z)`},{label:`フロントドア調整`,formula:`\\begin{aligned} P(y \\mid do(x)) &= \\sum_{m} P(m \\mid x)\\, g(m) \\\\ g(m) &= \\sum_{x'} P(y \\mid m, x')\\, P(x') \\end{aligned}`},{label:`線形モデルの総合効果`,formula:`\\text{総合効果} = c + ab`}],quiz:[{id:`ca-1`,question:`潜在結果の考え方で、個人の因果効果 $Y(1)-Y(0)$ を直接求められない理由はどれか？`,options:[`$Y(1)$ と $Y(0)$ の分散が等しくないから`,`平均をとると必ず0になるから`,`同じ人について、実際に観測できるのは $Y(1)$ か $Y(0)$ の一方だけだから`,`$Y(1)$ と $Y(0)$ が常に独立だから`],correctAnswer:2,explanation:`ある人が薬を飲めば $Y(1)$ だけが観測され、飲まなければ $Y(0)$ だけが観測されます。もう一方は起きなかった「もしも」なので、個人の差は観測できません。これが因果推論の根本問題で、集団の平均（ATE）を目標にする理由です。`},{id:`ca-2`,question:`重症度 $Z$（軽症・重症が各50%）で層別した結果、治療群の回復率が軽症で $0.90$・重症で $0.60$、非治療群が軽症で $0.85$・重症で $0.50$ だった。調整公式による治療の平均効果（回復率の差）はいくらか？`,options:[`$-0.12$`,`$+0.075$`,`$+0.12$`,`$+0.15$`],correctAnswer:1,explanation:`治療は $0.5\\times0.90+0.5\\times0.60=0.75$、非治療は $0.5\\times0.85+0.5\\times0.50=0.675$ で、差は $+0.075$ です。全体で比べた粗い差（治療群のほうが低く見える）と符号が逆になるのは、重症者が治療群に集まっているためで、シンプソンのパラドックスと呼ばれます。`},{id:`ca-3`,question:`$X \\leftarrow Z \\rightarrow Y$ という交絡の経路を閉じるには、どうすればよいか？`,options:[`$Z$ で条件づける（層別・調整する）`,`$X$ と $Y$ を標準化する`,`$Z$ を無視してデータを増やす`,`$Y$ の子孫で条件づける`],correctAnswer:0,explanation:`分岐の中間変数 $Z$ で条件づけると、$X$ と $Y$ を結ぶこの経路が閉じ、$Z$ が共通原因として作っていた見かけの関連が除かれます。データを増やすだけでは、交絡による偏りは消えません。`},{id:`ca-4`,question:`$X \\rightarrow C \\leftarrow Y$ の合流点 $C$ で条件づける（たとえば $C$ の値で絞り込む）と、何が起きるか？`,options:[`$X$ と $Y$ の関連が必ず消える`,`$X$ と $Y$ の間に見かけの関連が生まれることがある`,`$C$ が $X$ の原因になる`,`$X$ と $Y$ の因果効果が正しく求まる`],correctAnswer:1,explanation:`合流点は何もしなければ経路が閉じていて、$X$ と $Y$ は独立です。ところが $C$（またはその子孫）で条件づけると経路が開き、もともと無関係の $X$ と $Y$ に関連が現れます。俳優だけを集めると演技力と容姿が負の相関を示すのが典型例です。`},{id:`ca-5`,question:`$X \\rightarrow M \\rightarrow Y$ の媒介構造で、$M$ を回帰モデルに加えて調整すると、$X$ の係数は何を表すか？`,options:[`$X$ の総合効果`,`$M$ の間接効果`,`$X$ の直接効果（$M$ を通らない分）`,`$X$ と $M$ の相関`],correctAnswer:2,explanation:`$M$ で条件づけると $X\\to M\\to Y$ の通り道が閉じるので、残るのは $M$ を経由しない直接効果です。総合効果を知りたいときは $M$ を調整してはいけません。「とりあえず変数を全部入れる」が危うい理由の一つです。`},{id:`ca-6`,question:`バックドア基準で、調整に使う変数の集合 $Z$ が満たすべき条件として正しいものはどれか？`,options:[`$Z$ に $X$ の子孫が含まれないこと`,`$Z$ が $Y$ の子孫であること`,`$Z$ にすべての合流点を含めること`,`$Z$ が $X$ と無相関であること`],correctAnswer:0,explanation:`$X$ の子孫（結果として決まる変数）を調整すると、効果の通り道を塞いだり合流点を開いたりします。バックドア基準は、①$Z$ に $X$ の子孫を含めない、②$X$ に入る矢印で始まる経路をすべて閉じる、の2条件です。`},{id:`ca-7`,question:`フロントドア基準が役に立つのはどの状況か？`,options:[`交絡 $U$ が観測できないが、$X$ の効果がすべて通る媒介変数 $M$ が観測できるとき`,`$X$ と $Y$ に共通原因がまったく無いとき`,`$Y$ が2値でないとき`,`サンプルサイズが小さいとき`],correctAnswer:0,explanation:`交絡 $U$ を測れないとバックドア調整はできません。それでも、$X$ から $Y$ へのすべての有向経路が $M$ を通り、$X\\to M$ に交絡が無いなどの条件を満たせば、$X\\to M$ と $M\\to Y$ を2段階で求めて効果を出せます。`},{id:`ca-8`,question:`線形モデルで $X\\to M$ の係数が $a=0.5$、$M\\to Y$ が $b=0.8$、$X\\to Y$ の直接の係数が $c=0.3$ のとき、$X$ の総合効果はいくらか？`,options:[`$0.4$`,`$0.8$`,`$1.6$`,`$0.7$`],correctAnswer:3,explanation:`間接効果は係数の積 $ab=0.5\\times0.8=0.4$、総合効果は直接効果と間接効果の和 $c+ab=0.3+0.4=0.7$ です。この足し算が成り立つのは、線形で交互作用が無く、未観測の交絡が無いときに限られます。`},{id:`ca-9`,question:`DAG で、変数の集合 $S$ によって $X$ と $Y$ が有向分離されているとき、グラフが正しければ何が言えるか？`,options:[`$X$ と $Y$ は無条件に独立である`,`$X$ は $Y$ の原因である`,`$S$ を与えたとき、$X$ と $Y$ は条件付き独立である`,`$X$ と $Y$ の相関係数は必ず1になる`],correctAnswer:2,explanation:`有向分離は、経路が $S$ によってすべて閉じられている状態です。グラフが正しければ、$S$ を与えたとき $X$ と $Y$ は条件付き独立になります。無条件に独立とは限らず、$S$ で条件づけて初めて成り立つ点に注意します。`},{id:`ca-10`,question:`無作為割り付けをすると、観察データで問題になる交絡が除かれるのはなぜか？`,options:[`サンプルサイズが必ず大きくなるから`,`割り付けが乱数で決まり、$X$ に入る矢印がなくなって、バックドア経路が消えるから`,`$Y$ の分散が小さくなるから`,`媒介変数を自動的に調整してくれるから`],correctAnswer:1,explanation:`無作為割り付けでは、$X$ の値はコイン投げのような乱数だけで決まるので、$Z$ のような共通原因から $X$ への矢印が消えます。バックドア経路が存在しなくなるため、調整しなくても $E[Y\\mid X=1]-E[Y\\mid X=0]$ がそのまま ATE になります。`}]}],Hn={1:`確率論の基礎`,2:`確率分布と特性値`,3:`いろいろな確率分布`,4:`正規分布と分布の変換`,5:`標本分布と極限定理`,6:`推定`,7:`仮説検定`,8:`回帰モデルとモデル選択`,9:`多変量解析：次元の縮約と分類`,10:`ベイズ統計と確率過程`,11:`さまざまなデータの解析`},Z={1:{bg:`#e0e7ff`,text:`#3730a3`,accent:`#4338ca`,light:`#eef2ff`},2:{bg:`#dbeafe`,text:`#1e40af`,accent:`#2563eb`,light:`#eff6ff`},3:{bg:`#cffafe`,text:`#155e75`,accent:`#0891b2`,light:`#ecfeff`},4:{bg:`#d1fae5`,text:`#065f46`,accent:`#059669`,light:`#ecfdf5`},5:{bg:`#ecfccb`,text:`#3f6212`,accent:`#65a30d`,light:`#f7fee7`},6:{bg:`#fef3c7`,text:`#92400e`,accent:`#d97706`,light:`#fffbeb`},7:{bg:`#ffedd5`,text:`#9a3412`,accent:`#ea580c`,light:`#fff7ed`},8:{bg:`#ede9fe`,text:`#5b21b6`,accent:`#7c3aed`,light:`#f5f3ff`},9:{bg:`#fae8ff`,text:`#86198f`,accent:`#c026d3`,light:`#fdf4ff`},10:{bg:`#fce7f3`,text:`#9d174d`,accent:`#db2777`,light:`#fdf2f8`},11:{bg:`#ccfbf1`,text:`#115e59`,accent:`#0f766e`,light:`#f0fdfa`}},Un={population:{id:`population`,term:`母集団 (Population)`,explanation:`あなたが「本当に知りたい」対象の全容。例えば、スープの味見における「鍋全体のスープ」にあたります。全数調査が困難なため、一部（標本）からその性質（母数）を推測します。`,level:`基礎`,relatedTerms:[`sample`,`mle`]},sample:{id:`sample`,term:`標本 (Sample)`,explanation:`母集団から取り出された「手元にあるデータ」。スープの味見における「スプーン一杯」のこと。標本の平均などは、偶然の偏り（サンプリング誤差）を含むため、慎重に扱う必要があります。`,level:`基礎`,relatedTerms:[`population`,`central-limit`]},mean:{id:`mean`,term:`平均 (Mean)`,explanation:`すべてのデータを足して個数で割った値。データの「重心」にあたります。外れ値の影響を受けやすいため、歪んだ分布では中央値（メジアン）と合わせて確認することが重要です。`,formula:`\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i`,level:`基礎`,relatedTerms:[`variance`,`median`]},median:{id:`median`,term:`中央値 (Median)`,explanation:`データを小さい順に並べたときの「真ん中の値」。外れ値の影響を受けにくい（ロバスト）ため、年収や不動産価格など歪みの大きいデータの代表値として適しています。`,level:`基礎`,relatedTerms:[`mean`,`skewness`]},variance:{id:`variance`,term:`分散 (Variance)`,explanation:`各データが平均からどれだけ離れているかを表す指標。偏差（平均との差）を二乗して平均したものです。標本から母集団の分散を推定するときは、n ではなく n−1 で割った不偏分散（上の式）を使います。単位が元のデータの二乗になるため、元の単位に戻した「標準偏差」と合わせてよく使われます。`,formula:`s^2 = \\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{x})^2`,level:`基礎`,relatedTerms:[`mean`,`std-dev`]},"std-dev":{id:`std-dev`,term:`標準偏差 (Standard Deviation)`,explanation:`分散の正の平方根。分散と異なり元のデータと同じ単位なので直感的に解釈しやすいです。正規分布では平均±1σに約68%、±2σに約95%のデータが収まります。`,formula:`s = \\sqrt{\\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{x})^2}`,level:`基礎`,relatedTerms:[`variance`,`normal-dist`]},"normal-dist":{id:`normal-dist`,term:`正規分布 (Normal Distribution)`,explanation:`平均μと分散σ²によって決まる釣り鐘型の対称な分布。自然界・社会データに広く現れ、中心極限定理によって標本平均の分布として現れることから、統計学の中心的な分布です。`,formula:`f(x) = \\frac{1}{\\sqrt{2\\pi}\\sigma}\\exp\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)`,level:`基礎`,relatedTerms:[`central-limit`,`t-dist`,`std-dev`]},parameter:{id:`parameter`,term:`母数 / パラメータ (Parameter)`,explanation:`母集団の特性を表す固定値（例：母平均μ、母分散σ²）。真の値は不明であり、標本から推定します。これに対し、標本から計算した値を「統計量」（例：標本平均）と呼びます。`,level:`基礎`,relatedTerms:[`population`,`mle`]},unbiasedness:{id:`unbiasedness`,term:`不偏性 (Unbiasedness)`,explanation:`推定量の期待値が真のパラメータと一致する性質（E[θ̂]=θ）。「平均的に正しい」推定量です。標本分散を n ではなく n−1 で割る理由はこの不偏性を保証するためです。`,level:`基礎`,relatedTerms:[`consistency`,`mle`]},"confidence-interval":{id:`confidence-interval`,term:`信頼区間 (Confidence Interval)`,explanation:`「95%信頼区間」とは、同じ手順を繰り返したとき95%の確率で真の値を含む区間のことです。「この区間に真の値が95%の確率でいる」という解釈は誤りで、手順の信頼性を表す概念です。`,level:`基礎`,relatedTerms:[`pvalue`,`alpha`]},"hypothesis-test":{id:`hypothesis-test`,term:`仮説検定 (Hypothesis Test)`,explanation:`帰無仮説H₀（「差がない」などの主張）を前提として、観測データがどのくらい「ありえないか」を確率で評価し、H₀を棄却するか判断する手順。医学・心理学・品質管理で広く使われます。`,level:`基礎`,relatedTerms:[`pvalue`,`alpha`,`power`]},"null-hypothesis":{id:`null-hypothesis`,term:`帰無仮説 / 対立仮説`,explanation:`帰無仮説（H₀）は「差がない・効果がない」という保守的な仮説。対立仮説（H₁）は「差がある・効果がある」という主張。検定では帰無仮説のもとでデータがどのくらい珍しいかを評価します。`,level:`基礎`,relatedTerms:[`hypothesis-test`,`pvalue`]},correlation:{id:`correlation`,term:`相関係数 (Correlation Coefficient)`,explanation:`2変数の線形関係の強さを−1〜+1で表す指標。+1に近いほど正の相関、−1に近いほど負の相関、0は線形無相関（ただし非線形関係の可能性は残る）。相関は因果関係を意味しません。`,formula:`r = \\frac{\\sum(x_i-\\bar{x})(y_i-\\bar{y})}{\\sqrt{\\sum(x_i-\\bar{x})^2\\sum(y_i-\\bar{y})^2}}`,level:`基礎`,relatedTerms:[`regression`,`partial-corr`]},regression:{id:`regression`,term:`回帰分析 (Regression Analysis)`,explanation:`1つ以上の説明変数から目的変数を予測するモデル。単回帰は y=β₀+β₁x+ε、重回帰は y=β₀+β₁x₁+…+βₚxₚ+ε。係数は最小二乗法（OLS）で推定します。`,level:`基礎`,relatedTerms:[`correlation`,`multico`,`anova`]},pvalue:{id:`pvalue`,term:`P値 (P-value)`,explanation:`「差がない」という帰無仮説のもとで、観測値以上に極端な結果が偶然生じる確率。P値<α（有意水準）のとき帰無仮説を棄却します。「P値が小さい＝効果が大きい」は誤解で、サンプルサイズにも依存します。`,level:`中級`,relatedTerms:[`alpha`,`power`]},alpha:{id:`alpha`,term:`有意水準 / 第1種の過誤 ($\\alpha$)`,explanation:`「本当は差がないのに、誤って差があると言ってしまう」間違いの許容ライン。裁判で例えると「無実の人を有罪にしてしまう」冤罪のリスク設定です。通常0.05（5%）が使われます。`,level:`中級`,relatedTerms:[`pvalue`,`beta`]},beta:{id:`beta`,term:`第2種の過誤 ($\\beta$)`,explanation:`「本当は差があるのに、それを見逃してしまう」間違い。病気を見逃すリスクに相当します。これを小さく抑えることが、分析の「見逃し防止能力」を高めます。`,level:`中級`,relatedTerms:[`alpha`,`power`]},power:{id:`power`,term:`検出力 (Statistical Power)`,explanation:`「実際に差があるときに、正しく差があると言える能力（1−β）」。この数値が高いほど、意味のある変化を鋭敏に捉えられます。サンプルサイズを増やすと検出力は上がります。`,level:`中級`,relatedTerms:[`beta`]},"central-limit":{id:`central-limit`,term:`中心極限定理 (CLT)`,explanation:`「分散が有限な分布なら、n が十分大きいとき、標本平均の分布は正規分布に近づく」という定理。元のデータが歪んでいても、大きなサンプルでは正規分布の公式を使えます。`,level:`中級`,relatedTerms:[`sample`,`normal-dist`,`lln`]},lln:{id:`lln`,term:`大数の法則 (Law of Large Numbers)`,explanation:`標本サイズnを増やすと、標本平均が真の期待値μに確率収束する定理。「コインを十分回投げれば表の割合は1/2に近づく」という日常的な経験の数学的根拠です。`,level:`中級`,relatedTerms:[`central-limit`]},"t-dist":{id:`t-dist`,term:`t分布 (t-distribution)`,explanation:`母分散が未知で小標本のとき、標本平均の分布として使うつり鐘型の分布。自由度νが大きくなるほど正規分布に近づきます。t検定・回帰係数の検定に使われます。`,level:`中級`,relatedTerms:[`normal-dist`,`chi-sq`]},"chi-sq":{id:`chi-sq`,term:`カイ二乗分布 (Chi-squared Distribution)`,explanation:`k個の独立な標準正規変数の二乗和が従う分布（自由度k）。分散の推定・適合度検定・独立性検定で使われます。期待値=k、分散=2k。`,level:`中級`,relatedTerms:[`t-dist`,`f-dist`]},"f-dist":{id:`f-dist`,term:`F分布 (F-distribution)`,explanation:`2つの独立なカイ二乗分布の比が従う分布。分散分析（ANOVA）のF検定・回帰分析の有意性検定で使われます。2つの自由度（m,n）でその形が決まります。`,level:`中級`,relatedTerms:[`chi-sq`,`anova`]},binomial:{id:`binomial`,term:`二項分布 (Binomial Distribution)`,explanation:`n回のベルヌーイ試行（成功確率p）で成功回数kが従う分布。P(X=k)=ₙCₖ·p^k(1-p)^(n-k)。期待値np、分散np(1-p)。サンプルサイズが大きいと正規近似できます。`,level:`中級`,relatedTerms:[`poisson`,`normal-dist`]},poisson:{id:`poisson`,term:`ポアソン分布 (Poisson Distribution)`,explanation:`単位時間・面積あたりの稀な事象の発生件数が従う分布。期待値=分散=λ。コールセンターへの着信数・欠陥品の個数などのモデル。二項分布のn→∞、p→0、np=λの極限です。`,formula:`P(X=k) = \\frac{e^{-\\lambda}\\lambda^k}{k!}`,level:`中級`,relatedTerms:[`binomial`]},exponential:{id:`exponential`,term:`指数分布 (Exponential Distribution)`,explanation:`ポアソン過程の待ち時間が従う分布（レートパラメータλ）。期待値1/λ、無記憶性（P(X>s+t|X>s)=P(X>t)）を持つ唯一の連続分布。故障までの時間のモデルに使われます。`,level:`中級`,relatedTerms:[`poisson`,`gamma-dist`]},"gamma-dist":{id:`gamma-dist`,term:`ガンマ分布 (Gamma Distribution)`,explanation:`形状パラメータαとレートパラメータβで決まる正の実数上の分布。指数分布（α=1）とカイ二乗分布（α=k/2、β=1/2）の一般化。ベイズ統計でポアソン分布の共役事前分布として使われます。`,level:`中級`,relatedTerms:[`exponential`,`beta-dist`,`chi-sq`]},"beta-dist":{id:`beta-dist`,term:`ベータ分布 (Beta Distribution)`,explanation:`[0,1]区間上の分布でパラメータα、β。期待値α/(α+β)。ベルヌーイ・二項分布の共役事前分布として、成功確率の事前分布に使われます。α=β=1のとき一様分布になります。`,level:`中級`,relatedTerms:[`gamma-dist`]},consistency:{id:`consistency`,term:`一致性 (Consistency)`,explanation:`サンプルサイズnを増やすと推定量が真のパラメータに確率収束する性質。「データを増やせば正確になる」という保証。不偏性（E[θ̂]=θ）とは別の性質で、一致性があっても有偏推定量はあります。`,level:`中級`,relatedTerms:[`unbiasedness`,`mle`]},likelihood:{id:`likelihood`,term:`尤度 (Likelihood)`,explanation:`「ある仮説（母数θ）の下で、今あるデータが観察される確率（連続分布の場合は確率密度）」。これを最大にする仮説を選ぶのが最尤推定法（MLE）です。`,level:`中級`,relatedTerms:[`mle`,`aic`]},"partial-corr":{id:`partial-corr`,term:`偏相関係数 (Partial Correlation)`,explanation:`第3の変数Zの影響を取り除いたうえでのXとYの相関。「身長と成績の相関」が実は「年齢」の影響だったという交絡を排除して純粋な関係を測ります。`,formula:`r_{XY \\cdot Z} = \\frac{r_{XY} - r_{XZ}r_{YZ}}{\\sqrt{(1-r_{XZ}^2)(1-r_{YZ}^2)}}`,level:`中級`,relatedTerms:[`correlation`,`confounding`]},odds:{id:`odds`,term:`オッズ比 (Odds Ratio)`,explanation:`オッズは「起こる確率 ÷ 起こらない確率」、オッズ比は2つのグループのオッズの比です（例：喫煙者のオッズ ÷ 非喫煙者のオッズ）。1なら関連なし、1より大きければ前者のほうが起こりやすいことを表します。ロジスティック回帰の係数は、説明変数が1増えたときのオッズ比の対数です。疫学でリスク要因の強さを表すのによく使われます。`,level:`中級`,relatedTerms:[`logistic`]},interaction:{id:`interaction`,term:`交互作用 (Interaction)`,explanation:`「薬Aの効果が、薬Bを同時に飲むかどうかで変わる」といった、一方の因子の効果が他方の因子の水準に依存する現象。分散分析・回帰分析で交互作用項を追加して検討します。`,level:`中級`,relatedTerms:[`anova`]},mahalanobis:{id:`mahalanobis`,term:`マハラノビス距離`,explanation:`データのばらつき（共分散構造）を考慮した距離。単なるユークリッド距離と異なり、変数間の相関を補正します。判別分析・外れ値検出で使われます。`,formula:`D^2 = (\\mathbf{x}-\\mu)^T \\Sigma^{-1} (\\mathbf{x}-\\mu)`,level:`中級`,relatedTerms:[`eigen`,`lda`]},multico:{id:`multico`,term:`多重共線性 (Multicollinearity)`,explanation:`説明変数間に強い線形相関がある状態。回帰係数の推定が不安定になり、係数の符号が逆転するなど解釈が困難になります。VIF（分散拡大因子）≥10が診断の目安。`,level:`中級`,relatedTerms:[`regularization`,`regression`]},"cross-validation":{id:`cross-validation`,term:`交差妥当化 (Cross-Validation)`,explanation:`データを学習用とテスト用に分けて入れ替えながら繰り返すモデル評価法。k分割交差検証（k-fold CV）が代表的で、過学習を検出し汎化性能を客観的に評価します。`,level:`中級`,relatedTerms:[`bootstrap`,`overfitting`]},"non-parametric":{id:`non-parametric`,term:`ノンパラメトリック手法`,explanation:`正規分布など特定の分布を仮定しない手法。多くはデータの値の代わりに「順位」を使うので、外れ値に強い（ロバスト）。ウィルコクソン順位和検定（マン・ホイットニーのU検定と同じもの）、符号付き順位検定、クラスカル・ウォリス検定が代表例。`,level:`中級`,relatedTerms:[`hypothesis-test`]},anova:{id:`anova`,term:`分散分析 (ANOVA)`,explanation:`3つ以上のグループ間で平均に差があるかを一度に検定する手法。全変動=群間変動+群内変動に分解し、F=群間分散/群内分散で判定します。複数t検定の多重比較問題を回避します。`,level:`中級`,relatedTerms:[`interaction`,`f-dist`]},confounding:{id:`confounding`,term:`交絡 (Confounding)`,explanation:`「コーヒーを飲む人はガンになりやすい？」という調査で、「コーヒー好きはタバコも吸う人が多い」という隠れた要因（タバコ）が結果を歪めてしまうような現象。ランダム化比較試験（RCT）で排除できます。`,level:`中級`,relatedTerms:[`partial-corr`]},"cluster-analysis":{id:`cluster-analysis`,term:`クラスター分析`,explanation:`似た者同士を自動的にグループ分けする教師なし学習の手法。k平均法（距離でグループ化）と階層型クラスタリング（デンドログラムで可視化）が代表的。`,level:`中級`,relatedTerms:[`pca`]},stationary:{id:`stationary`,term:`定常性 (Stationarity)`,explanation:`時間の経過によらず、平均・分散・自己共分散が一定な時系列の性質（弱定常性）。ARIMAモデルの前提条件。非定常な場合は差分を取ることで定常化します（I(d)部分）。`,level:`中級`,relatedTerms:[`arima`]},arima:{id:`arima`,term:`ARIMAモデル`,explanation:`ARIMA(p,d,q)：d回差分で定常化した後にAR(p)+MA(q)を当てはめる時系列モデル。株価・気温など非定常データの予測に使われます。ACF・PACFでp,qを選びます。`,level:`中級`,relatedTerms:[`stationary`]},censoring:{id:`censoring`,term:`打ち切り (Censoring)`,explanation:`生存時間分析で「まだ生きていて、いつイベントが起きるかわからない」不完全なデータ。この「終わっていない」という情報自体をカプラン・マイヤー法などで活かします。`,level:`中級`,relatedTerms:[`survival`]},overfitting:{id:`overfitting`,term:`過学習 (Overfitting)`,explanation:`手元のデータのノイズまで完璧に学習してしまい、新しいデータに対して予測が当たらなくなる現象。「過去問の答えを丸暗記して本番で応用が効かない」状態。正則化・交差検証で対策します。`,level:`中級`,relatedTerms:[`aic`,`regularization`,`cross-validation`]},"factor-analysis":{id:`factor-analysis`,term:`因子分析`,explanation:`目に見えない共通因子（例：知能・性格）を、観測データ（テスト得点・アンケート回答）から抽出する手法。因子負荷行列の推定後、バリマックス回転（直交）で解釈を簡単にします。`,level:`中級`,relatedTerms:[`pca`,`eigen`]},mle:{id:`mle`,term:`最尤推定法 (MLE)`,explanation:`「今のデータが観察された確率（尤度）を最大にするパラメータ」を推定値とする手法。正則条件下で一致性・漸近有効性を持ち、漸近的にクラーメル・ラオの下界を達成します。`,formula:`L(\\theta) = \\prod_{i=1}^n f(x_i | \\theta)`,level:`上級`,relatedTerms:[`likelihood`,`aic`,`fisher-info`,`cr-inequality`]},"fisher-info":{id:`fisher-info`,term:`フィッシャー情報量`,explanation:`データがパラメータθについて持つ情報の量を表す指標。対数尤度の曲率の大きさ。情報量が多いほど推定の分散（ブレ）が小さくなり、クラーメル・ラオの下界はこの逆数として表されます。`,formula:`I(\\theta) = E \\left[ \\left( \\frac{\\partial}{\\partial \\theta} \\log f(X|\\theta) \\right)^2 \\right]`,level:`上級`,relatedTerms:[`mle`,`cr-inequality`]},"cr-inequality":{id:`cr-inequality`,term:`クラーメル・ラオの下界 (CR Inequality)`,explanation:`不偏推定量の分散はフィッシャー情報量の逆数以上（Var(θ̂)≥1/(nI(θ))、I(θ)は1個のデータあたりのフィッシャー情報量）という下限。この下界を達成する推定量を「有効推定量」と呼び、MLEは漸近的にこれを達成します。`,level:`上級`,relatedTerms:[`fisher-info`,`mle`,`unbiasedness`]},aic:{id:`aic`,term:`赤池情報量規準 (AIC)`,explanation:`「予測精度」と「モデルの複雑さ」のバランスを測る指標。AIC=−2logL+2k（kはパラメータ数）。値が小さいほど良いモデル。BIC=−2logL+k·logn は大標本でペナルティが強く一致的なモデル選択を行います。`,formula:`\\text{AIC} = -2\\log L + 2k`,level:`上級`,relatedTerms:[`mle`,`overfitting`,`bic`]},bic:{id:`bic`,term:`ベイズ情報量規準 (BIC)`,explanation:`BIC=−2logL+k·logn。AICより強いパラメータペナルティで、大標本では真のモデルを一致的に選択します。AICは予測精度重視、BICはモデル同定重視と使い分けます。`,formula:`\\text{BIC} = -2\\log L + k\\log n`,level:`上級`,relatedTerms:[`aic`,`mle`]},logistic:{id:`logistic`,term:`ロジスティック回帰`,explanation:`二値アウトカム（0/1）の確率をシグモイド関数でモデル化する手法。係数βⱼはオッズ比の対数（log-odds）を表し、xⱼが1増えるとオッズがe^βⱼ倍になります。最尤法で推定します。`,formula:`P(y=1|\\mathbf{x}) = \\frac{1}{1 + \\exp(-(\\beta_0 + \\mathbf{\\beta}^T\\mathbf{x}))}`,level:`上級`,relatedTerms:[`odds`,`glm`]},glm:{id:`glm`,term:`一般化線形モデル (GLM)`,explanation:`正規分布以外の指数型分布族（二項・ポアソンなど）に対応した回帰モデル。線形予測子η=Xβと目的変数の期待値μをリンク関数g(μ)=ηで結びます。ロジスティック回帰・ポアソン回帰が特殊ケースです。`,level:`上級`,relatedTerms:[`logistic`,`mle`]},pca:{id:`pca`,term:`主成分分析 (PCA)`,explanation:`分散共分散行列（または相関行列）の固有ベクトルを主成分軸として次元削減する手法。第1主成分は分散最大方向。固有値=その主成分の分散、寄与率=固有値/固有値の総和。`,level:`上級`,relatedTerms:[`eigen`,`lda`,`factor-analysis`]},lda:{id:`lda`,term:`線形判別分析 (LDA)`,explanation:`グループ間分散/グループ内分散を最大化する判別関数を求める手法。等分散仮定で判別境界は線形（LDA）、グループ別分散では二次（QDA）。2群の分散共分散行列と事前確率が等しいときは、マハラノビス距離が近い群に分類する方法と同じ結果になります。`,level:`上級`,relatedTerms:[`pca`,`mahalanobis`]},eigen:{id:`eigen`,term:`固有値・固有ベクトル`,explanation:`行列Aに対しAv=λvを満たすλが固有値、vが固有ベクトル。分散共分散行列の固有ベクトルは主成分分析の主成分軸、固有値はその方向の分散を表します。`,level:`上級`,relatedTerms:[`pca`,`mahalanobis`]},regularization:{id:`regularization`,term:`正則化 (Regularization)`,explanation:`モデルの複雑さにペナルティを与えて過学習を防ぐ手法。Lasso（L1）はペナルティλΣ|βⱼ|で係数を完全にゼロにして変数選択を行います。Ridge（L2）はλΣβⱼ²で縮小しますが変数選択はしません。`,level:`上級`,relatedTerms:[`overfitting`,`multico`]},bootstrap:{id:`bootstrap`,term:`ブートストラップ法`,explanation:`手元のデータから復元抽出（同じデータを何度でも選べる再抽出）を繰り返すシミュレーション手法。解析的な公式が使えない統計量の信頼区間・標準誤差を数値的に求められます。`,level:`上級`,relatedTerms:[`cross-validation`]},"bayes-theorem":{id:`bayes-theorem`,term:`ベイズの定理（統計版）`,explanation:`事後分布∝尤度×事前分布。p(θ|x)∝p(x|θ)p(θ)。事前知識p(θ)をデータの尤度p(x|θ)で更新して事後分布p(θ|x)を得ます。共役事前分布を使うと解析的に事後分布を求められます。`,level:`上級`,relatedTerms:[`mcmc`,`conjugate`]},conjugate:{id:`conjugate`,term:`共役事前分布`,explanation:`尤度と組み合わせたとき事後分布が事前分布と同じ分布族になる事前分布。代表例：二項-ベータ、ポアソン-ガンマ、正規-正規（精度既知）。計算が大幅に簡単になります。`,level:`上級`,relatedTerms:[`bayes-theorem`,`beta-dist`,`gamma-dist`]},mcmc:{id:`mcmc`,term:`マルコフ連鎖モンテカルロ (MCMC)`,explanation:`目標分布を定常分布とするマルコフ連鎖を設計してサンプルを得る手法。ギブスサンプリング（条件付き分布から順に更新）とメトロポリス・ヘイスティングス（提案分布から採否判定）が代表的。`,level:`上級`,relatedTerms:[`bayes-theorem`]},"markov-chain":{id:`markov-chain`,term:`マルコフ連鎖`,explanation:`現在の状態だけが次の状態を決めるマルコフ性をもつ確率過程。定常分布πはπP=πを満たします。状態が有限個で既約・非周期なら、一意な定常分布が存在し、任意の初期分布から収束します。`,level:`上級`,relatedTerms:[`mcmc`,`stationary`]},"delta-method":{id:`delta-method`,term:`デルタ法`,explanation:`√n(θ̂−θ)→N(0,σ²)のとき、√n(g(θ̂)−g(θ))→N(0,[g'(θ)]²σ²)という漸近分布を求める方法。変換後の推定量の信頼区間・検定に使われます。`,level:`上級`,relatedTerms:[`mle`,`central-limit`]},jacobian:{id:`jacobian`,term:`ヤコビアン (Jacobian)`,explanation:`変数変換において面積・体積がどれだけ伸び縮みするかを示す行列式。確率密度の変数変換公式：f_Y(y)=f_X(g⁻¹(y))·|J|。多変量の場合は偏微分行列の行列式になります。`,level:`上級`},mgf:{id:`mgf`,term:`モーメント母関数 (MGF)`,explanation:`M_X(t)=E[e^(tX)]。存在すればすべての積率（モーメント）を生成します（k次積率=M^(k)(0)）。独立な和のMGFは積になるため、和の分布を導出するのに便利です。`,level:`上級`,relatedTerms:[`central-limit`]},"characteristic-fn":{id:`characteristic-fn`,term:`特性関数 (Characteristic Function)`,explanation:`φ_X(t)=E[e^(itX)]。MGFと異なり常に存在し、分布を一意に決定します。特性関数の収束は分布収束と同値になる（レヴィの連続性定理）ため、中心極限定理の証明に使われます。`,level:`上級`,relatedTerms:[`mgf`]},"sufficient-stat":{id:`sufficient-stat`,term:`十分統計量`,explanation:`パラメータθに関する情報をすべて持つ統計量。例えば分散が既知の正規分布で平均を推定するなら、データの合計だけ分かれば十分です。フィッシャー・ネイマンの分解定理：T(X)が十分統計量⟺f(x;θ)=g(T(x),θ)h(x)と分解できます。十分統計量に集約することで情報を失いません。`,level:`上級`,relatedTerms:[`mle`,`unbiasedness`]},"np-lemma":{id:`np-lemma`,term:`ネイマン・ピアソン補題`,explanation:`単純仮説H₀:θ=θ₀ vs H₁:θ=θ₁の検定では、尤度比L(θ₁)/L(θ₀)>cの棄却域が最強力検定（同じ有意水準の検定の中で検出力が最大）を与えるという定理。`,level:`上級`,relatedTerms:[`likelihood`,`power`]},"likelihood-ratio":{id:`likelihood-ratio`,term:`尤度比検定統計量`,explanation:`−2log(L₀/L₁)→χ²(df)（dfは制約数、大標本）。複合仮説のより一般的な検定に使われます。ウォルド検定・スコア検定と漸近的に同値です。`,level:`上級`,relatedTerms:[`likelihood`,`np-lemma`,`chi-sq`]},asymptotic:{id:`asymptotic`,term:`漸近理論`,explanation:`サンプルサイズn→∞のときの統計量の挙動を研究する理論。MLE漸近正規性（√n(θ̂_MLE−θ)→N(0,I(θ)⁻¹)）やCLTがその代表。有限サンプルでは近似として使います。`,level:`上級`,relatedTerms:[`mle`,`central-limit`,`delta-method`]},survival:{id:`survival`,term:`生存時間解析`,explanation:`イベント（死亡・故障・回復）が起きるまでの時間を分析する分野。生存関数S(t)=P(T>t)、ハザード関数h(t)=f(t)/S(t)が基本概念。カプラン・マイヤー法（ノンパラ）、コックス比例ハザードモデル（回帰）が代表手法。`,level:`上級`,relatedTerms:[`censoring`]},contingency:{id:`contingency`,term:`分割表 (Contingency Table)`,explanation:`2つ以上のカテゴリ変数の頻度をまとめた表。独立性の検定（カイ二乗検定）・Fisher正確確率検定で関連を調べます。行と列の独立性：E_ij=R_i·C_j/Nとなるか確認します。`,level:`上級`,relatedTerms:[`chi-sq`]},"canonical-corr":{id:`canonical-corr`,term:`正準相関分析`,explanation:`2組の変数群間の関連を最大化する線形結合（正準変量）を求める多変量手法。u=a'X、v=b'Yの相関を最大化するa,bを固有値問題として求めます。`,level:`上級`,relatedTerms:[`pca`,`correlation`]},"em-algorithm":{id:`em-algorithm`,term:`EMアルゴリズム`,explanation:`欠測データや潜在変数がある場合の最尤推定のアルゴリズム。Eステップ（今のパラメータのもとで、完全データの対数尤度の条件付き期待値を計算）とMステップ（その期待値を最大にするパラメータに更新）を繰り返し収束させます。混合正規分布の推定などに使われます。`,level:`上級`,relatedTerms:[`mle`,`factor-analysis`]},skewness:{id:`skewness`,term:`歪度 (Skewness)`,explanation:`分布の左右非対称さを表す指標。E[(X−μ)³]/σ³。正値なら右裾が重い（正の歪み）、負値なら左裾が重い（負の歪み）、対称なら0。正規分布の歪度は0です。`,level:`中級`,relatedTerms:[`kurtosis`,`normal-dist`]},kurtosis:{id:`kurtosis`,term:`尖度 (Kurtosis)`,explanation:`分布の裾の重さを表す指標。超過尖度=E[(X−μ)⁴]/σ⁴−3（正規分布基準で0）。正値なら正規分布より裾が重い（レプトクルティック、ファットテール）。金融データは正の超過尖度を示すことが多いです。`,level:`中級`,relatedTerms:[`skewness`,`normal-dist`]},hypergeometric:{id:`hypergeometric`,term:`超幾何分布`,explanation:`N個中K個の当たりがある母集団からn個を非復元抽出したときの当たり数の分布。期待値nK/N、分散は有限修正係数(N−n)/(N−1)が付きます。復元抽出なら二項分布になります。`,level:`中級`,relatedTerms:[`binomial`]},geometric:{id:`geometric`,term:`幾何分布`,explanation:`ベルヌーイ試行で初めて成功するまでの試行回数の分布。P(X=k)=(1−p)^(k−1)p、期待値1/p。無記憶性（過去の失敗が次の成功確率に影響しない）を持ちます。`,level:`中級`,relatedTerms:[`binomial`,`exponential`]},"neg-binomial":{id:`neg-binomial`,term:`負の二項分布`,explanation:`ベルヌーイ試行でr回成功するまでの試行回数の分布。期待値r/p、分散r(1−p)/p²。幾何分布（r=1）の一般化。過分散データ（分散>平均）のカウントデータにもよく使われます。`,level:`中級`,relatedTerms:[`geometric`,`poisson`]},"total-probability":{id:`total-probability`,term:`全確率の定理`,explanation:`完全系{A₁,…,Aₖ}（互いに排反でその和が全体）に対してP(B)=ΣP(B|Aᵢ)P(Aᵢ)。ベイズの定理の分母の計算に使います。「経路の重みつき平均」とも解釈できます。`,level:`基礎`,relatedTerms:[`bayes-theorem`,`conditional-prob`]},"conditional-prob":{id:`conditional-prob`,term:`条件付き確率`,explanation:`P(B|A)=P(A∩B)/P(A)（P(A)>0）。「Aが起きたという情報のもとでBが起きる確率」。条件付けによって標本空間がAに縮小します。ベイズの定理・全確率の定理の基礎。`,level:`基礎`,relatedTerms:[`total-probability`,`bayes-theorem`]},"law-total-expectation":{id:`law-total-expectation`,term:`全期待値の法則 / 全分散の法則`,explanation:`全期待値の法則：E[X]=E[E[X|Y]]。全分散の法則：Var(X)=E[Var(X|Y)]+Var(E[X|Y])。階層モデル・ランダム効果モデルの分析に使います。`,level:`上級`,relatedTerms:[`conditional-prob`]},"multivariate-normal":{id:`multivariate-normal`,term:`多変量正規分布`,explanation:`p変量の正規分布。平均ベクトルμとp×p正定値行列Σ（分散共分散行列）で決まります。多変量正規分布に従う変数どうしでは、無相関（ρ=0）と独立が同値です（一般の分布では、無相関でも独立とは限りません）。`,formula:`f(\\mathbf{x}) = \\frac{1}{(2\\pi)^{p/2}|\\Sigma|^{1/2}} \\exp\\left(-\\frac{1}{2}(\\mathbf{x}-\\mu)^T\\Sigma^{-1}(\\mathbf{x}-\\mu)\\right)`,level:`上級`,relatedTerms:[`normal-dist`,`mahalanobis`]},"marginal-dist":{id:`marginal-dist`,term:`周辺分布 (Marginal Distribution)`,explanation:`いくつかの確率変数をまとめて扱う分布（同時分布）から、1つの変数だけを取り出して見た分布。離散なら他の変数について確率を足し合わせ、連続なら他の変数について積分して求めます。例えば多項分布の各成分の周辺分布は二項分布、多変量正規分布の各成分の周辺分布は正規分布です。`,level:`基礎`,relatedTerms:[`multinomial`,`multivariate-normal`]},multinomial:{id:`multinomial`,term:`多項分布`,explanation:`1回の結果がk種類（確率p₁,…,pₖ）ある試行をn回繰り返したときの、各結果の回数の同時分布。k=2なら二項分布。各成分の周辺分布は二項分布B(n,pᵢ)で、別々の結果の回数どうしは負の相関を持ちます（Cov(Xᵢ,Xⱼ)=−npᵢpⱼ）。`,level:`中級`,relatedTerms:[`binomial`,`marginal-dist`]},"inclusion-exclusion":{id:`inclusion-exclusion`,term:`包除原理`,explanation:`P(A∪B)=P(A)+P(B)−P(A∩B)。3事象ではP(A∪B∪C)=P(A)+P(B)+P(C)−P(A∩B)−P(B∩C)−P(A∩C)+P(A∩B∩C)。重複して数えた部分を引き戻す原理。`,level:`基礎`,relatedTerms:[`conditional-prob`]}};function Wn(e,t,n){return 1/(n*Math.sqrt(2*Math.PI))*Math.exp(-.5*((e-t)/n)**2)}function Gn(e,t){return Jn((t+1)/2)/(Math.sqrt(t*Math.PI)*Jn(t/2))*(1+e*e/t)**(-(t+1)/2)}function Kn(e,t){return e<=0?0:e**(t/2-1)*Math.exp(-e/2)/(2**(t/2)*Jn(t/2))}function qn(e,t,n){if(e<=0)return 0;let r=(t*e)**+t*n**+n,i=(t*e+n)**+(t+n);return Jn((t+n)/2)/(Jn(t/2)*Jn(n/2))*Math.sqrt(r/i)/e}function Jn(e){let t=[.9999999999998099,676.5203681218851,-1259.1392167224028,771.3234287776531,-176.6150291621406,12.507343278686905,-.13857109526572012,9984369578019572e-21,1.5056327351493116e-7];if(e<.5)return Math.PI/(Math.sin(Math.PI*e)*Jn(1-e));--e;let n=t[0];for(let r=1;r<9;r++)n+=t[r]/(e+r);let r=e+7+.5;return Math.sqrt(2*Math.PI)*r**+(e+.5)*Math.exp(-r)*n}var Yn=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),Xn=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),Zn=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),Qn=e=>{let t=Zn(e);return t.charAt(0).toUpperCase()+t.slice(1)},$n={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},er=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},tr=(0,y.forwardRef)(({color:e=`currentColor`,size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:i=``,children:a,iconNode:o,...s},c)=>(0,y.createElement)(`svg`,{ref:c,...$n,width:t,height:t,stroke:e,strokeWidth:r?Number(n)*24/Number(t):n,className:Yn(`lucide`,i),...!a&&!er(s)&&{"aria-hidden":`true`},...s},[...o.map(([e,t])=>(0,y.createElement)(e,t)),...Array.isArray(a)?a:[a]])),Q=(e,t)=>{let n=(0,y.forwardRef)(({className:n,...r},i)=>(0,y.createElement)(tr,{ref:i,iconNode:t,className:Yn(`lucide-${Xn(Qn(e))}`,`lucide-${e}`,n),...r}));return n.displayName=Qn(e),n},nr=Q(`arrow-down`,[[`path`,{d:`M12 5v14`,key:`s699le`}],[`path`,{d:`m19 12-7 7-7-7`,key:`1idqje`}]]),rr=Q(`arrow-right`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]),ir=Q(`book`,[[`path`,{d:`M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20`,key:`k3hazp`}]]),ar=Q(`chart-column`,[[`path`,{d:`M3 3v16a2 2 0 0 0 2 2h16`,key:`c24i48`}],[`path`,{d:`M18 17V9`,key:`2bz60n`}],[`path`,{d:`M13 17V5`,key:`1frdt8`}],[`path`,{d:`M8 17v-3`,key:`17ska0`}]]),or=Q(`chevron-left`,[[`path`,{d:`m15 18-6-6 6-6`,key:`1wnfg3`}]]),sr=Q(`chevron-right`,[[`path`,{d:`m9 18 6-6-6-6`,key:`mthhwq`}]]),cr=Q(`chevron-up`,[[`path`,{d:`m18 15-6-6-6 6`,key:`153udz`}]]),lr=Q(`circle-check`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),ur=Q(`circle-question-mark`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`,key:`1u773s`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),dr=Q(`circle-x`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m15 9-6 6`,key:`1uzhvr`}],[`path`,{d:`m9 9 6 6`,key:`z0biqf`}]]),fr=Q(`dumbbell`,[[`path`,{d:`M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z`,key:`9m4mmf`}],[`path`,{d:`m2.5 21.5 1.4-1.4`,key:`17g3f0`}],[`path`,{d:`m20.1 3.9 1.4-1.4`,key:`1qn309`}],[`path`,{d:`M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z`,key:`1t2c92`}],[`path`,{d:`m9.6 14.4 4.8-4.8`,key:`6umqxw`}]]),pr=Q(`file-text`,[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M10 9H8`,key:`b1mrlr`}],[`path`,{d:`M16 13H8`,key:`t4e002`}],[`path`,{d:`M16 17H8`,key:`z1uh3a`}]]),mr=Q(`layout-dashboard`,[[`rect`,{width:`7`,height:`9`,x:`3`,y:`3`,rx:`1`,key:`10lvy0`}],[`rect`,{width:`7`,height:`5`,x:`14`,y:`3`,rx:`1`,key:`16une8`}],[`rect`,{width:`7`,height:`9`,x:`14`,y:`12`,rx:`1`,key:`1hutg5`}],[`rect`,{width:`7`,height:`5`,x:`3`,y:`16`,rx:`1`,key:`ldoo1y`}]]),hr=Q(`lightbulb`,[[`path`,{d:`M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5`,key:`1gvzjb`}],[`path`,{d:`M9 18h6`,key:`x1upvd`}],[`path`,{d:`M10 22h4`,key:`ceow96`}]]),gr=Q(`link`,[[`path`,{d:`M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71`,key:`1cjeqo`}],[`path`,{d:`M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71`,key:`19qd67`}]]),_r=Q(`list-ordered`,[[`path`,{d:`M11 5h10`,key:`1cz7ny`}],[`path`,{d:`M11 12h10`,key:`1438ji`}],[`path`,{d:`M11 19h10`,key:`11t30w`}],[`path`,{d:`M4 4h1v5`,key:`10yrso`}],[`path`,{d:`M4 9h2`,key:`r1h2o0`}],[`path`,{d:`M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02`,key:`xtkcd5`}]]),vr=Q(`moon`,[[`path`,{d:`M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401`,key:`kfwtm`}]]),yr=Q(`search`,[[`path`,{d:`m21 21-4.34-4.34`,key:`14j7rj`}],[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}]]),br=Q(`sigma`,[[`path`,{d:`M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2`,key:`wuwx1p`}]]),xr=Q(`shuffle`,[[`path`,{d:`m18 14 4 4-4 4`,key:`10pe0f`}],[`path`,{d:`m18 2 4 4-4 4`,key:`pucp1d`}],[`path`,{d:`M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22`,key:`1ailkh`}],[`path`,{d:`M2 6h1.972a4 4 0 0 1 3.6 2.2`,key:`km57vx`}],[`path`,{d:`M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45`,key:`os18l9`}]]),Sr=Q(`sun`,[[`circle`,{cx:`12`,cy:`12`,r:`4`,key:`4exip2`}],[`path`,{d:`M12 2v2`,key:`tus03m`}],[`path`,{d:`M12 20v2`,key:`1lh1kg`}],[`path`,{d:`m4.93 4.93 1.41 1.41`,key:`149t6j`}],[`path`,{d:`m17.66 17.66 1.41 1.41`,key:`ptbguv`}],[`path`,{d:`M2 12h2`,key:`1t8f8n`}],[`path`,{d:`M20 12h2`,key:`1q8mjw`}],[`path`,{d:`m6.34 17.66-1.41 1.41`,key:`1m8zz5`}],[`path`,{d:`m19.07 4.93-1.41 1.41`,key:`1shlcs`}]]),Cr=Q(`target`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`circle`,{cx:`12`,cy:`12`,r:`6`,key:`1vlfrh`}],[`circle`,{cx:`12`,cy:`12`,r:`2`,key:`1c9p78`}]]),wr=Q(`trash-2`,[[`path`,{d:`M10 11v6`,key:`nco0om`}],[`path`,{d:`M14 11v6`,key:`outv1u`}],[`path`,{d:`M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6`,key:`miytrc`}],[`path`,{d:`M3 6h18`,key:`d0wm0j`}],[`path`,{d:`M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2`,key:`e791ji`}]]),Tr=Q(`x`,[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]),$=r(),Er={normal:`中心極限定理：正規分布への収束`,t:`t分布：サンプルサイズと裾の厚さ`,chi2:`χ²分布：自由度による形状の変化`,f:`F分布：2つの分散の比較`,pca:`主成分分析：情報の集約`,outlier:`判別分析：グループ境界の決まり方`,mcmc:`MCMC：サンプリングで分布を近似する`,update:`ベイズ更新：確信度の変化`,overfit:`過学習：モデルの複雑さと汎化性能`,multico:`多重共線性：不安定な係数`,skewkurt:`歪度と尖度：分布の形を読む`};function Dr(e){let t=e;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Or(e,t){let n=Dr(t),r=[];for(let t=0;t<e;t++){let e=Math.max(n(),1e-9),t=n(),i=Math.sqrt(-2*Math.log(e));r.push({z1:i*Math.cos(2*Math.PI*t),z2:i*Math.sin(2*Math.PI*t)})}return r}function kr(e){return .5*Wn(e,-2,.7)+.5*Wn(e,2,.7)}function Ar(e,t){let n=Dr(t),r=0,i=[];for(let t=0;t<e;t++){let e=Math.max(n(),1e-9),t=n(),a=Math.sqrt(-2*Math.log(e))*Math.cos(2*Math.PI*t),o=r+a*1.2,s=Math.min(1,kr(o)/Math.max(kr(r),1e-12));n()<s&&(r=o),i.push(r)}return i}function jr(e){return Math.max(20,Math.ceil((e+4*Math.sqrt(2*e))/10)*10)}function Mr(e){return e<=20?5:e<=50?10:20}function Nr(e,t,n,r){let i=(n-t)/r,a=e(t)+e(n);for(let n=1;n<r;n++)a+=e(t+n*i)*(n%2?4:2);return a*i/3}var Pr=({type:e})=>{let t=Er[e]||`統計シミュレーター`,[n,r]=(0,y.useState)(5),[a,o]=(0,y.useState)(5),[u,ee]=(0,y.useState)(10),[te,ne]=(0,y.useState)(1),[b,x]=(0,y.useState)(.9),[re,S]=(0,y.useState)(.8),[C,w]=(0,y.useState)(0),[T,E]=(0,y.useState)(50),ie=(0,y.useMemo)(()=>Or(60,42),[]),ae=(0,y.useMemo)(()=>Ar(1500,123),[]),oe=(0,y.useMemo)(()=>({g1:Or(30,7),g2:Or(30,99)}),[]),D=(0,y.useMemo)(()=>{let t=[];if(e===`normal`){let e=Math.sqrt(n),r=(e,t)=>{if(e<=0)return 0;let n=0;for(let e=2;e<=t-1;e++)n+=Math.log(e);return Math.exp((t-1)*Math.log(e)-e-n)};for(let i=-80;i<=80;i++){let a=i/20,o=r(a*e+n,n)*e;t.push({x:a.toFixed(2),y:Math.max(0,o),ref:Wn(a,0,1)})}}else if(e===`t`)for(let e=-80;e<=80;e++){let n=e/20;t.push({x:n,y:Gn(n,a),normal:Wn(n,0,1)})}else if(e===`chi2`){let e=jr(a);for(let n=1;n<=160;n++){let r=e*n/160;t.push({x:r,y:Kn(r,a)})}}else if(e===`f`)for(let e=1;e<=200;e++){let n=e/40;t.push({x:n,y:qn(n,a,u)})}else if(e===`update`){let e=.5,r=1/(1/1**2+n/e**2),i=r*(0/1**2+n*1.5/e**2),a=Math.sqrt(r);for(let e=-4;e<=4;e+=.1)t.push({x:e.toFixed(1),prior:Wn(e,0,1),posterior:Wn(e,i,a)})}else if(e===`skewkurt`){let e=[],t=[],n=[];for(let t=-50;t<=50;t++){let n=t/10,r=n+3,i=3-n,a=r>0?r*r*Math.exp(-r)/(4*Math.exp(-2)):0,o=i>0?i*i*Math.exp(-i)/(4*Math.exp(-2)):0,s=Wn(n,0,1.4)*1.4*Math.sqrt(2*Math.PI);e.push({x:n.toFixed(1),sym:s,right:a,left:o})}let r=1/Math.SQRT2,i=e=>Math.exp(-e*e/2)/Math.sqrt(2*Math.PI),a=e=>Math.exp(-Math.abs(e)/r)/(2*r);for(let e=-5;e<=5;e+=.1)t.push({x:e.toFixed(1),normal:i(e),fat:a(e)});for(let e=2;e<=5;e+=.05)n.push({x:e.toFixed(2),normal:i(e),fat:a(e)});return{skewData:e,kurtData:t,kurtTail:n}}else if(e===`overfit`){let e=[{x:-3,y:-2},{x:-1,y:-.5},{x:0,y:.2},{x:1,y:.8},{x:3,y:2.5}],t=[];for(let e=-4;e<=4;e+=.2){let n=0;n=te===1?.7*e:te===2?.1*e*e+.7*e:.05*e**5-.1*e**3+.7*e+Math.sin(e*3)*.5,t.push({x:e,y:n})}return{line:t,dots:e}}else if(e===`pca`){let e=re,t=ie.map(({z1:t,z2:n})=>({x:t,y:e*t+Math.sqrt(1-e*e)*n})),n={x:Math.SQRT1_2,y:Math.SQRT1_2},r=2.8;return{points:t,axis:[{x:-r*n.x,y:-r*n.y},{x:r*n.x,y:r*n.y}],axis2:[{x:-r*.5*n.x,y:r*.5*n.y},{x:r*.5*n.x,y:-r*.5*n.y}],contribution:(1+e)/2,rho:e}}else if(e===`outlier`){let e=C,t=1.4,n=(t,n,r)=>({x:r+t,y:e*t+Math.sqrt(1-e*e)*n}),r=oe.g1.map(({z1:e,z2:r})=>n(e,r,-t)),i=oe.g2.map(({z1:e,z2:r})=>n(e,r,t)),a=3.2,o=Math.sqrt(e*e+1);return{group1:r,group2:i,boundary:[{x:-a*(e/o),y:-a*(1/o)},{x:e/o*a,y:1/o*a}]}}else if(e===`mcmc`){let e=ae.slice(0,T),t=.5,n=Math.round(10/t),r=Array(n).fill(0);for(let i of e){let e=Math.min(n-1,Math.max(0,Math.floor((i- -5)/t)));r[e]++}return{hist:r.map((n,r)=>{let i=-5+(r+.5)*t;return{x:i,density:n/(e.length*t),target:kr(i)}})}}return t},[e,n,a,u,te,re,ie,C,oe,T,ae]);return(0,$.jsxs)(`div`,{className:`card-simulator`,children:[(0,$.jsx)(`div`,{className:`simulator-header`,children:(0,$.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`0.5rem`},children:[(0,$.jsx)(`div`,{className:`simulator-icon`,children:(0,$.jsx)(ar,{size:18,color:`var(--primary)`})}),(0,$.jsx)(`h3`,{style:{margin:0,fontSize:`0.9rem`},children:t})]})}),(0,$.jsx)(`div`,{className:`chart-area`,children:(()=>{if(e===`t`||e===`chi2`||e===`f`){let t=D,n=e===`t`?4:e===`chi2`?jr(a):5,r=e===`chi2`?Mr(n):1,i=e===`t`?[-4,-2,0,2,4]:Array.from({length:Math.floor(n/r)+1},(e,t)=>t*r),o=e===`t`?.42:Math.min(e===`chi2`?.5:1.6,Math.max(...t.map(e=>e.y))*1.15),s=e===`t`?1-Nr(e=>Gn(e,a),-2,2,400):0;return(0,$.jsxs)(`div`,{children:[(0,$.jsx)(l,{width:`100%`,height:190,children:(0,$.jsxs)(_,{data:t,margin:{top:10,right:12,left:4,bottom:0},children:[(0,$.jsx)(c,{strokeDasharray:`3 3`,vertical:!1}),(0,$.jsx)(h,{type:`number`,dataKey:`x`,domain:[e===`t`?-4:0,n],ticks:i,interval:0,tick:{fontSize:11,fill:`#64748b`}}),(0,$.jsx)(p,{hide:!0,domain:[0,o],allowDataOverflow:!0}),e===`t`&&(0,$.jsx)(g,{type:`monotone`,dataKey:`normal`,stroke:`#94a3b8`,strokeDasharray:`5 5`,dot:!1,isAnimationActive:!1}),e===`chi2`&&(0,$.jsx)(f,{x:a,stroke:`#dc2626`,strokeDasharray:`4 3`}),e===`f`&&(0,$.jsx)(f,{x:1,stroke:`#dc2626`,strokeDasharray:`4 3`}),e===`t`?(0,$.jsx)(g,{type:`monotone`,dataKey:`y`,stroke:`var(--primary)`,strokeWidth:2,dot:!1,isAnimationActive:!1}):(0,$.jsx)(m,{type:`monotone`,dataKey:`y`,fill:`var(--primary)`,stroke:`var(--primary)`,fillOpacity:.3,dot:!1,isAnimationActive:!1})]})}),(0,$.jsx)(`div`,{style:{textAlign:`center`,fontSize:`0.68rem`,color:`#94a3b8`,marginTop:2},children:e===`t`?`青: 自由度 `+a+` の t 分布。点線: N(0,1)。`:e===`chi2`?`赤い点線＝期待値 k。`:`赤い点線＝1（2つの分散が等しいときの中心）。`}),(0,$.jsx)(`div`,{style:{textAlign:`center`,fontSize:`0.8rem`,marginTop:4},children:e===`t`?(0,$.jsxs)($.Fragment,{children:[`|T| が 2 を超える確率：`,(s*100).toFixed(1),`%（N(0,1) では 4.6%）`]}):e===`chi2`?(0,$.jsxs)($.Fragment,{children:[`自由度 k = `,a,`：期待値 `,a,`、分散 `,2*a]}):(0,$.jsxs)($.Fragment,{children:[`F(`,a,`, `,u,`)：`,u>2?(0,$.jsxs)($.Fragment,{children:[`期待値 `,u,`/(`,u,`−2) ≈ `,(u/(u-2)).toFixed(2)]}):(0,$.jsx)($.Fragment,{children:`分母の自由度が2以下では期待値なし`})]})})]})}if(e===`overfit`){let{line:e,dots:t}=D,n=te===1?45:te===2?42:88;return(0,$.jsxs)(`div`,{style:{position:`relative`},children:[(0,$.jsxs)(`div`,{className:`stat-badge`,style:{position:`absolute`,top:-10,right:0,zIndex:10,background:n>50?`#ef4444`:`#22c55e`,color:`white`},children:[`AIC: `,n,` (`,n>50?`過学習`:`良好`,`)`]}),(0,$.jsx)(l,{width:`100%`,height:200,children:(0,$.jsxs)(_,{data:e,margin:{top:20,right:20,left:4,bottom:0},children:[(0,$.jsx)(c,{strokeDasharray:`3 3`,vertical:!1}),(0,$.jsx)(h,{dataKey:`x`,hide:!0}),(0,$.jsx)(p,{domain:[-4,4],hide:!0}),(0,$.jsx)(g,{type:`monotone`,dataKey:`y`,stroke:`var(--primary)`,strokeWidth:3,dot:!1,isAnimationActive:!1}),(0,$.jsx)(d,{data:t,fill:`#1e293b`})]})})]})}if(e===`pca`){let{points:e,axis:t,axis2:n,contribution:r,rho:i}=D;return(0,$.jsxs)(`div`,{style:{position:`relative`},children:[(0,$.jsxs)(`div`,{className:`stat-badge`,style:{position:`absolute`,top:-10,right:0,zIndex:10,background:`var(--primary)`,color:`white`},children:[`第1主成分の寄与率: `,(r*100).toFixed(0),`%`]}),(0,$.jsx)(l,{width:`100%`,height:260,children:(0,$.jsxs)(_,{margin:{top:24,right:16,left:0,bottom:18},children:[(0,$.jsx)(c,{strokeDasharray:`3 3`}),(0,$.jsx)(h,{type:`number`,dataKey:`x`,domain:[-3,3],ticks:[-3,-2,-1,0,1,2,3],tick:{fontSize:11},label:{value:`変数1（標準化）`,position:`insideBottom`,offset:-12,fontSize:11}}),(0,$.jsx)(p,{type:`number`,dataKey:`y`,domain:[-3,3],ticks:[-3,-2,-1,0,1,2,3],tick:{fontSize:11},width:28,label:{value:`変数2`,angle:-90,position:`insideLeft`,offset:8,fontSize:11}}),(0,$.jsx)(d,{data:e,dataKey:`y`,fill:`var(--primary)`,fillOpacity:.55,isAnimationActive:!1}),(0,$.jsx)(g,{data:t,dataKey:`y`,stroke:`#ef4444`,strokeWidth:2.5,dot:!1,isAnimationActive:!1}),(0,$.jsx)(g,{data:n,dataKey:`y`,stroke:`#64748b`,strokeWidth:2,strokeDasharray:`5 4`,dot:!1,isAnimationActive:!1})]})}),(0,$.jsxs)(`div`,{style:{textAlign:`center`,fontSize:`0.75rem`,color:`var(--text-secondary, #64748b)`,marginTop:2},children:[`固有値 λ₁ = 1 + `,i.toFixed(2),` = `,(1+i).toFixed(2),`、λ₂ = 1 − `,i.toFixed(2),` = `,(1-i).toFixed(2)]}),(0,$.jsx)(`div`,{style:{textAlign:`center`,fontSize:`0.72rem`,color:`#94a3b8`,marginTop:2},children:`赤線: 第1主成分、灰色の破線: 第2主成分。相関を強めるとデータが赤線上に集中し、寄与率 (1+r)/2 が上がります。`})]})}if(e===`outlier`){let{group1:e,group2:t,boundary:n}=D;return(0,$.jsxs)(`div`,{children:[(0,$.jsx)(l,{width:`100%`,height:200,children:(0,$.jsxs)(_,{margin:{top:10,right:20,left:4,bottom:0},children:[(0,$.jsx)(c,{strokeDasharray:`3 3`}),(0,$.jsx)(h,{type:`number`,dataKey:`x`,domain:[-4,4],hide:!0}),(0,$.jsx)(p,{type:`number`,dataKey:`y`,domain:[-3,3],hide:!0}),(0,$.jsx)(d,{data:e,dataKey:`y`,fill:`#3b82f6`,fillOpacity:.6,isAnimationActive:!1}),(0,$.jsx)(d,{data:t,dataKey:`y`,fill:`#f59e0b`,fillOpacity:.6,isAnimationActive:!1}),(0,$.jsx)(g,{data:n,dataKey:`y`,stroke:`#1e293b`,strokeWidth:2.5,strokeDasharray:`6 3`,dot:!1,isAnimationActive:!1})]})}),(0,$.jsx)(`div`,{style:{textAlign:`center`,fontSize:`0.68rem`,color:`#94a3b8`,marginTop:2},children:`破線: 判別境界。2群の分散共分散が同じでも、変数間の相関が変わると境界の傾きが変わります。`})]})}if(e===`mcmc`){let{hist:e}=D;return(0,$.jsxs)(`div`,{children:[(0,$.jsx)(l,{width:`100%`,height:200,children:(0,$.jsxs)(_,{data:e,margin:{top:10,right:10,left:4,bottom:0},children:[(0,$.jsx)(c,{strokeDasharray:`3 3`,vertical:!1}),(0,$.jsx)(h,{dataKey:`x`,hide:!0}),(0,$.jsx)(p,{hide:!0}),(0,$.jsx)(s,{dataKey:`density`,fill:`var(--primary)`,fillOpacity:.5,isAnimationActive:!1}),(0,$.jsx)(g,{dataKey:`target`,stroke:`#ef4444`,strokeWidth:2,dot:!1,isAnimationActive:!1})]})}),(0,$.jsx)(`div`,{style:{textAlign:`center`,fontSize:`0.68rem`,color:`#94a3b8`,marginTop:2},children:`赤線: 目標分布（双峰）。棒: これまでに生成したサンプルのヒストグラム。サンプル数を増やすと棒が赤線に近づきます。`})]})}if(e===`multico`){let e=b>.95?(b-.95)*100:0;return(0,$.jsxs)(`div`,{style:{height:180,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,background:`var(--bg-warm)`,borderRadius:`12px`},children:[(0,$.jsxs)(`div`,{className:`stat-badge`,style:{marginBottom:`1rem`,background:b>.9?`#ef4444`:`#22c55e`,color:`white`},children:[`VIF: `,(1/(1-b*b)).toFixed(1)]}),(0,$.jsx)(i.div,{animate:{rotateX:45,rotateZ:e*10},style:{width:80,height:80,background:`var(--primary)`,opacity:.6,borderRadius:8,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`white`,fontSize:`0.8rem`,fontWeight:800},children:`回帰平面`}),(0,$.jsx)(`div`,{style:{fontSize:`0.75rem`,marginTop:`1rem`,color:`#64748b`},children:`相関が高いと推定量が不安定になります`})]})}if(e===`normal`)return(0,$.jsxs)(`div`,{children:[(0,$.jsx)(l,{width:`100%`,height:190,children:(0,$.jsxs)(_,{data:D,margin:{top:10,right:10,left:4,bottom:0},children:[(0,$.jsx)(c,{strokeDasharray:`3 3`,vertical:!1}),(0,$.jsx)(h,{dataKey:`x`,ticks:[`-3.00`,`-2.00`,`-1.00`,`0.00`,`1.00`,`2.00`,`3.00`],tickFormatter:e=>String(parseFloat(e)),tick:{fontSize:11},interval:0}),(0,$.jsx)(p,{hide:!0}),(0,$.jsx)(m,{type:`monotone`,dataKey:`y`,fill:`var(--primary)`,stroke:`var(--primary)`,fillOpacity:.3,dot:!1,isAnimationActive:!1}),(0,$.jsx)(g,{type:`monotone`,dataKey:`ref`,stroke:`#94a3b8`,strokeDasharray:`5 5`,dot:!1,isAnimationActive:!1})]})}),(0,$.jsx)(`div`,{style:{textAlign:`center`,fontSize:`0.68rem`,color:`#94a3b8`,marginTop:2},children:`元の分布＝指数分布（右に歪み、歪度2）。点線: N(0,1)。横軸は標準化した平均。`}),(0,$.jsxs)(`div`,{style:{textAlign:`center`,fontSize:`0.8rem`,marginTop:4},children:[`n = `,n,` のとき、標準化した平均の歪度 2/√n ≈ `,(2/Math.sqrt(n)).toFixed(2),`（元の歪度2 ÷ √n。0 で左右対称）`]})]});if(e===`skewkurt`){let{skewData:e,kurtData:t,kurtTail:n}=D,r=[{key:`left`,label:`左に裾（歪度マイナス）`,example:`例：簡単な試験の点数分布`,color:`#ef4444`},{key:`sym`,label:`対称（歪度ゼロ）`,example:`例：身長・体重など`,color:`#22c55e`},{key:`right`,label:`右に裾（歪度プラス）`,example:`例：年収分布`,color:`#3b82f6`}],i=[{key:`normal`,label:`正規分布（尖度3・基準）`,example:`身長・測定誤差など`,color:`#94a3b8`},{key:`fat`,label:`ラプラス分布（尖度6・高尖度）`,example:`株価の日次変動など`,color:`var(--primary)`}];return(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`div`,{style:{fontSize:`0.72rem`,fontWeight:700,color:`#64748b`,marginBottom:4},children:`歪度の違い`}),r.map(t=>(0,$.jsxs)(`div`,{style:{marginBottom:6},children:[(0,$.jsxs)(`div`,{style:{fontSize:`0.68rem`,fontWeight:600,color:t.color},children:[t.label,` `,(0,$.jsxs)(`span`,{style:{color:`#94a3b8`,fontWeight:400},children:[`— `,t.example]})]}),(0,$.jsx)(l,{width:`100%`,height:52,children:(0,$.jsxs)(_,{data:e,margin:{top:2,right:4,left:4,bottom:0},children:[(0,$.jsx)(p,{hide:!0,domain:[0,1.15]}),(0,$.jsx)(m,{type:`monotone`,dataKey:t.key,fill:t.color,fillOpacity:.25,stroke:t.color,strokeWidth:2,dot:!1,isAnimationActive:!1})]})})]},t.key)),(0,$.jsx)(`div`,{style:{fontSize:`0.72rem`,fontWeight:700,color:`#64748b`,margin:`10px 0 2px`},children:`尖度の違い（どちらも平均0・標準偏差1に揃えてあります）`}),(0,$.jsx)(`div`,{style:{display:`flex`,gap:10,flexWrap:`wrap`,marginBottom:2},children:i.map(e=>(0,$.jsxs)(`span`,{style:{fontSize:`0.68rem`,fontWeight:600,color:e.color},children:[(0,$.jsx)(`span`,{style:{display:`inline-block`,width:9,height:9,background:e.color,borderRadius:2,marginRight:4}}),e.label,` `,(0,$.jsxs)(`span`,{style:{color:`#94a3b8`,fontWeight:400},children:[`— `,e.example]})]},e.key))}),(0,$.jsx)(l,{width:`100%`,height:116,children:(0,$.jsxs)(_,{data:t,margin:{top:4,right:4,left:4,bottom:0},children:[(0,$.jsx)(p,{hide:!0,domain:[0,.78]}),i.map(e=>(0,$.jsx)(m,{type:`monotone`,dataKey:e.key,fill:e.color,fillOpacity:.18,stroke:e.color,strokeWidth:2,dot:!1,isAnimationActive:!1},e.key))]})}),(0,$.jsxs)(`div`,{style:{fontSize:`0.64rem`,color:`#64748b`,margin:`0 0 8px`,lineHeight:1.5},children:[`中心（|x|<0.5）はラプラスが`,(0,$.jsx)(`strong`,{children:`約1.8倍高い`}),`＝山が尖る。肩（0.5〜2.3）では`,(0,$.jsx)(`strong`,{children:`正規の方が上`}),`。 そして外側で`,(0,$.jsx)(`strong`,{children:`再び逆転`}),`する。この`,(0,$.jsx)(`strong`,{children:`2回の交差`}),`が高尖度の形です。`]}),(0,$.jsxs)(`div`,{style:{fontSize:`0.68rem`,fontWeight:700,color:`#64748b`,margin:`4px 0 2px`},children:[`裾だけを拡大（x = 2 〜 5・`,(0,$.jsx)(`span`,{style:{color:`var(--primary)`},children:`縦軸は対数目盛`}),`）`]}),(0,$.jsx)(l,{width:`100%`,height:118,children:(0,$.jsxs)(_,{data:n,margin:{top:6,right:6,left:0,bottom:0},children:[(0,$.jsx)(c,{strokeDasharray:`3 3`,vertical:!1}),(0,$.jsx)(p,{scale:`log`,domain:[1e-6,.1],ticks:[1e-5,.001,.1],tickFormatter:e=>e>=.1?`0.1`:e>=.001?`0.001`:`0.00001`,tick:{fontSize:9,fill:`#94a3b8`},width:46}),i.map(e=>(0,$.jsx)(g,{type:`monotone`,dataKey:e.key,stroke:e.color,strokeWidth:2,dot:!1,isAnimationActive:!1},e.key))]})}),(0,$.jsxs)(`div`,{style:{fontSize:`0.64rem`,color:`#64748b`,lineHeight:1.5},children:[`正規（グレー）は右へ行くほど`,(0,$.jsx)(`strong`,{children:`急降下`}),`し、ラプラス（紫）は`,(0,$.jsx)(`strong`,{children:`ほぼ直線`}),`のまま下がります。 この`,(0,$.jsx)(`strong`,{children:`落ち方そのものの違い`}),`が裾の重さです。x=5 では高さが`,(0,$.jsx)(`strong`,{children:`約230倍`}),`も開きます。 数で言うと、`,(0,$.jsx)(`strong`,{children:`±3σ の外に出る確率は 正規 0.27%（1000回に約3回）に対し、ラプラスは 1.44%（約14回）＝5.3倍`}),`。 これが「裾が厚い＝外れ値が出やすい」の中身です。`]})]})}return(0,$.jsx)(l,{width:`100%`,height:200,children:(0,$.jsxs)(_,{data:D,margin:{top:10,right:10,left:0,bottom:0},children:[(0,$.jsx)(c,{strokeDasharray:`3 3`,vertical:!1}),(0,$.jsx)(h,{dataKey:`x`,tick:{fontSize:11,fill:`#64748b`},interval:`preserveStartEnd`,minTickGap:28,tickFormatter:e=>typeof e==`number`?String(Math.round(e*100)/100):e}),(0,$.jsx)(p,{width:38,tick:{fontSize:11,fill:`#64748b`},tickFormatter:e=>typeof e==`number`?String(Math.round(e*100)/100):e}),(0,$.jsx)(v,{}),e===`update`?(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(g,{type:`monotone`,dataKey:`prior`,stroke:`#94a3b8`,strokeDasharray:`5 5`,dot:!1,name:`事前分布`}),(0,$.jsx)(m,{type:`monotone`,dataKey:`posterior`,fill:`var(--primary)`,stroke:`var(--primary)`,fillOpacity:.3,name:`事後分布`})]}):(0,$.jsx)(m,{type:`monotone`,dataKey:`y`,fill:`var(--primary)`,stroke:`var(--primary)`,fillOpacity:.3,dot:!1})]})})})()}),(0,$.jsxs)(`div`,{className:`controls`,children:[e===`normal`&&(0,$.jsxs)(`div`,{className:`slider-container`,children:[(0,$.jsxs)(`div`,{className:`slider-label`,children:[(0,$.jsx)(`span`,{children:`サンプルサイズ n`}),` `,(0,$.jsx)(`span`,{children:n})]}),(0,$.jsx)(`input`,{type:`range`,min:`1`,max:`50`,step:`1`,value:n,onChange:e=>r(parseInt(e.target.value))})]}),(e===`t`||e===`chi2`||e===`f`)&&(0,$.jsxs)(`div`,{className:`slider-container`,children:[(0,$.jsxs)(`div`,{className:`slider-label`,children:[(0,$.jsx)(`span`,{children:e===`f`?`分子の自由度 k₁`:e===`chi2`?`自由度 k`:`自由度`}),` `,(0,$.jsx)(`span`,{children:a})]}),(0,$.jsx)(`input`,{type:`range`,min:`1`,max:`50`,step:`1`,value:a,onChange:e=>o(parseInt(e.target.value)),"aria-label":e===`f`?`分子の自由度`:`自由度`})]}),e===`f`&&(0,$.jsxs)(`div`,{className:`slider-container`,children:[(0,$.jsxs)(`div`,{className:`slider-label`,children:[(0,$.jsx)(`span`,{children:`分母の自由度 k₂`}),` `,(0,$.jsx)(`span`,{children:u})]}),(0,$.jsx)(`input`,{type:`range`,min:`1`,max:`50`,step:`1`,value:u,onChange:e=>ee(parseInt(e.target.value)),"aria-label":`分母の自由度`})]}),e===`update`&&(0,$.jsxs)(`div`,{className:`slider-container`,children:[(0,$.jsxs)(`div`,{className:`slider-label`,children:[(0,$.jsx)(`span`,{children:`観測データ数 n`}),` `,(0,$.jsx)(`span`,{children:n})]}),(0,$.jsx)(`input`,{type:`range`,min:`1`,max:`50`,step:`1`,value:n,onChange:e=>r(parseInt(e.target.value))})]}),e===`overfit`&&(0,$.jsxs)(`div`,{className:`slider-container`,children:[(0,$.jsx)(`div`,{className:`slider-label`,children:(0,$.jsx)(`span`,{children:`モデルの複雑さ`})}),(0,$.jsx)(`div`,{className:`btn-group`,children:[1,2,5].map(e=>(0,$.jsx)(`button`,{className:`btn-sm ${te===e?`active`:``}`,onClick:()=>ne(e),children:e===1?`直線`:e===2?`曲線`:`複雑`},e))})]}),e===`pca`&&(0,$.jsxs)(`div`,{className:`slider-container`,children:[(0,$.jsxs)(`div`,{className:`slider-label`,children:[(0,$.jsx)(`span`,{children:`2変数の相関`}),` `,(0,$.jsx)(`span`,{children:re.toFixed(2)})]}),(0,$.jsx)(`input`,{type:`range`,min:`0`,max:`0.95`,step:`0.05`,value:re,onChange:e=>S(parseFloat(e.target.value))})]}),e===`outlier`&&(0,$.jsxs)(`div`,{className:`slider-container`,children:[(0,$.jsxs)(`div`,{className:`slider-label`,children:[(0,$.jsx)(`span`,{children:`2変数の相関（両群共通）`}),` `,(0,$.jsx)(`span`,{children:C.toFixed(2)})]}),(0,$.jsx)(`input`,{type:`range`,min:`-0.9`,max:`0.9`,step:`0.1`,value:C,onChange:e=>w(parseFloat(e.target.value))})]}),e===`mcmc`&&(0,$.jsxs)(`div`,{className:`slider-container`,children:[(0,$.jsxs)(`div`,{className:`slider-label`,children:[(0,$.jsx)(`span`,{children:`サンプル数`}),` `,(0,$.jsx)(`span`,{children:T})]}),(0,$.jsx)(`input`,{type:`range`,min:`20`,max:`1500`,step:`20`,value:T,onChange:e=>E(parseInt(e.target.value))})]}),e===`multico`&&(0,$.jsxs)(`div`,{className:`slider-container`,children:[(0,$.jsxs)(`div`,{className:`slider-label`,children:[(0,$.jsx)(`span`,{children:`説明変数間の相関`}),` `,(0,$.jsx)(`span`,{children:b.toFixed(2)})]}),(0,$.jsx)(`input`,{type:`range`,min:`0`,max:`0.99`,step:`0.01`,value:b,onChange:e=>x(parseFloat(e.target.value))})]})]})]})},Fr=.62;function Ir(e,t=!0){let n=(0,y.useRef)(null);return(0,y.useLayoutEffect)(()=>{let e=n.current;if(!e||!t)return;let r=!1,i=()=>{if(r)return;e.style.fontSize=``,e.classList.remove(`math-overflowing`);let t=e.clientWidth;if(!t){requestAnimationFrame(i);return}let n=e.querySelector(`.katex`),a=Math.max(n?n.scrollWidth:0,e.scrollWidth);if(a<=t+3)return;let o=Math.max(Fr,t/a);e.style.fontSize=`${(o*100).toFixed(1)}%`,Math.max(e.querySelector(`.katex`)?.scrollWidth??0,e.scrollWidth)>e.clientWidth+3&&e.classList.add(`math-overflowing`)};i(),requestAnimationFrame(i),typeof document<`u`&&document.fonts?.ready&&document.fonts.ready.then(i).catch(()=>{});let a=e.parentElement,o;return a&&typeof ResizeObserver<`u`&&(o=new ResizeObserver(i),o.observe(a)),()=>{r=!0,o?.disconnect()}},[e,t]),n}var Lr=({formula:e,block:t,wrap:n})=>{let r=(0,y.useMemo)(()=>{try{return o.renderToString(e,{displayMode:t,throwOnError:!1,output:`html`})}catch(t){return console.error(`KaTeX rendering error:`,t),e}},[e,t]),i=Ir(r,!n);return!t&&n?(0,$.jsx)(`span`,{className:`katex-wrap`,dangerouslySetInnerHTML:{__html:r}}):t?(0,$.jsx)(`div`,{className:`math-block-container`,style:{margin:`1rem 0`},children:(0,$.jsx)(`div`,{ref:i,className:`katex-display`,dangerouslySetInnerHTML:{__html:r}})}):(0,$.jsx)(`span`,{ref:i,className:`katex-inline`,dangerouslySetInnerHTML:{__html:r}})},Rr=({questions:e,onComplete:t,renderContent:r,showModuleLabel:a})=>{let[o,s]=(0,y.useState)(0),[c,l]=(0,y.useState)(null),[d,f]=(0,y.useState)(null),[p,m]=(0,y.useState)(0),h=e[o],g=e=>{if(c!==null)return;l(e);let t=e===h.correctAnswer;f(t),t&&m(e=>e+1)},_=()=>{o+1<e.length?(s(o+1),l(null),f(null)):t(p,e.length)};if(!h)return null;let v=h.options.every(e=>e.length<15);return(0,$.jsxs)(`div`,{className:`card`,style:{border:`1px solid var(--border)`},children:[(0,$.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`1rem`},children:[(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`h3`,{style:{margin:0,fontSize:`1.1rem`},children:`理解度チェック`}),a&&(0,$.jsx)(`span`,{style:{fontSize:`0.7rem`,color:`var(--text-muted)`,fontWeight:600},children:a})]}),(0,$.jsxs)(`span`,{style:{fontSize:`0.75rem`,color:`var(--text-muted)`},children:[`質問 `,o+1,` / `,e.length]})]}),(0,$.jsx)(`div`,{style:{marginBottom:`1.25rem`,fontSize:`1rem`,fontWeight:600,lineHeight:1.6},children:r(h.question)}),(0,$.jsx)(`div`,{className:u(`quiz-options`,v&&`compact`),children:h.options.map((e,t)=>(0,$.jsxs)(`button`,{className:`btn`,style:{background:c===t?t===h.correctAnswer?`#166534`:`#b91c1c`:`var(--card-bg)`,color:c===t?`white`:`var(--text)`,justifyContent:`space-between`,border:c===t?`none`:`1px solid var(--border)`,textAlign:`left`,padding:`0.75rem 1rem`,boxShadow:`none`,fontWeight:500,fontSize:`0.9rem`},onClick:()=>g(t),children:[(0,$.jsx)(`div`,{style:{flex:1},children:r(e)}),c===t&&(t===h.correctAnswer?(0,$.jsx)(lr,{size:18}):(0,$.jsx)(dr,{size:18}))]},`${o}-${t}`))}),(0,$.jsx)(n,{children:c!==null&&(0,$.jsxs)(i.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},style:{marginTop:`1.5rem`,padding:`1rem`,background:`var(--bg-warm)`,borderRadius:`0.5rem`,border:`1px solid var(--border)`},children:[(0,$.jsxs)(`p`,{style:{margin:0,fontSize:`0.85rem`,lineHeight:1.6},children:[(0,$.jsx)(`strong`,{style:{color:d?`#166534`:`#b91c1c`},children:d?`正解！`:`不正解...`}),(0,$.jsx)(`br`,{}),r(h.explanation)]}),(0,$.jsxs)(`button`,{className:`btn`,style:{marginTop:`1rem`,width:`auto`,padding:`0.5rem 1rem`},onClick:_,children:[o+1<e.length?`次の問題へ`:`セクションを完了する`,(0,$.jsx)(sr,{size:18})]})]})})]})},zr=({termId:e,children:t,onNavigate:r,renderMath:a})=>{let[o,s]=(0,y.useState)(!1),[c,l]=(0,y.useState)(e),u=Un[c],d=(0,y.useCallback)(e=>{s(!1),r&&setTimeout(()=>r(e),50)},[r]),f=(0,y.useCallback)(e=>{l(e)},[]);if(!u)return(0,$.jsx)($.Fragment,{children:t});let p={基礎:`#22c55e`,中級:`#eab308`,上級:`#ef4444`}[u.level],m=X.filter(e=>e.content.includes(`[[term:${c}]]`));return(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`span`,{onClick:t=>{t.stopPropagation(),l(e),s(!0)},className:`term-trigger`,style:{color:`var(--primary)`,textDecoration:`underline dotted`,cursor:`help`,fontWeight:600,display:`inline`},children:t}),(0,$.jsx)(n,{children:o&&(0,$.jsx)(`div`,{style:{position:`fixed`,inset:0,zIndex:1e3,display:`flex`,alignItems:`center`,justifyContent:`center`,padding:`1rem`,background:`rgba(0,0,0,0.5)`,backdropFilter:`blur(2px)`},onClick:()=>s(!1),children:(0,$.jsxs)(i.div,{initial:{scale:.95,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.95,opacity:0},className:`card`,style:{maxWidth:`500px`,width:`100%`,position:`relative`,borderTop:`4px solid ${p}`,maxHeight:`80vh`,overflowY:`auto`,marginBottom:0},onClick:e=>e.stopPropagation(),children:[(0,$.jsx)(`button`,{onClick:()=>s(!1),style:{position:`absolute`,right:`1rem`,top:`1rem`,background:`none`,border:`none`,color:`var(--text-muted)`,cursor:`pointer`},children:(0,$.jsx)(Tr,{size:20})}),(0,$.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`0.5rem`,marginBottom:`0.5rem`},children:[(0,$.jsx)(`h3`,{style:{margin:0,fontSize:`1.2rem`},children:u.term}),(0,$.jsx)(`span`,{style:{fontSize:`0.6rem`,padding:`0.1rem 0.4rem`,borderRadius:`4px`,background:`${p}22`,color:p,fontWeight:700},children:u.level})]}),(0,$.jsx)(`div`,{style:{margin:`1rem 0`,fontSize:`0.9rem`,lineHeight:`1.6`,color:`var(--text)`},children:a?a(u.explanation):u.explanation}),u.formula&&(0,$.jsx)(`div`,{style:{background:`var(--bg-warm)`,padding:`1rem`,borderRadius:`8px`,marginBottom:`1rem`,textAlign:`center`},children:(0,$.jsx)(Lr,{formula:u.formula,block:!0})}),u.relatedTerms&&u.relatedTerms.length>0&&(0,$.jsxs)(`div`,{style:{marginBottom:`1rem`},children:[(0,$.jsxs)(`p`,{style:{fontSize:`0.7rem`,color:`var(--text-muted)`,fontWeight:700,marginBottom:`0.4rem`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,$.jsx)(gr,{size:12}),` 関連用語：`]}),(0,$.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`0.4rem`},children:u.relatedTerms.map(e=>(0,$.jsx)(`button`,{onClick:()=>f(e),style:{background:`var(--bg-warm)`,border:`none`,borderRadius:`4px`,padding:`0.2rem 0.4rem`,fontSize:`0.75rem`,color:`var(--primary)`,cursor:`pointer`},children:Un[e]?.term||e},e))})]}),m.length>0&&r&&(0,$.jsxs)(`div`,{style:{borderTop:`1px dashed #e2e8f0`,paddingTop:`1rem`},children:[(0,$.jsx)(`p`,{style:{fontSize:`0.75rem`,color:`var(--text-muted)`,fontWeight:600,margin:`0 0 0.5rem`},children:`解説ページで詳しく学ぶ：`}),(0,$.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`0.4rem`},children:m.map(e=>(0,$.jsxs)(`button`,{className:`btn-link`,style:{justifyContent:`space-between`,padding:`0.5rem`},onClick:()=>d(e.id),children:[e.title,` `,(0,$.jsx)(rr,{size:14})]},e.id))})]})]})})})]})},Br={start:{id:`start`,text:`分析の目的は何ですか？`,options:[{label:`確率・事象の基礎を理解したい`,nextId:`probability`},{label:`平均値やグループ間の差を調べたい`,nextId:`mean`},{label:`情報の要約や予測モデルを作りたい`,nextId:`model`},{label:`時間の経過による変化を予測したい`,nextId:null,result:`3.2-timeseries`},{label:`知識をデータで更新（学習）させたい`,nextId:null,result:`3.1-bayes`}]},probability:{id:`probability`,text:`確率のどのテーマを学びたいですか？`,options:[{label:`確率の計算・独立・包除原理の基礎`,nextId:null,result:`1.1-probability`},{label:`ベイズの定理・全確率の定理`,nextId:null,result:`1.3-total-prob`}]},mean:{id:`mean`,text:`比較したいグループ（群）の数は？`,options:[{label:`1つ（またはサンプル数が非常に多い）`,nextId:`normalclt`},{label:`2つ（A/Bテストなど）`,nextId:null,result:`1.12-sampling`},{label:`3つ以上（複数の条件比較）`,nextId:null,result:`1.21-anova`},{label:`検定のP値・検出力・サンプルサイズを設計したい`,nextId:null,result:`1.18-inference`}]},normalclt:{id:`normalclt`,text:`何を学びたいですか？`,options:[{label:`正規分布の性質（PDF・歪度・尖度・MGF）`,nextId:null,result:`1.10-normal-dist`},{label:`大数の法則・中心極限定理・推定量の条件`,nextId:null,result:`1.11-lln-clt`},{label:`十分統計量・順序統計量`,nextId:null,result:`1.13-sufficient-stats`}]},model:{id:`model`,text:`どのようなアプローチを希望しますか？`,options:[{label:`要因から結果を予測したい（売上予測など）`,nextId:null,result:`2.1-regression`},{label:`たくさんの変数をギュッとまとめたい`,nextId:null,result:`2.2-pca`},{label:`データをグループに分類・判別したい`,nextId:null,result:`2.3-discriminant`},{label:`見えない共通因子を発見したい（アンケート分析など）`,nextId:null,result:`2.4-factor`}]}},Vr=({onSelect:e})=>{let[t,r]=(0,y.useState)(`start`),[a,o]=(0,y.useState)([]),s=(n,i)=>{i?e(i):n&&(o([...a,t]),r(n))},c=()=>{let e=a[a.length-1];e&&(r(e),o(a.slice(0,-1)))},l=Br[t];return(0,$.jsxs)(`div`,{className:`card`,style:{background:`var(--primary)`,color:`white`,border:`none`},children:[(0,$.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`0.5rem`,marginBottom:`1rem`},children:[(0,$.jsx)(yr,{size:20}),(0,$.jsx)(`h3`,{style:{margin:0},children:`目的から探す（逆引き診断）`})]}),(0,$.jsx)(n,{mode:`wait`,children:(0,$.jsxs)(i.div,{initial:{opacity:0,x:10},animate:{opacity:1,x:0},exit:{opacity:0,x:-10},children:[(0,$.jsx)(`p`,{style:{fontSize:`1.125rem`,fontWeight:600,marginBottom:`1.5rem`},children:l.text}),(0,$.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`0.75rem`},children:l.options.map((e,t)=>(0,$.jsxs)(`button`,{className:`btn`,style:{background:`rgba(255,255,255,0.2)`,justifyContent:`space-between`,textAlign:`left`,border:`1px solid rgba(255,255,255,0.3)`},onClick:()=>s(e.nextId,e.result),children:[(0,$.jsx)(`span`,{children:e.label}),(0,$.jsx)(rr,{size:16})]},t))})]},t)}),a.length>0&&(0,$.jsx)(`button`,{onClick:c,style:{marginTop:`1.5rem`,background:`none`,border:`none`,color:`rgba(255,255,255,0.7)`,fontSize:`0.875rem`,cursor:`pointer`,textDecoration:`underline`},children:`前の質問に戻る`}),(0,$.jsxs)(`div`,{style:{marginTop:`1.5rem`,paddingTop:`1rem`,borderTop:`1px solid rgba(255,255,255,0.1)`,fontSize:`0.75rem`,display:`flex`,gap:`0.5rem`,color:`rgba(255,255,255,0.8)`},children:[(0,$.jsx)(ur,{size:14}),(0,$.jsx)(`span`,{children:`知りたい内容を選ぶだけで、適切な学習コンテンツへ導きます。`})]})]})},Hr=({modules:e,activeId:t,activeTest:n,onSelect:r,onSelectTest:i,chapterNames:a,chapterColors:o})=>{let s=[...new Set(e.map(e=>e.chapter))].sort((e,t)=>e-t);return(0,$.jsxs)(`nav`,{className:`module-nav-rail`,"aria-label":`学習モジュール一覧`,children:[(0,$.jsx)(`div`,{className:`module-nav-rail-title`,children:`学習モジュール`}),s.map(s=>(0,$.jsxs)(`div`,{className:`module-nav-chapter`,children:[(0,$.jsxs)(`div`,{className:`module-nav-chapter-head`,children:[(0,$.jsx)(`span`,{className:`module-nav-dot`,style:{background:o[s]?.accent}}),`第`,s,`章 `,a[s]]}),(0,$.jsxs)(`ul`,{children:[e.filter(e=>e.chapter===s).map(e=>{let n=e.id===t;return(0,$.jsx)(`li`,{children:(0,$.jsx)(`button`,{className:`module-nav-link${n?` active`:``}`,style:n?{borderLeftColor:o[s]?.accent,color:o[s]?.accent}:void 0,onClick:()=>r(e.id),"aria-current":n?`true`:void 0,children:e.title})},e.id)}),i&&(0,$.jsx)(`li`,{children:(0,$.jsx)(`button`,{className:`module-nav-link module-nav-test${n===s?` active`:``}`,style:n===s?{borderLeftColor:o[s]?.accent,color:o[s]?.accent}:void 0,onClick:()=>i(s),"aria-current":n===s?`true`:void 0,children:`まとめテスト（10問）`})})]})]},s))]})},Ur=`2026年10月12日`,Wr={top:`https://www.toukei-kentei.jp/`,grade:`https://www.toukei-kentei.jp/grade/grade_pre-1`,apply:`https://www.toukei-kentei.jp/info/other_grades_apply/`,range2027:`https://www.toukei-kentei.jp/hubfs/files/20.grade/grade_range/grade1semi_hani_20270101.pdf`,range2018:`https://www.toukei-kentei.jp/hubfs/files/grade_range/grade1semi_hani_190628_2.pdf`},Gr=[{label:`実施方式`,value:`CBT方式（試験会場のパソコンで受験）`},{label:`出題形式`,value:`5肢選択問題と数値入力問題`},{label:`問題数と試験時間`,value:`25〜30問・90分（1問あたり3分ほど）`},{label:`合格基準`,value:`100点満点で60点以上`},{label:`受験料（税込）`,value:`一般 8,000円、学割 6,000円`},{label:`電卓`,value:`四則演算・百分率・平方根が計算できる一般電卓か事務用電卓を1台まで（関数電卓・プログラム電卓などは不可）`},{label:`再受験`,value:`同じ級は、前回の受験から7日（168時間）以上あければ受けられます`}],Kr=`90分で25〜30問を解くので、典型的な問題は考え込まずに解ける状態まで練習しておくと、難しい問題に時間を回せます。`,qr=[`出題範囲表は、確率と確率変数、種々の確率分布、統計的推測（推定・検定）、マルコフ連鎖と確率過程、回帰分析、分散分析と実験計画法、標本調査法、多変量解析、時系列解析、分割表、不完全データ、モデル選択、ベイズ法、シミュレーションなどの大項目でできています。範囲表は出題の頻度や配点を示していないので、このサイトでは分野ごとの重みづけをしていません。`,`2027年1月1日の受験からは、新しい範囲表に変わります。いちばん大きな変更は、「統計的因果推論」（因果ダイアグラム、バックドア基準など）が大項目として加わったことです。ほかにも、スルツキーの補題、バイアス・バリアンス分解、Mallows の Cp 規準、Box-Cox 変換などの用語が加わりました。このサイトでは、統計的因果推論を「3.7 統計的因果推論」に、そのほかの用語も該当するモジュールに解説を加えています。`],Jr=[`公式の目安は出ていません。代わりに、合格者が自分で書いた体験記8本の数字を並べます。`,`多くは200〜300時間です。統計検定2級の知識がある人で200時間前後、統計がほぼ初めての人は2級の範囲と合わせて300〜450時間かかっています。線形代数や微積分の学び直しが入ると、300〜400時間に増える例が目立ちます。`,`得点は61〜67点と、合格点（60点）すれすれの例が多いことにも注意してください。`],Yr=[{hours:`約140時間`,who:`証券アナリストの学習で2級程度の統計を学んでいた。微積分と線形代数を学び直して63点`,href:`https://natsuchiyo.com/blog/jssc-pre1-result`,source:`natsuchiyo.com`},{hours:`180〜200時間（約7か月）`,who:`統計の知識ゼロから。高校で数学Ⅲを学んでいた。2回目で合格`,href:`https://note.com/serene_harte9023/n/n92e9f5e86e0e`,source:`note`},{hours:`約200時間（約8か月）`,who:`2級取得済み、理系の大学出身。67点`,href:`https://qiita.com/badorisu0555/items/76a854ca27ce6da5235b`,source:`Qiita`},{hours:`200時間強（2.5〜3か月）`,who:`2級取得済み。1回目58点、2回目62点で合格`,href:`https://zenn.dev/naaao9999/articles/a9ea2baf245c06`,source:`Zenn`},{hours:`約200時間（約3か月）`,who:`期待値・分散も分からない状態から始め、先に2級（約100時間）に合格。63点`,href:`https://qiita.com/kakl_kakler_kaklest/items/ab00d4dfed92d03076a0`,source:`Qiita`},{hours:`約300時間（3級・2級を含めると約450時間）`,who:`同じ年に3級・2級に合格してから。大学で線形代数・微積分は履修していない`,href:`https://tansan3.com/toukeikentei_jyun1kyu-how-to-study/`,source:`tansan3.com`},{hours:`300〜400時間（約4か月）`,who:`2級取得済み。線形代数・微積分も学び直し、1回目50点、2回目61点`,href:`https://note.com/light_whale2482/n/n05908bc2088a`,source:`note`},{hours:`300〜400時間（約1年）`,who:`2級取得済み。うち200時間ほどは数学の復習など。3回目61点`,href:`https://zenn.dev/ziyuu/articles/e37641a5d5ede8`,source:`Zenn`}],Xr=[{title:`全体を見渡す`,body:`『統計学実践ワークブック』を一通り読み、どんな手法があって、どうつながっているかをつかみます。細かい式の導出は、この段階では後回しにします。`},{title:`理解を深める`,body:`各章の式の導出を、自分の手で追います。行列（逆行列・固有値）と微積分の基礎を固めておくと、推定と多変量解析が読みやすくなります。`},{title:`問題で定着させる`,body:`ワークブックの問題を、解き方に迷わなくなるまで繰り返します。そのあと公式問題集で、本番の問われ方と時間配分に慣れます。`}],Zr=[{title:`統計学実践ワークブック（日本統計学会編、学術図書出版社）`,tag:`公式`,desc:`統計検定準1級対応の公式認定テキストです。範囲に沿った例題と問題がそろっています。2026年8月に「統計的因果推論」の章を加えた増補版が出ています。`},{title:`統計検定準1級 公式問題集（実務教育出版）`,tag:`公式`,desc:`過去の出題を収めた公式の問題集です。本番の問われ方と時間配分の確認に使います。`},{title:`統計学入門（東京大学出版会）`,tag:`補助`,desc:`通称「赤本」。確率分布と推測の基礎を、ワークブックより丁寧に読みたいときに。`},{title:`入門はじめての多変量解析（東京図書）`,tag:`補助`,desc:`多変量解析の入門書です。`},{title:`道具としてのベイズ統計（日本実業出版社）`,tag:`補助`,desc:`ベイズ統計の入門書です。`}],Qr=[{name:`とけたろう`,type:`動画と学習サイト`,desc:`YouTube の動画と連動して統計学を学べるサイトです。`},{name:`Yuya Kawaguchi`,type:`動画講座`,desc:`『統計学実践ワークブック』の問題を1問ずつ解説する講座です。問題文は画面に出ないので、手元にワークブックが必要です。`},{name:`生成AI（ChatGPT など）`,type:`AI`,desc:`ワークブックの式変形を1行ずつ説明させると、行間を埋める助けになります。ただし誤りを含むことがあるので、答えはワークブックや公式問題集で確かめます。`}],$r=[{title:`時間配分`,body:`1問あたり3分ほどが目安です。手が止まった問題は後回しにして、解ける問題から確実に取ります。`},{title:`電卓`,body:`持ち込めるのは一般電卓か事務用電卓だけで、関数電卓は使えません。平方根やメモリ機能の操作に、本番で使う電卓で慣れておきます。`},{title:`範囲の広さ`,body:`出題範囲表の大項目すべてに一度は目を通し、苦手な分野ほど手厚く進めます。範囲表は配点を示していないので、特定の分野を捨てるのは危険です。`},{title:`数学の基礎`,body:`行列の積・逆行列・固有値は、回帰分析や主成分分析を理解する土台になります。`}],ei=`var(--text-muted)`,ti=({title:e,children:t})=>(0,$.jsxs)(`div`,{className:`card`,style:{marginBottom:`1.5rem`},children:[(0,$.jsx)(`h3`,{style:{margin:`0 0 1rem`,fontSize:`1rem`,color:`var(--primary)`,borderBottom:`1px solid var(--border)`,paddingBottom:`0.5rem`},children:e}),t]}),ni=(e,t)=>(0,$.jsx)(`a`,{href:e,target:`_blank`,rel:`noopener noreferrer`,style:{color:`var(--primary)`},children:t}),ri=()=>(0,$.jsxs)(`div`,{children:[(0,$.jsxs)(`div`,{style:{marginBottom:`1.5rem`},children:[(0,$.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`0.5rem`,marginBottom:`0.4rem`},children:[(0,$.jsx)(Cr,{size:20,color:`var(--primary)`}),(0,$.jsx)(`h2`,{style:{margin:0,fontSize:`1.1rem`},children:`試験ガイド`})]}),(0,$.jsx)(`p`,{style:{margin:0,fontSize:`0.85rem`,color:ei},children:`統計検定準1級の試験の概要、出題範囲、学習の進め方をまとめています。`})]}),(0,$.jsxs)(ti,{title:`試験の概要`,children:[Gr.map(e=>(0,$.jsxs)(`div`,{style:{padding:`0.5rem 0`,borderBottom:`1px solid var(--border)`},children:[(0,$.jsx)(`div`,{style:{fontSize:`0.75rem`,color:ei},children:e.label}),(0,$.jsx)(`div`,{style:{fontSize:`0.9rem`,fontWeight:600,lineHeight:1.6},children:e.value})]},e.label)),(0,$.jsxs)(`div`,{style:{marginTop:`0.75rem`,padding:`0.6rem 0.8rem`,background:`var(--bg-warm)`,borderRadius:8,fontSize:`0.82rem`,lineHeight:1.6},children:[(0,$.jsx)(hr,{size:13,style:{marginRight:4,verticalAlign:`middle`}}),Kr]}),(0,$.jsxs)(`div`,{style:{marginTop:`0.6rem`,fontSize:`0.75rem`,color:ei,lineHeight:1.6},children:[`※ `,Ur,`に`,ni(Wr.apply,`統計検定公式サイトの試験要項`),`で確認した内容です。受験料や試験形式は変わることがあるので、申し込み前に公式サイトで確かめてください。`]})]}),(0,$.jsxs)(ti,{title:`出題範囲`,children:[qr.map((e,t)=>(0,$.jsx)(`p`,{style:{fontSize:`0.85rem`,lineHeight:1.7,margin:`0 0 0.75rem`},children:e},t)),(0,$.jsxs)(`p`,{style:{fontSize:`0.8rem`,lineHeight:1.7,margin:0,color:ei},children:[`範囲表：`,ni(Wr.range2027,`2027年1月1日からの範囲表（PDF）`),`、`,ni(Wr.range2018,`2026年12月31日までの範囲表（PDF）`),`（どちらも`,ni(Wr.grade,`公式サイトの準1級のページ`),`から）`]})]}),(0,$.jsxs)(ti,{title:`学習時間の目安（合格者の体験記から）`,children:[Jr.map((e,t)=>(0,$.jsx)(`p`,{style:{fontSize:`0.85rem`,lineHeight:1.7,margin:`0 0 0.75rem`},children:e},t)),Yr.map(e=>(0,$.jsxs)(`div`,{style:{padding:`0.5rem 0`,borderTop:`1px solid var(--border)`},children:[(0,$.jsx)(`div`,{style:{fontSize:`0.9rem`,fontWeight:700},children:e.hours}),(0,$.jsxs)(`div`,{style:{fontSize:`0.8rem`,color:ei,lineHeight:1.6},children:[e.who,`（`,ni(e.href,e.source),`）`]})]},e.href))]}),(0,$.jsx)(ti,{title:`学習の進め方`,children:Xr.map((e,t)=>(0,$.jsxs)(`div`,{style:{display:`flex`,gap:`1rem`,marginBottom:`1rem`},children:[(0,$.jsx)(`div`,{style:{flexShrink:0,width:32,height:32,borderRadius:`50%`,background:`var(--primary)`,color:`white`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:`0.8rem`,fontWeight:700},children:t+1}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`div`,{style:{fontWeight:700,fontSize:`0.9rem`,marginBottom:`0.25rem`},children:e.title}),(0,$.jsx)(`div`,{style:{fontSize:`0.85rem`,lineHeight:1.7},children:e.body})]})]},e.title))}),(0,$.jsx)(ti,{title:`本`,children:Zr.map(e=>(0,$.jsxs)(`div`,{style:{padding:`0.6rem 0`,borderBottom:`1px solid var(--border)`},children:[(0,$.jsxs)(`div`,{style:{display:`flex`,alignItems:`baseline`,gap:`0.5rem`,marginBottom:`0.25rem`},children:[(0,$.jsx)(`span`,{className:`stat-badge`,style:{flexShrink:0,background:e.tag===`公式`?`var(--primary)`:`var(--bg-warm)`,color:e.tag===`公式`?`white`:`var(--text)`,fontSize:`0.65rem`},children:e.tag}),(0,$.jsx)(`span`,{style:{fontSize:`0.88rem`,fontWeight:700},children:e.title})]}),(0,$.jsx)(`div`,{style:{fontSize:`0.82rem`,color:ei,lineHeight:1.6},children:e.desc})]},e.title))}),(0,$.jsx)(ti,{title:`無料で使える学習の助け`,children:Qr.map(e=>(0,$.jsxs)(`div`,{style:{padding:`0.6rem 0`,borderBottom:`1px solid var(--border)`},children:[(0,$.jsxs)(`div`,{style:{fontSize:`0.88rem`,fontWeight:700},children:[e.name,(0,$.jsxs)(`span`,{style:{fontWeight:400,fontSize:`0.75rem`,color:ei},children:[`（`,e.type,`）`]})]}),(0,$.jsx)(`div`,{style:{fontSize:`0.82rem`,color:ei,lineHeight:1.6,marginTop:`0.15rem`},children:e.desc})]},e.name))}),(0,$.jsxs)(ti,{title:`本番に向けて`,children:[$r.map(e=>(0,$.jsxs)(`div`,{style:{padding:`0.5rem 0`,borderBottom:`1px solid var(--border)`},children:[(0,$.jsx)(`div`,{style:{fontSize:`0.88rem`,fontWeight:700,marginBottom:`0.15rem`},children:e.title}),(0,$.jsx)(`div`,{style:{fontSize:`0.85rem`,lineHeight:1.7},children:e.body})]},e.title)),(0,$.jsxs)(`div`,{style:{marginTop:`0.75rem`,padding:`0.6rem 0.8rem`,background:`var(--bg-warm)`,borderRadius:8,fontSize:`0.82rem`,display:`flex`,gap:`0.5rem`,lineHeight:1.6},children:[(0,$.jsx)(lr,{size:14,style:{flexShrink:0,marginTop:3}}),(0,$.jsx)(`span`,{children:`このサイトのモジュールは出題範囲に沿って並んでいます。各モジュールのクイズと章のまとめテストで、理解を確かめながら進めてください。`})]})]})]}),ii=({title:e,draw:t,renderContent:r,renderInline:a,onOpenModule:o,onFinish:s,best:c,accent:l})=>{let[u,d]=(0,y.useState)(t),[f,p]=(0,y.useState)(0),[m,h]=(0,y.useState)(null),[g,_]=(0,y.useState)([]),[v,ee]=(0,y.useState)(!1),te=(0,y.useRef)(null),[ne,b]=(0,y.useState)(0);(0,y.useEffect)(()=>{if(ne===0)return;let e=te.current;if(!e)return;let t=e.getBoundingClientRect().top;(t<0||t>window.innerHeight*.4)&&window.scrollTo({top:window.scrollY+t-12,behavior:`instant`})},[ne]);let x=()=>b(e=>e+1),re=()=>{d(t()),p(0),h(null),_([]),ee(!1),x()},S=()=>{let e=u[f],t=[...g,{moduleId:e.moduleId,moduleTitle:e.moduleTitle,correct:m===e.q.correctAnswer}];_(t),f+1<u.length?(p(f+1),h(null)):(ee(!0),s?.(t.filter(e=>e.correct).length,t.length)),x()};if(v){let t=g.filter(e=>e.correct).length,n={};g.forEach(e=>{n[e.moduleId]||(n[e.moduleId]={title:e.moduleTitle,correct:0,total:0}),n[e.moduleId].total++,e.correct&&n[e.moduleId].correct++});let r=Object.entries(n).filter(([,e])=>e.correct<e.total);return(0,$.jsxs)(`div`,{ref:te,children:[(0,$.jsxs)(`div`,{className:`card`,style:{textAlign:`center`},children:[(0,$.jsxs)(`div`,{style:{fontSize:`2.5rem`,fontWeight:900,color:l??`var(--primary)`},children:[t,` `,(0,$.jsxs)(`span`,{style:{fontSize:`1rem`,color:`var(--text-muted)`},children:[`/ `,g.length,` 問正解`]})]}),(0,$.jsx)(`p`,{style:{color:`var(--text-muted)`,fontSize:`0.85rem`,margin:`0.25rem 0 0`},children:e}),c&&(0,$.jsxs)(`p`,{style:{color:`var(--text-muted)`,fontSize:`0.8rem`,margin:`0.25rem 0 0`},children:[`これまでの最高：`,c.score,`/`,c.total]})]}),(0,$.jsxs)(`div`,{className:`card`,children:[(0,$.jsx)(`h3`,{style:{margin:`0 0 1rem`,fontSize:`1rem`},children:`モジュール別の結果`}),Object.entries(n).map(([e,t])=>(0,$.jsxs)(`div`,{className:`rq-result-row`,children:[(0,$.jsx)(`span`,{className:`rq-result-dot ${t.correct===t.total?`ok`:`ng`}`}),(0,$.jsx)(`span`,{style:{flex:1,fontSize:`0.85rem`},children:a(t.title)}),(0,$.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:t.correct===t.total?`#16a34a`:`#dc2626`,fontWeight:700},children:[t.correct,`/`,t.total]})]},e)),r.length>0&&(0,$.jsxs)(`div`,{style:{marginTop:`1.25rem`},children:[(0,$.jsx)(`p`,{style:{fontSize:`0.8rem`,fontWeight:700,color:`var(--text-muted)`,margin:`0 0 0.5rem`},children:`間違えた問題のモジュールを読み直す：`}),(0,$.jsx)(`div`,{className:`links-row`,children:r.map(([e,t])=>(0,$.jsxs)(`button`,{className:`btn-link`,onClick:()=>o(e),children:[a(t.title),` `,(0,$.jsx)(rr,{size:12})]},e))})]})]}),(0,$.jsxs)(`button`,{className:`btn`,onClick:re,style:{marginTop:`0.5rem`},children:[(0,$.jsx)(xr,{size:16}),` 別の問題でもう一度`]})]})}let C=u[f];if(!C)return null;let w=m!==null&&m===C.q.correctAnswer;return(0,$.jsxs)(`div`,{ref:te,className:`card`,style:{border:`1px solid var(--border)`},children:[(0,$.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`1rem`,gap:`0.5rem`},children:[(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`h3`,{style:{margin:0,fontSize:`1.1rem`},children:e}),(0,$.jsx)(`span`,{style:{fontSize:`0.7rem`,color:`var(--text-muted)`,fontWeight:600},children:a(C.moduleTitle)})]}),(0,$.jsxs)(`span`,{style:{fontSize:`0.75rem`,color:`var(--text-muted)`,flex:`none`},children:[f+1,` / `,u.length]})]}),(0,$.jsx)(`div`,{style:{marginBottom:`1.25rem`,fontSize:`1rem`,fontWeight:600,lineHeight:1.6},children:r(C.q.question)}),(0,$.jsx)(`div`,{className:`quiz-options`,children:C.q.options.map((e,t)=>(0,$.jsxs)(`button`,{className:`btn`,style:{background:m===t?t===C.q.correctAnswer?`#166534`:`#b91c1c`:`var(--card-bg)`,color:m===t?`white`:`var(--text)`,justifyContent:`space-between`,border:m===t?`none`:`1px solid var(--border)`,textAlign:`left`,padding:`0.75rem 1rem`,boxShadow:`none`,fontWeight:500,fontSize:`0.9rem`},onClick:()=>{m===null&&h(t)},children:[(0,$.jsx)(`div`,{style:{flex:1},children:r(e)}),m===t&&(t===C.q.correctAnswer?(0,$.jsx)(lr,{size:18}):(0,$.jsx)(dr,{size:18}))]},`mq-${f}-${t}`))}),(0,$.jsx)(n,{children:m!==null&&(0,$.jsxs)(i.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},style:{marginTop:`1.5rem`,padding:`1rem`,background:`var(--bg-warm)`,borderRadius:`0.5rem`,border:`1px solid var(--border)`},children:[(0,$.jsxs)(`div`,{style:{margin:0,fontSize:`0.85rem`,lineHeight:1.6},children:[(0,$.jsx)(`strong`,{style:{color:w?`#166534`:`#b91c1c`},children:w?`正解！`:`不正解...`}),(0,$.jsx)(`br`,{}),r(C.q.explanation)]}),(0,$.jsxs)(`button`,{className:`btn`,style:{marginTop:`1rem`,width:`auto`,padding:`0.5rem 1rem`},onClick:S,children:[f+1<u.length?`次の問題へ`:`結果を見る`,` `,(0,$.jsx)(rr,{size:16})]})]})})]})};function ai(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}var oi=[{title:`1. 確率分布の選び方`,lead:`「どんな現象か」から、当てはめる確率分布を選びます。`,head:[`状況`,`使う分布`],rows:[[`n 回の独立な試行での成功回数`,`二項分布`,`1.6-binomial`],[`有限個の中から戻さずに取り出したときの当たりの数`,`超幾何分布`,`1.6-binomial`],[`一定の時間・範囲に起きる稀な出来事の件数`,`ポアソン分布`,`1.7-poisson`],[`初めて成功するまでの試行回数`,`幾何分布`,`1.7b-geometric-multinomial`],[`r 回成功するまでの試行回数`,`負の二項分布`,`1.7b-geometric-multinomial`],[`結果が3種類以上あるときの、それぞれの回数`,`多項分布`,`1.7b-geometric-multinomial`],[`出来事が起きるまでの待ち時間`,`指数分布`,`1.8-continuous`],[`待ち時間をいくつか足したもの`,`ガンマ分布`,`1.8-continuous`],[`0から1の間の割合（成功確率の事前分布など）`,`ベータ分布`,`1.8b-ratio-lognormal-cauchy`],[`正の値で、右に裾が長い量（所得など）`,`対数正規分布`,`1.8b-ratio-lognormal-cauchy`],[`多数の独立な要因が足し合わさった量`,`正規分布`,`1.10-normal-dist`]]},{title:`2. 統計量が従う分布`,lead:`推定・検定で使う統計量が、どの分布に従うかの早見表です。`,head:[`統計量`,`従う分布`],rows:[[`母分散が分かっているときの標本平均（標準化したもの）`,`標準正規分布（z）`,`1.12-sampling`],[`母分散が分からないときの標本平均（標準化したもの）`,`t 分布`,`1.12-sampling`],[`標本分散、適合度・独立性の検定の統計量`,`χ² 分布`,`1.12-sampling`],[`2つの標本分散の比、分散分析の統計量`,`F 分布`,`1.12-sampling`]]},{title:`3. 検定の選び方`,lead:`「何を確かめたいか」から検定を選びます。`,head:[`確かめたいこと`,`使う検定`],rows:[[`1群の平均が基準値と違うか（分散は未知）`,`1標本 t 検定`,`1.20-testing-applied`],[`独立な2群の平均の差`,`2標本 t 検定`,`1.20-testing-applied`],[`対応のある2群の差（同じ対象の前後など）`,`対応のある t 検定`,`1.20-testing-applied`],[`3群以上の平均の差`,`分散分析（ANOVA）`,`1.21-anova`],[`正規分布を仮定できない2群の比較`,`ウィルコクソン順位和検定`,`1.20-testing-applied`],[`正規分布を仮定できない3群以上の比較`,`クラスカル・ウォリス検定`,`1.20-testing-applied`],[`2つの量的変数に相関があるか`,`母相関係数の検定`,`1.20-testing-applied`],[`観測度数が理論の分布に合うか`,`適合度検定（χ²）`,`1.20-testing-applied`],[`2つのカテゴリ変数が独立か`,`独立性の検定（χ²）`,`3.4-contingency`],[`2×2 の表で、度数が小さいとき`,`フィッシャーの正確検定`,`3.4-contingency`]]},{title:`4. 区間推定の選び方`,lead:`値そのものではなく、「どの範囲にありそうか」を示したいときです。`,head:[`知りたい範囲`,`使う方法`],rows:[[`母平均・母比率・母分散`,`1標本の信頼区間`,`1.16-ci`],[`2群の平均の差・比率の差・分散の比`,`2標本の信頼区間`,`1.17-ci-advanced`]]},{title:`5. 回帰と多変量解析の選び方`,lead:`「何をしたいか」から手法を選びます。`,head:[`したいこと`,`使う手法`],rows:[[`量的な結果を、複数の変数から予測する`,`重回帰分析`,`2.1-regression`],[`2値（合否・有無など）の結果を予測する`,`ロジスティック回帰`,`2.6-glm`],[`件数を、複数の変数から予測する`,`ポアソン回帰`,`2.6-glm`],[`どの変数を使うモデルがよいかを選ぶ`,`AIC・BIC・クロスバリデーション`,`1.23-model-selection`],[`多数の変数を少数の軸に要約する`,`主成分分析`,`2.2-pca`],[`観測変数の背後にある潜在因子を探る`,`因子分析`,`2.4-factor`],[`2組の変数群どうしの関係を調べる`,`正準相関分析`,`2.7-multivariate`],[`ラベルなしで、似たものどうしをグループに分ける`,`クラスター分析`,`2.5-clustering`],[`既知のグループのどれに入るかを分類する`,`判別分析`,`2.3-discriminant`]]},{title:`6. 特殊な形のデータ`,lead:`データの形そのものに合わせて手法を選ぶ場合です。`,head:[`データの形`,`使う手法`],rows:[[`「イベントが起きるまでの時間」で、途中で観察が終わった人がいる`,`カプラン・マイヤー法、Cox 比例ハザードモデル`,`3.5-survival`],[`時間の順に並んだデータの予測`,`ARIMA モデル`,`3.2-timeseries`],[`一部の値が欠けているデータでの推定`,`EM アルゴリズム`,`3.6-simulation`],[`観察データから、原因の効果（因果効果）を求めたい`,`因果グラフ（DAG）・バックドア基準`,`3.7-causal`]]}];function si(e){let t=e=>`<th style="text-align:left;padding:8px 10px;background:#eff6ff;border:1px solid #bfdbfe;font-size:0.9rem;color:#1e3a8a">${e}</th>`,n=(e,t)=>`<td style="padding:8px 10px;border:1px solid #e5e7eb;font-size:0.9rem;color:#444;vertical-align:top${t?`;width:`+t:``}">${e}</td>`,r=(t,n)=>`<a href="${e}/${t}/" style="color:#2563eb;text-decoration:underline;text-underline-offset:2px">${n}</a>`;return`<div style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:860px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#1e3a8a;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div><article id="static-fallback" style="font-family:sans-serif;line-height:1.7;max-width:860px;margin:0 auto;padding:24px 16px">
  <nav style="margin-bottom:16px"><a href="${e}/" style="color:#2563eb;text-decoration:none">← ホームへ戻る</a></nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:20px">検定・分布の使い分けガイド</h1>
  <p style="color:#555;margin-bottom:8px">「このデータ、この問いには、どの分布・検定・手法を使えばいいのか」を、状況から逆引きできる早見表です。</p>
  <p style="color:#555;margin-bottom:24px">右の列の手法名を押すと、それを詳しく学べるモジュールに移ります。</p>
  ${oi.map(e=>`
  <h2 style="font-size:1.2rem;font-weight:700;margin:24px 0 8px">${e.title}</h2>
  <p style="color:#444;margin-bottom:4px">${e.lead}</p>
  <table style="border-collapse:collapse;width:100%;margin:8px 0 20px"><thead><tr>${t(e.head[0])}${t(e.head[1])}</tr></thead><tbody>
  ${e.rows.map(([e,t,i])=>`<tr>${n(e,`55%`)}${n(r(i,t))}</tr>`).join(`
  `)}
  </tbody></table>`).join(`
`)}
  <p style="margin-top:8px;font-size:0.85rem;color:#888">※ 早見表は典型的な対応を示すものです。実際には、前提条件（独立性・等分散・正規性など）を満たしているかの確認が必要です。</p>
  <p style="margin-top:16px"><a href="${e}/" style="color:#2563eb">← ホームへ戻る</a></p>
</article>`}var ci=`stats-pre1-progress`,li=`stats-pre1-theme`;function ui(){try{let e=localStorage.getItem(li);return e===`dark`||e===`light`?e:window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`}catch{return`light`}}function di(e){try{localStorage.setItem(li,e)}catch{}}function fi(){try{return JSON.parse(localStorage.getItem(ci)||`{}`)}catch{return{}}}function pi(e){localStorage.setItem(ci,JSON.stringify(e))}var mi=`stats-pre1-chapter-tests-v3`,hi=10,gi=20;function _i(){try{return JSON.parse(localStorage.getItem(mi)||`{}`)}catch{return{}}}function vi(e){try{localStorage.setItem(mi,JSON.stringify(e))}catch{}}function yi(e){let t=X.filter(t=>t.chapter===e),n=(e,t)=>({q:t,moduleId:e.id,moduleTitle:e.title}),r=ai(t).slice(0,hi).map(e=>n(e,e.quiz[Math.floor(Math.random()*e.quiz.length)])),i=new Set(r.map(e=>e.q)),a=ai(t.flatMap(e=>e.quiz.filter(e=>!i.has(e)).map(t=>n(e,t)))).slice(0,Math.max(0,hi-r.length));return ai([...r,...a])}function bi(){return ai(X).slice(0,gi).map(e=>({q:e.quiz[Math.floor(Math.random()*e.quiz.length)],moduleId:e.id,moduleTitle:e.title}))}function xi(e){let t=[],n=[],r=null;for(let i of e.split(`
`)){let e=i.trim();!r&&e.startsWith(`🔍 `)?(n.length&&t.push({aside:!1,body:n.join(`
`)}),n=[],r={title:e.slice(3).replace(/\*\*/g,``).trim(),lines:[]}):r&&e===`🔍/`?(t.push({aside:!0,title:r.title,body:r.lines.join(`
`)}),r=null):r?r.lines.push(i):n.push(i)}return r&&t.push({aside:!0,title:r.title,body:r.lines.join(`
`)}),n.length&&t.push({aside:!1,body:n.join(`
`)}),t}function Si(){let[e,t]=(0,y.useState)(null),[r,a]=(0,y.useState)(`dashboard`),[o,s]=(0,y.useState)(``),[c,l]=(0,y.useState)(!1),[u,d]=(0,y.useState)(fi),[f,p]=(0,y.useState)(ui);(0,y.useEffect)(()=>{document.documentElement.setAttribute(`data-theme`,f),di(f)},[f]);let m=(0,y.useCallback)(()=>p(e=>e===`light`?`dark`:`light`),[]),[h,g]=(0,y.useState)(0),[_,v]=(0,y.useState)(null),[ee,te]=(0,y.useState)(_i),ne=(0,y.useCallback)((e,t,n)=>{let r=_i(),i=r[e];if(i&&i.score/i.total>=t/n)return;let a={...r,[e]:{score:t,total:n,completedAt:new Date().toLocaleDateString(`ja-JP`)}};vi(a),te(a)},[]),b=(0,y.useCallback)(e=>{let n=window.location.pathname.startsWith(`/stats-pre1/`)?`/stats-pre1`:``,r=e?`${n}/${e}/`:`${n}/`;window.history.pushState(null,``,r),e?(t(e),a(`dashboard`)):(t(null),a(`dashboard`)),l(!1),window.scrollTo({top:0,behavior:`instant`})},[]),x=(0,y.useCallback)(e=>{t(null),a(e);let n=window.location.pathname.startsWith(`/stats-pre1/`)?`/stats-pre1`:``,r=e===`dashboard`?`${n}/`:`${n}/${e}/`;window.history.pushState(null,``,r),window.scrollTo({top:0,behavior:`instant`})},[]),re=(0,y.useCallback)(()=>{g(e=>e+1),x(`randomquiz`)},[x]),S=(0,y.useCallback)(e=>{t(null),v(e),a(`chaptertest`),g(e=>e+1);let n=window.location.pathname.startsWith(`/stats-pre1/`)?`/stats-pre1`:``;window.history.pushState(null,``,`${n}/chapter-${e}-test/`),document.title=`第${e}章のまとめテスト（${Hn[e]}） | 統計検定 準1級`,window.scrollTo({top:0,behavior:`instant`})},[]),C=(0,y.useCallback)((e,t,n)=>{l(!0);let r={score:t,total:n,completedAt:new Date().toLocaleDateString(`ja-JP`)},i={...fi(),[e]:r};pi(i),d(i)},[]);(0,y.useEffect)(()=>{let e=()=>{let e=window.location.pathname.split(`/`).filter(Boolean),n=e[e.length-1],r=[`glossary`,`cheatsheet`,`privacy`,`about`,`guide`,`usecase`,`randomquiz`].includes(n||``),i=(n||``).match(/^chapter-(\d+)-test$/);if(i&&Hn[Number(i[1])]){let e=Number(i[1]);t(null),v(e),a(`chaptertest`),document.title=`第${e}章のまとめテスト（${Hn[e]}） | 統計検定 準1級`}else if(r)a(n),t(null),n===`privacy`?document.title=`プライバシーポリシー | 統計検定 準1級 学習リファレンス`:n===`about`?document.title=`サイトについて | 統計検定 準1級 学習リファレンス`:n===`guide`?document.title=`試験ガイド | 統計検定 準1級 学習リファレンス`:n===`usecase`?document.title=`検定・分布の使い分けガイド | 統計検定 準1級 学習リファレンス`:n===`randomquiz`&&(document.title=`全範囲クイズ | 統計検定 準1級 学習リファレンス`);else if(n&&n!==`stats-pre1`){let e=X.find(e=>e.id===n);e?(t(e.id),a(`dashboard`),document.title=`${e.title} | 統計検定 準1級`):(t(null),a(`dashboard`))}else t(null),a(`dashboard`),document.title=`統計検定 準1級 学習リファレンス`};return e(),window.addEventListener(`popstate`,e),()=>window.removeEventListener(`popstate`,e)},[]);let w=(0,y.useCallback)(e=>{function t(e){return(0,$.jsx)($.Fragment,{children:e.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$|\*\*[\s\S]*?\*\*|\[\[term:.*?\]\][\s\S]*?\[\[\/term\]\]|\[\[translate:.*?\]\][\s\S]*?\[\[\/translate\]\]|\[\[darts\]\]|\[\[practical:.*?\]\][\s\S]*?\[\[\/practical\]\]|\[\[conjugate\]\]|\[\[hierarchy\]\]|\[\[venn-inclusion\]\]|\[\[venn-conditional\]\]|\[\[total-probability\]\]|\[\[ci-coverage\]\]|\[\[cov-quadrants\]\]|\[\[cdf-pdf\]\]|\[\[f-[a-z0-9-]+\]\]|\[\[resid-steps\]\]|\[\[power-curve\]\]|\[\[markov-chain\]\]|\[\[logistic-sigmoid\]\]|\[\[interactive:.*?\]\]|\[\[regularization-card\]\]|\[\[pvalue-table\]\]|\[\[anova-table\]\]|\[\[type-error-table\]\]|\[\[confusion-matrix\]\]|\[\[pca-vs-fa-table\]\]|\[\[conjugate-table\]\]|\[[^\]\n]+\]\([^)\n]+\))/g).map((e,n)=>{if(!e)return null;let r=`inline-${n}`;if(e.startsWith(`$$`)&&e.endsWith(`$$`))return(0,$.jsx)(Lr,{formula:e.slice(2,-2),block:!0},r);if(e.startsWith(`$`)&&e.endsWith(`$`))return(0,$.jsx)(Lr,{formula:e.slice(1,-1),wrap:!0},r);if(e.startsWith(`**`)&&e.endsWith(`**`))return(0,$.jsx)(`strong`,{children:t(e.slice(2,-2))},r);{let n=e.match(/^\[([^\]\n]+)\]\(([^)\n]+)\)$/);if(n){let[,e,i]=n;return(0,$.jsx)(`a`,{href:i,.../^https?:\/\//.test(i)?{target:`_blank`,rel:`noopener noreferrer`}:{},children:t(e)},r)}}if(e.startsWith(`[[term:`)){let n=e.match(/\[\[term:(.*?)\]\]/),i=e.match(/\]\]([\s\S]*?)\[\[\/term\]\]/);if(n&&i)return(0,$.jsx)(zr,{termId:n[1],onNavigate:b,renderMath:t,children:i[1]},r)}if(e.startsWith(`[[translate:`)){let n=e.match(/\[\[translate:(.*?)\]\]/),i=e.match(/\]\]([\s\S]*?)\[\[\/translate\]\]/);if(n&&i)return(0,$.jsxs)(`span`,{className:`formula-wrapper`,children:[t(i[1]),(0,$.jsx)(`span`,{className:`formula-translation`,children:n[1]})]},r)}if(e===`[[darts]]`)return(0,$.jsxs)(`div`,{className:`darts-container`,children:[(0,$.jsxs)(`div`,{className:`dart-target`,children:[(0,$.jsx)(Cr,{size:32,color:`#22c55e`,className:`target-svg`}),(0,$.jsx)(`div`,{className:`dart-label`,children:`不偏性あり`}),(0,$.jsx)(`div`,{className:`dart-desc`,children:`中心が真値を射抜いている`})]}),(0,$.jsxs)(`div`,{className:`dart-target`,children:[(0,$.jsx)(Cr,{size:32,color:`#3b82f6`,className:`target-svg`}),(0,$.jsx)(`div`,{className:`dart-label`,children:`一致性あり`}),(0,$.jsx)(`div`,{className:`dart-desc`,children:`n増で一点に集中する`})]})]},r);if(e===`[[conjugate]]`)return(0,$.jsxs)(`div`,{className:`conjugate-card`,children:[(0,$.jsxs)(`div`,{className:`pair-row`,children:[(0,$.jsxs)(`div`,{className:`dist-box`,children:[(0,$.jsx)(`strong`,{children:`二項分布`}),(0,$.jsx)(`br`,{}),(0,$.jsx)(`small`,{children:`成功確率 p`})]}),(0,$.jsxs)(`div`,{className:`update-arrow`,children:[(0,$.jsx)(rr,{size:16}),(0,$.jsx)(`span`,{children:`共役`})]}),(0,$.jsxs)(`div`,{className:`dist-box`,children:[(0,$.jsx)(`strong`,{children:`ベータ分布`}),(0,$.jsx)(`br`,{}),(0,$.jsx)(`small`,{children:`形状 α, β`})]})]}),(0,$.jsxs)(`div`,{className:`update-arrow`,style:{margin:`8px 0`},children:[(0,$.jsx)(nr,{size:16}),(0,$.jsx)(`span`,{children:`更新`})]}),(0,$.jsx)(`div`,{style:{textAlign:`center`,fontSize:`0.85rem`,color:`var(--primary)`,fontWeight:800},children:`α' = α + 成功数 , β' = β + 失敗数`})]},r);if(e===`[[hierarchy]]`)return(0,$.jsx)(`div`,{className:`matryoshka-container`,children:(0,$.jsxs)(`div`,{className:`shell shell-outer`,children:[(0,$.jsx)(`span`,{className:`shell-label`,children:`集団の差 (学校)`}),(0,$.jsxs)(`div`,{className:`shell shell-mid`,children:[(0,$.jsx)(`span`,{className:`shell-label`,children:`個人の差 (クラス)`}),(0,$.jsx)(`div`,{className:`shell shell-inner`,children:`データ`})]})]})},r);if(e===`[[venn-inclusion]]`)return(0,$.jsxs)(`figure`,{className:`venn-figure`,children:[(0,$.jsxs)(`svg`,{viewBox:`0 0 340 200`,role:`img`,"aria-label":`包除原理のベン図：A と B の重なりを一度だけ引く`,className:`venn-svg`,children:[(0,$.jsx)(`circle`,{cx:`132`,cy:`92`,r:`78`,fill:`#4338ca`,fillOpacity:.22,stroke:`#4338ca`,strokeWidth:1.5}),(0,$.jsx)(`circle`,{cx:`208`,cy:`92`,r:`78`,fill:`#d97706`,fillOpacity:.22,stroke:`#d97706`,strokeWidth:1.5}),(0,$.jsx)(`text`,{x:`94`,y:`99`,textAnchor:`middle`,fontSize:22,fontWeight:700,fill:`#3730a3`,children:`A`}),(0,$.jsx)(`text`,{x:`246`,y:`99`,textAnchor:`middle`,fontSize:22,fontWeight:700,fill:`#b45309`,children:`B`}),(0,$.jsx)(`text`,{x:`170`,y:`99`,textAnchor:`middle`,fontSize:13,fontWeight:700,fill:`#1f2937`,children:`A∩B`})]}),(0,$.jsx)(`figcaption`,{className:`venn-caption`,children:`和事象 A∪B は、重なり A∩B を一度だけ引く：P(A∪B) = P(A) + P(B) − P(A∩B)。単純に足すと、重なり部分を二重に数えてしまうため。`})]},r);if(e===`[[venn-conditional]]`)return(0,$.jsxs)(`figure`,{className:`venn-figure`,children:[(0,$.jsxs)(`svg`,{viewBox:`0 0 340 200`,role:`img`,"aria-label":`条件付き確率：A が起きた世界の中での B の割合`,className:`venn-svg`,children:[(0,$.jsx)(`rect`,{x:`6`,y:`6`,width:`328`,height:`188`,rx:`8`,fill:`#f3f4f6`,stroke:`#d1d5db`,strokeWidth:1}),(0,$.jsx)(`text`,{x:`20`,y:`26`,fontSize:12,fill:`#6b7280`,children:`Ω`}),(0,$.jsx)(`circle`,{cx:`140`,cy:`104`,r:`68`,fill:`#4338ca`,fillOpacity:.16,stroke:`#4338ca`,strokeWidth:3}),(0,$.jsx)(`circle`,{cx:`205`,cy:`104`,r:`68`,fill:`#d97706`,fillOpacity:.16,stroke:`#d97706`,strokeWidth:1.2}),(0,$.jsx)(`text`,{x:`104`,y:`110`,textAnchor:`middle`,fontSize:22,fontWeight:700,fill:`#3730a3`,children:`A`}),(0,$.jsx)(`text`,{x:`242`,y:`110`,textAnchor:`middle`,fontSize:20,fontWeight:700,fill:`#b45309`,children:`B`}),(0,$.jsx)(`text`,{x:`172`,y:`110`,textAnchor:`middle`,fontSize:12,fontWeight:700,fill:`#1f2937`,children:`A∩B`})]}),(0,$.jsx)(`figcaption`,{className:`venn-caption`,children:`条件付き確率 P(B∣A) = P(A∩B) / P(A)。A が起きたとわかった時点で、考える世界は A の中（太線）だけ。その中で B にも入っている割合が P(B∣A)。`})]},r);if(e===`[[total-probability]]`)return(0,$.jsxs)(`figure`,{className:`venn-figure`,children:[(0,$.jsxs)(`svg`,{viewBox:`0 0 360 200`,role:`img`,"aria-label":`全確率の定理：原因 B1 B2 B3 ごとの寄与を足す`,className:`venn-svg`,children:[(0,$.jsx)(`rect`,{x:`10`,y:`22`,width:`340`,height:`150`,fill:`#ffffff`,stroke:`#9ca3af`,strokeWidth:1}),(0,$.jsx)(`line`,{x1:`158`,y1:`22`,x2:`158`,y2:`172`,stroke:`#9ca3af`,strokeWidth:1}),(0,$.jsx)(`line`,{x1:`262`,y1:`22`,x2:`262`,y2:`172`,stroke:`#9ca3af`,strokeWidth:1}),(0,$.jsx)(`rect`,{x:`10`,y:`120`,width:`148`,height:`52`,fill:`#4338ca`,fillOpacity:.3}),(0,$.jsx)(`rect`,{x:`158`,y:`92`,width:`104`,height:`80`,fill:`#4338ca`,fillOpacity:.3}),(0,$.jsx)(`rect`,{x:`262`,y:`146`,width:`88`,height:`26`,fill:`#4338ca`,fillOpacity:.3}),(0,$.jsx)(`text`,{x:`84`,y:`40`,textAnchor:`middle`,fontSize:13,fontWeight:700,fill:`#374151`,children:`B₁`}),(0,$.jsx)(`text`,{x:`210`,y:`40`,textAnchor:`middle`,fontSize:13,fontWeight:700,fill:`#374151`,children:`B₂`}),(0,$.jsx)(`text`,{x:`306`,y:`40`,textAnchor:`middle`,fontSize:13,fontWeight:700,fill:`#374151`,children:`B₃`}),(0,$.jsx)(`text`,{x:`84`,y:`150`,textAnchor:`middle`,fontSize:12.6,fontWeight:700,fill:`#312e81`,children:`A∩B₁`}),(0,$.jsx)(`text`,{x:`210`,y:`136`,textAnchor:`middle`,fontSize:12.6,fontWeight:700,fill:`#312e81`,children:`A∩B₂`}),(0,$.jsx)(`text`,{x:`306`,y:`162`,textAnchor:`middle`,fontSize:12.6,fontWeight:700,fill:`#312e81`,children:`A∩B₃`})]}),(0,$.jsx)(`figcaption`,{className:`venn-caption`,children:`全確率の定理 P(A) = Σ P(A∣Bᵢ)·P(Bᵢ)。全体 Ω を排反な原因 B₁,B₂,B₃ … に分け、各原因の中で A が起きる量（青）を足し合わせると P(A) になる。列の幅が P(Bᵢ)、青い高さが P(A∣Bᵢ) のイメージ。`})]},r);if(/^\[\[f-[a-z0-9-]+\]\]$/.test(e)&&Vn[e.slice(2,-2)])return(0,$.jsx)(`div`,{dangerouslySetInnerHTML:{__html:Vn[e.slice(2,-2)]()}},r);if(e===`[[cdf-pdf]]`)return(0,$.jsx)(`div`,{dangerouslySetInnerHTML:{__html:de()}},r);if(e===`[[cov-quadrants]]`)return(0,$.jsx)(`div`,{dangerouslySetInnerHTML:{__html:ae()}},r);if(e===`[[resid-steps]]`)return(0,$.jsx)(`div`,{dangerouslySetInnerHTML:{__html:oe()}},r);if(e===`[[ci-coverage]]`){let e=[[150,214],[138,202],[160,226],[148,210],[134,198],[168,230],[120,168],[156,220],[142,206],[164,228],[130,194],[152,216],[146,208],[170,232],[136,200],[158,222],[144,204],[162,226],[140,202],[154,218]];return(0,$.jsxs)(`figure`,{className:`venn-figure`,children:[(0,$.jsxs)(`svg`,{viewBox:`0 0 360 220`,role:`img`,"aria-label":`信頼区間の被覆：別々の標本から作った95%信頼区間と、固定された真の値θ。約95%が真値をまたぐ`,className:`venn-svg ci-svg`,children:[(0,$.jsx)(`line`,{x1:182,y1:22,x2:182,y2:210,stroke:`#dc2626`,strokeWidth:1.5,strokeDasharray:`4 3`}),(0,$.jsx)(`text`,{x:182,y:15,textAnchor:`middle`,fontSize:12.6,fontWeight:700,fill:`#b91c1c`,children:`θ（真の値・固定）`}),e.map(([e,t],n)=>{let r=30+n*9,i=e<=182&&182<=t?`#4338ca`:`#dc2626`,a=(e+t)/2;return(0,$.jsxs)(`g`,{children:[(0,$.jsx)(`line`,{x1:e,y1:r,x2:t,y2:r,stroke:i,strokeWidth:2}),(0,$.jsx)(`line`,{x1:e,y1:r-3,x2:e,y2:r+3,stroke:i,strokeWidth:2}),(0,$.jsx)(`line`,{x1:t,y1:r-3,x2:t,y2:r+3,stroke:i,strokeWidth:2}),(0,$.jsx)(`circle`,{cx:a,cy:r,r:1.7,fill:i})]},n)})]}),(0,$.jsx)(`figcaption`,{className:`venn-caption`,children:`各横線は、別々の標本から作った95%信頼区間（中央の点が標本平均 x̄）。真の値 θ は1つに決まっていて動かない（赤い縦線）。標本ごとに区間のほうが左右に揺れる。この手順をくり返すと約95%の区間が θ をまたぐ（青）が、たまに外す（赤）。「95%」はこの手順の長期的な成功率であって、ある1つの区間に θ が入る確率ではない。`})]},r)}if(e===`[[power-curve]]`){let e=(e,t)=>190-120*Math.exp(-.5*((e-t)/34)**2),t=(t,n,r)=>{let i=``;for(let a=n;a<=r;a+=3)i+=`${a},${e(a,t).toFixed(1)} `;return i.trim()},n=(t,n,r)=>{let i=`${n},190 `;for(let a=n;a<=r;a+=3)i+=`${a},${e(a,t).toFixed(1)} `;return i+`${r},190`};return(0,$.jsxs)(`figure`,{className:`venn-figure`,children:[(0,$.jsxs)(`svg`,{viewBox:`0 0 420 214`,role:`img`,"aria-label":`検定の2分布図：H0とH1の重なりに第1種の過誤α・第2種の過誤β・検出力1−βを示す`,className:`venn-svg ci-svg`,children:[(0,$.jsx)(`line`,{x1:48,y1:190,x2:372,y2:190,stroke:`#9ca3af`,strokeWidth:1}),(0,$.jsx)(`polygon`,{points:n(235,206,360),fill:`#16a34a`,fillOpacity:.16}),(0,$.jsx)(`polygon`,{points:n(235,140,206),fill:`#6b7280`,fillOpacity:.3}),(0,$.jsx)(`polygon`,{points:n(150,206,290),fill:`#dc2626`,fillOpacity:.32}),(0,$.jsx)(`polyline`,{points:t(150,52,300),fill:`none`,stroke:`#4338ca`,strokeWidth:2}),(0,$.jsx)(`polyline`,{points:t(235,130,360),fill:`none`,stroke:`#0f766e`,strokeWidth:2}),(0,$.jsx)(`line`,{x1:206,y1:52,x2:206,y2:190,stroke:`#111827`,strokeWidth:1.2,strokeDasharray:`4 3`}),(0,$.jsx)(`text`,{x:150,y:205,textAnchor:`middle`,fontSize:14.7,fill:`#3730a3`,children:`μ₀`}),(0,$.jsx)(`text`,{x:235,y:205,textAnchor:`middle`,fontSize:14.7,fill:`#0f766e`,children:`μ₁`}),(0,$.jsx)(`text`,{x:206,y:48,textAnchor:`middle`,fontSize:14.7,fill:`#111827`,children:`境界 c`}),(0,$.jsx)(`text`,{x:150,y:64,textAnchor:`middle`,fontSize:14.7,fontWeight:700,fill:`#3730a3`,children:`H₀ 真`}),(0,$.jsx)(`text`,{x:235,y:64,textAnchor:`middle`,fontSize:14.7,fontWeight:700,fill:`#0f766e`,children:`H₁ 真`}),(0,$.jsx)(`text`,{x:224,y:183,textAnchor:`middle`,fontSize:14.7,fontWeight:700,fill:`#991b1b`,children:`α`}),(0,$.jsx)(`text`,{x:189,y:170,textAnchor:`middle`,fontSize:14.7,fontWeight:700,fill:`#374151`,children:`β`}),(0,$.jsx)(`text`,{x:262,y:150,textAnchor:`middle`,fontSize:14.7,fontWeight:700,fill:`#166534`,children:`1−β`})]}),(0,$.jsx)(`figcaption`,{className:`venn-caption`,children:`左の山は差がない（H₀ が真）ときの検定統計量の分布、右の山は差がある（H₁ が真）ときの分布。境界 c より右に出たら H₀ を棄却する。α（赤）＝H₀ が真なのに棄却してしまう第1種の過誤、β（灰）＝H₁ が真なのに見逃す第2種の過誤、1−β（緑）＝検出力。境界 c を左へ動かすと α は増え β は減る（トレードオフ）。標本数 n を増やすと両方の山が細くなって重なりが減り、α を保ったまま検出力を上げられる。`})]},r)}if(e===`[[markov-chain]]`)return(0,$.jsxs)(`figure`,{className:`venn-figure`,children:[(0,$.jsxs)(`svg`,{viewBox:`0 0 360 200`,role:`img`,"aria-label":`マルコフ連鎖の状態遷移図：晴れと雨の2状態と推移確率`,className:`venn-svg ci-svg`,children:[(0,$.jsx)(`defs`,{children:(0,$.jsx)(`marker`,{id:`mkArrow`,markerUnits:`userSpaceOnUse`,markerWidth:10,markerHeight:10,refX:7,refY:4,orient:`auto`,children:(0,$.jsx)(`path`,{d:`M0,0 L8,4 L0,8 Z`,fill:`#475569`})})}),(0,$.jsx)(`path`,{d:`M139,93 Q180,55 221,93`,fill:`none`,stroke:`#475569`,strokeWidth:1.6,markerEnd:`url(#mkArrow)`}),(0,$.jsx)(`path`,{d:`M221,127 Q180,165 139,127`,fill:`none`,stroke:`#475569`,strokeWidth:1.6,markerEnd:`url(#mkArrow)`}),(0,$.jsx)(`path`,{d:`M78,98 C40,80 40,140 78,122`,fill:`none`,stroke:`#475569`,strokeWidth:1.6,markerEnd:`url(#mkArrow)`}),(0,$.jsx)(`path`,{d:`M282,98 C320,80 320,140 282,122`,fill:`none`,stroke:`#475569`,strokeWidth:1.6,markerEnd:`url(#mkArrow)`}),(0,$.jsx)(`circle`,{cx:110,cy:110,r:34,fill:`#fef3c7`,stroke:`#d97706`,strokeWidth:2}),(0,$.jsx)(`circle`,{cx:250,cy:110,r:34,fill:`#dbeafe`,stroke:`#2563eb`,strokeWidth:2}),(0,$.jsx)(`text`,{x:110,y:117,textAnchor:`middle`,fontSize:20,fontWeight:700,fill:`#b45309`,children:`晴`}),(0,$.jsx)(`text`,{x:250,y:117,textAnchor:`middle`,fontSize:20,fontWeight:700,fill:`#1d4ed8`,children:`雨`}),(0,$.jsx)(`text`,{x:180,y:50,textAnchor:`middle`,fontSize:12.6,fontWeight:700,fill:`#334155`,children:`0.2`}),(0,$.jsx)(`text`,{x:180,y:181,textAnchor:`middle`,fontSize:12.6,fontWeight:700,fill:`#334155`,children:`0.4`}),(0,$.jsx)(`text`,{x:33,y:114,textAnchor:`middle`,fontSize:12.6,fontWeight:700,fill:`#b45309`,children:`0.8`}),(0,$.jsx)(`text`,{x:327,y:114,textAnchor:`middle`,fontSize:12.6,fontWeight:700,fill:`#1d4ed8`,children:`0.6`})]}),(0,$.jsx)(`figcaption`,{className:`venn-caption`,children:`天気を晴れ・雨の2状態にしたマルコフ連鎖。矢印は推移確率 pᵢⱼ（晴→雨 = 0.2、雨→晴 = 0.4、自己ループは晴→晴 = 0.8、雨→雨 = 0.6）。各状態から出る矢印の確率の和は必ず1で、これが推移確率行列 P の各行の和が1になることに対応する。次の状態は今の状態だけで決まり、それより前の履歴にはよらない（マルコフ性）。`})]},r);if(e===`[[logistic-sigmoid]]`){let e=e=>44+(e+6)/12*288,t=e=>182-e*152,n=e=>1/(1+Math.exp(-e)),i=``;for(let r=-6;r<=6.0001;r+=.25)i+=`${e(r).toFixed(1)},${t(n(r)).toFixed(1)} `;return(0,$.jsxs)(`figure`,{className:`venn-figure`,children:[(0,$.jsxs)(`svg`,{viewBox:`0 0 360 220`,role:`img`,"aria-label":`ロジスティック回帰のシグモイド曲線：線形予測子に対し確率が0と1の間に収まる`,className:`venn-svg ci-svg`,children:[(0,$.jsx)(`line`,{x1:44,y1:t(1),x2:332,y2:t(1),stroke:`#cbd5e1`,strokeWidth:1,strokeDasharray:`3 3`}),(0,$.jsx)(`line`,{x1:44,y1:t(0),x2:332,y2:t(0),stroke:`#cbd5e1`,strokeWidth:1,strokeDasharray:`3 3`}),(0,$.jsx)(`line`,{x1:44,y1:24,x2:44,y2:188,stroke:`#9ca3af`,strokeWidth:1}),(0,$.jsx)(`line`,{x1:e(-6),y1:t(-.16000000000000003),x2:e(6),y2:t(1.1600000000000001),stroke:`#9ca3af`,strokeWidth:1.5,strokeDasharray:`5 3`}),(0,$.jsx)(`polyline`,{points:i.trim(),fill:`none`,stroke:`#0f766e`,strokeWidth:2.4}),(0,$.jsx)(`circle`,{cx:e(0),cy:t(.5),r:2.8,fill:`#0f766e`}),(0,$.jsx)(`text`,{x:38,y:t(1)+4,textAnchor:`end`,fontSize:12.6,fill:`#6b7280`,children:`1`}),(0,$.jsx)(`text`,{x:38,y:t(0)+4,textAnchor:`end`,fontSize:12.6,fill:`#6b7280`,children:`0`}),(0,$.jsx)(`text`,{x:e(0)+7,y:t(.5)-6,textAnchor:`start`,fontSize:12.6,fontWeight:700,fill:`#0f766e`,children:`p=0.5`}),(0,$.jsx)(`text`,{x:332,y:202,textAnchor:`end`,fontSize:12.6,fill:`#6b7280`,children:`β₀+β·x（線形予測子）`}),(0,$.jsx)(`text`,{x:40,y:18,textAnchor:`start`,fontSize:12.6,fill:`#6b7280`,children:`確率 p`})]}),(0,$.jsx)(`figcaption`,{className:`venn-caption`,children:`ロジスティック回帰のシグモイド関数 p = 1 / (1 + e^−(β₀+β·x))。線形予測子（横軸）がどれだけ大きく・小さくなっても、確率（縦軸）は必ず0と1の間に収まる。確率をそのまま直線で当てはめると（灰の破線）0を下回り1を超えてしまうのに対し、シグモイドはなめらかに0↔1を結ぶ。中央 β₀+β·x = 0 で p = 0.5、そこで傾きが最も急になる。`})]},r)}if(e.startsWith(`[[interactive:`)){let n=e.match(/\[\[interactive:(.*?)\]\]/);if(n){let e=n[1];return(0,$.jsx)(Pr,{type:e,renderContent:t},r)}}if(e===`[[pvalue-table]]`)return(0,$.jsx)(`div`,{style:{overflowX:`auto`,margin:`1rem 0`},children:(0,$.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,fontSize:`0.85rem`},children:[(0,$.jsx)(`thead`,{children:(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`th`,{style:{background:`#fef2f2`,color:`#991b1b`,padding:`0.6rem 0.75rem`,border:`1px solid #fecaca`,textAlign:`left`,fontWeight:800},children:`❌ 間違った解釈`}),(0,$.jsx)(`th`,{style:{background:`#f0fdf4`,color:`#166534`,padding:`0.6rem 0.75rem`,border:`1px solid #bbf7d0`,textAlign:`left`,fontWeight:800},children:`✅ 正しい解釈`})]})}),(0,$.jsxs)(`tbody`,{children:[(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,verticalAlign:`top`},children:`「帰無仮説が正しい確率が3%」`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,verticalAlign:`top`},children:`「帰無仮説が正しいと仮定したとき、この結果が偶然起きる確率が3%」`})]}),(0,$.jsxs)(`tr`,{style:{background:`var(--bg-warm)`},children:[(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,verticalAlign:`top`},children:`「P=0.03は効果が大きいことを示す」`}),(0,$.jsxs)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,verticalAlign:`top`},children:[`P値はサンプルサイズに影響される。効果の大きさは`,(0,$.jsx)(`strong`,{children:`効果量`}),`（コーエンの d など）で測る`]})]})]})]})},r);if(e===`[[anova-table]]`)return(0,$.jsx)(`div`,{style:{overflowX:`auto`,margin:`1rem 0`},children:(0,$.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,fontSize:`0.85rem`},children:[(0,$.jsx)(`thead`,{children:(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`th`,{style:{background:`#eff6ff`,color:`#1d4ed8`,padding:`0.6rem 0.75rem`,border:`1px solid #bfdbfe`,textAlign:`left`,fontWeight:800},children:`グループ`}),(0,$.jsx)(`th`,{style:{background:`#eff6ff`,color:`#1d4ed8`,padding:`0.6rem 0.75rem`,border:`1px solid #bfdbfe`,textAlign:`left`,fontWeight:800},children:`10日間の売上例`}),(0,$.jsx)(`th`,{style:{background:`#eff6ff`,color:`#1d4ed8`,padding:`0.6rem 0.75rem`,border:`1px solid #bfdbfe`,textAlign:`left`,fontWeight:800},children:`10日間の平均`})]})}),(0,$.jsxs)(`tbody`,{children:[(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`},children:`煮玉子`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`},children:`52, 48, 55, 51, 49, 50, 54, 47, 51, 53`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,fontWeight:700},children:`51万円`})]}),(0,$.jsxs)(`tr`,{style:{background:`var(--bg-warm)`},children:[(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`},children:`チャーシュー`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`},children:`58, 61, 57, 60, 59, 60, 57, 61, 58, 59`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,fontWeight:700,color:`#1d4ed8`},children:`59万円`})]}),(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`},children:`メンマ`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`},children:`50, 52, 48, 51, 49, 50, 48, 52, 49, 51`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,fontWeight:700},children:`50万円`})]})]})]})},r);if(e===`[[type-error-table]]`)return(0,$.jsx)(`div`,{style:{overflowX:`auto`,margin:`1rem 0`},children:(0,$.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,fontSize:`0.85rem`},children:[(0,$.jsx)(`thead`,{children:(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`th`,{style:{background:`var(--bg-warm)`,padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,textAlign:`left`,fontWeight:800}}),(0,$.jsx)(`th`,{style:{background:`#f0fdf4`,color:`#166534`,padding:`0.6rem 0.75rem`,border:`1px solid #bbf7d0`,textAlign:`left`,fontWeight:800},children:`H₀ が真（本当は差なし）`}),(0,$.jsx)(`th`,{style:{background:`#fef2f2`,color:`#991b1b`,padding:`0.6rem 0.75rem`,border:`1px solid #fecaca`,textAlign:`left`,fontWeight:800},children:`H₀ が偽（本当は差あり）`})]})}),(0,$.jsxs)(`tbody`,{children:[(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,fontWeight:700},children:`棄却（差ありと判断）`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,background:`#fef2f2`,color:`#991b1b`,fontWeight:700},children:`第1種の過誤 α（冤罪）`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,background:`#f0fdf4`,color:`#166534`},children:`正解 ✓`})]}),(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,fontWeight:700},children:`棄却しない（差なし）`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,background:`#f0fdf4`,color:`#166534`},children:`正解 ✓`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,background:`#fef2f2`,color:`#991b1b`,fontWeight:700},children:`第2種の過誤 β（見逃し）`})]})]})]})},r);if(e===`[[confusion-matrix]]`)return(0,$.jsx)(`div`,{style:{overflowX:`auto`,margin:`1rem 0`},children:(0,$.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,fontSize:`0.85rem`},children:[(0,$.jsx)(`thead`,{children:(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`th`,{style:{background:`var(--bg-warm)`,padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,textAlign:`left`,fontWeight:800}}),(0,$.jsx)(`th`,{style:{background:`#eff6ff`,color:`#1d4ed8`,padding:`0.6rem 0.75rem`,border:`1px solid #bfdbfe`,textAlign:`left`,fontWeight:800},children:`予測: スパム`}),(0,$.jsx)(`th`,{style:{background:`#eff6ff`,color:`#1d4ed8`,padding:`0.6rem 0.75rem`,border:`1px solid #bfdbfe`,textAlign:`left`,fontWeight:800},children:`予測: 正常`})]})}),(0,$.jsxs)(`tbody`,{children:[(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,fontWeight:700},children:`実際: スパム`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,background:`#f0fdf4`,color:`#166534`,fontWeight:700},children:`正解（TP）`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,background:`#fef2f2`,color:`#991b1b`},children:`見逃し（FN）`})]}),(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,fontWeight:700},children:`実際: 正常`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,background:`#fef2f2`,color:`#991b1b`},children:`誤検知（FP）`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,background:`#f0fdf4`,color:`#166534`,fontWeight:700},children:`正解（TN）`})]})]})]})},r);if(e===`[[pca-vs-fa-table]]`)return(0,$.jsx)(`div`,{style:{overflowX:`auto`,margin:`1rem 0`},children:(0,$.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,fontSize:`0.85rem`},children:[(0,$.jsx)(`thead`,{children:(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`th`,{style:{background:`var(--bg-warm)`,padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,textAlign:`left`,fontWeight:800}}),(0,$.jsx)(`th`,{style:{background:`#eff6ff`,color:`#1d4ed8`,padding:`0.6rem 0.75rem`,border:`1px solid #bfdbfe`,textAlign:`center`,fontWeight:800},children:`主成分分析（PCA）`}),(0,$.jsx)(`th`,{style:{background:`#fdf4ff`,color:`#7e22ce`,padding:`0.6rem 0.75rem`,border:`1px solid #e9d5ff`,textAlign:`center`,fontWeight:800},children:`因子分析`})]})}),(0,$.jsxs)(`tbody`,{children:[(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,fontWeight:700},children:`目的`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,textAlign:`center`},children:`データの次元圧縮・要約`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,textAlign:`center`},children:`潜在因子の発見`})]}),(0,$.jsxs)(`tr`,{style:{background:`var(--bg-warm)`},children:[(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,fontWeight:700},children:`方向性`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,textAlign:`center`},children:`観測変数 → 主成分`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,textAlign:`center`},children:`因子 → 観測変数（因果的解釈）`})]}),(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,fontWeight:700},children:`扱う分散`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,textAlign:`center`},children:`ノイズを含む「全分散」`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,textAlign:`center`},children:`共通性（共分散部分）だけ`})]})]})]})},r);if(e===`[[conjugate-table]]`)return(0,$.jsx)(`div`,{style:{overflowX:`auto`,margin:`1rem 0`},children:(0,$.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,fontSize:`0.85rem`},children:[(0,$.jsx)(`thead`,{children:(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`th`,{style:{background:`#eff6ff`,color:`#1d4ed8`,padding:`0.6rem 0.75rem`,border:`1px solid #bfdbfe`,textAlign:`left`,fontWeight:800},children:`尤度`}),(0,$.jsx)(`th`,{style:{background:`#fdf4ff`,color:`#7e22ce`,padding:`0.6rem 0.75rem`,border:`1px solid #e9d5ff`,textAlign:`left`,fontWeight:800},children:`共役事前分布`}),(0,$.jsx)(`th`,{style:{background:`#f0fdf4`,color:`#166534`,padding:`0.6rem 0.75rem`,border:`1px solid #bbf7d0`,textAlign:`left`,fontWeight:800},children:`事後分布`})]})}),(0,$.jsxs)(`tbody`,{children:[(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`},children:`二項分布（成功/失敗）`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`},children:`ベータ分布`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,fontWeight:700},children:`ベータ分布`})]}),(0,$.jsxs)(`tr`,{style:{background:`var(--bg-warm)`},children:[(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`},children:`ポアソン分布（回数）`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`},children:`ガンマ分布`}),(0,$.jsx)(`td`,{style:{padding:`0.6rem 0.75rem`,border:`1px solid var(--border)`,fontWeight:700},children:`ガンマ分布`})]})]})]})},r);if(e===`[[regularization-card]]`)return(0,$.jsxs)(`div`,{className:`reg-card-container`,children:[(0,$.jsxs)(`div`,{className:`reg-side lasso`,children:[(0,$.jsxs)(`div`,{className:`reg-header`,children:[(0,$.jsx)(wr,{size:20}),` `,(0,$.jsx)(`strong`,{children:`Lasso (L1)`})]}),(0,$.jsx)(`div`,{className:`reg-metaphor`,children:`「断捨離」`}),(0,$.jsxs)(`ul`,{className:`reg-list`,children:[(0,$.jsx)(`li`,{children:`不要な係数を **完全に 0** にする`}),(0,$.jsx)(`li`,{children:`**変数選択** の機能がある`}),(0,$.jsx)(`li`,{children:`スパースな解を得やすい`})]})]}),(0,$.jsxs)(`div`,{className:`reg-side ridge`,children:[(0,$.jsxs)(`div`,{className:`reg-header`,children:[(0,$.jsx)(fr,{size:20}),` `,(0,$.jsx)(`strong`,{children:`Ridge (L2)`})]}),(0,$.jsx)(`div`,{className:`reg-metaphor`,children:`「シェイプアップ」`}),(0,$.jsxs)(`ul`,{className:`reg-list`,children:[(0,$.jsx)(`li`,{children:`係数を **全体的に縮小** する`}),(0,$.jsx)(`li`,{children:`完全に 0 にはならない`}),(0,$.jsx)(`li`,{children:`マルチコに強く安定する`})]})]})]},r);if(e.startsWith(`[[practical:`)){let n=e.match(/\[\[practical:(.*?)\]\]/),i=e.match(/\]\]([\s\S]*?)\[\[\/practical\]\]/);if(n&&i)return(0,$.jsxs)(`div`,{className:`column-practical`,children:[(0,$.jsxs)(`div`,{className:`column-title`,children:[(0,$.jsx)(hr,{size:16}),` 実務Tips: `,n[1]]}),(0,$.jsx)(`div`,{style:{fontSize:`0.85rem`},children:t(i[1])})]},r)}return(0,$.jsx)(`span`,{style:{whiteSpace:`pre-wrap`},children:e},r)})})}return t(e)},[b]),T=(0,y.useCallback)(e=>{if(!e)return null;let t=e.split(`
`),n=[],r=[],i=[],a=[],o=0,s=e=>{r.length>0&&(n.push((0,$.jsx)(`ul`,{children:r},`list-${e}`)),r=[]),i.length>0&&(n.push((0,$.jsx)(`ol`,{children:i},`ol-${e}`)),i=[])},c=e=>{if(a.length<2){a=[];return}let t=a.map(e=>e.split(`|`).slice(1,-1).map(e=>e.trim())),r=e=>e.every(e=>/^[-:]+$/.test(e)),i=t[0],o=t.slice(1).filter(e=>!r(e));n.push((0,$.jsx)(`div`,{className:`content-table-wrap`,children:(0,$.jsxs)(`table`,{className:`content-table`,children:[(0,$.jsx)(`thead`,{children:(0,$.jsx)(`tr`,{children:i.map((e,t)=>(0,$.jsx)(`th`,{children:w(e)},t))})}),(0,$.jsx)(`tbody`,{children:o.map((e,t)=>(0,$.jsx)(`tr`,{children:e.map((e,t)=>(0,$.jsx)(`td`,{children:w(e)},t))},t))})]})},`table-${e}`)),a=[]};return t.forEach((e,t)=>{let l=e.trim(),u=`line-${t}`;if(l.startsWith(`|`)){s(u),a.push(l);return}if(a.length>0&&c(u),l.startsWith(`#### `)){s(u),n.push((0,$.jsx)(`h4`,{className:`content-h4`,children:w(l.slice(5))},u));return}if(l.startsWith(`### `)){s(u),n.push((0,$.jsx)(`h3`,{className:`content-h3`,children:w(l.slice(4))},u));return}if(l.startsWith(`## `)){s(u);let e=`section-${o++}`;n.push((0,$.jsx)(`h2`,{id:e,className:`content-h2`,children:w(l.slice(3))},u));return}if(l.startsWith(`---`)){s(u),n.push((0,$.jsx)(`hr`,{className:`content-hr`},u));return}if(l.startsWith(`- `)){i.length>0&&(n.push((0,$.jsx)(`ol`,{children:i},`ol-${u}`)),i=[]),r.push((0,$.jsx)(`li`,{children:w(l.slice(2))},`li-${t}`));return}let d=l.match(/^(\d+)\. (.*)$/);if(d){r.length>0&&(n.push((0,$.jsx)(`ul`,{children:r},`list-${u}`)),r=[]),i.push((0,$.jsx)(`li`,{children:w(d[2])},`oli-${t}`));return}if(l===``){s(u);return}if(s(u),l.startsWith(`💡 `)){n.push((0,$.jsx)(`p`,{className:`content-p callout-tip`,children:w(l.slice(2))},u));return}if(l.startsWith(`🎯 `)){n.push((0,$.jsx)(`p`,{className:`content-p callout-target`,children:w(l.slice(2))},u));return}if(l.startsWith(`⚠️ `)){n.push((0,$.jsx)(`p`,{className:`content-p callout-warning`,children:w(l.slice(3))},u));return}n.push((0,$.jsx)(`p`,{className:`content-p`,children:w(e)},u))}),c(`final`),s(`final`),(0,$.jsx)($.Fragment,{children:n})},[w]),E=(0,y.useCallback)(e=>e?e.includes(`🔍 `)?(0,$.jsx)($.Fragment,{children:xi(e).map((e,t)=>e.aside?(0,$.jsxs)(`details`,{className:`callout-aside`,children:[(0,$.jsxs)(`summary`,{children:[(0,$.jsx)(`span`,{className:`aside-tag`,children:`参考`}),(0,$.jsx)(`span`,{className:`aside-title`,children:w(e.title)}),(0,$.jsx)(`span`,{className:`aside-note`,children:`読まなくても先へ進めます`})]}),(0,$.jsx)(`div`,{className:`aside-body`,children:T(e.body)})]},`aside-${t}`):(0,$.jsx)(y.Fragment,{children:T(e.body)},`seg-${t}`))}):T(e):null,[T,w]),ie=(0,y.useMemo)(()=>[...o?X.filter(e=>e.title.toLowerCase().includes(o.toLowerCase())||e.content.toLowerCase().includes(o.toLowerCase())||e.description.toLowerCase().includes(o.toLowerCase())):X].sort((e,t)=>e.chapter-t.chapter),[o]),D=(0,y.useMemo)(()=>X.find(t=>t.id===e),[e]),se=(0,y.useMemo)(()=>D?!X.some((e,t)=>e.chapter===D.chapter&&t>X.indexOf(D)):!1,[D]),ce=(0,y.useMemo)(()=>{if(!e)return null;let t=X.findIndex(t=>t.id===e);return t>=0&&t<X.length-1?X[t+1]:null},[e]),le=(0,y.useCallback)(e=>X.filter(t=>t.content.includes(`[[term:${e}]]`)),[]),O=(0,y.useMemo)(()=>{if(!D)return[];let e=[],t=0;for(let n of D.content.split(`
`)){let r=n.trim();r.startsWith(`## `)&&!r.startsWith(`### `)&&e.push({id:`section-${t++}`,text:r.slice(3).replace(/\*\*/g,``).replace(/\$[^$]+\$/g,``).trim()})}return e},[D]),[ue,k]=(0,y.useState)(0),[A,j]=(0,y.useState)(!1);(0,y.useEffect)(()=>{if(!e){k(0),j(!1);return}let t=()=>{let e=window.scrollY,t=document.documentElement.scrollHeight-window.innerHeight;k(t>0?Math.min(100,e/t*100):0),j(e>500)};return t(),window.addEventListener(`scroll`,t,{passive:!0}),()=>window.removeEventListener(`scroll`,t)},[e]);let M=X.filter(e=>u[e.id]).length,N=X.length;return(0,$.jsxs)(`div`,{className:`container`,style:{maxWidth:e?`800px`:r===`glossary`?`1000px`:`800px`},children:[(0,$.jsxs)(`header`,{className:`header`,children:[(0,$.jsxs)(`div`,{className:`brand`,onClick:()=>b(null),children:[(0,$.jsx)(br,{className:`brand-icon`,strokeWidth:1.5}),(0,$.jsx)(`h1`,{className:`title`,children:`統計検定 準1級`})]}),(0,$.jsx)(`p`,{className:`subtitle`,children:`学習リファレンス`})]}),!e&&(0,$.jsxs)(`nav`,{style:{display:`flex`,gap:`0.5rem`,marginBottom:`1.5rem`,borderBottom:`1px solid var(--border)`,paddingBottom:`0.5rem`,flexWrap:`wrap`},children:[(0,$.jsxs)(`button`,{onClick:()=>x(`dashboard`),className:`nav-tab ${r===`dashboard`?`active`:``}`,children:[(0,$.jsx)(mr,{size:18}),` ロードマップ`,M>0&&(0,$.jsxs)(`span`,{className:`nav-progress-badge`,children:[M,`/`,N]})]}),(0,$.jsxs)(`button`,{onClick:()=>x(`glossary`),className:`nav-tab ${r===`glossary`?`active`:``}`,children:[(0,$.jsx)(ir,{size:18}),` 用語集`]}),(0,$.jsxs)(`button`,{onClick:()=>x(`cheatsheet`),className:`nav-tab ${r===`cheatsheet`?`active`:``}`,children:[(0,$.jsx)(pr,{size:18}),` 公式集`]}),(0,$.jsxs)(`button`,{onClick:re,className:`nav-tab ${r===`randomquiz`?`active`:``}`,children:[(0,$.jsx)(xr,{size:18}),` 全範囲クイズ`]}),(0,$.jsxs)(`button`,{onClick:()=>x(`guide`),className:`nav-tab ${r===`guide`?`active`:``}`,children:[(0,$.jsx)(Cr,{size:18}),` 試験ガイド`]}),(0,$.jsxs)(`button`,{onClick:()=>x(`usecase`),className:`nav-tab ${r===`usecase`?`active`:``}`,children:[(0,$.jsx)(hr,{size:18}),` 使い分けガイド`]}),(0,$.jsx)(`button`,{onClick:m,className:`nav-tab`,title:f===`light`?`ダークモードに切替`:`ライトモードに切替`,"aria-label":`テーマ切替`,children:f===`light`?(0,$.jsx)(vr,{size:18}):(0,$.jsx)(Sr,{size:18})})]}),(0,$.jsx)(`main`,{children:(0,$.jsx)(n,{mode:`wait`,children:e?(0,$.jsxs)(i.div,{initial:{opacity:0,x:10},animate:{opacity:1,x:0},exit:{opacity:0,x:-10},children:[(0,$.jsx)(Hr,{modules:X,activeId:e,onSelect:b,onSelectTest:S,chapterNames:Hn,chapterColors:Z}),(0,$.jsxs)(`button`,{className:`btn-back`,onClick:()=>b(null),children:[(0,$.jsx)(or,{size:18}),` 一覧に戻る`]}),(0,$.jsx)(`div`,{className:`scroll-progress`,style:{width:`${ue}%`,background:Z[D?.chapter??1].accent}}),(0,$.jsxs)(`div`,{className:`card`,style:{borderTop:`4px solid ${Z[D?.chapter??1].accent}`,"--ch-accent":Z[D?.chapter??1].accent},children:[(0,$.jsxs)(`span`,{style:{background:Z[D?.chapter??1].bg,color:Z[D?.chapter??1].text,fontSize:`0.6875rem`,fontWeight:700,padding:`3px 10px`,borderRadius:`9999px`,display:`inline-block`,marginBottom:`0.5rem`},children:[`Chapter `,D?.chapter,`：`,Hn[D?.chapter??1]]}),(0,$.jsx)(`h2`,{style:{marginTop:`0.5rem`},children:E(D?.title||``)}),O.length>2&&(0,$.jsxs)(`details`,{className:`module-toc`,open:!0,children:[(0,$.jsxs)(`summary`,{children:[(0,$.jsx)(_r,{size:14}),`このモジュールの目次（`,O.length,`セクション）`]}),(0,$.jsx)(`ol`,{children:O.map(e=>(0,$.jsx)(`li`,{children:(0,$.jsx)(`a`,{href:`#${e.id}`,children:e.text})},e.id))})]}),(0,$.jsx)(`div`,{className:`content-body`,children:D&&E(D.content)}),D?.keyFormulas&&D.keyFormulas.length>0&&(0,$.jsxs)(`div`,{className:`module-key-formulas`,children:[(0,$.jsxs)(`h3`,{className:`module-key-formulas-title`,children:[(0,$.jsx)(`span`,{className:`module-key-formulas-icon`,children:`🔑`}),`このモジュールの主要公式`]}),D.keyFormulas.map((e,t)=>(0,$.jsxs)(`div`,{className:`module-key-formula-row`,children:[(0,$.jsx)(`span`,{className:`module-key-formula-label`,children:e.label}),(0,$.jsx)(`div`,{className:`module-key-formula-math`,children:(0,$.jsx)(Lr,{formula:e.formula})})]},t))]}),(0,$.jsxs)(`div`,{className:`module-bottom-nav`,children:[(0,$.jsxs)(`button`,{className:`btn-back-to-list`,onClick:()=>b(null),children:[(0,$.jsx)(or,{size:16}),` モジュール一覧へ`]}),se&&D&&(0,$.jsxs)(`button`,{className:`btn-next-module btn-chapter-test`,onClick:()=>S(D.chapter),children:[`この章のまとめテストへ（10問） `,(0,$.jsx)(rr,{size:16})]}),ce&&(0,$.jsxs)(`button`,{className:`btn-next-module`,onClick:()=>b(ce.id),children:[`次のモジュール：`,ce.title,` `,(0,$.jsx)(rr,{size:16})]})]})]}),(0,$.jsx)(`button`,{className:`back-to-top ${A?`visible`:``}`,onClick:()=>window.scrollTo({top:0,behavior:`smooth`}),style:{background:Z[D?.chapter??1].accent},"aria-label":`ページトップへ戻る`,children:(0,$.jsx)(cr,{size:22})}),(0,$.jsx)(`div`,{style:{marginTop:`2rem`},children:(0,$.jsx)(Rr,{questions:D?.quiz||[],onComplete:(t,n)=>C(e,t,n),renderContent:E},e)}),c&&(0,$.jsxs)(`div`,{style:{marginTop:`1rem`},children:[e&&u[e]&&(0,$.jsxs)(`div`,{className:`score-banner`,children:[u[e].score,` / `,u[e].total,` 問正解`,u[e].score===u[e].total&&` 🎉 パーフェクト！`]}),(0,$.jsxs)(`div`,{style:{display:`flex`,gap:`1rem`,marginTop:`0.75rem`,flexWrap:`wrap`},children:[(0,$.jsxs)(`button`,{className:`btn`,onClick:()=>b(null),style:{flex:1,background:`var(--bg-warm)`,color:`var(--text)`,border:`1px solid var(--border)`},children:[(0,$.jsx)(or,{size:16}),` 一覧に戻る`]}),se&&D&&(0,$.jsxs)(`button`,{className:`btn`,onClick:()=>S(D.chapter),style:{flex:2},children:[`第`,D.chapter,`章のまとめテストへ（10問） `,(0,$.jsx)(rr,{size:16})]}),ce&&(0,$.jsxs)(`button`,{className:`btn`,onClick:()=>b(ce.id),style:{flex:2},children:[`次のモジュールへ：`,ce.title,` `,(0,$.jsx)(rr,{size:16})]})]})]})]},e):r===`randomquiz`?(0,$.jsxs)(i.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:[(0,$.jsxs)(`button`,{className:`btn-back`,onClick:()=>x(`dashboard`),children:[(0,$.jsx)(or,{size:18}),` 一覧に戻る`]}),(0,$.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,margin:`0 0 1rem`},children:[`全`,X.length,`モジュールのうち`,gi,`モジュールから、1問ずつ出題します。`]}),(0,$.jsx)(ii,{title:`全範囲クイズ`,draw:bi,renderContent:E,renderInline:w,onOpenModule:b},`rq-${h}`)]},`rq`):r===`chaptertest`&&_?(0,$.jsxs)(i.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:[(0,$.jsx)(Hr,{modules:X,activeId:null,activeTest:_,onSelect:b,onSelectTest:S,chapterNames:Hn,chapterColors:Z}),(0,$.jsxs)(`button`,{className:`btn-back`,onClick:()=>b(null),children:[(0,$.jsx)(or,{size:18}),` 一覧に戻る`]}),(0,$.jsxs)(`div`,{className:`chapter-test-head`,style:{"--ch-accent":Z[_].accent,"--ch-bg":Z[_].bg,"--ch-text":Z[_].text},children:[(0,$.jsxs)(`span`,{className:`chapter-test-badge`,style:{background:Z[_].accent},children:[`第`,_,`章のまとめテスト`]}),(0,$.jsx)(`h2`,{className:`chapter-test-title`,children:Hn[_]}),(0,$.jsxs)(`p`,{style:{margin:0,fontSize:`0.85rem`,color:`var(--text-muted)`},children:[`この章の`,X.filter(e=>e.chapter===_).length,`モジュールから、`,hi,`問をランダムに出題します。どのモジュールからも最低1問は出ます。`]})]}),(0,$.jsx)(ii,{title:`第${_}章のまとめテスト`,draw:()=>yi(_),renderContent:E,renderInline:w,onOpenModule:b,onFinish:(e,t)=>ne(_,e,t),best:ee[_]??null,accent:Z[_].accent},`ct-${_}-${h}`)]},`ct-${_}`):r===`cheatsheet`?(0,$.jsxs)(i.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:[(0,$.jsxs)(`div`,{style:{marginBottom:`1.5rem`},children:[(0,$.jsx)(`h2`,{style:{margin:`0 0 0.25rem`,fontSize:`1.25rem`,fontWeight:800},children:`公式集`}),(0,$.jsx)(`p`,{style:{margin:0,fontSize:`0.8rem`,color:`var(--text-muted)`},children:`試験直前の確認用。各モジュールの重要公式をまとめました。`})]}),Object.keys(Hn).map(Number).map(e=>(0,$.jsxs)(`div`,{children:[(0,$.jsxs)(`div`,{className:`chapter-header`,children:[(0,$.jsxs)(`span`,{className:`badge-chapter`,style:{fontSize:`0.7rem`},children:[`Chapter `,e]}),(0,$.jsx)(`h3`,{className:`content-h3`,style:{margin:`0.25rem 0 0`},children:Hn[e]})]}),X.filter(t=>t.chapter===e&&t.keyFormulas&&t.keyFormulas.length>0).map(e=>(0,$.jsxs)(`div`,{className:`card cs-module-card`,onClick:()=>b(e.id),style:{cursor:`pointer`},children:[(0,$.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`0.75rem`},children:[(0,$.jsx)(`h4`,{style:{margin:0,fontSize:`0.95rem`,fontWeight:800},children:e.title}),u[e.id]&&(0,$.jsxs)(`span`,{className:`progress-badge-small`,children:[u[e.id].score,`/`,u[e.id].total,`点`]})]}),(0,$.jsx)(`div`,{className:`cs-formulas`,children:e.keyFormulas.map((e,t)=>(0,$.jsxs)(`div`,{className:`cs-formula-row`,children:[(0,$.jsx)(`span`,{className:`cs-label`,children:e.label}),(0,$.jsx)(`div`,{className:`cs-formula`,children:(0,$.jsx)(Lr,{formula:e.formula})})]},t))})]},e.id))]},e))]},`cs`):r===`dashboard`?(0,$.jsxs)(i.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:[(0,$.jsx)(Vr,{onSelect:b}),(0,$.jsx)(`div`,{className:`search-container`,children:(0,$.jsxs)(`div`,{className:`search-input-wrapper`,children:[(0,$.jsx)(yr,{size:18,className:`search-icon`}),(0,$.jsx)(`input`,{type:`text`,placeholder:`トピックを検索...`,value:o,onChange:e=>s(e.target.value),className:`search-input`}),o&&(0,$.jsx)(`button`,{onClick:()=>s(``),className:`search-clear`,children:(0,$.jsx)(Tr,{size:16})})]})}),(0,$.jsx)(`div`,{className:`roadmap-grid`,children:ie.reduce((e,t,n)=>{let r=ie[n-1],i=Z[t.chapter]??Z[1];if(!r||r.chapter!==t.chapter){r&&e.push((0,$.jsx)(`div`,{style:{marginBottom:`1.5rem`}},`ch-end-${r.chapter}`));let n=X.filter(e=>e.chapter===t.chapter),a=n.filter(e=>u[e.id]).length;e.push((0,$.jsxs)(`div`,{className:`chapter-header`,style:{"--ch-accent":i.accent,"--ch-bg":i.bg},children:[(0,$.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`0.5rem`},children:[(0,$.jsxs)(`span`,{style:{background:i.accent,color:`#fff`,fontSize:`0.65rem`,fontWeight:700,padding:`2px 8px`,borderRadius:`9999px`,letterSpacing:`0.05em`},children:[`Chapter `,t.chapter]}),(0,$.jsxs)(`span`,{style:{fontSize:`0.7rem`,color:i.text,fontWeight:600},children:[a,`/`,n.length,`モジュール`]})]}),(0,$.jsx)(`h3`,{style:{margin:`0.35rem 0 0`,fontSize:`1.05rem`,fontWeight:800,color:i.text,letterSpacing:`-0.2px`},children:Hn[t.chapter]})]},`ch-${t.chapter}`))}let a=u[t.id],s=t.content.includes(`[[interactive:`),c=t.content.length,l=Math.max(5,Math.round(c/600));if(e.push((0,$.jsxs)(`div`,{className:`card-module`,onClick:()=>b(t.id),style:{"--ch-accent":i.accent,"--ch-light":i.light,borderRadius:o&&(n===ie.length-1||ie[n+1]?.chapter!==t.chapter)?`0 0 var(--radius-card) var(--radius-card)`:`0`,marginBottom:0,borderTop:`none`},children:[(0,$.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,gap:`0.5rem`},children:[(0,$.jsxs)(`div`,{style:{display:`flex`,gap:`0.4rem`,alignItems:`center`,flexWrap:`wrap`},children:[(0,$.jsxs)(`span`,{style:{background:i.bg,color:i.text,fontSize:`0.6875rem`,fontWeight:600,padding:`2px 8px`,borderRadius:`9999px`},children:[`Ch`,t.chapter]}),(0,$.jsxs)(`span`,{style:{fontSize:`0.7rem`,color:`var(--text-muted)`},children:[`約`,l,`分`]}),s&&(0,$.jsx)(`span`,{title:`インタラクティブグラフあり`,style:{fontSize:`0.7rem`},"aria-label":`グラフ`,children:`📊`}),t.keyFormulas&&t.keyFormulas.length>0&&(0,$.jsx)(`span`,{title:`主要公式あり`,style:{fontSize:`0.7rem`},"aria-label":`公式`,children:`🔑`})]}),a&&(0,$.jsxs)(`span`,{className:`progress-badge ${a.score===a.total?`perfect`:``}`,children:[a.score===a.total?`✓ `:``,a.score,`/`,a.total,`点`]})]}),(0,$.jsx)(`h4`,{style:{margin:`0.4rem 0 0.2rem`,fontSize:`0.95rem`},children:E(t.title)}),(0,$.jsx)(`div`,{className:`module-desc`,children:E(t.description)})]},t.id)),!o&&(n===ie.length-1||ie[n+1]?.chapter!==t.chapter)){let n=ee[t.chapter],r=X.filter(e=>e.chapter===t.chapter).length;e.push((0,$.jsxs)(`div`,{className:`card-module card-chapter-test`,onClick:()=>S(t.chapter),role:`button`,tabIndex:0,onKeyDown:e=>{e.key===`Enter`&&S(t.chapter)},style:{"--ch-accent":i.accent,"--ch-light":i.light,"--ch-bg":i.bg,"--ch-text":i.text},children:[(0,$.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,gap:`0.5rem`},children:[(0,$.jsxs)(`h4`,{style:{margin:0,fontSize:`0.95rem`},children:[`第`,t.chapter,`章のまとめテスト`]}),n&&(0,$.jsxs)(`span`,{className:`progress-badge ${n.score===n.total?`perfect`:``}`,children:[`最高 `,n.score,`/`,n.total]})]}),(0,$.jsxs)(`div`,{className:`module-desc`,children:[`この章の`,r,`モジュールから10問をランダムに出題します。`]})]},`ct-${t.chapter}`))}return e},[])})]},`dash`):r===`about`?(0,$.jsx)(i.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:(0,$.jsxs)(`div`,{className:`privacy-page`,children:[(0,$.jsx)(`h2`,{children:`サイトについて`}),(0,$.jsxs)(`section`,{children:[(0,$.jsx)(`h3`,{children:`このサイトについて`}),(0,$.jsx)(`p`,{children:`「統計検定 準1級 学習リファレンス」は、統計検定準1級の合格を目指す方のために作られた、個人運営の学習支援サイトです。`}),(0,$.jsx)(`p`,{children:`数学的な素養が中学〜高校レベルの方でも理解できるよう、概念の直感的な説明・インタラクティブなグラフ・確認クイズを提供しています。`}),(0,$.jsx)(`p`,{className:`privacy-disclaimer`,children:`⚠️ 本サイトは個人による学習支援サイトであり、統計質保証推進協会および日本統計学会の公式サイトではありません。掲載内容は個人の見解に基づくものであり、公式の情報を保証するものではありません。試験の最新情報・申込方法・合否については、必ず公式サイトをご確認ください。`})]}),(0,$.jsxs)(`section`,{children:[(0,$.jsx)(`h3`,{children:`コンテンツ構成`}),(0,$.jsxs)(`ul`,{children:[(0,$.jsxs)(`li`,{children:[(0,$.jsxs)(`strong`,{children:[`学習モジュール（全`,N,`モジュール）`]}),`：確率分布・推定・検定・多変量解析・ベイズ統計・時系列分析など`]}),(0,$.jsxs)(`li`,{children:[(0,$.jsx)(`strong`,{children:`用語集`}),`：準1級の用語解説`]}),(0,$.jsxs)(`li`,{children:[(0,$.jsx)(`strong`,{children:`公式集`}),`：重要公式の一覧（印刷対応）`]}),(0,$.jsxs)(`li`,{children:[(0,$.jsx)(`strong`,{children:`まとめテスト`}),`：各章の最後に、その章の問題からランダムに10問`]}),(0,$.jsxs)(`li`,{children:[(0,$.jsx)(`strong`,{children:`全範囲クイズ`}),`：全モジュールからランダムに20問`]})]})]}),(0,$.jsxs)(`section`,{children:[(0,$.jsx)(`h3`,{children:`編集・制作方針`}),(0,$.jsx)(`p`,{children:`本サイトのコンテンツは、統計検定の公式の出題範囲（試験要項）や、一般に流通している統計学の教科書・専門書を参照しつつ、運営者が内容を一から再構成し、初学者がつまずきやすい点を補う形で独自に解説しています。他サイトの文章をそのまま転載することはありません。`}),(0,$.jsx)(`p`,{children:`図解・インタラクティブなグラフ・確認クイズは、すべて本サイト向けに独自に制作したものです。内容の誤りや古くなった情報に気づいた場合は、お問い合わせを受けて随時見直し・修正します。`})]}),(0,$.jsxs)(`section`,{children:[(0,$.jsx)(`h3`,{children:`運営者について`}),(0,$.jsx)(`p`,{children:`本サイトは、統計学の学習を個人的に進める中で、同じように学んでいる方の助けになればと思い作成・公開しています。`}),(0,$.jsxs)(`p`,{children:[`お問い合わせは`,(0,$.jsx)(`a`,{href:`https://forms.gle/ccMv7oKwz6ysDHBe6`,target:`_blank`,rel:`noopener noreferrer`,children:`こちらのGoogleフォーム`}),`からお願いします。`]})]}),(0,$.jsxs)(`section`,{children:[(0,$.jsx)(`h3`,{children:`免責事項`}),(0,$.jsx)(`p`,{children:`本サイトの解説・問題・公式は学習目的で作成されており、内容の正確性・完全性を保証するものではありません。本サイトの情報を利用したことによるいかなる損害についても、運営者は責任を負いかねます。また、本サイトは統計検定への合格を保証するものではありません。`})]})]})},`about`):r===`guide`?(0,$.jsx)(i.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:(0,$.jsx)(ri,{})},`guide`):r===`usecase`?(0,$.jsx)(i.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:(0,$.jsx)(`div`,{dangerouslySetInnerHTML:{__html:si(window.location.pathname.startsWith(`/stats-pre1/`)?`/stats-pre1`:``)}})},`usecase`):r===`privacy`?(0,$.jsx)(i.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:(0,$.jsxs)(`div`,{className:`privacy-page`,children:[(0,$.jsx)(`h2`,{children:`プライバシーポリシー`}),(0,$.jsx)(`p`,{className:`privacy-updated`,children:`最終更新：2025年4月`}),(0,$.jsxs)(`section`,{children:[(0,$.jsx)(`h3`,{children:`1. サイトについて`}),(0,$.jsx)(`p`,{children:`本サイト「統計検定 準1級 学習リファレンス」は、統計検定準1級の学習を支援することを目的とした個人運営のサイトです。`}),(0,$.jsx)(`p`,{className:`privacy-disclaimer`,children:`⚠️ 本サイトは個人による学習支援サイトであり、統計質保証推進協会および日本統計学会の公式サイトではありません。掲載内容は個人の見解に基づくものであり、公式の情報を保証するものではありません。試験の出題範囲・申込方法・合否については、必ず公式サイトをご確認ください。`})]}),(0,$.jsxs)(`section`,{children:[(0,$.jsx)(`h3`,{children:`2. Google Analytics の利用について`}),(0,$.jsxs)(`p`,{children:[`本サイトでは、アクセス状況を把握するために `,(0,$.jsx)(`strong`,{children:`Google Analytics`}),`（Google LLC 提供）を使用しています。`]}),(0,$.jsxs)(`p`,{children:[(0,$.jsx)(`strong`,{children:`送信される情報の例：`}),`閲覧したページのURL・滞在時間・使用デバイス・おおまかな地域情報（IPアドレスから推定）など。これらの情報はCookieを通じてGoogleのサーバーに送信されます。個人を特定する情報は収集しません。`]}),(0,$.jsxs)(`p`,{children:[(0,$.jsx)(`strong`,{children:`利用目的：`}),`コンテンツ改善のためのアクセス分析`]}),(0,$.jsxs)(`p`,{children:[(0,$.jsx)(`strong`,{children:`オプトアウト：`}),(0,$.jsx)(`a`,{href:`https://tools.google.com/dlpage/gaoptout`,target:`_blank`,rel:`noopener noreferrer`,children:`Google アナリティクス オプトアウト アドオン`}),`をインストールすることで、データ送信を無効にできます。`]}),(0,$.jsxs)(`p`,{children:[`Googleのプライバシーポリシーは`,(0,$.jsx)(`a`,{href:`https://policies.google.com/privacy`,target:`_blank`,rel:`noopener noreferrer`,children:`こちら`}),`をご参照ください。`]})]}),(0,$.jsxs)(`section`,{children:[(0,$.jsx)(`h3`,{children:`3. Google AdSense の利用について`}),(0,$.jsxs)(`p`,{children:[`本サイトでは、広告配信のために `,(0,$.jsx)(`strong`,{children:`Google AdSense`}),`（Google LLC 提供）を使用しています。`]}),(0,$.jsxs)(`p`,{children:[(0,$.jsx)(`strong`,{children:`送信される情報の例：`}),`閲覧履歴・Cookieに保存された識別情報など。これらは広告のパーソナライズ（行動ターゲティング）に使用されます。`]}),(0,$.jsxs)(`p`,{children:[(0,$.jsx)(`strong`,{children:`利用目的：`}),`サイト運営費用の確保`]}),(0,$.jsxs)(`p`,{children:[(0,$.jsx)(`strong`,{children:`オプトアウト：`}),(0,$.jsx)(`a`,{href:`https://www.google.com/settings/ads`,target:`_blank`,rel:`noopener noreferrer`,children:`広告設定ページ`}),`でパーソナライズ広告を無効にできます。また、`,(0,$.jsx)(`a`,{href:`https://www.aboutads.info/choices/`,target:`_blank`,rel:`noopener noreferrer`,children:`Digital Advertising Alliance`}),` のオプトアウトツールもご利用いただけます。`]})]}),(0,$.jsxs)(`section`,{children:[(0,$.jsx)(`h3`,{children:`4. Cookieについて`}),(0,$.jsx)(`p`,{children:`本サイトでは、Google Analytics および Google AdSense の機能提供のためにCookieを使用しています。ブラウザの設定からCookieを無効にすることができますが、一部機能が正常に動作しない場合があります。`})]}),(0,$.jsxs)(`section`,{children:[(0,$.jsx)(`h3`,{children:`5. 学習進捗データについて`}),(0,$.jsxs)(`p`,{children:[`クイズの得点・完了状況は、お使いのブラウザの `,(0,$.jsx)(`strong`,{children:`ローカルストレージ`}),` にのみ保存されます。このデータは外部サーバーへ送信されることはなく、運営者も閲覧できません。ブラウザのデータ削除により消去されます。`]})]}),(0,$.jsxs)(`section`,{children:[(0,$.jsx)(`h3`,{children:`6. コンテンツの免責事項`}),(0,$.jsx)(`p`,{children:`本サイトの解説・問題・公式は学習目的で作成されており、内容の正確性を保証するものではありません。本サイトの情報を利用したことによるいかなる損害についても、運営者は責任を負いかねます。また、本サイトは統計検定への合格を保証するものではありません。`})]}),(0,$.jsxs)(`section`,{children:[(0,$.jsx)(`h3`,{children:`7. 本ポリシーの変更`}),(0,$.jsx)(`p`,{children:`本ポリシーは予告なく変更される場合があります。変更後のポリシーはこのページへの掲載をもって効力を生じます。`})]})]})},`privacy`):(0,$.jsxs)(i.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},children:[(0,$.jsx)(`div`,{className:`search-container`,style:{marginBottom:`2rem`},children:(0,$.jsxs)(`div`,{className:`search-input-wrapper`,children:[(0,$.jsx)(yr,{size:18,className:`search-icon`}),(0,$.jsx)(`input`,{type:`text`,placeholder:`用語を検索...`,value:o,onChange:e=>s(e.target.value),className:`search-input`}),o&&(0,$.jsx)(`button`,{onClick:()=>s(``),className:`search-clear`,children:(0,$.jsx)(Tr,{size:16})})]})}),(0,$.jsx)(`div`,{className:`glossary-grid`,children:Object.values(Un).filter(e=>!o||e.term.toLowerCase().includes(o.toLowerCase())||e.explanation.toLowerCase().includes(o.toLowerCase())).map(e=>{let t=le(e.id);return(0,$.jsxs)(`div`,{id:`glossary-${e.id}`,className:`card-glossary`,children:[(0,$.jsxs)(`div`,{className:`glossary-header`,children:[(0,$.jsx)(`h4`,{children:E(e.term)}),(0,$.jsx)(`span`,{className:`badge-level ${{基礎:`basic`,中級:`intermediate`,上級:`advanced`}[e.level]??`basic`}`,children:e.level})]}),(0,$.jsx)(`div`,{className:`glossary-explanation`,children:E(e.explanation)}),e.formula&&(0,$.jsx)(`div`,{className:`glossary-formula`,children:(0,$.jsx)(Lr,{formula:e.formula})}),e.relatedTerms&&e.relatedTerms.length>0&&(0,$.jsxs)(`div`,{className:`related-links`,children:[(0,$.jsx)(`p`,{className:`label-related`,children:`関連用語：`}),(0,$.jsx)(`div`,{className:`links-row`,children:e.relatedTerms.map(e=>Un[e]&&(0,$.jsxs)(`button`,{className:`btn-link`,onClick:()=>{document.getElementById(`glossary-${e}`)?.scrollIntoView({behavior:`smooth`,block:`center`})},children:[Un[e].term,` `,(0,$.jsx)(rr,{size:12})]},e))})]}),t.length>0&&(0,$.jsxs)(`div`,{className:`related-links`,children:[(0,$.jsx)(`p`,{className:`label-related`,children:`解説ページ：`}),(0,$.jsx)(`div`,{className:`links-row`,children:t.map(e=>(0,$.jsxs)(`button`,{className:`btn-link`,onClick:()=>b(e.id),children:[E(e.title),` `,(0,$.jsx)(rr,{size:12})]},e.id))})]})]},e.id)})})]},`glos`)})}),(0,$.jsxs)(`footer`,{className:`site-footer`,children:[(0,$.jsx)(`p`,{className:`footer-disclaimer`,children:`本サイトは個人による学習支援サイトであり、統計質保証推進協会および日本統計学会の公式サイトではありません。掲載内容は個人の見解に基づくものであり、公式の情報を保証するものではありません。`}),(0,$.jsxs)(`div`,{className:`footer-links`,children:[(0,$.jsx)(`button`,{className:`footer-link`,onClick:()=>x(`about`),children:`サイトについて`}),(0,$.jsx)(`button`,{className:`footer-link`,onClick:()=>x(`privacy`),children:`プライバシーポリシー`}),(0,$.jsx)(`a`,{className:`footer-link`,href:`https://study-apps.com/editorial-policy/`,children:`編集方針`}),(0,$.jsx)(`a`,{className:`footer-link`,href:`https://forms.gle/ccMv7oKwz6ysDHBe6`,target:`_blank`,rel:`noopener noreferrer`,children:`お問い合わせ`})]}),(0,$.jsxs)(`p`,{className:`footer-copy`,children:[`© `,new Date().getFullYear(),` 統計検定 準1級 学習リファレンス`]})]})]})}(0,ee.createRoot)(document.getElementById(`root`)).render((0,$.jsx)(y.StrictMode,{children:(0,$.jsx)(Si,{})}));