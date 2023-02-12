import { css } from '@emotion/react'
import { renderToStaticMarkup as r } from 'react-dom/server'
import { Content } from '../components/Content'
import { Header } from '../components/Header'
import { PageWithHeader } from '../components/PageWithHeader'

export const render = () => {
  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />}>
      <Content namespace="About">
        <main data-component="About" css={wrap} className="pt-[11rem]">
          <h1 css={h1} className="mb-[4.5rem]">
            Hello
          </h1>
          <div css={body}>
            <p css={text}>
              My name is Sho Hayakawa. I’ve been working as a web front-end developer.
            </p>
            <p css={text}>Right now, I’m working for a creative production team, panorama inc.</p>
          </div>
        </main>
      </Content>
    </PageWithHeader>
  )}`
}

const wrap = css`
  background-color: rgb(0, 0, 0);
  min-height: 100vh;
  overflow-x: hidden;
`

const h1 = css`
  font-size: 12rem;
  font-weight: 300;
  font-family: var(--font-fjalla);
  letter-spacing: -0.06em;
  margin-left: -0.1em;
  line-height: 1;
  writing-mode: vertical-lr;
  position: absolute;
  opacity: 0.14;
`

const body = css`
  margin: 0 2rem;
  margin-left: 8rem;
`

const text = css`
  font-size: 1.4rem;
  letter-spacing: -0.02em;
  line-height: 1.7;
`
