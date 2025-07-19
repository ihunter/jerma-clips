interface QueryParams {
  title?: string
  creator?: string
  game?: string[]
  startDate?: string
  endDate?: string
  page?: number
  sort?: string
  limit?: number
}

export function useQueryBuilder() {
  const route = useRoute()
  const router = useRouter()

  function setQuery(queryParams: QueryParams) {
    router.push({
      query: {
        ...queryParams,
      },
    })
  }

  function updateQuery(queryParams: QueryParams) {
    router.push({
      query: {
        ...route.query,
        page: 1,
        ...queryParams,
      },
    })
  }

  function clearQuery() {
    router.push({
      query: {},
    })
  }

  const query = computed(() => {
    const title = Array.isArray(route.query.title) ? route.query.title[0] : route.query.title
    const game = Array.isArray(route.query.game) ? route.query.game : [route.query.game].filter(Boolean)
    const broadcaster = Array.isArray(route.query.broadcaster) ? route.query.broadcaster[0] : route.query.broadcaster
    const startDate = Array.isArray(route.query.startDate) ? route.query.startDate[0] : route.query.startDate
    const endDate = Array.isArray(route.query.endDate) ? route.query.endDate[0] : route.query.endDate
    const page = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page
    const limit = Array.isArray(route.query.limit) ? route.query.limit[0] : route.query.limit
    const sort = Array.isArray(route.query.sort) ? route.query.sort[0] : route.query.sort
    const creator = Array.isArray(route.query.creator) ? route.query.creator[0] : route.query.creator

    return {
      title,
      game,
      broadcaster,
      startDate,
      endDate,
      limit: Number.parseInt(limit) || 12,
      page: Number.parseInt(page) || 1,
      sort,
      creator,
    }
  })

  return { setQuery, updateQuery, clearQuery, query }
}
