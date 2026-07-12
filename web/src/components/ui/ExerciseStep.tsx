import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { Button } from './Button';

export interface ExerciseStepProps {
  title?: string;
  question: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function ExerciseStep({ title, question, children, defaultOpen = false }: ExerciseStepProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="exercise-block my-6">
      {title && <div className="exercise-number">{title}</div>}
      <div className="exercise-body whitespace-pre-wrap">
        {question}
      </div>
      
      {!isOpen && (
        <div className="mt-6">
          <Button onClick={() => setIsOpen(true)} variant="secondary" size="sm" className="gap-2 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-glow)]">
            <CheckCircle2 size={16} />
            הצג פתרון מודרך
          </Button>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden mt-8"
          >
            <div className="border-t-2 border-[var(--surface-alt)] pt-6">
              {children}
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                הסתר פתרון
                <ChevronDown size={16} className="rotate-180 mr-1" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
