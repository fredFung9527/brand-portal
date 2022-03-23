import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import { join, last, map } from 'lodash'
import MyImage from '../MyImage'
import MyLink from '../MyLink'
import ProductStatus from '../products/ProductStatus'
import NeedleDetectionIcon from './NeedleDetectionIcon'
import PriceDisplay from './PriceDisplay'

export default function SalesCard({item}) {
  const product = item?.product || {}
  const size = item?.size || {}

  return (
    <MyLink to={`/sales/${item?.id}`}>
      <Paper sx={{px: 2, pt: 2, pb: 1, position: 'relative', cursor: 'pointer', height: '100%'}}>
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
              right: theme.spacing(1),
              top: theme.spacing(1),
              zIndex: 9
            })
          }
        >
          <NeedleDetectionIcon item={item}/>
        </Box>

        <Grid container justifyContent='center'>
          <MyImage src={product.photo} width={150} height={150}/>
        </Grid>

        <Grid container sx={{mt: 1}}>
          <Grid item xs>
            <Typography color='primary'>
              {item?.brandRefCode}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color='primary'>
              {item?.marketCode}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{my: 1}}/>
        <Typography fontWeight='bold' noWrap>
          { item?.newProductName || product.name }
        </Typography>

        <Grid container alignItems='center'>
          <Grid item xs>
            <Typography 
              sx={(theme) => ({
                color: theme.palette.grayText.main
              })}
            >
              {item?.newSizeName || size.name}
            </Typography>
          </Grid>
          <Grid item>
            <PriceDisplay item={last(item?.prices)}/>
          </Grid>
        </Grid>

        {Boolean(item?.components?.length) &&
          <>
            <Divider sx={{my: 1}}/>
            <Typography>
              {join(map(item.components, it => it.axCode), ', ')}
            </Typography>
          </>
        }
      </Paper>
    </MyLink>
  )
}