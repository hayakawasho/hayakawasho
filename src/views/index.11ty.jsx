import { css } from '@emotion/react'
import { renderToStaticMarkup as r } from 'react-dom/server'
import { Content } from './components/Content'
import { Header } from './components/Header'
import { PageWithHeader } from './components/PageWithHeader'

const imgs = [
  '/assets/1619176897-2048x1280.jpg',
  '/assets/1619176933-2048x1280.jpg',
  '/assets/1619176897-2048x1280.jpg',
  '/assets/1619176933-2048x1280.jpg',
  '/assets/1619176897-2048x1280.jpg',
  '/assets/1619176933-2048x1280.jpg',
]

export const render = () => {
  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />}>
      <Content namespace="Works">
        <main data-component="Works">
          <div css={list}>
            {imgs.map((src, i) => {
              return (
                <figure className="relative" key={i}>
                  <div css={aspect}></div>
                  <img
                    src={src}
                    alt=""
                    className="fit2parent invisible"
                    data-ref="plane"
                    data-index={i}
                  />
                </figure>
              )
            })}
          </div>
        </main>
      </Content>
    </PageWithHeader>
  )}`
}

const list = css`
  margin: 0;
  display: grid;
  gap: 1rem;

  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`

const aspect = css`
  aspect-ratio: 1536 / 960;
`
