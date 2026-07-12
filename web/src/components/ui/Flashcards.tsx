import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FlashcardData {
  front: React.ReactNode;
  back: React.ReactNode;
}

export interface FlashcardsProps {
  title?: string;
  cards: FlashcardData[];
}

export const Flashcards: React.FC<FlashcardsProps> = ({ title = 'בחן את עצמך', cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((curr) => (curr + 1) % cards.length);
    }, 150); // slight delay to allow flip animation to start before content changes
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((curr) => (curr === 0 ? cards.length - 1 : curr - 1));
    }, 150);
  };

  if (!cards || cards.length === 0) return null;

  return (
    <div className="my-8 flex flex-col items-center w-full max-w-lg mx-auto">
      <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4">{title}</h3>
      
      <div 
        className="relative w-full aspect-[4/3] perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full relative preserve-3d transition-all duration-500"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
        >
          {/* Front */}
          <div 
            className="absolute inset-0 w-full h-full backface-hidden bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md group-hover:border-[var(--color-primary)]/50 transition-colors"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="absolute top-4 right-4 text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-wider">
              שאלה
            </span>
            <div className="text-xl font-bold text-[var(--color-text)] leading-tight">
              {cards[currentIndex].front}
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-[var(--color-text-secondary)] opacity-50">
              לחץ כדי להפוך
            </div>
          </div>

          {/* Back */}
          <div 
            className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-success)]/10 border-2 border-[var(--color-primary)] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <span className="absolute top-4 right-4 text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
              תשובה
            </span>
            <div className="text-lg font-medium text-[var(--color-text)]">
              {cards[currentIndex].back}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-6 mt-6">
        <button 
          onClick={handlePrev}
          className="p-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors text-[var(--color-text-secondary)]"
          aria-label="Previous card"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
        
        <span className="text-sm font-bold text-[var(--color-text-tertiary)]">
          {currentIndex + 1} / {cards.length}
        </span>
        
        <button 
          onClick={handleNext}
          className="p-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors text-[var(--color-text-secondary)]"
          aria-label="Next card"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
      </div>
    </div>
  );
};
