import { model, Schema } from 'mongoose'

const GameSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    index: 'text',
  },
  box_art_url: {
    type: String,
    required: true,
  },
}, {
  toJSON: { virtuals: true },
})

GameSchema.virtual('clips', {
  ref: 'Clip',
  localField: 'id',
  foreignField: 'game_id',
})

export const Game = model<GameDocument>('Game', GameSchema)
