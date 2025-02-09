<script setup lang="ts">
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { Button } from './ui'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  text: string,
  currentStep: number
}>()

const currentWordIndex = ref(0)
const showButton = ref(false)
const particleCanvas = ref<HTMLCanvasElement | null>(null)
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
    x: Math.random() * 10 - 5, // Position relative au centre, réduite
    y: 0,
    vx: Math.random() * 0.5 - 0.25, // Vitesse horizontale réduite
    vy: Math.random() * 1 + 0.5, // Vitesse verticale plus douce
    alpha: Math.random() * 0.4 + 0.2, // Opacité réduite
    size: Math.random() * 1.5 + 0.5, // Taille variable mais petite
    color: colors[Math.floor(Math.random() * colors.length)]
  }
}

const updateParticles = () => {
  if (!particleCanvas.value || !particleCtx) return
  
  particleCtx.clearRect(0, 0, particleCanvas.value.width, particleCanvas.value.height)
  
  // Ajouter de nouvelles particules
  if (particles.length < 15 && Math.random() > 0.5) { // Moins de particules, génération plus espacée
    particles.push(createParticle())
  }
  
  // Mettre à jour et dessiner les particules
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
    
    // Supprimer les particules mortes
    if (particle.alpha < 0.05) {
      particles.splice(index, 1)
    }
  })
  
  animationFrameId = requestAnimationFrame(updateParticles)
}

watch(() => props.text, () => {
  // Réinitialiser l'état
  currentWordIndex.value = 0
  showButton.value = false
  // Relancer l'animation du texte
  typeWords()
})

const emit = defineEmits<{
  (e: 'next', isLast?: boolean): void
}>()

const handleContinue = () => {
  if (props.currentStep === 2 && currentWordIndex.value === words.value.length - 1) {
    exitAnimation()
  } else {
    emit('next')
  }
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

const exitAnimation = async () => {
  const tl = gsap.timeline()
  
  // Arrêter l'animation de flottement
  if (floatingAnimation) {
    floatingAnimation.kill()
  }
  
  await tl
    // Faire disparaître la bulle
    .to(bubble.value, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'back.in(1.7)'
    })
    // Le robot regarde en bas
    .to(eyesContainer.value, {
      y: '50%',
      duration: 0.3,
      ease: 'power2.out'
    })
    // Le robot descend doucement
    .to(robot.value, {
      y: '85%',
      duration: 0.6,
      ease: 'power2.inOut'
    })
    // Balayage rapide des yeux
    .to(eyesContainer.value, {
      x: '-5%',
      duration: 0.3,
      ease: 'power1.inOut'
    })
    // Le robot disparaît complètement
    .to(robot.value, {
      y: '150%',
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        emit('next', true)
      }
    })
}

const robot = ref<HTMLDivElement | null>(null)
const bubble = ref<HTMLDivElement | null>(null)
const eyes = ref<HTMLDivElement | null>(null)
let floatingAnimation: gsap.core.Tween | null = null
const eyesContainer = ref<HTMLDivElement | null>(null)
const mouth = ref<HTMLDivElement | null>(null)

const words = computed(() => props.text ? props.text.split(' ') : [])
const displayedText = computed(() => words.value.slice(0, currentWordIndex.value + 1).join(' '))

const animateMouth = () => {
  if (!mouth.value) return
  
  gsap.to(mouth.value, {
    keyframes: [
      { scaleX: 1.2, duration: 0.1 },
      { scaleX: 0.9, duration: 0.1 },
      { scaleX: 1.1, duration: 0.1 },
      { scaleX: 1, duration: 0.1 }
    ],
    ease: 'none'
  })
}

const typeWords = async () => {
  for (let i = 0; i < words.value.length; i++) {
    currentWordIndex.value = i
    animateMouth()
    await new Promise(resolve => setTimeout(resolve, 100))
    if (i === words.value.length - 1) {
      showButton.value = true
    }
  }
}

