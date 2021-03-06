import { Box, Grid, Typography } from '@mui/material'
import { join, map } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import InformationTable from '../InformationTable'
import My3DViewer from '../My3DViewer'
import MyImage from '../MyImage'
import LastUpdate from './LastUpdate'
import MarketCodeChip from './MarketCodeChip'
import ProductStatus from './ProductStatus'
import ProductTargetChip from './ProductTargetChip'

export function ProductDisplayImage({product}) {
  return (
    <Grid container justifyContent='center'>
      {Boolean(product.photo) &&
        <Grid item xs={12} sm={6} container justifyContent='center'>
          <MyImage src={product.photo} width={200} height={200}/>
        </Grid>
      }
      {Boolean(product.threeDPhoto) &&
        <Grid item xs={12} sm={6} container justifyContent='center'>
          <My3DViewer src={product.threeDPhoto} height={200} scale={2}/>
        </Grid>
      }
    </Grid>
  )
}

export function ProductDisplayTable({product, newProductName='', salesMode=false, designer=''}) {
  const { t } = useTranslation('products')

  return (
    <InformationTable
      data={[
        ...Boolean(newProductName) ? [{ key: t('originalName'), text: product.name }] : [],
        { key: t('status'), text: <ProductStatus status={product.status}/> },
        ...salesMode ? [] : [{ key: t('industries'), text: join(product.industries, ', ') }],
        { key: t('target'), text: <ProductTargetChip target={product.target}/> },
        ...(!salesMode && product.target === 'Custom') ?
          [{ 
            key: t('marketCodes'), 
            text:
              <Grid container spacing={1}>
                {map(product.limitedMarketCodes, v => 
                  <Grid item key={v}>
                    <MarketCodeChip label={v}/>
                  </Grid>
                )}
              </Grid>
          }] :
          [],
        ...Boolean(designer) ? [{ key: t('designer'), text: designer }] : [],
        ...Boolean(product.remarks) ? [{ key: t('remarks'), text: product.remarks }] : [],
        { key: t('common:lastUpdate'), text: <LastUpdate item={product}/> }
      ]}
    />
  )
}

export default function ProductDisplay({product, newProductName='', salesMode=false}) {
  return (
    <>
      <ProductDisplayImage product={product}/>

      <Box sx={{mt: 2}}>
        <Typography variant='h4'>{ newProductName || product.name }</Typography>
        
        <Typography 
          sx={(theme) => ({
            color: theme.palette.grayText.main,
            mb: 2
          })}
        >
          { product.description }
        </Typography>
      
        {!salesMode && <ProductDisplayTable product={product} newProductName={newProductName}/>}
      </Box>
    </>
  )
}