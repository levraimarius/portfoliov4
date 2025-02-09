<script setup lang="ts">
import { ref, computed } from 'vue'
import { TechBadge } from './index'

const props = defineProps<{
  technologies: Array<{
    name: string
    key: string
    icon: any
    category: string
    description: string
    color: string
  }>
  selectedCategory: string
}>()

const hoveredTech = ref<string | null>(null)
const tooltipPosition = ref<'left' | 'right'>('right')
const windowWidth = ref(window.innerWidth)

const updateTooltipPosition = (event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  tooltipPosition.value = centerX > window.innerWidth / 2 ? 'left' : 'right'
}

const filteredTechnologies = computed(() => {
  if (props.selectedCategory === 'all') {
    return props.technologies
  }
  return props.technologies.filter(tech => tech.category === props.selectedCategory)
})
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 auto-rows-fr gap-y-6 sm:gap-y-8 gap-x-2 mt-8 sm:mt-16 px-4">
    <div v-for="tech in filteredTechnologies" 
         :key="tech.name"
         class="tech-card group relative flex flex-col items-center justify-center
                transition-all duration-500 transform"
         :class="{
           'scale-100 opacity-100': true,
           'animate-tech-enter': true,
           'hover:z-10': true
         }"
         @mouseenter="(e) => { hoveredTech = tech.name; updateTooltipPosition(e) }"
         @mouseleave="hoveredTech = null">
      <span class="block lg:hidden text-sm text-white/70 mb-2">{{ tech.name }}</span>
      <div class="relative w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center
                  bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 
                  overflow-hidden transition-all duration-300 
                  group-hover:border-opacity-50"
           :style="{ '--tech-color': tech.color }">
        <div class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
             :style="{ backgroundColor: tech.color }"></div>
        <div class="w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 
                    group-hover:scale-110 group-hover:brightness-110"
             v-html="tech.icon.svg"
             :style="{ fill: tech.color }"></div>
      </div>
      
      <div v-if="hoveredTech === tech.name && windowWidth >= 1024"
           class="tooltip absolute w-56 z-50"
           :class="[
             tooltipPosition === 'left'
               ? 'right-full mr-2 top-1/2 -translate-y-1/2'
               : 'left-full ml-2 top-1/2 -translate-y-1/2'
           ]">
        <div class="relative">
          <div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1a1a1a]"
               :class="[
                 tooltipPosition === 'left'
                   ? '-right-1.5 rotate-45'
                   : '-left-1.5 -rotate-45'
               ]"
               :style="{ borderTop: `2px solid ${tech.color}20`, 
                        borderLeft: `2px solid ${tech.color}20` }"></div>
          <div class="bg-[#1a1a1a] rounded-lg p-4 shadow-xl border border-white/10"
               :style="{ borderColor: `${tech.color}20` }">
            <div class="flex items-center gap-2 mb-1">
              <span class="w-2 h-2 rounded-full"
                    :style="{ backgroundColor: tech.color }"></span>
              <h3 class="font-bold" 
                  :style="{ color: tech.color }">{{ tech.name }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 1023px) {
  .tech-card:hover {
    z-index: 1 !important;
  }
}

.tech-card {
  isolation: isolate;
  animation: tech-enter 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  animation-fill-mode: both;
}

.tooltip {
  animation: tooltip 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

@keyframes tooltip {
  0% {
    opacity: 0;
    transform: translate(
      var(--tooltip-offset-x, 
        v-bind(tooltipPosition) === 'left' ? 10px : -10px
      ), 
      -50%
    );
  }
  100% {
    opacity: 1;
    transform: translate(0, -50%);
  }
}

@keyframes tech-enter {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>