import { css } from '@emotion/react'
import { renderToStaticMarkup as r } from 'react-dom/server'
import { Content } from './components/Content'
import { Header } from './components/Header'
import { PageWithHeader } from './components/PageWithHeader'

const imgs = [
  'http://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/tex1.jpg',
  'http://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/tex2.jpg',
  'http://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/tex1.jpg',
  'http://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/tex2.jpg',
  'http://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/tex1.jpg',
  'http://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/tex2.jpg',
]
export const render = () => {
  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />}>
      <Content namespace="Home">
        <main data-component="Home">
          <div css={list}>
            {imgs.map(src => {
              return (
                <figure>
                  <div css={aspect}></div>
                  <img data-src={src} alt="" className="hidden" data-ref="plane" />
                </figure>
              )
            })}
          </div>
        </main>
      </Content>
    </PageWithHeader>
  )}`
}

const list = css``

const aspect = css``
