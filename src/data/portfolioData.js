/* ============================================================
   portfolioData.js — Comprehensive Portfolio & Nirmaan Data
   ============================================================ */

// ── Navigation Items (Left Rail & Mobile Menu) ──
export const sideNavItems = [
  { id: 'hero', num: '00', title: 'Start', bg: '#11110F', textColor: '#FFFFFF' },
  { id: 'overview', num: '01', title: 'Overview', bg: '#0072E3', textColor: '#FFFFFF' },
  { id: 'tracks', num: '02', title: 'Domain Tracks', bg: '#FFB200', textColor: '#11110F' },
  { id: 'projects', num: '03', title: 'Selected Work', bg: '#FF6100', textColor: '#FFFFFF' },
  { id: 'gallery', num: '04', title: 'Design Archive', bg: '#00AA3C', textColor: '#11110F' },
  { id: 'github', num: '05', title: 'Code Radar', bg: '#AB54F7', textColor: '#FFFFFF' },
  { id: 'contact', num: '06', title: 'Contact', bg: '#FFB200', textColor: '#11110F' },
];

// ── Profile Information ──
export const profile = {
  name: 'Archisha Gupta',
  handle: 'archisha.',
  role: 'Creative Developer & Designer',
  tagline: 'Building at the intersection of code and design.',
  statement: 'Most builders pick a side. I don’t.',
  subtext: 'Computer Science Engineering student at BMS Institute of Technology and Management, exploring web development, UI/UX, AI, IoT, and creative technology.',
  college: 'BMS Institute of Technology & Management, Bengaluru',
  degree: 'B.Tech — Computer Science (2025–2029)',
  location: 'Bengaluru, Karnataka, India',
  email: 'archishagupta4907@gmail.com',
  githubUrl: 'https://github.com/Archish2007Gupta',
  linkedinUrl: 'https://www.linkedin.com/in/archisha-gupta-4a6266385/',
};

// ── Live Builder Metrics ──
export const liveMetrics = [
  ['Projects Built', '14+'],
  ['Code Commits', '240+'],
  ['Design Assets', '50+'],
  ['Hackathons / Clubs', '4'],
];

// ── Hero Info Cards ──
export const heroCards = [
  {
    number: '01',
    title: 'DESIGN',
    items: ['UI/UX Systems', 'Branding & Posters', 'Typography & Visuals'],
    accent: '#0072E3',
    color: 'bg-blue text-white',
  },
  {
    number: '02',
    title: 'CODE',
    items: ['React & Web Apps', 'JavaScript / TypeScript', 'C++ & Python Core'],
    accent: '#FFB200',
    color: 'bg-yellow text-ink',
  },
  {
    number: '03',
    title: 'EXPLORE',
    items: ['ESP32 & IoT Devices', 'AI / LLM Integration', 'Creative Interactions'],
    accent: '#EF333A',
    color: 'bg-red text-white',
  },
];

// ── Marquee Tickers ──
export const marqueeOneItems = [
  '✦ ARCHISHA GUPTA',
  '✦ CREATIVE DEVELOPER',
  '✦ UI/UX DESIGNER',
  '✦ CSE @ BMSIT 2025–29',
  '✦ CODING CLUB CORE',
  '✦ ROTARACT EDITORIAL',
  '✦ BUILD. INNOVATE. IMPACT.',
  '✦ FULL STACK WEB',
];

export const marqueeTwoItems = [
  '✦ ECHONEX IOT ASSISTANT',
  '✦ CLEANZY SMART CITY',
  '✦ WAY2UNI CAMPUS NAV',
  '✦ SPARKHABIT CREATIVE TECH',
  '✦ REACT & TYPESCRIPT',
  '✦ HARDWARE & AI',
];

// ── Live Activity Announcements ──
export const announcements = [
  {
    id: 1,
    date: 'Current Sprint',
    tag: 'PORTFOLIO',
    content: 'Elevating digital portfolio 3.0 inspired by Nirmaan 2026 & editorial luxury web design.',
  },
  {
    id: 2,
    date: 'Design Role',
    tag: 'CODING CLUB',
    content: 'Leading design systems, event branding, ID cards, and official posters for Coding Club BMSIT.',
  },
  {
    id: 3,
    date: 'Hardware Sprint',
    tag: 'ECHONEX',
    content: 'Integrating ESP32 sensor telemetry with real-time Supabase cloud dashboard and voice agent.',
  },
  {
    id: 4,
    date: 'Editorial',
    tag: 'ROTARACT',
    content: 'Directing creative newsletters and visual storytelling initiatives for Rotaract Club of BMS Yelahanka.',
  },
];

