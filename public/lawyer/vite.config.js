import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/lawyer/',
  plugins: [react()],
  // ...el resto de tu config existente
})