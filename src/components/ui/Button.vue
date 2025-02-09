<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  type?: 'button' | 'submit'
  as?: string
  href?: string
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
  as: 'button'
})

const classes = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center transition-all duration-300 focus:outline-none'
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  }
  const variantClasses = {
    primary: 'bg-teal-600 text-white rounded-xl hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-500/25 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-white/10 text-white rounded-xl hover:bg-white/20 focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'text-white/70 hover:text-white hover:bg-white/10 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed'
  }

  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant]
  ].join(' ')
})
</script>

<template>
  <component 
    :is="as"
    :type="as === 'button' ? type : undefined"
    :href="href"
    :disabled="disabled"
    :class="classes">
    <slot />
  </component>
</template>