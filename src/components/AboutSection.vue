<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Section, Title, Button, TechGrid } from './ui'
import { 
  siVuedotjs,
  siReact,
  siTypescript,
  siJavascript,
  siPython,
  siPhp,
  siNodedotjs,
  siDocker,
  siAmazonaws,
  siWordpress,
  siShopify,
  siTailwindcss,
  siSass,
  siMongodb,
  siPostgresql
} from 'simple-icons'

const { t } = useI18n()

const hoveredTech = ref<string | null>(null)
const selectedCategory = ref('all')
const tooltipPosition = ref<'left' | 'right'>('right')
const windowWidth = ref(0)

onMounted(() => {
  windowWidth.value = window.innerWidth
  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }
  window.addEventListener('resize', handleResize)
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})

const updateTooltipPosition = (event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  tooltipPosition.value = centerX > window.innerWidth / 2 ? 'left' : 'right'
}

const techCount = computed(() => {
  const counts = {
    all: technologies.value.length,
    frontend: technologies.value.filter(tech => tech.category === 'frontend').length,
    backend: technologies.value.filter(tech => tech.category === 'backend').length,
    languages: technologies.value.filter(tech => tech.category === 'languages').length,
    cloud: technologies.value.filter(tech => tech.category === 'cloud').length,
    cms: technologies.value.filter(tech => tech.category === 'cms').length
  }
  return counts
})

const categories = [
  { id: 'all', name: t('about.categories.all') },
  { id: 'frontend', name: t('about.categories.frontend') },
  { id: 'backend', name: t('about.categories.backend') },
  { id: 'languages', name: t('about.categories.languages') },
  { id: 'cloud', name: t('about.categories.cloud') },
  { id: 'cms', name: t('about.categories.cms') }
]

const technologies = ref([
  {
    name: t('about.technologies.vuejs.name'),
    key: 'vuejs',
    icon: siVuedotjs,
    category: 'frontend',
    description: t('about.technologies.vuejs.description'),
    color: '#4FC08D'
  },
  {
    name: t('about.technologies.react.name'),
    key: 'react',
    icon: siReact,
    category: 'frontend',
    description: t('about.technologies.react.description'),
    color: '#61DAFB'
  },
  {
    name: t('about.technologies.tailwindcss.name'),
    key: 'tailwindcss',
    icon: siTailwindcss,
    category: 'frontend',
    description: t('about.technologies.tailwindcss.description'),
    color: '#06B6D4'
  },
  {
    name: t('about.technologies.sass.name'),
    key: 'sass',
    icon: siSass,
    category: 'frontend',
    description: t('about.technologies.sass.description'),
    color: '#CC6699'
  },
  {
    name: t('about.technologies.typescript.name'),
    key: 'typescript',
    icon: siTypescript,
    category: 'languages',
    description: t('about.technologies.typescript.description'),
    color: '#3178C6'
  },
  {
    name: t('about.technologies.javascript.name'),
    key: 'javascript',
    icon: siJavascript,
    category: 'languages',
    description: t('about.technologies.javascript.description'),
    color: '#F7DF1E'
  },
  {
    name: t('about.technologies.python.name'),
    key: 'python',
    icon: siPython,
    category: 'languages',
    description: t('about.technologies.python.description'),
    color: '#3776AB'
  },
  {
    name: t('about.technologies.php.name'),
    key: 'php',
    icon: siPhp,
    category: 'languages',
    description: t('about.technologies.php.description'),
    color: '#777BB4'
  },
  {
    name: t('about.technologies.nodejs.name'),
    key: 'nodejs',
    icon: siNodedotjs,
    category: 'backend',
    description: t('about.technologies.nodejs.description'),
    color: '#339933'
  },
  {
    name: t('about.technologies.mongodb.name'),
    key: 'mongodb',
    icon: siMongodb,
    category: 'backend',
    description: t('about.technologies.mongodb.description'),
    color: '#47A248'
  },
  {
    name: t('about.technologies.postgresql.name'),
    key: 'postgresql',
    icon: siPostgresql,
    category: 'backend',
    description: t('about.technologies.postgresql.description'),
    color: '#4169E1'
  },
  {
    name: t('about.technologies.docker.name'),
    key: 'docker',
    icon: siDocker,
    category: 'backend',
    description: t('about.technologies.docker.description'),
    color: '#2496ED'
  },
  {
    name: t('about.technologies.aws.name'),
    key: 'aws',
    icon: siAmazonaws,
    category: 'cloud',
    description: t('about.technologies.aws.description'),
    color: '#FF9900'
  },
  {
    name: t('about.technologies.wordpress.name'),
    key: 'wordpress',
    icon: siWordpress,
    category: 'cms',
    description: t('about.technologies.wordpress.description'),
    color: '#21759B'
  },
  {
    name: t('about.technologies.shopify.name'),
    key: 'shopify',
    icon: siShopify,
    category: 'cms',
    description: t('about.technologies.shopify.description'),
    color: '#7AB55C'
  }
])

const filteredTechnologies = computed(() => {
  if (selectedCategory.value === 'all') {
    return technologies.value
  }
  return technologies.value.filter(tech => tech.category === selectedCategory.value)
})
</script>

<template>
  <Section id="about">
    <div class="w-full">
      <Title :level="2" gradient center class="mb-8 sm:mb-12 md:mb-16">{{ t('about.title') }}</Title>
      
      <div class="mb-24 relative">
        <div class="absolute inset-0 bg-teal-500/5 blur-3xl -z-10"></div>
        <p class="text-sm sm:text-base md:text-lg text-center max-w-3xl mx-auto text-white/80 px-4 leading-relaxed">
          {{ t('about.description') }}
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-4 mb-8 sm:mb-12 md:mb-16 px-4">
        <Button v-for="category in categories"
                :key="category.id"
                @click="selectedCategory = category.id"
                :variant="selectedCategory === category.id ? 'primary' : 'ghost'"
                size="sm"
                class="text-xs sm:text-sm">
          <span>{{ category.name }}</span>
          <span class="ml-1 sm:ml-2 text-xs sm:text-sm opacity-60">({{ techCount[category.id] }})</span>
        </Button>
      </div>
      
      <TechGrid 
        :technologies="technologies"
        :selectedCategory="selectedCategory"
      />
      
      <div class="mt-16 text-center text-white/50">
        {{ t('about.skills') }}
      </div>
    </div>
  </Section>
</template>

<style scoped>
@media (max-width: 1023px) {
  .tech-card:hover {
    z-index: 1 !important;
  }
}

.tech-card {
  isolation: isolate;
  animation: tech-enter 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  animation-fill-mode: both;
}

.tooltip {
  animation: tooltip 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

@keyframes tooltip {
  0% {
    opacity: 0;
    transform: translate(
      var(--tooltip-offset-x, 
        v-bind(tooltipPosition) === 'left' ? 10px : -10px
      ), 
      -50%
    );
  }
  100% {
    opacity: 1;
    transform: translate(0, -50%);
  }
}

@keyframes tech-enter {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>