<script setup lang="ts">
import { computed } from 'vue'

interface ListItem {
  text: string
}

const props = withDefaults(defineProps<{
  variant?: 'bullet' | 'number' | 'dash'
  spacing?: 'sm' | 'md' | 'lg'
  items: string[]
}>(), {
  variant: 'bullet',
  spacing: 'md'
})

const listType = computed(() => props.variant === 'number' ? 'ol' : 'ul')

const classes = computed(() => {
  const spacingClasses = {
    sm: 'space-y-1',
    md: 'space-y-2',
    lg: 'space-y-3'
  }

  return ['list-none', spacingClasses[props.spacing]].join(' ')
})

const markerClasses = computed(() => {
  const classes = {
    bullet: 'w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 mr-3 group-hover:scale-125 transition-transform duration-300',
    number: 'mr-3 text-teal-500 font-bold',
    dash: 'w-3 h-px bg-teal-500 mt-3 mr-3'
  }
  
  return classes[props.variant]
})
</script>

<template>
  <component :is="listType" :class="classes">
    <li v-for="(item, index) in items"
        :key="index"
        class="flex items-start group">
      <span v-if="variant === 'bullet'" :class="markerClasses" />
      <span v-else-if="variant === 'number'" class="mr-3 text-teal-500 font-bold">{{ index + 1 }}.</span>
      <span v-else class="w-3 h-px bg-teal-500 mt-3 mr-3" />
      <span class="text-white/70 leading-relaxed">
        {{ item }}
      </span>
    </li>
  </component>
</template>