<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  rows?: number
}>(), {
  required: false,
  disabled: false,
  rows: 5
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <textarea
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :rows="rows"
    class="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl
           focus:border-teal-500 focus:ring-1 focus:ring-teal-500
           transition-colors duration-300 resize-none
           disabled:opacity-50 disabled:cursor-not-allowed"
  />
</template>