import { Core } from '@unseenco/taxi'

export const taxi = new Core({
  links: 'a:not([target]):not([href^=\\#]):not([data-pjax-ignore])',
})
