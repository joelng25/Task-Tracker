export type Lang = 'en' | 'ca' | 'es'

export type Project = {
  title: string
  summary: string
  note?: string
  stack: string[]
  screenshot: string
  repo?: string
  live?: string
}

export type OpenSourceItem = {
  title: string
  summary: string
  links: { label: string; href: string }[]
}

export type Copy = {
  metaTitle: string
  metaDescription: string
  skip: string
  nav: {
    work: string
    openSource: string
    about: string
    contact: string
  }
  themeToDark: string
  themeToLight: string
  languageLabel: string
  kicker: string
  place: string
  availability: string
  lede: string
  emailCta: string
  githubCta: string
  workTitle: string
  openSourceTitle: string
  aboutTitle: string
  aboutBody: string
  skillsTitle: string
  stackLabel: string
  languagesTitle: string
  languages: { name: string; level: string }[]
  contactTitle: string
  contactBody: string
  code: string
  live: string
  newTab: string
  projects: Project[]
  openSource: OpenSourceItem[]
  footer: string
}

const skills = [
  'React',
  'TypeScript',
  'JavaScript',
  'HTML/CSS',
  'Flutter',
  'Java',
  'C++',
  'Python',
  'Git',
  'Docker',
  'GitHub Actions',
]

const taskTrackerRepo = 'https://github.com/joelng25/Task-Tracker'
const taskTrackerLive = 'https://task-tracker-web-4uqz.onrender.com'
const pulsoRepo = 'https://github.com/joelng25/pulso-ciudadano'
const pulsoLive = 'https://pulso-ciudadano-green.vercel.app'
const muiFork = 'https://github.com/joelng25/material-ui'
const muiUpstream = 'https://github.com/mui/material-ui'
const winutilIssue = 'https://github.com/ChrisTitusTech/winutil/issues/5202'

export const languageOptions: { id: Lang; short: string; name: string }[] = [
  { id: 'en', short: 'EN', name: 'English' },
  { id: 'ca', short: 'CA', name: 'Català' },
  { id: 'es', short: 'ES', name: 'Español' },
]

