import Highway from '@dogstudio/highway'

const H = new Highway.Core({
  links: 'a:not([target]):not([href^=\\#]):not([data-pjax-ignore])',
})

export { H }
