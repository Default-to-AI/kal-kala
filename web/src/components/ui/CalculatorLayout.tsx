import { Card } from './Card';
import { Calculator } from 'lucide-react';

interface CalculatorLayoutProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  inputs: React.ReactNode;
  results: React.ReactNode;
  hasData: boolean;
  emptyStateMessage?: string;
}

export function CalculatorLayout({
  title,
  description,
  inputs,
  results,
  hasData,
  emptyStateMessage = 'הזן נתונים כדי להתחיל בחישוב',
}: CalculatorLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="t-h2 text-[var(--color-text-primary)] mb-2">{title}</h2>
        {description && <div className="t-casual text-[var(--color-text-primary)] opacity-85">{description}</div>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Inputs Column - Right side on RTL (lg:col-span-5) */}
        <div className="lg:col-span-5 w-full">
          {inputs}
        </div>

        {/* Results Column - Left side on RTL (lg:col-span-7) */}
        <div className="lg:col-span-7 w-full sticky top-24">
          {hasData ? (
            results
          ) : (
            <Card className="flex flex-col items-center justify-center p-12 text-center min-h-[400px] border-dashed border-2 border-[var(--color-surface-raised)] bg-transparent">
              <div className="w-16 h-16 rounded-full bg-[var(--color-surface-raised)] flex items-center justify-center mb-4 text-[var(--color-text-secondary)]">
                <Calculator size={32} />
              </div>
              <h3 className="t-h3 text-[var(--color-text-primary)] mb-2">ממתין לנתונים</h3>
              <p className="t-casual text-[var(--color-text-secondary)] max-w-sm">
                {emptyStateMessage}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
