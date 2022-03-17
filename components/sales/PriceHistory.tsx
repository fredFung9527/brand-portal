import CheckIcon from '@mui/icons-material/Check'
import { Box, Paper, Step, StepLabel, Stepper, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { forEach, forEachRight, map, takeRight, groupBy } from 'lodash'
import PriceDisplay from './PriceDisplay'
import useTranslation from 'next-translate/useTranslation'
import SimpleTable from '../SimpleTable'
import LastUpdate from '../products/LastUpdate'

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

export default function PriceHistory({prices}) {
  const { t } = useTranslation('products')

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

  return (
    <>
      {map(data, (item, jdx) =>
        <Paper key={item.currency} sx={{mt: jdx ? 2: 0}}>
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
            headerColor='info'
            headers={[
              { text: t('season') },
              { text: t('price') },
              { text: t('common:lastUpdate') },
            ]}
            data={item.tableData}
          />
        </Paper>
      )}
    </>
  )
}