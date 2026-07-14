import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets window scroll to the top whenever the route changes.
 *
 * Mount once inside the BrowserRouter (above or below the Routes in
 * App.tsx). Has no DOM output.
 *
 * Edge cases handled:
 *  - Hash navigation: if the URL has a `#anchor`, defers to the
 *    browser's default anchor-scroll so in-page links still work.
 *  - Initial mount: also scrolls to top (matches the user's mental
 *    model of "every route change = start at the top").
 *  - Instant scroll: route changes should feel snappy, not animated.
 *    The floating ScrollToTopButton uses smooth scroll because the
 *    user is already on the page; here we're switching context.
 */
export function ScrollToTop(): null {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // preserve browser's default anchor behavior
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
