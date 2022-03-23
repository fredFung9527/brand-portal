import { Grid, Paper } from '@mui/material'
import { filter } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import MyTextField from '../../components/form/MyTextField'
import MarketCodeInput from '../../components/product-input/MarketCodeInput'
import ComponentPicker from '../../components/sales-input/ComponentPicker'
import PricesInput from '../../components/sales-input/PricesInput'
import SizePicker from '../../components/sales-input/SizePicker'
import UploadButton from '../../components/UploadButton'
import { demoPrices } from '../../demo/sales'
import { recoilAlert } from '../../recoil/common'

export default function EditPrices() {
  const { t } = useTranslation('products')
  const setAlert = useSetRecoilState(recoilAlert)

  const [size, setSize] = useState(null)
  const [component, setComponent] = useState(null)
  const [marketCode, setMarketCode] = useState(null)
  const [brandRefCode, setBrandRefCode] = useState('')
  const [prices, setPrices] = useState([])
  const [showPriceInput, setShowPriceInput] = useState(false)
  const [pricesIsValid, setPricesIsValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    setComponent(null)
  }, [size])
  useEffect(() => {
    if (!size || !marketCode || !brandRefCode) {
      setShowPriceInput(false)
      return
    }
    if (prices?.length) {
      setShowPriceInput(false)
    }
    setTimeout(() => {
      setPrices(filter(demoPrices, it => it.marketCode === marketCode && 
        it.brandRefCode === brandRefCode && it.productSizeId === size.id
      ) || [])
      setShowPriceInput(true)
    }, 200)
  }, [size, component, marketCode, brandRefCode])

  function tryUpload() {
    setShowError(true)
    if (loading) {
      return
    }
    if (!size || !marketCode || !brandRefCode || !prices.length || !pricesIsValid) {
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
      <Paper sx={{p: 2}}>
        <Grid container columnSpacing={2} alignItems='flex-end'>
          <Grid item xs={12} sm={6}>
            <SizePicker 
              label={t('size')} 
              value={size} 
              onChange={setSize}
              error={showError && !Boolean(size)}
              helperText={showError && !Boolean(size) && t('error:required')}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ComponentPicker label={t('component')} value={component} onChange={setComponent} sizeId={size?.id}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MarketCodeInput
              label={t('marketCode')}
              value={marketCode}
              onChange={setMarketCode}
              error={showError && !Boolean(marketCode)}
              helperText={showError && !Boolean(marketCode) && t('error:required')}
              required
              single
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextField
              label={t('brandRefCode')}
              value={brandRefCode}
              onChange={setBrandRefCode}
              error={showError && !Boolean(brandRefCode)}
              helperText={showError && !Boolean(brandRefCode) && t('error:required')}
              required
            />
          </Grid>
        </Grid>

        {showPriceInput &&
          <PricesInput 
            value={prices} 
            onChange={setPrices} 
            onValid={setPricesIsValid} 
            showError={showError}
            marketCode={marketCode}
            notMust
          />
        }
      </Paper>

      <UploadButton loading={loading} onClick={tryUpload}/>
    </>
  )
}

EditPrices.needLogin = true