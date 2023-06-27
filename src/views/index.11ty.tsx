import { css } from '@emotion/react'
import { renderToStaticMarkup as r } from 'react-dom/server'
import { Header } from './_components/header'
import { Content } from './_components/page-content'
import { PageWithHeader } from './_components/page-with-header'

module.exports = class {
  data() {
    return {}
  }

  async render() {
    return `<!DOCTYPE html>
    ${r(
      <PageWithHeader header={<Header />}>
        <Content>
          <main data-component="Home">
            <div css={intro}></div>
            <div css={projects}></div>
          </main>
        </Content>
      </PageWithHeader>
    )}`
  }
}

const intro = css``

const projects = css``
