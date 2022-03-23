import { AppBar, Box, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import { forEach, isEmpty, join, last, map, sortBy } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import InformationTable from '../../components/InformationTable'
import MyTabs from '../../components/MyTabs'
import NoResultHint from '../../components/NoResultHint'
import LastUpdate from '../../components/products/LastUpdate'
import MarketCodeChip from '../../components/products/MarketCodeChip'
import PageActions from '../../components/products/PageActions'
import ProductDisplay, { ProductDisplayTable } from '../../components/products/ProductDisplay'
import ColorsDisplay from '../../components/sales/ColorsDisplay'
import ComponentsDisplay from '../../components/sales/ComponentsDisplay'
import PriceDisplay from '../../components/sales/PriceDisplay'
import PriceHistory from '../../components/sales/PriceHistory'
import SimpleTable from '../../components/SimpleTable'
import { getOnSalesDetails } from '../../utils/sales'

function AbstractPart({item}) {
  const { t } = useTranslation('products')

  return (
    <>
      <ProductDisplay product={item?.product} newProductName={item.newProductName} salesMode/>

      <InformationTable
        data={[
          { 
            key: t('marketCode'), 
            text: <MarketCodeChip label={item?.marketCode}/>
          },
          { 
            key: t('brandRefCode'), 
            text: item?.brandRefCode
          },
          { 
            key: t('devSeason'), 
            text: item?.size?.devSeason
          },
          { 
            key: t('industries'), 
            text: join(item?.product?.industries, ', ')
          },
          { 
            key: t('price'), 
            text: <PriceDisplay item={last(item?.prices)}/>
          },
          { key: t('size'), text: item?.newSizeName || item?.size?.name },
          { key: t('axCodes'), text: join(map(item?.components, it => it.axCode), ', ') },
          ...Boolean(item?.remarks) ? [{ key: t('remarks'), text: item?.remarks }] : []
        ]}
      />
    </>
  )
}

function SizePart({item}) {
  const { t } = useTranslation('products')
  const size = item?.size || {}

  return (
    <InformationTable
      data={[
        ...Boolean(item?.newSizeName) ? 
          [
            { 
              key: t('sizeName'), 
              text: item.newSizeName
            },
            { 
              key: t('originalName'), 
              text: size.name
            },
          ] : [
            { 
              key: t('sizeName'), 
              text: size.name
            },
          ],
        ...Boolean(size.remarks) ? [{ key: t('remarks'), text: size.remarks }] : []
      ]}
    />
  )
}

function TestingsPart({testings}) {
  const { t } = useTranslation('products')

  let tableData = []
  forEach(sortBy(testings, it => it.type), it => {
    const lastUpdate = <LastUpdate item={it} mode='simple'/>
    tableData.push([it.type, it.result, lastUpdate])
    if (it.remarks) {
      tableData.push([it.remarks])
    }
  })

  return (
    <SimpleTable
      headerColor='info'
      headers={[
        { text: t('type') },
        { text: t('result') },
        { text: t('common:lastUpdate') },
      ]}
      data={tableData}
    />
  )
}

function OthersPart({sizeInfomations}) {
  const { t } = useTranslation('products')

  let tableData = []
  forEach(sortBy(sizeInfomations, it => it.type), it => {
    const lastUpdate = <LastUpdate item={it} mode='simple'/>
    tableData.push([it.type, it.detail, lastUpdate])
  })

  return (
    <SimpleTable
      headerColor='warning'
      headers={[
        { text: t('type') },
        { text: t('detail') },
        { text: t('common:lastUpdate') },
      ]}
      data={tableData}
    />
  )
}

export default function SalesDetail({item}) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const { t } = useTranslation('products')

  const tabs = [
    { text: t('abstract'), value: 'abstract'},
    { text: t('product'), value: 'product'},
    { text: t('size'), value: 'size'},
    { text: t('components'), value: 'components'},
    { text: t('prices'), value: 'prices'},
    { text: t('testings'), value: 'testings'},
    { text: t('colors'), value: 'colors'},
    { text: t('others'), value: 'others'},
  ]
  const [tab, setTab] = useState(tabs[0]?.value)

  if (isEmpty(item)) {
    return (
      <NoResultHint/>
    )
  }
  return (
    <Box sx={{mb: isXs ? '56px' : '64px'}}>
      <AppBar color='default' sx={{top: 'auto', bottom: 0}}>
        <Toolbar>
          {item?.newProductName || item?.product?.name}&nbsp;/&nbsp;
          {item?.newSizeName || item?.size?.name}&nbsp;/&nbsp;
          {item?.marketCode}&nbsp;/&nbsp;
          {item?.brandRefCode}
      </Toolbar>
      </AppBar>

      <MyTabs value={tab} onChange={setTab} items={tabs} sx={{mb: 2}}/>
      {tab === 'abstract' && <AbstractPart item={item}/>}
      {tab === 'product' &&
        <>
          <ProductDisplay product={item?.product} newProductName={item.newProductName} salesMode/>
          <ProductDisplayTable 
            product={item?.product} 
            newProductName={item?.newProductName}
            designer={item?.size?.designer}
            salesMode
          />
        </>
      }
      {tab === 'size' && <SizePart item={item}/>}
      {tab === 'components' && <ComponentsDisplay components={item?.components}/>}
      {tab === 'prices' && <PriceHistory prices={item?.prices}/>}
      {tab === 'testings' && <TestingsPart testings={item?.testings}/>}
      {tab === 'colors' && <ColorsDisplay marketCode={item?.marketCode} components={item?.components}/>}
      {tab === 'others' && <OthersPart sizeInfomations={item?.sizeInfomations}/>}

      <PageActions 
        editPath='/sales/new'
        clonePath='/sales/clone?id=1'
        onRemove={null}
      />
    </Box>
  )
}

SalesDetail.needLogin = true

export async function getServerSideProps({query}) {
  return {
    props: {
      item: getOnSalesDetails(query?.id)
    }
  }
}