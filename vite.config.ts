import { join, resolve } from 'path'
import { writeFileSync } from 'fs'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'demo/',
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  plugins: [
    vue(),
    {
      name: 'add-common-js-package-plugin',
      writeBundle (options) {
        if (options.format === 'cjs') {
          writeFileSync(
            join(options.dir, 'package.json'),
            JSON.stringify({ type: 'commonjs' }),
          )
        }
      },
    },
  ],
  resolve: {
    alias: [
      {
        find: 'vue-use-hover-intent',
        replacement: resolve(__dirname, './src/index.ts'),
      },
    ],
  },
  test: {
    global: true,
    environment: 'happy-dom',
    include: ['test/**/*.spec.ts'],
  },
})
