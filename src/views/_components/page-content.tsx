import type React from 'react'

export const Content = (props: { children: React.ReactNode }) => {
  return (
    <div className="relative" data-ref="main">
      {props.children}
    </div>
  )
}
