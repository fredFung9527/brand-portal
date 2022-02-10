import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import Head from 'next/head'
import AlertHandler from '../components/handlers/AlertHandler'
import ScrollToTopButton from '../components/ScrollToTopButton'
import DialogProvider from '../components/providers/DialogProvider'
import LoadingHandler from '../components/handlers/LoadingHandler'
import HeaderHandler from '../components/handlers/HeaderHandler'
import DefaultLayout from '../components/layout/default'
import RecoilNexusProvider from '../components/providers/RecoilNexusProvider'
import UserHandler from '../components/handlers/UserHandler'
import { MyAppProps } from '../@types'
import MyThemeProvider from '../components/providers/MyThemeProvider'

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Component.Layout || DefaultLayout

  return (
    <RecoilRoot>
      <RecoilNexusProvider/>
      
      <MyThemeProvider>
        <Head>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width'/>
        </Head>

        <AlertHandler/>
        <LoadingHandler/>
        <HeaderHandler/>
        <UserHandler needLogin={Component.needLogin}/>

        <DialogProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DialogProvider>

        <ScrollToTopButton/>
      </MyThemeProvider>
    </RecoilRoot>
  )
}