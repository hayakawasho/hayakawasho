import { css } from '@emotion/react'
import { renderToStaticMarkup as r } from 'react-dom/server'
import { Content } from './components/Content'
import { Header } from './components/Header'
import { PageWithHeader } from './components/PageWithHeader'
import { zeroPadding } from './components/utils'

const imgs = [
  'https://images.prismic.io/hayakawasho/d0e0d3fa-3d5d-4ab6-8a3b-32ba2d4cbe7f_keymusic.jpeg?auto=compress,format',
  // 'https://images.prismic.io/hayakawasho/a91f9b3f-6bb8-4e47-87f2-0a2e05b81507_mmk.jpg?auto=compress,format',
  // 'https://images.prismic.io/hayakawasho/a1725826-796c-4afc-a261-d79b3317a5b8_edotomoe.jpeg?auto=compress,format',
  'https://images.prismic.io/hayakawasho/bad8a496-4a59-4c0a-a4bd-3cf1f0b5a79c_pnrm_sandal.jpg?auto=compress,format',
  // 'https://images.prismic.io/hayakawasho/9177d352-5d72-4701-9569-f31814e66773_acme.jpeg?auto=compress,format',
  'https://images.prismic.io/hayakawasho/1ee2902e-4008-4b60-a48d-4bde441d0be8_another_eden.jpg?auto=compress,format',
  'https://images.prismic.io/hayakawasho/15b25b8e-1286-4ab7-94c2-9888289d3a0c_sakayori.jpg?auto=compress,format',
  // 'https://images.prismic.io/hayakawasho/688df931-9669-403e-8394-8eb313cac197_pnrm.jpg?auto=compress,format',
  // 'https://images.prismic.io/hayakawasho/66c5d7c8-931b-44a0-bb55-203f0e2fdf4d_stanclan.jpg?auto=compress,format',
  // 'https://images.prismic.io/hayakawasho/6be07dd8-49db-4fa5-8186-5e45104f4888_bigi.jpg?auto=compress,format',
  'https://images.prismic.io/hayakawasho/ea6acc92-e926-4a69-98a0-4e1ab6437ae5_6%C3%971.jpg?auto=compress,format&facepad=3',
  'https://images.prismic.io/hayakawasho/7faf77c0-744d-43f7-af21-fc95b5067d2b_pksha.jpeg?auto=compress,format',
]

const projects = [
  {
    title: '',
    eyecatch: '',
    href: '',
  },
]

export const render = () => {
  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />}>
      <Content namespace="Works">
        <main data-component="Works">
          <div css={casesWrap}>
            <div css={cases} className="pr-[12.5vw] sm:pl-[18.75vw] sm:pr-[25vw]">
              {imgs.map((src, i) => {
                return (
                  <figure className="relative ml-[12.5vw] sm:ml-[6.25vw]" key={i}>
                    <div css={aspect} className="w-[75vw] sm:w-[50vw]"></div>
                    <img
                      src={src + '&w=1600'}
                      alt=""
                      className="fit2parent invisible"
                      data-ref="plane"
                      data-index={i}
                    />
                  </figure>
                )
              })}
            </div>
          </div>
          <aside css={progress}>
            <div css={progress__now}>
              <div className="in">
                {imgs.map((_src, i) => (
                  <div className="w-[1.5em] h-[1em]" key={i}>
                    {zeroPadding(i + 1)}
                  </div>
                ))}
                <div className="w-[1.5em] h-[1em]">{zeroPadding(1)}</div>
              </div>
            </div>
            <div css={progress__txt}> / </div>
            <div css={progress__txt}>{zeroPadding(imgs.length)}</div>
          </aside>
        </main>
      </Content>
    </PageWithHeader>
  )}`
}

const aspect = css`
  padding-top: 56.25%;
`

const progress = css`
  position: fixed;
  bottom: 4rem;
  right: 3rem;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  letter-spacing: -0.02em;
`

const progress__now = css`
  width: 1.5em;
  height: 1em;
  line-height: 1;
  font-weight: 300;
  overflow: hidden;
  text-align: center;
`

const progress__txt = css`
  font-size: 1.3rem;
  width: 1.5em;
  height: 1em;
  line-height: 1;
  text-align: center;
  font-weight: 300;
`

const casesWrap = css`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  align-items: center;
  overflow: scroll;
`

const cases = css`
  display: flex;
`