export const copy: Record<Lang, Copy> = {
  en: {
    metaTitle: 'Joel Novio García · Computer Engineering',
    metaDescription:
      'Joel Novio García, Computer Engineering student (Software Engineering track) at UPC/FIB Barcelona, looking for afternoon frontend internships.',
    skip: 'Skip to content',
    nav: {
      work: 'Work',
      openSource: 'Open source',
      about: 'About',
      contact: 'Contact',
    },
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
    languageLabel: 'Language',
    kicker: 'Computer Engineering · Software Engineering track',
    place: 'UPC / FIB · Barcelona',
    availability: 'Afternoon frontend internships',
    lede: 'Computer Engineering student on the Software Engineering track at UPC / FIB in Barcelona. Looking for a frontend internship in the afternoons.',
    emailCta: 'Email',
    githubCta: 'GitHub',
    workTitle: 'Work',
    openSourceTitle: 'Open source',
    aboutTitle: 'About',
    aboutBody:
      'Joel Novio García. Computer Engineering student (Software Engineering track) at UPC / FIB, Barcelona. Looking for afternoon frontend internships.',
    skillsTitle: 'Skills',
    stackLabel: 'Technologies',
    languagesTitle: 'Languages',
    languages: [
      { name: 'Catalan', level: 'Native' },
      { name: 'Spanish', level: 'Native' },
      { name: 'English', level: 'B2 · Cambridge First' },
    ],
    contactTitle: 'Contact',
    contactBody: 'Email, GitHub, and LinkedIn.',
    code: 'Code',
    live: 'Live demo',
    newTab: 'opens in a new tab',
    projects: [
      {
        title: 'Task Tracker',
        summary:
          'Task manager with a C++ REST API and a React, TypeScript, and Vite frontend. Docker packages the app, and GitHub Actions runs the checks.',
        note: 'Live demo hosted on Render.',
        stack: ['C++', 'REST', 'React', 'TypeScript', 'Vite', 'Docker', 'GitHub Actions'],
        screenshot: 'TODO: screenshot of Task Tracker',
        repo: taskTrackerRepo,
        live: taskTrackerLive,
      },
      {
        title: 'pulso-ciudadano',
        summary:
          'Live electoral opinion poll. People vote for a candidacy and see the results straight away. React and Supabase.',
        note: 'Independent opinion poll, closer to a media survey, with the results left in view.',
        stack: ['React', 'Vite', 'Tailwind CSS', 'Supabase'],
        screenshot: 'TODO: screenshot of pulso-ciudadano',
        repo: pulsoRepo,
        live: pulsoLive,
      },
      {
        title: 'Caliu',
        summary: 'Team project for PES at UPC. Flutter app.',
        stack: ['Flutter'],
        screenshot: 'TODO: screenshot of Caliu',
      },
      {
        title: 'Hidato',
        summary: 'Java team project. Hidato, with backtracking.',
        stack: ['Java'],
        screenshot: 'TODO: screenshot of Hidato',
      },
    ],
    openSource: [
      {
        title: 'Material UI',
        summary: 'Next.js and Tailwind example contributed to Material UI. Pull request pending.',
        links: [
          { label: 'Fork', href: muiFork },
          { label: 'Material UI', href: muiUpstream },
        ],
      },
      {
        title: 'WinUtil #5202',
        summary:
          'Diagnosis of ChrisTitusTech/winutil issue #5202. The report describes a failed uninstall of Logitech Download Assistant and a PowerShell parser error in the log. The current config and scripts parse; the follow-up asked for the full WinUtil log and whether the goal was to remove an existing install or to stop it from being installed again.',
        links: [{ label: 'Issue #5202', href: winutilIssue }],
      },
    ],
    footer: '© 2026 Joel Novio García',
  },
  ca: {
    metaTitle: 'Joel Novio García · Enginyeria Informàtica',
    metaDescription:
      'Joel Novio García, estudiant d’Enginyeria Informàtica (menció d’Enginyeria del Software) a la UPC/FIB de Barcelona. Busca pràctiques de frontend a les tardes.',
    skip: 'Salta al contingut',
    nav: {
      work: 'Feina',
      openSource: 'Codi obert',
      about: 'Sobre mi',
      contact: 'Contacte',
    },
    themeToDark: 'Canvia al tema fosc',
    themeToLight: 'Canvia al tema clar',
    languageLabel: 'Llengua',
    kicker: 'Enginyeria Informàtica · menció d’Enginyeria del Software',
    place: 'UPC / FIB · Barcelona',
    availability: 'Pràctiques de frontend a les tardes',
    lede: 'Estudiant d’Enginyeria Informàtica, menció d’Enginyeria del Software, a la UPC / FIB de Barcelona. Busco pràctiques de frontend a les tardes.',
    emailCta: 'Correu',
    githubCta: 'GitHub',
    workTitle: 'Feina',
    openSourceTitle: 'Codi obert',
    aboutTitle: 'Sobre mi',
    aboutBody:
      'Joel Novio García. Estudiant d’Enginyeria Informàtica (menció d’Enginyeria del Software) a la UPC / FIB de Barcelona. Busco pràctiques de frontend a les tardes.',
    skillsTitle: 'Competències',
    stackLabel: 'Tecnologies',
    languagesTitle: 'Llengües',
    languages: [
      { name: 'Català', level: 'Nadiu' },
      { name: 'Castellà', level: 'Nadiu' },
      { name: 'Anglès', level: 'B2 · Cambridge First' },
    ],
    contactTitle: 'Contacte',
    contactBody: 'Correu, GitHub i LinkedIn.',
    code: 'Codi',
    live: 'Demostració',
    newTab: 's’obre en una pestanya nova',
    projects: [
      {
        title: 'Task Tracker',
        summary:
          'Gestor de tasques amb una API REST en C++ i un frontend amb React, TypeScript i Vite. Docker empaqueta l’aplicació i GitHub Actions n’executa les comprovacions.',
        note: 'Demostració en viu allotjada a Render.',
        stack: ['C++', 'REST', 'React', 'TypeScript', 'Vite', 'Docker', 'GitHub Actions'],
        screenshot: 'TODO: captura de Task Tracker',
        repo: taskTrackerRepo,
        live: taskTrackerLive,
      },
      {
        title: 'pulso-ciudadano',
        summary:
          'Sondeig d’opinió electoral en viu. La gent vota una candidatura i veu els resultats al moment. React i Supabase.',
        note: 'Sondeig d’opinió independent, proper als que publiquen els mitjans, amb els resultats a la vista.',
        stack: ['React', 'Vite', 'Tailwind CSS', 'Supabase'],
        screenshot: 'TODO: captura de pulso-ciudadano',
        repo: pulsoRepo,
        live: pulsoLive,
      },
      {
        title: 'Caliu',
        summary: 'Projecte d’equip de PES a la UPC. Aplicació amb Flutter.',
        stack: ['Flutter'],
        screenshot: 'TODO: captura de Caliu',
      },
      {
        title: 'Hidato',
        summary: 'Projecte d’equip en Java. Hidato, amb backtracking.',
        stack: ['Java'],
        screenshot: 'TODO: captura d’Hidato',
      },
    ],
    openSource: [
      {
        title: 'Material UI',
        summary: 'Exemple amb Next.js i Tailwind per a Material UI. La pull request està pendent.',
        links: [
          { label: 'Fork', href: muiFork },
          { label: 'Material UI', href: muiUpstream },
        ],
      },
      {
        title: 'WinUtil #5202',
        summary:
          'Diagnosi de la incidència #5202 de ChrisTitusTech/winutil. L’informe descriu una desinstal·lació fallida del Logitech Download Assistant i un error d’anàlisi de PowerShell al log. La configuració i els scripts actuals es parsegen; el seguiment demanava el log complet de WinUtil i si l’objectiu era eliminar una instal·lació existent o evitar que es tornés a instal·lar.',
        links: [{ label: 'Incidència #5202', href: winutilIssue }],
      },
    ],
    footer: '© 2026 Joel Novio García',
  },
  es: {
    metaTitle: 'Joel Novio García · Ingeniería Informática',
    metaDescription:
      'Joel Novio García, estudiante de Ingeniería Informática (mención de Ingeniería del Software) en la UPC/FIB de Barcelona. Busca prácticas de frontend por las tardes.',
    skip: 'Saltar al contenido',
    nav: {
      work: 'Trabajo',
      openSource: 'Código abierto',
      about: 'Sobre mí',
      contact: 'Contacto',
    },
    themeToDark: 'Cambiar al tema oscuro',
    themeToLight: 'Cambiar al tema claro',
    languageLabel: 'Idioma',
    kicker: 'Ingeniería Informática · mención de Ingeniería del Software',
    place: 'UPC / FIB · Barcelona',
    availability: 'Prácticas de frontend por las tardes',
    lede: 'Estudiante de Ingeniería Informática, mención de Ingeniería del Software, en la UPC / FIB de Barcelona. Busco prácticas de frontend por las tardes.',
    emailCta: 'Correo',
    githubCta: 'GitHub',
    workTitle: 'Trabajo',
    openSourceTitle: 'Código abierto',
    aboutTitle: 'Sobre mí',
    aboutBody:
      'Joel Novio García. Estudiante de Ingeniería Informática (mención de Ingeniería del Software) en la UPC / FIB de Barcelona. Busco prácticas de frontend por las tardes.',
    skillsTitle: 'Competencias',
    stackLabel: 'Tecnologías',
    languagesTitle: 'Idiomas',
    languages: [
      { name: 'Catalán', level: 'Nativo' },
      { name: 'Castellano', level: 'Nativo' },
      { name: 'Inglés', level: 'B2 · Cambridge First' },
    ],
    contactTitle: 'Contacto',
    contactBody: 'Correo, GitHub y LinkedIn.',
    code: 'Código',
    live: 'Demostración',
    newTab: 'se abre en una pestaña nueva',
    projects: [
      {
        title: 'Task Tracker',
        summary:
          'Gestor de tareas con una API REST en C++ y un frontend con React, TypeScript y Vite. Docker empaqueta la aplicación y GitHub Actions ejecuta las comprobaciones.',
        note: 'Demostración en vivo alojada en Render.',
        stack: ['C++', 'REST', 'React', 'TypeScript', 'Vite', 'Docker', 'GitHub Actions'],
        screenshot: 'TODO: captura de Task Tracker',
        repo: taskTrackerRepo,
        live: taskTrackerLive,
      },
      {
        title: 'pulso-ciudadano',
        summary:
          'Sondeo de opinión electoral en vivo. La gente vota una candidatura y ve los resultados al momento. React y Supabase.',
        note: 'Sondeo de opinión independiente, cercano a los que publican los medios, con los resultados a la vista.',
        stack: ['React', 'Vite', 'Tailwind CSS', 'Supabase'],
        screenshot: 'TODO: captura de pulso-ciudadano',
        repo: pulsoRepo,
        live: pulsoLive,
      },
      {
        title: 'Caliu',
        summary: 'Proyecto de equipo de PES en la UPC. Aplicación con Flutter.',
        stack: ['Flutter'],
        screenshot: 'TODO: captura de Caliu',
      },
      {
        title: 'Hidato',
        summary: 'Proyecto de equipo en Java. Hidato, con backtracking.',
        stack: ['Java'],
        screenshot: 'TODO: captura de Hidato',
      },
    ],
    openSource: [
      {
        title: 'Material UI',
        summary: 'Ejemplo con Next.js y Tailwind para Material UI. La pull request está pendiente.',
        links: [
          { label: 'Fork', href: muiFork },
          { label: 'Material UI', href: muiUpstream },
        ],
      },
      {
        title: 'WinUtil #5202',
        summary:
          'Diagnóstico de la incidencia #5202 de ChrisTitusTech/winutil. El informe describe una desinstalación fallida de Logitech Download Assistant y un error de análisis de PowerShell en el log. La configuración y los scripts actuales se parsean; el seguimiento pidió el log completo de WinUtil y si el objetivo era eliminar una instalación existente o evitar que se volviera a instalar.',
        links: [{ label: 'Incidencia #5202', href: winutilIssue }],
      },
    ],
    footer: '© 2026 Joel Novio García',
  },
}

export const skillsList = skills

export const links = {
  email: 'joelnogao625@gmail.com',
  github: 'https://github.com/joelng25',
  githubLabel: 'github.com/joelng25',
  linkedin: 'https://www.linkedin.com/in/joel-novio',
  linkedinLabel: 'linkedin.com/in/joel-novio',
}
