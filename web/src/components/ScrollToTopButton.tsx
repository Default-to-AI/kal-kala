import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrollPosition } from '../hooks/useScrollPosition';

/**
 * Animated floating scroll-to-top button.
 * Shows/hides with a scale + slide animation. Includes hover/tap micro-interactions.
 */
export function ScrollToTopButton(): React.ReactElement {
  const scrollY = useScrollPosition();
  const visible = scrollY > 400;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="tour-scroll-top-button fixed bottom-6 left-6 z-50 flex items-center justify-center rounded-xl border border-[var(--surface-alt)] bg-[var(--surface)] p-3 text-[var(--accent)] shadow-lg backdrop-blur-sm transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white cursor-pointer"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          title="חזרה לראש העמוד"
          aria-label="חזרה לראש העמוד"
        >
          <ArrowUp size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
