// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Global, css } from '@emotion/react'
import { Head } from '../Head'
import { Header } from '../Header'

export const PageWithHeader = props => {
  return (
    <html lang="ja">
      <Head title={props.title} description={props.description} />
      <body>
        <Header />
        {props.children}
        <div data-component="Gl"></div>
      </body>
    </html>
  )
}