// ── 4 Core Principles / Values ──
export const values = [
  {
    mark: '01',
    title: 'Innovation & Creativity',
    copy: 'Approaching problems from unconventional angles to build distinctive digital experiences that surprise and delight.',
    accent: '#0072E3',
  },
  {
    mark: '02',
    title: 'Feasibility & Impact',
    copy: 'Designing scalable architectures and intuitive interfaces that solve genuine user problems in the real world.',
    accent: '#FFB200',
  },
  {
    mark: '03',
    title: 'Technical Implementation',
    copy: 'Writing clean, robust code with modular components, performance optimization, and thoughtful hardware integration.',
    accent: '#EF333A',
  },
  {
    mark: '04',
    title: 'Visual Craft & Typography',
    copy: 'Pairing bold typography with tactile claymorphic surfaces, intentional grids, and fluid micro-animations.',
    accent: '#00AA3C',
  },
];

// ── Domain Tracks ("What I Build") ──
export const domainTracks = [
  {
    id: 'web',
    index: '01',
    title: 'Web Experiences',
    badge: 'CORE FOCUS · HIGH IMPACT',
    color: '#0072E3',
    tagColor: 'bg-blue',
    description: 'High-performance interactive web applications, responsive single-page apps, and real-time dashboard interfaces.',
    skills: ['React', 'JavaScript (ES6+)', 'TypeScript', 'Vite', 'HTML5/CSS3', 'REST APIs'],
  },
  {
    id: 'uiux',
    index: '02',
    title: 'UI/UX & Visual Systems',
    badge: 'EDITORIAL · TACTILE',
    color: '#FFB200',
    tagColor: 'bg-yellow',
    description: 'Design systems, wireframes, high-fidelity prototypes, brand guidelines, and physical print/merch assets.',
    skills: ['Figma', 'UI/UX Design', 'Visual Hierarchy', 'Typography', 'Canva', 'Color Theory'],
  },
  {
    id: 'ai',
    index: '03',
    title: 'AI & Intelligent Systems',
    badge: 'RAPIDLY EVOLVING',
    color: '#EF333A',
    tagColor: 'bg-red',
    description: 'AI-assisted workflows, conversational voice agents, intelligent assistants, and API-driven automation.',
    skills: ['AI Integration', 'Prompt Engineering', 'API Orchestration', 'Python', 'Supabase Vector'],
  },
  {
    id: 'iot',
    index: '04',
    title: 'IoT & Embedded Computing',
    badge: 'HARDWARE + SOFTWARE',
    color: '#00AA3C',
    tagColor: 'bg-green',
    description: 'Microcontroller programming, sensor telemetry, voice-controlled hardware, and automated home/campus systems.',
    skills: ['ESP32', 'Arduino IDE', 'Sensors & Actuators', 'IoT Protocols', 'C/C++'],
  },
  {
    id: 'creative-tech',
    index: '05',
    title: 'Creative Technology',
    badge: 'EXPERIMENTAL LAB',
    color: '#AB54F7',
    tagColor: 'bg-purple',
    description: 'Interactive canvas mini-games, retro Web Audio synthesizers, generative visuals, and kinetic micro-interactions.',
    skills: ['Canvas 2D', 'Web Audio API', 'Kinetic Typography', 'Micro-Interactions', 'CSS Animation'],
  },
  {
    id: 'products',
    index: '06',
    title: 'Real-World Products',
    badge: 'END-TO-END DELIVERY',
    color: '#FF6100',
    tagColor: 'bg-orange',
    description: 'Holistic product design combining research, user journey mapping, functional code, and production deployment.',
    skills: ['Full Cycle Dev', 'Problem Solving', 'User Testing', 'Git/GitHub', 'Cloud Hosting'],
  },
];

