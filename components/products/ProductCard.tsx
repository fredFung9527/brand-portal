import { Box, Grid, Paper, Typography } from '@mui/material'
import MyImage from '../MyImage'
import MyLink from '../MyLink'
import ProductStatus from './ProductStatus'
import ProductTargetChip from './ProductTargetChip'

export default function ProductCard({product}) {
  if (!product) {
    return null
  }

  return (
    <MyLink to={`/products/${product.id}`}>
      <Paper sx={{p: 2, position: 'relative', cursor: 'pointer'}}>
        <Box 
          sx={(theme) => 
            ({
              position: 'absolute',
              left: theme.spacing(1),
              top: theme.spacing(1),
              zIndex: 9
            })
          }>
          <ProductStatus status={product.status} noText/>
        </Box>
        <Box 
          sx={(theme) => 
            ({
              position: 'absolute',
              right: 0,
              top: theme.spacing(1),
              zIndex: 9
            })
          }
        >
          <ProductTargetChip target={product.target} noText/>
        </Box>
        
        <Grid container justifyContent='center'>
          <MyImage src={product.photo} width={150} height={150}/>
        </Grid>
        
        <Typography fontWeight='bold' sx={{mt: 1 }} noWrap>
          { product.name }
        </Typography>
      </Paper>
    </MyLink>
  )
}