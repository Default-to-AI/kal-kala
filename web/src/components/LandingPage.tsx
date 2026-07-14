import { Link } from 'react-router-dom';
import { Card } from './ui/Card';

export function LandingPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h1 className="t-hero text-5xl md:text-7xl mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>Kal-Kala</h1>
        <p className="t-casual text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          פלטפורמת למידה אינטראקטיבית לחשבונאות פיננסית.
          למידה דרך סיכומי שיעור ותרגול מודרך צעד-אחר-צעד.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="t-h2 text-2xl mb-4 border-b-2 border-[var(--color-surface-raised)] pb-2 inline-block">פרק 1: הון עצמי</h2>
          
          <Link to="/equity" className="block group">
            <Card className="p-6 transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--accent-glow)]">
              <h3 className="t-h3 text-xl mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]">מרכיבי ההון העצמי</h3>
              <p className="t-casual text-[var(--color-text-secondary)] text-sm">מהות ההון, סוגי מניות, פרמיה, דיבידנד ומניות הטבה.</p>
            </Card>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="t-h2 text-2xl mb-4 border-b-2 border-[var(--color-surface-raised)] pb-2 inline-block">פרק 2: דוח על שינויים בהון</h2>
          
          <Link to="/changes-in-equity" className="block group">
            <Card className="p-6 transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--accent-glow)]">
              <h3 className="t-h3 text-xl mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]">הדוח על השינויים בהון העצמי</h3>
              <p className="t-casual text-[var(--color-text-secondary)] text-sm">תרגול מקיף ומודרך (חברת אבי, שניר ואיתי) של פקודות יומן ודוח שינויים מלא.</p>
            </Card>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="t-h2 text-2xl mb-4 border-b-2 border-[var(--color-surface-raised)] pb-2 inline-block">פרק 3: התחייבויות לטווח ארוך</h2>
          
          <Link to="/loans" className="block group">
            <Card className="p-6 transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--accent-glow)]">
              <h3 className="t-h3 text-xl mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]">הלוואות וחתך ריבית</h3>
              <p className="t-casual text-[var(--color-text-secondary)] text-sm">תרגול מודרך (חברת חגים) להלוואות, חישוב ריבית נצברת וסיווג לחלויות שוטפות במאזן.</p>
            </Card>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="t-h2 text-2xl mb-4 border-b-2 border-[var(--color-surface-raised)] pb-2 inline-block">פרק 4: איגרות חוב</h2>
          
          <Link to="/bonds" className="block group">
            <Card className="p-6 transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--accent-glow)]">
              <h3 className="t-h3 text-xl mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]">אג״ח (הפחתה בקו ישר)</h3>
              <p className="t-casual text-[var(--color-text-secondary)] text-sm">תרגול מודרך (חברת שניר, חברת דלל) להנפקת אג״ח בפרמיה/ניכיון והפחתה לאורך זמן.</p>
            </Card>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="t-h2 text-2xl mb-4 border-b-2 border-[var(--color-surface-raised)] pb-2 inline-block">פרק 5: ניירות ערך סחירים</h2>
          
          <Link to="/securities" className="block group">
            <Card className="p-6 transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--accent-glow)]">
              <h3 className="t-h3 text-xl mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]">השקעות בניירות ערך (FVTPL)</h3>
              <p className="t-casual text-[var(--color-text-secondary)] text-sm">תרגול מודרך לשערוך שווי הוגן של מניות המוחזקות למסחר, טיפול בדיבידנדים ורישום רבעוני.</p>
            </Card>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="t-h2 text-2xl mb-4 border-b-2 border-[var(--color-surface-raised)] pb-2 inline-block">פרק 6: השקעה בחברה כלולה</h2>
          
          <Link to="/equity-method" className="block group">
            <Card className="p-6 transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--accent-glow)]">
              <h3 className="t-h3 text-xl mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]">שיטת השווי המאזני</h3>
              <p className="t-casual text-[var(--color-text-secondary)] text-sm">תרגול מודרך (חברת ברצלונה ומדריד) - חישוב הפרש מקורי, רווחי אקוויטי ורישום בכרטיס ההשקעה.</p>
            </Card>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="t-h2 text-2xl mb-4 border-b-2 border-[var(--color-surface-raised)] pb-2 inline-block">פרק 7: דוח תזרים מזומנים</h2>

          <Link to="/cash-flow" className="block group">
            <Card className="p-6 transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--accent-glow)]">
              <h3 className="t-h3 text-xl mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]">מבסיס צבירה למזומן</h3>
              <p className="t-casual text-[var(--color-text-secondary)] text-sm">תרגול מודרך (חברת צמאים לחופש) לשחזור כרטיסים וסיווג לפעילות שוטפת, השקעה ומימון.</p>
            </Card>
          </Link>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="t-h2 text-2xl mb-4 border-b-2 border-[var(--color-surface-raised)] pb-2 inline-block text-[var(--color-accent-brass)]">
          מבחנים והערכה
        </h2>
        <p className="t-casual text-sm text-[var(--color-text-secondary)] max-w-2xl mb-6">
          מבחנים משנים קודמות עם פתרונות מלאים, מלכודות נפוצות ושאלות אמריקאיות לחזרה מהירה.
          המתג הראשי חושף את כל הפתרונות — נסו לפתור לבד קודם.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/exam-2017-moed-b" className="block group">
            <Card className="p-6 transition-all duration-300 hover:border-[var(--color-accent-brass)] hover:shadow-lg hover:shadow-[var(--accent-glow)] border-[var(--color-accent-brass)]/30">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="t-h3 text-xl text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-brass)]">
                  מבחן חשבונאות ב׳ — מועד ב׳, תשע״ז
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent-brass)] bg-[var(--color-accent-brass)]/15 border border-[var(--color-accent-brass)]/30 rounded-full px-2 py-0.5 shrink-0">
                  Phase 1
                </span>
              </div>
              <p className="t-casual text-[var(--color-text-secondary)] text-sm">
                13.7.2017 · מרצה: עדי ריינהולד. 4 שאלות (תזרים 33%, הון 27%, שווי מאזני 20%,
                אג״ח 20%). שאלה 1 כוללת פתרון מלא ו-2 שאלות אמריקאיות; שאלות 2-4 ממתינות
                ל-Phase 2.
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
