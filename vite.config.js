import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.SERVER_PORT,
    // proxy: {
    //   '/api': 'http://localhost:3000',
    // },
  },
})
