/* ============================================================
   portfolioData.js — All portfolio content in one place
   ============================================================ */

// ── Navigation Links ──
export const navLinks = [
  { id: 'about', label: '01 ABOUT', num: '01', bg: '#2563EB', textColor: '#FFFFFF' },
  { id: 'work', label: '02 SKILLS', num: '02', bg: '#F59E0B', textColor: '#11110F' },
  { id: 'projects', label: '03 WORK', num: '03', bg: '#FF5722', textColor: '#FFFFFF' },
  { id: 'experience', label: '04 EXPERIENCE', num: '04', bg: '#EF4444', textColor: '#FFFFFF' },
  { id: 'designs', label: '05 DESIGN', num: '05', bg: '#10B981', textColor: '#FFFFFF' },
  { id: 'journey', label: '06 JOURNEY', num: '06', bg: '#22C55E', textColor: '#11110F' },
  { id: 'github', label: '07 GITHUB', num: '07', bg: '#6366F1', textColor: '#FFFFFF' },
  { id: 'contact', label: '08 CONTACT', num: '08', bg: '#8B5CF6', textColor: '#FFFFFF' },
];

// ── Personal Profile ──
export const profile = {
  name: 'Archisha Gupta',
  primaryIdentity: 'Computer Science Student',
  positioning: 'Building at the intersection of code and design.',
  quote: '“Most builders pick a side. I don’t.”',
  location: 'Bengaluru, India',
  educationShort: 'B.Tech — Computer Science (2025–2029)',
  institutionShort: 'BMS Institute of Technology & Management',
  microLabels: [
    { label: 'BASED IN', value: 'BENGALURU, INDIA' },
    { label: 'STUDYING', value: 'COMPUTER SCIENCE' },
    { label: 'BUILDING', value: 'WEB + AI + IOT' },
    { label: 'EXPLORING', value: 'CREATIVE TECHNOLOGY' },
  ],
  interests: [
    'WEB DEVELOPMENT',
    'UI/UX',
    'AI',
    'IoT',
    'CREATIVE TECHNOLOGY',
    'VISUAL DESIGN',
  ],
};

// ── Categorized Skills (No Fake % Bars) ──
export const skillCategories = [
  {
    category: 'CODE',
    accent: 'var(--nirmaan-blue)',
    skills: ['C', 'C++', 'Python', 'HTML', 'CSS', 'JavaScript', 'TypeScript'],
  },
  {
    category: 'WEB / DEVELOPMENT',
    accent: 'var(--nirmaan-yellow)',
    skills: ['React', 'Web Development', 'APIs', 'Git', 'GitHub', 'Supabase'],
  },
  {
    category: 'IoT',
    accent: 'var(--nirmaan-green)',
    skills: ['ESP32', 'Sensors', 'Hardware Automation'],
  },
  {
    category: 'DESIGN',
    accent: 'var(--nirmaan-orange)',
    skills: ['Figma', 'Canva', 'Photoshop', 'UI/UX', 'Branding', 'Visual Design'],
  },
  {
    category: 'INTERESTS',
    accent: 'var(--nirmaan-purple)',
    skills: ['Artificial Intelligence', 'IoT', 'Creative Technology', 'Game Development'],
  },
];

// ── Hero Info Cards ──
export const heroCards = [
  {
    number: '01',
    title: 'DESIGN',
    items: ['UI/UX', 'Branding', 'Visual Systems'],
    accent: 'var(--nirmaan-blue)',
  },
  {
    number: '02',
    title: 'CODE',
    items: ['Web', 'React', 'Python', 'C++'],
    accent: 'var(--nirmaan-yellow)',
  },
  {
    number: '03',
    title: 'EXPLORE',
    items: ['AI', 'IoT', 'Creative Tech'],
    accent: 'var(--nirmaan-red)',
  },
];

