import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface AmortizationRow {
  date: string;
  openingBalance: number;
  interestExpense: number; // הוצאות מימון
  cashPaid: number; // ריבית ששולמה בפועל
  amortization: number; // הפחתת פרמיה/ניכיון
  closingBalance: number;
}

export interface AmortizationTableProps {
  title?: string;
  type: 'premium' | 'discount'; // פרמיה או ניכיון
  rows: AmortizationRow[];
}

export const AmortizationTable: React.FC<AmortizationTableProps> = ({ 
  title = 'לוח סילוקין', 
  type, 
  rows 
}) => {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <div className="w-full my-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-[var(--color-surface-alt)] p-4 border-b border-[var(--color-border)]">
        <h4 className="font-bold text-[var(--color-text)] text-lg">{title}</h4>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {type === 'premium' ? 'הפחתת פרמיה מקטינה את ערך האיגרת' : 'הפחתת ניכיון מגדילה את ערך האיגרת'}
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm whitespace-nowrap" dir="rtl">
          <thead>
            <tr className="bg-[var(--color-surface-raised)] border-b-2 border-[var(--color-border)]">
              <th className="px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">תאריך</th>
              <th className="px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">יתרת פתיחה</th>
              <th className="px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">הוצ' מימון</th>
              <th className="px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">תשלום מזומן</th>
              <th className="px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">הפחתה</th>
              <th className="px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">יתרת סגירה</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const isActive = activeRow === idx;
              return (
                <tr 
                  key={idx}
                  onClick={() => setActiveRow(isActive ? null : idx)}
                  className={`border-b border-[var(--color-border)]/50 last:border-0 cursor-pointer transition-colors ${
                    isActive ? 'bg-[var(--color-primary)]/10' : 'hover:bg-[var(--color-surface-alt)]'
                  }`}
                >
                  <td className={`px-4 py-4 text-start ${isActive ? 'font-bold text-[var(--color-primary)]' : 'text-[var(--color-text)]'}`}>
                    {row.date}
                  </td>
                  <td className="px-4 py-4 text-end font-mono">{row.openingBalance.toLocaleString()}</td>
                  <td className="px-4 py-4 text-end font-mono">{row.interestExpense.toLocaleString()}</td>
                  <td className="px-4 py-4 text-end font-mono">{row.cashPaid.toLocaleString()}</td>
                  <td className={`px-4 py-4 text-end font-mono ${type === 'premium' ? 'text-[var(--color-danger)]' : 'text-[var(--color-success)]'}`}>
                    {row.amortization.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-end font-mono font-bold text-[var(--color-text)]">
                    {row.closingBalance.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {activeRow !== null && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-[var(--color-primary)]/5 p-4 border-t border-[var(--color-primary)]/20"
        >
          <div className="text-sm text-[var(--color-text)] flex gap-2 justify-center items-center font-mono" dir="ltr">
            <span>{rows[activeRow].openingBalance.toLocaleString()}</span>
            {type === 'premium' ? <span className="text-[var(--color-danger)]">-</span> : <span className="text-[var(--color-success)]">+</span>}
            <span className={type === 'premium' ? 'text-[var(--color-danger)]' : 'text-[var(--color-success)]'}>
              {rows[activeRow].amortization.toLocaleString()}
            </span>
            <span>=</span>
            <span className="font-bold">{rows[activeRow].closingBalance.toLocaleString()}</span>
          </div>
          <p className="text-center text-xs text-[var(--color-text-secondary)] mt-2">
            יתרת הסגירה מחושבת על ידי יתרת הפתיחה {type === 'premium' ? 'פחות' : 'ועוד'} הפחתת ה{type === 'premium' ? 'פרמיה' : 'ניכיון'}.
          </p>
        </motion.div>
      )}
    </div>
  );
};
