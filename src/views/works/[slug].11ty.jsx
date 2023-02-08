// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { css, keyframes } from '@emotion/react'
import { renderToStaticMarkup as r } from 'react-dom/server'
import { Content } from '../components/Content'
import { Header } from '../components/Header'
import { PageWithHeader } from '../components/PageWithHeader'

export const data = {
  // pagination: {
  //   data: '',
  //   size: 1,
  //   addAllPagesToCollections: true,
  //   alias: 'post',
  // },
  // permalink: context => `works/${context.post.slug}/index.html`,
}

export const render = props => {
  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />}>
      <Content namespace="WorksDetail">
        <main data-component="WorksDetail" data-namespace="WorksDetail"></main>
      </Content>
    </PageWithHeader>
  )}`
}
