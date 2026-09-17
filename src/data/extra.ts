export interface Experience {
  role: string
  type: string
  period: string
}

export const experience: Experience = {
  role: 'Full Stack Developer',
  type: 'Freelance',
  period: '2023 – Present',
}

/**
 * The hero ledger strip. Keep these honest and keep them current — a figure
 * a visitor can disprove in one click costs more than it earns.
 */
export interface LedgerFigure {
  value: string
  label: string
}

export const ledger: LedgerFigure[] = [
  { value: '6', label: 'systems built end to end' },
  { value: '3', label: 'business owners on record' },
  { value: '2023', label: 'building for clients since' },
]


export interface ApproachPoint {
  title: string
  description: string
  evidence: string
}

export const approach: ApproachPoint[] = [
  {
    title: 'It has to work when the internet drops',
    description:
      'A counter in Rizal cannot stop taking orders because the connection went down. I build the local store first and sync after, so a sale is never lost waiting on a network.',
    evidence: 'BudgetPOS',
  },
  {
    title: 'The owner should read it without me there',
    description:
      'Reports get designed for the person closing up at 9pm, not for a dashboard screenshot. Plain totals, obvious units, no chart that needs explaining.',
    evidence: 'Hydrix Water Station',
  },
  {
    title: 'I stay after handover',
    description:
      'Every client here came back or referred someone. The work is not finished at launch, it is finished when they have run a full month on it without calling me.',
    evidence: 'Muni Yoga Studio',
  },
]

export interface Recommendation {
  quote: string
  name: string
  initials: string
  role: string
}

export const recommendations: Recommendation[] = [
  {
    quote:
      'Edgar is a dedicated developer with great attitude, he delivers quality work and is always open to feedback.',
    name: 'Che Villaflores',
    initials: 'CV',
    role: 'Founder, Muni Yoga Studio',
  },
  {
    quote:
      'It was a real pleasure to work with Edgar. His skills and professionalism are commendable.',
    name: 'Edmond Bernardino',
    initials: 'EB',
    role: 'Owner, Billiard & Meats Shop',
  },
  {
    quote:
      'Edgar is a highly skilled developer with a strong work ethic. He consistently delivers high-quality code and is a pleasure to work with.',
    name: 'Kurt Russel Mauricio',
    initials: 'KRM',
    role: 'Owner, KRGM Solution',
  },
  {
    quote:
      'Edgar shows great problem-solving skills and is always willing to learn. A valuable team member.',
    name: 'Ace Lawrence',
    initials: 'AL',
    role: 'Lead Developer',
  },


]


export interface AboutCard {
  icon: 'Code' | 'Lightbulb' | 'BookOpen' | 'Users'
  title: string
  description: string
}

export const aboutCards: AboutCard[] = []