// ── Featured Projects ("SELECTED WORK") ──
export const featuredProjects = [
  {
    id: 'echonex',
    number: '01',
    title: 'ECHONEX',
    category: 'IoT · AI · Web Platform',
    accent: '#0072E3',
    badge: 'HARDWARE + CLOUD',
    tag: 'FEATURED 01',
    description:
      'A voice-activated smart hardware assistant driven by ESP32 microcontrollers, integrated with real-time sensor monitoring, AI speech processing, and a companion web dashboard for automated control.',
    techStack: ['ESP32', 'C++', 'AI API', 'Supabase', 'React', 'WebSockets'],
    highlights: [
      'Voice-directed actuator & relay triggers',
      'Live temperature, humidity & sensor feeds',
      'Cloud synchronization & web management dashboard',
    ],
    github: 'https://github.com/Archish2007Gupta',
    liveUrl: null,
  },
  {
    id: 'cleanzy',
    number: '02',
    title: 'CLEANZY',
    category: 'Smart City · Product Platform',
    accent: '#00AA3C',
    badge: 'FULL STACK MVP',
    tag: 'FEATURED 02',
    description:
      'An on-demand urban waste collection and recycling dispatch platform designed around seamless pickup scheduling, driver route optimization, and digital weight/billing tracking.',
    techStack: ['React', 'TypeScript', 'Tailwind', 'REST APIs', 'UI/UX System'],
    highlights: [
      'Interactive booking flow & schedule calendar',
      'Live dispatch status & pickup confirmation',
      'Clean neo-brutalist interface designed for ease of use',
    ],
    github: 'https://github.com/Archish2007Gupta/Cleanzy',
    liveUrl: null,
  },
  {
    id: 'way2uni',
    number: '03',
    title: 'WAY2UNI',
    category: 'Campus Navigation · UI/UX',
    accent: '#FFB200',
    badge: 'STUDENT UTILITY',
    tag: 'FEATURED 03',
    description:
      'A campus discovery and interactive indoor/outdoor navigation concept engineered to help collegiate students and visitors effortlessly navigate departmental blocks, labs, and amenities.',
    techStack: ['Web App', 'Interactive Maps', 'UI/UX Design', 'JavaScript'],
    highlights: [
      'Block-by-block directory with step-free route aids',
      'Departmental lab & library occupancy indicators',
      'Mobile-first responsive vector interface',
    ],
    github: 'https://github.com/Archish2007Gupta',
    liveUrl: null,
  },
  {
    id: 'sparkhabit',
    number: '04',
    title: 'SPARKHABIT',
    category: 'Creative Technology · Web',
    accent: '#AB54F7',
    badge: 'DAILY CHALLENGES',
    tag: 'FEATURED 04',
    description:
      'A habit-building platform focused on 5-minute daily creative challenges. Designed to combat creator block and build streak consistency across sketching, coding, and writing.',
    techStack: ['JavaScript', 'HTML5 Canvas', 'Local Storage', 'CSS Motion'],
    highlights: [
      'Dynamic daily prompt generator with countdown clock',
      'Streak counter & milestone badge achievements',
      'Instant canvas canvas export & sharing',
    ],
    github: 'https://github.com/Archish2007Gupta/SparkHabit',
    liveUrl: null,
  },
];

// ── Experience & Timeline Groups ──
export const scheduleTimeline = [
  {
    period: '2025 – Present',
    label: 'Academic & Core Roles',
    items: [
      {
        time: '2025 — 2029',
        title: 'B.Tech in Computer Science Engineering',
        organization: 'BMS Institute of Technology & Management',
        detail: 'Core coursework in Algorithms, Data Structures, Computer Architecture, and Object-Oriented Programming.',
        color: '#0072E3',
        tag: 'EDUCATION',
      },
      {
        time: 'March 2026 — Present',
        title: 'Design Associate & Core Team Member',
        organization: 'Coding Club BMSIT',
        detail: 'Conceptualized branding identities, event posters, official ID cards, club apparel, and digital promotional campaigns.',
        color: '#FFB200',
        tag: 'LEADERSHIP',
      },
      {
        time: 'June 2026 — Present',
        title: 'Editorial Director',
        organization: 'Rotaract Club of BMS Yelahanka',
        detail: 'Directing creative content presentation, editorial communication, newsletters, and visual storytelling for community outreach.',
        color: '#EF333A',
        tag: 'EDITORIAL',
      },
    ],
  },
  {
    period: '2026 Hackathons',
    label: 'Competitive Sprints',
    items: [
      {
        time: '2026 Sprint',
        title: 'Decode2Deploy Hackathon',
        organization: 'Coding Club BMSIT',
        detail: 'Intensive building sprint tackling real-world problem statements under 24-hour pressure.',
        color: '#00AA3C',
        tag: 'HACKATHON',
      },
      {
        time: '2026 Sprint',
        title: 'RNSIT ImpactX Challenge',
        organization: 'RNSIT Bengaluru',
        detail: 'Collaborative prototyping, multi-disciplinary engineering, and rapid pitch evaluation.',
        color: '#AB54F7',
        tag: 'CHALLENGE',
      },
      {
        time: '2026 Sprint',
        title: 'VyuhaTech 2.0',
        organization: 'Inter-College Innovation Sprint',
        detail: 'Hardware & IoT integration with cloud telemetry and live prototype demonstration.',
        color: '#FF6100',
        tag: 'SPRINT',
      },
    ],
  },
];

