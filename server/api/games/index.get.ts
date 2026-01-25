import { Game } from '#server/models/game.model'

export default defineEventHandler(async (event) => {
  const { search, game } = getQuery<GameQueryParams>(event)

  if (!search && !game)
    return []

  // Build query conditionally - don't use $or when only one condition exists
  const query: any = {}

  if (game) {
    query.id = game
  }
  else if (search) {
    query.$text = { $search: search }
  }

  try {
    return await Game
      .find(query)
      .lean()
  }
  catch (error) {
    console.error('Game query error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch games',
    })
  }
})
