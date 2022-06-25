import { defineComponent, withSvelte } from 'lake'
import Gl from '../GLWorld/index.svelte'
import Grid from '../Grid'

export default defineComponent({
  components: {
    '#Gl': withSvelte(Gl),
    '#Grid': Grid,
  },

  setup() {
    console.log('HOME')
  },
})
