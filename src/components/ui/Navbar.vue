<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  items: Array<{
    label: string
    href: string
  }>
}>()

const isMenuOpen = ref(false)
const activeItem = ref('')

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isMenuOpen.value) {
      toggleMenu()
    }
  }
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => window.removeEventListener('keydown', handleEscape))
})
</script>

<template>
  <nav class="fixed w-full top-0 z-50 backdrop-blur-xl bg-black/30 h-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex items-center">
          <slot name="logo" />
        </div>
        
        <!-- Desktop Navigation -->
        <div class="hidden sm:flex sm:items-center sm:gap-8">
          <a v-for="item in items" 
             :key="item.href"
             :href="item.href"
             class="relative px-3 py-2.5 group"
             :class="[
               activeItem === item.href
                 ? 'text-teal-400'
                 : 'text-white/70 hover:text-white'
             ]">
            <span class="absolute inset-0 bg-teal-500/10 scale-x-0 group-hover:scale-x-100 
                       transition-transform duration-300 origin-left rounded-lg"></span>
            <span class="relative">{{ item.label }}</span>
            <span class="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full
                       transition-all duration-300"
                  :class="[
                    activeItem === item.href
                      ? 'bg-teal-400 scale-100'
                      : 'bg-white/50 scale-0 group-hover:scale-100'
                  ]"></span>
          </a>
          <slot name="actions" />
        </div>

        <!-- Mobile menu button -->
        <div class="sm:hidden flex items-center">
          <button @click="toggleMenu"
                  class="text-white/70 hover:text-white p-2.5 z-50 relative mix-blend-difference">
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
          <a v-for="(item, index) in items"
             :key="item.href"
             :href="item.href"
             @click="toggleMenu"
             class="block text-3xl sm:text-4xl md:text-5xl font-bold text-white/90
                    transition-all duration-500 transform hover:translate-x-4
                    relative overflow-hidden group flex items-center"
             :class="isMenuOpen ? 'animate-menu-item' : ''"
             :style="{ 'animation-delay': `${index * 100 + 200}ms` }">
            <span class="absolute h-full w-1 bg-teal-500 transform -translate-x-2 opacity-0
                       transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"></span>
            <span class="relative pl-4 group-hover:text-teal-400 transition-colors duration-500">
              {{ item.label }}
            </span>
          </a>
        </nav>
        
        <div class="mt-8 sm:mt-12" :class="isMenuOpen ? 'animate-menu-item' : ''"
             :style="{ 'animation-delay': '600ms' }">
          <slot name="mobile-actions" />
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

.animate-menu-item {
  animation: menuItemFade 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
}
</style>