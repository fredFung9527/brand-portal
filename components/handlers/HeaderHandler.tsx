import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { recoilDescription, recoilTitle } from '../../recoil/common'
import useTranslation from 'next-translate/useTranslation'
import { findIndex, indexOf } from 'lodash'

export default function HeaderHandler() {
  const [title, setTitle] = useRecoilState(recoilTitle)
  const description = useRecoilValue(recoilDescription)
  const { t } = useTranslation('common')
  const router = useRouter()
  useEffect(() => {
    const pathname = router.pathname
    const idx = indexOf(pathname, '[')
    if (idx < 0) {
      setTitle(t(`pages.${pathname}`))
    } else {
      setTitle(t(`pages.${pathname.substring(0, idx)}[]`))
    }
  }, [router])
  
  return (
    <Head>
      {Boolean(title) && <title>{title} - Brand Portal</title>}
      {Boolean(description) && <meta name='description' content={description}/>}
    </Head>
  )
}