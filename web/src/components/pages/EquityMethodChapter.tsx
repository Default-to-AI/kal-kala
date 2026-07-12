import { PageLayout } from '../ui/PageLayout';
import { PageHeader } from '../ui/PageHeader';
import { LessonBlock } from '../ui/LessonBlock';
import { ExerciseStep } from '../ui/ExerciseStep';
import { JournalEntryTable } from '../ui/JournalEntryTable';

export function EquityMethodChapter() {
  return (
    <PageLayout>
      <PageHeader 
        title="פרק 6: השקעה בחברה כלולה (שיטת השווי המאזני)" 
        description="טיפול חשבונאי בהשקעות המקנות השפעה מהותית (20%-50%), חישוב הפרש מקורי, רווחי אקוויטי ויתרת ההשקעה."
      />

      <LessonBlock title="1. שיטת השווי המאזני (Equity Method)">
        <p>
          כאשר חברה (המשקיעה) רוכשת מניות של חברה אחרת (המוחזקת) בשיעור המקנה לה <strong>השפעה מהותית</strong> 
          (לרוב בין 20% ל-50%), ההשקעה מטופלת לפי <strong>שיטת השווי המאזני</strong> (אקוויטי).
        </p>
        <p>
          בשיטה זו, ההשקעה נרשמת תחילה לפי העלות, ולאחר מכן מתעדכנת בהתאם לחלקה של המשקיעה 
          בשינויים בהון העצמי של המוחזקת:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4 text-[var(--text)] text-sm">
          <li><strong>רווח/הפסד של המוחזקת:</strong> המשקיעה רושמת כ"רווחי אקוויטי" (או הפסדי אקוויטי) ברווח והפסד, ומגדילה (או מקטינה) את חשבון ההשקעה במאזן.</li>
          <li><strong>דיבידנד שחילקה המוחזקת:</strong> המשקיעה מקבלת מזומן ומקטינה את חשבון ההשקעה. דיבידנד אינו מהווה הכנסה (כדי למנוע כפילות עם רווחי האקוויטי).</li>
        </ul>
        <p>
          <strong>הפרש מקורי (עודף עלות):</strong> ההפרש בין עלות ההשקעה לבין חלקה של המשקיעה בשווי הפנקסני (ההון העצמי) של המוחזקת. 
          הפרש זה מיוחס לנכסים והתחייבויות ששווים ההוגן שונה מערכם הפנקסני (למשל מלאי, רכוש קבוע) והיתרה היא <strong>מוניטין</strong>. 
          את ההפרש המיוחס לנכסים יש להפחית לאורך חייהם, והפחתה זו מקטינה את רווחי האקוויטי.
        </p>
      </LessonBlock>

      <LessonBlock title="תרגיל מודרך 1: חברת ברצלונה ומדריד">
        <ExerciseStep 
          title="תרגיל באקוויטי - שאלות 2-3"
          question={`ב-1.1.24 רכשה חברת ברצלונה 40% מהון המניות של חברת מדריד בע"מ תמורת 110,000 ₪.

להלן ההון העצמי של חברת "מדריד" ליום 1.1.24:
הון מניות: 30,000
פרמיה: 20,000
יתרת רווח: 150,000
סה"כ הון עצמי: 200,000

נתונים נוספים ליום הרכישה ולשנת 2024:
1. שווי השוק של המלאי היה גבוה ב- 10,000 ₪ מהשווי במאזן. המלאי נמכר במהלך שנת 2024.
2. שווי השוק של הרכוש הקבוע היה גבוה ב- 20,000 מהשווי במאזן. הרכוש הקבוע מופחת למשך 4 שנים בקו ישר.
3. רווחי חברת "מדריד" לשנת 2024 הסתכמו ב- 100,000 ₪.
4. במהלך שנת 2024 חברת "מדריד" הכריזה וחילקה דיבידנד בסך 50,000 ₪.

נדרש:
1. חשבו את ההפרש המקורי וייחסו אותו לנכסים ולמוניטין.
2. חשבו את רווחי האקוויטי שתרשום ברצלונה לשנת 2024.
3. חשבו את יתרת חשבון ההשקעה במדריד ליום 31.12.24 ואת פקודות היומן לשנה זו.`}
        >
          <div className="space-y-8">
            {/* Part 1: Original Difference */}
            <div>
              <h3 className="text-lg font-bold text-[var(--accent)] mb-4 border-b border-[var(--accent)]/20 pb-2">שלב 1: חישוב הפרש מקורי ומוניטין</h3>
              <div className="bg-[var(--surface)] border border-[var(--surface-alt)] rounded-lg p-5 text-sm text-[var(--text)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">חישוב ההפרש המקורי (עודף עלות):</h4>
                    <ul className="space-y-1">
                      <li className="flex justify-between"><span>עלות ההשקעה:</span> <span>110,000</span></li>
                      <li className="flex justify-between text-[var(--text-muted)]"><span>פחות: חלקנו בהון (40% × 200,000):</span> <span>(80,000)</span></li>
                      <li className="flex justify-between font-bold border-t border-[var(--surface-alt)] pt-1 mt-1"><span>הפרש מקורי:</span> <span>30,000</span></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">ייחוס ההפרש המקורי (לפי 40%):</h4>
                    <ul className="space-y-1">
                      <li className="flex justify-between"><span>למלאי (40% × 10,000):</span> <span>(4,000)</span></li>
                      <li className="flex justify-between"><span>לרכוש קבוע (40% × 20,000):</span> <span>(8,000)</span></li>
                      <li className="flex justify-between font-bold text-[var(--accent)] border-t border-[var(--surface-alt)] pt-1 mt-1"><span>מוניטין (שארית):</span> <span>18,000</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Part 2: Equity Profits */}
            <div>
              <h3 className="text-lg font-bold text-[var(--accent)] mb-4 border-b border-[var(--accent)]/20 pb-2">שלב 2: רווחי אקוויטי לשנת 2024</h3>
              <div className="bg-[var(--surface)] border border-[var(--surface-alt)] rounded-lg p-5 text-sm text-[var(--text)]">
                <p className="mb-4">
                  רווחי אקוויטי מורכבים מחלקנו ברווח הנקי של המוחזקת, בניכוי הפחתת עודפי העלות (ההפרש המקורי שיוחס לנכסים).
                  כאשר נכס נמכר או מופחת, אנו מפחיתים את עודף העלות המיוחס לו מתוך רווחי האקוויטי.
                </p>
                <ul className="space-y-2">
                  <li className="flex justify-between"><span>חלקנו ברווחי מדריד מפעילות (40% × 100,000):</span> <span>40,000</span></li>
                  <li className="flex justify-between text-rose-400"><span>פחות: הפחתת עודף מלאי (המלאי נמכר השנה ולכן מופחת במלואו):</span> <span>(4,000)</span></li>
                  <li className="flex justify-between text-rose-400"><span>פחות: הפחתת עודף רכוש קבוע (8,000 חלקי 4 שנים):</span> <span>(2,000)</span></li>
                  <li className="flex justify-between font-bold text-emerald-400 border-t border-[var(--surface-alt)] pt-2 mt-2 text-base"><span>סה״כ רווחי אקוויטי שיירשמו בדו״ח רווח והפסד:</span> <span>34,000</span></li>
                </ul>
              </div>
            </div>

            {/* Part 3: T-Account and Journal Entries */}
            <div>
              <h3 className="text-lg font-bold text-[var(--accent)] mb-4 border-b border-[var(--accent)]/20 pb-2">שלב 3: יתרת חשבון ההשקעה ל-31.12.24</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--surface)] border border-[var(--surface-alt)] rounded-lg p-5 flex flex-col justify-center items-center">
                  <h4 className="font-bold mb-4">כרטיס (T-Account) השקעה במדריד</h4>
                  <div className="w-full max-w-xs border-t-2 border-[var(--text)] relative mt-4">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-6 font-bold text-sm bg-[var(--surface)] px-2">חובה (+)</div>
                    <div className="w-px h-48 bg-[var(--text)] absolute left-1/2 top-0"></div>
                    <div className="grid grid-cols-2 text-sm pt-2">
                      <div className="pr-4 text-right space-y-2">
                        <div>עלות ההשקעה: 110,000</div>
                        <div className="text-emerald-400">רווחי אקוויטי: 34,000</div>
                      </div>
                      <div className="pl-4 text-left space-y-2">
                        <div className="text-rose-400">דיבידנד: (20,000)<br/><span className="text-xs text-[var(--text-muted)]">(40% × 50k)</span></div>
                      </div>
                    </div>
                    <div className="border-t border-dashed border-[var(--text-muted)] mt-16 pt-2 text-center font-bold text-lg text-[var(--accent)]">
                      יתרת סגירה: 124,000 ₪
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <JournalEntryTable 
                    date="1.1.24"
                    description="רכישת ההשקעה"
                    lines={[
                      { account: "השקעה בחברה כלולה", debit: 110000, isDebit: true },
                      { account: "מזומן", credit: 110000, isDebit: false },
                    ]}
                  />
                  <JournalEntryTable 
                    date="31.12.24"
                    description="רישום חלקה של ברצלונה ברווחי אקוויטי"
                    lines={[
                      { account: "השקעה בחברה כלולה", debit: 34000, isDebit: true },
                      { account: "רווחי אקוויטי (רווח והפסד)", credit: 34000, isDebit: false },
                    ]}
                  />
                  <JournalEntryTable 
                    date="31.12.24"
                    description="קבלת דיבידנד במזומן (מקטין השקעה)"
                    lines={[
                      { account: "מזומן (40% מ-50k)", debit: 20000, isDebit: true },
                      { account: "השקעה בחברה כלולה", credit: 20000, isDebit: false },
                    ]}
                  />
                </div>
              </div>
            </div>

          </div>
        </ExerciseStep>
      </LessonBlock>
    </PageLayout>
  );
}
