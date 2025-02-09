<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'
import { gsap } from 'gsap'
import Cookies from 'js-cookie'
import OnboardingGuide from './OnboardingGuide.vue'
import { Button } from './ui'
import * as THREE from 'three'
import { ArrowRightIcon, SparklesIcon, CodeBracketIcon, RocketLaunchIcon } from '@heroicons/vue/24/outline'

const { t } = useI18n()
const currentStep = ref(0)
const isAnimating = ref(false)
const canvas = ref<HTMLCanvasElement | null>(null)
const content = ref<HTMLElement | null>(null)
const showGuide = ref(false)
const progressBar = ref<HTMLDivElement | null>(null)
const hasCompletedOnboarding = useLocalStorage('onboardingCompleted', false)

const steps = computed(() => [
  {
    title: t('onboarding.welcome.title'),
    description: t('onboarding.welcome.description'),
    icon: SparklesIcon
  },
  {
    title: t('onboarding.skills.title'),
    description: t('onboarding.skills.description'),
    icon: CodeBracketIcon
  },
  {
    title: t('onboarding.projects.title'),
    description: t('onboarding.projects.description'),
    icon: RocketLaunchIcon
  }
])

const progress = computed(() => ((currentStep.value + 1) / steps.value.length) * 100)

const updateProgress = () => {
  if (progressBar.value) {
    gsap.to(progressBar.value, {
      width: `${progress.value}%`,
      duration: 0.6,
      ease: 'power2.out'
    })
  }
}
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let starField: THREE.Points
let hyperdriveField: THREE.Points
let frameId: number
const STAR_SPEED = 2

