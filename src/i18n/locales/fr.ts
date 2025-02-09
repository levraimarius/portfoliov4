export default {
  nav: {
    home: 'Accueil',
    about: 'À propos',
    career: 'Carrière',
    projects: 'Projets',
    contact: 'Contact',
    language: 'Choisir la langue',
    backToHome: 'Retour à l\'accueil'
  },
  hero: {
    title: 'Marius Thiesset',
    subtitle: 'Développeur & Gérant de Prisma Création, une agence Web spécialisée dans la création d\'expériences digitales qui comptent',
    cta: 'Voir Mes Projets',
  },
  about: {
    title: 'À Propos',
    description: `À ${new Date().getFullYear() - 2000} ans, je suis un développeur passionné avec un œil aiguisé pour le design et l'expérience utilisateur. En tant que gérant de Prisma Création, je mets mon expertise au service de projets web innovants en utilisant les dernières technologies.`,
    skills: 'Mes compétences et technologies principales',
    categories: {
      all: 'Tout',
      frontend: 'Frontend',
      backend: 'Backend',
      languages: 'Langages',
      cloud: 'Cloud',
      cms: 'CMS'
    },
    technologies: {
      vuejs: {
        name: 'Vue.js',
        description: 'Framework JavaScript progressif pour la création d\'interfaces utilisateur modernes'
      },
      react: {
        name: 'React',
        description: 'Bibliothèque JavaScript pour créer des interfaces utilisateur réactives'
      },
      tailwindcss: {
        name: 'Tailwind CSS',
        description: 'Framework CSS utilitaire pour un développement rapide et flexible'
      },
      sass: {
        name: 'Sass',
        description: 'Préprocesseur CSS pour des styles plus maintenables et organisés'
      },
      typescript: {
        name: 'TypeScript',
        description: 'JavaScript avec typage statique pour un code plus robuste'
      },
      javascript: {
        name: 'JavaScript',
        description: 'Langage de programmation polyvalent pour le web'
      },
      python: {
        name: 'Python',
        description: 'Langage de programmation versatile pour le développement et l\'analyse de données'
      },
      php: {
        name: 'PHP',
        description: 'Langage de programmation serveur populaire pour le web'
      },
      nodejs: {
        name: 'Node.js',
        description: 'Environnement d\'exécution JavaScript côté serveur performant'
      },
      mongodb: {
        name: 'MongoDB',
        description: 'Base de données NoSQL flexible et évolutive'
      },
      postgresql: {
        name: 'PostgreSQL',
        description: 'Système de gestion de base de données relationnelle robuste'
      },
      docker: {
        name: 'Docker',
        description: 'Plateforme de conteneurisation pour le déploiement d\'applications'
      },
      aws: {
        name: 'AWS',
        description: 'Services cloud complets pour le déploiement et l\'hébergement'
      },
      wordpress: {
        name: 'WordPress',
        description: 'Système de gestion de contenu le plus populaire au monde'
      },
      shopify: {
        name: 'Shopify',
        description: 'Plateforme e-commerce complète pour le commerce en ligne'
      }
    }
  },
  projects: {
    title: 'Mes Projets',
    viewProject: 'Voir le Projet',
    viewDetails: 'Voir les Détails',
    viewLive: 'Voir le Projet en Direct',
    viewGithub: 'Voir sur GitHub',
    features: 'Fonctionnalités Clés',
    technologies: 'Technologies',
    description: 'Voici quelques-uns des projets sur lesquels j\'ai travaillé récemment.'
  },
  career: {
    title: 'Parcours Professionnel',
    achievements: 'Réalisations Principales',
    technologies: 'Technologies',
    experiences: {
      exp1: {
        role: 'Votre Poste Actuel',
        company: 'Votre Entreprise Actuelle',
        period: 'Date de début - Présent',
        location: 'Lieu',
        description: 'Description de votre rôle et responsabilités actuels.',
        achievements: [
          'Mise en place d\'une nouvelle architecture microservices',
          'Amélioration des performances de 50%',
          'Direction d\'une équipe de 5 développeurs'
        ],
        technologies: ['Vue.js', 'TypeScript', 'Node.js', 'Docker', 'AWS']
      },
      exp2: {
        role: 'Votre Poste Précédent',
        company: 'Entreprise Précédente',
        period: 'Date de début - Date de fin',
        location: 'Lieu',
        description: 'Description de votre rôle et responsabilités.',
        achievements: [
          'Développement d\'une application mobile cross-platform',
          'Réduction du temps de déploiement de 70%',
          'Mise en place de tests automatisés'
        ],
        technologies: ['React', 'JavaScript', 'MongoDB', 'AWS']
      },
      exp3: {
        role: 'Autre Poste Précédent',
        company: 'Autre Entreprise',
        period: 'Date de début - Date de fin',
        location: 'Lieu',
        description: 'Description de votre rôle et responsabilités.',
        achievements: [
          'Refonte complète du site e-commerce',
          'Augmentation du taux de conversion de 25%',
          'Optimisation SEO et performances'
        ],
        technologies: ['PHP', 'WordPress', 'MySQL', 'Sass']
      }
    }
  },
  contact: {
    title: 'Me Contacter',
    name: 'Nom',
    email: 'Email',
    message: 'Message',
    send: 'Envoyer',
    success: 'Message envoyé avec succès ! Je vous répondrai bientôt.'
  },
  onboarding: {
    welcome: {
      title: 'Bienvenue dans Mon Univers',
      description: 'Entrez dans un monde où la créativité rencontre la technologie. Je suis un développeur passionné par la création d\'expériences digitales exceptionnelles.'
    },
    skills: {
      title: 'Maître de l\'Artisanat Digital',
      description: 'Du front-end au back-end, je donne vie aux idées en utilisant les technologies les plus avancées.'
    },
    projects: {
      title: 'Prêt au Décollage',
      description: 'Découvrez mon portfolio de projets innovants et voyons comment nous pouvons créer quelque chose d\'extraordinaire ensemble.'
    },
    next: 'Continuer',
    start: 'Commencer l\'Aventure'
  }
}