onMounted(() => {
  // Séquence d'animation
  const tl = gsap.timeline()
  
  // Position initiale : complètement caché
  tl.set(robot.value, {
    y: '100%',
    autoAlpha: 0,
    right: '2rem'
  })
  
  // Apparition progressive du robot
  tl.to(robot.value, {
    autoAlpha: 1,
    duration: 0.3
  })
  
  // Le robot monte doucement pour jeter un coup d'œil
  .to(robot.value, {
    y: '85%',
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.1')
  
  // Balayage des yeux de gauche à droite
  .to(eyesContainer.value, {
    x: '15%',
    duration: 1,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: 1
  })
  
  // Le robot sort complètement avec un effet rebond
  .to(robot.value, {
    y: '0%',
    duration: 1,
    ease: 'elastic.out(1, 0.5)'
  }).add(() => {
    // Démarrer l'animation de flottement une fois que le robot est sorti
    startFloatingAnimation()
  }, '+=0.2')
  
  // Apparition de la bulle
  .from(bubble.value, {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    ease: 'back.out(1.7)'
  })
  .add(() => {
    typeWords()
  })
  
  // Initialiser le système de particules
  if (particleCanvas.value) {
    particleCtx = particleCanvas.value.getContext('2d')
    particleCanvas.value.width = 20  // Canvas plus petit
    particleCanvas.value.height = 20
    updateParticles()
  }
})

onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  if (floatingAnimation) {
    floatingAnimation.kill()
  }
})
</script>

<template>
  <div class="fixed bottom-8 right-8 z-[104] flex items-end">
    <!-- Robot -->
    <div ref="robot" 
         class="absolute right-4 sm:right-8 bottom-0 w-16 sm:w-20 h-16 sm:h-20 transform origin-bottom">
      <!-- Particules -->
      <canvas ref="particleCanvas"
              class="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-8 sm:h-10
                     pointer-events-none blur-[0.5px]" />
      
      <!-- Corps du robot -->
      <div class="absolute inset-0 bg-teal-500/20 backdrop-blur-xl rounded-t-2xl 
                  border border-teal-500/30 overflow-hidden">
        <!-- Antennes -->
        <div class="absolute top-[-6px] left-1/2 -translate-x-1/2 flex gap-4">
          <div class="relative w-1.5 h-3 bg-teal-400 rounded-full -rotate-15 origin-bottom">
            <div class="absolute top-[-3px] w-3 h-3 bg-teal-300 rounded-full animate-pulse"></div>
          </div>
          <div class="relative w-1.5 h-3 bg-teal-400 rounded-full rotate-15 origin-bottom">
            <div class="absolute top-[-3px] w-3 h-3 bg-teal-300 rounded-full animate-pulse" 
                 style="animation-delay: 0.2s"></div>
          </div>
        </div>
        
        <!-- Yeux -->
        <div ref="eyesContainer"
             class="absolute top-4 sm:top-5 left-0 right-0 flex justify-center gap-4 sm:gap-5">
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

    <!-- Bulle de dialogue -->
    <div ref="bubble" 
         class="max-w-[calc(100vw-5rem)] sm:max-w-sm mb-20 mr-20 sm:mr-24 p-3 sm:p-4 bg-white/10 backdrop-blur-xl rounded-2xl
                border border-white/20 text-white/90 relative">
      <!-- Flèche de la bulle -->
      <div class="absolute bottom-[-8px] right-8 w-4 h-4 bg-white/10 
                  border-r border-b border-white/20 transform rotate-45"></div>
      <!-- Texte -->
      <p class="relative text-xs sm:text-sm leading-relaxed pb-8">{{ displayedText }}</p>
      
      <!-- Lien Continuer -->
      <a v-if="showButton"
         href="#"
         @click.prevent="handleContinue"
         class="absolute bottom-2 sm:bottom-3 right-3 sm:right-4 text-xs sm:text-sm text-teal-400 hover:text-teal-300
                flex items-center gap-1 opacity-0 animate-fade-in
                transition-colors duration-300">
        <span>Continuer</span>
        <ArrowRightIcon class="w-2.5 sm:w-3 h-2.5 sm:h-3 transform transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  </div>
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

.mouth-talking {
  transform-origin: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
</style>