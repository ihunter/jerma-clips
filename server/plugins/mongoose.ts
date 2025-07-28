import mongoose from 'mongoose'

export default defineNitroPlugin(async (_nitroApp) => {
  const { mongodbUri } = useRuntimeConfig()

  try {
    await mongoose.connect(mongodbUri)
  }
  catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
})
