import 'virtual:windi.css'
import About from '@/components/about'
import Cursor from '@/components/cursor'
import $ from 'bianco.query'
import Gl from '@/components/gl'
import factory, { withSvelte, type IComponent, type ComponentContext } from 'lake'
import Home from '@/components/home'
import Load from '@/components/load'
import Menu from '@/components/menu'
import Noop from '@/components/noop'
import Observer from '@/components/observer/index.svelte'
import Works from '@/components/works'
import WorksDetail from '@/components/works/[slug]'

const init = () => {
  const { component, unmount } = factory()

  const table: Record<string, IComponent> = {
    Noop,
    Observer: withSvelte(Observer),
    Cursor,
    Menu,
    Home,
    Works,
    WorksDetail,
    About,
  } as const

  const glWorld = component(Gl)(document.getElementById('js-glWorld')!)
  const gMenu = component(Menu)(document.getElementById('js-menu')!)

  const bootstrap = (scope: HTMLElement, initialLoad = true) => {
    return $<HTMLElement>(`[data-component]`, scope).reduce<ComponentContext[]>((acc, el) => {
      const name = el.dataset.component || 'Noop'
      try {
        const mount = component(table[`${name}`])
        acc.push(
          mount(el, {
            initialLoad,
            glContext: glWorld.current,
            menuContext: gMenu.current,
          })
        )
      } catch (error) {
        console.error(error)
      }
      return acc
    }, [])
  }

  const html = document.documentElement

  component(Load)(html, {
    componentDidMount: () => bootstrap(html),
    componentDidUpdate: (scope: HTMLElement) => bootstrap(scope, false),
    cleanup: (scope: HTMLElement) => unmount($(`[data-component]`, scope)),
    glContext: glWorld.current,
  })
}

if (document.readyState !== 'loading') {
  init()
} else {
  document.addEventListener('DOMContentLoaded', init)
}
