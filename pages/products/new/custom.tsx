import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { recoilAlert } from '../../../recoil/common'
import UploadButton from '../../../components/UploadButton'
import ProductSizesInput from '../../../components/products/ProductSizesInput'
import ProductBasicInput from '../../../components/products/ProductBasicInput'

export default function NewProduct() {
  const { t } = useTranslation('products')
  const setAlert = useSetRecoilState(recoilAlert)

  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [product, setProduct] = useState({
    name: '',
    status: 'Completed',
    description: '',
    remarks: '',
    target: 'Custom',
    limitedMarketCodes: [],
    photo: null,
    threeDPhoto: null,
    industries: [],
  })
  const [productSizes, setProductSizes] = useState([])
  const [basicIsValid, setBasicIsValid] = useState(false)
  const [sizesIsValid, setSizesIsValid] = useState(false)

  function tryUpload() {
    setShowError(true)
    if (loading) {
      return
    }
    if (!basicIsValid || !sizesIsValid) {
      setAlert(`error:${t('error:insufficientInfo')}`)
      window.scrollTo({top: 0, behavior: 'smooth'})
      return
    }
    setLoading(true)
    setTimeout(() => {
      setAlert(t('common:finish'))
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <ProductBasicInput value={product} onChange={setProduct} showError={showError} onValid={setBasicIsValid}/>

      <ProductSizesInput value={productSizes} onChange={setProductSizes} showError={showError} onValid={setSizesIsValid}/>

      <UploadButton loading={loading} onClick={tryUpload}/>
    </>
  )
}

NewProduct.needLogin = true