<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Modal, Title, List, TechBadge } from './ui'
import {
  siVuedotjs, siReact, siTypescript, siJavascript, siPython,
  siPhp, siNodedotjs, siDocker, siAmazonaws, siWordpress,
  siShopify, siTailwindcss, siSass, siMongodb, siPostgresql,
  siGithub
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
  'PostgreSQL': siPostgresql,
  'Firebase': null,
  'TensorFlow': null,
  'DynamoDB': null,
  'AWS Lambda': null
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
  'PostgreSQL': '#4169E1',
  'Firebase': '#FFCA28',
  'TensorFlow': '#FF6F00',
  'DynamoDB': '#4053D6',
  'AWS Lambda': '#FF9900'
}

defineProps<{
  project: {
    title: string
    description: string
    tags: string[]
    image: string
    link: string
    github?: string
    longDescription?: string
    features?: string[]
    technologies?: string[]
  }
  show: boolean
}>()
</script>

<template>
  <Modal v-if="project"
         :show="show"
         maxWidth="5xl"
         className="sm:max-h-[85vh]"
         @close="$emit('close')">
    <div class="flex flex-col lg:flex-row h-full">
      <div class="relative w-full lg:w-1/2 shrink-0">
        <div class="aspect-video lg:aspect-auto lg:h-full">
          <img :src="project.image" 
               :alt="project.title"
               class="object-cover w-full h-full" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
      </div>
      
      <div class="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div class="flex items-center gap-4 mb-6">
          <h3 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 
                     bg-clip-text text-transparent">{{ project.title }}</h3>
          <a v-if="project.github"
             :href="project.github"
             target="_blank"
             rel="noopener noreferrer"
             class="p-2 rounded-lg bg-white/5 hover:bg-white/10 
                    transition-all duration-300 group/github">
            <div class="w-6 h-6 transition-transform duration-300 
                      group-hover/github:scale-110 group-hover/github:rotate-3"
                 :style="{ fill: 'white' }"
                 v-html="siGithub.svg"></div>
          </a>
        </div>
            
        <p class="text-white/80 mb-8 leading-relaxed">
          {{ project.longDescription || project.description }}
        </p>
            
        <div v-if="project.features" class="mb-8">
          <Title :level="4" gradient>
            {{ t('projects.features') }}
          </Title>
          <List 
            variant="bullet" 
            spacing="md"
            :items="project.features" />
        </div>
            
        <div class="space-y-6">
          <Title :level="4" gradient>
            {{ t('projects.technologies') }}
          </Title>
              
          <div class="flex flex-wrap gap-2">
            <TechBadge v-for="tech in [...project.tags, ...(project.technologies || [])]"
                      :key="tech"
                      :name="tech"
                      :icon="techIcons[tech]"
                      :color="techColors[tech]" />
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>