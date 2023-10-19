import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/rustam_project/',
    plugins: [vue()],
    resolve: {
    alias: {
        '@': fileURLToPath(new URL('./assets', import.meta.url))
    }
  }
})
