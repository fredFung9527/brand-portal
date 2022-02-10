import CheckIcon from '@mui/icons-material/Check'
import { Step, StepLabel, Stepper, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { map } from 'lodash'
import { numberWithCommas } from '../../utils/common'

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

export default function ProductPriceHistory({history}) {
  if (!history?.length) {
    return null
  }
  return (
    <Stepper alternativeLabel connector={<MyConnector/>}>
      {map(history, (it, idx) =>
        <Step key={idx}>
          <StepLabel StepIconComponent={(Number(idx) === history.length - 1) ? () => <CheckIcon color='info'/> : OldPriceIcon}>
            <Typography sx={(theme) => ({color: theme.palette.grayText.main})}>{it.before}</Typography>
            <Typography fontWeight='bold' color='primary'>{numberWithCommas(it.price)}</Typography>
          </StepLabel>
        </Step>
      )}
    </Stepper>
  )
}