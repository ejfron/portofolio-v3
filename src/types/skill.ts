export interface Skill {
  name: string
  icon: string
  iconType: 'brand' | 'lucide'
  bg: string
  color: string
}

export interface TechStackItem {
  name: string
  icon: string
  iconType: 'brand' | 'lucide'
  color: string
}

export interface SkillGroupItem {
  name: string
  icon: string
  iconType: 'brand' | 'lucide'
}

export interface SkillGroup {
  id: string
  label: string
  note: string
  items: SkillGroupItem[]
}
