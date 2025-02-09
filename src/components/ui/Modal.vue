<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  show: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  className?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const modal = ref<HTMLDivElement | null>(null)

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show) {
    emit('close')
  }
}

const toggleScroll = (shouldBlock: boolean) => {
  if (shouldBlock) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
  if (props.show) {
    toggleScroll(true)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  toggleScroll(false)
})

watch(() => props.show, (newValue) => {
  toggleScroll(newValue)
})

const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === modal.value) {
    emit('close')
  }
}

const maxWidthClass = computed(() => {
  const widths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl'
  }
  return widths[props.maxWidth || '2xl']
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show"
         ref="modal"
         @click="handleBackdropClick"
        class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div :class="[
          'bg-black/90 border-0 sm:border sm:border-white/10 w-full h-screen sm:h-auto overflow-y-auto',
          'sm:rounded-2xl relative sm:max-h-[85vh] sm:m-4',
          maxWidthClass,
          props.className
        ]">
          <button @click="emit('close')"
                  class="fixed sm:absolute top-4 right-4 p-2 rounded-full bg-white/5 text-white/70 
                         hover:bg-white/10 hover:text-white transition-all duration-300 z-50">
            <XMarkIcon class="w-6 h-6" />
          </button>
          <slot />
        </div>
      </Transition>
    </div>
  </Transition>
</template>