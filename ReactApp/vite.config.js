import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from "node:path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "React-Automation-Studio", replacement: resolve(__dirname, "./src/React-Automation-Studio") }]
  },
  server: {
    port: 3000,
    hmr:{
      path:"ws"
    }
  },
  
})
