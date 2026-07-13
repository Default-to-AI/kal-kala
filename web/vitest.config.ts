import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

/**
 * Explicit Vitest config merged on top of `vite.config.ts` so dev-side plugins
 * (react(), tailwindcss()) stay available for component tests while we pin
 * the test-specific knobs here. Locking these explicitly prevents drift if a
 * future hook dependency assumes different defaults.
 */
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'node',
      // Cover both .test.ts (utility tests) and .test.tsx (component tests)
      // so a future React component test doesn't require revisiting this file.
      include: ['src/**/*.test.ts?(x)'],
      globals: false,
      // Explicit empty so a future contributor wiring a hook dependency
      // through `setupFiles` has to opt in deliberately rather than assume
      // it's already wired.
      setupFiles: [],
    },
  }),
);
