import { Box, Paper } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import MyTabs from '../../components/MyTabs'
import ComponentsInput from '../../components/product-input/ComponentsInput'
import ProductInput from '../../components/product-input/ProductInput'
import TestingsInput from '../../components/product-input/TestingsInput'
import OthersPartInput from '../../components/sales-input/OthersPartInput'
import PricesInput from '../../components/sales-input/PricesInput'
import SalesPartInput from '../../components/sales-input/SalesPartInput'
import SizePartInput from '../../components/sales-input/SizePartInput'
import UploadButton from '../../components/UploadButton'
import { recoilAlert } from '../../recoil/common'

export default function NewSales({
  oldSalesPart=null, oldProductPart=null, oldSizePart=null,
  oldComponentsPart=null, oldPricesPart=null, oldTestingsPart=null, oldOthersPart=null,
  disableEditProduct=false, disableEditSize=false
}) {
  const { t } = useTranslation('products')
  const setAlert = useSetRecoilState(recoilAlert)
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [salesPart, setSalesPart] = useState(oldSalesPart || null)
  const [salesPartIsValid, setSalesPartIsValid] = useState(false)
  const tabs = [
    { text: t('product'), value: 'product'},
    { text: t('size'), value: 'size'},
    { text: t('components'), value: 'components'},
    { text: t('prices'), value: 'prices'},
    { text: t('testings'), value: 'testings'},
    { text: t('others'), value: 'others'},
  ]
  const [tab, setTab] = useState(tabs[0]?.value)

  const [productPart, setProductPart] = useState(oldProductPart || null)
  const [productPartIsValid, setProductPartIsValid] = useState(false)
  const [sizePart, setSizePart] = useState(oldSizePart || null)
  const [sizePartIsValid, setSizePartIsValid] = useState(false)
  const [componentsPart, setComponentsPart] = useState(oldComponentsPart || [])
  const [componentsPartIsValid, setComponentsPartIsValid] = useState(false)
  const [pricesPart, setPricesPart] = useState(oldPricesPart || [])
  const [pricesPartIsValid, setPricesPartIsValid] = useState(false)
  const [testingsPart, setTestingsPart] = useState(oldTestingsPart || [])
  const [testingsPartIsValid, setTestingsPartIsValid] = useState(false)
  const [othersPart, setOthersPart] = useState(oldOthersPart || {})

  function tryUpload() {
    function showError() {
      setAlert(`error:${t('error:insufficientInfo')}`)
      window.scrollTo({top: 0, behavior: 'smooth'})
    }

    setShowError(true)
    if (loading) {
      return
    }
    if (!salesPartIsValid) {
      showError()
      return
    }
    if (!productPartIsValid) {
      setTab('product')
      showError()
      return
    }
    if (!sizePartIsValid) {
      setTab('size')
      showError()
      return
    }
    if (!componentsPartIsValid) {
      setTab('components')
      showError()
      return
    }
    if (!pricesPartIsValid) {
      setTab('prices')
      showError()
      return
    }
    if (!testingsPartIsValid) {
      setTab('testings')
      showError()
      return
    }
    setLoading(true)
    setTimeout(() => {
      router.push('/sales/1')
      setAlert(t('common:finish'))
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <SalesPartInput 
        value={salesPart} 
        onChange={setSalesPart} 
        onValid={setSalesPartIsValid} 
        showError={showError}
        disableEditProduct={disableEditProduct}
        disableEditSize={disableEditSize}
      />
    
      <MyTabs value={tab} onChange={setTab} items={tabs} sx={{my: 2}}/>
      <Box sx={tab === 'product' ? null : {display: 'none'}}>
        <ProductInput 
          value={productPart} 
          onChange={setProductPart} 
          onValid={setProductPartIsValid} 
          showError={showError} 
          salesMode
          disableEditProduct={disableEditProduct}
          disableEditSize={disableEditSize}
        />
      </Box>
      <Box sx={tab === 'size' ? null : {display: 'none'}}>
        <SizePartInput
          value={sizePart} 
          onChange={setSizePart} 
          onValid={setSizePartIsValid} 
          showError={showError}
          disableEditSize={disableEditSize}
        />
      </Box>
      <Box sx={tab === 'components' ? null : {display: 'none'}}>
        <Paper sx={{p:2}}>
          <ComponentsInput 
            value={componentsPart} 
            onChange={setComponentsPart} 
            onValid={setComponentsPartIsValid} 
            showError={showError}
            disabled={disableEditSize}
          />
        </Paper>
      </Box>
      <Box sx={tab === 'prices' ? null : {display: 'none'}}>
        <Paper sx={{p:2}}>
          <PricesInput 
            value={pricesPart} 
            onChange={setPricesPart} 
            onValid={setPricesPartIsValid} 
            showError={showError}
          />
        </Paper>
      </Box>
      <Box sx={tab === 'testings' ? null : {display: 'none'}}>
        <Paper sx={{p:2}}>
          <TestingsInput 
            value={testingsPart} 
            onChange={setTestingsPart} 
            onValid={setTestingsPartIsValid} 
            showError={showError}
            disabled={disableEditSize}
          />
        </Paper>
      </Box>
      <Box sx={tab === 'others' ? null : {display: 'none'}}>
        <OthersPartInput 
          value={othersPart} 
          onChange={setOthersPart}
        />
      </Box>

      <UploadButton loading={loading} onClick={tryUpload}/>
    </>
  )
}

NewSales.needLogin = true