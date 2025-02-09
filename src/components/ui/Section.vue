<script setup lang="ts">
import { computed } from 'vue'
import { Container } from './index'

const props = withDefaults(defineProps<{
  id?: string
  gradient?: 'top' | 'bottom' | 'center' | false
}>(), {
  gradient: false
})

const gradientClass = computed(() => {
  if (!props.gradient) return ''
  
  return {
    top: 'bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))]',
    bottom: 'bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))]',
    center: 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]'
  }[props.gradient]
})
</script>

<template>
  <section class="relative min-h-screen flex items-center pt-32 pb-24">
    <div :id="id" class="absolute -top-20"></div>
    <div v-if="gradient" 
         :class="[gradientClass, 'absolute inset-0 from-teal-900/20 via-transparent to-transparent']" />
    <Container>
      <slot />
    </Container>
  </section>
</template>