<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}>(), {
  variant: 'primary',
  size: 'md'
})

const classes = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full transition-colors duration-300'
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  }
  
  const variantClasses = {
    primary: 'bg-teal-500/20 text-teal-300 border border-teal-500/20 hover:border-teal-500/40',
    secondary: 'bg-white/5 text-white/70 border border-white/10 hover:border-white/20',
    outline: 'bg-transparent border border-white/20 text-white/70 hover:bg-white/5'
  }
  
  return [baseClasses, sizeClasses[props.size], variantClasses[props.variant]].join(' ')
})
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>