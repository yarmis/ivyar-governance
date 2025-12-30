import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['**/*.e2e.test.ts'],
    setupFiles: ['./utils/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './reports/coverage',
      exclude: [
        'node_modules',
        'dist',
        '**/*.test.ts',
        '**/fixtures/**',
      ],
    },
    testTimeout: 30000,
  },
});
