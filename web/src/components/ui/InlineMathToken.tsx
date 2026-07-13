import { InlineMath } from 'react-katex';

interface InlineMathTokenProps {
  math: string;
  className?: string;
}

export function InlineMathToken({ math, className = '' }: InlineMathTokenProps) {
  return <InlineMath math={math} />;
}