// ── Disciplines ("What I Build") ──
export const disciplines = [
  {
    number: '01',
    title: 'WEB EXPERIENCES',
    description: 'Interactive websites, dashboards and web applications.',
    accent: 'var(--nirmaan-blue)',
  },
  {
    number: '02',
    title: 'UI / UX',
    description: 'Interfaces, prototypes and digital experiences.',
    accent: 'var(--nirmaan-purple)',
  },
  {
    number: '03',
    title: 'AI',
    description: 'AI-powered tools and experiments.',
    accent: 'var(--nirmaan-red)',
  },
  {
    number: '04',
    title: 'IoT',
    description: 'Connected devices and hardware automation.',
    accent: 'var(--nirmaan-green)',
  },
  {
    number: '05',
    title: 'CREATIVE TECHNOLOGY',
    description: 'Projects combining technology and visual creativity.',
    accent: 'var(--nirmaan-yellow)',
  },
  {
    number: '06',
    title: 'REAL-WORLD PRODUCTS',
    description: 'Applications designed around actual user problems.',
    accent: 'var(--nirmaan-blue)',
  },
];

// ── Featured Projects ("ONE FLOW") ──
export const projects = [
  {
    id: 'echonex',
    number: '01',
    title: 'ECHONEX',
    category: 'IoT / AI / Web',
    buildType: 'WEB + IOT + AI',
    status: 'BUILT',
    stack: 'ESP32 · AI · SUPABASE · WEB',
    description:
      'A smart voice-controlled assistant combining ESP32, hardware sensors, automation, AI interaction and a real-time web dashboard.',
    technologies: ['ESP32', 'AI', 'IoT', 'SUPABASE', 'WEB'],
    tags: ['ESP32', 'AI', 'IoT', 'SUPABASE', 'WEB'],
    accent: 'var(--nirmaan-blue)',
    github: 'https://github.com/Archish2007Gupta',
    live: null,
  },
  {
    id: 'cleanzy',
    number: '02',
    title: 'CLEANZY',
    category: 'Smart City / Product',
    buildType: 'WEB + PRODUCT PLATFORM',
    status: 'BUILT',
    stack: 'WEB · TYPESCRIPT · UI/UX',
    description:
      'An on-demand waste collection platform designed around pickup scheduling, route tracking and digital waste management.',
    technologies: ['WEB', 'TYPESCRIPT', 'UI/UX'],
    tags: ['WEB', 'TYPESCRIPT', 'UI/UX'],
    accent: 'var(--nirmaan-green)',
    github: 'https://github.com/Archish2007Gupta/Cleanzy',
    live: null,
  },
  {
    id: 'way2uni',
    number: '03',
    title: 'WAY2UNI',
    category: 'Product / UI/UX',
    buildType: 'WEB + NAVIGATION PLATFORM',
    status: 'BUILT',
    stack: 'WEB · MAPS · AI · UI/UX',
    description:
      'A campus discovery and navigation concept designed to help students find buildings, facilities and useful services seamlessly.',
    technologies: ['WEB', 'MAPS', 'AI', 'UI/UX'],
    tags: ['WEB', 'MAPS', 'AI', 'UI/UX'],
    accent: 'var(--nirmaan-yellow)',
    github: 'https://github.com/Archish2007Gupta',
    live: null,
  },
  {
    id: 'sparkhabit',
    number: '04',
    title: 'SPARKHABIT',
    category: 'Creative Technology',
    buildType: 'CREATIVE TECH PLATFORM',
    status: 'BUILT',
    stack: 'JAVASCRIPT · WEB · PRODUCT DESIGN',
    description:
      'A platform centered around short daily creative challenges designed to build consistency and spark visual exploration.',
    technologies: ['JAVASCRIPT', 'WEB', 'PRODUCT DESIGN'],
    tags: ['JAVASCRIPT', 'WEB', 'PRODUCT DESIGN'],
    accent: 'var(--nirmaan-purple)',
    github: 'https://github.com/Archish2007Gupta/SparkHabit',
    live: null,
  },
];

