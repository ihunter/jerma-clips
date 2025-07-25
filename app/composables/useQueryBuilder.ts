import type { LocationQueryValue } from 'vue-router'

interface QueryParams {
  title?: LocationQueryValue
  creator?: LocationQueryValue
  game?: LocationQueryValue[]
  startDate?: LocationQueryValue
  endDate?: LocationQueryValue
  page?: LocationQueryValue
  sort?: LocationQueryValue
  limit?: LocationQueryValue
}

export default function () {
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

  function normalizeParam(param: LocationQueryValue | LocationQueryValue[] | undefined) {
    return Array.isArray(param) ? param[0] : param
  }

  function normalizeArrayParam(param: LocationQueryValue | LocationQueryValue[] | undefined) {
    return Array.isArray(param) ? param : [param].filter(param => param !== undefined)
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
      limit: limit ? Number.parseInt(limit) : 12,
      page: page ? Number.parseInt(page) : 1,
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
