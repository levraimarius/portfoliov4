<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SparklesIcon } from '@heroicons/vue/24/outline'
import { Section, Title, Button, ParticleBackground } from './ui'

const { t } = useI18n()
</script>

<template>
  <Section id="home" gradient="center" class="overflow-hidden pt-0">
    <ParticleBackground />
    
    <div class="text-center relative">
      <div class="absolute -inset-4 bg-teal-500/20 blur-3xl -z-10"></div>
      
      <Title :level="1" gradient class="mb-8 md:mb-10">
        {{ t('hero.title') }}
      </Title>
      
      <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-teal-300/90 mb-12 sm:mb-16 md:mb-20 max-w-2xl mx-auto px-4 leading-relaxed">
        {{ t('hero.subtitle') }}
      </p>
      
      <Button as="a" href="#projects" variant="primary" size="lg" class="w-full sm:w-auto">
        {{ t('hero.cta') }}
        <SparklesIcon class="h-5 w-5 inline-block ml-2 animate-pulse" />
      </Button>
    </div>
  </Section>
</template>