import { Box, Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import { join } from 'lodash'
import MyImage from '../MyImage'
import MyLink from '../MyLink'
import ProductPrice from './ProductPrice'
import ProductStatus from './ProductStatus'

export default function ProductCard({product}) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  if (!product) {
    return null
  }

  return (
    <MyLink to={`/products/${product.id}`}>
      <Paper sx={{cursor: 'pointer'}}>
        <Grid container alignItems='center' sx={{px: 1, pt: 1}}>
          <Grid item>
            <ProductStatus status={product.status} noText/>
          </Grid>
          <Grid item xs/>
          <Grid item>
            <Typography fontWeight='bold' color='primary'>{ join(product.seasons, ', ') }</Typography>
          </Grid>
        </Grid>
        <Box sx={{px: 2, pb: 1}}>
          <Grid container justifyContent='center'>
            <MyImage src={product.photo} width={150} height={150}/>
          </Grid>
          <Typography variant='h6' sx={{height: isXs ? 96 : 64, overflow: 'hidden'}}>
            { product.name }
          </Typography>
          <ProductPrice product={product}/>
        </Box>
      </Paper>
    </MyLink>
  )
}