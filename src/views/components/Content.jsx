// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { css } from '@emotion/react'

export const Content = props => {
  return (
    <div data-taxi>
      <div css={view} data-taxi-view data-namespace={props.namespace}>
        {props.children}
      </div>
    </div>
  )
}

const view = css`
  position: relative;
`
