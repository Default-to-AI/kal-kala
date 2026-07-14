
export interface LessonBlockProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'definition' | 'casual' | 'formal';
}

export function LessonBlock({ title, children, className = '', variant = 'default' }: LessonBlockProps) {
  if (variant === 'definition') {
    return (
      <div className={`definition-block mb-12 ${className}`}>
        {title && <div className="def-term">{title}</div>}
        {children}
      </div>
    );
  }

  if (variant === 'casual' || variant === 'formal') {
    const toneClass = variant === 'casual' ? 'casual-block' : 'formal-block';
    const roleBadge = variant === 'casual' ? 'role-casual' : 'role-formal';
    const roleText = variant === 'casual' ? 'Plus Jakarta Sans — לא פורמלי' : 'David Libre — פורמלי';
    const fontClass = variant === 'casual' ? 't-casual' : 't-formal';
    
    return (
      <div className={`tone-block ${toneClass} mb-12 ${className}`}>
        {title && <h4 className={variant === 'formal' ? 't-formal-title mb-4' : 't-h3 mb-4'}>{title}</h4>}
        <div className={fontClass}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <section className={`mb-12 ${className}`}>
      {title && (
        <h2 className="t-h2 text-[var(--color-text-primary)] mb-6 pb-2 border-b-2 border-[var(--color-surface-raised)] inline-block">
          {title}
        </h2>
      )}
      <div className="t-formal text-[var(--color-text-primary)] opacity-90 space-y-4">
        {children}
      </div>
    </section>
  );
}