// ── Design Archive / Visual Gallery ──
export const designGallery = [
  {
    id: 1,
    title: 'Coding Club Official Identity & Logo',
    category: 'Branding',
    color: '#0072E3',
    tags: ['Vector', 'Logo', 'Visual System'],
    description: 'Official emblem and geometric icon system engineered for Coding Club BMSIT.',
  },
  {
    id: 2,
    title: 'Decode2Deploy Hackathon Poster',
    category: 'Posters',
    color: '#EF333A',
    tags: ['Print', 'Typography', 'Event'],
    description: 'High-energy neo-brutalist poster series for the 24-hour coding sprint.',
  },
  {
    id: 3,
    title: 'Core Team Official ID Cards',
    category: 'ID Cards',
    color: '#FFB200',
    tags: ['Stationery', 'Badge', 'Print'],
    description: 'Custom laminated holographic ID badge layouts designed for executive members.',
  },
  {
    id: 4,
    title: 'Varsity Apparel & Merch Design',
    category: 'Apparel',
    color: '#AB54F7',
    tags: ['Apparel', 'Streetwear', 'Embroidery'],
    description: 'Backprint typography and sleeve patch graphics for club hoodies and jerseys.',
  },
  {
    id: 5,
    title: 'Cleanzy Waste Dashboard Concept',
    category: 'UI/UX',
    color: '#00AA3C',
    tags: ['Figma', 'Interface', 'Dashboard'],
    description: 'Comprehensive UI component library and user flows for on-demand waste pickup.',
  },
  {
    id: 6,
    title: 'Rotaract Community Creative Banner',
    category: 'Posters',
    color: '#FF6100',
    tags: ['Social', 'Editorial', 'Banner'],
    description: 'Story-driven visual communication collateral for social impact initiatives.',
  },
  {
    id: 7,
    title: 'Official Certificate of Merit Template',
    category: 'Certificates',
    color: '#0072E3',
    tags: ['Print', 'Gold Seal', 'Layout'],
    description: 'High-security certificate layout with custom border Guilloche and typographic hierarchy.',
  },
  {
    id: 8,
    title: 'Tech Fest Social Media Campaign',
    category: 'Social Media',
    color: '#EF333A',
    tags: ['Instagram', 'Motion', 'Carousel'],
    description: 'Engaging carousel series with 3D elements and bold typographic callouts.',
  },
];

