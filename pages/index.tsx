import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRef } from 'react'
import { useMount } from '../client/foundation'
import IndexPage from '../client/components/Home'
import { mount, register } from 'lake'

const Home: NextPage = () => {
  const refContainer = useRef<HTMLDivElement | null>(null)

  useMount(() => {
    register('Index', IndexPage)
    mount(refContainer.current!, {}, 'Index')
  })

  return (
    <div id="App" ref={refContainer}>
      <Meta />
      <div id="Gl" className="fixed inset-0"></div>
      <main className="">
        <h1 className="sr-only">SHO HAYAKAWA portfolio site</h1>
        <section id="Works" className="">
          <h2 className="sr-only">Works</h2>
          <ul id="WorksArchives" className=""></ul>
        </section>
        <section id="About" className="">
          <h2></h2>
          <p></p>
        </section>
      </main>
    </div>
  )
}

export default Home

const metaTitle = 'SHO HAYAKAWA | DEVELOPER'
const metaDesc = 'Developer. SHO HAYAKAWA 早川翔 portfolio site.'

const Meta = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="Content-Type" content="text/html" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      {
        // <meta property="og:image" content="" />
      }
      <meta property="og:site_name" content={metaTitle} />
      {
        // <meta name="twitter:title" content={metaTitle} />
        // <meta name="twitter:description" content={metaDesc} />
        // <meta name="twitter:card" content="summary_large_image" />
      }
    </Head>
  )
}
