// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { css } from '@emotion/react'

export const Content = props => {
  return (
    <div css={wrap} data-pjax="wrap">
      <div css={view} data-pjax="view" data-pjax-namespace={props.namespace}>
        {props.children}
      </div>
    </div>
  )
}

const wrap = css`
  position: relative;
`

const view = css`
  position: relative;
`
