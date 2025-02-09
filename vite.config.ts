import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-i18n'],
          'icons': ['@heroicons/vue', 'simple-icons'],
          'ui': ['./src/components/ui'],
          'sections': ['./src/components/HeroSection', './src/components/AboutSection', 
                      './src/components/CareerSection', './src/components/ProjectsSection', 
                      './src/components/ContactSection']
        }
      }
    }
  }
})