const initThreeJS = () => {
  if (!canvas.value) return

  // Configuration initiale
  // Configuration de base
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 1

  // Configuration du renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: false,
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000)

  // Création de l'étoile scintillante
  const starGeometry = new THREE.CircleGeometry(0.05, 32)
  const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      intensity: { value: 0 },
      twinkle: { value: 0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelMatrix * viewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float intensity;
      uniform float twinkle;
      varying vec2 vUv;
      void main() {
        vec2 center = vec2(0.5, 0.5);
        float dist = distance(vUv, center);
        float glow = 1.0 - smoothstep(0.0, 0.5, dist);
        vec3 color = vec3(0.078, 0.722, 0.651); // Couleur teal
        float brightness = intensity * (1.0 + sin(time * 5.0) * twinkle);
        gl_FragColor = vec4(color, glow * brightness);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending
  })
  const starMesh = new THREE.Mesh(starGeometry, glowMaterial)
  starMesh.position.z = -1
  scene.add(starMesh)
  
  // Flash d'écran
  const flashGeometry = new THREE.PlaneGeometry(4, 4)
  const flashMaterial = new THREE.MeshBasicMaterial({
    color: 0x14b8a6,
    transparent: true,
    opacity: 0
  })
  const flashMesh = new THREE.Mesh(flashGeometry, flashMaterial)
  scene.add(flashMesh)

  // Animation de l'étoile
  const animateStar = () => {
    if (glowMaterial.uniforms.time) {
      glowMaterial.uniforms.time.value += 0.016
    }
    requestAnimationFrame(animateStar)
  }
  animateStar()

  // Création du champ d'étoiles
  const starsGeometry = new THREE.BufferGeometry()
  const positions = []
  const colors = []

  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * 600 - 300
    const y = Math.random() * 600 - 300
    const z = Math.random() * 600 - 300
    positions.push(x, y, z)

    const color = new THREE.Color()
    color.setHSL(Math.random(), 0.5, 0.8)
    colors.push(color.r, color.g, color.b)
  }

  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

  const starsMaterial = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0
  })

  starField = new THREE.Points(starsGeometry, starsMaterial)
  scene.add(starField)

  // Créer un groupe pour les étoiles
  const starsGroup = new THREE.Group()
  starsGroup.add(starField)
  scene.add(starsGroup)

  // Création de l'effet hyperespace
  const hyperdriveGeometry = new THREE.BufferGeometry()
  const hyperdriveMaterial = new THREE.PointsMaterial({
    size: 0.5,
    color: 0x14b8a6,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  })

  positions.length = 0 // Réinitialiser le tableau
  const initialPositions = []
  const targetPositions = []
  
  for (let i = 0; i < 8000; i++) {
    // Position initiale proche du centre
    const r = Math.random() * 10
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    // Position initiale (proche du centre)
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)
    initialPositions.push(x, y, z)
    
    // Position cible (tunnel d'hyperespace)
    const targetR = Math.random() * 200 + 100
    const targetX = targetR * Math.cos(theta)
    const targetY = Math.random() * 600 - 300
    const targetZ = targetR * Math.sin(theta)
    targetPositions.push(targetX, targetY, targetZ)
    
    // Commencer avec les positions initiales
    positions.push(x, y, z)
  }

  hyperdriveGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  hyperdriveGeometry.setAttribute('targetPosition', new THREE.Float32BufferAttribute(targetPositions, 3))
  hyperdriveField = new THREE.Points(hyperdriveGeometry, hyperdriveMaterial)
  scene.add(hyperdriveField)

  // Animation d'entrée
  gsap.timeline()
    // Apparition de l'étoile
    .set(glowMaterial.uniforms.intensity, {
      value: 0
    })
    .set(glowMaterial.uniforms.twinkle, {
      value: 0
    })
    .to(glowMaterial.uniforms.intensity, {
      value: 1,
      duration: 2,
      delay: 1,
      ease: 'power3.out'
    })
    // Scintillement de l'étoile
    .to(glowMaterial.uniforms.twinkle, {
      value: 1,
      duration: 1.5,
      ease: 'sine.inOut'
    })
    // Grossissement de l'étoile
    .to(starMesh.scale, {
      x: 15,
      y: 15,
      duration: 0.8,
      ease: 'power3.in',
      onComplete: () => {
        scene.remove(starMesh)
      }
    })
    // Flash d'écran
    .to(flashMaterial, {
      opacity: 0.7,
      duration: 0.5,
      ease: 'power2.in'
    })
    .to(flashMaterial, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out'
    }, '-=0.2')
    // Effet d'hyperespace
    .to(camera.position, {
      z: 3,
      duration: 2.5,
      ease: 'power4.inOut'
    })
    // Rotation progressive des étoiles statiques
    .to(starsGroup.rotation, {
      y: Math.PI * 2,
      duration: 2.5,
      ease: 'power2.inOut'
    }, '-=2.5')
    // Zoom et fade out des étoiles statiques
    .to(starField.material, {
      size: 4,
      opacity: 0,
      duration: 2.5,
      ease: 'power2.inOut'
    }, '-=2.5')
    // Apparition progressive de l'hyperespace
    .to(hyperdriveField.material, {
      opacity: 0.8,
      duration: 2.5,
      ease: 'power4.inOut'
    }, '-=2')
    // Animation des particules vers leurs positions finales
    .to(hyperdriveField.geometry.attributes.position.array, {
      endArray: targetPositions,
      duration: 2.5,
      ease: 'power4.out',
      onUpdate: () => {
        hyperdriveField.geometry.attributes.position.needsUpdate = true
      }
    }, '-=2')
    .to(content.value, {
      opacity: 1,
      duration: 1.5,
      ease: 'power4.out',
      onComplete: () => {
        // Animer le titre
        gsap.to('.onboarding-title', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power4.out',
          onComplete: () => {
            // Animer la description mot par mot
            gsap.to('.description-word', {
              opacity: 1,
              y: 0,
              stagger: 0.02,
              duration: 0.8,
              ease: 'power3.out'
            }).then(() => {
              // Animer le bouton
              gsap.to('.onboarding-button', {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.5)',
                onComplete: () => {
                  showGuide.value = true
                }
              })
            })
          }
        })
      }
    })

  // Animation
  const animate = () => {
    frameId = requestAnimationFrame(animate)
    
    // Animer les étoiles avec un effet de profondeur
    const starPositions = starField.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < starPositions.length; i += 3) {
      starPositions[i + 2] += STAR_SPEED
      if (starPositions[i + 2] > 300) starPositions[i + 2] = -300
    }
    starField.geometry.attributes.position.needsUpdate = true
    
    // Animer l'effet d'hyperespace avec une rotation
    const hyperdrivePositions = hyperdriveField.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < hyperdrivePositions.length; i += 3) {
      hyperdrivePositions[i + 2] += STAR_SPEED * 2
      if (hyperdrivePositions[i + 2] > 300) hyperdrivePositions[i + 2] = -300
      
      // Ajouter une légère rotation
      const x = hyperdrivePositions[i]
      const z = hyperdrivePositions[i + 2]
      const angle = 0.0005
      hyperdrivePositions[i] = x * Math.cos(angle) - z * Math.sin(angle)
      hyperdrivePositions[i + 2] = x * Math.sin(angle) + z * Math.cos(angle)
    }
    hyperdriveField.geometry.attributes.position.needsUpdate = true

    renderer.render(scene, camera)
  }

  animate()

  // Gestion du redimensionnement
  const handleResize = () => {
    if (!canvas.value) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
    cancelAnimationFrame(frameId)
    
    starField.geometry.dispose()
    ;(starField.material as THREE.Material).dispose()
    scene.remove(starField)
    hyperdriveField.geometry.dispose()
    ;(hyperdriveField.material as THREE.Material).dispose()
    scene.remove(hyperdriveField)
    
    renderer.dispose()
  }
}

