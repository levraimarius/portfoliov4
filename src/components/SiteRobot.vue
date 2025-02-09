<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { Modal, Title } from './ui'
import { siVuedotjs, siTypescript, siTailwindcss, siGithub, siLinkedin } from 'simple-icons'
import { 
  DocumentTextIcon, 
  InformationCircleIcon,
} from '@heroicons/vue/24/outline'

const threejsIcon = {
  title: 'Three.js',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 117.3C34.6 117.3 10.7 93.4 10.7 64S34.6 10.7 64 10.7s53.3 23.9 53.3 53.3-23.9 53.3-53.3 53.3zm0-96c-23.6 0-42.7 19.1-42.7 42.7s19.1 42.7 42.7 42.7 42.7-19.1 42.7-42.7S87.6 21.3 64 21.3zm0 74.7c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/>
  </svg>`
}

const robot = ref<HTMLDivElement | null>(null)
const eyesContainer = ref<HTMLDivElement | null>(null)
const mouth = ref<HTMLDivElement | null>(null)
const particleCanvas = ref<HTMLCanvasElement | null>(null)
const showModal = ref(false)
const showLinks = ref(false)
const isExpanded = ref(false)
let floatingAnimation: gsap.core.Tween | null = null

const links = [
  {
    icon: siGithub,
    url: 'https://github.com/levraimarius',
    color: '#fff',
    label: 'GitHub'
  },
  {
    icon: siLinkedin,
    url: 'https://www.linkedin.com/in/marius-thiesset/',
    color: '#0A66C2',
    label: 'LinkedIn'
  },
  {
    icon: DocumentTextIcon,
    url: '#',
    color: 'text-teal-400',
    label: 'CV'
  }
]

const handleRobotClick = async () => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
  
  if (!isExpanded.value) {
    // Animation de sortie
    tl.to(robot.value, {
      y: '-80%',
      duration: 0.4,
      ease: 'power2.out'
    })
    .to(robot.value, {
      y: '0%',
      duration: 0.6,
      ease: 'bounce.out'
    })
    .add(() => {
      // Afficher les liens
      showLinks.value = true
    })
    .from('.social-link', {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    })
    
    // Démarrer l'animation de flottement
    startFloatingAnimation()
  } else {
    // Arrêter l'animation de flottement
    if (floatingAnimation) {
      floatingAnimation.kill()
    }
    
    // Animation de retour
    tl.to('.social-link', {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'back.in(1.7)',
      onComplete: () => {
        showLinks.value = false
      }
    })
    .to(robot.value, {
      y: '85%',
      duration: 0.6,
      ease: 'power3.inOut'
    })
  }
  
  isExpanded.value = !isExpanded.value
}

const startFloatingAnimation = () => {
  // Créer une timeline pour le mouvement de base
  floatingAnimation = gsap.to(robot.value, {
    x: 'random(-8, 8)',
    duration: 'random(2, 3)',
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    
    // Ajouter des mouvements aléatoires subtils
    onRepeat: () => {
      // 30% de chance d'ajouter un petit mouvement supplémentaire
      if (Math.random() < 0.3) {
        gsap.to(robot.value, {
          rotation: 'random(-2, 2)',
          y: 'random(-5, 5)',
          duration: 1,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: 1
        })
      }
    }
  })
}

const openPortfolioInfo = () => {
  showModal.value = true
}
let particleCtx: CanvasRenderingContext2D | null = null
let particles: Array<{
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  size: number
  color: string
}> = []
let animationFrameId: number

const createParticle = () => {
  const colors = ['#14b8a6', '#2dd4bf']
  return {
    x: Math.random() * 10 - 5,
    y: 0,
    vx: Math.random() * 0.5 - 0.25,
    vy: Math.random() * 1 + 0.5,
    alpha: Math.random() * 0.4 + 0.2,
    size: Math.random() * 1.5 + 0.5,
    color: colors[Math.floor(Math.random() * colors.length)]
  }
}

const updateParticles = () => {
  if (!particleCanvas.value || !particleCtx) return
  
  particleCtx.clearRect(0, 0, particleCanvas.value.width, particleCanvas.value.height)
  
  if (particles.length < 15 && Math.random() > 0.5) {
    particles.push(createParticle())
  }
  
  particles.forEach((particle, index) => {
    particle.y += particle.vy
    particle.x += particle.vx
    particle.alpha *= 0.95
    
    particleCtx!.save()
    particleCtx!.globalAlpha = particle.alpha
    particleCtx!.fillStyle = particle.color
    particleCtx!.beginPath()
    particleCtx!.arc(
      particleCanvas.value!.width / 2 + particle.x,
      particle.y,
      particle.size,
      0,
      Math.PI * 2
    )
    particleCtx!.fill()
    particleCtx!.restore()
    
    if (particle.alpha < 0.05) {
      particles.splice(index, 1)
    }
  })
  
  animationFrameId = requestAnimationFrame(updateParticles)
}

onMounted(() => {
  // Animation d'apparition
  const tl = gsap.timeline()
  
  // Position initiale : complètement caché
  tl.set(robot.value, {
    y: '150%',
    autoAlpha: 0
  })
  
  // Apparition progressive
  tl.to(robot.value, {
    autoAlpha: 1,
    duration: 0.3,
    delay: 0.5
  })
  
  // Monte doucement pour jeter un coup d'œil
  .to(robot.value, {
    y: '85%',
    duration: 0.8,
    ease: 'power3.out'
  })
  
  // Initialiser le système de particules
  if (particleCanvas.value) {
    particleCtx = particleCanvas.value.getContext('2d')
    particleCanvas.value.width = 20
    particleCanvas.value.height = 20
    updateParticles()
  }
})
</script>

<template>
  <div class="fixed bottom-8 right-8 z-[99] select-none">
    <!-- Liens sociaux -->
    <div v-if="showLinks"
         class="absolute bottom-24 right-4 sm:right-8 flex flex-col items-end gap-3">
      <a v-for="link in links"
         :key="link.label"
         :href="link.url"
         target="_blank"
         rel="noopener noreferrer"
         class="social-link p-2.5 rounded-xl bg-black/50 backdrop-blur-xl border border-white/10
                hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/10
                transition-all duration-300 group flex items-center justify-center">
        <div v-if="link.icon.svg" 
             class="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
             :style="{ fill: link.color }"
             v-html="link.icon.svg"></div>
        <component v-else 
                   :is="link.icon" 
                   class="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" 
                   :class="link.color" />
      </a>
      
      <button @click="openPortfolioInfo"
              class="social-link p-3 rounded-xl bg-black/50 backdrop-blur-xl border border-white/10
                     hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/10
                     transition-all duration-300 group">
        <InformationCircleIcon class="w-6 h-6 transition-transform duration-300 
                                    group-hover:scale-110 group-hover:rotate-3 text-teal-500" />
      </button>
    </div>
    
    <!-- Robot -->
    <div ref="robot" 
         class="absolute right-4 sm:right-8 bottom-0 w-16 sm:w-20 h-16 sm:h-20 transform origin-bottom
                cursor-pointer group transition-all duration-500 ease-out"
         :class="[
           !isExpanded && 'hover:translate-y-[-20%]',
           isExpanded && 'transition-none'
         ]"
         @click="handleRobotClick">
      <div class="relative h-full">
        <!-- Particules -->
        <canvas ref="particleCanvas"
                class="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-8 sm:h-10
                       pointer-events-none blur-[0.5px]" />
        
        <!-- Corps du robot -->
        <div class="absolute inset-0 bg-teal-500/20 backdrop-blur-xl rounded-t-2xl 
                    border border-teal-500/30 overflow-hidden
                    transition-transform duration-500 ease-out"
             :class="[
               !isExpanded && 'group-hover:translate-y-[-20%]',
               isExpanded && 'transition-none'
             ]">
          <!-- Antennes -->
          <div class="absolute top-[-6px] left-1/2 -translate-x-1/2 flex gap-4">
            <div class="relative w-1.5 h-3 bg-teal-400 rounded-full -rotate-15 origin-bottom">
              <div class="absolute top-[-3px] w-3 h-3 bg-teal-300 rounded-full animate-pulse"></div>
            </div>
            <div class="relative w-1.5 h-3 bg-teal-400 rounded-full rotate-15 origin-bottom">
              <div class="absolute top-[-3px] w-3 h-3 bg-teal-300 rounded-full animate-pulse 
                          animation-delay-200"></div>
            </div>
          </div>
          
          <!-- Yeux -->
          <div ref="eyesContainer"
               class="absolute top-4 sm:top-5 left-0 right-0 flex justify-center gap-4 sm:gap-5
                      transition-transform duration-500 ease-out"
               :class="[
                 !isExpanded && 'group-hover:translate-y-[-20%]',
                 isExpanded && 'transition-none'
               ]">
            <div class="relative w-3 sm:w-4 h-3 sm:h-4">
              <div class="absolute inset-0 bg-white rounded-full animate-blink"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-teal-300 to-teal-400 opacity-50 
                          rounded-full blur-[2px]"></div>
            </div>
            <div class="relative w-3 sm:w-4 h-3 sm:h-4">
              <div class="absolute inset-0 bg-white rounded-full animate-blink animation-delay-200"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-teal-300 to-teal-400 opacity-50 
                          rounded-full blur-[2px]"></div>
            </div>
          </div>
          
          <!-- Bouche -->
          <div ref="mouth"
               class="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 w-8 sm:w-10">
            <div class="h-1.5 sm:h-2 bg-white/70 rounded-full origin-center transform-gpu"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-teal-300 to-teal-400 opacity-30 
                       rounded-full blur-[2px]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal d'information sur le portfolio -->
  <Modal :show="showModal" @close="showModal = false">
    <div class="p-6 sm:p-8 space-y-8">
      <Title :level="3" gradient class="mb-6">À propos de ce portfolio</Title>
      
      <p class="text-white/80 leading-relaxed mb-8">
        Ce portfolio a été créé avec Vue.js 3, TypeScript et Tailwind CSS. Il utilise également Three.js pour les effets 3D
        et GSAP pour les animations fluides. Le code source est disponible sur GitHub.
      </p>
      
      <div class="flex flex-wrap gap-4">
        <div v-for="tech in [siVuedotjs, siTypescript, siTailwindcss, threejsIcon]"
             :key="tech.title"
             class="p-3 rounded-xl bg-black/50 backdrop-blur-xl border border-white/10
                    transition-all duration-300 group">
          <div class="w-6 h-6" 
               :style="{ fill: tech === siVuedotjs ? '#4FC08D' : 
                               tech === siTypescript ? '#3178C6' :
                               tech === siTailwindcss ? '#06B6D4' : '#049EF4' }"
               v-html="tech.svg"></div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
@keyframes blink {
  0%, 95%, 100% { transform: scaleY(1); opacity: 1; }
  97% { transform: scaleY(0.1); opacity: 0.8; }
}

.animate-blink {
  animation: blink 4s infinite;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.-rotate-15 {
  transform: rotate(-15deg);
}

.rotate-15 {
  transform: rotate(15deg);
}
</style>