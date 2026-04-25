import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import dsIcon from './assets/DS icon.png'

const createEnhancedFavicon = (imageSrc) => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => {
      const iconSize = 64
      const sourceCropSize = Math.min(image.width, image.height) * 0.58
      const sourceX = (image.width - sourceCropSize) / 2
      const sourceY = (image.height - sourceCropSize) / 2

      const canvas = document.createElement('canvas')
      canvas.width = iconSize
      canvas.height = iconSize

      const context = canvas.getContext('2d')

      if (!context) {
        resolve(imageSrc)
        return
      }

      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = 'high'

      context.save()
      context.beginPath()
      context.arc(iconSize / 2, iconSize / 2, iconSize / 2 - 1, 0, Math.PI * 2)
      context.closePath()
      context.clip()

      // Crop the source center so the DS mark occupies more favicon space.
      context.filter = 'contrast(1.35) saturate(1.4) brightness(1.12)'
      context.drawImage(
        image,
        sourceX,
        sourceY,
        sourceCropSize,
        sourceCropSize,
        0,
        0,
        iconSize,
        iconSize
      )
      context.restore()

      context.beginPath()
      context.arc(iconSize / 2, iconSize / 2, iconSize / 2 - 2, 0, Math.PI * 2)
      context.lineWidth = 2
      context.strokeStyle = 'rgba(45, 212, 191, 0.9)'
      context.stroke()

      resolve(canvas.toDataURL('image/png'))
    }

    image.onerror = (error) => reject(error)
    image.src = imageSrc
  })
}

const applyFavicon = async () => {
  const iconLinks = Array.from(
    document.head.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]')
  )

  if (iconLinks.length === 0) {
    const fallbackIcon = document.createElement('link')
    fallbackIcon.setAttribute('rel', 'icon')
    document.head.appendChild(fallbackIcon)
    iconLinks.push(fallbackIcon)
  }

  let faviconHref = dsIcon

  try {
    faviconHref = await createEnhancedFavicon(dsIcon)
  } catch (error) {
    console.warn('Favicon enhancement failed, using original icon file.', error)
  }

  iconLinks.forEach((link) => {
    link.setAttribute('href', faviconHref)

    if (link.getAttribute('rel') === 'icon' || link.getAttribute('rel') === 'shortcut icon') {
      link.setAttribute('type', 'image/png')
    }
  })
}

applyFavicon()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
