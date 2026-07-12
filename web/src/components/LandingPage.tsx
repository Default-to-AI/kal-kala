import { Link } from 'react-router-dom';
import { Card } from './ui/Card';

export function LandingPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h1 className="t-hero text-5xl md:text-7xl mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>Kal-Kala</h1>
        <p className="t-casual text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
          פלטפורמת למידה אינטראקטיבית לחשבונאות פיננסית.
          למידה דרך סיכומי שיעור ותרגול מודרך צעד-אחר-צעד.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="t-h2 text-2xl mb-4 border-b-2 border-[var(--surface-alt)] pb-2 inline-block">פרק 1: הון עצמי</h2>
          
          <Link to="/equity" className="block group">
            <Card className="p-6 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent-glow)]">
              <h3 className="t-h3 text-xl mb-2 text-[var(--text)] group-hover:text-[var(--accent)]">מרכיבי ההון העצמי</h3>
              <p className="t-casual text-[var(--text-muted)] text-sm">מהות ההון, סוגי מניות, פרמיה, דיבידנד ומניות הטבה.</p>
            </Card>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="t-h2 text-2xl mb-4 border-b-2 border-[var(--surface-alt)] pb-2 inline-block">פרק 2: דוח שינויים בהון</h2>
          
          <Link to="/changes-in-equity" className="block group">
            <Card className="p-6 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent-glow)]">
              <h3 className="t-h3 text-xl mb-2 text-[var(--text)] group-hover:text-[var(--accent)]">הדוח על השינויים בהון העצמי</h3>
              <p className="t-casual text-[var(--text-muted)] text-sm">תרגול מקיף ומודרך (חברת אבי, שניר ואיתי) של פקודות יומן ודוח שינויים מלא.</p>
            </Card>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="t-h2 text-2xl mb-4 border-b-2 border-[var(--surface-alt)] pb-2 inline-block">פרק 3: התחייבויות לטווח ארוך</h2>
          
          <Link to="/loans" className="block group">
            <Card className="p-6 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent-glow)]">
              <h3 className="t-h3 text-xl mb-2 text-[var(--text)] group-hover:text-[var(--accent)]">הלוואות וחתך ריבית</h3>
              <p className="t-casual text-[var(--text-muted)] text-sm">תרגול מודרך (חברת חגים) להלוואות, חישוב ריבית נצברת וסיווג לחלויות שוטפות במאזן.</p>
            </Card>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="t-h2 text-2xl mb-4 border-b-2 border-[var(--surface-alt)] pb-2 inline-block">פרק 4: איגרות חוב</h2>
          
          <Link to="/bonds" className="block group">
            <Card className="p-6 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent-glow)]">
              <h3 className="t-h3 text-xl mb-2 text-[var(--text)] group-hover:text-[var(--accent)]">אג״ח (הפחתה בקו ישר)</h3>
              <p className="t-casual text-[var(--text-muted)] text-sm">תרגול מודרך (חברת שניר, חברת דלל) להנפקת אג״ח בפרמיה/ניכיון והפחתה לאורך זמן.</p>
            </Card>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="t-h2 text-2xl mb-4 border-b-2 border-[var(--surface-alt)] pb-2 inline-block">פרק 5: ניירות ערך סחירים</h2>
          
          <Link to="/securities" className="block group">
            <Card className="p-6 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent-glow)]">
              <h3 className="t-h3 text-xl mb-2 text-[var(--text)] group-hover:text-[var(--accent)]">השקעה בניירות ערך (FVTPL)</h3>
              <p className="t-casual text-[var(--text-muted)] text-sm">תרגול מודרך לשערוך שווי הוגן של מניות המוחזקות למסחר, טיפול בדיבידנדים ורישום רבעוני.</p>
            </Card>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="t-h2 text-2xl mb-4 border-b-2 border-[var(--surface-alt)] pb-2 inline-block">פרק 6: השקעה בחברה כלולה</h2>
          
          <Link to="/equity-method" className="block group">
            <Card className="p-6 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent-glow)]">
              <h3 className="t-h3 text-xl mb-2 text-[var(--text)] group-hover:text-[var(--accent)]">שיטת השווי המאזני</h3>
              <p className="t-casual text-[var(--text-muted)] text-sm">תרגול מודרך (חברת ברצלונה ומדריד) - חישוב הפרש מקורי, רווחי אקוויטי ורישום בכרטיס ההשקעה.</p>
            </Card>
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="t-h2 text-2xl mb-4 border-b-2 border-[var(--surface-alt)] pb-2 inline-block">פרק 7: דוח תזרים מזומנים</h2>
          
          <Link to="/cash-flow" className="block group">
            <Card className="p-6 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent-glow)]">
              <h3 className="t-h3 text-xl mb-2 text-[var(--text)] group-hover:text-[var(--accent)]">מבסיס צבירה למזומן</h3>
              <p className="t-casual text-[var(--text-muted)] text-sm">תרגול מודרך (חברת צמאים לחופש) לשחזור כרטיסים וסיווג לפעילות שוטפת, השקעה ומימון.</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
