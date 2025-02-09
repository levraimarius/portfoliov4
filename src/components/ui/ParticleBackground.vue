<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)

const particles = ref<Array<{
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}>>([])

const initParticles = () => {
  for (let i = 0; i < 100; i++) {
    particles.value.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.3 + 0.1
    })
  }
}

const animate = () => {
  if (!canvas.value || !ctx.value) return
  
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.value.fillStyle = '#14b8a6'
  
  particles.value.forEach(particle => {
    particle.y -= particle.speed
    if (particle.y < 0) {
      particle.y = canvas.value!.height
      particle.x = Math.random() * canvas.value!.width
    }
    
    ctx.value!.globalAlpha = particle.opacity
    ctx.value!.beginPath()
    ctx.value!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.value!.fill()
  })
  
  requestAnimationFrame(animate)
}

const handleResize = () => {
  if (canvas.value) {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
  }
}

onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d')
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
    
    initParticles()
    animate()
  }
  
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <canvas ref="canvas" class="absolute inset-0 w-full h-full pointer-events-none" />
</template>