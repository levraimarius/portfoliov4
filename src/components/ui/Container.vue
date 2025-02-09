<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  centered?: boolean
  className?: string
}>(), {
  maxWidth: '7xl',
  centered: true
})

const classes = computed(() => {
  const baseClasses = ['w-full', 'px-4']
  
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl'
  }
  
  baseClasses.push(maxWidthClasses[props.maxWidth])
  
  if (props.centered) {
    baseClasses.push('mx-auto')
  }
  
  if (props.className) {
    baseClasses.push(props.className)
  }
  
  return baseClasses.join(' ')
})
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>