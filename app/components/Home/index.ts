import { defineComponent, withSvelte } from 'lake'
import Gl from '../GLWorld/index.svelte'
import Works from '../Works'

export default defineComponent({
  components: {
    '#Gl': withSvelte(Gl),
    '#Works': Works,
  },

  setup() {
    console.log('HOME')
  },
})
