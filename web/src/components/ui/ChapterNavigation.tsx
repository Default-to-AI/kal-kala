import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ArrowRight, ArrowLeft } from 'lucide-react';

export interface ChapterDef {
  id: number;
  path: string;
  title: string;
}

const CHAPTERS: ChapterDef[] = [
  { id: 1, path: '/equity', title: 'פרק 1: הון עצמי' },
  { id: 2, path: '/changes-in-equity', title: 'פרק 2: שינויים בהון עצמי' },
  { id: 3, path: '/loans', title: 'פרק 3: התחייבויות לטווח ארוך' },
  { id: 4, path: '/bonds', title: 'פרק 4: איגרות חוב' },
  { id: 6, path: '/securities', title: 'פרק 6: השקעה בניירות ערך' },
  { id: 7, path: '/equity-method', title: 'פרק 7: השקעה בחברה כלולה' },
  { id: 8, path: '/cash-flow', title: 'פרק 8: דוח תזרים מזומנים' },
];

export function ChapterNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Find current chapter index
  const currentIndex = CHAPTERS.findIndex(c => c.path === location.pathname);
  
  // If we are not on a chapter page, don't show the navigation
  if (currentIndex === -1) {
    return null;
  }

  const currentChapter = CHAPTERS[currentIndex];
  const prevChapter = currentIndex > 0 ? CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < CHAPTERS.length - 1 ? CHAPTERS[currentIndex + 1] : null;

  return (
    <div className="w-full py-12 mt-12 border-t border-[var(--color-border)] flex flex-col items-center justify-center gap-6" dir="rtl">
      
      {/* Container for the navigation */}
      <div className="flex items-center justify-center w-full max-w-4xl relative px-4">
        
        {/* Previous Button - positioned absolutely on the right for desktop, but flex on mobile */}
        {prevChapter ? (
          <button
            onClick={() => navigate(prevChapter.path)}
            className="hidden lg:flex absolute right-4 items-center gap-2 px-4 py-2 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-alt)] transition-colors group font-medium"
          >
            <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>לפרק הקודם</span>
          </button>
        ) : (
          <div className="hidden lg:block absolute right-4 w-[120px]"></div>
        )}

        {/* The Central Pill */}
        <div className="flex items-center bg-[var(--color-surface)] border border-[var(--color-border-strong)] rounded-full p-1.5 shadow-soft overflow-x-auto max-w-full hide-scrollbar">
          
          {/* Home Icon */}
          <Link 
            to="/"
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-primary)] transition-colors"
            title="עמוד הבית"
          >
            <Home className="w-5 h-5" />
          </Link>
          
          <div className="flex-shrink-0 w-[1px] h-6 bg-[var(--color-border-strong)] mx-1"></div>
          
          {/* Chapters List */}
          <div className="flex items-center gap-1 px-1">
            <AnimatePresence initial={false}>
              {CHAPTERS.map((chapter) => {
                const isActive = chapter.id === currentChapter.id;
                
                return (
                  <Link
                    key={chapter.id}
                    to={chapter.path}
                    className="relative flex items-center justify-center outline-none"
                  >
                    <motion.div
                      layout
                      className={`flex items-center justify-center h-10 rounded-full whitespace-nowrap overflow-hidden ${
                        isActive 
                          ? 'bg-[var(--color-accent-cobalt-bg)] text-[var(--color-accent-cobalt-strong)] border border-[var(--color-accent-cobalt-line)] font-bold' 
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text-primary)] font-medium'
                      }`}
                      initial={false}
                      animate={{
                        width: isActive ? 'auto' : '40px',
                        paddingLeft: isActive ? '16px' : '0',
                        paddingRight: isActive ? '16px' : '0'
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                        mass: 0.8
                      }}
                    >
                      <motion.span layout="position" className="font-display z-10">
                        {isActive ? chapter.title : chapter.id}
                      </motion.span>
                    </motion.div>
                  </Link>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Next Button - positioned absolutely on the left for desktop */}
        {nextChapter ? (
          <button
            onClick={() => navigate(nextChapter.path)}
            className="hidden lg:flex absolute left-4 items-center gap-2 px-4 py-2 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-alt)] transition-colors group font-medium"
          >
            <span>לפרק הבא</span>
            <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <div className="hidden lg:block absolute left-4 w-[120px]"></div>
        )}
      </div>

      {/* Mobile Navigation Buttons (shown only on small screens below the pill) */}
      <div className="flex lg:hidden items-center justify-between w-full max-w-[320px] px-4">
        {prevChapter ? (
          <button
            onClick={() => navigate(prevChapter.path)}
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
          >
            <ArrowRight className="w-4 h-4" />
            <span>הקודם</span>
          </button>
        ) : <div />}
        
        {nextChapter ? (
          <button
            onClick={() => navigate(nextChapter.path)}
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
          >
            <span>הבא</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        ) : <div />}
      </div>
      
    </div>
  );
}
