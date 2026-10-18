// stats-app/src/components/MathDisplay.tsx
import React, { useMemo, useRef, useLayoutEffect } from 'react';
import katex from 'katex';

interface Props {
  formula: string;
  block?: boolean;
  /** 文章の途中に置く数式（本文・問題・解説の $...$）。行の途中で折り返させ、縮小はしない */
  wrap?: boolean;
}


/**
 * 🔒 数式が画面幅に収まらない問題への共通対策（2026-10-07 新設・ユーザー指摘
 *    「数式が途中で切れているように表示される」「他のモジュールでも問題が発生している」）。
 *
 * 実測（本番46ページ・390px幅）＝**23ページで横はみ出し**。最大は包除原理の3事象の式で
 * **必要682px 対 画面390px**。つまりレイアウト調整だけでは原理的に収まらないものが在る。
 *
 * サイト内で数式を出す経路は5つ（本文の $$／本文の $／モジュールの主要公式／公式集／用語集）あるが、
 * **全部がこの MathDisplay を通る**ので、ここ1箇所で直す。
 *
 * やり方＝描画後に実測し、収まるまで font-size を下げる。ただし下限を設ける
 * （小さくしすぎると読めない＝直したことにならない）。下限でも収まらない式はスクロールを残すが、
 * そのときは**左寄せに切り替える**＝中央寄せのままだと左右とも切れて「途中から」表示され、
 * これがユーザーの言う「途中で切れている」の見え方そのものだった。
 */
const MIN_SCALE = 0.62;   // 1.21em × 0.62 ≒ 0.75em ≒ 12px。これ未満には縮めない

function useFitToWidth(deps: unknown, enabled = true) {
  const ref = useRef<HTMLElement>(null) as React.RefObject<HTMLDivElement>;
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let disposed = false;
    const fit = () => {
      if (disposed) return;
      el.style.fontSize = '';
      el.classList.remove('math-overflowing');
      const avail = el.clientWidth;
      // ⚠️ 幅が取れない回で諦めない。初版は `if (!avail) return` で抜けており、
      //    レイアウト確定前に1度走ったきり二度と走らず、**ブロック数式に一切効いていなかった**
      //    （実測＝fontSize が未設定のまま 366px はみ出していた）。幅が出るまで次フレームで粘る。
      if (!avail) { requestAnimationFrame(fit); return; }
      // ⚠️ 外側のラッパーの scrollWidth で測ってはいけない。
      //    KaTeX は displayMode のとき **自分でも `katex-display` クラスの span を出す**ので、
      //    CSS の `.katex-display{overflow-x:auto}` がその内側 span にも効き、
      //    内側がはみ出しを吸収して **外側は over=0 に見える**（実測で判明）。
      //    本当の必要幅は、いちばん内側の `.katex` の scrollWidth。
      // ⚠️ インライン経路では .katex が display:inline なので scrollWidth が **0** になる（2026-10-18 実測）。
      //    内側だけで測るとインラインの式は一度も縮まなかった。外側と内側の大きいほうを必要幅とする。
      const inner = el.querySelector('.katex') as HTMLElement | null;
      const need = Math.max(inner ? inner.scrollWidth : 0, el.scrollWidth);
      // 許容3px：inline-block の .katex-inline は縮めても常に 2px 余る（KaTeX の余白・実測で文字は切れていない）
      if (need <= avail + 3) return;
      const ratio = Math.max(MIN_SCALE, avail / need);
      el.style.fontSize = `${(ratio * 100).toFixed(1)}%`;
      // 縮めても収まらないならスクロールが残る。先頭から読めるように左寄せへ。
      const after = Math.max((el.querySelector('.katex') as HTMLElement | null)?.scrollWidth ?? 0, el.scrollWidth);
      if (after > el.clientWidth + 3) el.classList.add('math-overflowing');
    };
    // 初回・次フレーム・フォント読込後の3回まわす。
    // KaTeX は独自フォントを使うので、フォントが載る前に測ると幅が変わり判定を誤る。
    fit();
    requestAnimationFrame(fit);
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(fit).catch(() => {});
    }
    // ⚠️ 監視するのは「親」。自分を監視すると font-size 変更→高さ変化→再発火で無限ループになる。
    const parent = el.parentElement;
    let ro: ResizeObserver | undefined;
    if (parent && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(fit);
      ro.observe(parent);
    }
    return () => { disposed = true; ro?.disconnect(); };
  }, [deps, enabled]);
  return ref;
}

export const MathDisplay: React.FC<Props> = ({ formula, block, wrap }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(formula, {
        displayMode: block,
        throwOnError: false,
        output: 'html' // Ensure HTML output
      });
    } catch (e) {
      console.error('KaTeX rendering error:', e);
      return formula;
    }
  }, [formula, block]);

  const fitRef = useFitToWidth(html, !wrap);


  if (!block && wrap) {
    // 🔒 文章中の数式は折り返す（2026-10-18 ユーザー指摘「スマホ画面だと数式が切れてるように見える」）。
    //    inline-block＋nowrap のままだと、長い等式の連鎖が行幅で切れ、後ろはスクロールしないと見えなかった。
    //    KaTeX は = や + の後ろで改行できるので、普通のインラインに戻して文章と一緒に折り返させる。
    return <span className="katex-wrap" dangerouslySetInnerHTML={{ __html: html }} />;
  }

  if (!block) {
    // ⚠️ 主要公式パネル・公式集・用語集は block を渡さないので**ここを通る**（5経路のうち3つ）。
    //    つまりインライン側にも自動縮小が要る。CSS 側で inline-block + overflow-x を与えてある。
    return (
      <span
        ref={fitRef as unknown as React.RefObject<HTMLSpanElement>}
        className="katex-inline"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div className="math-block-container" style={{ margin: '1rem 0' }}>
      <div
        ref={fitRef}
        className="katex-display"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      
    </div>
  );
};
