import { TableRow } from '@mui/material'
import { filter, find, includes, join, last, map } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import TableViewItems, { MyTableCell, TableActions } from '../TableViewItems'
import ProductStatus from '../products/ProductStatus'
import ProductTargetChip from '../products/ProductTargetChip'
import MarketCodeChip from '../products/MarketCodeChip'
import LastUpdate from '../products/LastUpdate'
import { demoOnSales } from '../../demo/sales'
import { getOnSalesDetails } from '../../utils/sales'
import PriceDisplay from './PriceDisplay'

function SalesTableRow({item}) {
  const product = item?.product || {}
  const size = item?.size || {}

  function getFromSizeInfomations(type) {
    return find(item?.sizeInfomations, it => it.type === type)
  }
  function getFromTestings(type) {
    return find(item?.testings, it => it.type === type)
  }

  if (!item) {
    return null
  }
  return (
    <TableRow>
      <MyTableCell width={192}>
        <TableActions
          detailPath={`/sales/${item?.id}`}
          editPath={'/sales/new'}
          clonePath={'/sales/new'}
          onRemove={null}
        />
      </MyTableCell>
      <MyTableCell width={220}>
        { item?.newProductName || product.name }
      </MyTableCell>
      <MyTableCell>
        <ProductStatus status={product.status}/>
      </MyTableCell>
      <MyTableCell width={114}>
        <ProductTargetChip target={product.target}/>
      </MyTableCell>
      <MyTableCell>
        {item?.brandRefCode}
      </MyTableCell>
      <MyTableCell>
        <MarketCodeChip label={item?.marketCode}/>
      </MyTableCell>
      <MyTableCell>
        {item?.newSizeName || size.name}
      </MyTableCell>
      <MyTableCell>
        <PriceDisplay item={last(item?.prices)}/>
      </MyTableCell>
      <MyTableCell width={200}>
        { join(map(item?.components, it => it.axCode), ', ') }
      </MyTableCell>
      <MyTableCell>
        {getFromSizeInfomations('Bulk Leadtime')?.detail}
      </MyTableCell>
      <MyTableCell>
        {getFromSizeInfomations('Mold Charge')?.detail}
      </MyTableCell>
      <MyTableCell>
        {getFromSizeInfomations('Bulk Order MOQ')?.detail}
      </MyTableCell>
      <MyTableCell>
        {getFromSizeInfomations('Bulk Color MOQ')?.detail}
      </MyTableCell>
      <MyTableCell>
        {getFromTestings('Pull Test')?.result}
      </MyTableCell>
      <MyTableCell>
        {getFromTestings('Needle Detection')?.result}
      </MyTableCell>
      <MyTableCell>
        <LastUpdate item={item} mode='simple'/>
      </MyTableCell>
    </TableRow>
  )
}

export default function TableViewSales({keyword, filterSettings}) {
  const { t } = useTranslation('products')

  const [sales, setSales] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [total, setTotal] = useState(10)

  useEffect(() => {
    const relatedPPCForSales = filterSettings?.marketCodes ? 
      filter(demoOnSales, it => includes(filterSettings.marketCodes, it.marketCode)):
      demoOnSales
    setSales(map(relatedPPCForSales, it => getOnSalesDetails(it)))
  }, [keyword, filterSettings])

  return (
    <TableViewItems
      headers={[
        '', t('name'), t('status'), t('target'),
        t('brandRefCode'), t('marketCode'), t('size'), t('price'), t('axCodes'), 
        t('bulkLeadtime'), t('moldCharge'), t('bulkOrderMoq'), t('bulkColorMoq'),
        t('pullTest'), t('needleDetection'), t('common:lastUpdate')
      ]}
      items={sales}
      keyKey='id'
      renderItem={(it) => <SalesTableRow item={it}/>}
      page={page}
      pageSize={pageSize}
      total={total}
      onPage={setPage}
      onPageSize={setPageSize}
    />
  )
}