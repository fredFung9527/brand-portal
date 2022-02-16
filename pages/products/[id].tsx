import { Grid, Typography, Container, Paper, Divider } from '@mui/material'
import { find, join, map } from 'lodash'
import { demoProducts } from '../../demo/product'
import { getCurrencySymbol, numberWithCommas } from '../../utils/common'
import useTranslation from 'next-translate/useTranslation'
import InformationTable from '../../components/InformationTable'
import ProductStatus from '../../components/products/ProductStatus'
import ProductPriceHistory from '../../components/products/ProductPriceHistory'
import MyLineChart from '../../components/charts/MyLineChart'
import My3DViewer from '../../components/My3DViewer'
import MyImage from '../../components/MyImage'
import ProductPrice from '../../components/products/ProductPrice'
import MaterialChip from '../../components/products/MaterialChip'
import ColorChip from '../../components/products/ColorChip'
import SubTitle from '../../components/SubTitle'
import ProductTargetChip from '../../components/products/ProductTargetChip'
import MarketCodeChip from '../../components/products/MarketCodeChip'
import PullTestDisplay from '../../components/products/PullTestDisplay'

export default function ProductDetail({product}) {
  const { t } = useTranslation('products')

  if (!product) {
    return null
  }
  return (
    <>
      <Grid container justifyContent='center'>
        {Boolean(product.photo) &&
          <Grid item xs={12} sm={6} container justifyContent='center'>
            <MyImage src={product.photo} width={300} height={300}/>
          </Grid>
        }
        {Boolean(product.threeDPhoto) &&
          <Grid item xs={12} sm={6} container justifyContent='center'>
            <My3DViewer src={product.threeDPhoto} height={300} scale={2}/>
          </Grid>
        }
      </Grid>

      <Container maxWidth='md' sx={{p: 0, mt: 2}}>
        <Grid container alignItems='center' columnSpacing={1}>
          <Grid item>
            <Typography variant='h4'>{ product.name }</Typography>
          </Grid>
          {map(product.materials, (v, idx) =>
            <Grid key={idx} item>
              <MaterialChip label={v}/>
            </Grid>
          )}
          {map(product.colors, (v, idx) =>
            <Grid key={idx} item>
              <ColorChip label={v}/>
            </Grid>
          )}
        </Grid>

        <ProductPrice product={product}/>
        <Typography sx={(theme) => ({color: theme.palette.grayText.main})}>{ product.description }</Typography>
      
        <SubTitle>{t('basic')}</SubTitle>
        <InformationTable
          data={[
            { key: t('status'), text: <ProductStatus status={product.status}/> },
            { key: t('productType'), text: product.productType },
            { key: t('itemCodes'), text: join(product.itemCodes, ', ') },
            { key: t('sizes'), text: join(product.sizes, ', ') }
          ]}
        />
        
        {Boolean(product.priceHistory?.length) &&
          <>
            <SubTitle>{t('priceHistory')}</SubTitle>
            <Paper sx={{p: 2}}>
              <ProductPriceHistory history={product.priceHistory}/>
            </Paper>
          </>
        }

        <SubTitle>{t('brand')}</SubTitle>
        <InformationTable
          data={[
            { key: t('target'), text: <ProductTargetChip target={product.target}/> },
            ...product.target === 'Custom' ?
              [{ 
                key: t('marketCodes'), 
                text:
                  <Grid container columnSpacing={1}>
                    {map(product.marketCodes, v => 
                      <Grid item key={v}>
                        <MarketCodeChip label={v}/>
                      </Grid>
                    )}
                  </Grid>
              }] :
              [],
            { key: t('seasons'), text: join(product.seasons, ', ') }
          ]}
        />

        <SubTitle>{t('development')}</SubTitle>
        <InformationTable
          data={[
            { key: t('devSeason'), text: product.devSeason },
            { key: t('effectiveSeason'), text: product.effectiveSeason },
            { key: t('designer'), text: product.designer },
          ]}
        />

        <SubTitle>{t('production')}</SubTitle>
        <InformationTable
          data={[
            { key: t('moldCharge'), text: `${getCurrencySymbol(product.currency)} ${numberWithCommas(product.moldCharge)}` },
            { key: t('bulkLeadtime'), text: numberWithCommas(product.bulkLeadtime) },
            { key: t('bulkOrderMoq'), text: numberWithCommas(product.bulkOrderMoq) },
            { key: t('bulkColorMoq'), text: product.bulkColorMoq },
            { key: t('supplier'), text: product.supplier },
            { key: t('incoTerm'), text: product.incoTerm },
          ]}
        />

        <SubTitle>{t('others')}</SubTitle>
        <InformationTable
          data={[
            { key: t('pullTest'), text: <PullTestDisplay value={product.pullTest}/> },
            { key: t('otherTest'), text: product.otherTest },
            { 
              key: t('remarks'), 
              text: <div style={{whiteSpace: 'pre-line'}}>{product.remarks}</div> 
            },
          ]}
        />

        <SubTitle>{t('forecastHistory')}</SubTitle>
        <MyLineChart data={product.forecastHistory} height={300} xKey='date' yKey='forecast'/>

        <Divider sx={{my: 2}}/>
        <Typography
          align='right'
          sx={(theme) => ({
            color: theme.palette.grayText.main
          })}
        >
          {product.lastUpdateBy} {t('updatedOn')} {product.lastUpdate}
        </Typography>
      </Container>
    </>
  )
}

ProductDetail.needLogin = true

export async function getServerSideProps({query}) {
  const { id } = query
  const product = find(demoProducts, it => it.id === id) || null

  return {
    props: {
      product 
    }
  }
}