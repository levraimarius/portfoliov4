<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { BriefcaseIcon, CalendarIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import CareerModal from './CareerModal.vue'
import { Section, Title, Timeline } from './ui'

const { t } = useI18n()

const selectedExperience = ref<number | null>(null)

const experiences = [
  {
    id: 1,
    role: 'Fondateur & Développeur',
    company: 'Prisma Création',
    period: 'oct. 2024 - aujourd\'hui',
    location: 'Paris et périphérie',
    description: 'Prisma Création est une agence web spécialisée dans la conception de solutions digitales sur mesure pour les entreprises et entrepreneurs souhaitant accélérer leur croissance en ligne. En tant que fondateur, je combine expertise technique et vision stratégique pour accompagner mes clients à travers des projets de développement web performants et innovants.',
    achievements: [
      'Création et gestion d\'une agence web spécialisée',
      'Développement de solutions digitales sur mesure',
      'Accompagnement stratégique des clients'
    ],
    technologies: ['Vue.js', 'React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL']
  },
  {
    id: 2,
    role: 'Développeur Full Stack',
    company: 'Indépendant',
    period: 'mars 2023 - oct. 2024',
    location: 'Paris et périphérie',
    description: 'En tant que développeur indépendant, j\'ai géré des projets complexes et dirigé des équipes multidisciplinaires.',
    achievements: [
      'Gestion stratégique d\'une équipe multidisciplinaire',
      'Conception et implémentation d\'écosystèmes complexes',
      'Développement de systèmes de scénarisation et gamification',
      'Gestion des partenariats stratégiques',
      'Mise en place d\'un support client segmenté',
      'Expertise en propriété intellectuelle et conformité légale'
    ],
    technologies: ['React', 'TypeScript', 'SCSS', 'Node.js', 'MongoDB']
  },
  {
    id: 3,
    role: 'Développeur Full Stack',
    company: 'GABOWEB',
    period: 'août 2021 - sept. 2022',
    location: 'Montataire, Hauts-de-France, France',
    description: 'En alternance, j\'ai participé à la création et à la maintenance de sites web professionnels.',
    achievements: [
      'Création de sites internet optimisés',
      'Maintenance opérationnelle continue',
      'Développement de nouvelles fonctionnalités',
      'Conception de thèmes et plugins WordPress',
      'Rédaction de documentations techniques'
    ],
    technologies: ['PHP', 'WordPress', 'JavaScript', 'MySQL', 'Git']
  },
  {
    id: 4,
    role: 'Développeur JavaScript / React',
    company: 'Pretidev',
    period: 'janv. 2021 - mars 2021',
    location: 'Vigneux-sur-Seine, Île-de-France, France',
    description: 'Stage axé sur le développement d\'une plateforme sociale innovante.',
    achievements: [
      'Conception d\'une plateforme de mise en relation',
      'Création d\'un environnement ergonomique et interactif',
      'Rédaction de documentations techniques',
      'Optimisation de l\'expérience utilisateur'
    ],
    technologies: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Git']
  },
  {
    id: 5,
    role: 'Développeur Full Stack',
    company: 'Groupe Magasin Général / Auchan',
    period: 'mai 2019 - juin 2019',
    location: 'Noyon, Hauts-de-France, France',
    description: 'Stage focalisé sur le développement d\'outils internes.',
    achievements: [
      'Développement d\'un site d\'intégration pour nouveaux employés',
      'Création d\'un système de gestion de tâches',
      'Optimisation des processus internes',
      'Implémentation de solutions locales sécurisées'
    ],
    technologies: ['PHP', 'JavaScript', 'SCSS', 'MySQL', 'Git']
  }
]

const currentExperience = computed(() => 
  experiences.find(exp => exp.id === selectedExperience.value) || null
)
</script>

<template>
  <Section id="career" gradient="center">
    <div class="w-full max-w-4xl mx-auto">
      <Title :level="2" gradient center class="mb-12 sm:mb-16 md:mb-24">
        {{ t('career.title') }}
      </Title>
      <div class="space-y-6 sm:space-y-12 px-4">
        <div v-for="(experience, index) in experiences"
                 :key="experience.id"
                 class="relative group">
          <div v-if="index !== experiences.length - 1" 
               class="absolute left-[21px] sm:left-[29px] top-[52px] sm:top-[72px] bottom-0 w-0.5
                      bg-gradient-to-b from-teal-500/30 to-transparent transition-colors duration-300"></div>
          
          <div class="relative flex items-start gap-3 sm:gap-6">
            <div class="relative flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/50
                        border-2 transition-colors duration-300 border-teal-500/30 hover:border-teal-500">
              <BriefcaseIcon class="w-4 h-4 sm:w-6 sm:h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                   text-teal-500/70 group-hover:text-teal-400 transition-colors duration-300" />
            </div>
          
          <button @click="selectedExperience = experience.id"
                  class="w-full text-left">
            <div class="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10
                       hover:border-teal-500/30 transition-all duration-300
                       hover:shadow-lg hover:shadow-teal-500/10
                       hover:translate-x-2">
              <div class="flex justify-between items-start gap-4">
                <div>
                  <h3 class="text-base sm:text-xl md:text-2xl font-bold text-teal-400 mb-1.5 sm:mb-2">
                    {{ experience.role }}
                  </h3>
                  <div class="space-y-0.5 sm:space-y-1 text-xs sm:text-base">
                    <div class="flex items-center text-white/70 gap-1.5 sm:gap-2">
                      <BriefcaseIcon class="w-3 h-3 sm:w-4 sm:h-4" />
                      {{ experience.company }}
                    </div>
                    <div class="flex items-center text-white/70 gap-1.5 sm:gap-2 transition-colors duration-300">
                      <CalendarIcon class="w-3 h-3 sm:w-4 sm:h-4" />
                      {{ experience.period }}
                    </div>
                    <div class="flex items-center text-white/70 gap-1.5 sm:gap-2 transition-colors duration-300">
                      <MapPinIcon class="w-3 h-3 sm:w-4 sm:h-4" />
                      {{ experience.location }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
          </div>
        </div>
      </div>
    </div>

    <CareerModal 
      :experience="currentExperience"
      :show="!!selectedExperience"
      @close="selectedExperience = null" />
  </Section>
</template>