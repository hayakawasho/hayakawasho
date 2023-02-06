import { defineComponent } from 'lake'
import type { Provides } from '@/const'
import { useOnEnter, useOnLeave } from '@/libs/lake'

type Props = Provides

export default defineComponent<Props>({
  setup(_) {
    useOnEnter(() => {
      //
    })

    useOnLeave(() => {
      //
    })
  },
})
