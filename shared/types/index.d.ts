import type { Document } from 'mongoose'

export interface ClipData {
  _id: string
  id: string
  url: string
  broadcaster_id: string
  broadcaster_name: string
  creator_name: string
  game_id: string
  title: string
  view_count: number
  created_at: string
  thumbnail_url: string
  duration: number
  game: Game | null
}

export interface ClipResponse {
  docs: ClipData[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface Game {
  _id: string
  id: string
  name: string
  box_art_url: string
}

export interface GameResponse {
  _id: string
  id: string
  box_art_url: string
  name: string
}

export interface Search {
  _id: string
  ip: string
  userAgent: string
  title: string
  createdAt: string
  updateAt: string
}

export interface SearchResponse {
  docs: Search[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface ClipQueryParams {
  title?: string
  page?: string
  sort?: string
  limit?: string
  creator?: string
  game?: string | string[] // Allow multiple games
  startDate?: string
  endDate?: string
}

export interface GameQueryParams {
  search: string
  game: string | string[]
}

export interface MongooseQuery {
  $text?: { $search: string }
  creator_name?: { $regex: RegExp }
  game_id?: string | { $in: string[] }
  created_at?: {
    $lt?: string
    $gt?: string
  }
}

export type SortOrder = 'views' | 'oldest' | 'newest' | 'title'

export interface IClip extends Document {
  url: string
  broadcaster_id: string
  broadcaster_name: string
  creator_name: string
  game_id: string
  title: string
  view_count: number
  created_at: string
  thumbnail_url: string
  duration: number
}

export interface ClipDocument extends Document, IClip {}
