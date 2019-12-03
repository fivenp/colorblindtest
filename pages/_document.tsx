// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { renderStatic } from 'glamor/server'

const GTMScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.COLORBLIND_GA_ID ||
        'adasdasdasdasdasd'}');`,
    }}
  ></script>
)

const GTMNoScript = () => (
  <noscript>
    <iframe
      title="gtm"
      src="https://www.googletagmanager.com/ns.html?id=GTM-XXX"
      height="0"
      width="0"
      style={{ display: 'none', visibility: 'hidden' }}
    ></iframe>
  </noscript>
)

class MyDocument extends Document {
  public static async getInitialProps({ renderPage }: any) {
    const page = renderPage()
    const styles = renderStatic(() => page.html || page.errorHtml)
    return { ...page, ...styles }
  }

  // public static async getInitialProps({ ctx }: any) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return { ...initialProps }
  // }

  render() {
    const props = (this as any).props
    return (
      <Html lang="en">
        <Head title="Color Blind Test">
          <GTMScript />
          <style dangerouslySetInnerHTML={{ __html: props.css }} />
        </Head>
        <body>
          <GTMNoScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
