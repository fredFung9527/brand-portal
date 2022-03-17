import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { recoilAlert } from '../../../recoil/common'
import UploadButton from '../../../components/UploadButton'
import ProductInput from '../../../components/product-input/ProductInput'
import SizesInput from '../../../components/product-input/SizesInput'
import { useRouter } from 'next/router'

export default function NewCustomProduct() {
  const { t } = useTranslation('products')
  const router = useRouter()
  const setAlert = useSetRecoilState(recoilAlert)

  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [product, setProduct] = useState(null)
  const [productIsValid, setProductIsValid] = useState(false)
  const [sizes, setSizes] = useState([])
  const [sizesIsValid, setSizesIsValid] = useState(false)

  function tryUpload() {
    setShowError(true)
    if (loading) {
      return
    }
    if (!productIsValid || !sizesIsValid) {
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

      <SizesInput value={sizes} onChange={setSizes} showError={showError} onValid={setSizesIsValid}/>

      <UploadButton loading={loading} onClick={tryUpload}/>
    </>
  )
}

NewCustomProduct.needLogin = true