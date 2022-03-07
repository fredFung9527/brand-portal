import CheckIcon from '@mui/icons-material/Check'
import { Box, Collapse, Grid, IconButton, Paper, Step, StepLabel, Stepper, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { forEachRight, map, takeRight } from 'lodash'
import PriceDisplay from './PriceDisplay'
import SubTitle from '../SubTitle'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
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
  const last3: any = takeRight(prices, 3)
  const [open, setOpen] = useState(false)

  let tableData = []
  forEachRight(prices, it => {
    const lastUpdate = <LastUpdate item={it} mode='simple'/>
    const price = <PriceDisplay item={it}/>
    tableData.push([it.season, price, lastUpdate])
  })

  return (
    <>
      <SubTitle>{t('price')}</SubTitle>
      <Paper>
        <Box sx={{position: 'relative', px: 2, pt: 2, pb: 1}}>
          <Stepper alternativeLabel connector={<MyConnector/>}>
            {map(last3, (it, idx) =>
              <Step key={idx}>
                <StepLabel StepIconComponent={(Number(idx) === last3.length - 1) ? () => <CheckIcon color='info'/> : OldPriceIcon}>
                  <Typography sx={(theme) => ({color: theme.palette.grayText.main})}>{it.season}</Typography>
                  <PriceDisplay item={it}/>
                </StepLabel>
              </Step>
            )}
          </Stepper>
          <Grid 
            container 
            alignItems='center'
            justifyContent='flex-end'
            sx={{
              px: 0.5,
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 9,
              height: '100%'
          }}
          >
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </IconButton>
          </Grid>
        </Box>

        <Collapse in={open}>
          <SimpleTable
            component='div'
            headerColor='info'
            headers={[
              { text: t('season') },
              { text: t('price') },
              { text: t('common:lastUpdate') },
            ]}
            data={tableData}
          />
        </Collapse>
      </Paper>
    </>
  )
}