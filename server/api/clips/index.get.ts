import { Clip } from '~~/server/models/clip.model'
import { Game } from '~~/server/models/game.model'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const { query, page, order, limit } = clipsQueryParser(event)

  // Used to register model, otherwise populate won't work
  Game.init()

  try {
    return await Clip.paginate(query, {
      populate: 'game',
      page,
      sort: order,
      limit: Math.min(limit, runtimeConfig.public.limit),
    })
  }
  catch (error) {
    return error
  }
})
