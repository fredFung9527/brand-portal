import { Typography } from '@mui/material'
import { getCurrencySymbol, numberWithCommas } from '../../utils/common'

export default function ProductPrice({product, mode='default'}) {
  if (!product) {
    return null
  }
  return (
    <Typography 
      variant={mode === 'default' ? 'h6' : null} 
      fontWeight={mode === 'default' ? null : 'bold'} 
      color='primary'
    >
      {getCurrencySymbol(product.currency)} { numberWithCommas(product.price) } / { product.unit }
    </Typography>
  )
}