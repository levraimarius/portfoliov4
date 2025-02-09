<script setup lang="ts">
import { BriefcaseIcon, CalendarIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import { Modal, Title, List, TechBadge } from './ui'
import { 
  siVuedotjs, siReact, siTypescript, siJavascript, siPython,
  siPhp, siNodedotjs, siDocker, siAmazonaws, siWordpress,
  siShopify, siTailwindcss, siSass, siMongodb, siPostgresql
} from 'simple-icons'

const { t } = useI18n()

const techIcons = {
  'Vue.js': siVuedotjs,
  'React': siReact,
  'TypeScript': siTypescript,
  'JavaScript': siJavascript,
  'Python': siPython,
  'PHP': siPhp,
  'Node.js': siNodedotjs,
  'Docker': siDocker,
  'AWS': siAmazonaws,
  'WordPress': siWordpress,
  'Shopify': siShopify,
  'Tailwind CSS': siTailwindcss,
  'Sass': siSass,
  'MongoDB': siMongodb,
  'PostgreSQL': siPostgresql
}

const techColors = {
  'Vue.js': '#4FC08D',
  'React': '#61DAFB',
  'TypeScript': '#3178C6',
  'JavaScript': '#F7DF1E',
  'Python': '#3776AB',
  'PHP': '#777BB4',
  'Node.js': '#339933',
  'Docker': '#2496ED',
  'AWS': '#FF9900',
  'WordPress': '#21759B',
  'Shopify': '#7AB55C',
  'Tailwind CSS': '#06B6D4',
  'Sass': '#CC6699',
  'MongoDB': '#47A248',
  'PostgreSQL': '#4169E1'
}

defineProps<{
  experience: {
    id: number
    role: string
    company: string
    period: string
    location: string
    description: string
    achievements: string[]
    technologies: string[]
  } | null
  show: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Modal v-if="experience"
         :show="show"
         maxWidth="3xl"
         className="sm:max-h-[85vh]"
         @close="$emit('close')">
    <div class="p-6 sm:p-8 overflow-y-auto">
      <!-- Header -->
      <div class="mb-8">
        <Title :level="3" gradient class="mb-4">
          {{ experience.role }}
        </Title>
        <div class="space-y-2">
          <div class="flex items-center text-white/70">
            <BriefcaseIcon class="w-5 h-5 mr-3" />
            {{ experience.company }}
          </div>
          <div class="flex items-center text-white/70">
            <CalendarIcon class="w-5 h-5 mr-3" />
            {{ experience.period }}
          </div>
          <div class="flex items-center text-white/70">
            <MapPinIcon class="w-5 h-5 mr-3" />
            {{ experience.location }}
          </div>
        </div>
      </div>

            <!-- Description -->
            <div class="mb-12">
              <p class="text-white/80 leading-relaxed">
                {{ experience.description }}
              </p>
            </div>

            <!-- Achievements -->
            <div class="mb-12">
              <h4 class="text-lg font-semibold text-teal-400 flex items-center mb-4">
                <span class="w-8 h-px bg-teal-500/50 mr-3"></span>
                {{ t('career.achievements') }}
              </h4>
              <List 
                variant="bullet" 
                spacing="md"
                :items="experience.achievements" />
            </div>

            <!-- Technologies -->
            <div>
              <h4 class="text-lg font-semibold text-teal-400 flex items-center mb-4">
                <span class="w-8 h-px bg-teal-500/50 mr-3"></span>
                {{ t('career.technologies') }}
              </h4>
              <div class="flex flex-wrap gap-2">
                <TechBadge v-for="tech in experience.technologies"
                          :key="tech"
                          :name="tech"
                          :icon="techIcons[tech]"
                          :color="techColors[tech]" />
              </div>
            </div>
          </div>
  </Modal>
</template>