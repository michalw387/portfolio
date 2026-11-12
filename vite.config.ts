import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base './' — build działa pod dowolną ścieżką (np. GitHub Pages /repo/)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
