<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { Section, Title, Input, Textarea, Button } from './ui'

const { t } = useI18n()

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  showSuccess.value = true
  isSubmitting.value = false
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    message: ''
  }
  
  // Hide success message after 3 seconds
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}
</script>

<template>
  <Section id="contact" gradient="top">
    <div class="w-full max-w-2xl mx-auto">
      <Title :level="2" gradient center class="mb-12 sm:mb-16 md:mb-20">
        {{ t('contact.title') }}
      </Title>
      
      <form @submit.prevent="handleSubmit" class="space-y-6 sm:space-y-8 relative px-4 sm:px-0">
        <div class="absolute -inset-4 bg-teal-500/5 blur-3xl -z-10 rounded-2xl"></div>
        
        <div class="space-y-2">
          <label for="name" class="block text-white/80">{{ t('contact.name') }}</label>
          <input type="text"
                 id="name" 
                 v-model="form.name" 
                 required
                 class="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl
                        focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                        transition-colors duration-300" />
        </div>
        
        <div class="space-y-2">
          <label for="email" class="block text-white/80">{{ t('contact.email') }}</label>
          <input type="email"
                 id="email" 
                 v-model="form.email" 
                 required
                 class="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl
                        focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                        transition-colors duration-300" />
        </div>
        
        <div class="space-y-2">
          <label for="message" class="block text-white/80">{{ t('contact.message') }}</label>
          <textarea id="message"
                    v-model="form.message"
                    required
                    rows="5"
                    class="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl
                           focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                           transition-colors duration-300 resize-none"></textarea>
        </div>
        
        <div class="flex justify-end">
          <Button type="submit"
                  variant="primary"
                  :disabled="isSubmitting"
                  class="w-full sm:w-auto relative">
            <span class="flex items-center gap-2">
              {{ t('contact.send') }}
              <ArrowRightIcon v-if="!isSubmitting"
                             class="w-4 h-4 transition-transform duration-300
                                    group-hover:translate-x-1" />
              <div v-else
                   class="w-4 h-4 border-2 border-white/30 border-t-white 
                          rounded-full animate-spin"></div>
            </span>
          </Button>
        </div>
        
        <div v-if="showSuccess"
             class="absolute bottom-full left-0 right-0 mb-4 py-3 px-4 bg-teal-500/20
                    border border-teal-500/30 rounded-xl text-teal-300 text-center
                    animate-fade-in">
          {{ t('contact.success') }}
        </div>
      </form>
    </div>
  </Section>
</template>