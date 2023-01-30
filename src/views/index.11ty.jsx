import { renderToStaticMarkup as r } from 'react-dom/server'
import { Content } from './components/Content'
import { Header } from './components/Header'
import { PageWithHeader } from './components/PageWithHeader'
import { Progressbar } from './components/Progressbar'

export const render = () => {
  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />}>
      <Content namespace="Home">
        <main data-component="Home">
          <Progressbar />
          <div></div>
        </main>
      </Content>
    </PageWithHeader>
  )}`
}
