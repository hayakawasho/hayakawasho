import { defineComponent, withSvelte } from 'lake'
import Archives from './archives.svelte'

export default defineComponent({
  components: {
    '#WorksArchives': withSvelte(Archives),
  },

  setup() {
    //
  },
})
