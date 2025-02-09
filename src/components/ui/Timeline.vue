<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  active?: boolean
  last?: boolean
}>(), {
  active: false,
  last: false
})

const dotClasses = computed(() => [
  'relative flex-shrink-0 w-14 h-14 rounded-full bg-black/50',
  'border-2 transition-colors duration-300',
  props.active ? 'border-teal-500' : 'border-teal-500/30 hover:border-teal-500'
].join(' '))

const connectorClasses = computed(() => [
  'absolute left-[29px] top-[72px] bottom-0 w-0.5',
  'bg-gradient-to-b from-teal-500/30 to-transparent transition-colors duration-300'
].join(' '))
</script>

<template>
  <div class="relative group">
    <div v-if="!last" :class="connectorClasses" />
    <div class="relative flex items-start gap-6">
      <div :class="dotClasses">
        <slot name="icon" />
      </div>
      <div class="flex-grow transition-transform duration-300 group-hover:translate-x-2">
        <slot />
      </div>
    </div>
  </div>
</template>