export default {
  nav: {
    home: 'Home',
    about: 'About',
    career: 'Career',
    projects: 'Projects',
    contact: 'Contact',
    language: 'Select Language',
    backToHome: 'Back to Home'
  },
  hero: {
    title: 'Marius Thiesset',
    subtitle: 'Developer & CEO of Prisma Création, a Web agency specialized in building digital experiences that matter',
    cta: 'View My Work',
  },
  about: {
    title: 'About Me',
    description: `At ${new Date().getFullYear() - 2000}, I am a passionate developer with a keen eye for design and user experience. As the CEO of Prisma Création, I leverage my expertise to deliver innovative web projects using cutting-edge technologies.`,
    skills: 'My core skills and technologies',
    categories: {
      all: 'All',
      frontend: 'Frontend',
      backend: 'Backend',
      languages: 'Languages',
      cloud: 'Cloud',
      cms: 'CMS'
    },
    technologies: {
      vuejs: {
        name: 'Vue.js',
        description: 'Progressive JavaScript framework for building modern user interfaces'
      },
      react: {
        name: 'React',
        description: 'JavaScript library for building reactive user interfaces'
      },
      tailwindcss: {
        name: 'Tailwind CSS',
        description: 'Utility-first CSS framework for rapid and flexible development'
      },
      sass: {
        name: 'Sass',
        description: 'CSS preprocessor for more maintainable and organized styles'
      },
      typescript: {
        name: 'TypeScript',
        description: 'Typed JavaScript for more robust code'
      },
      javascript: {
        name: 'JavaScript',
        description: 'Versatile programming language for the web'
      },
      python: {
        name: 'Python',
        description: 'Versatile programming language for development and data analysis'
      },
      php: {
        name: 'PHP',
        description: 'Popular server-side programming language for the web'
      },
      nodejs: {
        name: 'Node.js',
        description: 'High-performance server-side JavaScript runtime'
      },
      mongodb: {
        name: 'MongoDB',
        description: 'Flexible and scalable NoSQL database'
      },
      postgresql: {
        name: 'PostgreSQL',
        description: 'Robust relational database management system'
      },
      docker: {
        name: 'Docker',
        description: 'Containerization platform for application deployment'
      },
      aws: {
        name: 'AWS',
        description: 'Comprehensive cloud services for deployment and hosting'
      },
      wordpress: {
        name: 'WordPress',
        description: 'World\'s most popular content management system'
      },
      shopify: {
        name: 'Shopify',
        description: 'Complete e-commerce platform for online business'
      }
    }
  },
  projects: {
    title: 'My Projects',
    viewProject: 'View Project',
    viewDetails: 'View Details',
    viewLive: 'View Live Project',
    viewGithub: 'View on GitHub',
    features: 'Key Features',
    technologies: 'Technologies',
    description: 'Here are some of the projects I\'ve worked on recently.'
  },
  career: {
    title: 'Career Path',
    achievements: 'Key Achievements',
    technologies: 'Technologies',
    experiences: {
      exp1: {
        role: 'Your Current Position',
        company: 'Your Current Company',
        period: 'Start date - Present',
        location: 'Location',
        description: 'Description of your current role and responsibilities.',
        achievements: [
          'Implemented new microservices architecture',
          'Improved performance by 50%',
          'Led a team of 5 developers'
        ],
        technologies: ['Vue.js', 'TypeScript', 'Node.js', 'Docker', 'AWS']
      },
      exp2: {
        role: 'Your Previous Position',
        company: 'Previous Company',
        period: 'Start date - End date',
        location: 'Location',
        description: 'Description of your role and responsibilities.',
        achievements: [
          'Developed cross-platform mobile application',
          'Reduced deployment time by 70%',
          'Implemented automated testing'
        ],
        technologies: ['React', 'JavaScript', 'MongoDB', 'AWS']
      },
      exp3: {
        role: 'Another Previous Position',
        company: 'Another Company',
        period: 'Start date - End date',
        location: 'Location',
        description: 'Description of your role and responsibilities.',
        achievements: [
          'Complete e-commerce website redesign',
          'Increased conversion rate by 25%',
          'SEO and performance optimization'
        ],
        technologies: ['PHP', 'WordPress', 'MySQL', 'Sass']
      }
    }
  },
  contact: {
    title: 'Get in Touch',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    success: 'Message sent successfully! I will get back to you soon.'
  },
  onboarding: {
    welcome: {
      title: 'Welcome to My Universe',
      description: 'Step into a world where creativity meets technology. I\'m a developer passionate about crafting exceptional digital experiences.'
    },
    skills: {
      title: 'Master of Digital Craft',
      description: 'From front-end finesse to back-end architecture, I bring ideas to life using cutting-edge technologies.'
    },
    projects: {
      title: 'Ready for Launch',
      description: 'Discover my portfolio of innovative projects and see how we can create something amazing together.'
    },
    next: 'Continue',
    start: 'Start Journey'
  }
}