import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    "theme_color": "#026b5f",
    "background_color": "#008374",
    "display": "standalone",
    "scope": "/",
    "start_url": "/",
    "name": "Show and Tell",
    "short_name": "Show and Tell",
    "description": "Show and Tell",
    "icons": [
      {
        "src": "icons/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "icons/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      },
      {
        "src": "icons/maskable.png",
        "sizes": "512x512",
        "type": "image/x-icon",
        "purpose": "maskable"
      }
    ]
  }
}