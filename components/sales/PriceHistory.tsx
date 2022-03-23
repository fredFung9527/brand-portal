import CheckIcon from '@mui/icons-material/Check'
import { Box, Divider, Grid, Paper, Step, StepLabel, Stepper, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { forEach, forEachRight, map, takeRight, groupBy, keys, sortBy, filter } from 'lodash'
import PriceDisplay from './PriceDisplay'
import useTranslation from 'next-translate/useTranslation'
import SimpleTable from '../SimpleTable'
import LastUpdate from '../products/LastUpdate'
import { useEffect, useState } from 'react'
import SubTitle from '../SubTitle'
import MyAutocomplete from '../select/MyAutocomplete'
import SeasonInput from '../product-input/SeasonInput'
import MySelect from '../select/MySelect'
import { demoCurrencies } from '../../demo/sales'
import { hasKeyword } from '../../utils/common'
import NoResultHint from '../NoResultHint'

const MyConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 3,
    borderRadius: 1,
    borderColor: theme.palette.info.main,
  },
}))

function OldPriceIcon() {
  const theme = useTheme()

  return (
    <div style={{
      display: 'flex',
      height: 22,
      alignItems: 'center',
    }}>
      <div style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: theme.palette.info.main,
      }}/>
    </div>
  )
}

function OneColor({prices}) {
  const { t } = useTranslation('products')

  const headerColors = ['primary', 'info', 'success', 'error']

  const groupByCurrency = groupBy(prices, it => it.currency)
  let data = []
  forEach(groupByCurrency, (list, currency) => {
    let tableData = []
    forEachRight(list, it => {
      const lastUpdate = <LastUpdate item={it} mode='simple'/>
      const price = <PriceDisplay item={it}/>
      tableData.push([it.season, price, lastUpdate])
    })

    data.push({
      currency,
      last3: takeRight(list, 3),
      tableData
    })
  })
  data = sortBy(data, it => it.currency)

  if (!data.length) {
    return <NoResultHint/>
  }

  return (
    <>
      {map(data, (item, jdx) =>
        <div key={item.currency}>
          <SubTitle>{item.currency}</SubTitle>
          <Paper>
            <Box sx={{position: 'relative', px: 2, pt: 2, pb: 1}}>
              <Stepper alternativeLabel connector={<MyConnector/>}>
                {map(item.last3, (it, idx) =>
                  <Step key={idx}>
                    <StepLabel StepIconComponent={(Number(idx) === item.last3.length - 1) ? () => <CheckIcon color='info'/> : OldPriceIcon}>
                      <Typography sx={(theme) => ({color: theme.palette.grayText.main})}>{it.season}</Typography>
                      <PriceDisplay item={it}/>
                    </StepLabel>
                  </Step>
                )}
              </Stepper>
            </Box>

            <SimpleTable
              component='div'
              headerColor={headerColors[jdx % headerColors.length]}
              headers={[
                { text: t('season') },
                { text: t('price') },
                { text: t('common:lastUpdate') },
              ]}
              data={item.tableData}
            />
          </Paper>
        </div>
      )}
    </>
  )
}

export default function PriceHistory({prices}) {
  const { t } = useTranslation('products')

  const groupByColor = groupBy(prices, it => it.color || 'Default')
  const colors = sortBy(keys(groupByColor), v => `${v === 'Default' ? 'a' : 'b'}${v}`)
  const [color, setColor] = useState(colors[0])
  const [season, setSeason] = useState('')
  const [currency, setCurrency] = useState('')
  const [selectedPrices, setSelectedPrices] = useState([])

  useEffect(() => {
    const afterColor = groupByColor[color] || []
    setSelectedPrices(filter(afterColor, it => {
      if (season && !hasKeyword(it.season, season)) {
        return false
      }
      if (currency && it.currency !== currency) {
        return false
      }
      return true
    }))
  }, [color, season, currency])

  return (
    <>
      <Divider sx={{mb: 2}}/>

      <Grid container columnSpacing={2} alignItems='flex-end'>
        <Grid item xs={6} sm={4} md={3}>
          <MyAutocomplete
            label={t('color')}
            value={color} 
            onChange={setColor} 
            items={colors}
            hideHelperText
            notClearable
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <SeasonInput
            label={t('seasonOrYear')}
            value={season}
            onChange={setSeason}
            orYear
            hideHelperText
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <MySelect
            label={t('currency')}
            value={currency}
            onChange={setCurrency}
            items={demoCurrencies}
            hideHelperText
            notMust
          />
        </Grid>
      </Grid>

      <OneColor prices={selectedPrices}/>
    </>
  )
}