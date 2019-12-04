import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'

const defaultDescription = 'See your product, website or graphics with the eyes of Color Blind people. We hope to help you identify areas with accessability issues.'
const defaultOGURL = 'https://colorblindtest.now.sh'
const defaultOGImage =
  'https://colorblindtest.now.sh/static/seo/og-img-default.png'
const defaultOGType = 'website'

const Head = (props: any) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || 'Color Blind Test – Test your website / prodcut / image against color blindness filters'}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <link rel="icon" href="/static/favicon.ico" />

    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/static/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/static/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/static/favicon-16x16.png"
    />
    <link rel="manifest" href="/static/site.webmanifest" />
    <link
      rel="mask-icon"
      href="/static/safari-pinned-tab.svg"
      color="#00004c"
    />
    <meta name="msapplication-TileColor" content="#00004c" />
    <meta name="theme-color" content="#ffffff" />

    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ''} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:type" content={props.ogType || defaultOGType} />
  </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
  ogType: string,
}

export default Head
