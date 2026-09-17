import type { Skill, TechStackItem, SkillGroup } from '@/types/skill'


export const skillGroups: SkillGroup[] = [
  {
    id: 'interface',
    label: 'Interface',
    note: 'What the shop owner actually touches.',
    items: [
      { name: 'Vue.js', icon: 'vuedotjs', iconType: 'brand' },
      { name: 'Nuxt.js', icon: 'nuxtdotjs', iconType: 'brand' },
      { name: 'TypeScript', icon: 'typescript', iconType: 'brand' },
      { name: 'JavaScript', icon: 'javascript', iconType: 'brand' },
      { name: 'Tailwind CSS', icon: 'tailwindcss', iconType: 'brand' },
      { name: 'Pinia', icon: 'pinia', iconType: 'brand' },
      { name: 'HTML', icon: 'html5', iconType: 'brand' },
      { name: 'CSS', icon: 'css3', iconType: 'brand' },
      { name: 'Vite', icon: 'vite', iconType: 'brand' },
    ],
  },
  {
    id: 'data',
    label: 'Data & backend',
    note: 'Where the records live and how they stay correct.',
    items: [
      { name: 'PostgreSQL', icon: 'postgresql', iconType: 'brand' },
      { name: 'MySQL', icon: 'mysql', iconType: 'brand' },
      { name: 'Supabase', icon: 'supabase', iconType: 'brand' },
      { name: 'Node.js', icon: 'nodedotjs', iconType: 'brand' },
      { name: 'PHP', icon: 'php', iconType: 'brand' },
      { name: 'Laravel', icon: 'laravel', iconType: 'brand' },
      { name: 'REST APIs', icon: 'Webhook', iconType: 'lucide' },
    ],
  },
  {
    id: 'delivery',
    label: 'Shipping & devices',
    note: 'Getting it onto a phone behind a counter.',
    items: [
      { name: 'Capacitor', icon: 'capacitor', iconType: 'brand' },
      { name: 'Git / GitHub', icon: 'github', iconType: 'brand' },
      { name: 'Offline-first sync', icon: 'Layers', iconType: 'lucide' },
      { name: 'Responsive design', icon: 'MonitorSmartphone', iconType: 'lucide' },
    ],
  },
  {
    id: 'ai',
    label: 'AI in production',
    note: 'Shipped inside three live systems, not a side experiment.',
    items: [
      { name: 'Google Gemini', icon: 'google', iconType: 'brand' },
      { name: 'Anthropic', icon: 'anthropic', iconType: 'brand' },
    
    ],

  },
]

/** Flat list kept for any view that still expects it. */
export const skills: Skill[] = skillGroups.flatMap((group) =>
  group.items.map((item) => ({
    name: item.name,
    icon: item.icon,
    iconType: item.iconType,
    bg: 'transparent',
    color: 'currentColor',
  })),
)

export const techStack: TechStackItem[] = skills.map((skill) => ({
  name: skill.name,
  icon: skill.icon,
  iconType: skill.iconType,
  color: 'currentColor',
}))
