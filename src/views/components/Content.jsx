// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { css } from '@emotion/react'

export const Content = props => {
  return (
    <div data-router-wrapper>
      <div data-router-view={props.namespace} className="relative">
        {props.children}
      </div>
    </div>
  )
}
