import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SiteFooter() {
  return (
    <motion.footer 
      className="border-t border-[var(--color-surface-raised)] bg-[var(--color-surface)] shadow-[0_-16px_40px_rgba(0,0,0,0.5)] rounded-t-[2.5rem] mt-16 w-full max-w-[1800px] mx-auto overflow-hidden" 
      dir="rtl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto px-5 py-10 sm:px-10">
        {/* Main grid */}
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr]">

          {/* About column */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <GraduationCap
                className="h-5 w-5 text-[var(--color-primary)]"
                strokeWidth={1.6}
              />
              <span className="font-semibold text-[var(--color-text-primary)]">
                אודות קל-כלה
              </span>
            </div>
            <p className="max-w-sm text-sm font-medium leading-7 text-[var(--color-text-secondary)]">
              פלטפורמת למידה אינטראקטיבית לסטודנטים לחשבונאות פיננסית.
              נבנה כדי להציג את הדרך הפורמלית לחישובים והצגת דוחות, תוך שימוש בעזרים ויזואליים שמפשטים את החומר.
            </p>
            <p className="text-xs font-semibold text-[var(--color-text-secondary)] opacity-60">
              פרויקט לימודי.
            </p>
          </section>

          {/* Quick nav column */}
          <nav aria-label="ניווט מהיר" className="space-y-4">
            <h3 className="text-md font-bold text-[var(--color-text-primary)]">
              פרקים
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/equity" className="hover:text-[var(--color-primary)] transition-colors">
                  פרק 1: הון עצמי
                </Link>
              </li>
              <li>
                <Link to="/changes-in-equity" className="hover:text-[var(--color-primary)] transition-colors">
                  פרק 2: שינויים בהון העצמי
                </Link>
              </li>
              <li>
                <Link to="/loans" className="hover:text-[var(--color-primary)] transition-colors">
                  פרק 3: הלוואות (התחייבויות לזמן ארוך)
                </Link>
              </li>
              <li>
                <Link to="/bonds" className="hover:text-[var(--color-primary)] transition-colors">
                  פרק 4: איגרות חוב
                </Link>
              </li>
              <li>
                <Link to="/securities" className="hover:text-[var(--color-primary)] transition-colors">
                  פרק 5: ניירות ערך סחירים
                </Link>
              </li>
              <li>
                <Link to="/equity-method" className="hover:text-[var(--color-primary)] transition-colors">
                  פרק 6: השקעה בחברה כלולה (שווי מאזני)
                </Link>
              </li>
              <li>
                <Link to="/cash-flow" className="hover:text-[var(--color-primary)] transition-colors">
                  פרק 7: דוח תזרים מזומנים
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex items-center justify-between border-t border-[var(--color-surface-raised)] pt-5 text-xs font-semibold text-[var(--color-text-secondary)]">
          <span>כל הזכויות שמורות | 2026</span>
        </div>
      </div>
    </motion.footer>
  );
}
