<script setup lang="ts">
import { siGithub, siLinkedin } from 'simple-icons'
import { Container } from './index'
import { RouterLink } from 'vue-router'

defineProps<{
  githubUrl: string
  linkedinUrl: string
}>()
</script>

<template>
  <footer class="py-8 border-t border-white/10 backdrop-blur-xl bg-black/30">
    <Container>
      <div class="flex flex-col items-center gap-6">
        <div class="flex items-center gap-4 mb-2">
          <a :href="githubUrl"
             target="_blank"
             rel="noopener noreferrer"
             class="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group">
            <div class="w-5 h-5 transition-transform duration-300 
                      group-hover:scale-110 group-hover:rotate-3"
                 :style="{ fill: '#fff' }"
                 v-html="siGithub.svg"></div>
          </a>
          <a :href="linkedinUrl"
             target="_blank"
             rel="noopener noreferrer"
             class="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group">
            <div class="w-5 h-5 transition-transform duration-300 
                      group-hover:scale-110 group-hover:rotate-3"
                 :style="{ fill: '#fff' }"
                 v-html="siLinkedin.svg"></div>
          </a>
        </div>
        <div class="text-white/70 text-sm text-center">
          © {{ new Date().getFullYear() }} Marius Thiesset, Gérant de 
          <a href="https://prismacreation.fr" 
             target="_blank"
             rel="noopener noreferrer" 
             class="text-teal-400 hover:text-teal-300 transition-colors duration-300">
            Prisma Création
          </a>
          - 
          <RouterLink to="/mentions-legales" 
                     class="text-teal-400 hover:text-teal-300 transition-colors duration-300">
            Mentions légales
          </RouterLink>
        </div>
      </div>
    </Container>
  </footer>
</template>