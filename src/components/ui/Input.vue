<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  modelValue: string | number
  placeholder?: string
  required?: boolean
  disabled?: boolean
  icon?: any
}>(), {
  type: 'text',
  required: false,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const classes = computed(() => [
  'w-full',
  'px-4',
  'py-3',
  props.icon ? 'pl-11' : 'px-4',
  'bg-black/50',
  'border',
  'border-white/10',
  'rounded-xl',
  'focus:border-teal-500',
  'focus:ring-1',
  'focus:ring-teal-500',
  'transition-colors',
  'duration-300',
  'disabled:opacity-50',
  'disabled:cursor-not-allowed'
].join(' '))
</script>

<template>
  <div class="relative">
    <input
      :type="type"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="classes"
    />
    <component
      v-if="icon"
      :is="icon"
      class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50"
    />
  </div>
</template>