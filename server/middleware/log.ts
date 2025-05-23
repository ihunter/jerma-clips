// import { Search } from '~/server/models/search.model'
// import { clipsQuery } from '~/server/utils/queryParser'

export default defineEventHandler((_event) => {
  // const { method, url } = event.node.req

  // if (!(method === 'GET' && url?.startsWith('/api/clips')))
  //   return

  // const userAgent = getRequestHeader(event, 'user-agent')
  // const ipAddresses = event.node.req.headers['x-forwarded-for'] || event.node.req.socket.remoteAddress

  // const ipAddress = Array.isArray(ipAddresses) ? ipAddresses[0] : ipAddresses?.split(',')[0]

  // const { query, page } = clipsQuery(event)

  // if (page !== 1 || !query.$text?.$search)
  //   return

  // try {
  //   Search.create({
  //     ip: ipAddress,
  //     userAgent,
  //     title: query.$text.$search,
  //   })
  // }
  // catch (error) {
  //   return error
  // }
})
