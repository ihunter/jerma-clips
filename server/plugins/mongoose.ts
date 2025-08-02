/* eslint-disable no-console */
import mongoose from 'mongoose'

export default defineNitroPlugin(async (nitroApp) => {
  const { mongodbUri } = useRuntimeConfig()

  try {
    await mongoose.connect(mongodbUri, {
      maxPoolSize: 2,
      minPoolSize: 1,
      maxIdleTimeMS: 30000,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })

    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected')
    })

    nitroApp.hooks.hook('close', async () => {
      try {
        await mongoose.disconnect()
        console.log('MongoDB connection closed')
      }
      catch (error) {
        console.error('Error closing MongoDB connection:', error)
      }
    })
  }
  catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
})
