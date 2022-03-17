import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { recoilAlert } from '../../../recoil/common'
import UploadButton from '../../../components/UploadButton'
import ProductInput from '../../../components/product-input/ProductInput'
import SizesInput from '../../../components/product-input/SizesInput'
import InfoForWebsiteInput from '../../../components/product-input/InfoForWebsiteInput'
import { useRouter } from 'next/router'

export default function NewGeneralProduct() {
  const { t } = useTranslation('products')
  const router = useRouter()
  const setAlert = useSetRecoilState(recoilAlert)

  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [product, setProduct] = useState({target: 'General'})
  const [productIsValid, setProductIsValid] = useState(false)
  const [infoForwebsite, setInfoForwebsite] = useState(null)
  const [infoForwebsiteIsValid, setInfoForwebsiteIsValid] = useState(false)
  const [sizes, setSizes] = useState([])
  const [sizesIsValid, setSizesIsValid] = useState(false)

  function tryUpload() {
    setShowError(true)
    if (loading) {
      return
    }
    if (!productIsValid || !sizesIsValid || !infoForwebsiteIsValid) {
      setAlert(`error:${t('error:insufficientInfo')}`)
      window.scrollTo({top: 0, behavior: 'smooth'})
      return
    }
    setLoading(true)
    setTimeout(() => {
      router.push('/products/1')
      setAlert(t('common:finish'))
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <ProductInput value={product} onChange={setProduct} showError={showError} onValid={setProductIsValid}/>

      <InfoForWebsiteInput value={infoForwebsite} onChange={setInfoForwebsite} showError={showError} onValid={setInfoForwebsiteIsValid}/>

      <SizesInput value={sizes} onChange={setSizes} showError={showError} onValid={setSizesIsValid} isGeneral/>

      <UploadButton loading={loading} onClick={tryUpload}/>
    </>
  )
}

NewGeneralProduct.needLogin = true