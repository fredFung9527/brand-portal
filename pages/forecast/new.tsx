import { Grid, Paper } from '@mui/material'
import { cloneDeep, map, some } from 'lodash'
import moment from 'moment'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useEffect, useState } from 'react'
import ProductPicker from '../../components/forecast/ProductPicker'
import MyTextField from '../../components/form/MyTextField'
import ProductMarketCodeInput from '../../components/products/ProductMarketCodeInput'
import MySelect from '../../components/select/MySelect'
import { demoCurrencies } from '../../demo/product'
import { useSetRecoilState } from 'recoil'
import { recoilAlert } from '../../recoil/common'
import UploadButton from '../../components/forecast/UploadButton'
import MyButton from '../../components/MyButton'

export default function NewForecast() {
  const { t } = useTranslation('forecast')
  const setAlert = useSetRecoilState(recoilAlert)

  const [showError, setShowError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState(null)
  const [marketCode, setMarketCode] = useState(null)
  const [count, setCount] = useState(12)
  const [currency, setCurrency] = useState('USD')
  const [monthList, setMonthList] = useState([])
  const [forecastInput, setForecastInput] = useState({})

  const handleProductInput = useCallback((v) => {
    setProduct(v)
    setMarketCode(null)
  }, [])
  const handleMarketCodeInput = useCallback((v) => {
    setProduct(null)
    setMarketCode(v)
  }, [])
  const handleForecastInput = useCallback((v, key) => {
    setForecastInput({...forecastInput, [key]: v})
  }, [forecastInput])

  useEffect(() => {
    let current = moment(new Date(), 'YYYY/MM')
    let list = []
    let newForecastInput = cloneDeep(forecastInput)
    for (let idx = 0; idx < count; idx ++) {
      const month = `${current.year()}/${String(current.month() + 1).padStart(2, '0')}`
      list.push(month)
      if (newForecastInput[month] === undefined) {
        newForecastInput[month] = ''
      }
      current = current.add(1, 'month')
    }
    setMonthList(list)
    setForecastInput(newForecastInput)
  }, [count])

  function tryUpload() {
    setShowError(true)
    if (loading || Boolean(targetHelperText)) {
      return
    }
    if (!some(forecastInput, (value, key) => value)) {
      setAlert(`error:${t('noForecast')}`)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setAlert(t('common:finish'))
      setLoading(false)
    }, 1000)
  }

  const targetHelperText = !product && !marketCode ? t('hint') : ''

  return (
    <>
      <Grid container alignItems='flex-end' columnSpacing={2} sx={{mb: 1}}>
        <Grid item xs={12} sm={6}>
          <ProductMarketCodeInput 
            single 
            label={t('marketCode')} 
            value={marketCode} 
            onChange={handleMarketCodeInput}
            error={showError && Boolean(targetHelperText)}
            helperText={showError && targetHelperText}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProductPicker 
            label={t('product')} 
            value={product} 
            onChange={handleProductInput}
            error={showError && Boolean(targetHelperText)}
            helperText={showError && targetHelperText}
          />
        </Grid>
      </Grid>

      <Paper sx={{px: 2, pt: 2, pb: 1}}>
        <MySelect label={t('currency')} value={currency} onChange={setCurrency} items={demoCurrencies}/>
        <Grid container columnSpacing={2}>
          {map(monthList, month =>
            <Grid item key={month} xs={12} sm={6} md={4}>
              <MyTextField 
                variant='filled' 
                label={month}
                value={forecastInput[month]}
                onChange={(v) => handleForecastInput(v, month)}
                type='number'
              />
            </Grid>
          )}
        </Grid>
        <Grid container justifyContent='flex-end'>
          <MyButton variant='text' onClick={() => setCount(count + 1)}>{t('addMonth')}</MyButton>
        </Grid>
      </Paper>

      <UploadButton loading={loading} onClick={tryUpload}/>
    </>
  )
}

NewForecast.needLogin = true