const nextStep = async (isLast?: boolean) => {
  if (isAnimating.value) return
  isAnimating.value = true
  
  // Animation de sortie
  await gsap.to('.onboarding-content', {
    opacity: 0,
    y: -30,
    scale: 0.95,
    duration: 0.8,
    ease: 'power3.in'
  })
  
  currentStep.value++
  updateProgress()
  
  if (currentStep.value >= steps.value.length || isLast) {
    hasCompletedOnboarding.value = true
    Cookies.set('onboardingCompleted', 'true', { expires: 365 })
    // Animer les étoiles pour l'effet de vitesse lumière
    gsap.timeline({
      onComplete: () => emit('complete')
    })
      .to(camera.position, {
        z: 0.1,
        duration: 2.5,
        ease: 'power4.in'
      }, 0)
      .to(starField.material, {
        opacity: 0,
        duration: 2,
        ease: 'power3.in'
      }, 0)
      .to(hyperdriveField.material, {
        opacity: 1,
        size: 3,
        duration: 2.5,
        ease: 'power4.in'
      }, 0)
      .to('.onboarding-content', {
        opacity: 0,
        scale: 0.9,
        filter: 'blur(20px)',
        duration: 2,
        ease: 'power3.in'
      }, 0)
    return
  }
  
  await gsap.to('.onboarding-content', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'power3.out'
  })
  
  isAnimating.value = false
}

const emit = defineEmits<{
  (e: 'complete'): void
}>()

onMounted(() => {
  document.body.classList.add('onboarding-active')
  const cleanup = initThreeJS()

  onBeforeUnmount(() => {
    document.body.classList.remove('onboarding-active')
    if (cleanup) cleanup()
  })
})
</script>

<template>
  <div class="onboarding-container fixed inset-0 z-[100] overflow-hidden flex items-center justify-center">
    
    <canvas ref="canvas" class="absolute inset-0 w-full h-full z-[101]" />
    
    <div class="relative px-4 py-6 sm:p-4 z-[102] w-full max-w-xl sm:max-w-2xl opacity-0" ref="content">
      <div class="onboarding-content text-center">
        <div class="absolute inset-0 -z-10 blur-3xl opacity-20 
                    bg-gradient-to-b from-teal-500/30 via-transparent to-transparent"></div>
        
        <h2 v-if="currentStep === 0"
            class="onboarding-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 
                   bg-gradient-to-r from-teal-400 to-teal-500 bg-clip-text text-transparent 
                   opacity-0 translate-y-4 transition-all duration-500">
          Bienvenue voyageur/voyageuse !
        </h2>
      </div>
      
      <OnboardingGuide v-if="showGuide"
                       :text="steps[currentStep]?.description || ''"
                       :currentStep="currentStep"
                       @next="nextStep" />
    </div>
  </div>
</template>

<style scoped>
.onboarding-container {
  background: #000;
}
</style>