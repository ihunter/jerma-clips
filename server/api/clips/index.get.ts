import { Clip } from '~~/server/models/clip.model'
import { Game } from '~~/server/models/game.model'
import { clipsQuery } from '~~/server/utils/queryParser'

const runtimeConfig = useRuntimeConfig()

export default defineCachedEventHandler(async (event) => {
  const { query, page, order, limit } = clipsQuery(event)

  // Used to register model, otherwise populate won't work
  Game.findOne()

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
}, {
  maxAge: 60 * 60,
})
