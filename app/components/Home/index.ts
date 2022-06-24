import { defineComponent, withSvelte } from 'lake'
import Gl from '../GLWorld/index.svelte'

export default defineComponent({
  components: {
    '#gl': withSvelte(Gl),
  },

  setup() {
    console.log('HOME')
  },
})
