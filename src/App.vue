<script setup lang="ts">
import TheNavbar from './components/TheNavbar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import CareerSection from './components/CareerSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
import Onboarding from './components/Onboarding.vue'
import SiteRobot from './components/SiteRobot.vue'
import { Footer } from './components/ui'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import Cookies from 'js-cookie'
import { useLocalStorage } from '@vueuse/core'
import { gsap } from 'gsap'

const showOnboarding = ref(false)
const hasCompletedOnboarding = useLocalStorage('onboardingCompleted', false)
const mainContent = ref(null)
const route = useRoute()
const router = useRouter()

onMounted(() => {
  // Vérifier d'abord le localStorage, puis le cookie pour la rétrocompatibilité
  const cookieValue = Cookies.get('onboardingCompleted')
  if (cookieValue && !hasCompletedOnboarding.value) {
    hasCompletedOnboarding.value = true
  }
  
  if (!hasCompletedOnboarding.value && route.path === '/') {
    showOnboarding.value = true
  }
})

const handleOnboardingComplete = () => {
  const timeline = gsap.timeline({
    onComplete: () => {
      hasCompletedOnboarding.value = true
      document.body.classList.remove('onboarding-active')
      gsap.to('.onboarding-container', {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          showOnboarding.value = false
        }
      })
    }
  })
  
  timeline
    .fromTo(mainContent.value,
      {
        opacity: 0,
        scale: 1.05,
        filter: 'blur(20px)'
      },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2,
        ease: 'power2.inOut'
      }
    )
}
</script>

<template>
  <div class="relative">
    <div ref="mainContent" 
         v-show="!showOnboarding"
         :style="{ opacity: showOnboarding ? 0 : 1 }"
         class="transition-all duration-1000">
      <router-view v-if="$route.path !== '/'" />
      <template v-else>
        <TheNavbar />
        <main class="pt-16">
          <HeroSection />
          <AboutSection />
          <CareerSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer 
          githubUrl="https://github.com/levraimarius"
          linkedinUrl="https://linkedin.com/in/marius-thiesset" />
        <SiteRobot v-if="hasCompletedOnboarding" />
      </template>
    </div>
    <div v-if="showOnboarding" class="fixed inset-0 z-[100]">
      <Onboarding v-if="showOnboarding" @complete="handleOnboardingComplete" />
    </div>
  </div>
</template>

<style>
:root {
  --app-height: 100%;
}

html, body {
  @apply min-h-[var(--app-height)];
  background: linear-gradient(45deg, #000000, #002626, #000000, #002626);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

body {
  @apply overflow-auto;
}

body.onboarding-active {
  @apply overflow-hidden;
}
</style>