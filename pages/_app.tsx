import {
  Box,
  ColorModeProvider,
  CSSReset,
  ThemeProvider,
} from '@chakra-ui/core'
import React from 'react'
import { useRouter } from 'next/router'
import { MixpanelProvider } from 'react-mixpanel'
import mixpanel from 'mixpanel-browser'

mixpanel.init(process.env.COLORBLIND_MIXPANEL_TOKEN)

if (typeof window !== `undefined`) {
  // hotjar.initialize('1518096', '6')
  window.location.hostname === 'localhost' &&
    mixpanel.register({ $ignore: 'true' })
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// static async getInitialProps(appContext) {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default ({ Component, pageProps }: any) => {
  const router = useRouter()

  const DefaultLayout = ({ children }: any) => <Box>{children}</Box>

  return (
    <MixpanelProvider mixpanel={mixpanel}>
      <ThemeProvider>
        <ColorModeProvider value="light">
          <CSSReset />
          {/* <Drift appId="hadn2a59dbr5" /> */}
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </ColorModeProvider>
      </ThemeProvider>
    </MixpanelProvider>
  )
}
