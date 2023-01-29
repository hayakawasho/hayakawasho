import { renderToStaticMarkup as r } from 'react-dom/server'
import { PageWithHeader } from './components/PageWithHeader'
import { Content } from './components/Content'
import { Header } from './components/Header'
import { Progressbar } from './components/Progressbar'

export const render = () => {
  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />}>
      <Content namespace="Home" data-component="Home">
        <Progressbar />
        <div></div>
      </Content>
    </PageWithHeader>
  )}`
}
