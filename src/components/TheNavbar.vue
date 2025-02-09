<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useIntersectionObserver } from '@vueuse/core'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import frFlag from '../assets/flags/fr.svg'
import gbFlag from '../assets/flags/gb.svg'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)
const isLanguageMenuOpen = ref(false)
const activeSection = ref('')

onMounted(() => {
  // Configurer l'Intersection Observer pour chaque section
  const sections = document.querySelectorAll('section[id]')
  sections.forEach(section => {
    const { stop } = useIntersectionObserver(
      section,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          activeSection.value = section.id
        }
      },
      { 
        threshold: 0.5,
        rootMargin: '-50% 0px -50% 0px' // Déclencher quand la section est à mi-chemin
      }
    )
  })
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isMenuOpen.value) {
    toggleMenu()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
})

const languages = {
  en: {
    name: 'English',
    flag: gbFlag
  },
  fr: {
    name: 'Français',
    flag: frFlag
  }
}

const setLanguage = (lang: 'en' | 'fr') => {
  locale.value = lang
  isLanguageMenuOpen.value = false
}

const navItems = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'career', href: '#career' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
]

const handleNavClick = (href: string) => {
  if (isMenuOpen.value) {
    toggleMenu()
  }

  if (href.startsWith('#') && route.path !== '/') {
    router.push('/')
    // Attendre que la navigation soit terminée avant de scroller
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  } else if (href.startsWith('#')) {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    router.push(href)
  }
}
</script>

<template>
  <nav class="fixed w-full top-0 z-50 backdrop-blur-xl bg-black/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-end h-16">
        <!-- Desktop Navigation -->
        <div class="hidden sm:flex sm:items-center sm:space-x-8">
          <button v-for="item in navItems" 
             :key="item.key"
             @click="handleNavClick(item.href)"
             class="relative px-3 py-2 group"
             :class="[
               activeSection === item.key
                 ? 'text-white'
                 : route.path === '/' ? 'text-white/70 hover:text-white' : 'text-white'
             ]">
            <span class="absolute inset-0 bg-teal-500/10 rounded-lg transition-opacity duration-300"
                  :class="activeSection === item.key ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"></span>
            <span class="relative">
            {{ t(`nav.${item.key}`) }}
            </span>
          </button>
          <div class="relative">
            <button @click="isLanguageMenuOpen = !isLanguageMenuOpen"
                    class="text-white/70 hover:text-white p-2 rounded-lg flex items-center gap-2 
                           transition-colors duration-300 hover:bg-white/5">
              <img :src="languages[locale].flag" 
                   :alt="languages[locale].name"
                   class="w-6 h-4 rounded object-cover" />
            </button>
            
            <div v-if="isLanguageMenuOpen"
                 class="absolute right-0 mt-2 w-32 rounded-xl bg-black/90 backdrop-blur-xl 
                        border border-white/10 shadow-lg py-2 transform origin-top-right 
                        animate-menu-in">
              <button v-for="(data, lang) in languages"
                      :key="lang"
                      @click="setLanguage(lang as 'en' | 'fr')"
                      class="w-full px-4 py-2 text-left flex items-center justify-between
                             hover:bg-white/5 transition-colors duration-300 relative group">
                <span class="absolute inset-0 bg-teal-500/10 scale-x-0 group-hover:scale-x-100 
                           transition-transform duration-300 origin-left"></span>
                <span class="flex items-center gap-2">
                  <img :src="data.flag" 
                       :alt="data.name"
                       class="w-6 h-4 rounded object-cover" />
                  <span class="text-sm">{{ data.name }}</span>
                </span>
                <div v-if="locale === lang"
                     class="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="sm:hidden flex items-center">
          <button @click="toggleMenu"
                  class="text-white/70 hover:text-white p-2 z-50 relative mix-blend-difference">
            <Bars3Icon v-if="!isMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-show="isMenuOpen"
         class="fixed inset-0 w-full h-screen z-40 bg-black/95 backdrop-blur-xl
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-auto
                flex items-center justify-center origin-top"
         :class="isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'">
      
      <div class="w-full min-h-screen flex flex-col justify-center px-4 sm:px-8">
        <nav class="space-y-6 sm:space-y-8">
          <button v-for="(item, index) in navItems"
             :key="item.key"
             @click="handleNavClick(item.href)"
             class="block text-3xl sm:text-4xl md:text-5xl font-bold text-white/90
                    transition-all duration-500 transform hover:translate-x-4
                    relative overflow-hidden group flex items-center"
             :class="isMenuOpen ? 'animate-menu-item' : ''"
             :style="{ 'animation-delay': `${index * 100 + 200}ms` }">
            <span class="absolute h-full w-1 bg-teal-500 transform -translate-x-2 opacity-0
                       transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"></span>
            <span class="relative pl-4 group-hover:text-teal-400 transition-colors duration-500">
            {{ t(`nav.${item.key}`) }}
            </span>
          </button>
        </nav>
        
        <div class="mt-8 sm:mt-12 space-y-4" :class="isMenuOpen ? 'animate-menu-item' : ''"
             :style="{ 'animation-delay': '600ms' }">
          <div class="text-white/50 text-xl">
            {{ t('nav.language') }}
          </div>
          <div class="flex flex-wrap gap-4">
            <button v-for="(data, lang) in languages"
                    :key="lang"
                    @click="setLanguage(lang as 'en' | 'fr')"
                    class="px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-white/70 hover:text-white group
                           transition-all duration-300 relative overflow-hidden text-lg"
                    :class="locale === lang ? 'bg-teal-500/20 text-teal-300' : 'hover:bg-white/5'">
              <span class="absolute inset-0 bg-teal-500/10 transform origin-left scale-x-0 
                         transition-transform duration-300 group-hover:scale-x-100"></span>
              <span class="flex items-center gap-2">
                <img :src="data.flag" 
                     :alt="data.name"
                     class="w-8 h-6 rounded object-cover" />
                <span>{{ data.name }}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@keyframes menuItemFade {
  0% {
    opacity: 0;
    transform: translateY(60px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes menuIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-menu-item {
  animation: menuItemFade 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
}

.animate-menu-in {
  animation: menuIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
</style>