<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowTopRightOnSquareIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { 
  siGithub,
  siVuedotjs,
  siReact,
  siTypescript,
  siJavascript,
  siPython,
  siNodedotjs,
  siDocker,
  siAmazonaws,
  siTailwindcss,
  siFirebase,
  siTensorflow,
  siDevdotto
} from 'simple-icons'
import ProjectModal from './ProjectModal.vue'
import { Section, Title, Card, Button, TechBadge } from './ui'

const { t } = useI18n()

const techIcons = {
  'Vue.js': siVuedotjs,
  'React': siReact,
  'React Native': siReact,
  'TypeScript': siTypescript,
  'JavaScript': siJavascript,
  'Python': siPython,
  'Node.js': siNodedotjs,
  'Docker': siDocker,
  'AWS': siAmazonaws,
  'Tailwind CSS': siTailwindcss,
  'Tailwind': siTailwindcss,
  'Firebase': siFirebase,
  'TensorFlow': siTensorflow,
  'Figma': siDevdotto,
  'API': siDevdotto
}

const techColors = {
  'Vue.js': '#4FC08D',
  'React': '#61DAFB',
  'React Native': '#61DAFB',
  'TypeScript': '#3178C6',
  'JavaScript': '#F7DF1E',
  'Python': '#3776AB',
  'Node.js': '#339933',
  'Docker': '#2496ED',
  'AWS': '#FF9900',
  'Tailwind CSS': '#06B6D4',
  'Tailwind': '#06B6D4',
  'Firebase': '#FFCA28',
  'TensorFlow': '#FF6F00',
  'Figma': '#F24E1E',
  'API': '#4A90E2'
}
const projects = [
  {
    title: 'One Day At A Time',
    description: 'Application mobile et web dédiée au suivi de sobriété et à la gestion des addictions',
    longDescription: 'Application mobile et web dédiée à aider les utilisateurs à suivre leur sobriété, gérer leurs progrès et rester motivés dans leur parcours d\'abandon des addictions. L\'application propose une expérience personnalisée, des outils interactifs, et un design intuitif.',
    tags: ['Vue.js', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    technologies: ['Capacitor', 'PWA'],
    features: [
      'Suivi en temps réel des jours de sobriété',
      'Système de récompenses et badges',
      'Journal personnel avec analyse des tendances',
      'Forum anonyme d\'entraide',
      'Ressources et exercices de méditation',
      'Support hors-ligne (PWA)',
      'Mode sombre/clair',
      'Multi-langues'
    ],
    image: '/src/assets/projects/one_day_at_a_time.png',
    link: '#',
  },
  {
    title: 'Planify',
    description: 'Gestionnaire d\'abonnements multi-plateformes pour particuliers',
    longDescription: 'Application mobile permettant aux particuliers de gérer leurs abonnements numériques (streaming, SaaS, gym, assurances, etc.) en centralisant toutes les informations dans une interface unique. L\'outil propose des analyses de consommation, des alertes de renouvellement et des recommandations pour optimiser les abonnements.',
    tags: ['Vue.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    technologies: ['NestJS', 'Prisma', 'Ionic', 'Plaid API'],
    features: [
      'Détection automatique des abonnements via API bancaire',
      'Tableau de bord interactif avec analyses',
      'Alertes de renouvellement et changements de prix',
      'Recommandations IA personnalisées',
      'Gestion des profils familiaux',
      'Export de rapports PDF/CSV',
      'Marketplace d\'offres promotionnelles'
    ],
    image: '/src/assets/projects/planify.png',
    link: '#',
  },
  {
    title: 'Finance Fluide',
    description: 'Application de gestion financière professionnelle pour entrepreneurs et PME',
    longDescription: 'Application de gestion financière professionnelle permettant de suivre les indicateurs clés tels que le chiffre d\'affaires mensuel, trimestriel, et annuel, ainsi que les flux financiers. L\'application offre une interface intuitive et des outils d\'analyse avancés pour les professionnels.',
    tags: ['Vue.js', 'TypeScript', 'Node.js', 'Chart.js'],
    technologies: ['Vite', 'TailwindCSS', 'SQLite', 'D3.js'],
    features: [
      'Suivi des entrées et sorties d\'argent',
      'Import de données via CSV/Excel',
      'Tableau de bord avec KPIs personnalisables',
      'Génération automatique de rapports PDF',
      'Analyses comparatives par période',
      'Prévisions basées sur l\'historique',
      'Gestion multi-utilisateurs avec rôles',
      'Support multidevise'
    ],
    image: '/src/assets/projects/finance_fluide.png',
    link: '#',
  },
  {
    title: 'Prisma Dashboard',
    description: 'Application web de gestion de projet pour agences web et freelances',
    longDescription: 'Prisma Dashboard est une application web de gestion de projet destinée aux agences web et aux freelances. Elle offre une interface intuitive pour organiser les projets, suivre les tâches, collaborer en équipe et optimiser le flux de travail.',
    tags: ['Vue.js', 'Node.js', 'PostgreSQL', 'Express'],
    technologies: ['TailwindCSS', 'Chart.js', 'JWT', 'WebSocket'],
    features: [
      'Gestion de projets avec vues multiples (liste, Kanban, calendrier)',
      'Système de tâches avec priorités et suivi d\'avancement',
      'Messagerie interne et commentaires en temps réel',
      'Gestion des utilisateurs avec rôles et permissions',
      'Tableaux de bord statistiques et reporting',
      'Mode sombre/clair personnalisable',
      'Intégrations Google Calendar et Slack',
      'Authentification sécurisée avec 2FA'
    ],
    image: '/src/assets/projects/prisma_dashboard.png',
    link: '#',
  }
]

const hoveredProject = ref<number | null>(null)
const selectedProject = ref<typeof projects[0] | null>(null)

const openModal = (project: typeof projects[0]) => {
  selectedProject.value = project
}
</script>

<template>
  <Section id="projects" gradient="bottom">
    <div class="w-full">
      <Title :level="2" gradient center class="mb-8 sm:mb-12">{{ t('projects.title') }}</Title>
      
      <p class="text-sm sm:text-base md:text-lg text-center max-w-3xl mx-auto text-white/80 px-4 mb-12 sm:mb-16 md:mb-20 leading-relaxed">
        {{ t('projects.description') }}
      </p>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
        <div v-for="(project, index) in projects" 
              :key="index"
              class="group relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-black/50 backdrop-blur-xl rounded-2xl
                     border border-white/10 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/10
                     transition-all duration-300 cursor-pointer"
              @click="openModal(project)">
          <img :src="project.image" 
               :alt="project.title"
              loading="lazy"
              width="800"
              height="600"
              decoding="async"
               class="absolute inset-0 object-cover w-full h-full transition-transform duration-500
                     md:group-hover:scale-110" />
                     
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent
                      md:opacity-0 opacity-100 md:group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute inset-0 p-6 flex flex-col justify-between">
              <!-- Titre en haut à gauche -->
              <h3 class="text-xl sm:text-2xl font-bold">{{ project.title }}</h3>
              
              <!-- Technologies en bas à droite -->
              <div class="flex flex-wrap justify-end gap-2">
                <div v-for="tag in project.tags.slice(0, 3)"
                     :key="tag"
                     class="w-8 h-8 flex items-center justify-center bg-black/50 rounded-lg
                            backdrop-blur-sm border border-white/10"
                     :style="{ color: techColors[tag] }">
                  <div class="w-5 h-5" :style="{ fill: techColors[tag] }"
                       v-html="(techIcons[tag] || siDevdotto).svg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <ProjectModal 
      v-if="selectedProject"
      :project="selectedProject"
      :show="!!selectedProject"
      @close="selectedProject = null" />
  </Section>
</template>