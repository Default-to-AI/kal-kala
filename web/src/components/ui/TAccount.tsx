import React from 'react';

export interface TAccountEntry {
  amount: number;
  description?: string;
  isDebit: boolean;
}

export interface TAccountProps {
  title: string;
  entries: TAccountEntry[];
}

export const TAccount: React.FC<TAccountProps> = ({ title, entries }) => {
  const debits = entries.filter((e) => e.isDebit);
  const credits = entries.filter((e) => !e.isDebit);

  const totalDebits = debits.reduce((sum, e) => sum + e.amount, 0);
  const totalCredits = credits.reduce((sum, e) => sum + e.amount, 0);
  
  const balance = Math.abs(totalDebits - totalCredits);
  const isDebitBalance = totalDebits >= totalCredits;

  return (
    <div className="w-full max-w-sm mx-auto my-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-sm">
      <div className="bg-[var(--color-surface-alt)] p-3 text-center border-b border-[var(--color-border)] font-bold text-[var(--color-text)]">
        {title}
      </div>
      
      <div className="flex">
        {/* Debit Side (Right in RTL, but we need it strictly visual according to accounting norms in Hebrew: 
            חובה (Debit) is usually on the Right side of the T, and זכות (Credit) is on the Left side ) */}
        <div className="w-1/2 border-l border-[var(--color-border)] p-0">
          <div className="text-center py-2 text-xs font-bold text-[var(--color-text-secondary)] border-b border-[var(--color-border)]/50 bg-[var(--color-success)]/5">
            חובה (₪)
          </div>
          <div className="p-2 min-h-[100px] flex flex-col gap-1">
            {debits.map((entry, idx) => (
              <div key={idx} className="flex justify-between text-sm items-center hover:bg-[var(--color-surface-alt)] p-1 rounded transition-colors">
                <span className="text-[10px] text-[var(--color-text-tertiary)] truncate w-1/2" title={entry.description}>{entry.description}</span>
                <span className="font-mono text-[var(--color-text)]">{entry.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Credit Side */}
        <div className="w-1/2 p-0">
          <div className="text-center py-2 text-xs font-bold text-[var(--color-text-secondary)] border-b border-[var(--color-border)]/50 bg-[var(--color-danger)]/5">
            זכות (₪)
          </div>
          <div className="p-2 min-h-[100px] flex flex-col gap-1">
            {credits.map((entry, idx) => (
              <div key={idx} className="flex justify-between text-sm items-center hover:bg-[var(--color-surface-alt)] p-1 rounded transition-colors">
                <span className="font-mono text-[var(--color-text)]">{entry.amount.toLocaleString()}</span>
                <span className="text-[10px] text-[var(--color-text-tertiary)] truncate w-1/2 text-left" title={entry.description}>{entry.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="border-t-2 border-[var(--color-border)] flex">
        <div className="w-1/2 p-2 text-left border-l border-[var(--color-border)]">
          {isDebitBalance && (
            <span className="font-bold font-mono text-[var(--color-success)] block w-full">
              {balance.toLocaleString()}
            </span>
          )}
        </div>
        <div className="w-1/2 p-2 text-right">
          {!isDebitBalance && (
            <span className="font-bold font-mono text-[var(--color-danger)] block w-full">
              {balance.toLocaleString()}
            </span>
          )}
        </div>
      </div>
      
      <div className="bg-[var(--color-surface-alt)] p-2 text-center text-xs text-[var(--color-text-secondary)] font-medium">
        יתרת {isDebitBalance ? 'חובה' : 'זכות'}: {balance.toLocaleString()} ₪
      </div>
    </div>
  );
};
