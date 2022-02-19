import 'ress'
import 'virtual:windi.css'

import { init } from './features/initializeApp'

const isDev = process.env.NODE_ENV === 'development'

document.addEventListener('DOMContentLoaded', init)

if (isDev) {
  const showStats = async () => {
    const Stats = await (
      (await import('https://cdn.skypack.dev/stats.js')) as any
    ).default

    const stats = new Stats()
    stats.showPanel(0)

    document.body.appendChild(stats.dom)

    const loop = () => {
      stats.update()
      requestAnimationFrame(loop)
    }

    loop()
  }

  showStats()
}
