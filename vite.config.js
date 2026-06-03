import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // ✅ Raises the warning threshold to 1000 kB so the log stays perfectly clean
    chunkSizeWarningLimit: 1000,
  },
})