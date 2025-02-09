<script setup lang="ts">
import TheNavbar from '../components/TheNavbar.vue'
import { Section, Title, Container, Footer } from '../components/ui'
</script>

<template>
  <TheNavbar />
  <main class="pt-20">
    <Section>
      <Container maxWidth="4xl">
        <Title :level="1" gradient class="mb-12">Mentions Légales</Title>
        
        <div class="prose prose-invert max-w-none">
          <section class="mb-12">
            <h2 class="text-2xl font-bold text-teal-400 mb-4">Éditeur du site</h2>
            <p class="text-white/80 mb-4">
              Ce site est édité par Marius Thiesset, gérant de Prisma Création.
            </p>
            <ul class="list-disc list-inside text-white/80 space-y-2">
              <li>Siège social : [Votre adresse]</li>
              <li>SIRET : [Votre numéro SIRET]</li>
              <li>Email : contact@prismacreation.fr</li>
            </ul>
          </section>

          <section class="mb-12">
            <h2 class="text-2xl font-bold text-teal-400 mb-4">Hébergement</h2>
            <p class="text-white/80">
              Ce site est hébergé par Netlify Inc.<br>
              610 22nd Street, Suite 315<br>
              San Francisco, CA 94107<br>
              États-Unis
            </p>
          </section>

          <section class="mb-12">
            <h2 class="text-2xl font-bold text-teal-400 mb-4">Propriété intellectuelle</h2>
            <p class="text-white/80 mb-4">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>

          <section class="mb-12">
            <h2 class="text-2xl font-bold text-teal-400 mb-4">Protection des données personnelles</h2>
            <p class="text-white/80 mb-4">
              Les informations recueillies via le formulaire de contact sont destinées à répondre à vos demandes de renseignements. Elles sont conservées pendant la durée nécessaire à cette finalité et ne sont transmises à aucun tiers.
            </p>
            <p class="text-white/80 mb-4">
              Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-teal-400 mb-4">Cookies</h2>
            <p class="text-white/80">
              Ce site n'utilise que des cookies techniques essentiels au fonctionnement du site. Aucun cookie de mesure d'audience ou de publicité n'est utilisé.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  </main>
  <Footer
    githubUrl="https://github.com/mariusthiesset"
    linkedinUrl="https://linkedin.com/in/mariusthiesset" />
</template>