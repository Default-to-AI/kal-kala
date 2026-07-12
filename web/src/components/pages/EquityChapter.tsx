import { PageLayout } from '../ui/PageLayout';
import { PageHeader } from '../ui/PageHeader';
import { LessonBlock } from '../ui/LessonBlock';
import { Flashcards } from '../ui/Flashcards';

export function EquityChapter() {
  return (
    <PageLayout>
      <PageHeader 
        title="פרק 1: מרכיבי ההון העצמי" 
        description="מהות ההון העצמי, מניות רגילות מול מניות בכורה, חלוקת דיבידנד, מניות הטבה, והדוח על השינויים בהון."
      />

      <LessonBlock title="מהות ההון העצמי" variant="definition">
        <p className="mb-4">
          ההון העצמי (Equity) מייצג את זכויות הבעלים בנכסי החברה לאחר ניכוי כל התחייבויותיה (הון עצמי = נכסים פחות התחייבויות). 
          חברה יכולה לגייס הון במספר דרכים: הון מניות (הנפקת מניות), או הון שנוצר מפעילות (עודפים - רווחים שלא חולקו).
        </p>
        <div className="bg-[var(--color-surface-alt)] p-4 rounded-xl border border-[var(--color-border)] mt-4">
          <h4 className="font-bold text-[var(--color-primary)] mb-2">💡 Pro Tip</h4>
          <p className="text-sm">הון עצמי הוא בעצם ה"כרית" של החברה. אם החברה תיסגר ותמכור את כל הנכסים כדי לשלם את כל החובות, מה שיישאר יחולק לבעלי ההון העצמי.</p>
        </div>
      </LessonBlock>

      <LessonBlock title="סוגי מניות" variant="formal">
        <p className="mb-4">
          <strong>הון מניות רגילות (Common Stock):</strong> הבעלים האמיתיים של החברה. מקנה זכות הצבעה באסיפה הכללית, זכות לרווחים (דיבידנד) וזכות לנכסי החברה בפירוק.
        </p>
        <p className="mb-4">
          <strong>הון מניות בכורה (Preferred Stock):</strong> סוג של יצור כלאיים בין הלוואה להון. אין זכות הצבעה, אך יש קדימות בקבלת דיבידנד ובפירוק. הדיבידנד לרוב קבוע.
        </p>
        <p className="mb-4">
          <strong>פרמיה (Premium):</strong> הסכום העודף שהתקבל בהנפקה מעל לערך הנקוב של המניה.
        </p>
      </LessonBlock>

      <LessonBlock title="פעולות בהון העצמי" variant="casual">
        <p className="mb-4">
          <strong>הנפקת מניות:</strong> כאשר חברה מנפיקה מניות מעל הערך הנקוב, הערך הנקוב נרשם בסעיף "הון מניות" וההפרש נרשם בסעיף "פרמיה".
        </p>
        <p className="mb-4">
          <strong>מניות הטבה (Bonus Shares):</strong> חלוקת מניות חינם לבעלי המניות הקיימים. זוהי בעצם העברת סכומים מסעיפי הון אחרים (כמו עודפים או פרמיה) לסעיף הון המניות. <strong>אין שינוי בסך ההון העצמי.</strong>
        </p>
        <p className="mb-4">
          <strong>דיבידנד (Dividend):</strong> חלוקת רווחי החברה לבעלי מניותיה. מקטין את סעיף ה"עודפים" ואת סך ההון העצמי.
        </p>
      </LessonBlock>

      <div className="mt-12">
        <Flashcards 
          title="בחן את עצמך: מושגי יסוד"
          cards={[
            {
              front: "מה ההבדל העיקרי בין מניות רגילות למניות בכורה?",
              back: "למניות רגילות יש זכות הצבעה, בעוד שלמניות בכורה בדרך כלל אין. מנגד, למניות בכורה יש קדימות בחלוקת דיבידנד ובפירוק החברה."
            },
            {
              front: "האם חלוקת מניות הטבה משנה את סך ההון העצמי?",
              back: "לא. מניות הטבה הן רק 'העברה מכיס לכיס' בתוך ההון העצמי (למשל, מפרמיה להון מניות). סך כל ההון העצמי נשאר זהה."
            },
            {
              front: "מהי פרמיה?",
              back: "הפרש חיובי בין התמורה שהתקבלה בהנפקת המניות לבין הערך הנקוב (ע.נ) שלהן."
            }
          ]}
        />
      </div>

    </PageLayout>
  );
}
