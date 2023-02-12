// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const Content = props => {
  return (
    <div data-load-container={props.namespace} className="relative">
      {props.children}
    </div>
  )
}
