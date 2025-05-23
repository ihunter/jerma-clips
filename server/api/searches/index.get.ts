// import { Search } from '~/server/models/search.model'

// const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (_event) => {
  return null

  // interface QueryParams {
  //   page: string
  //   limit: string
  // }

  // const { page, limit } = getQuery<QueryParams>(event)

  // try {
  //   return await Search.paginate({}, {
  //     page: Number.isNaN(Number.parseInt(page)) ? 1 : Number.parseInt(page),
  //     limit: Number.isNaN(Number.parseInt(limit)) ? 12 : Math.min(Number.parseInt(limit), runtimeConfig.public.limit),
  //     sort: { createdAt: -1 },
  //   })
  // }
  // catch (error) {
  //   return error
  // }
})
