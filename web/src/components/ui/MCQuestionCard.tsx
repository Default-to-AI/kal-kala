import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { InlineMathToken } from './InlineMathToken';
import { Card } from './Card';
import { Badge } from './Badge';
import { InsightBlock } from './FormulaBlock';

const CONTENT_WIDTH_CLASS = 'w-full max-w-[70rem] mx-auto';

export interface MCOption {
  label: string;
  /** KaTeX expression for the option (use when the answer is mathematical). */
  latex?: string;
  /** Plain-text answer (use for Hebrew/prose options; renders without math mode). */
  text?: string;
  correct?: boolean;
}

export interface MCQuestionCardProps {
  id: string;
  /** When rendered inside a titled accordion, pass empty to hide the duplicate prompt header. */
  prompt?: string;
  options: MCOption[];
  rationale?: React.ReactNode;
  /**
   * Visual variant of the prompt + options presentation:
   *  - "default": options as bordered buttons (interactive state machine).
   *  - "reveal":  renders as a static answers panel where the correct option is highlighted (legacy behavior, kept for compat).
   */
  mode?: 'interactive' | 'reveal';
}

export function MCQuestionCard({
  id,
  prompt,
  options,
  rationale,
  mode = 'interactive',
}: MCQuestionCardProps): React.ReactElement {
  const correctOption = options.find((opt) => opt.correct);

  if (mode === 'reveal' || !correctOption) {
    return (
      <Card variant="default" className={CONTENT_WIDTH_CLASS} id={id}>
        {prompt ? (
          <div className="border-b border-[var(--color-border)] px-4 py-3 sm:px-5">
            <p className="text-right text-base font-semibold leading-relaxed text-[var(--color-text-primary)] sm:text-lg">
              {prompt}
            </p>
          </div>
        ) : null}

        <div className="divide-y divide-[var(--color-border)]">
          {options.map((opt) => {
            const isCorrect = Boolean(opt.correct);
            return (
              <div
                key={opt.label}
                className={`flex items-center gap-3 px-4 py-3 text-right transition-colors sm:px-5 ${
                  isCorrect ? 'bg-[var(--color-success)]/8' : 'bg-transparent'
                }`}
              >
                <span
                  className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-sm font-bold ${
                    isCorrect
                      ? 'border-[var(--color-success)]/40 bg-[var(--color-success)]/12 text-[var(--color-success)]'
                      : 'border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  {opt.label}
                </span>
                <span className="flex-1 text-right text-base text-[var(--color-text-primary)]">
                  {opt.text ? (
                    <span className="inline-block">{opt.text}</span>
                  ) : (
                    <InlineMathToken math={opt.latex ?? ''} />
                  )}
                </span>
                {isCorrect ? (
                  <Badge variant="success" className="shrink-0 gap-1">
                    <CheckCircle2 size={14} /> תשובה נכונה
                  </Badge>
                ) : null}
              </div>
            );
          })}
        </div>

        {rationale ? (
          <div className="border-t border-[var(--color-border)] px-4 py-3 sm:px-5">
            <InsightBlock>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--color-success)]" />
                <div className="text-right text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {rationale}
                </div>
              </div>
            </InsightBlock>
          </div>
        ) : null}
      </Card>
    );
  }

  // ── Interactive mode: click → reveal correct/wrong ──
  return <InteractiveMCQ id={id} prompt={prompt} options={options} rationale={rationale} />;
}

function InteractiveMCQ({
  id,
  prompt,
  options,
  rationale,
}: MCQuestionCardProps): React.ReactElement {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const correctOption = options.find((opt) => opt.correct)!;

  const handleSelect = (label: string) => {
    if (revealed) return; // lock once answered
    setSelected(label);
    // small delay so the user sees the selection animation, then reveal
    window.setTimeout(() => setRevealed(true), 350);
  };

  const handleReset = () => {
    setSelected(null);
    setRevealed(false);
  };

  const isCorrectChoice = revealed && selected === correctOption.label;

  return (
    <Card variant="default" className={CONTENT_WIDTH_CLASS} id={id}>
      {prompt ? (
        <div className="border-b border-[var(--color-border)] px-4 py-3 sm:px-5">
          <p className="text-right text-base font-semibold leading-relaxed text-[var(--color-text-primary)] sm:text-lg">
            {prompt}
          </p>
        </div>
      ) : null}

      <div className="divide-y divide-[var(--color-border)]">
        {options.map((opt) => {
          const isCorrect = Boolean(opt.correct);
          const isSelected = selected === opt.label;

          let rowTone = 'bg-transparent hover:bg-[var(--color-surface-raised)]';
          let badgeTone = 'border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)]';

          if (revealed) {
            if (isCorrect) {
              rowTone = 'bg-[var(--color-success)]/10';
              badgeTone = 'border-[var(--color-success)]/40 bg-[var(--color-success)]/12 text-[var(--color-success)]';
            } else if (isSelected) {
              rowTone = 'bg-[var(--color-error)]/10';
              badgeTone = 'border-[var(--color-error)]/40 bg-[var(--color-error)]/12 text-[var(--color-error)]';
            }
          } else if (isSelected) {
            rowTone = 'bg-[var(--color-accent-cobalt-bg)]';
            badgeTone = 'border-[var(--color-accent-cobalt)]/50 bg-[var(--color-accent-cobalt)]/15 text-[var(--color-accent-cobalt)]';
          }

          return (
            <button
              type="button"
              key={opt.label}
              onClick={() => handleSelect(opt.label)}
              disabled={revealed}
              aria-pressed={isSelected}
              className={`flex w-full items-center gap-3 px-4 py-3 text-right transition-colors sm:px-5 ${rowTone} ${
                revealed ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <span
                className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-sm font-bold transition-colors ${badgeTone}`}
              >
                {opt.label}
              </span>
              <span className="flex-1 text-right text-base text-[var(--color-text-primary)]">
                {opt.text ? (
                  <span className="inline-block">{opt.text}</span>
                ) : (
                  <InlineMathToken math={opt.latex ?? ''} />
                )}
              </span>
              {revealed && isCorrect ? (
                <Badge variant="success" className="shrink-0 gap-1">
                  <CheckCircle2 size={14} /> נכון
                </Badge>
              ) : revealed && isSelected ? (
                <Badge className="shrink-0 gap-1 bg-[var(--color-error)]/15 text-[var(--color-error)] border-[var(--color-error)]/40">
                  <XCircle size={14} /> לא נכון
                </Badge>
              ) : null}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-[var(--color-border)] px-4 py-3 sm:px-5"
          >
            <div
              className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${
                isCorrectChoice
                  ? 'border-[var(--color-success)]/40 bg-[var(--color-success)]/10 text-[var(--color-success)]'
                  : 'border-[var(--color-accent-cobalt)]/40 bg-[var(--color-accent-cobalt)]/10 text-[var(--color-accent-cobalt)]'
              }`}
            >
              {isCorrectChoice ? <Sparkles size={14} /> : <CheckCircle2 size={14} />}
              {isCorrectChoice ? 'כל הכבוד! ענית נכון' : 'התשובה הנכונה'}
            </div>

            {rationale ? (
              <InsightBlock>
                <div className="flex items-start gap-2">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-[var(--color-success)]"
                  />
                  <div className="text-right text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {rationale}
                  </div>
                </div>
              </InsightBlock>
            ) : null}

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-[var(--color-text-secondary)] underline-offset-4 hover:text-[var(--color-accent-cobalt)] hover:underline"
              >
                נסה שוב
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default MCQuestionCard;
