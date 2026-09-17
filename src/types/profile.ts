export interface SocialLinks {
  fiverr: string | undefined
  facebook: string | undefined
  github: string
  email: string
  linkedin?: string
}

export interface Profile {
  name: string
  firstName: string
  lastName: string
  title: string
  avatar: string
  bio: string
  location: string
  email: string
  role: string
  status: string
  signature: string
  socials: SocialLinks
}