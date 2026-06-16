import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

// Next does not auto-prefix basePath inside the manifest body, so prefix paths manually.
// (The `<link rel="manifest">` that Next injects from this convention IS basePath-aware.)
const basePath = process.env.BASE_PATH || ''

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMetadata.title,
    short_name: siteMetadata.title,
    description: siteMetadata.description,
    id: `${basePath}/`,
    start_url: `${basePath}/`,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    lang: 'zh-TW',
    icons: [
      {
        src: `${basePath}/static/favicons/android-chrome-192x192.png`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${basePath}/static/favicons/android-chrome-512x512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
