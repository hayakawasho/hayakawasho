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
        <main data-component="About"></main>
      </Content>
    </PageWithHeader>
  )}`
}