// ── Certificates & Accreditations Vault ──
export const certificatesData = [
  {
    id: 1,
    title: 'Full-Stack Web Development',
    issuer: 'Meta / Coursera',
    date: '2025',
    color: '#0072E3',
    category: 'Full Stack',
    credentialId: 'CRED-FS-84920',
    tags: ['React', 'JavaScript', 'REST APIs'],
    description: 'Advanced responsive frontend architecture and state management systems.',
  },
  {
    id: 2,
    title: 'Python for Computer Science & Automation',
    issuer: 'HackerRank Certified',
    date: '2025',
    color: '#FFB200',
    category: 'Programming',
    credentialId: 'CRED-PY-39104',
    tags: ['Python', 'Automation', 'Algorithms'],
    description: 'Algorithmic problem solving, data structures, and script automation.',
  },
  {
    id: 3,
    title: 'UI/UX Design Systems & Typography',
    issuer: 'Figma Design Specialist',
    date: '2025',
    color: '#EF333A',
    category: 'Design Systems',
    credentialId: 'CRED-UX-19402',
    tags: ['Figma', 'UI/UX', 'Design Ops'],
    description: 'Tactile design tokens, wireframing, micro-interactions, and component libraries.',
  },
  {
    id: 4,
    title: 'Embedded Systems & IoT Microcontrollers',
    issuer: 'BMSIT Innovation Labs',
    date: '2025',
    color: '#00AA3C',
    category: 'Hardware & IoT',
    credentialId: 'CRED-IOT-55021',
    tags: ['ESP32', 'C++', 'Sensors'],
    description: 'Firmware development, sensor telemetry streams, and hardware relays.',
  },
  {
    id: 5,
    title: 'Decode2Deploy Hackathon Recognition',
    issuer: 'Coding Club BMSIT',
    date: '2025',
    color: '#AB54F7',
    category: 'Hackathon Award',
    credentialId: 'CRED-HACK-77291',
    tags: ['Hackathon', 'Sprint', 'Prototype'],
    description: 'Award of distinction in 24-hour collegiate prototyping and fast deployment.',
  },
  {
    id: 6,
    title: 'Leadership & Editorial Excellence',
    issuer: 'Rotaract Club BMS Yelahanka',
    date: '2025',
    color: '#FF6100',
    category: 'Editorial Direction',
    credentialId: 'CRED-DIR-66014',
    tags: ['Editorial', 'Leadership', 'Content'],
    description: 'Recognized for creative publication design, club communications, and media.',
  },
];

// ── GitHub Repositories ──
export const githubRepos = [
  {
    name: 'SparkHabit',
    lang: 'JavaScript',
    langColor: '#F7DF1E',
    stars: 5,
    forks: 2,
    desc: 'Short daily creative challenges platform to build consistency and spark ideas.',
    url: 'https://github.com/Archish2007Gupta/SparkHabit',
  },
  {
    name: 'Cleanzy',
    lang: 'TypeScript',
    langColor: '#3178C6',
    stars: 8,
    forks: 3,
    desc: 'On-demand urban waste collection dispatch and route management platform.',
    url: 'https://github.com/Archish2007Gupta/Cleanzy',
  },
  {
    name: 'Netflix-Clone',
    lang: 'HTML / CSS / JS',
    langColor: '#E34F26',
    stars: 4,
    forks: 1,
    desc: 'Pixel-perfect responsive streaming media showcase and video player interface.',
    url: 'https://github.com/Archish2007Gupta',
  },
  {
    name: 'Amazon-Clone',
    lang: 'JavaScript',
    langColor: '#F7DF1E',
    stars: 3,
    forks: 1,
    desc: 'E-commerce marketplace interface with product catalog and cart state mechanics.',
    url: 'https://github.com/Archish2007Gupta',
  },
];

// ── FAQs (Matching Nirmaan Style) ──
export const faqs = [
  {
    question: 'What is your background and current focus?',
    answer:
      'I am a Computer Science Engineering student at BMS Institute of Technology & Management (2025–2029). I actively build across Web Development, UI/UX Systems, AI, and IoT hardware, while serving as Design Associate at Coding Club BMSIT and Editorial Director at Rotaract.',
  },
  {
    question: 'Are you available for internships or project collaborations?',
    answer:
      'Yes! I am actively looking for software engineering, frontend development, and UI/UX design internship opportunities or high-energy hackathon team collaborations.',
  },
  {
    question: 'What technologies do you use most frequently?',
    answer:
      'For frontend & web: React, JavaScript (ES6+), TypeScript, Vite, Tailwind CSS, HTML5/CSS3. For hardware & IoT: ESP32, C/C++, Sensors, Supabase. For design: Figma, Canva, Adobe Photoshop.',
  },
  {
    question: 'How do you bridge code and design in your workflow?',
    answer:
      'I start with deep visual exploration and Figma prototypes, then translate design tokens directly into modular, performant code. This guarantees high aesthetic fidelity with zero compromise on engineering rigor.',
  },
];

// ── Social Links ──
export const socialLinks = [
  {
    label: 'GitHub',
    url: 'https://github.com/Archish2007Gupta',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/archisha-gupta-4a6266385/',
    icon: 'linkedin',
  },
  {
    label: 'Email',
    url: 'mailto:archishagupta4907@gmail.com',
    icon: 'mail',
  },
];
