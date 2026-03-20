// stats-app/src/components/MathDisplay.tsx
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathDisplayProps {
  formula: string;
  block?: boolean;
}

export const MathDisplay = ({ formula, block = false }: MathDisplayProps) => {
  return block ? (
    <div className="katex-block">
      <BlockMath math={formula} />
    </div>
  ) : (
    <InlineMath math={formula} />
  );
};
