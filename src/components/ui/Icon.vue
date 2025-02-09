<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  icon: any
  size?: 'sm' | 'md' | 'lg'
  color?: string
}>(), {
  size: 'md'
})

const sizeClass = computed(() => ({
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
}[props.size]))

const style = computed(() => ({
  fill: props.color
}))
</script>

<template>
  <div :class="sizeClass" :style="style" v-html="icon.svg" />
</template>