import { Game } from '~~/server/models/game.model'

export default defineEventHandler(async (event) => {
  const { search, game } = getQuery<GameQueryParams>(event)

  if (!search && !game)
    return []

  const query = {
    $or: [
      { id: game },
      { $text: { $search: search || '' } },
    ],
  }

  try {
    return await Game.find(query)
  }
  catch (error) {
    return error
  }
})
