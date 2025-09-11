import vue from '@vitejs/plugin-vue'
import { preview } from 'vite'

export default {
  plugins: [vue()],
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
  preview: {
    host: '0.0.0.0',
    port: 4173
  }
}