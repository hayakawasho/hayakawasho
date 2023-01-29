// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { css } from '@emotion/react'

export const Content = props => {
  return (
    <div css={wrap} data-pjax="wrap">
      <div
        css={view}
        data-pjax="view"
        data-pjax-namespace={props.namespace}
        data-component={props['data-component']}
      >
        {props.children}
      </div>
    </div>
  )
}

const wrap = css`
  position: relative;
  z-index: 1;
`

const view = css`
  position: relative;
`
