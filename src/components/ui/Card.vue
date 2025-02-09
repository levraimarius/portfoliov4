<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  hover?: boolean
  interactive?: boolean
  className?: string
  className?: string
}>(), {
  hover: false,
  interactive: false,
})

const classes = computed(() => {
  const baseClasses = [
    'bg-black/50',
    'backdrop-blur-xl',
    'rounded-2xl',
    'border',
    'border-white/10',
    'transition-all duration-300'
  ]

  if (props.hover) {
    baseClasses.push(
      'hover:border-teal-500/30',
      'hover:shadow-lg',
      'hover:shadow-teal-500/10'
    )
  }

  if (props.interactive) {
    baseClasses.push('cursor-pointer')
  }
  
  if (props.className) {
    baseClasses.push(props.className)
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