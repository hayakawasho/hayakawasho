import { withSvelte, mountComponent, registerComponent, q } from '@/foundation'
import GLWorld from '../components/GLWorld/index.svelte'

function mount(scope = document.body) {
  q(`[data-component]`, scope).forEach(el => {
    const { component, props } = el.dataset
    const newProps = props ?? {}

    mountComponent(el, newProps, component as string)
  })
}

export function initializeApp() {
  registerComponent('GLWorld', withSvelte(GLWorld))

  mount()
}
