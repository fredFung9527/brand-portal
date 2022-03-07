import { Tooltip, Typography } from '@mui/material'
import { numberWithCommas } from '../../utils/common'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'

export default function PriceDisplay({item}) {
  function getCurrencySymbol(v) {
    const mapping = {
      'USD': '$',
      'CNY': '¥',
      'HKD': 'HK$'
    }
    return mapping[v] || v
  }
  
  if (!item) {
    return null
  }
  if (!item.isActive) {
    return (
      <Tooltip title='Not For Sale'>
        <DoNotDisturbIcon color='secondary' sx={{fontSize: 16}}/>
      </Tooltip>
    )
  }
  return (
    <Typography color='primary' fontWeight='bold'>
      {`${getCurrencySymbol(item.currency)} ${numberWithCommas(item.value)} / ${item.unit}`}
    </Typography>
  )
}