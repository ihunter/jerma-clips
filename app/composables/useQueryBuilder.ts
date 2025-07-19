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

  function normalizeParam(param: string | string[]) {
    return Array.isArray(param) ? param[0] : param
  }

  function normalizeArrayParam(param: string | string[]) {
    return Array.isArray(param) ? param : [param].filter(Boolean)
  }

  const query = computed(() => {
    const title = normalizeParam(route.query.title)
    const game = normalizeArrayParam(route.query.game)
    const startDate = normalizeParam(route.query.startDate)
    const endDate = normalizeParam(route.query.endDate)
    const page = normalizeParam(route.query.page)
    const limit = normalizeParam(route.query.limit)
    const sort = normalizeParam(route.query.sort)
    const creator = normalizeParam(route.query.creator)

    return {
      title,
      game,
      startDate,
      endDate,
      limit: Number.parseInt(limit) || 12,
      page: Number.parseInt(page) || 1,
      sort,
      creator,
    }
  })

  return {
    setQuery,
    updateQuery,
    clearQuery,
    query,
  }
}
