<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  level?: 1 | 2 | 3 | 4 | 5 | 6
  gradient?: boolean
  center?: boolean
  className?: string
}>(), {
  level: 2,
  gradient: false,
  center: false
})

const Tag = computed(() => `h${props.level}`)

const classes = computed(() => {
  const baseClasses = ['font-bold']
  
  if (props.gradient) {
    baseClasses.push('bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500 bg-clip-text text-transparent')
  }
  
  if (props.center) {
    baseClasses.push('text-center')
  }
  
  const sizeClasses = {
    1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight pb-2',
    2: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight pb-2',
    3: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight pb-1.5',
    4: 'text-lg font-semibold text-teal-400 flex items-center mb-4',
    5: 'text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight pb-1',
    6: 'text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight pb-1'
  }
  
  baseClasses.push(sizeClasses[props.level])
  
  if (props.className) {
    baseClasses.push(props.className)
  }
  
  return baseClasses.join(' ')
})
</script>

<template>
  <component :is="Tag" :class="classes">
    <span v-if="level === 4" class="w-8 h-px bg-teal-500/50 mr-3"></span>
    <slot />
  </component>
</template>