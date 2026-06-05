import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/APortfolio/',
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
})
