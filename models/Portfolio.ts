import type { ObjectId } from "mongodb"

export interface Testimonial {
  quote: string
  author: string
  position: string
  company: string
}

export interface PortfolioItem {
  _id?: ObjectId | string
  title: string
  slug: string
  description: string
  shortDescription: string
  category: string
  tags: string[]
  featuredImage: string
  gallery: string[] // Ensure this is defined as an array of strings
  client: string
  completionDate: string | Date
  technologies: string[]
  challenge: string
  solution: string
  results: string
  testimonial?: Testimonial
  featured: boolean
  order: number
  createdAt?: string | Date
  updatedAt?: string | Date
}
