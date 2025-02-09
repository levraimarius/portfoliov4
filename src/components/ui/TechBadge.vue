<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from './index'

const props = defineProps<{
  name: string
  icon?: any
  color?: string,
  className?: string
}>()

const style = computed(() => ({
  borderColor: props.color ? `${props.color}20` : 'rgb(255 255 255 / 0.1)',
  '--hover-color': props.color
}))

const classes = computed(() => [
  'flex items-center gap-2 px-3 py-1.5 bg-black/50 rounded-full text-sm',
  'border border-white/10 hover:border-opacity-20 group',
  'transition-all duration-300',
  props.className
].filter(Boolean).join(' '))
</script>

<template>
  <div :class="classes"
       :style="style">
    <Icon v-if="icon" :icon="icon" size="sm" :color="color" />
    <span :style="{ color: color || '#fff' }">{{ name }}</span>
  </div>
</template>