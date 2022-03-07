import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import { last } from 'lodash'
import MyImage from '../MyImage'
import MyLink from '../MyLink'
import ProductStatus from '../products/ProductStatus'
import NeedleDetectionIcon from './NeedleDetectionIcon'
import PriceDisplay from './PriceDisplay'

export default function SalesCard({item}) {
  const productBasic = item?.productBasic || {}
  const productSize = item?.productSize || {}
  const pcc = item?.pcc || {}

  if (!item) {
    return null
  }
  return (
    <MyLink to={`/sales/${item.id}`}>
      <Paper sx={{px: 2, pt: 2, pb: 1, position: 'relative', cursor: 'pointer'}}>
        <Box 
          sx={(theme) => 
            ({
              position: 'absolute',
              left: theme.spacing(1),
              top: theme.spacing(1),
              zIndex: 9
            })
          }>
            <ProductStatus status={productBasic.status} noText/>
        </Box>
        <Box 
          sx={(theme) => 
            ({
              position: 'absolute',
              right: theme.spacing(1),
              top: theme.spacing(1),
              zIndex: 9
            })
          }
        >
          <NeedleDetectionIcon pcc={pcc}/>
        </Box>

        <Grid container justifyContent='center'>
          <MyImage src={productBasic.photo} width={150} height={150}/>
        </Grid>

        <Grid container sx={{mt: 1}}>
          <Grid item xs>
            <Typography color='primary'>
              {item.brandRefCode}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color='primary'>
              {item.marketCode}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{my: 0.5}}/>
        <Typography fontWeight='bold' noWrap>
          { item.newProductName || productBasic.name }
        </Typography>

        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography 
              sx={(theme) => ({
                color: theme.palette.grayText.main
              })}
            >
              {item.newSizeName || productSize.sizeName}<br/>{pcc.name}
            </Typography>
          </Grid>
          <Grid item>
            <PriceDisplay item={last(pcc.prices)}/>
          </Grid>
        </Grid>

        <Typography align='right' noWrap>
          {pcc.components && pcc.components[0]?.axCode}{pcc.components?.length > 1 ? `, +${pcc.components.length - 1}` : ''}
        </Typography>
      </Paper>
    </MyLink>
  )
}