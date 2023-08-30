import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemas } from './sanity/schemas'

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  title: "Make the NFL Great Again",
  basePath: '/studio',
  plugins: [
    deskTool(),
    visionTool({defaultApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION }),
  ],
  schema: {
    types: schemas
  },
})