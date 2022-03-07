import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import SalesInput from '../../components/sales/SalesInput'
import SalesTargetPicker from '../../components/sales/SalesTargetPicker'
import UploadButton from '../../components/UploadButton'
import { recoilAlert } from '../../recoil/common'
import { recoilTargetPCC } from '../../recoil/sales'
export default function NewSales() {
  const { t } = useTranslation('products')
  const setAlert = useSetRecoilState(recoilAlert)

  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const pcc = useRecoilValue(recoilTargetPCC)
  const [sales, setSales] = useState([])
  const [salesIsValid, setSalesIsValid] = useState(false)

  function tryUpload() {
    setShowError(true)
    if (loading) {
      return
    }
    if (!pcc || !salesIsValid) {
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
      <SalesTargetPicker showError={showError}/>

      <SalesInput value={sales} onChange={setSales} onValid={setSalesIsValid} showError={showError}/>

      <UploadButton loading={loading} onClick={tryUpload}/>
    </>
  )
}

NewSales.needLogin = true