// ── Verified Experience ──
export const experience = [
  {
    id: 'coding-club',
    number: '01',
    org: 'CODING CLUB BMSIT',
    role: 'Design Associate / Core Team Member',
    period: 'March 2026 – Present',
    description:
      'Created branding and visual assets including logos, ID cards, posters, social media creatives, and apparel. Contributed to event branding, promotional campaigns, UI/UX requirements, visual storytelling, colour theory, typography, and layout.',
    tags: ['BRANDING', 'POSTERS', 'APPAREL', 'UI/UX', 'LOGOS', 'ID CARDS'],
    accent: 'var(--nirmaan-blue)',
  },
  {
    id: 'rotaract',
    number: '02',
    org: 'ROTARACT CLUB OF BMS YELAHANKA',
    role: 'Editorial Director',
    period: 'June 2026 – Present',
    description:
      'Contribute to editorial and creative communication activities, including content presentation and visual communication for club initiatives.',
    tags: ['EDITORIAL', 'CREATIVE COMM', 'VISUAL STORYTELLING'],
    accent: 'var(--nirmaan-red)',
  },
];

// ── Education ──
export const education = {
  institution: 'BMS INSTITUTE OF TECHNOLOGY & MANAGEMENT',
  degree: 'B.Tech — Computer Science',
  period: '2025 — 2029',
  location: 'Bengaluru, India',
};

// ── Hackathons & Events ──
export const events = [
  {
    number: '01',
    name: 'DECODE2DEPLOY',
    org: 'Coding Club BMSIT',
    accent: 'var(--nirmaan-blue)',
  },
  {
    number: '02',
    name: 'RNSIT IMPACTX',
    org: 'RNSIT',
    accent: 'var(--nirmaan-yellow)',
  },
  {
    number: '03',
    name: 'VYUHATECH 2.0',
    org: 'Hackathon Event',
    accent: 'var(--nirmaan-purple)',
  },
];

export const hackathonDescription =
  '“Experiences that pushed me to build, collaborate, prototype and present under pressure.”';

// ── Design Archive Categories ──
export const designCategories = [
  'ALL',
  'POSTERS',
  'BRANDING',
  'UI/UX',
  'EVENT DESIGN',
  'APPAREL',
  'SOCIAL MEDIA',
  'ID CARDS',
  'CERTIFICATES',
];

// ── Design Archive Items ──
export const designItems = [
  { id: 1, title: 'Coding Club Official Logo', category: 'BRANDING', accent: 'var(--nirmaan-blue)' },
  { id: 2, title: 'Decode2Deploy Hackathon Poster', category: 'POSTERS', accent: 'var(--nirmaan-red)' },
  { id: 3, title: 'Coding Club Core Team ID Card', category: 'ID CARDS', accent: 'var(--nirmaan-yellow)' },
  { id: 4, title: 'Club Merch & Apparel Design', category: 'APPAREL', accent: 'var(--nirmaan-purple)' },
  { id: 5, title: 'Cleanzy Waste Dashboard Concept', category: 'UI/UX', accent: 'var(--nirmaan-green)' },
  { id: 6, title: 'Rotaract Event Creative Banner', category: 'EVENT DESIGN', accent: 'var(--nirmaan-orange)' },
  { id: 7, title: 'Official Certificate Template', category: 'CERTIFICATES', accent: 'var(--nirmaan-blue)' },
  { id: 8, title: 'Social Media Campaign Creative', category: 'SOCIAL MEDIA', accent: 'var(--nirmaan-pink)' },
];

// ── Actual GitHub Repositories ──
export const githubProfile = {
  url: 'https://github.com/Archish2007Gupta',
  username: 'Archish2007Gupta',
  repos: [
    { name: 'SparkHabit', lang: 'JavaScript', desc: 'Short daily creative challenges platform' },
    { name: 'Cleanzy', lang: 'TypeScript', desc: 'On-demand waste pickup & route management' },
    { name: 'Netflix-Clone', lang: 'HTML/CSS/JS', desc: 'Responsive media streaming platform interface' },
    { name: 'KOTLC', lang: 'Web', desc: 'Interactive web project' },
    { name: 'Amazon-Clone', lang: 'JavaScript', desc: 'E-commerce platform UI concept' },
  ],
};

// ── Social & Contact Links ──
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
