import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { InlineMath } from 'react-katex';

export interface JournalEntryRow {
  account: string;
  debit?: number | string;
  credit?: number | string;
  isDebit: boolean;
}

export interface JournalEntryProps {
  date?: string;
  description?: string;
  entries: JournalEntryRow[];
  explanation?: React.ReactNode;
  title?: string;
}

export const JournalEntry: React.FC<JournalEntryProps> = ({
  date,
  description,
  entries,
  explanation,
  title = 'פקודת יומן',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-6 border border-[var(--color-border)] rounded-xl overflow-hidden bg-[var(--color-surface)] shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="flex items-center justify-between p-4 bg-[var(--color-surface-alt)] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-[var(--color-primary)]/10 p-2 rounded-lg text-[var(--color-primary)]">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-[var(--color-text)]">{title}</h4>
            {date && <span className="text-xs text-[var(--color-text-secondary)]">{date}</span>}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {description && (
            <span className="text-sm font-medium text-[var(--color-text-secondary)] hidden sm:block">
              {description}
            </span>
          )}
          <button 
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors p-1"
            aria-label="Toggle Journal Entry"
          >
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-[var(--color-border)] overflow-hidden"
          >
            <div className="p-4 sm:p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
                  <thead>
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="pb-3 font-semibold text-[var(--color-text-secondary)] w-1/2">חשבון</th>
                      <th className="pb-3 font-semibold text-[var(--color-text-secondary)] text-left w-1/4">חובה (₪)</th>
                      <th className="pb-3 font-semibold text-[var(--color-text-secondary)] text-left w-1/4">זכות (₪)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, index) => (
                      <tr 
                        key={index} 
                        className={`border-b border-[var(--color-border)]/50 last:border-0 ${
                          entry.isDebit ? 'bg-[var(--color-success)]/5' : 'bg-[var(--color-danger)]/5'
                        }`}
                      >
                        <td className={`py-3 text-[var(--color-text)] font-medium ${!entry.isDebit ? 'pr-8' : ''}`}>
                          {entry.account}
                        </td>
                        <td className="py-3 text-left font-mono font-medium text-[var(--color-success)]">
                          {entry.debit ? entry.debit.toLocaleString() : ''}
                        </td>
                        <td className="py-3 text-left font-mono font-medium text-[var(--color-danger)]">
                          {entry.credit ? entry.credit.toLocaleString() : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {explanation && (
                <div className="mt-4 p-3 bg-[var(--color-surface-alt)] rounded-lg text-sm text-[var(--color-text-secondary)]">
                  <strong className="text-[var(--color-text)] block mb-1">הסבר:</strong>
                  {explanation}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
