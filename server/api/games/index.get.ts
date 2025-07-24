import { Game } from '~~/server/models/game.model'

// export default defineCachedEventHandler(async (event) => {
//   interface QueryParams {
//     search: string
//     game: string | string[]
//   }

//   const { search, game } = getQuery<QueryParams>(event)

//   if (!search && !game)
//     return []

//   const query = {
//     $or: [
//       { id: game },
//       { $text: { $search: search || '' } },
//     ],
//   }

//   try {
//     return await Game.find(query)
//   }
//   catch (error) {
//     return error
//   }
// }, {
//   maxAge: 60 * 60,
// })
export default defineEventHandler(async (event) => {
  interface QueryParams {
    search: string
    game: string | string[]
  }

  const { search, game } = getQuery<QueryParams>(event)

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
