/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'
import { configDefaults, coverageConfigDefaults } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({ rollupTypes: true, tsconfigPath: './tsconfig.app.json', exclude: 'src' })
  ],
  optimizeDeps: {
    include: ['**/*.scss'], // Include all .scss files
  },
  css: {
    modules: {
      // Enable CSS Modules for all .scss files
      localsConvention: 'camelCaseOnly',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './lib/tests/setup.js',
    css: true,
    exclude: [...configDefaults.exclude, './e2e-tests/*'],
    coverage: {
      // you can include other reporters, but 'json-summary' is required, json is recommended
      reporter: ['text', 'json-summary', 'json'],
      // If you want a coverage reports even if your tests are failing, include the reportOnFailure option
      reportOnFailure: true,
      exclude: [...coverageConfigDefaults.exclude, './e2e-tests/*'],
    }
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'fabrik',
      // the proper extensions will be added
      fileName: 'fabrik',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
})
