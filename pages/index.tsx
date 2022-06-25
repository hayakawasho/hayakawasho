import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRef } from 'react'
import { useMount } from '../app/foundation'
import IndexPage from '../app/components/Home'
import { mount, register } from 'lake'

const metaTitle = 'SHO HAYAKAWA'
const metaDesc = 'Developer SHO HAYAKAWA 早川翔 portfolio site'

const Home: NextPage = () => {
  const refContainer = useRef<HTMLDivElement | null>(null)

  useMount(() => {
    register('Index', IndexPage)
    mount(refContainer.current!, {}, 'Index')
  })

  return (
    <div id="App" ref={refContainer}>
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
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div id="Gl" className="fixed inset-0"></div>

      <main className="">
        <section id="Projects" className="">
          <ul id="Grid" className="">
            <li className="">
              <div className="">
                <div className="">
                  <div className=""></div>
                  <a
                    className=""
                    href=""
                    target="_blank"
                    rel="noopener"
                    draggable="false"
                  ></a>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <section id="About" className=""></section>
      </main>
    </div>
  )
}

export default Home
