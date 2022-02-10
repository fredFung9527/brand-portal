import { Grid, Typography } from '@mui/material'
import { groupBy, keys, last, map, reverse, sortBy } from 'lodash'
import moment from 'moment'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useEffect, useState } from 'react'
import { TooltipProps } from 'recharts'
import MyLineChart from '../../components/charts/MyLineChart'
import MyDatePicker from '../../components/datetime/MyDatePicker'
import ProductPicker from '../../components/forecast/ProductPicker'
import NoResultHint from '../../components/NoResultHint'
import ProductMarketCodeInput from '../../components/products/ProductMarketCodeInput'
import { demoForeCasts } from '../../demo/forecast'
import { numberWithCommas } from '../../utils/common'

function TooltipContent({ active, payload, label }: TooltipProps<any, any>) {
  if (active && payload?.length) {
    const data = payload[0]
    const history = data?.payload?.history
    return (
      <>
        {label}:<br/>
        {map(history, (it, idx) =>
          <div key={idx} style={{color: idx ? '' : data?.color}}>
            {`${it.currency} ${numberWithCommas(it.value)} (${it.creatBy}, ${moment(it.creatAt).format('YYYY/MM/DD')})`}
          </div>
        )}
      </>
    )
  }
  return null
}

function ForecaseLineChart({data}) {
  const groupedData = groupBy(data, it => `${it.year}/${it.month}`)
  const sortedKeys = sortBy(keys(groupedData), it => it)
  let chartData = []
  if (sortedKeys?.length) {
    let start = sortedKeys[0]
    const end = last(sortedKeys)
    while (start <= end) {
      const history = reverse(sortBy(groupedData[start], it => it.creatAt))
      chartData.push({
        month: start,
        history,
        value: history[0] && history[0].value || 0
      })
      const next = moment(start, 'YYYY/MM').add(1, 'month').format('YYYY/MM')
      start = next
    }
  }

  return (
    <MyLineChart data={chartData} height={300} xKey='month' yKey='value' tooltipContent={<TooltipContent/>}/>
  )
}

export default function Forecast() {
  const { t } = useTranslation('forecast')
  const [product, setProduct] = useState(null)
  const [marketCode, setMarketCode] = useState(null)
  const [startMonth, setStartMonth] = useState(null)
  const [endMonth, setEndMonth] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    if (!product && !marketCode) {
      setData([])
      return
    }
    setData(demoForeCasts)
  }, [product, marketCode])

  const handleProductInput = useCallback((v) => {
    setProduct(v)
    setMarketCode(null)
  }, [])
  const handleMarketCodeInput = useCallback((v) => {
    setProduct(null)
    setMarketCode(v)
  }, [])

  return (
    <>
      <Grid container alignItems='flex-end' columnSpacing={2} sx={{mb: 2}}>
        <Grid item xs={12} sm={6}>
          <ProductMarketCodeInput single label={t('marketCode')} value={marketCode} onChange={handleMarketCodeInput}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProductPicker label={t('product')} value={product} onChange={handleProductInput}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyDatePicker
            type='month'
            label={t('startMonth')} 
            value={startMonth} 
            onChange={setStartMonth}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyDatePicker
            type='month'
            label={t('endMonth')} 
            value={endMonth} 
            onChange={setEndMonth}
          />
        </Grid>
      </Grid>
      {Boolean(data?.length) ?
        <>
          <ForecaseLineChart data={data}/>
        </> :
        (Boolean(product) || Boolean(marketCode) ? 
          <NoResultHint/> :
          <Typography 
            sx={(theme) => ({color: theme.palette.grayText.main})}
            align='center'
          >
            {t('hint')}
          </Typography>
        )
      }
    </>
  )
}

Forecast.needLogin = true