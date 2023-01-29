import { renderToStaticMarkup as r } from 'react-dom/server'
import { PageWithHeader } from './components/PageWithHeader'
import { Body } from './components/Body'
import { Header } from './components/Header'
import { Progressbar } from './components/Progressbar'

export const render = () => {
  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />}>
      <Body namespace="Top" data-component="Top">
        <Progressbar />
        <div></div>
      </Body>
    </PageWithHeader>
  )}`
}
