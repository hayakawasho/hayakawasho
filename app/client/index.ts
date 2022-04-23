import GLWorld from "../components/GLWorld/index.svelte"
import { registerComponent, withSvelte, mountComponent, q } from "../foundation"

function initializeApp() {
  registerComponent("GLWorld", withSvelte(GLWorld))

  q("[data-component]").forEach(el => {
    const { props, component } = el.dataset
    const newProps = props || {}
    mountComponent(el, newProps, component as string)
  })
}

document.addEventListener("DOMContentLoaded", initializeApp)
