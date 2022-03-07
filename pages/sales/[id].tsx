import { AppBar, Container, Grid, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { find, forEach, isEmpty, join, last, map, sortBy } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useRef } from 'react'
import InformationTable from '../../components/InformationTable'
import NoResultHint from '../../components/NoResultHint'
import AppBarText from '../../components/products/AppBarText'
import LastUpdate from '../../components/products/LastUpdate'
import MarketCodeChip from '../../components/products/MarketCodeChip'
import PCCCard from '../../components/products/PCCCard'
import ProductBasicPart, { ProductBasicPartTable } from '../../components/products/ProductBasicPart'
import ProductSizeCard from '../../components/products/ProductSizeCard'
import PriceDisplay from '../../components/sales/PriceDisplay'
import PriceHistory from '../../components/sales/PriceHistory'
import SimpleTable from '../../components/SimpleTable'
import SubTitle from '../../components/SubTitle'
import { getPCCForSalesDetails } from '../../utils/sales'

function AbstractPart({item, productSize, pcc}) {
  const { t } = useTranslation('products')

  function getFromExtraInfomations(type) {
    return find(pcc?.extraInfomations, it => it.type === type)
  }
  function getFromTestings(type) {
    return find(pcc?.testings, it => it.type === type)
  }

  const pullTest = getFromTestings('Pull Test')?.result
  const needleDetection = getFromTestings('Needle Detection')?.result
  let testingResultText = ''
  if (pullTest) {
    testingResultText += `${t('pullTest')}: ${pullTest}\n`
  }
  if (needleDetection) {
    testingResultText += `${t('needleDetection')}: ${needleDetection}\n`
  }

  const bulkLeadtime = getFromExtraInfomations('Bulk Leadtime')?.detail
  const moldCharge = getFromExtraInfomations('Mold Charge')?.detail
  const bulkOrderMOQ = getFromExtraInfomations('Bulk Order MOQ')?.detail
  const bulkColorMOQ = getFromExtraInfomations('Bulk Color MOQ')?.detail
  let moqText = ''
  if (bulkOrderMOQ) {
    moqText += `Order: ${bulkOrderMOQ}\n`
  }
  if (bulkColorMOQ) {
    moqText += `Color: ${bulkColorMOQ}\n`
  }

  return (
    <>
      <SubTitle>{t('abstract')}</SubTitle>
      <InformationTable
        data={[
          { 
            key: t('brand'), 
            text: 
              <Grid container alignItems='center' columnSpacing={1}>
                <Grid item>
                  <MarketCodeChip label={item?.marketCode}/>
                </Grid>
                <Grid item>
                  <Typography>{item?.brandRefCode}</Typography>
                </Grid>
              </Grid>
          },
          { key: t('size'), text: `${item?.newSizeName || productSize?.sizeName} - ${pcc?.name}` },
          { key: t('axCodes'), text: join(map(pcc?.components, it => it.axCode), ', ') },
          ...Boolean(bulkLeadtime) ? [{ key: t('bulkLeadtime'), text: bulkLeadtime }] : [],
          ...Boolean(moldCharge) ? [{ key: t('moldCharge'), text: moldCharge }] : [],
          ...Boolean(moqText) ? [{ key: t('MOQ'), text: moqText }] : [],
          ...Boolean(testingResultText) ? [{ key: t('testings'), text: testingResultText }] : [],
        ]}
      />
    </>
  )
}

function OthersPart({pcc}) {
  const { t } = useTranslation('products')

  let othersTableData = []
  forEach(sortBy(pcc?.extraInfomations, it => it.type), it => {
    const lastUpdate = <LastUpdate item={it} mode='simple'/>
    othersTableData.push([it.type, it.detail, lastUpdate])
  })

  return (
    <>
      <SubTitle>{t('others')}</SubTitle>
      <SimpleTable
        headerColor='success'
        headers={[
          { text: t('type') },
          { text: t('detail') },
          { text: t('common:lastUpdate') },
        ]}
        data={othersTableData}
      />
    </>
  )
}

export default function SalesDetail({item}) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const { t } = useTranslation('products')

  const productBasic = item?.productBasic || {}
  const productSize = item?.productSize || {}
  const pcc = item?.pcc || {}

  const productBasicRef = useRef(null)
  const productSizeRef = useRef(null)
  const pccRef = useRef(null)
  const brandRef = useRef(null)
  const priceRef = useRef(null)

  if (isEmpty(item)) {
    return (
      <NoResultHint/>
    )
  }
  return (
    <Box sx={{mb: isXs ? '56px' : '64px'}}>
      <AppBar color='default' sx={{top: 'auto', bottom: 0}}>
        <Toolbar>
          <Grid container>
            <AppBarText text={item.newProductName || productBasic.name} innerRef={productBasicRef}/>&nbsp;/&nbsp;
            <AppBarText text={item.newSizeName || productSize.sizeName} innerRef={productSizeRef}/>&nbsp;/&nbsp;
            <AppBarText text={pcc.name} innerRef={pccRef}/>&nbsp;/&nbsp;
            <AppBarText text={`${item.brandRefCode} - ${item.marketCode}`} innerRef={brandRef}/>&nbsp;/&nbsp;
            <AppBarText text={<PriceDisplay item={last(pcc.prices)}/>} innerRef={priceRef}/>
          </Grid>
        </Toolbar>
      </AppBar>

      <ProductBasicPart product={productBasic} newProductName={item.newProductName} salesMode/>

      <Container maxWidth='md' sx={{p: 0}}>
        <AbstractPart item={item} productSize={productSize} pcc={pcc}/>

        <div ref={priceRef}>
          <PriceHistory prices={pcc.prices}/>
        </div>

        <div ref={brandRef}>
          <SubTitle>{t('brand')}</SubTitle>
          <InformationTable
            data={[
              { key: t('brandRefCode'), text: item.brandRefCode },
              { key: t('marketCode'), text: <MarketCodeChip label={item.marketCode}/> },
              ...Boolean(item.remarks) ? [{ key: t('remarks'), text: item.remarks }] : [],
              { key: t('common:lastUpdate'), text: <LastUpdate item={item}/> }
            ]}
          />
        </div>

        <div ref={productBasicRef}>
          <SubTitle>{t('basic')}</SubTitle>
          <ProductBasicPartTable product={productBasic} newProductName={item.newProductName} salesMode/>
        </div>

        <ProductSizeCard size={productSize} newSizeName={item.newSizeName} productSizeRef={productSizeRef}/>

        <PCCCard pcc={pcc} salesMode pccRef={pccRef}/>

        <OthersPart pcc={pcc}/>
      </Container>
    </Box>
  )
}

SalesDetail.needLogin = true

export async function getServerSideProps({query}) {
  return {
    props: {
      item: getPCCForSalesDetails(query?.id)
    }
  }
}