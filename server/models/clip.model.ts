import type { PaginateModel } from 'mongoose'
import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const ClipSchema = new Schema({
  id: {
    type: String,
    required: true,
    index: 1,
  },
  url: {
    type: String,
    required: true,
  },
  broadcaster_id: {
    type: String,
    required: true,
  },
  broadcaster_name: {
    type: String,
    required: true,
  },
  creator_name: {
    type: String,
    required: true,
  },
  game_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    index: 'text',
  },
  view_count: {
    type: Number,
    required: true,
    index: 1,
  },
  created_at: {
    type: Date,
    required: true,
    index: 1,
  },
  thumbnail_url: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: false,
  },
}, {
  toJSON: { virtuals: true },
})

ClipSchema.virtual('game', {
  ref: 'Game',
  localField: 'game_id',
  foreignField: 'id',
  justOne: true,
})

ClipSchema.plugin(mongoosePaginate)

export const Clip = model<ClipDocument, PaginateModel<ClipDocument>>('Clip', ClipSchema)
