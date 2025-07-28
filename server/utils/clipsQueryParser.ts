import type { H3Event } from 'h3'

function createDateQuery(startDate?: string, endDate?: string) {
  const created_at: MongooseQuery['created_at'] = {}

  if (startDate)
    created_at.$gte = startDate

  if (endDate)
    created_at.$lte = endDate

  return Object.keys(created_at).length ? created_at : undefined
}

function createOrderQuery(sort?: SortOrder, title?: string) {
  switch (sort) {
    case 'views':
      return { view_count: -1 }
    case 'oldest':
      return { created_at: 1 }
    case 'newest':
      return { created_at: -1 }
    case 'title':
      return title
        ? { score: { $meta: 'textScore' }, view_count: -1 }
        : { view_count: -1 }
    default:
      return title
        ? { score: { $meta: 'textScore' }, view_count: -1 }
        : { view_count: -1 }
  }
}

function parsePage(page?: string, defaultPage = 1): number {
  if (!page)
    return defaultPage

  const parsed = Number.parseInt(page, 10)
  return Number.isNaN(parsed) || parsed < 1 ? defaultPage : parsed
}

function parseLimit(limit?: string, defaultLimit = 12, maxLimit = 100): number {
  if (!limit)
    return defaultLimit

  const parsed = Number.parseInt(limit, 10)
  if (Number.isNaN(parsed) || parsed < 1)
    return defaultLimit
  if (parsed > maxLimit)
    return maxLimit

  return parsed
}

export default function (event: H3Event) {
  const { title, page, sort, limit, creator, game, startDate, endDate } = getQuery<ClipQueryParams>(event)

  const query: MongooseQuery = {}

  if (title?.trim()) {
    query.$text = { $search: title.trim() }
  }

  if (creator?.trim()) {
    query.creator_name = { $regex: new RegExp(`^${creator.trim()}$`, 'i') }
  }

  if (game) {
    if (Array.isArray(game)) {
      const validGames = game.filter(g => g?.trim()).map(g => g.trim())
      if (validGames.length === 1) {
        query.game_id = validGames[0]
      }
      else if (validGames.length > 1) {
        query.game_id = { $in: validGames }
      }
    }
    else if (game.trim()) {
      query.game_id = game.trim()
    }
  }

  const created_at = createDateQuery(startDate, endDate)
  if (created_at) {
    query.created_at = created_at
  }

  const order = createOrderQuery(sort, title)

  return {
    query,
    page: parsePage(page),
    limit: parseLimit(limit),
    order,
  }
}
