import { renderToStaticMarkup as r } from 'react-dom/server'
import { PageWithHeader } from './components/page/PageWithHeader'
import { PageWithPjax } from './components/page/PageWithPjax'

export const render = () => {
  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader title="WORKS">
      <PageWithPjax>
        <main></main>
      </PageWithPjax>
    </PageWithHeader>
  )}`
}
