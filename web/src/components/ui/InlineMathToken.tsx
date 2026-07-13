import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface InlineMathTokenProps {
  math: string;
  className?: string;
}

/**
 * Inline math typeset via KaTeX directly. We deliberately do NOT use
 * `react-katex` here: its `peerDependencies` (`react: ">=15.3.2 <20"`)
 * excludes React 19, so its `<InlineMath>` component silently fails to
 * typeset and renders the LaTeX source verbatim — which is the `\cdot`
 * / `\sigma` / `\dfrac` raw-text symptom on the site.
 *
 * KaTeX core itself is React-version agnostic: calling
 * `katex.renderToString` once and injecting the result via
 * `dangerouslySetInnerHTML` is the canonical React-friendly pattern.
 * `throwOnError: false` keeps a bad macro from crashing the page.
 */
export function InlineMathToken({ math, className = '' }: InlineMathTokenProps) {
  const html = useMemo(
    () =>
      katex.renderToString(math, {
        throwOnError: false,
        displayMode: false,
      }),
    [math]
  );

  return (
    <span
      className={className}
      data-math={math}
      data-testid="katex-inline"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
